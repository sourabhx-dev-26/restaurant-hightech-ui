const modeData = {
  table: {
    strip: "Table Dining",
  },
  private: {
    strip: "Private Room",
  },
  banquet: {
    strip: "Banquet Hall",
  },
};

const experiences = document.querySelectorAll(".experience");
const tabs = document.querySelectorAll(".tabs button");
const stripMode = document.getElementById("stripMode");
const confirmBtn = document.getElementById("confirmBtn");
const toast = document.getElementById("toast");

function setMode(mode) {
  experiences.forEach((item) => {
    item.classList.toggle("active", item.dataset.mode === mode);
  });

  tabs.forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.mode === mode);
  });

  stripMode.textContent = modeData[mode].strip;
}

experiences.forEach((item) => {
  item.addEventListener("click", () => {
    setMode(item.dataset.mode);
  });
});

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setMode(tab.dataset.mode);
  });
});

confirmBtn.addEventListener("click", () => {
  toast.classList.add("show");

  confirmBtn.animate(
    [
      { transform: "rotate(-6deg) scale(1)" },
      { transform: "rotate(-6deg) scale(0.9)" },
      { transform: "rotate(-6deg) scale(1.05)" },
      { transform: "rotate(-6deg) scale(1)" },
    ],
    {
      duration: 650,
      easing: "ease-in-out",
    }
  );

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
});

setMode("table");
