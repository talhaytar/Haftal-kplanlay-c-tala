const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const weekContainer = document.getElementById("weekContainer");
const startInput = document.getElementById("startTime");
const endInput = document.getElementById("endTime");
const generateBtn = document.getElementById("generate");
const saveBtn = document.getElementById("save");
const clearBtn = document.getElementById("clear");

// Sayfa açıldığında kaydedilmiş planı yükle
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("weeklyPlan"));
  if (saved) {
    startInput.value = saved.start;
    endInput.value = saved.end;
    createWeek(saved.start, saved.end, saved.data);
  }
};

// Haftayı oluştur
generateBtn.addEventListener("click", () => {
  const start = startInput.value;
  const end = endInput.value;
  createWeek(start, end);
});

function createWeek(start, end, savedData = {}) {
  weekContainer.innerHTML = "";
  let [startH] = start.split(":").map(Number);
  let [endH] = end.split(":").map(Number);

  days.forEach(day => {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    const title = document.createElement("h2");
    title.textContent = day;
    dayDiv.appendChild(title);

    for (let h = startH; h <= endH; h++) {
      const hourDiv = document.createElement("div");
      hourDiv.classList.add("hour");
      const hourLabel = `${String(h).padStart(2, "0")}:00`;
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Plan gir...";
      input.value = savedData[day]?.[hourLabel] || "";

      hourDiv.innerHTML = `<span>${hourLabel}</span>`;
      hourDiv.appendChild(input);
      dayDiv.appendChild(hourDiv);
    }
    weekContainer.appendChild(dayDiv);
  });
}

// Kaydet
saveBtn.addEventListener("click", () => {
  const data = {};
  document.querySelectorAll(".day").forEach(dayDiv => {
    const day = dayDiv.querySelector("h2").textContent;
    data[day] = {};
    dayDiv.querySelectorAll(".hour").forEach(hourDiv => {
      const time = hourDiv.querySelector("span").textContent;
      const value = hourDiv.querySelector("input").value;
      data[day][time] = value;
    });
  });

  const plan = {
    start: startInput.value,
    end: endInput.value,
    data
  };

  localStorage.setItem("weeklyPlan", JSON.stringify(plan));
  alert("✅ Plan kaydedildi!");
});

// Temizle
clearBtn.addEventListener("click", () => {
  if (confirm("Haftalık planı sıfırlamak istiyor musun?")) {
    localStorage.removeItem("weeklyPlan");
    weekContainer.innerHTML = "";
  }
});