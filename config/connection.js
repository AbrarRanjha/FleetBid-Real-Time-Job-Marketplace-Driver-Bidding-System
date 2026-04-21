const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const { DATABASE_URL } = process.env;

const connection = () => {
	mongoose
		.connect(
			DATABASE_URL,
			{
				useNewUrlParser: false,
				useUnifiedTopology: false,
			}
		)
		.then(() => {
			console.log("successfully connected to database");
		})
		.catch((e) => {
			console.log(e);
		});
};

module.exports = { connection };
