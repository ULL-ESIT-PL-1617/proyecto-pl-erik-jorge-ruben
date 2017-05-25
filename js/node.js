const util = require("util");

/**
 *  Clase que construye un nodo.
 */
class Node {
  constructor(node, symbols) {
    Object.assign(this,node);
    //if (symbols && this.code.symbolTable){
    //  var temp = {};
    //  Object.assign(temp, symbols);
    //  Object.assign(temp, this.code.symbolTable);
    //  this.code.allSymbols = temp;
    //}
  }
};

/**
 * Clase que traduce las declaraciones de variables de PL0 a JavaScript.
 */
class VarDec extends Node {
  translate() {
    return "var " + this.name + ";"
  }
}

/**
 * Clase que traduce las declaraciones de constantes de PL0 a JavaScript.
 */
class ConstDec extends Node {
  translate(){
    return "const " + this.name + " = " + this.value.value + ";"
  }
}

class ParamDec extends Node {
  translate(){
    return this.name
  }
}

/**
 * Clase que traduce una función PL0 a JavaScript.
 */
class FunctionDec extends Node{
  translate() {
    var params = "";
    var counter = 1;
    for ( var par in this.params){
      if (counter == 1){
        params += this.params[par].translate();
      } else {
        params += "," + this.params[par].translate();
      }
      counter++;
    }
    return "function " + this.name + "("+ params +")" + "{ \n" + this.code.translate() + " }";
  }

};

/**
 * Clase que traduce una llamada a una función en PL0 a JavaScript.
 */
class FunctionCall extends Node{
  translate() {
    var parametros = "";
    var counter = 1;
    for (var key in this.parametros){
      if (counter == 1){
        parametros += this.parametros[key].translate();
      } else {
        parametros += ", " + this.parametros[key].translate();
      }
      counter++;

    }
    return this.id.value + "("+ parametros +")";
   }
};

/**
 * Clase que traduce un bloque de código en PL0 a un bloque de código en JavaScript.
 */
class CodeBloc extends Node {

  translate(){
    var retVar = "";
    for (var key in this.symbolTable){
      if (this.symbolTable[key] && key != "father"){
        retVar += this.symbolTable[key].translate();
      }
    }
    retVar += this.code.translate();
    return retVar;
  }
};

/**
 *
 */
class StatementBloc extends Node {
  translate(){
    var retVar = "";
    for (var key in this){
      retVar += this[key].translate() + ";\n"
    }
    return retVar;
  }
};

class IfStatement extends Node {
  translate(){
    return "if ("+ this.condition.translate() + "){" +
      this.then.translate() + "} else {" + this.else.translate() + "}";
  }
};

class WhileStatement extends Node {
  translate(){
    return "while (" + this.condition.translate() + "){" +
      this.do.translate() + "}";
  }
}

class ReturnStatement extends Node {
  translate(){
    return "return " + this.value.translate() + ";"
  }
}

class BinOp extends Node{
  translate() {
    //console.log("visiting: "+util.inspect(this, {depth:1}))
    return this.left.translate() + this.type + this.right.translate();
  }
};

class ComparissonOp extends Node {
  translate() {
    return this.left.translate() + this.type + this.right.translate();
  }
}


class Leaf extends Node{
  translate() {
    //console.log("visiting: "+util.inspect(this, {depth:null}))
    //var trans = (this.type == 'ID')? `sym.${this.value}`: this.value;
    //var trans = (this.type == 'ID')? `${this.value}`: this.value;


    //return trans;
    return this.value;
  }
};

Array.prototype.translate = function(j) {
  return this.map((t) => t.translate()).join(j || '');
};

class ParExp extends Node{
  translate(){
    return "(" + this.exp.translate() + ")";
  }
}

module.exports = {
  Node: Node,
  BinOp: BinOp,
  Leaf: Leaf,
  FunctionDec: FunctionDec,
  FunctionCall: FunctionCall,
  CodeBloc: CodeBloc,
  IfStatement: IfStatement,
  WhileStatement: WhileStatement,
  ParExp: ParExp,
  StatementBloc: StatementBloc,
  ComparissonOp: ComparissonOp,
  VarDec: VarDec,
  ConstDec: ConstDec,
  ParamDec: ParamDec,
  ReturnStatement: ReturnStatement
};
