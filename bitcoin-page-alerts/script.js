function onRunClick() {
    const usdAmount = enterAmount('How many USD do you have?');
    if (usdAmount === null) return;
    if (usdAmount === 0) {
        alert("You can't buy any BTC.");
        return;
    }

    let btcPrice;
    let firstSentence = null;
    while (true) {
        btcPrice = enterAmount('What is BTC price?', firstSentence);
        if (btcPrice === null) return;
        if (btcPrice === 0) {
            firstSentence = 'Invalid BTC price.';
            continue;
        }
        break;
    }

    const amountToBuy = usdAmount / btcPrice;
    alert(`You can buy ${amountToBuy} BTC.`);
}

const MAX_AMOUNT = 1000000000;

function enterAmount(message, firstSentence) {
    // returns null if user pressed cancel button
    while (true) {
        let fullMessage;
        if (firstSentence === null) {
            fullMessage = message;
        } else {
            fullMessage = `${firstSentence}\n\n${message}`;
        }
        let input = prompt(fullMessage);

        if (input === null) return null;

        input = input.trim();
        if (input === '') {
            firstSentence = null;
            continue;
        }

        let inputInvalid = false;
        for (let i = 0; i < input.length; i++) {
            if (input[i] !== '.' && input[i] < '0' && input[i] > '9') {
                inputInvalid = true;
                break;
            }
        }
        if (inputInvalid) {
            firstSentence = 'Invalid input.';
            continue;
        }

        const amount = Number(input);

        if (amount > MAX_AMOUNT) {
            firstSentence = `Maximum amount value is ${MAX_AMOUNT}.`;
            continue;
        }

        if (Math.trunc(amount * 100) !== amount * 100) {
            firstSentence = 'Invalid input.';
            continue;
        }

        return amount;
    }
}
