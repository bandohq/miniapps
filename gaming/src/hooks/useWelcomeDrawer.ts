import { useState, useEffect } from 'react';

const WELCOME_DRAWER_KEY = 'welcomeDrawerShown';

export const useWelcomeDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPromoSlider, setShowPromoSlider] = useState(false);

  useEffect(() => {
    // Check if user has seen the welcome drawer before
    const hasSeenWelcome = localStorage.getItem(WELCOME_DRAWER_KEY);
    
    console.log('Welcome drawer check:', { hasSeenWelcome, willShow: !hasSeenWelcome });
    
    if (!hasSeenWelcome) {
      // Show welcome drawer for first-time users
      setIsOpen(true);
    } else {
      // If welcome drawer has been seen, show promo slider after a small delay to allow animation
      setTimeout(() => {
        setShowPromoSlider(true);
      }, 500); // Small delay to allow widget to render in normal position first
    }
  }, []);

  const closeDrawer = () => {
    setIsOpen(false);
    // Mark as seen so it doesn't show again
    localStorage.setItem(WELCOME_DRAWER_KEY, 'true');
    
    // Show promo slider after welcome drawer closes
    setTimeout(() => {
      setShowPromoSlider(true);
    }, 500); // Small delay for smooth transition
  };

  // Function to reset the welcome drawer (useful for testing)
  const resetWelcomeDrawer = () => {
    localStorage.removeItem(WELCOME_DRAWER_KEY);
    setIsOpen(true);
    setShowPromoSlider(false);
  };

  return {
    isOpen,
    closeDrawer,
    showPromoSlider,
    resetWelcomeDrawer,
  };
};
