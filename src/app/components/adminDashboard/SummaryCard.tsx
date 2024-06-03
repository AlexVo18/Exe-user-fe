import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Profit } from "@/app/models/revenue.models";
import { formatVND } from "@/app/utils/formatVND";
import { calsTrees } from "@/app/utils/calsTrees";

interface Props {
  icon: ReactNode;
  data: Profit ;
  type: string;
}

const SummaryCard = ({ icon, data, type }: Props) => {
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {type === "total"
            ? "Tổng Doanh Thu"
            : type === "monthly"
            ? "Doanh Thu Tháng Này"
            : "Đã Trồng Được"}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {type === "total" || type === "monthly"
            ? formatVND(data?.totalProfit)
            : calsTrees(data.totalProfit)}
        </div>
        <p className="text-xs text-muted-foreground">
          {type === "total"
            ? ` Dự án  nhận quyên góp được ${calsTrees(data.totalProfit)} cây`
            : type === "monthly"
            ? `Dự án tháng này đã nhận được ${calsTrees(data.totalProfit)} cây`
            : `Dự án đã trồng được ${calsTrees(data.totalProfit)} cây`}
        </p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
