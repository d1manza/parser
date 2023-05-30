const ParsingUrls = require('../model/parsingUrls');

class Db {
    constructor() {
    }

    async insertParsingUrl(data) {
        await ParsingUrls.create({
            name: data.name,
            cost: data.cost,
            cashback: data.cashback,
            url: data.url,
            deletedAt: null,
            categories_id: data.categories_id
        });
    }

}

module.exports = Db;
