const modes = {
  table: {
    core: "TABLE",
    title: "Premium Table",
    modal: "Premium Table Booking",
    text: "Best for lunch, dinner, family dining and VIP table experiences.",
    price: "₹299",
    seat: "A1 Premium Table"
  },
  private: {
    core: "PRIVATE",
    title: "Private Room",
    modal: "Private Room Booking",
    text: "Perfect for couples, family celebrations, business meetings and private dining.",
    price: "₹999",
    seat: "VIP Private Room"
  },
  banquet: {
    core: "BANQUET",
    title: "Banquet Hall",
    modal: "Banquet Hall Booking",
    text: "Designed for birthdays, parties, events, corporate dinners and grand celebrations.",
    price: "₹1999",
    seat: "Grand Banquet Hall"
  }
};

let activeMode = "table";

const cursorGlow = document.querySelector(".cursor-glow");
const modeCards = document.querySelectorAll(".mode-card");
const spaceNodes = document.querySelectorAll(".space-node");
const tableDots = document.querySelectorAll(".table-dot");

const coreTitle = document.getElementById("coreTitle");
const consoleTitle = document.getElementById("consoleTitle");
const consoleText = document.getElementById("consoleText");
const price = document.getElementById("price");
const dockMode = document.getElementById("dockMode");
const dockPrice = document.getElementById("dockPrice");
const modalTitle = document.getElementById("modalTitle");
const modalPrice = document.getElementById("modalPrice");
const selectedSeat = document.getElementById("selectedSeat");

const modal = document.getElementById("bookingModal");
const closeModal = document.getElementById("closeModal");
const openButtons = document.querySelectorAll(".open-booking");
const bookingForm = document.getElementById("bookingForm");
const focusMap = document.getElementById("focusMap");
const chamber = document.querySelector(".chamber");

document.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;

  if (window.innerWidth > 1000) {
    const x = (event.clientX / window.innerWidth - 0.5) * 12;
    const y = (event.clientY / window.innerHeight - 0.5) * -12;
    chamber.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  }
});

document.addEventListener("mouseleave", () => {
  chamber.style.transform = "rotateY(0deg) rotateX(0deg)";
});

function setMode(mode) {
  activeMode = mode;
  const data = modes[mode];

  coreTitle.textContent = data.core;
  consoleTitle.textContent = data.title;
  consoleText.textContent = data.text;
  price.textContent = data.price;
  dockMode.textContent = data.title;
  dockPrice.textContent = data.price;
  modalTitle.textContent = data.modal;
  modalPrice.textContent = data.price;
  selectedSeat.textContent = data.seat;

  modeCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.mode === mode);
  });

  spaceNodes.forEach((node) => {
    node.classList.toggle("active", node.dataset.mode === mode);
  });
}

modeCards.forEach((card) => {
  card.addEventListener("click", () => setMode(card.dataset.mode));
});

spaceNodes.forEach((node) => {
  node.addEventListener("click", () => setMode(node.dataset.mode));
});

tableDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    tableDots.forEach((item) => item.classList.remove("active"));
    dot.classList.add("active");

    const seat = dot.dataset.seat;

    if (seat === "VIP") {
      setMode("private");
      selectedSeat.textContent = "VIP Private Room";
    } else if (seat === "HALL") {
      setMode("banquet");
      selectedSeat.textContent = "Grand Banquet Hall";
    } else {
      setMode("table");
      selectedSeat.textContent = `${seat} Premium Table`;
    }
  });
});

openButtons.forEach((button) => {
  button.addEventListener("click", () => {
    modal.classList.add("show");
  });
});

closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.classList.remove("show");
  }
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();
  alert(`${modes[activeMode].title} request created for testing UI.`);
  modal.classList.remove("show");
});

focusMap.addEventListener("click", () => {
  chamber.scrollIntoView({ behavior: "smooth", block: "center" });
  chamber.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.06)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 850,
      easing: "ease-in-out"
    }
  );
});

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const count = Math.min(90, Math.floor(window.innerWidth / 14));

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.55 + 0.15
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(216, 183, 106, ${p.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener("resize", () => {
  resizeCanvas();
  createParticles();
});

resizeCanvas();
createParticles();
drawParticles();
setMode("table");
