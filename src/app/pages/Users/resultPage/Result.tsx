import { Check } from "lucide-react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Result = () => {
  const url = useLocation();
  useEffect(() => {
    console.log(url.search.replace("?", ""));
  }, []);
  return (
    <main className="mt-auto ">
      <div className="container mx-auto flex justify-center ">
        <div className=" rounded-2xl shadow-2xl border-black border-[1px] my-10 w-[500px] p-10 ">
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
        </div>
      </div>
    </main>
  );
};

export default Result;
