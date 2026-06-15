"use client";

import { useCallback, useEffect, useState } from "react";

export function usePasskeyAvailable(): boolean | null {
  const [available, setAvailable] = useState<boolean | null>(null);

  const check = useCallback(async () => {
    try {
      const result =
        await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
      setAvailable(result);
    } catch {
      setAvailable(false);
    }
  },[]);

  useEffect(() => {
    void check();
  }, [check]);

  return available;
}