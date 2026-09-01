const progress = document.querySelector("#progress");
const backTop = document.querySelector("#back-top");
const toast = document.querySelector("#toast");
const lightbox = document.querySelector("#lightbox");
const lightboxImage = lightbox.querySelector("img");
const lightboxCaption = lightbox.querySelector("figcaption");
let toastTimer;

function updateScroll() {
  const total = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (total > 0 ? scrollY / total * 100 : 0) + "%";
  backTop.classList.toggle("show", scrollY > 700);
}
addEventListener("scroll", updateScroll, { passive: true });
updateScroll();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.querySelectorAll("[data-toast]").forEach(button => {
  button.addEventListener("click", () => showToast(button.dataset.toast));
});
function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = "✨ " + message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

document.querySelectorAll("[data-image]").forEach(button => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.image;
    lightboxImage.alt = button.querySelector("img")?.alt || "回憶照片";
    lightboxCaption.textContent = button.dataset.caption || "";
    lightbox.hidden = false;
    document.body.classList.add("no-scroll");
  });
});
function closeLightbox() {
  lightbox.hidden = true;
  document.body.classList.remove("no-scroll");
}
lightbox.querySelector(".close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", event => event.target === lightbox && closeLightbox());
addEventListener("keydown", event => event.key === "Escape" && !lightbox.hidden && closeLightbox());

backTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

document.querySelector(".heart-button").addEventListener("click", () => {
  const box = document.querySelector("#heart-burst");
  box.replaceChildren();
  for (let i = 0; i < 14; i++) {
    const heart = document.createElement("span");
    heart.textContent = "♥";
    heart.style.left = (20 + Math.random() * 62) + "%";
    heart.style.animationDelay = (i % 5) * .08 + "s";
    box.appendChild(heart);
  }
  showToast("幸福已裝袋：笑聲 × 100 ❤️");
});
