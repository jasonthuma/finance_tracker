// module.exports = require("knex")({
//   client: "mysql2",
//   connection: {
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PASSWORD,
//     database: process.env.MYSQL_DB_NAME,
//     port: process.env.MYSQL_PORT || 3306,
//   },
// });
module.exports = require("knex")({
  client: "mysql2",
  connection: {
    host: process.env.AWS_DB_HOST,
    user: process.env.AWS_DB_USER,
    password: process.env.AWS_DB_PW,
    database: process.env.AWS_DB_NAME,
    port: process.env.MYSQL_PORT || 3306,
  },
});
