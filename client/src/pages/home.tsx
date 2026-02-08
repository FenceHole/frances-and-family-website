// Assets - User provided images (mapped to available files)
import hostImage from "@assets/IMG_1202_Original.jpeg"; 
import catCamImage from "@assets/IMG_0619.jpeg"; 
import dondaCamImage from "@assets/IMG_0620.jpeg"; 
import litterRobotImage from "@assets/IMG_0621.jpeg"; 
import connectProfileImage from "@assets/IMG_3334_1768604884041.jpeg"; // Cartoon Frances
import coolCatLogo from "@assets/IMG_2277.jpeg"; 
import fenceHeroImage from "@assets/9E6B2929-9A89-4A90-80E8-AC461D569FB6_1768669828331.jpeg"; // Frances peeking through fence
import familyCouchImage from "@assets/IMG_7875_1768669828331.jpeg"; // All cats on couch
import fenceArtImage from "@assets/5D99354C-2034-4461-A1DB-D2691FB8FDFA_1768669828331.jpeg"; // Preserved fence art
import vetVanHeroImage from "@assets/IMG_4545_1770193961627.png"; // Vet Van Fleet hero

// Generated images as fallbacks only
import fenceImage from "@assets/generated_images/wooden_fence_with_hole_and_sunlight.png";
import livingRoomImage from "@assets/generated_images/cozy_living_room_with_cats_and_dog.png";
import vetVanImage from "@assets/generated_images/mobile_veterinary_clinic_van.png";
import studioImage from "@assets/generated_images/home_studio_for_cat_product_reviews.png";
import logo from "@assets/logo.png";
import coolCatScreenshot from "@assets/screenshot-1768599625156.png";
import goodMeowScreenshot from "@assets/screenshot-1768599623504.png";
import vetVanScreenshot from "@assets/screenshot-1768599626595.png";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Heart, Tv, Truck, PawPrint, Instagram, Youtube, Twitter, Menu, Play, Radio, ShoppingBag, Gift, Newspaper, Mail, FileText, Globe, Linkedin, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Timeline } from "@/components/timeline";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Updated Social Stats based on Screenshots
const SOCIALS = [
  { name: "TikTok", count: "102.7K", sub: "Followers", icon: Heart, link: "https://tiktok.com/@francesandfam", color: "hover:text-[#ff0050]" },
  { name: "Instagram", count: "102K", sub: "Followers", icon: Instagram, link: "https://instagram.com/FrancesAndFamily", color: "hover:text-[#E1306C]" },
  { name: "YouTube", count: "6.2K", sub: "Subscribers", icon: Youtube, link: "http://youtube.com/@francesandfamily", color: "hover:text-[#FF0000]" },
  { name: "Twitter", count: "6.9K", sub: "Followers", icon: Twitter, link: "http://twitter.com/FrancesAndFam", color: "hover:text-[#1DA1F2]" },
  { name: "LinkedIn", count: "18K", sub: "Followers", icon: Linkedin, link: "https://www.linkedin.com/in/christhecatdude", color: "hover:text-[#0A66C2]" },
  { name: "Reddit", count: "9.5K", sub: "Followers", icon: Globe, link: "http://reddit.com/u/SingTheDamnSong", color: "hover:text-[#FF4500]" },
];

const SOCIAL_POSTS = [
  { image: catCamImage, caption: "Sleepy pile on the cat cam.", platform: "YouTube", icon: Youtube },
  { image: dondaCamImage, caption: "Donda Cam: Always watching.", platform: "YouTube", icon: Youtube },
  { image: litterRobotImage, caption: "Testing the latest tech so you don't have to.", platform: "Amazon Live", icon: Tv },
  { image: fenceArtImage, caption: "Preserving history. Where it all started.", platform: "Instagram", icon: Instagram },
  { image: familyCouchImage, caption: "The whole crew.", platform: "Instagram", icon: Instagram },
];

const FAMILY = [
  { name: "Frances", role: "The Matriarch", desc: "The brave soul who started it all.", color: "bg-amber-50" },
  { name: "Oliver", role: "The Original", desc: "The orange boy who welcomed them.", color: "bg-orange-50" },
  { name: "The Kittens", role: "The Legacy", desc: "6 bundles of joy that stayed.", color: "bg-stone-50" },
  { name: "Freya", role: "The Tripod", desc: "Three legs, infinite love.", color: "bg-rose-50" },
];

