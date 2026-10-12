import sodium from "libsodium-wrappers-sumo";
await sodium.ready;

export const SHA512 = (input: string) => sodium.crypto_hash_sha512(input);
