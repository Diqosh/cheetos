import {useEffect, useLayoutEffect, useState} from 'react';
import bg from "@/assets/images/background.jpg";
import "@/assets/css/style.css";
import { Main } from "@/components/Main/ui";
import { ForWhom } from "@/components/ForWhom";
import { TestInto } from "@/components/TestIntro";
import { LoaderProvider } from "@/app/context/loader";
import {Test} from "@/components/Test";
import {Answer} from "@/components/Test/models/types.ts";
import {ValentineQuiz} from "@/components/TestResult";
import TelegramStickers from "@/components/StickerPack";
import {Credits} from "@/components/Conclusion";

const style = document.createElement('style');
style.textContent = `
  html {
    scroll-behavior: smooth;
  }
  
  * {
    scroll-behavior: smooth;
  }
`;
document.head.appendChild(style);

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

function App() {

  // Use useLayoutEffect to handle scroll before paint
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      window.scrollTo(0, 0);
    };

    // Handle scroll on route changes
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('load', handleLoad);
    window.addEventListener('popstate', handleRouteChange);

    // Ensure scroll is at top even after all content loads
    const timeoutId = setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);

    return () => {
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('popstate', handleRouteChange);
      clearTimeout(timeoutId);
    };
  }, []);
  const [answers, setAnswers] = useState<Answer[]>([]);


  return (
    <LoaderProvider>
      <div
        style={{
          minHeight: '100vh',
          backgroundImage: `url(${bg})`,
          backgroundSize: 'cover',
          position: 'relative',
          top: 0,
          left: 0
          // maxWidth: "1680px"
        }}
        className="overflow-x-hidden w-full"
      >
        <div className="relative w-full">
          <Main />
          <ForWhom />
          <TestInto />
          <Test answers={answers} setAnswers={setAnswers}/>
          <ValentineQuiz answers={answers}/>
          <TelegramStickers/>
          <Credits/>
        </div>
      </div>
    </LoaderProvider>
  );
}

export default App;