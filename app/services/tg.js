const config = require('../config/config');
const TelegramBot = require('node-telegram-bot-api');

class Tg {
    constructor() {
    }

    async sendAlarms(chatId, message) {
        const bot = new TelegramBot(config.tg.token, {polling: false});
        await bot.sendMessage(chatId, message);
        console.log(`The mailing was made for a user with id: ${chatId}`)
    }

}

module.exports = Tg;
