import React, { useState, useRef, useEffect, useContext } from "react";
import { Send, Image, Smile } from "lucide-react";
import BlobImages from "../blobImages";
import { HashtagSuggestions } from "../hashtagSuggestion";
import { MentionSuggestions } from "../mentionSuggestion";
import createPost from "../../../../lib/createPost";
import { AuthContext } from "@/app/context/Authcontext";

interface CommentFormProps {
  placeholder?: string;
  buttonText?: string;
  autoFocus?: boolean;
  compact?: boolean;
  setIsUploading: any;
  setUploadProgress: any;
  isUploading: any;
}

const CommentForm: React.FC<CommentFormProps> = ({
  placeholder = "What's on your mind?",
  buttonText = "Post",
  autoFocus = false,
  compact = false,
  setIsUploading,
  setUploadProgress,
  isUploading,
}) => {
  const [showMentions, setShowMentions] = useState(false);
  const [showHashtags, setShowHashtags] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [hashtagQuery, setHashtagQuery] = useState("");
  const [suggestionPosition, setSuggestionPosition] = useState({
    top: 0,
    left: 0,
  });
  const [textLength, setTextLength] = useState(0);
  const contentEditableRef = useRef<HTMLDivElement>(null);
  const { userObj, setCommentRoute, commentRoute }: any =
    useContext(AuthContext);

  const maxLength = 280;

  const getCaretPosition = () => {
    const selection = window.getSelection();
    if (!selection || !selection.rangeCount) return null;

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    const containerRect = contentEditableRef.current?.getBoundingClientRect();

    if (!containerRect) return null;

    return {
      top: rect.bottom - containerRect.top + 8,
      left: rect.left - containerRect.left,
    };
  };

  const getTextContent = () => {
    if (!contentEditableRef.current) return "";
    return contentEditableRef.current.textContent || "";
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

    return parts.join("");
  };

  const handleInput = () => {
    if (!contentEditableRef.current) return;

    const text = getTextContent();
    const cursorPos = getCursorPosition();
    setContent(text);
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
    // Prevent default formatting shortcuts
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
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

        while ((node = walker.nextNode())) {
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

          while ((node = walker.nextNode())) {
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

          while ((node = walker.nextNode())) {
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

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    const textContent = getTextContent();
    insertText(text);
    setContent(textContent);
  };
  const formData = new FormData();
  const added = new Set();

  const [content, setContent] = useState("");
  const [text, setText] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);
  const maxChars = 280;
  const [mediaList, setMediaList] = useState<
    { type: string; url: string; file: any }[]
  >([]);
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const handleFileChange = (event: any) => {
    const newFiles = Array.from(event.target.files || []);
    const newMedia2 = newFiles.map((file: any) => {
      return file;
    });
    const newMedia = newFiles
      .map((file: any) => {
        const type = file.type.startsWith("image")
          ? "image"
          : file.type.startsWith("video")
          ? "video"
          : "";
        if (!type) return null;

        const url = URL.createObjectURL(file);
        return { type, url, file };
      })
      .filter(Boolean) as { type: string; url: string; file: string }[];
    setMediaList((prev) => [...prev, ...newMedia]);
    setSelectedFiles((prev: any) => [...prev, ...newMedia2]);
    event.target.value = "";
  };

  const charsRemaining = maxChars - content.length;
  const isOverLimit = charsRemaining < 0;
  const handleSubmit = async () => {
    if (content.trim().length) {
      formData.delete("text"); // remove if exists
      formData.append("text", content);
    } else {
      formData.delete("text"); // remove if exists
    }

    if (mediaList.length) {
      selectedFiles.forEach((file: any) => {
        if (!added.has(file.name)) {
          formData.append(
            file.type.startsWith("image") ? "image" : "video",
            file
          );
          added.add(file.name);
        }
      });
    } else {
      formData.delete("image");
      formData.delete("video");
    }
    if (!isUploading || text.trim().length || selectedFiles.length) {
      setIsUploading(true);
      setUploadProgress(0);

      const progressSteps = [15, 35, 60, 85,91];
      const delays = [300, 400, 500, 300,500];

      try {
        for (let i = 0; i < progressSteps.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, delays[i]));
          setUploadProgress(progressSteps[i]);
        }

        // Final step only after response received
        const data = await createPost(commentRoute,formData);
        const response: any = await data;
        
        // After successful upload, complete the progress bar,clear data
        setUploadProgress(100);
        setSelectedFiles([])
        setMediaList([])
        if (contentEditableRef.current) {
          contentEditableRef.current.innerText = "";
        }
        setContent("")
      } catch (error) {
        console.error("Upload failed:", error);
        setUploadProgress(0); // Reset progress on error
      } finally {
        setIsUploading(false);
      }
    }
  };
  return (
    <div className="flex flex-col pb-3 gap-4">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex space-x-3">
          {/* <img
            src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=2"
            alt="Your avatar"
            className={`rounded-full border border-[hsl(var(--border-color))] object-cover size-9`}
          /> */}
          <>
            {userObj?.user ? (
              userObj.user.profileImage ? (
                <img
                  src={userObj.user.profileImage}
                  alt="A sample image"
                  className="rounded-full border border-[hsl(var(--border-color))] object-cover size-9"
                  width={100}
                  height={100}
                  // priority
                />
              ) : (
                <img
                  alt={""}
                  src={
                    "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                  }
                  className="rounded-full border border-[hsl(var(--border-color))] object-cover size-9"
                />
              )
            ) : (
              <img
                alt={""}
                src={
                  "https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png"
                }
                className="rounded-full border border-[hsl(var(--border-color))] object-cover size-9"
              />
            )}
          </>
          <div className="flex-1 flex-col flex gap-5">
            {/* <div className="relative">
              <textarea
                // ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(true)}   
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className={`w-full resize-none border-0 bg-transparent text-[--color] no-scrollbar placeholder-gray-500 focus:outline-none text-lg`}
                style={{
                  minHeight: compact ? "auto" : "auto",
                  maxHeight: "200px",
                }}
                autoFocus
                rows={1}
              />
              {content.length > 0 && (
                <div
                  className={`absolute bottom-2 right-2 text-xs font-medium ${
                    isOverLimit ? "text-red-500" : "text-gray-400"
                  }`}
                >
                  {charsRemaining}
                </div>
              )}
            </div> */}
            <div className="relative">
              <div
                ref={contentEditableRef}
                contentEditable
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                className="w-full min-h-fit text-base sm:text-lg text-[--color] outline-none resize-none overflow-y-auto max-h-60"
                style={{
                  wordWrap: "break-word",
                  whiteSpace: "pre-wrap",
                }}
                autoFocus={true}
                data-placeholder={"What's on your mind ?"}
                onFocus={() => setIsFocused(true)}
              />

              {/* Placeholder styling */}
              {/* Custom placeholder for contentEditable */}
              {textLength === 0 && !isFocused && (
                <div
                  className="absolute left-0 top-0 pointer-events-none text-gray-400 select-none px-1"
                  style={{ userSelect: "none" }}
                >
                  {placeholder}
                </div>
              )}

              {/* Suggestions */}
              {showMentions && (
                <div
                  className="absolute z-50"
                  style={{
                    top: suggestionPosition.top,
                    left: suggestionPosition.left,
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
                  className="absolute z-50 m-auto"
                  style={{
                    top: suggestionPosition.top,
                    // left: suggestionPosition.left,
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
            <BlobImages
              setSelectedFiles={setSelectedFiles}
              mediaList={mediaList}
              setMediaList={setMediaList}
            />
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
          <div className="flex flex-row gap-3 items-center">
            {content.length > 0 && (
              <div
                className={` text-xs bg-[hsl(var(--accent))] rounded-md px-2 py-[3px] font-medium ${
                  isOverLimit ? "text-red-500" : "text-gray-400"
                }`}
              >
                {charsRemaining}
              </div>
            )}
            <button
              type="submit"
              disabled={!content.trim() || isOverLimit  || isUploading}
              onClick={handleSubmit}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                !content.trim() || isOverLimit  || isUploading
                  ? "bg-[hsl(var(--accent))] text-gray-400 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600 hover:shadow-md"
              }`}
            >
              {buttonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentForm;
