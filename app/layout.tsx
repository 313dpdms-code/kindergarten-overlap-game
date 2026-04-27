import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";

const jua = Jua({
  weight: "400",
  subsets: ["latin"], // Jua has korean characters, Next.js auto-downloads what's needed
  variable: "--font-jua",
});

export const metadata: Metadata = {
  title: "겹친 그림 맞추기",
  description: "유치원 선생님을 위한 재미있는 그림 퀴즈 게임",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${jua.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-jua bg-gradient-to-br from-sky-100 to-pink-100 text-slate-800">
        {children}
      </body>
    </html>
  );
}
