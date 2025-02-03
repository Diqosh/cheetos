import {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import left from './assets/left.png';
import right from './assets/right.png';
import left_heart from './assets/left_heart.png';
import right_heart from './assets/right_heart.png';
import {useMediaQuery} from "react-responsive";
import {Answer, Question} from "@/components/Test/models/types.ts";
import bg from "./assets/bg.png";


type Props = {
  answers: Answer[];
  setAnswers: (answers: Answer[]) => void;
}

export const questions: Question[] = [
  {
    id: 1,
    text: "ЧТО ТЫ ПЛАНИРУЕШЬ <br/> ДЕЛАТЬ В ДЕНЬ </br> СВЯТОГО ВАЛЕНТИНА?",
    options: [
      {id: 'A', text: "Романтический ужин в ресторане с любимым человеком"},
      {id: 'B', text: "Вечеринка с друзьями/подругами — одиночество не для меня!"},
      {id: 'C', text: "Это обычный день, праздновать не буду"},
      {id: 'D', text: "Закажу пиццу и посмотрю любимый сериал дома"}
    ]
  },
  {
    id: 2,
    text: "КАКОЙ ПОДАРОК ТЫ БЫ </br ПРЕДПОЧЕЛ/ПРЕДПОЧЛА > ПОЛУЧИТЬ В ЭТОТ ДЕНЬ?",
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
    options: [
      {id: 'A', text: "Классическая открытка с признанием в любви"},
      {id: 'B', text: "Мем или шуточное послание для поднятия настроения"},
      {id: 'C', text: "Что-то уникальное, например, книга о любви"},
      {id: 'D', text: "Валентинки я не собираю! Мне достаточно смс"}
    ]
  },
  {
    id: 5,
    text: "ПРИЗНАВАЛСЯ/ПРИЗНАВАЛАСЬ ЛИ </br> ТЫ В ЛЮБВИ СВОЕМУ </br> ПАРТНЕРУ КОГДА-НИБУДЬ?",
    options: [
      {id: 'A', text: "Конечно! И не один раз"},
      {id: 'B', text: "Если я испытываю чувства, то мне несложно признаться"},
      {id: 'C', text: "Нет, это слишком неловко"},
      {id: 'D', text: "Буду ждать подходящего момента!"}
    ]
  }
];


export const Test = ({answers, setAnswers}: Props) => {
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

  // Animation variants for the options
  const optionVariants = {
    hidden: {
      scale: 0,
      opacity: 0
    },
    visible: (index: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: index * 0.15,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    exit: {
      scale: 0,
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <div className="min-h-screen w-full relative p-4 pt-30">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{backgroundImage: `url(${bg})`}}
      />
      <div className="container mx-auto max-w-3xl pt-16 relative">
        <div>
          <div className="text-center mb-8">
            <div className="relative flex justify-center items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  className="relative"
                  key={currentQuestion}
                  initial={{width: 0}}
                  animate={{width: (isHideHands ? "100%" : "50%"), textWrap: "nowrap"}}
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
                    className="text-2xl font-bold text-black bg-white py-2 px-4 rounded-lg overflow-hidden nowrap"
                    dangerouslySetInnerHTML={{__html: questions[currentQuestion].text}}
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
              <div className="min-w-80 flex justify-between align-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="bg-gray-500 text-white px-6 py-2 rounded-full disabled:opacity-50 border-4 border-white cursor-pointer"
                >
                  НАЗАД
                </button>
                <span className="text-white font-bold my-auto">
                  {currentQuestion + 1}/{questions.length}
                </span>
                <button
                  onClick={handleNext}
                  disabled={!selectedOption}
                  className="bg-orange-500 text-white px-6 py-2 rounded-full disabled:opacity-50 border-4 border-white cursor-pointer"
                >
                  {currentQuestion === questions.length - 1 ? 'РЕЗУЛЬТАТ' : 'ДАЛЕЕ'}
                </button>
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4"
            >
              {questions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={option.id}
                  variants={optionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={index}
                  onClick={() => setSelectedOption(option.id)}
                  className={`w-full p-4 bg-white rounded-xl text-left shadow-lg transition-all
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