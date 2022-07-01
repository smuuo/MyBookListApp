//Book Class: Represents a Book
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

//UI Class: Handle UI tasks
class UI {
  static displayBooks() {
    /* const StoredBooks = [
      {
        title: "Book One",
        author: "Sunday Muuo",
        isbn: "193000067",
      },
      {
        title: "Book Two",
        author: "Job Musembi",
        isbn: "193005567",
      },
    ];*/
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }
  static addBookToList(book) {
    const list = document.querySelector("#book-list");

    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>    
    
    `;
    list.appendChild(row);
  }
  static deleteBook(el) {
    if (el.classList.contains("delete")) {
      el.parentElement.parentElement.remove();
    }
  }
  static showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");
    container.insertBefore(div, form);

    // make alert vanish in 3 seconds
    setTimeout(() => document.querySelector(".alert").remove(), 3000);
  }
  static clearFields() {
    document.querySelector("#title").value = "";
    document.querySelector("#author").value = "";
    document.querySelector("#isbn").value = "";
  }
}
//Store Class: Handles storage
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      books.JSON.parse(localStorage.getItem("books"));
    }
    return books;
  }
  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));
  }
  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}

//Event: Display Books
document.addEventListener("DOMContentLoaded", UI.displayBooks);

//Event: Add a book
document.querySelector("#book-form").addEventListener("submit", (e) => {
  // Prevent actual submit
  e.preventDefault();

  //get form values i.e for title, author & isbn#
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const isbn = document.querySelector("#isbn").value;

  //validate
  if (title === "" || author === "" || isbn === "") {
    UI.showAlert("Please fill in all fields", "danger");
  } else {
    //instantiate book
    const book = new Book(title, author, isbn);

    //add book to UI(user interface)
    UI.addBookToList(book);

    //show success message upon adding a book
    UI.showAlert("Book Added", "success");

    //clear fields upon submitting a book
    UI.clearFields();
  }

  //instantiate book
  const book = new Book(title, author, isbn);

  //add book to UI(user interface)
  UI.addBookToList(book);

  //add book to store
  Store.addBook(book);

  //clear fields upon submitting a book
  UI.clearFields();
});

//Event Remove a book
document.querySelector("#book-list").addEventListener("click", (e) => {
  UI.deleteBook(e.target);

  //show success message upon deleting  a book
  UI.showAlert("Book Deleted", "success");
});
