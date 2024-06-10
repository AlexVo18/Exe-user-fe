import News from "@/app/api/APIs/news";
import { WarningIcon } from "@/app/components/toast/ToastIcons";
import { Card, CardContent } from "@/app/components/ui/card";
import { NewsData } from "@/app/models/news.models";
import customToast from "@/app/utils/customToast";
import { formatDate } from "@/app/utils/formatDate";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../loadingPage/Loading";

const NewsView = () => {
  const { type } = useParams();
  const [newsList, setNewsList] = useState<NewsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const url = useLocation().pathname;
  const navigate = useNavigate();

  const handleChageType = (type: string) => {
    navigate(`/news/${type}`);
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      getNews();
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }, [type]);

  const getNews = async () => {
    try {
      const response = await News.getTypeNews(Number(type));
      setNewsList(response);
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
      {isLoading && <Loading />}
      <div className="container mx-auto ">
        <div className="flex lg:flex-row flex-col justify-between  mx-5 md:mx-40 my-5 ">
          <div className=" lg:mb-0 text-2xl font-semibold text-mainBrown mb-5 self-center">
            Tin Tức
          </div>
          <div className="flex items-center justify-center bg-mainLighterSkin rounded-full text-mainBrown ">
            <div
              className={`px-5 py-2 text-center cursor-pointer ${
                url.includes("1") ? "bg-mainSkin rounded-l-full font-bold" : ""
              }`}
              onClick={() => handleChageType("1")}
            >
              Cập nhật hằng tháng
            </div>
            <div
              className={`px-5 py-2 text-center cursor-pointer ${
                url.includes("2") ? "bg-mainSkin font-bold" : ""
              }`}
              onClick={() => handleChageType("2")}
            >
              Truyền thông
            </div>
            <div
              className={`px-5 py-2 text-center cursor-pointer ${
                url.includes("3") ? "bg-mainSkin rounded-r-full font-bold" : ""
              }`}
              onClick={() => handleChageType("3")}
            >
              Nét sống xanh
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 mx-5 md:mx-40 my-5 gap-4">
          {newsList.map((news: NewsData, index: number) => (
            <div className="xl:col-span-3 col-span-6 w-full ">
              <Link to={`/news/${type}/${news.newsID}`}>
                <Card className=" w-full hover:shadow-lg transition-shadow" key={index}>
                  <CardContent className="flex flex-col sm:flex-row p-5 gap-5">
                    <img
                      src={news.thumbnail}
                      alt="thumbnail"
                      className="w-40 h-40 object-fill rounded-xl self-center"
                    />
                    <div className="flex flex-col  justify-between">
                      <div className="">
                        <div className="text-lg font-bold text-mainGreen">
                          {news.newsTitle}
                        </div>
                        <div className="text-justify">{news.newsSummary}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Ngày đăng: {formatDate(news.dateCreate)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsView;
