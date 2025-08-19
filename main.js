```javascript
(function(){
  emailjs.init("_brPHMg6XuD0oaMJs");
})();

// Navigation and section highlighting
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav ul li a');

  sections.forEach((section, index) => {
    const sectionTop = section.getBoundingClientRect().top;
    const sectionHeight = section.offsetHeight;

    if (sectionTop <= window.innerHeight * 0.75 && sectionTop + sectionHeight > 0) {
      navLinks.forEach(link => link.classList.remove('active'));
      navLinks[index].classList.add('active');
    }
  });

  const aboutSection = document.getElementById('about');
  if (aboutSection.getBoundingClientRect().top < window.innerHeight * 0.5) {
    aboutSection.classList.add('visible');
  } else {
    aboutSection.classList.remove('visible');
  }

  const projectsSection = document.getElementById('projects');
  if (projectsSection.getBoundingClientRect().top < window.innerHeight * 0.75) {
    projectsSection.classList.add('visible');
  } else {
    projectsSection.classList.remove('visible');
  }

  const skillsSection = document.getElementById('skills');
  const skillLevels = document.querySelectorAll('.skill-level');
  const skillsTop = skillsSection.getBoundingClientRect().top;
  if (skillsTop < window.innerHeight * 0.75) {
    skillsSection.classList.add('visible');
    skillLevels.forEach(level => {
      level.style.width = level.getAttribute('data-skill');
    });
  }
});

// Navigation smooth scroll
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

// Explore button scroll
document.getElementById("exploreBtn").addEventListener("click", function() {
  document.querySelector("#projects").scrollIntoView({ behavior: "smooth" });
});

// Slideshow logic
let slideIndex = 0;
let slideInterval;

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }

  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  slideInterval = setTimeout(showSlides, 3000);
}

function plusSlides(n) {
  clearTimeout(slideInterval);
  slideIndex += n - 1;
  showSlides();
}

function currentSlide(n) {
  clearTimeout(slideInterval);
  slideIndex = n - 1;
  showSlides();
}

document.addEventListener('DOMContentLoaded', function() {
  showSlides();

  var nightBtn = document.getElementById("nightModeBtn");
  if (!nightBtn) return;

  if (localStorage.getItem("nightMode") === "true") {
    document.body.classList.add("night-mode");
    nightBtn.textContent = "☀️";
  } else {
    nightBtn.textContent = "🌙";
  }

  nightBtn.addEventListener("click", function() {
    document.body.classList.toggle("night-mode");
    let isNight = document.body.classList.contains("night-mode");
    localStorage.setItem("nightMode", isNight ? "true" : "false");
    this.textContent = isNight ? "☀️" : "🌙";
  });
});

// Contact drawer logic
const drawer = document.getElementById('contactDrawer');
const closeBtn = document.getElementById('closeDrawerBtn');
const navContactLink = document.querySelector('a[href="#contact"]');
const homeContactBtn = document.querySelector('.outline');

navContactLink.addEventListener('click', function(e) {
  e.preventDefault();
  drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
});
homeContactBtn.addEventListener('click', function(e) {
  e.preventDefault();
  drawer.classList.add('open');
  document.body.style.overflow = 'hidden';
});
closeBtn.addEventListener('click', function() {
  drawer.classList.remove('open');
  document.body.style.overflow = '';
});

// EmailJS send form
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();

  emailjs.send('service_olv0j5n', 'template_3lg1cwk', {
    name: document.getElementById('from_name').value,
    email: document.getElementById('reply_to').value,
    message: document.getElementById('message').value
  })
  .then(function(response) {
    const toast = document.getElementById('successToast');
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);

    drawer.classList.remove('open');
    document.body.style.overflow = '';
    document.getElementById('contactForm').reset();
  }, function(error) {
    alert("Failed to send. Please try again.");
  });
});
```