import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Bell, Settings, User } from "lucide-react";
import logo from "@/assets/logo-cutroom.png";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="container h-14 flex items-center gap-3">
        <SidebarTrigger className="mr-1" />
        <img src={logo} alt="Apparel Cutting Room logo" className="h-7 w-7 rounded" />
        <div className="font-semibold tracking-tight">Apparel Cutting Room</div>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Notifications">
            <Bell className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Settings">
            <Settings className="h-4 w-4" />
          </Button>
          <Button variant="soft" className="rounded-full" aria-label="User">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
