document.addEventListener("DOMContentLoaded", function () {
  const bookForm = document.getElementById("bookForm");
  bookForm.addEventListener("submit", function (e) {
    e.preventDefault();
    addBook();
  });
});
