import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  ArrowLeft, TrendingUp, Users, Eye, Award, ExternalLink, Mail, 
  Download, Tv, PawPrint, Truck, Heart, Instagram, Youtube, Twitter,
  Linkedin, Globe, Calendar, Star, CheckCircle, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import logo from "@assets/logo.png";
import connectProfileImage from "@assets/IMG_3334_1768604884041.jpeg";

interface SocialStat {
  id: string;
  platform: string;
  handle: string;
  followerCount: number | null;
  displayCount: string | null;
  profileUrl: string | null;
}

interface PressFeature {
  id: string;
  outlet: string;
  title: string;
  description: string | null;
  url: string | null;
  featured: boolean | null;
}

interface Brand {
  id: string;
  name: string;
  tagline: string;
  description: string;
  url: string;
  stats: string | null;
}

interface MediaKitData {
  socialStats: SocialStat[];
  pressFeatures: PressFeature[];
  brands: Brand[];
  totalReach: number;
  lastUpdated: string;
}

const platformIcons: Record<string, React.ElementType> = {
  TikTok: Heart,
  Instagram: Instagram,
  YouTube: Youtube,
  Twitter: Twitter,
  LinkedIn: Linkedin,
  Reddit: Globe,
};

const platformColors: Record<string, string> = {
  TikTok: "bg-gradient-to-br from-[#ff0050] to-[#00f2ea] text-white",
  Instagram: "bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white",
  YouTube: "bg-[#FF0000] text-white",
  Twitter: "bg-[#1DA1F2] text-white",
  LinkedIn: "bg-[#0A66C2] text-white",
  Reddit: "bg-[#FF4500] text-white",
};

const brandIcons: Record<string, React.ElementType> = {
  "Cool Cat Stuff": Tv,
  "The Good Meow": PawPrint,
  "Vet Van Fleet": Truck,
};

function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + "M";
  if (num >= 1000) return (num / 1000).toFixed(1) + "K";
  return num.toString();
}

