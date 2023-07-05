const mysql = require("mysql")

const connection = mysql.createConnection({
  hostname: "127.0.0.1",
  port: 3306,
  user: "root",
  database: "life_minder",
})

module.exports = connection
