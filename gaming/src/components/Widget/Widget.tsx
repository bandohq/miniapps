import React from "react";
import { useTranslation } from "react-i18next";
import { BandoWidget, WidgetConfig } from "@bandohq/widget";
import { Typography, useTheme } from "@mui/material";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import {
  useIsBinance,
  useIsCoinbase,
  useIsFarcaster,
  useMiniPayDetection,
  useIsWorldApp,
} from "@hooks/walletDetect";
import { MiniKit } from "@worldcoin/minikit-js";
import { useWorldWallet } from "@hooks/useWorldWallet";

export const Widget = () => {
  const { i18n } = useTranslation();
  const { openConnectModal } = useConnectModal();
  const isMiniApp = useIsFarcaster();
  const theme = useTheme();
  const { isMiniPay } = useMiniPayDetection();
  const isBinance = useIsBinance();
  const isCoinbase = useIsCoinbase();
  const isWorldApp = useIsWorldApp();
  const { isMounted } = useWorldWallet();

  // if world app is mounted, show the widget
  const shouldShowWidget = isWorldApp ? isMounted : true;

  const integrator = isWorldApp
    ? "gaming-world-app"
    : isMiniPay
    ? "gaming-minipay-app"
    : isCoinbase // must always be before isMiniApp
    ? "gaming-coinbase-app"
    : isMiniApp
    ? "gaming-farcaster-app"
    : isBinance
    ? "gaming-binance-app"
    : "gaming-bando-app";

  // we are carefully opening countries on the minipay opera wallet.
  const miniPayCountries = ["US", "MX", "NG", "GH", "KE", "ZA", "PH", "IN"];

  const languageResources = {
    en: {
      header: {
        spend: "Instant Gaming Power",
      },
    },
    es: {
      header: {
        spend: "Poder de juego al instante",
      },
    },
  };

  const config = {
    buildUrl: true,
    appearance: theme.palette.mode,
    transactionProvider: MiniKit,
    walletConfig: {
      onConnect: () => {
        openConnectModal?.();
      },
    },
    languages: {
      default: i18n.language,
      supported: ["en", "es"],
    },
    // If `isMiniPay` is true, restrict access to specific countries listed in `miniPayCountries`.
    // If `isMiniPay` is false, setting `allowedCountries` to `undefined` allows access from all countries.
    allowedCountries: isMiniPay ? miniPayCountries : undefined,
    categories: ["gaming"],
    languageResources,
    theme: {
      header: {
        "& p": {
          background: "linear-gradient(90deg, #15AF84 0%, #B93FED 100%)",
          fontStyle: "italic",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: "600",
        }
      },
      container: {
        borderRadius: "10px",
        maxHeight: "600px",
        minWidth: "320px",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.82);"
      },
      typography: {
        fontFamily: "Inter, sans-serif",
        "& .MuiTypography-h4": {
          background: "linear-gradient(90deg, #15AF84 0%, #B93FED 100%)",
          fontStyle: "italic",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontWeight: "600",
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: "50px",
              background: "linear-gradient(90deg, #15AF84 0%, #B93FED 100%)",
              color: "#ffffff !important",
              "& .MuiLink-button": {
                color: "#B93FED !important",
              },
            },
          },
        },
        SelectProductCard: {
          styleOverrides: {
            root: {
              background: "linear-gradient(45deg, #15AF84 0%, #B93FED 100%)",
              color: "#ffffff !important",
              border: "none",
            },
            actionButton: {
              borderRadius: "6px",
              padding: "6px 12px",
              background: "linear-gradient(45deg, #FBD1FF 15%, #FF9CFF 100%)",
              color: "#B93FED !important",
              fontWeight: "600",
              boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.32);"
            },
          },
        },
        MuiInput: {
          styleOverrides: {
            root: {
              borderRadius: "8px",
              background: "#3F5A5A",
              color: "#ffffff !important",
              border: "none",
              ["& :hover"]: {
                background: "#3F5A5A",
              },
              ["& :focus"]: {
                background: "#3F5A5A",
              },
            },
          },
        },
      }
    },
  } as Partial<WidgetConfig>;

  return (
    <>
      {shouldShowWidget && (
        <BandoWidget integrator={integrator} config={config} />
      )}
    </>
  );
};
