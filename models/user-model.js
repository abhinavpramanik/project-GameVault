const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        minlength: 3,
    },
    email: String,
    password: String,
    cart: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        default: []
    }],
    isadmin: Boolean,
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'product',
        default: []
    }],
    contact: Number,
    picture: Buffer    
});

module.exports = mongoose.model('user', userSchema);