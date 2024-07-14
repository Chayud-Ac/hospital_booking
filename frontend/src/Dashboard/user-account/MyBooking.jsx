import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import DoctorCard from "./../../components/Doctors/DoctorCard";
import HashLoader from "react-spinners/HashLoader";

const MyBooking = () => {
  const { data: appointments, loading } = useFetchData(
    `${BASE_URL}/users/appointments/my-appointments`
  );

  console.log(appointments);
  return (
    <div>
      {loading && <HashLoader size={40} color="fff" />}

      {!loading && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {appointments.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
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
