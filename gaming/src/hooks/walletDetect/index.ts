import { useState, useEffect } from 'react';
import { sdk } from "@farcaster/frame-sdk";
import { MiniKit } from "@worldcoin/minikit-js";

/**
 * A hook that detects if the current Ethereum provider is MiniPay.
 * MiniPay is a mobile wallet with a web3 enabled browser built on Celo.
 *
 * @returns An object containing:
 * - isMiniPay: boolean indicating if the provider is MiniPay
 * - isProviderAvailable: boolean indicating if any provider is available
 */
export const useMiniPayDetection = () => {
  const [isMiniPay, setIsMiniPay] = useState<boolean>(false);
  const [isProviderAvailable, setIsProviderAvailable] =
    useState<boolean>(false);

  useEffect(() => {
    const detectMiniPay = () => {
      // Check if window.ethereum exists
      if (typeof window !== "undefined" && window.ethereum) {
        setIsProviderAvailable(true);
        // Check if the provider is MiniPay by looking for the isMiniPay property
        if (window.ethereum.isMiniPay) {
          setIsMiniPay(true);
        }
      }
    };

    detectMiniPay();

    // Listen for provider changes (e.g., if a user switches wallets)
    const handleProviderChange = () => {
      detectMiniPay();
    };

    if (typeof window !== "undefined") {
      window.addEventListener("ethereum#initialized", handleProviderChange);
      // Also listen for chainChanged as a proxy for provider changes
      if (window.ethereum) {
        window.ethereum.on("chainChanged", handleProviderChange);
      }
    }

    return () => {
      // Clean up event listeners
      if (typeof window !== "undefined") {
        window.removeEventListener(
          "ethereum#initialized",
          handleProviderChange
        );
        if (window.ethereum) {
          window.ethereum.removeListener("chainChanged", handleProviderChange);
        }
      }
    };
  }, []);

  return { isMiniPay, isProviderAvailable };
};

/**
 * A hook that detects if the application is running inside a Warpcast mini app.
 *
 * @returns A boolean indicating if the app is running inside a Warpcast mini app
 */
export const useIsFarcaster = () => {
  const [isFarcaster, setIsFarcaster] = useState(false);

  useEffect(() => {
    const checkFarcaster = async () => {
      try {
        const isInMiniAppResult = await sdk.isInMiniApp();
        setIsFarcaster(isInMiniAppResult);
      } catch (error) {
        setIsFarcaster(false);
      }
    };
    checkFarcaster();
  }, []);

  return isFarcaster;
};

export const useIsCoinbase = () => {
  const [isCoinbase, setIsCoinbase] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const detect = async () => {
      try {
        const isCoinbase =
          (await sdk.isInMiniApp()) &&
          (await sdk.context)?.client?.clientFid === 309857;

        if (!cancelled) setIsCoinbase(Boolean(isCoinbase));
      } catch {
        if (!cancelled) setIsCoinbase(false);
      }
    };

    detect();
    return () => {
      cancelled = true;
    };
  }, []);

  return isCoinbase;
};


/**
 * A hook that detects if the application is running inside a Binance mini app.
 *
 * @returns A boolean indicating if the app is running inside a Binance mini app
 */
export const useIsBinance = () => {
  const [isBinance, setIsBinance] = useState(false);

  useEffect(() => {
    const detect = () => {
      if (typeof window === "undefined") return;

      const { ethereum } = window as any;

      const bn =
        ethereum?.isBinance ||
        (Array.isArray(ethereum?.providers) &&
          ethereum.providers.some((p: any) => p.isBinance));

      setIsBinance(Boolean(bn));
    };

    detect();

    window.addEventListener("ethereum#initialized", detect);
    window.ethereum?.on?.("chainChanged", detect);

    return () => {
      window.removeEventListener("ethereum#initialized", detect);
      window.ethereum?.removeListener?.("chainChanged", detect);
    };
  }, []);

  return isBinance;
};

/**
 * A hook that detects if the application is running inside World App.
 *
 * @returns A boolean indicating if the app is running inside World App
 */
export const useIsWorldApp = () => {
  const [isWorldApp, setIsWorldApp] = useState(false);

  useEffect(() => {
    const checkWorldApp = async () => {
      try {
        const isInstalled = MiniKit.isInstalled();
        setIsWorldApp(isInstalled);
      } catch (error) {
        setIsWorldApp(false);
      }
    };
    checkWorldApp();
  }, []);

  return isWorldApp;
};

/**
 * Type declaration for the global window object with Ethereum provider
 */
declare global {
  interface Window {
    ethereum?:
      | {
          isMiniPay?: boolean;
          isMetaMask?: boolean;
          isRainbow?: boolean;
          isPhantom?: boolean;
          isWalletConnect?: boolean;
          isBinance?: boolean;
          isZerion?: boolean;
          isSafe?: boolean;
          isRabby?: boolean;
          isCoinbase?: boolean;
          isBraveWallet?: boolean;
          on: (event: string, callback: () => void) => void;
          removeListener: (event: string, callback: () => void) => void;
          [key: string]: any;
        }
      | any;
    bn?: any;
  }
}
