"use client";

import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import DoctorImg from '../images/appoinment_img.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { authHeader } from '@/utils';

// Sample data for dropdowns

const times = [
    { id: '', name: 'Select Time' },
    { id: '9:00 AM', name: '9:00 AM' },
    { id: '10:00 AM', name: '10:00 AM' },
];

const consultation_type = [
    { id: '', value: 'Select Time' },
    { id: '1', value: 'Video' },
];

const departments = [
    { id: '', name: 'Select Department' },
    { id: 'cardiology', name: 'Cardiology' },
    { id: 'neurology', name: 'Neurology' },
];

const Appointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    console.log(selectedDoctor)
    useEffect(() => {
        const baseURL = process.env.NEXT_PUBLIC_API_URL;
        const fetchDoctors = async () => {
            try {
                const response = await axios.get(`${baseURL}/api/admins/admin/doctors/all`, {
                    headers: authHeader(),
                });
                setDoctors(response.data);
            } catch (err) {
                console.error('Error fetching doctors:', err);
            }
        };

        fetchDoctors();
    }, []);


    const handleChange = (e) => {
        const selectedDoctorId = e.target.value;
        const selectedDoctor = doctors.find((doc) => doc._id === selectedDoctorId);
        setSelectedDoctor(selectedDoctor);

    };



    // Define the initial values
    const initialValues = {
        doctor: null,
        consultation_type: '',
        email: '',
        password: '',
    };

    // Define the validation schema
    const validationSchema = Yup.object({
        doctor: Yup.string().required('Doctor is required'),
        consultation_type: Yup.object().required('Consultation Type is required'),
        // time: Yup.string().required('Time is required'),
        // department: Yup.string().required('Department is required'),
        // date: Yup.string().required('Date is required'),
    });

    // Handle form submission
    const handleSubmit = (values, { resetForm }) => {
        console.log('Form Data:', values);
        // Make API call or handle form data here
        resetForm(); // Optionally reset the form after submission
    };

    return (
        <div className="relative my-5 lg:my-32 mx-auto max-w-7xl bg-[url('../images/appointment_bg.jpg')] bg-no-repeat">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-[#08595a]/75 z-0"></div>

            {/* Content section */}
            <div className="relative flex flex-col items-center">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-8 w-full lg:w-3/4">
                    <div className="w-full lg:w-1/2 py-24 p-10 flex flex-col items-center">
                        <div className="text-center mb-8">
                            <p className="text-white text-xl font-bold">| Appointment</p>
                            <h1 className="text-white text-3xl lg:text-4xl font-semibold">Apply For Free Now</h1>
                        </div>

                        {/* Formik Form */}
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting }) => (
                                <Form className="space-y-4 w-full">
                                    <div>
                                        <Field
                                            as="select"
                                            id="doctor"
                                            name="doctor"
                                            className="block w-full rounded-full bg-white py-2.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
                                            onChange={handleChange} // You can still use handleChange to log and update the form field
                                        >
                                            {doctors.map((doc) => (
                                                <option key={doc._id} value={doc._id}>  {/* Use doc._id instead of the entire object */}
                                                    {doc.full_name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="doctor" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <div>
                                        <Field
                                            as="select"
                                            name="time"
                                            className="block w-full rounded-full bg-white py-2.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
                                        >
                                            {times.map((time) => (
                                                <option key={time.id} value={time.id}>
                                                    {time.name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="time" component="div" className="text-red-500 text-sm" />
                                    </div>
                                    <div>
                                        <Field
                                            as="select"
                                            id="consultation_type"
                                            name="consultation_type"
                                            className="block w-full rounded-full bg-white py-2.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
                                        >
                                            {consultation_type.map((item) => (
                                                <option key={item.id} value={item.value}>
                                                    {item.value}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="time" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Department Dropdown */}
                                    <div>
                                        <Field
                                            as="select"
                                            name="department"
                                            className="block w-full rounded-full bg-white py-2.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
                                        >
                                            {departments.map((dept) => (
                                                <option key={dept.id} value={dept.id}>
                                                    {dept.name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="department" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <Field
                                            type="date"
                                            name="date"
                                            className="block w-full rounded-full border-0 py-2.5 pl-4 pr-10 text-gray-900 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
                                        />
                                        <ErrorMessage name="date" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    <div className='text-center'>
                                        <button type="submit" className="btn rounded-full bg-white text-black text-base mt-4  lg:w-72" disabled={isSubmitting}>
                                            {isSubmitting ? 'Submitting...' : 'Submit'}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    {/* Image Section */}
                    <div className="hidden lg:block w-full lg:w-1/2 flex items-center justify-center lg:justify-end relative">
                        <Image src={DoctorImg} alt="Doctor" className="max-w-full h-auto" style={{ position: "absolute", top: "-2", bottom: "0" }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Appointment;
