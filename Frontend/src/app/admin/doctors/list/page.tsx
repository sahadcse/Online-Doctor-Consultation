"use client";
import { useState } from "react";

interface Doctor {
    id: string;
    name: string;
    specialty: string;
}

export default function DoctorsList() {
    const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);

    const closeModal = () => {
        setSelectedDoctor(null);
    };

    return (
        <div className="bg-white w-11/12 md:w-1/2 p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">{selectedDoctor?.name || "No doctor selected"}</h2>
                <button
                    className="text-gray-500 hover:text-gray-800"
                    onClick={closeModal}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
