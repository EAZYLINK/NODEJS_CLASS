const fs = require('fs')
const Notes = []

exports.createNote = (req, res) => {
    let data = ''
    req.on('data', (chunk) => {
        data += chunk
    })
    req.on('end', ()=>{
        data = JSON.parse(data.toString())
        const note = {
        id: data.id,
        title: data.title,
        content: data.content
        } 
        if(!note.id || !note.title || !note.content) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: 'Missing required fields'}))
        }
       if ((fs.existsSync('note.json')) === false) {
            Notes.push(note)
         fs.writeFile('note.json', JSON.stringify(Notes), (err) => {
                console.log('writing file')
                if(err) {
                    res.writeHead(500, {'Content-Type': 'application/json'})
                    return res.end(JSON.stringify({error: 'Could not store data'}))
                }
                return res.end(JSON.stringify({
                    message: 'note created successfully',
                    data: note
                }))
            })
        } else {
            fs.readFile('note.json', (err, data) => {
                if(err) {
                    res.writeHead(500, {'Content-Type': 'application/json'})
                    return res.end(JSON.stringify({error: err}))
                }
                dataToString = data.toString()
                if (dataToString === '') {
                Notes.push(note)   
                } else {
                Notes.push(JSON.parse(data))
                Notes.push(note)
                }
            fs.writeFile('note.json', JSON.stringify(Notes), (err) => {
                    if(err) {
                        res.writeHead(500, {'Content-Type': 'application/json'})
                        return res.end(JSON.stringify({error: 'Could not store data'}))
                    }
                })
                res.end(JSON.stringify({
                    statusCode: 201,
                    message: 'note created successfully'
                }))
            })
        }
    })
}

exports.getNote = (req, res) => {
    fs.readFile('note.json', (err, data) => {
        if(err) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: 'Could not read data'}))
        }
        if(data.toString()==='')
        notes = []
        const notes = JSON.parse(data.toString())
        return res.end(JSON.stringify({
            statusCode: 200,
            message: 'notes retrieved successfully',
            data: notes
        }))
    })
}

exports.getnoteById = (req, res, query) => {
    const id = query.id
    if(!id) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        return res.end(JSON.stringify({error: 'note id is required'}))
    }
    fs.readFile('note.json', (err, data) => {
        if(err) {
            res.writeHead(500, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: 'Could not read data'}))
        }
        const notes = JSON.parse(data)
        const note = notes.find(note => note.id === id)
        if(!note) {
            res.writeHead(404, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: 'note not found'}))
        }
        return res.end(JSON.stringify({
            statusCode: 200,
            message: 'note retrieved successfully',
            data: note
        }))
    })
}

exports.updateNoteById = (req, res) => {
    let data = ''
    req.on('data', (chunk) => {
        data += chunk
    })
    req.on('end', ()=>{
        data = JSON.parse(data.toString())
        const note = {
        id: data.id,
        title: data.title,
        content: data.content
        } 
        if(!note.id || !note.title || !note.content) {
            res.writeHead(400, {'Content-Type': 'application/json'})
            return res.end(JSON.stringify({error: 'Missing required fields'}))
        }
        fs.readFile('note.json', (err, data) => {
            if(err) {
                res.writeHead(500, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({error: 'Could not read data'}))
            }
            const notes = JSON.parse(data)
            const noteIndex = notes.findIndex(note => note.id === note.id)
            if(noteIndex === -1) {
                res.writeHead(404, {'Content-Type': 'application/json'})
                return res.end(JSON.stringify({error: 'note not found'}))
            }
            notes[noteIndex] = note
            fs.writeFile('note.json', JSON.stringify(notes), (err) => {
                if(err) {
                    res.writeHead(500, {'Content-Type': 'application/json'})
                    return res.end(JSON.stringify({error: 'Could not store data'}))
                }
                return res.end(JSON.stringify({
                    statusCode: 200,
                    message: 'note updated successfully',
                    data: note
                }))
            })
        })
    })
}