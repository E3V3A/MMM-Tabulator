/* -----------------------------------------------------------
 * Module:       MMM-Tabulator
 * Author:       E:V:A
 * License:      MIT
 * Date:         2018-02-12
 * Version:      1.0
 * Description:  A MagicMirror Demo module to use Tabulator
 * URL:          https://
 * -----------------------------------------------------------
 */

Module.register("MMM-Tabulator", {
	defaults: {
		updateInterval: 60000,
		retryDelay: 5000
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	start: function() {
		var self = this;
		var dataRequest = null;
		var dataNotification = null;

		// Flag to check if module is loaded
		this.loaded = false;

		// Schedule the update timer
		this.getData();
		setInterval(function() {
			self.updateDom();
		}, this.config.updateInterval);
	},

	getData: function() {
		var self = this;

		var urlApi = "https://jsonplaceholder.typicode.com/posts/1";
		var retry = true;

		var dataRequest = new XMLHttpRequest();
		dataRequest.open("GET", urlApi, true);
		dataRequest.onreadystatechange = function() {
			console.log(this.readyState);
			if (this.readyState === 4) {
				console.log(this.status);
				if (this.status === 200) {
					self.processData(JSON.parse(this.response));
				} else if (this.status === 401) {
					self.updateDom(self.config.animationSpeed);
					Log.error(self.name, this.status);
					retry = false;
				} else {
					Log.error(self.name, "Could not load data.");
				}
				if (retry) {
					self.scheduleUpdate((self.loaded) ? -1 : self.config.retryDelay);
				}
			}
		};
		dataRequest.send();
	},

	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}
		nextLoad = nextLoad ;
		var self = this;
		setTimeout(function() {
			self.getData();
		}, nextLoad);
	},

	getDom: function() {
		var self = this;

		var wrapper = document.createElement("div");
		wrapper.idName = 'flighttable'; //E3V3A
		if (this.dataRequest) {
			var wrapperDataRequest = document.createElement("div");
			// check format https://jsonplaceholder.typicode.com/posts/1
			wrapperDataRequest.innerHTML = this.dataRequest.title;
			var labelDataRequest = document.createElement("label");
			labelDataRequest.innerHTML = "Title";

			wrapper.appendChild(labelDataRequest);
			wrapper.appendChild(wrapperDataRequest);
		}

		// Data from helper
		if (this.dataNotification) {
			var wrapperDataNotification = document.createElement("div");
			// translations  + datanotification
			wrapperDataNotification.innerHTML =  "Update" + ": " + this.dataNotification.date;
			wrapper.appendChild(wrapperDataNotification);
		}
		return wrapper;
	},

/*
"node_modules/jquery/dist/jquery.min.js",
"node_modules/jquery-ui-dist/jquery-ui.min.js",
"node_modules/jquery-ui-dist/jquery-ui.css",
"node_modules/jquery.tabulator/dist/js/tabulator.js",
"node_modules/jquery.tabulator/dist/css/tabulator.css",
*/

	//app.use('/node_modules', express.static(__dirname + '/node_modules'));

	getScripts: function() {
		return [
/*			"modules/MMM-tabulator/node_modules/jquery/dist/jquery.min.js",
			"node_modules/jquery-ui-dist/jquery-ui.min.js",
			"node_modules/jquery.tabulator/dist/js/tabulator.js",
*/		];
	},

	getStyles: function () {
		return [
/*			"node_modules/jquery-ui-dist/jquery-ui.css",
			"node_modules/jquery.tabulator/dist/css/tabulator.css",
*/			"MMM-Tabulator.css",
		];
	},

	processData: function(data) {
		var self = this;
		this.dataRequest = data;
		if (this.loaded === false) { self.updateDom(self.config.animationSpeed) ; }
		this.loaded = true;
		this.sendSocketNotification("MMM-Tabulator-NOTIFICATION_TEST", data);
	},

	// socketNotificationReceived from helper
	socketNotificationReceived: function (notification, payload) {
		if(notification === "MMM-Tabulator-NOTIFICATION_TEST") {
			// set dataNotification
			this.dataNotification = payload;
			this.updateDom();
		}
	},
});
