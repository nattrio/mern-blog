const express = require("express")
const router = express.Router()
const { create, getAllBlogs } = require("../controllers/blogController")

router.post("/create", create)
router.get("/blogs", getAllBlogs)

module.exports = router
