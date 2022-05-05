const app = require('./index.js')
const supertest = require('supertest')
const request = supertest(app)


it('Testing to see if Jest works', () => {
	expect(1).toBe(1)
})

// testing endpoint:
it ('Gets the test endpoint', async () => {
	const res = await request.get('/test')

	expect(res.status).toBe(200);
	expect(res.body.message).toBe('testing endpoint passed!')
	// done()
})


// 2 unit tests (endpoint tests?) for 