import React from "react";
import { ConnectButton as ConnectButtonRainbow } from "@rainbow-me/rainbowkit";
import { Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import {
  useMiniPayDetection,
  useIsFarcaster,
  useIsCoinbase,
} from "../../hooks/walletDetect";
import { useAccount, useConnect } from "wagmi";
import { useIsWorldApp } from "@hooks/walletDetect";

export const ConnectButton = () => {
  const theme = useTheme();
  const { isMiniPay } = useMiniPayDetection();
  const isInMiniApp = useIsFarcaster();
  const isCoinbase = useIsCoinbase();
  const { t } = useTranslation("wallet");
  const isWorldWallet = useIsWorldApp();

  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  if (isWorldWallet) {
    return null;
  }

  if (isInMiniApp && !isConnected) {
    return (
      <Button
        onClick={() => connect({ connector: connectors[0] })}
        variant="contained"
        sx={{
          borderRadius: "8px",
          background: "white",
          textTransform: "none",
          color: "black",
          fontWeight: "600",
          fontSize: "0.875rem",
          padding: "8px 16px",
          border: "1px solid transparent",
          backgroundClip: "padding-box",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.3s ease",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "100%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
            transition: "left 0.5s ease",
          },
          "&:hover": {
            transform: "translateY(-2px) scale(1.02)",
            "&::before": {
              left: "100%",
            },
          },
          "&:active": {
            transform: "translateY(0px)",
          },
        }}
        size="small"
      >
        {t("wallet:connectWallet")}
      </Button>
    );
  }

  return (
    <ConnectButtonRainbow.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const ready = mounted;
        const connected = ready && account && chain;
        return !isMiniPay && (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    variant="contained"
                    sx={{
                      borderRadius: "8px",
                      background: "white",
                      textTransform: "none",
                      color: "black",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      padding: "8px 16px",
                      border: "1px solid transparent",
                      backgroundClip: "padding-box",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "left 0.5s ease",
                      },
                      "&:hover": {
                        transform: "translateY(-1px)",
                        "&::before": {
                          left: "100%",
                        },
                      },
                      "&:active": {
                        transform: "translateY(0px)",
                      },
                    }}
                    size="small"
                  >
                    {t("wallet:connectWallet")}
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    variant="contained"
                    sx={{
                      borderRadius: "8px",
                      background: "linear-gradient(45deg, #FF4444 0%, #FF8888 100%)",
                      textTransform: "none",
                      color: "#ffffff",
                      fontWeight: "600",
                      fontSize: "0.875rem",
                      padding: "8px 16px",
                      border: "1px solid transparent",
                      backgroundClip: "padding-box",
                      boxShadow: "0 0 20px rgba(255, 68, 68, 0.4), 0 0 40px rgba(255, 136, 136, 0.2)",
                      position: "relative",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "left 0.5s ease",
                      },
                      "&:hover": {
                        boxShadow: "0 0 30px rgba(255, 68, 68, 0.6), 0 0 60px rgba(255, 136, 136, 0.4)",
                        transform: "translateY(-1px)",
                        "&::before": {
                          left: "100%",
                        },
                      },
                      "&:active": {
                        transform: "translateY(0px)",
                      },
                    }}
                    size="small"
                  >
                    {t("wallet:wrongNetwork")}
                  </Button>
                );
              }

              return (
                <div style={{ display: "flex" }}>
                  {!isMiniPay && !isCoinbase && (
                    <Button
                      onClick={openChainModal}
                      sx={{
                        display: {
                          md: "flex",
                          alignItems: "center",
                        },
                        background: "transparent",
                        border: "none",
                        color: "black",
                        px: { xs: 0.5, sm: 1, md: 2 },
                        py: { xs: 0.2, sm: 0.5, md: 1 },
                        minWidth: { xs: 0, sm: 0, md: 36 },
                        fontWeight: "500",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                      variant="contained"
                      size="small"
                    >
                      <Box
                        component="img"
                        alt={chain.name ?? "Chain icon"}
                        src={chain.iconUrl}
                        sx={{
                          width: { xs: 18, md: 15 },
                          height: { xs: 18, md: 15 },
                          mr: 1,
                          borderRadius: "50px",
                        }}
                      />
                      <Box sx={{ display: { xs: "none", md: "block" } }}>
                        {chain.name}
                      </Box>
                    </Button>
                  )}
                  <Button
                    onClick={openAccountModal}
                    variant="contained"
                    size="small"
                    sx={{
                      fontSize: { xs: 12, sm: "1rem" },
                      background: "transparent",
                      border: "none",
                      color: "black",
                      px: { xs: 0.5, sm: 1, md: 2 },
                      py: { xs: 0.2, sm: 0.5, md: 1 },
                      minWidth: { xs: 0, sm: 0, md: 36 },
                      fontWeight: "500",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  >
                    {account.displayName}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButtonRainbow.Custom>
  );
};
