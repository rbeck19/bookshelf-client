import { store, counter } from "./store.js"
const navBar = document.querySelector("nav")
const messageContainer = document.querySelector("#message-container")
const indexBookContainer = document.querySelector("#index-book-container")
const showBookContainer = document.querySelector("#show-book-container")
const notesContainer = document.querySelector("#notes-container")
const createNoteContainer = document.querySelector("#create-note-container")
const authorizationContainer = document.querySelector("#authorization-container")
const bookDisplay = document.querySelector("#book-display")

export const onIndexBooksSuccess = (books) => {
        //clear out the container
    while(indexBookContainer.firstChild){
        indexBookContainer.removeChild(indexBookContainer.lastChild)
    }
    books.forEach(book => {
        const div = document.createElement("div")
        div.innerHTML = 
            `
            <h3>${book.title}</h3>
            <button class="btn btn-primary btn-sm" data-id=${book._id}>Display More</button>
            `
        indexBookContainer.appendChild(div)
    })
}
    // SHOW Book and Note Information
export const onShowBookSuccess = (book => {
        //create toggle counter for book update form and delete button  
    counter.bookCount = 0 
        //create toggle counter for note update form and delete button 
    counter.noteCount = 0
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
        //create the book display more
    const div = document.createElement("div")
    div.innerHTML = 
        `
        <h2 class="display-5"><span>${book.title}</span></h2>
        <h2 class="display-6"><span>By: ${book.author}<span></h2>
       
        <form data-id="${book._id}" class="bookUD hide">
            <div class="mb-1 form-outline w-50">
                <label for="title" class="form-label">Book Title</label>
                <input type="text" class="form-control" name="title" value="${book.title}">
            </div>
            <div class="mb-1 form-outline w-50">
                <label for="author" class="form-label">Author</label>
                <input type="text" class="form-control" name="author" value="${book.author}">
                <input type="submit" class="btn btn-info btn-sm" value="Update Book"/>              
            </div>            
        </form>
        <button  class="btn btn-warning btn-sm bookUD hide" data-bookid="${book._id}">Delete Book</button>            
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
            <p class="lead"><span>${note.content}</span></p>
            <form data-id="${note._id}" data-bookId="${book._id}" class="noteUD hide">
                <div class="mb-1 form-outline w-50">
                    <input type="text" name="note" class="form-control" value="${note.content}" />               
                    <input class="btn btn-info btn-sm" type="submit" value="Update Note" /> 
                </div>    
            </form>
            <button class="btn btn-warning btn-sm noteUD hide" data-noteId="${note._id}" data-bookId="${book._id}">Delete Note</button>              
            `
                //div placed in and out of form to allow for single line button placement 
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
//------------ message container ----------
export const onFailure = (error) => {
    messageContainer.innerHTML = 
        `
        <h3>You have an Error</h3>
        <p>${error}</p> 
        `
}
//------- Sign-In - Sign-Up ------------
export const onSignUpSucess = () => {
    messageContainer.innerHTML = "You have created a new user."
}
export const onSignInSucess = (userToken) => {
    messageContainer.innerHTML = ""
    store.userToken = userToken
    authorizationContainer.classList.add("hide")
    bookDisplay.classList.remove("vis")
    navBar.classList.remove("hide")
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