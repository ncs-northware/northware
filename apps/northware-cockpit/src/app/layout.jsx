import "@northware/theme/global.sass";

export default function RootLayout({ children }) {
  return (
    <html lang="de">
      <body className="">{children}</body>
    </html>
  );
}
