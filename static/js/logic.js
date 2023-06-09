const coordinatesURL = "http://127.0.0.1:5000/api/v1.0/coordinates";
const summaryStatsURL = "http://127.0.0.1:5000/api/v1.0/about";
const activityURL = "http://127.0.0.1:5000/api/v1.0/activity";
const timeURL = "http://127.0.0.1:5000/api/v1.0/time";

//-------------------------------------------------------------------------------
// Create a heatmap based on squirrel location
//-------------------------------------------------------------------------------
// Adding the tile layer
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

// Create basemaps
let baseMaps = {
  "Street Map": street,
  "Topographic Map": topo,
  "Satellite Map" : googleSat
};

let allSquirrels = new L.layerGroup(baseMaps);
let am = new L.layerGroup(baseMaps);
let pm = new L.layerGroup(baseMaps);
let graySquirrels = new L.layerGroup(baseMaps);
let cinnamonSquirrels = new L.layerGroup(baseMaps);
let blackSquirrels = new L.layerGroup(baseMaps);

// Define an object that contains the overlays
let overlayMaps = {
  'All squirrels': allSquirrels,
  'Gray squirrels': graySquirrels,
  'Cinnamon squirrels': cinnamonSquirrels,
  'Black squirrels': blackSquirrels,
  'Sighted AM': am,
  'Sighted PM': pm
  };

// Setting the center and zoom for the map
let myMap = L.map("map", {
  center: [40.7826, -73.9656],
  zoom: 13.5,
  layers: [street]
  });

L.control.layers(baseMaps, overlayMaps).addTo(myMap);

// All squirrels data - Reading the url and obtaining the longitude and latitude data
d3.json(coordinatesURL).then(function(response) {
  let heatArray = [];
  for (let i = 0; i < response.length; i++) {
    if (response) {
      heatArray.push([response[i].Y, response[i].X]);
    }
  }

  // Settings for the heat array
  let heat = L.heatLayer(heatArray, {
    scaleRadius: true,
    maxOpacity:0.5,
    minOpacity: 0,
    radius:10,
    blur: 10
  }).addTo(allSquirrels);

  allSquirrels.addTo(myMap);

});

// Squirrels sighted in the AM data - Reading the url and obtaining the longitude and latitude data
d3.json(coordinatesURL).then(function(response) {
  data = response.filter(object=>object.Shift=='AM');
    let heatArray = [];
    for (let i = 0; i < data.length; i++) {
      if (response) {
        heatArray.push([data[i].Y, data[i].X]);
      }
    }
  
    // Settings for the heat array
    let heatAM = L.heatLayer(heatArray, {
      scaleRadius: true,
      maxOpacity:0.5,
      minOpacity: 0,
      radius:10,
      blur: 10
    }).addTo(am);
  
  // am.addTo(myMap);
  
  });

  // Squirrels sighted in the PM data - Reading the url and obtaining the longitude and latitude data
d3.json(coordinatesURL).then(function(response) {
  data = response.filter(object=>object.Shift=='PM');
    let heatArray = [];
    for (let i = 0; i < data.length; i++) {
      if (response) {
        heatArray.push([data[i].Y, data[i].X]);
      }
    }
  
    // Settings for the heat array
    let heatAM = L.heatLayer(heatArray, {
      scaleRadius: true,
      maxOpacity:0.5,
      minOpacity: 0,
      radius:10,
      blur: 10
    }).addTo(pm);
  
  // pm.addTo(myMap);
  
  });

// Gray Squirrels data - Reading the url and obtaining the longitude and latitude data
d3.json(coordinatesURL).then(function(response) {
  data = response.filter(object=>object.Primary_Fur_Color=='Gray');
    let heatArray = [];
    for (let i = 0; i < data.length; i++) {
      if (response) {
        heatArray.push([data[i].Y, data[i].X]);
      }
    }
  
    // Settings for the heat array
    let heatAM = L.heatLayer(heatArray, {
      scaleRadius: true,
      maxOpacity:0.5,
      minOpacity: 0,
      radius:10,
      blur: 10
    }).addTo(graySquirrels);
  
  // graySquirrels.addTo(myMap);
  
  });

