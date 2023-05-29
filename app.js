const config = require('./app/config/config');
const Parse = require('./app/services/parser');
const parse = new Parse();

const start = parse.parsePage(config.url.sbermegamarket);


