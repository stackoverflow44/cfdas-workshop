//Loads the express module
const express = require("express");
//Creates our express server
const app = express();
const port = 8080;

//Loads the handlebars module
const handlebars = require("express-handlebars");
//Sets our app to use the handlebars engine
app.set("view engine", "hbs");
//Sets handlebars configurations (we will go through them later on)
app.engine(
  "hbs",
  handlebars.engine({
    layoutsDir: __dirname + "/views/layouts",
    extname: ".hbs",
    defaultLayout: "index",
    //new configuration parameter
    partialsDir: __dirname + "/views/partials/",
  })
);

//Serves static files (we need it to import a css file)
app.use(express.static("public"));

const quotes = [
  "Logic will get you from A to B. Imagination will take you everywhere.",
  "There are 10 kinds of people. Those who know binary and those who don't.",
  "There are two ways of constructing a software design. One way is to make it so simple that there are obviously no deficiencies and the other is to make it so complicated that there are no obvious deficiencies.",
  "It's not that I'm so smart, it's just that I stay with problems longer.",
  "It is pitch dark. You are likely to be eaten by a grue.",
];

const getQuotes = () => {
  let i = parseInt(Math.random() * quotes.length);
  return quotes[i];
};

//Sets a basic route
app.get("/index.html", (req, res) => {
  //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
  res.render("main", { body: getQuotes(), layout: "index" });
});

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
