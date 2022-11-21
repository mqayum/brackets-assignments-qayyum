const mongoose = require("mongoose");
const {dbURI} = require("./credentials")
const dBConnect = () => {
    mongoose.connect(dbURI)
        .then(() => console.log('DB connected...'))
        .catch(err => console.log(err))
}
module.exports = {dBConnect}