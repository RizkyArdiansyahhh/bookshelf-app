const books = [];
const RENDER_EVENT = "render-book";
const STORAGE_KEY = "Bookshelf App";

document.addEventListener("DOMContentLoaded", function () {
  const bookForm = document.getElementById("bookForm");
  bookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addBook();
  });
  loadDataBook();
  const search = document.getElementById("searchBook");
  search.addEventListener("submit", function (e) {
    e.preventDefault();
    searchBook();
  });
});

function addBook() {
  const judul = document.getElementById("bookFormTitle").value;
  const penulis = document.getElementById("bookFormAuthor").value;
  const tahun = document.getElementById("bookFormYear").value;
  const checkbox = document.getElementById("bookFormIsComplete");

  const bookObject = generatedBookObject(
    generateId(),
    judul,
    penulis,
    tahun,
    checkbox.checked
  );
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// fungsi untuk membuat id unik
function generateId() {
  return new Date().getTime();
}

// Fungsi Untuk membuat object buku
function generatedBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

document.addEventListener(RENDER_EVENT, function () {
  const incompleteBookList = document.getElementById("incompleteBookList");
  incompleteBookList.innerHTML = "";

  const completeBookList = document.getElementById("completeBookList");
  completeBookList.innerHTML = "";

  for (const bookItem of books) {
    const elementBook = makeBook(bookItem);
    if (bookItem.isComplete) {
      completeBookList.append(elementBook);
    } else {
      incompleteBookList.append(elementBook);
    }
  }
});

// Menambahkan data buku ke local storage
function saveData() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
  }
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function makeBook(bookObject) {
  const bookItem = document.createElement("div");
  bookItem.setAttribute("data-bookid", bookObject.id);
  bookItem.setAttribute("data-testid", "bookItem");

  const bookItemTitle = document.createElement("h3");
  bookItemTitle.setAttribute("data-testid", "bookItemTitle");
  bookItemTitle.innerText = bookObject.title;

  const bookItemAuthor = document.createElement("p");
  bookItemAuthor.setAttribute("data-testid", "bookItemAuthor");
  bookItemAuthor.innerText = "Penulis: " + bookObject.author;

  const bookItemYear = document.createElement("p");
  bookItemYear.setAttribute("data-testid", "bookItemYear");
  bookItemYear.innerText = "Tahun: " + bookObject.year;

  //   membuat Button
  const containerButton = document.createElement("div");
  if (bookObject.isComplete) {
    const btnBelumSelesai = document.createElement("button");
    btnBelumSelesai.classList.add("belum-selesai");
    btnBelumSelesai.setAttribute("data-testid", "bookItemIsIncompleteButton");
    btnBelumSelesai.innerText = "Belum Selesai dibaca";

    btnBelumSelesai.addEventListener("click", function () {
      moveToIncomplete(bookObject.id);
    });

    containerButton.append(btnBelumSelesai);
  } else {
    const btnSelesai = document.createElement("button");
    btnSelesai.classList.add("selesai");
    btnSelesai.setAttribute("data-testid", "bookItemIsCompleteButton");
    btnSelesai.innerText = "Selesai dibaca";

    btnSelesai.addEventListener("click", function () {
      moveToComplete(bookObject.id);
    });

    containerButton.append(btnSelesai);
  }
  const btnHapus = document.createElement("button");
  btnHapus.classList.add("hapus");
  btnHapus.setAttribute("data-testid", "bookItemDeleteButton");
  btnHapus.innerText = "Hapus Buku";

  btnHapus.addEventListener("click", function () {
    removeBook(bookObject.id);
  });

  const btnEdit = document.createElement("button");
  btnEdit.classList.add("edit");
  btnEdit.setAttribute("data-testid", "bookItemEditButton");
  btnEdit.innerText = "Edit Buku";

  btnEdit.addEventListener("click", function () {
    editBook(bookObject.id);
  });

  containerButton.append(btnHapus, btnEdit);
  //   Menambahkan semuanya di book item
  bookItem.append(bookItemTitle, bookItemAuthor, bookItemYear, containerButton);
  return bookItem;
}

function findBook(bookId) {
  for (bookItem of books) {
    if (bookItem.id == bookId) {
      return bookItem;
    }
  }
  return null;
}

