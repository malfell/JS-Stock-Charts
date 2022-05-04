async function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    //Fetching the data
    //Base url: https://api.twelvedata.com/
    //Endpoint path: time_series?
    //Query string: symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=95c3df20baa5436f971d88cb415f9e2f
        //Symbols: symbol=GME,MSFT,DIS,BNTX
        //Interval: &interval=1min
        //API KEY: &apikey=95c3df20baa5436f971d88cb415f9e2f
        // '&' goes in between symbol and interval and then interval and API key
    let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1min&apikey=95c3df20baa5436f971d88cb415f9e2f')
    let parsed = await response.json();
    console.log(parsed); //result is an object

    //Turns object into an array
    const {GME, MSFT, DIS, BNTX} = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];

    console.log(Chart);

}

main()