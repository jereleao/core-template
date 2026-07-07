"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { PASSKEY_PROVIDER_ID } from "~/env";
import { usePasskeyAvailable } from "~/hooks/use-passkey-available";
import { useWebauthnRegister } from "~/hooks/use-webauthn-register";
import { api } from "~/trpc/react";

export default function PasskeyAvailability() {
  const passkeyAvailable = usePasskeyAvailable();

  const session = useSession();

  const { data: userData, isPending: isPendingQuery } = api.user.me.useQuery();

  const enabled =
    !userData?.disablePasskey &&
    !isPendingQuery &&
    passkeyAvailable &&
    session.status == "authenticated" &&
    session.data?.provider !== PASSKEY_PROVIDER_ID;

  useEffect(() => {
    if (enabled) setPasskeyDialogOpen(true);
  }, [enabled]);

  const [passkeyDialogOpen, setPasskeyDialogOpen] = useState<boolean>(false);

  const [isRegistering, registerPasskey] = useWebauthnRegister(enabled);

  const { mutate: disablePasskey, isPending: isPendintMutation } =
    api.user.disablePasskey.useMutation({
      onSuccess: () => {
        setPasskeyDialogOpen(false);
      },
    });

  const handleDisablePasskey = () => disablePasskey();

  const handleRegisterPasskey = async () => {
    await registerPasskey();

    setPasskeyDialogOpen(false);
  };

  return (
    <Dialog open={passkeyDialogOpen} onOpenChange={setPasskeyDialogOpen}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Enable passkeys?</DialogTitle>
          <DialogDescription>
            Add a passkey to sign in faster and more securely.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleDisablePasskey}
            disabled={isPendintMutation}
          >
            No
          </Button>
          <Button onClick={handleRegisterPasskey} disabled={isRegistering}>
            Yes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
