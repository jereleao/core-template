import { auth } from "~/server/auth";
import { SignIn } from "~/components/auth-component";
import UserMenu from "./user-menu";

export default async function UserButton() {
  const session = await auth();

  if (!session?.user) return <SignIn />;

  console.log("User session:", session);

  return <UserMenu session={session} />;
}
