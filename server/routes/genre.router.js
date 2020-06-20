const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
// return all favorite movies
router.get("/:id", (req, res) => {
    console.log(' req.params.id', req.params.id)
  const queryText = 
  `
  SELECT genres.name
  FROM genres
  JOIN movie_genre
  ON genres.id = movie_genre.genre_id
  JOIN movies
  ON movie_genre.movie_id = movies.id 
  WHERE movies.id = $1
  ;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("ERROR SELECT favorites DB QUERY", error);
      res.sendStatus(500);
    });
});
// update given movie with a category id
// router.put("/:id", (req, res) => {
//   queryText = `UPDATE movies SET "description" = $1, "title"=$2 WHERE "id" = $3`
//   console.log('this is req.body', req.body);
//   pool.query(queryText, [req.body.description, req.body.title, req.body.id])
//     .then(result => {
//       res.sendStatus(200);
//     })
//     .catch(error => {
//       res.sendStatus(500);
//     })
// })
module.exports = router;