import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// Same typeface and palette as the CareTaker app (src/styles.css in the app repo).
// The font files are bundled in public/fonts (SIL Open Font License).
export const fontFamily = "Plus Jakarta Sans";

for (const weight of ["400", "500", "600", "700"]) {
  loadFont({
    family: fontFamily,
    url: staticFile(`fonts/plus-jakarta-sans-latin-${weight}-normal.woff2`),
    weight,
  });
}

export const colors = {
  cream: "#F7F5EF",
  ink: "#17343A",
  inkDeep: "#0F2529",
  coral: "#FF8A75",
  coralTint: "#FDECE8",
  coralDark: "#A93526",
  sand: "#EAE6DC",
  green: "#2F7A55",
  muted: "#5B6E72",
};

export const easeOut = [0.16, 1, 0.3, 1] as const;
