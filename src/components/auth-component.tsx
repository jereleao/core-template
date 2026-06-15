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
      <Link href="/auth/login">Login</Link>
    </Button>
  );
}

export function SignOut(
  props: React.ComponentPropsWithRef<typeof Button> & {
    handleLogout: () => void;
  },
) {
  return (
    <Button
      variant="ghost"
      className="w-full p-0"
      onClick={props.handleLogout}
      {...props}
    >
      Logout
    </Button>
  );
}
