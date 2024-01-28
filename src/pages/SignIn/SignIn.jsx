import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import logo from "../../images/login-logo.png";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setUser } from "../../rtk/reducers/UserReducer";
import { signIn } from "../../services/apiHandler";
import { ToastContainer, toast } from "react-toastify";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const [invalidUser, setInvalidUser] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSpinner(true);
      const res = await signIn(data);
      if (res.status === 200) {
        dispatch(setUser(res.data.data));
        navigate("/");
        setSpinner(false);
      }
    } catch (e) {
      toast.error(e.response.data.message);
      setSpinner(false);
    }
  };

  const validatePasswordLength = (value) => {
    return value.length >= 8 || "Password must be at least 8 characters";
  };

  return (
    <div className="flex flex-col justify-center items-center pt-4 ">
      <ToastContainer />
      <Link to="/">
        <img src={logo} alt="Your Logo" className="mx-auto w-32 mb-4" />
      </Link>
      <div className="max-w-md w-11/12 shadow-xl p-2  rounded-lg border bg-white border-gray-300 flex flex-col justify-center">
        <h2 className="text-2xl text-center font-bold mb-4">Sign in</h2>
        {invalidUser && (
          <p className="text-red-500 text-xl mx-auto mt-1">
            Invalid email or password.
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className=" rounded px-8 pt-6 ">
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
          <div
            className={`border-4 my-1 border-solid mx-auto  ${
              spinner ? "opacity-1" : "opacity-0"
            } border-gray-400 border-t-main rounded-full w-8 h-8 animate-spin`}
          ></div>
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
