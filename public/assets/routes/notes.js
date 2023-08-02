const express = require('express');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
// const { readFile, writeFile  } = require('../helpers/fsUtils');

const notes = express.Router(); // Create an instance of Express router

// const dbFilePath = path.join(__dirname, './db/db.json');
const dbFilePath = path.join(__dirname, "../../../db/db.json");

// POST Route for submitting a new note
notes.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  console.log(req.body);
  const { title, text } = req.body;

  // Validate that both title and text are provided
  if (!title || !text) {
    return res.status(400).json({ error: 'Both title and text are required.' });
  }

  // Read the existing notes from the file
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data from the server.' });
    }

    // Parse the data from JSON to an array of notes
    let notes = JSON.parse(data);

    // Create a new note object with a unique ID
    const newNote = {
      id: uuidv4(),
      title,
      text,
    };

    // Add the new note to the existing notes array
    notes.push(newNote);

    // Write the updated notes array back to the file
    fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to save the new note to the server.' });
      }

      // Respond with the newly created note
      res.json(newNote);
    });
  });
});

// GET Route for retrieving all notes
notes.get('/', (req, res) => {
  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data from the server.' });
    }

    // Parse the data from JSON to an array of notes
    const notesList = JSON.parse(data);

    // Respond with the list of all notes
    res.json(notesList);
  });
});

// GET Route for retrieving a specific note by ID
notes.get('/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data from the server.' });
    }

    // Parse the data from JSON to an array of notes
    const notesList = JSON.parse(data);

    // Find the note with the specified ID in the notes array
    const foundNote = notesList.find((note) => note.id === noteId);

    if (!foundNote) {
      return res.status(404).json({ error: 'Note not found.' });
    }

    // Respond with the found note
    res.json(foundNote);
  });
});

// DELETE Route for deleting a note by ID
notes.delete('/:id', (req, res) => {
  const noteId = req.params.id;

  fs.readFile(dbFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read data from the server.' });
    }

    // Parse the data from JSON to an array of notes
    let notesList = JSON.parse(data);

    // Find the index of the note with the specified ID in the notes array
    const noteIndex = notesList.findIndex((note) => note.id === noteId);

    if (noteIndex === -1) {
      return res.status(404).json({ error: 'Note not found.' });
    }

    // Remove the note from the notes array
    const deletedNote = notesList.splice(noteIndex, 1)[0];

    // Write the updated notes array back to the file
    fs.writeFile(dbFilePath, JSON.stringify(notesList), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Failed to delete the note from the server.' });
      }

      // Respond with the deleted note
      res.json(deletedNote);
    });
  });
});


module.exports = notes;

