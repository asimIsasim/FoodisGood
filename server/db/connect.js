const mongoose = require('mongoose');

const DB = process.env.CLUSTER;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connection is successful');
}).catch((err) => {
    console.log("connection didn't happen sorry",err);
});