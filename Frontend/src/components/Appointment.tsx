"use client";

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DoctorImg from '../images/appoinment_img.png';
import Image from 'next/image';

// Sample data for dropdowns
const doctors = [
    { id: '', name: 'Select Doctor' },
    { id: '1', name: 'Dr. Wade Cooper' },
    { id: '2', name: 'Dr. Arlene Mccoy' },
];

const times = [
    { id: '', name: 'Select Time' },
    { id: '9:00 AM', name: '9:00 AM' },
    { id: '10:00 AM', name: '10:00 AM' },
];

const departments = [
    { id: '', name: 'Select Department' },
    { id: 'cardiology', name: 'Cardiology' },
    { id: 'neurology', name: 'Neurology' },
];

const validationSchema = Yup.object({
    patientName: Yup.string().required('Patient name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    doctor: Yup.string().required('Selecting a doctor is required'),
    time: Yup.string().required('Selecting a time is required'),
    department: Yup.string().required('Selecting a department is required'),
    date: Yup.date().required('Date is required'),
});

const Appointment = () => {

    return (
        <div className="relative my-5 lg:my-32 mx-auto max-w-7xl bg-[url('../images/appointment_bg.jpg')] bg-no-repeat">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-[#00a6fbde] z-0"></div>

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
                            initialValues={{
                                patientName: '',
                                email: '',
                                doctor: '',
                                time: '',
                                department: '',
                                date: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={(values) => {
                                console.log('Form data:', values);
                            }}
                        >
                            {() => (
                                <Form className="space-y-4 w-full">
                                    {/* Patient Name */}
                                    <div>
                                        <Field
                                            type="text"
                                            name="patientName"
                                            placeholder="Patient Name*"
                                            className="block w-full rounded-full border-0 py-2.5 pl-4 pr-10 text-gray-900 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
                                        />
                                        <ErrorMessage name="patientName" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="Email Address*"
                                            className="block w-full rounded-full border-0 py-2.5 pl-4 pr-10 text-gray-900 ring-1 ring-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-indigo-600"
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Doctor Dropdown */}
                                    <div>
                                        <Field
                                            as="select"
                                            name="doctor"
                                            className="block w-full rounded-full bg-white py-2.5 pl-3 pr-10 text-left shadow-sm ring-1 ring-gray-300 focus:ring-2 focus:ring-indigo-500"
                                        >
                                            {doctors.map((doc) => (
                                                <option key={doc.id} value={doc.id}>
                                                    {doc.name}
                                                </option>
                                            ))}
                                        </Field>
                                        <ErrorMessage name="doctor" component="div" className="text-red-500 text-sm" />
                                    </div>

                                    {/* Time Dropdown */}
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
                                        <button type="submit" className="btn rounded-full bg-white text-black text-base mt-4  lg:w-72">
                                            Apply Now
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
