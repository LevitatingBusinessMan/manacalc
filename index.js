
//We don't use defaults here to warn the user about defaults being used
const yargs = require('yargs')
    .usage("Calculate playable land per turn\nUsage: manacalc -f standard -l 27 -s 3")
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
            alias: "hs",
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

if (!argv.hand) {
    console.log("No amount of land cards in starting hand specified, using 3")
    argv.hand == 3
}

if (!argv.max) {
    argv.max = 10
}

if (!argv.handsize) {
    argv.handsize = 7
}

const turns = [];

function calc () {
    let manaInHand = argv.hand;
    let normalCardsLeft = supported_formats[argv.format].cards - argv.handsize + argv.hand;
    let landCardsLeft = supported_formats[argv.format].cards - argv.hand;

    for (let i = 0; i < max; i++) {
        
    }
    
}

