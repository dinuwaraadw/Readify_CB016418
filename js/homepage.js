
// hamburger Mobile Nav

const hamburgerBtn = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}


// changing Quotes Section

const quotes = [
  { text: "A reader lives a thousand lives before he dies.", author: "J.K. Rowling" },
  { text: "So many books, so little time.", author: "George Orwell" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "Reading is dreaming with open eyes.", author: "Ayn Rand" },
  { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { text: "A book is a dream that you hold in your hand.", author: "Neil Gaiman" }
];

let currentQuoteIndex = 0;

function displayQuote(index) {
  const quoteText = document.getElementById('book-quote');
  const quoteAuthor = document.getElementById('quote-author');
  
  if (quoteText && quoteAuthor) {
    quoteText.textContent = `"${quotes[index].text}"`;
    quoteAuthor.textContent = `— ${quotes[index].author}`;
  }
}

function initQuotes() {
  displayQuote(currentQuoteIndex);
  
  // Change quote every 5 seconds
  setInterval(() => {
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
    displayQuote(currentQuoteIndex);
  }, 5000);
}

// author of the day Section

const authors = [
  { name: "Ayn Rand", bio: "Author of philosophical novels.", image: "images/Ayn_rand.jpg" },
  { name: "Ernest Hemingway", bio: "Renowned for his concise writing style.", image: "images/Ernest_Hemingway.jpg" },
  { name: "Neil Gaiman", bio: "Creator of imaginative fantasy worlds.", image: "images/Neil_Gaiman.jpg" }
];

function initAuthor() {
  const authorName = document.getElementById('author-name');
  const authorBio = document.getElementById('author-bio');
  const authorImg = document.getElementById('author-img');
  
  if (authorName && authorBio && authorImg) {
    // Get day of week (0-6) and use modulo to pick author
    const dayIndex = new Date().getDay() % authors.length;
    const author = authors[dayIndex];
    
    authorName.textContent = author.name;
    authorBio.textContent = author.bio;
    authorImg.src = author.image;
    authorImg.alt = `${author.name}`;
    authorImg.loading = 'lazy';
  }
}

// newsletter Subscription

function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  const emailInput = document.getElementById('newsletter-email');
  
  if (form && emailInput) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = emailInput.value.trim();
      
      if (email) {
        localStorage.setItem('newsletterEmail', email);
        alert('Subscribed successfully!');
        emailInput.value = '';
      }
    });
  }
}


// INITIALIZE 

document.addEventListener('DOMContentLoaded', () => {
  initQuotes();
  initAuthor();
  initNewsletter();
});
