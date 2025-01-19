"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { login } from '../../redux/slices/userSlice';
import Cookies from 'js-cookie';
import Navbar from "@/components/Navbar";
import Footer from '@/components/Footer';

const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    const dispatch = useDispatch();
    const [userC, setUserC] = useState('');
    const [error, setError] = useState('');

    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            password: Yup.string().required('Required'),
        }),
        onSubmit: async (values) => {
            try {
                const res = await axios.post(`${BACKEND_API_URL}/api/users/${userC}/login`, {
                    email: values.email,
                    password: values.password
                });
                dispatch(login(res.data));
                Cookies.set('token', res.data.token);
                Cookies.set('user', JSON.stringify(res.data));
                if (userC === 'doctor') {
                    router.push('/doctor/dashboard');
                } else {
                    router.push('/patient/dashboard');
                }
                console.log(res.data);
            } catch (error) {
                setError((error as any).response.data.error);
            }
        },
    });



    return (
        <div>
            <Navbar />
            <div className="hero min-h-screen">
                <div className="hero-content flex-col">
                    <div className="flex justify-center items-center">
                        {/* <h1 className="text-2xl mt-3 font-bold">Login</h1> */}
                            <label className="label">
                                <span className="text-xl">Login as:</span>
                            </label>
                            <select
                                className=" select select-bordered"
                                value={userC}
                                onChange={(e) => setUserC(e.target.value)}
                            >
                                <option value="" disabled>Select role</option>
                                <option value="doctor">Doctor</option>
                                <option value="patient">Patient</option>
                            </select>
                    </div>
                    <div className="flex-1 bg-color-primary text-center hidden lg:flex">
                        <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                            style={{backgroundImage: `url('/images/login.png')`}}>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default LoginPage;
