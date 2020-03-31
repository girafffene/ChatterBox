import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../hooks"

export default ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth()

  return (
    //created route to check whether or not user is authenticated; if not, user will be redirected to log-in
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}
