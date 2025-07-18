import React, { useEffect, useRef } from 'react';

type Props = {
  onVisible: () => void;
};

const CommentSkeleton: React.FC<Props> = ({ onVisible }) => {
  const skeletonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onVisible(); // Run your function when visible
        }
      },
      {
        threshold: 0.1, // 10% visible triggers it
      }
    );

    if (skeletonRef.current) {
      observer.observe(skeletonRef.current);
    }

    return () => {
      if (skeletonRef.current) {
        observer.unobserve(skeletonRef.current);
      }
    };
  }, [onVisible]);

  const loaderarray = [1, 2, 3, 4, 5];

  return (
    <div ref={skeletonRef} className="animate-pulse">
      {loaderarray.map((item, index) => (
        <div
          key={index}
          className="flex space-x-3 border-b border-[hsl(var(--border-color))] p-4 last:border-none last:border-b-0"
        >
          <div className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex-shrink-0"></div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 mb-5">
              <div className="h-4 bg-[hsl(var(--accent))] rounded w-20"></div>
              <div className="h-3 bg-[hsl(var(--accent))] rounded w-16"></div>
              <div className="h-3 bg-[hsl(var(--accent))] rounded w-12"></div>
            </div>
            <div className="space-y-3">
              <div className="h-4 bg-[hsl(var(--accent))] rounded w-full"></div>
              <div className="h-4 bg-[hsl(var(--accent))] rounded w-3/4"></div>
            </div>
            <div className="flex items-center space-x-4 mt-3">
              <div className="h-3 bg-[hsl(var(--accent))] rounded w-8"></div>
              <div className="h-3 bg-[hsl(var(--accent))] rounded w-12"></div>
              <div className="h-3 bg-[hsl(var(--accent))] rounded w-10"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentSkeleton;