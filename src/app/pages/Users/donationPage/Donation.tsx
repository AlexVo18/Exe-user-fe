import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { calsMoney } from "@/app/utils/calsTrees";
import { formatVND } from "@/app/utils/formatVND";
import { Check } from "lucide-react";
import { useState } from "react";

const Donation = () => {
  const [amount] = useState<number>(1);
  // const handleSetAmount = () => {};
  return (
    <main className="mt-auto ">
      <div className="container mx-auto flex justify-center ">
        <div className=" rounded-2xl shadow-2xl border-black border-[1px] my-10 w-[500px] p-10 ">
          <ul className="relative flex w-full flex-row gap-x-2">
            <li className="shrink basis-0 flex-1 group">
              <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                <span className="size-7 flex justify-center items-center flex-shrink-0 bg-mainGreen text-white font-bold rounded-full ">
                  <Check size={16} />
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
                  Thông tin
                </span>
              </div>
            </li>
            <li className="shrink basis-0 flex-1 group">
              <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                <span className="size-7 flex justify-center items-center flex-shrink-0 bg-gray-100 font-medium text-mainBrown rounded-full ">
                  3
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
                  4
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

          <div className="mt-5 text-mainBrown">
            <Label htmlFor="username">
              Số Lượng Cây <span className="text-red-500 ">*</span>
            </Label>
            <div className="text-muted-foreground text-sm">
              Số lượng cây bạn mong muốn trồng sẽ có giá trị với 1 cây bằng
              150.000đ
            </div>
            <div className="mt-2 w-full flex justify-between">
              <Button variant={"outline"} className="" value={1}>
                1
              </Button>
              <Button variant={"outline"}>2</Button>
              <Button variant={"outline"}>5</Button>
              <Button variant={"outline"}>10</Button>
              <Button variant={"outline"}>Số lượng khác</Button>
            </div>
            <div className="mt-3">
              <Input type="text" placeholder="Nhập số lượng khác" />
              <div>Số tiền quyên góp: {formatVND(calsMoney(amount))}</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Donation;
