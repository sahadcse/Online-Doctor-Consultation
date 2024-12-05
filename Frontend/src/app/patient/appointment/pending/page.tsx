"use client";

import { useState } from "react";
import { format } from "date-fns"; // For better date formatting
import PatientLayout from "@/components/PatientLayout";

const PatientAppointmentDetail = () => {
  // Fake appointment data
  const [appointment] = useState({
    id: "1",
    doctor: "Dr. Wade Cooper",
    department: "Cardiology",
    time: "9:00 AM",
    date: "2024-12-05",
    patientName: "John Doe",
    status: "Upcoming",
    patientEmail: "john.doe@example.com",
    patientPhone: "+123 456 7890",
    meetingLink: "https://example.com/join-appointment", // Fake meeting link
  });

  const formattedDate = format(new Date(appointment.date), "MMMM dd, yyyy");

  return (
   <PatientLayout>
     <div className="container mx-auto p-5">
      <h1 className="text-center text-3xl my-5 font-bold">Appointment Details</h1>

      {/* Appointment Details Card */}
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-3">Appointment Information</h2>

        <div className="space-y-4">
          {/* Doctor's Information */}
          <div className="flex justify-between">
            <p className="font-semibold text-lg">Doctor:</p>
            <p>{appointment.doctor}</p>
          </div>

          {/* Department Information */}
          <div className="flex justify-between">
            <p className="font-semibold text-lg">Department:</p>
            <p>{appointment.department}</p>
          </div>

          {/* Time & Date Information */}
          <div className="flex justify-between">
            <p className="font-semibold text-lg">Scheduled Time:</p>
            <p>
              {appointment.time} - {formattedDate}
            </p>
          </div>

          {/* Patient Information */}
          <div className="flex justify-between">
            <p className="font-semibold text-lg">Patient Name:</p>
            <p>{appointment.patientName}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-lg">Email:</p>
            <p>{appointment.patientEmail}</p>
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-lg">Phone:</p>
            <p>{appointment.patientPhone}</p>
          </div>

          {/* Appointment Status */}
          <div className="flex justify-between">
            <p className="font-semibold text-lg">Status:</p>
            <span
              className={`px-3 py-1 rounded-full ${
                appointment.status === "Upcoming"
                  ? "bg-green-200 text-green-800"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {appointment.status}
            </span>
          </div>

          {/* Meeting Link and Join Button (Online Consultation) */}
          {appointment.status === "Upcoming" && (
            <div className="flex justify-between">
              <p className="font-semibold text-lg">Join Online Appointment:</p>
              <a
                href={appointment.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Join Now
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Appointment Button */}
      <div className="mt-6 text-center">
        <button
          className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600"
          onClick={() => console.log("Cancel Appointment")}
        >
          Cancel Appointment
        </button>
      </div>
    </div>
   </PatientLayout>
  );
};

export default PatientAppointmentDetail;
