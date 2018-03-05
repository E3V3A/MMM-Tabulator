/* -----------------------------------------------------------
 * Module:       MMM-Tabulator
 * FileName:     MMM-Tabulator.js
 * Author:       E:V:A
 * License:      MIT
 * Date:         2018-03-05
 * Version:      1.0.2
 * Description:  A MagicMirror Demo module for using Tabulator
 * Format:       4-space TAB's (no TAB chars), mixed quotes
 *
 * URL1:         https://github.com/E3V3A/MMM-Tabulator
 * URL2:         http://tabulator.info/
 * URL3:         https://github.com/olifolkerd/tabulator
 * -----------------------------------------------------------
 * About Tabulator CSS & Themes:
 *   http://tabulator.info/docs/3.4?#css
 *   http://tabulator.info/examples/3.4?#theming
 * -----------------------------------------------------------
 */

//-----------------------------------------------------
// Tabulator Requires:
// "node_modules/jquery/dist/jquery.min.js",
// "node_modules/jquery-ui-dist/jquery-ui.min.js",
// "node_modules/jquery-ui-dist/jquery-ui.css",
// "node_modules/jquery.tabulator/dist/js/tabulator.js",
// "node_modules/jquery.tabulator/dist/css/tabulator.css",
//-----------------------------------------------------

'use strict';

