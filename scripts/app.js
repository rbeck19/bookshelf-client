import {
    indexBooks,
    createBook,
    showBook,
    updateBook,
    deleteBook,
    updateNote,
    deleteNote,
    createNote,
    signUp,
    signIn
} from "./api.js"

import {
    onIndexBooksSuccess,
    onFailure,
    onCreateBookSuccess,
    onShowBookSuccess,
    onUpdateBookSucess,
    onDeleteBookSucess,
    onSignUpSucess,
    onSignInSucess
} from "./ui.js"

const createBookForm = document.querySelector("#create-book-form")
const indexBookContainer = document.querySelector("#index-book-container")
const showBookContainer = document.querySelector("#show-book-container")
const notesContainer = document.querySelector("#notes-container")
const createNoteContainer = document.querySelector("#create-note-container")
const signUpContainer = document.querySelector("#sign-up-form-container")
const signInContainer = document.querySelector("#sign-in-form-container")
    //list the books
// indexBooks()
//     .then(res => res.json())
//     .then(res => {
//         //console.log(res)
//         onIndexBooksSuccess(res.books)
//     })
//     .catch(onFailure)
    //create a new book
createBookForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const bookData = {
        book: {
            title: event.target["title"].value,
            author: event.target["author"].value,
        }
    }
    createBook(bookData)
        .then(onCreateBookSuccess)
        .catch(onFailure)
})
    //show one book button (display more)
indexBookContainer.addEventListener("click", (event) => {
    const id = event.target.getAttribute("data-id")
    if(!id) return
    showBook(id)
        .then(res => res.json())
        .then((res) => onShowBookSuccess(res.book))
        .catch(onFailure)
})
    //update book button
showBookContainer.addEventListener("submit", (event) => {
    event.preventDefault()
    const id = event.target.getAttribute("data-id")
    const bookData = {
        book: {
            title: event.target["title"].value,
            author: event.target["author"].value,
        }
    }
    updateBook(bookData, id)
        .then(onUpdateBookSucess)
        .catch(onFailure)
})
    //delete book button
showBookContainer.addEventListener("click", (event) => {
    event.stopPropagation()
    const id = event.target.getAttribute("data-bookid")
    if(!id) return
    deleteBook(id)
        .then(onDeleteBookSucess)
        .catch(onFailure)
})


    //create note button
createNoteContainer.addEventListener("submit", (event) => {
    event.preventDefault()
    const bookId = event.target.getAttribute("data-createId")
    //if(!bookId) return
    const noteData = {
        note: {
            content: event.target["content"].value,
            bookId: bookId
        }
    }
    createNote(noteData)
        .then(onCreateBookSuccess)
        .catch(onFailure)
})

    //update note button
notesContainer.addEventListener("submit", (event) => {
    event.preventDefault()

    const id = event.target.getAttribute("data-id")
    const bookId = event.target.getAttribute("data-bookId")

    const noteData = {
        note: {
            content: event.target["note"].value,
            bookId: bookId
        }
    }
    updateNote(noteData, id)
        .then(onUpdateBookSucess)
        .catch(onFailure)  
})


    //delete note button
notesContainer.addEventListener("click", (event) => {
    event.stopPropagation()
    const noteId = event.target.getAttribute("data-noteId")
    if(!noteId) return
    const bookId = event.target.getAttribute("data-bookId")
 
    //console.log(noteData)
    deleteNote(bookId, noteId)
        .then(onDeleteBookSucess)
        .catch(onFailure)
})

    //Sign Up
signUpContainer.addEventListener("submit", (event) => {
    event.preventDefault()
    const userData = {
        credentials: {
            email: event.target["email"].value,
            password: event.target["password"].value
        }
    }
    console.log(userData)
    signUp(userData)
        .then(onSignUpSucess)
        .catch(onFailure)
})

    //Sign In
signInContainer.addEventListener("submit", (event) => {
    event.preventDefault()
    const userData = {
        credentials: {
            email: event.target["email"].value,
            password: event.target["password"].value
        }
    }
    signIn(userData)
        .then((res) => res.json())
        .then((res) => onSignInSucess(res.token))
        .then(indexBooks)
        .then((res) => res.json())
        .then((res) => onIndexBooksSuccess(res.books))
        .catch(onFailure)
})