module.exports = () => {
  let e;
  let sym = {};
  try {
    const a = 1;
    const b = 2;
    const c = 3;
    var d;
    d = 2 + 2;
    return sym;
  } catch (e) {
    let err = e.message.replace(/sym\.(\w+)/g, '$1');
    console.log(err);
    return "error";
  }
}