const rooms = {
  general: [],
  random: []
}

module.exports = function(io) {
  io.on("connection", socket => {
    socket.on("list rooms", () => {
      socket.emit("list rooms", rooms)
    })

    //joins room & pushes username & id to room
    socket.on("join", obj => {
      if (rooms.hasOwnProperty(obj.roomname)) {
        rooms[obj.roomname].push({
          username: obj.username,
          id: obj.id
        })
      } else {
        rooms[obj.roomname] = [
          {
            username: obj.username,
            id: socket.id
          }
        ]
      }

      //"join this room"
      socket.join(obj.roomname)

      //will emit room update event, sending new list of users to that specific room
      io.to(obj.roomname).emit("room update", {
        room: obj.roomname,
        users: rooms[obj.roomname]
      })
    })

    socket.on("new message", msg => {
      io.to(msg.roomname).emit("new message", msg)
    })

    socket.on("disconnect", reason => {
      for (room in rooms) {
        if (room[room].find(usr => usr.id === socket.id)) {
          rooms[room] = rooms[room].filter(usr => usr.id !== socket.id)
          io.to(room).emit("room update", {
            room,
            users: rooms[room]
          })
        }
      }
    })
  })
}
