import NavbarComponent from "./components/NavbarComponent"
import { useState, setState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

function App() {
  const [blogs, setBlogs] = useState([])

  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API}/blogs`)
      .then((response) => {
        setBlogs(response.data)
      })
      .catch((err) => alert(err))
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>บทความ</h1>
      {blogs.map((blog, index) => (
        <div className="row" key={index}>
          <div
            className="col pt-3 pb-2"
            style={{ borderBottom: "1px solid silver" }}
          >
            <Link to={`/blog/${blog.slug}`}>
              <h2>{blog.title}</h2>
            </Link>
            <p>{blog.content.substring(0, 200)}</p>
            <p className="text-muted">
              ผู้เขียน: {blog.author}, เผยแพร่:{" "}
              {new Date(blog.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
