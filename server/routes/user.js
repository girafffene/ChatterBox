const express = require("express")
const router = express.Router()
const sha512 = require("js-sha512")
const jwt = require("jsonwebtoken")
const config = require("config")
const randomString = require("../utils/randomString")
const conn = require("../db")

router.post("/register", (req, res, next) => {
  //bringing in the username
  const username = req.body.username

  //creates a random salt string of 20 characters
  const salt = randomString(20)

  // encrypts pw with salt AND sha512
  const password = sha512(req.body.password + salt)

  //checking to make sure user doesn't already exist, don't want dupes
  const checkSQL = `SELECT count(1) AS count FROM users WHERE username = ?`

  conn.query(checkSQL, [username], (err, results, fields) => {
    if (results[0].count > 0) {
      res.status(409).json({
        message: "username exists"
      })
    } else {
      //inserts user info into table
      const sql = `
      INSERT INTO users (username, password, salt)
      VALUES (?, ?, ?)
      `

      //resp, making sure user was added in
      conn.query(sql, [username, password, salt], (err2, results2, fields2) => {
        res.json({
          message: "user added successfully"
        })
      })
    }
  })
})

router.post("/login", (req, res, next) => {
  const username = req.body.username
  const password = req.body.password

  const getSQL = `SELECT username, password, salt FROM users WHERE username = ?`

  conn.query(getSQL, [username], (saltErr, saltResults, saltFields) => {
    if (saltResults.length > 0) {
      const salt = saltResults[0].salt
      const userpass = saltResults[0].password

      if (sha512(password + salt) === userpass) {
        // log them in
        const token = jwt.sign(
          { username: username, projectName: "ChatterBox" },
          config.get("secret")
        )

        res.json({
          token: token
        })
      } else {
        res.status(401).json({
          message: "Invalid username or password"
        })
      }
    } else {
      res.status(401).json({
        message: "Invalid username or password"
      })
    }
  })
})

module.exports = router
