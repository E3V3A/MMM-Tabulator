/* -----------------------------------------------------------
 * Module:       MMM-Tabulator
 * FileName:     node_helper.js
 * Author:       E:V:A
 * License:      MIT
 * Date:         2018-03-05
 * Version:      1.0.2
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

const fs = require('fs');

module.exports = NodeHelper.create({

    start: function() {
        this.config = null;
    },

    readData: function() {
        const myfile = 'modules/MMM-Tabulator/demo.json'; // The demo API use improper JSON

        // Consider using readFileSync() and/or using utf8:
        // see: https://stackoverflow.com/questions/10058814/get-data-from-fs-readfile/14078644
        //fs.readFileSync( myfile, 'utf8', (err, data) => {
        //fs.readFile( myfile, 'utf8', (err, data) => {
        fs.readFile( myfile, 'ascii', (err, data) => { // F24 JSON source is probably not UTF-8
            if (err) throw err;
            //console.log(data);
            let cleanData = jZen(data);
            if (isJSON(cleanData) ) {
                this.sendSocketNotification("NEW_DATA", cleanData);
            } else {
                // So WTF is it?
                console.log("JSON: false");
                console.log("isAO(dirty): " + isAO(data));
                console.log("isAO(clean): " + isAO(cleanData));
                console.log("Data:\n" + data);
            }
        });
    },

    socketNotificationReceived: function (notification, payload) {
        if (notification === "REQUEST_DATA") {
            this.config = payload;
            this.readData();
            setInterval(() => {
                this.readData();
            }, this.config.updateInterval * 1000);
        }
    }

});

// To check if something is JSON
function isJSON(str) {
    try { return (JSON.parse(str) && !!str); }
    catch (e) { return false; }
}

// To check if something is an Array or Object (parsed JSON)
function isAO(val) {
    return val instanceof Array || val instanceof Object ? true : false;
}

// --------------------------------------------------------------------------
// What:  A dirt simple JSON cleanup function that also compactifies the data
// NOTE:  - Only use on flat and trustworthy ASCII JSON data!
//        - Cannot handle any characters outside [A-Za-z0-9_\-]. (e.g. UTF-8)
//        - Using remote data without further sanitation is a security risk!
// --------------------------------------------------------------------------
const re1 = /([A-Za-z0-9_\-]+):/gm;  // use const to make sure it is compiled
function jZen(data) {
    //let re1 = /([A-Za-z0-9_\-]+):/gm; // Find all ASCII words $1 before an ":"
    let str = "";
    str = data.replace(/\s/gm, '');     // Remove all white-space
    str = str.replace(/\'/gm, '\"');    // Replace all ' with "
    str = str.replace(re1, '\"$1\":');  // Replace $1: with "$1":
    //console.log("Dirty JSON is:\n" + data.toString() );
    //console.log("Clean JSON is:\n" + str);
    return str;
}
