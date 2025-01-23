"use client";
import { useEffect, useState } from "react";
import DoctorLayout from "@/components/DoctorLayout";
import DashboardHeroNav from "@/components/DoctorHero/DashboardHeroNav";
import { authHeader } from "@/utils";
import { FaCheckCircle, FaTimesCircle, FaEye } from "react-icons/fa"; // React Icons
import Swal from "sweetalert2"; // SweetAlert2
import withAuth from "@/common/WithAuth";

const AppointmentsDoc = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const BACKEND_API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(`${BACKEND_API_URL}/api/users/doctor/appointments`, {
          headers: authHeader(),
        });
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        const data = await response.json();
        const filterData = data.filter((appointment) => {
          const today = new Date();
          const appointmentDate = new Date(appointment.appointment.appointment_date);
          return today.toDateString() === appointmentDate.toDateString();
        });
        setAppointments(filterData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleApprove = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to confirm this appointment!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, confirm it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${BACKEND_API_URL}/api/users/doctor/appointments/${selectedAppointment._id}/confirm`, {
            method: "PUT",
            headers: {
              ...authHeader(),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "Confirmed",
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to approve the appointment");
          }

          const updatedAppointments = appointments.map((appointment) =>
            appointment._id === selectedAppointment._id
              ? { ...appointment, status: "Confirmed" }
              : appointment
          );
          setAppointments(updatedAppointments);
          setIsModalOpen(false);

          Swal.fire({
            title: "Confirmed!",
            text: "Appointment has been confirmed.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (err) {
          setError(err.message);
          Swal.fire({
            title: "Error",
            text: `Failed to confirm the appointment: ${err.message}`,
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      }
    })
  };

  const handleCancel = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`${BACKEND_API_URL}/api/users/doctor/appointments/${selectedAppointment._id}/cancel`, {
            method: "PUT",
            headers: {
              ...authHeader(),
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: "Cancelled",
            }),
          });

          if (!response.ok) {
            throw new Error("Failed to cancel the appointment");
          }

          const updatedAppointments = appointments.map((appointment) =>
            appointment._id === selectedAppointment._id
              ? { ...appointment, status: "Cancelled" }
              : appointment
          );
          setAppointments(updatedAppointments);
          setIsModalOpen(false);

          Swal.fire({
            title: "Cancelled!",
            text: "Appointment has been cancelled.",
            icon: "success",
            confirmButtonText: "OK",
          });
        } catch (err) {
          setError(err.message);
          Swal.fire({
            title: "Error",
            text: `Failed to cancel the appointment: ${err.message}`,
            icon: "error",
            confirmButtonText: "Try Again",
          });
        }
      }
    })
  };

  if (loading) {
    return (
      <DoctorLayout>
        <DashboardHeroNav headName="Appointments" />
        <div className="p-6 flex justify-center items-center">Loading appointments...</div>
      </DoctorLayout>
    );
  }

  if (error) {
    return (
      <DoctorLayout>
        <DashboardHeroNav headName="Appointments" />
        <div className="p-6 text-red-500">Error: {error}</div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <DashboardHeroNav headName="Appointments" />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <section className="bg-white p-6 rounded-lg shadow w-full">
            <h2 className="text-xl font-medium mb-4">
              Today's Appointments ({appointments.length})
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead className="bg-blue-400">
                  <tr>
                    <th className="px-4 py-2 border">Patient ID</th>
                    <th className="px-4 py-2 border">Time</th>
                    <th className="px-4 py-2 border">Type</th>
                    <th className="px-4 py-2 border">Status</th>
                    <th className="px-4 py-2 border">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border">{appointment.appointment.full_name
                      }</td>
                      <td className="px-4 py-2 border">{appointment.start_time}</td>
                      <td className="px-4 py-2 border">{appointment.consultation_type}</td>
                      <td className="px-4 py-2 border">
                        <span
                          className={`px-2 py-1 rounded-full text-sm ${appointment.status === "Pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : appointment.status === "Confirmed"
                              ? "bg-green-200 text-green-800"
                              : "bg-red-200 text-gray-800"
                            }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-4 py-2 border">
                        <button
                          onClick={() => handleViewDetails(appointment)}
                          className="text-blue-500 hover:underline flex items-center"
                        >
                          <FaEye className="mr-2" /> View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-w-xl transition-transform transform scale-100 opacity-100 animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Appointment Details</h2>

            <div className="space-y-4 text-gray-700">
              <div className="flex justify-between">
                <span className="font-medium">Patient ID:</span>
                <span>{selectedAppointment.patient_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Date:</span>
                <span>{new Date(selectedAppointment.appointment_date).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Time:</span>
                <span>{selectedAppointment.start_time}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Consultation Type:</span>
                <span>{selectedAppointment.consultation_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Reason for Visit:</span>
                <span>{selectedAppointment.reason_for_visit}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Status:</span>
                <span>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${selectedAppointment.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : selectedAppointment.status === "Confirmed"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-gray-800"
                      }`}
                  >
                    {selectedAppointment.status}
                  </span>
                </span>
              </div>
            </div>

            {/* Actions for Pending status */}
            {selectedAppointment.status === "Pending" && (
              <div className="mt-6 flex justify-between">
                <button
                  onClick={handleApprove}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 flex items-center"
                >
                  <FaCheckCircle className="mr-2" /> Confirm
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 flex items-center"
                >
                  <FaTimesCircle className="mr-2" /> Cancel
                </button>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="bg-blue-400 text-white px-6 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </DoctorLayout>
  );
};

export default withAuth(AppointmentsDoc, ['doctor']);
