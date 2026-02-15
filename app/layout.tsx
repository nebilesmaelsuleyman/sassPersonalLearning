import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/AppShell";
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from 'sonner';
import { ThemeProvider } from '@/components/ThemeProvider';

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hayyu – Learn New Skills Anytime, Anywhere",
  description: "Real-time AI teaching platform with voice companions, chat, and personalized learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#2563eb" } }}>
      <html lang="en" suppressHydrationWarning>
        <body className={`${bricolage.variable} antialiased font-sans bg-background text-foreground`}>
          <ThemeProvider>
            <AppShell>{children}</AppShell>
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
