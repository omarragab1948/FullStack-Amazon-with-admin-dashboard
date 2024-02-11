import React, { useEffect, useState } from "react";
import CategoryPopup from "../../components/CategoryPopup/CategoryPopup";
import { deleteCategory, getCategories } from "../../services/apiHandler";
import { useSelector } from "react-redux";
import DeletePopup from "../../components/DeletePopup/DeletePopup";

const Categories = () => {
  const [filterdCategories, setFilterdCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [search, setSearch] = useState("");
  const [idToDelete, setIdToDelete] = useState("");
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
  const handleShowDelete = (id) => {
    setShowDelete(true);
    setIdToDelete(id);
  };
  const handleDelete = async () => {
    try {
      const res = await deleteCategory(idToDelete, user?.token);
      if (res.status === 200) {
        setShowDelete(false);
        handleGetCategories();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="absolute top-[96px] pt-8 sm:top-[74px] w-full  md:pl-[64px] -z-50 ">
        <div className="w-full px-7 flex justify-center items-center flex-wrap">
          <input
            type="text"
            placeholder="Search for a category"
            value={search}
            className="w-4/5 sm:w-3/4 lg:w-4/5 p-3 rounded-md bg-second text-white focus:border-none focus:outline-none"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={() => handleAddCategory(true)}
            className="bg-second hover:bg-secondhover mt-4 sm:mt-0 text-white p-3 ml-3 rounded-md duration-300"
          >
            Add a category
          </button>
        </div>

        <div className="w-full flex justify-center flex-wrap mt-6">
          {filterdCategories && !spinner ? (
            filterdCategories.map((category, index) => (
              <div
                key={index}
                className="w-4/5 sm:w-1/4 mb-4 lg:w-1/5 mx-4 bg-body hover:bg-second duration-300  text-white h-52 rounded px-4 shadow-md shadow-second flex flex-col"
              >
                <div className="relative py-2">
                  <h2>{category.name}</h2>
                  <button
                    onClick={() => handleShowDelete(category?._id)}
                    className="bg-red-600 hover:bg-red-500 duration-300 absolute top-2 right-0 text-white px-2 py-0 rounded-md"
                  >
                    X
                  </button>
                </div>
                <div className="w-full h-40">
                  <img
                    src={category.image}
                    alt="category"
                    className="w-full h-full "
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="w-full  bg-body flex justify-center items-center">
              <div
                className={`border-4 my-16 border-solid mx-auto border-gray-400 border-t-second rounded-full w-16 h-16 animate-spin`}
              ></div>
            </div>
          )}
        </div>
      </div>
      <CategoryPopup
        show={show}
        handleShow={handleAddCategory}
        handleGetCategories={handleGetCategories}
      />
      {showDelete && (
        <DeletePopup onDelete={handleDelete} setShowDelete={setShowDelete} />
      )}
    </>
  );
};

export default Categories;
