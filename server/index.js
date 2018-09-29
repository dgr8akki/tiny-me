const express = require("express");
const bodyParser = require("body-parser");
const routes = require("../routes/index.js");
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const dev = app.get('env') !== 'production';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

routes(app);

if (!dev) {
  app.use(express.static(path.join(__dirname, 'client/build')));
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
}
app.listen(port, () => console.log(`Listening on port ${port}`));
