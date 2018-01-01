console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
	try {
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch (exception) {
		return [];
	}
};

var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var addNote = (title, body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	}

	var duplicatedNotes = notes.filter((note) => note.title === title);

	console.log('Find ', duplicatedNotes);
	if (duplicatedNotes.length === 0) {
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};

var getAll = () => {
	return fetchNotes();
};

var getNote = (title) => {
	var notes = fetchNotes();

	var filteredNotes = notes.filter((note) => note.title === title);

	return filteredNotes;
};

var removeNote = (title) => {
	var notes = fetchNotes();

	var filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes);

	return notes.length !== filteredNotes.length();
};

var logNote = (note) => {
	// Break on this line and use repl to output note
	// Use read command with --tile
	console.log('--');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
}

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
};