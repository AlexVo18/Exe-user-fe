import React from "react";
import { Button } from "../../ui/button";
import { Heart } from "lucide-react";
import { Link, LinkProps } from "react-router-dom";
interface IProps {
  title: string;
  bgColor?: string;
  textColor: string;
  link: LinkProps["to"];
  size?: "big" | "";
}

const DonateButton = ({ title, bgColor, textColor, link, size }: IProps) => {
  return (
    <Button
      className={`${bgColor} ${textColor} ${
        size === "big" ? "text-[16px] px-10 py-6" : "px-8 py-4"
      }  font-bold rounded-3xl tracking-wide button_slide slide_right `}
    >
      <Heart fill="white" className="mr-2" size={18} />
      <Link to={link || "/donation"}>{title}</Link>
    </Button>
  );
};

export default DonateButton;
