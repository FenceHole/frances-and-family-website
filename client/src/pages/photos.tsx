import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Instagram, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Photos() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
    
    if ((window as any).instgrm) {
      (window as any).instgrm.Embeds.process();
    }
    
    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-serif font-bold">Photos</h1>
          <a 
            href="https://instagram.com/FrancesAndFamily" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Instagram className="w-4 h-4" />
            <span className="hidden sm:inline">@FrancesAndFamily</span>
          </a>
        </div>
      </nav>

      <main className="pt-24 pb-16 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Our Photo Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6 text-sm md:text-base">
            Follow along with our daily adventures!
          </p>
          <a 
            href="https://instagram.com/FrancesAndFamily"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="gap-2 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600">
              <Instagram className="w-4 h-4" />
              Follow @FrancesAndFamily
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>

        <div className="max-w-lg mx-auto">
          <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-orange-500 p-1 rounded-2xl">
            <div className="bg-white rounded-xl overflow-hidden">
              <blockquote 
                className="instagram-media" 
                data-instgrm-permalink="https://www.instagram.com/francesandfamily/"
                data-instgrm-version="14"
                style={{ 
                  background: '#FFF',
                  border: 0,
                  borderRadius: '3px',
                  boxShadow: 'none',
                  margin: '0',
                  maxWidth: '100%',
                  minWidth: '100%',
                  padding: 0,
                  width: '100%'
                }}
              />
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Instagram requires viewing photos directly on their platform. Click below to see our full gallery!
            </p>
            <a 
              href="https://instagram.com/FrancesAndFamily"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              <Instagram className="w-5 h-5" />
              Open Instagram Gallery
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
