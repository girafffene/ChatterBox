import React, { useState, useContext } from "react"
import { Button, Form, Input } from "semantic-ui-react"
import { Link } from "react-router-dom"
import { useAuth } from "react-auth"

export default props => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { signin } = useAuth()

  function handleLogin(e) {
    e.preventDefault()
    signin(username, password).then(profile => {
      props.history.push("/chat/general")
    }).then
  }

  return (
    <div>
      <Form onSubmit={handleLogin}>
        <Form.field
          control={Input}
          value={username}
          onChange={e => setUsername(e.target.value)}
          label={Username}
          placeholder="giraffene"
          error={{ content: "Invalid Username or Password", pointing: "below" }}
        />

        <Form.field
          control={Input}
          value={pasword}
          onChange={e => setPassword(e.target.value)}
          label={Password}
          error={{ true }}
        />

        <Button className="success" type="submit">
          Login
        </Button>
      </Form>
      <Link to="/">Foo</Link>
      <button onClick={e => api.signout()}>Logout</button>
    </div>
  )
}
