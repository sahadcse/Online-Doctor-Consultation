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
                            <div className="w-full flex-1 mt-8">
                                <div className="flex flex-col items-center">
                                    <button
                                        className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-color-primary text-color-third flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                        <div className="bg-white p-2 rounded-full">
                                            <svg className="w-4" viewBox="0 0 533.5 544.3">
                                                <path
                                                    d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                    fill="#4285f4" />
                                                <path
                                                    d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                    fill="#34a853" />
                                                <path
                                                    d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                    fill="#fbbc04" />
                                                <path
                                                    d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                    fill="#ea4335" />
                                            </svg>
                                        </div>
                                        <span className="ml-4">
                                            Sign In with Google
                                        </span>
                                    </button>

                                </div>

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
                        {/* <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style="background-image: url('https://drive.google.com/uc?export=view&id=1KZ_Ub_2lZ0dHbKV0fAIhxVhiQA183RCz');">
                        </div> */}
                    </div>
                </div>
            </div>
            <Footer />
        </>

    );
};

export default LoginPage;
