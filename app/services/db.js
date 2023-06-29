const config = require('../config/config');
const {Sequelize} = require('sequelize');
const ParsingUrls = require('../model/parsingUrls');
const Categories = require('../model/categories');
const TgUsers = require('../model/tgUsers');
const sequelize = new Sequelize(`postgres://${config.db.user}:${config.db.password}@${config.db.host}:${config.db.port}/${config.db.name}`, {
    logging: false
});

class Db {
    constructor() {
    }

    async findOrCreateParsingUrl(data) {
        await ParsingUrls.findOrCreate({
            where: {
                url: data.url
            },
            defaults: {
                name: data.name,
                cost: data.cost,
                cashback: data.cashback,
                url: data.url,
                deletedAt: null,
                categories_id: data.categories_id
            }
        });
    }

    async getCategories() {
        const categories = await Categories.findAll({
            raw: true,
            attributes: ['id', 'name', 'url', 'page_count', 'cashback_coef'],
            where: {
                deletedAt: null
            }
        });
        if (categories) {
            return categories
        } else {
            console.log('Not categories for parsing');
        }
    }

    async getParsingUrl() {
        const products = await sequelize.query('select products.categories_id                                   categories_id,\n' +
            '       c.name                                                   categories_name,\n' +
            '       count(products.url)                                      count_products,\n' +
            '       string_agg(concat(\'Наименование товара: \', products.names, \', \n\', \'Ссылка: \', products.url, \' \n\', \'Стоимость: \', products.costs, \' \n\', \'Кэшбек: \', products.cashback, \' \n\', \'Вернется бонусами: \', products.parcent_cashback, \'%\n\'), \' \n\') card_product\n' +
            'from (select pu.categories_id                                                                                        categories_id,\n' +
            '             pu.name                                                                                                 names,\n' +
            '             pu.cost                                                                                                 costs,\n' +
            '             pu.url                                                                                                  url,\n' +
            '             pu.cashback                                                                                             cashback,\n' +
            '             round(pu.cashback::numeric / pu.cost::numeric, 2) * 100                                                 parcent_cashback,\n' +
            '             row_number() over (partition by pu.categories_id order by pu.cashback::numeric / pu.cost::numeric desc) row\n' +
            '      from parsing_urls pu\n' +
            '      where pu."deletedAt" is null) products\n' +
            '         join categories c on c.id = products.categories_id\n' +
            'where products.row <= 3\n' +
            'group by 1, 2;', {
                nest: true
            }
        );
        return products
    }

    async getTgUsers() {
        const usersIdTgBot = await TgUsers.findAll({
            raw: true,
            attributes: ['id', 'tg_id', 'login', 'password'],
            where: {deletedAt: null}
        });
        if (usersIdTgBot) {
            return usersIdTgBot
        } else {
            return false
        }
    }

}

module.exports = Db;
