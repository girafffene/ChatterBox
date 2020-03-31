import React, { useState, useRef } from "react"
import { useChat } from "../../hooks"
import { useAuth } from "react-auth"

export default props => {
  const [message, setMessage] = useState("")
  const [color, setColor] = useState("#eee")
  const [size, setSize] = useState("12")
  const inputref = useRef(null)
  const { profile } = useAuth()
  const { add } = useChat()

  function handleSubmit(e) {
    e.preventDefault()

    add({
      user: profile.username,
      msg: message,
      color: color,
      size: size,
      timestamp: new Date().getTime()
    })

    setMessage("")
    inputref.current.focus()
  }

  function keyup(e) {
    if (e.key === "Enter") {
      handleSubmit(e)
    }
  }

  return (
    <footer>
      <form onSubmit={handleSubmit}>
        <div className="formWrapper">
          <input
            ref={inputref}
            className="messageText"
            onChange={e => setMessage(e.target.value)}
            placeholder={`Message ${props.room}...`}
            style={{ color: color, fontSize: size + "px" }}
            onKeyUp={keyup}
          />
          <input
            className="messageColor"
            type="color"
            onChange={e => setColor(e.target.value)}
            value={color}
          />
          <input
            className="messageSize"
            type="text"
            onChange={e => setSize(e.target.value)}
            value={size}
          />
        </div>
      </form>
    </footer>
  )
}
