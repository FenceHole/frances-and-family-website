import { db } from "./db";
import { familyMembers, pressFeatures, socialStats, brandEcosystem, timelineEvents } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Seed Family Members
  await db.insert(familyMembers).values([
    {
      name: "Frances",
      role: "The Matriarch",
      description: "The brave soul who started it all.",
      bio: "Frances was a scared, pregnant feral cat who found her way through a hole in Chris's fence in Philadelphia. She was desperately seeking a safe place to have her kittens. What started as a temporary foster turned into a forever home when she gave birth to 6 beautiful kittens.",
      personality: "Gentle, nurturing, and fiercely protective of her babies",
      funFacts: ["Found her way in through a hole in the fence", "Gave birth to 6 kittens", "Former feral cat turned lap cat"],
      color: "bg-amber-50",
      sortOrder: 1,
    },
    {
      name: "Oliver",
      role: "The Original",
      description: "The orange boy who welcomed them.",
      bio: "Oliver was Chris's first cat, the one who was there before Frances and her family arrived. He welcomed the newcomers with open paws and became a gentle big brother to all the kittens.",
      personality: "Calm, welcoming, and endlessly patient",
      funFacts: ["The first cat in the family", "Welcomed Frances and her kittens", "Known for his gentle demeanor"],
      color: "bg-orange-50",
      sortOrder: 2,
    },
    {
      name: "Donda",
      role: "The Firstborn",
      description: "Named after Kanye's mother, the first of Frances's kittens.",
      bio: "Donda was the first kitten born, and quickly became a fan favorite on social media. She has her own camera (the Donda Cam) that streams her adventures.",
      personality: "Playful, curious, and camera-ready",
      funFacts: ["First kitten born", "Has her own live camera", "Named after Donda West"],
      color: "bg-rose-50",
      sortOrder: 3,
    },
    {
      name: "Snoo",
      role: "The Reddit Famous",
      description: "Named after the Reddit mascot, beloved by the community.",
      bio: "Snoo got their name from the Reddit community who followed the journey from the very beginning. They were instrumental in making Frances and Family go viral.",
      personality: "Social, attention-loving, and photogenic",
      funFacts: ["Named by the Reddit community", "Helped the family go viral", "Loves being the center of attention"],
      color: "bg-red-50",
      sortOrder: 4,
    },
    {
      name: "Epona",
      role: "The Adventurer",
      description: "Named after the horse from Legend of Zelda.",
      bio: "Epona is the explorer of the group, always finding new places to investigate and new toys to discover.",
      personality: "Adventurous, independent, and brave",
      funFacts: ["Named after Link's horse", "The explorer of the family", "First to investigate new things"],
      color: "bg-green-50",
      sortOrder: 5,
    },
    {
      name: "Foxy",
      role: "The Fox-Like",
      description: "Named for their fox-like appearance.",
      bio: "Foxy earned their name from their distinctive coloring and alert, fox-like facial features.",
      personality: "Alert, clever, and mischievous",
      funFacts: ["Distinctive fox-like markings", "Very clever", "Known for their mischievous streak"],
      color: "bg-amber-100",
      sortOrder: 6,
    },
    {
      name: "Marbles",
      role: "The Marble Cat",
      description: "Named for their beautiful marble-patterned coat.",
      bio: "Marbles has a stunning swirled coat pattern that looks like it was painted by an artist.",
      personality: "Graceful, elegant, and slightly aloof",
      funFacts: ["Stunning marble coat pattern", "Most photogenic of the kittens", "Loves to pose"],
      color: "bg-stone-100",
      sortOrder: 7,
    },
    {
      name: "Freya",
      role: "The Tripod",
      description: "Three legs, infinite love.",
      bio: "Freya is the family's three-legged dog who proves that disability is just a different ability. She's the heart of the family and gets along wonderfully with all the cats.",
      personality: "Joyful, resilient, and endlessly loving",
      funFacts: ["Three-legged rescue dog", "Best friends with the cats", "Inspires everyone she meets"],
      color: "bg-purple-50",
      sortOrder: 8,
    },
  ]).onConflictDoNothing();

  // Seed Press Features
  await db.insert(pressFeatures).values([
    {
      outlet: "Newsweek",
      title: "Pregnant Stray Turns Up in Man's Garden, Now He's Dad to 8 Kittens",
      description: "Featured story about how Chris became a cat dad after Frances found her way through his fence.",
      url: "https://www.newsweek.com/pregnant-stray-turns-mans-garden-now-hes-dad-8-kittens-1988165",
      featured: true,
      sortOrder: 1,
    },
    {
      outlet: "Newsweek",
      title: "Cat Dad's Emotional Reunion Goes Viral",
      description: "Follow-up feature on the family's viral moments.",
      featured: true,
      sortOrder: 2,
    },
    {
      outlet: "China Daily",
      title: "International Feature: American Cat Dad",
      description: "Frances and Family's story reaches international audiences.",
      featured: true,
      sortOrder: 3,
    },
    {
      outlet: "Amazon",
      title: "Top 30 Pet Influencers 2025",
      description: "Cool Cat Stuff ranked #22 among Amazon's top pet influencers.",
      featured: true,
      sortOrder: 4,
    },
    {
      outlet: "YouTube",
      title: "Creator Panel Member",
      description: "Invited to participate in YouTube's creator panels.",
      featured: false,
      sortOrder: 5,
    },
  ]).onConflictDoNothing();

  // Seed Social Stats
  await db.insert(socialStats).values([
    { platform: "TikTok", handle: "@francesandfam", followerCount: 102700, displayCount: "102.7K", profileUrl: "https://tiktok.com/@francesandfam" },
    { platform: "Instagram", handle: "@FrancesAndFamily", followerCount: 102000, displayCount: "102K", profileUrl: "https://instagram.com/FrancesAndFamily" },
    { platform: "YouTube", handle: "@francesandfamily", followerCount: 6200, displayCount: "6.2K", profileUrl: "https://youtube.com/@francesandfamily" },
    { platform: "Twitter", handle: "@FrancesAndFam", followerCount: 6900, displayCount: "6.9K", profileUrl: "https://twitter.com/FrancesAndFam" },
    { platform: "LinkedIn", handle: "christhecatdude", followerCount: 18000, displayCount: "18K", profileUrl: "https://linkedin.com/in/christhecatdude" },
    { platform: "Reddit", handle: "u/SingTheDamnSong", followerCount: 9500, displayCount: "9.5K", profileUrl: "https://reddit.com/u/SingTheDamnSong" },
  ]).onConflictDoNothing();

  // Seed Brand Ecosystem
  await db.insert(brandEcosystem).values([
    {
      name: "Cool Cat Stuff",
      tagline: "The Show",
      description: "From a joke to #1 on Amazon Live. We review the best (and worst) products for your furry friends. Join us daily for live unboxings, reviews, and chaos.",
      url: "http://amazon.com/live/coolcatstuff",
      category: "show",
      stats: "#22 Amazon Pet Influencer",
      sortOrder: 1,
    },
    {
      name: "The Good Meow",
      tagline: "The Voice",
      description: "Satirical news for cats. Because humans are ridiculous. Daily entertainment and commentary from the feline perspective.",
      url: "https://thegoodmeow.com",
      category: "voice",
      stats: "Daily Entertainment",
      sortOrder: 2,
    },
    {
      name: "Vet Van Fleet",
      tagline: "The Mission",
      description: "Making free healthcare for cats available everywhere. Our nonprofit initiative to bring mobile veterinary care to underserved communities.",
      url: "https://vetvanfleet.com",
      category: "mission",
      stats: "Non-Profit Initiative",
      sortOrder: 3,
    },
  ]).onConflictDoNothing();

  // Seed Timeline Events
  await db.insert(timelineEvents).values([
    {
      year: "2021",
      title: "The Hole in the Fence",
      description: "A scared, pregnant feral cat named Frances finds her way through a hole in Chris's backyard fence in Philadelphia.",
      sortOrder: 1,
    },
    {
      year: "2021",
      title: "Six Kittens Born",
      description: "Frances gives birth to 6 beautiful kittens. What was supposed to be a foster situation becomes a forever home.",
      sortOrder: 2,
    },
    {
      year: "2022",
      title: "Going Viral",
      description: "The family's story catches fire on Reddit and TikTok, reaching millions of people worldwide.",
      sortOrder: 3,
    },
    {
      year: "2023",
      title: "Cool Cat Stuff Launches",
      description: "What started as a joke becomes a legitimate business. Cool Cat Stuff debuts on Amazon Live.",
      sortOrder: 4,
    },
    {
      year: "2024",
      title: "#22 Pet Influencer",
      description: "Cool Cat Stuff is recognized as one of Amazon's top 30 pet influencers.",
      sortOrder: 5,
    },
    {
      year: "2024",
      title: "Newsweek Features (4x)",
      description: "The family is featured in Newsweek four times throughout the year.",
      sortOrder: 6,
    },
    {
      year: "2025",
      title: "Vet Van Fleet",
      description: "The nonprofit initiative launches to provide free cat healthcare to underserved communities.",
      sortOrder: 7,
    },
  ]).onConflictDoNothing();

  console.log("Database seeded successfully!");
}

seed()
  .catch(console.error)
  .finally(() => process.exit(0));
