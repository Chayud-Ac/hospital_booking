import { useState, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL, token } from "../../config";
import { toast } from "react-toastify";

const CurrentAppointment = () => {
  const {
    data: appointments,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/appointments`);
  const [updatedAppointments, setUpdatedAppointments] = useState([]);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (appointments.length > 0) {
      setUpdatedAppointments(appointments);
    }
  }, [appointments]);

  const handleChange = (appointmentId, updatedData) => {
    setUpdatedAppointments((prev) =>
      prev.map((appointment) =>
        appointment._id === appointmentId
          ? { ...appointment, ...updatedData }
          : appointment
      )
    );
  };

  const handleSubmit = async () => {
    setUpdating(true);
    try {
      const res = await fetch(`${BASE_URL}/appointments/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedAppointments),
      });
      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || "เกิดข้อผิดพลาด");
      }
      toast.success("อัปเดตข้อมูลสำเร็จ");

      // Update the doctor's time slots for cancelled or completed appointments
      const cancelledOrCompleted = updatedAppointments.filter(
        (appt) => appt.status === "cancelled" || appt.status === "completed"
      );

      for (const appt of cancelledOrCompleted) {
        await fetch(`${BASE_URL}/doctors/${appt.doctor}/timeslots`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ timeSlot: appt.timeSlot, available: true }),
        });
      }
    } catch (error) {
      toast.error(error.message || "server error");
    }
    setUpdating(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col mb-20 mt-10">
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
          {updatedAppointments.map((appointment) => (
            <tr key={appointment._id}>
              <td className="border px-4 py-2">{appointment.user.name}</td>
              <td className="border px-4 py-2">
                {new Date(appointment.appointmentDate).toLocaleDateString(
                  "th-TH"
                )}
              </td>
              <td className="border px-4 py-2">
                {appointment.timeSlot.split(" ")[1]}
              </td>
              <td className="border px-4 py-2">
                <select
                  value={appointment.status}
                  onChange={(e) =>
                    handleChange(appointment._id, { status: e.target.value })
                  }
                  disabled={updating}
                >
                  <option value="pending">รอดำเนินการ</option>
                  <option value="approved">อนุมัติ</option>
                  <option value="cancelled">ยกเลิก</option>
                  <option value="completed">เสร็จสิ้น</option>
                </select>
              </td>
              <td className="border px-4 py-2">
                <input
                  type="checkbox"
                  checked={appointment.isPaid}
                  onChange={(e) =>
                    handleChange(appointment._id, { isPaid: e.target.checked })
                  }
                  disabled={updating}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="mt-5 bg-primaryColor text-white px-6 py-2 rounded"
        onClick={handleSubmit}
        disabled={updating}
      >
        บันทึกการเปลี่ยนแปลง
      </button>
    </div>
  );
};

export default CurrentAppointment;
