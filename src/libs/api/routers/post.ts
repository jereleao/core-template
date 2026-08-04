import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/libs/api/trpc";
import { auth } from "~/libs/auth";
import { posts } from "~/libs/db/schema";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  posts: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.db.query.posts.findMany();

    return posts ?? null;
  }),

  create: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(posts).values({
        name: input.name,
        createdById: ctx.session.user.id,
      });
    }),

  getLatest: protectedProcedure.query(async ({ ctx }) => {
    const post = await ctx.db.query.posts.findFirst({
      orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    });

    return post ?? null;
  }),

  getById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ ctx, input }) => {
      const session = await auth();
      if (!session?.user?.id) throw new Error("Unauthorized");

      const post = await ctx.db.query.posts.findFirst({
        where: (post, { eq }) => eq(post.id, input.id),
        orderBy: (post, { desc }) => [desc(post.createdAt)],
      });
      if (!post) throw new Error("not Found");

      if (post.createdById != session.user.id) throw new Error("Unautorized");

      return post ?? null;
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
