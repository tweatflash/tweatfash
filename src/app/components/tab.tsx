"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from "react";
const Tabs = ({
  tabs,
  state,
  setState
}:{tabs:any[],state:any,setState:any}) => {
  const [activeTab, setActiveTab] = useState(0);

  
  const [showOverflow, setShowOverflow] = useState({ left: false, right: false });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const checkOverflow = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    
    setShowOverflow({
      left: scrollLeft > 0,
      right: scrollLeft < scrollWidth - clientWidth - 1
    });
  };

  const scrollTabs = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = 200;
    const newScrollLeft = direction === 'left' 
      ? container.scrollLeft - scrollAmount
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  return (
    <div className="flex sticky top-0 mt-4 flex-col justify-start items-center  overflow-x-hidden resize-none">
          {/* Left scroll button */}
          {showOverflow.left && (
            <button
              onClick={() => scrollTabs('left')}
              className="absolute left-0 z-20 h-10 w-14 bg-gradient-to-r from-[hsl(var(--background))] to-transparent flex items-center justify-start hover:from-[hsl(var(--accent))] transition-colors"
              aria-label="Scroll tabs left"
            >
              <ChevronLeft size={20} className="text-[--color] ms-2" />
            </button>
          )}

          <div 
            ref={scrollContainerRef}
            className="w-full border-b border-[hsl(var(--border-color))] relative overflow-x-auto flex flex-col h-10 no-scrollbar"
            onScroll={checkOverflow}
          >
            <div className="flex min-w-full h-full justify-start absolute m-auto w-fit">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setState(index)}
                  className={`flex-1 ms-3 relative rounded-md before:content-[''] z-10 whitespace-nowrap text-center text-sm text-nowrap py-1 px-3 h-fit ${
                    state === tab.index
                      ? "text-[--color]  bg-[hsl(var(--accent))] "
                      : "text-[#777777] border-transparent"
                  }`}
                >
                  {state === tab.index && <div className='w-full absolute -bottom-[12px] h-[2px] bg-black dark:bg-white left-0' />}
                  {tab.action}
                </button>
              ))}
            </div>
          </div>

          {/* Right scroll button */}
          {showOverflow.right && (
            <button
              onClick={() => scrollTabs('right')}
              className="absolute z-20 right-0 h-10 w-14 bg-gradient-to-r hover:from-[hsl(var(--accent)) from-transparent to-[hsl(var(--background))] flex items-center justify-end transition-colors"
              aria-label="Scroll tabs right"
            >
              <ChevronRight size={20} className=" me-2 text-[--color]" />
            </button>
          )}
        </div>
  );
};

export default Tabs;