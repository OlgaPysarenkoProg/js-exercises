const COMMAND = 'node bitcoin.js';
const MAX_AMOUNT = 1000000000;

function parseAmount(text) {
    // returns null if a text can't be parsed as an amount
    for (let i = 0; i < text.length; i++) {
        if (text[i] !== '.' && text[i] < '0' && text[i] > '9') return null;
    }
    const amount = Number(text);
    if (amount > MAX_AMOUNT || Math.trunc(amount * 100) !== amount * 100) {
        return null;
    }
    return amount;
}

function main() {
    if (
        process.argv.length === 3
        && (process.argv[2] === '-h' || process.argv[2] === '--help')
    ) {
        console.log('Usage:');
        console.log();
        console.log(`${COMMAND} <USD amount> <BTC price>`);
        console.log('\twhere:');
        console.log(
            `\t<USD amount> is a non-negative fixed-point number not greater than ${MAX_AMOUNT}`
        );
        console.log(
            `\t<BTC price> is a positive fixed-point number not greater than ${MAX_AMOUNT}`
        );
        console.log();
        console.log('or');
        console.log();
        console.log(`${COMMAND} -h`);
        console.log('\tdisplay usage info');
        console.log();
        console.log('or');
        console.log();
        console.log(`${COMMAND} --help`);
        console.log('\tdisplay usage info');
        return;
    }

    if (process.argv.length !== 4) {
        console.log('Invalid command line.');
        return;
    }

    const usdAmount = parseAmount(process.argv[2]);
    if (usdAmount === null) {
        console.log('Invalid command line.');
        return;
    }

    const btcPrice = parseAmount(process.argv[3]);
    if (btcPrice === null) {
        console.log('Invalid command line.');
        return;
    }

    const amountToBuy = usdAmount / btcPrice;
    console.log(`You can buy ${amountToBuy} BTC.`);
}

main();
