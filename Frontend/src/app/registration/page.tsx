"use client";

import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { login } from "@/redux/slices/userSlice";
import { useDispatch } from 'react-redux';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RegistrationPage = () => {
    const [error, setError] = useState(null);
    const router = useRouter();
    const dispatch = useDispatch();

    // Formik setup
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            role: 'patient'
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
        }),
        onSubmit: async (values) => {
            setError(null);

            try {
                const response = await axios.post(`https://odcp-backend-production.up.railway.app/api/users/register`, values);
                const data = response.data;
                if (data) {
                    dispatch(login(data));
                    window.location.href = '/';
                }

            } catch (err) {
                setError((err as any).response?.data?.message);
            }
        },
    });

    return (
        <>
            <Navbar />
            <div>
                <div className="hero min-h-screen ">
                    <div className="hero-content flex-col w-full">8
                        <div className="text-center">
                            <h1 className="text-2xl mt-3 font-bold">Registration</h1>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                            <div className="card-body">
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input
                                            name="name"
                                            type="text"
                                            placeholder="name"
                                            className={`input input-bordered ${formik.touched.name && formik.errors.name ? 'input-error' : ''}`}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.name}
                                        />
                                        {formik.touched.name && formik.errors.name ? (
                                            <p className="text-red-500 text-xs">{formik.errors.name}</p>
                                        ) : null}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input
                                            name="email"
                                            type="text"
                                            placeholder="email"
                                            className={`input input-bordered ${formik.touched.email && formik.errors.email ? 'input-error' : ''}`}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.email}
                                        />
                                        {formik.touched.email && formik.errors.email ? (
                                            <p className="text-red-500 text-xs">{formik.errors.email}</p>
                                        ) : null}
                                    </div>

                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Password</span>
                                        </label>
                                        <input
                                            name="password"
                                            type="password"
                                            placeholder="password"
                                            className={`input input-bordered ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                        />
                                        {formik.touched.password && formik.errors.password ? (
                                            <p className="text-red-500 text-xs">{formik.errors.password}</p>
                                        ) : null}
                                    </div>

                                    {error && <p className="text-red-500 text-sm">{error}</p>}

                                    <div className="form-control mt-6">
                                        <button type="submit" className="btn btn-primary">
                                            Register
                                        </button>
                                    </div>
                                </form>

                                <button>
                                    Already have an account?{" "}
                                    <Link href="/login" className="text-secondary">
                                        Login
                                    </Link>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    );
};

export default RegistrationPage;
