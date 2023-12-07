const axios = require('axios');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const baseLink = 'https://gomafia.pro/';

module.exports = async function getPageDOM(link) {
  let dom;
  await axios.get(baseLink + link).then((response) => {
    let currentPage = response.data;
    dom = new JSDOM(currentPage);
  });

  return dom;
};
