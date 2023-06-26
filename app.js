const Parse = require('./app/services/parser');
const parse = new Parse();
const Db = require('./app/services/db');
const db = new Db();

async function run() {
    const categories = await db.selectCategories();
    if (categories) {
        for (const item of categories) {
            await parse.parsePage(item);
        }
    } else {
        console.log('Not categories from parsing');
    }
    await db.selectParsingUrl();
}

run();



