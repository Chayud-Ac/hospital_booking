import { formatDate } from "../../utils/formatDate";

const Appointments = ({ appointments }) => {
  console.log(appointments);
  return (
    <table className="w-full text-left text-sm text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="px-6 py-3">
            ชื่อ
          </th>
          <th scope="col" className="px-6 py-3">
            เพศ
          </th>
          <th scope="col" className="px-6 py-3">
            การชำระ
          </th>
          <th scope="col" className="px-6 py-3">
            ราคา
          </th>
          <th scope="col" className="px-6 py-3">
            จองคิว
          </th>
        </tr>
      </thead>

      <tbody>
        {appointments?.map((item) => (
          <tr key={item._id}>
            <th scope="row" className="flex items-center px-6 py-4 ">
              <div className="ml-3">
                <div className="">{item.user.name}</div>
              </div>
            </th>
            <td className="px-6 py-4">{item.user.gender}</td>
            <td className="px-6 py-4">
              {item.isPaid ? (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500 mr-2"></div>
                  ชำระแล้ว
                </div>
              ) : (
                <div className="flex items-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2"></div>
                  ยังไม่ชำระ
                </div>
              )}
            </td>
            <td className="px-6 py-4">{item.ticketPrice}</td>
            <td className="px-6 py-4">{formatDate(item.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Appointments;
