const tabButtons = document.querySelectorAll(".mode-tabs button");
const price = document.getElementById("price");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    price.textContent = button.dataset.price;
  });
});

const card = document.querySelector(".reservation-card");

document.addEventListener("mousemove", (event) => {
  if (window.innerWidth < 900) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 10;
  const y = (event.clientY / window.innerHeight - 0.5) * -10;

  card.style.transform = `rotateY(${x - 4}deg) rotateX(${y}deg)`;
});

document.addEventListener("mouseleave", () => {
  card.style.transform = "rotateY(-4deg) rotateX(0deg)";
});
