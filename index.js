
const columnify = require("columnify")

//We don't use defaults here to warn the user about defaults being used
const yargs = require("yargs")
    .usage("Calculate playable land per turn\nUsage: manacalc -f standard -l 27 -h 3")
    .options({
        "lands": {
            alias: "l",
            describe: "amount of lands in deck",
            demandOption: true
        },
        "format": {
            alias: "f",
            describe: "deck format [default: standard]"
        },
        "hand": {
            alias: "h",
            describe: "how many lands in starting hand [default: 3]"
        },
        "handsize": {
            alias: "s",
            describe: "size of starting hand [default: 7]"
        },
        "max": {
            alias: "m",
            describe: "max turn to stop calculating at [default: 10]"
        }
    })
    .help(),
    argv = yargs.argv;

const supported_formats = {
    "standard": {
        cards: 60
    },
    "commander": {
        cards: 99
    }
}

if (!argv.format) {
    console.log("No format specified, using standard")
    argv.format = "standard"
} else if (!supported_formats[argv.format]) {
    yargs.showHelp()
    return console.log("\nError: unsupported format")
}


if (typeof argv.hand == "undefined") {
    console.log("No amount of land cards in starting hand specified, using 3")
    argv.hand = 3
}

if (typeof argv.max == "undefined") {
    argv.max = 10
}

if (typeof argv.handsize == "undefined") {
    argv.handsize = 7
}

if (supported_formats[argv.format].cards - argv.lands < argv.handsize) {
    console.log("Conflicting parameters lands and handsize");
    process.exit(0);
}

if (argv.hand > argv.handsize) {
    console.log("Conflicting parameters hand and handsize");
    process.exit(0);
}

//Handsize is 0 or 1, and seen as boolean instead of int
if (typeof argv.handsize == "object") {
    argv.handsize = argv.handsize[1];
}

//Handsize is 0 or 1, and seen as boolean instead of int
if (typeof argv.hand == "object") {
    argv.hand = argv.hand[1];
}

const turns = [];
const landCardsLeft = argv.lands - argv.hand;
const normalCardsLeft = supported_formats[argv.format].cards - argv.lands - argv.handsize + argv.hand;

for (let i = 0; i < argv.max; i++) {
    
    //Amount of possible situations created last time
    const possibleSits = turns.length + 1;

    const lastTurn = turns[turns.length-1];

    //This is the first turn
    if (!lastTurn) {
        const drawChange = landCardsLeft / (normalCardsLeft + landCardsLeft);

        turns.push({0: 1 - drawChange, 1: drawChange});

    }

    else {

        const newTurn = {};
    
        for (let manaDrawn in lastTurn) {
            manaDrawn = parseInt(manaDrawn)
            const prevChance = lastTurn[manaDrawn];
            if (prevChance > 0) {
                const drawnTotal = turns.length;
                const normalCardsLeft_ = normalCardsLeft - drawnTotal + manaDrawn;
                const landCardsLeft_ = landCardsLeft - manaDrawn;
                const drawChance = landCardsLeft_ / (normalCardsLeft_ + landCardsLeft_);

                const newChanceForLand = prevChance * drawChance;
                const newChanceForNonLand = prevChance * (1 - drawChance);

                newTurn[manaDrawn+1] = newChanceForLand;
                if (newTurn[manaDrawn])
                    newTurn[manaDrawn] += newChanceForNonLand;
                else newTurn[manaDrawn] = newChanceForNonLand;
            }
        }

        turns.push(newTurn);
    }

}

//outputting time
const rows = [];
turns.forEach(turn => {
    const row = {
        turn: turns.indexOf(turn) +1
    };

    for (const mana in turn) {
        row[parseInt(mana) + argv.hand + " mana"] = Math.round(turn[mana]*100) + "%"
    }
    rows.push(row)
})
console.log(columnify(rows))
