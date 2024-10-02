import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import TypedLocalStore, { MemoryStorage } from "typed-local-store";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

type HeadersWithoutAuth = {
  "Content-Type": string;
  "X-Version"?: string;
};

type HeadersWithAuth = HeadersWithoutAuth & {
  Authorization: string;
};

export function getDefaultHeaders(authToken: string): HeadersWithAuth;
export function getDefaultHeaders(): HeadersWithoutAuth;

export function getDefaultHeaders(
  authToken?: string,
): HeadersWithAuth | HeadersWithoutAuth {
  if (authToken) {
    return {
      "Content-Type": "application/json",
      "X-Version": "1",
      Authorization: `Bearer ${authToken}`,
    };
  } else {
    return {
      "Content-Type": "application/json",
      "X-Version": "1",
    };
  }
}

interface FixedKeys {
  jwtToken: string;
  currentGameID: string;
}

type DynamicKeys = {
  [key: `gameBoard_${string}`]: string;
} & {
  [key: `nextTurn_${string}`]: string;
};

export type Schema = FixedKeys & DynamicKeys;

const memoryStorage = new MemoryStorage();
export const typedStorage = new TypedLocalStore<Schema>({
  fallbackStorage: memoryStorage,
});
