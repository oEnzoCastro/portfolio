import { Bodoni_Moda, Geist, Geist_Mono } from "next/font/google";

const display = Bodoni_Moda({
  variable: "--font-display",
  subsets: ["latin"],
  style: "italic",
  weight: "700",
});

const body = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const fontVariables = `${display.variable} ${body.variable} ${mono.variable}`;
