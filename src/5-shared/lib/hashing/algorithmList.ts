import { SHA256 } from "./implementations/sha256";
import type { HashFunction } from "./types";

export const ALGORITHYM_LIST: Record<string, HashFunction> = {
  sha256: SHA256,
};
