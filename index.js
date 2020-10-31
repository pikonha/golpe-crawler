const puppeteer = require("puppeteer");

const GOLPE_URL = "https://www.golpeofficial.com/product-page/jaqueta";

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(GOLPE_URL);

    // Combobox
    await page.waitFor(".Popover4009822983--popoverElement");

    while (!(await page.$(".DropdownContent3963406277--optionsContainer"))) {
      await page.click(".Popover4009822983--popoverElement");
    }

    // Select option
    const items = await page.$$(
      ".DropdownContent3963406277--optionsContainer > div"
    );

    const properties = await Promise.all(
      items.map((item) =>
        item.evaluate((obj) => ({
          name: obj.getAttribute("title"),
          disabled: obj.getAttribute("data-dropdownoption3579514325-disabled"),
        }))
      )
    );

    console.log(properties);

    await browser.close();
  } catch (e) {
    console.error(e);
  }
})();
