const mongoose = require('mongoose');
const config = require('config');

const dbgr = require('debug')('devlopment:mongoose');

mongoose
.connect(`${config.get("MONGO_URI")}/gamevaultdatabase`)
.then(() => {
    dbgr('MongoDB connected')
})
.catch(err => {
    dbgr('MongoDB connection error:', err)
});

module.exports = mongoose.connection;