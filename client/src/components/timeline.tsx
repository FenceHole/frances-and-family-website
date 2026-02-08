import { motion } from "framer-motion";

const MILESTONES = [
  {
    year: "Season 1",
    title: "The Stray",
    desc: "A scared cat finds a hole in a fence in Philadelphia. Trust is built, one bowl of food at a time.",
    color: "bg-amber-500"
  },
  {
    year: "Season 2",
    title: "The Family",
    desc: "Frances moves in. The kittens are born. A bachelor pad becomes a chaotic, loving home of 8.",
    color: "bg-orange-500"
  },
  {
    year: "Season 3",
    title: "The Show",
    desc: "We start reviewing cat products for fun. The internet falls in love. 'Cool Cat Stuff' becomes #1.",
    color: "bg-rose-500"
  },
  {
    year: "Season 4",
    title: "The Mission",
    desc: "Leveraging our platform to launch Vet Van Fleet. The goal: Free healthcare for cats everywhere.",
    color: "bg-primary"
  }
];

export function Timeline() {
  return (
    <div className="relative py-20">
      {/* Vertical Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

      <div className="space-y-24">
        {MILESTONES.map((milestone, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative flex items-center gap-8 md:gap-0 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Timeline Dot */}
            <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background ${milestone.color} shadow-lg z-10`} />

            {/* Content Card */}
            <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${i % 2 === 0 ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white mb-3 ${milestone.color}`}>
                {milestone.year}
              </span>
              <h3 className="text-3xl font-serif font-bold mb-3">{milestone.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md ml-auto mr-auto md:mx-0">
                {milestone.desc}
              </p>
            </div>
            
            {/* Empty space for the other side */}
            <div className="hidden md:block w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
