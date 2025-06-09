import { cn } from "@northware/ui/lib/utils";
import { Source_Code_Pro, Source_Sans_3 } from "next/font/google";

const source_sans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sourcesans",
});

const source_code = Source_Code_Pro({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-sourcecode",
});

export const fonts = cn(
  source_sans.variable,
  source_code.variable,
  "font-sans antialiased"
);
