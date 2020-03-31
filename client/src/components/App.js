import React, { Suspense } from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import { AuthProvider, AuthRoute } from "react-auth"
import "semantic-ui-css/semantic.min.css"

const Auth = React.lazy(() => import("./auth/index"))
const Chat = React.lazy(() => import("./chat.Chat"))

export default props => {
  return (
    <AuthProvider>
      <Router>
        <div>
          {/* loading circle below */}
          <Suspense
            fallback={
              <div class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            }
          >
            <Route path="/login" component={Auth} />
            <Route
              exact
              path="/"
              render={() => <Redirect to="/chat/general" />}
            />
            <AuthRoute path="/chat/:roomname" component={Chat} />
          </Suspense>
        </div>
      </Router>
    </AuthProvider>
  )
}
