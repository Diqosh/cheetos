import React, {useCallback, useMemo, useRef, useState} from 'react';
import {motion, useInView} from 'framer-motion';
import left from './assets/left.png';
import right from './assets/right.png';
import heartIcon from './assets/heart.png';
import download from './assets/download.png';
import roman from './assets/roman.png';
import dusha from './assets/dusha.png';
import phylosophy from './assets/phylosophy.png';

import val from './assets/Valentine.png';

import slbtn from './assets/sliderButton.png';
import slbtnLeft from './assets/sliderButtonLeft.png';


import {Answer} from "@/components/Test/models/types.ts";
import {useMediaQuery} from "react-responsive";
import {ResultsSection} from "@/components/TestResult/animation/result.tsx";
import exportAsImage from "@/components/TestResult/download";

const results: Record<string, { title: string; description: string, image: string }> = {
  A: {
    title: "Безнадежный романтик!",
    description: "Тебе знакомо чувство любви, и ты стремишься одаривать им своего партнера. Ты продумываешь День святого Валентина до мелочей, не упуская важных деталей — будь это милый сюрприз, букет любимых цветов или любовное послание. Для тебя этот праздник — повод напомнить любимому человеку, как сильно ты его ценишь.",
    image: roman
  },
  B: {
    title: "Душа любой компании!",
    description: "Ты обожаешь веселиться и не особо следуешь традициям, потому что праздник у тебя каждый день. Тебя обожают друзья, потому что ты всегда за «любой кипиш». Для тебя этот праздник — повод повеселиться и провести день с близкими друзьями.",
    image: dusha
  },
  C: {
    title: "Настоящий философ!",
    description: "Ты не особо привязан/а к этому празднику, потому что веришь, что любовь не подвластна датам. Ты ценишь уединение и личную жизнь, возможно, предпочитаешь держать ее в тайне. Для тебя этот праздник — просто еще один повод для людей тратить деньги на подарки/сюрпризы и признаваться друг другу в любви.",
    image: phylosophy
  },
  D: {
    title: "Сам себе Валентин!",
    description: "Ты ценишь комфорт в любых его проявлениях: вечер за просмотром любимого сериала и вкусной едой — уже праздник. Для тебя 14 февраля — праздник заботы о себе, когда можно сделать что-то приятное именно для себя.",
    image: val
  }
};

const AnimatedWord = ({word, index, inView}: { word: string; index: number; inView: boolean }) => {
  return (
    <motion.span
      initial={{scale: 0, opacity: 1}}
      animate={inView ? {
        scale: 1,
        opacity: [1, 1, 0.15],
        transition: {
          opacity: {
            times: [0, 0.8, 1],
            duration: 2.5,
            delay: 0.5 + (index * 0.1)
          },
          scale: {
            duration: 0.5,
            delay: 0.5 + (index * 0.1),
            type: "spring",
            stiffness: 200,
            damping: 15
          }
        }
      } : {
        scale: 0,
        opacity: 0
      }}
      className="inline-block"
    >
      {word}
    </motion.span>
  );
};

