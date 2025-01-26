"use client";

import { useState, useEffect } from "react";
import DoctorLayout from "@/components/DoctorLayout";
import VideoCall from "@/components/VideoCall";
import Cookies from "js-cookie";
import axios from "axios";

export default function DoctorDashboard() {
  const [room_name, setRoomName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);  // Add loading state

  useEffect(() => {
    const fetchRoomId = async (id: string): Promise<void> => {
      setIsLoading(true);  // Start loading
      try {
        const token = Cookies.get("token");
        const response = await axios.get<{ room_name: string }>(
          `http://192.168.0.104:8081/api/users/doctor/consultations/room/collect/${id}`,
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
        setIsLoading(false);  // End loading
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
      <div className="">
        <h2>Doctor Dashboard</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : room_name ? (
          <>
            <p>Room Name: {room_name}</p>
            <VideoCall room_name={room_name} role="doctor" />
          </>
        ) : (
          <p>No room available</p>
        )}
      </div>
    </DoctorLayout>
  );
}
