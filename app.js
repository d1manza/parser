const {setIntervalAsync} = require('set-interval-async');
const config = require('./app/config/config');
const Parse = require('./app/services/parser');
const parse = new Parse();
const Db = require('./app/services/db');
const db = new Db();
const Tg = require('./app/services/tg');
const tg = new Tg;
const Shared = require('./app/services/shared');
const shared = new Shared();


async function run() {
    const getCategories = await db.getCategories();
    if (getCategories) {
        shared.logging('getCategories', 'successfully', 'categories received');
        const getTgUsers = await db.getTgUsers();
        if (getTgUsers) {
            shared.logging('getTgUsers', 'successfully', 'tg users received');
            const getParsingUrl = await db.getParsingUrl();
            if (getParsingUrl) {
                shared.logging('getParsingUrl', 'successfully', 'parsing url received');
                for (const item of getCategories) {
                    for (let i = 1; i <= item.page_count; i++){
                        shared.logging('parsePage', 'work', `Start parsing categories ${item.name}, page - ${i}`);
                        const parsePage = await parse.parsePage(item.url, i);
                        if (parsePage) {
                            shared.logging('parsePage', 'successfully', `End parsing categories ${item.name}, page - ${i}`);
                        } else {
                            shared.logging('parsePage', 'error', `Error parsing categories ${item.name}, page - ${i}`);
                        }
                    }
                }
            }
            else {
                shared.logging('getParsingUrl', 'error', 'failed to get parsing url');
            }
        } else {
            shared.logging('getTgUsers', 'error', 'failed to get tgUsers');
        }
        /*for (const item of categories) {
            await parse.parsePage(item);
        }*/
        /*const tgUsers = await db.getTgUsers();
        if (tgUsers) {
            const topActions = await db.getParsingUrl();
            if (topActions) {
                for (const item of topActions) {
                    const message = `В категории: <b>${item.categories_name}</b> найдено <b>${item.count_products}</b> лучших товара:\n\n${item.card_product}`;
                    for (const item of tgUsers) {
                        /!*await tg.sendAlarms(item.tg_id, message);*!/
                    }
                }
            } else {
                shared.logging('getParsingUrl', 'error', 'failed to get parsing url');
            }
        } else {
            shared.logging('getTgUsers', 'error', 'failed to get tgUsers');
        }*/
    } else {
        shared.logging('getCategories', 'error', 'failed to get categories');
    }
}

async function start() {
    await run();
    console.log(`Parsing worked successfully. next run in ${config.settings.interval} minutes`);
    setIntervalAsync(() => {
        run();
        console.log(`Parsing worked successfully. next run in ${config.settings.interval} minutes`);
    }, config.settings.interval * 60 * 1000);
}

start();



