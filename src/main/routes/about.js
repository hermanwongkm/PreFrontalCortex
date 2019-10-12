var express = require("express");
var router = express.Router(); //Router is simply a way for you to reorganize your routes vs using app.get immediately.
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

// The Router is just there for convenience to help you organize the application across multiple modules.
//From the guide: "The express.Router class can be used to create modular mountable route handlers. A Router instance is a complete middleware and routing system; for this reason it is often referred to as a "mini-app"
//So you are merely exporting this router object.
module.exports = router;
