/* -----------------------------------------------------------
 * Module:       MMM-Tabulator
 * FileName:     node_helper.js
 * Author:       E:V:A
 * License:      MIT
 * Date:         2018-02-21
 * Version:      1.0.0
 * Description:  A MagicMirror Demo module for using Tabulator
 * Format:       4-space TAB's (no TAB chars), mixed quotes
 *
 * URL1:         https://github.com/E3V3A/MMM-Tabulator
 * URL2:         https://github.com/olifolkerd/tabulator
 * -----------------------------------------------------------
 * Tabulator Requires:
 *      "node_modules/jquery/dist/jquery.min.js",
 *      "node_modules/jquery-ui-dist/jquery-ui.min.js",
 *      "node_modules/jquery-ui-dist/jquery-ui.css",
 *      "node_modules/jquery.tabulator/dist/js/tabulator.js",
 *      "node_modules/jquery.tabulator/dist/css/tabulator.css",
 * -----------------------------------------------------------
 * See:
 *   https://stackoverflow.com/questions/32621988/electron-jquery-is-not-defined?rq=1
 *   https://electronjs.org/docs/faq
*/

'use strict';

const NodeHelper = require("node_helper");
const fs = require('fs');

module.exports = NodeHelper.create({

    start: function() {
        this.config = null;
    },

    readData: function() {
        const myfile = 'modules/MMM-Tabulator/demo.json'; // The API gives improper JSON

        fs.readFile( myfile, 'utf8', (err, data) => {
            if (err) throw err;
            //let cleanData = JSON.stringify(data); // Fix dirty JSON
            //console.log("\nRead file data: " + data);
            this.sendSocketNotification("NEW_DATA", data);
        });
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "REQUEST_DATA") {
            this.config = payload;
            this.readData();
            setInterval(() => {
                this.readData();
            }, this.config.updateInterval);
        }
    }

});

// This is too beautiful not to use!
function degToDir(num) {
    var val = Math.floor((num / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    return arr[(val % 16)];
}
