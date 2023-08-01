const express = require('express');
const notesRouter = require('./assets/routes/notes');
const cors = require('cors'); // Require the cors package

// const api = require('./assets/js/index');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(cors()); // Enable CORS for all routes before defining the routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api/notes', notesRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
