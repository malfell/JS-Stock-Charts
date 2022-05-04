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
    // console.log(parsed); //testing: result is an object

    //Turns object into an array
    const {GME, MSFT, DIS, BNTX} = mockData;
    const stocks = [GME, MSFT, DIS, BNTX];

    // console.log(Chart); //testing to make sure chart is there


    // TIME CHART CANVAS
    new Chart(timeChartCanvas.getContext('2d'), {
        //need a line chart not a bar chart
        type: 'line',
        data: {
            //added date time values, used map to change the array
            labels: stocks[0].values.map( value => value.datetime),
            //turns an array off stock objects into an array of 
            //dataset objects
            datasets: stocks.map(stock => ({
                //each line represents one stock, so stock symbol can be used
                label: stock.meta.symbol,
                //maps over the values array and uses value.high to take
                //note of the highest cost stock of the day
                //Converts it from string to number with parseFloat
                data: stock.values.map(value => parseFloat(value.high)),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],

            }))
        },

    });
    
    console.log(stocks[0].values); //checking the dates


}

main()