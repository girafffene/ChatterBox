const express = require("express")
const app = express()
const server = require("http").Server(app)
const socketio = require("socket.io")
const userRoutes = require("./routes/user")
const protectedRoutes = require("./routes/protected")
const expressjwt = require("express-jwt")
const config = require("config")
const chat = require("./chat")

const port = 3001

const userRoutes = require("./routes/user")
const protectedRoutes = require("./routes/protected")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

//never want these to be private (note for me)
app.use("/api", userRoutes)
app.use("/api", expressjwt({ secret: config.get("secret") }), protectedRoutes)

//catch 404 and fwd to err handler
app.use(function(req, res, next) {
  next(createError(404))
})

//err handler
app.use(function(err, req, res, next) {
  //set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  //render the err page
  res.status(err.status || 500)
  res.json({
    status: err.status,
    error: err
  })
})

const io = socketio()

chat(io)

process.on("uncaughtException", code => {
  console.log("aghhhhhh")
  console.log("code", code)
})

server.listen(port, () => {
  console.log(`LISTENING ON PORT ${port}`)
})
