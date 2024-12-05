"use client";

import { useState } from "react";
import Image from "next/image";
import { FaEdit, FaTrash } from "react-icons/fa";
import AdminLayout from "@/components/AdminLayout";

const AppointmentList = () => {
  // Fake data for appointments (to simulate API response)
  const [appointments, setAppointments] = useState([
    {
      id: "1",
      patientName: "John Doe",
      email: "john.doe@example.com",
      doctor: "Dr. Wade Cooper",
      department: "Cardiology",
      time: "9:00 AM",
      date: "2024-12-05",
    },
    {
      id: "2",
      patientName: "Jane Smith",
      email: "jane.smith@example.com",
      doctor: "Dr. Arlene Mccoy",
      department: "Neurology",
      time: "10:00 AM",
      date: "2024-12-06",
    },
    {
      id: "3",
      patientName: "Sarah Lee",
      email: "sarah.lee@example.com",
      doctor: "Dr. Wade Cooper",
      department: "Cardiology",
      time: "11:00 AM",
      date: "2024-12-07",
    },
  ]);

  const handleEdit = (appointmentId) => {
    console.log("Edit appointment ID:", appointmentId);
    // Add logic for editing the appointment
  };

  const handleDelete = (appointmentId) => {
    if (confirm("Are you sure you want to delete this appointment?")) {
      setAppointments(appointments.filter((app) => app.id !== appointmentId));
      alert("Appointment deleted successfully!");
    }
  };

  return (
    <AdminLayout>
        <div className="p-5">
      <h1 className="text-center text-3xl my-5 font-bold">Manage Appointments</h1>
      {appointments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">#</th>
                <th className="px-4 py-2 text-left">Patient Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Doctor</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Time</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={appointment.id} className="border-t">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{appointment.patientName}</td>
                  <td className="px-4 py-2">{appointment.email}</td>
                  <td className="px-4 py-2">{appointment.doctor}</td>
                  <td className="px-4 py-2">{appointment.department}</td>
                  <td className="px-4 py-2">{appointment.time}</td>
                  <td className="px-4 py-2">{appointment.date}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => handleEdit(appointment.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(appointment.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-lg">No appointments available.</p>
      )}
    </div>
    </AdminLayout>

  );
};

export default AppointmentList;
