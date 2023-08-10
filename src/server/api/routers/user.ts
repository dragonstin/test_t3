import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const usersRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  create: publicProcedure
  .input(
    z.object({
        enumber: z.string()
    })
  )
  .mutation(async ({ ctx, input }) => {

    const user = await ctx.prisma.user.create({
        data: {
            enumber: input.enumber,
            firstName: "",
            lastName: '',
            role: '',

        },
    })
  })
});
