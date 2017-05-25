var PEG = require("./js/arithmetics.js");
var util = require('util');
var genCode = require("./js/gen-code.js");
var ambito = require ("./js/analisis-ambito.js");
var input = process.argv[2] || "const w = 1, z = 10; var a, b, c; function foo (x, y, z) {const w = 2, z = 20; var l, m, n; function tutu () {const w = 2, z = 20; var h, i, j; j := 5}; function pupu () {const w = 2, z = 20; var h, i, k;  k := 5}; begin y := 2; if a < 2*(2+2) then a := b else b := c; while a < b do a := b; return a end }; a := a + foo(a, 3+3, 55)";
console.log(`Processing <${input}>`);
var r = PEG.parse(input);
//util.inspect
//console.log(r);
console.log(util.inspect(r, false, null))

ambito(r, {});

let js  = genCode(r);
//console.log(js);
