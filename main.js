var PEG = require("./arithmetics.js");
var util = require('util');
var genCode = require("./gen-code.js");
var input = process.argv[2] || "var a, b, c; function foo (x, y, z) {var u,v,w; a := 2}; a := foo (b, 2+2, z)";
console.log(`Processing <${input}>`);
var r = PEG.parse(input);
//util.inspect
//console.log(r);
console.log(util.inspect(r, false, null))
let js  = genCode(r);
console.log(js);
