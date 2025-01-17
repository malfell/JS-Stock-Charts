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


    //Function to convert stock symbol to a color
    function getColor(stock){
        if(stock === 'GME'){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === 'MSFT'){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === 'DIS'){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === 'BNTX'){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }

    //stocks were in descending order, so this reverses
    //each stock to be ascending order
    stocks.forEach(stock => stock.values.reverse())

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
                //invokes getColor function and obtains 
                //chosen color for each symbol
                backgroundColor: getColor(stock.meta.symbol),
                borderColor: getColor(stock.meta.symbol),

            }))
        },

    });
    
    // console.log(stocks[0].values); //checking the dates

    //gets the highest value
    function getHighest(values){
        //initializes highest to 0
        let highest = 0;
        //goes through the array values
        values.forEach(value => {
            //if the highest value is greater than the current highest,
            //then that value will become the current highest
            if(parseFloat(value.high) > highest){
                highest = value.high;
            }
        })
        return highest;
    }

    //gets the average values
    function getAverage(values){
        //initializes the total to 0
        let total = 0;
        values.forEach(value => {
            //adds each value to the total
            total += parseFloat(value.high);
        })
        //returns total devided by the amount of numbers
        return total / values.length 
    }

    // HIGHEST CHART CANVAS
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        //bar graph
        type: 'bar',
        data: {
            //Label for stock symbols 
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                //label for highest
                label: 'Highest',
                //maps over the values array and invokes getHighest() to
                //find the highest value in each stock
                data: stocks.map(stock => getHighest(stock.values)),
                //invokes getColor function and obtains 
                //chosen color for each symbol
                backgroundColor: stocks.map(stock => (getColor(stock.meta.symbol))),
                borderColor: stocks.map(stock => (getColor(stock.meta.symbol))),

            }]
        },

    });

    // AVERAGE CHART CANVAS
    new Chart(averagePriceChartCanvas.getContext('2d'), {
        //pie graph
        type: 'pie',
        data: {
            //Label for stock symbols 
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
                //label for average
                label: 'Average',
                //maps over the values array and invokes getAverage() to
                //find the average value in each stock
                data: stocks.map(stock => getAverage(stock.values)),
                //invokes getColor function and obtains 
                //chosen color for each symbol
                backgroundColor: stocks.map(stock => (getColor(stock.meta.symbol))),
                borderColor: stocks.map(stock => (getColor(stock.meta.symbol))),

            }]
        },

    });    


}

main()