import type { ReactElement } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";

// Define table row type
interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

// Columns definition for TanStack Table
const columns: ColumnDef<DataType>[] = [
  { header: "Photo", accessorKey: "photo" },
  { header: "Name", accessorKey: "name" },
  { header: "Price", accessorKey: "price" },
  { header: "Stock", accessorKey: "stock" },
  { header: "Action", accessorKey: "action" },
];

// Sample data
const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";
const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const arr: DataType[] = [
  {
    photo: <img src={img} alt="Shoes" style={{ width: 60, borderRadius: 5 }} />,
    name: "Puma Shoes Air Jordan Cook Nigga 2023",
    price: 690,
    stock: 3,
    action: <Link to="/admin/product/sajknaskd">Manage</Link>,
  },
  {
    photo: <img src={img2} alt="Shoes" style={{ width: 60, borderRadius: 5 }} />,
    name: "Macbook",
    price: 232223,
    stock: 213,
    action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
  },
];

const Products = () => {
  const [rows, _setRows] = useState<DataType[]>(arr); // underscore to ignore unused

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6 // show pagination if more than 6 rows
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{Table}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
