import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter, JetBrains_Mono } from 'next/font/google';
import "./globals.css";
import '@/styles/typed.css';

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
})

export const metadata: Metadata = {
  title: "Mehdi Hussain - Portfolio",
  description: "Portfolio website of Mehdi Hussain",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={`${inter.className} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}