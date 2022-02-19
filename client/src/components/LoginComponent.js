import { useState } from "react"
import NavbarComponent from "./NavbarComponent"
import axios from "axios"
import Swal from "sweetalert2"
import { withRouter } from "react-router-dom"
import { authenticate } from "../services/authorize"

const LoginConponent = (props) => {
  const [state, setState] = useState({
    username: "",
    password: "",
  })

  const { username, password } = state

  const inputValue = (name) => (event) => {
    setState({ ...state, [name]: event.target.value })
  }

  const submitForm = (e) => {
    e.preventDefault()
    axios
      .post(`${process.env.REACT_APP_API}/login`, { username, password })
      // login สำเร็จ
      .then((response) => {
        authenticate(response, () => props.history.push("/create"))
      })
      .catch((err) => {
        Swal.fire("แจ้งเตือน", err.response.data.err, "error")
      })
  }

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>เข้าสู่ระบบ | Admin</h1>
      {/* {JSON.stringify(state)} */}
      <form action="" onSubmit={submitForm}>
        <div className="from-group">
          <label htmlFor="">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={inputValue("username")}
          />
        </div>

        <div className="from-group">
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={inputValue("password")}
          />
        </div>
        <br />
        <input type="submit" value="เข้าสู่ระบบ" className="btn btn-primary" />
      </form>
    </div>
  )
}

export default withRouter(LoginConponent)
