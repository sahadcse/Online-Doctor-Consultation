import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import PatientLayout from "@/components/Patient/PatientLayout";
import JitsiMeet from "@/components/JitsiMeet";

const baseURL = process.env.NEXT_PUBLIC_API_URL;
const token = Cookies.get("token");

const JoinMeetingPage = () => {
    const [roomName, setRoomName] = useState("");

    useEffect(() => {
        const createRoom = async () => {
            try {
                const response = await axios.post(`${baseURL}/api/users/patient/consultations/room/create`, {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setRoomName(response.data.roomName);
            } catch (error) {
                console.error("Error creating room", error);
            }
        };

        createRoom();
    }, []);

    return (
        <PatientLayout>
            {roomName && <JitsiMeet roomName={roomName} displayName="Unknown" />}
        </PatientLayout>
    );
};

export default JoinMeetingPage;
