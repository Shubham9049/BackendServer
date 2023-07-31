const jwt = require("jsonwebtoken");

const verify = async (req, res, next) => {
	try {
		// console.log(req.header("Auth"));
		const tkn = req.header("Auth");
		const decoded = jwt.verify(tkn, "mySecretCode");
		if (decoded) {
			console.log(decoded);
			req.user = {...decoded}
			req.body.userId = decoded.id;
			next();
		} else {
			res.status(400).send({ msg: "Something Went Wrong" });
		}
	} catch (error) {
		res.status(400).send({ msg: error.message });
	}
};

module.exports = { verify };
