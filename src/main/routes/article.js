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

router.get("/articles", async (request, response, next) => {
  pool.query("SELECT * FROM postsdetails", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

//Route parameters are named URL segments that are used to capture the values specified at their position in the URL. The captured values are populated in the req.params object, with the name of the route parameter specified in the path as their respective keys.
//:articleTitle is naturally used as param names
router.get("/:articleTitle", async (request, response, next) => {
  var postTitle = request.params.articleTitle;
  pool.query(
    "SELECT * FROM postsdetails INNER JOIN posts on postsdetails.id = posts.id WHERE post_title = $1",
    [postTitle],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
});

router.get("/id/:articleId", async (request, response, next) => {
  var postId = request.params.articleId;
  pool.query(
    "SELECT * FROM postsdetails WHERE id = $1",
    [postId],
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
    (error, results) => {``
      if (error) {
        throw error;
      }
      const postId = results.rows[0].id;
      console.log(postId);
      pool.query(
        "INSERT INTO postsdetails (post_text, post_id) VALUES ($1, $2) RETURNING *",
        [post, postId],
        (error, results) => {
          console.log(results);
          if (error) {
            throw error;
          }
          response.status(200).json(results.rows);
        }
      );
    }
  );
});

router.delete("/:id", async (request, response, next) => {
  var id = request.params.id;
  pool.query("BEGIN", (error, results) => {
    if (error) {
      throw error;
    }
    pool.query("DELETE FROM postsdetails where id = $1", [id], error => {
      if (error) {
        throw error;
      }
      pool.query("DELETE FROM posts where id = $1", [id], error => {
        if (error) {
          throw error;
        }
        pool.query("COMMIT", err => {
          if (err) {
            console.error("Error committing transaction", err.stack);
          }
        });
      });
    });
    response.status(200).json(results.rows);
  });
});

router.post("/updateArticle", async (request, response, next) => {
  var post = request.body.article;
  var id = request.body.postId;
  pool.query(
    "UPDATE postsdetails SET post_text = $1 WHERE id = $2 RETURNING * ", //For update you need returning for it to return else by default it returns number of row affected.
    [post, id],
    (error, results) => {
      console.log(results);
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
});

module.exports = router;
