const config = require('../config/config');
const TelegramBot = require('node-telegram-bot-api');
const Db = require('./db');
const db = new Db();
const Shared = require('./shared');
const shared = new Shared();


class Tg {
    constructor() {
    }

    async mailing() {
        try {
            const getTgUsers = await db.getTgUsers();
            if (getTgUsers) {
                shared.logging('getTgUsers', 'successfully', 'tg users received');
                const getParsingUrl = await db.getParsingUrl();
                if (getParsingUrl) {
                    shared.logging('getParsingUrl', 'successfully', 'parsing url received');
                    for (const item of getParsingUrl) {
                        const message = `В категории: <b>${item.categories_name}</b> найдено <b>${item.count_products}</b> лучших товара:\n\n${item.card_product}`;
                        for (const item of getTgUsers) {
                            const sendAlarms = await this.sendAlarms(item.tg_id, message);
                            if (sendAlarms) {
                                shared.logging('sendAlarms', 'successfully', `mailing to user with id - ${item.tg_id} passed`);
                            } else {
                                shared.logging('sendAlarms', 'error', `mailing to user with id - ${item.tg_id} not passed`);
                                return false
                            }
                        }
                    }
                } else {
                    shared.logging('getParsingUrl', 'error', 'failed to get parsing url');
                    return false
                }
            } else {
                shared.logging('getTgUsers', 'error', 'failed to get tgUsers');
                return false
            }
            return true
        } catch {
            return false
        }
    }

    async sendAlarms(chatId, message) {
        try {
            const bot = new TelegramBot(config.tg.token, {polling: false});
            await bot.sendMessage(chatId, message, {'parse_mode': 'html'});
            return true
        } catch {
            return false
        }
    }

}

module.exports = Tg;
