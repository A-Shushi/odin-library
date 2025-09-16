const tableHeader = document.querySelector("#library-table")
const addBookButton = document.querySelector("#new-book-button")
const addBookDialog = document.querySelector("#new-book-dialog")
const closeDialogButton = document.querySelector("#close-dialog-button")

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

function displayBooks() {
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
        tableHeader.appendChild(newRow)
    }
}

addBookButton.addEventListener("click", () => {
    addBookDialog.showModal()
})
closeDialogButton.addEventListener("click", () => {
    addBookDialog.close()
})

//Temporary books for setting up HTML and CSS

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 250, false)
addBookToLibrary("Harry Potter", "J.K. Rowling", 201, true)

displayBooks()