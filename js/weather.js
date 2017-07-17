var latitude;
var longitude;
var wundergroundKey = '7a056c766178ccde';
var reverseGeodataKey ='AIzaSyC-DdaDJJrFilne2s1N-VIRc0XQIRaQewk';
var town;
var state;
var units = 'fahrenheit';
var currentCondition;
var forecastCondition;
var hourlyCondition;
var isActive = '7day';
var currentData, hourlyData, forecastData;

function displayCurrentWeather(units, data) {
	// display icon
	// takes the condition name from the api icon
	currentCondition = data.current_observation.icon_url.split('/')[6].split('.')[0];

	// splices condition name into wunderground's better icon url format
	$('.current-icon').attr('src', 'https://icons.wxug.com/i/c/v4/' + currentCondition + '.svg');

		// display town name
		$('.location-name').text(data.current_observation.display_location.full);

	// displays the temperature in relevant units
	if(units === 'fahrenheit') {
		$('.current-temp-value').html(Math.round(data.current_observation.temp_f) + '&deg&nbsp;');
		$('.active-unit').text('F');
		$('.inactive-unit').text('C')
	} else {
		$('.current-temp-value').html(Math.round(data.current_observation.temp_c) + '&deg&nbsp;');
		$('.active-unit').text('C');
		$('.inactive-unit').text('F');
	}

	// hide backup input
	$('.backup').hide(500);

	// show current weather after data is obtained
	$('.current-container').show(500);
}

// queries wunderground api for current weather conditions
// called after location is obtained and when units are switched
function getCurrentWeather(state, town, units) {
	// only sends API request if we don't already have the data
	if(!currentData) {
		console.log('request sent is: ', 'https://api.wunderground.com/api/' + wundergroundKey + '/conditions/q/' + state + '/' + town + '.json');
		$.getJSON('https://api.wunderground.com/api/' + wundergroundKey + '/conditions/q/' + state + '/' + town + '.json', function(data) {

			currentData = data;

			console.log('data is: ', currentData);

			displayCurrentWeather(units, currentData);
		});
	} else {
		displayCurrentWeather(units, currentData);
	}
}

function displayForecast(units, data) {
	for(var i = 0; i < 7; i++) {
		// displays days
		$('.forecast-day-' + i + '> .day-name').html(data.forecast.simpleforecast.forecastday[i].date.weekday.substring(0, 3))

		// displays forecast icons
		// takes the condition name from the api icon
		forecastCondition = data.forecast.simpleforecast.forecastday[i].icon_url.split('/')[6].split('.')[0];

		// splices condition name into wunderground's better icon url format
		$('.forecast-day-' + i + '> .icon').attr('src', 'https://icons.wxug.com/i/c/v4/' + forecastCondition + '.svg');

		// displays forecast's daily highs
		if(units === 'fahrenheit') {
			$('.forecast-day-' + i + '> .temperatures > .high-temp').html(data.forecast.simpleforecast.forecastday[i].high.fahrenheit + '&deg');
			// when current temp is equal to or higher than forecasted high, api returns empty string
			// if that happens, fill daily high with current high
			if($('.forecast-day-' + i + '> .temperatures > .high-temp').html() === '&deg') {
				$('.forecast-day-' + i + '> .temperatures > .high-temp').html($('.current-temp-value').text());
			}
		} else {
			$('.forecast-day-' + i + '> .temperatures > .high-temp').html(data.forecast.simpleforecast.forecastday[i].high.celsius + '&deg');
			// when current temp is equal to or higher than forecasted high, api returns empty string
			// if that happens, fill daily high with current high
			if($('.forecast-day-' + i + '> .temperatures > .high-temp').html() === '&deg') {
				$('.forecast-day-' + i + '> .temperatures > .high-temp').html($('.current-temp-value').text());
			}
		}

		// displays forecast's daily lows
		if(units === 'fahrenheit') {
			$('.forecast-day-' + i + '> .temperatures > .low-temp').html(data.forecast.simpleforecast.forecastday[i].low.fahrenheit + '&deg');
			// when current temp is equal to or lower than forecasted low, api returns empty string
			// if that happens, fill daily low with current low
			if($('.forecast-day-' + i + '> .temperatures > .low-temp').html() === '&deg') {
				$('.forecast-day-' + i + '> .temperatures > .low-temp').html($('.current-temp-value').text());
			}
		} else {
			$('.forecast-day-' + i + '> .temperatures > .low-temp').html(data.forecast.simpleforecast.forecastday[i].low.celsius + '&deg');
			// when current temp is equal to or lower than forecasted low, api returns empty string
			// if that happens, fill daily low with current low
			if($('.forecast-day-' + i + '> .temperatures > .low-temp').html() === '&deg') {
				$('.forecast-day-' + i + '> .temperatures > .low-temp').html($('.current-temp-value').text());
			}
		}

		// show forecast after data is obtained
		if(isActive === '7day') {
			$('.forecast-container').show(500);
		} else {
			$('.forecast-container').hide(500);
		}

		$('.toggle-forecast-type').show();
	}
}

