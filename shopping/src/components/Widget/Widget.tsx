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
    ? "shopping-world-app"
    : isMiniPay
    ? "shopping-minipay-app"
    : isCoinbase // must always be before isMiniApp
    ? "shopping-coinbase-app"
    : isMiniApp
    ? "shopping-farcaster-app"
    : isBinance
    ? "shopping-binance-app"
    : "shopping-bando-app";

  // we are carefully opening countries on the minipay opera wallet.
  const miniPayCountries = ["US", "MX", "NG", "GH", "KE", "ZA", "PH", "IN"];

  const languageResources = {
    en: {
      header: {
        spend: "Pay",
      },
    },
    es: {
      header: {
        spend: "Pagar",
      },
    },
  };

  const config = {
    buildUrl: true,
    appearance: "light",
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
    categories: ["stores"],
    languageResources,
    hiddenUI: ["appearance", "header"],
    theme: {
      header: {
        "& p": {
          color: "#000000",
          fontWeight: "600",
        }
      },
      container: {
        paddingTop: "24px",
        borderRadius: "10px",
        maxHeight: "680px",
        minWidth: "320px",
        boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.82);",
        [theme.breakpoints.down("md")]: {
          width: "320px",
        },
      },
      typography: {
        fontFamily: "Inter, sans-serif",
        "& .MuiTypography-h4": {
          color: "#000000",
          fontWeight: "600",
        },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: "50px",
              backgroundColor: "#FF9900",
              color: "#000000 !important",
              "& .MuiLink-button": {
                color: "#000000 !important",
              },
            },
          },
        },
        SelectProductCard: {
          styleOverrides: {
            root: {
              background: "linear-gradient(45deg, #F2F2F2 0%, #FF9900 100%)",
              color: "#000000 !important",
              border: "none",
            },
            actionButton: {
              borderRadius: "6px",
              padding: "6px 12px",
              backgroundColor: "#F2F2F2",
              color: "#000000 !important",
              fontWeight: "600",
              boxShadow: "0 2px 4px 0 rgba(0, 0, 0, 0.32);"
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
