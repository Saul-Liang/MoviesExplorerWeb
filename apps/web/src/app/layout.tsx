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
import { AuthProvider } from "@/shared/context/auth-context";

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
        <AuthProvider>
          <SidebarProvider>
            <AppSidebar />
            <SidebarInset className={cn("overflow-hidden")}>
              <main className={cn("h-screen w-full overflow-hidden")}>
                {children}
              </main>
            </SidebarInset>
          </SidebarProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
