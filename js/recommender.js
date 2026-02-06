
// hamburger Mobile Nav

const hamburgerBtn = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}


// books data

const books = [
  { id:1, title:"The Great Gatsby", author:"F. Scott Fitzgerald", genre:"fiction", pages:180, desc:"A classic tale of love and wealth in 1920s America." },
  { id:2, title:"The Hobbit", author:"J.R.R. Tolkien", genre:"fantasy", pages:310, desc:"A magical adventure through Middle-earth with a reluctant hero." },
  { id:3, title:"Dune", author:"Frank Herbert", genre:"fiction", pages:682, desc:"An epic space opera of politics, ecology, and power." },
  { id:4, title:"Sherlock Holmes: A Study in Scarlet", author:"Arthur Conan Doyle", genre:"fiction", pages:140, desc:"The first adventure of the world's greatest detective." },
  { id:5, title:"Pride and Prejudice", author:"Jane Austen", genre:"fiction", pages:279, desc:"A witty romance exploring love and social class." },
  { id:6, title:"The Da Vinci Code", author:"Dan Brown", genre:"fantasy", pages:454, desc:"A race against time to uncover ancient mysteries." },
  { id:7, title:"Harry Potter and the Philosopher's Stone", author:"J.K. Rowling", genre:"fantasy", pages:223, desc:"A young wizard discovers a magical world awaiting him." },
  { id:8, title:"Foundation", author:"Isaac Asimov", genre:"fantasy", pages:255, desc:"The fall and rise of civilization across the galaxy." },
  { id:9, title:"Murder on the Orient Express", author:"Agatha Christie", genre:"fiction", pages:256, desc:"A brilliant detective solves a locked-room murder." },
  { id:10, title:"The Midnight Library", author:"Matt Haig", genre:"fiction", pages:288, desc:"Explore alternate lives and find your true path." }
];


// Get Book Length (Short/Long)

function getLength(pages) {
  return pages < 200 ? "short" : "long";
}


//  Filter Books by Genre & Length

function filterBooks() {
  const genre = document.getElementById("genre-select").value;
  const length = document.getElementById("length-select").value;

  let filtered = books;
  
  if (genre !== "all") {
    filtered = filtered.filter(b => b.genre === genre);
  }

  if (length !== "all") {
    filtered = filtered.filter(b => getLength(b.pages) === length);
  }

  return filtered;
}

//  Select Random Book

function pickBook() {
  const filtered = filterBooks();

  if (filtered.length === 0) {
    alert("No books match your criteria. Try different filters!");
    return;
  }

  const book = filtered[Math.floor(Math.random() * filtered.length)];
  showRecommendation(book);
}


// Display Recommendation

function showRecommendation(book) {
  document.getElementById("recommendation-card").classList.remove("hidden");
  document.getElementById("empty-msg").classList.add("hidden");

  document.getElementById("rec-title").textContent = book.title;
  document.getElementById("rec-author").textContent = `by ${book.author}`;
  document.getElementById("rec-genre").textContent = book.genre.charAt(0).toUpperCase() + book.genre.slice(1);
  document.getElementById("rec-pages").textContent = book.pages;
  document.getElementById("rec-desc").textContent = book.desc;

  document.getElementById("save-btn").onclick = () => saveBook(book);
  document.getElementById("pick-again-btn").onclick = pickBook;
}


//  Add Book to Reading List

function saveBook(book) {
  let saved = JSON.parse(localStorage.getItem("saved-recommendations")) || [];

  if (saved.find(b => b.id === book.id)) {
    alert("Already saved!");
    return;
  }

  saved.push(book);
  localStorage.setItem("saved-recommendations", JSON.stringify(saved));
  alert("Saved to Reading List!");
  displaySavedBooks();
}


//  Show Saved Books

function displaySavedBooks() {
  let saved = JSON.parse(localStorage.getItem("saved-recommendations")) || [];
  const container = document.getElementById("saved-books");
  const emptyMsg = document.getElementById("no-saved");

  if (saved.length === 0) {
    container.innerHTML = "";
    emptyMsg.classList.remove("hidden");
    return;
  }

  emptyMsg.classList.add("hidden");

  container.innerHTML = saved.map(b => `
    <div class="saved-book-card">
      <h4>${b.title}</h4>
      <p>${b.author}</p>
      <p><strong>${b.genre}</strong> · ${b.pages}p</p>
      <button class="btn-remove" onclick="removeBook(${b.id})">Remove</button>
    </div>
  `).join("");
}


// Delete Saved Book

function removeBook(id) {
  let saved = JSON.parse(localStorage.getItem("saved-recommendations")) || [];
  saved = saved.filter(b => b.id !== id);
  localStorage.setItem("saved-recommendations", JSON.stringify(saved));
  displaySavedBooks();
}

// INITIALIZE
document.getElementById("pick-btn").addEventListener("click", pickBook);
displaySavedBooks();
