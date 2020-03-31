import React from "react"

import MessageForm from "./MessageForm"
import MessageList from "./MessageList"
import MessageHeader from "./MessageHeader"

export default props => {
  return (
    <main className="room">
      <MessageHeader />
      <MessageList />
      <MessageForm />
    </main>
  )
}
