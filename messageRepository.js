const db = require("./config/db");

const getAllMessages = (req, res) => {
	db.query("SELECT * FROM message", (err, result) => {
		if (err) {
			res.send(err);
		}
		res.send(result);
	});
};

const postMessage = (firstname, lastname, email, message, res) => {
	db.query(
		"insert into message set?",
		{
			firstname: firstname,
			lastname: lastname,
			email: email,
			message: message,
		},
		(err, result) => {
			if (err) {
				res.send(err);
			}
			res.send(result);
		}
	);
};
module.exports = { getAllMessages, postMessage };
