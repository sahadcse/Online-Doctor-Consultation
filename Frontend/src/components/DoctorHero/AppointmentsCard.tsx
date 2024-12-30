"use client";

const AppointmentsCard = () => {
    const appointments = [
        {
            id: 1,
            name: "M.J. Mical",
            diagnosis: "Health Checkup",
            time: "On Going",
            image: "/images/patient1.jpg",
            statusColor: "bg-blue-500",
        },
        {
            id: 2,
            name: "Sanath Deo",
            diagnosis: "Health Checkup",
            time: "12 : 30 PM",
            image: "/images/patient2.jpg",
            statusColor: "bg-blue-200",
        },
        {
            id: 3,
            name: "Loeara Phanj",
            diagnosis: "Report",
            time: "01 : 00 PM",
            image: "/images/patient3.jpg",
            statusColor: "bg-blue-200",
        },
        {
            id: 4,
            name: "Komola Haris",
            diagnosis: "Common Cold",
            time: "01 : 30 PM",
            image: "/images/patient4.jpg",
            statusColor: "bg-blue-200",
        },
        {
            id: 5,
            name: "Nina Brown",
            diagnosis: "Dental Checkup",
            time: "02 : 00 PM",
            image: "/images/patient5.jpg",
            statusColor: "bg-blue-200",
        },
        {
            id: 6,
            name: "John Doe",
            diagnosis: "Eye Checkup",
            time: "02 : 30 PM",
            image: "/images/patient6.jpg",
            statusColor: "bg-blue-200",
        },
        {
            id: 7,
            name: "Jane Smith",
            diagnosis: "Skin Allergy",
            time: "03 : 00 PM",
            image: "/images/patient7.jpg",
            statusColor: "bg-blue-200",
        },
        {
            id: 8,
            name: "Robert Johnson",
            diagnosis: "Follow-up",
            time: "03 : 30 PM",
            image: "/images/patient8.jpg",
            statusColor: "bg-blue-200",
        },
    ];

    return (
        <div className="bg-white rounded-lg shadow p-6 w-full max-w-sm h-full items-start">
            <h2 className="text-blue-600 font-semibold mb-4">Today Appointment</h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
                <div className="flex justify-between text-gray-500 text-sm font-semibold">
                    <p>Patient</p>
                    <p>Name/Diagnosis</p>
                    <p>Time</p>
                </div>
                {appointments.slice(0, 5).map((appointment, index) => (
                    <div key={appointment.id} className="flex items-center gap-4">
                        <img
                            src={appointment.image}
                            alt={appointment.name}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                            <h3 className="font-semibold text-gray-800">
                                {appointment.name}
                            </h3>
                            <p className="text-sm text-gray-500">{appointment.diagnosis}</p>
                        </div>
                        <span
                            className={`text-white text-xs font-medium px-3 py-1 rounded-full ${appointment.statusColor}`}
                        >
                            {appointment.time}
                        </span>
                    </div>
                ))}
                {appointments.length > 5 && (
                    <p className="text-blue-500 text-sm font-medium cursor-pointer hover:underline">
                        See All
                    </p>
                )}
            </div>
        </div>
    );
};

export default AppointmentsCard;
