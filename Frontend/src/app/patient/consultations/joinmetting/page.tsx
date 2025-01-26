"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PatientLayout from "@/components/Patient/PatientLayout";
import VideoCall from "@/components/VideoCall";
import Cookies from "js-cookie";
import axios from "axios";

export default function PatientDashboard() {
  const [room_name, setRoomId] = useState("");
  const [joined, setJoined] = useState(false);
  const [id, setId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const idFromQuery = query.get("id");
    if (idFromQuery) {
      setId(idFromQuery);
      fetchRoomName(idFromQuery);
    }
  }, []);

  const fetchRoomName = async (id: string) => {
    try {
      setIsLoading(true);
      const token = Cookies.get("token");
      const response = await axios.get(`http://192.168.0.104:8081/api/users/patient/consultations/join/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.room_name) {
        setRoomId(response.data.room_name);
      } else {
        setError("No room name received from server");
      }
    } catch (error) {
      console.error("Error fetching room name:", error);
      setError("Failed to fetch room details");
    } finally {
      setIsLoading(false);
    }
  };

  const handleJoin = () => {
    if (room_name) {
      setJoined(true);
    }
  };

  return (
    <PatientLayout>
      <div>
        <h2>Patient Dashboard</h2>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <p className="error">{error}</p>
        ) : !joined ? (
          <div>
            <button onClick={handleJoin} disabled={!room_name}>
              Join Meeting
            </button>
          </div>
        ) : room_name ? (
          <VideoCall room_name={room_name} role="patient" />
        ) : (
          <p>No room available</p>
        )}
      </div>
    </PatientLayout>
  );
}

