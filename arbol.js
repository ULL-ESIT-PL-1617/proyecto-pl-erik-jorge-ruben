CodeBloc {
  symbolTable:
   { father: null,
     w: ConstDec { name: 'w', value: Leaf { type: 'NUM', value: '1' } },
     z: ConstDec { name: 'z', value: Leaf { type: 'NUM', value: '20' } },
     a: VarDec { name: 'a', value: null },
     b: VarDec { name: 'b', value: null },
     c: VarDec { name: 'c', value: null },
     foo:
      FunctionDec {
        name: 'foo',
        params: { x: null, y: null, z: null },
        code:
         CodeBloc {
           symbolTable:
            { father: null,
              l: VarDec { name: 'l', value: null },
              m: VarDec { name: 'm', value: null },
              n: VarDec { name: 'n', value: null } },
           code:
            StatementBloc {
              '1':
               BinOp {
                 type: '=',
                 left: Leaf { type: 'ID', value: 'a' },
                 right: Leaf { type: 'NUM', value: '2' } },
              '2':
               IfStatement {
                 condition:
                  ComparissonOp {
                    type: '<',
                    left: Leaf { type: 'ID', value: 'a' },
                    right:
                     BinOp {
                       type: '*',
                       left: Leaf { type: 'NUM', value: '2' },
                       right:
                        ParExp {
                          exp:
                           BinOp {
                             type: '+',
                             left: Leaf { type: 'NUM', value: '2' },
                             right: Leaf { type: 'NUM', value: '2' } } } } },
                 then:
                  BinOp {
                    type: '=',
                    left: Leaf { type: 'ID', value: 'a' },
                    right: Leaf { type: 'ID', value: 'b' } },
                 else:
                  BinOp {
                    type: '=',
                    left: Leaf { type: 'ID', value: 'b' },
                    right: Leaf { type: 'ID', value: 'c' } } },
              '3':
               WhileStatement {
                 condition:
                  ComparissonOp {
                    type: '<',
                    left: Leaf { type: 'ID', value: 'a' },
                    right: Leaf { type: 'ID', value: 'b' } },
                 do:
                  BinOp {
                    type: '=',
                    left: Leaf { type: 'ID', value: 'a' },
                    right: Leaf { type: 'ID', value: 'b' } } },
              '4': ReturnStatement { value: Leaf { type: 'ID', value: 'a' } } } },
        father: null,
        w: ConstDec { name: 'w', value: Leaf { type: 'NUM', value: '1' } },
        z: ConstDec { name: 'z', value: Leaf { type: 'NUM', value: '20' } },
        a: VarDec { name: 'a', value: null },
        b: VarDec { name: 'b', value: null },
        c: VarDec { name: 'c', value: null } } },
  code:
   BinOp {
     type: '=',
     left: Leaf { type: 'ID', value: 'a' },
     right:
      BinOp {
        type: '+',
        left: Leaf { type: 'ID', value: 'a' },
        right:
         FunctionCall {
           id: Leaf { type: 'ID', value: 'foo' },
           parametros:
            { '0': Leaf { type: 'ID', value: 'a' },
              '1':
               BinOp {
                 type: '+',
                 left: Leaf { type: 'NUM', value: '3' },
                 right: Leaf { type: 'NUM', value: '3' } },
              '2': Leaf { type: 'NUM', value: '55' } } } } } }
