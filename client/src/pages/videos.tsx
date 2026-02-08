import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Youtube, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const CHANNEL_ID = "UCcb-ulDPdgMJoX0ZlVh9Llw";
const UPLOADS_PLAYLIST = "UU" + CHANNEL_ID.substring(2);

export default function Videos() {
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
          <h1 className="text-xl font-serif font-bold">Videos</h1>
          <a 
            href="https://youtube.com/@FrancesAndFamily" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Youtube className="w-4 h-4" />
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
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4">Our Videos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6 text-sm md:text-base">
            Watch our latest cat content, family moments, and behind-the-scenes adventures!
          </p>
          <a 
            href="https://youtube.com/@FrancesAndFamily"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="gap-2 bg-red-500 hover:bg-red-600">
              <Youtube className="w-4 h-4" />
              Subscribe @FrancesAndFamily
              <ExternalLink className="w-4 h-4" />
            </Button>
          </a>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-red-500 to-red-600 p-1 rounded-2xl"
          >
            <div className="bg-black rounded-xl overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST}`}
                className="w-full aspect-video border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title="Latest Video"
              />
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-red-500 to-red-600 p-0.5 rounded-xl"
            >
              <div className="bg-black rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST}&index=2`}
                  className="w-full aspect-video border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title="Video 2"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-red-500 to-red-600 p-0.5 rounded-xl"
            >
              <div className="bg-black rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST}&index=3`}
                  className="w-full aspect-video border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title="Video 3"
                />
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-red-500 to-red-600 p-0.5 rounded-xl"
            >
              <div className="bg-black rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST}&index=4`}
                  className="w-full aspect-video border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  title="Video 4"
                />
              </div>
            </motion.div>
          </div>

          <div className="text-center pt-4">
            <a 
              href="https://youtube.com/@FrancesAndFamily"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="gap-2">
                <Youtube className="w-4 h-4" />
                View All Videos on YouTube
              </Button>
            </a>
            <p className="mt-4 text-sm text-muted-foreground">
              New videos regularly! Subscribe to never miss an upload.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
