import React, { useEffect, useRef } from "react"
import { useChat } from "../../hooks"
import moment from "moment"

export default props => {
  const { messages } = useChat()
  const chat = useRef(null)

  useEffect(() => {
    chat.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <section className="messageArea">
      {messages.map((msg, i) => (
        <p key={"message" + i}>
          <strong>{msg.user}:</strong>{" "}
          <span style={{ color: msg.color, fontSize: msg.size + "px" }}>
            {msg.msg}
          </span>
          <span className="timestamp">{moment(msg.timestamp).fromNow()}</span>
        </p>
      ))}

      <div ref={chat} />
    </section>
  )
}
