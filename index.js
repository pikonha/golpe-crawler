const axios = require("axios");
const cheerio = require("cheerio");

const GOLPE_URL = "https://www.golpeofficial.com/product-page/jaqueta";

async function fetchData(url) {
  const response = await axios.get(url).catch((err) => console.error(err));

  if (response.status !== 200) {
    console.log("An error ocurred while fetch this page.");
    return;
  }

  return response.data;
}

(async () => {
  const data = await fetchData(GOLPE_URL);

  const $ = cheerio.load(data);

  $(
    ".Popover4009822983--root.Dropdown1020571488--root.OptionsDropdown3447037927--dropdown"
  ).click();
})();