// queries wunderground api for 10 day forecast
// called after location is obtained, when units are switched, and when 7-day/hourly is toggled
function getForecast(state, town, units, isActive) {
	if (!forecastData) {
		$.getJSON('https://api.wunderground.com/api/' + wundergroundKey + '/forecast10day/q/' + state + '/' + town + '.json', function(data) {
			forecastData = data;
			displayForecast(units, forecastData);
		});
	} else {
		displayForecast(units, forecastData);
	}
}

function displayHourly(units, data) {
	for(var i = 0; i < 7; i++) {
		var displayHour;
		if(i === 0) {
			displayHour = 0;
		} else {
			displayHour = i*2;
		}

		// displays hours
		var prettyHour = data.hourly_forecast[displayHour].FCTTIME.hour;
		prettyHour = prettyHour > 12 ? prettyHour - 12 : prettyHour;
		prettyHour = prettyHour === "0" ? 12 : prettyHour;
		$('.hourly-hour-' + i + '> .hour-name').html(prettyHour + ' ' + data.hourly_forecast[displayHour].FCTTIME.ampm)

		
		// displays hourly icons
		// takes the condition name from the api icon
		hourlyCondition = data.hourly_forecast[displayHour].icon_url.split('/')[6].split('.')[0];

		// splices condition name into wunderground's better icon url format
		$('.hourly-hour-' + i + '> .icon').attr('src', 'https://icons.wxug.com/i/c/v4/' + hourlyCondition + '.svg');

		
		// displays hourly temperature
		if(units === 'fahrenheit') {
			$('.hourly-hour-' + i + '> .temperatures > .temp').html(data.hourly_forecast[displayHour].temp.english + '&deg');
		} else {
			$('.hourly-hour-' + i + '> .temperatures > .temp').html(data.hourly_forecast[displayHour].temp.metric + '&deg');
		}

		// show hourly after data is obtained
		if(isActive === 'hourly') {
			$('.hourly-container').show(500);
		} else {
			$('.hourly-container').hide(500);
		}
	}
}

function getHourly(state, town, units, isActive) {
	if(!hourlyData) {
		$.getJSON('https://api.wunderground.com/api/' + wundergroundKey + '/hourly/q/' + state + '/' + town + '.json', function(data) {

			hourlyData = data;
			displayHourly(units, hourlyData);

		});
	} else {
		displayHourly(units, hourlyData);
	}
}

$(document).ready(function() {

	// hide weather info by default
	$('.current-container').hide();
	$('.forecast-container').hide();
	$('.hourly-container').hide();
	$('.toggle-forecast-type').hide();
	$('.backup').hide();

	// when "inactive unit" is clicked, the units are switched, and the weather is redisplayed
	$('.inactive-unit').click(function() {

		units = (units === 'fahrenheit' ? 'celsius' : 'fahrenheit');
		getCurrentWeather(state, town, units);
  		getForecast(state, town, units, isActive);
		getHourly(state, town, units, isActive);
	});

	// if the user's location is obtained
	if (navigator.geolocation) {

	  navigator.geolocation.getCurrentPosition(function(position) {

	  	// get user's lat and long
	  	latitude = position.coords.latitude;
	  	longitude = position.coords.longitude;

	  	// query googlemaps api to receive town and state names from latlong
	  	$.getJSON('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=' + reverseGeodataKey, function(data) {
	  		
	  		town = data.results[0].address_components[1].long_name;
	  		state = data.results[0].address_components[4].short_name;
	  		console.log(data.results[0])
	  		// send requests to wunderground api
	  		getCurrentWeather(state, town, units);
	  		getForecast(state, town, units, isActive);
	  		getHourly(state, town, units, isActive);
	  	});
	  }, function() {
	  	// if the geolocation can't be obtained, show backup input
	  	$('.backup').show();
	  }); 
	}

	// manual location input
	$('.submit-button').click(function() {
		// get location info from inputs
		town = $('.town-input').val();
		town = town[0].toUpperCase() + town.slice(1);

		state = $('.state-input').val();

		// send request to wunderground api
		getCurrentWeather(state, town, units);
		getForecast(state, town, units, isActive);
		getHourly(state, town, units, isActive);
	});

	// input validation
	$('.text-only').on('input', function (event) { 
		// remove any character that isn't a letter
	    this.value = this.value.replace(/[^A-Za-z\s]/g, '');
	});

	// toggle forecast type
	$('.toggle-forecast-type').click(function() {
		isActive = isActive === '7day' ? 'hourly' : '7day';
		getForecast(state, town, units, isActive);
		getHourly(state, town, units, isActive);

		$('.select-seven-day').toggleClass('active');
		$('.select-hourly').toggleClass('active');
	});
});