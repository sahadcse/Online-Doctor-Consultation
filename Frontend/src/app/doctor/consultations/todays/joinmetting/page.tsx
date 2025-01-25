"use client";

import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8081");

export default function DoctorDashboard() {
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const roomId = "patient-doctor-room"; // Replace with dynamic room ID

    // Join the room
    socket.emit("join-room", roomId, "doctor");

    const setupWebRTC = async () => {
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = localStream;
      }

      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      localStream.getTracks().forEach((track) => {
        peerConnection.current?.addTrack(track, localStream);
      });

      peerConnection.current.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("ice-candidate", { roomId, candidate: event.candidate });
        }
      };

      peerConnection.current.ontrack = (event) => {
        setRemoteStream(event.streams[0]);
      };

      // Listen for incoming signals
      socket.on("offer", async ({ sdp }) => {
        if (peerConnection.current) {
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(sdp)
          );

          if (sdp.type === "offer") {
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);
            socket.emit("answer", { roomId, sdp: answer });
          }
        }
      });

      socket.on("answer", async ({ sdp }) => {
        if (peerConnection.current) {
          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(sdp)
          );
        }
      });

      socket.on("ice-candidate", async ({ candidate }) => {
        if (peerConnection.current) {
          await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });

      // Create an offer
      if (peerConnection.current) {
        const offer = await peerConnection.current.createOffer();
        await peerConnection.current.setLocalDescription(offer);
        socket.emit("offer", { roomId, sdp: offer });
      }
    };

    setupWebRTC();

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (remoteStream && remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <div>
      <h2>Doctor Dashboard</h2>
      <video ref={localVideoRef} autoPlay playsInline muted />
      <video ref={remoteVideoRef} autoPlay playsInline />
    </div>
  );
}
