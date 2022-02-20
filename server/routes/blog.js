const express = require("express")
const router = express.Router()
const {
  create,
  getAllBlogs,
  singleBlog,
  remove,
  update,
} = require("../controllers/blogController")

const { requireLogin } = require("../controllers/authController")

router.post("/create", create)

// ใช้งาน requireLogin เป็น Middleware
router.get("/blogs", requireLogin, getAllBlogs)

router.get("/blog/:slug", singleBlog)
router.delete("/blog/:slug", remove)
router.put("/blog/:slug", update)

module.exports = router
