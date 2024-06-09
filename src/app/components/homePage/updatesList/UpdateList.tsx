import { RecentUpdateData } from "@/app/models/news.models";
import { Separator } from "../../ui/separator";
import { formatDate } from "@/app/utils/formatDate";

interface Props {
  recentUpdates: RecentUpdateData[];
}

const UpdateList = ({ recentUpdates }: Props) => {
  return (
    <div className="py-10">
      <div className="text-2xl font-semibold text-center text-mainBrown">
        CẬP NHẬT HẰNG THÁNG
      </div>
      <main className="mt-auto">
        <div className="container mx-auto">
          {recentUpdates.map((update: RecentUpdateData, index: number) => (
            <div
              className="grid grid-cols-11 xl:mx-40 lg:mx-20 gap-2 "
              key={index}
            >
              <div
                className={`${
                  index % 2 === 0 ? "order-last justify-start" : "justify-end"
                } flex items-center col-span-5 my-2`}
              >
                <img
                  src={update.thumbnail}
                  alt="Logo Img"
                  className=" w-60 object-cover"
                />
              </div>
              <div className="col-span-1 flex justify-center">
                <div className="flex justify-center items-center">
                  <Separator
                    className="bg-mainBrown w-0.5"
                    orientation="vertical"
                  />
                  <div className=" w-3 h-3 bg-white rounded-full absolute border-2 border-mainBrown"></div>
                </div>
              </div>
              <div
                className={`${
                  index % 2 === 0 ? "order-first justify-end" : ""
                } flex items-center col-span-5 my-6 `}
              >
                <div className="flex flex-col bg-white p-2 h-full w-60 rounded-lg border-2 border-mainGreen">
                  <div className=" text-xl font-semibold text-mainGreen">
                    Tháng {formatDate(update.dateCreate).slice(3, 5)}/
                    {formatDate(update.dateCreate).slice(6, 10)}
                  </div>
                  {/* 150 chars */}
                  <p className="mt-2 text-sm md:text-base text-justify ">
                    {update.newsSummary}
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="grid grid-cols-11 xl:mx-40 lg:mx-20 mt-5 gap-2">
            <div className="flex justify-end items-center col-span-5 my-2">
              <img src="images/Ex.png" alt="Logo Img" className="w-60" />
            </div>
            <div className="col-span-1 flex justify-center">
              <div className="flex justify-center items-center">
                <Separator
                  className="bg-mainBrown w-0.5"
                  orientation="vertical"
                />
                <div className=" w-3 h-3 bg-white rounded-full absolute border-2 border-mainBrown"></div>
              </div>
            </div>
            <div className="flex justify-start items-center col-span-5 my-6">
              <div className="flex flex-col bg-white p-2 h-full w-60 rounded-lg border-2 border-mainGreen">
                <div className=" text-xl font-semibold text-mainGreen">
                  Tháng 12/2023
                </div>
                <p className="mt-2 text-sm md:text-base text-justify ">
                  Vào tháng 2, các em tại trường tiểu học cơ sở A, thành phố HCM
                  đã được tham quan và trải nghiệm việc trồng cây và học hỏi về
                  kinh nghiệm nuôi nấng các cây xanh tại rừng ngập mặn
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
};

export default UpdateList;
