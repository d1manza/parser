class Shared {
    constructor() {
    }

    async logging(funcName, status, message) {
        const date = new Date();
        console.log(`[${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${date.toLocaleTimeString()}] - Function: ${funcName}. Status: ${status}. Message: ${message}`);
    }

    async sleep(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

}

module.exports = Shared;
