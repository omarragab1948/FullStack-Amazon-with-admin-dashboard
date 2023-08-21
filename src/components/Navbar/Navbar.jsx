import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/header-logo.png";
import { BiSearch } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../rtk/reducers/UserReducer";

const Navbar = () => {
  const user = useSelector((state) => state.user);
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

  const handleInputFocus = () => {
    setInputFocused(true);
  };

  const handleInputBlur = () => {
    setInputFocused(false);
  };
  return (
    <>
      <nav className="z-50 fixed p-2 w-full bg-[#131921] pb-2 flex items-center flex-col md:flex-row">
        <div className="md:w-2/3 w-full flex md:justify-around">
          <div className="w-32">
            <Link to="/">
              <img src={logo} alt="logo-img" className="w-full " />
            </Link>
          </div>
          <div className=" flex w-full mx-2 h-9 align-items-center relative">
            <button
              className={`flex items-center p-2 bg-[#f3f3f3] relative left-0 sm:border-[1px] sm:border-e-gray-400 sm:border-solid ${
                inputFocused ? "outline-[#cd9042] outline outline-2 " : ""
              }`}
              onClick={() => setShowUl(!showUl)}
            >
              All
              <GoTriangleDown className="ml-2" />
            </button>
            {showUl && (
              <ul className="absolute top-9 p-2 w-fit bg-white border border-solid border-gray-300">
                <li>Mobile</li>
                <li>Headphones</li>
                <li>Food</li>
                <li>Electronics</li>
                <li>Kitchen</li>
              </ul>
            )}
            <input
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              type="text"
              className="w-full focus:outline-[#cd9042] outline outline-2"
            />
            <BiSearch
              className={`bg-[#cd9042] w-11 h-full rounded-r-sm ${
                inputFocused ? "outline-[#cd9042] outline outline-2 " : ""
              }`}
            />
          </div>
        </div>
        <div className="md:w-1/3 w-full relative mt-3 md:mt-0 flex justify-between text-white">
          {user.user && (
            <button
              onClick={() => setShow(!show)}
              className="hover:bg-[#cd9042] hover:text-black font-bold text-xl duration-300 w-1/4 flex justify-center items-center"
            >
              {user.user.username}
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
                className="bg-[#cd9042] py-3 duration-300 hover:bg-[#131921] hover:text-white flex justify-center cursor-pointer text-black text-xl"
              >
                Sign Out
              </button>
            </ul>
          )}
          {!user.user && (
            <Link
              to="/signin"
              className="hover:bg-[#cd9042] hover:text-black text-lg duration-300 w-1/4 flex justify-center items-center"
            >
              <h2 className="font-bold">Sign In</h2>
            </Link>
          )}
          <a
            href="#"
            className="hover:bg-[#cd9042] hover:text-black text-lg duration-300 w-1/4 flex flex-col justify-center items-center"
          >
            <span>Returns</span>
            <h2 className="font-bold md:text-sm lg:text-lg">& Orders</h2>
          </a>
          <a
            href="#"
            className="hover:bg-[#cd9042] hover:text-black text-lg duration-300 w-1/4 flex flex-col justify-center items-center"
          >
            <span>Your</span>
            <h2 className="font-bold">Prime</h2>
          </a>
          <Link
            to="/bascket"
            className="hover:bg-[#cd9042] hover:text-black font-bold text-lg duration-300 w-1/4 flex justify-center items-center"
          >
            <BsCart3 className="text-3xl" />
            <h2>{cartItems.length > 0 && cartItems.length} </h2>
          </Link>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
