module.exports = () => {
  try {
    var a;
    a = 2 + 2;
  } catch (e) {
    let err = e.message.replace(/sym\.(\w+)/g, '$1');
    console.log(err);
    return "error";
  }
}