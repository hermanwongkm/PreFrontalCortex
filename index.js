const bodyParser = require("body-parser");
const { pool } = require("./config"); //This is called deconstructing, else you need to call pool.pool to use it.
var cors = require("cors");
const express = require("express"); //This returns a function, so express is a function. Indepth: this is the createApplication function
const app = express(); //This creates an object called app with methods like get.
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  //response.send("hi");
  //First parameter is route, second isa callback function
  //This method automatically sets the Content-Type response header as well based on the argument passed to the send([body]) method,
  //so for example if the [body] is a Buffer the Content-Type will be set to application/octet-stream unless of course we programmatically set it to be something else.
  pool.query("SELECT * FROM posts", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

app.get("/postDetails", (request, response) => {
  pool.query(
    "SELECT * FROM postsdetails WHERE post_id = 3",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
});

app.post("/postDetails", (request, response) => {
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
// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening`);
});
//This returns a function, so express is a function. Indepth: this is the createApplication function

/*  pool.query(
    "INSERT INTO posts (post_title) VALUES ($1)",
    ["Testing3"],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
*/
