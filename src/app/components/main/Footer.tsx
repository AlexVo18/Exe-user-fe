import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react";
import React from "react";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-auto bg-mainGreen text-white">
      <div className="container mx-auto mt-10 mb-5">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:mx-20 xs:mx-10 gap-4">
          <div className="col-span-1">
            <div className="text-lg font-bold">VỀ CHÚNG TÔI</div>
            <Separator className="my-2" />
            <p className="text-white">
              Nuôi Cây không chỉ đơn thuần là việc trồng cây, mà nó còn mang ý
              nghĩa sâu xa về mặt tinh thần và sự phát triển của chúng ta sau
              này. 1 đóng góp nhỏ cũng đã góp phần tạo nên 1 giá trị to lớn cho
              môi trường.{" "}
            </p>
            <div className="flex gap-2 mt-2 text-mainBrown">
              <Link
                to={
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                }
                target="_blank"
                className="rounded-full bg-white p-2"
              >
                <Facebook />
              </Link>
              <Link
                to={
                  "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
                }
                target="_blank"
                className="rounded-full bg-white p-2"
              >
                <Instagram />
              </Link>
            </div>
          </div>
          <div className="text-white flex flex-col">
            <div className="text-lg font-bold">VỀ CHÚNG TÔI</div>
            <Separator className="my-2" />
            <div className="gap-1 flex flex-col">
              <Link
                to={"/"}
                className="hover:text-mainBrown transition-colors font-bold"
              >
                Trang chủ
              </Link>
              <Link
                to={"/about"}
                className="hover:text-mainBrown transition-colors font-bold"
              >
                Về chúng tôi
              </Link>
              <Link
                to={"/news"}
                className="hover:text-mainBrown transition-colors font-bold"
              >
                Tin tức
              </Link>
              <Link
                to={"/sponsor"}
                className="hover:text-mainBrown transition-colors font-bold"
              >
                Đồng hành nuôi cây
              </Link>
              <Link
                to={"/packs"}
                className="hover:text-mainBrown transition-colors font-bold"
              >
                Tri ân
              </Link>
              <Link
                to={"/donation"}
                className="hover:text-mainBrown transition-colors font-bold"
              >
                Quyên góp
              </Link>
            </div>
          </div>
          <div className="w-full bg-white rounded-3xl px-10 py-6 text-mainBrown flex flex-col gap-1 justify-center">
            <div className="font-semibold">Thông Tin Liên Hệ</div>
            <div className="flex gap-2 text-2xl items-center text-mainGreen my-2">
              <Phone />
              <div className="font-bold ">0909 078 423</div>
            </div>
            <div className="flex gap-2 items-center ">
              <Mail />
              <div>nuoicay@gmail.com</div>
            </div>
            <div className="flex gap-2 items-center ">
              <MapPin className="text-2xl"/>
              <div>Số 12, đường Hoàng Diệu, phường 13, Quận 9</div>
            </div>
          </div>
        </div>
        <div className="lg:mx-20 xs:mx-10 my-5">
          <Separator className=" bg-white " />
        </div>
        <div className="text-center text-white">
          © 2024 Nuoi Cay - All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
