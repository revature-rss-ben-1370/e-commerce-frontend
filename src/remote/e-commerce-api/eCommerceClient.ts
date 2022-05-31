import axios from 'axios';

// This is the configuration for sending HTTP Requests with Axios
// Very simple, but it also doesn't give us much abstraction
const eCommerceClient = axios.create({
  withCredentials: true,
<<<<<<< HEAD
  baseURL: 'https://production.dcs2jw2334qwo.amplifyapp.com/',
=======
  baseURL: 'http://ec2-54-83-92-30.compute-1.amazonaws.com',
>>>>>>> 0b8f719c1b299744499ba27dde71972bcda3cf8d
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
