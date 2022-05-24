import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
  withCredentials: true,
  baseURL: 'http://revatureswag-env.eba-3gm7fua7.us-east-1.elasticbeanstalk.com/',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3000',
  },
});

export interface eCommerceApiResponse {
  status: number;
  payload: any;
}



export default eCommerceClient;
