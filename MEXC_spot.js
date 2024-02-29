require('dotenv').config();
const axios = require('axios');
const crypto = require('crypto');

function placeOrder(quantity, price) {
    const apiKey = process.env.MEXC_API_KEY;
    const secretKey = process.env.MEXC_SECRET_KEY;
    const baseEndpoint = 'https://api.mexc.com';
    const endpoint = '/api/v3/order';

    const orderParams = {
        symbol: 'ELUSDT',
        side: 'BUY',
        type: 'LIMIT',
        quantity: quantity, // The quantity is set by the function argument.
        price: price, // The price is set by the function argument.
        recvWindow: 5000,
        timestamp: Date.now() // Current Unix timestamp in milliseconds.
    };

    const queryString = Object.keys(orderParams).map(key => `${key}=${encodeURIComponent(orderParams[key])}`).join('&');
    const signature = crypto.createHmac('sha256', secretKey).update(queryString).digest('hex');
    orderParams.signature = signature;

    const headers = {
        'X-MEXC-APIKEY': apiKey,
        'Content-Type': 'application/json'
    };

    axios.post(`${baseEndpoint}${endpoint}`, null, { headers: headers, params: orderParams })
        .then(response => {
            console.log('Order placed successfully:', response.data);
        })
        .catch(error => {
            console.error('Error placing order:', error.response ? error.response.data : error.message);
        });
}

// Execute the function with the desired quantity and price for ELUSDT.
placeOrder(1.5, 10.50); // Replace 1.5 with the quantity and 10.50 with the price you want.
