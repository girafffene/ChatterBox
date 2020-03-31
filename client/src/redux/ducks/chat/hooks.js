import { useSelector } from "react-redux"
import socket from "../../../socket"

import init from "./socket"

init()

socket.emit("list rooms")

export function useChat() {
  const currentRoom = useSelector(appState => appState.chatState.currentRoom)
  const messages = useSelector(appState =>
    appState.chatState.messages.filter(msg => msg.roomname === currentRoom)
  )
  const join = (roomname, username) => {
    socket.emit("join", {
      roomname: roomname,
      username: username,
      id: socket.id
    })
  }

  const add = msg => {
    socket.emit("new message", { ...msg, roomname: currentRoom })
  }

  return { messages, add, join }
}
