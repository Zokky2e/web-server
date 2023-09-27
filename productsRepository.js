const db = require("./config/db");
function getAllProducts(res) {
	db.query("SELECT * FROM product", (err, result) => {
		if (err) {
			res.send(err);
		}
		res.send(result);
	});
}

function getProductsByCategory(categoryId, res) {
	db.query(
		`SELECT * FROM product where product.categoryId = '${categoryId}'`,
		(err, result) => {
			if (err) {
				res.send(err);
			}
			res.send(result);
		}
	);
}

function getProductById(productId, res) {
	var imageId = productId
		.match(/\d/g)
		?.join("")
		.substring(3, 5)
		.replace("0", "");
	if (Number(imageId) > 96) {
		imageId = 96;
	}
	db.query(
		`SELECT 
		product.*,
		category.categoryName,
		${imageId} as imageId
		FROM product
		inner join category on category.categoryId = product.categoryId
		where product.id = '${productId}'`,
		(err, result) => {
			if (err) {
				res.send(result);
			}
			res.send(result);
		}
	);
}

// function importMockData(req, res) {
// 	const lorem =
// 		"Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro mollitia sapiente aperiam sunt. Ipsum, atque obcaecati. Voluptas modi vero officia.";
// 	mockup.data.categories.forEach((category) => {
// 		category.products.forEach((product) => {
// 			const query = `
// 			insert into product (productName, price,description, categoryId)
// 			select
// 			'${product.name}',
// 			${product.price},
// 			'${lorem}',
// 			category.categoryId from category where category.categoryName = '${category.name}'
// 			;
// 			`;
// 			db.query(query);
// 		});
// 	});
// }

module.exports = {
	getAllProducts,
	getProductsByCategory,
	getProductById,
};
