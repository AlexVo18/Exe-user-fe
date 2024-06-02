import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs2";

const Billboard = () => {
  return (
    <div>
      <div className="text-2xl font-semibold text-center text-white">
        BẢNG XẾP HẠNG
      </div>
      <div className="flex justify-center">
        <Tabs defaultValue="most" className="w-[600px]">
          <div className="flex justify-center">
            <TabsList className="bg-mainLighterSkin rounded-full p-0 my-3">
              <TabsTrigger value="most" className="">
                Nhiều nhất
              </TabsTrigger>
              <TabsTrigger value="newest">Mới nhất</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex justify-center">
            <TabsContent value="most" className="w-full mx-10">
              <div className="bg-white rounded-2xl w-full px-5 pb-2 pt-5 shadow mb-3">
                <div className="flex justify-between">
                  <p className="text-mainBrown font-bold text-xl">
                    Sứ Giả Khe Nứt
                  </p>
                  <div className="bg-mainGreen rounded-full text-white px-4 py-1 text-sm text-center">
                    240 cây
                  </div>
                </div>
                <div className="flex justify-end text-[10px] mt-1">
                  <div className="mr-1 text-gray-400">01/12/2023</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl w-full px-5 pb-2 pt-5 shadow mb-3">
                <div className="flex justify-between">
                  <p className="text-mainBrown font-bold text-xl">ThangLV</p>
                  <div className="bg-mainGreen rounded-full text-white px-4 py-1 text-sm text-center">
                    4 cây
                  </div>
                </div>
                <div className="flex justify-end text-[10px] mt-1">
                  <div className="mr-1 text-gray-400">01/12/2023</div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="newest" className="w-full mx-10">
              <div className="bg-white rounded-2xl w-full px-5 pb-2 pt-5 shadow mb-3">
                <div className="flex justify-between">
                  <p className="text-mainBrown font-bold text-xl">
                    Sứ Giả Khe Nứt
                  </p>
                  <div className="bg-mainGreen rounded-full text-white px-4 py-1 text-sm text-center">
                    240 cây
                  </div>
                </div>
                <div className="flex justify-end text-[10px] mt-1">
                  <div className="mr-1 text-gray-400">01/12/2023</div>
                </div>
              </div>
              <div className="bg-white rounded-2xl w-full px-5 pb-2 pt-5 shadow mb-3">
                <div className="flex justify-between">
                  <p className="text-mainBrown font-bold text-xl">
                    Sứ Giả Khe Nứt
                  </p>
                  <div className="bg-mainGreen rounded-full text-white px-4 py-1 text-sm text-center">
                    4 cây
                  </div>
                </div>
                <div className="flex justify-end text-[10px] mt-1">
                  <div className="mr-1 text-gray-400">01/12/2023</div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default Billboard;
