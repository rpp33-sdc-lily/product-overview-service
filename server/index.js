// this is my server
const express = require('express');
const app = express();
// const port = 3000;
// ^ testing won't work because server is only listening to 1 port.
var bodyParser = require('body-parser');
app.use(express.json());


app.get('/products', (req, res) => {
	res.statusCode(200).send('request to /products received!');
})

app.get('/products/:product_id', (req, res) => {
	res.statusCode(200).send('request to /products/:product_id received!');
})

app.get('/products/:product_id/styles', (req, res) => {
	res.statusCode(200).send('request to /products/:product_id/styles received!');
})

app.get('/products/:product_id/related', (req, res) => {
	res.statusCode(200).send('request to /products/:product_id/related received!');
})



// app.listen(port, () => {
// 	console.log(`Server is listening on port ${port}`);
// });

// endpoint for testing jest endpoint async testing:
app.get('/test', async (req, res) => {
	// res.statusCode(200);
	res.json({message: 'testing endpoint passed!'})
})

module.exports = app;