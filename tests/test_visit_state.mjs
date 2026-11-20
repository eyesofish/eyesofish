import assert from "node:assert/strict";
import test from "node:test";
import { chapterDepth, motionIsPaused } from "../docs/visit-state.mjs";

test("anchor jumps settle on the same scene as scrolling", () => {
  assert.equal(chapterDepth([800, 1850], 800), 0);
  assert.equal(chapterDepth([300, 1350], 800), 0.5);
  assert.equal(chapterDepth([0, 1050], 800), 1);
  assert.equal(chapterDepth([-750, 300], 800), 1.5);
  assert.equal(chapterDepth([-1100, -50], 800), 2);
});

test("return visits respect a manual pause or play choice", () => {
  assert.equal(motionIsPaused(null, true), true);
  assert.equal(motionIsPaused(null, false), false);
  assert.equal(motionIsPaused("paused", false), true);
  assert.equal(motionIsPaused("playing", true), false);
});
