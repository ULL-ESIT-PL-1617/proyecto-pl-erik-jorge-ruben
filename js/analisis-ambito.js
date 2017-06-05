
module.exports = function ambito (raiz, oldSymbols){
  var types = ["FunctionDec", "FunctionCall", "CodeBloc", "StatementBloc", "IfStatement", "WhileStatement", "ReturnStatement", "BinOp", "ComparissonOp", "ParExp"]
  //console.log("----------------entro");
  var sym = {};
  Object.assign(sym, oldSymbols);
  for (var key in raiz){
    //console.log(key);
    if (key == "symbolTable" || key == "params"){
      Object.assign(sym, raiz[key]);
      //console.log(sym);
    }
    if (raiz[key].constructor.name == "Leaf" && raiz[key].type == "ID"){
      if (sym [raiz[key].value]){
        //console.log("Está en la tabla de simbolos");
      } else {
        //console.log("no está en la tabla de simbolos");
        throw "No se ha declarado la variable " + raiz[key].value ;
      }
    } else if (types.includes(raiz[key].constructor.name) || key == "symbolTable" || key == "parametros") {
      //console.log("Entro por " + key);
      ambito (raiz[key], sym);
    }
    if (raiz[key].constructor.name=="FunctionCall"){
      if (Object.keys(raiz[key].parametros).length != Object.keys(sym[raiz[key].id.value].params).length) {
        throw "Número de paramtros incorrectos en la llamada a la función: " + raiz[key].id.value ;
      }
    }

  }
};
