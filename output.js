module.exports = () => {
  try {
    const a = 1;
    const b = 2;
    const c = 3;
    var d;
    d = 2 + 2;
  } catch (e) {
    let err = e.message.replace(/sym\.(\w+)/g, '$1');
    console.log(err);
    return "error";
  }
}