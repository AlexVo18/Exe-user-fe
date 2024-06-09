import { RecentTree } from "@/app/models/tree.models";
import { TableCell, TableRow } from "../ui/table";

interface Props {
  recentTreeList: RecentTree[];
}

const RecentPlantList = ({ recentTreeList }: Props) => {
  return (
    <>
      {recentTreeList.map(
        (tree, index) =>
          index < 6 && (
            <TableRow key={index}>
              <TableCell className="font-medium">{tree.plantCodeID}</TableCell>
              <TableCell className="font-medium text-right">
                {tree.username || "Người mua X"}
              </TableCell>
            </TableRow>
          )
      )}
    </>
  );
};

export default RecentPlantList;
