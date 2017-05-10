{
var tree = function(f, r) {
    if (r.length > 0) {
      var last = r.pop();
      var result = {
        type:  last[0],
        left: tree(f, r),
        right: last[1]
      };
    }
    else {
      var result = f;
    }
    return result;
  }
}
start
  = b:block {return b;}

block
  = constant:(CONST ID CONSTASSIGN NUMBER (COMMA ID CONSTASSIGN NUMBER)* COLON)?
    vars:(VAR ID (COMMA ID)* COLON)?
    proc:(PROCEDURE ID COLON block COLON)*
    funct: (FUNCTION ID LEFTPAR (ID (COMMA ID)*)? RIGHTPAR LEFTBRACKET block RIGHTBRACKET COLON)*
    est:statement
        { var bloque = {};
          var constantes = {};
          if (constant){
            constantes [constant[1]] = constant [3];
            if (constant[4]){
              constant[4].forEach( function (element){
                constantes [element[1]] = element [3];
              });
            }
          }

          var variables = {};
          if (vars){
            variables [vars[1]] = null;
            if (vars[2]){
              vars[2].forEach( function (element){
                variables [element [1]] = null;
              } );
            }
          }
          var procedimientos = {};
          proc.forEach ( function (element){
            procedimientos [element[1]] = element[3];
          });
          var funciones = {};
          funct.forEach ( function (element){
            funciones [element[1]] = element[6];
            var parametros = {};
            if (element [3]){
              parametros [element [3] [0]] = null;
              element [3][1].forEach (function (x){
                parametros [x[1]] = null;
              });
            }
            funciones [[element[1]]] ["Parametros"] = parametros;
          });
          bloque ["constantes"] = constantes;
          bloque ["variables"] = variables;
          bloque ["procedimientos"] = procedimientos;
          bloque ["funciones"] = funciones;
          bloque ["sentencias"] = est;
          return bloque;
        }

statement
  = id:ID assign:ASSIGN value:expression {return {type: assign, left: id, right: value }}
  / call:CALL id:ID {return {type: call, procedimiento: id }}
  / q:Q id:ID {return {type : q, id:id}}
  / x:X exp:expression {return {type : x, expresion:exp}}
  / BEGIN first:statement next:(COLON statement)* END { var stats = {}
                                                        var counter = 2;
                                                        stats ["1"] = first;
                                                        next.forEach((x)=>{stats [""+counter] = x[1];
                                                          counter++;
                                                        });
                                                        return {type: "block", code: stats}
                                                      }
  / IF cond:condition THEN th:statement els:(ELSE statement)? { if (els){
                                                                els = els[1];
                                                              }
                                                              return {type: "if",
                                                              condition: cond,
                                                              then: th,
                                                              else: els }}
  / WHILE cond:condition DO d:statement { return {type:"while", condition: cond, do: d};}

condition
  = odd:ODD right:expression { return {type: odd, right: right }}
  / left:expression cond:COMPARISON right:expression {return {type: cond, left: left, right: right}}

expression
    = signo:(ADDOP)? left:term right:(ADDOP term)* {  if (signo == "-"){
                                                        left = "-"+left;
                                                      }
                                                      return tree(left, right);
                                                    }

term
    = left:factor right:(MULOP factor)* {return tree(left, right);}

factor
    = id:ID LEFTPAR params:(expression (COMMA expression)*)? RIGHTPAR { var parametros = {};
                                                                        if (params){
                                                                          parametros ["1"] = params [0];
                                                                          var counter = 2;
                                                                          params [1].forEach((x)=>{
                                                                            parametros [""+counter] = x [1]
                                                                            counter++;
                                                                          });
                                                                        }

                                                                        return {type: "functionCall", id:id, parametros: parametros}
                                                                        }
    / ID
    / NUMBER
    / LEFTPAR exp:expression RIGHTPAR  {return {type: "parentesis", value:exp }}

_ = $[ \t\n\r]*
ADDOP = PLUS / MINUS
MULOP = MULT / DIV
PLUS = _"+"_ {return '+';}
MINUS = _"-"_ {return '-';}
MULT = _"*"_ {return "*";}
DIV = _"/"_ {return "/";}
LEFTPAR = _"("_
RIGHTPAR = _")"_
NUMBER = _ digits:$[0-9]+ _ { return parseInt(digits, 10); }
ID = _ id:$([a-z_]i$([a-z0-9_]i*)) _ {return id; }
CONSTASSIGN = _'=' _
ASSIGN = _ ':=' _{return ":=";}
COMMA = _","_

FUNCTION = _"function"_
LEFTBRACKET = _"{"_
RIGHTBRACKET = _"}"_
CONST = _"const"_
VAR = _"var"_
PROCEDURE = _"procedure"_
CALL = _"call"_ {return "call";}
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
