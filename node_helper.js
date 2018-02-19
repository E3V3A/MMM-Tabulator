"use strict";


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
const fs = require("fs");


module.exports = NodeHelper.create({

  start: function () {
    this.config = null;
  },

  readData: function () {
    const myfile = "modules/MMM-Tabulator/demo.json";

    fs.readFile(myfile, "utf8", (err, data) => {
      if (err) {
        throw err;
      }

      this.sendSocketNotification("NEW_DATA_READ", data);
    });
  },

  socketNotificationReceived: function (notification, payload) {
    if (notification === "START_FETCHING_DATA") {
      this.config = payload;
      this.readData();

      setInterval(() => {
        this.readData();
      }, this.config.updateInterval);
    }
  }
});

/*function degreesToDirection(num) {
	var val = Math.floor((num / 22.5) + 0.5);
	var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
	return arr[(val % 16)];
}*/
