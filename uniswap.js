const { ChainId, Token, WETH, Fetcher, Trade, Route, TokenAmount, TradeType } = require('@uniswap/v2-sdk');
const { ethers } = require('ethers');

const chainId = ChainId.MAINNET;
const elTokenAddress = process.env.EL_contract
const usdtTokenAddress = process.env.USDT_contract
const infuraURL = process.env.INFURA_URL

const elDecimals = 18; // Replace with the actual decimals of EL
const usdtDecimals = 6; // USDT typically has 6 decimals


const provider = new ethers.providers.JsonRpcProvider(infuraURL); // Replace with your Ethereum node URL
const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider); // Replace with your wallet private key

const elToken = new Token(chainId, elTokenAddress, elDecimals);
const usdtToken = new Token(chainId, usdtTokenAddress, usdtDecimals);

// Assume you're using the WETH token address for the WETH9 token on the mainnet
const wethToken = WETH[chainId];

async function swapELForUSDT(elAmountRaw) {
    const elAmount = new TokenAmount(elToken, ethers.utils.parseUnits(elAmountRaw, elDecimals).toString());

    // Fetch the pair data
    const pair = await Fetcher.fetchPairData(elToken, usdtToken, provider);

    // Create the route
    const route = new Route([pair], elToken);

    // Create the trade
    const trade = new Trade(route, elAmount, TradeType.EXACT_INPUT);

    // Prepare the transaction
    const slippageTolerance = new Percent('50', '10000'); // 0.50%
    const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw.toString();
    const path = [elTokenAddress, wethToken.address, usdtTokenAddress];
    const to = 'YOUR_ADDRESS'; // Replace with the recipient address
    const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current time

    // Prepare to sign the transaction
    const value = trade.inputAmount.raw.toString();
    const UniswapV2Router02Address = 'UNISWAP_V2_ROUTER_02_ADDRESS'; // Replace with the correct router address

    const tx = await signer.sendTransaction({
        to: UniswapV2Router02Address,
        value: value,
        data: UniswapV2Router02Interface.encodeFunctionData('swapExactTokensForTokens', [
            amountOutMin,
            path,
            to,
            deadline
        ]),
    });

    console.log(`Transaction hash: ${tx.hash}`);
}

// Example: swap 1 EL for as much USDT as possible
swapELForUSDT('1');
