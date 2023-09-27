const db = require("./config/db");

const getAllCategories = (req, res) => {
	db.query("SELECT * FROM category", (err, result) => {
		if (err) {
			res.send(err);
		}
		res.send(result);
	});
};
const getCategoryById = (req, res) => {
	db.query("SELECT * FROM category", (err, result) => {
		if (err) {
			res.send(err);
		}
		res.send(result);
	});
};
module.exports = {
	getAllCategories,
};
