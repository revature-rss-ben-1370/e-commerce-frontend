import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
  withCredentials: true,
  baseURL: 'http://ac62c10e8f5244a5aadfc6f700c3ff47-1786666394.us-east-1.elb.amazonaws.com:5000',
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
