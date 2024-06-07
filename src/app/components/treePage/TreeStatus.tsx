import {
  greyBg,
  greyBtn,
  redBg,
  redBtn,
  lightGreenBg,
  lightGreenBtn,
  orangeBg,
  orangeBtn,
} from "@/app/constants/cssContstants";

interface Props {
  status: number;
}

const TreeStatus = ({ status }: Props) => {
  return (
    <div
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${
        status === 1
          ? greyBg
          : status === 2
          ? orangeBg
          : status === 3
          ? lightGreenBg
          : redBg
      }`}
    >
      <span
        className={`w-3 h-3 me-1 rounded-full ${
          status === 1
            ? greyBtn
            : status === 2
            ? orangeBtn
            : status === 3
            ? lightGreenBtn
            : redBtn
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
