import { NewestDonationsData } from "@/app/models/donation.models";
import { formatDate } from "@/app/utils/formatDate";

interface Props {
  donateList: NewestDonationsData[];
}

const NewestList = ({ donateList }: Props) => {
  return (
    <>
      {donateList.map((donation: NewestDonationsData, index: number) => (
        <div
          className="bg-white rounded-2xl w-full px-5 pb-2 pt-5 shadow mb-3"
          key={index}
        >
          <div className="flex justify-between">
            <p className="text-mainBrown font-bold text-xl">
              {donation.username}
            </p>
            <div className="bg-mainGreen rounded-full text-white px-4 py-1 text-sm text-center">
              {donation.quantity} cây
            </div>
          </div>
          <div className="flex justify-end text-[10px] mt-1">
            <div className="mr-1 text-gray-400">
              {formatDate(donation.dateOrder)}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default NewestList;
