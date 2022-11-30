const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    position:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },



}, {
    timestamps: true,
    collection: 'reviews',
});


const User = mongoose.model("Review", reviewSchema);
module.exports = User;



