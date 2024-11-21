import { Inter } from "next/font/google";
import "./globals.css";
import "./ScrollBarGlobal.css"

const inter = Inter({ subsets: ["latin"] });


export const metadata = {
  title: "Daros GlowCare",
  description: "Agendament system calendar controller",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
"Alterar fonts e pressets globais "