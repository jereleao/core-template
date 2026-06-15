"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { SignOut } from "~/components/auth-component";
import type { Session } from "next-auth";
import { useTransition } from "react";
import { logoutAction } from "~/server/auth/actions";
import UserAvatar from "./user-avatar";

export default function UserMenu({ session }: { session: Session }) {
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => startTransition(() => logoutAction());

  if (isPending) return <div>Logging out...</div>;

  console.log("Rendering UserMenu with session:", session.user);

  return (
    <div className="flex items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <UserAvatar image={session.user.image} name={session.user.name} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm leading-none font-medium">
                {session.user.name}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuItem>
            <SignOut handleLogout={handleLogout} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
