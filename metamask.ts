// // Import ethers from ethers.js
// const { ethers } = require('ethers');
//
// // Function to initialize the application
// async function initApp() {
//     // Check if MetaMask is installed
//     if (typeof window.ethereum !== 'undefined') {
//         console.log('MetaMask is available!');
//
//         try {
//             // Request account access if needed
//             await window.ethereum.request({ method: 'eth_requestAccounts' });
//
//             // We can now use the provider
//             const provider = new ethers.providers.Web3Provider(window.ethereum);
//             const signer = provider.getSigner();
//
//             // Now you can use the signer to send transactions, etc.
//             // For example, getting the user's address:
//             const address = await signer.getAddress();
//             console.log(`User's address: ${address}`);
//
//             // Continue with your application logic here...
//
//         } catch (error) {
//             console.error('User denied account access', error);
//         }
//     } else {
//         console.log('MetaMask is not installed. Please consider installing it: https://metamask.io/');
//     }
// }
//
// // Call the init function when the page has loaded
// window.addEventListener('load', initApp);
