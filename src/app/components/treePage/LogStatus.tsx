import {
  greyBg,
  greyBtn,
  redBg,
  redBtn,
  lightGreenBg,
  lightGreenBtn,
  roseBg,
  roseBtn,
  skyBg,
  skyBtn,
} from "@/app/constants/cssContstants";

interface Props {
  status: number;
}

// 0 chết
// 1 bình thường
// 2 bệnh
// 3 đang được chăm sóc
// 4 khỏe mạnh

const LogStatus = ({ status }: Props) => {
  return (
    <div
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full " ${
        status === 1
          ? greyBg
          : status === 2
          ? roseBg
          : status === 3
          ? skyBg
          : status === 4
          ? lightGreenBg
          : redBg
      }`}
    >
      <span
        className={`w-3 h-3 me-1 rounded-full ${
          status === 1
            ? greyBtn
            : status === 2
            ? roseBtn
            : status === 3
            ? skyBtn
            : status === 4
            ? lightGreenBtn
            : redBtn
        }`}
      ></span>
      {status === 1
        ? "Bình thường"
        : status === 2
        ? "Bệnh"
        : status === 3
        ? "Đang được chăm sóc"
        : status === 4
        ? "Khỏe mạnh"
        : "Chết"}
    </div>
  );
};

export default LogStatus;