// Function memindahkan buku ke rak belum selsai
function moveToIncomplete(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget === null) return;
  bookTarget.isComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// function memindahkan buku ke rak selesai
function moveToComplete(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget === null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// function menghapus buku
function removeBook(bookId) {
  for (const Index in books) {
    if (books[Index].id == bookId) {
      books.splice(Index, 1);
      document.dispatchEvent(new Event(RENDER_EVENT));
      saveData();
      break;
    }
  }
}

function editBook(bookId) {
  const bookTarget = findBook(bookId);

  const formEdit = document.createElement("form");
  formEdit.setAttribute("id", "editFormBook");

  const containerTitle = document.createElement("div");
  const labelTitle = document.createElement("label");
  labelTitle.classList.add("editJudul");
  labelTitle.setAttribute("for", "formEditTitle");
  labelTitle.innerText = "Judul: ";
  const title = document.createElement("input");
  title.setAttribute("id", "formEditTitle");
  title.setAttribute("type", "text");
  title.setAttribute("value", bookTarget.title);
  containerTitle.append(labelTitle, title);

  const containerAuthor = document.createElement("div");
  const labelAuthor = document.createElement("label");
  labelAuthor.classList.add("editAuthor");
  labelAuthor.setAttribute("for", "formEditAuthor");
  labelAuthor.innerText = "Penulis: ";
  const author = document.createElement("input");
  author.setAttribute("id", "formEditAuthor");
  author.setAttribute("type", "text");
  author.setAttribute("value", bookTarget.author);
  containerAuthor.append(labelAuthor, author);

  const containerYear = document.createElement("div");
  const labelYear = document.createElement("label");
  labelYear.classList.add("editYear");
  labelYear.setAttribute("for", "formEditYear");
  labelYear.innerText = "Year: ";
  const year = document.createElement("input");
  year.setAttribute("id", "formEditYear");
  year.setAttribute("type", "text");
  year.setAttribute("value", bookTarget.year);
  containerYear.append(labelYear, year);

  const containerBtnEdit = document.createElement("div");
  containerBtnEdit.classList.add("btn");
  const btnEdit = document.createElement("button");
  btnEdit.setAttribute("id", "btnEditForm");
  btnEdit.setAttribute("type", "submit");
  btnEdit.innerText = "Edit";
  containerBtnEdit.append(btnEdit);

  formEdit.append(
    containerTitle,
    containerAuthor,
    containerYear,
    containerBtnEdit
  );
  const containerFormEdit = document.querySelector(".form-edit");
  containerFormEdit.append(formEdit);

  const overlay = document.querySelector(".overlay");
  overlay.classList.add("active");

  formEdit.addEventListener("submit", function (e) {
    e.preventDefault();
    actionEditBook(bookTarget);
  });
}

// function saat edit di submit
function actionEditBook(bookTarget) {
  const titleNew = document.getElementById("formEditTitle").value;
  const authorNew = document.getElementById("formEditAuthor").value;
  const yearNew = document.getElementById("formEditYear").value;

  bookTarget.title = titleNew;
  bookTarget.author = authorNew;
  bookTarget.year = yearNew;

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
  const overlay = document.querySelector(".overlay");
  overlay.classList.remove("active");
  const formEdit = document.querySelector(".form-edit");
  formEdit.innerHTML = "";
}

// Function untuk ngeload data buku
function loadDataBook() {
  if (isStorageExist()) {
    const dataBuku = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (dataBuku !== null) {
      for (const bookItem of dataBuku) {
        books.push(bookItem);
      }
    }
  }
  document.dispatchEvent(new Event(RENDER_EVENT));
}

// Function untuk mencari buku
function searchBook() {
  const inputSearch = document.getElementById("searchBookTitle").value;
  inputSearch.toLowerCase();
  const filterBooks = books.filter(function (book) {
    return book.title.toLowerCase().includes(inputSearch);
  });

  const incompleteBookList = document.getElementById("incompleteBookList");
  incompleteBookList.innerHTML = "";

  const completeBookList = document.getElementById("completeBookList");
  completeBookList.innerHTML = "";

  for (const bookItem of filterBooks) {
    const elementBook = makeBook(bookItem);
    if (bookItem.isComplete) {
      completeBookList.append(elementBook);
    } else {
      incompleteBookList.append(elementBook);
    }
  }
}
