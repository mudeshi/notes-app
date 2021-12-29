const fs = require('fs')
const chalk = require('chalk')

const addNotes =  (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('Note is added'))
    }
    else   
        console.log(chalk.red.inverse('Note Title is Taken!'))
}

const removeNotes = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => note.title !== title)

    if(notesToKeep.length < notes.length) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note with the title ' +title+ ' has been removed'))    
    } else {
        console.log(chalk.red.inverse('Note not found!'))
    }

}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.inverse('List of Notes'))
    notes.forEach(note => {
        console.log(chalk.gray.inverse(note.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title === title)
    if(findNote) {
        console.log(chalk.green.inverse('Title:' +findNote.title+ ' Body:' +findNote.body))
    } else {
        console.log(chalk.red.inverse('Note Not Found!'))
    }
}

const loadNotes = () => {

    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e)
        {
            return []
        }

}

module.exports = {
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes: listNotes,
    readNote: readNote
}