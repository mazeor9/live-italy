const axios = require('axios');

const axiosInstance = axios.create({
  baseURL: 'https://live-italy.vercel.app/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache'
  },
});

module.exports = axiosInstance;
