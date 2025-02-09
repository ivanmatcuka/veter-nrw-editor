"use client";

import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["var(--font-eb-garamond)", "var(--font-geist-mono)"].join(","),
  },
});

export default theme;
