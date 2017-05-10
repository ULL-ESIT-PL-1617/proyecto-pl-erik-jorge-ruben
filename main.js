var PEG = require("./arithmetics.js");
var util = require('util')
var input = process.argv[2] || "var x, squ; function foo (a, b, c) {var a,b,c; a := 2}; begin x := 1;  while x <= 10 do begin call square; ! squ; x := (x + 1) * 2 end ;  if x <= 10 then begin call square; ! squ; x := - x + 1 end else begin x := a (b, 2+2, z) end end";
console.log(`Processing <${input}>`);
var r = PEG.parse(input);
util.inspect
//console.log(r);
console.log(util.inspect(r, false, null))
