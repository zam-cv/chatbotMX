import puppeteer from 'puppeteer';
import fs from 'fs';
declare const document: any;

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  const query = prompt('query: ');

  await page.setViewport({width: 1170, height: 1024});
  await page.goto(`https://www.google.com/search?q=${query}&tbm=isch&source=lnms`);
  // document.querySelectorAll("a > div > img[data-deferred]:not([data-sz])")
  let result = await page.evaluate(() => {
    let images = document.querySelectorAll("a > div > img[data-deferred]:not([data-sz])");
    let urls = Array.from(images).map((v: any) => v.getAttribute("src"));
    return urls;
  });

  fs.mkdirSync(`../assets/images/${query}`, { recursive: true });

  for (let i = 0; i < result.length; i++) {
    let base64String = result[i].split(',')[1];
    let imageBuffer = Buffer.from(base64String, 'base64');
    fs.writeFileSync(`../assets/images/${query}/${i}.jpg`, imageBuffer);
  }

  await browser.close();
})();