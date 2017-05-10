# Practica 7: Analizador usando PEG [![Build Status](https://travis-ci.org/ULL-ESIT-PL-1617/analizador-usando-peg-erik-jorge-ruben.svg?branch=master)](https://travis-ci.org/ULL-ESIT-PL-1617/analizador-usando-peg-erik-jorge-ruben)


## Alumnos



### Contacto

| Nombre                       | Correo Institucional     | Página Personal                          |
| ---------------------------- | ------------------------ | ---------------------------------------- |
| Jorge Alonso Hernández       | alu0100767803@ull.edu.es | [Jorge](http://alu0100767803.github.io/) |
| Erik Andreas Barreto de Vera | alu0100774054@ull.edu.es | [Erik](https://alu0100774054.github.io/) |
| Rubén Labrador Páez          | alu0100309553@ull.edu.es | [Rubén](https://alu0100309553.github.io/) |



### Perfil

| Nombre                       | Perfil Campus Virtual                    | Perfil Github                            |
| ---------------------------- | ---------------------------------------- | ---------------------------------------- |
| Jorge Alonso Hernández       | [Jorge](https://campusvirtual.ull.es/1617/user/profile.php?id=18914) | [alu0100767803](https://github.com/alu0100767803) |
| Erik Andreas Barreto de Vera | [Erik](https://campusvirtual.ull.es/1617/user/view.php?id=18906&course=1148) | [alu0100774054](https://github.com/alu0100774054) |
| Rubén Labrador Páez          | [Rubén](https://campusvirtual.ull.es/1617/user/view.php?id=9476&course=1148) | [alu0100309553](https://github.com/alu0100309553) |


## Definición de la Práctica

* Pruebas

![](pruebas.png)

*  [Descripción de la práctica](https://casianorodriguezleon.gitbooks.io/ull-esit-1617/content/practicas/practicapegparser.html)

* ### Gramática:

~~~
start
  = block

block
  = (CONST ID CONSTASSIGN NUMBER (COMMA ID CONSTASSIGN NUMBER)* COLON)?
    (VAR ID (COMMA ID)* COLON)?
    (PROCEDURE ID COLON block COLON)*
    (FUNCTION ID LEFTPAR (ID (COMMA ID)*)? RIGHTPAR LEFTBRACKET block RIGHTBRACKET COLON)*
    statement

statement
  = ID ASSIGN value:expression
    / CALL ID
    / Q ID
    / X expression
    / BEGIN statement (COLON statement)* END
    / IF condition THEN statement (ELSE statement)?
    / WHILE condition DO statement

condition
  = ODD expression
    / expression COMPARISON expression

expression
  = (ADDOP)? left:term right:(ADDOP term)*

term
  = factor (MULOP factor)*

factor
  = ID LEFTPAR (expression (COMMA expression)*)? RIGHTPAR
    / ID
    / NUMBER
    / LEFTPAR exp:expression RIGHTPAR

~~~

* ### Ejemplos de código:
* #### Declaraciones:
Las declaraciones se pueden realizar al  comienzo de un bloque de código, dentro de un procedimiento una función o al comiezo del programa.

Se pueden declarar, siempre en este orden:
  * Constantes (const)
  ~~~
  const a = 1, b = 2, c = 3;
  ~~~
  * Variables (var)
  ~~~
  var a, b, c;
  ~~~
  * Procedimientos (procedure)
  ~~~
  procedure procId;
  begin
     a := b + 1;
     b := c
  end
  ~~~
  * Funciones (function)
  ~~~
  function funcId (a, b, c){
    const d = 1, e = 2;
    var f, g, h;
    begin
      f := a + d;
      g := b + e
    end
  }
  ~~~

  * #### Sentencias if:
  Se pueden realizar sentencias if then else.
  ~~~
  if a < 10 then a := 15 else a := 45
  ~~~
  Salida generada:
  ~~~
  node main "if a < 10 then a := 15 else a := 45"Processing <if a < 10 then a := 15 else a := 45>
{ constantes: {},
  variables: {},
  procedimientos: {},
  funciones: {},
  sentencias:
   { type: 'if',
     condition: { type: '<', left: 'a', right: 10 },
     then: { type: 'assign', left: 'a', right: 15 },
     else: { type: 'assign', left: 'a', right: 45 } } }
  ~~~
  * #### Condiciones:
  Se pueden expresar condiciones para la ejecución de sentencias if y bucles while, comparaciones permitidas son:
    * odd
    * <=
    * \>=
    * <
    * >
    * ==

  * #### Asignaciones:
  Las asignaciones se realizan con el símbolo ":="
  ~~~
  node main "a := 2+2"
  Processing <a := 2+2>
  { constantes: {},
    variables: {},
    procedimientos: {},
    funciones: {},
    sentencias:
     { type: 'assign',
       left: 'a',
       right: { type: '+', left: 2, right: 2 } } }
  ~~~
  * #### Bucle:
  Se ha implementado el bulcle while, que debe tener la siguiente sintaxis:
  ~~~
  while a <= 10 do
    begin
      a :=  a + 2;
      b :=  b + 2
    end
  ~~~
  Árbol generado:
  ~~~
  node main "while a <= 10 do begin a := a + 2; b := b + 2 end"
Processing <while a <= 10 do begin a := a + 2; b := b + 2 end>
{ constantes: {},
  variables: {},
  procedimientos: {},
  funciones: {},
  sentencias:
   { type: 'while',
     condition: { type: '<=', left: 'a', right: 10 },
     do:
      { type: 'block',
        code:
         { '1':
            { type: 'assign',
              left: 'a',
              right: { type: '+', left: 'a', right: 2 } },
           '2':
            { type: 'assign',
              left: 'b',
              right: { type: '+', left: 'b', right: 2 } } } } } }

  ~~~

  * #### Funciones
  Declaracion:
  ~~~
  function funcId (a, b, c){
    const d = 1, e = 2;
    var f, g, h;
    begin
      f := a + d;
      g := b + e
    end
  }
  ~~~
  Llamada a la función:
  La función es llamada cuando se indica el id de la misma seguido de los paréntesis con los parámetros en su interior, como parámetros se admite id, números y operaciones.
  ~~~
  a := funcId(2, b, 2+2)
  ~~~

  ~~~
  node main "function funcId (a, b, c){  const d = 1, e = 2;  var f, g, h;  begin    f := a + d;    g := b + e  end }; a := funcId(2, b, 2+2)"
Processing <function funcId (a, b, c){  const d = 1, e = 2;  var f, g, h;  begin    f := a + d;    g := b + e  end }; a := funcId(2, b, 2+2)>
{ constantes: {},
  variables: {},
  procedimientos: {},
  funciones:
   { funcId:
      { constantes: { d: 1, e: 2 },
        variables: { f: null, g: null, h: null },
        procedimientos: {},
        funciones: {},
        sentencias:
         { type: 'block',
           code:
            { '1':
               { type: 'assign',
                 left: 'f',
                 right: { type: '+', left: 'a', right: 'd' } },
              '2':
               { type: 'assign',
                 left: 'g',
                 right: { type: '+', left: 'b', right: 'e' } } } },
        Parametros: { a: null, b: null, c: null } } },
  sentencias:
   { type: 'assign',
     left: 'a',
     right:
      { type: 'functionCall',
        id: 'funcId',
        parametros: { '1': 2, '2': 'b', '3': { type: '+', left: 2, right: 2 } } } } }
  ~~~
