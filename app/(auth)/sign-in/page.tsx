"use client";
import SigninBackground from "@/components/SignInBackground";
import { AuthForm } from "@/components/ui/sign-in-1";
import { signIn, signUp } from "@/lib/auth-client";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { startOnlyFansAuthentication } from "@onlyfansapi/auth";
import api from "@/lib/api";

const IconGoogle = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <title>Google</title>
    <path
      d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.386-7.439-7.574s3.344-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.85l3.25-3.138C18.189 1.186 15.479 0 12.24 0 5.48 0 0 5.48 0 12.24s5.48 12.24 12.24 12.24c6.885 0 11.954-4.823 11.954-12.015 0-.795-.084-1.588-.239-2.356H12.24z"
      fill="currentColor"
    />
  </svg>
);

const IconOnlyFans = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <title>OnlyFans</title>
    <image href="https://cdn.simpleicons.org/onlyfans" width="24" height="24" />
  </svg>
);

const companyLogoSrc = "https://www.tanishm.site/svgs/logo.svg";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  if (session) {
    redirect("/dashboard");
  }
  // const [error, setError] = useState<AuthFailureError | null>(null);

  const CLIENT_SECRET = process.env.NEXT_PUBLIC_OFAPI_CLIENT_SECRET;

  const handleAuthentication = () => {
    if (!CLIENT_SECRET) {
      console.error("Client secret is not defined");
      return;
    }
    setLoading(true);
    // setError(null);

    startOnlyFansAuthentication(CLIENT_SECRET, {
      onSuccess: async (data) => {
        // console.log("Authentication successful:", data);
        const existsResponse = await api.post("/auth/check-user", {
          email: data.onlyfansData.email,
        });
        const { exists } = await existsResponse.data;
        if (!exists) {
          if (!data.onlyfansData.avatar_url) {
            data.onlyfansData.avatar_url =
              "https://static.vecteezy.com/system/resources/previews/012/660/865/non_2x/onlyfans-logo-on-transparent-isolated-background-free-vector.jpg";
          }
          await signUp.email({
            email: data.onlyfansData.email,
            password: data.accountId,
            name: data.onlyfansData.name,
            image: data.onlyfansData.avatar_url!,
            callbackURL: "/dashboard",
          });
        } else {
          await signIn.email({
            email: data.onlyfansData.email,
            password: data.accountId,
            callbackURL: "/dashboard",
          });
        }
      },
      onError: (error) => {
        // console.error("Authentication failed:", error);
        // setError(error);
        setLoading(false);
        // error.message - Error message
        // error.code - Error code (if available)
        // error.details - Additional error details (if available)
      },
    });
  };
  return (
    <main className="relative h-screen">
      <SigninBackground />
      <div className="absolute inset-0 flex items-center justify-center">
        <AuthForm
          logoSrc={companyLogoSrc}
          logoAlt="Feedback Pulse Logo"
          title="Welcome Back"
          description="Enter your credentials to access your account."
          primaryAction={{
            label: "Continue with Google",
            icon: <IconGoogle className="mr-2 h-4 w-4" />,
            onClick: async () => {
              try {
                setLoading(true);
                await signIn.social(
                  {
                    provider: "google",
                    callbackURL: "/dashboard",
                  },
                  {
                    onRequest: () => {
                      setLoading(true);
                    },
                    onResponse: () => {
                      setLoading(false);
                    },
                  }
                );
              } finally {
                setLoading(false);
              }
            },
          }}
          secondaryActions={[
            {
              label: "Continue with OnlyFans",
              icon: <IconOnlyFans className="mr-2 h-4 w-4" />,
              onClick: handleAuthentication,
            },
          ]}
        />
      </div>
    </main>
  );
}