// Cinnamon Squirrels data - Reading the url and obtaining the longitude and latitude data
d3.json(coordinatesURL).then(function(response) {
  data = response.filter(object=>object.Primary_Fur_Color=='Cinnamon');
    let heatArray = [];
    for (let i = 0; i < data.length; i++) {
      if (response) {
        heatArray.push([data[i].Y, data[i].X]);
      }
    }
  
    // Settings for the heat array
    let heatAM = L.heatLayer(heatArray, {
      scaleRadius: true,
      maxOpacity:0.5,
      minOpacity: 0,
      radius:10,
      blur: 10
    }).addTo(cinnamonSquirrels);
  
  // cinnamonSquirrels.addTo(myMap);
  
  });

// Black Squirrels data - Reading the url and obtaining the longitude and latitude data
d3.json(coordinatesURL).then(function(response) {
  data = response.filter(object=>object.Primary_Fur_Color=='Black');
    let heatArray = [];
    for (let i = 0; i < data.length; i++) {
      if (response) {
        heatArray.push([data[i].Y, data[i].X]);
      }
    }
  
    // Settings for the heat array
    let heatAM = L.heatLayer(heatArray, {
      scaleRadius: true,
      maxOpacity:0.5,
      minOpacity: 0,
      radius:10,
      blur: 10
    }).addTo(blackSquirrels);
  
  // blackSquirrels.addTo(myMap);
  
  });

