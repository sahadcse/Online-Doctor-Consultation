"use client";
import DoctorLayout from "@/components/DoctorLayout";
import DashboardHeroNav from "@/components/DoctorHero/DashboardHeroNav";

const AppointmentsDoc = () => {
  return (
    <DoctorLayout>
      <DashboardHeroNav headName="Appointments" />
      <div className="p-6 bg-gray-100 min-h-screen">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Today/Scheduled Appointments  */}
          <section className="bg-white p-6 rounded-lg shadow w-40%">
            <h2 className="text-xl font-medium mb-4">
              Today/Scheduled Appointments
            </h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Patient</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Time</th>
                    <th className="px-4 py-2 border">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      <img
                        src={`https://randomuser.me/api/portraits/med/men/${Math.floor(
                          Math.random() * 100
                        )}.jpg`}
                        alt="Patient"
                        className="w-8 h-8 rounded-full"
                      />
                    </td>
                    <td className="px-4 py-2 border">John Doe</td>
                    <td className="px-4 py-2 border">10:00 AM</td>
                    <td className="px-4 py-2 border">General Checkup</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

            {/* Upcoming Appointments */}
          <section className="bg-white p-6 rounded-lg shadow w-60%">
            <h2 className="text-xl font-medium mb-4">Upcoming Appointments</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto border-collapse border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border">Patient</th>
                    <th className="px-4 py-2 border">Name</th>
                    <th className="px-4 py-2 border">Date | Time</th>
                    <th className="px-4 py-2 border">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">
                      <img
                        src={`https://randomuser.me/api/portraits/med/men/${Math.floor(
                          Math.random() * 100
                        )}.jpg`}
                        alt="Patient"
                        className="w-8 h-8 rounded-full"
                      />
                    </td>
                    <td className="px-4 py-2 border">Jane Smith</td>
                    <td className="px-2 py-2 border">2023-10-15 | 14:00</td>
                    <td className="px-4 py-2 border">Dental Checkup</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </DoctorLayout>
  );
};

export default AppointmentsDoc;
