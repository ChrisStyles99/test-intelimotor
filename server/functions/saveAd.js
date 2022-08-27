const puppeteer = require('puppeteer');
const { v4: uuidV4 } = require('uuid');

const saveAd = async() => {
  const browser = await puppeteer.launch({headless: false, defaultViewport: {'height': 1080, 'width': 1920}, timeout: 60000});

  const page = await browser.newPage();
  await page.goto('https://www.seminuevos.com/login');
  // await page.click('a[data-activates="slide-out"]');
  // await Promise.all([page.click('a[href="/login"]'), page.waitForNavigation()]);

  await page.type('#email_login', process.env.LOGIN_EMAIL, {delay: 100});
  await page.type('#password_login', process.env.LOGIN_PASSWORD, {delay: 100});
  await Promise.all([page.click('button[type="submit"]'), page.waitForNavigation()]);

  await Promise.all([page.click('a[href="/wizard?f_dealer_id=-1"]'), page.waitForNavigation()]);
  // const typeDropdown = await page.$eval('#dropdown_types');
  // console.log(typeDropdown);
  // await page.click('div#dropdown_types', {delay: 100});
  await new Promise(r => setTimeout(r, 3000));
  await page.$eval('a[data-activates="dropdown_types"]', elem => elem.click());
  await new Promise(r => setTimeout(r, 500));
  await page.$eval('li[data-content="autos"] a[href="#"]', elem => elem.click());

  await page.$eval('a[data-activates="dropdown_brands"]', elem => elem.click());
  await new Promise(r => setTimeout(r, 500));
  await page.$eval('li[data-content="acura"] a[href="#"]', elem => elem.click());

  await page.$eval('a[data-activates="dropdown_models"]', elem => elem.click());
  await new Promise(r => setTimeout(r, 500));
  await page.$eval('li[data-content="ilx"] a[href="#"]', elem => elem.click());

  await page.$eval('a[data-activates="dropdown_subtypes"]', elem => elem.click());
  await new Promise(r => setTimeout(r, 500));
  await page.$eval('li[data-content="sedan"] a[href="#"]', elem => elem.click());

  await page.$eval('a[data-activates="dropdown_years"]', elem => elem.click());
  await new Promise(r => setTimeout(r, 500));
  await page.$eval('li[data-content="2018"] a[href="#"]', elem => elem.click());
  
  await page.$eval('a[data-activates="dropdown_provinces"]', elem => elem.click());
  await new Promise(r => setTimeout(r, 500));
  await page.$eval('li[data-content="nuevo leon"] a[href="#"]', elem => elem.click());

  await page.$eval('a[data-activates="dropdown_cities"]', elem => elem.click());
  await new Promise(r => setTimeout(r, 500));
  await page.$eval('li[data-content="monterrey"] a[href="#"]', elem => elem.click());

  await page.type('#input_recorrido', '20000', { delay: 100 });
  await page.type('#input_precio', '200000', { delay: 100 });

  await Promise.all([page.click('button[class="next-button"]'), page.waitForNavigation()]);

  await new Promise(r => setTimeout(r, 3000));

  await page.type('#input_text_area_review', 'Esto es un anuncio de tipo testing, y las imagenes son tomadas de google, todos los derechos de las imagenes son reservados', {delay: 50});

  const files = ['../imagenes_prueba/acura_img1.jpg', '../imagenes_prueba/acura_img2.jpg', '../imagenes_prueba/acura_img3.jpg'];
  const inputFile = await page.$('input[type="file"]#Uploader');
  await inputFile.uploadFile(...files);

  await Promise.all([page.click('button[class="next-button"]'), page.waitForNavigation()]);

  await page.click('a[data-tooltip="Publicaciones"]');

  const newAd = await page.$$eval('#sidebar-my-vehicles div div div div.article', elem => elem.pop());

  await Promise.all([newAd.querySelector('div div.features.clearfix a').click(), page.waitForNavigation()]);

  const newID = uuidV4();

  await page.screenshot({path: `/images/${newID}.png`});

  await browser.close();

  return newID;
}

module.exports = {
  saveAd
}