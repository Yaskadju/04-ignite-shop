import { createStitches } from "@stitches/react"

export const { config, styled, globalCss, keyframes, css, getCssText, theme, createTheme } = createStitches({
  theme: {
    colors: {
      white: "#FFF",

      gray900: "#121214",
      gray800: "#202024",
      gray500: "#8D8D99",
      gray300: "#c4c4cc",
      gray100: "#e1e1e6",

      green300: "#00b37e",
      green500: "#00875f"
    },

    fontSizes: {
      md: "1.125rem",
      lg: "1.25rem",
      xl: "1.5rem",
      "2xl": "2rem"
    }
  }
})
