import { ReactNode } from "react";
interface Props {
  icon: ReactNode;
  description: string;
}

const ToastDescription = ({ icon, description }: Props) => {
  return (
    <div className="flex items-center">
      <div className="mr-2">{icon}</div>
      <div>{description}</div>
    </div>
  );
};

export default ToastDescription;
