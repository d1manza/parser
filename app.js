const Parse = require('./app/services/parser');
const parse = new Parse();
const Db = require('./app/services/db');
const db = new Db();
const Tg = require('./app/services/tg');
const tg = new Tg();

async function run() {
    const categories = await db.selectCategories();
    if (categories) {
        for (const item of categories) {
            await parse.parsePage(item);
        }
    } else {
        console.log('Not categories from parsing');
    }
    let productList = await db.selectParsingUrl();
    let result = '';
    result = result + productList[0].name + '\n';
    for (const url of productList[0].array_agg) {
        result = result + url + '\n';
    }
    await tg.sendProductList(result);
}

run();



