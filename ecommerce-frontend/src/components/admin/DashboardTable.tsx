import type { ColumnDef } from "@tanstack/react-table";
import TableHOC from "./TableHOC";

// Define your data type
interface DataType {
  _id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

// Define columns using ColumnDef<T>
const columns: ColumnDef<DataType>[] = [
  { header: "Id", accessorKey: "_id" },
  { header: "Quantity", accessorKey: "quantity" },
  { header: "Discount", accessorKey: "discount" },
  { header: "Amount", accessorKey: "amount" },
  { header: "Status", accessorKey: "status" },
];

// DashboardTable uses the TableHOC
const DashboardTable = ({ data = [] }: { data: DataType[] }) => {
  return TableHOC<DataType>(
    columns,
    data,
    "transaction-box",      // container classname
    "Top Transaction",      // table heading
    true                    // show pagination
  )();
};

export default DashboardTable;
