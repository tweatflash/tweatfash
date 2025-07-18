import React, { useState, useRef, useEffect } from 'react';
import { X, Image, Smile, AtSign, Hash } from 'lucide-react';
import { MentionSuggestions } from './mentionSuggestion';
import { HashtagSuggestions } from './hashtagSuggestion';

interface ReplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  post?: any;
  onSubmit?: (content: string) => void;
}

export const ReplyModal: React.FC<ReplyModalProps> = ({ isOpen, onClose, post, onSubmit }) => {
  const [showMentions, setShowMentions] = useState(false);
  const [showHashtags, setShowHashtags] = useState(false);
  const [mentionQuery, setMentionQuery] = useState('');
  const [hashtagQuery, setHashtagQuery] = useState('');
  const [suggestionPosition, setSuggestionPosition] = useState({ top: 0, left: 0 });
  const [textLength, setTextLength] = useState(0);
  const contentEditableRef = useRef<HTMLDivElement>(null);

  const maxLength = 280;

  useEffect(() => {
    if (isOpen && contentEditableRef.current) {
      contentEditableRef.current.focus();
    }
  }, [isOpen]);

  const getCaretPosition = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return null;
    
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const containerRect = contentEditableRef.current?.getBoundingClientRect();
    
    if (!containerRect) return null;
    
    return {
      top: rect.bottom - containerRect.top + 8,
      left: rect.left - containerRect.left
    };
  };

  const getTextContent = () => {
    if (!contentEditableRef.current) return '';
    return contentEditableRef.current.textContent || '';
  };

  const getCursorPosition = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return 0;
    
    const range = selection.getRangeAt(0);
    const preCaretRange = range.cloneRange();
    preCaretRange.selectNodeContents(contentEditableRef.current!);
    preCaretRange.setEnd(range.endContainer, range.endOffset);
    return preCaretRange.toString().length;
  };

  const formatContent = (text: string) => {
    const parts = [];
    let lastIndex = 0;
    
    // Find all @mentions and #hashtags
    const regex = /(@\w+|#\w+)/g;
    let match;
    
    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index));
      }
      
      // Add the formatted mention/hashtag
      parts.push(
        `<span style="color: #3b82f6; font-weight: 500;">${match[0]}</span>`
      );
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex));
    }
    
    return parts.join('');
  };

  const handleInput = () => {
    if (!contentEditableRef.current) return;
    
    const text = getTextContent();
    const cursorPos = getCursorPosition();
    
    setTextLength(text.length);
    
    // Get text before cursor for mention/hashtag detection
    const textBeforeCursor = text.substring(0, cursorPos);
    
    // Check for mentions
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    if (mentionMatch) {
      setMentionQuery(mentionMatch[1]);
      setShowMentions(true);
      setShowHashtags(false);
      const pos = getCaretPosition();
      if (pos) setSuggestionPosition(pos);
    } else {
      setShowMentions(false);
    }

    // Check for hashtags
    const hashtagMatch = textBeforeCursor.match(/#(\w*)$/);
    if (hashtagMatch) {
      setHashtagQuery(hashtagMatch[1]);
      setShowHashtags(true);
      setShowMentions(false);
      const pos = getCaretPosition();
      if (pos) setSuggestionPosition(pos);
    } else {
      setShowHashtags(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
    
    // Prevent default formatting shortcuts
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const insertText = (text: string) => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return;
    
    const range = selection.getRangeAt(0);
    range.deleteContents();
    
    const textNode = document.createTextNode(text);
    range.insertNode(textNode);
    
    // Move cursor after inserted text
    range.setStartAfter(textNode);
    range.setEndAfter(textNode);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Trigger formatting update
    setTimeout(() => {
      if (contentEditableRef.current) {
        const currentText = getTextContent();
        contentEditableRef.current.innerHTML = formatContent(currentText);
        
        // Restore cursor position
        const newRange = document.createRange();
        const walker = document.createTreeWalker(
          contentEditableRef.current,
          NodeFilter.SHOW_TEXT,
          null
        );
        
        let currentPos = 0;
        let targetPos = getCursorPosition();
        let node;
        
        while (node = walker.nextNode()) {
          const nodeLength = node.textContent?.length || 0;
          if (currentPos + nodeLength >= targetPos) {
            newRange.setStart(node, targetPos - currentPos);
            newRange.setEnd(node, targetPos - currentPos);
            break;
          }
          currentPos += nodeLength;
        }
        
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }, 0);
  };

  const insertMention = (username: string) => {
    const text = getTextContent();
    const cursorPos = getCursorPosition();
    const textBeforeCursor = text.substring(0, cursorPos);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    
    if (mentionMatch && contentEditableRef.current) {
      const beforeMention = textBeforeCursor.substring(0, mentionMatch.index);
      const afterCursor = text.substring(cursorPos);
      const newText = `${beforeMention}@${username} ${afterCursor}`;
      
      contentEditableRef.current.innerHTML = formatContent(newText);
      
      // Set cursor position after the mention
      setTimeout(() => {
        const selection = window.getSelection();
        if (selection && contentEditableRef.current) {
          const range = document.createRange();
          const targetPos = beforeMention.length + username.length + 2;
          
          const walker = document.createTreeWalker(
            contentEditableRef.current,
            NodeFilter.SHOW_TEXT,
            null
          );
          
          let currentPos = 0;
          let node;
          
          while (node = walker.nextNode()) {
            const nodeLength = node.textContent?.length || 0;
            if (currentPos + nodeLength >= targetPos) {
              range.setStart(node, targetPos - currentPos);
              range.setEnd(node, targetPos - currentPos);
              break;
            }
            currentPos += nodeLength;
          }
          
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }, 0);
    }
    
    setShowMentions(false);
    setTextLength(getTextContent().length);
  };

  const insertHashtag = (hashtag: string) => {
    const text = getTextContent();
    const cursorPos = getCursorPosition();
    const textBeforeCursor = text.substring(0, cursorPos);
    const hashtagMatch = textBeforeCursor.match(/#(\w*)$/);
    
    if (hashtagMatch && contentEditableRef.current) {
      const beforeHashtag = textBeforeCursor.substring(0, hashtagMatch.index);
      const afterCursor = text.substring(cursorPos);
      const newText = `${beforeHashtag}#${hashtag} ${afterCursor}`;
      
      contentEditableRef.current.innerHTML = formatContent(newText);
      
      // Set cursor position after the hashtag
      setTimeout(() => {
        const selection = window.getSelection();
        if (selection && contentEditableRef.current) {
          const range = document.createRange();
          const targetPos = beforeHashtag.length + hashtag.length + 2;
          
          const walker = document.createTreeWalker(
            contentEditableRef.current,
            NodeFilter.SHOW_TEXT,
            null
          );
          
          let currentPos = 0;
          let node;
          
          while (node = walker.nextNode()) {
            const nodeLength = node.textContent?.length || 0;
            if (currentPos + nodeLength >= targetPos) {
              range.setStart(node, targetPos - currentPos);
              range.setEnd(node, targetPos - currentPos);
              break;
            }
            currentPos += nodeLength;
          }
          
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }, 0);
    }
    
    setShowHashtags(false);
    setTextLength(getTextContent().length);
  };

  const handleSubmit = () => {
    const text = getTextContent().trim();
    if (text && onSubmit) {
      onSubmit(text);
      if (contentEditableRef.current) {
        contentEditableRef.current.innerHTML = '';
        setTextLength(0);
      }
      onClose();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    insertText(text);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-2 sm:mx-4 max-h-[90vh] animate-in fade-in-0 zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">{post ? 'Reply' : 'New Post'}</h2>
          </div>
          <button
            onClick={handleSubmit}
            disabled={textLength === 0 || textLength > maxLength}
            className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Post
          </button>
        </div>

        {/* Original Post (only show when replying) */}
        {post && (
          <div className="p-3 sm:p-4 border-b border-gray-100 bg-gray-50">
            <div className="flex space-x-3">
              <img 
                src={post.user.avatar} 
                alt={post.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-gray-900">{post.user.name}</h3>
                  <span className="text-gray-500">@{post.user.username}</span>
                  <span className="text-gray-400">·</span>
                  <span className="text-gray-500 text-sm">{post.timestamp}</span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{post.content}</p>
              </div>
            </div>
          </div>
        )}

        {/* Post Input */}
        <div className="p-3 sm:p-4 relative">
          <div className="flex space-x-3">
            <img 
              src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop" 
              alt="Your avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="relative">
                <div
                  ref={contentEditableRef}
                  contentEditable
                  onInput={handleInput}
                  onKeyDown={handleKeyDown}
                  onPaste={handlePaste}
                  className="w-full min-h-[100px] sm:min-h-[120px] text-base sm:text-lg text-gray-900 outline-none resize-none overflow-y-auto max-h-60"
                  style={{ 
                    wordWrap: 'break-word',
                    whiteSpace: 'pre-wrap'
                  }}
                  data-placeholder={post ? `Replying to @${post.user.username}...` : "What's on your mind? Try @mentions and #hashtags!"}
                />
                
                {/* Placeholder styling */}
                <style jsx>{`
                  [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: #9ca3af;
                    pointer-events: none;
                  }
                `}</style>
                
                {/* Suggestions */}
                {showMentions && (
                  <div 
                    className="absolute z-50"
                    style={{ 
                      top: suggestionPosition.top,
                      left: suggestionPosition.left 
                    }}
                  >
                    <MentionSuggestions 
                      query={mentionQuery}
                      onSelect={insertMention}
                      onClose={() => setShowMentions(false)}
                    />
                  </div>
                )}
                
                {showHashtags && (
                  <div 
                    className="absolute z-50"
                    style={{ 
                      top: suggestionPosition.top,
                      left: suggestionPosition.left 
                    }}
                  >
                    <HashtagSuggestions 
                      query={hashtagQuery}
                      onSelect={insertHashtag}
                      onClose={() => setShowHashtags(false)}
                    />
                  </div>
                )}
              </div>

              {/* Toolbar */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700">
                    <Image className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700">
                    <Smile className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700">
                    <AtSign className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500 hover:text-gray-700">
                    <Hash className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className={`text-sm ${textLength > maxLength ? 'text-red-500' : 'text-gray-500'}`}>
                    {textLength}/{maxLength}
                  </div>
                  <div className="w-6 h-6 sm:w-8 sm:h-8 relative">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 transform -rotate-90" viewBox="0 0 32 32">
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="2"
                      />
                      <circle
                        cx="16"
                        cy="16"
                        r="14"
                        fill="none"
                        stroke={textLength > maxLength ? "#ef4444" : "#3b82f6"}
                        strokeWidth="2"
                        strokeDasharray={`${88 * (textLength / maxLength)} 88`}
                        className="transition-all"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};