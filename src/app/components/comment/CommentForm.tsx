import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Smile } from 'lucide-react';
import BlobImages from '../blobImages';
interface CommentFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
  autoFocus?: boolean;
  compact?: boolean;
}

const CommentForm: React.FC<CommentFormProps> = ({
  onSubmit,
  placeholder = "What's on your mind?",
  buttonText = "Post",
  autoFocus = false,
  compact = false,
}) => {
  const [content, setContent] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const maxChars = 280;
  const [mediaList, setMediaList] = useState<{ type: string; url: string ,file:any}[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const handleFileChange = (event: any) => {
    const newFiles = Array.from(event.target.files || []);
    const newMedia2 = newFiles.map((file:any) => {
      return file;
    })
    const newMedia = newFiles.map((file:any) => {
      const type = file.type.startsWith('image') ? 'image' : 
                   file.type.startsWith('video') ? 'video' : '';
      if (!type) return null;

      const url = URL.createObjectURL(file);
      return { type, url ,file};
    }).filter(Boolean) as { type: string; url: string,file:string }[];
    setMediaList(prev => [...prev, ...newMedia]);
    setSelectedFiles((prev:any)=> [...prev, ...newMedia2]);
    event.target.value = "";
    

  };
  useEffect(() => {
    if (autoFocus && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [autoFocus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSubmit(content.trim());
      setContent('');
      setIsFocused(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [content]);

  const charsRemaining = maxChars - content.length;
  const isOverLimit = charsRemaining < 0;

  return (
    <div className='flex flex-col gap-4'>
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex space-x-3">
        <img
          src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2"
          alt="Your avatar"
          className={`rounded-full border border-[hsl(var(--border-color))] object-cover size-9`}
        />
        <div className="flex-1">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              className={`w-full resize-none border-0 bg-transparent text-[--color] no-scrollbar placeholder-gray-500 focus:outline-none text-lg`}
              style={{
                minHeight: compact ? 'auto' : 'auto',
                maxHeight: '200px',
              }}
              autoFocus
              rows={1}
            />
            {content.length > 0 && (
              <div
                className={`absolute bottom-2 right-2 text-xs font-medium ${
                  isOverLimit ? 'text-red-500' : 'text-gray-400'
                }`}
              >
                {charsRemaining}
              </div>
            )}
          </div>
          <BlobImages setSelectedFiles={setSelectedFiles} mediaList={mediaList} setMediaList={setMediaList}/>
          
        </div>
        
      </div>
      
    </form>
    {(isFocused || content.length > 0) && (
            <div className="pb-4 flex sticky bottom-0 bg-[hsl(var(--background))] items-center justify-between w-full pt-3 border-[hsl(var(--border-color))]">
              <div className="flex items-center ">
                <label
                  htmlFor="commentFile"
                  className="p-2 rounded-full hover:bg-[hsl(var(--accent))] text-blue-500 transition-colors"
                >
                  <Image size={18} />
                  <input
                        id="commentFile"
                        onChange={handleFileChange}
                        type="file"
                        className=" sr-only"
                        accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,"
                        multiple
                      />
                </label>
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-[hsl(var(--accent))] text-blue-500 transition-colors"
                >
                  <Smile size={18} />
                </button>
              </div>
              <button
                type="submit"
                disabled={!content.trim() || isOverLimit}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  !content.trim() || isOverLimit
                    ? 'bg-[hsl(var(--accent))] text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md'
                }`}
              >
                {buttonText}
              </button>
            </div>
          )}
        </div>
  );
};

export default CommentForm;