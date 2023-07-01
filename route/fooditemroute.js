const express = require('express');
const router = express.Router();
const fooditem = require('../model/foodschema');
const foodcategory = require('../model/foodcategory');

router.get('/getdata', async (req, res) => {
    global.data = await fooditem.find({});
    console.log(data);
    res.status(200).json({ data });
});

router.get('/foodcategory', async (req, res) => {
    global.categorydata = await foodcategory.find({});
    console.log(categorydata);
    res.status(200).json({ categorydata });
});

router.post('/foodData', async (req, res) => {
    try {
        data = await fooditem.find({});
        // console.log(data);

        categorydata = await foodcategory.find({});
        // console.log(categorydata);

        res.json([data, categorydata]);

    } catch (err) {
        console.log(err);
    }
})







module.exports = router;