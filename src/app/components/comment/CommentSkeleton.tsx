import React from 'react';

const CommentSkeleton: React.FC = () => {
  return (
    <div className="p-4 animate-pulse">
      <div className="flex space-x-3">
        <div className="w-10 h-10 bg-[hsl(var(--accent))] rounded-full flex-shrink-0"></div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-2">
            <div className="h-4 bg-[hsl(var(--accent))] rounded w-20"></div>
            <div className="h-3 bg-[hsl(var(--accent))] rounded w-16"></div>
            <div className="h-3 bg-[hsl(var(--accent))] rounded w-12"></div>
          </div>
          <div className="space-y-2">
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
    </div>
  );
};

export default CommentSkeleton;