//---------------------------------------------------------------------------------
// Build chart on squirrel colour
//-------------------------------------------------------------------------------
function buildColour(){
  // Reading the URL
  d3.json(summaryStatsURL).then((data)=>{
             
          // Set up variables required and establish inital values
          let total = 0;
          let cinnamonCount = 0;
          let grayCount = 0;
          let blackCount = 0;
          let Not_notedCount = 0;
          
          // Loop through the data
           for (let i = 0; i < data.length; i++){
            row = data[i];

            // Add one to total for each row
            total += 1 ;

            // Depending on what the priamry fur colour is add one to the the count for the relevant colour
            if (row.Primary_Fur_Color == 'Cinnamon'){
              cinnamonCount +=1;
            } else if (row.Primary_Fur_Color == 'Gray'){
              grayCount += 1;
            } else if (row.Primary_Fur_Color =='Black'){
              blackCount += 1;
            } else{
              Not_notedCount += 1;
            }
            };
            
            // Calcuate the percentage of squirrels that are each colour
            let cinnamonPer  = Math.round((cinnamonCount/total)*100);
            let grayPer  = Math.round((grayCount/total)*100);
            let blackPer  = Math.round((blackCount/total)*100);
  
            // Assign values and names to fields to use in the chart
            let names = ['Gray', 'Cinnamon', 'Black'];
            let values = [grayPer, cinnamonPer, blackPer];
          
          // Plotting the chart
          var options = {
              series: values,
              chart: {
              height: 300,
              type: 'radialBar',
          },
          plotOptions: {
              radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                  margin: 5,
                  size: '30%',
                  background: 'transparent',
                  image: undefined,
              },
              dataLabels: {
                  name: {
                  show: false,
                  },
                  value: {
                  show: false,
                  }
              }
              }
          },
          colors: ['#85c7de', '#0084ff', '#39539E'],
          labels: names,
          legend: {
              show: true,
              floating: true,
              fontSize: '16px',
              position: 'left',
              offsetX: 10,
              offsetY: 15,
              labels: {
              useSeriesColors: true,
              },
              markers: {
              size: 0
              },
              formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
              itemMargin: {
              vertical: 3
              }
          },
          responsive: [{
              breakpoint: 480,
              options: {
              legend: {
                  show: false
              }
              }
          }]
          };
          
          // Invoke the plotting function and render the plot to the div ID 'colour'
          var chart = new ApexCharts(document.querySelector("#colour"), options);
          chart.render();
          });
          }
  
  
  //-------------------------------------------------------------------------------
  // Build chart on squirrel age
  //-------------------------------------------------------------------------------
  function buildAge(){
      // Reading the URL
      d3.json(summaryStatsURL).then((response)=>{
          // Getting the data from the url
          let data = response.filter(object => object.Age);
          
          // Set up variables required and establish initial values
          let total = 0;
          let adultCount = 0;
          let juvenileCount = 0;
          let notNotedCount = 0;

          // Loop through the data
           for (let i = 0; i < data.length; i++){
            row = data[i];
      
            // Add one to the total for each row
            total += 1;
      
            // Depending on the age of the squirrel, add one to the count for the relevant age
            if (row.Age == 'Adult'){
              adultCount +=1;
            } else if (row.Age == 'Juvenile'){
              juvenileCount += 1;
            } else{
              notNotedCount += 1;
            }
            };
            
            // Calcualte the percentage of squirrels for each age
            let adultPer  = Math.round((adultCount/total)*100);
            let juvenilePer  = Math.round((juvenileCount/total)*100);
            let nothingPer  = Math.round((notNotedCount/total)*100);
  
            // Assign values and names to fields to use in the chart
            let names = ['Adult', 'Juvenile'];
            let values = [adultPer, juvenilePer];
  
          // Plotting the chart
          var options = {
              series: values,
              chart: {
              height: 300,
              type: 'radialBar',
          },
          plotOptions: {
              radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                  margin: 5,
                  size: '30%',
                  background: 'transparent',
                  image: undefined,
              },
              dataLabels: {
                  name: {
                  show: false,
                  },
                  value: {
                  show: false,
                  }
              }
              }
          },
          colors: ['#85c7de', '#0084ff'],
          labels: names,
          legend: {
              show: true,
              floating: true,
              fontSize: '16px',
              position: 'left',
              offsetX: 10,
              offsetY: 15,
              labels: {
              useSeriesColors: true,
              },
              markers: {
              size: 0
              },
              formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
              itemMargin: {
              vertical: 3
              }
          },
          responsive: [{
              breakpoint: 480,
              options: {
              legend: {
                  show: false
              }
              }
          }]
          };
  
          // Invoke the plotting function and render the plot to the div ID 'age'
          var chart = new ApexCharts(document.querySelector("#age"), options);
          chart.render();
          });
          }
  
  //-------------------------------------------------------------------------------
  // Build chart on squirrel colour
  //-------------------------------------------------------------------------------
  function buildLocation(){
    // Reading the URL
    d3.json(summaryStatsURL).then((data)=>{
           
        // Set up variables required and establish initial values
        let total = 0;
        let groundCount = 0;
        let aboveGroundCount = 0;
        let not_notedCount = 0;
        
        // Loop through the data
        for (let i = 0; i < data.length; i++){
          row = data[i];
      
          // Add one to the total for each row
          total += 1;
      
          // Depending on the location of the squirrel, add one to the count for the relevant location
          if (row.Location == 'Above Ground'){
            groundCount +=1;
          } else if (row.Location == 'Ground Plane'){
            aboveGroundCount += 1;
          } else{
            not_notedCount += 1;
          }
          };

          // Calcualte the percentage of squirrels for each location
            let groundPer  = Math.round((groundCount/total)*100);
            let aboveGroundPer  = Math.round((aboveGroundCount/total)*100);
            let nothingPer  = Math.round((not_notedCount/total)*100);
  
            // Assign values and names to fields to use in the chart
            let names = ['Above ground', 'Ground'];
            let values = [aboveGroundPer, groundPer];
  
           // Plotting the chart
          var options = {
              series: values,
              chart: {
              height: 300,
              type: 'radialBar',
          },
          plotOptions: {
              radialBar: {
              offsetY: 0,
              startAngle: 0,
              endAngle: 270,
              hollow: {
                  margin: 5,
                  size: '30%',
                  background: 'transparent',
                  image: undefined,
              },
              dataLabels: {
                  name: {
                  show: false,
                  },
                  value: {
                  show: false,
                  }
              }
              }
          },
          colors: ['#85c7de', '#0084ff'],
          labels: names,
          legend: {
              show: true,
              floating: true,
              fontSize: '16px',
              position: 'left',
              offsetX: 4,
              offsetY: 15,
              labels: {
              useSeriesColors: true,
              },
              markers: {
              size: 0
              },
              formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
              },
              itemMargin: {
              vertical: 3
              }
          },
          responsive: [{
              breakpoint: 480,
              options: {
              legend: {
                  show: false
              }
              }
          }]
          };
  
          // Invoke the plotting function and render the plot to the div ID 'location'
          var chart = new ApexCharts(document.querySelector("#location"), options);
          chart.render();
          });
          }

