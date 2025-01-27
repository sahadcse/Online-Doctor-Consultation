"use client";

import { useState, useEffect } from "react";
import DoctorLayout from "@/components/DoctorLayout";
import VideoCall from "@/components/VideoCall";
import Cookies from "js-cookie";
import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export default function DoctorDashboard() {
  const [room_name, setRoomName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [isJoining, setIsJoining] = useState(false);

  useEffect(() => {
    const fetchRoomId = async (id: string): Promise<void> => {
      setIsLoading(true); // Start loading
      try {
        const token = Cookies.get("token");
        const response = await axios.get<{ room_name: string }>(
          `${baseURL}/api/users/doctor/consultations/room/collect/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.room_name) {
          setRoomName(response.data.room_name);
        } else {
          setError("No room name received from server");
        }
      } catch (error) {
        console.error("Error fetching room ID:", error);
        setError("Failed to fetch room ID. Please try again later.");
      } finally {
        setIsLoading(false); // End loading
      }
    };

    const query = new URLSearchParams(window.location.search);
    const idFromQuery = query.get("id");
    if (idFromQuery) {
      fetchRoomId(idFromQuery);
    } else {
      setError("No consultation ID provided");
      setIsLoading(false);
    }
  }, []);

  return (
    <DoctorLayout>
      <div className="container mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Consultation Room</h2>
        {isLoading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-2">Loading consultation room...</p>
          </div>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : room_name ? (
          <VideoCall room_name={room_name} role="doctor" />
        ) : (
          <p>No room available</p>
        )}
      </div>
    </DoctorLayout>
  );
}
