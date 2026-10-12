import sodium from "libsodium-wrappers-sumo";
await sodium.ready;

export const SHA256 = (input: string) => sodium.crypto_hash_sha256(input);
