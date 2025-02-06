import {useEffect, useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import left from './assets/left.png';
import right from './assets/right.png';
import left_heart from './assets/left_heart.png';
import right_heart from './assets/right_heart.png';
import {useMediaQuery} from "react-responsive";
import {Answer, Question} from "@/components/Test/models/types.ts";
import bg from "./assets/bg.png";
import bgMin from "./assets/bg-min.png";
import pattern1 from "@/components/StickerPack/assets/patter1.png";
import pattern2 from "@/components/StickerPack/assets/pattern2.png";
import pattern4 from "@/components/StickerPack/assets/pattern4.png";
import pattern3 from "@/components/StickerPack/assets/pattern3.png";


type Props = {
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "ЧТО ТЫ ПЛАНИРУЕШЬ <br/> ДЕЛАТЬ В ДЕНЬ </br> СВЯТОГО ВАЛЕНТИНА?",
    textFull: "ЧТО ТЫ ПЛАНИРУЕШЬ ДЕЛАТЬ <br/> В ДЕНЬ СВЯТОГО ВАЛЕНТИНА?",
    options: [
      {id: 'A', text: "Романтический ужин в ресторане с любимым человеком"},
      {id: 'B', text: "Вечеринка с друзьями/подругами — одиночество не для меня!"},
      {id: 'C', text: "Это обычный день, праздновать не буду"},
      {id: 'D', text: "Закажу пиццу и посмотрю любимый сериал дома"}
    ]
  },
  {
    id: 2,
    text: "КАКОЙ ПОДАРОК ТЫ БЫ </br> ПРЕДПОЧЕЛ/ПРЕДПОЧЛА </br> ПОЛУЧИТЬ В ЭТОТ ДЕНЬ?",
    textFull: "КАКОЙ ПОДАРОК ТЫ БЫ <br/>ПРЕДПОЧЕЛ/ПРЕДПОЧЛА ПОЛУЧИТЬ В ЭТОТ ДЕНЬ?",
    options: [
      {id: 'A', text: "Букет цветов или что-нибудь из моего вишлиста"},
      {id: 'B', text: "Билеты на концерт любимого артиста или поход на квест"},
      {id: 'C', text: "Сертификат или деньги"},
      {id: 'D', text: "Теплая пижама, плед или доставка любимого блюда на дом"}
    ]
  },
  {
    id: 3,
    text: "КАКОЙ СЕРИАЛ ЛУЧШЕ </br> ВСЕГО ПЕРЕДАЕТ ТВОЕ </br> НАСТРОЕНИЕ НА 14 ФЕВРАЛЯ?",
    textFull: "КАКОЙ СЕРИАЛ ЛУЧШЕ ВСЕГО <br/>ПЕРЕДАЕТ ТВОЕ НАСТРОЕНИЕ НА 14 ФЕВРАЛЯ?",
    options: [
      {id: 'A', text: "«Я никогда не…»"},
      {id: 'B', text: "«Очень странные дела»"},
      {id: 'C', text: "«Уэнсдэй»"},
      {id: 'D', text: "Аниме или дорама"}
    ]
  },
  {
    id: 4,
    text: "КАКАЯ ИДЕАЛЬНАЯ ДЛЯ </br> ТЕБЯ ВАЛЕНТИНКА?",
    textFull: "КАКАЯ ИДЕАЛЬНАЯ ДЛЯ ТЕБЯ ВАЛЕНТИНКА?",
    options: [
      {id: 'A', text: "Классическая открытка с признанием в любви"},
      {id: 'B', text: "Мем или шуточное послание для поднятия настроения"},
      {id: 'C', text: "Что-то уникальное, например, книга о любви"},
      {id: 'D', text: "Валентинки я не собираю! Мне достаточно смс"}
    ]
  },
  {
    id: 5,
    text: "ПРИЗНАВАЛСЯ/ПРИЗНАВАЛАСЬ </br> ЛИ  ТЫ В ЛЮБВИ СВОЕМУ </br> ПАРТНЕРУ КОГДА-НИБУДЬ?",
    textFull: "ПРИЗНАВАЛСЯ/ПРИЗНАВАЛАСЬ ЛИ ТЫ В ЛЮБВИ СВОЕМУ ПАРТНЕРУ КОГДА-НИБУДЬ?",
    options: [
      {id: 'A', text: "Конечно! И не один раз"},
      {id: 'B', text: "Если я испытываю чувства, то мне несложно признаться"},
      {id: 'C', text: "Нет, это слишком неловко"},
      {id: 'D', text: "Буду ждать подходящего момента!"}
    ]
  }
];


