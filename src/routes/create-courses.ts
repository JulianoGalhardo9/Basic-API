import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { courses } from "../database/schema";
import { db } from "../database/client";
import z from "zod";

export const createCoursesRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/courses",
    {
      schema: {
        tags: ['courses'],
        summary: 'create a course',
        body: z.object({
          title: z
            .string()
            .min(5, "O título precisa ter no mínimo 5 caracteres"),
        }),
        response: {
          201: z.object({ courseId: z.uuid()}).describe('Curso criado com sucesso')
        }
      },
    },
    async (request, reply) => {
      const courseTitle = request.body.title;

      const result = await db
        .insert(courses)
        .values({ title: courseTitle })
        .returning();

      return reply.status(201).send({ courseId: result[0].id });
    }
  );
};
