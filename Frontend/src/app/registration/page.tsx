"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useState } from 'react';
import { login } from "@/redux/slices/userSlice";
import { useDispatch } from 'react-redux';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Logo from "../../images/Logo (2).png";
import Image from 'next/image';
import { url } from "inspector";

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const roleRedirects = {
    doctor: '/doctor/dashboard',
    patient: '/patient/dashboard',
};

const RegistrationPage = () => {
    const [error, setError] = useState(null);
    const [role, setRole] = useState<keyof typeof roleRedirects | ''>('');
    const dispatch = useDispatch();

    // Formik setup
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            phone: '',
            address: '',
            specialization: '',
            availableSlots: '',
            doctorId: '',
            authorizedOrganization: '',
            age: '',
            sex: '',
            availability: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .min(3, 'Name must be at least 3 characters')
                .required('Name is required'),
            email: Yup.string()
                .email('Invalid email format')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
                .required('Confirm Password is required'),
            phone: Yup.string()
                .required('Phone number is required'),
            address: Yup.string()
                .required('Address is required'),
            age: Yup.number()
                .required('Age is required'),
            sex: Yup.string()
                .required('Sex is required'),
            specialization: Yup.string().when('role', {
                is: (val: string) => val === 'doctor',
                then: (schema) => schema.required('Specialization is required'),
            }),
            availableSlots: Yup.string().when('role', {
                is: (val: string) => val === 'doctor',
                then: (schema) => schema.required('Available Slots are required'),
            }),
            doctorId: Yup.string().when('role', {
                is: (val: string) => val === 'doctor',
                then: (schema) => schema.required('Doctor ID is required'),
            }),
            authorizedOrganization: Yup.string().when('role', {
                is: (val: string) => val === 'doctor',
                then: (schema) => schema.required('Authorized Organization is required'),
            }),
            availability: Yup.string().when('role', {
                is: (val: string) => val === 'doctor',
                then: (schema) => schema.required('Availability is required'),
            }),
        }),
        onSubmit: async (values) => {
            setError(null);

            const formatData = new FormData();
            formatData.append('name', values.name);
            formatData.append('email', values.email);
            formatData.append('password', values.password);
            formatData.append('role', role);
            formatData.append('contactInfo', JSON.stringify({ phone: values.phone, address: values.address }));
            if (role === 'doctor') {
                formatData.append('specialization', values.specialization);
                formatData.append('availableSlots', values.availableSlots);
                formatData.append('availability', values.availability);
                formatData.append('doctorId', values.doctorId);
                formatData.append('authorizedOrganization', values.authorizedOrganization);
            }
            formatData.append('age', values.age);
            formatData.append('sex', values.sex);

            // Log form data to debug
            console.log('Form values:', values);
            for (let [key, value] of formatData.entries()) {
                console.log(key, value);
            }

            try {
                const response = await axios.post(`${BACKEND_API_URL}/api/users/register`, formatData, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = response.data;
                if (data) {
                    dispatch(login(data));
                    if (role) {
                        window.location.href = roleRedirects[role];
                    }
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
                            <div className="w-full flex-1">
                                <div className="my-12 border-b text-center">
                                    <div
                                        className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                                        Or sign In with Cartesian E-mail
                                    </div>
                                </div>

                                <div className="mx-auto max-w-xs">
                                    <select
                                        className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white
                                     `}
                                        value={role}
                                        onChange={(e) => setRole(e.target.value as keyof typeof roleRedirects)}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </select>

                                    {role && (
                                        <form onSubmit={formik.handleSubmit}>

                                            <input
                                                className={`w-full px-8 py-4 mt-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white input input-bordered ${formik.touched.name && formik.errors.name ? 'input-error' : ''}"
                                            `}
                                                name="name"
                                                type="text"
                                                placeholder="name"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.name}
                                            />
                                            {formik.touched.name && formik.errors.name ? (
                                                <p className="text-red-500 text-xs">{formik.errors.name}</p>
                                            ) : null}

                                            <input
                                                className={`w-full px-8 py-4 mt-5 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white input input-bordered ${formik.touched.email && formik.errors.email ? 'input-error' : ''}"
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

                                            <input
                                                className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 input input-bordered ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'input-error' : ''}"`
                                                }

                                                name="confirmPassword"
                                                type="password"
                                                placeholder="confirmPassword"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.confirmPassword}
                                            />
                                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                                <p className="text-red-500 text-xs">{formik.errors.confirmPassword}</p>
                                            ) : null}


                                            <input
                                                className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 input input-bordered ${formik.touched.phone && formik.errors.phone ? 'input-error' : ''}"`
                                                }

                                                name="phone"
                                                type="text"
                                                placeholder="phone"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.phone}
                                            />
                                            {formik.touched.phone && formik.errors.phone ? (
                                                <p className="text-red-500 text-xs">{formik.errors.phone}</p>
                                            ) : null}

                                            <input
                                                className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 input input-bordered ${formik.touched.address && formik.errors.address ? 'input-error' : ''}"`
                                                }

                                                name="address"
                                                type="text"
                                                placeholder="address"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.address}
                                            />
                                            {formik.touched.address && formik.errors.address ? (
                                                <p className="text-red-500 text-xs">{formik.errors.address}</p>
                                            ) : null}

                                            {role === 'doctor' && (
                                                <>

                                                    <input
                                                        className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 input input-bordered ${formik.touched.specialization && formik.errors.specialization ? 'input-error' : ''}"`
                                                        }

                                                        name="specialization"
                                                        type="text"
                                                        placeholder="specialization"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.specialization}
                                                    />
                                                    {formik.touched.specialization && formik.errors.specialization ? (
                                                        <p className="text-red-500 text-xs">{formik.errors.specialization}</p>
                                                    ) : null}



                                                    <div className="form-control">

                                                        <input
                                                            name="availableSlots"
                                                            type="text"
                                                            placeholder="available slots"
                                                            className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 input input-bordered ${formik.touched.specialization && formik.errors.specialization ? 'input-error' : ''}"`
                                                            }
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.availableSlots}
                                                        />
                                                        {formik.touched.availableSlots && formik.errors.availableSlots ? (
                                                            <p className="text-red-500 text-xs">{formik.errors.availableSlots}</p>
                                                        ) : null}
                                                        <p className="text-gray-500 text-xs mt-1">Example: Monday-Friday, 12AM-9PM</p>
                                                    </div>

                                                    <div className="form-control">

                                                        <select
                                                            name="availability"
                                                            className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 input input-bordered ${formik.touched.availability && formik.errors.availability ? 'input-error' : ''}"`
                                                            }
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.availability}
                                                        >
                                                            <option value="">Select Availability</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                        </select>
                                                        {formik.touched.availability && formik.errors.availability ? (
                                                            <p className="text-red-500 text-xs">{formik.errors.availability}</p>
                                                        ) : null}
                                                    </div>

                                                    <div className="form-control">

                                                        <input
                                                            name="doctorId"
                                                            type="text"
                                                            placeholder="doctor ID"
                                                            className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 input input-bordered ${formik.touched.doctorId && formik.errors.doctorId ? 'input-error' : ''}"`
                                                            }
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.doctorId}
                                                        />
                                                        {formik.touched.doctorId && formik.errors.doctorId ? (
                                                            <p className="text-red-500 text-xs">{formik.errors.doctorId}</p>
                                                        ) : null}
                                                    </div>

                                                    <div className="form-control">

                                                        <input
                                                            name="authorizedOrganization"
                                                            type="text"
                                                            placeholder="authorized organization"
                                                            className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 input input-bordered ${formik.touched.authorizedOrganization && formik.errors.authorizedOrganization ? 'input-error' : ''}"`
                                                            }
                                                            onChange={formik.handleChange}
                                                            onBlur={formik.handleBlur}
                                                            value={formik.values.authorizedOrganization}
                                                        />
                                                        {formik.touched.authorizedOrganization && formik.errors.authorizedOrganization ? (
                                                            <p className="text-red-500 text-xs">{formik.errors.authorizedOrganization}</p>
                                                        ) : null}
                                                    </div>
                                                </>
                                            )}

                                            <div className="form-control">

                                                <input
                                                    name="age"
                                                    type="number"
                                                    placeholder="age"
                                                    className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 input input-bordered ${formik.touched.age && formik.errors.age ? 'input-error' : ''}"`
                                                    }
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.age}
                                                />
                                                {formik.touched.age && formik.errors.age ? (
                                                    <p className="text-red-500 text-xs">{formik.errors.age}</p>
                                                ) : null}
                                            </div>

                                            <div className="form-control">

                                                <select
                                                    name="sex"
                                                    className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 input input-bordered ${formik.touched.sex && formik.errors.sex ? 'input-error' : ''}"`
                                                    }
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.sex}
                                                >
                                                    <option value="">Select Sex</option>
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                {formik.touched.sex && formik.errors.sex ? (
                                                    <p className="text-red-500 text-xs">{formik.errors.sex}</p>
                                                ) : null}
                                            </div>

                                            {error && <p className="text-red-500 text-sm">{error}</p>}

                                            <button
                                                className="mt-5 tracking-wide font-semibold bg-color-primary text-color-third w-full py-4 rounded-lg hover:bg-color-secondary transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                                                <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" stroke-width="2"
                                                    stroke-linecap="round" stroke-linejoin="round">
                                                    <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                                    <circle cx="8.5" cy="7" r="4" />
                                                    <path d="M20 8v6M23 11h-6" />
                                                </svg>
                                                <span className="ml-">
                                                    Register
                                                </span>
                                            </button>
                                        </form>
                                    )}


                                    <p className="mt-6 text-xs text-gray-600 text-center">
                                        Already have an account?
                                        <Link href="/login" className="border-b border-gray-500 border-dotted">
                                            Login
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-color-primary text-center hidden lg:flex">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{backgroundImage:`url('/images/login.png')`}}>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default RegistrationPage;
