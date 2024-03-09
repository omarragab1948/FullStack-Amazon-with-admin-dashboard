import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Navbar/Navbar";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import axios from "axios";
import { setUser } from "../../rtk/reducers/UserReducer";
const Profile = () => {
  const dispatch = useDispatch();
  const [productsData, setProductsData] = useState({});
  const user = useSelector((state) => state.user.user);
  useEffect(() => {
    axios
      .get(`https://amzone-colne.onrender.com/users/${user.id}`)
      .then((response) => {
        setProductsData(response.data);
      })
      .catch((error) => {
        console.error("Error updating user information:", error);
      });
  }, []);
  const products = productsData.products?.map((product) => {
    return (
      <div
        key={product.id}
        className="mb-20 mt-8 pb-4 flex flex-col md:flex-row items-center  border border-solid border-t-white border-x-white border-b-gray-300"
      >
        <img
          src={product.selectedImage}
          alt="Product"
          className="w-[44%] md:w-[30%] mx-auto md:me-3 mb-6 md:mb-0"
        />
        <div className="w-full">
          <h3 className="text-xl">{product.name}</h3>
          <h4 className="font-bold text-md mt-3 mb-2">
            Price: <span className="font-semibold">${product.price}</span>
          </h4>
          <span className="block text-[#007185] mb-2">In Stock</span>
          {product.selectedColor && (
            <span className="font-bold text-xl">
              Color:
              <span className="font-normal"> {product.selectedColor}</span>
            </span>
          )}
          <div className="mt-4 flex items-center">
            <Link
              to={`${product.category}/${product.id}`}
              className="bg-blue-700 font-bold text-white py-2 px-4 rounded-md"
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
    formState: { errors },
  } = useForm();

  const handleEditSubmit = (data) => {
    setIsEditFormOpen(false);
    axios
      .patch(`https://amzone-colne.onrender.com/users/${user.id}`, {
        username: data.username,
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        dispatch(setUser(response.data));
        setIsEditFormOpen(false);
        reset();
      })
      .catch((error) => {
        console.error("Error updating user information:", error);
      });
  };
  const validatePasswordLength = (value) => {
    return value.length >= 8 || "Password must be at least 8 characters";
  };

  return (
    <>
      <Navbar />
      <main className="absolute mt-32 flex flex-col lg:flex-row justify-between w-full">
        <section className="lg:ms-8 w-full lg:w-4/5 bg-white rounded p-3 px-4 h-fit">
          <div className="flex justify-between border border-solid border-t-white border-x-white border-b-gray-200 pb-2">
            <h3 className="text-3xl font-semibold ">Your Products</h3>
          </div>
          {products}
          {productsData.products?.length === 0 && (
            <h2 className="text-2xl flex justify-center mt-3">
              You didn't Choose any product
            </h2>
          )}
        </section>
        {isEditFormOpen ? (
          <section className="w-2/3 md:w-2/5 mt-6 md:mt-0 bg-white rounded p-3 px-4 h-fit md:ms-10 mx-auto mdme-6">
            <h2 className="text-xl mb-4">Edit User Information</h2>
            <form
              onSubmit={handleSubmit(handleEditSubmit)}
              className="flex flex-col"
            >
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                {...register("username", {
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

              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  validate: validatePasswordLength,
                })}
                className="mt-1 px-4 py-2 w-full border border-gray-400  rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}

              <button
                type="submit"
                className="my-3 rounded-full py-2 bg-[#cd9042] text-white font-bold"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditFormOpen(false)}
                className="bg-red-600 font-bold  text-white py-2 px-4 rounded-md my-3"
              >
                Cancel
              </button>
            </form>
          </section>
        ) : (
          <section className="w-2/3 mx-auto md:w-2/5 mt-6 md:mt-10 lg:mt-0 bg-white rounded p-3 px-4 h-fit md:mx-auto lg:ms-6 lg:me-6">
            <h4 className="font-bold">User Name: {user.username}</h4>
            <h4 className="my-2 font-bold">Email: {user.email}</h4>
            <div className="flex justify-center">
              <button
                onClick={() => setIsEditFormOpen(true)}
                className="bg-[#ffd814] w-3/4 mx-auto py-2 px-4 rounded-md"
              >
                Edit Information
              </button>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

export default Profile;
