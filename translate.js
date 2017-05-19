module.exports = () => {
  let e;
  let sym = {};
  try {
    const w = 1;
    const z = 20;
    var a;
    var b;
    var c;

    function foo(x, y, z) {
      var l;
      var m;
      var n;
      a = 2
      if (a < 2 * (2 + 2)) {
        a = b
      } else {
        b = c
      }
      while (a < b) {
        a = b
      }
    }

    a = a + foo(a, 3 + 3, 55);
    console.log(a);
    return sym;
  } catch (e) {
    let err = e.message.replace(/sym\.(\w+)/g, '$1');
    console.log(err);
    return "error";
  }
}
