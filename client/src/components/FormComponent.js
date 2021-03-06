import { useState } from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getUser, getToken } from "../services/authorize"

const FormComponent = () => {
  const [state, setState] = useState({
    title: "",
    author: getUser(),
  })
  const { title, author } = state

  const [content, setContent] = useState("")

  //   กำหนดค่าให้ state
  const inputValue = (name) => (event) => {
    // console.log(name, "=", event.target.value)
    setState({ ...state, [name]: event.target.value })
  }

  const submitContent = (event) => {
    setContent(event)
  }

  const submitForm = (e) => {
    e.preventDefault()
    console.log("API URL", process.env.REACT_APP_API)
    axios
      .post(
        `${process.env.REACT_APP_API}/create`,
        {
          title,
          content,
          author,
        },
        {
          headers: { authorization: `Bearer ${getToken()}` },
        }
      )
      .then((response) => {
        Swal.fire("แจ้งเตือน", "บันทึกข้อมูลบทความเรียบร้อย", "success")
        setState({ ...state, title: "", author: "" })
        setContent("")
      })
      .catch((err) => {
        Swal.fire("แจ้งเตือน", err.response.data.error, "error")
      })
  }
  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>เขียนบทความ</h1>
      {/* {JSON.stringify(state)} */}
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
            placeholder="รายละเอียดบทความ"
            style={{ border: "1px solid #666" }}
          />
          {/* <textarea
            className="form-control"
            value={content}
            onChange={inputValue("content")}
          ></textarea> */}
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
        <input type="submit" value="บันทึก" className="btn btn-primary" />
      </form>
    </div>
  )
}

export default FormComponent
