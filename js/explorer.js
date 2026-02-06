
// hambuger Mobile

const hamburgerBtn = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}

// book data

const books = [
  { id: 1, title: "The Lathe of Heaven", author: "Ursula K. Le Guin", genre: "Science Fiction", rating: 4.4, cover: "images/The Lathe of Heaven.jpg" },
  { id: 2, title: "Stoner", author: "John Williams", genre: "Literary Fiction", rating: 4.3, cover: "images/Stoner.jpg" },
  { id: 3, title: "The Shadow of the Wind", author: "Carlos Ruiz Zafón", genre: "Mystery", rating: 4.6, cover: "images/The Shadow of the wind.jpg" },
  { id: 9, title: "Gamperaliya", author: "Martin Wickramasinghe", genre: "Sinhala Classic Novel", rating: 4.7, cover: "images/Gamperaliya.jpeg" },
  { id: 4, title: "Never Let Me Go", author: "Kazuo Ishiguro", genre: "Dystopian", rating: 4.2, cover: "images/Never Let me down.jpg" },
  { id: 5, title: "The Book of Disquiet", author: "Fernando Pessoa", genre: "Philosophical Fiction", rating: 4.5, cover: "images/The Book of Disquiet.jpg" },
  { id: 6, title: "The Ocean at the End of the Lane", author: "Neil Gaiman", genre: "Fantasy", rating: 4.4, cover: "images/The Ocean at the End of the Lane.jpg" },
  { id: 7, title: "Convenience Store Woman", author: "Sayaka Murata", genre: "Contemporary Fiction", rating: 4.1, cover: "images/Convenience.jpeg" },
  { id: 8, title: "Madol Doova", author: "Martin Wickramasinghe", genre: "Sinhala Literature", rating: 4.8, cover: "images/Madolduwa.jpeg" }
];



// page load Initialize Functions

document.addEventListener("DOMContentLoaded", () => {
  renderBooks(books);

  document.getElementById("search-input")?.addEventListener("input", (e) => {
    searchBooks(e.target.value);
  });

  document.getElementById("genre-filter")?.addEventListener("change", (e) => {
    if (e.target.value === "" || e.target.value === "All") {
      renderBooks(books);
    } else {
      filterByGenre(e.target.value);
    }
  });
});


// display books

function renderBooks(list) {
  document.getElementById("book-grid").innerHTML = list.map(book => `
    <div class="card">
      <img class="book-cover" src="${book.cover}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p><b>${book.author}</b></p>
      <p>${book.genre}</p>
      <p>Rating: ${book.rating}</p>
    </div>
  `).join("");
}


// search books 

function searchBooks(query) {
  renderBooks(
    books.filter(book =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    )
  );
}

// genre 

function filterByGenre(genre) {
  renderBooks(
    books.filter(book => book.genre === genre)
  );
}

// sort by rate 

function sortByRating() {
  renderBooks(
    [...books].sort((a, b) => b.rating - a.rating)
  );
}
