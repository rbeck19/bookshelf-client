export const indexBooks = () => {
    return fetch(`http://localhost:8000/books`)
}

export const createBook = (data) => {
    return fetch(`http://localhost:8000/books`,{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

export const showBook = (id) => {
    return fetch(`http://localhost:8000/books/${id}`)
}

export const updateBook = (data, id) => {
    return fetch(`http://localhost:8000/books/${id}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

export const deleteBook = (id) => {
    return fetch(`http://localhost:8000/books/${id}`, {
        method: "DELETE"
    })
}

//------------- Note -------------

export const createNote = (data) => {
    return fetch(`http://localhost:8000/notes`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}

export const updateNote = (data, noteId) => {
    return fetch(`http://localhost:8000/notes/${noteId}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)    
    })
}

export const deleteNote = (noteData, noteId) => {
    return fetch(`http://localhost:8000/notes/${noteId}`, {
        method: "DELETE",
        body: JSON.stringify(noteData)
    })
}