const express = require("express");
const bodyParser = require("body-parser");
const { pool } = require("./config");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  //response.send("hi");
  //First parameter is route, second isa callback function
  //This method automatically sets the Content-Type response header as well based on the argument passed to the send([body]) method,
  //so for example if the [body] is a Buffer the Content-Type will be set to application/octet-stream unless of course we programmatically set it to be something else.
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
});

// Start server
app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening`);
});
