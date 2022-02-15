const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()

const blogRoute = require("./route/blog")

const app = express()

// connect cloud DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  })
  .then(() => console.log("Connect DB Successfully!"))
  .catch((err) => console.log(err))

// middleware
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))

// route
app.use("/api", blogRoute)

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Start server in port ${port}`))
