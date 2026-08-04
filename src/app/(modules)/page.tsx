import Link from "next/link";

import { getTranslations } from "next-intl/server";
import { auth } from "~/libs/auth";
import { api, HydrateClient } from "~/libs/trpc/server";
import PasskeyAvailability from "~/components/passkey-availability";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await auth();

  console.log("Session in page:", session);

  if (session?.user) {
    void api.post.getLatest.prefetch();
  }

  const posts = await api.post.posts();

  const t = await getTranslations("HomePage");

  console.log(posts);

  return (
    <HydrateClient>
      <PasskeyAvailability />
      <h1>{t("title")}</h1>
      {/* <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#2e026d] to-[#15162c] text-white"> */}
      {/* <div className="container flex h-full flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
        </h1>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl text-white">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl text-white">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
          </div>
        </div> */}

      {/* <div className="flex w-full flex-col items-start gap-2">
        {new Array(100).fill(0).map((_, i) => (
          <p key={i} className="text-2xl">
            {i + 1}. This is a placeholder element.
          </p>
        ))}
      </div> */}
      {/* 
        {session?.user && <LatestPost />}

        {posts.map((p) => (
          <Link key={p.id} href={`/img/${p.id}`}>
            <div className="p-2">{p.name}</div>
          </Link>
        ))}
      </div> */}
      {/* </main> */}
    </HydrateClient>
  );
}
