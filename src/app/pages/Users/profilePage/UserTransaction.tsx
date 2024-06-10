import Payment from "@/app/api/APIs/payment";
import { WarningIcon } from "@/app/components/toast/ToastIcons";
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
import { AuthContext } from "@/app/contexts/AuthContext";
import { Transaction } from "@/app/models/payment.models";
import { calTableIndex } from "@/app/utils/calTableIndex";
import customToast from "@/app/utils/customToast";
import { formatDate } from "@/app/utils/formatDate";
import { formatVND } from "@/app/utils/formatVND";
import { hideString } from "@/app/utils/hideString";
import { useContext, useEffect, useState } from "react";
import Loading from "../../loadingPage/Loading";

const UserTransaction = () => {
  const [transactionsList, setTransactionsList] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { userInfo, userLoading } = useContext(AuthContext);
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
      if (userInfo) {
        const response = await Payment.getUserPayment(userInfo.accountID);
        if (response) {
          setTransactionsList(response);
        }
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
      {isLoading || userLoading ? <Loading /> : null}
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Lịch sử giao dịch</CardTitle>
          <CardDescription>
            Xem các giao dịch bạn đã làm trên Nuôi Cây
          </CardDescription>
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
                <TableHead>Ngày giao dịch</TableHead>
                <TableHead>Số tiền</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedList.map((transaction: Transaction, index: number) => (
                <TableRow key={index + 1}>
                  <TableCell>
                    {calTableIndex(currentPage, index, itemsPerPage)}
                  </TableCell>
                  <TableCell>{transaction.transactionCode}</TableCell>
                  <TableCell>{hideString(transaction.accountBank)}</TableCell>
                  <TableCell>{transaction.accountName}</TableCell>
                  <TableCell>{transaction.bankName}</TableCell>
                  <TableCell>{formatDate(transaction.dateCreate)}</TableCell>
                  <TableCell>{formatVND(transaction.totalAmout)}</TableCell>
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
                  Math.min(Math.ceil(transactionsList.length / itemsPerPage), 5)
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

export default UserTransaction;
