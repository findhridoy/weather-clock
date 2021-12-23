// Expand Details Section
const heroSection = document.querySelector(".hero__section");
const detailsSection = document.querySelector(".details__section");
const moreButton = document.querySelector(".button");

moreButton.addEventListener("click", () => {
  heroSection.classList.toggle("transform-hero");
  detailsSection.classList.toggle("transform-details");
  moreButton.classList.toggle.textContent = "Less";
});
