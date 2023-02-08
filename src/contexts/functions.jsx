export const checkOverflow = (x, y, width, height, windowSize) => {
  if (
    x + width / 2 > windowSize[0] ||
    y + height / 2 > windowSize[1] ||
    y - height / 2 < 0 ||
    x - width / 2 < 0
  ) {
    return true;
  }
};
