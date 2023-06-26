const ParsingUrls = require('../model/parsingUrls');
const Categories = require('../model/categories');
const config = require('../config/config');
const {Sequelize} = require('sequelize');
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

    async selectCategories() {
        const categories = await Categories.findAll({
            raw: true,
            attributes: ['id', 'name', 'url', 'page_count', 'cashback_coef']
        });
        if (categories) {
            return categories
        } else {
            console.log('Not categories for parsing');
        }
    }

}

module.exports = Db;
