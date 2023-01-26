import {
    indexBooks,
    createBook,
    showBook,
    updateBook,
    deleteBook
} from "./api.js"

import {
    onIndexBooksSuccess,
    onFailure,
    onCreateBookSuccess,
    onShowBookSuccess,
    onUpdateBookSucess,
    onDeleteBookSucess
} from "./ui.js"

const createBookForm = document.querySelector("#create-book-form")
const indexBookContainer = document.querySelector("#index-book-container")
const showBookContainer = document.querySelector("#show-book-container")
const noteContainer = document.querySelector(".note-container")
    //list the books
indexBooks()
    .then(res => res.json())
    .then(res => {
        console.log(res)
        onIndexBooksSuccess(res.books)
    })
    .catch(onFailure)
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
    const id = event.target.getAttribute("data-id")
    if(!id) return
    deleteBook(id)
        .then(onDeleteBookSucess)
        .catch(onFailure)
})
    //create note button


    //update note button
// noteContainer.addEventListener("submit", (event) => {
//     event.preventDefault()
//     const 
// })


    //delete note button