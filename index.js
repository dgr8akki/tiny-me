const express = require('express');
const path = require('path');
const loki = require("lokijs");
const db = new loki('loki.json');
const urls = db.addCollection('urls');

const app = express();

function makeid() {
  let text = "";
  const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  if (urls.find({'id': text}).length === 0)
    return text;
  else return makeid();
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

  app.get("/api/:id", function (req, res) {
    const response = urls.find({'id':req.params.id});
    if (response.length !== 0)
      res.status(200).send(response[0].url);
    else
      res.status(404).send("Tiny URL not exists");
  });

  app.post("/api/add/:data", function (req, res) {
    const data = {
      id: makeid(),
      url: req.params.data,
    };
    const response = urls.find({'url':req.params.data});
    if (response.length !== 0)
      res.status(200).send(response[0].id);
    else {
      urls.insert(data);
      res.status(200).send(data.id);
    }
  });

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });

const port = process.env.PORT || 5000;
app.listen(port);
