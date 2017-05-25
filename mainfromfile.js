#!/usr/bin/env node
var util = require('util');
var fs = require('fs');
var PEG = require("./js/arithmetics.js");
var genCode = require("./js/gen-code.js");
var ambito = require ("./js/analisis-ambito.js");

var fileName = process.argv[2] || './inputs/input1.pl';

fs.readFile(fileName, 'utf8', function (err,input) {
  if (err) { return console.log(err); }

  console.log(`Processing <${input}>`);
  var r = PEG.parse(input);
  console.log(util.inspect(r, {depth: null}));
  ambito(r, {});
  let js  = genCode(r);
  console.log(js);
});
