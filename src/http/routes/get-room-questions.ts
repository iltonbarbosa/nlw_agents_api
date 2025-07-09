import type { FastifyPluginCallbackZod } from "fastify-type-provider-zod";
import { schema } from "../../db/schema/index.ts";
import { db } from "../../db/connection.ts";
import { eq, desc } from "drizzle-orm";   
import { z } from "zod/v4";


export const getRoomQuestions: FastifyPluginCallbackZod = (app) => {
  app.get('/rooms/:roomId/questions', {
    schema: {
        params: z.object({
          roomId: z.string(),  
        })
    },
  }, async (request) => {
        const { roomId } = request.params

        const result = await db
          .select({
            id: schema.questions.id,
            questions: schema.questions.questions,
            created_at: schema.questions.createdAt,
            answer: schema.questions.answer,
            room_id: schema.questions.roomId,
          })
          .from(schema.questions)
          .where(eq(schema.questions.roomId, roomId)).orderBy(desc(schema.questions.createdAt));

        return result;
  });
};