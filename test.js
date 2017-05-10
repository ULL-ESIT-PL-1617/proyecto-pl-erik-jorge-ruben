var chai = require('chai');
var PEG = require('./arithmetics.js');
var expect = chai.expect;
var blanket = require("blanket")({
   /* options are passed as an argument object to the require statement */
   "pattern": "/"
});

function removeSpaces(str){
  return str.replace(/\s/g,'');;
}

describe("<---Test para comprobar que se cumple la salida esperada--->", function () {
  it("# a := 2 + 2", function(){
    var tree = `
                {"constantes":{},"variables":{},"procedimientos":{},"funciones":{},"sentencias":{"type":":=","left":"a","right":{"type":"+","left":2,"right":2}}}
                `;
    tree = removeSpaces(tree);
    var res = removeSpaces(JSON.stringify(PEG.parse('a := 2 + 2'), null, 2))
    expect(res).to.equal(tree);
  });
  
  it("# if a < 10 then a := 15 else a := 45", function(){
    var tree = `
                {"constantes":{},"variables":{},"procedimientos":{},"funciones":{},"sentencias":{"type":"if","condition":{"type":"<","left":"a","right":10},"then":{"type":":=","left":"a","right":15},"else":{"type":":=","left":"a","right":45}}}
                `;
    tree = removeSpaces(tree);
    var res = removeSpaces(JSON.stringify(PEG.parse('if a < 10 then a := 15 else a := 45'), null, 2))
    expect(res).to.equal(tree);
  });
  it("# while a <= 10 do begin a := a + 2; b := b + 2 end", function(){
    var tree = `
                {"constantes":{},"variables":{},"procedimientos":{},"funciones":{},"sentencias":{"type":"while","condition":{"type":"<=","left":"a","right":10},"do":{"type":"block","code":{"1":{"type":":=","left":"a","right":{"type":"+","left":"a","right":2}},"2":{"type":":=","left":"b","right":{"type":"+","left":"b","right":2}}}}}}
                `;
    tree = removeSpaces(tree);
    var res = removeSpaces(JSON.stringify(PEG.parse('while a <= 10 do begin a := a + 2; b := b + 2 end'), null, 2))
    expect(res).to.equal(tree);
  });
  it("# function funcId (a, b, c){  const d = 1, e = 2;  var f, g, h;  begin    f := a + d;    g := b + e  end }; a := funcId(2, b, 2+2)", function(){
    var tree = `
                {"constantes":{},"variables":{},"procedimientos":{},"funciones":{"funcId":{"constantes":{"d":1,"e":2},"variables":{"f":null,"g":null,"h":null},"procedimientos":{},"funciones":{},"sentencias":{"type":"block","code":{"1":{"type":":=","left":"f","right":{"type":"+","left":"a","right":"d"}},"2":{"type":":=","left":"g","right":{"type":"+","left":"b","right":"e"}}}},"Parametros":{"a":null,"b":null,"c":null}}},"sentencias":{"type":":=","left":"a","right":{"type":"functionCall","id":"funcId","parametros":{"1":2,"2":"b","3":{"type":"+","left":2,"right":2}}}}}
                `;
    tree = removeSpaces(tree);
    var res = removeSpaces(JSON.stringify(PEG.parse('function funcId (a, b, c){  const d = 1, e = 2;  var f, g, h;  begin    f := a + d;    g := b + e  end }; a := funcId(2, b, 2+2)'), null, 2))
    expect(res).to.equal(tree);
  });
  
});