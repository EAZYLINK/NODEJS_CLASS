const fs = require('fs');
const cuid = require('cuid');

exports.createNote = async(req, res) => {
    try {
    const {title, content} = req.body
    date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
    const note = {
            noteId: cuid(),
            title: title,
            content: content,
            createdOn: date,
            modifiedOn: date
            }
        if (!title || !content) {
            res.status(400).json({message: 'Please provide all fields'})
        }
        const data = await fs.readFileSync('notes.json', 'utf8');
        parsedNote = JSON.parse(data.toString());
        parsedNote.push(note);
        await fs.writeFileSync('notes.json', JSON.stringify(parsedNote));
        res.status(201).json({
            message: 'Note created successfully',
            note
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
        
}

exports.getNotes = async(req, res) => {
    try {
      const notes = await  fs.readFileSync('notes.json', 'utf8')
        res.status(200).json({
            message: 'notes retrieved successfully',
            notes: JSON.parse(notes.toString())
        })
    } catch (error) {
        
    }
}

exports.getNoteById = (req, res, noteId) => {
    try {
    noteId = req.params.id
    if (!noteId) {
        res.status(400).json({message: 'Please provide the note ID'})
    }
   const note =  fs.readFileSync('notes.json', 'utf8');
        parsedNotes = JSON.parse(note.toString())
        const findNote = parsedNotes.find((note) => note.noteId === noteId)
        if (!findNote) {
            res.status(404).json({message: 'note not found'})
        }
            res.status(200).json({
            message: 'note retrieved successfully',
            note: findNote
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

exports.editNote = async(req, res)=>{
    try {
        const {title, content, noteId} = req.body
        if (!noteId) {
            res.status(400).json({message: 'Please provide the note ID'})
        }
        const note = await fs.readFileSync('notes.json', 'utf8')
            parsedNote = JSON.parse(note.toString())
            if (!parsedNote) {
                res.status(404).json({message: 'note not found'})
            }
            const findNote = parsedNote.find((Note)=> Note.noteId === noteId)
            if (!findNote) {
                res.status(404).json({message: 'note not found'})
            }
            const filteredNote = parsedNote.filter((Note)=> Note.noteId !== noteId)
            req.body.title !== undefined ? findNote.title = title : findNote.title = findNote.title
            req.body.content !== undefined ? findNote.content = content : findNote.content = findNote.content
            findNote.modifiedOn = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            findNote.createdOn = findNote.createdOn
            findNote.noteId = findNote.noteId
            filteredNote.push(findNote)
           await fs.writeFileSync('notes.json', JSON.stringify(filteredNote))
            res.status(201).json({
                message: 'note updated successfully',
                note: findNote
            })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}



exports.deleteNoteById = (req, res, query)=>{
    const noteId = query.toString().split('=')[1]

    if (!noteId) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({message: 'Email and password are required as query params'}));
    }
    fs.readFileSync('notes.json', 'utf8', (err, note)=>{
        if (err) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: "unable to read file"})) 
        }
        parsedNote = JSON.parse(note.toString())
        if (!parsedNote) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: "No note found"})) 
        }
        const findNote = parsedNote.find((note)=> note.noteId === noteId)
        if (!findNote) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: "No note found"}))
        }
        const filterednote = parsedNote.filter((note)=> note.noteId !== noteId)
        fs.writeFileSync('notes.json', JSON.stringify(filterednote), err => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({message: 'Internal Server Error'}));
            }
            res.writeHead(201, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({
                message: 'note deleted successfully'
            }));
        })
    })
}

