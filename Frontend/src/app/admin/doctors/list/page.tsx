"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([
        {
            _id: "1",
            name: "Dr. Alice Johnson",
            email: "alice.johnson@example.com",
            role: "doctor",
            specialization: "Cardiologist",
            availability: "Monday-Friday, 9AM-5PM",
            contactInfo: {
                phone: "123-456-7890",
                address: "123 Main Street, Cityville",
            },
            profilePicture: "https://via.placeholder.com/100",
        },
        {
            _id: "2",
            name: "Dr. Bob Smith",
            email: "bob.smith@example.com",
            role: "doctor",
            specialization: "Dermatologist",
            availability: "Monday-Wednesday, 10AM-3PM",
            contactInfo: {
                phone: "987-654-3210",
                address: "456 Elm Street, Townsville",
            },
            profilePicture: "https://via.placeholder.com/100",
        },
    ]);

    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const handleView = (doctor) => {
        setSelectedDoctor(doctor);
    };

    const closeModal = () => {
        setSelectedDoctor(null);
    };

    const handleEdit = (doctor) => {
        alert(`Editing doctor: ${doctor.name}`);
        // Navigate to the edit form or implement the edit functionality here
    };

    const handleDelete = (doctorId) => {
        const confirm = window.confirm("Are you sure you want to delete this doctor?");
        if (confirm) {
            setDoctors(doctors.filter((doc) => doc._id !== doctorId));
            alert("Doctor deleted successfully.");
        }
    };

    return (
        <AdminLayout>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4 text-center">All Doctors</h1>

                {/* Desktop View */}
                <div className="hidden md:block">
                    <table className="table-auto w-full border border-gray-300">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2 border">Profile</th>
                                <th className="px-4 py-2 border">Name</th>
                                <th className="px-4 py-2 border">Email</th>
                                <th className="px-4 py-2 border">Specialization</th>
                                <th className="px-4 py-2 border">Availability</th>
                                <th className="px-4 py-2 border">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor) => (
                                <tr key={doctor._id} className="text-center">
                                    <td className="px-4 py-2 border">
                                        <img
                                            src={doctor.profilePicture}
                                            alt={doctor.name}
                                            className="w-16 h-16 rounded-full object-cover mx-auto"
                                        />
                                    </td>
                                    <td className="px-4 py-2 border">{doctor.name}</td>
                                    <td className="px-4 py-2 border">{doctor.email}</td>
                                    <td className="px-4 py-2 border">{doctor.specialization}</td>
                                    <td className="px-4 py-2 border">{doctor.availability}</td>
                                    <td className="px-4 py-2 border">
                                        <button
                                            className="btn btn-info m-1"
                                            onClick={() => handleView(doctor)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-primary m-1"
                                            onClick={() => handleEdit(doctor)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger m-1"
                                            onClick={() => handleDelete(doctor._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile View */}
                <div className="md:hidden">
                    {doctors.map((doctor) => (
                        <div
                            key={doctor._id}
                            className="border border-gray-300 rounded-lg p-4 mb-4 shadow-md"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <img
                                    src={doctor.profilePicture}
                                    alt={doctor.name}
                                    className="w-16 h-16 rounded-full object-cover"
                                />
                                <div>
                                    <h2 className="text-lg font-bold">{doctor.name}</h2>
                                    <p className="text-gray-600">{doctor.email}</p>
                                </div>
                            </div>
                            <p>
                                <strong>Specialization:</strong> {doctor.specialization}
                            </p>
                            <p>
                                <strong>Availability:</strong> {doctor.availability}
                            </p>
                            <div className="flex space-x-2 mt-4">
                                <button
                                    className="btn btn-info flex-1"
                                    onClick={() => handleView(doctor)}
                                >
                                    View
                                </button>
                                <button
                                    className="btn btn-primary flex-1"
                                    onClick={() => handleEdit(doctor)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger flex-1"
                                    onClick={() => handleDelete(doctor._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Modal for Doctor Details */}
                {selectedDoctor && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                        <div className="bg-white w-11/12 md:w-1/2 p-6 rounded-lg shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold">{selectedDoctor.name}</h2>
                                <button
                                    className="text-gray-500 hover:text-gray-800"
                                    onClick={closeModal}
                                >
                                    ✖
                                </button>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                                <img
                                    src={selectedDoctor.profilePicture}
                                    alt={selectedDoctor.name}
                                    className="w-24 h-24 rounded-full object-cover"
                                />
                                <div>
                                    <p>
                                        <strong>Email:</strong> {selectedDoctor.email}
                                    </p>
                                    <p>
                                        <strong>Specialization:</strong>{" "}
                                        {selectedDoctor.specialization}
                                    </p>
                                    <p>
                                        <strong>Availability:</strong> {selectedDoctor.availability}
                                    </p>
                                    <p>
                                        <strong>Phone:</strong> {selectedDoctor.contactInfo.phone}
                                    </p>
                                    <p>
                                        <strong>Address:</strong> {selectedDoctor.contactInfo.address}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="btn btn-primary w-full mt-6"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default DoctorList;
