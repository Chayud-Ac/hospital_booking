import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from "./../../components/Doctors/DoctorCard";
import HashLoader from "react-spinners/HashLoader";

const MyBooking = () => {
  const { data: appointments, loading } = useFetchData(
    `${BASE_URL}/appointments/appointment`
  );

  return (
    <div>
      {loading && <HashLoader size={40} color="fff" />}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((appointment) => (
            <DoctorCard
              key={appointment.doctor._id}
              doctor={appointment.doctor}
              date={appointment.appointmentDate}
            />
          ))}
        </div>
      )}

      {!loading && appointments.length === 0 && (
        <h2 className="mt-[20px] text-textColor">ยังไม่มีการนัดกับแพทย์</h2>
      )}
    </div>
  );
};

export default MyBooking;
