# Manacalc
A CLI program targeted at Magic the Gathering players written in NodeJS. It shows you the amount of mana you can expect to have at a certain turn with a specific deck.

### Install
`npm i manacalc -g`

### Usage
```
Calculate useable lands per turn
Usage: manacalc -f standard -l 27 -h 3

Options:
  --version       Show version number                                  [boolean]
  --lands, -l     amount of lands in deck                             [required]
  --format, -f    deck format [default: standard]
  --hand, -h      how many lands in starting hand [default: 3]
  --handsize, -s  size of starting hand [default: 7]
  --max, -m       max turn to stop calculating at [default: 10]
  --help          Show help                                            [boolean]
```