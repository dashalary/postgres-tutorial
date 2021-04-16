const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/:id", async (req, res) => {
  const query = `
    SELECT * FROM Note
      WHERE id=$1;
      `;
  const values = [req.params.id]; // id param is retrieved from the url
  const { rows } = await db.query(query, values); // run the query. url's id param is passed as an arg to the SQL command
  res.render("update", { data: rows[0] }); // render the update page
});

router.post("/:id", async (req, res) => {
  console.log(req.body);
  const query = `
    UPDATE Note
    SET title=$1 , body=$2
    WHERE id=$3
    RETURNING *;
    `;
  const values = [req.body.title, req.body.body, req.params.id];
  const { rows } = await db.query(query, values);
  console.log(rows);
  res.redirect("/");
});

module.exports = router;