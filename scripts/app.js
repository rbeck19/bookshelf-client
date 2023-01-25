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

indexBooks()
    .then(res => res.json())
    .then(res => {
        console.log(res)
        onIndexBooksSuccess(res.books)
    })
    .catch(onFailure)

createBookForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const bookData = {
        book: {
            title: event.target["title"].value,
            author: event.target["author"].value,
            notes: event.target["note"].value
        }
    }
    createBook(bookData)
        .then(onCreateBookSuccess)
        .catch(onFailure)
})

indexBookContainer.addEventListener("click", (event) => {
    const id = event.target.getAttribute("data-id")
    if(!id) return
    showBook(id)
        .then(res => res.json())
        .then((res) => onShowBookSuccess(res.book))
        .catch(onFailure)
})