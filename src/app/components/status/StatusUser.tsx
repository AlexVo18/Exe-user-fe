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

const StatusUser = ({ status }: Props) => {
  return (
    <div
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${
        status === 0 ? lightGreenBg : redBg
      }`}
    >
      <span
        className={`w-3 h-3 me-1 rounded-full ${
          status === 0 ? lightGreenBtn : redBtn
        }`}
      ></span>
      {status === 0 ? "Bình thường" : "Ban"}
    </div>
  );
};

export default StatusUser;
