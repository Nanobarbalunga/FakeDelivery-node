const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routes = require('./routes');

console.log(`* Creazione app express`, '...')
const app = express();

console.log(`* Creazione app express`,1, ' ...')

app.use(cors());
app.options('*', cors());

console.log(`* Creazione app express`,2, ' ...')

app.use(morgan(':method :url :status :user-agent - :response-time ms'));

console.log(`* Creazione app express`,3, ' ...')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

console.log(`* Creazione app express`,4, ' ...')

app.use('/', routes);

console.log(`* Creazione app express`,5, ' ...')

app.listen(process.env.PORT || 4000, function() {
	console.log(`* Creazione app express`,6, ' ...')
	console.log('Express app running on port ' + (process.env.PORT || 4000))
	console.log('site => http://localhost:' + (process.env.PORT || 4000))
});
console.log(`* Creazione app express`,7, ' ...')