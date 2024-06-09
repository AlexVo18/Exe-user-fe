import Donation from "@/app/api/APIs/donation";
import About from "@/app/components/homePage/about/About";
import Banner from "@/app/components/homePage/banner/Banner";
import Billboard from "@/app/components/homePage/billboard/Billboard";
import UpdateList from "@/app/components/homePage/updatesList/UpdateList";
import { WarningIcon } from "@/app/components/toast/ToastIcons";
import customToast from "@/app/utils/customToast";
import { useEffect, useState } from "react";
import Loading from "../../loadingPage/Loading";
import News from "@/app/api/APIs/news";

const Home = () => {
  const [topList, setTopList] = useState([]);
  const [newestList, setNewestList] = useState([]);
  const [recentUpdates, setRecentUpdates] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      getDonationList();
      getRecentUpdate();
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getDonationList = async () => {
    try {
      const responseTopList = await Donation.getTopDonations();
      const responseNewList = await Donation.getNewestDonations();
      setTopList(responseTopList);
      setNewestList(responseNewList);
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    }
  };

  const getRecentUpdate = async () => {
    try {
      const response = await News.getRecentUpdates();
      if (response) {
        setRecentUpdates(response);
      }
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      {isLoading && <Loading />}
      <Banner />
      <About />
      <div className="bg-mainGreen">
        <div className="round-top"></div>
        <Billboard topList={topList} newestList={newestList} />
        <div className="round-bottom"></div>
      </div>
      <div className="bg-mainSkin">
        <UpdateList recentUpdates={recentUpdates} />
      </div>
    </div>
  );
};

export default Home;
