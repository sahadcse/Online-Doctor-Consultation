"use client";

import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";

const ServiceList = () => {
  // Fake data for demonstration
  const [services, setServices] = useState([
    {
      id: "1",
      title: "General Checkup",
      description: "Comprehensive health checkup and diagnosis.",
      price: "50",
      image: "https://via.placeholder.com/150", // Placeholder image
    },
    {
      id: "2",
      title: "Dental Cleaning",
      description: "Professional dental cleaning to maintain oral hygiene.",
      price: "100",
      image: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      title: "Eye Consultation",
      description: "Specialized consultation for eye-related issues.",
      price: "75",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const handleEdit = (serviceId) => {
    console.log("Edit service ID:", serviceId);
    // Add logic for navigating to the edit form or opening an edit modal
  };

  const handleDelete = (serviceId) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((service) => service.id !== serviceId));
      alert("Service deleted successfully!");
    }
  };

  return (
    <AdminLayout>
      <div className="p-5">
        <h1 className="text-center text-3xl my-5 font-work-sans font-bold">Manage Services</h1>
        {services.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 shadow-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-4 py-2 text-left">#</th>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-center">Image</th>
                  <th className="px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service, index) => (
                  <tr key={service.id} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{service.title}</td>
                    <td className="px-4 py-2 truncate max-w-sm">{service.description}</td>
                    <td className="px-4 py-2">${service.price}</td>
                    <td className="px-4 py-2 text-center">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-12 h-12 rounded object-cover mx-auto"
                      />
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleEdit(service.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-lg">No services available.</p>
        )}
      </div>
    </AdminLayout>
  );
};

export default ServiceList;
