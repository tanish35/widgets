"use client";

import { SidebarDemo } from "@/components/Navbar";
import { useSession } from "@/lib/auth-client";

export function SidebarWrapper() {
  const { data: session } = useSession();
  const user = session?.user;

  return <SidebarDemo user={user} />;
}
