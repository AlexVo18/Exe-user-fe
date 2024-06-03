import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { ReactNode } from "react";
import { Link, LinkProps } from "react-router-dom";
interface IProps {
  title: string;
  bgColor?: string;
  textColor: string;
  link: LinkProps["to"];
  size?: "big" | "";
  isDonate: boolean;
  icon?: ReactNode;
}

const DonateButton = ({
  title,
  bgColor,
  textColor,
  link,
  size,
  isDonate,
  icon,
}: IProps) => {
  return (
    <Link to={link || "/donation"}>
      <Button
        className={`${bgColor} ${textColor} ${
          size === "big" ? "text-[16px] px-10 py-6" : "px-8 py-4"
        }  font-bold rounded-3xl tracking-wide button_slide slide_right `}
      >
        {isDonate ? (
          <>
            <Heart fill="white" className="mr-2" size={18} /> <div>{title}</div>
          </>
        ) : (
          <>
            <div>{title}</div>
            {icon}
          </>
        )}
      </Button>
    </Link>
  );
};

export default DonateButton;
