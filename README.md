## MagicMirror Module: Tabulator

'MMM-Tabulator' is just a demonstration module for using the [Tabulator]() *npm* package on your MagicMirror. 
*Tabulator* is a very nice tool for producing dynamic HTML tables from various sources, like JSON and XML etc. 
However, although very well documented, the [examples]() are very hard to understand and implement in practice, 
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

![Full](images/MMM-Tabulator.png) 


The flight JSON data shown, was provided by [FlightRadar24](). 


### Installation

Manual Installation

```bash
cd ~/MagicMirror/modules
git clone https://github.com/E3V3A/MMM-Tabulator.git
cd MMM-Tabulator
#npm install
```

Easy Installation [ToDo]

```bash
npm install mmm-tabulator


### Dependencies

This module depend on the following *npm* packages:

```text
    [async](https://github.com/caolan/async)   - for Higher-order functions and common patterns for asynchronous code
    [crypto]()  - `Built-in`: for MD5 file integrity checks and OpenSSL functions
    [http]()    - `Built-in`: for HTTP requests and to make Node.js act as an HTTP server
    [moment]()  - for time/date manipulations
    [tabulator](https://github.com/olifolkerd/tabulator) - for an overkill use of JSON to HTML table generation
```

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

#### Configuration Options

TBA

### 

TBA

