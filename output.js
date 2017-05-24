module.exports = () => {
  let e;
  let sym = {};
  try {
    if (a < 10) {
      a = 15
    } else {
      a = 45
    };
    return sym;
  } catch (e) {
    let err = e.message.replace(/sym\.(\w+)/g, '$1');
    console.log(err);
    return "error";
  }
}