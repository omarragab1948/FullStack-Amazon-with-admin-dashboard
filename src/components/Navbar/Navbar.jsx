import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/header-logo.png";
import { BiSearch } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../rtk/reducers/UserReducer";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showUl, setShowUl] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const handleLogout = () => {
    dispatch(clearUser());
    navigate("/");
    setShow(false);
  };
  useEffect(() => {});
  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };
  const categories = [
    "Mobile",
    "Headphones",
    "Food",
    "Electronics",
    "Kitchen",
    "Security",
    "Health & Care",
    "Pet supplies",
    "Smart watches",
  ];
  return (
    <>
      <nav className="z-50 fixed px-2   w-full bg-[#131921] py-4 sm:py-2  flex items-center  flex-row">
        <div className="w-full md:w-4/5  flex justify-around items-center">
          <div className="w-1/4 flex justify-center">
            <Link to="/">
              <img src={logo} className="w-full" />
            </Link>
          </div>
          <div className=" flex w-full mx-2 h-9 align-items-center relative">
            <button
              className={`flex items-center p-2 bg-[#f3f3f3] relative left-0 sm:border-[1px] sm:border-e-gray-400 sm:border-solid ${
                inputFocused ? "outline-main outline outline-2 " : ""
              }`}
              onClick={() => setShowUl(!showUl)}
            >
              All
              <GoTriangleDown className="ml-2" />
            </button>
            {showUl && (
              <div className="absolute z-50 flex flex-col items-start top-9 p-2 w-64 bg-white border border-solid border-gray-300">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    className="hover:bg-main w-full flex justify-start p-2 rounded-md duration-300 hover:text-black font-bold"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
            <input
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              type="text"
              className="w-full focus:outline-main outline outline-2"
            />
            <BiSearch
              className={`bg-main w-11 h-full rounded-r-sm ${
                inputFocused ? "outline-main outline outline-2 " : ""
              }`}
            />
          </div>
        </div>
        <div className="w-full fixed bottom-0 z-50 sm:relative bg-[#131921] left-0 sm:w-2/5 py-2  flex justify-around text-white">
          {user && (
            <button
              onClick={() => setShow(!show)}
              className="hover:bg-main px-3 rounded-md w-2/5 hover:text-black font-bold text-xl duration-300  flex justify-center items-center"
            >
              {user}
            </button>
          )}
          {show && (
            <ul className="absolute top-[64px] w-32 left-[-8px] sm:left-[16px] md:left-[-9px] flex justify-center flex-col">
              <Link
                to="/profile"
                className="bg-[#cd9042] py-3 duration-300 hover:bg-[#131921] hover:text-white flex justify-center cursor-pointer text-black text-xl"
                href="#"
              >
                Profile
              </Link>
              <button
                onClick={() => handleLogout()}
                className="bg-main py-3 duration-300 hover:bg-[#131921] hover:text-white flex justify-center cursor-pointer text-black text-xl"
              >
                Sign Out
              </button>
            </ul>
          )}
          {!user && (
            <Link
              to="/signin"
              className="hover:bg-main mb-1 w-28 hover:text-black text-lg duration-300  flex justify-center items-center p-1 rounded-md"
            >
              <h2 className="font-bold">Sign In</h2>
            </Link>
          )}
          <Link
            to="/bascket"
            className="hover:bg-main mb-1 p-1 w-28 rounded-md hover:text-black font-bold text-lg duration-300  flex justify-center items-center"
          >
            <BsCart3 className="text-3xl" />
            <h2>{cartItems.length > 0 && cartItems.length} </h2>
          </Link>
        </div>
      </nav>
      {/* <nav className="z-50 fixed px-2  p-2 w-full bg-[#131921] pt-4 flex items-center flex-col sm:hidden">
        <div className="w-full  mb-2 flex justify-between">
          <div className="w-32 flex justify-center">
            <Link to="/">
              <img src={logo} className="w-32" />
            </Link>
          </div>
        </div>
        <div className=" flex w-full mx-2 h-9 align-items-center relative">
          <button
            className={`flex items-center p-2 bg-[#f3f3f3] relative left-0 border-[1px] border-e-gray-400 border-solid ${
              inputFocused ? "outline-main outline outline-2 " : ""
            }`}
            onClick={() => setShowUl(!showUl)}
          >
            All
            <GoTriangleDown className="ml-2" />
          </button>
          {showUl && (
            <div className="absolute z-50 flex flex-col items-start top-9 p-2 w-full bg-white border border-solid border-gray-300">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  className="hover:bg-main w-full flex justify-start p-2 rounded-md duration-300 hover:text-black font-bold"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
          <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            type="text"
            className="w-full focus:outline-main outline outline-2"
          />
          <BiSearch
            className={`bg-main w-11 h-full rounded-r-sm ${
              inputFocused ? "outline-main outline outline-2 " : ""
            }`}
          />
        </div>
        <div className="w-full sm:w-2/5 relative my-3 md:pt-4 md:mt-0 flex justify-around text-white">
          {!user && (
            <Link
              to="/signin"
              className="hover:bg-main mb-1 px-3 w-2/5 text-white hover:text-black text-lg duration-300  flex justify-center items-center  rounded-md"
            >
              <h2 className="font-bold">Sign In</h2>
            </Link>
          )}
          {user && (
            <button
              onClick={() => setShow(!show)}
              className="hover:bg-main w-2/5 hover:text-black font-bold text-xl duration-300  flex justify-center items-center"
            >
              {user}
            </button>
          )}
          <Link
            to="/bascket"
            className="hover:bg-main mb-1 px-7 text-white rounded-md hover:text-black font-bold text-lg duration-300  flex justify-center items-center"
          >
            <BsCart3 className="text-3xl" />
            <h2>{cartItems.length > 0 && cartItems.length} </h2>
          </Link>
          {show && (
            <ul className="absolute w-32 top-12 flex justify-center flex-col">
              <Link
                to="/profile"
                className="bg-[#cd9042] py-3 duration-300 hover:bg-[#131921] hover:text-white flex justify-center cursor-pointer text-black text-xl"
                href="#"
              >
                Profile
              </Link>
              <button
                onClick={() => handleLogout()}
                className="bg-main py-3 duration-300 hover:bg-[#131921] hover:text-white flex justify-center cursor-pointer text-black text-xl"
              >
                Sign Out
              </button>
            </ul>
          )}
        </div>
      </nav> */}
    </>
  );
};
export default Navbar;
