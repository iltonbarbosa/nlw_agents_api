import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { rooms } from "./rooms.ts";


export const questions = pgTable('questions', {
    id: uuid().primaryKey().defaultRandom(),
    roomId: uuid().notNull().references(() => rooms.id), // Foreign key to rooms table
    questions: text().notNull(),     
    answer: text(),
    createdAt: timestamp().notNull().defaultNow(),    
})