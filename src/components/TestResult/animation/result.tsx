import {AnimatePresence, motion, Variants} from "framer-motion";

export const ResultsSection: React.FC<{
  currentResult: { title: string; description: string };
  currentSlide: number;
  slideDirection: number;
  nextSlide: () => void;
  prevSlide: () => void;
  inView: boolean;
}> = ({
        currentResult,
        currentSlide,
        slideDirection,
        nextSlide,
        prevSlide,
        inView
      }) => {
  const slideVariants: Variants = {
    initial: {
      y: 200,
      opacity: 0
    },
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      y: 0,
      opacity: 0,
      position: 'absolute'
    }),
    center: {
      zIndex: 1,
      x: 0,
      y: 0,
      opacity: 1,
      position: 'relative'
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      y: 0,
      opacity: 0,
      position: 'absolute'
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <motion.div
      className="relative max-w-[1680px] flex justify-between mx-auto"
      initial="initial"
      animate={inView ? "visible" : "initial"}
      variants={{
        initial: { opacity: 0 },
        visible: { opacity: 1 }
      }}
      transition={{ delay: 2.7, duration: 0.5 }}
    >
      <AnimatePresence initial={false} custom={slideDirection}>
        <motion.div
          key={currentSlide}
          custom={slideDirection}
          variants={slideVariants}
          initial="initial"
          animate="center"
          exit="exit"
          transition={{
            y: { type: "spring", stiffness: 300, damping: 30 },
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(_e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              nextSlide();
            } else if (swipe > swipeConfidenceThreshold) {
              prevSlide();
            }
          }}
          className="absolute inset-0 flex flex-col lg:flex-row gap-10 items-center lg:items-start justify-center w-full mx-auto px-12 mb-20"
        >
          <motion.div
            className="text-3xl md:text-6xl uppercase font-bold text-center lg:text-left  text-orange-500 min-w-[450px]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {currentResult.title}
          </motion.div>
          <motion.div
            className="text-lg md:text-2xl font-light text-center lg:text-left"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {currentResult.description}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};