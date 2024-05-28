import { CSSProperties } from "react";

interface Props {
  color: String;
}

const Spinner = ({ color }: Props) => {
  // Sử dụng màu RGB
  const loaderStyle: CSSProperties = {
    "--loader-border-color": color,
  } as CSSProperties;
  return <span className="loader" style={loaderStyle}></span>;
};

export default Spinner;
