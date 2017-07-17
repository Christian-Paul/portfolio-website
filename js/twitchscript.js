var users = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff", "cretetion", "OgamingSC2", "comster404"];
var i = 0;



function loadItem() {
	var username = users[i];
	$.getJSON('https://api.twitch.tv/kraken/streams/' + username, function(data){
		var link = 'http://www.twitch.tv/' + username;
		if(data.stream === null) {
			$('.usersHolder').append('<div class="offlineUser">' + '<a href=' + link + '>' + username + '</a>' + ' is offline' + '</div>');
			again();
		}
		else{
			var game = data.stream.game;
			var description = data.stream.channel.status;
			$('.usersHolder').append('<div class="onlineUser">' + game + ' ' + description + ' ' + '<a href=' + link + '>' + username + '</a>' + ' is online' + '</div>')
			again();
		}
	}).error(function() {
		$('.usersHolder').append('<div class="invalidUser">' + username + 'This channel does not exist</div>');
		again();
	})
}

function again() {
	if(i < users.length) {
		loadItem();
		};
	i++;
	};

again();