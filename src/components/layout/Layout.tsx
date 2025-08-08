import { SidebarProvider, Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarInset } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import Header from "./Header";
import { AppSidebar } from "./AppSidebar";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset>
          <Header />
          <main className="container py-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
