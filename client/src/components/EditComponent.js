import { useState, useEffect } from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const EditComponent = (props) => {
  const [state, setState] = useState({
    title: "",
    author: "",
    slug: "",
  })
  const { title, author, slug } = state
  const [content, setContent] = useState("")

  const submitContent = (event) => {
    setContent(event)
  }

  const showUpdateForm = () => (
    <form action="" onSubmit={submitForm}>
      <div className="from-group">
        <label htmlFor="">ชื่อบทความ</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={inputValue("title")}
        />
      </div>
      <div className="from-group">
        <label htmlFor="">รายละเอียด</label>
        <ReactQuill
          value={content}
          onChange={submitContent}
          theme="snow"
          className="pb-5 mb-3"
          style={{ border: "1px solid #666" }}
        />
      </div>
      <div className="from-group">
        <label htmlFor="">ชื่อผู้แต่ง</label>
        <input
          type="text"
          className="form-control"
          value={author}
          onChange={inputValue("author")}
        />
      </div>
      <br />
      <input type="submit" value="อัพเดต" className="btn btn-primary" />
    </form>
  )
  //   ดึงข้อมูลที่ต้องการแก้ไข
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/blog/${props.match.params.slug}`)
      .then((response) => {
        const { title, content, author, slug } = response.data
        setState({ ...state, title, author, slug })
        setContent(content)
      })
      .catch((err) => alert(err))
    // eslint-disable-next-line
  }, [])

  //   กำหนดค่าให้ state
  const inputValue = (name) => (event) => {
    // console.log(name, "=", event.target.value)
    setState({ ...state, [name]: event.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault()
    console.log("API URL", process.env.REACT_APP_API)
    axios
      .put(`${process.env.REACT_APP_API}/blog/${slug}`, {
        title,
        content,
        author,
      })
      .then((response) => {
        Swal.fire("แจ้งเตือน", "อัพเดตข้อมูลบทความเรียบร้อย", "success")
        const { title, content, author, slug } = response.data
        setState({ ...state, title, author, slug })
        setContent(content)
      })
      .catch((err) => {
        // Swal.fire("แจ้งเตือน", err.response.data.error, "error")
        alert(err)
      })
  }
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>แก้ไขบทความ</h1>
      {showUpdateForm()}
    </div>
  )
}

export default EditComponent
