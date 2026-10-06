const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.json({
        message: "Notes API is running"
    });
});

// Create a new note
app.post("/notes", (req, res) => {
    const { title, content } = req.body;

    // Validate input
    if (!title || !content) {
        return res.status(400).json({
            error: "Title and content are required"
        });
    }

    // Read existing notes
    const notes = JSON.parse(fs.readFileSync("notes.json", "utf-8"));

    // Create new note
    const newNote = {
        id: notes.length + 1,
        title: title,
        content: content
    };

    // Add note
    notes.push(newNote);

    // Save to JSON file
    fs.writeFileSync(
        "notes.json",
        JSON.stringify(notes, null, 2)
    );

    // Send response
    res.status(201).json(newNote);
});

// Get a single note by ID
app.get("/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("notes.json", "utf-8"));

    const id = parseInt(req.params.id);

    const note = notes.find(note => note.id === id);

    if (!note) {
        return res.status(404).json({
            error: "Note not found"
        });
    }

    res.status(200).json(note);
});

// Update a note
app.put("/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("notes.json", "utf-8"));

    const id = parseInt(req.params.id);
    const { title, content } = req.body;

    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex === -1) {
        return res.status(404).json({
            error: "Note not found"
        });
    }

    if (!title || !content) {
        return res.status(400).json({
            error: "Title and content are required"
        });
    }

    notes[noteIndex].title = title;
    notes[noteIndex].content = content;

    fs.writeFileSync(
        "notes.json",
        JSON.stringify(notes, null, 2)
    );

    res.status(200).json(notes[noteIndex]);
});

// Delete a note
app.delete("/notes/:id", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("notes.json", "utf-8"));

    const id = parseInt(req.params.id);

    const noteIndex = notes.findIndex(note => note.id === id);

    if (noteIndex === -1) {
        return res.status(404).json({
            error: "Note not found"
        });
    }

    const deletedNote = notes.splice(noteIndex, 1)[0];

    fs.writeFileSync(
        "notes.json",
        JSON.stringify(notes, null, 2)
    );

    res.status(200).json({
        message: "Note deleted successfully",
        note: deletedNote
    });
});

// Get all notes
app.get("/notes", (req, res) => {
    const notes = JSON.parse(fs.readFileSync("notes.json", "utf-8"));

    res.status(200).json(notes);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});