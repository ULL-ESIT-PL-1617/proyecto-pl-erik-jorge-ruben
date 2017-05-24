var beautify = require('js-beautify').js_beautify;
var fs = require('fs');

let prefixTemplate = function() {
  return `
module.exports = () => {
  let e;
  let sym = {};
  try {
  `;
}; // end prefix

let suffixTemplate  = function() {
   return `;
     return sym;
  }
  catch(e) {
    let err = e.message.replace(/sym\\.(\\w+)/g, '$1');
    console.log(err);
    return "error";
  }
}
`;
}; // end suffix

module.exports = function(tree) {
   
    
    var prefix = prefixTemplate();
    var suffix = suffixTemplate();
    /* traverse the tree producing translation */
    let js = prefix+tree.translate()+suffix;
    fs.writeFileSync('output.js', beautify(js, { indent_size: 2 }));
    return beautify(js, { indent_size: 2 });
};
