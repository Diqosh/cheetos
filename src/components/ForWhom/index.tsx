import {motion} from 'framer-motion';
import bg from "./assets/background.png";
import bgMin from "./assets/bg-min.png";
import pattern1 from "./assets/1.png";
import pattern2 from "./assets/2.png";
import {useMediaQuery} from "react-responsive";
import {useEffect, useState} from "react";

export const ForWhom = () => {
  const changeBg = useMediaQuery({maxWidth: 800});
  const [imgSrc, setImgSrc] = useState(bg);

  useEffect(() => {
    if (changeBg) {
      setImgSrc(bgMin);
    } else {
      setImgSrc(bg);
    }
  }, [changeBg]);


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
    <section className="relative w-full min-h-[700px] sm:min-h-[720px] md:min-h-[700px] lg:min-h-[800px] -mt-20 z-10">
      {/* Background Image */}
      <img
        src={imgSrc}
        alt="bg"
        className="absolute inset-0 bg-cover h-full w-full bg-no-repeat"
      />

      <div
        className="absolute -left-5 md:-left-0 top-25 w-30 h-30 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-contain bg-no-repeat "
        style={{backgroundImage: `url(${pattern1})`}}
      />
      <div
        className="absolute -right-7 rotate-180 md:rotate-0 top-25 md: w-30 h-30 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-contain bg-no-repeat"
        style={{backgroundImage: `url(${pattern2})`}}
      />

      {/* Content Container with Pattern Images */}
      <div className="relative z-20 container px-4 py-8 md:py-16 lg:py-24 h-full flex flex-col justify-center max-w-[1680px] mx-auto">


        {/* Main Title Cards */}
        <div
          className="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-8 lg:gap-12 mb-8 md:mb-12 mt-25">
          <motion.div
            {...rotateAnimation.left}
            className="md:w-auto bg-[#6B2B62] text-white px-9 py-2.5 rounded-[27px] text-4xl md:text-4xl lg:text-6xl font-bold border-[9px] border-white shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
          >
            ДЛЯ НЕГО
          </motion.div>

          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-black my-2 md:my-0">
            И
          </span>

          <motion.div
            {...rotateAnimation.right}
            className="md:w-auto bg-[#FF4E8D] text-white px-9 py-2.5 rounded-[27px] text-4xl md:text-4xl lg:text-6xl font-bold border-[9px] border-white shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
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
          className="text-base sm:text-lg md:text-xl lg:text-2xl text-black leading-relaxed max-w-5xl mx-auto text-center mb-15 uppercase">
          Ко Дню всех влюбленных Честер подготовил две упаковки Cheetos — для нее и для него, в розовом и черном цветах.
          А еще в форме сердечек и с любимым сырным вкусом! Теперь признаваться в чувствах можно даже через снеки!
          Выбирай в магазинах своего города Cheetos. Пробуй, влюбляйся, вдохновляйся! </p>
      </div>
    </section>
  )
    ;
};