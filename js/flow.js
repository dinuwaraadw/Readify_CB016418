
// hamburger Mobile Nav

const hamburgerBtn = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// COZY sound Audio Player

const audio = document.getElementById("cozyAudio");

document.getElementById("playBtn").onclick = () => audio.play();
document.getElementById("stopBtn").onclick = () => audio.pause();

// compelet book Add and Display

const bookInput = document.getElementById("bookTitle");
const bookList = document.getElementById("bookList");

function loadBooks() {
  const books = JSON.parse(localStorage.getItem("completedBooks")) || [];
  bookList.innerHTML = "";
  
  books.forEach(book => {
    const li = document.createElement("li");
    li.textContent = book;
    bookList.appendChild(li);
  });
}

document.getElementById("addBook").onclick = () => {
  if (bookInput.value === "") return;
  
  const books = JSON.parse(localStorage.getItem("completedBooks")) || [];
  books.push(bookInput.value);
  localStorage.setItem("completedBooks", JSON.stringify(books));
  
  bookInput.value = "";
  loadBooks();
};

// Load books on page load
loadBooks();
