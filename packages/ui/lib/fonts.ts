import { cn } from "@northware/ui/lib/utils";
import { Source_Code_Pro, Source_Sans_3 } from "next/font/google";

export const SourceSans = Source_Sans_3({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sourcesans",
});

export const SourceCode = Source_Code_Pro({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-sourcecode",
});

export const fonts = cn(
  SourceSans.variable,
  SourceCode.variable,
  "font-sans antialiased"
);
