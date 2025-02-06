import {motion, Variants} from 'framer-motion';
import sticker1 from './assets/sticker1-min.png';
import sticker2 from './assets/sticker2-min.png';
import sticker3 from './assets/sticker3-min.png';
import pattern1 from './assets/patter1.png';
import pattern2 from './assets/pattern2.png';
import pattern3 from './assets/pattern3.png';
import pattern4 from './assets/pattern4.png';

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
          duration: 4
        },
        rotate: {
          repeat: Infinity,
          duration: 4
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

      <div
        className="absolute xl:left-1/50 -left-1/15  md:top-1/10 top-1/4 w-50 h-50 md:w-40 lg:w-55 lg:h-55 bg-contain bg-no-repeat rotate-270"
        style={{backgroundImage: `url(${pattern1})`}}
      />
      <div
        className="absolute xl:right-1/50 -right-1/15 md:top-1/10 top-1/5 w-50 h-50 md:w-40 lg:w-55 lg:h-55 bg-contain bg-no-repeat rotate-90"
        style={{backgroundImage: `url(${pattern2})`}}
      />
      <div
        className="absolute xl:left-1/50 -left-1/15  md:bottom-1/10 bottom-1/5 w-50 h-50 md:w-40 lg:w-55 lg:h-55 bg-contain bg-no-repeat rotate-360"
        style={{backgroundImage: `url(${pattern4})`}}
      />
      <div
        className="absolute xl:right-1/50 -right-1/15  md:bottom-1/10 bottom-1/3 w-50 h-50 md:w-40 lg:w-55 lg:h-55 bg-contain bg-no-repeat rotate-180"
        style={{backgroundImage: `url(${pattern3})`}}

      />

      <div className="container mx-auto px-4 pt-16 relative">
        <div className="text-center mb-12 mt-15 lg:mt-30">
          <motion.h1
            className="text-[45px] md:text-[50px] xl:text-[70px] font-bold text-black mb-8"
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
            className="inline-block bg-[#FF69B4] text-white px-5 lg:px-10 py-1.5 font-bold text-[48px] lg:text-[60px] xl:text-[70px] 2xl:text-[80px] rounded-[16px] lg:rounded-[30px] shadow-2xl border-[10px] border-white"
          >
            СКАЧАТЬ
          </motion.a>
        </div>

        <div className="flex justify-around items-center flex-wrap gap-4 sm:-mt-30 mb-20 md:mb-55 ">
          <motion.div
            variants={stickerVariants}
            initial="initial"
            animate="animate"
            className="w-[210px] lg:w-[300px] xl:w-[350px] 2xl:w-[434px]"
          >
            <img src={sticker1} alt="Chester on donut sticker" className="w-full h-auto" />
          </motion.div>

          <motion.div
            variants={stickerVariants}
            initial="initial"
            animate="animate"
            className={`w-[210px] lg:w-[300px] xl:w-[350px] 2xl:w-[434px] ${isChange ? "" : "mt-30 lg:mt-50"}`}
          >
            <img src={sticker2} alt="Dancing Chester sticker" className="w-full h-auto" />
          </motion.div>

          <motion.div
            variants={stickerVariants}
            initial="initial"
            animate="animate"
            className="w-[210px] lg:w-[300px] xl:w-[350px] 2xl:w-[434px]"
          >
            <img src={sticker3} alt="Chester with heart box sticker" className="w-full h-auto transform rotate-12" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TelegramStickers;