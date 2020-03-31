import React from "react"
import Login from "./Login"
import Register from "./Registration"
import { Tab } from "semantic-ui-react"

export default props => {
  const panes = [
    {
      menuItem: "Login",
      render: () => (
        <Tab.Pane attached={false}>
          <Login history={props.history} />
        </Tab.Pane>
      )
    },
    {
      menuItem: "Register",
      render: () => (
        <Tab.Pane attached={false}>
          <Register history={props.history} />
        </Tab.Pane>
      )
    }
  ]

  return (
    <div className="loginContainer">
      <h1>ChatterBox</h1>
      <Tab menu={{ secondary: true, poiting: true }} panes={panes} />
    </div>
  )
}
