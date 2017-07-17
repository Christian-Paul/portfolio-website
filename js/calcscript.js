var output;

function calculate(str) {
  
  str = str.replace(/[-+*/]/g, ')$&');
  
  var matched = str.match(/\)/g).length;
  
  for(var i = 0; i < matched; i++) {
    str = '(' + str;
  }
  
  return eval(str);
}


$(document).ready(function(){
	$('.calc-btn').click(function(){
		if(output === undefined) {
			output = $(this).text();
			$('.display').text(output);
		}
		else {
			output += $(this).text() 
			$('.display').text(output);
		}
	})
	$('.clear-btn').click(function(){
		output = '';
		$('.display').text(0);
	})
	$('.equal-btn').click(function(){
		$('.display').text(calculate(output));
	})
})