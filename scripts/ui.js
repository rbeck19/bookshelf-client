//  ${book.notes[0].content}     displays content of array 0

const messageContainer = document.querySelector("#message-container")
const indexBookContainer = document.querySelector("#index-book-container")
const showBookContainer = document.querySelector("#show-book-container")
const notesContainer = document.querySelector("#notes-container")
const createNoteContainer = document.querySelector("#create-note-container")

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
    const div = document.createElement("div")
    div.innerHTML = 
        `
        <h3>${book.title}</h3>
        <p>${book.author}</p>
       
        <form data-id="${book._id}">
            <input type="text" name="title" value="${book.title}" />
            <input type="text" name="author" value="${book.author}" />
            <input type="submit" value="Update Book" />
        </form>
        <button data-id="${book._id}">Delete Book</button>
        `
    showBookContainer.appendChild(div)

        //run through each note and create a div
    if(book.notes.length == 0){
        //return ""
    } else{
        book.notes.forEach(note => {
            const div = document.createElement("div")
            div.innerHTML= 
            `
            <p>${note.content}</p>

            <form data-id="${note._id}" data-bookId="${book._id}">
            <input type="text" name="note" value="${note.content}" />
            <input type="submit" value="Update Note" />
            </form>
            <button data-noteId="${note._id}" data-bookId="${book._id}">Delete Note</button>
            `
            notesContainer.appendChild(div)
        })
    }
  
    const divCreateNote = document.createElement("div")
    divCreateNote.innerHTML = 
        `
        <form data-createId="${book._id}">
        <div class="mb-1 form-outline w-50">
        <label for="content" class="form-label">Add A Note</label>
        <input type="text" class="form-control" name="content">
        </div>
        <button data-createId="${book._id}" type="submit" class="btn btn-success">Create</button>
        </form>
        `
    createNoteContainer.appendChild(divCreateNote)
})

export const onUpdateBookSucess = () => {
    messageContainer.innerText = "Update was successful"
}

export const onDeleteBookSucess = () => {
    messageContainer.innerText = "Delete was successful"
}







          // const form = document.createElement("form")
            // form.classList.add("note-container")
            // form.setAttribute("data-id",note._id)
            // const noteInput = document.createElement("input")
            // noteInput.setAttribute("name","note")
            // noteInput.setAttribute("type","text")
            // noteInput.setAttribute("value",note.content)
            // const submitButton = document.createElement("button")
            // submitButton.textContent = "Update Note"
            // form.appendChild(noteInput)
            // form.appendChild(submitButton)
            // showBookContainer.appendChild(div)