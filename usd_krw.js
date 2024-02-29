import axios from 'axios';

const getExchangeRateData = async () => {
    // Endpoint and parameters from the documentation
    const endpoint = 'https://www.koreaexim.go.kr/site/program/financial/exchangeJSON';
    const authkey = 'KNFAkhd4tfocLfRacEsfPOo8sOWulDLo'; // Replace with your actual auth key
    const searchdate = '20240229'; // Replace with the date you want the data for, format YYYYMMDD
    const data = 'AP01'; // Code for the type of data you are requesting, based on documentation

    try {
        // Making a GET request to the endpoint with required parameters
        const response = await axios.get(endpoint, {
            params: {
                authkey: authkey,
                searchdate: searchdate,
                data: data
            }
        });

        // Logging the response data
        console.log(response.data);

        // Assuming the response contains an array of exchange rate data and finding the USD/KRW pair
        const usdKrwData = response.data.find(item => item.cur_unit === 'USD');
        if (usdKrwData) {
            console.log(`Exchange rate for USD/KRW on ${searchdate}: ${usdKrwData.ttb}`);
        } else {
            console.log('USD/KRW data not found for the specified date.');
        }
    } catch (error) {
        console.error('Error fetching the exchange rate data:', error);
    }
};

getExchangeRateData();
