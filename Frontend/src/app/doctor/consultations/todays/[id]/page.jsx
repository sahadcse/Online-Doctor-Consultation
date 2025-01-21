"use client";

import { useEffect, useState } from "react";
import DoctorLayout from "@/components/DoctorLayout";
import DashboardHeroNav from "@/components/DoctorHero/DashboardHeroNav";
import { authHeader } from "@/utils";
import { FaEye } from "react-icons/fa";
import withAuth from "@/common/WithAuth";
import { useParams } from "next/navigation";

const ConsultationsDetails = () => {
    const [consultations, setConsultations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedConsultation, setSelectedConsultation] = useState(null);
    const params = useParams();

    const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

    useEffect(() => {
        const fetchConsultations = async () => {
            try {
                const response = await fetch(
                    `${BACKEND_API_URL}/api/users/doctor/consultations/${params?.id}`,
                    {
                        headers: authHeader(),
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch consultations");
                }
                const data = await response.json();
                setConsultations([data]);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchConsultations();
    }, [params?.id]);

    const handleStartConsultation = (consultation) => {
        setSelectedConsultation(consultation);
    };

    if (loading) {
        return (
            <DoctorLayout>
                <DashboardHeroNav headName="Consultations" />
                <div className="p-6 flex justify-center items-center">Loading consultations...</div>
            </DoctorLayout>
        );
    }

    if (error) {
        return (
            <DoctorLayout>
                <DashboardHeroNav headName="Consultations" />
                <div className="p-6 text-red-500">Error: {error}</div>
            </DoctorLayout>
        );
    }

    
    return (
        <DoctorLayout>
            <DashboardHeroNav headName="Consultations" />
            <div className="p-6 bg-gray-100 min-h-screen">
                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                    <section className="bg-white p-6 rounded-lg shadow w-full">
                        <h2 className="text-xl font-medium mb-4">
                            Today's Consultations ({consultations.length})
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full table-auto border-collapse border border-gray-200">
                                <thead className="bg-blue-400">
                                    <tr>
                                        <th className="px-4 py-2 border">Patient ID</th>
                                        <th className="px-4 py-2 border">Date</th>
                                        <th className="px-4 py-2 border">Time</th>
                                        <th className="px-4 py-2 border">Issues</th>
                                        <th className="px-4 py-2 border">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {consultations.map((consultation) => (
                                        <tr key={consultation._id} className="hover:bg-gray-50 text-center">
                                            <td className="px-4 py-2 border">{consultation.patient_id}</td>
                                            <td className="px-4 py-2 border">
                                                {new Date(consultation.consultation_date).toLocaleDateString()}
                                            </td>
                                            <td className="px-4 py-2 border">{consultation.start_time}</td>
                                            <td className="px-4 py-2 border">{consultation.issues}</td>
                                            <td className="px-4 py-2 border">
                                                <button
                                                    onClick={() => handleStartConsultation(consultation)}
                                                    className="text-blue-500 hover:underline flex items-center"
                                                >
                                                    Start Now
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    {selectedConsultation && (
                        <section className="bg-white p-6 rounded-lg shadow mt-6">
                            <h2 className="text-xl font-medium mb-4">
                                Video Consultation: {selectedConsultation.patient_id}
                            </h2>
                            <p className="mb-4">
                                <strong>Issues:</strong> {selectedConsultation.issues}
                            </p>
                            <a
                                href={`https://meet.google.com/cve-rezn-ucr`} // Replace with your dynamic Meet link
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                            >
                                Join Google Meet
                            </a>
                        </section>
                    )}
                </div>
            </div>
        </DoctorLayout>
    );
};

export default withAuth(ConsultationsDetails, ["doctor"]);
