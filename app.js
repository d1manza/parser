const config = require('./app/config/config');
const Start = require('./app/services/start');
const start = new Start();
const Shared = require('./app/services/shared');
const shared = new Shared();

async function run() {
    await shared.logging('start', 'start work', `Start parsing + mailing`);
    const go = await start.start();
    if (!go) {
        await shared.logging('start', 'error', `Restart affter ${config.settings.intervalFailedLaunch} minutes`);
        await shared.sleep(config.settings.intervalFailedLaunch * 1000 * 60);
        await run();
    } else {
        await shared.logging('start', 'successfully', `Restart affter ${config.settings.intervalSuccessfulLaunch} minutes`);
        await shared.sleep(config.settings.intervalSuccessfulLaunch * 1000 * 60);
        await run();
        await shared.logging('start', 'successfully', `End parsing + mailing`);
    }
}

run();



