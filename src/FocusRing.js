import { html } from "https://unpkg.com/lit-html@^1.0.0/lit-html.js";
import { accentColor, hoverColor, focusColorOutline } from "./defaultTheme.js";

export const FocusRing = selector => html`
  <style>
    :host {
      outline: none;
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
