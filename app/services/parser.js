const config = require('../config/config');
const puppeteer = require('puppeteer');
const Db = require('./db');
const db = new Db();

class Parser {
    constructor() {
    }

    async parsePage(categories) {
        for (let i = 1; i <= categories.page_count; i++) {
            console.log(`Start parsing categories ${categories.name}, page - ${i}`);
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setExtraHTTPHeaders(config.cockies.sbermegamarket);
            await page.goto(`${config.url.sbermegamarket}${categories.url_postfix}/page-${i}/`);
            await page.waitForTimeout(4000);
            let data = await page.evaluate(await this.processing);
            await browser.close();
            for (const item of data) {
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
            }

            console.log(`End parsing categories ${categories.name}, page - ${i}`);
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
            if (url != '') {
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
