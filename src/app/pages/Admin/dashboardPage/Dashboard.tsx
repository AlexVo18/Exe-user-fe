import { WarningIcon } from "@/app/components/toast/ToastIcons";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import customToast from "@/app/utils/customToast";
import {
  ArrowUpRight,
  Calendar,
  DollarSign,
  TreeDeciduous,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../loadingPage/Loading";
import Revenue from "@/app/api/APIs/revenue";
import { Profit } from "@/app/models/revenue.models";
import { dashboardCardIcon } from "@/app/constants/cssContstants";
import SummaryCard from "@/app/components/adminDashboard/SummaryCard";
import { RecentTree } from "@/app/models/tree.models";
import Tree from "@/app/api/APIs/tree";
import RecentPlantList from "@/app/components/adminDashboard/RecentPlantList";
import AdminNavBar from "@/app/components/main/AdminNavBar";

const defaultProfit: Profit = {
  totalProfit: 0,
  totalPant: 0,
};

const Dashboard = () => {
  const [totalProfit, setTotalProfit] = useState<Profit>(defaultProfit);
  const [monthProfit, setMonthProfit] = useState<Profit>(defaultProfit);
  const [recentTreeList, setRecentTreeList] = useState<RecentTree[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    try {
      getDashboardData();
    } catch (error) {
      customToast({
        icon: <WarningIcon />,
        description: "Đã xảy ra lỗi, không thể lấy dữ liệu",
        duration: 3000,
      });
    }
  }, []);

  useEffect(() => {
    console.log(recentTreeList);
  }, [recentTreeList]);

  const getDashboardData = async () => {
    try {
      const responseTotal = await Revenue.getTotalProfit();
      const responseThisMonth = await Revenue.getThisMonthProfit();
      const responseTreeList = await Tree.getRecentTrees();
      setTotalProfit(responseTotal);
      setMonthProfit(responseThisMonth);
      setRecentTreeList(responseTreeList);
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
      <div className="sticky top-0">
        <AdminNavBar />
      </div>
      {isLoading && <Loading />}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          <SummaryCard
            data={totalProfit}
            icon={<DollarSign className={dashboardCardIcon} />}
            type="total"
          />
          <SummaryCard
            data={monthProfit}
            icon={<Calendar className={dashboardCardIcon} />}
            type="monthly"
          />
          <SummaryCard
            data={totalProfit}
            icon={<TreeDeciduous className={dashboardCardIcon} />}
            type=""
          />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Giao Dịch</CardTitle>
                <CardDescription>Các giao dịch gần đây</CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link to={""}>
                  Xem Tất Cả
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên</TableHead>
                    <TableHead>Ngày giao dịch</TableHead>
                    <TableHead className="text-right">Số lượng</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">2023-06-23</TableCell>
                    <TableCell className="text-right">1 cây</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">2023-06-23</TableCell>
                    <TableCell className="text-right">1 cây</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">2023-06-23</TableCell>
                    <TableCell className="text-right">3 cây</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Liam Johnson</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        liam@example.com
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">2023-06-23</TableCell>
                    <TableCell className="text-right">5 cây</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <div>
            <Card x-chunk="dashboard-01-chunk-5">
              <CardHeader>
                <CardTitle>Mã Cây</CardTitle>
                <CardDescription>Các mã cây gần đây </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mã Cây</TableHead>
                      <TableHead className="text-right">Người Mua</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <RecentPlantList recentTreeList={recentTreeList} />
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
};

export default Dashboard;
