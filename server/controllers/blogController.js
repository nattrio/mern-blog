// Connect to DB
const slugify = require("slugify")
const Blogs = require("../models/blogs")

// Save data
exports.create = (req, res) => {
  const { title, content, author } = req.body
  const slug = slugify(title)

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
