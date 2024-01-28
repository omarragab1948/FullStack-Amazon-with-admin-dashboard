import React, { useEffect, useState } from "react";
import CategoryPopup from "../../components/CategoryPopup/CategoryPopup";
import { getCategories } from "../../services/apiHandler";
import { useSelector } from "react-redux";

const Categories = () => {
  const [filterdCategories, setFilterdCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [search, setSearch] = useState("");
  const user = useSelector((state) => state.user.user);
  const handleAddCategory = (test) => {
    setShow(test);
  };
  const handleGetCategories = async () => {
    setSpinner(true);
    try {
      const res = await getCategories(user?.token);

      if (Array.isArray(res.data.data)) {
        setCategories(res.data.data);
        setFilterdCategories(res.data.data);
        setSpinner(false);
      } else {
        setSpinner(false);
      }
    } catch (err) {
      setSpinner(false);
    }
  };
  useEffect(() => {
    handleGetCategories();
  }, []);
  useEffect(() => {
    const filterd = categories.filter((category) =>
      category.name.includes(search)
    );
    if (filterd.length > 0) {
      setFilterdCategories([...filterd]);
    } else {
      setFilterdCategories(categories);
    }
  }, [search]);

  if (spinner) {
    return (
      <div className="w-full min-h-screen absolute top-0 left-0 bg-white flex justify-center items-center">
        <div
          className={`border-4 my-1 border-solid mx-auto  ${
            spinner ? "opacity-1" : "opacity-0"
          } border-gray-400 border-t-main rounded-full w-16 h-16 animate-spin`}
        ></div>
      </div>
    );
  }
  return (
    <>
      <div className="absolute top-[96px] pt-8 sm:top-[74px] w-full h-full md:pl-[64px] -z-50 ">
        <div className="w-full px-7 flex justify-center items-center flex-wrap">
          <input
            type="text"
            placeholder="Search for a category"
            value={search}
            className="w-4/5 sm:w-3/4 lg:w-4/5 p-3 rounded-md focus:border-main focus:outline-main"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => handleAddCategory(true)}
            className="bg-blue-500 hover:bg-blue-600 mt-4 sm:mt-0 text-white p-3 ml-3 rounded-md duration-300"
          >
            Add a category
          </button>
        </div>

        <div className="w-full flex justify-center flex-wrap mt-6">
          {filterdCategories.map((category, index) => (
            <div
              key={category.id}
              className="w-4/5 sm:w-1/4 mb-4 lg:w-1/5 mx-4 h-52 border rounded p-4 shadow-md flex flex-col"
            >
              <h2>{category.name}</h2>
              <div className="w-full h-40">
                <img
                  src={category.image}
                  alt="category"
                  className="w-full h-full "
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <CategoryPopup
        show={show}
        handleShow={handleAddCategory}
        handleGetCategories={handleGetCategories}
      />
    </>
  );
};

export default Categories;
