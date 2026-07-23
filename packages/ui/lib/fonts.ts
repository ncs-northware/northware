import { cn } from "@northware/ui/lib/utils";
import { Source_Code_Pro, Source_Sans_3 } from "next/font/google";

export const SourceSans = Source_Sans_3({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-sourcesans",
});

export const SourceCode = Source_Code_Pro({
  display: "optional",
  subsets: ["latin"],
  variable: "--font-sourcecode",
});

export const fonts = cn(
  SourceSans.variable,
  SourceCode.variable,
  "font-sans antialiased"
);
