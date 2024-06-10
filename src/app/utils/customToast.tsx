import { ReactNode } from "react";
import { toastTop } from "@/app/constants/cssContstants";
import { toast } from "../components/ui/use-toast";
import ToastCustomContent from "../components/toast/ToastCustomContent";

interface Props {
  icon: ReactNode;
  description: string;
  duration: number;
}
// Phải để trong file tsx
const customToast = ({ icon, description, duration }: Props) => {
  toast({
    duration,
    description: <ToastCustomContent icon={icon} description={description} />,
    className: toastTop,
  });
};

export default customToast;
