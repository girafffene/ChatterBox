import React, { useState } from "react"
import { useAuth, api } from "react-auth"
import { Button, Form, Input } from "semantic-ui-react"

export default props => {
  const [username, setUsername] = useState("")
  const [usernameErr, setUsernameErr] = useState("")

  const [password, setPassword] = useState("")
  const [passwordErr, setPasswordErr] = useState("")

  const [cPassword, setCPassword] = useState("")
  const [cPasswordErr, setCPasswordErr] = useState("")

  const { signin } = useAuth()

  function handleLogin(e) {
    e.preventDefault()

    if (username.length < 4) {
      err = true
      setUsernameErr("Min Length is 4")
    } else if (username.length > 20) {
      err = true
      setUsernameErr("Max Length is 20")
    } else {
      setUsernameErr("")
    }

    if (password.length < 8) {
      err = true
      setPasswordErr("Min Length is 8")
    } else {
      setPasswordErr("")
    }

    if (cPassword !== password) {
      err = true
      setCPasswordErr("Passwords Must Match")
    } else {
      setCPasswordErr("")
    }

    if (!err) {
      api.post("/register", { username, password }).then(data => {
        signin(username, password).then(() => {
          props.history.push("/chat/general")
        })
      })
    }

    api.post("/register", { username, password }).then(data => {
      console.log(username, password)
      signin(username, password).then(() => {
        props.history.push("/chat/general")
      })
    })
  }

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.Field
          control={Input}
          value={username}
          onChange={e => setUsername(e.target.value)}
          label="Username"
          placeholder="girafffene"
          error={
            usernameErr ? { content: usernameErr, pointing: below } : false
          }
        />
        <Form.Field
          control={Input}
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          label="Password"
          placeholder="imAPassword2525"
          error={
            passwordErr ? { content: passwordErr, pointing: below } : false
          }
        />
        <Form.Field
          control={Input}
          type="password"
          value={cPassword}
          onChange={e => setCPassword(e.target.value)}
          label="Confirm Password"
          placeholder="imAPassword2525"
          error={
            cPasswordErr ? { content: cPasswordErr, pointing: below } : false
          }
        />
        <Button className="success" type="submit">
          Register
        </Button>
      </Form>
    </div>
  )
}
