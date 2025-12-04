import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { courses } from "../database/schema";
import { db } from "../database/client";
import z from "zod";
import { eq } from "drizzle-orm";

export const getCoursesByIdRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/courses/:id",
    {
      schema: {
        tags: ["courses"],
        summary: "Get course by ID",
        params: z.object({
          id: z.string().uuid(),
        }),
        response: {
          200: z.object({
            course: z.object({
              id: z.string().uuid(),
              title: z.string(),
              description: z.string().nullable(),
            }),
          }),
          404: z.null().describe('Course not found'),
        },
      },
    },
    async (request, reply) => {
      const courseId = request.params.id;

      const result = await db
        .select()
        .from(courses)
        .where(eq(courses.id, courseId));

      if (result.length > 0) {
        return { course: result[0] };
      }

      return reply.status(404).send();
    }
  );
};
