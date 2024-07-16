import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">ติดต่อเรา</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text__para">
          มีปัญหาทางเทคนิคนิดโหน่ยยยยย
        </p>
        <form action="#" className="space-y-8">
          <div>
            <label htmlFor="email" className="form__label">
              อีเมลคุณ
            </label>
            <input
              type="email"
              id="email"
              placeholder="...@email.com"
              className="form__input mt-1"
            />
          </div>
          <div>
            <label htmlFor="subject" className="form__label">
              ปัญหาที่พบเจอ
            </label>
            <input
              type="text"
              id="subject"
              placeholder="ปัญหาที่แจ้ง..."
              className="form__input mt-1"
            />
          </div>
          <div>
            <label htmlFor="subject" className="form__label">
              ข้อความ
            </label>
            <textarea
              rows="6"
              type="text"
              id="message"
              placeholder="ข้อความ"
              className="form__input mt-1"
            />
          </div>
          <button type="submit" className="btn rounded sm:w-fit">
            ส่ง
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
