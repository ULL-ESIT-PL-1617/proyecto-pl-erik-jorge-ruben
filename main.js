var PEG = require("./js/arithmetics.js");
var util = require('util');
var genCode = require("./js/gen-code.js");
var input = process.argv[2] || "const w = 1, z = 10; var a, b, c; function foo (x, y, z) {const w = 2, z = 20; var l, m, n; function tutu () {const w = 2, z = 20; var h, i, j; a := 5}; begin probandoesto := 2; if a < 2*(2+2) then a := b else b := c; while a < b do a := b; return a end }; a := a + foo(a, 3+3, 55)";
console.log(`Processing <${input}>`);
var r = PEG.parse(input);
//util.inspect
//console.log(r);
console.log(util.inspect(r, false, null))

var ambito = function (raiz, oldSymbols){
  console.log("entro");
  var sym = oldSymbols;
  //Object.assign(sym, solSymbols);
  for (var key in raiz){
    console.log(raiz[key].constructor.name);
    if (key == "symbolTable"){
      Object.assign(sym, raiz[key]);
    } else if (raiz[key].constructor.name == "Leaf" && raiz[key].type == "ID"){
      if (sym [raiz[key].value]){
        console.log("Está en la tabla de simbolos");
      } else {
        console.log("no está en la tabla de simbolos");
        throw "No se ha declarado la variable " + raiz[key].value ;
      }
    }
    if (key == "code" || key == "symbolTable" || raiz[key].constructor.name == "FunctionDec"){
      ambito (raiz[key], sym);
    }

    //ambito (raiz[key], sym);
  }
}
ambito(r, {});

let js  = genCode(r);
console.log(js);
