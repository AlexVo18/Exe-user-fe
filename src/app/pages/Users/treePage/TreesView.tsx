import { TreeCodeDetail, TreeCode } from "@/app/models/tree.models";
import { useContext, useEffect, useState } from "react";
import Loading from "../../loadingPage/Loading";
import DonateButton from "@/app/components/button/DonateButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Calendar, MapPin } from "lucide-react";
import TreeStatus from "@/app/components/treePage/TreeStatus";
import customToast from "@/app/utils/customToast";
import { WarningIcon } from "@/app/components/toast/ToastIcons";
import Tree from "@/app/api/APIs/tree";
import { AuthContext } from "@/app/contexts/AuthContext";
import { formatDate } from "@/app/utils/formatDate";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/app/components/ui/pagination";
import LogStatus from "@/app/components/treePage/LogStatus";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import lgZoom from "lightgallery/plugins/zoom";

const TreesView = () => {
  const [treesList, setTreeList] = useState<TreeCode[]>([]);
  const [detailList, setDetailList] = useState<TreeCodeDetail[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [currentDetailPage, setCurrentDetailPage] = useState<number>(1);
  const itemsPerPage = 3;
  const itemsPerDetail = 2;
  const { userInfo, userLoading } = useContext(AuthContext);

  useEffect(() => {
    try {
      getTreeCodesList();
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    }
  }, []);

  const getTreeCodesList = async () => {
    setIsLoading(true);
    try {
      if (userInfo) {
        const response = await Tree.getUserTreesCode(userInfo?.accountID);
        setTreeList(response);
      }
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

  const handleGetDetail = async (plantCodeID: string) => {
    setIsLoading(true);
    try {
      if (userInfo) {
        const response = await Tree.getTreesCodeDetail(plantCodeID);
        setDetailList(response);
        setCurrentDetailPage(1);
      }
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy được nội dung",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Phân trang code
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = treesList.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(treesList.length / itemsPerPage);
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Phân trang detail
  const indexOfLastDetail = currentDetailPage * itemsPerDetail;
  const indexOfFirstDetail = indexOfLastDetail - itemsPerDetail;
  const currentDetails =
    detailList.length < 2
      ? detailList
      : detailList.slice(indexOfFirstDetail, indexOfLastDetail);

  const totalDetailPages = Math.ceil(detailList.length / itemsPerDetail);
  const handlePreviousDetail = () => {
    if (currentDetailPage > 1) {
      setCurrentDetailPage(currentDetailPage - 1);
    }
  };
  const handleNextDetail = () => {
    if (currentDetailPage < totalDetailPages) {
      setCurrentDetailPage(currentDetailPage + 1);
    }
  };

  return (
    <>
      {isLoading || userLoading ? (
        <Loading />
      ) : (
        <div className="container mx-auto">
          {currentItems.length > 0 ? (
            <div className="grid grid-cols-5 mx-5 md:mx-40 my-5 gap-4">
              <div className="lg:col-span-2 col-span-5 w-full">
                <div className="text-2xl font-semibold text-mainBrown mb-5 text-center">
                  Mã Cây
                </div>
                <div className="w-full justify-center">
                  <Pagination>
                    <PaginationContent className="flex justify-between">
                      <PaginationItem className="cursor-pointer">
                        <PaginationLink onClick={handlePreviousPage}>
                          &lt;
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="cursor-default">
                        {currentPage}/{totalPages}
                      </PaginationItem>
                      <PaginationItem className="cursor-pointer">
                        <PaginationLink onClick={handleNextPage}>
                          &gt;
                        </PaginationLink>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
                {currentItems.map((tree: TreeCode, index: number) => (
                  <Card
                    className="bg-mainSkin text-mainGreen cursor-pointer hover:bg-mainDarkerSkin transition hover:text-mainDarkerBrown mb-5"
                    onClick={() => handleGetDetail(tree.plantCodeID)}
                    key={index}
                  >
                    <CardHeader>
                      <CardTitle className="flex justify-between items-center">
                        <div>{tree.plantCodeID}</div>
                        <TreeStatus status={tree.status} />
                      </CardTitle>
                      <CardDescription className="text-mainBrown">
                        <div className="flex mt-1">
                          <div>
                            <MapPin />
                          </div>
                          <div className="ml-2">
                            {tree.proviceAddress}. {tree.provice}
                          </div>
                        </div>
                        <div className="flex mt-2 items-center">
                          <div>
                            <Calendar />
                          </div>
                          <div className="ml-2">
                            {formatDate(tree.dateCreate)}{" "}
                            <span className="italic text-sm text-gray-400">
                              (Ngày nhận)
                            </span>
                          </div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              <div className="lg:col-span-3 col-span-5 w-full">
                <div className="text-2xl font-semibold text-mainBrown mb-5 text-center">
                  Nhật Ký Cây Trồng
                </div>
                <div className="w-full justify-center">
                  <Pagination>
                    <PaginationContent className="flex justify-between">
                      <PaginationItem className="cursor-pointer">
                        <PaginationLink onClick={handlePreviousDetail}>
                          &lt;
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="cursor-default">
                        {currentDetailPage}/{totalDetailPages}
                      </PaginationItem>
                      <PaginationItem className="cursor-pointer">
                        <PaginationLink onClick={handleNextDetail}>
                          &gt;
                        </PaginationLink>
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
                {currentDetails.length > 0 ? (
                  <>
                    {currentDetails.map(
                      (detail: TreeCodeDetail, index: number) => (
                        <Card className="mb-4" key={index}>
                          <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                              <div className="text-mainGreen">
                                <span className="italic mr-1 text-black">
                                  Ngày
                                </span>{" "}
                                {formatDate(detail.dateCreate).slice(0, 2)}{" "}
                                <span className="italic mr-1 text-black">
                                  Tháng
                                </span>{" "}
                                {formatDate(detail.dateCreate).slice(3, 5)}{" "}
                                <span className="italic mr-1 text-black">
                                  Năm
                                </span>{" "}
                                {formatDate(detail.dateCreate).slice(6, 10)}
                              </div>
                              <div className="mb-2">
                                <LogStatus status={detail.status} />
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>{detail.contentText}</p>
                          </CardContent>
                          <CardFooter className="flex-col">
                            {detail.plantImageDetail.length > 0 ? (
                              <>
                                <div className="mb-2 w-full">
                                  Hình ảnh kèm theo:
                                </div>
                                <div className="w-full ">
                                  <LightGallery
                                    plugins={[lgZoom]}
                                    mode="lg-fade"
                                    speed={500}
                                    download={false}
                                  >
                                    {detail.plantImageDetail.map(
                                      (image: string, index: number) => (
                                        <a href={image} key={index} className="h-30 w-32 object-fill inline-block m-2">
                                          <img
                                            src={image}
                                            alt=""
                                            className="h-30 w-32 object-fill inline-block"
                                          />
                                        </a>
                                      )
                                    )}
                                  </LightGallery>
                                </div>
                              </>
                            ) : (
                              <></>
                            )}
                          </CardFooter>
                        </Card>
                      )
                    )}
                  </>
                ) : (
                  <div className="lg:h-full flex justify-center items-center text-2xl text-muted-foreground text-center">
                    Chọn 1 mã cây để xem những cập nhật mới nhất
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="mx-5 md:mx-80 my-5">
              <div className="text-2xl font-semibold text-center text-mainBrown">
                XEM CÂY
              </div>
              <div className="h-[200px] flex flex-col justify-center items-center text-muted-foreground">
                <div>Bạn hiện tại đang chưa nuôi cây trồng nào</div>
                <div className="mb-5">
                  Hãy cùng Nuôi Cây trồng thêm thât nhiều cây xanh nào
                </div>
                <DonateButton
                  title="QUYÊN GÓP"
                  textColor="white"
                  bgColor="bg-mainGreen"
                  link={"/user/donation"}
                  isDonate={true}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default TreesView;
