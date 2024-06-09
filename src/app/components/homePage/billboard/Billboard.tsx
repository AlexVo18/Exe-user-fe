import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs2";
import TopList from "./TopList";
import NewestList from "./NewestList";
import {
  NewestDonationsData,
  TopDonationsData,
} from "@/app/models/donation.models";

interface Props {
  topList: TopDonationsData[];
  newestList: NewestDonationsData[];
}

const Billboard = ({ topList, newestList }: Props) => {
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
