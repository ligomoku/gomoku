import TypedLocalStore, { MemoryStorage } from "typed-local-store";

export interface LocalSchema {
  currentGameID: string;
  chunkReloadedAt: string;
}

export interface SessionSchema {
  anonymousSessionID: string;
}

const memoryStorage = new MemoryStorage();
export const typedStorage = new TypedLocalStore<LocalSchema>({
  fallbackStorage: memoryStorage,
});

export const typedSessionStorage = new TypedLocalStore<SessionSchema>({
  fallbackStorage: memoryStorage,
  storage: "sessionStorage",
});
