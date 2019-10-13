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
router.post("/createArticle", async (request, response, next) => {
  var article = request.body;
  const { postTitle, post } = article;
  pool.query(
    "INSERT INTO posts (post_title) VALUES ($1) RETURNING *",
    [postTitle],
    (error, results) => {
      if (error) {
        throw error;
      }
      const postId = results.rows[0].post_id;
      pool.query(
        "INSERT INTO postsdetails (post_text, post_id) VALUES ($1, $2) RETURNING *",
        [post, postId],
        (error, results) => {
          if (error) {
            throw error;
          }
          response.status(200).json(results.rows);
        }
      );
    }
  );
});

module.exports = router;
