import "./globals.css";

export const metadata = {
  title: "Enzo Castro",
  description: "Enzo Castro's Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
