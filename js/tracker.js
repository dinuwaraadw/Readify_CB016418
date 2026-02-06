
// hamburger Mobile Nav

const hamburgerBtn = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}


//  Page Load

document.addEventListener("DOMContentLoaded", () => {
  const progressForm = document.getElementById("progress-form");
  if (progressForm) {
    progressForm.addEventListener("submit", (e) => {
      e.preventDefault();
      calculateProgress();
    });
  }

  const saveBtn = document.getElementById("save-progress-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", saveProgress);
  }

  const clearBtn = document.getElementById("clear-progress-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", clearProgress);
  }

  loadProgressFromStorage();
});


// trcker - Progress Metrics

function calculateProgress() {
  const bookTitle = document.getElementById("progress-book-title").value.trim();
  const totalPages = parseInt(document.getElementById("total-pages").value);
  const pagesRead = parseInt(document.getElementById("pages-read").value);
  const readingSpeed = parseFloat(document.getElementById("reading-speed").value);

  // Validation
  if (!bookTitle || totalPages <= 0 || pagesRead < 0 || readingSpeed <= 0) {
    alert("Please fill all fields correctly");
    return;
  }

  if (pagesRead > totalPages) {
    alert("Pages read cannot be greater than total pages");
    return;
  }

  // Calculate pages
  const completionPercent = Math.round((pagesRead / totalPages) * 100);
  const remainingPages = totalPages - pagesRead;
  const daysRemaining = Math.ceil(remainingPages / readingSpeed);
  
  const today = new Date();
  const finishDate = new Date(today.getTime() + daysRemaining * 24 * 60 * 60 * 1000);
  const finishDateStr = finishDate.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  displayProgress(bookTitle, completionPercent, pagesRead, totalPages, daysRemaining, finishDateStr);

  window.currentProgress = {
    title: bookTitle,
    totalPages: totalPages,
    pagesRead: pagesRead,
    readingSpeed: readingSpeed,
    completionPercent: completionPercent,
    daysRemaining: daysRemaining,
    finishDate: finishDateStr,
    timestamp: new Date().toISOString()
  };
}


// Show Progress Results

function displayProgress(title, percent, pagesRead, totalPages, daysRemaining, finishDate) {
  const resultsDiv = document.getElementById("progress-results");
  
  document.getElementById("animated-percent").textContent = percent;
  document.getElementById("pages-completed").textContent = pagesRead;
  document.getElementById("total-pages-display").textContent = totalPages;
  document.getElementById("days-remaining").textContent = daysRemaining;

  resultsDiv.classList.remove("hidden");
  animateProgressBar(percent);
}

// Progress Bar Animation

function animateProgressBar(targetPercent) {
  const progressFill = document.getElementById("progress-fill");
  const progressBar = document.querySelector(".progress-bar");
  let currentPercent = 0;
  const increment = targetPercent / 30;
  
  const animate = () => {
    currentPercent += increment;
    if (currentPercent >= targetPercent) {
      currentPercent = targetPercent;
    }
    progressFill.style.width = currentPercent + "%";
    
    if (progressBar) {
      progressBar.setAttribute("aria-valuenow", Math.round(currentPercent));
    }
    
    if (currentPercent < targetPercent) {
      requestAnimationFrame(animate);
    }
  };
  
  animate();
}


// Store Progress to LocalStorage

function saveProgress() {
  if (!window.currentProgress) {
    alert("Please calculate progress first");
    return;
  }

  let savedProgress = JSON.parse(localStorage.getItem("reading-progress")) || [];
  
  const existingIndex = savedProgress.findIndex(p => 
    p.title.toLowerCase() === window.currentProgress.title.toLowerCase()
  );

  if (existingIndex > -1) {
    savedProgress[existingIndex] = window.currentProgress;
  } else {
    savedProgress.push(window.currentProgress);
  }

  localStorage.setItem("reading-progress", JSON.stringify(savedProgress));
  alert("Progress saved successfully!");
}


//  Reset Progress Form

function clearProgress() {
  if (!confirm("Clear this progress entry?")) return;
  
  document.getElementById("progress-form").reset();
  document.getElementById("progress-results").classList.add("hidden");
  window.currentProgress = null;
  
  document.getElementById("progress-fill").style.width = "0%";
  document.getElementById("animated-percent").textContent = "0";
}

// Restore Previous Progress

function loadProgressFromStorage() {
  const savedProgress = JSON.parse(localStorage.getItem("reading-progress")) || [];
  if (savedProgress.length > 0) {
    const latest = savedProgress[savedProgress.length - 1];
    document.getElementById("progress-book-title").value = latest.title;
    document.getElementById("total-pages").value = latest.totalPages;
    document.getElementById("pages-read").value = latest.pagesRead;
    document.getElementById("reading-speed").value = latest.readingSpeed;
  }
}

