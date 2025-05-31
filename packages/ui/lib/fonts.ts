import { Source_Code_Pro, Source_Sans_3 } from "next/font/google";

export const source_sans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sourcesans",
});

export const source_code = Source_Code_Pro({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-sourcecode",
});
