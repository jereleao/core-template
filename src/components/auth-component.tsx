"use client";

import { Button } from "~/components/ui/button";
import Link from "next/link";
import { logoutAction } from "~/server/auth/actions";
import { useEffect, useTransition } from "react";

export function SignIn({
  provider,
  ...props
}: { provider?: string } & React.ComponentPropsWithRef<typeof Button>) {
  return (
    <Button {...props}>
      <Link href="/login">Login</Link>
    </Button>
  );
}

export function SignOut(
  props: React.ComponentPropsWithRef<typeof Button> & {
    handleLogout: () => void;
  },
) {
  const { handleLogout, ...buttonProps } = props;

  return (
    <Button
      variant="ghost"
      className="w-full p-0"
      onClick={handleLogout}
      {...buttonProps}
    >
      Logout
    </Button>
  );
}
