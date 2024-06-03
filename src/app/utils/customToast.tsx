import { ReactNode } from "react";
import { toastTop } from "@/app/constants/toastTop";
import { toast } from "../components/ui/use-toast";
import ToastDescription from "../components/toast/ToastDescription";

interface Props {
  icon: ReactNode;
  description: string;
  duration: number;
}

const customToast = ({ icon, description, duration }: Props) => {
  toast({
    duration: duration || 3000,
    description: <ToastDescription icon={icon} description={description} />,
    className: toastTop,
  });
};

export default customToast;
