import { TopDonationsData } from "@/app/models/donation.models";

interface Props {
  donateList: TopDonationsData[];
}

const TopList = ({ donateList }: Props) => {
  return (
    <>
      {donateList.length > 0 ? (
        donateList.map((donation: TopDonationsData, index: number) => (
          <div
            className="bg-white rounded-2xl w-full px-5 py-4 shadow mb-3 flex justify-between items-center"
            key={index}
          >
            <div className="">
              <p className="text-mainBrown font-bold text-xl">
                {donation.username}
              </p>
            </div>
            <div className="bg-mainGreen rounded-full text-white px-4 py-1 text-sm text-center">
              {donation.quantity} cây
            </div>
          </div>
        ))
      ) : (
        <div className="text-neutral-200 opacity-50 text-center text-2xl my-5">
          Chưa có quyên góp
        </div>
      )}
    </>
  );
};

export default TopList;
