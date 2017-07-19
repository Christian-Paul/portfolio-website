let body = d3.select("body");
let main = d3.select('#main');

// scale and variables for dynamically setting svg width based on window width
let windowWidth = window.outerWidth;
let cutoff = 1200;
let zoomOutFactor = windowWidth >= cutoff ? 1 : windowWidth / cutoff;
let screenIsSmall = windowWidth < 1000;

let widthScale = d3.scaleLinear()
  .domain([320, cutoff])
  .range([300, 960])
  .clamp(true);

let width = widthScale(windowWidth);
let height = screenIsSmall ? width * (5 / 8) + 50 : width * (5 / 8);

let svg = main
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// add source details and link
main
  .append('div')
  .attr('id', 'source')
  .html(function() {
      return (
        "Source: <a href='https://www.ers.usda.gov/data-products/county-level-data-sets/'>USDA Economic Research Service</a>"
      )
  })

// choropleth contains map, legend, and legend background
let choropleth = svg.append('g')
  .attr('class', 'choropleth');

// features contains county and state elements
let features = choropleth.append('g')
  .attr('class', 'features');

let path = d3.geoPath()
    .projection(null);

// define tooltip and hide it immediately
let tooltip = body.append("div")
  .attr("class", "tooltip")
  .attr("id", "tooltip")
  .style("opacity", 0);

// define upper and lower bounds for data
let min = 1;
let max = 60;
let step = (max - min) / 9;

let color = d3.scaleThreshold()
    .domain(d3.range(min + step, max, step))
    .range(d3.schemeGreens[9]);


// define presets for state and county stroke widths
let defaultStateBorder = 1;
let defaultCountyBorder = 0.25;

let stateBorderScale = d3.scaleLinear()
  .domain([zoomOutFactor, 8])
  .range([defaultStateBorder, defaultStateBorder/4]);

let countyBorderScale = d3.scaleLinear()
  .domain([zoomOutFactor, 8])
  .range([defaultCountyBorder, defaultCountyBorder/4]);

// cannot zoom out more than initial zoom
// cannot pan outside of visible map area
let zoom = d3.zoom()
    .scaleExtent([zoomOutFactor, 8])
// causes issues with pan and zoon
//    .translateExtent([[0, 0], [width, height]])
    .on('zoom', zoomed)
    .on('end', zoomEnd);

// set initial scale based on window width
let t = d3.zoomIdentity.translate(0, 0).scale(zoomOutFactor)

svg.call(zoom.transform, t);
svg.call(zoom);

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
        let result = education.filter(function( obj ) {
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
        let result = education.filter(function( obj ) {
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
        if(d3.event.buttons !== 1) { 
          // if the LMB is pressed, the user is panning, so tooltip shouldn't be shown/updated
          tooltip.style("opacity", 1); 
          tooltip.html(function() {
            let result = education.filter(function( obj ) {
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
            let result = education.filter(function( obj ) {
              return obj.fips == d.id;
            });
            if(result[0]){
              return result[0].bachelorsOrHigher
            }
            //could not find a matching fips id in the data
            return 0
          })
        }
      })
      .on("mousemove", function(d) {

        tooltip.style("left", (d3.mouse(document.body)[0] - (tooltip.node().clientWidth/2)) + "px");
        tooltip.style("top", (d3.mouse(document.body)[1] + 25) + "px"); 
      })
      .on("mouseout", function(d) {
        // hide tooltip when mouse leaves a county
        tooltip.style("opacity", 0);
      });

  features.append("path")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("class", "states")
      .attr('stroke-width', defaultStateBorder)
      .attr("d", path);

  let choroplethWidth = choropleth.node().getBBox().width;
  let choroplethHeight = choropleth.node().getBBox().height;
  let legendHolderHeight = 40;

  // on small screens, legend should be centered and take up 60% of the choropleth width
  let legendRange = (screenIsSmall ? (
                     [0.2 * choroplethWidth, 0.8 * choroplethWidth]
                     ) : ( 
                     [0.6 * choroplethWidth, 0.86 * choroplethWidth]));

  // on small screens, legend should be moved to the bottom of the svg
  let legendVerticalOffset = (screenIsSmall ? (
                                    (height - legendHolderHeight + 7.5) - (0.01 * height)
                                    ) : (
                                    40
                                  ));
  let legendWidth = (legendRange[1] - legendRange[0])
  let x = d3.scaleLinear()
      .domain([min, max])
      .rangeRound(legendRange);

  choropleth.append('rect')
    .attr('height', legendHolderHeight)
    .attr('width', 1.15 * legendWidth)
    // make legend centered in this rect by translating this 
    // half of the difference between this width and legend width
    .attr("transform", "translate(" + ((legendRange[0]) - ((0.15 * legendWidth) / 2)) + ", " + (legendVerticalOffset - 10) + ")")
    .attr('fill', '#fff')


  let legend = choropleth.append("g")
      .attr("class", "key")
      .attr("id", "legend")
      .attr("transform", "translate(0," + legendVerticalOffset + ")");

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


  // part of alaska overflows horizontally
  // it's not desirable to include this in the width of the choropleth
  // because doing so would make the image's right side too visually heavy
  let hiddenAlaska = Math.abs(choropleth.node().getBBox().x);
  let effectiveChoroplethWidth =  choroplethWidth - hiddenAlaska;

  choropleth.attr("transform", 'translate(' + (width - effectiveChoroplethWidth) / 2 + ', 0)');
}

function zoomed() {
  // when panning, tooltip should be hidden
  if(d3.event.sourceEvent !== null && d3.event.sourceEvent.type !== 'wheel') {
    tooltip.style('opacity', 0);
  }

  features.attr('transform', d3.event.transform);
  features.select('.states').style('stroke-width', stateBorderScale(d3.event.transform.k) + 'px');
  features.selectAll('.county').style('stroke-width', countyBorderScale(d3.event.transform.k) + 'px');
};

function zoomEnd() {
  // after panning is completed, tooltip is made visible
  // don't make it visible if mouse is outside of a county, of if it's the initial zoom
  if(d3.event.sourceEvent !== null && d3.event.sourceEvent.toElement.tagName === 'path') {
    tooltip.style('opacity', 1);
  }
};