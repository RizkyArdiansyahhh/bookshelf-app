const books = [];
const RENDER_EVENT = "render-book";

document.addEventListener("DOMContentLoaded", function () {
  const bookForm = document.getElementById("bookForm");
  bookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addBook();
  });
});

function addBook() {
  const judul = document.getElementById("bookFormTitle").value;
  const penulis = document.getElementById("bookFormAuthor").value;
  const tahun = document.getElementById("bookFormYear").value;

  const bookObject = generatedBookObject(
    generateId(),
    judul,
    penulis,
    tahun,
    false
  );
  books.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
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
  console.log(books);

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

    containerButton.append(btnBelumSelesai);
  } else {
    const btnSelesai = document.createElement("button");
    btnSelesai.classList.add("selesai");
    btnSelesai.setAttribute("data-testid", "bookItemIsCompleteButton");
    btnSelesai.innerText = "Selesai dibaca";

    containerButton.append(btnSelesai);
  }
  const btnHapus = document.createElement("button");
  btnHapus.classList.add("hapus");
  btnHapus.setAttribute("data-testid", "bookItemDeleteButton");
  btnHapus.innerText = "Hapus Buku";

  const btnEdit = document.createElement("button");
  btnEdit.classList.add("edit");
  btnEdit.setAttribute("data-testid", "bookItemEditButton");
  btnEdit.innerText = "Edit Buku";

  containerButton.append(btnHapus, btnEdit);
  //   Menambahkan semuanya di book item
  bookItem.append(bookItemTitle, bookItemAuthor, bookItemYear, containerButton);
  return bookItem;
}
