// A previous manual choice takes precedence over the device setting on a return visit.
export function motionIsPaused(choice, reducedMotion) {
  if (choice === "paused") return true;
  if (choice === "playing") return false;
  return reducedMotion;
}

export function chapterDepth(upcomingChapterTops, viewportHeight) {
  // Hold the current scene until the next chapter approaches the viewport.
  const transitionHeight = Math.max(1, viewportHeight * 0.75);
  return upcomingChapterTops.reduce((depth, top) => {
    return depth + Math.min(1, Math.max(0, 1 - top / transitionHeight));
  }, 0);
}
