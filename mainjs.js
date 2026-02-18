// Boba Drops - floating pearls animation
const floatLayer = document.getElementById("bobaFloat");
const toggleBtn = document.getElementById("togglePearls");

let pearlsOn = true;
let pearlInterval = null;

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function createPearl() {
  const pearl = document.createElement("span");
  pearl.className = "pearl";

  const size = Math.floor(rand(6, 16));
  const left = rand(0, 100);
  const dur = rand(6, 12);
  const drift = rand(-40, 40);
  const op = rand(0.35, 0.9);

  pearl.style.setProperty("--size", `${size}px`);
  pearl.style.left = `${left}vw`;
  pearl.style.setProperty("--dur", `${dur}s`);
  pearl.style.setProperty("--drift", `${drift}px`);
  pearl.style.setProperty("--op", op.toFixed(2));

  // start at random height so it doesn't "spawn" all at bottom at once
  pearl.style.transform = `translateY(${rand(90, 120)}vh)`;

  floatLayer.appendChild(pearl);

  // cleanup after animation duration
  window.setTimeout(() => {
    pearl.remove();
  }, (dur + 1) * 1000);
}

function startPearls() {
  if (pearlInterval) return;

  // burst on start
  for (let i = 0; i < 14; i++) createPearl();

  pearlInterval = window.setInterval(() => {
    // create a few per tick
    const count = Math.floor(rand(1, 4));
    for (let i = 0; i < count; i++) createPearl();
  }, 550);
}

function stopPearls() {
  if (!pearlInterval) return;
  window.clearInterval(pearlInterval);
  pearlInterval = null;

  // also clear existing pearls slowly
  const pearls = floatLayer.querySelectorAll(".pearl");
  pearls.forEach((p) => p.remove());
}

toggleBtn.addEventListener("click", () => {
  pearlsOn = !pearlsOn;

  if (pearlsOn) {
    toggleBtn.textContent = "Pause pearls";
    startPearls();
  } else {
    toggleBtn.textContent = "Play pearls";
    stopPearls();
  }
});

// auto start
startPearls();
