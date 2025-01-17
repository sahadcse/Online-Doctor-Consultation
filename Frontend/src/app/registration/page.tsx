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
            <div>
                <div className="hero min-h-screen ">
                    <div className="hero-content flex-col w-full">
                        <div className="text-center">
                            <h1 className="text-2xl mt-3 font-bold">Registration</h1>
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Register as</span>
                                    </label>
                                    <select
                                        className="select select-bordered"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value as keyof typeof roleRedirects)}
                                    >
                                        <option value="">Select Role</option>
                                        <option value="patient">Patient</option>
                                        <option value="doctor">Doctor</option>
                                    </select>
                                </div>

                                {role && (
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

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Confirm Password</span>
                                            </label>
                                            <input
                                                name="confirmPassword"
                                                type="password"
                                                placeholder="confirm password"
                                                className={`input input-bordered ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'input-error' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.confirmPassword}
                                            />
                                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                                <p className="text-red-500 text-xs">{formik.errors.confirmPassword}</p>
                                            ) : null}
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Phone Number</span>
                                            </label>
                                            <input
                                                name="phone"
                                                type="text"
                                                placeholder="phone number"
                                                className={`input input-bordered ${formik.touched.phone && formik.errors.phone ? 'input-error' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.phone}
                                            />
                                            {formik.touched.phone && formik.errors.phone ? (
                                                <p className="text-red-500 text-xs">{formik.errors.phone}</p>
                                            ) : null}
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Address</span>
                                            </label>
                                            <input
                                                name="address"
                                                type="text"
                                                placeholder="address"
                                                className={`input input-bordered ${formik.touched.address && formik.errors.address ? 'input-error' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.address}
                                            />
                                            {formik.touched.address && formik.errors.address ? (
                                                <p className="text-red-500 text-xs">{formik.errors.address}</p>
                                            ) : null}
                                        </div>

                                        {role === 'doctor' && (
                                            <>
                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Specialization</span>
                                                    </label>
                                                    <input
                                                        name="specialization"
                                                        type="text"
                                                        placeholder="specialization"
                                                        className={`input input-bordered ${formik.touched.specialization && formik.errors.specialization ? 'input-error' : ''}`}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.specialization}
                                                    />
                                                    {formik.touched.specialization && formik.errors.specialization ? (
                                                        <p className="text-red-500 text-xs">{formik.errors.specialization}</p>
                                                    ) : null}
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Available Slots</span>
                                                    </label>
                                                    <input
                                                        name="availableSlots"
                                                        type="text"
                                                        placeholder="available slots"
                                                        className={`input input-bordered ${formik.touched.availableSlots && formik.errors.availableSlots ? 'input-error' : ''}`}
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
                                                    <label className="label">
                                                        <span className="label-text">Availability</span>
                                                    </label>
                                                    <select
                                                        name="availability"
                                                        className={`select select-bordered ${formik.touched.availability && formik.errors.availability ? 'select-error' : ''}`}
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
                                                    <label className="label">
                                                        <span className="label-text">Doctor ID</span>
                                                    </label>
                                                    <input
                                                        name="doctorId"
                                                        type="text"
                                                        placeholder="doctor ID"
                                                        className={`input input-bordered ${formik.touched.doctorId && formik.errors.doctorId ? 'input-error' : ''}`}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.doctorId}
                                                    />
                                                    {formik.touched.doctorId && formik.errors.doctorId ? (
                                                        <p className="text-red-500 text-xs">{formik.errors.doctorId}</p>
                                                    ) : null}
                                                </div>

                                                <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text">Authorized Organization</span>
                                                    </label>
                                                    <input
                                                        name="authorizedOrganization"
                                                        type="text"
                                                        placeholder="authorized organization"
                                                        className={`input input-bordered ${formik.touched.authorizedOrganization && formik.errors.authorizedOrganization ? 'input-error' : ''}`}
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
                                            <label className="label">
                                                <span className="label-text">Age</span>
                                            </label>
                                            <input
                                                name="age"
                                                type="number"
                                                placeholder="age"
                                                className={`input input-bordered ${formik.touched.age && formik.errors.age ? 'input-error' : ''}`}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.age}
                                            />
                                            {formik.touched.age && formik.errors.age ? (
                                                <p className="text-red-500 text-xs">{formik.errors.age}</p>
                                            ) : null}
                                        </div>

                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Sex</span>
                                            </label>
                                            <select
                                                name="sex"
                                                className={`select select-bordered ${formik.touched.sex && formik.errors.sex ? 'select-error' : ''}`}
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

                                        <div className="form-control mt-6">
                                            <button type="submit" className="btn btn-primary">
                                                Register
                                            </button>
                                        </div>
                                    </form>
                                )}

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
