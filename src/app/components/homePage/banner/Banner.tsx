import DonateButton from "../button/DonateButton";

const Banner = () => {
  return (
    <div className="h-[600px]">
      <img
        src="src\assets\Banner.jpg"
        alt="Banner.svg"
        className="w-full object-cover h-[600px] absolute -z-10"
      />
      <div className="grid md:grid-cols-2 z-10 text-white h-full">
        <div className="flex flex-col items-center justify-center">
          <div className="lg:mx-20 xs:mx-10">
            <div className="text-4xl font-semibold cursor-default md:text-start text-center">
              ĐỒNG HÀNH CÙNG NUÔI CÂY
            </div>
            <div className="mt-6 text-xl leading-relaxed text-justify">
              Chỉ với 1 hành động nhỏ, bạn đã giúp môi trường chúng ta trở nên
              tốt đẹp hơn. Hãy cùng Nuôi Cây chung tay góp phần tạo tên 1 Việt
              Nam xanh hơn.
            </div>
            <div className="mt-6">
              <DonateButton
                title="QUYÊN GÓP"
                textColor="white"
                bgColor="bg-mainGreen"
                link={"/donation"}
                size="big"
              />
            </div>
          </div>
        </div>
        <div className="hidden"></div>
      </div>
    </div>
  );
};

export default Banner;
