import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Navbar from "../../../components/Navbar/Navbar";
import { getCategories, sellProduct } from "../../../services/apiHandler";
import { useSelector } from "react-redux";
import imageUploader from "../../../api/utils/imageUploader";
import { useNavigate } from "react-router-dom";

const SellProduct = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm();
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [spinner, setSpinner] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "specifications",
  });
  const {
    fields: colorFields,
    append: appendColor,
    remove: removeColor,
  } = useFieldArray({
    control,
    name: "colors",
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...previews]);
  };

  const handleGetCategories = async () => {
    try {
      const res = await getCategories(user?.token);

      if (Array.isArray(res.data.data)) {
        setCategories(res.data.data);
      }
    } catch (err) {}
  };

  useEffect(() => {
    handleGetCategories();

    // Add event listener for beforeunload
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const onSubmit = async (data) => {
    const imagesArray = Array.from(data.images);
    setSpinner(true);
    const uploadedImages = await Promise.all(
      imagesArray.map((image) => imageUploader(image, "products"))
    );

    try {
      const productData = {
        ...data,
        images: uploadedImages,
        status: "Pending",
      };
      setSpinner(true);
      const res = await sellProduct(user?.token, productData);
      if (res.status === 201) {
        navigate("/profile");
        setSpinner(false);
      }
    } catch (err) {
      console.log(err);
      setSpinner(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="absolute mt-32 px-4 w-full flex flex-col items-center pb-8">
        <h1 className="text-3xl font-semibold mb-4 text-white flex justify-center">
          Sell a Product
        </h1>
        <div className="w-full flex flex-wrap justify-center items-start">
          <div className="w-2/3 md:w-1/3 flex flex-col items-start lg:w-1/3 ">
            <label
              htmlFor="images"
              className="block text-white text-lg font-medium mb-1"
            >
              Images
            </label>
            <input
              type="file"
              id="images"
              {...register("images", { required: true })}
              className={`w-full border rounded-md text-white py-2 px-3 focus:outline-none focus:ring focus:border-second ${
                errors.images ? "border-red-500" : ""
              }`}
              multiple
              onChange={handleImageChange}
            />
            {errors.images && (
              <p className="text-red-500 mt-1">Images are required</p>
            )}
            <div className="mt-4 flex justify-center flex-wrap overflow-auto h-80">
              {imagePreviews.map((preview, index) => (
                <button key={index}>
                  <img
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    className="w-48 h-28 mr-2 mb-2 rounded-md"
                  />
                </button>
              ))}
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-2/3 text-white lg:w-3/5 flex flex-col items-center flex-wrap justify-between"
          >
            <div className="mb-4 w-2/3">
              <label htmlFor="title" className="block text-lg font-medium mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                {...register("title", { required: true })}
                className={`w-full bg-body border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-second ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="text-red-500 mt-1">Title is required</p>
              )}
            </div>
            <div className="mb-4 w-2/3">
              <label htmlFor="price" className="block text-lg font-medium mb-1">
                Price ($)
              </label>
              <input
                type="number"
                id="price"
                {...register("price", { required: true, min: 0 })}
                className={`w-full bg-body border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-second ${
                  errors.price ? "border-red-500" : ""
                }`}
              />
              {errors.price && errors.price.type === "required" && (
                <p className="text-red-500 mt-1">Price is required</p>
              )}
              {errors.price && errors.price.type === "min" && (
                <p className="text-red-500 mt-1">
                  Price must be greater than or equal to 0
                </p>
              )}
            </div>
            <div className="mb-4 w-2/3">
              <label
                htmlFor="category"
                className="block text-lg font-medium mb-1"
              >
                Category
              </label>
              <select
                id="category"
                {...register("category", { required: true })}
                className={`w-full bg-body border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-second ${
                  errors.category ? "border-red-500" : ""
                }`}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category?.name}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 mt-1">Category is required</p>
              )}
            </div>

            <div className="mb-4 w-2/3">
              {colorFields.map((field, index) => (
                <div key={field.id} className="mb-4 w-full">
                  <label
                    htmlFor={`colors[${index}].key`}
                    className="block text-lg font-medium mb-1"
                  >
                    Color {index + 1}
                  </label>
                  <input
                    type="text"
                    id={`colors[${index}].name`}
                    {...register(`colors[${index}].name`, { required: true })}
                    className={`w-full bg-body border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-second ${
                      errors.colors?.[index] ? "border-red-500" : ""
                    }`}
                  />
                  {errors.colors?.[index].name && (
                    <p className="text-red-500 mt-1">Color is required</p>
                  )}
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="bg-red-500 hover:bg-red-600 duration-300 my-2 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => appendColor({ name: "" })}
                className="me-3 bg-second hover:bg-secondhover duration-300 text-white font-semibold py-2 px-4 rounded-md"
              >
                Add Color
              </button>
            </div>
            <div className="mb-4 w-2/3">
              <label
                htmlFor="description"
                className="block text-lg font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                {...register("description", { required: true })}
                className={`w-full bg-body border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-second ${
                  errors.description ? "border-red-500" : ""
                }`}
              />
              {errors.description && (
                <p className="text-red-500 mt-1">Description is required</p>
              )}
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className="mb-4 ">
                <label
                  htmlFor={`specifications[${index}].key`}
                  className="block text-lg font-medium mb-1"
                >
                  Specification {index + 1}
                </label>
                <div className="flex w-full">
                  <input
                    type="text"
                    id={`specifications[${index}].name`}
                    {...register(`specifications[${index}].name`, {
                      required: true,
                    })}
                    className={`w-full bg-body border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-second ${
                      errors.specifications?.[index]?.key
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Name"
                  />
                  <input
                    type="text"
                    {...register(`specifications[${index}].value`, {
                      required: true,
                    })}
                    className={`w-full mx-3 bg-body border rounded-md py-2 px-3 focus:outline-none focus:ring focus:border-second ${
                      errors.specifications?.[index]?.value
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Value"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="bg-red-500 hover:bg-red-600 duration-300 text-white font-semibold py-2 px-4 rounded-md"
                  >
                    Remove
                  </button>
                </div>
                {errors.specifications?.[index]?.name && (
                  <p className="text-red-500 mt-1">
                    Specification name is required
                  </p>
                )}
                {errors.specifications?.[index]?.value && (
                  <p className="text-red-500 mt-1">
                    Specification value is required
                  </p>
                )}
              </div>
            ))}

            <div className="w-full flex justify-end">
              <button
                type="button"
                onClick={() => append({ name: "", value: "" })}
                className="me-3 bg-second hover:bg-secondhover duration-300 text-white font-semibold py-2 px-4 rounded-md"
              >
                Add Specification
              </button>
              <button
                type="submit"
                className="flex justify-center w-32 bg-second hover:bg-secondhover duration-300 text-white font-semibold py-2 px-4 rounded-md"
              >
                {!spinner ? (
                  "Sell Product"
                ) : (
                  <div
                    className={`border-2 my-1 border-solid mx-auto   border-gray-400 border-t-white rounded-full w-4 h-4 animate-spin`}
                  ></div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SellProduct;
