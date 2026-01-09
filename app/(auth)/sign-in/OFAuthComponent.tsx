import React, { useState } from "react";
import { startOnlyFansAuthentication } from "@onlyfansapi/auth";
import type { AuthSuccessData, AuthFailureError } from "@onlyfansapi/auth";

// interface AuthSuccessData {
//   accountId: string;
//   username: string;
//   response: object;
// }

export default function AuthComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [authData, setAuthData] = useState<AuthSuccessData | null>(null);
  const [error, setError] = useState<AuthFailureError | null>(null);

  const CLIENT_SECRET = process.env.NEXT_PUBLIC_OFAPI_CLIENT_SECRET;

  const handleAuthentication = () => {
    if (!CLIENT_SECRET) {
      console.error("Client secret is not defined");
      return;
    }
    setIsLoading(true);
    setError(null);

    startOnlyFansAuthentication(CLIENT_SECRET, {
      onSuccess: (data) => {
        console.log("Authentication successful:", data);
        setAuthData(data);
        setIsLoading(false);
        // data.accountId - The authenticated account ID
        // data.username - The authenticated username
        // data.response - Full response from the API
      },
      onError: (error) => {
        console.error("Authentication failed:", error);
        setError(error);
        setIsLoading(false);
        // error.message - Error message
        // error.code - Error code (if available)
        // error.details - Additional error details (if available)
      },
    });
  };

  return (
    <div className="auth-container">
      <button
        onClick={handleAuthentication}
        disabled={isLoading}
        className="auth-button"
      >
        {isLoading ? "Authenticating..." : "Connect OnlyFans Account"}
      </button>

      {authData && (
        <div className="success-message">
          <h3>Authentication Successful!</h3>
          <p>Account ID: {authData.accountId}</p>
          <p>Username: {authData.username}</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <h3>Authentication Failed</h3>
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
}