export const Test = ({answers, setAnswers}: Props) => {
  const changeBg = useMediaQuery({maxWidth: 800});
  const [imgSrc, setImgSrc] = useState(bg);

  useEffect(() => {
    if (changeBg) {
      setImgSrc(bgMin);
    } else {
      setImgSrc(bg);
    }
  }, [changeBg]);

  const handleClick = () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight - 100,
      behavior: 'smooth'
    });
  };

  const isHideHands = useMediaQuery({maxWidth: 807});
  const [selectedOption, setSelectedOption] = useState<Answer | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedOption;
      setAnswers(newAnswers);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
      } else {
        handleClick()
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setSelectedOption(answers[currentQuestion - 1] || null);
    }
  };

  // // Animation variants for the options
  // const optionVariants = {
  //   hidden: {
  //     scale: 0,
  //     opacity: 0
  //   },
  //   visible: (index: number) => ({
  //     scale: 1,
  //     opacity: 1,
  //     transition: {
  //       delay: index * 0.15,
  //       duration: 0.3,
  //       ease: "easeOut"
  //     }
  //   }),
  //   exit: {
  //     scale: 0,
  //     opacity: 0,
  //     transition: {
  //       duration: 0.2
  //     }
  //   }
  // };

  return (
    <div className="w-full relative p-4 py-30 z-2">
      <img
        src={imgSrc}
        alt="bg"
        className="absolute inset-0 bg-cover h-full w-full bg-no-repeat"
      />
      {changeBg ? <>
        <div
          className="absolute left-1/2 -translate-x-1/2 top-[10px] w-50 h-50 md:w-40 lg:w-55 lg:h-55 bg-contain bg-no-repeat rotate-[50deg]"
          style={{backgroundImage: `url(${pattern2})`}}
        />
        <div
          className="absolute left-1/2 -translate-x-1/2 bottom-0 w-50 h-50 md:w-40 lg:w-55 lg:h-55 bg-contain bg-no-repeat rotate-90"
          style={{backgroundImage: `url(${pattern2})`}}
        />
      </> : <>
        <div
        className="absolute lg:left-1/50 -left-1/15  md:top-1/10 top-1/4 w-50 h-50 md:w-40 lg:w-55 lg:h-55 bg-contain bg-no-repeat rotate-270"
        style={{backgroundImage: `url(${pattern1})`}}
      />
        <div
          className="absolute lg:right-1/50 -right-1/15 md:top-1/10 top-1/5 w-50 h-50 md:w-40 lg:w-55 lg:h-55 bg-contain bg-no-repeat rotate-90"
          style={{backgroundImage: `url(${pattern2})`}}
        />
        <div
          className="absolute lg:left-1/50 -left-1/15  md:bottom-1/10 bottom-1/5 w-50 h-50 md:w-40 lg:w-55 lg:h-55 bg-contain bg-no-repeat rotate-360"
          style={{backgroundImage: `url(${pattern4})`}}
        />
        <div
          className="absolute lg:right-1/50 -right-1/15  md:bottom-1/10 bottom-1/3 w-50 h-50 md:w-40 lg:w-55 lg:h-55 bg-contain bg-no-repeat rotate-180"
          style={{backgroundImage: `url(${pattern3})`}}

        />
      </>}
      <div className="container max-w-[1680px] mx-auto pt-16 relative">
        <div>
          <div className="text-center mb-8">
            <div className="relative flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  className="relative"
                  key={currentQuestion}
                  initial={{width: 0}}
                  animate={{width: (isHideHands ? "100%" : "80%"), textWrap: "nowrap"}}
                  exit={{width: 0}}
                  transition={{duration: 0.4}}
                >
                  <img
                    src={left}
                    alt="Left hand"
                    className="absolute w-35 min-w-35 object-contain -bottom-5 -left-55"
                  />
                  <img
                    src={left_heart}
                    alt="Left heart"
                    className="absolute w-34 min-w-34 object-contain -bottom-9 -left-29"
                  />
                  <h2
                    className="text-2xl font-bold text-black bg-white py-2 px-4 rounded-lg overflow-hidden nowrap min-h-24 flex items-center justify-center text-center"
                    dangerouslySetInnerHTML={{__html: isHideHands ? questions[currentQuestion].text : questions[currentQuestion].textFull}}
                  />
                  <img
                    src={right}
                    alt="Right hand"
                    className="absolute w-35 min-w-35 object-contain -bottom-5 -right-55"
                  />
                  <img
                    src={right_heart}
                    alt="Right heart"
                    className="absolute w-29 min-w-29 object-contain -bottom-9 -right-24"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex justify-center items-center mt-10">
              <div className="min-w-80 flex justify-between align-center gap-[30px]">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="bg-gray-500 text-white text-xl md:text-[36px] px-6 py-2 rounded-[20px] disabled:opacity-50 border-4 border-white cursor-pointer"
                >
                  НАЗАД
                </button>
                <span className="text-white font-bold my-auto text-xl md:text-[36px]">
                  {currentQuestion + 1}/{questions.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="bg-orange-500 text-white text-xl md:text-[36px] px-6 py-2 rounded-[20px] disabled:opacity-50 border-4 border-white cursor-pointer"
                >
                  {currentQuestion === questions.length - 1 ? 'РЕЗУЛЬТАТ' : 'ДАЛЕЕ'}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-30"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={option.id}
                  initial={{x: index % 2 === 0 ? -100 : 100, opacity: 0}}
                  animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                      delay: index * 0.1
                    }
                  }}
                  exit={{
                    x: index % 2 === 0 ? -100 : 100,
                    opacity: 0,
                    transition: {duration: 0.2}
                  }}
                  whileHover={{scale: 1.02}}
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full p-4 bg-white rounded-xl text-left shadow-lg transition-all text-[20px] lg:text-[28px] md:min-h-[116px]
      ${selectedOption === option.id ? 'border-4 border-black-500' : 'border-4 border-transparent'}`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold text-black">{option.id}</span>
                    <span className="text-gray-800">{option.text}</span>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};