export const ValentineQuiz: React.FC<{ answers: Answer[] }> = ({answers}) => {

  const normalizedAnswers: [string, number][] = Object.keys(results).map((key) => [
    key,
    answers.filter((answer) => answer === key).length
  ]);

  const sortedArray = normalizedAnswers.sort(
    (a, b) => (b[1] as number) - (a[1] as number) || (a[0] as string).localeCompare(b[0] as string)
  );
  console.log(sortedArray)


  const componentRef = useRef(null);

  const inView = useInView(componentRef, {once: true, amount: 0.3});
  const isMobile = useMediaQuery({maxWidth: 768});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slideDirection, setSlideDirection] = useState(0);

  const resultTypes = useMemo(() => Object.keys(results), []);
  const totalSlides = resultTypes.length;

  const textContent = isMobile
    ? ['КТОООО', 'ЖЕ', 'ТЫ', 'НА', '14', 'ФЕВРАЛЯ?']
    : ['КТОООО', 'ЖЕ', 'ТЫ', 'НА', '14', 'ФЕВРАЛЯ?'];

  const nextSlide = () => {
    setSlideDirection(1);
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setSlideDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const handleDownload = useCallback(async () => {
    if (!componentRef.current) return;

    try {
      await exportAsImage(
        componentRef.current,
        'valentine-quiz-result.png',
        {
          quality: 1.0,
          scale: 2,
          backgroundColor: '#ffffff' // Optional: ensure white background
        }
      );
    } catch (error) {
      console.error('Failed to download image:', error);
    }
  }, []);

  const currentResult = results[sortedArray[currentSlide][0]];
  return (
    <div className="w-full h-full flex flex-col overflow-hidden z-1" ref={componentRef}>
      <div className="relative flex-1">
        {/* Background Text */}
        <div className="absolute inset-0 text-[#FF4500] font-bold flex items-start justify-center pointer-events-none">
          <div className={`
            ${isMobile ? 'px-8 w-[320px]' : 'px-16 w-[800px]'}
            mx-auto text-center
          `}>
            <div className={`
              ${isMobile ? 'text-6xl leading-tight' : 'text-8xl leading-tight'}
              flex flex-wrap justify-center gap-x-6 gap-y-3
            `}>
              {textContent.map((word, index) => (
                <React.Fragment key={index}>
                  <AnimatedWord word={word} index={index} inView={inView}/>
                  {isMobile ? (
                    (index === 0 || index === 2 || index === 4) && <br/>
                  ) : (
                    (index === 1 || index === 2) && <br/>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex items-center justify-between pt-8 pb-12 relative z-10">
          <div className="relative flex-1 mx-8">
            <div className="relative w-full flex flex-col items-center">
              <div className="flex w-full justify-center md:justify-between items-center max-w-[1680px] mx-auto">
                <motion.button
                  initial={{opacity: 0}}
                  animate={inView ? {opacity: 1} : {opacity: 0}}
                  transition={{delay: 2.5}}
                  className="hidden md:block  hover:scale-110 transition-transform"
                  onClick={prevSlide}
                >
                  <img src={slbtnLeft} alt="Previous" className="w-[70px] fit-contain "/>
                </motion.button>

                <div className="max-w-md relative mt-10">


                  <motion.div
                    className="relative w-[250px] md:w-[380px] h-[250px] md:h-[380px]"
                    initial={{y: -200, opacity: 0}}
                    animate={inView ? {y: 0, opacity: 1} : {y: -200, opacity: 0}}
                    transition={{delay: 1.7, duration: 1, type: "spring"}}
                  >
                    {/* Heart Image (moved to be first in DOM) */}
                    <motion.img
                      initial={{y: -100, opacity: 0}}
                      animate={inView ? {y: 0, opacity: 1} : {y: -100, opacity: 0}}
                      transition={{delay: 2, duration: 0.8, type: "spring"}}
                      src={left}
                      alt="Left decoration"
                      className="w-[120px] md:w-[180px] fit-contain absolute -top-30 -left-15 md:-left-25 z-0"
                    />
                    <motion.img
                      initial={{y: -100, opacity: 0}}
                      animate={inView ? {y: 0, opacity: 1} : {y: -100, opacity: 0}}
                      transition={{delay: 2, duration: 0.8, type: "spring"}}
                      src={right}
                      alt="Right decoration"
                      className="w-[120px] md:w-[180px] fit-contain absolute -top-30 -right-15 md:-right-25 z-0"
                    />
                    <motion.img
                      src={heartIcon}
                      alt="Heart"
                      className="w-[250px] md:w-[380px] mb-10 relative z-0"
                      animate={inView ? {
                        scale: [1, 1.05, 1]
                      } : {scale: 0}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: 2.5
                      }}
                    />


                    {/* Top Result Image */}
                    <img
                      src={currentResult.image}
                      alt=""
                      className={`absolute left-1/2 -translate-x-1/2 ${isMobile ? "top-10" : "top-15" } w-[126px] md:w-[201px] z-50`}
                    />
                  </motion.div>


                </div>

                <motion.button
                  initial={{opacity: 0}}
                  animate={inView ? {opacity: 1} : {opacity: 0}}
                  transition={{delay: 2.5}}
                  className="hidden md:block hover:scale-110 transition-transform"
                  onClick={nextSlide}
                >
                  <img src={slbtn} alt="Next" className="w-[70px] fit-contain"/>
                </motion.button>

                <motion.button
                  initial={{opacity: 0}}
                  animate={inView ? {opacity: 1} : {opacity: 0}}
                  transition={{delay: 2.7}}
                  className="absolute left-1/2 -translate-x-1 bottom-[30px] w-[100px] hidden md:block z-21 hover:scale-105 transition-transform"
                  onClick={handleDownload}
                >
                  <img src={download} alt="Download" className="fit-contain"/>
                </motion.button>
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden relative w-full flex justify-between align-center mt-4">
                <motion.button
                  initial={{opacity: 0}}
                  animate={inView ? {opacity: 1} : {opacity: 0}}
                  transition={{delay: 2.5}}
                  className="my-auto hover:scale-110 transition-transform"
                  onClick={prevSlide}
                >
                  <img src={slbtnLeft} alt="Previous" className="w-15 fit-contain"/>
                </motion.button>
                <motion.button
                  initial={{opacity: 0}}
                  animate={inView ? {opacity: 1} : {opacity: 0}}
                  transition={{delay: 2.7}}
                  className="w-[100px] block hover:scale-105 transition-transform"
                  onClick={handleDownload}
                >
                  <img src={download} alt="Download" className="fit-contain"/>
                </motion.button>
                <motion.button
                  initial={{opacity: 0}}
                  animate={inView ? {opacity: 1} : {opacity: 0}}
                  transition={{delay: 2.5}}
                  className="my-auto hover:scale-110 transition-transform"
                  onClick={nextSlide}
                >
                  <img src={slbtn} alt="Next" className="w-15 fit-contain"/>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        <ResultsSection
          currentResult={currentResult}
          currentSlide={currentSlide}
          slideDirection={slideDirection}
          nextSlide={nextSlide}
          prevSlide={prevSlide}
          inView={inView}
        />
      </div>
    </div>
  );
};