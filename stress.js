import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 1,
  duration: '30s',
};
export default function () {
  // http.get('http://test.k6.io');
	var max = 10000011;
	var randomID = Math.random() * (max - min) + min;

	http.get('http://localhost:5000/products/product_id');
  sleep(1);
}


// to run with more users:
// k6 run --vus 10 --duration 30s stress.js
