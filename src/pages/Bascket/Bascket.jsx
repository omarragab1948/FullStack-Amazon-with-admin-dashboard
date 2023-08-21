import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { clearCart, removeFromCart } from "../../rtk/reducers/CartReducers";
import {
  incrementQuantity,
  decrementQuantity,
} from "../../rtk/reducers/CartReducers";
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import axios from "axios";
const Bascket = () => {
  const navigate = useNavigate();
  const [productsData, setProductsData] = useState();
  const [successMessage, setSuccessMessage] = useState(false);
  const [lengthMessage, setLengthMessage] = useState(false);
  const [usertMessage, setUserMessage] = useState(false);
  const user = useSelector((state) => state.user.user);

  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const handleRemove = (id, selectedColor) => {
    dispatch(removeFromCart({ id, selectedColor }));
  };
  const handleIncrement = (id, selectedColor) => {
    dispatch(incrementQuantity({ id, selectedColor }));
  };

  const handleDecrement = (id, selectedColor) => {
    dispatch(decrementQuantity({ id, selectedColor }));
  };
  const handleClear = () => {
    dispatch(clearCart());
  };
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  console.log(productsData);
  useEffect(() => {
    if (user) {
      axios
        .get(`https://amzone-colne.onrender.com/users/${user.id}`)
        .then((response) => {
          setProductsData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user information:", error);
        });
    }
  }, [user]);
  const handleCheckout = () => {
    if (user && cartItems.length > 0) {
      axios
        .patch(`https://amzone-colne.onrender.com/users/${user.id}`, {
          products: [...productsData.products, ...cartItems],
        })
        .then(() => {
          setSuccessMessage(true);
          handleClear();
        })
        .catch((error) => {
          console.error("Error updating user information:", error);
        });
    } else if (!user) {
      navigate("/signin");
    } else {
      setLengthMessage(true);
    }
  };

  const products = cartItems.map((product) => {
    return (
      <div
        key={product.id}
        className="mb-20 mt-8 pb-4 flex flex-col md:flex-row items-center  border border-solid border-t-white border-x-white border-b-gray-300"
      >
        <img
          src={product.image}
          alt="Product"
          className="w-[44%] md:w-[30%] mx-auto md:me-3 mb-6 md:mb-0"
        />
        {/* Display selected color image */}
        <div className="w-full">
          <h3 className="text-xl">{product.name}</h3>
          <h4 className="font-bold text-md mt-3 mb-2">
            Item Price:
            <span className="font-semibold ms-2">${product.price}</span>
          </h4>
          <h4 className="font-bold text-md mt-3 mb-2">
            Total Price:
            <span className="font-semibold ms-2">
              ${product.price * product.quantity}
            </span>
          </h4>
          <span className="block text-[#007185] mb-2">In Stock</span>
          <span className="font-bold text-xl">
            Color:<span className="font-normal"> {product.selectedColor}</span>
            {/* Display selected color */}
          </span>
          <div className="mt-4 flex items-center">
            <Link
              to={`${product.category}/${product.id}`}
              className="bg-blue-700 font-bold text-white py-2 px-4 rounded-md"
            >
              More Details
            </Link>
            <button
              className="bg-red-600 font-bold mx-6 text-white py-2 px-4 rounded-md"
              onClick={() => handleRemove(product.id, product.selectedColor)}
            >
              Delete
            </button>
            <h4 className="font-bold text-md">Quantity: {product.quantity}</h4>
            <button
              className="mx-4 text-3xl"
              onClick={() => handleDecrement(product.id, product.selectedColor)}
            >
              <AiOutlineMinusSquare />
            </button>
            <button
              className="text-3xl"
              onClick={() => handleIncrement(product.id, product.selectedColor)}
            >
              <AiOutlinePlusSquare />
            </button>
          </div>
        </div>
      </div>
    );
  });
  return (
    <>
      <Navbar />
      <main className="absolute mt-32 flex flex-col lg:flex-row justify-between w-full ">
        <section className="lg:ms-8 h-fit w-full lg:w-4/5 bg-white rounded p-3 px-4">
          <div className="flex justify-between border border-solid border-t-white border-x-white border-b-gray-200 pb-2">
            <h3 className="text-3xl font-semibold ">Shopping Cart</h3>
            {cartItems.length > 0 && (
              <button
                onClick={() => handleClear()}
                className="bg-red-600 font-bold  text-white py-2 px-4 rounded-md"
              >
                Clear Cart
              </button>
            )}
          </div>
          {products}
          {cartItems.length === 0 && (
            <h2 className="text-2xl flex justify-center">Your Cart is Empty</h2>
          )}
        </section>
        <section className="w-full md:w-3/5 lg:w-2/5 lg:mt-0   rounded p-3 px-2 h-fit lg:ms-10 mx-auto lg:me-6 md:mt-3">
          <div className="bg-white p-4">
            <h4 className="font-bold text-md mt-3 mb-2">
              Subtotal:
              <span className="font-semibold ms-2">${calculateSubtotal()}</span>
            </h4>
            <h4 className="my-2">{}</h4>
            <div className="flex justify-center">
              <button
                onClick={() => handleCheckout()}
                className="bg-[#ffd814] w-3/4 mx-auto py-2 px-4 rounded-md"
              >
                Proceed to checkout
              </button>
            </div>
          </div>
          {successMessage && (
            <div className="bg-white px-1 py-3 mt-3 relative">
              <button
                onClick={() => setSuccessMessage(false)}
                className="absolute right-2 text-red-600 text-xl"
              >
                <GiCancel />
              </button>
              <p className="text-green-600 mt-10 mb-2 font-bold">
                Checkout successful! Your order has been placed.
              </p>
            </div>
          )}
          {lengthMessage && (
            <div className="bg-white px-1 py-3 mt-3 relative">
              <button
                onClick={() => setLengthMessage(false)}
                className="absolute right-2 text-red-600 text-xl"
              >
                <GiCancel />
              </button>
              <p className="text-green-600 mt-10 mb-2 font-bold">
                You didn't choose any products
              </p>
            </div>
          )}
          {usertMessage && (
            <div className="bg-white px-1 py-3 mt-3 relative">
              <button
                onClick={() => setUserMessage(false)}
                className="absolute right-2 text-red-600 text-xl"
              >
                <GiCancel />
              </button>

              <p className="text-green-600 mt-6 ms-4 font-bold">
                Please sign in before Checkout
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
};
export default Bascket;
