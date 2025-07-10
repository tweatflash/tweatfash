import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from 'lucide-react';


interface MediaModalProps {
  media: any[];
  currentIndex: number;
  onClose: () => void;
}

const MediaModal: React.FC<MediaModalProps> = ({ media, currentIndex, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(currentIndex);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const currentMedia = media[currentIdx];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (currentIdx > 0) {
            setCurrentIdx(currentIdx - 1);
          }
          break;
        case 'ArrowRight':
          if (currentIdx < media.length - 1) {
            setCurrentIdx(currentIdx + 1);
          }
          break;
        case ' ':
          e.preventDefault();
          if (currentMedia.type === 'video' && videoRef) {
            if (isPlaying) {
              videoRef.pause();
            } else {
              videoRef.play();
            }
            setIsPlaying(!isPlaying);
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx, media.length, onClose, isPlaying, videoRef, currentMedia.type]);

  useEffect(() => {
    setIsPlaying(false);
  }, [currentIdx]);

  const goToPrevious = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const goToNext = () => {
    if (currentIdx < media.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const togglePlayPause = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef) {
      videoRef.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoRef = (ref: HTMLVideoElement | null) => {
    setVideoRef(ref);
    if (ref) {
      ref.muted = isMuted;
      ref.addEventListener('play', () => setIsPlaying(true));
      ref.addEventListener('pause', () => setIsPlaying(false));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 left-4 z-10 p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Media counter */}
      <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/60 rounded-full text-white text-sm">
        {currentIdx + 1} / {media.length}
      </div>

      {/* Previous button */}
      {currentIdx > 0 && (
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
        >
          <ChevronLeft className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Next button */}
      {currentIdx < media.length - 1 && (
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
        >
          <ChevronRight className="w-8 h-8 text-white" />
        </button>
      )}

      {/* Media content */}
      <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center p-4">
        {currentMedia.type === 'image' ? (
          <img
            src={currentMedia.url}
            alt={currentMedia.alt}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
        ) : (
          <div className="relative">
            <video
              ref={handleVideoRef}
              src={currentMedia.url}
              className="max-w-full max-h-full object-contain rounded-lg"
              loop
              controls={false}
              onClick={togglePlayPause}
            />
            
            {/* Video controls */}
            <div className="absolute bottom-4 left-4 flex items-center space-x-2">
              <button
                onClick={togglePlayPause}
                className="p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white" />
                )}
              </button>
              
              <button
                onClick={toggleMute}
                className="p-2 bg-black/60 rounded-full hover:bg-black/80 transition-colors"
              >
                {isMuted ? (
                  <VolumeX className="w-5 h-5 text-white" />
                ) : (
                  <Volume2 className="w-5 h-5 text-white" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation dots */}
      {media.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {media.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIdx(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIdx ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MediaModal;