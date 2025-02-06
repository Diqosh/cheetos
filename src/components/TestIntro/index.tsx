import {motion, useInView} from 'framer-motion';
import chesterImage from '@/components/Main/assets/heart.png';
import tiger from './assets/tiger_l.png';
import start from './assets/start.png';
import startHovered from './assets/start_hovered.png';
import {useMediaQuery} from "react-responsive";
import {useEffect, useRef, useState} from "react";

export const TestInto = () => {
  const [imgSrc, setImgSrc] = useState(start);
  const tigerChange = useMediaQuery({maxWidth: 633});
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);
  const isInView = useInView(componentRef);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        setIsVisible(true);
      }, 1000);
    }
  }, [isInView]);

  const handleClick = () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight - 100,
      behavior: 'smooth'
    });
  };

  const animationProps = tigerChange
    ? {
      animate: {
        y: [-100, 0, -100],
        rotate: 360,
      }
    }
    : {
      animate: {
        x: [-100, 0, -100],
        y: [-100, 0, -100],
        rotate: 360,
      }
    };

  return (
    <div className="py-20 relative max-w-[1680px] mx-auto" ref={componentRef}>
      <div className="container flex flex-col mx-auto px-4 relative z-10">
        <motion.span
          className={`text-3xl lg:text-5xl mb-2 tracking-wider ${tigerChange ? "-ml-8 text-center mb-10" : ""}`}
          initial={{opacity: 0, x: -50}}
          animate={isVisible ? {opacity: 1, x: 0} : {opacity: 0, x: -50}}
          transition={{duration: 0.6}}
        >
          ТЕСТ ОТ <span className="text-[#FF4E17] font-bold">CHESTERA</span>
        </motion.span>

        <motion.h1
          className={`${tigerChange ? 'text-6xl flex justify-center' : 'text-5xl'} sm:text-6xl md:text-7xl lg:text-9xl font-bold mb-8 text-orange-500 tracking-wider relative`}
          initial={{opacity: 0, y: -50}}
          animate={isVisible ? {opacity: 1, y: 0} : {opacity: 0, y: -50}}
          transition={{duration: 1}}
        >
          {tigerChange ? (
            <div dangerouslySetInnerHTML={{__html: "КТО ТЫ <br />НА 14 <br /> ФЕВРАЛЯ?"}}/>
          ) : (
            <div dangerouslySetInnerHTML={{__html: "КТО ТЫ НА<br />14 ФЕВРАЛЯ?"}}/>
          )}
          <div
            className={`absolute ${tigerChange ? "left-1/2 top-[26px]" : "left-[270px] sm:left-[310px] md:left-[370px] lg:left-[650px] -top-[60px]"} ${tigerChange ? "" : "rotate-45"}`}>
            <img
              src={tiger}
              alt="Chester with heart"
              className="w-50 md:w-64 h-auto fit-contain relative"
            />
            <motion.img
              src={chesterImage}
              alt="start"
              className={`h-auto fit-contain absolute ${tigerChange ? "w-10 -right-[20px] -top-[10px]" : "w-20 right-[70px] -top-[30px]"}`}
              {...animationProps}
              transition={{
                x: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                },
                y: {
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut"
                },
                rotate: {
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear"
                }
              }}
            />
          </div>
        </motion.h1>

        <motion.div
          className={`text-sm tracking-tighter mb-12 flex ${tigerChange ? "flex-col w-[331px] mx-auto" : "flex-row gap-20 mr-10"}`}
          initial={{opacity: 0, y: 50}}
          animate={isVisible ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
          transition={{duration: 0.6, delay: 0.3}}
        >
          <motion.p
            className={`py-auto lg:text-2xl lg:text-3xl w-full uppercase ${tigerChange ? "mx-auto w-[331px]" : ""}`}
            initial={{opacity: 0, y: 50}}
            animate={isVisible ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
            transition={{duration: 0.6, delay: 0.4}}
          >
            Честер подготовил для тебя тест по случаю Дня всех влюбленных! Отвечай честно на 5 вопросов, чтобы узнать,
            какая роль подходит тебе на 14 февраля. Итак, какой ты Валентин?
          </motion.p>
          <motion.div
            className='relative cursor-pointer'
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            initial={{opacity: 0, y: 50}}
            animate={isVisible ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
            transition={{duration: 0.6, delay: 0.5}}
          >
            <motion.img
              src={chesterImage}
              alt="left"
              className={`h-auto fit-contain absolute ${tigerChange ? "top-20 -right-10 w-35" : "top-3 sm:left-25 md:left-35 w-25"} z-index-1 rotate-35`}
              animate={{x: isHovered ? 30 : 0}}
              whileTap={{scale: 0.9}}
              transition={{duration: 0.2}}
              onClick={handleClick}
            />
            <motion.img
              src={chesterImage}
              alt="right"
              className={`h-auto fit-contain absolute ${tigerChange ? "top-20 -left-10 w-35" : "top-3 sm:right-25 md:right-35 w-25"} z-index-1`}
              animate={{x: isHovered ? -30 : 0}}
              whileTap={{scale: 0.9}}
              transition={{duration: 0.2}}
              onClick={handleClick}
            />
            <motion.img
              src={imgSrc}
              alt="start"
              className={`relative w-60 h-auto fit-contain z-index-2 ${tigerChange ? "mx-auto mt-10" : ""}`}
              onMouseEnter={() => setImgSrc(startHovered)}
              onMouseLeave={() => setImgSrc(start)}
              whileTap={{ scale: 0.9 }}
              onClick={handleClick}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default TestInto;