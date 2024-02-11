import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";
import { setUser } from "../../rtk/reducers/UserReducer";
import {
  editUserInfo,
  getProducts,
  getUserInfo,
} from "../../services/apiHandler";
const Profile = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const dispatch = useDispatch();
  const [productsData, setProductsData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [spinner, setSpinner] = useState(false);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user.user);
  const handleGetUser = useCallback(async () => {
    try {
      const res = await getUserInfo(user?.token);
      setUserInfo(res.data.data?.user);
    } catch (err) {
      console.log(err);
    }
  }, [user?.token]); // Memoize the callback

  useEffect(() => {
    handleGetUser();
  }, []);
  const products = productsData?.data?.products?.map((product, i) => {
    return (
      <div
        key={i}
        className=" flex flex-col w-full rounded-lg min-h-[390px] items-center  shadow-second shadow-md hover:bg-second  duration-300"
      >
        <div className=" duration-300 w-full h-48 ">
          <img
            src={product.images[0]}
            alt="Product"
            className="w-full h-full rounded-t-lg duration-300"
          />
        </div>
        <div className="w-full p-2  group">
          <h3 className="text-xl font-bold text-gray-400 group-hover:text-black">
            Title:
            <span className="font-semibold ms-2 text-white">
              {product.title}
            </span>
          </h3>
          <h4 className="font-bold text-md  mt-3 mb-2 text-gray-400 group-hover:text-black">
            Price:
            <span className="font-semibold ms-3 text-white ">
              ${product.price}
            </span>
          </h4>
          <span className="block text-gray-400 mb-2 font-semibold group-hover:text-black">
            In Stock
          </span>
          {/* {product.selectedColor && (
            <span className="font-bold text-xl">
              Color:
              <span className="font-normal"> {product.selectedColor}</span>
            </span>
          )} */}
          <div className="mt-4 flex items-center">
            <Link
              to={`${product.category}/${product.id}`}
              className="bg-second duration-300 group-hover:bg-secondhover font-bold text-white py-2 px-4 rounded-md"
            >
              More Details
            </Link>
          </div>
        </div>
      </div>
    );
  });

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (userInfo) {
      setValue("userName", userInfo.userName);
      setValue("email", userInfo.email);
      setValue("role", userInfo.role);
      setSpinner(false);
    }
  }, [isEditFormOpen]);
  const handleEditSubmit = async (data) => {
    try {
      setSpinner(true);

      const res = await editUserInfo(user.token, data);
      if (res.status === 200) {
        handleGetUser();
        setIsEditFormOpen(false);
        setSpinner(false);
      }
    } catch (err) {
      console.error(err);
      setSpinner(false);
    }
  };

  const handleEditPopup = () => {
    setIsEditFormOpen(false);
    reset();
  };
  const handleGetProducts = async () => {
    try {
      setSpinner(true);
      const res = await getProducts(
        user?.token,
        searchParams.get("status"),
        ""
      );
      setProductsData(res.data);
      setSpinner(false);
    } catch (err) {
      console.error(err);
      setSpinner(false);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, [searchParams]);
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSelectChange = (e) => {
    const selectedStatus = e.target.value;
    setSearchParams({ status: selectedStatus });
  };
  return (
    <>
      <Navbar />
      <main className="absolute  mt-32 grid grid-cols-1 lg:grid-cols-3 w-full">
        <section className=" lg:ms-8  lg:col-span-2 min-h-[400px] shadow-md shadow-second bg-body rounded py-3 px-4">
          <div className="flex justify-between  pb-2">
            <h3 className="text-3xl font-semibold text-white">Your Products</h3>
            {user?.role === "Seller" && (
              <select
                className="bg-second text-white rounded-md p-2"
                onChange={handleSelectChange}
                value={searchParams.get("status")}
              >
                <option value="Sales">Sales</option>
                <option value="Purchases">Purchases</option>
                <option value="Rejected">Rejected</option>
                <option value="Pending">Pending</option>
              </select>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-6">
            {products}
          </div>
          {productsData?.data?.products?.length === 0 && spinner ? (
            <div className="w-full   top-0 left-0  flex justify-center items-center">
              <div
                className={`border-4 my-16 border-solid mx-auto  border-gray-400 border-t-second rounded-full w-16 h-16 animate-spin`}
              ></div>
            </div>
          ) : (
            productsData?.data?.products?.length === 0 &&
            !spinner &&
            productsData?.message !== "Success" && (
              <h2>{productsData?.message}</h2>
            )
          )}
        </section>
        {isEditFormOpen && (
          <section className="fixed w-full h-full bg-black bg-opacity-70 inset-0 flex justify-center items-center">
            <div className="absolute w-1/3 mx-auto  mt-12  bg-white rounded p-3 px-4 h-fit">
              <div className="flex justify-between items-center">
                <h2 className="text-xl mb-4">Edit User Information</h2>
                <button
                  onClick={handleEditPopup}
                  className="bg-red-600 font-bold  text-white py-2 px-4 rounded-md my-3"
                >
                  X
                </button>
              </div>
              <form
                onSubmit={handleSubmit(handleEditSubmit)}
                className="flex flex-col"
              >
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="userName"
                  {...register("userName", {
                    required: "Username is required",
                    minLength: {
                      value: 3,
                      message: "Username must be at least 3 characters",
                    },
                  })}
                  className="mt-1 px-4 py-2 w-full border border-gray-400  rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.username && (
                  <p className="text-red-500">{errors.username.message}</p>
                )}

                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9+_.-]+@([a-zA-Z0-9]+.)+[a-zA-Z0-9]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="mt-1 px-4 py-2 w-full border border-gray-400  rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
                <label htmlFor="userType">User Type</label>
                <select
                  name="role"
                  {...register("role", {
                    required: "User Type is required",
                  })}
                  className="mt-1 px-4 py-2 w-full border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="User">User</option>
                  <option value="Buyer">Buyer</option>
                </select>
                {errors.userType && (
                  <p className="text-red-500">{errors.userType.message}</p>
                )}

                <button
                  type="submit"
                  className="my-3 rounded-full py-2 bg-[#cd9042] text-white font-bold"
                >
                  {spinner && (
                    <div
                      className={`border-4 my-1 border-solid mx-auto  border-white border-t-white rounded-full w-4 h-4 animate-spin`}
                    ></div>
                  )}
                  {!spinner && "Save Changes"}
                </button>
                <button
                  onClick={handleEditPopup}
                  className="bg-red-600 font-bold  text-white py-2 px-4 rounded-md my-1"
                >
                  Cancel
                </button>
              </form>
            </div>
          </section>
        )}

        <section className=" mx-auto mt-6 md:mt-10 lg:mt-0 shadow-md shadow-second bg-body rounded p-3 px-4 h-fit md:mx-auto lg:ms-6 lg:me-6">
          <div>
            <h4 className="font-bold flex justify-start items-center text-gray-400">
              User Name:
              {userInfo?.userName ? (
                <span className="ml-2 text-white">{userInfo?.userName}</span>
              ) : (
                <div className=" bg-white flex justify-center items-center ml-2">
                  <div
                    className={`border-2 my-1 border-solid mx-auto  border-gray-400 border-t-main rounded-full w-4 h-4 animate-spin`}
                  ></div>
                </div>
              )}
            </h4>
            <h4 className="my-4 font-bold  flex justify-start items-center text-gray-400">
              Email:
              {userInfo?.email ? (
                <span className="ml-2 text-white">{userInfo?.email}</span>
              ) : (
                <div className=" bg-white flex justify-center items-center ml-2">
                  <div
                    className={`border-2 my-1 border-solid mx-auto  border-gray-400 border-t-main rounded-full w-4 h-4 animate-spin`}
                  ></div>
                </div>
              )}
            </h4>
            <h4
              className={`my-2 font-bold flex justify-start items-center text-gray-400`}
            >
              Account type:
              <span
                className={`${
                  userInfo?.role === "Pending" && "text-orange-400 "
                } ml-2 flex justify-center items-center text-white`}
              >
                {userInfo?.role ? (
                  userInfo?.role
                ) : (
                  <div className=" bg-white flex justify-center items-center ml-2">
                    <div
                      className={`border-2 my-1 border-solid mx-auto  border-gray-400 border-t-main rounded-full w-4 h-4 animate-spin`}
                    ></div>
                  </div>
                )}
              </span>
            </h4>

            <div className="flex justify-center">
              <button
                onClick={() => setIsEditFormOpen(true)}
                className="bg-second text-white w-3/4 mx-auto py-2 px-4 rounded-md"
              >
                Edit Information
              </button>
            </div>
          </div>
        </section>
        <section className="flex justify-around mt-8">
          {/* Sell Products and View Sales */}
          <div className="bg-blue-200 p-4 rounded-md shadow-md  me-2">
            <h2 className="text-lg font-semibold mb-2">Total Products</h2>
            <p className="text-xl">{userInfo?.totalSalesProducts}</p>
            <h2 className="text-lg font-semibold mb-2">Total Sales</h2>
            <p className="text-xl">${userInfo?.totalSales}</p>
            <div className="flex justify-between flex-col mt-4">
              <Link
                to="/profile/sell-product"
                className="block duration-300  bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-center w-full mb-4"
              >
                Sell Product
              </Link>
              <Link
                to="/profile/sales"
                className="block duration-300 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-center w-full"
              >
                View Sales
              </Link>
            </div>
          </div>

          {/* Buy Products and View Purchases */}
          <div className="bg-green-200 p-4 rounded-md shadow-md ">
            <h2 className="text-lg font-semibold mb-2">Total Products</h2>
            <p className="text-xl">{userInfo?.totalPurchasesProducts}</p>
            <h2 className="text-lg font-semibold mb-2">Total Purchases</h2>
            <p className="text-xl">${userInfo?.totalPurchases}</p>
            <div className="flex justify-between mt-4 flex-col">
              <Link
                to="/profile/buy-product"
                className="block duration-300 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md text-center w-full mb-4"
              >
                Buy Product
              </Link>
              <Link
                to="/profile/purchases"
                className="block duration-300 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md text-center w-full "
              >
                View Purchases
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Profile;
