import User from "@/app/api/APIs/user";
import { WarningIcon } from "@/app/components/toast/ToastIcons";
import { UserData } from "@/app/models/user.models"
import customToast from "@/app/utils/customToast";
import { useEffect, useState } from "react";
import Loading from "../../loadingPage/Loading";
import AdminNavBar from "@/app/components/main/AdminNavBar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
// import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/app/components/ui/pagination";
// import { Table } from "lucide-react";
// import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/app/components/ui/table";
// import { calTableIndex } from "@/app/utils/calTableIndex";

function UserList() {
    const [usersList, setUsersList] = useState<UserData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const getUsersInfor = async () => {
        try {
            const responseUserData = await User.getUserInfo();
            setUsersList(responseUserData);
        } catch (error) {
            customToast({
                icon: <WarningIcon />,
                description: "Đã xảy ra lỗi, không thể lấy dữ liệu",
                duration: 3000,
            });
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        getUsersInfor();
    }, []);
    console.log(usersList);
    // const handlePreviousPage = () => {
    //     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    // };
    // const handleNextPage = () => {
    //     setCurrentPage((prevPage) =>
    //         Math.min(prevPage + 1, Math.ceil(usersList.length / itemsPerPage))
    //     );
    // };
    // const handlePageClick = (page: number) => {
    //     setCurrentPage(page);
    // };
    // const startIndex = (currentPage - 1) * itemsPerPage;
    // const endIndex = Math.min(startIndex + itemsPerPage, usersList.length);
    // // const paginatedList = usersList.slice(startIndex, endIndex);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = usersList.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(usersList.length / itemsPerPage);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>, page: number) => {
        event.preventDefault();
        setCurrentPage(page);
    };

    return (
        <div>
            {isLoading && <Loading />}
            <div className="sticky top-0">
                <AdminNavBar />
            </div>

            <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 my-5">
                <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader className="flex justify-between lg:flex-row">
                        <div>
                            <CardTitle>Danh sách người sử dụng</CardTitle>
                            <CardDescription className="mt-3 italic">
                                Danh sách các người dùng đã đăng ký
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <table className="">
                            {<thead>
                                <tr>
                                    <th>Full Name</th>
                                    <th>Email</th>
                                    <th>Username</th>
                                    <th>Status</th>
                                </tr>
                            </thead>}

                            <tbody>
                                {currentItems.map((user: UserData, index: number) => (

                                    <tr key={index}>
                                        <td>{user.fullName}</td>
                                        <td>{user.email}</td>
                                        <td>{user.username}</td>
                                        <td>{user.status === 1 ? "Chưa kích hoạt" : "Đã kích hoạt"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex ">
                            {[...Array(totalPages)].map((e, i) =>
                                <button key={i} onClick={(event) => handleClick(event, i + 1)}>{i + 1}</button>
                            )}
                        </div>
                    </CardContent>
                    {/* <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No.</TableHead>
                                    <TableHead>Họ và tên</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Tên đăng nhập</TableHead>
                                    <TableHead>Tình trạng</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedList.map(
                                    (user: UserData, index: number) => (
                                        <TableRow key={index + 1}>
                                            <TableCell>
                                                {calTableIndex(currentPage, index, itemsPerPage)}
                                            </TableCell>
                                            <TableCell>{user.fullName}</TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell>{user.username}</TableCell>
                                            <TableCell>{user.status === 1 ? "Đã kích hoạt" : "Chưa kích hoạt"}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem className="cursor-pointer">
                                    <PaginationPrevious onClick={handlePreviousPage} />
                                </PaginationItem>
                                {[...Array(Math.ceil(usersList.length / itemsPerPage)).keys()].map((pageNum) => (
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
                    </CardFooter> */}
                </Card>
            </div>
        </div>

    )
}

export default UserList