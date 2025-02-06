import { motion } from 'framer-motion';
import cheetosLogo from '@/components/Main/assets/logo.png';
import chesterImage from "@/components/Main/assets/heart.png";

export const Credits = () => {
  const credits = [
    {role: 'Директор по рекламе', name: 'Лейла Балтиева'},
    {role: 'Директор по спецпроектам', name: 'Константин Герлих'},
    {role: 'Менеджер по рекламе', name: 'Мурад Джумагельдыев'},
    {role: 'Креативный менеджер', name: 'Лана Тажетдинова'},
    {role: 'Продакт менеджер', name: 'Елена Басария'},
    {role: 'Дизайнер', name: 'Алишер Мажитов'},
    {role: 'Front-End Dev', name: 'Тлеужанулы Динмухаммед'},
    {role: 'Редактор', name: 'Айгерим Кайназарова'},
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-2/3 w-full max-w-[1680px] mx-auto">
      <div className="container mx-auto py-8 md:py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6 md:gap-8 lg:gap-16 xl:gap-20 px-10">
          {/* Left Section */}
          <div className="flex flex-col items-center lg:items-start w-full lg:w-auto">
            {/* Mobile Logo */}
            <div className="flex lg:hidden mb-6 md:mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-40 sm:w-48 md:w-56"
              >
                <img
                  src={cheetosLogo}
                  alt="Cheetos Logo"
                  className="w-full h-auto object-contain"
                />
              </motion.div>
            </div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 md:mb-6 lg:mb-8 text-black text-center lg:text-right"
            >
              НАД ПРОЕКТОМ <br/>РАБОТАЛИ:
            </motion.h2>

            {/* Desktop Logos */}
            <div className="hidden lg:flex items-center gap-4 md:gap-6 lg:gap-8 justify-between w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-16 md:w-20 lg:w-[200px] xl:w-[246px]"
              >
                <img
                  src={chesterImage}
                  alt="Chester Heart"
                  className="w-full h-auto object-contain"
                />
              </motion.div>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="w-24 md:w-28 lg:w-[200px] xl:w-[246px]"
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
            className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl"
          >
            {credits.map((credit, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="mb-3 sm:mb-4 md:mb-5 flex flex-col sm:flex-row items-center sm:items-center gap-1 sm:gap-3 md:gap-4 text-center sm:text-left"
              >
                <span className="text-lg lg:text-xl xl:text-2xl font-medium whitespace-nowrap">
                  {credit.role}
                </span>
                <span className="text-lg lg:text-xl xl:text-2xl font-semibold whitespace-nowrap">
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