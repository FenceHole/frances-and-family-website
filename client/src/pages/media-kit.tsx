import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowLeft, TrendingUp, Users, Eye, Award, ExternalLink, Mail,
  Download, Tv, PawPrint, Truck, Heart, Instagram, Youtube, Twitter,
  Linkedin, Globe, Calendar, Star, CheckCircle, Zap, Newspaper, PlayCircle, Radio
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
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

interface NewsLink {
  outlet: string;
  title: string;
  url: string;
}

const newsAndPrintMedia: NewsLink[] = [
  { outlet: "Newsweek", title: "Pregnant Stray Turns Up in Man's Garden, Now He's Dad to 8 Kittens", url: "https://www.newsweek.com/pregnant-stray-turns-mans-garden-now-hes-dad-8-kittens-1988165" },
  { outlet: "Newsweek", title: "Cat Takes in Pregnant Stray, Keeps Kittens", url: "https://www.newsweek.com/cat-takes-pregnant-stray-keeps-kittens-1845925" },
  { outlet: "Newsweek", title: "Man's Cats' Unusual Sleeping Plan", url: "https://www.newsweek.com/man-cats-unusual-sleeping-plan-2025660" },
  { outlet: "Newsweek", title: "Internet-Obsessed Three-Legged Pup Saved From Euthanasia, Living Her Best Life", url: "https://www.newsweek.com/internet-obsessed-three-legged-pup-saved-euthanasia-best-life-2032596" },
  { outlet: "China Daily (Global)", title: "Pet Lovers From Across the World Connect via RedNote", url: "https://global.chinadaily.com.cn/a/202508/19/WS68a3bcb3a310b236346f244b.html" },
  { outlet: "China Daily HK", title: "Pet Lovers From Across the World Connect via RedNote", url: "https://www.chinadailyhk.com/hk/article/618147" },
  { outlet: "L'Officiel Lifestyle", title: "Man Discovers Cat's Unusual New Sleeping Spot — He Has a Plan", url: "https://lofficielifestyle.com/man-discovers-cats-unusual-new-sleeping-spot-he-has-a-plan/page/3/" },
  { outlet: "TAG24 (English)", title: "Stray Cat Rescue Changes One Man's Life Completely", url: "https://www.tag24.com/en/topic/animals/cats/stray-cat-rescue-changes-one-mans-life-completely-3073530" },
  { outlet: "TAG24 (Deutsch)", title: "Mann nimmt streunende Katze bei sich auf — zwei Tage später ist sein Haus voller Katzen", url: "https://www.tag24.de/thema/tiere/katzen/mann-nimmt-streunende-katze-bei-sich-auf-zwei-tage-spaeter-ist-sein-haus-voller-katzen-3073530" },
  { outlet: "RAC1 (Catalunya)", title: "La historia de una gata que emociona las redes sociales", url: "https://www.rac1.cat/animals/20241115/210870/historia-gata-emociona-xarxes-socials-plorar-lv.amp.html" },
  { outlet: "La Vanguardia", title: "La historia de una gata que ha emocionado las redes sociales", url: "https://www.lavanguardia.com/mascotas/20241112/10099319/historia-gata-emocionado-redes-sociales-me-hagas-llorar-pmv.amp.html" },
  { outlet: "UAI (Brasil)", title: "Gata de rua entra por buraco na cerca e transforma casa em família com 8 felinos", url: "https://www.uai.com.br/noticia/2026/05/27/gata-de-rua-entra-por-buraco-na-cerca-e-transforma-casa-em-familia-com-8-felinos/" },
  { outlet: "La Stampa", title: "Il cane tripode, felice", url: "https://www.lastampa.it/la-zampa/2025/02/22/video/cane_tripode_felice-424020675/" },
  { outlet: "Amo Meu Pet", title: "Homem emoldura cerca onde encontrou gatinha grávida que mudou sua vida para sempre", url: "https://www.amomeupet.org/noticias/16187/homem-emoldura-cerca-onde-encontrou-gatinha-gravida-que-mudou-sua-vida-para-sempre-hoje-eu-tenho-8-gatos-.amp" },
  { outlet: "Femina (Hungary)", title: "Vemhes macska — segítés", url: "https://femina.hu/terasz/vemhes-macska-segites/" },
  { outlet: "UAI (Brasil)", title: "Ela só queria comida, mas acabou mudando completamente a vida dentro daquela casa", url: "https://www.uai.com.br/noticia/2026/03/31/ela-so-queria-comida-mas-acabou-mudando-completamente-a-vida-dentro-daquela-casa/" },
  { outlet: "Punta Canfali", title: "La historia de una gata que ha emocionado las redes sociales", url: "https://puntacanfali.co/2024/11/18/la-historia-de-una-gata-que-ha-emocionado-las-redes-sociales-no-me-hagas-llorar/" },
  { outlet: "Cheezburger", title: "Pregnant Cat Crawls Into Hooman's Backyard Through a Hole in the Fence", url: "https://cheezburger.com/30233607/pregnant-cat-crawls-into-hoomans-backyard-through-a-hole-in-the-fence-she-changes-hoomans-life-in" },
  { outlet: "Distractify", title: "Man Raises Cat and All Her Kittens", url: "https://www.distractify.com/p/man-raises-cat-and-all-her-kittens" },
  { outlet: "We Love Cats and Kittens", title: "Frances", url: "https://welovecatsandkittens.com/frances/" },
  { outlet: "WikiGenius", title: "Frances and Family — Wiki Page", url: "https://wikigenius.org/wiki/Frances_and_Family" },
];

