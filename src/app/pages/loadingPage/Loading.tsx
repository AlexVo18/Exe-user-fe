import Spinner from "@/app/components/main/Spinner";
import { useEffect } from "react";

const Loading = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex justify-center items-center w-full bg-transparent mt-5 h-[100vh]">
      <Spinner color={"#5C822D"} />
    </div>
  );
};

export default Loading;
