import React from "react"
import { Header } from "semantic-ui-react"

export default props => {
  return (
    <header>
      <Header inverted size="large">
        {props.room}
      </Header>
    </header>
  )
}
