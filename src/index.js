const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes');

console.log(`* Creazione app express`, '...')
const app = express();

app.use(cors());
app.options('*', cors());

app.use(morgan(':method :url :status :user-agent - :response-time ms'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', routes);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
	console.log('site => http://localhost:' + (process.env.PORT || 3000))
});