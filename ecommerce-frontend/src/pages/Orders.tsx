import { useState, type ReactElement } from "react";
import TableHOC from "../components/admin/TableHOC"
import type { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;

}

const column: ColumnDef<DataType>[] = [
  {
    header: "ID",
    accessorKey: "_id",
  },
  {
    header: "Quantity",
    accessorKey: "quantity",
  },
  {
    header: "Discount",
    accessorKey: "discount",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Action",
    accessorKey: "action",
  },
];


const Orders = () => {

    const [rows] = useState<DataType[]>([{
        _id: "BJCHJGKJCHKF",
        amount: 123,
        quantity: 5,
        discount: 60,
        status: <span className="red">Processing</span>,
        action: <Link to={`/order/BJCHJGKJCHKF`}>View</Link>,
    }])
    const Table = TableHOC<DataType>(column, rows, "dashboard-product-box", "Orders", true)()

  return (
    <div className="container">
        <h1>My Orders</h1>
        {Table}
    </div>
  )
}
 
export default Orders