export default function MediaKit() {
  const { data, isLoading } = useQuery<MediaKitData>({
    queryKey: ["/api/media-kit"],
  });

  const totalReach = data?.totalReach || 0;
  const socialStats = data?.socialStats || [];
  const pressFeatures = data?.pressFeatures || [];
  const brands = data?.brands || [];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border py-4 shadow-sm">
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-serif font-bold tracking-tight flex items-center gap-3">
            <img src={logo} alt="Logo" className="w-8 h-8 rounded-full" />
            Frances & Family
          </Link>
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back Home
            </Link>
          </Button>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-16 container px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="mb-6 border-primary/50 text-primary uppercase tracking-widest">
              <Award className="w-3 h-3 mr-2" />
              For Brands & Partners
            </Badge>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Media Kit & <br />
              <span className="text-primary">Partnership Info</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Real-time stats, press coverage, and everything you need to know about partnering with Frances & Family and the Fence Hole LLC universe.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full" asChild>
                <a href="mailto:collabs@coolcatstuff.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact for Collaborations
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full" asChild>
                <a href="mailto:Chris@igotcats.com">
                  Contact Chris
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <Card className="p-8 bg-foreground text-background text-center">
              <div className="w-24 h-24 rounded-full mx-auto mb-6 border-4 border-white/20 overflow-hidden">
                <img src={connectProfileImage} alt="Frances" className="w-full h-full object-cover" />
              </div>
              <h2 className="text-4xl font-serif font-bold mb-2">
                {formatNumber(totalReach)}+
              </h2>
              <p className="text-white/70 mb-6">Total Combined Reach</p>
              <div className="flex items-center justify-center gap-2 text-sm text-white/50">
                <Calendar className="w-4 h-4" />
                Updated: {data?.lastUpdated ? new Date(data.lastUpdated).toLocaleDateString() : "Live"}
              </div>
            </Card>
          </motion.div>
        </div>
      </header>

      {/* Live Social Stats */}
      <section className="py-16 bg-white">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-green-500/10 text-green-600 border-green-500/20">
              <Zap className="w-3 h-3 mr-1" />
              Live Stats
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Social Media Presence</h2>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-40 bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {socialStats.map((stat, index) => {
                const Icon = platformIcons[stat.platform] || Users;
                const colorClass = platformColors[stat.platform] || "bg-gray-500 text-white";
                
                return (
                  <motion.a
                    key={stat.id}
                    href={stat.profileUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-2xl ${colorClass} hover:scale-105 transition-transform duration-300 text-center group`}
                  >
                    <Icon className="w-8 h-8 mx-auto mb-3 opacity-90" />
                    <div className="text-2xl font-bold mb-1">{stat.displayCount || formatNumber(stat.followerCount || 0)}</div>
                    <div className="text-xs opacity-80 uppercase tracking-wider">{stat.platform}</div>
                    <div className="text-[10px] opacity-60 mt-1">{stat.handle}</div>
                  </motion.a>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Press Features */}
      <section className="py-16">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 uppercase tracking-widest">
              <Star className="w-3 h-3 mr-1" />
              Press Coverage
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Featured In</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="font-bold">
                        {feature.outlet}
                      </Badge>
                      {feature.featured && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                    <CardTitle className="text-lg font-serif">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {feature.description && (
                      <p className="text-sm text-muted-foreground mb-4">{feature.description}</p>
                    )}
                    {feature.url && (
                      <Button variant="outline" size="sm" asChild>
                        <a href={feature.url} target="_blank" rel="noopener noreferrer">
                          Read Article
                          <ExternalLink className="w-3 h-3 ml-2" />
                        </a>
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Ecosystem */}
      <section className="py-16 bg-muted/30">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 uppercase tracking-widest">
              The Universe
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Fence Hole LLC Brands</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Partner with one brand or the entire ecosystem. Each brand serves a unique purpose in our mission.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {brands.map((brand, index) => {
              const Icon = brandIcons[brand.name] || Tv;
              
              return (
                <motion.div
                  key={brand.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Card className="h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    <CardHeader>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-serif">{brand.name}</CardTitle>
                          <Badge variant="outline" className="text-xs">{brand.tagline}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{brand.description}</p>
                      {brand.stats && (
                        <Badge className="bg-primary/10 text-primary border-0">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          {brand.stats}
                        </Badge>
                      )}
                      <Button className="w-full rounded-full" asChild>
                        <a href={brand.url} target="_blank" rel="noopener noreferrer">
                          Visit {brand.name}
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section className="py-16 bg-white">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 uppercase tracking-widest">
              Trusted By
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Brands We've Partnered With</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              We're proud to have worked with some of the best brands in the pet industry.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              "Litter-Robot", "Dr. Elsey's", "BasePaws", "Petkit", "Petlibro", 
              "Pretty Litter", "Meowfia", "Temu", "Amazon", "Levoit", 
              "Bedsure", "SmartyKat"
            ].map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="px-6 py-3 bg-muted rounded-full text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="py-24 bg-foreground text-background">
        <div className="container px-6 mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Ready to Partner?
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
              We work with brands that share our values: authenticity, animal welfare, and community. Let's create something amazing together.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90 px-8" asChild>
                <a href="mailto:collabs@coolcatstuff.com">
                  <Mail className="w-5 h-5 mr-2" />
                  Collaborations
                </a>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-white/30 text-white hover:bg-white/10 px-8" asChild>
                <a href="mailto:Chris@igotcats.com">
                  Contact Chris
                </a>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
              <a href="https://www.amazon.com/hz/wishlist/ls/3G3WCAJQVNXE5" target="_blank" className="hover:text-white transition-colors">
                Amazon Wishlist
              </a>
              <span>•</span>
              <a href="https://paypal.me/francesandfam" target="_blank" className="hover:text-white transition-colors">
                Support via PayPal
              </a>
              <span>•</span>
              <a href="https://wikigenius.org/wiki/Frances_and_Family" target="_blank" className="hover:text-white transition-colors">
                Wiki Page
              </a>
              <span>•</span>
              <a href="https://linktr.ee/FrancesAndFamily" target="_blank" className="hover:text-white transition-colors">
                Linktree
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
