"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AdminLayout = ({ children }) => {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <div className="drawer lg:drawer-open font-work-sans">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-start justify-start ps-8 pt-8 bg-slate-100">
                {children}
            </div>
            <div className="drawer-side z-10">
                <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                <ul className="menu p-4 w-60  h-full bg-white text-base-content font-medium text-base">

                    <li className={isActive('/admin/doctors/new') ? 'bg-sky-200 rounded' : ''}>
                        <Link href="/admin/doctors/new" passHref>
                            Create New Doctor
                        </Link>
                    </li>
                    <li className={isActive('/admin/doctors/list') ? 'bg-sky-200 rounded' : ''}>
                        <Link href="/admin/doctors/list" passHref>
                            All Doctors
                        </Link>
                    </li>
                    <li className={isActive('/admin/service/new') ? 'bg-sky-200 rounded' : ''}>
                        <Link href="/admin/service/new" passHref>
                            Create New Service
                        </Link>
                    </li>
                    <li className={isActive('/admin/service/list') ? 'bg-sky-200 rounded' : ''}>
                        <Link href="/admin/service/list" passHref>
                            All Services
                        </Link>
                    </li>
                    <li className={isActive('/admin/booking/all') ? 'bg-sky-200 rounded' : ''}>
                        <Link href="/admin/appointment/list" passHref>
                            All Appointments
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminLayout;
