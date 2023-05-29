const config = require('../config/config');
const puppeteer = require('puppeteer');
const Shared = require('./shared');
const shared = new Shared();

class Parser {
    constructor() {
    }

    async parsePage(url) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setExtraHTTPHeaders(config.cockies.sbermegamarket);
        await page.goto(config.url.sbermegamarket);
        await page.waitForTimeout(4000);
        let data = await page.evaluate(this.processing);
        await browser.close();
        shared.save(data);
    }

    async processing() {
        let results = [];
        let items = document.getElementsByClassName('catalog-item');
        items.forEach((item) => {
            let name = item.getElementsByClassName('item-title')[0].innerText;
            let cost = Number(item.getElementsByClassName('item-price')[0].innerText.replace(/[^+\d]/g, ''));
            let cashback = Number(item.getElementsByClassName('item-bonus')[0].innerText.replace(/[^+\d]/g, ''));
            let url = item.getElementsByClassName('item-image-block')[0].href;
            let percent = Math.round(cashback / cost * 100);
            results.push({
                name: name,
                cost: cost,
                cashback: cashback,
                percent: percent,
                url: url
            });
        });
        return results
    }
}

module.exports = Parser;
