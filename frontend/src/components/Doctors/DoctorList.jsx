import DoctorCard from "./DoctorCard";
import { BASE_URL } from "./../../config";
import useFecthData from "./../../hooks/useFetchData";
import HashLoader from "react-spinners/HashLoader";

const DoctorList = () => {
  const { data: doctors, loading } = useFecthData(`${BASE_URL}/doctors`);
  return (
    <>
      {loading && <HashLoader size={25} color="fff" />}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>
      )}
    </>
  );
};

export default DoctorList;
