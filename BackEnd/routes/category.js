const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/category.controller");
const { requireAuth, isAdmin } = require("../middlewares/authMiddleware");

router.post(
  "/addcategory",
  requireAuth,
  isAdmin,
  categoryController.addCategory
);
router.get(
  "/getcategories",
  requireAuth,
  isAdmin,
  categoryController.getAllCategories
);
// router.post("/signout", authController.signOut);

module.exports = router;
