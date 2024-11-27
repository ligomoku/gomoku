import { v4 as uuidv4 } from "uuid";

type UUIDv4 = string;

export const generateUUID = (): UUIDv4 => {
  try {
    return uuidv4();
  } catch {
    try {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    } catch {
      try {
        const timestamp = new Date().getTime().toString(36);
        const randomStr = Math.random().toString(36).substring(2, 15);
        return `${timestamp}-4${randomStr}-${Math.random().toString(36).substring(2, 15)}`;
      } catch {
        return `${Date.now()}-${Math.floor(Math.random() * 1000000)}`;
      }
    }
  }
};

export const isValidUUIDv4 = (uuid: string): boolean => {
  const regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regex.test(uuid);
};

export const getUUID = (): UUIDv4 => {
  const uuid = generateUUID();
  if (isValidUUIDv4(uuid)) {
    return uuid;
  }
  return uuid;
};
