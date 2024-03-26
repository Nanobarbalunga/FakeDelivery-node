const express = require('express');

const FakePostModel = require('../models/FakePostDataModel');

const router = express.Router();

router.get('/', (req,res)=>{
    const model=new FakePostModel();
    res.json(model.read())
});

module.exports = router;