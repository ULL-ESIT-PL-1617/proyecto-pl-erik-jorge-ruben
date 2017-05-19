var PEG = require("./arithmetics.js");
var util = require('util');
var genCode = require("./gen-code.js");
var input = process.argv[2] || "const w = 1, z = 20; var a, b, c; function foo (x, y, z) {var l, m, n; begin a := 2; if a < 2*(2+2) then a := b else b := c; while a < b do a := b; return a end }; a := a + foo(a, 3+3, 55)";
console.log(`Processing <${input}>`);
var r = PEG.parse(input);
//util.inspect
//console.log(r);
console.log(util.inspect(r, false, null))
let js  = genCode(r);
console.log(js);
