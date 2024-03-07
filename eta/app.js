"use strict";

var MINUTE = 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;

var K = 1024;
var M = K * 1024;
var G = M * 1024;

function seterror(msg) {
	error.innerText = 'error: ' + msg;
}
function clearerror() {
	error.innerText = '';
}

function getData(node_input, node_select) {
	var val  = parseFloat(document.getElementById(node_input).value);
	if (isNaN(val))
		return NaN;
	var mode = document.getElementById(node_select).value;
	switch (mode) {
	case "gb": val *= G; break;
	case "mb": val *= M; break;
	case "kb": val *= K; break;
	case "b":  break;
	default:
		console.trace("Unimplemented select for " + node_select + ": " + mode);
		console.assert(false);
	}
	return val;
}

function formatTime(seconds) {
	var str = '';
	
	var days = Math.floor(seconds / DAY);
	if (days) {
		str += days + 'd ';
		seconds -= days * DAY;
	}
	
	var hours = Math.floor(seconds / HOUR);
	if (hours) {
		str += hours + 'h ';
		seconds -= hours * HOUR;
	}
	
	var minutes = Math.floor(seconds / MINUTE);
	if (minutes) {
		str += minutes + 'm ';
		seconds -= minutes * MINUTE;
	}
	
	return str + seconds + 's';
}

function createTimer() {
	clearerror();
	
	var remaining = getData('input_remaining', 'select_remaining');
	if (isNaN(remaining)) {
		seterror('remaining is NaN');
		return;
	}
	
	var speed = getData('input_speed', 'select_speed');
	if (isNaN(speed)) {
		seterror('speed is NaN');
		return;
	}
	
	// In seconds
	var est = Math.round(remaining / speed);
	
	// Make timer element
	var timer_node_root = document.createElement('div');
	timer_node_root.className = 'timer';
	timer_node_root.time = est;
	var timer_node_time = document.createElement('span');
	timer_node_time.innerText = formatTime(est); // Initial
	var timer_node_close = document.createElement('span');
	timer_node_close.className = 'timer_close_button';
	timer_node_close.innerText = 'x';
	
	// Delegate
	function deleteTimer() {
		timer_node_root.removeChild(timer_node_time);
		timer_node_root.removeChild(timer_node_close);
		timers.removeChild(timer_node_root);
		clearInterval(timerId);
	}
	
	timer_node_close.onclick = function () {
		deleteTimer();
	};
	
	var timerId = setInterval(function() {
		timer_node_root.time = timer_node_root.time - 1;
		if (timer_node_root.time <= 0) {
			deleteTimer();
			return;
		}
		timer_node_time.innerText = formatTime(timer_node_root.time);
	}, 1000);
	
	timer_node_root.appendChild(timer_node_time);
	timer_node_root.appendChild(timer_node_close);
	
	timers.appendChild(timer_node_root);
}
