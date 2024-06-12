import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { Eye, ListFilter, MoreHorizontal, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { SuccessIcon, WarningIcon } from "../toast/ToastIcons";
import customToast from "@/app/utils/customToast";
import News from "@/app/api/APIs/news";
import Loading from "@/app/pages/loadingPage/Loading";
import { NewsData } from "@/app/models/news.models";
import { formatDate } from "@/app/utils/formatDate";
import TypeNews from "../status/TypeNews";
import { calTableIndex } from "@/app/utils/calTableIndex";
import { Link } from "react-router-dom";

const NewsList = () => {
  const [newsList, setNewsList] = useState<NewsData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<number | null>(null);
  const itemsPerPage = 5;

  useEffect(() => {
    try {
      getNews();
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    }
  }, []);

  const getNews = async () => {
    try {
      const response = await News.getAdminNewsList();
      setNewsList(response.reverse());
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

  const handleDisableNews = async (newsID: number) => {
    setIsLoading(true);
    try {
      const response = await News.changeNewsStatus(newsID);
      await getNews();
      if (response) {
        customToast({
          icon: <SuccessIcon />,
          description: "Xóa tin tức thành công",
          duration: 3000,
        });
      }
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, xóa thất bại",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(filteredNewsList.length / itemsPerPage))
    );
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (type: number | null) => {
    setFilterType(type);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const filteredNewsList = filterType
    ? newsList.filter((news) => news.type === filterType)
    : newsList;

  // Calculate slice for pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredNewsList.length);
  const paginatedList = filteredNewsList.slice(startIndex, endIndex);

  return (
    <>
      {isLoading && <Loading />}
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader className="flex justify-between lg:flex-row">
          <div>
            <CardTitle>Tin tức</CardTitle>
            <CardDescription>
              Danh sách các tin tức hiện đang có trên trang web
            </CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-2 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter bằng</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filterType === null}
                  onClick={() => handleFilterChange(null)}
                >
                  Tất Cả
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterType === 1}
                  onClick={() => handleFilterChange(1)}
                >
                  Cập Nhật Hằng Tháng
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterType === 2}
                  onClick={() => handleFilterChange(2)}
                >
                  Tin mới
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filterType === 3}
                  onClick={() => handleFilterChange(3)}
                >
                  Nét Sống Xanh
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* <div className="relative ml-auto flex-1 md:grow-0 w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div> */}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Tiêu đề</TableHead>
                <TableHead className="text-center">Thể loại</TableHead>
                <TableHead>Thumbnail</TableHead>
                {/* <TableHead>Tình trạng</TableHead> */}
                <TableHead>Tóm tắt</TableHead>
                <TableHead className="text-right">Ngày tạo</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedList.map((news: NewsData, index: number) => (
                <TableRow key={index + 1}>
                  <TableCell>
                    {calTableIndex(currentPage, index, itemsPerPage)}
                  </TableCell>
                  <TableCell>{news.newsTitle}</TableCell>
                  <TableCell className="w-[170px] text-center">
                    <TypeNews type={news.type} />
                  </TableCell>
                  <TableCell>
                    <img
                      src={news.thumbnail}
                      alt="thumbnail"
                      className="h-20"
                    />
                  </TableCell>
                  <TableCell >{news.newsSummary}</TableCell>
                  <TableCell className="w-[110px] text-right">{formatDate(news.dateCreate)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <Link
                          to={`/news/${news.type}/${news.newsID}`}
                          target="_blank"
                        >
                          <DropdownMenuItem>
                            <Eye size={16} className="mr-2" />
                            Xem
                          </DropdownMenuItem>
                        </Link>

                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() => handleDisableNews(news.newsID)}
                        >
                          <Trash2 size={16} className="mr-2" />
                          Xóa
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Pagination>
            <PaginationContent>
              <PaginationItem className="cursor-pointer">
                <PaginationPrevious onClick={handlePreviousPage} />
              </PaginationItem>
              {[
                ...Array(
                  Math.min(Math.ceil(filteredNewsList.length / itemsPerPage), 5)
                ).keys(),
              ].map((pageNum) => (
                <PaginationItem key={pageNum + 1} className="cursor-pointer">
                  <PaginationLink
                    isActive={pageNum + 1 === currentPage}
                    onClick={() => handlePageClick(pageNum + 1)}
                  >
                    {pageNum + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem className="cursor-pointer">
                <PaginationNext onClick={handleNextPage} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </>
  );
};

export default NewsList;
