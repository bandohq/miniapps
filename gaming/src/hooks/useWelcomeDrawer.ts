import { useState, useEffect } from 'react';

const WELCOME_DRAWER_KEY = 'gamepay-welcome-drawer-seen';

export const useWelcomeDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome drawer before
    const hasSeenWelcome = localStorage.getItem(WELCOME_DRAWER_KEY);
    
    if (!hasSeenWelcome) {
      // First time visitor - show the drawer after a short delay
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000); // 1 second delay to let the page load

      return () => clearTimeout(timer);
    } else {
      setHasBeenSeen(true);
    }
  }, []);

  const closeDrawer = () => {
    setIsOpen(false);
    // Mark as seen in localStorage
    localStorage.setItem(WELCOME_DRAWER_KEY, 'true');
    setHasBeenSeen(true);
  };

  const openDrawer = () => {
    setIsOpen(true);
  };

  // Function to reset the welcome drawer (useful for testing)
  const resetWelcomeDrawer = () => {
    localStorage.removeItem(WELCOME_DRAWER_KEY);
    setHasBeenSeen(false);
    setIsOpen(true);
  };

  return {
    isOpen,
    hasBeenSeen,
    closeDrawer,
    openDrawer,
    resetWelcomeDrawer,
  };
};
