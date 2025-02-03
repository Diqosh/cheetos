import {motion} from 'framer-motion';
import bg from "./assets/background.png";
import pattern1 from "./assets/1.png";
import pattern2 from "./assets/1.png";
import {useMediaQuery} from "react-responsive";

export const ForWhom = () => {
  const isMobile = useMediaQuery({maxWidth: 1666});

  const rotateAnimation = {
    left: {
      animate: {
        rotate: [-5, 5, -5],
        transition: {
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }
      }
    },
    right: {
      animate: {
        rotate: [5, -5, 5],
        transition: {
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }
      }
    }
  };

  return (
    <section className="relative w-full min-h-[640px] sm:min-h-[720px] md:min-h-[800px] lg:min-h-[980px] -mt-20 z-10">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{backgroundImage: `url(${bg})`}}
      />

      {/* Content Container with Pattern Images */}
      <div className="relative z-20 container mx-auto px-4 py-8 md:py-16 lg:py-24 h-full flex flex-col justify-center">
        {/* Pattern Images */}
        {!isMobile ? <>
          <div
            className="absolute left-0 top-20 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-contain bg-no-repeat -z-1"
            style={{backgroundImage: `url(${pattern1})`}}
          />
          <div
            className="absolute right-0 bottom-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-contain bg-no-repeat rotate-90 -z-1"
            style={{backgroundImage: `url(${pattern2})`}}
          />
        </> : <>
          <div
            className="absolute left-0 top-25 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-contain bg-no-repeat -z-1"
            style={{backgroundImage: `url(${pattern1})`}}
          />
          <div
            className="absolute right-0 top-25 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-contain bg-no-repeat rotate-180 -z-1"
            style={{backgroundImage: `url(${pattern2})`}}
          />

        </>
        }

        {/* Main Title Cards */
        }
        <div
          className="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-8 lg:gap-12 mb-8 md:mb-12 mt-12 md:mt-25">
          <motion.div
            {...rotateAnimation.left}
            className="md:w-auto bg-[#6B2B62] text-white px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 lg:px-12 lg:py-8 rounded-2xl text-4xl md:text-4xl lg:text-6xl font-bold border-4 md:border-6 lg:border-8 border-white shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
          >
            ДЛЯ НЕГО
          </motion.div>

          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-black my-2 md:my-0">
            И
          </span>

          <motion.div
            {...rotateAnimation.right}
            className="md:w-auto bg-[#FF4E8D] text-white px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 lg:px-12 lg:py-8 rounded-2xl text-4xl md:text-4xl lg:text-6xl font-bold border-4 md:border-6 lg:border-8 border-white shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
          >
            ДЛЯ НЕЁ
          </motion.div>
        </div>

        {/* Subtitle */
        }
        <h1
          className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-black mb-6 md:mb-8 max-w-4xl mx-auto text-center">
          НОВЫЕ ПАЧКИ CHEETOS — ЛЮБОВЬ С ПЕРВОГО ВЗГЛЯДА!
        </h1>

        {/* Description */
        }
        <p
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-black leading-relaxed max-w-5xl mx-auto text-center mb-15">
          КО ДНЮ ВСЕХ ВЛЮБЛЕННЫХ ЧЕСТЕР ПОДГОТОВИЛ ДВЕ УПАКОВКИ ЛЮБИМЫХ CHEETOS —
          ДЛЯ НЕЕ И ДЛЯ НЕГО, В РОЗОВОМ И ЧЕРНОМ ЦВЕТАХ. ТЕПЕРЬ ПРИЗНАВАТЬСЯ В
          ЧУВСТВАХ МОЖНО ДАЖЕ ЧЕРЕЗ СНЕКИ! ВЫБИРАЙ В МАГАЗИНАХ СВОЕГО ГОРОДА
          CHEETOS СО ВКУСОМ СЫРА. ПАЧКА ПОЛНАЯ ВЕСЕЛЬЯ!
        </p>
      </div>
    </section>
  )
    ;
};