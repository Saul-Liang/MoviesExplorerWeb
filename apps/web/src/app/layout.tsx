import type { Metadata } from "next";
import "./globals.css";
import "@darkbluetechnologies/ui/styles.css";
import { Inter } from "next/font/google";
import {
  SidebarInset,
  SidebarProvider,
} from "@darkbluetechnologies/ui/sidebar";
import { AppSidebar } from "@/shared/components/app-sidebar";
import { cn } from "@ui/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Movies explorer",
  description: "Discover the most popular new movies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className)}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <main className={cn("h-screen w-full overflow-auto")}>
              {children}
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
}
