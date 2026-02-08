import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertFamilyMemberSchema, 
  insertPressFeatureSchema,
  insertSocialStatSchema,
  insertBrandEcosystemSchema,
  insertTimelineEventSchema
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // ============== Family Members ==============
  app.get("/api/family", async (req, res) => {
    try {
      const members = await storage.getFamilyMembers();
      res.json(members);
    } catch (error) {
      console.error("Error fetching family members:", error);
      res.status(500).json({ error: "Failed to fetch family members" });
    }
  });

  app.get("/api/family/:id", async (req, res) => {
    try {
      const member = await storage.getFamilyMember(req.params.id);
      if (!member) {
        return res.status(404).json({ error: "Family member not found" });
      }
      res.json(member);
    } catch (error) {
      console.error("Error fetching family member:", error);
      res.status(500).json({ error: "Failed to fetch family member" });
    }
  });

  app.post("/api/family", async (req, res) => {
    try {
      const parsed = insertFamilyMemberSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }
      const member = await storage.createFamilyMember(parsed.data);
      res.status(201).json(member);
    } catch (error) {
      console.error("Error creating family member:", error);
      res.status(500).json({ error: "Failed to create family member" });
    }
  });

  // ============== Press Features ==============
  app.get("/api/press", async (req, res) => {
    try {
      const features = await storage.getPressFeatures();
      res.json(features);
    } catch (error) {
      console.error("Error fetching press features:", error);
      res.status(500).json({ error: "Failed to fetch press features" });
    }
  });

  app.get("/api/press/featured", async (req, res) => {
    try {
      const features = await storage.getFeaturedPress();
      res.json(features);
    } catch (error) {
      console.error("Error fetching featured press:", error);
      res.status(500).json({ error: "Failed to fetch featured press" });
    }
  });

  app.post("/api/press", async (req, res) => {
    try {
      const parsed = insertPressFeatureSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }
      const feature = await storage.createPressFeature(parsed.data);
      res.status(201).json(feature);
    } catch (error) {
      console.error("Error creating press feature:", error);
      res.status(500).json({ error: "Failed to create press feature" });
    }
  });

  // ============== Social Stats ==============
  app.get("/api/social-stats", async (req, res) => {
    try {
      const stats = await storage.getSocialStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching social stats:", error);
      res.status(500).json({ error: "Failed to fetch social stats" });
    }
  });

  app.put("/api/social-stats/:platform", async (req, res) => {
    try {
      const parsed = insertSocialStatSchema.safeParse({
        ...req.body,
        platform: req.params.platform
      });
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }
      const stat = await storage.upsertSocialStat(parsed.data);
      res.json(stat);
    } catch (error) {
      console.error("Error updating social stat:", error);
      res.status(500).json({ error: "Failed to update social stat" });
    }
  });

  // ============== Brand Ecosystem ==============
  app.get("/api/brands", async (req, res) => {
    try {
      const brands = await storage.getBrands();
      res.json(brands);
    } catch (error) {
      console.error("Error fetching brands:", error);
      res.status(500).json({ error: "Failed to fetch brands" });
    }
  });

  app.post("/api/brands", async (req, res) => {
    try {
      const parsed = insertBrandEcosystemSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }
      const brand = await storage.createBrand(parsed.data);
      res.status(201).json(brand);
    } catch (error) {
      console.error("Error creating brand:", error);
      res.status(500).json({ error: "Failed to create brand" });
    }
  });

  // ============== Media Kit ==============
  app.get("/api/media-kit", async (req, res) => {
    try {
      const [stats, press, brands, config] = await Promise.all([
        storage.getSocialStats(),
        storage.getPressFeatures(),
        storage.getBrands(),
        storage.getMediaKitConfig()
      ]);
      
      // Calculate total reach
      const totalFollowers = stats.reduce((sum, s) => sum + (s.followerCount || 0), 0);
      
      res.json({
        socialStats: stats,
        pressFeatures: press,
        brands: brands,
        config: Object.fromEntries(config.map(c => [c.key, c.value])),
        totalReach: totalFollowers,
        lastUpdated: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error fetching media kit:", error);
      res.status(500).json({ error: "Failed to fetch media kit" });
    }
  });

  // ============== Timeline Events ==============
  app.get("/api/timeline", async (req, res) => {
    try {
      const events = await storage.getTimelineEvents();
      res.json(events);
    } catch (error) {
      console.error("Error fetching timeline:", error);
      res.status(500).json({ error: "Failed to fetch timeline" });
    }
  });

  app.post("/api/timeline", async (req, res) => {
    try {
      const parsed = insertTimelineEventSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.errors });
      }
      const event = await storage.createTimelineEvent(parsed.data);
      res.status(201).json(event);
    } catch (error) {
      console.error("Error creating timeline event:", error);
      res.status(500).json({ error: "Failed to create timeline event" });
    }
  });

  return httpServer;
}
