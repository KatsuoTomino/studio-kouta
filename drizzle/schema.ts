import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const artworks = sqliteTable("artworks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  date: text("date").notNull(),
  comment: text("comment").notNull(),
  imageUrl: text("image_url").notNull(),
  imageKey: text("image_key").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  sortOrder: integer("sort_order").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

