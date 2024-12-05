import PatientLayout from "@/components/PatientLayout";

const BillingSection = () => {
    return (
        <PatientLayout>
            <div className="bg-white p-6 rounded shadow-lg">
                <h2 className="text-2xl font-semibold">Billing & Payments</h2>
                <div className="mt-4">
                    <p><strong>Last Appointment:</strong> Dr. Jane Smith</p>
                    <p><strong>Total Amount:</strong> $150</p>
                    <p><strong>Status:</strong> Paid</p>
                </div>
                <div className="mt-4 flex space-x-4">
                    <button className="bg-green-500 text-white px-4 py-2 rounded">Download Invoice</button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Pay Now</button>
                </div>
            </div>
        </PatientLayout>
    );
};

export default BillingSection;