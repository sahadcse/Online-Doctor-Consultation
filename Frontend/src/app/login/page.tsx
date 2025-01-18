"use client";

import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/userSlice';
import Cookies from 'js-cookie';
import Logo from "../../images/Logo (2).png";
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const LoginPage = () => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    // Formik setup
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            setError(null);
            try {
                if (!BACKEND_API_URL) {
                    throw new Error('API URL is not defined');
                }
                const response = await axios.post(`${BACKEND_API_URL}/api/users/login`, values);
                const data: { token: string; role: 'doctor' | 'patient' | 'admin' } = response.data;

                // Store the token in cookies
                Cookies.set('token', data.token);

                dispatch(login(data));

                const roleRedirects = {
                    doctor: '/doctor/dashboard',
                    patient: '/patient/dashboard',
                    admin: '/admin/dashboard',
                };

                if (roleRedirects[data.role]) {
                    window.location.href = roleRedirects[data.role];
                } else {
                    throw new Error('Invalid role');
                }
            } catch (err) {
                setError((err as any).response?.data?.message);
            }
        },
    });

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
                <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                    <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                        <div>
                            <Image src={Logo} alt='company logo'
                                className="w-mx-auto" width={100} height={100} />
                        </div>
                        <div className="mt-12 flex flex-col items-center">
                            <div className="w-full flex-1 ">
                               
                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Or sign In with Cartesian E-mail
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    
                                    <form onSubmit={formik.handleSubmit}>
                                        <input
                                            className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white input input-bordered ${formik.touched.email && formik.errors.email ? 'input-error' : ''}"
                                            `}
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <p className="text-red-500 text-xs">{formik.errors.email}</p>
                                        ) : null}
                                        <input
                                            className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 input input-bordered ${formik.touched.password && formik.errors.password ? 'input-error' : ''}"`
                                            }

                                            name="password"
                                            type="password"
                                            placeholder="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <p className="text-red-500 text-xs">{formik.errors.password}</p>
                                        ) : null}
                                        {error && <p className="text-red-500 text-xs">{error}</p>}
                                        <button
                                            className="mt-5 tracking-wide font-semibold bg-color-primary text-color-third w-full py-4 rounded-lg hover:bg-color-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                            <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round">
                                                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                <circle cx="8.5" cy="7" r="4" />
                                                <path d="M20 8v6M23 11h-6" />
                                            </svg>
                                            <span className="ml-">
                                                Sign In
                                            </span>
                                        </button>
                                    </form>
                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        Don’t have an account?
                                        <Link href="/registration" className="border-b border-gray-500 border-dotted">
                                            Create an account
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-color-primary text-center hidden lg:flex">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{backgroundImage: `url('/images/login.png')`}}>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default LoginPage;
