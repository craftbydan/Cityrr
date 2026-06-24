import localFont from "next/font/local";

export const ppMori = localFont({
  src: [
    {
      path: "./fonts/PPMori-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPMori-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-pp-mori",
  display: "swap",
});
