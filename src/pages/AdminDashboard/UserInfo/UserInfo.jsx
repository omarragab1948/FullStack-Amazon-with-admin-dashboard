import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../../components/Navbar/Navbar";
import { useForm } from "react-hook-form";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { getUserInfoForAdmin } from "../../../services/apiHandler";
const UserInfo = () => {
  const [productsData, setProductsData] = useState([]);
  const [userInfo, setUserInfo] = useState({});
  const [spinner, setSpinner] = useState(false);
  const params = useParams();
  const user = useSelector((state) => state.user.user);
  const handleGetUser = async () => {
    try {
      const res = await getUserInfoForAdmin(user?.token, params?.id);
      setUserInfo(res.data.data?.user);
      setProductsData(res.data.data?.products);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    handleGetUser();
  }, []);
  // const products = productsData.products?.map((product) => {
  //   return (
  //     <div
  //       key={product.id}
  //       className="mb-20 mt-8 pb-4 flex flex-col md:flex-row items-center  border border-solid border-t-white border-x-white border-b-gray-300"
  //     >
  //       <img
  //         src={product.selectedImage}
  //         alt="Product"
  //         className="w-[44%] md:w-[30%] mx-auto md:me-3 mb-6 md:mb-0"
  //       />
  //       <div className="w-full">
  //         <h3 className="text-xl">{product.name}</h3>
  //         <h4 className="font-bold text-md mt-3 mb-2">
  //           Price: <span className="font-semibold">${product.price}</span>
  //         </h4>
  //         <span className="block text-[#007185] mb-2">In Stock</span>
  //         {product.selectedColor && (
  //           <span className="font-bold text-xl">
  //             Color:
  //             <span className="font-normal"> {product.selectedColor}</span>
  //           </span>
  //         )}
  //         <div className="mt-4 flex items-center">
  //           <Link
  //             to={`${product.category}/${product.id}`}
  //             className="bg-blue-700 font-bold text-white py-2 px-4 rounded-md"
  //           >
  //             More Details
  //           </Link>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // });

  const [isEditFormOpen, setIsEditFormOpen] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  console.log(userInfo);
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
  const validatePasswordLength = (value) => {
    return value.length >= 8 || "Password must be at least 8 characters";
  };
  const handleEditPopup = () => {
    setIsEditFormOpen(false);
    reset();
  };

  return (
    <>
      <Navbar />
      <main className="absolute -z-50 mt-32 flex flex-col lg:flex-row justify-between w-full">
        <section className="lg:ms-24 w-full  lg:w-3/5 bg-white rounded p-3 px-4">
          <div className="flex justify-between border border-solid border-t-white border-x-white border-b-gray-200 pb-2">
            <h3 className="text-3xl font-semibold ">User's Products</h3>
          </div>
          {/* {products} */}
          {productsData?.length === 0 && (
            <h2 className="text-2xl flex justify-center mt-3">
              He didn't Choose any product
            </h2>
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

        <section className="w-2/3 mx-auto md:w-2/5 mt-6 md:mt-10 lg:mt-0 bg-white rounded p-3 px-4 h-fit md:mx-auto lg:ms-6 lg:me-6">
          <div>
            <h4 className="font-bold flex justify-start items-center">
              User Name:
              {userInfo?.userName ? (
                <span className="ml-2">{userInfo?.userName}</span>
              ) : (
                <div className=" bg-white flex justify-center items-center ml-2">
                  <div
                    className={`border-2 my-1 border-solid mx-auto  border-gray-400 border-t-main rounded-full w-4 h-4 animate-spin`}
                  ></div>
                </div>
              )}
            </h4>
            <h4 className="my-4 font-bold  flex justify-start items-center ">
              Email:
              {userInfo?.email ? (
                <span className="ml-2">{userInfo?.email}</span>
              ) : (
                <div className=" bg-white flex justify-center items-center ml-2">
                  <div
                    className={`border-2 my-1 border-solid mx-auto  border-gray-400 border-t-main rounded-full w-4 h-4 animate-spin`}
                  ></div>
                </div>
              )}
            </h4>
            <h4 className={`my-2 font-bold flex justify-start items-center `}>
              Account type:
              <span
                className={`${
                  userInfo?.role === "Pending" && "text-orange-400 "
                } ml-2 flex justify-center items-center `}
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
                className="bg-[#ffd814] w-3/4 mx-auto py-2 px-4 rounded-md"
              >
                Edit Information
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default UserInfo;
