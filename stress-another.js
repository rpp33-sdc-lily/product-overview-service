import http from 'k6/http';
import { sleep } from 'k6';
export const options = {
  vus: 1,
  duration: '30s',
};
export default function () {
  // http.get('http://test.k6.io');
	http.get('http://localhost:5000/products/64627/style');
  sleep(1);
}


// to run with more users:
// k6 run --vus 10 --duration 30s stress.js
