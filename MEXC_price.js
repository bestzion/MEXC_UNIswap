const axios = require('axios');
const {parse} = require("dotenv");

async function getBestAskPrice(symbol) {
    const endpoint = `https://api.mexc.com/api/v3/depth`;
    try {
        const response = await axios.get(endpoint, {
            params: {
                symbol: symbol,
                limit: 5 // Set a small limit since we only need the best ask
            }
        });

        const Ask = response.data.asks[0];
        const Bid = response.data.bids[0];
        const AskQuantity = parseFloat(Ask[1]);
        const BidQuantity = parseFloat(Bid[1]);
        const Askprice = Ask[0];
        const Bidprice = Bid[0];
        const AskTickerVolume = Askprice * AskQuantity
        const BidTickerVolume = Bidprice * BidQuantity
        const currentTime = new Date().toLocaleString();
        console.log(`[${currentTime}] Ask price for ${symbol}: ${Askprice} / Volume: ${AskTickerVolume}`);
        console.log(`[${currentTime}] Bid price for ${symbol}: ${Bidprice} / Volume: ${BidTickerVolume}`);

        return Askprice, Bidprice;
    } catch (error) {
        console.error(`Error getting best ask price for ${symbol}:`, error);
        throw error;
    }
}

// Function to repeat the price fetching every minute
function startPriceFetchLoop(symbol) {
    getBestAskPrice(symbol); // Fetch the price immediately when starting
    setInterval(() => getBestAskPrice(symbol), 1000); // Fetch the price every minute (60000ms)
}

// Example usage
startPriceFetchLoop('ELUSDT'); // Replace with 'EL/USDT' if required by the API endpoint
