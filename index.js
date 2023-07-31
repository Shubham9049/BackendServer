const express = require("express");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/user.routes");
// const { emailRouter } = require("./routes/email.routes");
const cors = require("cors");
const { verify } = require("./middleware/jwtAuth.middleware");
const { ProductRouter } = require("./routes/products.routes");
const { RBAC } = require("./middleware/RBAC");

require("dotenv").config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoute);
app.use("/products", ProductRouter);

app.listen(PORT, async () => {
	try {
		await connection();
		console.log(`Listening at port - ${PORT}`);
	} catch (error) {
		console.error(error.message);
	}
});
