'use client'

import { useState } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
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
                        userData?.role == 'doctor'
                            ? '/doctor/dashboard'
                            : userData?.role == 'patient'
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
        <header className="sticky top-0 z-50 bg-white shadow-md">
            <nav className="flex items-center justify-between lg:px-44 text-xl">
                <div className="flex items-center flex-1">
                    <Link href="/" className="h-12 w-12 lg:h-16 lg:w-16">
                        <Image src={Logo} alt="Logo" height={64} width={64} priority />
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
                        <div className="flex text-sm">
                            <Link href="/login">
                                <button className="border border-sky-700 py-1 px-2 rounded-md mr-2">
                                    LOGIN
                                </button>
                            </Link>
                            <Link href="/registration">
                                <button className="border border-sky-700 py-1 px-2 rounded-md mr-2">
                                    REGISTER
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
