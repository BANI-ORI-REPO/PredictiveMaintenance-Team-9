// Global Variables
var apiKey = "k5HjMXhw4GKis_614JYa";

/**
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} rows
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 */
function unpack(rows, index) {
  return rows.map(function(row) {
    return row[index];
  });
}

function buildPlot(stock) {
  var url = `https://www.quandl.com/api/v3/datasets/WIKI/${stock}.json?start_date=2017-10-01&end_date=2018-10-01&api_key=${apiKey}`;
  d3.json(url).then(function(data) {

  // Grab values from the response json object to build the plots
    var name = data.dataset.name;
    var stock = data.dataset.dataset_code;
    var startDate = data.dataset.start_date;
    var endDate = data.dataset.end_date;
    var dates = unpack(data.dataset.data, 0);
    var closingPrices = unpack(data.dataset.data, 4);

    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: name,
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace1];

    var layout = {
      title: `${stock} closing prices`,
      xaxis: {
        range: [startDate, endDate],
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);

  });
};

// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();

  // Select the input value from the form
  var stock = d3.select("#stockInput").property("value");
  console.log(stock);

  // clear the input value
  d3.select("#stockInput").property("value", "");

  // Build the plot with the new stock
  buildPlot(stock);
};

// Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);
