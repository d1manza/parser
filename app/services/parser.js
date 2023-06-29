const config = require('../config/config');
const puppeteer = require('puppeteer');
const Db = require('./db');
const db = new Db();
const Shared = require('./shared');
const shared = new Shared();

class Parser {
    constructor() {
    }

    async parsing() {
        try {
            const getCategories = await db.getCategories();
            if (getCategories) {
                shared.logging('getCategories', 'successfully', 'categories received');
                for (const item of getCategories) {
                    for (let i = 1; i <= item.page_count; i++) {
                        shared.logging('parsePage', 'start work', `Start parsing categories ${item.name}, page - ${i}`);
                        const parsePage = await this.parsePage(item.url, i, item.cashback_coef, item.id);
                        if (parsePage) {
                            shared.logging('parsePage', 'successfully', `End parsing categories ${item.name}, page - ${i}`);
                            for (const list of parsePage) {
                                const findOrCreateParsingUrl = await db.findOrCreateParsingUrl(list);
                                if (findOrCreateParsingUrl) {
                                    shared.logging('findOrCreateParsingUrl', 'successfully', `Data categories ${item.name}, page - ${i} added in DB`);
                                } else {
                                    shared.logging('findOrCreateParsingUrl', 'error', `Data categories ${item.name}, page - ${i} error added in DB`);
                                    return false
                                }
                            }
                        } else {
                            shared.logging('parsePage', 'error', `Error parsing categories ${item.name}, page - ${i}`);
                            return false
                        }
                    }
                }
            } else {
                shared.logging('getCategories', 'error', 'failed to get categories');
                return false
            }
            return true
        } catch {
            return false
        }
    }

    async parsePage(url, sheet, cashbackCoef, categories_id) {
        try {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setExtraHTTPHeaders(config.cockies.sbermegamarket);
            await page.goto(`${url}/page-${sheet}/`);
            await page.waitForTimeout(4000);
            const data = await page.evaluate(await this.processing);
            await browser.close();
            let result = [];
            for (const item of data) {
                if (item.cashback / item.cost >= cashbackCoef && item.url !== '') {
                    result.push({
                        name: item.name,
                        cost: item.cost,
                        cashback: item.cashback,
                        url: item.url,
                        categories_id: categories_id
                    });
                }
            }
            return result
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
            results.push({
                name: name,
                cost: cost,
                cashback: cashback,
                url: url
            });
        }
        return results
    }
}

module.exports = Parser;
