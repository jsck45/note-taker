const express = require('express');
const notesRouter = require('./public/assets/routes/notes');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public', { 'Content-Type': 'application/javascript' }));
app.use('/api/notes', notesRouter);

// Route to serve the index.html for the root ('/') route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
