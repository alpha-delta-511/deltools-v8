import { SHA256 } from "./implementations/sha256";
import { SHA512 } from "./implementations/sha512";
import type { HashFunction } from "./types";

export const ALGORITHM_LIST: Record<string, HashFunction> = {
  sha256: SHA256,
  sha512: SHA512,
};
