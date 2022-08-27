const puppeteer = require('puppeteer');
const { v4: uuidV4 } = require('uuid');

const saveAd = async(price, description) => {
  async function changeDropdown(anchorTag, listTag) {
    await page.$eval(anchorTag, elem => elem.click());
    await new Promise(r => setTimeout(r, 500));
    await page.$eval(listTag, elem => elem.click());
    await new Promise(r => setTimeout(r, 500));
  }
  const browser = await puppeteer.launch({headless: true, defaultViewport: {'height': 1080, 'width': 1920}, timeout: 60000});

  const page = await browser.newPage();
  await page.goto('https://www.seminuevos.com/login');

  await page.type('#email_login', process.env.LOGIN_EMAIL, {delay: 100});
  await page.type('#password_login', process.env.LOGIN_PASSWORD, {delay: 100});
  await Promise.all([page.click('button[type="submit"]'), page.waitForNavigation()]);

  await Promise.all([page.click('a[href="/wizard?f_dealer_id=-1"]'), page.waitForNavigation()]);

  await new Promise(r => setTimeout(r, 3000));

  await changeDropdown('a[data-activates="dropdown_types"]', 'li[data-content="autos"] a[href="#"]');
  await changeDropdown('a[data-activates="dropdown_brands"]', 'li[data-content="acura"] a[href="#"]');
  await changeDropdown('a[data-activates="dropdown_models"]', 'li[data-content="ilx"] a[href="#"]')
  await changeDropdown('a[data-activates="dropdown_subtypes"]', 'li[data-content="sedan"] a[href="#"]')
  await changeDropdown('a[data-activates="dropdown_years"]', 'li[data-content="2018"] a[href="#"]')
  await changeDropdown('a[data-activates="dropdown_provinces"]', 'li[data-content="nuevo leon"] a[href="#"]')
  await changeDropdown('a[data-activates="dropdown_cities"]', 'li[data-content="monterrey"] a[href="#"]')

  await page.type('#input_recorrido', '20000', { delay: 100 });
  await page.type('#input_precio', price, { delay: 100 });

  await Promise.all([page.click('button[class="next-button"]'), page.waitForNavigation()]);

  await new Promise(r => setTimeout(r, 3000));

  await page.type('#input_text_area_review', description, {delay: 50});

  const files = ['../imagenes_prueba/acura_img1.jpg', '../imagenes_prueba/acura_img2.jpg', '../imagenes_prueba/acura_img3.jpg'];
  const inputFile = await page.$('input[type="file"]#Uploader');
  await inputFile.uploadFile(...files);

  await new Promise(r => setTimeout(r, 5000));

  await Promise.all([page.click('button[class="next-button"]'), page.waitForNavigation()]);

  await new Promise(r => setTimeout(r, 5000));

  const url = await page.evaluate(() => document.location.href);

  await Promise.all([page.goto(url.slice(0, url.lastIndexOf('/'))), page.waitForNavigation()])

  await new Promise(r => setTimeout(r, 5000));

  const newID = uuidV4();

  await page.screenshot({path: `./images/${newID}.png`});

  await browser.close();

  return newID;
}

const imageTest = async() => {
  const browser = await puppeteer.launch({headless: false});

  const page = await browser.newPage();

  await page.goto('https://www.google.com/');

  await page.screenshot({path: './images/test.png'});
}

module.exports = {
  saveAd, imageTest
}