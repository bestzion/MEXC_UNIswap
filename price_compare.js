import { BithumbfetchPriceData } from "./bithumb_price.js";
import { MEXCfetchPriceData } from "./MEXC_price.js";

async function comparePrices() {
    try {
        const bithumbData = await BithumbfetchPriceData();
        const mexcData = await MEXCfetchPriceData("ELUSDT");

        const { bids_price: BithumbbidsPrice, asks_price: BithumbasksPrice } = bithumbData;
        const Bithumbbids_usd = (BithumbbidsPrice / 1334).toFixed(6);
        const Bithumbasks_usd = (BithumbasksPrice / 1334).toFixed(6);
        const { Askprice: MEXCasksPrice, Bidprice: MEXCbidsPrice } = mexcData;

        const currentTime = new Date().toLocaleString();
        const bidsDifference = ((Bithumbbids_usd - MEXCbidsPrice) / Bithumbbids_usd * 100).toFixed(2);
        const asksDifference = ((Bithumbasks_usd - MEXCasksPrice) / Bithumbasks_usd * 100).toFixed(2);

        console.log(`Bithumb Bids: ${Bithumbbids_usd} | MEXC Bids: ${MEXCbidsPrice}     `);
        console.log(`[${currentTime}] Bithumb - MEXC | Bids= ${bidsDifference} | Asks= ${asksDifference}`);

    } catch (error) {
        console.error('Failed to fetch or compare prices:', error);
    }
}

comparePrices()