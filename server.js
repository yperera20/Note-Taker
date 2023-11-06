const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Connect to the SQLite database
const db = new sqlite3.Database('./db/notes.db');

// Create a table to store notes (you may need to adjust the schema).
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY, title TEXT, text TEXT)");
});

// Serve static files from the "public" folder
app.use(express.static('public'));

// Define API endpoints below

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
