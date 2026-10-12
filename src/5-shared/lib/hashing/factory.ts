import { ALGORITHM_LIST } from "./algorithmList";

export function selectHasher(name: string) {
  return ALGORITHM_LIST[name];
}
