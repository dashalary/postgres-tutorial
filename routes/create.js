const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", (req, res) => { // create.pug will be rendered
  res.render("create");
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const query = `
    INSERT INTO Note(title,body) 
    VALUES($1,$2)
    RETURNING *;
    `;
  const values = [req.body.title, req.body.body]; //the params of the query are stored in this variable. we are extracting values from the form
  const { rows } = await db.query(query, values); //running the query
  console.log(rows);
  res.redirect("/"); //redirecting user to home page
});

module.exports = router; //exporting router instance