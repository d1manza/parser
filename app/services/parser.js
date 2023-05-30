const config = require('../config/config');
const puppeteer = require('puppeteer');
const Db = require('./db');
const db = new Db();

class Parser {
    constructor() {
    }

    async parsePage(url_postfix, categories_id, page_count, name, cashback_coef) {
        for (let i = 1; i <= page_count; i++) {
            console.log(`Start parsing categories ${name}, page - ${i}`);
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setExtraHTTPHeaders(config.cockies.sbermegamarket);
            await page.goto(`${config.url.sbermegamarket}${url_postfix}/page-${i}/`);
            await page.waitForTimeout(4000);
            let data = await page.evaluate(this.processing);
            await browser.close();
            data.forEach((item) => {
                if (item.cashback / item.cost >= cashback_coef) {
                    let result = {
                        name: item.name,
                        cost: item.cost,
                        cashback: item.cashback,
                        url: item.url,
                        categories_id: categories_id
                    };
                    db.findOrCreateParsingUrl(result);
                }
            });
            console.log(`End parsing categories ${name}, page - ${i}`);
        }

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
                    url: url
                });
            }
        });
        return results
    }
}

module.exports = Parser;
