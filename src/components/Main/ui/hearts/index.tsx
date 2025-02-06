import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import heart from "@/components/Main/assets/heart.png";

const baseHeartConfig = [
  // Top left small heart
  {
    x: -320,
    y: -150,
    xMobile: 250,
    yMobile: -400,
    rotate: 45,
    size: 'w-8 sm:w-10 md:w-12 lg:w-16 xl:w-20',
    delay: 2.2
  },
  // Top right medium heart
  {
    x: 120,
    y: -180,
    xMobile: 250,
    yMobile: -200,
    rotate: -30,
    size: 'w-12 sm:w-14 md:w-16 lg:w-20 xl:w-24',
    delay: 2.4
  },
  // Bottom left medium heart
  {
    x: -240,
    y: 60,
    xMobile: 220,
    yMobile: -140,
    rotate: 60,
    size: 'w-10 sm:w-12 md:w-16 lg:w-20 xl:w-24',
    delay: 2.6
  },
  // Center right large heart
  {
    x: 160,
    y: -140,
    xMobile: -200,
    yMobile: -180,
    rotate: 45,
    size: 'w-16 sm:w-20 md:w-24 lg:w-32 xl:w-40',
    delay: 2.3
  },
  // Top left medium blurred heart
  {
    x: 220,
    y: -180,
    xMobile: -200,
    yMobile: -180,
    rotate: 30,
    size: 'w-8 sm:w-10 md:w-14 lg:w-16 xl:w-14',
    delay: 2.5
  },
  // Bottom right medium heart
  {
    x: 215,
    y: 40,
    xMobile: -300,
    yMobile: -130,
    rotate: -25,
    size: 'w-10 sm:w-12 md:w-16 lg:w-20 xl:w-24',
    delay: 2.7
  }
];

export const HeartAnimation = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
  console.log(isMobile)

  const getScaleFactor = () => {
    if (isMobile) return 1.8;
    if (isTablet) return 1.9;
    return 2;
  };

  const blurredHearts = [1, 4];
  const scaleFactor = getScaleFactor();

  return (
    <div className="absolute inset-0 overflow-hidden">
      {baseHeartConfig.map((config, index) => {
        const x = isMobile ? config.xMobile : config.x;
        const y = isMobile ? config.yMobile : config.y;
        const scaledX = x * scaleFactor;
        const scaledY = y * scaleFactor;

        return (
          <motion.div
            key={index}
            className={`absolute left-1/2 top-1/2 ${config.size} -translate-x-1/2 -translate-y-1/2
              ${blurredHearts.includes(index) ? 'backdrop-blur-[1px]' : ''}`}
            initial={{
              scale: 0,
              opacity: 0,
              x: '0%',
              y: '0%',
              rotate: 0
            }}
            animate={{
              scale: 1,
              opacity: 1,
              x: `${scaledX}%`,
              y: `${scaledY}%`,
              rotate: [
                config.rotate,           // Start at initial rotation
                config.rotate + 10,      // Rotate +10 degrees
                config.rotate - 10,      // Rotate -10 degrees
                config.rotate            // Return to initial rotation
              ]
            }}
            transition={{
              delay: config.delay,
              duration: 1,
              ease: "easeOut",
              opacity: {
                delay: config.delay,
                duration: 0.3
              },
              scale: {
                duration: 2
              },
              rotate: {
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                times: [0, 0.33, 0.66, 1]
              }
            }}
          >
            <img
              src={heart}
              alt="Heart"
              className={`w-full h-full object-contain 
                ${blurredHearts.includes(index) ? 'opacity-60' : 'opacity-90'}`}
              style={{
                filter: blurredHearts.includes(index) ? 'blur(1px)' : 'none'
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default HeartAnimation;