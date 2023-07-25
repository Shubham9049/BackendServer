const { verify } = require("../middleware/jwtAuth.middleware");
const { productModel } = require("../models/email.model");

const ProductRouter = require("express").Router();

ProductRouter.post("/add",verify, async (req, res) => {
	try {
		const { image, title, category, description, price } = req.body;
		const newProduct = new productModel({ image, title, category, description, price});
		await newProduct.save();
		res.status(200).send({ msg: "Post is added" });
	} catch (error) {
		res.status(400).json({ msg: error.message });
	}
});

ProductRouter.get("/", async (req, res) => {
	try {
		// console.log(req.query);
		let search = req.query.search || "";

		// productModel.createIndex({ name: "text", brand: "text" });

		// Continue with your queries and other operations here

		const searchQuery = {
			$text: {
				$title: search,
			},
		};
		if (searchQuery.$text.$title === "") {
			// If the search term is empty, remove the $text operator
			delete searchQuery.$text;
		}
		const getProduct = await productModel.find(searchQuery);

		// console.log(getProduct);
		res.status(200).send(getProduct);
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
});

ProductRouter.patch("/update/:id",verify, async (req, res) => {
	let id = req.params.id;
	// console.log(req.body, id);
	try {
		await productModel.findByIdAndUpdate(id, req.body);

		res.status(200).send({ msg: "Product is update" });
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
});

//deleting the products
ProductRouter.delete("/delete/:id",verify, async (req, res) => {
	let id = req.params.id;
	try {
		await productModel.findByIdAndDelete(id);

		res.status(200).send({ msg: "Product is deleted" });
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
});
module.exports = { ProductRouter };
