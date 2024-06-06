import {
  boughtBg,
  boughtBtn,
  cancelBg,
  cancelBtn,
  grownBg,
  grownBtn,
  plantedBg,
  plantedBtn,
} from "@/app/constants/cssContstants";

interface Props {
  status: number;
}

const TreeStatus = ({ status }: Props) => {
  return (
    <div
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${
        status === 1
          ? boughtBg
          : status === 2
          ? plantedBg
          : status === 3
          ? grownBg
          : cancelBg
      }`}
    >
      <span
        className={`w-3 h-3 me-1 rounded-full ${
          status === 1
            ? boughtBtn
            : status === 2
            ? plantedBtn
            : status === 3
            ? grownBtn
            : cancelBtn
        }`}
      ></span>
      {status === 1
        ? "Đã mua"
        : status === 2
        ? "Đã trồng"
        : status === 3
        ? "Đã ươm mầm"
        : "Đã hủy"}
    </div>
  );
};

export default TreeStatus;
