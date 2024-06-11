import { Facebook, Instagram, Mail} from "lucide-react";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "@/app/contexts/AuthContext";

const Footer = () => {
  const { userInfo } = useContext(AuthContext);
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
          </div>
          <div className="text-white flex flex-col">
            <div className="text-lg font-bold">THÔNG TIN</div>
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

              {userInfo?.roleID === 1 ? (
                <></>
              ) : (
                <Link
                  to={"user/donation"}
                  className="hover:text-mainBrown transition-colors font-bold"
                >
                  Quyên góp
                </Link>
              )}
            </div>
          </div>
          <div className="text-white flex flex-col">
            <div className="text-lg font-bold ">LIÊN LẠC</div>
            <Separator className="my-2" />
            <div className="flex gap-3">
              <Mail /> <p>Nuoicay.project@gmail.com</p>
            </div>
            <div className="flex gap-2 mt-3 text-mainBrown">
              <Link
                to={
                  "https://www.facebook.com/people/Nu%C3%B4i-C%C3%A2y/61559682431421/"
                }
                target="_blank"
                className="rounded-full bg-white p-2"
              >
                <Facebook />
              </Link>
              <Link
                to={"#"}
                // target="_blank"
                className="rounded-full bg-white p-2"
              >
                <Instagram />
              </Link>
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
