const express = require("express");
const expressHandlebars = require("express-handlebars");

const app = express();

const port = process.env.PORT || 3000;

// setting up Handlebars
app.engine(
  "handlebars",
  expressHandlebars({
    defaultlayout: "main",
  })
);
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.type("text/plain");
  res.send("Meadowlark Travel");
});

app.get("/about", (req, res) => {
  res.type("text/plain");
  res.send("About Meadowlark Travel");
});

// user page 404
app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Not found");
});

// user page 500
app.use((err, req, res, next) => {
  console.error(err.message);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server error");
});

app.listen(port, () =>
  console.log(
    `Express started on http://localhost:${port}; press Ctrl+C to stop`
  )
);
