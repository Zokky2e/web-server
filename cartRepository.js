const db = require("./config/db");
function getCartFromUser(userId, res) {
	db.query(
		`SELECT
		cart.itemId,
		cart.productId,
		cart.quantity,
		product.price,
		product.productName,
		category.categoryName
		FROM cart 
		inner join product on product.id = cart.productId
		inner join category on category.categoryId = product.categoryId
		where cart.userId = '${userId}'`,
		(err, result) => {
			if (err) {
				res.send({
					message: err.message,
				});
			}
			res.send(result);
		}
	);
}

function clearCart(userId, res) {
	db.query(
		`
	delete from cart
	where cart.userId = '${userId}'
	`,
		(err, result) => {
			if (err) {
				res.send(err);
			} else {
				res.send(result);
			}
		}
	);
}

function updateCart(productId, userId, quantity, res) {
	var addQuery = "";
	db.query(
		`SELECT
		*
		FROM cart
		where cart.productId = '${productId}' and cart.userId = '${userId}'`,
		(err, itemFound) => {
			if (itemFound.length > 0) {
				let newQuantity = itemFound[0].quantity + quantity;
				if (newQuantity === 0) {
					addQuery = `
					DELETE from cart
					where cart.productId = '${productId}' and cart.userId = '${userId}'
					`;
				} else {
					addQuery = `
					UPDATE cart 
					SET quantity = ${newQuantity}
					where cart.productId = '${productId}' and cart.userId = '${userId}'
					`;
				}
			} else {
				addQuery = `
				insert into cart
				(productId, userId, quantity)
				values ('${productId}','${userId}',${quantity})
				;`;
			}
			if (addQuery !== "") {
				db.query(addQuery, async (error, result) => {
					if (error) {
						res.send({
							errorMessage: error.message,
						});
						return;
					}
					res.send(result);
				});
			} else {
				res.send({
					message: "query not set",
				});
			}
		}
	);
}

module.exports = {
	getCartFromUser,
	updateCart,
	clearCart,
};
