const fs = require('fs');
const config = require('../config/config');

class Shared {
    constructor() {
    }

    async save(data) {
        console.log(data);
        fs.writeFile(config.fileName.sbermegamarket, String(data.value), function (err) {
            if (!err) {
                console.log('parsing sbermegamarket completed');
            } else {
                console.log('parsing sbermegamarket ended with an error: ', err);
            }
        });
    }

}

module.exports = Shared;
