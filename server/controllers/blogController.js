// Connect to DB
const slugify = require("slugify")
const Blogs = require("../models/blogs")
const { v4: uuidv4 } = require("uuid")

// Save data
exports.create = (req, res) => {
  const { title, content, author } = req.body
  let slug = slugify(title)

  if (!slug) slug = uuidv4()
  // validate
  switch (true) {
    case !title:
      return res.status(400).json({ error: "please input title" })
      break
    case !content:
      return res.status(400).json({ error: "please input content" })
      break
  }
  Blogs.create({ title, content, author, slug }, (err, blog) => {
    if (err) {
      res.status(400).json({ error: "Duplicate title name!" })
    }
    res.json(blog)
  })
}

// get all blog data
exports.getAllBlogs = (req, res) => {
  Blogs.find({}).exec((err, blogs) => {
    res.json(blogs)
  })
}

// Get single blog by slug
exports.singleBlog = (req, res) => {
  const { slug } = req.params
  Blogs.findOne({ slug }).exec((err, blog) => {
    res.json(blog)
  })
}

exports.remove = (req, res) => {
  const { slug } = req.params
  Blogs.findOneAndRemove({ slug }).exec((err, blog) => {
    if (err) console.log(err)
    res.json({ message: "ลบบทความเรียบร้อย" })
  })
}
