module.exports = () => {
  let e;
  let sym = {};
  try {
    a = 2 + 2;
    return sym;
  } catch (e) {
    let err = e.message.replace(/sym\.(\w+)/g, '$1');
    console.log(err);
    return "error";
  }
}