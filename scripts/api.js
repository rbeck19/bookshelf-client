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


