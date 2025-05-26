import React, { useEffect, useState } from 'react';
import { Download } from 'lucide-react';

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

const InstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Detect if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
      setIsInstalled(true);
    }

    // Listener for beforeinstallprompt event
    function handleBeforeInstallPrompt(e: Event) {
      e.preventDefault();
      console.log('beforeinstallprompt event fired');
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Listener for appinstalled event
    function handleAppInstalled() {
      setIsInstalled(true);
      setDeferredPrompt(null);
    }

    window.addEventListener('appinstalled', handleAppInstalled);

    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      setDeferredPrompt(null);
    });
  };

  // Hide button if app is installed or no install prompt available
  if (isInstalled || !deferredPrompt) return null;

  return (
    <button
      onClick={handleInstallClick}
      aria-label="Install app"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '8px 12px',
        fontSize: '16px',
        backgroundColor: '#007bff',
        border: 'none',
        borderRadius: 6,
        color: 'white',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <Download size={20} />
      Install App
    </button>
  );
};

export default InstallPrompt;
