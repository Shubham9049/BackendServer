const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
	email: String,
	name: String,
	pass: String,
	age: Number,
	role: {
		type : String,
		enum : ["admin","user", "superAdmin"],
		default : "user",
	}
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
