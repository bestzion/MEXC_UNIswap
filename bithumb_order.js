import axios from 'axios';
import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

// Function to create HMAC-SHA512 signature
const createApiSign = (endpoint, params, apiNonce, apiKey, apiSecret) => {
    const queryString = Object.keys(params)
        .map(key => `${key}=${params[key]}`)
        .join('&');

    const message = endpoint + '?' + queryString + apiNonce + apiKey;
    const hmac = crypto.createHmac('sha512', apiSecret);
    const sign = hmac.update(message).digest('base64');
    return sign;
};

// Your API key and secret from environment variables
const api_key = process.env.Bithumb_API_KEY;
const api_secret = process.env.Bithumb_SECRET_KEY;

// Current timestamp in milliseconds
const apiNonce = Date.now().toString();

const encodedParams = new URLSearchParams();
encodedParams.set('order_currency', 'EL');
encodedParams.set('payment_currency', 'KRW');
encodedParams.set('units', '1000');
encodedParams.set('price', '7');
encodedParams.set('type', 'bid');

// Endpoint without the host part
const endpoint = '/trade/place';

// Calculate Api-Sign
const apiSign = createApiSign(endpoint, encodedParams, apiNonce, api_key, api_secret);

// Function to make the API request
const makeApiRequest = async () => {
    try {
        const response = await axios({
            method: 'POST',
            url: 'https://api.bithumb.com' + endpoint,
            headers: {
                'api-client-type': "2",
                'Api-Key': api_key,
                'Api-Nonce': apiNonce,
                'Api-Sign': apiSign
            },
            data: new URLSearchParams(encodedParams).toString()
        });
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};

// Execute the function
makeApiRequest();
