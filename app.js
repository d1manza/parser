const {setIntervalAsync} = require('set-interval-async');
const config = require('./app/config/config');
const Start = require('./app/services/start');
const start = new Start();

async function run() {
    start.start();
    setIntervalAsync(() => {
        start.start();
    }, config.settings.interval * 60 * 1000);
}

run();



