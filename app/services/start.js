const Shared = require('./shared');
const shared = new Shared();
const Tg = require('./tg');
const tg = new Tg();
const Parser = require('./parser');
const parser = new Parser();

class Start {
    constructor() {
    }

    async start() {
        shared.logging('parsing', 'start work', `Start parsing`);
        const parsing = await parser.parsing();
        if (parsing) {
            shared.logging('mailing', 'successfully', `End parsing`);
            shared.logging('mailing', 'start work', `Start mailing`);
            const mailing = await tg.mailing();
            if (mailing) {
                shared.logging('mailing', 'successfully', `End mailing`);
            } else {
                shared.logging('parsing', 'error', `Error mailing`);
            }
        } else {
            shared.logging('parsing', 'error', `Error parsing`);
        }
    }

}

module.exports = Start;