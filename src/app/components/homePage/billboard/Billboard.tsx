import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs2";
import Loading from "@/app/pages/loadingPage/Loading";
import Donation from "@/app/api/APIs/donation";
import customToast from "@/app/utils/customToast";
import { WarningIcon } from "../../toast/ToastIcons";
import TopList from "./TopList";
import NewestList from "./NewestList";

const Billboard = () => {
  const [topList, setTopList] = useState([]);
  const [newestList, setNewestList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    try {
      handleGetDonationList();
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    }
  }, []);
  const handleGetDonationList = async () => {
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="text-2xl font-semibold text-center text-white">
        BẢNG XẾP HẠNG
      </div>
      <div className="flex justify-center">
        <Tabs defaultValue="top" className="w-[600px]">
          <div className="flex justify-center">
            <TabsList className="bg-mainLighterSkin rounded-full p-0 my-3">
              <TabsTrigger value="top">Nhiều nhất</TabsTrigger>
              <TabsTrigger value="newest">Mới nhất</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex justify-center">
            {isLoading && <Loading />}
            <TabsContent value="top" className="w-full mx-10">
              <TopList donateList={topList} />
            </TabsContent>
            <TabsContent value="newest" className="w-full mx-10">
              <NewestList donateList={newestList} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Billboard;
