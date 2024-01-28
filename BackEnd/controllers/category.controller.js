const asyncWrapper = require("../middlewares/asyncWrapper");
const Category = require("../models/categoryModel");
const connectDB = require("../DB/connectDB");

const addCategory = asyncWrapper(async (req, res) => {
  const { categoryName, categoryImage } = req.body;

  if (!categoryName) {
    return res.status(400).json({ message: "Category name is required." });
  } else if (!categoryImage) {
    return res.status(400).json({ message: "Category image is required." });
  }

  try {
    connectDB();

    const newCategory = {
      name: categoryName,
      image: categoryImage,
    };
    console.log(newCategory);
    await Category.create(newCategory);

    res.status(201).json({ message: "Category added successfully." });
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const getAllCategories = asyncWrapper(async (req, res, next) => {
  const categories = await Category.find();
  if (categories.length > 0) {
    res.status(200).json({
      status: "success",
      data: categories,
    });
  } else {
    res.status(200).json({
      status: "fail",
      data: "There were no categories",
    });
  }
});
module.exports = {
  addCategory,
  getAllCategories,
};
