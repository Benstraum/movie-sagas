const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
// return all favorite movies
// router.get("/:id", (req,res) =>{
//   let values= req.params.id
//   const queryText = 
//   `SELECT movies.*, array_agg(genres.name)
//   FROM movies
//   JOIN movie_genre
//   ON movies.id = movie_genre.movie_id
//   JOIN genres
//   ON movie_genre.genre_id = genres.id 
//   GROUP BY movies.id
//   ORDER BY movies.id ASC
//   ;`
//   pool
//   .query(queryText)
//   .then(result=>{
//     let queryResult = result.rows.map()
//     console.log(result.rows)
//     res.send(result.rows)
//   })
//     .catch(err => {console.log('error in get/:id', err)
//     res.sendStatus(500)
//   })
// })
router.get("/", (req, res) => {
  const queryText = 
  `SELECT movies.*, array_agg(genres.name)
  FROM movies
  JOIN movie_genre
  ON movies.id = movie_genre.movie_id
  JOIN genres
  ON movie_genre.genre_id = genres.id 
  GROUP BY movies.id
  ORDER BY movies.id ASC
  ;`;
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
// update given movie with a category id
router.put("/:id", (req, res) => {
  queryText = `UPDATE movies SET "description" = $1, "title"=$2 WHERE "id" = $3`
  pool.query(queryText, [req.body.description, req.body.title, req.body.id])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      res.sendStatus(500);
    })
})
module.exports = router;
