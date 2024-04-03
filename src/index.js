const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const routes = require(path.join(__dirname,'./routes'));

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

app.use('/api', routes);
app.use('/',(req,res)=>{
    res.write(`
        <h1>Usa una di queste path</h1>
        <ul>
            <li><a href="./blog">blog</a></li>
            <li><a href="./delivery">delivery</a</li>
        </ul>
    `)
});

console.log(`* Creazione app express`,5, ' ...')

app.listen(4000, function() {
	console.log(`* Creazione app express`,6, ' ...')
	console.log('Express app running on port ' + (4000))
	console.log('site => http://localhost:' + (4000))
});
console.log(`* Creazione app express`,7, ' ...')

module.exports = app;