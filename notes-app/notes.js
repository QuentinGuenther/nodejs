const fs = require('fs')
const chalk = require('chalk')

const header = chalk.magenta.bold.underline
const success = chalk.black.bgGreen
const error = chalk.bgRed

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNote = notes.find((note) => note.title === title)

  if(!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
  
    saveNotes(notes)
    console.log(success('Note saved'))
  } else {
    console.log(error('Note title taken!'))
  }
}

const removeNote = (title) => {
  const notes = loadNotes()
  const notesToKeep = notes.filter((note) => {
    return note.title !== title
  })

  if(notes.length > notesToKeep.length) {
    saveNotes(notesToKeep)
    console.log(success('Note removed'))
  } else {
    console.log(error('Note does not exist!'))
  }
  
}

const listNotes = () => {
  const notes = loadNotes()

  console.log(header('Your Notes'));
  notes.forEach(element => {
    console.log('\t- ' + element.title)
  })
}

const readNote = (title) => {
  const notes = loadNotes()
  const note = notes.find((note) => note.title === title)

  if(note) {
    console.log(header(note.title))
    console.log(note.body)
  } else {
    console.log(error('Note title not found'))
  }
}

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)

  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch(e) {
    return []
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}