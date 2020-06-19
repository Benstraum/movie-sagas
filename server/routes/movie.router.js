const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");


// return all favorite movies
router.get("/", (req, res) => {
  const queryText = `SELECT * FROM movies ORDER BY id ASC`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("ERROR SELECT favorites DB QUERY", error);
      res.sendStatus(500);
    });
});



// update given favorite with a category id

  router.put("/:id", (req, res) => {
    queryText = `UPDATE movies SET "description" = $1 WHERE "id" = $2`
    console.log('this is req.body',req.body);
    pool.query(queryText, [req.body.category, req.body.id])
      .then(result => {
        res.sendStatus(200);
      })
      .catch(error => {
        res.sendStatus(500);
      })
  })



module.exports = router;
