var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var Sequelize = require("sequelize");
var models  = require('./models');

var app = express();
app.use(bodyParser.json());
app.use(cors());

var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));
app.use('/admin', express.static('admin'));

var Book = models.Book;

// REST methods
app.use(require("./routes/books.js"));
app.use(require("./routes/references.js"));

app.use(express.static('app'));

var sequelize = new Sequelize('bookjournal', 'biancas28', '', {
   dialect: 'mysql',
   port: 3306
});

// include swagger api docummentation
/*var swaggerUi = require('swaggerize-ui'); // second change

app.get('/swagger', function(req, res){
    var api = require('./config/api.json');
    api.host = undefined;
    res.status(200).send(api);
});

app.use('/docs', swaggerUi({
  docs: '/swagger'  
}));*/

app.listen(process.env.PORT);