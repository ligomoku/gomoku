import { typedStorage } from "@/shared/lib/utils";

export const didChunkFailed = (error: { message: string }) => {
  const chunkFailedMessage = /Loading chunk \d+ failed/;
  const cssChunkFailedMessage = /Loading CSS chunk \d+ failed/;

  return (
    error?.message &&
    (chunkFailedMessage.test(error.message) ||
      cssChunkFailedMessage.test(error.message))
  );
};

export const setChunkReloadAt = () => {
  const item = {
    value: "true",
    expiry: new Date().getTime() + 10000,
  };
  typedStorage.setItem("chunkReloadedAt", JSON.stringify(item));
};

export const didChunkAlreadyReload = () => {
  const itemString = typedStorage.getItem("chunkReloadedAt");
  if (!itemString) return false;

  const item = JSON.parse(itemString);
  const isExpired = new Date().getTime() > item.expiry;

  if (isExpired) {
    typedStorage.removeItem("chunkReloadedAt");
    return false;
  }

  return true;
};
