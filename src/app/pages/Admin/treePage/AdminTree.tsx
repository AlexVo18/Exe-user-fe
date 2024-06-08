import Tree from "@/app/api/APIs/tree";
import { WarningIcon } from "@/app/components/toast/ToastIcons";
import { TreeCode } from "@/app/models/tree.models";
import customToast from "@/app/utils/customToast";
import { useEffect, useState } from "react";
import Loading from "../../loadingPage/Loading";
import AdminNavBar from "@/app/components/main/AdminNavBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";
import { calTableIndex } from "@/app/utils/calTableIndex";
import TreeStatus from "@/app/components/treePage/TreeStatus";
import { formatDate } from "@/app/utils/formatDate";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";
import { Button } from "@/app/components/ui/button";
import { Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminTree = () => {
  const [treesList, setTreesList] = useState<TreeCode[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const itemsPerPage = 10;

  useEffect(() => {
    try {
      getTreeCode();
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    }
  }, []);

  const getTreeCode = async () => {
    try {
      const response = await Tree.getAdminTreesCode();
      if (response) {
        setTreesList(response);
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

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(treesList.length / itemsPerPage))
    );
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, treesList.length);
  const paginatedList = treesList.slice(startIndex, endIndex);
  return (
    <>
      {isLoading && <Loading />}
      <div className="sticky top-0">
        <AdminNavBar />
      </div>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-5">
        <Card x-chunk="dashboard-06-chunk-0">
          <CardHeader className="flex justify-between lg:flex-row">
            <div>
              <CardTitle>Mã Cây</CardTitle>
              <CardDescription>
                Danh sách các mã cây hiện đang có của dự án
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2 ">
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
                  {/* <TableHead>ID</TableHead> */}
                  <TableHead>Mã Cây</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead>Người dùng</TableHead>
                  <TableHead className="w-[400px]">Nơi trồng</TableHead>
                  <TableHead>Ngày tạo</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedList.map((tree: TreeCode, index: number) => (
                  <TableRow key={index + 1}>
                    <TableCell>
                      {calTableIndex(currentPage, index, itemsPerPage)}
                    </TableCell>
                    <TableCell>{tree.plantCodeID}</TableCell>
                    <TableCell>
                      <TreeStatus status={tree.status} />
                    </TableCell>
                    <TableCell>{tree.username}</TableCell>
                    <TableCell>{`${tree.proviceAddress}. ${tree.proviceAddress}`}</TableCell>
                    <TableCell>{formatDate(tree.dateCreate)}</TableCell>
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
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() =>
                              navigate(
                                `/admin/treeDetail/${tree.plantCodeID}/${tree.status}`
                              )
                            }
                          >
                            <Eye size={16} className="mr-2" />
                            Xem Log
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
                    Math.min(Math.ceil(treesList.length / itemsPerPage), 5)
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
      </div>
    </>
  );
};

export default AdminTree;
