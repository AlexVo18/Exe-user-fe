import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { ErrorMessageDonate } from "@/app/constants/errorMessages";
import { calsMoney } from "@/app/utils/calsTrees";
import { formatVND } from "@/app/utils/formatVND";
import { useContext, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { CreateDonationData } from "@/app/models/payment.models";
import { ErrorIcon } from "@/app/components/toast/ToastIcons";
import customToast from "@/app/utils/customToast";
import Payment from "@/app/api/APIs/payment";
import Loading from "../../loadingPage/Loading";
import { QuantityContext } from "@/app/contexts/QuantityContext";

const Donation = () => {
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [active, setActive] = useState<string>("1");
  const { getQuantity } = useContext(QuantityContext);
  const validate = ErrorMessageDonate;
  const validationSchema = Yup.object().shape({
    quantity: Yup.number()
      .required(validate.quantity.required)
      .moreThan(0, validate.quantity.min)
      .lessThan(1001, validate.quantity.max),
  });

  const handleSetTab = (
    tab: string,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (tab !== "input") {
      formik.setFieldValue("quantity", Number(tab));
      setOpenInput(false);
    } else {
      formik.setFieldValue("quantity", Number(0));
      setOpenInput(true);
    }
    setActive(tab);
  };

  const handleSetInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    formik.setFieldValue("quantity", value);
  };

  const formik = useFormik({
    initialValues: {
      quantity: 1,
      urlCancel: import.meta.env.VITE_RETURN,
      urlReturn: import.meta.env.VITE_RETURN,
    } as CreateDonationData,
    validationSchema,
    onSubmit: async (values: CreateDonationData) => {
      setIsLoading(true);
      try {
        if (values.quantity !== undefined) {
          getQuantity(values.quantity);
          const response = await Payment.createDonation(values);
          if (response) {
            window.location.href = response;
          }
        }
      } catch (error) {
        customToast({
          icon: <ErrorIcon />,
          description: "Đã có lỗi xảy ra, không thể quyên góp",
          duration: 3000,
        });
      } finally {
        setIsLoading(false);
      }
    },
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <>
      {isLoading && <Loading />}
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
            <div></div>
            <ul className="relative flex w-full flex-row gap-x-2">
              <li className="shrink basis-0 flex-1 group">
                <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                  <span className="size-7 flex justify-center items-center flex-shrink-0 bg-mainGreen text-white font-semibold rounded-full ">
                    1
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
                  <span className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-mainBrown rounded-full ">
                    2
                  </span>
                  <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden "></div>
                </div>
                <div className="mt-3">
                  <span className="block text-sm font-medium text-mainBrown ">
                    Thanh Toán
                  </span>
                </div>
              </li>
              <li className=" flex flex-col group">
                <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                  <span className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-mainBrown rounded-full ">
                    3
                  </span>
                  <div className="ms-2 w-full h-px flex-1 bg-gray-200 group-last:hidden "></div>
                </div>
                <div className="mt-3">
                  <span className="block text-sm font-medium text-mainBrown ">
                    Kết Quả
                  </span>
                </div>
              </li>
            </ul>

            <form className="mt-5 text-mainBrown" onSubmit={handleSubmit}>
              <Label htmlFor="username" className=" font-bold">
                Số Lượng Cây <span className="text-red-500 ">*</span>
              </Label>
              <div className="text-muted-foreground text-sm">
                1 cây trồng, bao gồm cả tiền chăm sóc quan sát và chữa bệnh, sẽ
                tương đương 150.000đ
              </div>
              <div className="mt-2 w-full flex flex-wrap gap-2">
                <div
                  className={`
                  ${
                    active === "1"
                      ? "bg-mainGreen text-white hover:bg-mainDarkerGreen hover:text-white "
                      : "bg-white text-mainBrown hover:bg-slate-100 hover:text-mainBrown border-[1px] border-gray-200"
                  }
                px-4 flex py-2 justify-center items-center transition-colors cursor-pointer rounded-md`}
                  onClick={(e) =>
                    handleSetTab(
                      "1",
                      e as React.MouseEvent<HTMLDivElement, MouseEvent>
                    )
                  }
                >
                  1
                </div>
                <div
                  className={`
                  ${
                    active === "2"
                      ? "bg-mainGreen text-white hover:bg-mainDarkerGreen hover:text-white "
                      : "bg-white text-mainBrown hover:bg-slate-100 hover:text-mainBrown border-[1px] border-gray-200"
                  }
                px-4 flex py-2 justify-center items-center transition-colors cursor-pointer rounded-md`}
                  onClick={(e) =>
                    handleSetTab(
                      "2",
                      e as React.MouseEvent<HTMLDivElement, MouseEvent>
                    )
                  }
                >
                  2
                </div>
                <div
                  className={`
                  ${
                    active === "5"
                      ? "bg-mainGreen text-white hover:bg-mainDarkerGreen hover:text-white "
                      : "bg-white text-mainBrown hover:bg-slate-100 hover:text-mainBrown border-[1px] border-gray-200"
                  }
                px-4 flex py-2 justify-center items-center transition-colors cursor-pointer rounded-md`}
                  onClick={(e) =>
                    handleSetTab(
                      "5",
                      e as React.MouseEvent<HTMLDivElement, MouseEvent>
                    )
                  }
                >
                  5
                </div>
                <div
                  className={`
                  ${
                    active === "10"
                      ? "bg-mainGreen text-white hover:bg-mainDarkerGreen hover:text-white "
                      : "bg-white text-mainBrown hover:bg-slate-100 hover:text-mainBrown border-[1px] border-gray-200"
                  }
                px-4 flex py-2 justify-center items-center transition-colors cursor-pointer rounded-md`}
                  onClick={(e) =>
                    handleSetTab(
                      "10",
                      e as React.MouseEvent<HTMLDivElement, MouseEvent>
                    )
                  }
                >
                  10
                </div>
                <div
                  className={`
                  ${
                    active === "input"
                      ? "bg-mainGreen text-white hover:bg-mainDarkerGreen hover:text-white "
                      : "bg-white text-mainBrown hover:bg-slate-100 hover:text-mainBrown border-[1px] border-gray-200"
                  }
                px-4 py-2 flex justify-center items-center transition-colors cursor-pointer rounded-md`}
                  onClick={(e) =>
                    handleSetTab(
                      "input",
                      e as React.MouseEvent<HTMLDivElement, MouseEvent>
                    )
                  }
                >
                  Số lượng khác
                </div>
              </div>
              <div className="mt-2">
                Số tiền quyên góp:{" "}
                {formatVND(calsMoney(formik.values.quantity))}
              </div>
              <div className={`mt-3 ${openInput ? "" : "hidden"}`}>
                <Input
                  type="text"
                  placeholder="Nhập số lượng khác"
                  onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                      event.preventDefault();
                    }
                  }}
                  maxLength={4}
                  onChange={handleSetInput}
                  value={formik.values.quantity}
                />
              </div>

              {formik.errors.quantity ? (
                <div className="text-red-600">{formik.errors.quantity}</div>
              ) : null}
              <div className="flex w-full justify-end">
                <button
                  className="bg-mainGreen text-white hover:bg-mainDarkerGreen hover:text-white px-5 py-2 mt-5 rounded-lg"
                  type="submit"
                >
                  Tiếp theo
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Donation;
