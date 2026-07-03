"use client";

import { Button } from "~/components/ui/button";
import { usePasskeyAvailable } from "~/hooks/use-passkey-available";

export default function PasskeyAvailability() {
  const available = usePasskeyAvailable();
  const onISUVPAA = async (): Promise<void> => {
    if (window.PublicKeyCredential) {
      if (PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
        const result =
          await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        if (result) {
          alert("User Verifying Platform Authenticator is *available*.");
        } else {
          alert("User Verifying Platform Authenticator is not available.");
        }
      } else {
        alert("IUVPAA function is not available.");
      }
    } else {
      alert("PublicKeyCredential is not availlable.");
    }
  };
  return (
    <>
      <div>
        {available ? "Passkey is available" : "Passkey is not available"}
      </div>
      <Button onClick={onISUVPAA} className="rounded px-4 py-2">
        Check IUVPAA
      </Button>
    </>
  );
}
