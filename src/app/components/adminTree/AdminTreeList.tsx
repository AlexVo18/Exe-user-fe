import { TreeCodeDetail } from "@/app/models/tree.models";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/app/utils/formatDate";
import LogStatus from "../treePage/LogStatus";
import LightGallery from "lightgallery/react";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";
import lgZoom from "lightgallery/plugins/zoom";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

interface Props {
  detailList: TreeCodeDetail[];
}

const AdminTreeList = ({ detailList }: Props) => {
  const [currentDetailPage, setCurrentDetailPage] = useState<number>(1);

  const itemsPerDetail = 3;

  const indexOfLastDetail = currentDetailPage * itemsPerDetail;
  const indexOfFirstDetail = indexOfLastDetail - itemsPerDetail;
  const currentDetails = detailList.slice(
    indexOfFirstDetail,
    indexOfLastDetail
  );
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
              <PaginationLink onClick={handleNextDetail}>&gt;</PaginationLink>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      {currentDetails.map((detail: TreeCodeDetail, detailIndex: number) => (
        <Card key={detailIndex} className="mb-5">
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <div className="text-mainGreen">
                <span className="italic mr-1 text-black">Ngày</span>{" "}
                {formatDate(detail.dateCreate).slice(0, 2)}{" "}
                <span className="italic mr-1 text-black">Tháng</span>{" "}
                {formatDate(detail.dateCreate).slice(3, 5)}{" "}
                <span className="italic mr-1 text-black">Năm</span>{" "}
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
            {detail.plantImageDetail.length > 0 && (
              <>
                <div className="mb-2 w-full">Hình ảnh kèm theo:</div>
                <div className="w-full ">
                  <LightGallery
                    plugins={[lgZoom]}
                    mode="lg-fade"
                    speed={500}
                    download={false}
                  >
                    {detail.plantImageDetail.map(
                      (image: string, index: number) => (
                        <a
                          href={image}
                          key={index}
                          className="h-30 w-32 object-fill inline-block m-2"
                        >
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
            )}
          </CardFooter>
        </Card>
      ))}
    </>
  );
};

export default AdminTreeList;
