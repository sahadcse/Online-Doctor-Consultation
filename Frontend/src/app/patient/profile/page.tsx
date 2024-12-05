import PatientLayout from "@/components/PatientLayout";

const PatientProfile = () => {
    return (
        <PatientLayout>
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl font-semibold">Profile Information</h2>
                <div className="mt-4">
                    <p><strong>Name:</strong> Jane Doe</p>
                    <p><strong>Age:</strong> 32</p>
                    <p><strong>Email:</strong> jane.doe@example.com</p>
                    <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
                <button className="mt-4 text-blue-500 hover:underline">Edit Profile</button>
            </div>
        </PatientLayout>
    );
};


export default PatientProfile;