import { RecentTransactionData } from "@/app/models/payment.models";
import { TableCell, TableRow } from "../ui/table";
import { formatDate } from "@/app/utils/formatDate";
interface Props {
  recentTransactions: RecentTransactionData[];
}

const RecentTransactionList = ({ recentTransactions }: Props) => {
  return (
    <>
      {recentTransactions.map(
        (transaction: RecentTransactionData, index: number) => (
          <TableRow key={index}>
            <TableCell>
              <div className="font-medium">{transaction.username}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {transaction.email}
              </div>
            </TableCell>
            <TableCell className="text-sm">
              {formatDate(transaction.dateCreate)}
            </TableCell>
            <TableCell className="text-right">
              {transaction.quantity} cây
            </TableCell>
          </TableRow>
        )
      )}
    </>
  );
};

export default RecentTransactionList;
