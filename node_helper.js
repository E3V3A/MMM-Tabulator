/* -----------------------------------------------------------
 * Module:       MMM-Tabulator
 * File:         nodehelper.js
 * Author:       E:V:A
 * License:      MIT
 * Date:         2018-02-12
 * Version:      1.0
 * Description:  A MagicMirror Demo module for using Tabulator
 * URL:          https://github.com/E3V3A/MMM-Tabulator
 * -----------------------------------------------------------
 */

var NodeHelper = require("node_helper");
var moment = require("moment");

module.exports = NodeHelper.create({

	start: function() {
		console.log("Starting module: " + this.name);
	},

	socketNotificationReceived: function(notification, config) {
		if (notification === "MMM-Tabulator-NOTIFICATION_TEST") {
			console.log("Working notification system. Notification:", notification, "payload: ", payload);
			this.sendNotificationTest(this.anotherFunction());
		}
	},

	sendNotificationTest: function(payload) {
		this.sendSocketNotification("MMM-Tabulator-NOTIFICATION_TEST", payload);
	},

});

function degreesToDirection(num) {
	var val = Math.floor((num / 22.5) + 0.5);
	var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	return arr[(val % 16)];
}
