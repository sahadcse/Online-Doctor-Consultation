"use client";

import { useState, useEffect } from "react";
import { FaPhoneAlt, FaEnvelope, FaUserEdit, FaRegIdCard, FaAward } from 'react-icons/fa';
import { MdLanguage } from 'react-icons/md';
import { BiCalendar, BiTimeFive } from 'react-icons/bi';
import DoctorLayout from "@/components/DoctorLayout";
import DashboardHeroNav from "@/components/DoctorHero/DashboardHeroNav";
import { DoctorProfileData } from "@/data/doctorProfileData";
import useUserData from "@/hooks/useUserData";

interface ProfileData {
  _id: string;
  full_name: string;  // Renamed from "name" to "full_name"
  email: string;
  contactInfo: {
    phone_number: string;
    address: string;  // Merged address fields from "hospital_affiliations" for simplicity
  };
  age: number;  // Calculated from the "date_of_birth"
  gender: string;  // Renamed from "gender" to "sex"
  role: string;
  specialization: string;
  qualifications: string[];  // Added qualification array
  experience_years: number;  // Added years of experience
  license_number: string;
  bio: string;
  consultation_fee: number;
  availability: {
    day: string;
    time_slots: string[];  // Added time slots for availability
  }[];
  languages_spoken: string[];
  hospital_affiliations: {
    address: {
      street: string;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    name: string;
  }[];
  awards_and_recognitions: string[];
  status: string;  // Added doctor status (e.g., "active")
  ratings: {
    average_rating: number;
    total_reviews: number;
  };
  created_at: string;
  updated_at: string;
  verification_status: boolean;  // Added verification status
  identity_verified: boolean;
  two_factor_enabled: boolean;
  consent_form_signed: boolean;
  terms_accepted: boolean;
  date_of_birth: string;
  social_links: {
    linkedin: string;
    twitter: string;
  };
  chat_enabled: boolean;
  calendar_sync_enabled: boolean;
  video_call_link: object;
  documents: string[];  // Added documents array
  notifications_enabled: boolean;
}


const DoctorProfilePage = () => {
  const user = useUserData();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const getProfileData = async () => {
      try {
        const data = await DoctorProfileData(user?._id);
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
        <DashboardHeroNav headName={`Dashboard ${profileData.role}`} />
        <div className="bg-gray-100">
          <div className="container mx-auto py-8">
            <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
              {/* Left Sidebar */}
              <div className="col-span-4 sm:col-span-3">
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex flex-col items-center">
                    <img
                      src="https://randomuser.me/api/portraits/men/94.jpg"
                      alt="Doctor Profile"
                      className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                    />
                    <h1 className="text-xl font-bold">{profileData.full_name}</h1>
                    <p className="text-gray-700">{profileData.specialization}</p>
                    <div className="mt-6 flex flex-wrap gap-4 justify-center">
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                        <FaPhoneAlt className="inline mr-2" /> Contact
                      </button>
                      <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">
                        <FaUserEdit className="inline mr-2" /> Update
                      </button>
                    </div>
                  </div>
                  <hr className="my-6 border-t border-gray-300" />
                  <div className="flex flex-col">
                    <span className="text-gray-700 uppercase font-bold tracking-wider mb-2">
                      Qualifications
                    </span>
                    <ul>
                      {profileData.qualifications.map((qualification, index) => (
                        <li key={index} className="mb-2">{qualification}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="col-span-4 sm:col-span-9">
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-bold mb-4">About Me</h2>
                  <p className="text-gray-700 mb-4">
                    {profileData.bio || "A dedicated medical professional with years of experience in providing high-quality healthcare. Passionate about helping patients achieve their health goals."}
                  </p>

                  <h2 className="text-xl font-bold mb-4">Details</h2>
                  <table className="min-w-full table-auto border-collapse">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Email:</td>
                        <td className="border px-4 py-2">
                          <FaEnvelope className="inline mr-2" /> {profileData.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Phone Number:</td>
                        {/* <td className="border px-4 py-2">
                          <FaPhoneAlt className="inline mr-2" /> {profileData.phone_number}
                        </td> */}
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Age:</td>
                        <td className="border px-4 py-2">
                          {new Date(profileData.date_of_birth).getFullYear()} - {new Date().getFullYear()} years
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Gender:</td>
                        <td className="border px-4 py-2">{profileData.gender}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Doctor ID:</td>
                        <td className="border px-4 py-2">
                          <FaRegIdCard className="inline mr-2" /> {profileData._id}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Availability:</td>
                        <td className="border px-4 py-2">
                          {profileData.availability.length > 0 ? profileData.availability.map((slot, index) => (
                            <div key={index}>
                              <BiCalendar className="inline mr-2" />
                              <span>{`Day: ${slot.day}, Time Slots: ${slot.time_slots.join(", ")}`}</span>
                            </div>
                          )) : "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Languages Spoken:</td>
                        <td className="border px-4 py-2">
                          <MdLanguage className="inline mr-2" />
                          {profileData.languages_spoken.join(", ") || "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Authorized Organization:</td>
                        <td className="border px-4 py-2">{profileData.hospital_affiliations[0]?.name || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Hospital Address:</td>
                        <td className="border px-4 py-2">
                          {`${profileData.hospital_affiliations[0]?.address.street}, ${profileData.hospital_affiliations[0]?.address.city}, ${profileData.hospital_affiliations[0]?.address.country} - ${profileData.hospital_affiliations[0]?.address.postal_code}`}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Experience Years:</td>
                        <td className="border px-4 py-2">{profileData.experience_years || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">License Number:</td>
                        <td className="border px-4 py-2">{profileData.license_number || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Consultation Fee:</td>
                        <td className="border px-4 py-2">{profileData.consultation_fee || "Not Available"}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Awards & Recognitions:</td>
                        <td className="border px-4 py-2">
                          <FaAward className="inline mr-2" />
                          {profileData.awards_and_recognitions.join(", ") || "Not Available"}
                        </td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Status:</td>
                        <td className="border px-4 py-2">{profileData.status}</td>
                      </tr>
                    </tbody>
                  </table>

                  <h2 className="text-xl font-bold mt-6 mb-4">Account & Security</h2>
                  <table className="min-w-full table-auto border-collapse">
                    <tbody>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Verification Status:</td>
                        <td className="border px-4 py-2">{profileData.verification_status ? "Verified" : "Not Verified"}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Identity Verified:</td>
                        <td className="border px-4 py-2">{profileData.identity_verified ? "Yes" : "No"}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Two Factor Enabled:</td>
                        <td className="border px-4 py-2">{profileData.two_factor_enabled ? "Enabled" : "Disabled"}</td>
                      </tr>
                      <tr>
                        <td className="border px-4 py-2 font-semibold">Notifications Enabled:</td>
                        <td className="border px-4 py-2">{profileData.notifications_enabled ? "Enabled" : "Disabled"}</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="flex justify-end space-x-4 mt-4">
                    <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
                      Profile Delete Request
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DoctorLayout>


    </>

  );
};

export default DoctorProfilePage;
