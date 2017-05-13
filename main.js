var PEG = require("./arithmetics.js");
var util = require('util');
var genCode = require("./gen-code.js");
var input = process.argv[2] || "function foo (x, y, z) {begin a := 2; if a < 2+2 then a := b else b := c end}; a := 5";
console.log(`Processing <${input}>`);
var r = PEG.parse(input);
//util.inspect
//console.log(r);
console.log(util.inspect(r, false, null))
let js  = genCode(r);
console.log(js);
