$(document).ready(function play(){
	var playerPiece = 'X';
	var computerPiece = 'O';
	$('.X').click(function(){
		playerPiece = 'X';
		computerPiece = 'O';
		clear();
	});
	$('.O').click(function(){
		playerPiece = 'O';
		computerPiece = 'X';
		clear();
	});
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
				if(moved === playerPiece) {
					gameObject[prop] = playerPiece;
				}
				else {
					gameObject[prop] = computerPiece;
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
			$('.b2').append(computerPiece);
			updateBoard('b2', computerPiece);
			moveNum++;
		}
		/* If you can win, do it */
		/* Horizontal wins missing 3 */
		else if(gameObject['a1'] === computerPiece && gameObject['a2'] === computerPiece && gameObject['a3'] === 'empty') {
			$('.a3').append(computerPiece);
			updateBoard('a3', computerPiece);
			checkWin();
		}
		else if(gameObject['b1'] === computerPiece && gameObject['b2'] === computerPiece && gameObject['b3'] === 'empty') {
			$('.b3').append(computerPiece);
			updateBoard('b3', computerPiece);
			checkWin();
		}
		else if(gameObject['c1'] === computerPiece && gameObject['c2'] === computerPiece && gameObject['c3'] === 'empty') {
			$('.c3').append(computerPiece);
			updateBoard('c3', computerPiece);
			checkWin();
		}
		/* Horizontal wins missing 2 */
		else if(gameObject['a1'] === computerPiece && gameObject['a3'] === computerPiece && gameObject['a2'] === 'empty') {
			$('.a2').append(computerPiece);
			updateBoard('a2', computerPiece);
			checkWin();
		}
		else if(gameObject['b1'] === computerPiece && gameObject['b3'] === computerPiece && gameObject['b2'] === 'empty') {
			$('.b2').append(computerPiece);
			updateBoard('b2', computerPiece);
			checkWin();
		}
		else if(gameObject['c1'] === computerPiece && gameObject['c3'] === computerPiece && gameObject['c2'] === 'empty') {
			$('.c2').append(computerPiece);
			updateBoard('c2', computerPiece);
			checkWin();
		}
		/* Horizontal wins missing 1 */
		else if(gameObject['a2'] === computerPiece && gameObject['a3'] === computerPiece && gameObject['a1'] === 'empty') {
			$('.a1').append(computerPiece);
			updateBoard('a1', computerPiece);
			checkWin();
		}
		else if(gameObject['b2'] === computerPiece && gameObject['b3'] === computerPiece && gameObject['b1'] === 'empty') {
			$('.b1').append(computerPiece);
			updateBoard('b1', computerPiece);
			checkWin();
		}
		else if(gameObject['c2'] === computerPiece && gameObject['c3'] === computerPiece && gameObject['c1'] === 'empty') {
			$('.c1').append(computerPiece);
			updateBoard('c1', computerPiece);
			checkWin();
		}
		/* Vertical wins missing c row*/
		else if(gameObject['a1'] === computerPiece && gameObject['b1'] === computerPiece && gameObject['c1'] === 'empty') {
			$('.c1').append(computerPiece);
			updateBoard('c1', computerPiece);
			checkWin();
		}
		else if(gameObject['a2'] === computerPiece && gameObject['b2'] === computerPiece && gameObject['c2'] === 'empty') {
			$('.c2').append(computerPiece);
			updateBoard('c2', computerPiece);
			checkWin();
		}
		else if(gameObject['a3'] === computerPiece && gameObject['b3'] === computerPiece && gameObject['c3'] === 'empty') {
			$('.c3').append(computerPiece);
			updateBoard('c3', computerPiece);
			checkWin();
		}
		/* Vertical wins missing b row */
		else if(gameObject['a1'] === computerPiece && gameObject['c1'] === computerPiece && gameObject['b1'] === 'empty') {
			$('.b1').append(computerPiece);
			updateBoard('b1', computerPiece);
			checkWin();
		}
		else if(gameObject['a2'] === computerPiece && gameObject['c2'] === computerPiece && gameObject['b2'] === 'empty') {
			$('.b2').append(computerPiece);
			updateBoard('b2', computerPiece);
			checkWin();
		}
		else if(gameObject['a3'] === computerPiece && gameObject['c3'] === computerPiece && gameObject['b3'] === 'empty') {
			$('.b3').append(computerPiece);
			updateBoard('b3', computerPiece);
			checkWin();
		}
		/* Vertical wins missing a row */
		else if(gameObject['b1'] === computerPiece && gameObject['c1'] === computerPiece && gameObject['a1'] === 'empty') {
			$('.a1').append(computerPiece);
			updateBoard('a1', computerPiece);
			checkWin();
		}
		else if(gameObject['b2'] === computerPiece && gameObject['c2'] === computerPiece && gameObject['a2'] === 'empty') {
			$('.a2').append(computerPiece);
			updateBoard('a2', computerPiece);
			checkWin();
		}
		else if(gameObject['b3'] === computerPiece && gameObject['c3'] === computerPiece && gameObject['a3'] === 'empty') {
			$('.a3').append(computerPiece);
			updateBoard('a3', computerPiece);
			checkWin();
		}
		/* Diagonal wins */
		else if(gameObject['a1'] === computerPiece && gameObject['b2'] === computerPiece && gameObject['c3'] === 'empty') {
			$('.c3').append(computerPiece);
			updateBoard('c3', computerPiece);
			checkWin();
		}
		else if(gameObject['a3'] === computerPiece && gameObject['b2'] === computerPiece && gameObject['c1'] === 'empty') {
			$('.c1').append(computerPiece);
			updateBoard('c1', computerPiece);
			checkWin();
		}
		else if(gameObject['c1'] === computerPiece && gameObject['b2'] === computerPiece && gameObject['a3'] === 'empty') {
			$('.a3').append(computerPiece);
			updateBoard('a3', computerPiece);
			checkWin();
		}
		else if(gameObject['c3'] === computerPiece && gameObject['b2'] === computerPiece && gameObject['a1'] === 'empty') {
			$('.a1').append(computerPiece);
			updateBoard('a1', computerPiece);
			checkWin();
		}
		/* Block opponent's winning move */
		/* Horizontal blocks missing 3 */
		else if(gameObject['a1'] === playerPiece && gameObject['a2'] === playerPiece && gameObject['a3'] === 'empty') {
			$('.a3').append(computerPiece);
			updateBoard('a3', computerPiece);
			checkWin();
		}
		else if(gameObject['b1'] === playerPiece && gameObject['b2'] === playerPiece && gameObject['b3'] === 'empty') {
			$('.b3').append(computerPiece);
			updateBoard('b3', computerPiece);
			checkWin();
		}
		else if(gameObject['c1'] === playerPiece && gameObject['c2'] === playerPiece && gameObject['c3'] === 'empty') {
			$('.c3').append(computerPiece);
			updateBoard('c3', computerPiece);
			checkWin();
		}
		/* Horizontal blocks missing 2 */
		else if(gameObject['a1'] === playerPiece && gameObject['a3'] === playerPiece && gameObject['a2'] === 'empty') {
			$('.a2').append(computerPiece);
			updateBoard('a2', computerPiece);
			checkWin();
		}
		else if(gameObject['b1'] === playerPiece && gameObject['b3'] === playerPiece && gameObject['b2'] === 'empty') {
			$('.b2').append(computerPiece);
			updateBoard('b2', computerPiece);
			checkWin();
		}
		else if(gameObject['c1'] === playerPiece && gameObject['c3'] === playerPiece && gameObject['c2'] === 'empty') {
			$('.c2').append(computerPiece);
			updateBoard('c2', computerPiece);
			checkWin();
		}
		/* Horizontal blocks missing 1 */
		else if(gameObject['a2'] === playerPiece && gameObject['a3'] === playerPiece && gameObject['a1'] === 'empty') {
			$('.a1').append(computerPiece);
			updateBoard('a1', computerPiece);
			checkWin();
		}
		else if(gameObject['b2'] === playerPiece && gameObject['b3'] === playerPiece && gameObject['b1'] === 'empty') {
			$('.b1').append(computerPiece);
			updateBoard('b1', computerPiece);
			checkWin();
		}
		else if(gameObject['c2'] === playerPiece && gameObject['c3'] === playerPiece && gameObject['c1'] === 'empty') {
			$('.c1').append(computerPiece);
			updateBoard('c1', computerPiece);
			checkWin();
		}
		/* Vertical blocks missing c row*/
		else if(gameObject['a1'] === playerPiece && gameObject['b1'] === playerPiece && gameObject['c1'] === 'empty') {
			$('.c1').append(computerPiece);
			updateBoard('c1', computerPiece);
			checkWin();
		}
		else if(gameObject['a2'] === playerPiece && gameObject['b2'] === playerPiece && gameObject['c2'] === 'empty') {
			$('.c2').append(computerPiece);
			updateBoard('c2', computerPiece);
			checkWin();
		}
		else if(gameObject['a3'] === playerPiece && gameObject['b3'] === playerPiece && gameObject['c3'] === 'empty') {
			$('.c3').append(computerPiece);
			updateBoard('c3', computerPiece);
			checkWin();
		}
		/* Vertical blocks missing b row */
		else if(gameObject['a1'] === playerPiece && gameObject['c1'] === playerPiece && gameObject['b1'] === 'empty') {
			$('.b1').append(computerPiece);
			updateBoard('b1', computerPiece);
			checkWin();
		}
		else if(gameObject['a2'] === playerPiece && gameObject['c2'] === playerPiece && gameObject['b2'] === 'empty') {
			$('.b2').append(computerPiece);
			updateBoard('b2', computerPiece);
			checkWin();
		}
		else if(gameObject['a3'] === playerPiece && gameObject['c3'] === playerPiece && gameObject['b3'] === 'empty') {
			$('.b3').append(computerPiece);
			updateBoard('b3', computerPiece);
			checkWin();
		}
		/* Vertical blocks missing a row */
		else if(gameObject['b1'] === playerPiece && gameObject['c1'] === playerPiece && gameObject['a1'] === 'empty') {
			$('.a1').append(computerPiece);
			updateBoard('a1', computerPiece);
			checkWin();
		}
		else if(gameObject['b2'] === playerPiece && gameObject['c2'] === playerPiece && gameObject['a2'] === 'empty') {
			$('.a2').append(computerPiece);
			updateBoard('a2', computerPiece);
			checkWin();
		}
		else if(gameObject['b3'] === playerPiece && gameObject['c3'] === playerPiece && gameObject['a3'] === 'empty') {
			$('.a3').append(computerPiece);
			updateBoard('a3', computerPiece);
			checkWin();
		}
		/* If moveNum is 1 and the player picked an edge, pick the far corner */
		else if(moveNum === 1 && gameObject['a2'] === playerPiece) {
			$('.c3').append(computerPiece);
			updateBoard('c3', computerPiece);
			moveNum++;
		}
		else if(moveNum === 1 && gameObject['b3'] === playerPiece) {
			$('.a1').append(computerPiece);
			updateBoard('a1', computerPiece);
			moveNum++;
		}
		else if(moveNum === 1 && gameObject['c2'] === playerPiece) {
			$('.a1').append(computerPiece);
			updateBoard('a1', computerPiece);
			moveNum++;
		}
		else if(moveNum === 1 && gameObject['b1'] === playerPiece) {
			$('.c3').append(computerPiece);
			updateBoard('c3', computerPiece);
			moveNum++;
		}
		/* If moveNum is 1 and the player picked a corner, pick the far corner */
		else if(moveNum === 1 && gameObject['a1'] === playerPiece) {
			$('.c3').append(computerPiece);
			updateBoard('c3', computerPiece);
			moveNum++;
		}
		else if(moveNum === 1 && gameObject['a3'] === playerPiece) {
			$('.c1').append(computerPiece);
			updateBoard('c1', computerPiece);
			moveNum++;
		}
		else if(moveNum === 1 && gameObject['c1'] === playerPiece) {
			$('.a3').append(computerPiece);
			updateBoard('a3', computerPiece);
			moveNum++;
		}
		else if(moveNum === 1 && gameObject['c3'] === playerPiece) {
			$('.a1').append(computerPiece);
			updateBoard('a1', computerPiece);
			moveNum++;
		}
		/* Mark the first available slot from top left */
		else {
			for(var prop in gameObject) {
				if(gameObject[prop] === 'empty') {
					$('.' + prop).append(computerPiece);
					updateBoard(prop, computerPiece);
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
			$(this).append(playerPiece);		// add an X
			updateBoard($(this).attr('class'), playerPiece);
			checkWin();
			if(over === 'no') {
				cpuMove();
			}
		}
	});

	$('.reset').click(function(){	// when the reset button is clicked
		clear();					// function to clear board is called
	});


});