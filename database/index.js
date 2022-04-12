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



// var insertQuery = `INSERT INTO productoverview.products(name, slogan, description, category, default_price) VALUES ('Camo Onesie', 'Blend in to your crowd', 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.', 'Jackets', '0')`
// client.query(insertQuery, (err, res) => {
// 	if (err) {
// 		console.log('error inserting to products table! ', err);
// 	}
// 	else {
// 		console.log('inserting success! ');
// 	}
// })


// For GET /products
client.query('Select * from productoverview.products', (err, res) => {
	if (err) {
		console.log('error in database!', err);
	}
	else {
		console.log('database is working! ', res.rows);
	}
	client.end;
})


// For GET /products/:product_id
// client.query('Select * from productoverview.products', (err, res) => {
// 	if (err) {
// 		console.log('error in database!', err);
// 	}
// 	else {
// 		console.log('database is working! ', res.rows);
// 	}
// 	client.end;
// })

// INSERT INTO productoverview.products(name, slogan, description, category, default_price)
// VALUES ("Camo Onesie", "Blend in to your crowd", "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.", "Jackets", 0);