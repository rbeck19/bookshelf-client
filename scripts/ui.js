

const messageContainer = document.querySelector("#message-container")
const indexBookContainer = document.querySelector("#index-book-container")
const showBookContainer = document.querySelector("#show-book-container")

export const onIndexBooksSuccess = (books) => {
    books.forEach(book => {
        const div = document.createElement("div")
        div.innerHTML = 
            `
            <h3>${book.title}</h3>
            <button data-id=${book._id}>Display More</button>
            `
        indexBookContainer.appendChild(div)
    })
}

export const onFailure = (error) => {
    messageContainer.innerHTML = 
        `
        <h3>You have an Error</h3>
        <p>${error}</p> 
        `
}

export const onCreateBookSuccess = () => {
    messageContainer.innerText = "You have created a book"
}

export const onShowBookSuccess = (book => {
        //clears the container
    // while(showBookContainer.firstChild){
    //     showBookContainer.removeChild(showBookContainer.lastChild)
    // }
    const div = document.createElement("div")
    div.innerHTML = 
        `
        <h3>${book.title}</h3>
        <p>${book.author}</p>
        <p>${book.notes[0].content}</p>
        `
    showBookContainer.appendChild(div)
})

export const onUpdateBookSucess = () => {
    messageContainer.innerText = "Update was successful"
}

export const onDeleteBookSucess = () => {
    messageContainer.innerText = "Delete was successful"
}

//  ${book.notes[0].content}     displays content of array 0