const ECOSYSTEM = [
  {
    title: "Cool Cat Stuff",
    role: "The Show",
    desc: "From a joke to #1 on Amazon Live. We review the best (and worst) for your furry friends.",
    link: "http://amazon.com/live/coolcatstuff",
    image: coolCatScreenshot,
    icon: Tv,
    stat: "#22 Amazon Pet Influencer"
  },
  {
    title: "The Good Meow",
    role: "The Voice",
    desc: "Satirical news for cats. Because humans are ridiculous.",
    link: "https://thegoodmeow.com",
    image: goodMeowScreenshot,
    icon: PawPrint,
    stat: "Daily Smiles"
  },
  {
    title: "Vet Van Fleet",
    role: "The Mission",
    desc: "Making free healthcare for cats available everywhere. Our nonprofit initiative.",
    link: "https://vetvanfleet.com",
    image: vetVanScreenshot,
    icon: Truck,
    stat: "Non-Profit Initiative"
  }
];

const BRANDS = [
  { title: "Frances & Family", desc: "The Story", url: "https://wikigenius.org/wiki/Frances_and_Family" },
  { title: "Cool Cat Stuff", desc: "The Products", url: "https://coolcatstuff.com" },
  { title: "The GOOD Meow", desc: "The Voice", url: "https://thegoodmeow.com" },
  { title: "Vet Van Fleet", desc: "The Mission", url: "https://vetvanfleet.com" },
];

const PRESS = [
  { outlet: "Amazon", title: "Top 30 Pet Influencers 2025" },
  { outlet: "Newsweek", title: "Featured 4x in 2024" },
  { outlet: "China Daily", title: "International Feature" },
  { outlet: "YouTube", title: "Creator Panel Member" },
];

