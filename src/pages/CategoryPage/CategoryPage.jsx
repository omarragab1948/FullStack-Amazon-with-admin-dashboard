import React, { useState, useEffect } from "react";
import { LiaStarSolid } from "react-icons/lia";
import { FiSettings } from "react-icons/fi";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

const CategoryPage = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const params = useParams();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });

  const handleResetFilter = () => {
    setFilteredProducts(data);
  };

  const handlePriceChange = (e) => {
    const name = e.target.name;
    const value = parseFloat(e.target.value);

    setPriceRange((prevPriceRange) => ({
      ...prevPriceRange,
      [name]: value,
    }));
  };
  useEffect(() => {
    const filteredProducts = data.filter(
      (product) =>
        selectedBrands.includes(product.about.Brand) ||
        (product.price >= priceRange.min && product.price <= priceRange.max)
    );
    setFilteredProducts(filteredProducts.length > 0 ? filteredProducts : data);
  }, [selectedBrands, priceRange, data]);

  useEffect(() => {
    axios
      .get(
        `https://amzone-colne.onrender.com/products?category=${params.category}`
      )
      .then((response) => {
        setData(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => console.log(error));
  }, [params.category]);

  useEffect(() => {
    const filteredProducts = data.filter((product) =>
      selectedBrands.includes(product.about.Brand)
    );
    setFilteredProducts(filteredProducts.length > 0 ? filteredProducts : data);
  }, [selectedBrands, data]);

  const handleInput = (e) => {
    const name = e.target.name;
    const isChecked = e.target.checked;

    setSelectedBrands((prevSelectedBrands) => {
      if (isChecked) {
        return [...prevSelectedBrands, name];
      } else {
        return prevSelectedBrands.filter((brand) => brand !== name);
      }
    });
  };

  const getUniqueBrands = (products) => {
    const brandSet = new Set();
    products.forEach((product) => brandSet.add(product.about.Brand));
    return Array.from(brandSet);
  };

  const uniqueBrands = getUniqueBrands(data);
  const product = filteredProducts.map((pro) => {
    return (
      <Link
        to={`/${params.category}/${pro.id}`}
        key={pro.id}
        className={`flex flex-col me-4 mb-14 w-[60%] sm:w-2/5 md:w-[29%] lg:w-[21%] mb-81`}
      >
        <div className="bg-[f7f7f7] h-64">
          <img
            src={pro.images[0].url}
            className="w-full h-full"
            alt={pro.name}
          />
        </div>
        <h3 className="my-2">{pro.name.slice(0, 65)}...</h3>
        <h3 className="flex text-amber-500 text-xl mb-2">
          <LiaStarSolid />
          <LiaStarSolid />
          <LiaStarSolid />
          <LiaStarSolid />
          <LiaStarSolid />
        </h3>
        <div className="flex items-center">
          <p className="text-2xl font-normal">${pro.price}</p>
        </div>
      </Link>
    );
  });

  return (
    <>
      <Navbar />
      <main className="relative top-28 md:top-20 bg-white flex py-6">
        <aside
          className={`${
            show ? "w-56" : "w-0"
          } fixed h-full top-[123px] md:top-[71px] bg-white duration-300 overflow-hidden`}
        >
          <h4 className="my-3 ms-2 font-semibold text-md">Featured Brands</h4>
          <div className="flex flex-col ps-2">
            {uniqueBrands.map((product, index) => {
              return (
                <label
                  key={index}
                  className="font-normal"
                  name={`${product}`}
                  onChange={handleInput}
                >
                  <input className="me-2" type="checkbox" name={`${product}`} />
                  {`${product}`}
                </label>
              );
            })}
          </div>
          <div className="my-3">
            <h4 className="my-3 ms-2 font-semibold text-md">Price Range</h4>
            <div className="flex flex-col ps-2">
              <label>
                Max Price: ${priceRange.max}
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="10"
                  value={priceRange.max}
                  name="max"
                  onChange={handlePriceChange}
                />
              </label>
            </div>
            <button
              onClick={handleResetFilter}
              className="bg-blue-500 ms-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Reset Filters
            </button>
          </div>
        </aside>
        <button
          className={`flex ${
            show ? "left-56" : "left-0"
          } duration-300 w-10 h-9 top-48 md:top-32 bg-black text-white fixed`}
          onClick={() => setShow(!show)}
        >
          <FiSettings className="text-4xl animate-spin" />
        </button>
        <section className="w-full flex flex-wrap justify-center sm:justify-around">
          {product}
        </section>
      </main>
    </>
  );
};

export default CategoryPage;
