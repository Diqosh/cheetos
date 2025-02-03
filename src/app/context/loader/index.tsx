// types.ts
export interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  progress: number;
  totalImages: number;
  loadedImages: number;
}

// LoaderContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoaderContext = createContext<LoaderContextType>({
  isLoading: true,
  setIsLoading: () => {},
  progress: 0,
  totalImages: 0,
  loadedImages: 0
});

export const useLoader = (): LoaderContextType => useContext(LoaderContext);

interface LoaderProviderProps {
  children: ReactNode;
}

export const LoaderProvider: React.FC<LoaderProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [loadedImages, setLoadedImages] = useState<number>(0);
  const [totalImages, setTotalImages] = useState<number>(0);

  useEffect(() => {
    // Function to preload a single image
    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = reject;
      });
    };

    const findAllImages = (): string[] => {
      const images: HTMLImageElement[] = Array.from(document.getElementsByTagName('img'));
      const elements: Element[] = Array.from(document.getElementsByTagName('*'));

      const backgroundImages: string[] = elements
        .filter(element => {
          const style = window.getComputedStyle(element);
          return style.backgroundImage !== 'none' && style.backgroundImage !== '';
        })
        .map(element => {
          const style = window.getComputedStyle(element);
          return style.backgroundImage.slice(4, -1).replace(/['"]/g, '');
        });

      const allImages: string[] = [
        ...images.map(img => img.src),
        ...backgroundImages
      ];

      return [...new Set(allImages)]; // Remove duplicates
    };

    // Main function to load all images
    const loadAllImages = async (): Promise<void> => {
      try {
        const imageSources: string[] = findAllImages();
        setTotalImages(imageSources.length);

        // Load images in parallel but track progress
        await Promise.all(
          imageSources.map(async (src: string) => {
            await preloadImage(src);
            setLoadedImages(prev => {
              const newLoaded = prev + 1;
              setProgress((newLoaded / imageSources.length) * 100);
              return newLoaded;
            });
          })
        );

        // Add a small delay before hiding loader
        setTimeout(() => {
          setIsLoading(false);
        }, 500);

      } catch (error) {
        console.error('Error loading images:', error);
        setIsLoading(false); // Hide loader even if some images fail
      }
    };

    loadAllImages();
  }, []);

  return (
    <LoaderContext.Provider
      value={{
        isLoading,
        setIsLoading,
        progress,
        totalImages,
        loadedImages
      }}
    >
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen progress={progress} />}
      </AnimatePresence>
      {children}
    </LoaderContext.Provider>
  );
};

// LoadingScreen.tsx
interface LoadingScreenProps {
  progress: number;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ progress }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="w-64 flex flex-col items-center">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <motion.div
            className="bg-blue-600 h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 5 }}
          />
        </div>
        <p className="mt-2 text-gray-600">
          Loading... {Math.round(progress)}%
        </p>
      </div>
    </motion.div>
  );
};