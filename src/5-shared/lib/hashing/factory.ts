import { ALGORITHYM_LIST } from "./algorithmList";

export function selectHasher(name: string) {
  return ALGORITHYM_LIST[name];
}
