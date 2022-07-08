import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
  withCredentials: true,
  baseURL: 'http://a24b3e0b0313345e49eb2e69fe33a185-35174312.us-east-1.elb.amazonaws.com/e-commerce',
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
