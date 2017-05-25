var chai = require('chai');
var PEG = require('../js/arithmetics.js');
var util = require('util');
var expect = chai.expect;

////// Esto producia el fallo
/*var blanket = require("blanket")({
   /* options are passed as an argument object to the require statement 
   "pattern": "/"
});*/

function removeSpaces(str){
  return str.replace(/\s/g,'');;
}

describe("<---Test para comprobar que se cumple la salida esperada--->", function () {
  it("# var a; a := 2 + 2", function(){
    var tree = `
                {"symbolTable":{"a":{"name":"a","value":null}},"code":{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"+","left":{"type":"NUM","value":"2"},"right":{"type":"NUM","value":"2"}}}}
                `;
    tree = removeSpaces(tree);
     var res = removeSpaces(JSON.stringify(PEG.parse('var a; a := 2 + 2'), null, 2))
    expect(res).to.equal(tree);
  });
  
  it("# var a; if a < 10 then a := 15 else a := 45", function(){
    var tree = `
                {"symbolTable":{},"code":{"condition":{"type":"<","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":"10"}},"then":{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":"15"}},"else":{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":"45"}}}}
                `;
    tree = removeSpaces(tree);
    var res = removeSpaces(JSON.stringify(PEG.parse('if a < 10 then a := 15 else a := 45'), null, 2))
    expect(res).to.equal(tree);
  });
  it("# while a <= 10 do begin a := a + 2; b := b + 2 end", function(){
    var tree = `
                {"symbolTable":{},"code":{"condition":{"type":"<=","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":"10"}},"do":{"1":{"type":"=","left":{"type":"ID","value":"a"},"right":{"type":"+","left":{"type":"ID","value":"a"},"right":{"type":"NUM","value":"2"}}},"2":{"type":"=","left":{"type":"ID","value":"b"},"right":{"type":"+","left":{"type":"ID","value":"b"},"right":{"type":"NUM","value":"2"}}}}}}
                `;
    tree = removeSpaces(tree);
    var res = removeSpaces(JSON.stringify(PEG.parse('while a <= 10 do begin a := a + 2; b := b + 2 end'), null, 2))
    expect(res).to.equal(tree);
  });
  it("# function funcId (a, b, c){  const d = 1, e = 2;  var f, g, h;  begin    f := a + d;    g := b + e  end }; a := funcId(2, b, 2+2)", function(){
    var tree = `
                {"symbolTable":{"funcId":{"name":"funcId","params":{"a":{"name":"a","value":null},"b":{"name":"b","value":null},"c":{"name":"c","value":null}},"code":{"symbolTable":{"d":{"name":"d","value":{"type":"NUM","value":"1"}},"e":{"name":"e","value":{"type":"NUM","value":"2"}},"f":{"name":"f","value":null},"g":{"name":"g","value":null},"h":{"name":"h","value":null}},"code":{"1":{"type":"=","left":{"type":"ID","value":"f"},"right":{"type":"+","left":{"type":"ID","value":"a"},"right":{"type":"ID","value":"d"}}},"2":{"type":"=","left":{"type":"ID","value":"g"},"right":{"type":"+","left":{"type":"ID","value":"b"},"right":{"type":"ID","value":"e"}}}}}}},"code":{"type":"=","left":{"type":"ID","value":"a"},"right":{"id":{"type":"ID","value":"funcId"},"parametros":{"0":{"type":"NUM","value":"2"},"1":{"type":"ID","value":"b"},"2":{"type":"+","left":{"type":"NUM","value":"2"},"right":{"type":"NUM","value":"2"}}}}}}
                `;
    tree = removeSpaces(tree);
    var res = removeSpaces(JSON.stringify(PEG.parse('function funcId (a, b, c){  const d = 1, e = 2;  var f, g, h;  begin    f := a + d;    g := b + e  end }; a := funcId(2, b, 2+2)'), null, 2))
    expect(res).to.equal(tree);
  });
  
});