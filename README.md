# Increment Fitness
### _Web Client_

> Single Page Progressive Web Application for Increment Fitness.  

## Index
- [README.md](README.md)
- [package.json](package.json)
    - specifies dependencies and scripts for npm 
- [webpack.config.js](webpack.config.js)
    - specifies configuration for webpack bundling
- [src](src)
    - contains source code written in ECMAscript 2015
    - not included in production
- [lib](lib)
    - contains code transpiled by Babel
    - not included in development
- [node_modules](node_modules)
    - contains node dependencies
    - not included in development
- [build/bundle.js](build/bundle.js)
    - contains all the front end dependencies bundled and packed by webpack

## Installation
1. install [node](https://nodejs.org/en/) (version ^9.5)
2. install nodemon globally `npm install -g nodemon`
3. install dependencies `npm install`
4. add google chrome [react devtools extension](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi/)

## Running
1. transpile `npm run build`
2. run webpack `npm run webpack`
3. start the server `npm start`
4. visit `localhost:8080` in your browser
