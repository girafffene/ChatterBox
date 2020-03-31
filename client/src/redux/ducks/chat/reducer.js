import { ADD_MESSAGE, ROOM_UPDATE, CHANGE_ROOM, GET_ROOMS } from "./definitions"

const initialState = {
  rooms: {},
  messages: [],
  currentRoom: "general"
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ROOM_UPDATE:
      return {
        ...state,
        rooms: { ...state.rooms, [action.payload.room]: action.payload.users }
      }

    case ADD_MESSAGE:
      return { ...state, messsages: [...state.messages, action.payload] }

    case CHANGE_ROOM:
      return {
        ...state,
        currentRoom: action.payload
      }

    case GET_ROOMS:
      return {
        ...state,
        rooms: action.payload
      }

    default:
      return state
  }
}
