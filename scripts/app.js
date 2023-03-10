import { counter } from "./store.js"
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
    onShowBookSuccess,
    onSignUpSucess,
    onSignInSucess
} from "./ui.js"
const navBar = document.querySelector("nav")
const authorizationContainer = document.querySelector("#authorization-container")
const bookDisplay = document.querySelector("#book-display")
const createBookForm = document.querySelector("#create-book-form")
const indexBookContainer = document.querySelector("#index-book-container")
const showBookContainer = document.querySelector("#show-book-container")
const notesContainer = document.querySelector("#notes-container")
const createNoteContainer = document.querySelector("#create-note-container")
const signUpContainer = document.querySelector("#sign-up-form-container")
const signInContainer = document.querySelector("#sign-in-form-container")
const myBooksNav = document.querySelector(".myBooks")
const signOutNav = document.querySelector(".signOut")
//---------- Nav Bar Actions -----------------
myBooksNav.addEventListener("click", (event) => {
        //display create book form and book list
    createBookForm.classList.remove("hide")
    indexBookContainer.classList.remove("hide")
        //hide show book and note
    showBookContainer.classList.add("hide")    
    notesContainer.classList.add("hide")
    createNoteContainer.classList.add("hide")
})
signOutNav.addEventListener("click", (event) => {
    navBar.classList.add("hide")
    authorizationContainer.classList.remove("hide")
    bookDisplay.classList.add("vis")
})
//---------- BOOK Actions --------------
    //CREATE a new book
createBookForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const bookData = {
        book: {
            title: event.target["title"].value,
            author: event.target["author"].value,
        }
    }
    createBook(bookData)
        .then(indexBooks)
        .then((res) => res.json())
        .then((res) => onIndexBooksSuccess(res.books))
        .catch(onFailure)
})
    //SHOW one book button (display more)
indexBookContainer.addEventListener("click", (event) => {
    const id = event.target.getAttribute("data-id")
    if(!id) return
        //hide books
    createBookForm.classList.add("hide")
    indexBookContainer.classList.add("hide")
        //hide show book and note
    showBookContainer.classList.remove("hide")    
    notesContainer.classList.remove("hide")
    createNoteContainer.classList.remove("hide")
    showBook(id)
        .then(res => res.json())
        .then((res) => onShowBookSuccess(res.book))
        .catch(onFailure)
})
    //UPDATE Book button
showBookContainer.addEventListener("submit", (event) => {
    event.preventDefault()
    const id = event.target.getAttribute("data-id")
    const bookData = {
        book: {
            title: event.target["title"].value,
            author: event.target["author"].value,
        }
    }
        //update the book 
    updateBook(bookData, id)
            //redisplay the updated book
        .then(() => {
                //update the book list on screen
            indexBooks()
                .then((res) => res.json())
                .then((res) => onIndexBooksSuccess(res.books))
                //update the shown book with change made
            showBook(id)
                .then(res => res.json())
                .then((res) => onShowBookSuccess(res.book))
        })
        .catch(onFailure)
})
    //DELETE Book button
showBookContainer.addEventListener("click", (event) => {
    event.stopPropagation()
    const bookId = event.target.getAttribute("data-bookid")
    if(!bookId) return
        //display creat book form ansd book list
    createBookForm.classList.remove("hide")
    indexBookContainer.classList.remove("hide")
        //hide show book and note
    showBookContainer.classList.add("hide")    
    notesContainer.classList.add("hide")
    createNoteContainer.classList.add("hide")
    deleteBook(bookId)
        .then(() => {
                //clears the show book container
            while(showBookContainer.firstChild){
                showBookContainer.removeChild(showBookContainer.lastChild)
            }
                //clears notes container
            while(notesContainer.firstChild){
                notesContainer.removeChild(notesContainer.lastChild)
            }
                //clear out note form container
            while(createNoteContainer.firstChild){
                createNoteContainer.removeChild(createNoteContainer.lastChild)
            }
                //update book list on screen
            indexBooks()
                .then((res) => res.json())
                .then((res) => onIndexBooksSuccess(res.books))
        })
        .catch(onFailure)
})
    //when clicking on Book title or author toggle display update and delete form
showBookContainer.addEventListener("click", (event) => {
    const title = event.target
    if(title.tagName === "SPAN"){
        const bookUDs = document.querySelectorAll(".bookUD")
        if(counter.bookCount == 0) {
            for(const bookUD of bookUDs){
                bookUD.classList.remove("hide")
                counter.bookCount += 1
            } 
        } else {
            for(const bookUD of bookUDs){
                bookUD.classList.add("hide")
                counter.bookCount -= 1
            } 
        }      
    }
})
//------------- NOTE Actions ------------------
    //CREATE Note button
createNoteContainer.addEventListener("submit", (event) => {
    event.preventDefault()
    const bookId = event.target.getAttribute("data-createId")
    if(event.target["content"].value === ""){
        return
    }
    const noteData = {
        note: {
            content: event.target["content"].value,
            bookId: bookId
        }
    }
    createNote(noteData)
        .then(() => {
                //after creating note update the book on screen 
            showBook(noteData.note.bookId)
                .then(res => res.json())
                .then((res) => onShowBookSuccess(res.book))
        })
        .catch(onFailure)
})
    //UPDATE Note button
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
        .then(() => {
            showBook(bookId)
                .then(res => res.json())
                .then((res) => onShowBookSuccess(res.book))
        })
        .catch(onFailure)  
})
    //DELETE Note button
notesContainer.addEventListener("click", (event) => {
    event.stopPropagation()
    const noteId = event.target.getAttribute("data-noteId")
    if(!noteId) return
    const bookId = event.target.getAttribute("data-bookId")
    deleteNote(bookId, noteId)
        .then(() => {
            showBook(bookId)
                .then(res => res.json())
                .then((res) => onShowBookSuccess(res.book))
        })
        .catch(onFailure)
})
    //when clicking on Book title or author toggle display update and delete form
notesContainer.addEventListener("click", (event) => {
    const title = event.target
    if(title.tagName === "SPAN"){
        const noteUDs = document.querySelectorAll(".noteUD")
        if(counter.noteCount == 0) {
            for(const noteUD of noteUDs){
                noteUD.classList.remove("hide")
                counter.noteCount += 1
            } 
        } else {
            for(const noteUD of noteUDs){
                noteUD.classList.add("hide")
                counter.noteCount -= 1
            } 
        }           
    }
})
//----------- User account -------------
    //Sign Up
signUpContainer.addEventListener("submit", (event) => {
    event.preventDefault()
    const userData = {
        credentials: {
            email: event.target["email"].value,
            password: event.target["password"].value
        }
    }
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