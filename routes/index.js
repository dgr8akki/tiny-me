var loki = require("lokijs");
var db = new loki('loki.json');
var urls = db.addCollection('urls');

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  if (urls.find({'id': text}).length === 0)
    return text;
  else return makeid();
}

var appRouter = function (app) {
  app.get("/api/test", function (req, res) {
    res.status(200).send({message:"API testing successfull"});
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
};

module.exports = appRouter;
