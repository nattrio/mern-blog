import NavbarComponent from "./components/NavbarComponent"
import { useState, setState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

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

  const confirmDelete = (slug) => {
    Swal.fire({
      title: "คุณต้องการลบบทความหรือไม่",
      icon: "warning",
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBlog(slug)
      }
    })
  }

  const deleteBlog = (slug) => {
    axios
      .delete(`${process.env.REACT_APP_API}/blog/${slug}`)
      .then((response) => {
        Swal.fire("Deleted!", response.data.message, "success")
        fetchData()
      })
      .catch((err) => console.log(err))
  }
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
            <Link
              className="btn btn-outline-success"
              to={`/blog/edit/${blog.slug}`}
            >
              อัพเดตบทความ
            </Link>
            &nbsp;
            <button
              className="btn btn-outline-danger"
              onClick={() => confirmDelete(blog.slug)}
            >
              ลบบทความ
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
