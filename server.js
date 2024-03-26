const FakePostModel = require('./src/models/FakePostDataModel');
const FakeDeliveryModel = require('./src/models/FakeRestaurantsModel');

console.log();
console.log('Start bootstrap', '...');
console.log('* Creazione dei permanent Models','...');
console.log();

let model={};

// model=new FakePostModel();
// try {
//     model.create()
//     console.log(`* Model ${model.constructor.name} `, 'creato','...');
// } catch (error) {
//     console.log(`* Model ${model.constructor.name} `, 'fallito','...');
//     console.log(error);
// }


model=new FakeDeliveryModel();
try {
    model.create()
    console.log(`* Model ${model.constructor.name} `, 'creato','...');
} catch (error) {
    console.log(`* Model ${model.constructor.name} `, 'fallito','...');
    console.log(error);
}

console.log();
console.log(`* Avvio del server`, '...');
console.log();
require('./src/');
