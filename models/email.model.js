const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
	title: String,
	category: String,
	description: String,
	price: Number,
	image: String,
});

const productModel = mongoose.model("product", productSchema);

module.exports = { productModel };
