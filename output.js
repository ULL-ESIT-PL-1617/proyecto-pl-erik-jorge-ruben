module.exports = () => {
  try {
    var a;
    var b;
    while (a <= 10) {
      a = a + 2;
      b = b + 2;
    };
  } catch (e) {
    let err = e.message.replace(/sym\.(\w+)/g, '$1');
    console.log(err);
    return "error";
  }
}