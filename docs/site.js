import { mountWorld } from "./world.js";
import { chapterDepth, motionIsPaused } from "./visit-state.mjs";

const chapters = [...document.querySelectorAll("main .chapter")];
const navLinks = [...document.querySelectorAll(".stops a")];
const motionButton = document.querySelector("#motion");
const motionLabel = motionButton.querySelector(".motion-label");
const systemMotion = matchMedia("(prefers-reduced-motion: reduce)");
const preferenceKey = "block-world-motion";
let preference;
try {
  preference = localStorage.getItem(preferenceKey);
} catch {
  // Browsing with storage disabled still supports the motion control.
}
let paused = motionIsPaused(preference, systemMotion.matches);
let world;
try {
  world = mountWorld(document.querySelector("#world"));
} catch (error) {
  console.warn("The landscape could not start.", error);
}

function updateMotion() {
  document.documentElement.classList.toggle("motion-paused", paused);
  world?.setPaused(paused);
  motionLabel.textContent = paused ? "Play" : "Pause";
  motionButton.setAttribute("aria-label", paused ? "Play animation" : "Pause animation");
}
updateMotion();
motionButton.hidden = !world;
motionButton.addEventListener("click", () => {
  paused = !paused;
  preference = paused ? "paused" : "playing";
  try {
    localStorage.setItem(preferenceKey, preference);
  } catch {
    // The choice still applies to this visit.
  }
  updateMotion();
});
systemMotion.addEventListener("change", () => {
  if (preference !== "playing" && preference !== "paused") {
    paused = systemMotion.matches;
    updateMotion();
  }
});

let pending = false;
function syncScroll() {
  pending = false;
  const viewport = document.documentElement.clientHeight;
  const upcomingTops = chapters.slice(1).map(chapter => chapter.getBoundingClientRect().top);
  const depth = chapterDepth(upcomingTops, viewport);
  world?.setDepth(depth);
  const active = chapters[Math.round(depth)].id;
  for (const link of navLinks) {
    if (link.hash === "#" + active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
}
function requestSync() {
  if (!pending) {
    pending = true;
    requestAnimationFrame(syncScroll);
  }
}
syncScroll();
window.addEventListener("scroll", requestSync, { passive: true });
window.addEventListener("resize", requestSync);
window.addEventListener("pageshow", requestSync);
document.fonts.ready.then(requestSync);
