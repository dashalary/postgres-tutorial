const db = require("./config/database");
const express = require("express");
const morgan = require("morgan");
const app = express();

app.set("view engine", "pug"); // telling Express that the view engine will be Pug
app.use(express.urlencoded({ extended: true })); // this middleware is based on body-parser and it parses incoming requests w/ urlencoded payloads
app.use(morgan("dev"));

/* telling postgres to list all records in the db and display them in the order of id */
app.get("/", async (req, res) => {
  const query = ` 
    SELECT * FROM Note
    ORDER BY id;
    `;
  const { rows } = await db.query(query); // run the query
  res.json(rows); // log out JSON output, which contains the list of our records in the db
});

app.listen(3000, () => { // telling express to run at port 3000
  console.log("At port 3000");
});