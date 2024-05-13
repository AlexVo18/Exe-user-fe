import { Facebook, Instagram } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto bg-green-200">
      <div className="container mx-auto mt-10 mb-5">
        <div className="grid md:grid-cols-2 lg:mx-40 xs:mx-10">
          <div>
            <div className="flex md:justify-start justify-center ">
              <img
                src="src\assets\Logo_With_Name.svg"
                alt="Logo.img"
                className="w-28 md:align-baseline "
              />
            </div>
            <p>
              Nuôi Cây không chỉ đơn thuần là việc trồng cây, mà nó còn mang ý
              nghĩa sâu xa về mặt tinh thần và sự phát triển của chúng ta sau
              này. 1 đóng góp nhỏ cũng đã góp phần tạo nên 1 giá trị to lớn cho
              môi trường.{" "}
            </p>
            <div className="flex gap-2">
              <div className="rounded-full bg-white">
                <Facebook />
              </div>
              <div className="rounded-full bg-white">
                <Instagram />
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-3xl px-10 py-6">
            <div>Thông Tin Liên Hệ</div>
          </div>
        </div>
        <p className="text-center mt-5">
          © 2024 Nuoi Cay, All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
