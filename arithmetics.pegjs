{

var prebSymbolTable = null;

  var { Node, BinOp, Comma, Leaf, FunctionDec, CodeBloc, IfStatement, WhileStatement, ParExp, FunctionCall, StatementBloc, ComparissonOp } = require('./node.js');
  let prevSymbolTable = null;
  var buildTree = function(left,rest) {
     if (rest.length == 0) return left;
     return rest.reduce(
        (tree, [ operator, operand]) => {
          tree = new BinOp({type:operator, left: tree, right: operand});
          return tree;
        },
        left
     );
  };
}


start
  = b:block {return b}

block
  = constant:(CONST ID CONSTASSIGN NUMBER (COMMA ID CONSTASSIGN NUMBER)* COLON)?
    vars:(VAR ID (COMMA ID)* COLON)?
    funct: (FUNCTION ID LEFTPAR (ID (COMMA ID)*)? RIGHTPAR LEFTBRACKET block RIGHTBRACKET COLON)*
    est:statement
        {
          var bloque = new CodeBloc();
          let symbolTable = {};
          symbolTable.father = prevSymbolTable;
          if (constant){
            symbolTable [constant[1].value] = {type: "const", value: constant [3]};
            if (constant[4]){
              constant[4].forEach( function (element){
                symbolTable [element[1].value] = {type: "const", value: element [3]};
              });
            }
          }

          if (vars){
            symbolTable [vars[1].value] = {type: "var", value: null};
            if (vars[2]){
              vars[2].forEach( function (element){
                symbolTable [element [1].value] = {type: "var", value: null};
              } );
            }
          }
          prevSymbolTable = symbolTable;
          funct.forEach ( function (element){
            var parametros = {};
            if (element [3]){
              parametros [element [3] [0].value] = null;
              element [3][1].forEach (function (x){
                parametros [x[1].value]= null;
              });
            }
            symbolTable [element[1].value] = new FunctionDec({
              name: element[1].value,
              params: parametros,
              code: element[6]
            });
          });
          prevSymbolTable = symbolTable.father;
          bloque.symbolTable = symbolTable;

          bloque.code = est;

          return bloque;
        }

statement
  = id:ID assign:ASSIGN value:expression {return new BinOp ({type: assign, left: id, right: value});}
  / q:Q id:ID {return {type : q, id:id}}
  / x:X exp:expression {return {type : x, expresion:exp}}
  / BEGIN first:statement next:(COLON statement)* END { var stats = {}
                                                        var counter = 2;
                                                        stats ["1"] = first;
                                                        next.forEach((x)=>{stats [""+counter] = x[1];
                                                          counter++;
                                                        });
                                                        return new StatementBloc (stats)
                                                      }

  / IF cond:condition THEN th:statement els:(ELSE statement)? { if (els){
                                                                els = els[1];
                                                              }
                                                              return new IfStatement( { condition: cond,
                                                              then: th,
                                                              else: els });}
  / WHILE cond:condition DO d:statement { return new WhileStatement({condition: cond, do: d});}

  condition
    = odd:ODD right:expression { return new ComparissonOp( {type: odd, right: right, left: null })}
    / left:expression cond:COMPARISON right:expression {return new ComparissonOp({type: cond, left: left, right: right})}

  expression
      = signo:(ADDOP)? left:term right:(ADDOP term)* {  if (signo == "-"){
                                                          left = "-"+left;
                                                          left = +left;
                                                        }
                                                        return buildTree(left, right);
                                                      }

  term
      = left:factor right:(MULOP factor)* {return buildTree(left, right);}

  factor
      = id:ID LEFTPAR params:(expression (COMMA expression)*)? RIGHTPAR { var parametros = {};
                                                                          if (params){
                                                                            parametros [0] = params [0];
                                                                            var counter = 1;
                                                                            params [1].forEach((x)=>{
                                                                              parametros [counter] = x [1]
                                                                              counter++;
                                                                            });
                                                                          }
                                                                            return new FunctionCall({id:id, parametros: parametros})
                                                                          }
      / ID
      / NUMBER
      / LEFTPAR exp:expression RIGHTPAR  {return new ParExp ({exp:exp });}
_ = $[ \t\n\r]*
ADDOP = PLUS / MINUS
MULOP = MULT / DIV
PLUS = _"+"_ {return '+';}
MINUS = _"-"_ {return '-';}
MULT = _"*"_ {return "*";}
DIV = _"/"_ {return "/";}
LEFTPAR = _"("_
RIGHTPAR = _")"_
NUMBER = _ digits:$[0-9]+ _ { return new Leaf({type:'NUM', value: digits});}
ID = _ id:$([a-z_]i$([a-z0-9_]i*)) _ { return new Leaf({type:'ID',  value: id});}
CONSTASSIGN = _'=' _
ASSIGN = _ ':=' _{return ":=";}
COMMA = _","_

FUNCTION = _"function"_
LEFTBRACKET = _"{"_
RIGHTBRACKET = _"}"_
CONST = _"const"_
VAR = _"var"_
BEGIN = _"begin"_
END = _"end"_
IF = _"if"_
THEN = _"then"_
ELSE = _"else"_
WHILE = _"while"_
DO = _"do"_
COMPARISON = _ op:("<="/">="/"<"/">"/"==")_ {return op;}
COLON = _";"_
Q = _"?"_ {return "?";}
X = _"!"_{return "!";}
ODD = _"odd"_{return "odd";}
