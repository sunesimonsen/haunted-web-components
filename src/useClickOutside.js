import { useEffect } from "https://unpkg.com/haunted@4.4.0/haunted.js";

export const useClickOutside = element => {
  useEffect(() => {
    const clickOutsideHandler = e => {
      if (e.buttons === 1) {
        const composedPath = e.composedPath();

        if (!composedPath.includes(element)) {
          element.dispatchEvent(new CustomEvent("clickOutside"), element);
        }
      }
    };

    document.addEventListener("mousedown", clickOutsideHandler, true);
    return () => {
      document.removeEventListener("mousedown", clickOutsideHandler, true);
    };
  }, []);
};
