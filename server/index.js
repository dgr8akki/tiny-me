const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../routes/index.js");
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
