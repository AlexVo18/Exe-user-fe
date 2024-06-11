import Payment from "@/app/api/APIs/payment";
import { SuccessIcon, WarningIcon } from "@/app/components/toast/ToastIcons";
import { AuthContext } from "@/app/contexts/AuthContext";
import { QuantityContext } from "@/app/contexts/QuantityContext";
import { UrlParams } from "@/app/models/payment.models";
import { calsMoney } from "@/app/utils/calsTrees";
import customToast from "@/app/utils/customToast";
import { formatVND } from "@/app/utils/formatVND";
import { parseParams } from "@/app/utils/parseParams";
import { Check } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../loadingPage/Loading";
import useCountdown from "@/app/hooks/useCountdown";

const Result = () => {
  const [payment, setPayment] = useState<UrlParams>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [paymentSent, setPaymentSent] = useState<boolean>(false);
  const { quantity, removeQuantity, quantityLoading } =
    useContext(QuantityContext);
  const { userLoading, userInfo } = useContext(AuthContext);
  const url = useLocation();
  const navigate = useNavigate();
  const { secondsLeft, start } = useCountdown();

  useEffect(() => {
    const params = parseParams(url.search.replace("?", ""));
    setPayment(params);
    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    const sendPayment = async () => {
      try {
        if (userInfo && payment && quantity) {
          if (payment.status === "PAID") {
            await Payment.sendPaymentInfo({
              orderID: Number(payment.orderCode),
              accountID: userInfo.accountID,
              quantity: quantity,
            });
            customToast({
              icon: <SuccessIcon />,
              description: "Thanh toán thành công",
              duration: 3000,
            });
            removeQuantity();
            setPaymentSent(true);
          }
        }
        start(10);
      } catch (error) {}
    };

    if (payment && !paymentSent) {
      sendPayment();
    }
  }, [payment, userInfo, quantity]);

  useEffect(() => {
    if (quantity === 0) {
      navigate("/");
    }
  }, [quantity]);

  useEffect(() => {
    if (secondsLeft === 0) {
      navigate("/");
    }
  }, [secondsLeft]);

  return (
    <>
      {userLoading || isLoading || quantityLoading ? <Loading /> : null}
      <main className="mt-auto text-mainBrown">
        <div className="container mx-auto flex justify-center ">
          <div className=" rounded-2xl shadow-2xl border-black border-[1px] my-10 w-[500px] p-10 ">
            <div className="text-2xl text-mainGreen font-bold">
              Quyên góp trồng cây
            </div>
            <div className="my-4">
              Đồng hành cùng Nuôi Cây giúp tạo thêm nhiều màu xanh cho các cánh
              rừng khác nhau tại Việt Nam
            </div>
            <ul className="relative flex w-full flex-row gap-x-2">
              <li className="shrink basis-0 flex-1 group">
                <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                  <span className="size-7 flex justify-center items-center flex-shrink-0 bg-mainGreen text-white font-bold rounded-full ">
                    <Check size={18} />
                  </span>
                  <div className="ms-2 w-full h-px flex-1 bg-mainGreen group-last:hidden"></div>
                </div>
                <div className="mt-3">
                  <span className="block text-sm font-medium text-mainBrown ">
                    Lượng Cây
                  </span>
                </div>
              </li>
              <li className="shrink basis-0 flex-1 group">
                <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                  <span className="size-7 flex justify-center items-center flex-shrink-0 bg-mainGreen font-medium text-white rounded-full ">
                    <Check size={18} />
                  </span>
                  <div className="ms-2 w-full h-px flex-1 bg-mainGreen group-last:hidden"></div>
                </div>
                <div className="mt-3">
                  <span className="block text-sm font-medium text-mainBrown ">
                    Thanh Toán
                  </span>
                </div>
              </li>
              <li className=" flex flex-col group">
                <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                  <span className="size-7 flex justify-center items-center flex-shrink-0 bg-mainGreen  font-medium text-white rounded-full ">
                    3
                  </span>
                  <div className="ms-2 w-full h-px flex-1 bg-mainGreen  group-last:hidden "></div>
                </div>
                <div className="mt-3">
                  <span className="block text-sm font-medium text-mainBrown ">
                    Kết Quả
                  </span>
                </div>
              </li>
            </ul>
            <div className="text-center text-xl text-mainGreen font-bold my-4">
              Xác Nhận Quyên Góp
            </div>
            <div className="font-semibold">
              <div>
                Trạng thái:{" "}
                <span
                  className={` ${
                    payment?.status === "PAID"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {payment?.status === "PAID" ? "Thành Công" : "Đã Hủy"}
                </span>
              </div>
              <div>
                Mã đơn hàng:{" "}
                <span className="font-normal text-black">
                  {payment?.orderCode}
                </span>
              </div>
              <div>
                Số lượng cây:{" "}
                <span className="font-normal text-black">{quantity}</span>
              </div>
              <div>
                Tổng số tiền:{" "}
                <span className="font-normal text-black">
                  {quantity ? formatVND(calsMoney(quantity)) : null}
                </span>
              </div>
            </div>
            <div className="my-4">
              <p className="mb-2">
                Nuôi Cây xin chân thành cảm ơn sự quyên góp của bạn. Vui lòng
                kiểm tra email để nhận thông báo về mã cây bạn vừa được nhận
              </p>
              <p>
                Mọi thắc mắc xin vui lòng liên hệ chúng tôi qua email:
                Nuoicay.project@gmail.com
              </p>
            </div>
            <div className="text-center">
              {/* <button
                className="bg-mainGreen text-white hover:bg-mainDarkerGreen hover:text-white px-5 py-2 rounded-lg"
                onClick={() => navigate("/")}
              >
                Về trang chủ
              </button> */}
              <div className="text-muted-foreground text-sm">
                Trang sẽ tự động chuyển trang sau vài giây
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Result;
