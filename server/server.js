
var express = require('express');
var cors = require('cors')

var app = express();
app.use(cors())

var port = process.env.PORT || 3000;
var mongoose = require('mongoose');

require('./api/models/usersModel');
require('./api/models/excerciseModel');
require('./api/models/commentModel');
require('./api/models/exerciseTitleModel')

var bodyParser = require('body-parser');

mongoose.Promise = global.Promise;

const url = "mongodb+srv://Mounika:sl6G4DZFvhJHCPsM@cluster0.dnlfnsj.mongodb.net/FinalProject?retryWrites=true&w=majority"
const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to database ')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/appRoutes');

routes(app);

app.listen(port);
console.log('Server started on: ' + port);