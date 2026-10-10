import { TbSend, TbPhotoFilled } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";
import { useSocketStore } from "../../store/socket.store";
import { useLocation } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { uploadAttachmentApi } from "../../api/message.api";
import { toast } from "react-toastify";

const ChatFooter = () => {
  const location = useLocation();
  const { socket } = useSocketStore();
  const { typing } = useAuthStore();
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedFileRef = useRef<File | null>(null);

  const receiverId = location.pathname.slice(1);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be less than 5MB");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Store file for upload
    selectedFileRef.current = file;
  };

  const removePreview = () => {
    setPreviewImage(null);
    selectedFileRef.current = null;
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const sendMessage = async () => {
    const trimmed = input.trim();
    const hasContent = trimmed.length > 0;
    const hasImage = !!previewImage;

    if (!hasContent && !hasImage) {
      setError(true);
      return;
    }

    setError(false);

    try {
      let attachment = null;

      // Upload image first if present
      if (hasImage && selectedFileRef.current) {
        setUploading(true);
        const { attachment: uploadedAttachment } = await uploadAttachmentApi(
          selectedFileRef.current
        );
        attachment = uploadedAttachment;
        setUploading(false);
      }

      // Send message via socket
      socket?.emit("send_message", {
        receiverId,
        content: hasContent ? input : undefined,
        attachment,
      });

      // Clear inputs
      setInput("");
      removePreview();
    } catch (err) {
      setUploading(false);
      toast.error("Failed to send message");
      console.error(err);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {
    if (input !== "" || previewImage) {
      socket?.emit("typing", receiverId);
    } else {
      socket?.emit("stop_typing", receiverId);
    }
  }, [input, previewImage, receiverId, socket]);

  return (
    <div className="chat-footer">
      <label htmlFor="chat" className="sr-only">
        Your message
      </label>
      <div className="flex items-end gap-3">
        {/* Image upload button */}
        <div className="relative flex-shrink-0">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="image-upload"
            disabled={uploading}
          />
          <label
            htmlFor="image-upload"
            className={`btn-icon flex-shrink-0 ${
              uploading
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            title="Attach image"
          >
            <TbPhotoFilled size={22} className="text-gray-600 dark:text-gray-300" />
          </label>
        </div>

        {/* Image preview */}
        {previewImage && (
          <div className="relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border border-surface-border dark:border-surface-borderDark animate-fade-in">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={removePreview}
              className="absolute top-1 right-1 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
              aria-label="Remove image"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        )}

        {/* Textarea */}
        <textarea
          id="chat"
          className={`input-field h-12 resize-none flex-1 ${error ? "border-error-500 focus:ring-error-500" : ""}`}
          placeholder="Your message..."
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            if (error && e.target.value.trim()) {
              setError(false);
            }
          }}
          onKeyDown={handleKeyPress}
          disabled={uploading}
          rows={1}
        />

        {/* Send button */}
        <button
          className={`btn-primary flex-shrink-0 ${
            uploading
              ? "opacity-50 cursor-not-allowed"
              : (input.trim() || previewImage)
                ? ""
                : "opacity-50 cursor-not-allowed"
          }`}
          disabled={(!input.trim() && !previewImage) || uploading}
          onClick={sendMessage}
        >
          {uploading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <TbSend size={20} />
          )}
        </button>
      </div>

      {/* Typing indicator */}
      {typing && (
        <div className="typing-indicator mt-2 pl-1 text-gray-500 dark:text-gray-400 animate-fade-in">
          <span className="text-xs font-medium">Typing</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-bounce-subtle" style={{ animationDelay: '0ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-bounce-subtle" style={{ animationDelay: '150ms' }} />
          <span className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-bounce-subtle" style={{ animationDelay: '300ms' }} />
        </div>
      )}
    </div>
  );
};

export default ChatFooter;