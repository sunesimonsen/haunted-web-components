import { html } from "https://unpkg.com/lit-html@^1.0.0/lit-html.js";
import { accentColor, hoverColor, focusColorOutline } from "./defaultTheme.js";

export const FocusRing = selector => html`
  <style>
    :host {
      outline: none;
    }

    ${selector} {
      transition: border-color 0.25s ease-in-out 0s,
        box-shadow 0.1s ease-in-out 0s, background-color 0.25s ease-in-out 0s,
        color 0.25s ease-in-out 0s;
    }

    ${selector + ":focus"} {
      outline: none;
      box-shadow: 0 0 0 3px var(--focus-color-outline, ${focusColorOutline});
    }

    ${selector + ":focus:not(:focus-visible)"} {
      outline: none;
      box-shadow: none;
    }

    ${selector + ":focus-visible"} {
      outline: none;
      box-shadow: 0 0 0 3px var(--focus-color-outline, ${focusColorOutline});
    }
  </style>
`;
