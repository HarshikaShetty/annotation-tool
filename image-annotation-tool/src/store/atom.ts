import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const imagesAtom = atomWithStorage<IImage[]>(
  "images", // key for sessionStorage
  [], // initial value
  {
    getItem: (key) => {
      const stored = sessionStorage.getItem(key);
      return stored ? (JSON.parse(stored) as IImage[]) : [];
    },
    setItem: (key, newValue) => {
      sessionStorage.setItem(key, JSON.stringify(newValue));
    },
    removeItem: (key) => {
      sessionStorage.removeItem(key);
    },
  }
);
export const showWebCamAtom = atom<boolean>(true);