//-------------------------------------------------------------------------------
//Activity bar chart
//-------------------------------------------------------------------------------
function buildActivity(when){
  // Reading the URL
  d3.json(activityURL).then((response)=>{
    // Filtering the data based on the 'Shift' option that is selected from the dropdown
    data = response.filter(object=>object.Shift==when);
    // Counting total number of squirrels
    let total = data.length;

    // Filtering data to those squirrels who were seen running
    // Counting them, then calcuate the percentage of squirrels running
    let runningData = data.filter(object => object.Running == 'TRUE');
    let runningTotal = runningData.length;
    let runningPer = Math.round((runningTotal / total)*100);

    // Filtering data to those squirrels who were seen chasing
    // Counting them, then calcuating the percentage of squirrels chasing
     let chasingData = data.filter(object => object.Chasing == 'TRUE');
     let chasingTotal = chasingData.length;
     let chasingPer = Math.round((chasingTotal / total)*100);
  
    // Filtering data to those squirrels who were seen climbing
    // Counting them, then calcuating the percentage of squirrels climbing
    let climbingData = data.filter(object => object.Climbing == 'TRUE');
    let climbingTotal = climbingData.length;
    let climbingPer = Math.round((climbingTotal / total)*100);

    // Filtering data to those squirrels who were seen running, chasing or climbing
    // Counting them, then calcuating the percentage of squirrels doing this
    let someActivityData = data.filter(object => object.Climbing == 'TRUE' || object.Chasing == 'TRUE' || object.Running == 'TRUE');
    let someActivity = someActivityData.length;
    let someActivityPer = Math.round((someActivity / total)*100);
 
    // Assign values and names to use for the chart
    let names = ['Movement', 'Climbing', 'Running', 'Chasing'];
    let values = [someActivityPer, climbingPer, runningPer, chasingPer];
  
      // Create the trace
      let trace1 = [{
        x: names,
        y: values,
        type: 'bar',
        marker:{color: ['#335c81', '#85c7de', '#85c7de', '#85c7de']},
        text: values,
        textposition: 'auto',
        hoverinfo: 'none',
        width: [0.8, 0.8, 0.8, 0.8]
      }];

      // Specify the layout
      let layout = {
        bargap: .5,
        width: 475,
        height: 400
        };
      
      // Render the plot to the div id 'activity'
      Plotly.newPlot("activity", trace1, layout);
  })};

//-------------------------------------------------------------------------------
//Eating bar chart
//-------------------------------------------------------------------------------
function buildEating(when){
  // Reading the URL
  d3.json(activityURL).then((response)=>{
    // Filtering the data based on the 'Shift' option that is selected from the dropdown
    data = response.filter(object=>object.Shift==when);

    // Counting total number of squirrels
    let total = data.length;

    // Filtering data to those squirrels who were seen eating
    // Counting them, then calcuating the percentage of squirrels eating
    let eatingData = data.filter(object => object.Eating == 'TRUE');
    let eatingTotal = eatingData.length;
    let eatingPer = Math.round((eatingTotal / total)*100);

    // Filtering data to those squirrels who were seen foraging
    // Counting them, then calcuating the percentage of squirrels foraging
     let foragingData = data.filter(object => object.Foraging == 'TRUE');
     let foragingTotal = foragingData.length;
     let foragingPer = Math.round((foragingTotal / total)*100);

    // Filtering data to those squirrels who were seen eating or foraging
    // Counting them, then calcuating the percentage of squirrels doing this
      let someEatingData = data.filter(object => object.Foraging == 'TRUE' || object.Eating == 'TRUE');
      let someEatingTotal = someEatingData.length;
      let someEatingPer = Math.round((someEatingTotal / total)*100);
 
    // Assign values and names to use for the chart
    let names = ['Foraging or eating', 'Foraging', 'Eating'];
    let values = [someEatingPer, foragingPer, eatingPer];

      // Create the trace
      let trace1 = [{
        x: names,
        y: values,
        type: 'bar',
        marker:{color: ['#335c81', '#85c7de', '#85c7de']},
        text: values,
        textposition: 'auto',
        hoverinfo: 'none',
        width: [0.8, 0.8, 0.8]
      }];

      
      // Specify the layout
      let layout = {
        bargap: .5,
        width: 450,
        height: 400
        };

      // Render the plot to the div id 'eating'
      Plotly.newPlot("eating", trace1, layout);
})};

