const config = require('./app/config/config');
const Parse = require('./app/services/parser');
const parse = new Parse();
const Db = require('./app/services/db');
const db = new Db();

async function run () {
    const categories = await db.selectCategories();
    categories.forEach((item) => {
        parse.parsePage(item.url_postfix, item.id, item.page_count, item.name, item.cashback_coef);
    });
}

run();



