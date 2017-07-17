/* $(document).ready(function() {
	$(".gen").click(function() {
		$(".quoteholder").fadeTo("fast", 1, function() {
		});
		$(".tweet").fadeTo("fast", 1, function() {
		});
		$(".quote").text('"'+random()+'"');
	});

	$(".tweet").click(function() {
		$(".tweeted").fadeTo("fast", 1, function() {
		});
		//$(".tweeted").text("https://twitter.com/intent/tweet?text=" + encoder());
		// actually tweet it
		$(".twtDest").attr("href", "https://twitter.com/intent/tweet?text=" + encoder());
	});
});

var arr = [
"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. <br> test", 
"Nothing great was ever achieved without enthusiasm.", 
"To be great is to be misunderstood.", 
"Always do what you are afraid to do.", 
"The only way to have a friend is to be one.", 
"It is one of the blessings of old friends that you can afford to be stupid with them.", 
"Our greatest glory is not in never failing, but in rising up every time we fail.", 
"Once you make a decision, the universe conspires to make it happen.", 
"You cannot do a kindness too soon, for you never know how soon it will be too late.", 
"Though we travel the world over to find the beautiful, we must carry it with us or we find it not."
];

function random() {
	return arr[0];
//	return arr[Math.floor(Math.random()*10)];
};

 function twt() {
 	return $(".quote").text();
 }

 function encoder() {
 	var str = twt();
 	var split = str.split(" ");
 	var encoded = split.join([separator="%20"]);
 	return encoded;
 } */


// New Start

 $(document).ready(function() {
	$(".gen").click(function() {
		$(".quoteholder").fadeTo("fast", 1, function() {
		});
		$(".tweet").fadeTo("fast", 1, function() {
		});
		var x = random();
		$(".quote").text('"'+arr[x][0]+'"');
		$(".source").text("—"+" "+arr[x][1]);
	});

	$(".tweet").click(function() {
		$(".tweeted").fadeTo("fast", 1, function() {
		});
		//$(".tweeted").text("https://twitter.com/intent/tweet?text=" + encoder());
		// actually tweet it
		$(".twtDest").attr("href", "https://twitter.com/intent/tweet?text=" + encoder());
	});
});

var arr = [
["I like the silent church before the service begins, better than any preaching. Discontent is the want of self-reliance: it is infirmity of will.", "Self-Reliance"],
["It is the fault of our rhetoric that we cannot strongly state one fact without seeming to belie some other.", "History"],
["Of course, he who has put forth his total strength in fit actions, has the richest return of wisdom.", "The American Scholar"],
["Every natural fact is a symbol of some spiritual fact.", "Nature"],
["Poetry must be new as foam, and as old as the rock.", "Journals"],
["Let me never fall into the vulgar mistake of dreaming that I am persecuted whenever I am contradicted.", "Journals"],
["Sometimes a scream is better than a thesis.", "Journals"],
["Shall I tell you the secret of the true scholar? It is this : Every man I meet is my master in some point, and in that I learn of him.", "Letters and Social Aims"],
["The reward of a thing well done is to have done it.", "Nominalist and Realist"],
["A complete man should need no auxiliaries to his personal presence.", "Behavior"]
];

function random() {
	var position = [Math.floor(Math.random()*10)];
	return position;
};

function twt() {
 	return $(".quote").text();
}

function encoder() {
 	var str = twt();
 	var split = str.split(" ");
 	var encoded = split.join([separator="%20"]);
 	return encoded;
}