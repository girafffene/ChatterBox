import { ADD_MESSAGE, ROOM_UPDATE, CHANGE_ROOM, GET_ROOMS } from "./definitions"

export function addMessage(msg) {
  return {
    type: ADD_MESSAGE,
    payload: msg
  }
}

export function updateRoom(room) {
  return {
    type: ROOM_UPDATE,
    payload: {
      room: room.roomname,
      users: room.users
    }
  }
}

export function changeRoom(roomname) {
  return {
    type: CHANGE_ROOM,
    payload: roomname
  }
}

export function getRooms(rooms) {
  return {
    type: GET_ROOMS,
    payload: rooms
  }
}
