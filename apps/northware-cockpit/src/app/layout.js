import "./globals.sass";

export const metadata = {
  title: "Northware Cockpit",
};

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className={``}>{children}</body>
    </html>
  );
}
