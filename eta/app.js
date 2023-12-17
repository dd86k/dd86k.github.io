"use strict";

//TODO: Create Timer

var MINUTE = 60;
var HOUR = MINUTE * 60;
var DAY = HOUR * 24;

function format(days, hours, minutes, seconds) {
	var base = '';
	if (days > 0)
		base += days + (days > 1 ? " days, " : " day, ");
	if (hours > 0)
		base += hours + (hours > 1 ? " hours, " : " hour, ");
	if (minutes > 0)
		base += minutes + (minutes > 1 ? " minutes, " : " minute, ");
	return base + (Math.round(seconds) + " seconds");
}
function count_days(seconds) {
	return Math.floor(seconds / DAY);
}
function count_hours(seconds) {
	return Math.floor(seconds / HOUR);
}
function count_minutes(seconds) {
	return Math.floor(seconds / MINUTE);
}

function updateAll() {
	var remaining = parseFloat(input_left.value);
	var rate = parseFloat(input_speed.value);

	if (isNaN(remaining) || isNaN(rate)) {
		clearEta();
		return;
	}

	// Transform data
	switch (document.getElementById('left_mode').value) {
	case "gb": remaining *= 1024 * 1024; break;
	case "mb": remaining *= 1024; break;
	}
	switch (document.getElementById('speed_mode').value) {
	case "gb": rate *= 1024 * 1024; break;
	case "mb": rate *= 1024; break;
	}

	var seconds = estimate(remaining, rate); // seconds

	var time_end = new Date();
	time_end.setTime(time_end.getTime() + (seconds * 1000));

	var days = count_days(seconds);
	var hours = count_hours(seconds);
	var minutes = count_minutes(seconds);
	seconds -= ((days * DAY) + (hours * HOUR) + (minutes * MINUTE));

	out_total.innerText = "Remaining: " + format(days, hours, minutes, seconds);
	out_time.innerText = "At: " + time_end.toLocaleTimeString();
}

function clearEta() {
	out_total.innerText = out_time.innerText = '';
}

/**
 * Estmate time remaining.
 * @param {number} size - In Bytes
 * @param {number} speed - In Bytes/Second
 * @return {Date} Estimated time in seconds
 */
function estimate(size, speed) {
	return size / speed;
}
