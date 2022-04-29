import http from 'k6/http';
import { sleep } from 'k6';
// export const options = {
//   vus: 5,
//   duration: '60s',
// };

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 2000,
      timeUnit: '1s',
      duration: '1m',
      preAllocatedVUs: 2000,
      maxVUs: 20000,
    },
  },
};

export default function () {
  // http.get('http://test.k6.io');
	var max = 1000011;
	var min = 900010;
	var randomID = Math.round(Math.random() * (max - min) + min);

	http.get(`http://localhost:5000/products/${randomID}`);
  sleep(1);
}


// to run with more users:
// k6 run --vus 10 --duration 30s stress.js

