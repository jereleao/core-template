"use client";

import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import type { Session } from "next-auth";
import ConditionGuard from "~/components/condition-guard";
import { UserRound } from "lucide-react";

type SessionUser = NonNullable<Session["user"]>;

type UserAvatarProps = Pick<SessionUser, "image" | "name">;

export default function UserAvatar({ image, name }: UserAvatarProps) {
  return (
    <Avatar className="h-8 w-8">
      <ConditionGuard
        condition={!!image}
        fallback={
          <AvatarFallback>
            <ConditionGuard condition={!!name} fallback={<UserRound />}>
              {name
                ?.split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </ConditionGuard>
          </AvatarFallback>
        }
      >
        <AvatarImage src={image!} alt={name ?? ""} />
      </ConditionGuard>
    </Avatar>
  );
}
