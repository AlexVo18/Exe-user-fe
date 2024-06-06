import Spinner from "@/app/components/main/Spinner";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full bg-[rgba(255,255,255,0.5)] h-[100vh] absolute z-10 ">
      <Spinner color={"#5C822D"} />
    </div>
  );
};

export default Loading;
