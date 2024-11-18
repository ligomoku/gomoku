import { typedStorage } from "@/utils/typedStorage";

export class ChunkLoader {
  private static readonly CHUNK_FAILED_MESSAGE = /Loading chunk \d+ failed/;
  private static readonly CSS_CHUNK_FAILED_MESSAGE =
    /Loading CSS chunk \d+ failed/;
  private static readonly RELOAD_EXPIRY_TIME = 10000; // 10 seconds
  private static readonly STORAGE_KEY = "chunkReloadedAt";

  /**
   * Checks if a given error indicates a chunk loading failure.
   * @param error The error object containing a message.
   * @returns True if the error indicates a chunk loading failure, false otherwise.
   */
  public static didChunkFail(error: { message: string }): boolean {
    return <boolean>(
      (error?.message &&
        (this.CHUNK_FAILED_MESSAGE.test(error.message) ||
          this.CSS_CHUNK_FAILED_MESSAGE.test(error.message)))
    );
  }

  /**
   * Sets the reload timestamp for chunks in storage.
   */
  public static setChunkReloadAt(): void {
    const item = {
      value: "true",
      expiry: new Date().getTime() + this.RELOAD_EXPIRY_TIME,
    };
    typedStorage.setItem(this.STORAGE_KEY, JSON.stringify(item));
  }

  /**
   * Checks if the chunk has already been reloaded based on stored timestamp.
   * @returns True if the chunk was recently reloaded and the timestamp has not expired; false otherwise.
   */
  public static didChunkAlreadyReload(): boolean {
    const itemString = typedStorage.getItem(this.STORAGE_KEY);
    if (!itemString) return false;

    const item = JSON.parse(itemString);
    const isExpired = new Date().getTime() > item.expiry;

    if (isExpired) {
      typedStorage.removeItem(this.STORAGE_KEY);
      return false;
    }

    return true;
  }
}
