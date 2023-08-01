const express = require('express');
const notesRouter = require('./assets/routes/notes');
// const api = require('./assets/js/index');

const PORT = process.env.port || 3001;

const app = express();

app.use('/api/notes', notesRouter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});