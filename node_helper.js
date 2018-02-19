/* -----------------------------------------------------------
 * Module:       MMM-Tabulator
 * File:         nodehelper.js
 * Author:       E:V:A
 * License:      MIT
 * Date:         2018-02-19
 * Version:      0.0.2
 * Description:  A MagicMirror Demo module for using Tabulator
 * URL:          https://github.com/E3V3A/MMM-Tabulator
 * -----------------------------------------------------------
 * also see:
 *   https://stackoverflow.com/questions/32621988/electron-jquery-is-not-defined?rq=1
 *   https://electronjs.org/docs/faq
 *   https://github.com/MichMich/MagicMirror/issues/440
 *   https://github.com/fewieden/MMM-voice/blob/master/node_helper.js
 */

/*
"node_modules/jquery/dist/jquery.min.js",
"node_modules/jquery-ui-dist/jquery-ui.min.js",
"node_modules/jquery-ui-dist/jquery-ui.css",
"node_modules/jquery.tabulator/dist/js/tabulator.js",
"node_modules/jquery.tabulator/dist/css/tabulator.css",
*/

const NodeHelper = require("node_helper");
const moment = require("moment");
const fs = require('fs');
//const path = require('path');

const myfile = 'modules/MMM-Tabulator/demo.json'; //'modules/MMM-Tabulator/demo.json'

/*
const $ = require('jquery');
//var $ = require('jquery/dist/jquery.min');
global.jQuery = $;
const jqueryui = require('jquery-ui-dist/jquery-ui.min');
const jquerytabulator = require('jquery.tabulator');
const tabulator = require('jquery.tabulator/dist/js/tabulator');
*/

/*
var $ = require('jquery.min');
//global.jQuery = $;
window.jQuery = $;
require('jquery-ui-dist/jquery-ui.min.js');
require('jquery-ui-dist/jquery-ui.css');
require('jquery.tabulator/dist/js/tabulator.min.js');
require('jquery.tabulator/dist/css/tabulator.min.css');
*/

module.exports = NodeHelper.create({

	start: function() {
                this.started = false;
                this.config = null;
                console.log("Started MMM-Tabulator:node_helper.js");
		//console.log("\nStarting module: " + this.name);
		//console.log(`\nStarting module helper: ${this.name}`);
	},

        readData: function(){
                fs.readFile( myfile, 'utf8', (err, data) => {
                        if (err) throw err;
                        //console.log("\nRead file data: " + data);
                        console.log("Read file data!");
                        this.sendSocketNotification("DATA", data);
                });
        },

	//socketNotificationReceived: function(notification, config) {
        socketNotificationReceived: function(notification, payload) {
                var self = this;
                if (notification === "START") {
                        this.config = payload;
                        this.readData();
                        setInterval(() => { this.readData(); }, this.config.updateInterval);
                }

/*			console.log("MMMT:node_helper.js Received notification: " + notification ); //, "\npayload: ", payload);
			this.sendNotificationTest(this.anotherFunction());
		}
*/
	}
/*,
	sendNotificationTest: function(payload) {
		console.log("MMMT:node_helper.js Sending MMMT_PING with payload: " + payload );
		this.sendSocketNotification("MMMT_PING", payload);
	},

	anotherFunction: function() {
		return {date: new Date()};
	}
*/
});

/*function degreesToDirection(num) {
	var val = Math.floor((num / 22.5) + 0.5);
	var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	return arr[(val % 16)];
}*/
