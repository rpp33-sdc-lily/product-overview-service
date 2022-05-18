// this is my server
// const newrelic = require('newrelic');
require('dotenv').config();
const { promisify } = require('util');
const Redis = require('redis');
// const PORT = process.env.PORT || 5000;
// const REDIS_PORT = process.env.REDIS_PORT || 6379;

const redisClient = Redis.createClient();
// const redisClient = Redis.createClient({
// 	host: '127.0.0.1',
// 	port: 6379,
// });
redisClient.connect();

const express = require('express');
const app = express();
// const cors = require("cors");
const db = require('../database/index.js');

const DEFAULT_EXPIRATION = 3600;

// const port = 3000;
// ^ testing won't work because server is only listening to 1 port.
// var bodyParser = require('body-parser');
// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/loaderio-bdbab10087232cc8cf956aa101fd7095.txt', (req, res) => {
	res.sendFile('/home/ubuntu/product-overview-service/loaderio-bdbab10087232cc8cf956aa101fd7095.txt');
	// res.sendFile('/Users/tanha/RPP33/SDC/product-overview-service/loaderio-07a1310218300c2fc487392e6596ba3b.txt');
});

app.get('/products', (req, res) => {
	var page = 1;  // Default 1
	var count = 5; // Default 5
	console.log('page is: ', req.body);
	console.log('count is: ', req.body);

	var start = count * (page - 1);
	var end = start + count;

	db.getAllProducts.then(results => {
		res.status(200).send(results.slice(start, end));
	})
		.catch(error => {
			res.status(500).send(error);
		});
});

// OLD VERSION
// app.get('/products/:product_id', db.getProductByID);
redisClient.on('ready', () => {
	console.log('Connected');

	redisClient.get('test', (err, value) => {
		if (err) {
			throw err;
		}
		console.log('just checcking!!!');
		// console.log('Value:', value);
	})
});

redisClient.on('error', err => {
	console.log('Error ' + err);
});

app.get('/products/:product_id', async (req, res) => {
	const product_id = req.params.product_id;
	var key = `/products/${product_id}`;
	const value = await redisClient.get(`products/${product_id}`);
	if (value != null) {
		// console.log('value is: ', value);
		res.status(200).send(value);
	}
	else {
		db.getProductByID(product_id, (err, results) => {
			if (err) {
				console.log(err);
				res.status(500).send(err);
			}
			else {
				redisClient.SETEX(`products/${product_id}`, DEFAULT_EXPIRATION, JSON.stringify(results));
				res.status(200).send(results);
			}
		});
	}
});

app.get('/products/:product_id/styles', async (req, res) => {
	const product_id = req.params.product_id;
	console.log('product_id in styles is: ', product_id);
	var key = `/products/${product_id}/styles`;
	const value = await redisClient.get(key);
	if (value != null) {
		// console.log('value is: ', value);
		res.status(200).send(value);
	}
	else {
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
				console.log('product_id/styles results are: ', results);
				redisClient.SETEX(key, DEFAULT_EXPIRATION, JSON.stringify(results));
				res.status(200).send(results);
			}
		});
	}
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

// app.listen(port, () => {
// 	console.log(`Server is listening on port ${port}`);
// });

// endpoint for testing jest endpoint async testing:
app.get('/test', async (req, res) => {
	// res.statusCode(200);
	res.json({ message: 'testing endpoint passed!' })
})

module.exports = app;