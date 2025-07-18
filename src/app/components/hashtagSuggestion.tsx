import React, { useState, useEffect } from 'react';
import { TrendingUp, Hash, Loader2 } from 'lucide-react';

interface HashtagSuggestionsProps {
  query: string;
  onSelect: (hashtag: string) => void;
  onClose: () => void;
}

interface Hashtag {
  tag: string;
  posts: string;
  trending: boolean;
  category?: string;
}

// Simulated hashtag database
const allHashtags: Hashtag[] = [
  { tag: 'React', posts: '1.2M', trending: true, category: 'Technology' },
  { tag: 'TypeScript', posts: '856K', trending: false, category: 'Technology' },
  { tag: 'JavaScript', posts: '2.1M', trending: true, category: 'Technology' },
  { tag: 'WebDevelopment', posts: '934K', trending: false, category: 'Technology' },
  { tag: 'Frontend', posts: '567K', trending: true, category: 'Technology' },
  { tag: 'UI', posts: '445K', trending: false, category: 'Design' },
  { tag: 'Design', posts: '1.8M', trending: true, category: 'Design' },
  { tag: 'TailwindCSS', posts: '234K', trending: false, category: 'Technology' },
  { tag: 'NextJS', posts: '456K', trending: true, category: 'Technology' },
  { tag: 'Node', posts: '789K', trending: false, category: 'Technology' },
  { tag: 'Python', posts: '1.5M', trending: true, category: 'Technology' },
  { tag: 'AI', posts: '3.2M', trending: true, category: 'Technology' },
  { tag: 'MachineLearning', posts: '987K', trending: false, category: 'Technology' },
  { tag: 'Photography', posts: '2.8M', trending: true, category: 'Creative' },
  { tag: 'Travel', posts: '4.1M', trending: false, category: 'Lifestyle' },
  { tag: 'Food', posts: '5.3M', trending: true, category: 'Lifestyle' }
];

// Simulate API call with delay
const searchHashtags = async (query: string): Promise<Hashtag[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = allHashtags.filter(hashtag => 
        hashtag.tag.toLowerCase().includes(query.toLowerCase())
      );
      // Sort by trending first, then by post count
      const sorted = filtered.sort((a, b) => {
        if (a.trending && !b.trending) return -1;
        if (!a.trending && b.trending) return 1;
        return parseInt(b.posts.replace(/[KM]/g, '')) - parseInt(a.posts.replace(/[KM]/g, ''));
      });
      resolve(sorted.slice(0, 6)); // Limit to 6 results
    }, 200 + Math.random() * 300); // Random delay between 200-500ms
  });
};

export const HashtagSuggestions: React.FC<HashtagSuggestionsProps> = ({ query, onSelect, onClose }) => {
  const [hashtags, setHashtags] = useState<Hashtag[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchHashtags = async () => {
      if (query.length === 0) {
        setHashtags([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await searchHashtags(query);
        if (!isCancelled) {
          setHashtags(results);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError('Failed to load hashtags');
          setLoading(false);
        }
      }
    };

    // Debounce the search
    const timeoutId = setTimeout(fetchHashtags, 150);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [query]);

  // Don't show anything if query is empty
  if (query.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto min-w-[280px] max-w-[320px] mx-2 sm:mx-0">
      {loading && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
          <span className="ml-2 text-sm text-gray-500">Searching hashtags...</span>
        </div>
      )}
      
      {error && (
        <div className="px-4 py-3 text-sm text-red-600 text-center">
          {error}
        </div>
      )}
      
      {!loading && !error && hashtags.length === 0 && query.length > 0 && (
        <div className="px-4 py-3 text-sm text-gray-500 text-center">
          No hashtags found for "{query}"
        </div>
      )}
      
      {!loading && !error && hashtags.map((hashtag) => (
        <button
          key={hashtag.tag}
          onClick={() => onSelect(hashtag.tag)}
          className="w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-3 hover:bg-gray-50 transition-colors text-left"
        >
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full flex-shrink-0">
            <Hash className="w-4 h-4 text-blue-600" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="font-medium text-gray-900 truncate">#{hashtag.tag}</span>
              {hashtag.trending && (
                <TrendingUp className="w-4 h-4 text-orange-500 flex-shrink-0" />
              )}
            </div>
            <div className="text-xs text-gray-500 hidden sm:block">
              {hashtag.posts} posts
              {hashtag.category && (
                <span className="ml-1">• {hashtag.category}</span>
              )}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};