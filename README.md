## MagicMirror Module: Tabulator

`MMM-Tabulator` is just a demonstration module for using the [Tabulator](http://tabulator.info/) *npm* package on your MagicMirror. 
*Tabulator* is a very nice tool for producing dynamic HTML tables from various sources, like JSON and XML etc. 
However, although very well documented, the [examples](http://tabulator.info/examples/) are very hard to understand and implement in practice, 
for non-experts. 

**Why should I use Tabulator?**

* Very flexible for manipulating all aspects of table data
* Can sort table columns in several ways and in multiple stages
* Can use graphics in tables
* Can easily enable/disable various table items
* Help reduce all the clutter of HTML generating JS code 
* Very well used and maintained repository


**Why I should not use Tabulator for my MM:**

* Is totally overkill for showing small and simple tables  
* Is a very large library, easily bloating your MMMs and slowing down load times
* Is also dependent on:  jquery, jqeuery-ui


![Full](demo1.png)



The flight JSON data shown, was provided by [FlightRadar24](https://www.flightradar24.com/). 


### Installation

Manual Installation

```bash
cd ~/MagicMirror/modules
git clone https://github.com/E3V3A/MMM-Tabulator.git
cd MMM-Tabulator

chmod 755 install_deps.sh
# To locally install: jquery, jquery-ui and tabulator, do:
./install_deps.sh

# ToDo:
#npm install
```

Easy Installation [ToDo]

```bash
npm install mmm-tabulator
```

### Dependencies [WIP]

This module depend on the following *npm* packages:


* [jquery]()  - for xxxx
* [jquery-ui]()  - for xxxx
* [tabulator](https://github.com/olifolkerd/tabulator) - for an overkill use of JSON to HTML table generation


These are also listed in the `package.json` file and should be installed automatically when using *npm*.
However, those may in turn require other packages. 


### Configuration 

Add the module to the modules array in the `config/config.js` file by adding the following section. 
You can change this configuration later when you see this works:

```javascript
{
	module: 'MMM-Tabulator',
	header: 'Tabulator Demo',
	position: 'top_left',
	config: {
		maxItems: 10,
	}
},
...
```

#### Configuration Options

TBA

### License

MIT



