import { CSSProperties } from "react";

interface Props {
  color: String;
}

const DotLoading = ({ color }: Props) => {
  // Sử dụng màu RGB
  const loaderStyle: CSSProperties = {
    "--loader-border-color": color,
  } as CSSProperties;
  return <span className={`dot`} style={loaderStyle}></span>;
};

export default DotLoading;
