function clamp(val, min, max) {
  return Math.min(Math.max(min, val), max);
}

export default {
  clamp
};
