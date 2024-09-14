"use client";

import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DesktopSidebar } from "./desktop-sidebar";

export function MobileSidebar() {
  // const { open, onSidebarClose, onSidebarOpen } = useMobileSidebarStore();

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="size-6 shrink-0" />
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[280px] p-0" side="left">
          <DesktopSidebar mobileItems />
        </SheetContent>
      </Sheet>
    </div>
  );
}
