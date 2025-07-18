import React, { useState, useEffect, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt?: string;
  poster?: string; // For video poster
}

interface MediaSliderProps {
  isOpen: boolean;
  onClose: () => void;
  mediaItems: MediaItem[];
  initialIndex?: number;
}

export default function MediaSlider({ 
  isOpen, 
  onClose, 
  mediaItems, 
  initialIndex = 0 
}: MediaSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const currentMedia = mediaItems[currentIndex];

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-95" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full items-center justify-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full h-screen flex flex-col bg-black">
                {/* Header with close button */}
                <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-6">
                  <div className="flex-1" />
                  <button
                    onClick={onClose}
                    className="text-white hover:text-gray-300 transition-colors duration-200 p-2 rounded-full hover:bg-white/10"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Main content area */}
                <div className="flex-1 flex items-center justify-center relative overflow-hidden">
                  {/* Navigation arrows */}
                  {mediaItems.length > 1 && (
                    <>
                      <button
                        onClick={goToPrevious}
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200 p-3 rounded-full hover:bg-white/10"
                      >
                        <ChevronLeft size={32} />
                      </button>
                      <button
                        onClick={goToNext}
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-colors duration-200 p-3 rounded-full hover:bg-white/10"
                      >
                        <ChevronRight size={32} />
                      </button>
                    </>
                  )}

                  {/* Media container */}
                  <div className="w-full h-full flex items-center justify-center px-20">
                    <div className="relative w-full h-full max-w-7xl max-h-full">
                      <Transition
                        key={currentIndex}
                        show={true}
                        enter="transition-all duration-500 ease-out"
                        enterFrom="opacity-0 transform scale-95"
                        enterTo="opacity-100 transform scale-100"
                        leave="transition-all duration-300 ease-in"
                        leaveFrom="opacity-100 transform scale-100"
                        leaveTo="opacity-0 transform scale-95"
                      >
                        {currentMedia?.type === 'image' ? (
                          <img
                            src={currentMedia.src}
                            alt={currentMedia.alt || `Media ${currentIndex + 1}`}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <video
                            ref={videoRef}
                            src={currentMedia?.src}
                            poster={currentMedia?.poster}
                            controls
                            className="w-full h-full object-contain"
                            autoPlay
                          />
                        )}
                      </Transition>
                    </div>
                  </div>
                </div>

                {/* Carousel indicators */}
                {mediaItems.length > 1 && (
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
                    {mediaItems.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? 'bg-white scale-110'
                            : 'bg-white/50 hover:bg-white/75'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Media counter */}
                <div className="absolute bottom-8 right-8 text-white text-sm font-medium">
                  {currentIndex + 1} / {mediaItems.length}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}