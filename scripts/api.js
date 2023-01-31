import { store } from "./store.js"


//---------- User ----------
export const signUp = (data) => {
	return fetch(`https://afternoon-savannah-60673.herokuapp.com/sign-up`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}

export const signIn = (data) => {
	return fetch(`https://afternoon-savannah-60673.herokuapp.com/sign-in`, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	})
}
//--------- Book ------------
    //INDEX
export const indexBooks = () => {
    return fetch(`https://afternoon-savannah-60673.herokuapp.com/books`,{
        headers: {
            'Authorization': `Bearer ${store.userToken}`
        }
    })
    
}
    //CREATE
export const createBook = (data) => {
    return fetch(`https://afternoon-savannah-60673.herokuapp.com/books`,{
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}
    //SHOW
export const showBook = (id) => {
    return fetch(`https://afternoon-savannah-60673.herokuapp.com/books/${id}`,{
        headers: {
            'Authorization': `Bearer ${store.userToken}`
        }
    })
}
    //UPDATE
export const updateBook = (data, id) => {
    return fetch(`https://afternoon-savannah-60673.herokuapp.com/books/${id}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': `Bearer ${store.userToken}`
        },
        body: JSON.stringify(data)
    })
}
    //DELETE
export const deleteBook = (id) => {
    return fetch(`https://afternoon-savannah-60673.herokuapp.com/books/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${store.userToken}`
        }
    })
}
//------------- Note -------------
    //CREATE
export const createNote = (data) => {
    return fetch(`https://afternoon-savannah-60673.herokuapp.com/notes`, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
}
    //UPDATE
export const updateNote = (data, noteId) => {
    return fetch(`https://afternoon-savannah-60673.herokuapp.com/notes/${noteId}`, {
        method: "PATCH",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)    
    })
}
    //DELETE
export const deleteNote = (bookId, noteId) => {    
    return fetch(`https://afternoon-savannah-60673.herokuapp.com/notes/${noteId}/${bookId}`, {
        method: "DELETE"
    })
}