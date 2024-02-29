const axios = require('axios');
const crypto = require('crypto');
require('dotenv').config(); // Make sure you have the dotenv package installed to handle environment variables

// Load your API key and secret from environment variables for security
const apiKey = process.env.MEXC_API_KEY;
const apiSecret = process.env.MEXC_API_SECRET;

// Function to sign the request
function signRequest(params, secret) {
    const paramString = Object.keys(params).map(key => `${key}=${params[key]}`).join('&');
    return crypto.createHmac('sha256', secret).update(paramString).digest('hex');
}

// Function to create the headers required for the request
function createHeaders(apiKey) {
    return {
        'Content-Type': 'application/json',
        'ApiKey': apiKey,
        // Other headers as required by the MEXC API
    };
}

// Function to place an order
async function placeOrder(symbol, price, volume, leverage, type, side) {
    const params = {
        symbol,
        price,
        vol: volume,
        leverage,
        side,
        type,
        // Add other parameters as per the API documentation
    };

    // Sign the request
    const signature = signRequest(params, apiSecret);

    // Append the signature to the params
    params.signature = signature;

    // Create the headers
    const headers = createHeaders(apiKey);

    try {
        const response = await axios.post('https://contract.mexc.com/api/v1/private/order/submit', params, { headers });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error placing order:', error);
        throw error;
    }
}

// // Example usage
// placeOrder('BTC_USDT', '50000', '1', '10', '2', '1').then(order => {
//     console.log('Order placed:', order);
// }).catch(error => {
//     console.error('Failed to place order:', error);
// });
