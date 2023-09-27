const db = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const getUserByUsername = (username, password, res) => {
	if (username && password && username !== "" && password.length > 7) {
		db.query(
			`
			select userId from user
			where 
			username = '${username}'
			and userpassword = '${password}'
			`,
			async (err, result) => {
				if (err) {
					return res.send({ message: err.message });
				}
				if (result.length <= 0) {
					return res.send({ message: "Something is wrong" });
				} else {
					return res.json(result);
				}
			}
		);
	} else {
		return res.send({
			message: "Something is wrong",
		});
	}
};

const fetchLoggedInUser = (userId, res) => {
	if (userId) {
		db.query(
			`
		select userId, username from user
		where userId = '${userId}'
		`,
			async (error, result) => {
				if (error) {
					return res.send({
						userId: "",
						username: "Visitor",
						isLoggedIn: false,
					});
				} else if (result.length > 0) {
					res.send(result);
				}
			}
		);
	} else {
		res.send({
			userId: "",
			username: "Visitor",
			isLoggedIn: false,
		});
	}
};

const loginUser = (username, password, res) => {
	if (username && password && username !== "" && password.length > 7) {
		let user = getUserByUsername(username, password, res);
		if (user) {
			res.cookie("userId", user[0].userId);
			res.send(user);
		}
	} else {
		res.send({
			message: "This combination is not good.",
		});
	}
};

const registerUser = (username, password, fname, lname, email, res) => {
	if (username && password && username !== "" && password.length > 7) {
		db.query(
			"select username from user where username = ?",
			[username],
			async (error, result) => {
				if (error) {
					res.send({ message: error.message });
				}
				if (result.length > 0) {
					return res.send({
						message: "This username is already in use!",
					});
				} else {
					db.query(
						"insert into user set?",
						{
							username: username,
							userpassword: password,
							fname: fname,
							lname: lname,
							email: email,
						},
						async (error, result) => {
							if (error) {
								return res.send({
									message: error.message,
								});
							} else {
								return res.send(result);
							}
						}
					);
				}
			}
		);
	} else {
		return res.send({ message: "Important field is empty!" });
	}
};
module.exports = {
	getUserByUsername,
	loginUser,
	registerUser,
	fetchLoggedInUser,
};
