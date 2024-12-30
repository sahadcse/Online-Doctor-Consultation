'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MdDashboard, MdCalendarMonth, MdOutlineFiberSmartRecord, MdHistory, MdOutlinePayment, MdOutlineSettings, MdLogout } from "react-icons/md";

import { ReactNode } from 'react';


const DoctorLayout = ({ children }: { children: ReactNode }) => {
    const pathname = usePathname();

    const isActive = (path: string): boolean => pathname === path;

    return (
        <>
            <div className="drawer lg:drawer-open font-work-sans">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col px-4 pt-4">
                    {children}
                </div>
                {/* Left Navigation */}
                <div className="drawer-side z-10 bg-gray-100">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="p-4 w-60  h-full  text-base-content font-medium text-base">
                        {/* Doctor Info */}
                        <div className="  rounded-lg p-4">
                            <img  src={`https://randomuser.me/api/portraits/men/${Math.floor(Math.random() * 100)}.jpg`} alt="Patient" className="rounded-full m-auto" />
                            <div className="text-center">
                                <h1 className="text-lg font-semibold">Dr. John Doe</h1>
                                <p className="text-xs text-gray-500">MBBS, FCPS- MD(Medicine), MCPS.</p>
                            </div>
                        </div>
                        {/* Navigation */}
                        <div className="gap-3 flex flex-col menu">
                            <li className={isActive('/doctor/dashboard') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/doctor/dashboard" passHref>
                                <MdDashboard /> Dashboard
                                </Link>
                            </li>
                            <li className={isActive('/doctor/appointments') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/doctor/appointments" passHref>
                                <MdCalendarMonth /> Appointments
                                </Link>
                            </li>
                            <li className={isActive('/doctor/patientRecords') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/doctor/patientRecords" passHref>
                                <MdOutlineFiberSmartRecord /> Patient Records
                                </Link>
                            </li>
                            <li className={isActive('/doctor/consultHistory') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/doctor/consultHistory" passHref>
                                    <MdHistory/> Consult History
                                </Link>
                            </li>
                            <li className={isActive('/doctor/payment') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/doctor/payment" passHref>
                                    <MdOutlinePayment/> Payment
                                </Link>
                            </li>
                            <li className={isActive('/doctor/profile') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/doctor/profile" passHref>
                                    <MdOutlineSettings/> Settings
                                </Link>
                            </li>
                            <li className={isActive('/doctor/login') ? 'bg-sky-200 rounded' : ''}>
                                <Link href="/" passHref>
                                    <MdLogout/> Logout
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        </>
    );
}

export default DoctorLayout;