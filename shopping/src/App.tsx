import "./App.css";
import { Widget } from "@components/Widget/Widget";
import CleanLayout from "@layouts/CleanLayout";
import { AppProvider } from "./AppProvider";
import { ThemeProvider } from './context/ThemeContext';
import { WelcomeDrawer } from "@components/WelcomeDrawer";
import { useWelcomeDrawer } from "@hooks/useWelcomeDrawer";
import { PromoSlider } from '@components/PromoSlider';
import * as Sentry from "@sentry/react";
import { sdk } from "@farcaster/frame-sdk";
import { useEffect } from "react";
import { useIsFarcaster } from "@hooks/walletDetect";
import React from 'react';
import { Box, Slide, Typography } from '@mui/material';

Sentry.init({
  dsn: "https://24644db236e19c7aa4974451d9cc5101@o4506577784602624.ingest.us.sentry.io/4509209195905024",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.captureConsoleIntegration({
      levels: ["error"],
    }),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  ignoreErrors: [
    "MiniKit is not installed. Make sure you're running the application inside of World App",
  ],
});

function App() {
  /**
   * We use this only for initializing inside a farcaster frame.
   * And we also prompt user to add the frame if not added.
   * Learn more:
   * https://miniapps.farcaster.xyz/docs/guides/loading#calling-ready
   **/
  const isMiniApp = useIsFarcaster();
  const { isOpen, closeDrawer, showPromoSlider, resetWelcomeDrawer } = useWelcomeDrawer();

  // Expose reset function to window for testing
  useEffect(() => {
    (window as any).resetWelcomeDrawer = resetWelcomeDrawer;
  }, [resetWelcomeDrawer]);

  const initializeFarcasterFrame = async () => {
    await sdk.actions.ready();
    if (isMiniApp) {
      await sdk.actions.addFrame();
    }
  };

  useEffect(() => {
    initializeFarcasterFrame();
  }, []);
  return (
    <ThemeProvider>
      <AppProvider>
        <CleanLayout>
          <Box
            sx={{
              position: 'relative',
              width: '100%',
            }}
          >
            {/* Hero Section with PromoSlider */}
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 10,
                transform: showPromoSlider ? 'translateY(0)' : 'translateY(-100%)',
                transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: showPromoSlider ? 1 : 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* Hero Text Section */}
              <Box
                sx={{
                  textAlign: 'center',
                  marginBottom: '24px',
                  maxWidth: '600px',
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
                    fontWeight: '700',
                    background: 'linear-gradient(45deg, #F441E5 0%, #44DBF6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    textShadow: '0 0 30px rgba(244, 65, 229, 0.3)',
                    marginBottom: '12px',
                    letterSpacing: '-0.02em',
                  }}
                >
                  Instant gaming power
                </Typography>
                
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.95rem', sm: '1.05rem', md: '1.1rem' },
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: '400',
                    lineHeight: 1.5,
                    maxWidth: '480px',
                    margin: '0 auto',
                  }}
                >
                  Buy gaming giftcards and vouchers directly from your wallet.
                </Typography>
              </Box>
              
              {/* PromoSlider */}
              <PromoSlider show={true} /> {/* Always render, control with transform */}
            </Box>
            
            {/* Widget with smooth margin animation */}
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                transition: 'margin-top 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                marginTop: showPromoSlider ? { xs: '324px', sm: '324px', md: '344px' } : '0px', // Account for PromoSlider height + margin
              }}
            >
              <Widget />
            </Box>
          </Box>
          
          <WelcomeDrawer open={isOpen} onClose={closeDrawer} />
        </CleanLayout>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
