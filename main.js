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
});
