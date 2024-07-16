import { services } from "../assets/data/services";
import ServiceCard from "../components/Services/ServiceCard";
import { useEffect } from "react";

const Service = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      <div className="container mx-auto max-w-screen-lg px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {services.map((item, index) => (
            <ServiceCard item={item} index={index} key={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;
