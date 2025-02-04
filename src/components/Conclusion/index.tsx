import { motion } from 'framer-motion';
import cheetosLogo from '@/components/Main/assets/logo.png';
import chesterImage from "@/components/Main/assets/heart.png";

export const Credits = () => {
  const credits = [
    {role: 'Директор по рекламе', name: 'Лейла Балтиева'},
    {role: 'Директор по спецпроектам', name: 'Константин Герлиц'},
    {role: 'Менеджер по рекламе', name: 'Мурад Джумагельдиев'},
    {role: 'Креативный менеджер', name: 'Лина Тажетдинова'},
    {role: 'Продакт менеджер', name: 'Елена Васярина'},
    {role: 'Дизайнер', name: 'Альшир Мажитов'},
    {role: 'Front-End Dev', name: 'Dimashka'},
    {role: 'Редактор', name: 'Айгерим Калиахарова'},
  ];

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-2/3  w-full">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 lg:gap-20">
          {/* Left Section with Title and Logos */}
          <div className="flex flex-col items-center lg:items-start">
            <div className={"flex lg:hidden"}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-60 mb-10"
              >
                <img
                  src={cheetosLogo}
                  alt="Cheetos Logo"
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </div>
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl md:text-6xl font-bold mb-6 text-[#FF4500] text-center lg:text-left"
            >
              НАД ПРОЕКТОМ РАБОТАЛИ:
            </motion.h2>

            {/* Logo Container */}
            <div className="hidden lg:flex items-center gap-4 md:gap-8">
              {/* Heart Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-24 md:w-32"
              >
                <img
                  src={chesterImage}
                  alt="Chester Heart"
                  className="w-full h-auto object-contain"
                />
              </motion.div>

              {/* Cheetos Logo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-32 md:w-40"
              >
                <img
                  src={cheetosLogo}
                  alt="Cheetos Logo"
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </div>
          </div>

          {/* Credits List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md lg:max-w-lg"
          >
            {credits.map((credit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="mb-4 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-center sm:text-left"
              >
                <span className="text-sm md:text-base text-gray-600 font-medium whitespace-nowrap">
                  {credit.role}
                </span>
                <span className="text-base md:text-lg font-semibold">
                  {credit.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Credits;