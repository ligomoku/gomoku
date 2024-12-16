import { createContext, useContext, useEffect, useState, useMemo } from "react";

import type { PropsWithChildren } from "react";

// @ts-ignore
import { init, sendCommand, stopThinking } from "@/ai/engine.js";

interface WasmEngineContextType {
  isEngineReady: boolean;
  sendCommand: (cmd: string) => void;
  stopThinking: () => void;
}

const WasmEngineContext = createContext<WasmEngineContextType | undefined>(
  undefined,
);

export const WasmEngineProvider = ({ children }: PropsWithChildren) => {
  const [isEngineReady, setIsEngineReady] = useState(false);

  useEffect(() => {
    console.log("Initializing engine...");
    init(({ ok }: { ok: boolean }) => {
      if (ok) {
        console.log("Engine initialized successfully.");
        setIsEngineReady(true);
      } else {
        console.error("Engine failed to initialize.");
      }
    });
  }, []);

  const contextValue: WasmEngineContextType = useMemo(
    () => ({
      isEngineReady,
      sendCommand,
      stopThinking,
    }),
    [isEngineReady],
  );

  return (
    <WasmEngineContext.Provider value={contextValue}>
      {children}
    </WasmEngineContext.Provider>
  );
};

export const useWasmEngine = (): WasmEngineContextType => {
  const context = useContext(WasmEngineContext);
  if (!context) {
    throw new Error("useWasmEngine must be used within a WasmEngineProvider");
  }
  return context;
};
