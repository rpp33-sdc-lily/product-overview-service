// const {Pool, Client} = require("pg");

// const credentials = {
// 	user: "postgres",
// 	host: "localhost",
// 	database: "postgres",
// 	password: "password",
// 	port: 5432
// }

// // Connect with a connection pool
// async function poolDemo() {
//   const pool = new Pool(credentials);
//   const now = await pool.query("SELECT NOW()");
//   await pool.end();

//   return now;
// }

// // Connect with a client.

// async function clientDemo() {
//   const client = new Client(credentials);
//   await client.connect();
//   const now = await client.query("SELECT NOW()");
//   await client.end();

//   return now;
// }

// // Use a self-calling function so we can use async / await.

// (async () => {
//   const poolResult = await poolDemo();
//   console.log("Time with pool: " + poolResult.rows[0]["now"]);

//   const clientResult = await clientDemo();
//   console.log("Time with client: " + clientResult.rows[0]["now"]);
// })();

// async function registerPerson(person) {
//   const text = `
//     INSERT INTO people (fullname, gender, phone, age)
//     VALUES ($1, $2, $3, $4)
//     RETURNING id
//   `;
//   const values = [person.fullname, person.gender, person.phone, person.age];
//   return pool.query(text, values);
// }

// async function getPerson(personId) {
//   const text = `SELECT * FROM people WHERE id = $1`;
//   const values = [personId];
//   return pool.query(text, values);
// }

// async function updatePersonName(personId, fullname) {
//   const text = `UPDATE people SET fullname = $2 WHERE id = $1`;
//   const values = [personId, fullname];
//   return pool.query(text, values);
// }

// async function removePerson(personId) {
//   const text = `DELETE FROM people WHERE id = $1`;
//   const values = [personId];
//   return pool.query(text, values);
// }


const {Client} = require('pg')

const client = new Client({
	user: "postgres",
	host: "localhost",
	database: "postgres",
	password: "password",
	port: 5432
})

client.connect();


const dummyData = [
	{
    id: 1,
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    category: 'Jackets',
    default_price: '140'
  },
  {
    id: 2,
    name: 'Bright Future Sunglasses',
    slogan: "You've got to wear shades",
    description: "Where you're going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.",
    category: 'Accessories',
    default_price: '69'
  },
  {
    id: 3,
    name: 'Morning Joggers',
    slogan: 'Make yourself a morning person',
    description: "Whether you're a morning person or not.  Whether you're gym bound or not.  Everyone looks good in joggers.",
    category: 'Pants',
    default_price: '40'
  },
  {
    id: 4,
    name: "Slacker's Slacks",
    slogan: 'Comfortable for everything, or nothing',
    description: "I'll tell you how great they are after I nap for a bit.",
    category: 'Pants',
    default_price: '65'
  },
  {
    id: 5,
    name: 'Heir Force Ones',
    slogan: 'A sneaker dynasty',
    description: "Now where da boxes where I keep mine? You should peep mine, maybe once or twice but never three times. I'm just a sneaker pro, I love Pumas and shell toes, but can't nothin compare to a fresh crispy white pearl",
    category: 'Kicks',
    default_price: '99'
  },
  {
    id: 6,
    name: 'Pumped Up Kicks',
    slogan: 'Faster than a just about anything',
    description: 'The Pumped Up serves up crisp court style with a modern look. These shoes show off tennis-whites shades and are constructed with a supple leather upper and a classic rubber cupsole.',
    category: 'Kicks',
    default_price: '89'
  }
]


// var insertQuery = `INSERT INTO productoverview.products(name, slogan, description, category, default_price) VALUES ('Camo Onesie', 'Blend in to your crowd', 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.', 'Jackets', '0')`



// For GET /products
// TODO: implement page and count parameters

// OLD VERSION
// const getAllProducts = (req, res) => {
// 	client.query('Select * from productoverview.products limit 3', (err, results) => {
// 		if (err) {
// 			console.log('error in products database!', err);
// 		}
// 		else {
// 			console.log('products database is working! ', results.rows);
// 			res.status(200).json(results.rows);
// 		}
// 	})
// 	// console.log('dummyData is: ', dummyData);
// 	// res.status(200).json(dummyData);
// };

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
	})
	// console.log('dummyData is: ', dummyData);
	// res.status(200).json(dummyData);
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
	// const product_id = req.params.product_id;
	// console.log('product_id in styles is: ', product_id);

	// const productStyleQuery = `select row_to_json(t) ` +
	// 	`from ( ` +
	// 	`select productId as product_id, ` +
	// 	`(` +
	// 	'select array_to_json(array_agg(row_to_json(d))) ' +
	// 	`from (	` +
	// 	`select id as style_id, name, original_price, default_style as default, ( ` +
	// 	`select array_to_json(array_agg(row_to_json(p))) ` +
	// 	`from ( ` +
	// 	`select productoverview.photos.thumbnail_url, productoverview.photos.url ` +
	// 	`from productoverview.photos, productoverview.styles ` +
	// 	`where ` +
	// 	`productoverview.photos.styleId = productoverview.styles.id ` +
	// 	`and productoverview.styles.productId = 1 ` +
	// 	`) p ` +
	// 	`) as photos ` +
	// 	`from productoverview.styles ` +
	// 	`where productId = 1 ` +
	// 	`) d ` +
	// 	`) as results ` +
	// 	`from productoverview.styles ` +
	// 	`where productId = 1 ` +
	// 	`) t; `;
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


// client.query('Select * from productoverview.features', (err, res) => {
// 	if (err) {
// 		console.log('error in features database!', err);
// 	}
// 	else {
// 		console.log('features database is working! ', res.rows);
// 	}
// 	client.end;
// })

// client.query('Select * from productoverview.photos', (err, res) => {
// 	if (err) {
// 		console.log('error in photo database!', err);
// 	}
// 	else {
// 		console.log('photo database is working! ', res.rows);
// 	}
// 	client.end;
// })

// client.query('Select * from productoverview.skus', (err, res) => {
// 	if (err) {
// 		console.log('error in skus database!', err);
// 	}
// 	else {
// 		console.log('skus database is working! ', res.rows);
// 	}
// 	client.end;
// })

// client.query('Select * from productoverview.styles', (err, res) => {
// 	if (err) {
// 		console.log('error in style database!', err);
// 	}
// 	else {
// 		console.log('style database is working! ', res.rows);
// 	}
// 	client.end;
// })


// INSERT INTO productoverview.products(name, slogan, description, category, default_price)
// VALUES ("Camo Onesie", "Blend in to your crowd", "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.", "Jackets", 0);

module.exports = {
	getAllProducts: getAllProducts,
	getProductByID: getProductByID,
	getProductStyles: getProductStyles,
	getRelatedProducts: getRelatedProducts
}

// curl http://localhost:5000/products
