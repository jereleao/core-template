import { eq } from "drizzle-orm";
import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { users } from "~/server/db/schema";

export const userRouter = createTRPCRouter({
  me: publicProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;

    if (!userId) throw new Error("Unauthorized");

    const userData = await ctx.db.query.users.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
    });

    return userData ?? null;
  }),

  existingKeys: protectedProcedure.query(async ({ ctx }) => {
    const userId = ctx.session?.user.id;

    if (!userId) throw new Error("Unauthorized");

    const existingKeys = await ctx.db.query.storedCredentials.findMany({
      where: (key, { eq }) => eq(key.userId, userId),
    });

    console.log(existingKeys);

    return [];
  }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const userData = await ctx.db.query.users.findFirst({
        where: (user, { eq }) => eq(user.id, input.id),
      });

      return userData ?? null;
    }),

  disablePasskey: protectedProcedure.mutation(async ({ ctx }) => {
    const userId = ctx.session?.user.id;

    if (!userId) throw new Error("Unauthorized");

    await ctx.db
      .update(users)
      .set({
        disablePasskey: true,
      })
      .where(eq(users.id, userId));
  }),
});
