import React, { useState, useRef, useEffect, useContext } from 'react';
import { X, Heart, MessageCircle, Share, MoreHorizontal, ExternalLink } from 'lucide-react';
// import { Comment, Post } from '../types/comment';
import CommentForm from './CommentForm';
// import LoadingSpinner from './LoadingSpinner';
// import { fetchComments } from '../data/mockData';
import Comments from '../comments/Comments';
import Feed from '../feed';
import CommentFeed from './commentItem';
import { AuthContext } from '@/app/context/Authcontext';
interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: HomeFeed;
//   onAddComment: (content: string) => void;
//   onLikeComment: (commentId: string) => void;
//   onReplyToComment: (commentId: string, content: string) => void;
//   onViewAllComments: () => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  post,
//   onAddComment,
//   onLikeComment,
//   onReplyToComment,
//   onViewAllComments,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const {setCommentRoute,commentRoute}:any=useContext(AuthContext)
   useEffect(() => {
    if (!isOpen) {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [isOpen]);
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      
      // Load comments when modal opens
      if (!hasLoaded) {
        loadComments();
      }
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, hasLoaded]);

  const loadComments = async () => {
    setIsLoading(true);
    // try {
    //   const fetchedComments = await fetchComments(post.id);
    //   setComments(fetchedComments);
    //   setHasLoaded(true);
    // } catch (error) {
    //   console.error('Failed to load comments:', error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleReply = (commentId: string, content: string) => {
    // onReplyToComment(commentId, content);
    setReplyingTo(null);
  };

  const handleViewAllComments = () => {
    onClose();
    // onViewAllComments();
  };

  const handleAddComment = (content: string) => {
    console.log(content)
  };

  if (!isOpen) return null;

  // Show only first 3 comments in modal
  const displayedComments = comments.slice(0, 3);
  const hasMoreComments = comments.length > 3;
  

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="bg-[hsl(var(--background))] no-scrollbar overflow-y-scroll overflow-x-hidden mobile:rounded-2xl mobile:border border-[hsl(var(--border-color))] w-full mobile:max-w-xl mobile:h-auto h-full mobile:max-h-[90vh] flex flex-col mobile:mx-4 shadow-2xl animate-in fade-in-0 zoom-in-95 duration-200"
      >
        {/* Fixed Header */}
        <div className="flex items-center sticky top-0 z-[30] bg-[hsl(var(--background))] justify-between p-4 py-2 border-b border-[hsl(var(--border-color))] flex-shrink-0">
          <h2 className="text-xl text-[--color]" >Reply</h2>

          <div className='h-full items-center flex gap-2'>
            {isUploading && (
            <div className="px-3 sm:px-4 pb-2">
              <div className="bg-[hsl(var(--accent))] rounded-full h-1 overflow-hidden">
                <div 
                  className="bg-blue-600 h-full transition-all duration-300 ease-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <div className="flex justify-between items-center gap-2 mt-1">
                <span className="text-xs text-[#727272]">
                  {uploadProgress < 100 ? 'Uploading post...' : 'Processing...'}
                </span>
                <span className="text-xs text-[#727272]">{uploadProgress}%</span>
              </div>
            </div>
          )}
            <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
            <X size={20} className="text-gray-500" />
            </button>
          </div>
          
        </div>
        
        {/* Scrollable Content Area */}
        <div className="h-auto">
          {/* Post Content */}
          <div className='py-4 w-full border-[hsl(var(--border-color))]'>
            <CommentFeed dave={post} />

          </div>
          
          {/* Comments List */}
          {/* <div className="divide-y divide-gray-100">
            {isLoading ? (
              // Loading skeletons
              <>
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
              </>
            ) : (
              displayedComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                //   onLike={() => onLikeComment(comment.id)}
                  onReply={() => setReplyingTo(comment.id)}
                  replyingTo={replyingTo}
                  onSubmitReply={(content) => handleReply(comment.id, content)}
                  onCancelReply={() => setReplyingTo(null)}
                />
              ))
            )}
          </div> */}

          {/* View More Comments Button */}
          {hasMoreComments && !isLoading && (
            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleViewAllComments}
                className="w-full flex items-center justify-center space-x-2 py-3 px-4 text-blue-500 hover:bg-blue-50 rounded-xl transition-colors font-medium"
              >
                <ExternalLink size={18} />
                <span>View {comments.length - 3} more comments</span>
              </button>
            </div>
          )}

          {false && (
            <div className="p-8 text-center text-gray-500">
              <MessageCircle size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No comments yet</p>
              <p className="text-sm">Be the first to share your thoughts!</p>
            </div>
          )}
        </div>

        {/* Fixed Comment Form */}
        <div className="px-4  border-[hsl(var(--border-color))] bg-[hsl(var(--background))] ">
          <CommentForm
            placeholder="Write a comment..."
            buttonText="Comment"
            setIsUploading={setIsUploading}
            setUploadProgress={setUploadProgress}
            isUploading={isUploading}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentModal;