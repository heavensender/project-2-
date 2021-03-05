const express = require("express");
const routes = require("./routes/routes");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("./views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.engine("html", ejs.renderFile);
app.use( "/style", express.static("views"))
routes.forEach((route) => {
  app[route.method](route.path, route.controller);
});


app.listen(PORT, () => 
console.log('Listening on port', PORT));
