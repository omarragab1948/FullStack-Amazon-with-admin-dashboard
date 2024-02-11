import React, { useEffect, useState } from "react";
import { addCategory } from "../../services/apiHandler";
import { useSelector } from "react-redux";
import imageUploader from "../../api/utils/imageUploader";

const CategoryPopup = ({ show, handleShow, handleGetCategories }) => {
  const [categoryName, setCategoryName] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [spinner, setSpinner] = useState(false);

  const user = useSelector((state) => state.user.user);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Preview the image
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    setSpinner(true);

    const image = await imageUploader(imageFile, "category");

    if (image) {
      const cat = {
        categoryName,
        categoryImage: image,
      };
      try {
        const res = await addCategory(cat, user?.token);
        if (res.status === 201) {
          handleGetCategories();
          setSpinner(false);
        }
      } catch (err) {
        console.log(err);
        setSpinner(false);
      }

      handleClose();
    }
  };
  const handleClose = () => {
    handleShow(false);
    setSpinner(false);
    setImageFile(null);
    setImagePreview("");
    setCategoryName("");
  };

  return (
    <>
      {show && (
        <div className="menu-container mt-16 sm:mt-8 fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className=" bg-main text-white p-6 rounded-lg shadow-md w-96 relative">
            <button
              onClick={handleClose}
              className="bg-red-600 hover:bg-red-500 duration-300 absolute top-2 right-3 text-white px-4 py-2 rounded-md"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4">Add Category</h2>

            {/* Image Preview */}
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Category Preview"
                className="mb-4 rounded-md w-full"
                style={{ maxWidth: "100%", maxHeight: "200px" }}
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mb-4 "
            />

            {/* Category Name Input */}
            <input
              type="text"
              placeholder="Category Name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border p-2 mb-4 rounded-md bg-second text-white focus:border-none focus:outline-none"
            />

            {/* Submit and Close Buttons */}
            <div className="flex justify-end">
              <div>
                <div
                  className={`border-4 my-1 border-solid mx-auto  ${
                    spinner ? "opacity-1" : "opacity-0"
                  } border-gray-400 border-t-main rounded-full w-8 h-8 animate-spin`}
                ></div>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!imageFile || !categoryName}
                className={` text-white px-4 py-2 ml-3 rounded-md ${
                  (!imageFile || !categoryName) ? "bg-gray-500" : "bg-second"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryPopup;
