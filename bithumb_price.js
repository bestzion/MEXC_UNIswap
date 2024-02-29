import axios from 'axios';

export async function BithumbfetchPriceData() {
    const options = {
        method: 'GET',
        url: 'https://api.bithumb.com/public/orderbook/EL_KRW',
        headers: {accept: 'application/json'}
    };

    try {
        const response = await axios.request(options);

        const bids_price = response.data.data.bids[0]['price'];
        const bids_quantity = response.data.data.bids[0]['quantity'];
        const asks_price = response.data.data.asks[0]['price'];
        const asks_quantity = response.data.data.asks[0]['quantity'];

        // const currentTime = new Date().toLocaleString();

        return { bids_price , asks_price };
        // console.log(`[${currentTime}] Bids price: ${bids_price} / Volume: ${bids_price * bids_quantity}`);
        // console.log(`[${currentTime}] Asks price: ${asks_price} / Volume: ${asks_price * asks_quantity}`);
    } catch (error) {
        console.error(error);
    }
}

// Call the function every second
// setInterval(fetchPriceData, 1000);