const mongoose = require("mongoose");
const {dbURI, dbURILocal} = require("./credentials")
const dBConnect = () => {
    mongoose.connect(dbURILocal)
        .then(() => console.log('DB connected...'))
        .catch(err => console.log(err))
}
module.exports = {dBConnect}