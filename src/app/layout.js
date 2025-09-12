import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Entre Páginas - Diário Digital",
  description: "Seu diário digital para registrar memórias e momentos especiais",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImJnIiB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzhCNUEzQyIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM2RDQ0MjgiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgcng9IjYiIGZpbGw9InVybCgjYmcpIi8+CiAgPHJlY3QgeD0iNiIgeT0iOCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjE2IiByeD0iMiIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuOSIvPgogIDxsaW5lIHgxPSIxMCIgeTE9IjEyIiB4Mj0iMjIiIHkyPSIxMiIgc3Ryb2tlPSIjOEI1QTNDIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CiAgPGxpbmUgeDE9IjEwIiB5MT0iMTYiIHgyPSIxOCIgeTI9IjE2IiBzdHJva2U9IiM4QjVBM0MiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8bGluZSB4MT0iMTAiIHkxPSIyMCIgeDI9IjIwIiB5Mj0iMjAiIHN0cm9rZT0iIzhCNUEzQyIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxjaXJjbGUgY3g9IjI1IiBjeT0iOSIgcj0iMiIgZmlsbD0iIzVEOEI1QSIgb3BhY2l0eT0iMC43Ii8+CiAgPGNpcmNsZSBjeD0iMjgiIGN5PSIyNSIgcj0iMS41IiBmaWxsPSIjRDI2OTFFIiBvcGFjaXR5PSIwLjUiLz4KPC9zdmc+',
        type: 'image/svg+xml',
      }
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
