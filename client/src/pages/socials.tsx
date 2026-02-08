import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Instagram, Youtube, Linkedin, Facebook, ShoppingCart, Tv } from "lucide-react";
import { Button } from "@/components/ui/button";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const XIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SnapchatIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.496.075.045.154.08.237.105a.76.76 0 0 0 .27.046c.163 0 .36-.053.535-.154l.005-.002a1.28 1.28 0 0 1 .535-.123c.36 0 .756.186.996.428.204.201.31.449.306.713-.007.385-.275.725-.803.957a3.27 3.27 0 0 1-.639.196c-.3.07-.622.12-.939.158-.134.015-.262.03-.381.046a.88.88 0 0 0-.409.156c-.092.07-.166.174-.218.31-.074.19-.096.39-.115.572a1.83 1.83 0 0 0-.003.054c-.018.185-.034.376-.108.553-.038.092-.1.179-.19.254-.136.113-.303.179-.48.217a6.5 6.5 0 0 1-1.136.109c-.263 0-.564-.02-.913-.088a4.3 4.3 0 0 0-.857-.072c-.193 0-.387.014-.572.045a4.87 4.87 0 0 0-.803.206c-.49.172-.97.408-1.522.659-.6.274-1.219.554-1.935.736a5.78 5.78 0 0 1-1.236.14c-.037 0-.073 0-.108-.002h-.02c-.04.002-.078.002-.118.002a5.78 5.78 0 0 1-1.237-.14c-.716-.182-1.334-.462-1.935-.736-.552-.251-1.032-.487-1.521-.659a4.87 4.87 0 0 0-.803-.206 3.7 3.7 0 0 0-.573-.045c-.298 0-.581.027-.858.072-.348.068-.649.088-.911.088-.413 0-.763-.036-1.137-.109a.9.9 0 0 1-.48-.217c-.09-.075-.152-.162-.19-.254-.073-.177-.09-.368-.107-.553v-.001l-.003-.053c-.019-.183-.041-.383-.115-.572a.7.7 0 0 0-.218-.31.88.88 0 0 0-.409-.157l-.381-.046c-.317-.038-.639-.088-.94-.157a3.25 3.25 0 0 1-.637-.197c-.523-.23-.788-.562-.803-.946-.003-.271.102-.517.306-.72.24-.24.637-.426.997-.426.168 0 .36.045.535.123l.005.002c.175.101.371.154.535.154.091 0 .18-.015.27-.046a.78.78 0 0 0 .236-.105 5.3 5.3 0 0 1-.03-.496l-.002-.06c-.105-1.628-.231-3.654.298-4.847C7.661 1.069 11.018.793 12.008.793z"/>
  </svg>
);

const ThreadsIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.068V12c.015-3.59.844-6.479 2.464-8.586C5.798 1.174 8.653-.024 12.262 0h.044c2.684.018 5.05.758 7.039 2.202 1.992 1.448 3.297 3.453 3.882 5.962l-1.883.447c-.478-2.07-1.556-3.711-3.203-4.879C16.468 2.58 14.481 1.932 12.29 1.916h-.036c-3.092-.02-5.461.937-7.043 2.843-1.397 1.684-2.132 4.135-2.148 7.28v.054c.02 3.15.755 5.602 2.184 7.286 1.594 1.878 3.974 2.822 7.074 2.802h.003c2.662 0 4.765-.61 6.252-1.815 1.452-1.176 2.188-2.776 2.188-4.758 0-1.562-.51-2.816-1.513-3.728-.897-.815-2.108-1.336-3.6-1.547-.131 1.32-.515 2.385-1.147 3.182-.779.984-1.918 1.508-3.39 1.558-1.072.037-2.037-.277-2.797-.91-.77-.64-1.193-1.515-1.193-2.465 0-1.034.458-1.902 1.326-2.513.764-.538 1.775-.82 2.92-.816.788.003 1.548.108 2.267.312l-.005-.142c-.064-1.633-.472-2.818-1.212-3.52-.665-.63-1.645-.951-2.913-.951h-.021c-1.12.003-2.02.313-2.67.923-.658.619-.993 1.502-.996 2.623h-1.921c.006-1.662.553-2.98 1.626-3.916.988-.863 2.31-1.308 3.932-1.324h.027c1.746 0 3.144.483 4.154 1.437 1.075 1.015 1.624 2.525 1.631 4.488l.001.136c2.104.512 3.737 1.423 4.86 2.712 1.219 1.397 1.838 3.166 1.838 5.26 0 2.498-.947 4.542-2.815 6.078C17.71 23.23 15.203 24 12.186 24zm-.208-10.474c-.84 0-1.527.17-2.043.506-.45.294-.672.676-.678 1.167.003.475.203.867.594 1.165.438.332.998.501 1.666.501l.119-.002c.967-.034 1.701-.37 2.183-1 .429-.56.678-1.368.74-2.407a9.022 9.022 0 0 0-2.581-.93z"/>
  </svg>
);

const RedditIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
  </svg>
);

const RedNoteIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15H9V9h2v8zm4 0h-2V9h2v8z"/>
  </svg>
);

const AmazonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
    <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.23 0-.043.022-.09.045-.112zm6.087-6.967c0-1.027.253-1.905.753-2.64.5-.735 1.166-1.295 2.002-1.68.72-.328 1.542-.56 2.468-.692.323-.043.83-.086 1.518-.13v-.532c0-.676-.043-1.12-.137-1.336-.18-.417-.54-.626-1.085-.626l-.18.005c-.36.043-.66.164-.905.36-.243.197-.4.478-.463.846-.05.282-.15.448-.306.5l-1.794-.24c-.238-.06-.36-.18-.36-.355 0-.05.006-.097.013-.145.12-.666.396-1.238.836-1.708.44-.47 1-.8 1.68-.985.59-.164 1.286-.253 2.073-.267h.34c1.14 0 2.06.27 2.753.81.138.108.27.22.4.347.11.102.205.217.293.34.146.194.26.39.347.59.13.29.21.6.253.9.027.203.04.54.04 1.02v4.27c0 .48.046.89.138 1.224.092.33.19.585.295.768.104.182.222.36.354.534.07.098.107.19.107.28 0 .09-.046.17-.14.24l-1.2.93c-.15.11-.298.12-.44 0l-.448-.478-.092-.1-.383-.462c-.68.664-1.38 1.063-2.102 1.205-.38.08-.8.124-1.267.124-1 0-1.81-.285-2.43-.852-.618-.567-.927-1.35-.927-2.35zm2.78-.645c0 .47.14.85.41 1.143.27.294.62.44 1.053.44.04 0 .09-.003.15-.006.06-.003.115-.006.17-.006.38-.06.755-.27 1.122-.626V9.15c-.558.024-.988.063-1.292.11-.66.097-1.152.32-1.474.67-.322.348-.48.786-.48 1.325l-.13-.053zm6.65 7.05c.088-.07.18-.13.27-.2a14.9 14.9 0 011.974-1.18c.496-.25.904-.38 1.22-.38.172 0 .306.04.405.123.1.082.15.21.15.383 0 .14-.03.295-.088.46-.146.426-.216.97-.216 1.636 0 .202.013.365.04.494.024.13.078.27.164.424.044.082.064.162.064.244 0 .1-.05.18-.154.243-.104.063-.198.09-.28.09-.053 0-.125-.012-.22-.038a2.697 2.697 0 01-.905-.436c-.316-.232-.586-.517-.81-.857-.222-.34-.37-.685-.447-1.035a6.83 6.83 0 01-.13-.92c-.576.363-1.166.632-1.77.807-.603.175-1.238.295-1.912.356l-.22.018c-.09.006-.175.01-.254.01-.17 0-.322-.023-.457-.07-.135-.045-.262-.12-.386-.225-.05-.05-.076-.098-.076-.146 0-.053.032-.1.1-.146z"/>
  </svg>
);

const SOCIALS = [
  { name: "TikTok", handle: "@francesandfam", url: "https://tiktok.com/@francesandfam", color: "from-black to-gray-800", Icon: TikTokIcon },
  { name: "Instagram", handle: "@FrancesAndFamily", url: "https://instagram.com/FrancesAndFamily", color: "from-pink-500 via-purple-500 to-orange-500", Icon: Instagram },
  { name: "YouTube", handle: "@FrancesAndFamily", url: "https://youtube.com/@FrancesAndFamily", color: "from-red-500 to-red-600", Icon: Youtube },
  { name: "Twitter / X", handle: "@CoolCatStuff", url: "https://twitter.com/CoolCatStuff", color: "from-gray-800 to-black", Icon: XIcon },
  { name: "LinkedIn", handle: "Cool Cat Stuff", url: "https://www.linkedin.com/company/gotcoolcatstuff/", color: "from-blue-600 to-blue-700", Icon: Linkedin },
  { name: "Facebook", handle: "Frances and Fam", url: "https://www.facebook.com/FrancesandFam", color: "from-blue-500 to-blue-600", Icon: Facebook },
  { name: "Snapchat", handle: "@francesandfam", url: "https://snapchat.com/add/francesandfam", color: "from-yellow-400 to-yellow-500", Icon: SnapchatIcon },
  { name: "Threads", handle: "@francesandfamily", url: "https://threads.net/@francesandfamily", color: "from-gray-900 to-black", Icon: ThreadsIcon },
  { name: "Reddit", handle: "u/SingTheDamnSong", url: "https://reddit.com/u/singthedamnsong", color: "from-orange-500 to-orange-600", Icon: RedditIcon },
  { name: "RedNote", handle: "19.4万 likes", url: "https://xhslink.com/m/4wx14fEyu3M", color: "from-red-400 to-red-500", Icon: RedNoteIcon },
  { name: "Amazon Live", handle: "Cool Cat Stuff", url: "https://amazon.com/live/coolcatstuff", color: "from-orange-400 to-yellow-500", Icon: Tv },
  { name: "Amazon Storefront", handle: "Shop Our Picks", url: "https://www.amazon.com/shop/coolcatstuff", color: "from-gray-700 to-gray-800", Icon: ShoppingCart },
];

export default function Socials() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2 text-white hover:text-white hover:bg-white/10">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
          <h1 className="text-xl font-serif font-bold text-white">Our Socials</h1>
          <div className="w-20" />
        </div>
      </nav>

      <main className="pt-24 pb-16 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4 text-white">Follow Us Everywhere</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Connect with Frances & Family across all your favorite platforms!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {SOCIALS.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className={`bg-gradient-to-br ${social.color} p-1 rounded-2xl group`}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-full flex flex-col items-center justify-center text-center text-white hover:bg-white/20 transition-colors">
                <div className="mb-3">
                  <social.Icon className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-lg mb-1">{social.name}</h3>
                <p className="text-xs text-white/70 mb-3">{social.handle}</p>
                <ExternalLink className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>
      </main>
    </div>
  );
}
