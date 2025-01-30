"use client";
// pages/index.js
import { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";

interface Result {
  diagnosis: {
    name: string;
  };
  drugs: {
    rxNormId: string;
    name: string;
    dosage: string;
  }[];
}

export default function Home() {
  const [progress, setProgress] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io("http://localhost:8888", {
      path: "/socket.io",
      transports: ["polling"], // Start with polling only
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: 3,
      reconnectionDelay: 1000,
      autoConnect: true,
    });

    socketRef.current.on("connect", () => {
      console.log("Connected to FastAPI");
    });

    socketRef.current.on("progress", (data) => {
      setProgress(data.message);
    });

    socketRef.current.on("result", (data) => {
      setResult(data);
    });

    socketRef.current.on("error", (err) => {
      console.error("Error:", err.message);
    });

    // Add connection error handling
    socketRef.current.on("connect_error", (error) => {
      console.error("Connection Error:", error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div>
      <button
        onClick={() =>
          socketRef.current?.emit("analyze_symptoms", {
            symptoms: ["fever", "cough"],
          })
        }
      >
        Analyze Symptoms
      </button>
      <p>{progress}</p>
      {result && (
        <div>
          <h2>Diagnosis: {result.diagnosis.name}</h2>
          <h3>Drugs:</h3>
          <ul>
            {result.drugs.map((drug) => (
              <li key={drug.rxNormId}>
                {drug.name} ({drug.dosage})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// Path: Online-Doctor-Consultation/Frontend/src/app/AI/page.tsx
