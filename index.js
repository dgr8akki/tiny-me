const express = require('express');
const path = require('path');
const generatePassword = require('password-generator');
const loki = require("lokijs");
const db = new loki('loki.json');
const urls = db.addCollection('urls');

const app = express();

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  if (urls.find({'id': text}).length === 0)
    return text;
  else return makeid();
}

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/passwords', (req, res) => {
  const count = 5;

  // Generate some passwords
  const passwords = Array.from(Array(count).keys()).map(i =>
    generatePassword(12, false)
  )

  // Return them as json
  res.json(passwords);

  console.log(`Sent ${count} passwords`);
});

app.get("/api/test", function (req, res) {
  const message = "API testing successfull";
    res.status(200).json(message);
  });

  app.get("/api/:id", function (req, res) {
    const response = urls.find({'id':req.params.id});
    console.log(response);
    if (response.length !== 0)
      res.status(200).send(response[0].url);
    else
      res.status(404).send("ID expired or does not exists");
  });

  app.post("/api/add", function (req, res) {
    const data = {
      id: makeid(),
      url: req.body.url,
    };
    const response = urls.find({'url':req.body.url});
    if (response.length !== 0)
      res.status(200).send("URL already exists with id: " .concat(response[0].id));
    else {
      urls.insert(data);
      res.status(200).send("URL added with id: " .concat(data.id));
    }
  }); 

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);