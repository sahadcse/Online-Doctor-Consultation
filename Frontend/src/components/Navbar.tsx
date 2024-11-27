'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Logo from "../images/DaktarBari Transparent BG.png"
import Link from 'next/link'
import useisAuthenticated from '../hooks/useIsAuthenticated'
import useUserData from '../hooks/useUserData'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/slices/userSlice'

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const isAuth = useisAuthenticated()
    const userData = useUserData()
    const dispatch = useDispatch()

    const dynamicNavigation = [
        { name: 'HOME', href: '/' },
        { name: 'ABOUT', href: '/about' },
        { name: 'SERVICES', href: '/services' },
        { name: 'CONTACT', href: '/contact' },
        { name: 'APPOINTMENT', href: '/appointment' },
        ...(isAuth
            ? [
                {
                    name: 'DASHBOARD',
                    href:
                        userData.user_type === 2
                            ? '/doctor/dashboard'
                            : userData.user_type === 3
                                ? '/patient/dashboard'
                                : '/admin/dashboard',
                },
            ]
            : []),
    ]

    const handleLogout = () => {
        dispatch(logout())
        window.location.href = '/login'
    }

    return (
        <div className="">
            <header className="relative lg:absolute inset-x-0 top-0 z-50">
                <nav
                    aria-label="Global"
                    className="flex items-center justify-between p-4 lg:px-64 text-xl"
                >
                    <div className="flex lg:flex-1">
                        <Link href="/" className="-m-1.5 p-1.5">
                            <Image src={Logo} alt="Logo" width={150} height={100} />
                        </Link>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(true)}
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        >
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="hidden lg:flex lg:gap-x-12">
                        {dynamicNavigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-lg font-semibold leading-6 text-gray-900 hover:text-gray-600"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {isAuth ? (
                            <button
                                onClick={handleLogout}
                                className="rounded-full bg-blue-600 px-4 py-2 text-white text-base"
                            >
                                LOGOUT
                            </button>
                        ) : (
                            <Link href="/login">
                                <button className="rounded-full bg-blue-600 px-4 py-2 text-white text-base">
                                    LOGIN
                                </button>
                            </Link>
                        )}
                    </div>
                </nav>
                {/* Mobile Menu */}
                <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                    <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full bg-white px-6 py-6 overflow-y-auto sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                        <div className="flex items-center justify-between">
                            <Link href="/" className="-m-1.5 p-1.5">
                                <Image src={Logo} alt="Logo" width={150} height={100} />
                            </Link>
                            <button
                                type="button"
                                onClick={() => setMobileMenuOpen(false)}
                                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            >
                                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                            </button>
                        </div>
                        <div className="mt-6">
                            <nav className="space-y-2">
                                {dynamicNavigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                            <div className="mt-6">
                                {isAuth ? (
                                    <button
                                        onClick={handleLogout}
                                        className="w-full rounded-full bg-blue-600 px-4 py-2 text-white text-base"
                                    >
                                        LOGOUT
                                    </button>
                                ) : (
                                    <Link href="/login">
                                        <button className="w-full rounded-full bg-blue-600 px-4 py-2 text-white text-base">
                                            LOGIN
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </DialogPanel>
                </Dialog>
            </header>
        </div>
    )
}

export default Navbar
