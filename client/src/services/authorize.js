// เก็บ token / username => session storage
export const authenticate = (response, next) => {
  if (window !== "undefined") {
    // เก็บข้อมูลลง session storage
    sessionStorage.setItem("token", JSON.stringify(response.data.token))
    sessionStorage.setItem("user", JSON.stringify(response.data.username))
  }
  next()
}
