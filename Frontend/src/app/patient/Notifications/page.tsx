import PatientLayout from "@/components/PatientLayout";

const NotificationsSection = () => {
    return (
        <PatientLayout>
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl font-semibold">Notifications</h2>
                <div className="mt-4">
                    <p><strong>Reminder:</strong> Your next appointment with Dr. Sarah Lee is tomorrow at 2:00 PM.</p>
                </div>
                <div className="mt-4">
                    <button className="text-blue-500 hover:underline">View All Notifications</button>
                </div>
            </div>
        </PatientLayout>
    );
};

export default NotificationsSection;
