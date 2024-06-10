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
import { Transaction } from "@/app/models/payment.models";
import { formatDate } from "@/app/utils/formatDate";
import { useEffect, useState } from "react";
import Loading from "../../loadingPage/Loading";
import { WarningIcon } from "@/app/components/toast/ToastIcons";
import customToast from "@/app/utils/customToast";
import Payment from "@/app/api/APIs/payment";
import { calTableIndex } from "@/app/utils/calTableIndex";
import { formatVND } from "@/app/utils/formatVND";
import TypeTransaction from "@/app/components/status/TypeTransaction";
import { hideString } from "@/app/utils/hideString";

const AdminTransaction = () => {
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const itemsPerPage = 10;

  useEffect(() => {
    try {
      getTransaction();
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy danh sách",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTransaction = async () => {
    try {
      const response = await Payment.getTransactions();
      if (response) {
        setTransactionsList(response);
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
      Math.min(prevPage + 1, Math.ceil(transactionsList.length / itemsPerPage))
    );
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, transactionsList.length);
  const paginatedList = transactionsList.slice(startIndex, endIndex);

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
              <CardTitle>Giao Dịch</CardTitle>
              <CardDescription>
                Danh sách các giao dịch quyên góp người dùng đã thực hiện
              </CardDescription>
            </div>
            <div className="ml-auto flex items-center gap-2 ">
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>No.</TableHead>
                  <TableHead>ID</TableHead>
                  <TableHead>STK</TableHead>
                  <TableHead>Tên TK</TableHead>
                  <TableHead>Ngân hàng</TableHead>
                  <TableHead>Người dùng</TableHead>
                  <TableHead>Tình trạng</TableHead>
                  <TableHead>Ngày giao dịch</TableHead>
                  <TableHead>Số tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedList.map(
                  (transaction: Transaction, index: number) => (
                    <TableRow key={index + 1}>
                      <TableCell>
                        {calTableIndex(currentPage, index, itemsPerPage)}
                      </TableCell>
                      <TableCell>{transaction.transactionCode}</TableCell>
                      <TableCell>
                        {hideString(transaction.accountBank)}
                      </TableCell>
                      <TableCell>{transaction.accountName}</TableCell>
                      <TableCell>{transaction.bankName}</TableCell>
                      <TableCell>{transaction.username}</TableCell>
                      <TableCell>
                        <TypeTransaction type={transaction.status} />
                      </TableCell>
                      <TableCell>
                        {formatDate(transaction.dateCreate)}
                      </TableCell>
                      <TableCell>{formatVND(transaction.totalAmout)}</TableCell>
                    </TableRow>
                  )
                )}
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
                    Math.min(
                      Math.ceil(transactionsList.length / itemsPerPage),
                      5
                    )
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

export default AdminTransaction;
