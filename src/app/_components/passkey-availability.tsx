"use client"

import { usePasskeyAvailable } from "~/hooks/use-passkey-available"

export default function PasskeyAvailability() {
  const available = usePasskeyAvailable()
  return (
    <div>
      {available ? "Passkey is available" : "Passkey is not available"}
    </div>
  )
}
