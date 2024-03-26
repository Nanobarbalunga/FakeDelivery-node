const express = require('express');

const FakePostModel = require('../models/FakePostDataModel');
const FakeDeliveryModel = require('../models/FakeRestaurantsModel');

const router = express.Router();

router.get('/', (req,res)=>{
    res.write(`
        <h1>Usa una di queste path</h1>
        <ul>
            <li><a href="./blog">blog</a></li>
            <li><a href="./delivery">delivery</a</li>
        </ul>
    `)
});

router.get('/blog', (req,res)=>{
    const model=new FakePostModel();
    res.json(model.read())
});
router.get('/delivery', (req,res)=>{
    const model=new FakeDeliveryModel();
    res.json(model.read())
});

module.exports = router;