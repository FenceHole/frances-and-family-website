import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Heart, Sparkles, Calendar, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import logo from "@assets/logo.png";

// Import family member images
import francesImage from "@assets/IMG_0888.jpeg";
import oliverImage from "@assets/IMG_0889.jpeg";
import kittensImage from "@assets/IMG_0890.jpeg";
import freyaImage from "@assets/IMG_0891.jpeg";

interface FamilyMember {
  id: string;
  name: string;
  role: string;
  description: string;
  bio: string | null;
  imageUrl: string | null;
  color: string | null;
  personality: string | null;
  funFacts: string[] | null;
  sortOrder: number | null;
}

// Map names to images (since we have the actual photos)
const imageMap: Record<string, string> = {
  "Frances": francesImage,
  "Oliver": oliverImage,
  "Freya": freyaImage,
};

const colorMap: Record<string, string> = {
  "bg-amber-50": "from-amber-50 to-amber-100 border-amber-200",
  "bg-orange-50": "from-orange-50 to-orange-100 border-orange-200",
  "bg-rose-50": "from-rose-50 to-rose-100 border-rose-200",
  "bg-red-50": "from-red-50 to-red-100 border-red-200",
  "bg-green-50": "from-green-50 to-green-100 border-green-200",
  "bg-amber-100": "from-amber-100 to-amber-200 border-amber-300",
  "bg-stone-100": "from-stone-100 to-stone-200 border-stone-300",
  "bg-purple-50": "from-purple-50 to-purple-100 border-purple-200",
  "bg-stone-50": "from-stone-50 to-stone-100 border-stone-200",
};

export default function Family() {
  const { data: members = [], isLoading } = useQuery<FamilyMember[]>({
    queryKey: ["/api/family"],
  });

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
      <header className="pt-32 pb-16 text-center container px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="outline" className="mb-6 border-primary/50 text-primary uppercase tracking-widest">
            <Heart className="w-3 h-3 mr-2 fill-primary" />
            The Family
          </Badge>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            Meet the Fam
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From a hole in the fence came an entire universe of love. Get to know each member of our growing family.
          </p>
        </motion.div>
      </header>

      {/* Family Grid */}
      <section className="container px-6 mx-auto pb-24">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[4/5] bg-muted animate-pulse rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {members.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card className={`group overflow-hidden border-2 bg-gradient-to-br ${colorMap[member.color || "bg-stone-50"] || "from-stone-50 to-stone-100 border-stone-200"} hover:shadow-2xl transition-all duration-500`}>
                  {/* Image Section */}
                  <div className="aspect-square overflow-hidden relative bg-muted">
                    <img
                      src={imageMap[member.name] || kittensImage}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-white/90 text-foreground backdrop-blur-sm shadow-md">
                        {member.role}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-4">
                    <div>
                      <h2 className="text-2xl font-serif font-bold mb-2">{member.name}</h2>
                      <p className="text-muted-foreground">{member.description}</p>
                    </div>

                    {member.bio && (
                      <p className="text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/30 pl-4 italic">
                        {member.bio}
                      </p>
                    )}

                    {member.personality && (
                      <div className="flex items-start gap-2 text-sm">
                        <Sparkles className="w-4 h-4 text-primary mt-0.5" />
                        <span className="text-muted-foreground">
                          <strong>Personality:</strong> {member.personality}
                        </span>
                      </div>
                    )}

                    {member.funFacts && member.funFacts.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium flex items-center gap-2">
                          <Quote className="w-4 h-4 text-primary" />
                          Fun Facts
                        </p>
                        <ul className="text-sm text-muted-foreground space-y-1">
                          {member.funFacts.map((fact, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-primary">•</span>
                              {fact}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Wiki Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <Card className="max-w-xl mx-auto p-8 bg-foreground text-background">
            <h3 className="text-2xl font-serif font-bold mb-4">Want to know even more?</h3>
            <p className="text-white/70 mb-6">
              Explore the complete Frances & Family story on our official wiki page.
            </p>
            <Button size="lg" className="rounded-full bg-white text-black hover:bg-white/90" asChild>
              <a href="https://wikigenius.org/wiki/Frances_and_Family" target="_blank" rel="noopener noreferrer">
                Visit Our Wiki
              </a>
            </Button>
          </Card>
        </motion.div>
      </section>
    </div>
  );
}
