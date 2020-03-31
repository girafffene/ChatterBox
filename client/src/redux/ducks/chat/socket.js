import socket from "../../../socket"
import { addMessage, updateRoom, getRooms } from "./actions"

import store from "../../store"

export default () => {
  const dispatch = store.dispatch

  socket.on("new message", msg => {
    dispatch(addMessage(msg))
  })

  socket.on("room update", room => {
    dispatch(updateRoom(room))
  })

  socket.on("list rooms", rooms => {
    dispatch(getRooms(rooms))
  })
}
