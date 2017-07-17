$(document).ready(function() {
	var userArr = [];
	var cpuArr = [];
	var snd1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	var snd2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	var snd3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	var snd4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');
	var strict = false;

	function addStep() {
	  cpuArr.push(Math.floor(Math.random() * (4 - 1 + 1)) + 1); // adds another random number to the cpu array
	};

	function cpuDisplay() {
		console.log('cpuArr is ' + cpuArr);
		$('.display').html('</p>There are currently' + cpuArr.length + 'steps</p>')
		for(var i = 0; i < cpuArr.length; i++) {
			if(cpuArr[i] === 1) {
				setTimeout(oneMedia, (i*750));
			}
			else if(cpuArr[i] === 2) {
				setTimeout(twoMedia, (i*750));
			}
			else if(cpuArr[i] === 3) {
				setTimeout(threeMedia, (i*750));
			}
			else if(cpuArr[i] === 4) {
				setTimeout(fourMedia, (i*750));
			}
		}
	};

	function removeLight() {
		$('.gamebutton').removeClass('light');
	};

	function oneMedia() {
		$('#one').addClass('light');						// gives the pressed button a class that makes it white
		setTimeout(removeLight, 250);						// removes light after .25 seconds
		snd1.play();
	};

	function twoMedia() {
		$('#two').addClass('light');
		setTimeout(removeLight, 250);
		snd2.play();
	};

	function threeMedia() {
		$('#three').addClass('light');
		setTimeout(removeLight, 250);
		snd3.play();
	};

	function fourMedia() {
		$('#four').addClass('light');
		setTimeout(removeLight, 250);
		snd4.play();
	};

	function restart() {
		cpuArr = [];
		userArr = [];
		addStep();
		cpuDisplay();
	};

	function judgeSequence() {
		var litmus = true;
		for(var i = 0; i < userArr.length; i++) {
			if(userArr[i] !== cpuArr[i]) {
				litmus = false;
			};
		};
		userArr = [];
		if(litmus) {							// correct sequence
			if(cpuArr.length === 20) {			// correct sequence and 20 steps
				$('.message').html('You win!');
				restart();
			}
			addStep();
			cpuDisplay();
			$('.message').html('');
		}
		else if (!litmus) {						// incorrect sequence
			if(strict) {						// incorrect and strict
				restart();
			}
			cpuDisplay();
			$('.message').html('<p>Ya dun goofed</p>');
		}
		
	};

	$('#one').on('click', function() {
		userArr.push(1);									// adds the pressed number to userArr
		oneMedia();
		if(userArr.length === cpuArr.length) {
			judgeSequence();
		}
	});
	$('#two').on('click', function() {
		userArr.push(2);
		twoMedia();
		if(userArr.length === cpuArr.length) {
			judgeSequence();
		}
	});
	$('#three').on('click', function() {
		userArr.push(3);
		threeMedia();
		if(userArr.length === cpuArr.length) {
			judgeSequence();
		}
	});
	$('#four').on('click', function() {
		userArr.push(4);
		fourMedia();
		if(userArr.length === cpuArr.length) {
			judgeSequence();
		}
	});

	$('.start').on('click', function() {
		addStep();
		cpuDisplay();
	});

	$('.restart').on('click', function() {
		restart();
	});

	$('.strict').on('click', function() {
		cpuArr = [];
		userArr = [];
		addStep();
		cpuDisplay();
		strict = true;
	});

});