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
import {
  ArrowUpRight,
  Calendar,
  DollarSign,
  TreeDeciduous,
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        <Card x-chunk="dashboard-01-chunk-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tổng Doanh Thu
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">60.000.000đ</div>
            <p className="text-xs text-muted-foreground">
              Dự án đã nhập quyên góp được 400 cây
            </p>
          </CardContent>
        </Card>

        <Card x-chunk="dashboard-01-chunk-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Doanh Thu Tháng Này
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">300.000đ</div>
            <p className="text-xs text-muted-foreground">
              Dự án tháng này đã nhận được 2 cây
            </p>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Đã Trồng Được</CardTitle>
            <TreeDeciduous className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">30 cây</div>
            <p className="text-xs text-muted-foreground">
              Dự án đã trồng được 30 cây
            </p>
          </CardContent>
        </Card>
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
                <TableRow>
                  <TableCell className="font-medium">FX23782913</TableCell>
                  <TableCell className="font-medium text-right">
                    Liam Johnson
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">FX23782913</TableCell>
                  <TableCell className="font-medium text-right">
                    Liam Johnson
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">FX23782913</TableCell>
                  <TableCell className="font-medium text-right">
                    Liam Johnson
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">FX23782913</TableCell>
                  <TableCell className="font-medium text-right">
                    Liam Johnson
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">FX23782913</TableCell>
                  <TableCell className="font-medium text-right">
                    Liam Johnson
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">FX23782913</TableCell>
                  <TableCell className="font-medium text-right">
                    Liam Johnson
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Dashboard;
