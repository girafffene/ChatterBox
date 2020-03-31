import React, { useEffect } from "react"
import "../../styles/room.scss"
import { useChat } from "../../hooks"
import { useAuth } from "react-auth"

import RoomAside from "./RoomAside"
import RoomMain from "./RoomMain"

export default props => {
  const { profile } = useAuth()
  const { join } = useChat()

  useEffect(() => {
    join(props.match.params.roomname, profile.username)
  }, [])

  return (
    <div className="grid">
      <RoomAside />
      <RoomMain room={props.match.params.roomname} />
    </div>
  )
}
