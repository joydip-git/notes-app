console.log('starting notes.js');
const fs = require('fs');

let fetchNotes = () => {
    try {
        let notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch (e) {
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

let addNote = (title, body) => {

    let note = {
        title: title,
        body: body
    };

    let notes = fetchNotes();
    if (notes.filter((no) => (no.title === note.title)).length == 0) {
        notes.push(note);
        saveNotes(notes);
        return note;
    }
    /*
    //alternate code after first line
    let note = null;
    let exists = fs.existsSync('notes-data.json');
    if (exists) {
        let notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString);
    }
    if (notes === undefined)
        notes = [];
    if (notes.filter((no) => (no.title === note.title)).length == 0){
        notes.push(note);
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
    }    
    */
};
let getAll = () => {
    //console.log('getting all the notes');
    try {
        return fetchNotes();
    } catch (error) {
        return [];
    }
};
let deleteNote = (title) => {
    //console.log('note to be removed is ' + title);
    let notes = fetchNotes();
    let filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return filteredNotes.length < notes.length;
};
let getNote = (title) => {
    //console.log('note to read ' + title);
    var notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes.length > 0 ? filteredNotes[0] : null;
}
module.exports = {
    getAll,
    getNote,
    deleteNote,
    addNote //:addNote
};