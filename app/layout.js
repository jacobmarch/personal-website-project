import "./globals.css";

export const metadata = {
  title: "Jacob | Developer + Creator",
  description: "A minimalist tech-art landing page for a developer and content creator."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
