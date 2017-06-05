module.exports = () => {
  try {
    const b = 2;
    var a;

    function funcId(a, b, c) {
      const d = 1;
      const e = 2;
      var f;
      var g;
      var h;
      f = a + d;
      g = b + e;
    }
    a = funcId(2, b, 2 + 2);
  } catch (e) {
    let err = e.message.replace(/sym\.(\w+)/g, '$1');
    console.log(err);
    return "error";
  }
}