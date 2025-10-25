const express = require('express');
const router = express.Router();
const productsModel = require('../models/product-model');

router.get('/', (req, res) => {
    res.send('Products route is working');
});

router.get('/addproduct', (req, res) => {
    let error = req.flash('error');
    let success = req.flash('success');
    res.render('addproducts',{error, success})
})

router.post('/addproduct', async (req, res) => {
    const {name, brand, category, price, description, image} = req.body;
    
    const product = await productsModel.create({
        name,
        brand,
        category,
        price,
        description,
        image
    });

    try {
        await product.save();
        req.flash('success', 'Product uploaded successfully!');
        res.redirect('/products/addproduct');
    } catch (error) {
        req.flash('error', 'Something went wrong. Try again!');
        res.redirect('/products/addproduct');
    }
});

module.exports = router;