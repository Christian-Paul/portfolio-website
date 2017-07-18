// Define body
var body = d3.select("body");
var main = d3.select('#main');

var width = 1160;
var height = 600;

var svg = main
  .append('svg')
  .attr('width', width)
  .attr('height', height);

main
  .append('div')
  .attr('id', 'source')
  .html(function() {
      return (
        "Source: <a href='https://www.ers.usda.gov/data-products/county-level-data-sets/'>USDA Economic Research Service</a>"
      )
  })

var path = d3.geoPath()
    .projection(null);

var zoom = d3.zoom()
    .scaleExtent([1, 8])
    .translateExtent([[0, 0], [width, height]])
    .on('zoom', zoomed);

svg.call(zoom);

// Define the div for the tooltip
var tooltip = body.append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip")
  .style("opacity", 0);

var min = 1;
var max = 60;
var step = (max - min) / 9;

var x = d3.scaleLinear()
    .domain([min, max])
    .rangeRound([600, 860]);

var color = d3.scaleThreshold()
    .domain(d3.range(min + step, max, step))
    .range(d3.schemeGreens[9]);

var choropleth = svg.append('g')
  .attr("transform", "translate(100, 0)")

var features = choropleth.append('g');

// define presets for state and county stroke widths
var defaultStateBorder = 1;
var defaultCountyBorder = 0.25;

var stateBorderScale = d3.scaleLinear()
  .domain([1, 8])
  .range([defaultStateBorder, defaultStateBorder/4]);

var countyBorderScale = d3.scaleLinear()
  .domain([1, 8])
  .range([defaultCountyBorder, defaultCountyBorder/4]);

const EDUCATION_FILE = 'https://raw.githubusercontent.com/Christian-Paul/portfolio-website/master/education.json';
const COUNTY_FILE = 'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json';

d3.queue()
    .defer(d3.json, COUNTY_FILE)
    .defer(d3.json, EDUCATION_FILE)
    .await(ready);

function ready(error, us, education) {
  if (error) throw error;

  features
      .append('g')
      .attr("class", "counties")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .enter().append("path")
      .attr("class", "county")
      .attr("data-fips", function(d) {
        return d.id
       })
      .attr("data-education", function(d) {
        var result = education.filter(function( obj ) {
          return obj.fips == d.id;
        });
        if(result[0]){
          return result[0].bachelorsOrHigher
        }
        //could not find a matching fips id in the data
        console.log('could find data for: ', d.id);
        return 0
       })
      .attr("fill", function(d) { 
        var result = education.filter(function( obj ) {
          return obj.fips == d.id;
        });
        if(result[0]){
          return color(result[0].bachelorsOrHigher)
        }
        //could not find a matching fips id in the data
        return color(0)
       })
      .attr('stroke-width', defaultCountyBorder)
      .attr("d", path)
      .on("mouseover", function(d) {      
        tooltip.style("opacity", 1); 
        tooltip.html(function() {
          var result = education.filter(function( obj ) {
            return obj.fips == d.id;
          });
          if(result[0]) {
            return (
                    '<strong>' + result[0]['area_name'] + ', ' + result[0]['state'] + '</strong>' +
                    '<hr>' +
                    '<div class="tip-row">' +
                      '<div>Bachelors or higher:</div>' + result[0].bachelorsOrHigher + '%<br>' +
                    '</div>' +
                    '<div class="tip-row">' +
                      '<div>Some college:</div>' + result[0].someCollege + '%<br>' +
                    '</div>' +
                    '<div class="tip-row">' +
                      '<div>High School Diploma:</div>' + result[0].onlyHighSchool + '%<br>' +
                    '</div>' +
                    '<div class="tip-row">' +
                      '<div>Less than High School:</div>' + result[0].lessThanHighSchool + '%<br>' +
                    '</div>'
                  )
          }
          //could not find a matching fips id in the data
          return 0
        })
        tooltip.attr("data-education", function() {
          var result = education.filter(function( obj ) {
            return obj.fips == d.id;
          });
          if(result[0]){
            return result[0].bachelorsOrHigher
          }
          //could not find a matching fips id in the data
          return 0
        })
      })
      .on("mousemove", function(d) {
        tooltip.style("left", (d3.mouse(document.body)[0] - (tooltip.node().clientWidth/2)) + "px");
        tooltip.style("top", (d3.mouse(document.body)[1] + 25) + "px"); 
      })
      .on("mouseout", function(d) { 
        tooltip.style("opacity", 0); 
      });

  features.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr('stroke-width', defaultStateBorder)
      .attr("d", path);

  choropleth.append('rect')
    .attr('height', 40)
    .attr('width', 300)
    .attr("transform", "translate(580, 30)")
    .attr('fill', '#fff')

  var legend = choropleth.append("g")
      .attr("class", "key")
      .attr("id", "legend")
      .attr("transform", "translate(0, 40)")

  legend.selectAll("rect")
    .data(color.range().map(function(d) {
        d = color.invertExtent(d);
        if (d[0] == null) d[0] = x.domain()[0];
        if (d[1] == null) d[1] = x.domain()[1];
        return d;
      }))
    .enter().append("rect")
      .attr("height", 8)
      .attr("x", function(d) { return x(d[0]); })
      .attr("width", function(d) { return x(d[1]) - x(d[0]); })
      .attr("fill", function(d) { return color(d[0]); });

  legend.call(d3.axisBottom(x)
      .tickSize(13)
      .tickFormat(function(x) { return Math.round(x) + '%' })
      .tickValues(color.domain()))
      .select(".domain")
      .remove();
}

function zoomed() {
  features.attr('transform', d3.event.transform);
  features.select('.states').style('stroke-width', stateBorderScale(d3.event.transform.k) + 'px');
  features.selectAll('.county').style('stroke-width', countyBorderScale(d3.event.transform.k) + 'px');
};