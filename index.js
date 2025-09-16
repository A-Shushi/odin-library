const tableBody = document.querySelector("#table-body")

// Add Book Form Elements
const newBookButton = document.querySelector("#new-book-button")
const addBookDialog = document.querySelector("#new-book-dialog")
const closeDialogButton = document.querySelector("#close-dialog-button")
const bookForm = document.querySelector("#new-book-form")
const titleInput = document.querySelector("#book-title")
const authorInput = document.querySelector("#book-author")
const pagesInput = document.querySelector("#book-pages")
const readCheckbox = document.querySelector("#read-status")
const addBookButton = document.querySelector("#add-book-button")

const myLibrary = []

function Book(title, author, pages, readStatus, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = id;
}

function addBookToLibrary(title, author, pages, readStatus) {
    const uuid = crypto.randomUUID()
    const book = new Book(title, author, pages, readStatus, uuid)
    myLibrary.push(book)
}

function removeBookById(id) {
    for (const book of myLibrary) {
        if (book["id"] === id) {
            const bookIndex = myLibrary.indexOf(book)
            myLibrary.splice(bookIndex, 1)
        }
    }
    displayBooks()
}

function displayBooks() {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild)
    }
    // Cycle through each book in the myLibrary array
    for (const book of myLibrary) {
        const newRow = document.createElement("tr")
        // Cycle through each object property of the book object
        for (const key in book) {
            if (key !== "id") {
                const tableElement = document.createElement('td')
                if (key === "readStatus") {
                    book[key] ? tableElement.textContent = "Read" : tableElement.textContent = "Not Read"
                } else {
                    tableElement.textContent = book[key]
                }
                newRow.appendChild(tableElement)
            }
        }
        const tableElement = document.createElement('td')
        const deleteButton = document.createElement("button")
        deleteButton.textContent = "❌"
        deleteButton.addEventListener("click", () => {
            removeBookById(book["id"])
        })
        tableElement.appendChild(deleteButton)
        newRow.appendChild(tableElement)
        tableBody.appendChild(newRow)
    }
}

newBookButton.addEventListener("click", () => {
    addBookDialog.showModal()
})
closeDialogButton.addEventListener("click", () => {
    addBookDialog.close()
})
addBookButton.addEventListener("click", (event) => {
    if (bookForm.checkValidity()) {
        addBookToLibrary(titleInput.value, authorInput.value, pagesInput.value, readCheckbox.checked);
        titleInput.value = "";
        authorInput.value = "";
        pagesInput.value = "";
        readCheckbox.checked = false;
        displayBooks();
    }
})

//Temporary books for setting up HTML and CSS

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 250, false)
addBookToLibrary("Harry Potter", "J.K. Rowling", 201, true)

displayBooks()