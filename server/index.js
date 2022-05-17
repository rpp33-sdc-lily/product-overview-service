// this is my server
const express = require('express');
const app = express();
// const cors = require("cors");
const db = require('../database/index.js');
const Redis = require('redis');
const redisClient = Redis.createClient();

const DEFAULT_EXPIRATION = 3600;

// const port = 3000;
// ^ testing won't work because server is only listening to 1 port.
// var bodyParser = require('body-parser');
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// console.dir(req.params.name);
redisClient.connect();


// app.get('/products', (req, res) => {
// 	res.statusCode(200).send('request to /products received!');
// })

// OLD VERSION
// app.get('/products', db.getAllProducts);

app.get('/loaderio-07a1310218300c2fc487392e6596ba3b.txt', (req, res) => {
	// res.sendFile('/home/ubuntu/product-overview-service/loaderio-07a1310218300c2fc487392e6596ba3b.txt');
	res.sendFile('/Users/tanha/RPP33/SDC/product-overview-service/loaderio-07a1310218300c2fc487392e6596ba3b.txt');
});

app.get('/products', (req, res) => {
	var page = 1;  // Default 1
	var count = 5; // Default 5
	console.log('page is: ', req.body);
	console.log('count is: ', req.body);

	var start = count * (page - 1);
	var end = start + count;
	// if (req.body.page != undefined) {
	// 	page = req.body.page;
	// }
	// if (req.body.count != undefined) {
	// 	count = req.body.count;
	// }
  // query results from database
	db.getAllProducts.then(results => {
		res.status(200).send(results.slice(start, end));
	})
	.catch(error => {
		res.status(500).send(error);
	});
	// send back error or query results
});

// OLD VERSION
// app.get('/products/:product_id', db.getProductByID);

app.get('/products/:product_id', (req, res) => {
	const product_id = req.params.product_id;
	// db.getProductByID.then(results => {
	// 	res.status(200).send(results);
	// })
	// .catch(error => {
	// 	res.status(500).send(error);
	// });


	console.log('getProduct is coming here!');
	db.getProductByID(product_id, (err, results) => {
		if (err) {
			res.status(500).send(err);
			console.log('getProductByID error: ', err);
		}
		else {
			// redisClient.setex("products_product_id", DEFAULT_EXPIRATION, JSON.stringify(results));
			redisClient.SETEX(`products/${product_id}`, DEFAULT_EXPIRATION, JSON.stringify(results))
			res.status(200).send(results);
		}
	});
});


app.get('/products/:product_id/styles', (req, res) => {
	const product_id = req.params.product_id;
	console.log('product_id in styles is: ', product_id);
	db.getProductStyles(product_id, (err, results) => {
		if (err) {
			console.log('error in server product styles! ', err);
			res.status(500).send(err);
		}
		else {
			// console.log('server product styles success! ', results.rows[0].json_build_object);
			// res.status(200).send(results.rows[0].json_build_object);
			if (results.results === null || results.results === undefined) {
				results.results = [];
			}
			res.status(200).send(results);
		}
	});
});


app.get('/products/:product_id/related', (req, res) => {
	const product_id = req.params.product_id;
	console.log('product_id in products/related products is: ', product_id);
	db.getRelatedProducts(product_id, (err, results) => {
		if (err) {
			console.log('error in server products/related products! ', err);
			res.status(500).send(err);
		}
		else {
			console.log('server products/related products success! ', results.rows[0].array_agg);
			res.status(200).send(results.rows[0].array_agg);
		}
	});
});




// app.get('/products/:product_id', (req, res) => {
// 	res.statusCode(200).send('request to /products/:product_id received!');
// })

// app.get('/products/:product_id/styles', (req, res) => {
// 	res.statusCode(200).send('request to /products/:product_id/styles received!');
// })

// app.get('/products/:product_id/related', (req, res) => {
// 	res.statusCode(200).send('request to /products/:product_id/related received!');
// })



// app.listen(port, () => {
// 	console.log(`Server is listening on port ${port}`);
// });

// endpoint for testing jest endpoint async testing:
app.get('/test', async (req, res) => {
	// res.statusCode(200);
	res.json({message: 'testing endpoint passed!'})
})

module.exports = app;