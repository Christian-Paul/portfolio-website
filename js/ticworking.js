$(document).ready(function play(){
	var move = 'player';
	var gameObject = {
		a1:'empty',
		a2:'empty',
		a3:'empty',
		b1:'empty',
		b2:'empty',
		b3:'empty',
		c1:'empty',
		c2:'empty',
		c3:'empty'
	};
	var moveNum = 0;
	var over = '';

	function updateBoard(selectedClass, moved) {
		for(var prop in gameObject) {
			if(selectedClass.indexOf(prop) !== -1) {
				if(moved === 'X') {
					gameObject[prop] = 'X';
				}
				else {
					gameObject[prop] = 'O';
				}
			}
		}
		updateDisplay();
	};

	function updateDisplay() {
		$('.board').html(
			'a1: ' + gameObject.a1 + '<br>' +
			'a2: ' + gameObject.a2 + '<br>' +
			'a3: ' + gameObject.a3 + '<br>' +
			'b1: ' + gameObject.b1 + '<br>' +
			'b2: ' + gameObject.b2 + '<br>' +
			'b3: ' + gameObject.b3 + '<br>' +
			'c1: ' + gameObject.c1 + '<br>' +
			'c2: ' + gameObject.c2 + '<br>' +
			'c3: ' + gameObject.c3
			);
	};

	function clear() {
		moveNum = 0;
		$('.gameblock').empty(); 	// clear board
		gameObject = {				// revert object to empty
			a1:'empty',
			a2:'empty',
			a3:'empty',
			b1:'empty',
			b2:'empty',
			b3:'empty',
			c1:'empty',
			c2:'empty',
			c3:'empty'
		}; 
		cpuMove();
	};

	function cpuMove() {
		/* If it's the first move, mark the center */
		if(moveNum === 0) {
			$('.b2').append('O');
			updateBoard('b2', 'O');
			moveNum++;
		}
		/* If you can win, do it */
		/* Horizontal wins missing 3 */
		else if(gameObject['a1'] === 'O' && gameObject['a2'] === 'O' && gameObject['a3'] === 'empty') {
			$('.a3').append('O');
			updateBoard('a3', 'O');
			checkWin();
		}
		else if(gameObject['b1'] === 'O' && gameObject['b2'] === 'O' && gameObject['b3'] === 'empty') {
			$('.b3').append('O');
			updateBoard('b3', 'O');
			checkWin();
		}
		else if(gameObject['c1'] === 'O' && gameObject['c2'] === 'O' && gameObject['c3'] === 'empty') {
			$('.c3').append('O');
			updateBoard('c3', 'O');
			checkWin();
		}
		/* Horizontal wins missing 2 */
		else if(gameObject['a1'] === 'O' && gameObject['a3'] === 'O' && gameObject['a2'] === 'empty') {
			$('.a2').append('O');
			updateBoard('a2', 'O');
			checkWin();
		}
		else if(gameObject['b1'] === 'O' && gameObject['b3'] === 'O' && gameObject['b2'] === 'empty') {
			$('.b2').append('O');
			updateBoard('b2', 'O');
			checkWin();
		}
		else if(gameObject['c1'] === 'O' && gameObject['c3'] === 'O' && gameObject['c2'] === 'empty') {
			$('.c2').append('O');
			updateBoard('c2', 'O');
			checkWin();
		}
		/* Horizontal wins missing 1 */
		else if(gameObject['a2'] === 'O' && gameObject['a3'] === 'O' && gameObject['a1'] === 'empty') {
			$('.a1').append('O');
			updateBoard('a1', 'O');
			checkWin();
		}
		else if(gameObject['b2'] === 'O' && gameObject['b3'] === 'O' && gameObject['b1'] === 'empty') {
			$('.b1').append('O');
			updateBoard('b1', 'O');
			checkWin();
		}
		else if(gameObject['c2'] === 'O' && gameObject['c3'] === 'O' && gameObject['c1'] === 'empty') {
			$('.c1').append('O');
			updateBoard('c1', 'O');
			checkWin();
		}
		/* Vertical wins missing c row*/
		else if(gameObject['a1'] === 'O' && gameObject['b1'] === 'O' && gameObject['c1'] === 'empty') {
			$('.c1').append('O');
			updateBoard('c1', 'O');
			checkWin();
		}
		else if(gameObject['a2'] === 'O' && gameObject['b2'] === 'O' && gameObject['c2'] === 'empty') {
			$('.c2').append('O');
			updateBoard('c2', 'O');
			checkWin();
		}
		else if(gameObject['a3'] === 'O' && gameObject['b3'] === 'O' && gameObject['c3'] === 'empty') {
			$('.c3').append('O');
			updateBoard('c3', 'O');
			checkWin();
		}
		/* Vertical wins missing b row */
		else if(gameObject['a1'] === 'O' && gameObject['c1'] === 'O' && gameObject['b1'] === 'empty') {
			$('.b1').append('O');
			updateBoard('b1', 'O');
			checkWin();
		}
		else if(gameObject['a2'] === 'O' && gameObject['c2'] === 'O' && gameObject['b2'] === 'empty') {
			$('.b2').append('O');
			updateBoard('b2', 'O');
			checkWin();
		}
		else if(gameObject['a3'] === 'O' && gameObject['c3'] === 'O' && gameObject['b3'] === 'empty') {
			$('.b3').append('O');
			updateBoard('b3', 'O');
			checkWin();
		}
		/* Vertical wins missing a row */
		else if(gameObject['b1'] === 'O' && gameObject['c1'] === 'O' && gameObject['a1'] === 'empty') {
			$('.a1').append('O');
			updateBoard('a1', 'O');
			checkWin();
		}
		else if(gameObject['b2'] === 'O' && gameObject['c2'] === 'O' && gameObject['a2'] === 'empty') {
			$('.a2').append('O');
			updateBoard('a2', 'O');
			checkWin();
		}
		else if(gameObject['b3'] === 'O' && gameObject['c3'] === 'O' && gameObject['a3'] === 'empty') {
			$('.a3').append('O');
			updateBoard('a3', 'O');
			checkWin();
		}
		/* Diagonal wins */
		else if(gameObject['a1'] === 'O' && gameObject['b2'] === 'O' && gameObject['c3'] === 'empty') {
			$('.c3').append('O');
			updateBoard('c3', 'O');
			checkWin();
		}
		else if(gameObject['a3'] === 'O' && gameObject['b2'] === 'O' && gameObject['c1'] === 'empty') {
			$('.c1').append('O');
			updateBoard('c1', 'O');
			checkWin();
		}
		else if(gameObject['c1'] === 'O' && gameObject['b2'] === 'O' && gameObject['a3'] === 'empty') {
			$('.a3').append('O');
			updateBoard('a3', 'O');
			checkWin();
		}
		else if(gameObject['c3'] === 'O' && gameObject['b2'] === 'O' && gameObject['a1'] === 'empty') {
			$('.a1').append('O');
			updateBoard('a1', 'O');
			checkWin();
		}
		/* Block opponent's winning move */
		/* Horizontal blocks missing 3 */
		else if(gameObject['a1'] === 'X' && gameObject['a2'] === 'X' && gameObject['a3'] === 'empty') {
			$('.a3').append('O');
			updateBoard('a3', 'O');
			checkWin();
		}
		else if(gameObject['b1'] === 'X' && gameObject['b2'] === 'X' && gameObject['b3'] === 'empty') {
			$('.b3').append('O');
			updateBoard('b3', 'O');
			checkWin();
		}
		else if(gameObject['c1'] === 'X' && gameObject['c2'] === 'X' && gameObject['c3'] === 'empty') {
			$('.c3').append('O');
			updateBoard('c3', 'O');
			checkWin();
		}
		/* Horizontal blocks missing 2 */
		else if(gameObject['a1'] === 'X' && gameObject['a3'] === 'X' && gameObject['a2'] === 'empty') {
			$('.a2').append('O');
			updateBoard('a2', 'O');
			checkWin();
		}
		else if(gameObject['b1'] === 'X' && gameObject['b3'] === 'X' && gameObject['b2'] === 'empty') {
			$('.b2').append('O');
			updateBoard('b2', 'O');
			checkWin();
		}
		else if(gameObject['c1'] === 'X' && gameObject['c3'] === 'X' && gameObject['c2'] === 'empty') {
			$('.c2').append('O');
			updateBoard('c2', 'O');
			checkWin();
		}
		/* Horizontal blocks missing 1 */
		else if(gameObject['a2'] === 'X' && gameObject['a3'] === 'X' && gameObject['a1'] === 'empty') {
			$('.a1').append('O');
			updateBoard('a1', 'O');
			checkWin();
		}
		else if(gameObject['b2'] === 'X' && gameObject['b3'] === 'X' && gameObject['b1'] === 'empty') {
			$('.b1').append('O');
			updateBoard('b1', 'O');
			checkWin();
		}
		else if(gameObject['c2'] === 'X' && gameObject['c3'] === 'X' && gameObject['c1'] === 'empty') {
			$('.c1').append('O');
			updateBoard('c1', 'O');
			checkWin();
		}
		/* Vertical blocks missing c row*/
		else if(gameObject['a1'] === 'X' && gameObject['b1'] === 'X' && gameObject['c1'] === 'empty') {
			$('.c1').append('O');
			updateBoard('c1', 'O');
			checkWin();
		}
		else if(gameObject['a2'] === 'X' && gameObject['b2'] === 'X' && gameObject['c2'] === 'empty') {
			$('.c2').append('O');
			updateBoard('c2', 'O');
			checkWin();
		}
		else if(gameObject['a3'] === 'X' && gameObject['b3'] === 'X' && gameObject['c3'] === 'empty') {
			$('.c3').append('O');
			updateBoard('c3', 'O');
			checkWin();
		}
		/* Vertical blocks missing b row */
		else if(gameObject['a1'] === 'X' && gameObject['c1'] === 'X' && gameObject['b1'] === 'empty') {
			$('.b1').append('O');
			updateBoard('b1', 'O');
			checkWin();
		}
		else if(gameObject['a2'] === 'X' && gameObject['c2'] === 'X' && gameObject['b2'] === 'empty') {
			$('.b2').append('O');
			updateBoard('b2', 'O');
			checkWin();
		}
		else if(gameObject['a3'] === 'X' && gameObject['c3'] === 'X' && gameObject['b3'] === 'empty') {
			$('.b3').append('O');
			updateBoard('b3', 'O');
			checkWin();
		}
		/* Vertical blocks missing a row */
		else if(gameObject['b1'] === 'X' && gameObject['c1'] === 'X' && gameObject['a1'] === 'empty') {
			$('.a1').append('O');
			updateBoard('a1', 'O');
			checkWin();
		}
		else if(gameObject['b2'] === 'X' && gameObject['c2'] === 'X' && gameObject['a2'] === 'empty') {
			$('.a2').append('O');
			updateBoard('a2', 'O');
			checkWin();
		}
		else if(gameObject['b3'] === 'X' && gameObject['c3'] === 'X' && gameObject['a3'] === 'empty') {
			$('.a3').append('O');
			updateBoard('a3', 'O');
			checkWin();
		}
		/* If moveNum is 1 and the player picked an edge, pick the far corner */
		else if(moveNum === 1 && gameObject['a2'] === 'X') {
			$('.c3').append('O');
			updateBoard('c3', 'O');
			moveNum++;
		}
		else if(moveNum === 1 && gameObject['b3'] === 'X') {
			$('.a1').append('O');
			updateBoard('a1', 'O');
			moveNum++;
		}
		else if(moveNum === 1 && gameObject['c2'] === 'X') {
			$('.a1').append('O');
			updateBoard('a1', 'O');
			moveNum++;
		}
		else if(moveNum === 1 && gameObject['b1'] === 'X') {
			$('.c3').append('O');
			updateBoard('c3', 'O');
			moveNum++;
		}
		/* If moveNum is 1 and the player picked a corner, pick the far corner */
		else if(moveNum === 1 && gameObject['a1'] === 'X') {
			$('.c3').append('O');
			updateBoard('c3', 'O');
			moveNum++;
		}
		else if(moveNum === 1 && gameObject['a3'] === 'X') {
			$('.c1').append('O');
			updateBoard('c1', 'O');
			moveNum++;
		}
		else if(moveNum === 1 && gameObject['c1'] === 'X') {
			$('.a3').append('O');
			updateBoard('a3', 'O');
			moveNum++;
		}
		else if(moveNum === 1 && gameObject['c3'] === 'X') {
			$('.a1').append('O');
			updateBoard('a1', 'O');
			moveNum++;
		}
		/* Mark the first available slot from top left */
		else {
			for(var prop in gameObject) {
				if(gameObject[prop] === 'empty') {
					$('.' + prop).append('O');
					updateBoard(prop, 'O');
					checkWin();
					break;
				}
			}
		}
	};

	function checkWin() {
		if(gameObject['a1'] !== 'empty' && gameObject['a2'] !== 'empty' && gameObject['a3'] !== 'empty' && gameObject['a1'] === gameObject['a2'] && gameObject['a1'] === gameObject['a3']) {
			clear();
		}
		else if(gameObject['b1'] !== 'empty' && gameObject['b2'] !== 'empty' && gameObject['b3'] !== 'empty' && gameObject['b1'] === gameObject['b2'] && gameObject['b1'] === gameObject['b3']) {
			clear();
		}
		else if(gameObject['c1'] !== 'empty' && gameObject['c2'] !== 'empty' && gameObject['c3'] !== 'empty' && gameObject['c1'] === gameObject['c2'] && gameObject['c1'] === gameObject['c3']) {
			clear();
		}
		else if(gameObject['a1'] !== 'empty' && gameObject['b1'] !== 'empty' && gameObject['c1'] !== 'empty' && gameObject['a1'] === gameObject['b1'] && gameObject['a1'] === gameObject['c1']) {
			clear();
		}
		else if(gameObject['a2'] !== 'empty' && gameObject['b2'] !== 'empty' && gameObject['c2'] !== 'empty' && gameObject['a2'] === gameObject['b2'] && gameObject['a2'] === gameObject['c2']) {
			clear();
		}
		else if(gameObject['a3'] !== 'empty' && gameObject['b3'] !== 'empty' && gameObject['c3'] !== 'empty' && gameObject['a3'] === gameObject['b3'] && gameObject['a3'] === gameObject['c3']) {
			clear();
		}
		else if(gameObject['a1'] !== 'empty' && gameObject['b2'] !== 'empty' && gameObject['c3'] !== 'empty' && gameObject['a1'] === gameObject['b2'] && gameObject['a1'] === gameObject['c3']) {
			clear();
		}
		else if(gameObject['a3'] !== 'empty' && gameObject['b2'] !== 'empty' && gameObject['c1'] !== 'empty' && gameObject['a3'] === gameObject['b2'] && gameObject['a3'] === gameObject['c1']) {
			clear();
		}
		else if(gameObject['a1'] !== 'empty' && gameObject['a2'] !== 'empty' && gameObject['a3'] !== 'empty' && gameObject['b1'] !== 'empty' && gameObject['b2'] !== 'empty' && gameObject['b3'] !== 'empty' && gameObject['c1'] !== 'empty' && gameObject['c2'] !== 'empty' && gameObject['c3'] !== 'empty') {
			clear();
		}
		else {
			over = 'no';
		}
	}; 

	$('.gameblock').click(function(){
		over = 'yes';
		if($(this).html() === '') {		// if the block is empty
			$(this).append('X');		// add an X
			updateBoard($(this).attr('class'), 'X');
			checkWin();
			if(over === 'no') {
				cpuMove();
			}
		}
	});

	$('.reset').click(function(){	// when the reset button is clicked
		clear();					// function to clear board is called
	});

	clear();
});