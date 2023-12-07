const fs = require('fs');
const getPageDOM = require('./getPageDOM');

module.exports = async function createHTML() {
  dom = await getPageDOM();
  html = dom.window.document.body.innerHTML;
  fs.appendFileSync('../static/articles.html', html, (err) => {
    if (err) throw err;
  });
};
