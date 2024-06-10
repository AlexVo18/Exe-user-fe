import News from "@/app/api/APIs/news";
import { WarningIcon } from "@/app/components/toast/ToastIcons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/app/components/ui/breadcrumb";
import { NewsDetailData } from "@/app/models/news.models";
import customToast from "@/app/utils/customToast";
import { formatDate } from "@/app/utils/formatDate";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../loadingPage/Loading";

const NewsDetail = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [html, setHTML] = useState({ __html: "" });
  const [newsDetail, setNewsDetail] = useState<NewsDetailData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    try {
      getNewsDetail();
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy dữ liệu",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getNewsDetail = async () => {
    try {
      const response = await News.getNewsDetail(Number(id));
      setHTML({ __html: response.newsDescription });
      setNewsDetail(response);
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy dữ liệu",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loading />}
      <main className="mt-auto ">
        <div className="container mx-auto flex justify-center ">
          <div className=" rounded-2xl shadow-2xl border-black border-[1px] my-10 w-[700px] py-5 px-10 ">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    onClick={() => navigate(-1)}
                    className="cursor-pointer hover:text-mainGreen hover:font-bold"
                  >
                    {type === "1"
                      ? "Cập nhật hằng thắng"
                      : type === "2"
                      ? "Truyền thông"
                      : "Nét sống xanh"}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{newsDetail?.newsTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="font-bold text-xl my-2">
              {newsDetail?.newsTitle}
            </div>
            <div className="text-sm text-muted-foreground my-2">
              Ngày đăng:{" "}
              {newsDetail?.dateCreate
                ? formatDate(newsDetail?.dateCreate)
                : null}
            </div>
            <div className="w-full flex justify-center">
              <img
                src={newsDetail?.thumbnail}
                alt="thumbnail"
                className="w-full "
              />
            </div>

            <div className="my-2" dangerouslySetInnerHTML={html} />
          </div>
        </div>
      </main>
    </>
  );
};

export default NewsDetail;
