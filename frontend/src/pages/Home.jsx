import heroImg01 from "../assets/images/hero-img01.png";
import heroImg02 from "../assets/images/hero-img02.png";
import heroImg03 from "../assets/images/hero-img03.png";
import icon01 from "../assets/images/icon01.png";
import icon02 from "../assets/images/icon02.png";
import icon03 from "../assets/images/icon03.png";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";
import About from "../components/About/About";
import ServiceList from "../components/Services/ServiceList";
import featureImg from "../assets/images/feature-img.png";
import videoIcon from "../assets/images/video-icon.png";
import avatarIcon from "../assets/images/avatar-icon.png";
import DoctorList from "../components/Doctors/DoctorList";
import faqImg from "../assets/images/faq-img.png";
import FaqList from "../components/Faq/FaqList";
import Testimonial from "../components/Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      {/* hero section start ------------------------------------------------------------------------------------------------------ */}
      <section className="hero__section pt-[60px] 2xl:h-[800px]">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            {/* Hero content */}
            <div>
              <div className="lg:w-[570px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[600]">
                  เราช่วยผู้ป่วยให้มีชีวิตที่ดีขึ้น
                </h1>
                <p className="text__para">
                  โรงพยาบาล หรือ สถานพยาบาล หรือ ศูนย์การแพทย์
                  เป็นสถานที่สำหรับให้บริการด้านสุขภาพให้กับผู้ป่วย
                  โดยมักที่จะมุ่งเน้นการส่งเสริม ป้องกัน รักษา
                  และฟื้นฟูภาวะความเจ็บป่วย หรือโรคต่าง ๆ
                  ทั้งทางร่างกายและทางจิตใจ
                </p>
              </div>
              <button className="btn">นัดพบแพทย์</button>
              {/* hero counter -------------------------------------------- */}
              <div className="mt-[30px] lg:mt-[70px] flex flex-col md:flex-row md:items-center gap-5 lg:gap-[30px] justify-center">
                <div className="text-center md:text-left">
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    30+
                  </h2>
                  <span className="w-[100px] h-[10px] bg-purpleColor rounded-full block mt-[-10px] mx-auto md:mx-0"></span>
                  <p className="text__para">ประสบการณ์</p>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    15+
                  </h2>
                  <span className="w-[100px] h-[10px] bg-purpleColor rounded-full block mt-[-10px] mx-auto md:mx-0"></span>
                  <p className="text__para">สถานพยาบาล</p>
                </div>
                <div className="text-center md:text-left">
                  <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                    100%
                  </h2>
                  <span className="w-[100px] h-[10px] bg-purpleColor rounded-full block mt-[-10px] mx-auto md:mx-0"></span>
                  <p className="text__para">ความพึงพอใจผู้ป่วย</p>
                </div>
              </div>
            </div>

            {/* Hero content */}
            <div className="flex gap-[30px] justify-end">
              <div>
                <img src={heroImg01} alt="" />
              </div>
              <div className="mt-[30px]">
                <img src={heroImg02} alt="" className="w-full mb-[30px]" />
                <img src={heroImg03} alt="" className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* hero end ------------------------------------------------------------------------------------------------------ */}

      {/* selection section start ------------------------------------------------------------------------------------------------------ */}

      <section>
        <div className="container">
          <div className="lg:w-[470px] mx-auto">
            <h2 className="heading text-center">ให้บริการที่ดีที่สุด</h2>
            <p className="text__para text-center">
              พบแพทย์ผู้เชี่ยวชาญหาประเภทพร้อมระบบปัญญาประดิดเพื่อช่วยวินิจฉัยให้แม่นยำขึ้น
            </p>
          </div>
        </div>
        <div className="container mx-auto max-w-screen-lg px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon01} />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  ค้นหาหมอเลย
                </h2>
                <p className="text__para text-[16px] leading-7 text-center text-textColor font-[400] mt-4 ">
                  พบแพทย์ผู้เชี่ยวชาญหาประเภทพร้อมระบบปัญญาประดิษฐ์
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon02} />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  สถานที่
                </h2>
                <p className="text__para text-[16px] leading-7 text-center text-textColor font-[400] mt-4 ">
                  xxxx-xxxx-xxx
                </p>
                <Link
                  to="/"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                <img src={icon03} />
              </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">
                  ทำการนัด
                </h2>
                <p className="text__para text-[16px] leading-7 text-center text-textColor font-[400] mt-4 ">
                  สามารถเลือกเวลาการนัดได้อย่างยืดหยุดตามเวลานัดของคุณหมอ
                </p>
                <Link
                  to="/doctors"
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover:text-white w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* selection section end ------------------------------------------------------------------------------------------------------ */}

      {/* About Section start ------------------------------------------------------------------------------------------------------ */}
      <About />
      {/* About Section end ------------------------------------------------------------------------------------------------------ */}

      {/* service Section start ------------------------------------------------------------------------------------------------------ */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">บริการทางการแพทย์ของเรา</h2>
            <p className="text__para text-center">
              นอกจากนี้ ระบบการผลิตพยาบาลของไทยเอง ภาครัฐก็ค่อนข้างให้ความสำคัญ
              โดยไทยมีจำนวนพยาบาลสัดส่วนเยอะเป็นลำดับต้น
            </p>
          </div>
        </div>
        <ServiceList />
      </section>
      {/* service Section end ------------------------------------------------------------------------------------------------------ */}

      {/* feature selection ----------------------------------------------------------------------------------------------------------- */}

      <section>
        <div className="container ">
          <div className="flex item-center justify-center flex-col lg:flex-row  ">
            {/* feature content */}

            <div className="xl:w-[670px] flex flex-col items-center justify-center">
              <h2 className="heading text-center">ทำการรักษาได้ทุกเมื่อ</h2>
              <ul className="pl-4 text-center">
                <li className="text_para text-center">
                  1. จัดตารางการนัดพบโดยตรง
                </li>
                <li className="text_para text-center">2. หานักฟิสิกตรงนี้</li>
                <li className="text_para text-center">3. หานักฟิสิกตรงนี้</li>
              </ul>
              <Link to="/" className="mt-4">
                <button className="btn">Learn More</button>
              </Link>
            </div>

            {/* feature Image */}
            <div className="relative z-10 xl:w-[770px] flex justify-center mt-[50px] lg:mt-0">
              <img src={featureImg} className="w-3/4" alt="" />
              <div className="w-[150px] lg:w-[248px] bg-white absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:px-4 lg:pb-[26px] rounded-[10px]">
                <div className="flex items-center justify-between ">
                  <div className="flex item-center gap-[6px] lg:gap-3">
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]">
                      Tue,24
                    </p>
                    <p className="text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]">
                      10:00
                    </p>
                  </div>
                  <span className="2-5 h-5 lg:w-[34px] lg:h-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:px-[9px]">
                    <img src={videoIcon} />
                  </span>
                </div>

                <div className="w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4">
                  ปรึกษาแพทย์
                </div>

                <div className="flex item-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]">
                  <img src={avatarIcon} />
                  <h4 className="text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[300]">
                    นายแพทย์ ...
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* feature end ----------------------------------------------------------------------------------------------------------- */}

      {/* Doctors section */}
      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">แพทย์ของเรา</h2>
            <p className="text__para text-center">
              นอกจากนี้ ระบบการผลิตพยาบาลของไทยเอง ภาครัฐก็ค่อนข้างให้ความสำคัญ
              โดยไทยมีจำนวนพยาบาลสัดส่วนเยอะเป็นลำดับต้น
            </p>
          </div>
          <DoctorList />
        </div>
      </section>

      {/* Doctors end */}

      {/* faq section */}

      <section>
        <div className="container">
          <div className="flex justify-between gap-[50px] lg:gap-0 items-center">
            <div className="w-1/2 hidden md:block">
              <img src={faqImg} alt="" />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="heading">คำถามจากลูกค้าเรา</h2>
              <FaqList />
            </div>
          </div>
        </div>
      </section>
      {/* faq section end */}

      {/* testimonial section */}

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">
              ความเห็นและความพึงพอใจผู้ป่วย
            </h2>
            <p className="text__para text-center">
              นอกจากนี้ ระบบการผลิตพยาบาลของไทยเอง ภาครัฐก็ค่อนข้างให้ความสำคัญ
              โดยไทยมีจำนวนพยาบาลสัดส่วนเยอะเป็นลำดับต้น
            </p>
          </div>
          <Testimonial />
        </div>
      </section>

      {/* testimonial section end*/}
    </>
  );
};

export default Home;
