import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/header-logo.png";
import { BiSearch } from "react-icons/bi";
import { BsCart3 } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../rtk/reducers/UserReducer";
import { signOut } from "../../services/apiHandler";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [showUl, setShowUl] = useState(false);
  const [inputFocused, setInputFocused] = useState(false);
  const handleLogout = async () => {
    try {
      const res = await signOut();
    } catch (e) {
      console.error(e);
    }
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

  const handleCloseMenu = (e) => {
    if (e.target.closest(".menu-container") === null && show) {
      setShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleCloseMenu);
    return () => {
      document.removeEventListener("click", handleCloseMenu);
    };
  }, [show]);
  return (
    <>
      <nav className="z-50 fixed px-2   w-full bg-second pt-1 sm:py-2  flex flex-col items-center  sm:flex-row">
        <div className="w-full md:w-4/5  flex justify-around items-center">
          <div className="w-1/4 flex justify-center">
            <Link to="/">
              {/* <img src={logo} className="w-full" /> */}
              <h1 className="text-3xl text-white font-bold">E-Shop</h1>
            </Link>
          </div>
          <div className=" flex w-full mx-2 h-9 align-items-center relative">
            <button
              className={`flex items-center p-2 bg-[#f3f3f3] relative left-0 sm:border-[1px] sm:border-e-gray-400 sm:border-solid ${
                inputFocused ? "outline-none focus:outline-none" : ""
              }`}
              onClick={() => setShowUl(!showUl)}
            >
              All
              <GoTriangleDown className="ml-2 " />
            </button>
            {showUl && (
              <div className="absolute z-50 flex flex-col items-start top-9 p-2 w-64 bg-second text-white border border-solid rounded-b-md border-white">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    className=" w-full flex justify-start p-2 rounded-md duration-300 hover:text-second hover:bg-white font-bold"
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
              className="w-full focus:outline-none outline-none"
            />
            <BiSearch
              className={`bg-white w-11 h-full rounded-r-sm text-second ${
                inputFocused ? "outline-none border-none" : ""
              }`}
            />
          </div>
        </div>
        <div className="menu-container w-full  bottom-0 z-50 sm:relative bg-second left-0 sm:w-2/5 py-2  flex justify-around text-white">
          {user?.user && (
            <button
              onClick={() => setShow(!show)}
              className="hover:bg-header px-3 rounded-md w-fit hover:text-white font-bold text-md duration-300  flex justify-center items-center"
            >
              {user?.user}
            </button>
          )}
          {show && (
            <ul className="absolute left-0 w-1/2 bottom-[58px] sm:top-[118px] xl:top-[122px] sm:right-[101px]  flex justify-center flex-col">
              <Link
                to={`${
                  user?.role === "Admin"
                    ? "/admindashboard"
                    : "/profile?status=Sales"
                }`}
                className="bg-main py-3 duration-300 hover:bg-second hover:text-white font-bold flex justify-center cursor-pointer text-white text-xl"
                href="#"
              >
                Profile
              </Link>
              <button
                onClick={() => handleLogout()}
                className="bg-main py-3 duration-300 hover:bg-second hover:text-white font-bold  flex justify-center cursor-pointer text-white text-xl"
              >
                Sign Out
              </button>
            </ul>
          )}
          {!user?.user && (
            <Link
              to="/signin"
              className="hover:bg-main mb-1 w-28 hover:text-black text-lg duration-300  flex justify-center items-center p-1 rounded-md"
            >
              <h2 className="font-bold">Sign In</h2>
            </Link>
          )}
          <Link
            to="/bascket"
            className="hover:bg-header mb-1 p-1 w-28 rounded-md hover:text-white font-bold text-lg duration-300  flex justify-center items-center"
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
