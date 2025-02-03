import {motion, useInView} from "framer-motion";
import tiger from "../assets/tiger.png";
import cheetosBlack from "../assets/black.png";
import cheetosPink from "../assets/pink.png";
import logo from "../assets/logo.png";
import { HeartAnimation } from "@/components/Main/ui/hearts";
import {useRef} from "react";

const jellyVariants = {
  hover: {
    scale: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
    transition: { duration: 1, ease: "easeInOut" }
  },
  tap: { scale: 0.9, transition: { duration: 0.1 } }
};

export const Main = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div ref={ref} className="flex flex-col justify-center items-center min-h-2/3 relative overflow-hidden">
      <HeartAnimation />

      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: -200, opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        className="w-[300px] md:w-[250px] lg:w-[250px] xl:w-[300px]
          z-10
          mt-2
          md:absolute
          md:top-8 md:left-8
          lg:top-12 lg:left-12
          xl:top-16 xl:left-16"
      >
        <img className="w-full object-contain" src={logo} alt="Cheetos logo" />
      </motion.div>

      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 200, opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
        className="w-[90%] max-w-[350px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[800px] relative"
      >
        <img className="w-full object-contain" src={tiger} alt="Majestic tiger" />
        <CheetosBag
          image={cheetosBlack}
          className="right-0 translate-x-[30%] md:translate-x-[40%] -translate-y-[20%] md:-translate-y-[25%] rotate-[20deg]"
        />
        <CheetosBag
          image={cheetosPink}
          className="left-0 -translate-x-[30%] md:-translate-x-[40%] -translate-y-[20%] md:-translate-y-[25%] -rotate-[29deg]"
        />
      </motion.div>
    </div>
  );
};

const CheetosBag = ({ image, className }: { image: string; className: string }) => (
  <motion.div
    className={`absolute top-[35%] w-[40%] max-w-[350px] aspect-square ${className}`}
    whileHover="hover"
    whileTap="tap"
    variants={jellyVariants}
  >
    <img
      className="w-full h-full object-contain"
      src={image}
      alt="Cheetos bag"
    />
  </motion.div>
);