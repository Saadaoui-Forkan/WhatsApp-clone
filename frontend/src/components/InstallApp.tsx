import { useEffect, useState } from "react";
import { FaMobileAlt, FaDesktop, FaDownload, FaTimes } from "react-icons/fa";

const InstallApp = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [showIOSInstructions, setShowIOSInstructions] = useState(false);

  useEffect(() => {
    // Detect iOS
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Listen for beforeinstallprompt event (Chrome/Edge/Firefox on Android, Chrome on Desktop)
    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };

    // Listen for app installed
    const handleAppInstalled = () => {
      setShowInstall(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    setDeferredPrompt(null);
    setShowInstall(false);
  };

  const handleIOSInstructions = () => {
    setShowIOSInstructions(true);
  };

  const closeIOSInstructions = () => {
    setShowIOSInstructions(false);
  };

  // Don't show if already installed or on iOS (different install flow)
  if (!showInstall && !isIOS) return null;

  // iOS: Show instructions button in a subtle way
  if (isIOS && !showInstall) {
    return (
      <button
        onClick={handleIOSInstructions}
        className="fixed bottom-4 right-4 md:bottom-24 md:right-6 z-40 btn-primary gap-2 animate-slide-up"
        aria-label="How to install on iOS"
      >
        <FaMobileAlt size={20} />
        <span className="hidden sm:inline">Install App</span>
      </button>
    );
  }

  return (
    <>
      {/* Install banner for desktop/Android */}
      <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 md:bottom-24 z-50 animate-slide-up">
        <div className="card p-4 shadow-soft-lg flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
            <FaDownload className="text-primary-600 dark:text-primary-400 text-xl" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-900 dark:text-white">Install Chat App</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Add to home screen for quick access and better experience
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleInstall}
              className="btn-primary text-sm py-2 px-4"
            >
              Install
            </button>
            <button
              onClick={() => setShowInstall(false)}
              className="btn-ghost text-sm py-2 px-3"
              aria-label="Dismiss"
            >
              <FaTimes size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* iOS Instructions Modal */}
      {showIOSInstructions && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 animate-fade-in" onClick={closeIOSInstructions}>
          <div className="card p-6 max-w-md w-full animate-slide-up" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Install on iOS</h2>
              <button onClick={closeIOSInstructions} className="btn-icon text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <FaTimes size={22} />
              </button>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <div className="flex items-start gap-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <FaMobileAlt className="text-primary-600 dark:text-primary-400 text-2xl mt-1" />
                <div>
                  <p className="font-medium">Tap the Share button</p>
                  <p className="text-sm">Look for the square with an arrow pointing up</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <FaDownload className="text-primary-600 dark:text-primary-400 text-2xl mt-1" />
                <div>
                  <p className="font-medium">Scroll down and tap "Add to Home Screen"</p>
                  <p className="text-sm">It may be in the list of actions</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <FaDesktop className="text-primary-600 dark:text-primary-400 text-2xl mt-1" />
                <div>
                  <p className="font-medium">Tap "Add" in the top right</p>
                  <p className="text-sm">The app will be installed on your home screen</p>
                </div>
              </div>
            </div>
            <button
              onClick={closeIOSInstructions}
              className="btn-primary w-full mt-6"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Type for beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default InstallApp;