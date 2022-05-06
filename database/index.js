
const {Pool} = require('pg')

const client = new Pool({
	user: "postgres",
	host: "3.218.50.19",
	database: "postgres",
	password: "password",
	port: 5432
})

client.connect();

// var insertQuery = `INSERT INTO productoverview.products(name, slogan, description, category, default_price) VALUES ('Camo Onesie', 'Blend in to your crowd', 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.', 'Jackets', '0')`

// For GET /products
// TODO: implement page and count parameters

// remake getAllProducts here!!!!
const getAllProducts = new Promise((resolve, reject) => {
	client.query('Select * from productoverview.products', (err, results) => {
		if (err) {
			console.log('error in products database!', err);
			reject(err);
		}
		else {
			// console.log('products database is working! ', results.rows);
			resolve(results.rows);
		}
	})`	`
});



// For GET /products/:product_id
const getProductByID = (product_id, callback) => {
	// const product_id = req.params.product_id;
	// console.log('product_id is: ', product_id);
		var getProductByIDQuery = `SELECT row_to_json(p) from (select id, name, slogan, description, category, default_price, ` +
				`(select array_to_json(array_agg(row_to_json(f))) ` +
				`from (select feature, value from productoverview.features where product_id = ${product_id}) f) as features ` +

		`from productoverview.products where id = ${product_id}) p`;

	client.query(getProductByIDQuery, (err, results) => {
		if (err) {
			console.log('error in database!', err);
			callback(err, null);
		}
		else {
			// console.log('database is working! ', results.rows[0].row_to_json);
			console.log('database is working! ', results.rows[0].row_to_json);
			callback(null, results.rows[0].row_to_json);
			// res.status(200).json(results.rows[0].row_to_json);
		}
		// client.end;
	});
}; // try product_id = 64620


const getProductStyles = (product_id, callback) => {
	var product_id_string = JSON.stringify(product_id);

	const productStyleQuery = `select json_build_object(` +
			`'product', ${product_id}::text, ` +
			`'results', json_agg( ` +
			`json_build_object( ` +
			`'style_id', s.id, ` +
			`'name', s.name, ` +
			`'original_price', (
				select
				CASE
				when s.original_price = 'null' then '0'
				else s.original_price
				end as OriginalPrice
			), ` +
			`'sale_price', (
				select
				CASE
				when s.sale_price = 'null' then '0'
				else s.sale_price
				end as SalePrice
			), ` +
			`'default?', (
				select (1::smallint)::int::bool
			), ` +
			`'photos', (select (json_agg( ` +
				`json_build_object( ` +
					`'thumbnail_url', p.thumbnail_url, ` +
					`'url', p.url ` +
				`) ` +
			`)` +
			`) as photos from productoverview.photos p where p.styleId = s.id ` +
			`), ` +
			`'skus', (select json_object_agg( ` +
					// -- k.id,
					`(
						select
						CASE
						when size = 'XS' then '37'
						when size = 'S' then '38'
						when size = 'M' then '39'
						when size = 'L' then '40'
						when size = 'XL' then '41'
						when size = 'XXL' then '42'
						else size
						end as SizeText
					--  from productoverview.skus k at k.id
					),
					json_build_object(
						'quantity', k.quantity,
						'size', k.size
					)
				) from productoverview.skus k where k.styleId = s.id
			)

			)
		)
	)
from productoverview.styles s where s.productId = ${product_id}; `


	client.query(productStyleQuery, (err, results) => {
		if (err) {
			console.log('error in cart database!', err);
			callback(err, null);
		}
		else {
			console.log('style query is working! ', results.rows[0].json_build_object);
			// callback(null, results);
			callback(null, results.rows[0].json_build_object);
		}
	})
};


const getRelatedProducts = (product_id, callback) => {
	var getRelatedProductsQuery = `select array_agg(related_product_id) from productoverview.related where current_product_id = ${product_id}`;
	client.query(getRelatedProductsQuery, (err, results) => {
		if (err) {
			console.log('error in products/related products! ', err);
			callback(err, null);
		}
		else {
			console.log('products/related products is working! ');
			callback(null, results);
		}
	});
};


// INSERT INTO productoverview.products(name, slogan, description, category, default_price)
// VALUES ("Camo Onesie", "Blend in to your crowd", "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.", "Jackets", 0);

module.exports = {
	getAllProducts: getAllProducts,
	getProductByID: getProductByID,
	getProductStyles: getProductStyles,
	getRelatedProducts: getRelatedProducts
}

// curl http://localhost:5000/products
