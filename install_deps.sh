#!/bin/bash

# Local package Installation:
# This require a working package.json
if ! [ -f ./package.json ]; then
	echo "Error: No package.json found!" 
	exit 1
fi

echo "Installing jquery packages locally:"

npm install jquery --save
npm install jquery-ui-dist --save
npm install jquery.tabulator --save

echo "Required jquery packages successfully installed"
exit 1

