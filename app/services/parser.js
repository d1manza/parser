const config = require('../config/config');
const puppeteer = require('puppeteer');
const Db = require('./db');
const db = new Db();
const Shared = require('./shared');
const shared = new Shared();

class Parser {
    constructor() {
    }

    async parsePage(url, page) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setExtraHTTPHeaders(config.cockies.sbermegamarket);
            await page.goto(`${url}/page-${page}/`);
            await page.waitForTimeout(4000);
            const catalogItem = await document.getElementsByClassName('catalog-item');
            const data = await page.evaluate(items => catalogItem);
            await console.log(data);
            await browser.close();
            /*for (const item of data) {
                if (item.cashback / item.cost >= categories.cashback_coef) {
                    let result = {
                        name: item.name,
                        cost: item.cost,
                        cashback: item.cashback,
                        url: item.url,
                        categories_id: categories.id
                    };
                    await db.findOrCreateParsingUrl(result);
                }
            }*/
            return data
        } catch {
            return false
        }
    }

    async processing() {
        let results = [];
        let items = await document.getElementsByClassName('catalog-item');
        for (const item of items) {
            let name = item.getElementsByClassName('item-title')[0].innerText;
            let cost = Number(item.getElementsByClassName('item-price')[0].innerText.replace(/[^+\d]/g, ''));
            let cashback = Number(item.getElementsByClassName('item-bonus')[0].innerText.replace(/[^+\d]/g, ''));
            let url = item.getElementsByClassName('item-image-block')[0].href;
            if (url !== '') {
                results.push({
                    name: name,
                    cost: cost,
                    cashback: cashback,
                    url: url
                });
            }
        }
        return results
    }
}

module.exports = Parser;
