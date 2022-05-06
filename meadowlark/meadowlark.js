const express = require('express');
const expressHandlebars = require('express-handlebars');

const handlers = require('./lib/handlers');

const app = express();

app.get('/headers', (req, res) => {
  res.type('text/plain');
  const headers = Object.entries(req.headers)
    .map(([key, value]) => `${key}: ${value}`);
  res.send(headers.join('\n'));
});

// setting up Handlebars
app.engine(
  'handlebars',
  expressHandlebars.engine({
    defaultLayout: 'main',
  }),
);
app.set('view engine', 'handlebars');

const port = process.env.PORT || 3000;

// add middleware path
app.use(express.static(`${__dirname}/public`));

app.get('/', handlers.home);

app.get('/about', handlers.about);

// user page 404
app.use(handlers.notFound);

// user page 500
app.use(handlers.serverError);

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Express started on http://localhost:${port}; press Ctrl-C to terminate.`);
  });
} else {
  module.exports = app;
}
