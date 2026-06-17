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

export const profile = sqliteTable("profile", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
  imageKey: text("image_key").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const heroSlides = sqliteTable("hero_slides", {
  id: text("id").primaryKey(),
  alt: text("alt").notNull(),
  imageUrl: text("image_url").notNull(),
  imageKey: text("image_key").notNull(),
  sortOrder: integer("sort_order").notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
});

