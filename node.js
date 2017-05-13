const util = require("util");

class Node {
  constructor(node) {
    Object.assign(this,node);
  }
};

class FunctionDec extends Node{
  translate() {
    var params = "";
    var counter = 1;
    for ( var par in this.params){
      if (counter == 1){
        params += par;
      } else {
        params += "," + par;
      }
      counter++;
    }
    return "function " + this.name + "("+ params +")" + "{ \n" + this.code.translate() + " }";
  }

};

class FunctionCall extends Node{
  translate() {
    return this.id + "()";
   }
};

class CodeBloc extends Node {
  translate(){
    var retVar = "";
    for (var key in this.symbolTable){
      if (this.symbolTable[key]){
        retVar += this.symbolTable[key].translate();
      }
    }
    retVar += this.code.translate();
    return retVar;
  }
};

class StatementBloc extends Node {
  translate(){
    var retVar = "";
    for (var key in this){
      console.log(this[key]);
    }
    return retVar;
  }
};

class IfStatement extends Node {
  translate(){
    return "No hago nada de momento";
  }
};

class WhileStatement extends Node {
  translate(){
    return "No hago nada de momento";
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
    console.log("soy una comparissonOp");
  }
}

class Comma extends Node{
  translate() {
    return this.left.translate() + ",\n  " + this.right.translate();
  }
};

class Leaf extends Node{
  translate() {
    //console.log("visiting: "+util.inspect(this, {depth:null}))
    var trans = (this.type == 'ID')? `sym.${this.value}`: this.value;
    return trans;
  }
};

Array.prototype.translate = function(j) {
  return this.map((t) => t.translate()).join(j || '');
};

class ParExp extends Node{
  translate(){
    console.log("No hago nada de momento");
  }
}

module.exports = {
  Node: Node,
  BinOp: BinOp,
  Comma: Comma,
  Leaf: Leaf,
  FunctionDec: FunctionDec,
  FunctionCall: FunctionCall,
  CodeBloc: CodeBloc,
  IfStatement: IfStatement,
  WhileStatement: WhileStatement,
  ParExp: ParExp,
  StatementBloc: StatementBloc,
  ComparissonOp: ComparissonOp
};
