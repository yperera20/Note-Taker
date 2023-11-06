const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON data in requests
app.use(express.json());

// Serve static files from a 'public' directory
app.use(express.static('public'));

// HTML Routes
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// API Routes
app.get('/api/notes', (req, res) => {
  // Read notes from db.json
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      res.json([]);
    } else {
      const notes = JSON.parse(data);
      res.json(notes);
    }
  });
});

app.post('/api/notes', (req, res) => {
  // Read existing notes from db.json
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const notes = JSON.parse(data);

      // Create a new note
      const newNote = {
        id: Math.floor(Math.random() * 1000), // Generate a unique ID (you can use a library for better unique IDs)
        title: req.body.title,
        text: req.body.text,
      };

      notes.push(newNote);

      // Write updated notes to db.json
      fs.writeFile('db.json', JSON.stringify(notes), (err) => {
        if (err) {
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.json(newNote);
        }
      });
    }
  });
});

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
});
