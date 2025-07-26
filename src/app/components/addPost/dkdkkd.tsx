import React, { useState } from 'react';
import { X, Image, Smile, ChevronDown, Users, Globe, Check, Sparkles, Heart, Zap } from 'lucide-react';

interface Community {
  id: string;
  name: string;
  color: string;
  memberCount: number;
  isActive?: boolean;
}

interface ComposePostProps {
  onClose: () => void;
  communities?: Community[];
}

const ComposePost: React.FC<ComposePostProps> = ({ onClose, communities = [] }) => {
  const [postContent, setPostContent] = useState('');
  const [selectedOption, setSelectedOption] = useState<string>('everyone');
  const [replyPermission, setReplyPermission] = useState('everyone');
  const [showAudienceDropdown, setShowAudienceDropdown] = useState(false);
  const [showReplyDropdown, setShowReplyDropdown] = useState(false);
    const [h,setH]=useState(true)
  // Create audience options with Everyone first, then communities
  const audienceOptions = [
    {
      id: 'everyone',
      name: 'Everyone',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      description: 'Anyone on the platform can see this post',
      memberCount: 0,
      isSpecial: true
    },
    ...communities.slice(0, 5).map(community => ({
      ...community,
      icon: Users,
      description: `${community.memberCount.toLocaleString()} members`,
      isSpecial: false
    }))
  ];

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    setShowAudienceDropdown(false);
  };

  const getAudienceText = () => {
    if (selectedOption === 'everyone') {
      return 'Everyone';
    }
    const selectedCommunity = communities.find(c => c.id === selectedOption);
    return selectedCommunity ? selectedCommunity.name : 'Select audience';
  };

  const getAudienceIcon = () => {
    return selectedOption === 'everyone' ? Globe : Users;
  };

  return (
    <div className="mobile:rounded-2xl overflow-x-hidden relative max-h-full flex flex-col gap-4 pb-4 mobile:bg-[hsl(var(--background))] bg-gradient-to-br ">
      {/* Header */}
      <div className="text-lg flex flex-col sticky top-0 border-b border-[hsl(var(--border-color))] bg-[hsl(var(--background))] backdrop-blur-sm">
        <div className="h-[55px] flex flex-row justify-between gap-1">
          <div className="aspect-square h-[55px] p-2">
            <button 
              onClick={onClose}
              className="h-full aspect-square hover:bg-red-50 hover:text-red-500 rounded-full flex justify-center items-center transition-all duration-200 group"
            >
              <X className="size-5 text-[--color] group-hover:scale-110 transition-transform" />
            </button>
          </div>
          <div className="h-full flex flex-1 justify-between items-center pr-4">
            <div className="flex items-center gap-2">
              <Sparkles className="size-5 text-purple-500" />
              <p className="text-[--color] text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">Compose</p>
            </div>
            <div className="flex flex-row gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-[hsl(var(--accent))] rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md">
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-h-full overflow-y-scroll no-scrollbar">
        <div className="flex flex-col relative border-b border-solid border-[hsl(var(--border-color))] last:border-none last:border-b-0">
          <div className="flex flex-col w-full">
            <div className="gap-3 flex item-start w-full px-4">
              <div className="relative h-auto flex-1 flex flex-col gap-3">
                <div className="flex flex-col pb-3 gap-4">
                  <form className="space-y-3">
                    <div className="flex space-x-3">
                      <img 
                        src="https://res.cloudinary.com/dlsngc9fb/image/upload/v1753393156/profile-images/tmp-1-1753393156381_oogzqq.jpg" 
                        alt="Profile" 
                        className="rounded-full border border-[hsl(var(--border-color))] object-cover size-9" 
                        width="36" 
                        height="36"
                      />
                      <div className="flex-1 flex-col flex gap-5">
                        <div className="relative">
                          <div 
                            contentEditable="true"
                            className="w-full break-all break-words whitespace-pre-wrap min-h-fit text-base sm:text-lg text-[--color] outline-none resize-none overflow-y-auto max-h-60  rounded-lg transition-all duration-200"
                            data-placeholder="What's on your mind?"
                            style={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}
                            onInput={(e) => setPostContent(e.currentTarget.textContent || '')}
                            onFocus={()=>setH(false)}
                          />
                          {postContent === '' && (
                            <div className="absolute top-0 left-0 text-[#727272] ]pointer-events-none flex items-center gap-2">

                              What's on your mind?
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </form>

                  {/* Action Bar */}
                  <div className={`pb-4 sticky bottom-0 ${h? "hidden" :"flex"}  backdrop-blur-sm items-center justify-between w-full pt-3`}>
                    <div className="flex items-center">
                      <label htmlFor="commentFile" className="p-2 rounded-full hover:bg-blue-100 text-blue-500 hover:text-blue-600 transition-all duration-200 cursor-pointer hover:scale-110 group">
                        <Image className="size-[18px] group-hover:rotate-12 transition-transform" />
                        <input 
                          id="commentFile" 
                          className="sr-only" 
                          accept="image/jpeg,image/png,image/webp,image/gif,video/mp4" 
                          multiple 
                          type="file"
                        />
                      </label>
                      <button type="button" className="p-2 rounded-full hover:bg-yellow-100 text-yellow-500 hover:text-yellow-600 transition-all duration-200 hover:scale-110 group">
                        <Smile className="size-[18px] group-hover:rotate-12 transition-transform" />
                      </button>
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                      <button 
                        type="submit" 
                        className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 ${
                          postContent.trim() 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 cursor-pointer' 
                            : 'bg-[hsl(var(--accent))] cursor-not-allowed'
                        }`}
                        disabled={!postContent.trim()}
                      >
                        {postContent.trim() && <Zap className="size-4" />}
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Controls */}
      <div className="w-full sticky bottom-0 backdrop-blur-sm">
        <div className="w-full flex px-4">
          <div className="w-full">
            <div className="pb-4 flex flex-col gap-3">
              
              {/* Audience Selector */}
              <div className="flex gap-3 items-center text-[#727272] text-sm">
                <span className="text-sm font-medium flex items-center gap-1">
                  <Users className="size-4 text-purple-500" />
                  Post to:
                </span>
                <div className="relative">
                  {/* Current Selection Button */}
                  <button
                    className="flex outline-none items-center justify-between gap-3 w-fit cursor-pointer rounded-xl bg-gradient-to-r bg-[hsl(var(--accent))] text-left sm:text-sm px-4 h-[38px] text-[#727272] transition-all duration-200 min-w-[160px] shadow-sm hover:shadow-md border border-[hsl(var(--border-color))]"
                    onClick={() => setShowAudienceDropdown(!showAudienceDropdown)}
                  >
                    <span className="flex items-center gap-2">
                      {selectedOption === 'everyone' ? (
                        <Globe className="size-4 text-blue-500" />
                      ) : (
                        <div className={`size-4 rounded-full bg-gradient-to-br ${communities.find(c => c.id === selectedOption)?.color || 'from-gray-400 to-gray-500'}`} />
                      )}
                      <span className="block truncate text-sm font-medium">{getAudienceText()}</span>
                    </span>
                    <ChevronDown className={`size-4 transition-transform duration-200 ${showAudienceDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {showAudienceDropdown && (
                    <div className="absolute bottom-full mb-2 left-0 w-80 bg-white border border-gray-200 rounded-2xl shadow-2xl z-50 overflow-hidden backdrop-blur-sm">
                      <div className="p-3">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">Choose your audience</div>
                        <div className="space-y-1">
                          {audienceOptions.map((option) => {
                            const isSelected = selectedOption === option.id;
                            const IconComponent = option.icon;
                            
                            return (
                              <button
                                key={option.id}
                                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                                  isSelected 
                                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-md' 
                                    : 'hover:bg-gray-50 border-2 border-transparent'
                                }`}
                                onClick={() => handleOptionSelect(option.id)}
                              >
                                {option.isSpecial ? (
                                  <div className="size-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                                    <IconComponent className="size-4 text-white" />
                                  </div>
                                ) : (
                                  <div className={`size-8 rounded-full bg-gradient-to-br ${option.color} flex items-center justify-center text-white text-sm font-bold shadow-lg`}>
                                    {option.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                                <div className="flex-1 text-left">
                                  <div className="text-sm font-semibold text-gray-800">{option.name}</div>
                                  <div className="text-xs text-gray-500">{option.description}</div>
                                </div>
                                {isSelected && (
                                  <div className="size-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                                    <Check className="size-3 text-white" />
                                  </div>
                                )}
                                {option.isActive && !isSelected && (
                                  <div className="size-2 rounded-full bg-green-400 shadow-sm" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Reply Permission Selector */}
              <div className="flex gap-3 items-center text-[#727272] text-sm">
                <span className="text-sm font-medium  flex items-center gap-1">
                  <Smile className="size-4 text-green-500" />
                  Who can reply:
                </span>
                <div className="relative">
                  <button
                    className="flex outline-none items-center justify-between gap-3 w-fit cursor-pointer rounded-xl bg-[hsl(var(--accent))] text-left sm:text-sm px-4 h-[38px]  transition-all duration-200 shadow-sm hover:shadow-md border border-[hsl(var(--border-color))]"
                    onClick={() => setShowReplyDropdown(!showReplyDropdown)}
                  >
                    <span className="block truncate text-sm font-medium">
                      {replyPermission === 'everyone' ? 'Everyone can reply' : 
                       replyPermission === 'following' ? 'People you follow' : 
                       'Mentioned only'}
                    </span>
                    <ChevronDown className={`size-4 transition-transform duration-200 ${showReplyDropdown ? 'rotate-180' : ''}`} />
                  </button>

                  {showReplyDropdown && (
                    <div className="absolute bottom-full mb-2 left-0 w-56 bg-[hsl(var(--background))] border border-[hsl(var(--border-color))] rounded-2xl shadow-2xl z-50 overflow-hidden">
                      <div className="p-2">
                        {['everyone', 'following', 'mentioned'].map((option) => (
                          <button
                            key={option}
                            className={`w-full text-left px-4 py-3 text-sm rounded-xl dark:hover:bg-white/5 hover:bg-black/5 transition-all duration-200 ${
                              replyPermission === option ? 'dark:hover:bg-white/5 bg-black/5 dark:bg-white/5 border border-[hsl(var(--border-color))]' : 'border border-transparent'
                            }`}
                            onClick={() => {
                              setReplyPermission(option);
                              setShowReplyDropdown(false);
                            }}
                          >
                            <div className="font-medium text-[--color]">
                              {option === 'everyone' ? 'Everyone can reply' :
                               option === 'following' ? 'People you follow' :
                               'Mentioned only'}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComposePost;