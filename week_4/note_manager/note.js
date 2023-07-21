const fs = require('fs');

exports.createNote = (req, res) => {
    let data = ''
    req.on('data', chunk => {
        data += chunk;
    })
    req.on('end', () => {
        data = JSON.parse(data.toString());
        date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        const note = {
            noteId: data.id,
            title: data.title,
            content: data.content,
            createdOn: date,
            modifiedOn: date
        }
        if (!note.noteId || !note.title || !note.content) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({message: 'Please provide all fields'}));
        }
        fs.readFile('notes.json', 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({message: 'Internal Server Error'}));
            }
            parsedNote = JSON.parse(data.toString());
            parsedNote.push(note);
            fs.writeFile('notes.json', JSON.stringify(parsedNote), err => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    return res.end(JSON.stringify({message: 'Internal Server Error'}));
                }
                res.writeHead(201, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({
                    message: 'Note created successfully',
                    note
                }));
            })
        })
})
}

exports.getNotes = (req, res) => {
    fs.readFile('notes.json', 'utf8', (err, notes) => {
        if (err) {
            res.writeHead(500, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({message: 'Internal Server Error'}));
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
       res.end(JSON.stringify({
            message: 'notes retrieved successfully',
            notes: JSON.parse(notes.toString())
        }));
    })
}

exports.getNoteById = (req, res, query) => {
    noteId = query.toString().split('=')[1]
    if (!noteId) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({error: "note ID param is required"}))
    }
    fs.readFile('notes.json', 'utf8', (err, note)=>{
        if (err) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({error: "unable to read file"})) 
        }
        parsedNotes = JSON.parse(note.toString())
        const findNote = parsedNotes.find((note) => note.noteId === noteId)
        if (!findNote) {
            res.writeHead(404, {'Content-Type': 'application/json'})
           return res.end(JSON.stringify({error: "note with this email not found"}))
        }
            res.end(JSON.stringify({
            statusCode: 200,
            message: "note retrieved successfully",
            note: findNote
        }))
    })
}

exports.editNote = (req, res)=>{
    data = ''
    req.on('data', (chunk)=>{
        data += chunk
    })
    req.on('end', ()=>{
        data = JSON.parse(data.toString())
        if (!data.noteId || !data.title || !data.content) {
            res.writeHead(400, {'Content-Type': 'application/json'});
            return res.end(JSON.stringify({message: 'Please provide all fields'}));
        }
        fs.readFile('notes.json', 'utf8', (err, note)=>{
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({error: "unable to read file"})) 
            }
            parsedNote = JSON.parse(note.toString())
            if (!parsedNote) {
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({error: "No Note found"})) 
            }
            const findNote = parsedNote.find((Note)=> Note.noteId === data.noteId)
            if (!findNote) {
                res.writeHead(404, {'Content-Type': 'application/json'})
                res.end(JSON.stringify({error: "No Note found"}))
            }
            const filteredNote = parsedNote.filter((Note)=> Note.noteId !== data.noteId)
            data.createdOn = findNote.createdOn
            data.modifiedOn = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
            filteredNote.push(data)
            fs.writeFile('notes.json', JSON.stringify(filteredNote), err => {
                if (err) {
                    res.writeHead(500, {'Content-Type': 'application/json'});
                    return res.end(JSON.stringify({message: 'Internal Server Error'}));
                }
                res.writeHead(201, {'Content-Type': 'application/json'});
                return res.end(JSON.stringify({
                    message: 'Note updated successfully',
                    Note: data
                }));
            })
        })
    })
}



exports.deleteNoteById = (req, res, query)=>{
    const noteId = query.toString().split('=')[1]

    if (!noteId) {
        res.writeHead(400, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify({message: 'Email and password are required as query params'}));
    }
    fs.readFile('notes.json', 'utf8', (err, note)=>{
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
        fs.writeFile('notes.json', JSON.stringify(filterednote), err => {
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

