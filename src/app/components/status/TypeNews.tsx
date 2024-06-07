import { lightGreenBg, orangeBg, skyBg } from "@/app/constants/cssContstants";

interface Props {
  type: number;
}

const TypeNews = ({ type }: Props) => {
  return (
    <div
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full ${
        type === 1 ? skyBg : type === 2 ? orangeBg : lightGreenBg
      }}`}
    >
      {type === 1
        ? "Cập nhật hằng tháng"
        : type === 2
        ? "Truyền thông"
        : "Nét sống xanh"}
    </div>
  );
};

export default TypeNews;
