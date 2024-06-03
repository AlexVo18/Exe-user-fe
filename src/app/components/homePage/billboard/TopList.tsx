import { TopDonationsData } from "@/app/models/donation.models";

interface Props {
  donateList: TopDonationsData[];
}

const TopList = ({ donateList }: Props) => {
  return (
    <>
      {donateList.map((donation: TopDonationsData) => (
        <>
          <div
            className="bg-white rounded-2xl w-full px-5 py-4 shadow mb-3 flex justify-between items-center"
            key={donation.accountID}
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
        </>
      ))}
    </>
  );
};

export default TopList;
