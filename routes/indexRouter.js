const express = require('express');
const router = express.Router();
const isLoggedIn = require('../middlewares/isLoggedIn');
const productsModel = require('../models/product-model');
const userModel = require('../models/user-model');
const upload = require('../config/multer-config')

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/login', (req, res) => {
    let error = req.flash('error');
    let success = req.flash('success');
    res.render('login', { error, success });
});

router.get('/product', isLoggedIn, async (req, res) => {
    try {
        let products = await productsModel.find({});
        let success = req.flash('success');
        
        if (!products) {
            products = [];
        }
        
        res.render('product', { products, success });
    } catch (error) {
        console.error('Error fetching products:', error);
        req.flash('error', 'Unable to load products');
        res.render('product', { products: [], success: [], error: 'Unable to load products' });
    }
});

router.get('/addtocart/:productid',isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.cart.push(req.params.productid);
    await user.save();
    req.flash('success','Added to Cart')
    res.redirect('/product');
});

router.get('/addtowishlist/:productid',isLoggedIn,async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    user.wishlist.push(req.params.productid);
    await user.save();
    req.flash('success','Added to WishList')
    res.redirect('/product');
});

router.get('/cart', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate('cart');
    const cart = user.cart;
    let success= req.flash('success');

    // Calculate subtotal
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price;
    });

    // bill calculation
    const PLATFORM_FEE = subtotal? 49: 0;
    const DELIVERY_FEE = subtotal? 99: 0;
    const total = subtotal + PLATFORM_FEE + DELIVERY_FEE;

    res.render('cart', {
        cart,
        user,
        subtotal: subtotal.toFixed(2),
        platformFee: PLATFORM_FEE.toFixed(2),
        deliveryFee: DELIVERY_FEE.toFixed(2),
        total: total.toFixed(2),
        success
    });
});

router.get('/deletefromcart/:productid',isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    
    user.cart = user.cart.filter(
        item => item.toString() !== req.params.productid
    );
    await user.save();
    req.flash('success','Removed from Cart')
    res.redirect('/cart');
});

router.get('/deletefromwishlist/:productid',isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    
    user.wishlist = user.wishlist.filter(
        item => item.toString() !== req.params.productid
    );
    await user.save();
    req.flash('success','Removed from Wishlist')
    res.redirect('/wishlist');
});

router.get('/wishlist', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate('wishlist');
    const wishlist = user.wishlist;
    let success = req.flash('success')
    res.render('wishlist',{wishlist,success})
    
});

router.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
    const source = user.picture
    ? `data:image/jpeg;base64,${user.picture.toString('base64')}`
    : 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg';  
    
    let success = req.flash('success');
    let error = req.flash('error');

    res.render('profile', {user,source,success,error});
});

router.post('/profile/picture/update', isLoggedIn, upload.single('profilepicture'), async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email })
    user.picture = req.file.buffer
    await user.save()
    let success = req.flash('success','Picture updated Successfully!')
    res.redirect('/profile');
});

router.post('/profile/update', isLoggedIn, async (req, res) => {
    const {fullName,email,phone} = req.body;
    let user = await userModel.findOne({ email: req.user.email })
    //updating values
    if(!isNaN(phone) && phone.trim() !== ""){
        user.fullname = fullName;
        user.email = email;
        user.contact = phone;
        await user.save()

        req.flash('success','Updated Successfully!')
        res.redirect('/profile');
    }else {
        req.flash('error','Fill details properly!')
        res.redirect('/profile');
    } 

    
});


module.exports = router;