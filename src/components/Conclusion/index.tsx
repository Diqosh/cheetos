import { motion } from 'framer-motion';
import cheetosLogo from '@/components/Main/assets/logo.png';

export const Credits = () => {
  const credits = [
    { role: 'Директор по рекламе', name: 'Лейла Балтиева' },
    { role: 'Директор по спецпроектам', name: 'Константин Герлиц' },
    { role: 'Менеджер по рекламе', name: 'Мурад Джумагельдиев' },
    { role: 'Креативный менеджер', name: 'Лина Тажетдинова' },
    { role: 'Продакт менеджер', name: 'Елена Васярина' },
    { role: 'Дизайнер', name: 'Альшир Мажитов' },
    { role: 'Front-End Dev', name: '-' },
    { role: 'Редактор', name: 'Айгерим Калиахарова' },
  ];

  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  const itemVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen relative">

      <div className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="max-w-3xl mx-auto bg-white rounded-xl p-8 shadow-lg border border-gray-100"
        >
          <motion.h2
            className="text-2xl font-bold mb-6 text-[#FF4500]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            НАД ПРОЕКТОМ РАБОТАЛИ:
          </motion.h2>

          <div className="flex items-start gap-8">
            {/* Logo section */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-32 flex-shrink-0"
            >
              <img
                src={cheetosLogo}
                alt="Cheetos Logo"
                className="w-full h-auto"
              />
            </motion.div>

            {/* Credits list */}
            <div className="flex-grow">
              {credits.map((credit, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center mb-2 last:mb-0"
                >
                  <span className="text-gray-600">{credit.role}</span>
                  <span className="font-medium">{credit.name}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

