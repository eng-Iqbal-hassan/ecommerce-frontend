import type { ReactElement } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";

// Define table row type
interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

// Sample data
const arr: DataType[] = [
  {
    user: "Charas",
    amount: 4500,
    discount: 400,
    quantity: 3,
    status: <span className="red">Processing</span>,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    quantity: 6,
    status: <span className="green">Shipped</span>,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    quantity: 6,
    status: <span className="purple">Delivered</span>,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
];

// Columns for TanStack Table
const columns: ColumnDef<DataType>[] = [
  { header: "User", accessorKey: "user" },
  { header: "Amount", accessorKey: "amount" },
  { header: "Discount", accessorKey: "discount" },
  { header: "Quantity", accessorKey: "quantity" },
  { header: "Status", accessorKey: "status" },
  { header: "Action", accessorKey: "action" },
];

const Transaction = () => {
  const [rows, _setRows] = useState<DataType[]>(arr); // underscore to ignore unused

  // Create the table instance using HOC
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6 // Show pagination if more than 6 rows
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Transaction;
