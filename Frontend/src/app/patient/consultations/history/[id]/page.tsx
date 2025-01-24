"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import PatientLayout from "@/components/Patient/PatientLayout";
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

interface Consultation {
  id: number;
  title: string;
  date: string;
  description: string;
  status: string;
  consultation_fee: number;
  payment_status: string;
  issues: string;
  consultation_date: string;
  start_time: string;
}

interface Doctor {
  full_name: string;
  specialization: string;
  email: string;
  profile_picture_url: string;
  // Add other relevant fields
}

const ConsultationDetailsPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id; // Ensure id is correctly extracted
  const [consultation, setConsultation] = useState<Consultation | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [doctor, setDoctor] = useState<Doctor | null>(null);

  useEffect(() => {
    const fetchConsultation = async () => {
      if (!id) return; // Ensure id is defined before making the request
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${baseURL}/api/users/patient/consultations/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setConsultation(response.data);

        // Fetch doctor details using appointment id
        const appointmentId = response.data.appointment_id;
        if (appointmentId) {
          const doctorResponse = await axios.get(
            `${baseURL}/api/users/patient/appointments/${appointmentId}/doctor`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDoctor(doctorResponse.data);
        }
      } catch (error) {
        console.error("Error fetching consultation or doctor details:", error);
      }
    };

    fetchConsultation();
  }, [id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (consultation && files.length > 0) {
      const formData = new FormData();
      files.forEach((file) => formData.append("medical_reports", file));

      try {
        const token = Cookies.get("token");
        await axios.post(
          `${baseURL}/api/users/patient/consultations/${id}/files`, // Ensure id is used here
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        alert("Files uploaded successfully");
      } catch (error) {
        console.error("Error uploading files:", error);
      }
    }
  };

  const handleDownloadPrescription = async () => {
    if (consultation) {
      try {
        const token = Cookies.get("token");
        const response = await axios.get(
          `${baseURL}/api/users/patient/consultations/${consultation.id}/prescription`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "prescription.pdf");
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error("Error downloading prescription:", error);
      }
    }
  };

  return (
    <PatientLayout>
      <div className="bg-gray-50 min-h-screen">
        {/* Go Back Button */}
        <div className="p-4 flex justify-between items-center">
          <button
            className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
            onClick={() => router.push("/patient/consultations/history")}
          >
            Go Back 
          </button>
          <button
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            onClick={() => router.push(`/patient/consultations/start/${id}`)}
          >
            Start Consultation
          </button>
          {/* Action Buttons */}
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            onClick={handleDownloadPrescription}
          >
            Download Prescription
          </button>
        </div>

        {/* Container */}
        <div className="container mx-auto p-6">
          {consultation ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex">
                {/* Consultation Details */}
                <div className="w-1/2">
                  <h2 className="text-xl font-bold mb-4 text-gray-800">
                    Consultation Details
                  </h2>

                  <p className="mb-2">
                    <span className="font-semibold">Status:</span>{" "}
                    {consultation.status}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Consultation Fee:</span> $
                    {consultation.consultation_fee}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Payment Status:</span>{" "}
                    {consultation.payment_status}
                  </p>
                  <p className="mb-2">
                    <span className="font-semibold">Issues:</span>{" "}
                    {consultation.issues}
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold">Consultation Date:</span>{" "}
                    {new Date(
                      consultation.consultation_date
                    ).toLocaleDateString()}
                  </p>
                  <p className="mb-4">
                    <span className="font-semibold">Start Time:</span>{" "}
                    {consultation.start_time}
                  </p>
                </div>

                <div className="">
                  {/* Doctor Details */}
                  {doctor && (
                    <div className="">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">
                        Doctor Details
                      </h3>
                      <img
                        src={doctor.profile_picture_url}
                        alt="Doctor's Photo"
                        className="w-32 h-32 rounded-full mb-4"
                      />
                      <p className="mb-2">
                        <span className="font-semibold">Name:</span>{" "}
                        {doctor.full_name}
                      </p>
                      <p className="mb-2">
                        <span className="font-semibold">Specialization:</span>{" "}
                        {doctor.specialization}
                      </p>
                      <p className="mb-4">
                        <span className="font-semibold">Contact:</span>{" "}
                        {doctor.email}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* File Upload */}
              <div className="mt-4">
                <div className="">
                  {/* <label className=" text-sm font-medium text-gray-700 mb-2">
                    Upload Medical Reports
                  </label> */}
                  <input
                    type="file"
                    multiple
                    className="w-52 text-sm text-gray-800 border border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500"
                    onChange={handleFileChange}
                  />
                </div>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mt-4 transition"
                  onClick={handleUpload}
                >
                  Upload Medical Reports
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-center text-lg">Loading...</p>
          )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default ConsultationDetailsPage;
