const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')
const { hideBin } = require('yargs/helpers');


//import { hideBin } from 'yargs/helpers'
//import notes from './notes.js'
//console.log(chalk.inverse.green.bgYellowBright('Success'))

//Add Command
yargs(hideBin(process.argv)).command({
    command:'add',
    describe:'Add Notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body)
    }
})
//Remove Command
.command({
    command:'remove',
    describe:'Remove Notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNotes(argv.title)
    }
})

//List Command
.command({
    command:'list',
    describe:'List Notes',
    handler() {
        notes.listNotes()
    }
})

//Read Command
.command({
    command:'read',
    describe:'Read Notes',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
}).parse()