Module.register('MMM-Tabulator',{

    defaults: {
        header: "Some Flights", // The module header text, if any
        maxItems: 10,           // MAX number of planes (table rows) to show
        updateInterval: 180     // [sec] Read the file every 3 min
        //fileUrl: "file:///home/pi/MagicMirror/modules/MMM-backlog/demo.json"
    },

    requiresVersion: "2.1.0",

    start: function() {
        this.loaded = false;
        this.sendSocketNotification("REQUEST_DATA", this.config);
    },

    getDom: function() {
        let w = document.createElement("div");  // Let w be the "wrapper"
        w.id = "flighttable";                   // The id used by Tabulator

        if (!this.loaded) {
            w.innerHTML = "Loading...";
            w.className = "dimmed light small";
            return w;
        }
        if (!this.data) {
            w.innerHTML = "No data!";
            w.className = "dimmed light small";
            return w;
        }
        w.innerHTML = "Waiting for Tabulator...";
        return w;
    },

    getScripts: function() {
        return [
            this.file('node_modules/jquery/dist/jquery.min.js'),
            this.file('node_modules/jquery-ui-dist/jquery-ui.min.js'),
            this.file('node_modules/jquery.tabulator/dist/js/tabulator.js')
        ]
    },

    getStyles: function() {
        return [
            this.file('node_modules/jquery-ui-dist/jquery-ui.css'),
            //this.file('node_modules/jquery.tabulator/dist/css/tabulator.css'),                // Standard Theme
            this.file('node_modules/jquery.tabulator/dist/css/tabulator_midnight.min.css'),     // Midnight Theme
            //this.file('node_modules/jquery.tabulator/tabulator_simple.min.css'),              // Simple Theme
            //this.file('node_modules/jquery.tabulator/bootstrap/tabulator_bootstrap.min.css'), // Bootstrap Theme
            "MMM-Tabulator.css"
        ];
    },

    getTranslations: function() { return false; }, // Nothing to translate

    // This come from the MM CORE or from other modules
    notificationReceived: function (notification, payload, sender) {
        if (notification === "DOM_OBJECTS_CREATED") {
            // The div with id "flighttable" now exists, so we can load Tabulate.
            this.loadTabulate();
        }
    },

    // This comes from YOUR module, usually "node_helper.js"
    socketNotificationReceived: function(notification, payload) {
        switch (notification) {
            case "NEW_DATA":
                //console.log("MMM-Tabulator: NEW_DATA received!");
                this.loaded = true;
                this.setTableData(payload);
                break;
        }
    },

    //===================================================================================
    //  From here:  Tabulator specific code
    //===================================================================================
    loadTabulate: function() {

        // see: http://tabulator.info/docs/3.3#mutators
        /*Tabulator.extendExtension("mutator", "mutators", {
            ft2met:function(value, data, type, mutatorParams){
                return (value * 0.3048).toFixed(0);
            },
        });*/

        let self = this;

        Tabulator.extendExtension("format", "formatters", {
            ft2mt:function(cell, formatterParams){              // Feet to Meters
                return  (0.3048*cell.getValue()).toFixed(0);
            },
            kn2km:function(cell, formatterParams){              // Knots to Kilometers
                return  (1.852*cell.getValue()).toFixed(0);
            },
            ep2time:function(cell, formatterParams){            // POSIX epoch to hh:mm:ss
                let date = new Date(cell.getValue());
                // We use "en-GB" only to get the correct formatting for a 24 hr clock, not your TZ.
                return date.toLocaleString('en-GB', { hour:'numeric', minute:'numeric', second:'numeric', hour12:false } );
            },
            // placeholder: deg2dir
        });

        let flightTable = $("#flighttable");
        var flightTableHeight = ( this.config.maxItems * 33 + 33 );   // @12px font-size we have [~33 px/row]

        flightTable.tabulator({
            height:flightTableHeight,           // [px] Set MAX height of table, this enables the Virtual DOM and improves render speed
            height:205,                         // Set height of table, this enables the Virtual DOM and improves render speed
            //layout:"fitColumns",                // Fit columns to width of table (optional)
            //headerSort:false,                   // Disable header sorter
            resizableColumns:false,             // Disable column resize
            responsiveLayout:true,              // Enable responsive layouts
            placeholder:"Waiting for data...",  // Display message to user on empty table
            initialSort:[                       // Define the sort order:
                {column:"altitude",     dir:"asc"},     // 1'st
                //{column:"flight",     dir:"desc"},    // 2'nd
                //{column:"bearing",    dir:"asc"},     // 3'rd
            ],
            columns:[
                {title:"Flight",        field:"flight",         headerSort:false, sortable:false, responsive:0, align:"left"}, // , width:250},
                {title:"CallSig",       field:"callsign",       headerSort:false, sortable:false, visible:true, responsive:3},
                {title:"To",            field:"destination",    headerSort:false, sortable:false, responsive:0},
                {title:"From",          field:"origin",         headerSort:false, sortable:false, responsive:0},
                {title:"Speed",         field:"speed",          headerSort:false, sortable:false, responsive:2, formatter:"kn2km"}, // [km/h]
                {title:"Bearing",       field:"bearing",        headerSort:false, sortable:false, responsive:1},
                {title:"Alt [m]",       field:"altitude",       headerSort:false, sortable:false, responsive:0, formatter:"ft2mt", align:"right", sorter:"number"},
                //{title:"Alt [m]",       field:"altitude",       sortable:true,  responsive:0, align:"right", sorter:"number", mutateType:"data", mutator:ft2met"},
                // Additional items:
                {title:"F24id",         field:"id",             headerSort:false, sortable:false, visible:false},
                {title:"RegID",         field:"registration",   headerSort:false, sortable:false, visible:false},
                {title:"Model",         field:"model",          headerSort:false, sortable:false, visible:true,  responsive:1},
                {title:"ModeS",         field:"modeSCode",      headerSort:false, sortable:false, visible:false},
                {title:"Radar",         field:"radar",          headerSort:false, sortable:false, visible:false},
                {title:"Lat",           field:"latitude",       headerSort:false, sortable:false, visible:false},
                {title:"Lon",           field:"longitude",      headerSort:false, sortable:false, visible:false},

                {title:"Time",          field:"timestamp",      headerSort:false, sortable:false, visible:false, responsive:1, formatter:"ep2time"},
                {title:"RoC [ft/m]",    field:"climb",          headerSort:false, sortable:false, visible:false},
                {title:"Squawk",        field:"squawk",         headerSort:false, sortable:false, visible:true, responsive:1}, // formatter:"sqCheck"},
                {title:"isGND",         field:"ground",         headerSort:false, sortable:false, visible:false},
                {title:"isGlider",      field:"glider",         headerSort:false, sortable:false, visible:false},
            ],
        });

        $(window).resize(function () {
            flightTable.tabulator("redraw");
        });
    },

    setTableData: function(data) {
        $("#flighttable").tabulator("setData", data);
    }
    //===================================================================================

});
