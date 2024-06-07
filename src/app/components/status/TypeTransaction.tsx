import { lightGreenBg, redBg } from "@/app/constants/cssContstants";

interface Props {
  type: number;
}

const TypeTransaction = ({ type }: Props) => {
  return (
    <div
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${
        type === 0 ? lightGreenBg : redBg
      }}`}
    >
      {type === 0 ? "Thành công" : "Thất bại"}
    </div>
  );
};

export default TypeTransaction;
