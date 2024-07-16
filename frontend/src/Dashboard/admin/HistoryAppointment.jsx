import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";

const HistoryAppointment = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/appointments/history`);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mb-10 mt-10">
      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="px-4 py-2">ชื่อผู้ใช้</th>
            <th className="px-4 py-2">วันที่นัดหมาย</th>
            <th className="px-4 py-2">เวลา</th>
            <th className="px-4 py-2">สถานะ</th>
            <th className="px-4 py-2">ชำระเงิน</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td className="border px-4 py-2">{appointment.user.name}</td>
              <td className="border px-4 py-2">
                {new Date(appointment.appointmentDate).toLocaleDateString(
                  "th-TH"
                )}
              </td>
              <td className="border px-4 py-2">{appointment.timeSlot}</td>
              <td className="border px-4 py-2">{appointment.status}</td>
              <td className="border px-4 py-2">
                {appointment.isPaid ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryAppointment;