//-------------------------------------------------------------------------------
//Noises bar chart
//-------------------------------------------------------------------------------
function buildNoises(when){
  // Reading the URL
  d3.json(activityURL).then((response)=>{
    data = response.filter(object => object.Shift == when);

    // Counting total number of squirrels
    let total = data.length;

    // Filtering data to those squirrels who were making a kuk sound
    // Counting them, then calcuating the percentage of squirrels making this noise
    let kuksData = data.filter(object => object.Kuks == 'TRUE');
    let kuksTotal = kuksData.length;
    let kuksPer = Math.round((kuksTotal / total)*100);
 
    // Filtering data to those squirrels who were making a quaas sound
    // Counting them, then calcuating the percentage of squirrels making this noise
     let quaasData = data.filter(object => object.Quaas == 'TRUE');
     let quaasTotal = quaasData.length;
     let quaasPer = Math.round((quaasTotal / total)*100);

     // Filtering data to those squirrels who were making a moaning sound
     // Counting them, then calcuating the percentage of squirrels making this noise
    let moansData = data.filter(object => object.Moans == 'TRUE');
    let moansTotal = moansData.length;
    let moansPer = Math.round((moansTotal / total)*100);

    // Filtering data to those squirrels who were making a sound (kuk or quaas or moaning)
    // Counting them, then calcuating the percentage of squirrels making a noise
    let someSoundData = data.filter(object => object.Kuks == 'TRUE' || object.Quaas == 'TRUE' || object.Moans == 'TRUE');
    let someSoundTotal = someSoundData.length;
    let someSoundPer = Math.round((someSoundTotal / total)*100);
 
    // Assign values and names to use for the chart
    let names = ['Noises', 'Kuks', 'Quaas', 'Moans'];
    let values = [someSoundPer, kuksPer, quaasPer, moansPer];
      
      // Create the trace
      let trace1 = [{
        x: names,
        y: values,
        type: 'bar',
        marker:{color: ['#335c81', '#85c7de', '#85c7de', '#85c7de']},
        text: values,
        textposition: 'auto',
        hoverinfo: 'none',
        width: [0.8, 0.8, 0.8, 0.8]
      }];

     // Specify the layout
     let layout = {
        bargap: .5,
        width: 450,
        height: 400
        };

      // Render the plot to the div id 'activity'
      Plotly.newPlot("noises", trace1, layout);
})};

//-------------------------------------------------------------------------------
// Function for when webpage is initialised
//-------------------------------------------------------------------------------

function init(){
  // Selecting the drop down component
  let selector = d3.select("#selDataset");
  // Reading the url
  d3.json(timeURL).then((data) => {
    // Getting the time options from the json file
    let timeOptions = data.time;
    // Adding the time options to the drop down component and assigning their name as the value
    for (let i = 0; i < timeOptions.length; i++)
        {selector
              .append("option")
              .text(timeOptions[i])
              .property("value", timeOptions[i]);
     };

     // Show initital charts
    buildColour();
    buildAge();
    buildLocation();
    // Show initital charts using the data from 'AM'
    buildActivity("AM");
    buildEating("AM");
    buildNoises("AM");
    })}; 

//-------------------------------------------------------------------------------
// Function that updates the charts and metadata when a different time is selected
//-------------------------------------------------------------------------------
function optionChanged(newSelect){
  buildActivity(newSelect);
  buildEating(newSelect);
  buildNoises(newSelect);
};

init();