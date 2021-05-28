// https://eng.lyft.com/building-a-design-systems-library-with-figma-scripter-c046df0a895c
// https://gist.github.com/alexjlockwood/5368d6b1b7fcd1c07c03b57d66fcd2c6#file-generate-style-descriptions-ts

// Get the list of color styles in the current Figma file.
const colorStyles = figma.getLocalPaintStyles();

const updatedColorStyles = colorStyles.filter(style => {
  const { paints } = style;
  if (paints.length !== 1) {
    // Skip styles containing multiple colors.
    return false;
  }
  const [paint] = paints;
  if (paint.type !== 'SOLID') {
    // Skip styles containing gradients, image fills, etc.
    return false;
  }
  const hexColor = rgbToHex(paint.color);
  if (style.description === hexColor) {
    // Skip styles that already have the correct description.
    return false;
  }
  // Set the style description equal to the color's hex code.
  style.description = hexColor;
  return true;
});

// Show a toast indicating the number of style descriptions that were updated.
figma.notify(`✅ Updated ${updatedColorStyles.length} style description(s)`);

/**
 * Converts an RGB object to a hex color string. For example:
 * { r: 0.5, g: 0.5, b: 0.5 } => '#808080'
 */
function rgbToHex(rgb: RGB) {
  const r = ratioToHex(rgb.r);
  const g = ratioToHex(rgb.g);
  const b = ratioToHex(rgb.b);
  return `#${r}${g}${b}`;
}

/**
 * Converts a ratio between [0,1] to a 2-character hex string. For example:
 * 0.5 => '80'
 */
function ratioToHex(ratio: number) {
  const hex = Math.round(ratio * 255).toString(16).toUpperCase();
  return `${hex.length === 1 ? '0' : ''}${hex}`;
}