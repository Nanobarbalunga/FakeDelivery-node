const express = require('express');

const FakePostModel = require('../models/FakePostDataModel');
const FakeDeliveryModel = require('../models/FakeRestaurantsModel');

const router = express.Router();

const makeUrl = (urlPath,req) => {
    const protocol = req.protocol; 
    const host = req.hostname; 
    const url = req.originalUrl; 
    const port = process.env.PORT || 4000; 
    const path = req.path; 
  
    const fullUrl = `${protocol}://${host}${port && port !=80?`:${port}`:''	}${url}${path}`; 
    const responseString = `${fullUrl}${urlPath}`;	
    return responseString; 
}

router.get('/', (req,res)=>{
    res.write(`
        <h1>Usa una di queste path</h1>
        <ul>
            <li><a href="${makeUrl('blog',req)}">blog</a></li>
            <li><a href="delivery">delivery</a</li>
            <li><a href="api">protocol: ${req.protocol}</a</li>
            <li><a href="api">hostname: ${req.hostname}</a</li>
            <li><a href="api">original url: ${req.originalUrl}</a</li>
            <li><a href="api">path: ${req.path}</a</li>
            <li><a href="api">url: ${makeUrl('zxcz',req)}</a</li>
        </ul>
    `);
    res.end();
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