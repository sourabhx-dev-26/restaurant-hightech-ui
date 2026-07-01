const data = {
  table: {
    title: "Premium Table",
    price: "₹299",
    first: "I would like to reserve a premium table.",
    reply: "Of course. A premium table is perfect for lunch, dinner and family dining.",
    ask: "How many guests should I prepare the table for?"
  },
  private: {
    title: "Private Room",
    price: "₹999",
    first: "I would like to book a private room.",
    reply: "Beautiful choice. A private room is ideal for VIP dining, meetings and special evenings.",
    ask: "Should we prepare this for a couple, family or business gathering?"
  },
  banquet: {
    title: "Banquet Hall",
    price: "₹1999",
    first: "I would like to book a banquet hall.",
    reply: "Certainly. The banquet hall is suitable for parties, functions and grand celebrations.",
    ask: "What type of event would you like us to arrange?"
  }
};

const chatWindow = document.getElementById("chatWindow");
const choices = document.querySelectorAll(".choice");
const dockOptions = document.querySelectorAll(".dock-option");

const selectedTitle = document.getElementById("selectedTitle");
const selectedPrice = document.getElementById("selectedPrice");

const navReserve = document.getElementById("navReserve");
const dockReserve = document.getElementById("dockReserve");
const conciergeCard = document.getElementById("conciergeCard");

const form = document.getElementById("reservationForm");

let activeMode = "table";

function addMessage(type, text) {
  const msg = document.createElement("div");
  msg.className = `message ${type}`;
  msg.textContent = text;
  chatWindow.appendChild(msg);
  chatWindow.scrollTop = chatWindow.scrollHeight;
}

function addTyping() {
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.innerHTML = "<i></i><i></i><i></i>";
  chatWindow.appendChild(typing);
  chatWindow.scrollTop = chatWindow.scrollHeight;
  return typing;
}

function botMessage(text, delay = 650) {
  const typing = addTyping();

  setTimeout(() => {
    typing.remove();
    addMessage("bot", text);
  }, delay);
}

function setMode(mode, fromUser = true) {
  activeMode = mode;
  const item = data[mode];

  document.body.dataset.mode = mode;

  selectedTitle.textContent = item.title;
  selectedPrice.textContent = item.price;

  choices.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });

  dockOptions.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.mode === mode);
  });

  if (fromUser) {
    addMessage("user", item.first);
    botMessage(item.reply, 700);
    setTimeout(() => botMessage(item.ask, 700), 1250);
  }
}

choices.forEach((btn) => {
  btn.addEventListener("click", () => {
    setMode(btn.dataset.mode);
  });
});

dockOptions.forEach((btn) => {
  btn.addEventListener("click", () => {
    setMode(btn.dataset.mode);
    conciergeCard.scrollIntoView({ behavior: "smooth", block: "center" });
  });
});

navReserve.addEventListener("click", () => {
  conciergeCard.scrollIntoView({ behavior: "smooth", block: "center" });
});

dockReserve.addEventListener("click", () => {
  conciergeCard.scrollIntoView({ behavior: "smooth", block: "center" });
  conciergeCard.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(1.025)" },
      { transform: "scale(1)" }
    ],
    {
      duration: 700,
      easing: "ease-in-out"
    }
  );
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  addMessage("user", "I have shared my reservation details.");
  botMessage(
    `Thank you. Your ${data[activeMode].title.toLowerCase()} request is ready for reception confirmation.`,
    800
  );

  form.reset();
});

function startConversation() {
  setTimeout(() => {
    botMessage("Good evening. Welcome to Demo Concierge.", 700);
  }, 2300);

  setTimeout(() => {
    botMessage("What experience would you like us to arrange tonight?", 700);
  }, 3300);
}

const canvas = document.getElementById("goldDust");
const ctx = canvas.getContext("2d");

let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createParticles() {
  particles = [];
  const total = Math.min(85, Math.floor(window.innerWidth / 15));

  for (let i = 0; i < total; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.35 + 0.12,
      alpha: Math.random() * 0.45 + 0.12
    });
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.y -= p.speed;

    if (p.y < -10) {
      p.y = canvas.height + 10;
      p.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(232, 201, 130, ${p.alpha})`;
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
startConversation();
setMode("table", false);
