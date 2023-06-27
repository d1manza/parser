const Parse = require('./app/services/parser');
const parse = new Parse();
const Db = require('./app/services/db');
const db = new Db();
const Tg = require('./app/services/tg');
const tg = new Tg;

async function run() {
    const categories = await db.getCategories();
    if (categories.length !== 0) {
        for (const item of categories) {
            await parse.parsePage(item);
        }
        const tgUsers = await db.getTgUsers();
        if (tgUsers.length !== 0) {
            const topActions = await db.getParsingUrl();
            if (topActions.length !== 0) {
                for (const item of topActions) {
                    const message = `В категории: <b>${item.categories_name}</b> найдено <b>${item.count_products}</b> лучших товара:\n\n${item.card_product}`;
                    for (const item of tgUsers) {
                        await tg.sendAlarms(item.tg_id, message);
                    }
                }
            } else {
                console.log('No promotions found to send');
            }
        } else {
            console.log('No users to send');
        }
    } else {
        console.log('Not categories from parsing');
    }
}

run();



