import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Family Members (cats and Freya)
export const familyMembers = pgTable("family_members", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(), // e.g., "The Matriarch", "The Original", etc.
  description: text("description").notNull(),
  bio: text("bio"), // longer biography
  imageUrl: text("image_url"),
  color: text("color"), // for UI theming
  birthDate: text("birth_date"), // approximate
  adoptionDate: text("adoption_date"),
  personality: text("personality"),
  funFacts: jsonb("fun_facts").$type<string[]>(),
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
});

export const insertFamilyMemberSchema = createInsertSchema(familyMembers).omit({
  id: true,
});
export type InsertFamilyMember = z.infer<typeof insertFamilyMemberSchema>;
export type FamilyMember = typeof familyMembers.$inferSelect;

// Press Features / Media Mentions
export const pressFeatures = pgTable("press_features", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  outlet: text("outlet").notNull(), // e.g., "Newsweek", "China Daily"
  title: text("title").notNull(),
  description: text("description"),
  url: text("url"),
  imageUrl: text("image_url"),
  publishDate: text("publish_date"),
  featured: boolean("featured").default(false),
  sortOrder: integer("sort_order").default(0),
});

export const insertPressFeatureSchema = createInsertSchema(pressFeatures).omit({
  id: true,
});
export type InsertPressFeature = z.infer<typeof insertPressFeatureSchema>;
export type PressFeature = typeof pressFeatures.$inferSelect;

// Social Media Stats (for live media kit)
export const socialStats = pgTable("social_stats", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  platform: text("platform").notNull().unique(), // TikTok, Instagram, YouTube, Twitter, LinkedIn, Reddit
  handle: text("handle").notNull(),
  followerCount: integer("follower_count").default(0),
  displayCount: text("display_count"), // e.g., "102.7K"
  profileUrl: text("profile_url"),
  lastUpdated: timestamp("last_updated").defaultNow(),
});

export const insertSocialStatSchema = createInsertSchema(socialStats).omit({
  id: true,
  lastUpdated: true,
});
export type InsertSocialStat = z.infer<typeof insertSocialStatSchema>;
export type SocialStat = typeof socialStats.$inferSelect;

// Brand Ecosystem
export const brandEcosystem = pgTable("brand_ecosystem", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  logoUrl: text("logo_url"),
  screenshotUrl: text("screenshot_url"),
  category: text("category"), // "show", "voice", "mission"
  stats: text("stats"), // e.g., "#22 Amazon Pet Influencer"
  sortOrder: integer("sort_order").default(0),
  isActive: boolean("is_active").default(true),
});

export const insertBrandEcosystemSchema = createInsertSchema(brandEcosystem).omit({
  id: true,
});
export type InsertBrandEcosystem = z.infer<typeof insertBrandEcosystemSchema>;
export type BrandEcosystem = typeof brandEcosystem.$inferSelect;

// Media Kit Configuration
export const mediaKitConfig = pgTable("media_kit_config", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  description: text("description"),
});

export const insertMediaKitConfigSchema = createInsertSchema(mediaKitConfig).omit({
  id: true,
});
export type InsertMediaKitConfig = z.infer<typeof insertMediaKitConfigSchema>;
export type MediaKitConfig = typeof mediaKitConfig.$inferSelect;

// Timeline Events
export const timelineEvents = pgTable("timeline_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  year: text("year").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  sortOrder: integer("sort_order").default(0),
});

export const insertTimelineEventSchema = createInsertSchema(timelineEvents).omit({
  id: true,
});
export type InsertTimelineEvent = z.infer<typeof insertTimelineEventSchema>;
export type TimelineEvent = typeof timelineEvents.$inferSelect;
