"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns"; // To format dates
import PatientLayout from "@/components/PatientLayout";

// Fake data to simulate API response for previous appointments and prescriptions
const mockData = [
  {
    id: "1",
    doctor: "Dr. Jane Smith",
    department: "Dermatology",
    date: "2024-10-10",
    time: "10:00 AM",
    status: "Completed",
    prescription: "/path-to-prescription1.pdf", // Prescription file link
  },
  {
    id: "2",
    doctor: "Dr. Alan Brown",
    department: "Cardiology",
    date: "2024-09-25",
    time: "2:00 PM",
    status: "Completed",
    prescription: "/path-to-prescription2.pdf",
  },
  {
    id: "3",
    doctor: "Dr. Maria Lee",
    department: "Neurology",
    date: "2024-08-15",
    time: "11:30 AM",
    status: "Completed",
    prescription: "/path-to-prescription3.pdf",
  },
];

const PatientAppointmentHistory = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // Simulating fetching appointments data from API
    setAppointments(mockData);
  }, []);

  const downloadPrescription = (url) => {
    // Trigger the download of the prescription PDF
    window.open(url, "_blank");
  };

  return (
   <PatientLayout> <div className="container mx-auto p-5">
   <h1 className="text-center text-3xl my-5 font-bold">Your Appointment History</h1>

   <div className="space-y-6">
     {appointments.length === 0 ? (
       <p className="text-center text-lg">No previous appointments found.</p>
     ) : (
       appointments.map((appointment) => (
         <div
           key={appointment.id}
           className="bg-white p-6 rounded shadow-lg flex flex-col space-y-4"
         >
           {/* Appointment Details */}
           <h2 className="text-xl font-semibold">{appointment.doctor}</h2>
           <p className="text-lg text-gray-500">{appointment.department}</p>

           <div className="flex justify-between">
             <p className="font-semibold">Date & Time:</p>
             <p>
               {format(new Date(appointment.date), "MMMM dd, yyyy")} at {appointment.time}
             </p>
           </div>

           <div className="flex justify-between">
             <p className="font-semibold">Status:</p>
             <span
               className={`px-3 py-1 rounded-full ${
                 appointment.status === "Completed"
                   ? "bg-green-200 text-green-800"
                   : "bg-gray-200 text-gray-800"
               }`}
             >
               {appointment.status}
             </span>
           </div>

           {/* Prescription Download */}
           {appointment.prescription && (
             <div className="flex justify-between">
               <p className="font-semibold">Prescription:</p>
               <button
                 onClick={() => downloadPrescription(appointment.prescription)}
                 className="text-blue-500 hover:underline"
               >
                 Download Prescription
               </button>
             </div>
           )}
         </div>
       ))
     )}
   </div>
 </div></PatientLayout>
  );
};

export default PatientAppointmentHistory;
