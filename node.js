const util = require("util");

class Node {
  constructor(node) {
    Object.assign(this,node);
  }
};

class FunctionDec extends Node{
  translate() {
    console.log("Soy una declaración de función");
    return this.code.translate()
  }

};

class FunctionCall extends Node{
  translate() {
    console.log("No hago nada de momento");
  }
};

class CodeBloc extends Node {
  translate(){
    console.log("soy un bloque de codigo");
  }
};

class StatementBloc extends Node {
  translate(){
    console.log("soy un bloque de statement");
  }
};

class IfStatement extends Node {
  translate(){
    console.log("No hago nada de momento");
  }
};

class WhileStatement extends Node {
  translate(){
    console.log("No hago nada de momento");
  }
}

class BinOp extends Node{
  translate() {
    //console.log("visiting: "+util.inspect(this, {depth:1}))
    return this.left.translate() + this.type + this.right.translate();
  }
};

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
  StatementBloc: StatementBloc
};
