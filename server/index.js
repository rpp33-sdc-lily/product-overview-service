// this is my server
const express = require('express');
const app = express();
const db = require('../database/index.js');
// const port = 3000;
// ^ testing won't work because server is only listening to 1 port.
// var bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// console.dir(req.params.name);



// app.get('/products', (req, res) => {
// 	res.statusCode(200).send('request to /products received!');
// })

// OLD VERSION
// app.get('/products', db.getAllProducts);

app.get('/products', (req, res) => {
  // query results from database
	db.getAllProducts.then(results => {
		res.status(200).send(results);
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

	db.getProductByID(product_id, (err, results) => {
		if (err) {
			res.status(500).send(err);
		}
		else (
			res.status(200).send(results)
		)
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
			console.log('server product styles success! ', results.rows[0].json_build_object);
			res.status(500).send(results.rows[0].json_build_object);
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
			res.status(500).send(results.rows[0].array_agg);
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