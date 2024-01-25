import { Link, useNavigate, useNavigation } from "react-router-dom";
import logo from "../../images/login-logo.png";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import the icons
import { useState } from "react";
import { signUp } from "../../services/apiHandler";
import { ToastContainer, toast } from "react-toastify";

const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError, // Import setError
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setSpinner(true);
      const res = await signUp(data);
      if (res.status === 201) {
        navigate("/signin");
        setSpinner(false);
      }
    } catch (e) {
      setSpinner(false);

      toast.error(e.response.data.message);
    }
    // axios
    //   .get(`https://amzone-colne.onrender.com/users?email=${data.email}`)
    //   .then((response) => {
    //     if (response.data.length > 0) {
    //       // Email already exists, set an error message for the email field
    //       setError("email", {
    //         type: "manual",
    //         message: "Email already exists",
    //       });
    //     } else {
    //       // Email doesn't exist, proceed with form submission
    //       data.products = products;
    //       axios
    //         .post("https://amzone-colne.onrender.com/users", data)
    //         .then(() => {
    //           console.log("Registration successful!");
    //           navigate("/signin");
    //         })
    //         .catch((error) => {
    //           console.log(error);
    //         });
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  const validatePassword = (value) => {
    const password = watch("password");
    return value === password || "Passwords do not match";
  };

  const validatePasswordLength = (value) => {
    return value.length >= 8 || "Password must be at least 8 characters";
  };

  return (
    <div className="flex flex-col justify-center items-center pt-4">
      <ToastContainer />
      <Link to="/">
        <img src={logo} alt="Your Logo" className="mx-auto w-32 mb-4" />
      </Link>
      <div className="max-w-md w-11/12 shadow-xl pt-2 rounded-lg border bg-white border-gray-300">
        <h2 className="text-2xl text-center font-bold mb-4">
          Create an account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" rounded px-8 pt-6  mb-4"
        >
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              {...register("userName", { required: "Username is required" })}
              className="mt-1 px-4 py-2 w-full border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

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
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  validate: validatePasswordLength,
                })}
                className="mt-1 px-4 py-2 w-full border border-gray-400 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: validatePassword,
                })}
                className="mt-1 px-4 py-2 w-full border border-gray-400  rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className=" w-full bg-[#ffd814] text-black px-4 py-2 rounded-md focus:outline-none focus:ring-[#ffd814] focus:border-[#ffd814]"
          >
            Sign Up
          </button>
          <div
            className={`border-4 my-1 border-solid mx-auto  ${
              spinner ? "opacity-1" : "opacity-0"
            } border-gray-400 border-t-main rounded-full w-8 h-8 animate-spin`}
          ></div>
          <p className="text-xs my-2">
            By creating an account, you agree to Amazon's Conditions of Use and
            Privacy Notice.
          </p>
          <p>
            Already have an account?
            <Link to="/signin" className="ms-2 text-sky-700">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
