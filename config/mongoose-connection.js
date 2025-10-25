const mongoose = require('mongoose');
const config = require('config');

const dbgr = require('debug')('devlopment:mongoose');

mongoose
.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    dbgr('MongoDB connected')
})
.catch(err => {
    dbgr('MongoDB connection error:', err)
});

module.exports = mongoose.connection;