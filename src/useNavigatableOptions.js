import { useEffect } from "https://unpkg.com/haunted@4.2.0/haunted.js";

export const useNavigatableOptions = (element, { trapFocus = false } = {}) => {
  useEffect(() => {
    const select = e => {
      const option = e.target.closest("x-option");

      if (option) {
        const detail = option.getAttribute("value");
        element.dispatchEvent(new CustomEvent("change", { detail }));
        e.preventDefault();
      }
    };

    const nextItem = e => {
      e.preventDefault();
      const options = Array.from(element.querySelectorAll("x-option"));

      if (e.target.nodeName.toLowerCase() === "x-option") {
        const index = options.indexOf(e.target);
        const newIndex = (index + 1) % options.length;

        options[newIndex].focus();
      } else {
        const lastOption = options[0];
        lastOption && lastOption.focus();
      }
    };

    const previousItem = e => {
      e.preventDefault();
      const options = Array.from(element.querySelectorAll("x-option"));

      if (e.target.nodeName.toLowerCase() === "x-option") {
        const index = options.indexOf(e.target);
        const newIndex = index - 1;

        if (newIndex < 0) {
          options[options.length - 1].focus();
        } else {
          options[newIndex].focus();
        }
      } else {
        const lastOption = options[options.length - 1];
        lastOption && lastOption.focus();
      }
    };

    element.addEventListener("click", e => {
      select(e);
    });

    element.addEventListener("keydown", e => {
      if (e.keyCode === 9 && trapFocus) {
        if (e.shiftKey) {
          return previousItem(e);
        } else {
          return nextItem(e);
        }
      }

      switch (e.keyCode) {
        case 13: // Enter
        case 32: // Space
          return select(e);

        case 38: // Arrow up
          return previousItem(e);

        case 40: // Arrow down
          return nextItem(e);
      }
    });
  });
};
