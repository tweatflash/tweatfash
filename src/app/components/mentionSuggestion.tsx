import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';

interface MentionSuggestionsProps {
  query: string;
  onSelect: (username: string) => void;
  onClose: () => void;
}

interface User {
  username: string;
  name: string;
  avatar: string;
  followers: string;
  verified?: boolean;
}

// Simulated user database
const allUsers: User[] = [
  {
    username: 'sarahchen',
    name: 'Sarah Chen',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    followers: '1.2K',
    verified: true
  },
  {
    username: 'alexdev',
    name: 'Alex Rodriguez',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    followers: '856'
  },
  {
    username: 'mikejones',
    name: 'Mike Jones',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    followers: '2.1K'
  },
  {
    username: 'jennywang',
    name: 'Jenny Wang',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    followers: '934',
    verified: true
  },
  {
    username: 'tomsmith',
    name: 'Tom Smith',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    followers: '567'
  },
  {
    username: 'emilydavis',
    name: 'Emily Davis',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    followers: '3.4K',
    verified: true
  },
  {
    username: 'davidlee',
    name: 'David Lee',
    avatar: 'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    followers: '1.8K'
  },
  {
    username: 'lisapark',
    name: 'Lisa Park',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
    followers: '2.7K'
  }
];

// Simulate API call with delay
const searchUsers = async (query: string): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = allUsers.filter(user => 
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.name.toLowerCase().includes(query.toLowerCase())
      );
      resolve(filtered.slice(0, 5)); // Limit to 5 results
    }, 300 + Math.random() * 200); // Random delay between 300-500ms
  });
};

export const MentionSuggestions: React.FC<MentionSuggestionsProps> = ({ query, onSelect, onClose }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    const fetchUsers = async () => {
      if (query.length === 0) {
        setUsers([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const results = await searchUsers(query);
        if (!isCancelled) {
          setUsers(results);
          setLoading(false);
        }
      } catch (err) {
        if (!isCancelled) {
          setError('Failed to load users');
          setLoading(false);
        }
      }
    };

    // Debounce the search
    const timeoutId = setTimeout(fetchUsers, 150);

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
          <span className="ml-2 text-sm text-gray-500">Searching users...</span>
        </div>
      )}
      
      {error && (
        <div className="px-4 py-3 text-sm text-red-600 text-center">
          {error}
        </div>
      )}
      
      {!loading && !error && users.length === 0 && query.length > 0 && (
        <div className="px-4 py-3 text-sm text-gray-500 text-center">
          No users found for "{query}"
        </div>
      )}
      
      {!loading && !error && users.map((user) => (
        <button
          key={user.username}
          onClick={() => onSelect(user.username)}
          className="w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-3 hover:bg-gray-50 transition-colors text-left"
        >
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <span className="font-medium text-gray-900 truncate">{user.name}</span>
              {user.verified && (
                <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
              <span className="text-gray-500 text-sm truncate">@{user.username}</span>
            </div>
            <div className="text-xs text-gray-500 hidden sm:block">{user.followers} followers</div>
          </div>
        </button>
      ))}
    </div>
  );
};