// MENU MOBILE TOGGLE
const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector(".menu");

menuButton.addEventListener("click", () => {
  menu.classList.toggle("active");
});

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

// SLIDER DO HEADER
let currentHeaderSlide = 0;
const headerImages = document.querySelectorAll("#slider img");

setInterval(() => {
  headerImages[currentHeaderSlide].classList.remove("active");
  currentHeaderSlide = (currentHeaderSlide + 1) % headerImages.length;
  headerImages[currentHeaderSlide].classList.add("active");
}, 5000);

// SLIDER IMAGENS (GENÉRICO)
const sliderImages = document.querySelectorAll(".slider img");
let currentSlide = 0;

function showSlide(index) {
  sliderImages.forEach((img) => img.classList.remove("active"));
  sliderImages[index].classList.add("active");
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % sliderImages.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 3000);

// ===================
// CARROSSEL PEDRAS DE LUXO - INFINITO + CORREÇÃO
// ===================
const carousel = document.querySelector(".luxo-carousel");
const wrapper = document.querySelector(".luxo-carousel-wrapper");
let items = Array.from(document.querySelectorAll(".luxo-item"));

const itemWidth = items[0].offsetWidth + 16;
let currentIndex = 1; // começamos do segundo item (o primeiro real)

// CLONA O PRIMEIRO E O ÚLTIMO ITENS
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

firstClone.classList.add("clone");
lastClone.classList.add("clone");

carousel.insertBefore(lastClone, items[0]);
carousel.appendChild(firstClone);

// ATUALIZA A LISTA DE ITENS
items = Array.from(document.querySelectorAll(".luxo-item"));
let isTransitioning = false;

function updateCarousel(instant = false) {
  if (isTransitioning && !instant) return;

  items.forEach((item) => item.classList.remove("active"));
  items[currentIndex].classList.add("active");

  const offset =
    itemWidth * currentIndex - wrapper.offsetWidth / 2 + itemWidth / 2;
  carousel.style.transition = instant ? "none" : "transform 0.5s ease";
  carousel.style.transform = `translateX(-${offset}px)`;
}

function nextLuxoSlide() {
  if (isTransitioning) return;
  currentIndex++;
  updateCarousel();
  isTransitioning = true;
}

// ALTERNATIVA EXTRA: usar transitionend para tratar a volta ao início/fim real
carousel.addEventListener("transitionend", () => {
  if (items[currentIndex].classList.contains("clone")) {
    if (currentIndex === items.length - 1) {
      currentIndex = 1; // reinicia no primeiro real
    } else if (currentIndex === 0) {
      currentIndex = items.length - 2; // reinicia no último real
    }
    updateCarousel(true); // sem animação para o reposicionamento
  }
  isTransitioning = false;
});

window.addEventListener("load", () => {
  updateCarousel(true);
  setInterval(nextLuxoSlide, 3000);
});

window.addEventListener("resize", () => updateCarousel(true));

// ANIMAÇÃO DE ENTRADA PARA AS PEDRAS
const pedraItems = document.querySelectorAll(".pedra-item");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.3 }
);

pedraItems.forEach((item) => observer.observe(item));

// MODAL "VER MAIS"
const modalButtons = document.querySelectorAll(".ver-mais");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".close");

modalButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const modalId = button.getAttribute("data-modal");
    document.getElementById(modalId).style.display = "flex";
  });
});

closeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    button.parentElement.parentElement.style.display = "none";
  });
});

window.addEventListener("click", (e) => {
  modals.forEach((modal) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});

// CARROSSEL DE AVALIAÇÃO
let currentAvaliacao = 0;
const avaliacaoImgs = document.querySelectorAll(".avaliacao-slider img");
const totalAvaliacoes = avaliacaoImgs.length;
const slider = document.querySelector(".avaliacao-slider");

function updateAvaliacao() {
  avaliacaoImgs.forEach((img) => img.classList.remove("active"));
  avaliacaoImgs[currentAvaliacao].classList.add("active");
  const offset = -currentAvaliacao * 100;
  slider.style.transform = `translateX(${offset}%)`;
}

function nextAvaliacao() {
  currentAvaliacao = (currentAvaliacao + 1) % totalAvaliacoes;
  updateAvaliacao();
}

function prevAvaliacao() {
  currentAvaliacao = (currentAvaliacao - 1 + totalAvaliacoes) % totalAvaliacoes;
  updateAvaliacao();
}

updateAvaliacao();
