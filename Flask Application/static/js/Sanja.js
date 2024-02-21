// Define a function to read CSV files
function readCSV(file, callback) {
    fetch(file)
        .then(response => response.text())
        .then(text => {
            let data = [];
            let rows = text.split('\n');
            let headers = rows[0].split(',');
            for (let i = 1; i < rows.length; i++) {
                let values = rows[i].split(',');
                let entry = {};
                for (let j = 0; j < headers.length; j++) {
                    entry[headers[j]] = values[j];
                }
                data.push(entry);
            }
            callback(data);
        });
}

// Define a function to convert numeric values
function convertToNumeric(value) {
    let suffixes = {
        'k': 10 ** 3,
        'K': 10 ** 3,
        'm': 10 ** 6,
        'M': 10 ** 6,
        'b': 10 ** 9,
        'B': 10 ** 9
    };

    if (typeof value === 'string' && !isNaN(parseFloat(value))) {
        if (value.slice(-1) in suffixes) {
            return parseFloat(value.slice(0, -1)) * suffixes[value.slice(-1)];
        } else {
            return parseFloat(value);
        }
    } else {
        return NaN;
    }
}

// Function to create a scatter plot
function createScatterPlot(data, month) {
    let xData = data.map(row => parseFloat(row['Average_view']));
    let yData = data.map(row => parseFloat(row['Average_likes']));
    let sizes = data.map(row => convertToNumeric(row['Subscribers']) * 0.000002);

    // Create a scatter plot
    let trace1 = {
        x: xData,
        y: yData,
        mode: 'markers',
        marker: {
            size: sizes,
            opacity: 0.6
        },
        type: 'scatter'
    };

    let layout = {
        title: month + ' Relationship between Average Views and Average Likes',
        xaxis: {
            title: 'Average Views'
        },
        yaxis: {
            title: 'Average Likes'
        }
    };

    Plotly.newPlot(month.toLowerCase() + '-scatter', [trace1], layout);
}

// Read and process December data
readCSV('../../Resources/Dec_clean_data.csv', function (dec) {
    // Convert numeric columns
    let numericCols = ['Subscribers', 'Average_view', 'Average_likes', 'Average_comments'];
    dec.forEach(function (row) {
        numericCols.forEach(function (col) {
            row[col] = convertToNumeric(row[col]);
        });
    });

    // Perform plotting
    createScatterPlot(dec, 'December');
});

// Read and process November data
readCSV('../../Resources/Nov_clean_data.csv', function (nov) {
    // Convert numeric columns
    let numericCols = ['Subscribers', 'Average_view', 'Average_likes', 'Average_comments'];
    nov.forEach(function (row) {
        numericCols.forEach(function (col) {
            row[col] = convertToNumeric(row[col]);
        });
    });

    // Perform plotting
    createScatterPlot(nov, 'November');
});

// Read and process September data
readCSV('../../Resources/Sept_clean_data.csv', function (sep) {
    // Convert numeric columns
    let numericCols = ['Subscribers', 'Average_view', 'Average_likes', 'Average_comments'];
    sep.forEach(function (row) {
        numericCols.forEach(function (col) {
            row[col] = convertToNumeric(row[col]);
        });
    });

    // Perform plotting
    createScatterPlot(sep, 'September');
});
