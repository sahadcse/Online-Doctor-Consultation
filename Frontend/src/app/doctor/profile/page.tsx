"use client";

import { useState, useEffect } from "react";
import DoctorLayout from "@/components/DoctorLayout";
import DashboardHeroNav from "@/components/DoctorHero/DashboardHeroNav";
import { fetchProfileData } from "@/data/profileData";

interface ProfileData {
  name: string;
  email: string;
  contactInfo: {
    phone: string;
    address: string;
  };
  age: number;
  sex: string;
  role: string;
  specialization: string;
  availableSlots: string;
  availability: string;
  doctorId: string;
  authorizedOrganization: string;
}

const DoctorProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await fetchProfileData();
        setProfileData(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };

    getProfileData();
  }, []);

  if (error) {
    return <p className="text-red-500 text-center mt-4">{error}</p>;
  }

  if (!profileData) {
    return <p className="text-center mt-4">Loading...</p>;
  }

  return (
    <>
      <DoctorLayout>
        {/* Hero Card Section */}
        <DashboardHeroNav headName={`Dashboard ${profileData.role}`} />
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6 text-center">Doctor Profile</h1>
          <div className="bg-white shadow-lg rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Personal Information</h2>
              <p className="mb-1">
                <strong>Name:</strong> {profileData.name}
              </p>
              <p className="mb-1">
                <strong>Email:</strong> {profileData.email}
              </p>
              <p className="mb-1">
                <strong>Phone:</strong> {profileData.contactInfo.phone}
              </p>
              <p className="mb-1">
                <strong>Address:</strong> {profileData.contactInfo.address}
              </p>
              <p className="mb-1">
                <strong>Age:</strong> {profileData.age}
              </p>
              <p className="mb-1">
                <strong>Sex:</strong> {profileData.sex}
              </p>
            </div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Professional Information</h2>
              <p className="mb-1">
                <strong>Specialization:</strong> {profileData.specialization}
              </p>
              <p className="mb-1">
                <strong>Available Slots:</strong> {profileData.availableSlots}
              </p>
              <p className="mb-1">
                <strong>Availability:</strong> {profileData.availability}
              </p>
              <p className="mb-1">
                <strong>Doctor ID:</strong> {profileData.doctorId}
              </p>
              <p className="mb-1">
                <strong>Authorized Organization:</strong> {profileData.authorizedOrganization}
              </p>
            </div>
            <div className="flex justify-end space-x-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Edit Profile
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Profile Delete Request
              </button>
            </div>
          </div>
        </div>
      </DoctorLayout>
    </>
  );
};

export default DoctorProfilePage;
