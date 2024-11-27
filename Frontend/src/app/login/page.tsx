"use client";

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/userSlice';

const LoginPage = () => {
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    // Formik setup
    const formik = useFormik({
        initialValues: {
            phone_number: '',
            password: '',
        },
        validationSchema: Yup.object({
            phone_number: Yup.string()
                .required('phone number is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
        }),
        onSubmit: async (values) => {
            setError(null);

            try {
                const response = await axios.post(`https://doctor.erestora.net/api/login`, values);
                const data = response.data;
                if (data) {
                    dispatch(login(data));
                    window.location.href = '/';
                }
            } catch (err) {
                setError(err.response?.data?.message);
            }
        },
    });

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center">
                        <h1 className="text-2xl mt-3 font-bold">Login</h1>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
                        <div className="card-body">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Phone Number</span>
                                    </label>
                                    <input
                                        name="phone_number"
                                        type="text"
                                        placeholder="phone number"
                                        className={`input input-bordered ${formik.touched.phone_number && formik.errors.phone_number ? 'input-error' : ''}`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.phone_number}
                                    />
                                    {formik.touched.phone_number && formik.errors.phone_number ? (
                                        <p className="text-red-500 text-xs">{formik.errors.phone_number}</p>
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
                                {error && <p className="text-red-500 text-xs">{error}</p>}
                                <div className="form-control mt-6">
                                    <button type="submit" className="btn btn-primary">
                                        Login
                                    </button>
                                </div>
                            </form>
                            <button>
                                Don’t have an account?{" "}
                                <Link href="/registration" className="text-secondary">
                                    Create an account
                                </Link>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
