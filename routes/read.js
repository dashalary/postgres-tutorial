const express = require("express");
const router = express.Router();
const db = require("../config/database");

/* this query says to find a note with a matching id and display it to the user */

router.get("/:id", async (req, res) => {
  const query = `
    SELECT * FROM Note
      WHERE id=$1;
      `;
  const values = [req.params.id]; // id param in the url will be the param for the SQL command
  const { rows } = await db.query(query, values); // run the query
  res.render("read", { data: rows[0] }); // render read.pug file and send the returned data from the SQL command to the page
});

module.exports = router;