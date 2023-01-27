import { store } from "./store.js"


//---------- User ----------
export const signUp = (data) => {
	return fetch(`http://localhost:8000/sign-up`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const signIn = (data) => {
	return fetch(`http://localhost:8000/sign-in`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}


//--------- Book ------------
export const indexBooks = () => {
    return fetch(`http://localhost:8000/books`,{
        headers: {
            'Authorization': `Bearer ${store.userToken}`
        }
    })
    
}

export const createBook = (data) => {
    return fetch(`http://localhost:8000/books`,{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const showBook = (id) => {
    return fetch(`http://localhost:8000/books/${id}`,{
        headers: {
            'Authorization': `Bearer ${store.userToken}`
        }
    })
}

export const updateBook = (data, id) => {
    return fetch(`http://localhost:8000/books/${id}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}

export const deleteBook = (id) => {
    return fetch(`http://localhost:8000/books/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${store.userToken}`
        }
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

export const deleteNote = (bookId, noteId) => {    
    return fetch(`http://localhost:8000/notes/${noteId}/${bookId}`, {
        method: "DELETE"
    })
}
