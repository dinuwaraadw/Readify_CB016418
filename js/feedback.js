// hamburger  Mobile Navigation

const hamburgerBtn = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburgerBtn && navLinks) {
  hamburgerBtn.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
}


// feedback form ( Save Local Strge)

document.getElementById("feedbackForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const feedback = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  let data = JSON.parse(localStorage.getItem("feedbacks")) || [];
  data.push(feedback);
  localStorage.setItem("feedbacks", JSON.stringify(data));

  document.getElementById("successMsg").textContent = "Thank you! Your feedback has been saved.";
  
  document.getElementById("feedbackForm").reset();
});


// FAQ collapse

document.querySelectorAll(".faq-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const content = btn.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});
