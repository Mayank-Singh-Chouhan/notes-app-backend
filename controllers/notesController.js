const Note = require("../models/note");


const fetchNotes = async (req, res) => {
    try {
        // Find the notes
        const notes = await Note.find({ user: req.user._id });

        // Respond with them
        res.json({ notes });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


const createNote = async (req, res) => {
    try {
        // Get the sent in data off request body
        const { title, body } = req.body;

        // Create a note with it
        const note = await Note.create({
            title,
            body,
            user: req.user._id
        })

        // Respond with the new note
        res.json({ note })
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


const fetchNote = async (req, res) => {
    try {
        // Get id off the url
        const noteId = req.params.id;

        // Find the note using that id
        const note = await Note.findOne({ _id: noteId, user: req.user._id });

        // Respond with the note
        res.json({ note });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


const updateNote = async (req, res) => {
    try {
        // Get the id off the url
        const noteId = req.params.id;

        // Get the data off the req body
        const { title, body, isImp } = req.body;

        // Find and update the record
        await Note.findOneAndUpdate(
            { _id: noteId, user: req.user._id },
            { title, body, isImp }
        );

        // Find the updated note by id
        const note = await Note.findById(noteId);

        // Responde with it
        res.json({ note });

    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


const deleteNote = async (req, res) => {
    try {
        // Get the id off the url
        const noteId = req.params.id;

        // Find and delete the record
        const note = await Note.deleteOne({ _id: noteId, user: req.user._id });

        // Responde with it
        res.json({ success: "Record deleted" });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}


module.exports = {
    createNote,
    fetchNote,
    fetchNotes,
    updateNote,
    deleteNote
}