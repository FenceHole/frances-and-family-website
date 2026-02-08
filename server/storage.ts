import { 
  familyMembers, type FamilyMember, type InsertFamilyMember,
  pressFeatures, type PressFeature, type InsertPressFeature,
  socialStats, type SocialStat, type InsertSocialStat,
  brandEcosystem, type BrandEcosystem, type InsertBrandEcosystem,
  mediaKitConfig, type MediaKitConfig, type InsertMediaKitConfig,
  timelineEvents, type TimelineEvent, type InsertTimelineEvent
} from "@shared/schema";
import { db } from "./db";
import { eq, asc } from "drizzle-orm";

export interface IStorage {
  // Family Members
  getFamilyMembers(): Promise<FamilyMember[]>;
  getFamilyMember(id: string): Promise<FamilyMember | undefined>;
  createFamilyMember(member: InsertFamilyMember): Promise<FamilyMember>;
  updateFamilyMember(id: string, member: Partial<InsertFamilyMember>): Promise<FamilyMember | undefined>;
  
  // Press Features
  getPressFeatures(): Promise<PressFeature[]>;
  getFeaturedPress(): Promise<PressFeature[]>;
  createPressFeature(feature: InsertPressFeature): Promise<PressFeature>;
  
  // Social Stats
  getSocialStats(): Promise<SocialStat[]>;
  getSocialStat(platform: string): Promise<SocialStat | undefined>;
  upsertSocialStat(stat: InsertSocialStat): Promise<SocialStat>;
  
  // Brand Ecosystem
  getBrands(): Promise<BrandEcosystem[]>;
  createBrand(brand: InsertBrandEcosystem): Promise<BrandEcosystem>;
  
  // Media Kit Config
  getMediaKitConfig(): Promise<MediaKitConfig[]>;
  getConfigValue(key: string): Promise<string | undefined>;
  setConfigValue(key: string, value: string, description?: string): Promise<MediaKitConfig>;
  
  // Timeline Events
  getTimelineEvents(): Promise<TimelineEvent[]>;
  createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent>;
}

export class DatabaseStorage implements IStorage {
  // Family Members
  async getFamilyMembers(): Promise<FamilyMember[]> {
    return db.select().from(familyMembers).where(eq(familyMembers.isActive, true)).orderBy(asc(familyMembers.sortOrder));
  }

  async getFamilyMember(id: string): Promise<FamilyMember | undefined> {
    const [member] = await db.select().from(familyMembers).where(eq(familyMembers.id, id));
    return member || undefined;
  }

  async createFamilyMember(member: InsertFamilyMember): Promise<FamilyMember> {
    const [created] = await db.insert(familyMembers).values({
      ...member,
      funFacts: member.funFacts ?? null,
    }).returning();
    return created;
  }

  async updateFamilyMember(id: string, member: Partial<InsertFamilyMember>): Promise<FamilyMember | undefined> {
    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(member)) {
      if (value !== undefined) {
        updateData[key] = value;
      }
    }
    const [updated] = await db.update(familyMembers).set(updateData).where(eq(familyMembers.id, id)).returning();
    return updated || undefined;
  }

  // Press Features
  async getPressFeatures(): Promise<PressFeature[]> {
    return db.select().from(pressFeatures).orderBy(asc(pressFeatures.sortOrder));
  }

  async getFeaturedPress(): Promise<PressFeature[]> {
    return db.select().from(pressFeatures).where(eq(pressFeatures.featured, true)).orderBy(asc(pressFeatures.sortOrder));
  }

  async createPressFeature(feature: InsertPressFeature): Promise<PressFeature> {
    const [created] = await db.insert(pressFeatures).values(feature).returning();
    return created;
  }

  // Social Stats
  async getSocialStats(): Promise<SocialStat[]> {
    return db.select().from(socialStats);
  }

  async getSocialStat(platform: string): Promise<SocialStat | undefined> {
    const [stat] = await db.select().from(socialStats).where(eq(socialStats.platform, platform));
    return stat || undefined;
  }

  async upsertSocialStat(stat: InsertSocialStat): Promise<SocialStat> {
    const existing = await this.getSocialStat(stat.platform);
    if (existing) {
      const [updated] = await db.update(socialStats)
        .set({ ...stat, lastUpdated: new Date() })
        .where(eq(socialStats.platform, stat.platform))
        .returning();
      return updated;
    }
    const [created] = await db.insert(socialStats).values(stat).returning();
    return created;
  }

  // Brand Ecosystem
  async getBrands(): Promise<BrandEcosystem[]> {
    return db.select().from(brandEcosystem).where(eq(brandEcosystem.isActive, true)).orderBy(asc(brandEcosystem.sortOrder));
  }

  async createBrand(brand: InsertBrandEcosystem): Promise<BrandEcosystem> {
    const [created] = await db.insert(brandEcosystem).values(brand).returning();
    return created;
  }

  // Media Kit Config
  async getMediaKitConfig(): Promise<MediaKitConfig[]> {
    return db.select().from(mediaKitConfig);
  }

  async getConfigValue(key: string): Promise<string | undefined> {
    const [config] = await db.select().from(mediaKitConfig).where(eq(mediaKitConfig.key, key));
    return config?.value;
  }

  async setConfigValue(key: string, value: string, description?: string): Promise<MediaKitConfig> {
    const existing = await this.getConfigValue(key);
    if (existing !== undefined) {
      const [updated] = await db.update(mediaKitConfig)
        .set({ value, description })
        .where(eq(mediaKitConfig.key, key))
        .returning();
      return updated;
    }
    const [created] = await db.insert(mediaKitConfig).values({ key, value, description }).returning();
    return created;
  }

  // Timeline Events
  async getTimelineEvents(): Promise<TimelineEvent[]> {
    return db.select().from(timelineEvents).orderBy(asc(timelineEvents.sortOrder));
  }

  async createTimelineEvent(event: InsertTimelineEvent): Promise<TimelineEvent> {
    const [created] = await db.insert(timelineEvents).values(event).returning();
    return created;
  }
}

export const storage = new DatabaseStorage();
