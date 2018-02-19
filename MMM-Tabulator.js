"use strict";

/* -----------------------------------------------------------
 * Module:       MMM-Tabulator
 * FileName:     MMM-Tabulator.js
 * Author:       E:V:A
 * License:      MIT
 * Date:         2018-02-19
 * Version:      0.0.2
 * Description:  A MagicMirror Demo module to use Tabulator
 * URL:          https://github.com/E3V3A/MMM-Tabulator
 * Template:     https://github.com/roramirez/MagicMirror-Module-Template/
 * -----------------------------------------------------------
 */

//app.use('/node_modules', express.static(__dirname + '/node_modules'));

/*
//-----------------------------------------------------
// Tabulator Requires:
"node_modules/jquery/dist/jquery.min.js",
"node_modules/jquery-ui-dist/jquery-ui.min.js",
"node_modules/jquery-ui-dist/jquery-ui.css",
"node_modules/jquery.tabulator/dist/js/tabulator.js",
"node_modules/jquery.tabulator/dist/css/tabulator.css",
//-----------------------------------------------------
*/

<<<<<<< HEAD
Module.register("MMM-Tabulator", {

  defaults: {
    //header: "Some Flights",
    updateInterval: 10000 //30*60*1000 // [ms] Read the file every 30 min
    //fileUrl: "file:///home/pi/MagicMirror/modules/MMM-backlog/demo.json"
  },

  requiresVersion: "2.1.0",

  start: function () {
    this.loaded = false;
    this.sendSocketNotification("START_FETCHING_DATA", this.config);
  },

  getDom: function () {
    let wrapper = document.createElement("div");
    wrapper.id = "flighttable";

    if (!this.loaded) {
      wrapper.innerHTML = this.translate("LOADING");
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    if (!this.data) {
      wrapper.innerHTML = "No data!"; // TODO: use this.translate(key)
      wrapper.className = "dimmed light small";
      return wrapper;
    }

    wrapper.innerHTML = "Waiting for Tabulator…";  // TODO: use this.translate(key)

    return wrapper;
  },

  getScripts: function () {
    return [
      this.file("node_modules/jquery/dist/jquery.min.js"),
      this.file("node_modules/jquery-ui-dist/jquery-ui.min.js"),
      this.file("node_modules/jquery.tabulator/dist/js/tabulator.js")
    ];
  },

  getStyles: function () {
    return [
      this.file("node_modules/jquery-ui-dist/jquery-ui.css"),
      this.file("node_modules/jquery.tabulator/dist/css/tabulator.css"),
      "MMM-Tabulator.css"
    ];
  },

  getTranslations: function () {
    return false; // Nothing to translate
  },


  notificationReceived: function (notification, payload, sender) {
    if (notification === "DOM_OBJECTS_CREATED") {
      // The div with id "flighttable" now exists. We can now load tabulate.
      this.loadTabulate();
    }
  },

  socketNotificationReceived: function (notification, payload) {
    switch (notification) {
      case "NEW_DATA_READ":
        this.loaded = true;
        this.setTableData(payload);
        break;
    }
  },

  loadTabulate: function () {
    Tabulator.extendExtension("format", "formatters", {
      ft2mt: function (cell, formatterParams) {              // Feet to Meters
        return (0.3048 * cell.getValue()).toFixed(0);
      },
      kn2km: function (cell, formatterParams) {              // Knots to Kilometers
        return (1.852 * cell.getValue()).toFixed(0);
      },
      ep2time: function (cell, formatterParams) {            // POSIX epoch to hh:mm:ss
        let date = new Date(cell.getValue());
        // TODO: Why use "en-GB" the user may have set another locale for his mirror.
        return date.toLocaleString("en-GB", {hour: "numeric", minute: "numeric", second: "numeric", hour12: false});
      },
    });

    let flightTable = $("#flighttable");

    flightTable.tabulator({
      height: 205,                         // Set height of table, this enables the Virtual DOM and improves render speed
      //layout:"fitColumns",                // Fit columns to width of table (optional)
      //headerSort:false,                   // Disable header sorter
      resizableColumns: false,             // Disable column resize
      responsiveLayout: true,              // Enable responsive layouts
      placeholder: "No Data Available",    // Display message to user on empty table
      initialSort: [                       // Define the sort order:
        {column: "altitude", dir: "asc"},     // 1'st
        //{column:"flight",     dir:"desc"},    // 2'nd
        //{column:"bearing",    dir:"asc"},     // 3'rd
      ],
      columns: [
        {title: "Flight", field: "flight", headerSort: false, sortable: false, responsive: 0, align: "left"}, // , width:250},
        {title: "CallSig", field: "callsign", headerSort: false, sortable: false, responsive: 3},
        {title: "From", field: "origin", headerSort: false, sortable: false, responsive: 0},
        {title: "To", field: "destination", headerSort: false, sortable: false, responsive: 0},
        {title: "Speed", field: "speed", headerSort: false, sortable: false, responsive: 2, formatter: "kn2km"}, // [km/h]
        {title: "Bearing", field: "bearing", headerSort: false, sortable: false, responsive: 1},
        {
          title: "Alt [m]",
          field: "altitude",
          headerSort: false,
          sortable: false,
          responsive: 0,
          formatter: "ft2mt",
          align: "right",
          sorter: "number"
        },
        //{title:"Alt [m]",       field:"altitude",       sortable:true,  responsive:0, align:"right", sorter:"number", mutateType:"data", mutator:ft2met"},
        // Additional items:
        {title: "F24id", field: "id", headerSort: false, sortable: false, visible: false},
        {title: "RegID", field: "registration", headerSort: false, sortable: false, visible: false},
        {title: "Model", field: "model", headerSort: false, sortable: false, visible: true, responsive: 1},
        {title: "ModeS", field: "modeSCode", headerSort: false, sortable: false, visible: false},
        {title: "Radar", field: "radar", headerSort: false, sortable: false, visible: false},
        {title: "Lat", field: "latitude", headerSort: false, sortable: false, visible: false},
        {title: "Lon", field: "longitude", headerSort: false, sortable: false, visible: false},

        {
          title: "Time",
          field: "timestamp",
          headerSort: false,
          sortable: false,
          visible: true,
          responsive: 1,
          formatter: "ep2time"
        },
        {title: "RoC [ft/m]", field: "climb", headerSort: false, sortable: false, visible: false},
        {title: "Squawk", field: "squawk", headerSort: false, sortable: false, visible: true, responsive: 1}, // formatter:"sqCheck"},
        {title: "isGND", field: "ground", headerSort: false, sortable: false, visible: false},
        {title: "isGlider", field: "glider", headerSort: false, sortable: false, visible: false},
      ],
    });

    $(window).resize(function () {
      flightTable.tabulator("redraw");
    });
  },

  setTableData: function(data) {
    $("#flighttable").tabulator("setData", data);
  }
=======
Module.register('MMM-Tabulator',{

	defaults: {
		//header: "Some Flights",
		updateInterval: 10000 //30*60*1000 // [ms] Read the file every 30 min
		//fileUrl: "file:///home/pi/MagicMirror/modules/MMM-backlog/demo.json"
	},

	requiresVersion: "2.1.0",

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
			this.file('node_modules/jquery.tabulator/dist/css/tabulator.css'),
			"MMM-Tabulator.css"
		];
	},

	start: function() {
		console.log("MMM-Tabulator.js: Sending START notification...");
		this.loaded = false;
		this.sendSocketNotification('START', this.config);
	},

	// This is not really needed
	loaded: function(callback) {
		this.finishLoading();
		console.log(this.name + ' is loaded!');
		callback();
	},

	notificationReceived: function(notification, payload, sender) {
		var self = this;
		//if ( notification == "DOM_OBJECTS_CREATED" ) {
		if ( notification == "ALL_MODULES_STARTED" ) {
			//var loadres = self.loadTabulate(this.data);
			var loadres = self.loadTabulate();
			//this.loadTabulate();
			console.log("loadTabulate Result: " + loadres );
			console.log("All DOM\'s created!");
			return true;
		}
		return false;
	},

	getTranslations: function() { return false; }, // Nothing to translate

	getDom: function() {
		var w = document.createElement("div"); // Let w be a "wrapper"
		w.id = "flighttable";

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
//		w.innerHTML = this.data;
		return w;
	},

 	socketNotificationReceived: function(notification, payload) {
    		if (notification === "STARTED") {
			this.updateDom();
		}
		else if (notification === "DATA") {
			console.log("MMM-Tabulator: DATA received!");
			this.loaded = true;
			this.data = payload;
			//this.processData(JSON.parse(payload));
			this.updateDom();
    		}
	},

	loadTabulate: function() {
	//=======================================================================================
	'use strict'

	//var realData = this.data;

	Tabulator.extendExtension("format", "formatters", {
	    ft2mt:function(cell, formatterParams){              // Feet to Meters
	        return  (0.3048*cell.getValue()).toFixed(0);
	    },
	    kn2km:function(cell, formatterParams){              // Knots to Kilometers
	        return  (1.852*cell.getValue()).toFixed(0);
	    },
	    ep2time:function(cell, formatterParams){            // POSIX epoch to hh:mm:ss
	        let date = new Date(cell.getValue());
	        return date.toLocaleString('en-GB', { hour:'numeric', minute:'numeric', second:'numeric', hour12:false } );
	    },
	});

	$("#flighttable").tabulator({
	    height:205,                         // Set height of table, this enables the Virtual DOM and improves render speed
	    //layout:"fitColumns",                // Fit columns to width of table (optional)
	    //headerSort:false,                   // Disable header sorter
	    resizableColumns:false,             // Disable column resize
	    responsiveLayout:true,              // Enable responsive layouts
	    placeholder:"No Data Available",    // Display message to user on empty table
	    initialSort:[                       // Define the sort order:
	        {column:"altitude",     dir:"asc"},     // 1'st
	        //{column:"flight",     dir:"desc"},    // 2'nd
	        //{column:"bearing",    dir:"asc"},     // 3'rd
	    ],
	    columns:[
	        {title:"Flight",        field:"flight",         headerSort:false, sortable:false, responsive:0, align:"left"}, // , width:250},
	        {title:"CallSig",       field:"callsign",       headerSort:false, sortable:false, responsive:3},
	        {title:"From",          field:"origin",         headerSort:false, sortable:false, responsive:0},
	        {title:"To",            field:"destination",    headerSort:false, sortable:false, responsive:0},
	        {title:"Speed",         field:"speed",          headerSort:false, sortable:false, responsive:2, formatter:"kn2km"}, // [km/h]
	        {title:"Bearing",       field:"bearing",        headerSort:false, sortable:false, responsive:1},
	        {title:"Alt [m]",       field:"altitude",       headerSort:false, sortable:false, responsive:0, formatter:"ft2mt", align:"right", sorter:"number"},
	        //{title:"Alt [m]",       field:"altitude",       sortable:true,  responsive:0, align:"right", sorter:"number", mutateType:"data", mutator:ft2met"},
	        // Additional items:
	        {title:"F24id",         field:"id",             headerSort:false, sortable:false, visible:false},
	        {title:"RegID",         field:"registration",   headerSort:false, sortable:false, visible:false},
	        {title:"Model",         field:"model",          headerSort:false, sortable:false, visible:true, responsive:1},
	        {title:"ModeS",         field:"modeSCode",      headerSort:false, sortable:false, visible:false},
	        {title:"Radar",         field:"radar",          headerSort:false, sortable:false, visible:false},
	        {title:"Lat",           field:"latitude",       headerSort:false, sortable:false, visible:false},
	        {title:"Lon",           field:"longitude",      headerSort:false, sortable:false, visible:false},

	        {title:"Time",          field:"timestamp",      headerSort:false, sortable:false, visible:true, responsive:1, formatter:"ep2time"},
	        {title:"RoC [ft/m]",    field:"climb",          headerSort:false, sortable:false, visible:false},
	        {title:"Squawk",        field:"squawk",         headerSort:false, sortable:false, visible:true, responsive:1}, // formatter:"sqCheck"},
	        {title:"isGND",         field:"ground",         headerSort:false, sortable:false, visible:false},
	        {title:"isGlider",      field:"glider",         headerSort:false, sortable:false, visible:false},
	    ],
	});

	var realData = this.data;

	$("#flighttable").tabulator("setData", realData);

	$(window).resize(function(){
		$("#flighttable").tabulator("redraw");
	});
	//=======================================================================================
		return "WIP (Did it work?)";
	}
>>>>>>> master

});
