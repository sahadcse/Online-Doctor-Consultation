"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import PatientLayout from "@/components/Patient/PatientLayout";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

const PatientDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [consultations, setConsultations] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("token");

        const appointmentsResponse = await axios.get(
          `${baseURL}/api/users/patient/appointments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAppointments(appointmentsResponse.data);

        const consultationsResponse = await axios.get(
          `${baseURL}/api/users/patient/consultations`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (consultationsResponse.data.length > 0) {
          setConsultations(consultationsResponse.data);
        }

        const doctorsResponse = await axios.get(
          `${baseURL}/api/users/patient/doctors`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctors(doctorsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <PatientLayout>
        <h2 className="text-2xl font-semibold mb-5">
          Welcome to the Patient Dashboard
        </h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold">Appointments</h3>
            <p className="text-2xl">{appointments.length}</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold">Consultations</h3>
            <p className="text-2xl">{consultations.length}</p>
          </div>
          <div className="p-4 bg-white shadow rounded">
            <h3 className="text-xl font-semibold">Doctors</h3>
            <p className="text-2xl">{doctors.length}</p>
          </div>
        </div>
      </PatientLayout>
    </>
  );
};

export default PatientDashboard;
