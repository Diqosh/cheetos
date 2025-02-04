import {motion, Variants} from 'framer-motion';
import sticker1 from './assets/sticker1-min.png';
import sticker2 from './assets/sticker2-min.png';
import sticker3 from './assets/sticker3-min.png';
import bg from "@/components/ForWhom/assets/background.png";
import {useMediaQuery} from "react-responsive";

const TelegramStickers = () => {
  const isChange = useMediaQuery({maxWidth: 575 })
  const stickerVariants: Variants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.8
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: [1, 1.1, 1],
      rotate: [0, -5, 5, 0],
      transition: {
        scale: {
          repeat: Infinity,
          duration: 2
        },
        rotate: {
          repeat: Infinity,
          duration: 2
        },
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        yoyo: Infinity
      }
    }
  };

  return (
    <div className="min-h-3/4 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{backgroundImage: `url(${bg})`}}
      />

      <div className="container mx-auto px-4 pt-16 relative">
        <div className="text-center mb-12 mt-15">
          <motion.h1
            className="text-4xl font-bold text-black mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            СТИКЕРПАК В ТЕЛЕГРАМ
          </motion.h1>

          <motion.a
            href="https://t.me/addstickers/CheetosLoves" // Replace with actual download link
            variants={buttonVariants}
            initial="initial"
            whileHover="hover"
            className="inline-block bg-[#FF69B4] text-white px-7 py-4 font-bold text-5xl rounded-3xl shadow-2xl border-4 border-white"
          >
            СКАЧАТЬ
          </motion.a>
        </div>

        <div className="flex justify-around items-center flex-wrap gap-4 sm:-mt-30 mb-55 ">
          <motion.div
            variants={stickerVariants}
            initial="initial"
            animate="animate"
            className="w-64"
          >
            <img src={sticker1} alt="Chester on donut sticker" className="w-full h-auto" />
          </motion.div>

          <motion.div
            variants={stickerVariants}
            initial="initial"
            animate="animate"
            className={`w-64 ${isChange ? "" : "mt-30"}`}
          >
            <img src={sticker2} alt="Dancing Chester sticker" className="w-full h-auto" />
          </motion.div>

          <motion.div
            variants={stickerVariants}
            initial="initial"
            animate="animate"
            className="w-64"
          >
            <img src={sticker3} alt="Chester with heart box sticker" className="w-full h-auto transform rotate-12" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TelegramStickers;