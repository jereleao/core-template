import PostDetais from "~/components/post-details";

export default async function PostPage(props: { params: { id: string } }) {
  const { id: postId } = props.params;

  const postIdAsNumber = Number(postId);
  if (Number.isNaN(postIdAsNumber)) throw new Error("Invalid post Id");

  return <PostDetais postId={postIdAsNumber} />;
}
