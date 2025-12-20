import type { ReactElement } from "react";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import type { ColumnDef } from "@tanstack/react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";

// Define the table data type
interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

// Define columns for TanStack Table v8
const columns: ColumnDef<DataType>[] = [
  { header: "Avatar", accessorKey: "avatar" },
  { header: "Name", accessorKey: "name" },
  { header: "Gender", accessorKey: "gender" },
  { header: "Email", accessorKey: "email" },
  { header: "Role", accessorKey: "role" },
  { header: "Action", accessorKey: "action" },
];

// Sample data
const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

const arr: DataType[] = [
  {
    avatar: <img style={{ borderRadius: "50%" }} src={img} alt="Avatar" />,
    name: "Emily Palmer",
    email: "emily.palmer@example.com",
    gender: "female",
    role: "user",
    action: <button><FaTrash /></button>,
  },
  {
    avatar: <img style={{ borderRadius: "50%" }} src={img2} alt="Avatar" />,
    name: "May Scoot",
    email: "aunt.may@example.com",
    gender: "female",
    role: "user",
    action: <button><FaTrash /></button>,
  },
];

const Customers = () => {
  const [rows, _setRows] = useState<DataType[]>(arr);

  // Create the table instance using HOC
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6 // Show pagination only if more than 6 rows
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
    </div>
  );
};

export default Customers;
