var express = require("express");
var router = express.Router();
const { pool } = require("../../../config");

router.get("/", async (request, response, next) => {
  pool.query("SELECT * FROM posts", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

router.get("/:articleTitle", async (request, response, next) => {
  var postTitle = request.params.articleTitle;
  pool.query(
    "SELECT * FROM postsdetails INNER JOIN posts on postsdetails.post_id = posts.post_id WHERE post_title = $1",
    [postTitle],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
});

router.post("/createPost", (request, response) => {
  console.log(request.body.user.name);
  const x = request.body.user.name;
  pool.query(
    "INSERT INTO postsdetails (post_text, post_id) VALUES ($1, $2)",
    [x, 3],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
});
module.exports = router;
