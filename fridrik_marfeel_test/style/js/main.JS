//Datasets
var dataRevenue = [
	{
	"value": 40,
    "label": "Smartphone",
    "amount": "80000€",
	"color": "#3D6D14"
	},
	{
	"value": 60,
    "label": "Tablet",
    "amount": "120000€", 
	"color": "#86D43D"
	}
];
var dataImpression = [
	{
	"value": 60,
    "label": "Smartphone",
    "amount": "30000000",
	"color": "#385663"
	},
	{
	"value": 40,
    "label": "Tablet",
    "amount": "20000000",
	"color": "#6EC7E2"
	}
];
var dataVisits = [
	{
	"value": 20,
    "label": "Smartphone",
    "amount": "120000000",
	"color": "#BD571C"
	},
	{
	"value": 80,
    "label": "Tablet",
    "amount": "480000000",
	"color": "#F5BF32"
	}
];
//Reusable Chart start

var MarfeelChart =  function(placeHolderName, data){
    var width = 350,
    height = 350,
    radius = 170,
    innerRadius = 155;

    
    var color = d3.scaleOrdinal(['#3D6D14','#86D43D','#385663','#6EC7E2','#BD571C','#F5BF32']);

    var svg = d3.select(placeHolderName)
		.style("position", "relative")
		.append("svg")
	    .data([data])
		.attr("width", width)
        .attr("height", height);   
         
    var g = svg.append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var pie = d3.pie()
		.value(function (d) {
			return d.value;
		});

	var arc = d3.arc()
		.innerRadius(innerRadius)
		.outerRadius(radius);

	var arcs = svg.selectAll("arc")
		.data(pie)
		.enter()
		.append("g")
		.attr("class", "arc")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var paths = arcs.append("path")
		.attr("fill", function (d) {
			return d.data.color;
        })
        .attr("d", arc);
//trying to add the text in the center of the chart
    svg.append("g")
        .attr("transform", "translate("+ (width/2 - 110) +","+ 110 +")")
        .append("text")
        .text("Random data about Random things")
        .attr("stroke", "#fba100")
        .html(function(d){
            return "<span>AAAA" + d.label + "</span>";
        });
//trying to add the label values to device tag, color + text (entered manually in the end)
    var labels = d3.select(placeHolderName)
        .selectAll("div.device")
        .data(data)
        .html(function (d) {
			return d.label;
		})
        .attr("color", function(d) {
            return d.data.color;
        });

    
}
//Reusable Chart end
//Create the charts in respective places onload
window.onload = function () {
    
    var revenue = new MarfeelChart("#revenue-donut", dataRevenue);
    var impressions = new MarfeelChart("#impressions-donut", dataImpression);
    var visits = new MarfeelChart("#visits-donut", dataVisits);
};

// line graph start
// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 320 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

// parse the date / time
var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleTime().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.close); });


var svg = d3.select("#line-graph").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("/data/line-data.csv", function(error, data) {
  if (error) throw error;

  // format the data
  data.forEach(function(d) {
      d.date = parseTime(d.date);
      d.close = +d.close;
  });

  // Scale the range of the data
  x.domain(d3.extent(data, function(d) { return d.date; }));
  y.domain([0, d3.max(data, function(d) { return d.close; })]);

  // Add the valueline path.
  svg.append("path")
      .data([data])
      .attr("class", "line	")
      .attr("d", valueline);
});
// line-graph end