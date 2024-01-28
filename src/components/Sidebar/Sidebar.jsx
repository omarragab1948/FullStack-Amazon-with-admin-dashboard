// Sidebar.js
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; // If you're using React Router
import { IoHomeSharp } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { BiSolidCategory } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { FiSettings } from "react-icons/fi";

const Sidebar = () => {
  const path = useLocation();
  const [selectedPage, setSelectedPage] = useState("undefined");
  const [open, setOpen] = useState(false);

  const handleChoose = (selected) => {
    setSelectedPage(selected);
    setOpen(false);
  };
  useEffect(() => {
    setSelectedPage(path.pathname.split("/")[2] || "undefined");
  }, [path.pathname]);

  const handleClose = (e) => {
    if (open && e.target.closest(".menu-container") === null) {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
    };
  }, [open]);
  return (
    <>
      <div className="menu-container">
        <button
          onClick={() => setOpen(!open)}
          className={`mt-20 ${
            open && "ml-48"
          } md:hidden absolute bg-main text-black duration-300 p-2 top-20`}
        >
          <FiSettings className="text-4xl animate-spin" />
        </button>
        <div
          className={` min-h-screen w-0 md:w-16 sidebar ${
            open ? "sidebar " : ""
          } ${
            open && "w-48 px-2"
          } mt-[74px] md:hover:w-48 fixed md:px-2 pt-10 bg-main overflow-hidden flex flex-col justify-start sm:justify-start sm:flex-col duration-300`}
        >
          <Link
            to="/admindashboard"
            onClick={() => handleChoose("undefined")}
            className={`flex hover:bg-second hover:text-white h-14 rounded-md my-1 duration-300  p-3 items-center text-2xl  ${
              selectedPage === "undefined" && "bg-second text-white"
            }`}
          >
            <span className="">
              <IoHomeSharp />
            </span>
            <span className="ml-2 hidden-span">Dashboard</span>
          </Link>
          <Link
            to="/admindashboard/users"
            onClick={() => handleChoose("users")}
            className={`flex hover:bg-second hover:text-white h-14 rounded-md my-1 duration-300  p-3 items-center text-2xl  ${
              selectedPage === "users" && "bg-second text-white"
            }`}
          >
            <span>
              <FaUsers />
            </span>
            <span className="ml-2 hidden-span">Users</span>
          </Link>
          <Link
            to="/admindashboard/categories"
            onClick={() => handleChoose("categories")}
            className={`flex hover:bg-second hover:text-white h-14 rounded-md my-1 duration-300  p-3 items-center text-2xl  ${
              selectedPage === "categories" && "bg-second text-white"
            }`}
          >
            <span>
              <BiSolidCategory />
            </span>
            <span className="ml-2 hidden-span ">Categories</span>
          </Link>
          <Link
            to="/admindashboard/products"
            onClick={() => handleChoose("products")}
            className={`flex hover:bg-second hover:text-white h-14 justify-start rounded-md my-1 duration-300  p-3 items-center text-2xl  ${
              selectedPage === "products" && "bg-second text-white"
            }`}
          >
            <span>
              <FaCartShopping />
            </span>
            <span className="ml-2 hidden-span">Products</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
