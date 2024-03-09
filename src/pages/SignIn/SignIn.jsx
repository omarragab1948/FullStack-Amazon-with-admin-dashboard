import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../../images/login-logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../rtk/reducers/UserReducer";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const [invalidUser, setInvalidUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // New state to control password visibility

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Reset error states
    setInvalidUser(false);

    axios
      .get(
        `https://amzone-colne.onrender.com/users?email=${data.email}&password=${data.password}`
      )
      .then((response) => {
        if (response.data.length === 1) {
          // Successfully authenticated
          console.log("Login successful");
          dispatch(setUser(response.data[0]));
          navigate(redirectPath, { replace: true });
        } else {
          // User doesn't exist
          setInvalidUser(true);
        }
      })
      .catch((error) => {
        console.error("Error during login:", error);
      });
  };

  const validatePasswordLength = (value) => {
    return value.length >= 8 || "Password must be at least 8 characters";
  };

  return (
    <div className="flex flex-col justify-center items-center pt-4 ">
      <Link to="/">
        <img src={logo} alt="Your Logo" className="mx-auto w-32 mb-4" />
      </Link>
      <div className="max-w-md w-11/12 shadow-xl p-2  rounded-lg border bg-white border-gray-300 flex flex-col justify-center">
        <h2 className="text-2xl text-center font-bold mb-4">Create Account</h2>
        {invalidUser && (
          <p className="text-red-500 text-xl mx-auto mt-1">
            Invalid email or password.
          </p>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 px-4 py-2 w-full border border-gray-400  rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} // Toggle input type based on showPassword state
                {...register("password", {
                  required: "Password is required",
                  validate: validatePasswordLength,
                })}
                className="mt-1 px-4 py-2 w-full border border-gray-400  rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)} // Toggle the showPassword state
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="text-2xl mt-1" />
                ) : (
                  <AiOutlineEye className="text-2xl mt-1" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className=" w-full bg-[#ffd814] text-black px-4 py-2 rounded-md focus:outline-none focus:ring-[#ffd814] focus:border-[#ffd814]"
          >
            Sign In
          </button>
        </form>
        <div className="flex flex-col justify-center w-full">
          <p className="mx-auto mb-2">New to Amazon?</p>
          <Link
            to="/signup"
            className="border border-solid border-gray-400 rounded-lg text-center p-1 w-4/5 mx-auto mb-2"
          >
            Create your Amazon account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
