var express = require("express");
var router = express.Router();
const { pool } = require("../../../config"); //This is called deconstructing, else you need to call pool.pool to use it.
//app.router allows you to define your routes separately and simply use it in your app. It provides a nice separation of concerns.

router.get("/", async function(request, response, next) {
  pool.query("SELECT * FROM me where about_id = 1", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

router.post("/edit", async (request, response, next) => {
  var post = request.body.post;
  pool.query("UPDATE me SET about_post = $1", [post], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

module.exports = router;
