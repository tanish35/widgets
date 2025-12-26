"use client";

import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace("/sign-in");
        },
      },
    });
  }, []);

  return null;
}
