console.log('starting app');

const fs = require('fs');
const yargs = require('yargs');
const _ = require('lodash');

const notes = require('./notes.js');

//let command = process.argv[2];

const titleObj = {
    describe: 'Title of the note',
    demand: true,
    alias: 't'
};
const bodyObj = {
    describe: 'Body for the note',
    demand: true,
    alias: 'b'
};


//let argv = yargs.argv;
const argv = yargs.command('add', 'Add a new note', {
        title: titleObj,
        body: bodyObj
    })
    .command('list', 'gets all the notes')
    .command('remove', 'Removes an existing note', {
        title: titleObj
    })
    .command('read', 'Reads an existing note', {
        title: titleObj
    })
    .help()
    .argv;
let command = yargs.argv._[0];
//console.log(argv._[0]); //this is equal to process.argv[2];

if (command === 'add') {
    //console.log('add new note');
    let note = notes.addNote(argv.title, argv.body);
    console.log(note ? 'note added' : 'note already exists');
    console.log(note ? `Title: ${note.title}` : '');
} else if (command === 'list') {
    let allNotes = notes.getAll();
    if (allNotes.length > 0) {
        allNotes.forEach(element => {
            console.log(`Title:${element.title}; Body:${element.body}`);
            console.log();
        });
    }
} else if (command === 'remove') {
    let isRemoved = notes.deleteNote(argv.title);
    console.log(isRemoved ? `Note: ${argv.title} got removed ` : `no note found with title ${argv.title} that can be removed`);
} else if (command === 'read') {
    let note = notes.getNote(argv.title);
    if (note) {
        console.log(`Note found.`);
        console.log(`Title:${note.title}; Body:${note.body}`);
    } else {
        console.log(`Note not found`);
    }
} else if (command === undefined) {
    console.log('no command passed');
} else {
    console.log('incorrect command');
}