export default function Home() {
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 300], [0, 100]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Load Twitter/X widget
    const twitterScript = document.createElement("script");
    twitterScript.src = "https://platform.twitter.com/widgets.js";
    twitterScript.async = true;
    twitterScript.charset = "utf-8";
    twitterScript.onload = () => {
      if ((window as any).twttr && (window as any).twttr.widgets) {
        (window as any).twttr.widgets.load();
      }
    };
    document.body.appendChild(twitterScript);
    
    // Also try loading if twttr already exists
    if ((window as any).twttr && (window as any).twttr.widgets) {
      (window as any).twttr.widgets.load();
    }
    
    const instaScript = document.createElement("script");
    instaScript.src = "https://www.instagram.com/embed.js";
    instaScript.async = true;
    document.body.appendChild(instaScript);
    
    instaScript.onload = () => {
      if ((window as any).instgrm) {
        (window as any).instgrm.Embeds.process();
      }
    };

    // Load GoFundMe widget
    const gfmScript = document.createElement("script");
    gfmScript.src = "https://www.gofundme.com/static/js/embed.js";
    gfmScript.defer = true;
    document.body.appendChild(gfmScript);
    
    return () => {
      if (document.body.contains(twitterScript)) {
        document.body.removeChild(twitterScript);
      }
      if (document.body.contains(instaScript)) {
        document.body.removeChild(instaScript);
      }
      if (document.body.contains(gfmScript)) {
        document.body.removeChild(gfmScript);
      }
    };
  }, []);

  return (
    <div className="min-h-screen font-sans selection:bg-primary/20 bg-[#FAF8F5]">
      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border py-4 shadow-sm" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className={`text-2xl font-serif font-bold tracking-tight transition-colors flex items-center gap-3 ${isScrolled ? "text-foreground" : "text-white"}`}>
            {isScrolled && <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />}
            {!isScrolled && <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center font-serif text-white">F</div>}
            Frances & Family
          </Link>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#story" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-muted-foreground" : "text-white/90"}`}>Story</a>
            <a href="#mission" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-muted-foreground" : "text-white/90"}`}>Mission</a>
            <Link href="/socials" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-muted-foreground" : "text-white/90"}`}>Socials</Link>
            <a href="https://coolcatstuff.shop" target="_blank" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-muted-foreground" : "text-white/90"}`}>Merch</a>
            <Link href="/media-kit" className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-muted-foreground" : "text-white/90"}`}>Media Kit</Link>
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className={`md:hidden ${isScrolled ? "text-foreground" : "text-white"}`}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col gap-6 mt-10">
                <a href="#story" className="text-2xl font-serif font-medium">Story</a>
                <a href="#mission" className="text-2xl font-serif font-medium">Mission</a>
                <Link href="/socials" className="text-2xl font-serif font-medium">Socials</Link>
                <a href="https://coolcatstuff.shop" target="_blank" className="text-2xl font-serif font-medium">Merch</a>
                <Link href="/media-kit" className="text-2xl font-serif font-medium">Media Kit</Link>
                <a href="https://thegoodmeow.com" target="_blank" className="text-2xl font-serif font-medium">The GOOD Meow</a>
                <a href="https://coolcatstuff.com" target="_blank" className="text-2xl font-serif font-medium">Cool Cat Stuff</a>
                <a href="mailto:Chris@CoolCatStuff.com" className="text-2xl font-serif font-medium">Contact</a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Top Promo Banner */}
      <div className="fixed top-[72px] left-0 right-0 z-40 bg-gradient-to-r from-pink-500 via-orange-500 to-red-500 text-white py-2 px-6">
        <div className="max-w-[320px] md:max-w-none mx-auto flex items-center justify-between md:justify-center gap-4 md:gap-8 text-sm font-medium">
          <a href="https://paypal.me/francesandfam" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:scale-105 transition-transform bg-white/20 px-3 py-1 rounded-full">
            <Heart className="w-4 h-4 fill-white animate-pulse" />
            <span>Donate</span>
          </a>
          <a href="https://www.amazon.com/hz/wishlist/ls/3G3WCAJQVNXE5?ref_=wl_share" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:scale-105 transition-transform bg-white/20 px-3 py-1 rounded-full">
            <Gift className="w-4 h-4" />
            <span>Wishlist</span>
          </a>
          <a href="https://fencehole.org" target="_blank" rel="noopener noreferrer" className="hidden md:flex flex-col items-center leading-tight hover:scale-105 transition-transform">
            <span className="text-xs font-bold">Fence</span>
            <span className="text-xs font-bold">Hole</span>
          </a>
          <a href="http://amazon.com/live/coolcatstuff" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:scale-105 transition-transform">
            <Radio className="w-4 h-4" />
            <span>LIVE</span>
          </a>
          <a href="https://thegoodmeow.com" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 hover:scale-105 transition-transform">
            <span>Meow</span>
          </a>
          <a href="https://vetvanfleet.com" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 hover:scale-105 transition-transform">
            <span>VetVan</span>
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden pt-10">
        <div className="absolute inset-0 z-0">
          <img 
            src={fenceHeroImage} 
            alt="Frances peeking through the fence" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-black/40" />
        </div>

        <motion.div 
          className="relative z-10 container px-6 text-center text-white"
          style={{ y: heroTextY, opacity: heroOpacity }}
        >
          <motion.a
            href="https://youtu.be/8muOOTD5tUQ?si=mdJgWFfvLmJ9aqHc"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 hover:bg-white/20 transition-colors cursor-pointer"
          >
            <Play className="w-3 h-3 fill-white" />
            <span className="text-xs font-bold tracking-widest uppercase">Watch the Documentary</span>
          </motion.a>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold leading-[0.9] tracking-tight mb-8 drop-shadow-2xl"
          >
            The Hole in <br/> the Fence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-lg md:text-2xl text-white max-w-2xl mx-auto leading-relaxed font-serif italic"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.5)" }}
          >
            "Sometimes being a little broken is how the love finds its way in."
          </motion.p>
        </motion.div>
        
        {/* Bottom Hero Links */}
        <div className="absolute bottom-8 left-0 right-0 z-20 px-4">
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-6">
            <a href="https://thegoodmeow.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-white text-xs font-bold shadow-lg hover:bg-amber-600 transition-colors">
              <PawPrint className="w-3 h-3" />
              The GOOD Meow
            </a>
            <a href="https://vetvanfleet.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500 text-white text-xs font-bold shadow-lg hover:bg-teal-600 transition-colors">
              <Truck className="w-3 h-3" />
              Vet Van Fleet
            </a>
            <a href="https://coolcatstuff.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500 text-white text-xs font-bold shadow-lg hover:bg-orange-600 transition-colors">
              <Star className="w-3 h-3" />
              Cool Cat Stuff
            </a>
          </div>
        </div>
      </header>

      {/* Vet Van Fleet - Featured */}
      <section className="bg-gray-900">
        <div className="relative">
          <img 
            src={vetVanHeroImage}
            alt="Vet Van Fleet - Free Vet Care for All Cats. Everywhere."
            className="w-full h-auto"
          />
          <div className="absolute bottom-4 right-4 w-12 h-12 bg-gray-900" />
        </div>
        <div className="flex justify-center gap-4 py-6 bg-gray-900">
          <a 
            href="https://www.gofundme.com/f/vetvanfleet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-xl"
          >
            <Heart className="w-5 h-5 fill-white" />
            Donate
          </a>
        </div>
      </section>

      {/* The Story - Intro */}
      <section id="story" className="py-24 md:py-32 container px-6 mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <Badge variant="outline" className="border-primary/50 text-primary uppercase tracking-widest">The Beginning</Badge>
            <h2 className="text-4xl md:text-6xl font-serif text-foreground leading-tight">
              I wasn't looking for a family. <span className="text-primary italic font-serif">They found me.</span>
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed font-light">
              <p>
                It started with a small hole in my fence in Philadelphia. A scared, pregnant feral cat named Frances found her way into my backyard, desperately seeking a safe place.
              </p>
              <p>
                When she finally came inside, she didn't just bring her kittens. She brought a new purpose. What was supposed to be a temporary foster situation turned into a forever family of eight cats and a tripod dog.
              </p>
              <div className="flex flex-wrap gap-2 pt-4">
                {PRESS.map((item) => (
                  <Badge key={item.outlet} variant="secondary" className="px-3 py-1 text-xs">
                    <span className="font-bold mr-1">{item.outlet}:</span> {item.title}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="flex gap-4 pt-4">
               <Button className="rounded-full px-8" asChild>
                 <a href="https://www.newsweek.com/pregnant-stray-turns-mans-garden-now-hes-dad-8-kittens-1988165" target="_blank">Read the Newsweek Feature</a>
               </Button>
            </div>
          </div>
          <div className="relative group">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-muted relative z-10 rotate-2 group-hover:rotate-0 transition-transform duration-700 shadow-2xl">
               <img 
                 src={familyCouchImage} 
                 alt="The Family" 
                 className="w-full h-full object-cover"
               />
            </div>
            <div className="absolute inset-0 border-2 border-foreground/5 rounded-2xl -rotate-2 scale-95 z-0" />
            
            {/* Decorative Tape */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-10 bg-yellow-100/80 rotate-1 shadow-sm backdrop-blur-sm z-20" />
          </div>
        </div>

        {/* Timeline Component */}
        <Timeline />
      </section>

      {/* Corporate Structure / Brands - "Intertwined" */}
      <section id="mission" className="py-24 bg-muted/30">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">The Fence Hole Universe</h2>
            <p className="text-muted-foreground">Everything under one roof (literally).</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {ECOSYSTEM.map((project, i) => (
              <a 
                key={project.title} 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group block relative rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all hover:shadow-2xl hover:-translate-y-2 duration-500"
              >
                <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                     <div className="p-3 bg-background/90 backdrop-blur rounded-xl text-foreground shadow-lg">
                        <project.icon className="h-6 w-6" />
                     </div>
                     <div className="text-right">
                       <span className="text-xs font-bold text-white/80 uppercase tracking-widest block mb-1">{project.role}</span>
                       <h3 className="text-xl font-serif font-bold text-white leading-none">{project.title}</h3>
                     </div>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-muted-foreground mb-6 line-clamp-3 leading-relaxed">{project.desc}</p>
                </div>
              </a>
            ))}
          </div>
          
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-white border border-border/50 text-center">
             <h3 className="text-xl font-bold font-serif mb-4">Fence Hole LLC</h3>
             <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
               {BRANDS.map((brand, i) => (
                 <a 
                   key={brand.title} 
                   href={brand.url}
                   target={brand.url.startsWith("http") ? "_blank" : undefined}
                   rel={brand.url.startsWith("http") ? "noopener noreferrer" : undefined}
                   className="flex items-center gap-2 hover:text-primary transition-colors"
                 >
                   {i > 0 && <span className="opacity-30">•</span>}
                   <span className="font-medium text-foreground hover:text-primary">{brand.title}</span>
                 </a>
               ))}
             </div>
          </div>
        </div>
      </section>

      {/* Latest Content Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Latest Updates</h2>
            <p className="text-muted-foreground">Stay connected with our latest content</p>
          </div>

          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {/* Latest Video */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-500" />
                Latest Video
              </h3>
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-1 rounded-2xl">
                <div className="bg-black rounded-xl overflow-hidden">
                  <iframe
                    src="https://www.youtube.com/embed/videoseries?list=UUcb-ulDPdgMJoX0ZlVh9Llw"
                    className="w-full aspect-video border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    title="Latest Video"
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <a 
                  href="https://youtube.com/@FrancesAndFamily"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-red-500 hover:text-red-600 font-medium"
                >
                  <Youtube className="w-4 h-4" />
                  Subscribe on YouTube
                </a>
              </div>
            </div>
            
            {/* Twitter/X Feed */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Twitter className="w-5 h-5" />
                Latest Posts
              </h3>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden" style={{ height: "350px" }}>
                <a
                  className="twitter-timeline"
                  data-height="350"
                  data-theme="light"
                  data-chrome="noheader nofooter noborders"
                  href="https://twitter.com/CoolCatStuff"
                >
                  Loading tweets...
                </a>
              </div>
              <div className="mt-4 text-center">
                <a 
                  href="https://twitter.com/CoolCatStuff"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm hover:text-gray-600 font-medium"
                >
                  <Twitter className="w-4 h-4" />
                  Follow on X
                </a>
              </div>
            </div>

            {/* Instagram Photos */}
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Instagram className="w-5 h-5 text-pink-500" />
                Photos
              </h3>
              <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 p-1 rounded-2xl">
                <div className="bg-white rounded-xl overflow-hidden" style={{ minHeight: "350px" }}>
                  <blockquote 
                    className="instagram-media" 
                    data-instgrm-permalink="https://www.instagram.com/francesandfamily/"
                    data-instgrm-version="14"
                    style={{ 
                      background: '#FFF',
                      border: 0,
                      margin: 0,
                      maxWidth: '100%',
                      padding: 0,
                      width: '100%'
                    }}
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <a 
                  href="https://instagram.com/FrancesAndFamily"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-pink-500 hover:text-pink-600 font-medium"
                >
                  <Instagram className="w-4 h-4" />
                  Follow on Instagram
                </a>
              </div>
            </div>
          </div>
          
          {/* The GOOD Meow Row */}
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-1 rounded-2xl">
              <div className="bg-white rounded-xl p-6 flex flex-col md:flex-row items-center gap-6">
                <Newspaper className="w-12 h-12 text-amber-500 flex-shrink-0" />
                <div className="text-center md:text-left flex-1">
                  <h4 className="font-bold text-lg mb-1">The GOOD Meow</h4>
                  <p className="text-sm text-muted-foreground">
                    Satirical cat news and heartwarming stories from Fence Hole LLC.
                  </p>
                </div>
                <a 
                  href="https://thegoodmeow.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full text-sm font-bold hover:opacity-90 transition-opacity flex-shrink-0"
                >
                  Read Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Hub & Linktree Style Connect */}
      <section id="connect" className="py-24 bg-white relative overflow-hidden">
        <div className="container px-6 mx-auto relative z-10">
          
          {/* Quick Links / Linktree Style */}
          <div className="max-w-md mx-auto mb-24">
             <div className="text-center mb-8">
               <div className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white shadow-xl overflow-hidden relative">
                  <img src={connectProfileImage} alt="Chris" className="w-full h-full object-cover" />
               </div>
               <h2 className="text-2xl font-bold font-serif">Connect with Us</h2>
               <p className="text-muted-foreground text-sm">@FrancesAndFamily</p>
             </div>
             
             <div className="space-y-3">
               <Button variant="outline" className="w-full h-14 justify-between px-6 text-base font-medium rounded-xl hover:border-primary hover:text-primary transition-all" asChild>
                  <Link href="/media-kit">
                    <span className="flex items-center gap-3"><FileText className="w-5 h-5" /> Media Kit</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </Link>
               </Button>
               <Button variant="outline" className="w-full h-14 justify-between px-6 text-base font-medium rounded-xl hover:border-primary hover:text-primary transition-all" asChild>
                  <a href="mailto:collabs@coolcatstuff.com" target="_blank">
                    <span className="flex items-center gap-3"><Mail className="w-5 h-5" /> Brand Partnerships</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </a>
               </Button>
               <Button variant="outline" className="w-full h-14 justify-between px-6 text-base font-medium rounded-xl hover:border-primary hover:text-primary transition-all" asChild>
                  <a href="mailto:Chris@igotcats.com" target="_blank">
                    <span className="flex items-center gap-3"><Users className="w-5 h-5" /> Contact Chris</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </a>
               </Button>
               <Button variant="outline" className="w-full h-14 justify-between px-6 text-base font-medium rounded-xl hover:border-primary hover:text-primary transition-all" asChild>
                  <a href="https://www.amazon.com/hz/wishlist/ls/3G3WCAJQVNXE5?ref_=wl_share" target="_blank">
                    <span className="flex items-center gap-3"><Gift className="w-5 h-5" /> Amazon Wishlist</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </a>
               </Button>
               <Button variant="outline" className="w-full h-14 justify-between px-6 text-base font-medium rounded-xl hover:border-primary hover:text-primary transition-all" asChild>
                  <a href="https://www.paypal.com/paypalme/francesandfam" target="_blank">
                    <span className="flex items-center gap-3"><Heart className="w-5 h-5" /> Donate to Mission</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </a>
               </Button>
             </div>
          </div>

          {/* Social Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {SOCIALS.map((social) => (
              <a 
                key={social.name} 
                href={social.link} 
                target="_blank"
                className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-secondary/30 hover:bg-white border border-transparent hover:border-border transition-all duration-300 hover:shadow-xl text-center group ${social.color}`}
              >
                <social.icon className="h-6 w-6 mb-3 transition-colors" />
                <div className="text-xl font-bold font-serif mb-1 group-hover:scale-110 transition-transform">{social.count}</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-widest">{social.sub}</div>
              </a>
            ))}
          </div>

          {/* Amazon Live Embed - Redesigned with Host Image */}
          <a 
            href="http://amazon.com/live/coolcatstuff"
            target="_blank"
            className="block relative rounded-3xl overflow-hidden bg-black text-white group cursor-pointer shadow-2xl hover:shadow-orange-500/20 transition-all duration-500 hover:-translate-y-1"
          >
            <div className="absolute inset-0 z-0">
               <img 
                 src={hostImage} 
                 alt="Chris Hosting Cool Cat Stuff Live" 
                 className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent" />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between p-8 md:p-16 gap-8">
              <div className="max-w-xl space-y-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-600 rounded-md text-xs font-bold uppercase tracking-widest animate-pulse shadow-lg shadow-red-600/20">
                  <Radio className="w-3 h-3" /> Live Daily
                </div>
                <div>
                  <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4">Cool Cat Stuff Live</h3>
                  <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                    Join Chris and the family for real reviews, unboxings, and chaos. We're the #1 Cat Product Review Show on Amazon Live.
                  </p>
                </div>
              </div>
              
              <div className="flex-shrink-0">
                <Button size="lg" className="rounded-full h-16 px-10 text-xl bg-white text-black hover:bg-white/90 border-0 shadow-xl group-hover:scale-105 transition-transform font-bold">
                   Watch Now <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </a>
          
        </div>
      </section>


      {/* Footer */}
      <footer id="contact" className="py-24 bg-foreground text-background">
        <div className="container px-6 mx-auto text-center">
          <div className="w-20 h-20 bg-white/10 rounded-full mx-auto mb-10 flex items-center justify-center border border-white/20">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-full opacity-80" />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-none">
            Let's change the <br className="hidden md:block" /> world for cats.
          </h2>
          <p className="text-xl text-white/60 max-w-2xl mx-auto mb-12 font-light">
            Vet Van Fleet is just the beginning. Join us on this journey.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
            <Button size="lg" className="rounded-full px-8 text-lg h-14 bg-white text-black hover:bg-white/90 w-full md:w-auto shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 border-0" asChild>
              <a href="mailto:collabs@coolcatstuff.com">Partner with Us</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-lg h-14 w-full md:w-auto border-white/20 text-white hover:bg-white/10 hover:text-white" asChild>
              <a href="https://vetvanfleet.com" target="_blank" rel="noopener noreferrer">Support Vet Van Fleet</a>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/40 gap-6 pt-12 border-t border-white/10">
            <div>© 2026 Fence Hole LLC. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">Press Kit</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Support Button - appears after scrolling */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: isScrolled ? 1 : 0, y: isScrolled ? 0 : 100 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-orange-500 to-red-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-200 animate-pulse"></div>
          <div className="relative bg-white rounded-full shadow-2xl p-1">
            <div className="flex items-center gap-1">
              <a
                href="https://paypal.me/francesandfam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-4 py-3 rounded-full hover:scale-105 transition-transform font-medium text-sm"
              >
                <Heart className="w-4 h-4 fill-white" />
                <span className="hidden sm:inline">Donate</span>
              </a>
              <a
                href="https://www.amazon.com/hz/wishlist/ls/3G3WCAJQVNXE5?ref_=wl_share"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-yellow-500 text-white px-4 py-3 rounded-full hover:scale-105 transition-transform font-medium text-sm"
              >
                <Gift className="w-4 h-4" />
                <span className="hidden sm:inline">Wishlist</span>
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
