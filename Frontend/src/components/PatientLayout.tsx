"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const PatientLayout = ({ children }) => {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <>
            <div className="drawer lg:drawer-open font-work-sans">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-start justify-start ps-8 pt-8 bg-slate-100">
                    {children}
                </div>
                <div className="drawer-side z-10">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-60  h-full bg-white text-base-content font-medium text-base">

                        <li className={isActive('/patient/appointment/pending') ? 'bg-sky-200 rounded' : ''}>
                            <Link href="/patient/appointment/pending" passHref>
                                Up coming Appoinment
                            </Link>
                        </li>
                        <li className={isActive('/patient/appointment/previous') ? 'bg-sky-200 rounded' : ''}>
                            <Link href="/patient/appointment/previous" passHref>
                                Previous Appoinment
                            </Link>
                        </li>
                        <li className={isActive('/admin/booking/all') ? 'bg-sky-200 rounded' : ''}>
                            <Link href="/patient/MedicalHistory" passHref>
                                Medical History
                            </Link>
                        </li>
                        <li className={isActive('/admin/booking/all') ? 'bg-sky-200 rounded' : ''}>
                            <Link href="/patient/Billing" passHref>
                                Billing & Payment
                            </Link>
                        </li>
                        <li className={isActive('/admin/booking/all') ? 'bg-sky-200 rounded' : ''}>
                            <Link href="/patient/Notifications" passHref>
                                Notifications
                            </Link>
                        </li>
                        {/* <li className={isActive('/admin/booking/all') ? 'bg-sky-200 rounded' : ''}>
                            <Link href="/admin/booking/all" passHref>
                                Appointment Scheduling
                            </Link>
                        </li> */}
                        <li className={isActive('/admin/booking/all') ? 'bg-sky-200 rounded' : ''}>
                            <Link href="/patient/profile" passHref>
                                Profile Information
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default PatientLayout;