const videoMediaFeatures: NewsLink[] = [
  { outlet: "YouTube", title: "Feature Video", url: "https://youtu.be/WmGYZ6_RoVk" },
  { outlet: "YouTube Shorts", title: "Short Feature", url: "https://youtube.com/shorts/8muOOTD5tUQ" },
  { outlet: "YouTube Shorts", title: "Short Feature", url: "https://youtube.com/shorts/STCODCVakaU" },
  { outlet: "YouTube Shorts", title: "Short Feature", url: "https://youtube.com/shorts/kub6rph37e0" },
  { outlet: "YouTube Shorts", title: "Short Feature", url: "https://youtube.com/shorts/dUQgfrhEfbU" },
  { outlet: "YouTube Shorts", title: "Short Feature", url: "https://youtube.com/shorts/r-UcprojGRs" },
  { outlet: "YouTube", title: "Feature Video", url: "https://youtu.be/nhy2kqnav2A" },
  { outlet: "YouTube", title: "Feature Video", url: "https://youtu.be/OJGXa1z97Ek" },
  { outlet: "YouTube", title: "Feature Video", url: "https://youtu.be/7zoqA1TBCTc" },
  { outlet: "Facebook", title: "Video Share", url: "https://www.facebook.com/share/v/1GoxeTssZ1/" },
  { outlet: "Facebook", title: "Video Share", url: "https://www.facebook.com/share/v/1EwFve83Gb/" },
];

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

      {/* Viral Highlights */}
      <section className="py-16">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-red-500/10 text-red-600 border-red-500/20 uppercase tracking-widest">
              <TrendingUp className="w-3 h-3 mr-1" />
              Viral Content
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Content That Broke the Internet</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Organic reach that brands dream about. No paid promotion — just authentic storytelling.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <motion.a
              href="https://www.instagram.com/p/DCHz_m7PKZZ/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group"
              data-testid="link-viral-instagram"
            >
              <Card className="h-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 border-purple-200/50 hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <Instagram className="w-10 h-10 mx-auto mb-4 text-purple-500" />
                  <div className="text-5xl font-serif font-bold text-purple-600 mb-2">44M+</div>
                  <div className="text-lg font-medium mb-1">Views on Instagram</div>
                  <p className="text-sm text-muted-foreground">Single organic post reaching 44 million views</p>
                  <div className="mt-4 text-xs text-purple-500 group-hover:underline flex items-center justify-center gap-1">
                    Watch Video <ExternalLink className="w-3 h-3" />
                  </div>
                </CardContent>
              </Card>
            </motion.a>

            <motion.a
              href="https://www.tiktok.com/t/ZP89v7GPC/"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group"
              data-testid="link-viral-tiktok"
            >
              <Card className="h-full bg-gradient-to-br from-[#ff0050]/5 to-[#00f2ea]/5 border-pink-200/50 hover:shadow-xl transition-all hover:-translate-y-1">
                <CardContent className="p-8 text-center">
                  <Heart className="w-10 h-10 mx-auto mb-4 text-pink-500" />
                  <div className="text-5xl font-serif font-bold text-pink-600 mb-2">11.7M+</div>
                  <div className="text-lg font-medium mb-1">Views on TikTok</div>
                  <p className="text-sm text-muted-foreground">Single organic post reaching 11.7 million views</p>
                  <div className="mt-4 text-xs text-pink-500 group-hover:underline flex items-center justify-center gap-1">
                    Watch Video <ExternalLink className="w-3 h-3" />
                  </div>
                </CardContent>
              </Card>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Press Features */}
      <section className="py-16 bg-white">
        <div className="container px-6 mx-auto">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 uppercase tracking-widest">
              <Star className="w-3 h-3 mr-1" />
              Press Coverage
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">Featured In</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Featured in Newsweek 4 times in a single year, plus coverage across major media outlets worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pressFeatures.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                data-testid={`card-press-${index}`}
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
                          {feature.url.includes("youtube") || feature.url.includes("youtu.be") ? "Watch Video" :
                           feature.url.includes("instagram") ? "View Post" : "Read Article"}
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

      {/* News & Print Media */}
      <section className="py-16">
        <div className="container px-6 mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 uppercase tracking-widest">
              <Newspaper className="w-3 h-3 mr-1" />
              News & Print Media
            </Badge>
            <h2 className="text-3xl md:text-4xl font-serif font-bold">As Seen Around the World</h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              International news, print, and video coverage — from Newsweek to outlets across Europe, Asia, and South America.
            </p>
          </div>

          <Card>
            <CardContent className="p-2 sm:p-4">
              <Accordion type="single" collapsible defaultValue="">
                <AccordionItem value="news">
                  <AccordionTrigger className="px-4">
                    <span className="flex items-center gap-2">
                      <Newspaper className="w-4 h-4 text-primary" />
                      News & Print Coverage ({newsAndPrintMedia.length})
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <ul className="divide-y divide-border">
                      {newsAndPrintMedia.map((item, index) => (
                        <li key={index}>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-4 py-2.5 group"
                            data-testid={`link-news-${index}`}
                          >
                            <span className="flex items-baseline gap-3 min-w-0">
                              <span className="text-xs font-bold uppercase tracking-wide text-primary shrink-0">
                                {item.outlet}
                              </span>
                              <span className="text-sm text-muted-foreground truncate group-hover:text-foreground transition-colors">
                                {item.title}
                              </span>
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="video">
                  <AccordionTrigger className="px-4">
                    <span className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-primary" />
                      Video Media Features ({videoMediaFeatures.length})
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <ul className="divide-y divide-border">
                      {videoMediaFeatures.map((item, index) => (
                        <li key={index}>
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between gap-4 py-2.5 group"
                            data-testid={`link-video-${index}`}
                          >
                            <span className="flex items-baseline gap-3 min-w-0">
                              <span className="text-xs font-bold uppercase tracking-wide text-primary shrink-0">
                                {item.outlet}
                              </span>
                              <span className="text-sm text-muted-foreground truncate group-hover:text-foreground transition-colors">
                                {item.title}
                              </span>
                            </span>
                            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="livestreams" className="border-b-0">
                  <AccordionTrigger className="px-4">
                    <span className="flex items-center gap-2">
                      <Radio className="w-4 h-4 text-primary" />
                      Reddit Livestreams (Chronological)
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <a
                      href="https://youtube.com/playlist?list=PLJvNm1VHUp-wVkPnI7nlHsTN5edGQU5VV"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-4 py-2.5 group"
                      data-testid="link-livestream-playlist"
                    >
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        Full playlist, in chronological order, on YouTube
                      </span>
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0 group-hover:text-primary transition-colors" />
                    </a>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
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
