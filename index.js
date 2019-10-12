const bodyParser = require("body-parser");
const { pool } = require("./config"); //This is called deconstructing, else you need to call pool.pool to use it.
var cors = require("cors");
const express = require("express"); //This returns a function, so express is a function. Indepth: this is the createApplication function
const app = express(); //This creates an object called app with methods like get.

var aboutRouter = require("./src/main/routes/about");
var articleRouter = require("./src/main/routes/article");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Order of middle wear is important,
//Middleware are functions that have access to request & response object and next function (when invoked will execute the next middleware in sucession).
//You can use app.use to call a function, which is a middleware function. Just like any other function.
//app.use default's path is /. So if nothing is specified, it will run on every path.

app.use("/me", aboutRouter);
app.use("/articles", articleRouter);

// Start server
app.listen(process.env.PORT || 3001, () => {
  console.log(`Server listening`);
});
