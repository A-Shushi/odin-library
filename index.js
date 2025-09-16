const myLibrary = []

function Book(title, author, pages, readStatus, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = id;
}

function addBookToLibrary(title, author, pages, readStatus) {
    let uuid = crypto.randomUUID()
    let book = new Book(title, author, pages, readStatus, uuid)
    myLibrary.push(book)
}