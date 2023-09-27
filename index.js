const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const productsRepository = require("./productsRepository");
const cartRepository = require("./cartRepository");
const categoriesRepository = require("./categoriesRepository");
const userRepository = require("./userRepository");
const messageRepository = require("./messageRepository");

var corsoption = {
	origin: "http://localhost:5173",
	credentials: true,
};
const app = express();
const PORT = 3002;
app.use(cors(corsoption));
app.use(express.json());
app.use(cookieParser());

app.get("/api/product", (req, res) => {
	let category = req.query.categoryId;
	let product = req.query.productId;
	if (typeof category !== "undefined" && category !== "") {
		productsRepository.getProductsByCategory(category, res);
	} else if (typeof product !== "undefined" && product !== "") {
		productsRepository.getProductById(product, res);
	} else {
		productsRepository.getAllProducts(res);
	}
});

app.get("/api/category", (req, res) => {
	categoriesRepository.getAllCategories(req, res);
});

app.get("/api/cart", (req, res) => {
	const userId = req.query.userId;
	cartRepository.getCartFromUser(userId, res);
});

app.post("/api/cart", (req, res) => {
	const { productId, userId, quantity } = req.body;
	cartRepository.updateCart(productId, userId, quantity, res);
});

app.delete("/api/cart", (req, res) => {
	const userId = req.query.userId;
	cartRepository.clearCart(userId, res);
});

app.get("/api/user", (req, res) => {
	let userId = req.query.userId;
	userRepository.fetchLoggedInUser(userId, res);
});

app.post("/api/user-login", (req, res) => {
	const { username, password } = req.body;
	if (username && password && username !== "" && password.length > 7) {
		userRepository.loginUser(username, password, res);
	} else if (password.length <= 7) {
		res.send({
			message: "Password too short",
		});
	} else {
		res.send({
			message: "Something is wrong",
		});
	}
});

app.post("/api/user-register", (req, res) => {
	const { username, password, fname, lname, email } = req.body;
	if (username && password && username !== "" && password.length > 7) {
		userRepository.registerUser(
			username,
			password,
			fname,
			lname,
			email,
			res
		);
	} else if (password.length <= 7) {
		res.send({
			message: "Password too short",
		});
	} else {
		res.send({
			message: "Something is wrong",
		});
	}
});

app.get("/api/message", (req, res) => {
	messageRepository.getAllMessages(req, res);
});

app.post("/api/message", (req, res) => {
	const { firstname, lastname, email, message } = req.body;
	messageRepository.postMessage(firstname, lastname, email, message, res);
});

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}`);
});
