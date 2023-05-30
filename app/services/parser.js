const config = require('../config/config');
const puppeteer = require('puppeteer');
const Db = require('./db');
const db = new Db();

class Parser {
    constructor() {
    }

    async parsePage(url) {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setExtraHTTPHeaders(config.cockies.sbermegamarket);
        await page.goto(config.url.sbermegamarket.smartphone);
        await page.waitForTimeout(4000);
        let data = await page.evaluate(this.processing);
        await browser.close();
        data.forEach((item) => {
            db.insertParsingUrl(item);
        });
    }

    async processing() {
        let results = [];
        let items = document.getElementsByClassName('catalog-item');
        items.forEach((item) => {
            let name = item.getElementsByClassName('item-title')[0].innerText;
            let cost = Number(item.getElementsByClassName('item-price')[0].innerText.replace(/[^+\d]/g, ''));
            let cashback = Number(item.getElementsByClassName('item-bonus')[0].innerText.replace(/[^+\d]/g, ''));
            let url = item.getElementsByClassName('item-image-block')[0].href;
            if (url != '') {
                results.push({
                    name: name,
                    cost: cost,
                    cashback: cashback,
                    url: url,
                    categories_id: 1
                });
            }
        });
        return results
    }
}

module.exports = Parser;
