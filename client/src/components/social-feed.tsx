import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Twitter, Instagram, Youtube, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    twttr?: {
      widgets: {
        load: (element?: HTMLElement) => void;
        createTimeline: (
          source: { sourceType: string; screenName: string },
          target: HTMLElement,
          options?: Record<string, unknown>
        ) => Promise<HTMLElement>;
      };
      ready: (callback: () => void) => void;
    };
  }
}

export function SocialFeed() {
  const twitterRef = useRef<HTMLDivElement>(null);
  const [twitterLoaded, setTwitterLoaded] = useState(false);
  const [twitterFailed, setTwitterFailed] = useState(false);

  useEffect(() => {
    const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    script.async = true;
    script.charset = "utf-8";
    document.head.appendChild(script);

    const timeout = setTimeout(() => {
      if (!twitterLoaded) {
        setTwitterFailed(true);
      }
    }, 8000);

    script.onload = () => {
      if (window.twttr && window.twttr.ready) {
        window.twttr.ready(() => {
          if (twitterRef.current) {
            twitterRef.current.innerHTML = '';
            window.twttr!.widgets
              .createTimeline(
                { sourceType: "profile", screenName: "CoolCatStuff" },
                twitterRef.current!,
                {
                  height: 400,
                  chrome: "noheader nofooter noborders transparent",
                  theme: "light",
                  dnt: true,
                }
              )
              .then(() => {
                setTwitterLoaded(true);
                clearTimeout(timeout);
              })
              .catch(() => {
                setTwitterFailed(true);
                clearTimeout(timeout);
              });
          }
        });
      } else if (window.twttr && twitterRef.current) {
        window.twttr.widgets.load(twitterRef.current);
        setTimeout(() => {
          const iframe = twitterRef.current?.querySelector("iframe");
          if (iframe) {
            setTwitterLoaded(true);
          } else {
            setTwitterFailed(true);
          }
        }, 5000);
      }
    };

    script.onerror = () => {
      setTwitterFailed(true);
      clearTimeout(timeout);
    };

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-6 mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 uppercase tracking-widest">
            Live Feed
          </Badge>
          <h2 className="text-3xl md:text-4xl font-serif font-bold">Latest Updates</h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Stay connected with our latest adventures, reviews, and cat content across social media.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Twitter/X Feed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <Twitter className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold">X / Twitter</h3>
                <p className="text-sm text-muted-foreground">@CoolCatStuff</p>
              </div>
            </div>
            <div ref={twitterRef} className="min-h-[400px]">
              {!twitterLoaded && !twitterFailed && (
                <div className="flex flex-col items-center justify-center h-[400px] text-center">
                  <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mb-4" />
                  <p className="text-sm text-muted-foreground">Loading tweets...</p>
                </div>
              )}
              {twitterFailed && (
                <div className="flex flex-col items-center justify-center h-[400px] text-center p-6 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl">
                  <Twitter className="w-12 h-12 text-gray-800 mb-4" />
                  <h4 className="font-bold text-lg mb-2">Cool Cat Stuff</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Cat product reviews, live unboxings, and daily chaos with the family.
                  </p>
                  <div className="text-3xl font-bold font-serif text-gray-800 mb-1">6.9K+</div>
                  <div className="text-xs text-muted-foreground mb-4">Followers</div>
                  <p className="text-xs text-muted-foreground italic">
                    Follow us on X for the latest updates!
                  </p>
                </div>
              )}
            </div>
            <Button variant="outline" className="w-full mt-4 rounded-full" asChild>
              <a href="https://twitter.com/CoolCatStuff" target="_blank" rel="noopener noreferrer">
                Follow on X
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>

          {/* YouTube Channel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#FF0000] flex items-center justify-center">
                <Youtube className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold">YouTube</h3>
                <p className="text-sm text-muted-foreground">@francesandfamily</p>
              </div>
            </div>
            <div className="min-h-[350px] flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-red-50 to-orange-50 rounded-xl">
              <Youtube className="w-12 h-12 text-red-500 mb-4" />
              <h4 className="font-bold text-lg mb-2">Watch Our Videos</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Cat content, product reviews, and live streams with the whole family.
              </p>
              <div className="text-3xl font-bold font-serif text-red-500 mb-1">6.2K+</div>
              <div className="text-xs text-muted-foreground mb-4">Subscribers</div>
              <p className="text-xs text-muted-foreground italic">
                Subscribe to get notified of new videos!
              </p>
            </div>
            <Button className="w-full mt-4 rounded-full bg-[#FF0000] hover:bg-[#CC0000]" asChild>
              <a href="https://youtube.com/@francesandfamily" target="_blank" rel="noopener noreferrer">
                <Play className="w-4 h-4 mr-2" />
                Subscribe on YouTube
              </a>
            </Button>
          </motion.div>

          {/* Instagram */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#833ab4] via-[#fd1d1d] to-[#fcb045] flex items-center justify-center">
                <Instagram className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold">Instagram</h3>
                <p className="text-sm text-muted-foreground">@FrancesAndFamily</p>
              </div>
            </div>
            <div className="min-h-[350px] flex flex-col items-center justify-center text-center p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 rounded-xl">
              <Instagram className="w-12 h-12 text-pink-400 mb-4" />
              <h4 className="font-bold text-lg mb-2">Daily Cat Content</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Behind-the-scenes moments and cute photos from the whole family.
              </p>
              <div className="text-3xl font-bold font-serif text-pink-500 mb-1">102K+</div>
              <div className="text-xs text-muted-foreground mb-4">Followers</div>
              <p className="text-xs text-muted-foreground italic">
                Instagram doesn't allow embedded feeds, but you can follow us for updates!
              </p>
            </div>
            <Button className="w-full mt-4 rounded-full bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-90" asChild>
              <a href="https://instagram.com/FrancesAndFamily" target="_blank" rel="noopener noreferrer">
                Follow on Instagram
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
