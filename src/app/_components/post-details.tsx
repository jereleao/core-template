import { api } from "~/libs/trpc/server";

export default async function PostDetais(props: { postId: number }) {
  const post = await api.post.getById({ id: props.postId });

  return (
    <div className="flex size-full bg-amber-400">
      {`${post.id}: ${post.name ?? ""}`}
    </div>
  );
}
