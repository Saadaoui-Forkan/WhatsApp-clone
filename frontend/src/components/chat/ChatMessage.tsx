import { ChatMessageProps } from "../../types/message.types";
import { formatMessageDate } from "../../utils/helpers";
import { useState } from "react";
import { createPortal } from "react-dom";

const ImageLightbox = ({ src, onClose }: { src: string; onClose: () => void }) => {
  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        aria-label="Close"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <img
        src={src}
        alt=""
        className="max-w-[90vw] max-h-[90vh] object-contain animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      />
    </div>,
    document.body
  );
};

const ChatMessage = ({ isSender = false, content, createdAt, seen, attachment }: ChatMessageProps) => {
  const [showLightbox, setShowLightbox] = useState(false);

  const handleImageClick = () => {
    if (attachment?.url) {
      setShowLightbox(true);
    }
  };

  const bubbleClassName = isSender
    ? "message-bubble-sender"
    : "message-bubble-receiver";

  const imageBubbleClassName = isSender
    ? "message-bubble-sender-image"
    : "message-bubble-receiver-image";

  return (
    <>
      <div className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
        {attachment && !content ? (
          <div className={imageBubbleClassName} onClick={handleImageClick}>
            <img
              src={attachment.url}
              alt=""
              className="w-full h-auto max-h-64 object-cover rounded-xl"
            />
          </div>
        ) : (
          <div className={bubbleClassName}>
            {/* Image attachment */}
            {attachment && (
              <div className="mb-2 rounded-xl overflow-hidden cursor-zoom-in" onClick={handleImageClick}>
                <img
                  src={attachment.url}
                  alt=""
                  className="w-full h-auto max-h-64 object-cover"
                />
              </div>
            )}

            {/* Text content */}
            {content && <p className="text-sm leading-relaxed mb-1">{content}</p>}

            {/* Timestamp and seen status */}
            <div className={`flex items-center justify-end gap-1.5 text-xs ${
              isSender ? "text-primary-100" : "text-gray-500 dark:text-gray-400"
            }`}>
              <span>{formatMessageDate(createdAt)}</span>
              {isSender && (
                <span className={seen ? "text-blue-300" : "opacity-60"} aria-label={seen ? "Read" : "Sent"}>
                  {seen ? "✓✓" : "✓"}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox portal */}
      {showLightbox && attachment && (
        <ImageLightbox src={attachment.url} onClose={() => setShowLightbox(false)} />
      )}
    </>
  );
};

export default ChatMessage;