"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Button } from "~/components/ui/button";
import { SignOut } from "~/components/auth-component";
import type { Session } from "next-auth";
import { useTransition } from "react";
import { logoutAction } from "~/server/auth/actions";
import UserAvatar from "./user-avatar";
import ConditionGuard from "./condition-guard";
import { usePasskeyAvailable } from "~/hooks/use-passkey-available";
import { useWebauthnRegister } from "~/hooks/use-webauthn-register";
import { localesOptions } from "~/i18n/locale-options";
import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "next-intl";
import { changeLocaleAction } from "~/i18n/locale-action";
import Link from "next/link";

export default function UserMenu({ session }: { session: Session }) {
  const [isLogingOut, startLogout] = useTransition();

  const handleLogout = () => startLogout(() => logoutAction());

  const t = useTranslations("UserMenu");

  const locale = useLocale();

  const onSelectLocale = async (selectedLocale: Locale) => {
    if (selectedLocale === locale) return;
    await changeLocaleAction(selectedLocale);
  };

  console.log("Rendering UserMenu with session:", session);

  const passkeyAvailable = usePasskeyAvailable();

  const canAuthenticateWithPasskey = passkeyAvailable || false;

  const [isRegistering, handleRegisterPasskey] = useWebauthnRegister();

  if (isLogingOut) return <div>Logging out...</div>;

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
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {t("language.label")}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                {localesOptions.map((localeOption) => (
                  <DropdownMenuItem
                    onSelect={() => onSelectLocale(localeOption)}
                  >
                    {t("language.locale", { locale: localeOption })}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Link href="./account">{t("account")}</Link>
          </DropdownMenuItem>
          <ConditionGuard condition={canAuthenticateWithPasskey}>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Authentication</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <ConditionGuard condition={passkeyAvailable}>
                    <DropdownMenuItem
                      onSelect={handleRegisterPasskey}
                      disabled={isRegistering}
                    >
                      Register Passkey
                    </DropdownMenuItem>
                  </ConditionGuard>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </ConditionGuard>
          <DropdownMenuItem>
            <SignOut handleLogout={handleLogout} />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
