import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, ThumbsUp, AlertTriangle } from "lucide-react";

interface LifePathRelationshipsProps {
  lifePathNumber: number | string;
  relationshipData: {
    bestMatches: number[];
    goodMatches: number[];
    challengingMatches: number[];
    compatibility: Record<string, string>;
  };
}

const LifePathRelationships: React.FC<LifePathRelationshipsProps> = ({ lifePathNumber, relationshipData }) => {
  const { bestMatches, goodMatches, challengingMatches, compatibility } = relationshipData;

  // Animation variants for staggered animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-8 mt-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass dark:glass-dark p-6 rounded-xl"
      >
        <h3 className="text-xl font-medium flex items-center gap-2 mb-4">
          <Heart className="text-pink-500" size={20} />
          <span>Your Life Path {lifePathNumber} Compatibility</span>
        </h3>
        <p className="text-foreground/80 leading-relaxed">{compatibility.overview}</p>
      </motion.section>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        <motion.div variants={itemVariants} className="bg-green-500/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <ThumbsUp className="text-green-500" size={20} />
            <h4 className="font-medium">Best Matches</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {bestMatches.map((number) => (
              <span key={`best-${number}`} className="py-1 px-3 bg-green-500/20 rounded-full text-sm">
                Life Path {number}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-foreground/70">{compatibility.bestMatchesDesc}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-blue-500/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Users className="text-blue-500" size={20} />
            <h4 className="font-medium">Good Matches</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {goodMatches.map((number) => (
              <span key={`good-${number}`} className="py-1 px-3 bg-blue-500/20 rounded-full text-sm">
                Life Path {number}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-foreground/70">{compatibility.goodMatchesDesc}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-orange-500/10 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="text-orange-500" size={20} />
            <h4 className="font-medium">Challenging Matches</h4>
          </div>
          <div className="flex flex-wrap gap-2">
            {challengingMatches.map((number) => (
              <span key={`challenging-${number}`} className="py-1 px-3 bg-orange-500/20 rounded-full text-sm">
                Life Path {number}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-foreground/70">{compatibility.challengingMatchesDesc}</p>
        </motion.div>
      </motion.div>

      <div className="bg-background/40 p-5 rounded-xl border border-foreground/10 mt-6">
        <p className="text-sm text-foreground/70">
          <span className="font-medium block mb-1">Note on Compatibility:</span>
          While numerology can provide interesting insights into relationship dynamics, it should not be the only factor
          considered when evaluating relationships. Many other factors such as personal growth, communication skills,
          shared values, and mutual respect are crucial elements of successful relationships.
        </p>
      </div>
    </div>
  );
};

export default LifePathRelationships;
