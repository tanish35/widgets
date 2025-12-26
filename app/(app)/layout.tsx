import { SidebarDemo } from "@/components/Navbar";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/sign-in");
  }
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <SidebarDemo user={session.user} />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
