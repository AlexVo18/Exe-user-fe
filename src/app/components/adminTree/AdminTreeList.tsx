import { TreeCodeDetail, TreeLogImage } from "@/app/models/tree.models";
import { useState, useCallback } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { formatDate } from "@/app/utils/formatDate";
import LogStatus from "../treePage/LogStatus";
import FsLightbox from "fslightbox-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import customToast from "@/app/utils/customToast";
import { WarningIcon } from "../toast/ToastIcons";

interface Props {
  detailList: TreeCodeDetail[];
}

const AdminTreeList = ({ detailList }: Props) => {
  const [currentDetailPage, setCurrentDetailPage] = useState<number>(1);
  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    index: 0,
    sources: [] as string[],
  });

  const itemsPerDetail = 3;

  const openLightboxOnSlide = useCallback(
    (images: string[], index: number) => {
      try {
        setLightboxController({
          toggler: !lightboxController.toggler,
          index: index,
          sources: images,
        });
      } catch (error) {
        customToast({
          icon: <WarningIcon />,
          description: "Đã xảy ra lỗi, không thể mở",
          duration: 3000,
        });
      }
    },
    [lightboxController.toggler]
  );

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
                <div className="grid grid-cols-4 gap-2 w-full">
                  {detail.plantImageDetail.map(
                    (image: TreeLogImage, imageIndex: number) => (
                      <div
                        key={imageIndex}
                        className="cursor-pointer"
                        onClick={() =>
                          openLightboxOnSlide(
                            detail.plantImageDetail.map((img) => img.url),
                            imageIndex
                          )
                        }
                      >
                        <img src={image.url} alt="" className="h-full w-full" />
                      </div>
                    )
                  )}
                </div>
                <FsLightbox
                  toggler={lightboxController.toggler}
                  sources={lightboxController.sources}
                  sourceIndex={lightboxController.index}
                  type="image"
                />
              </>
            )}
          </CardFooter>
        </Card>
      ))}
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
    </>
  );
};

export default AdminTreeList;
