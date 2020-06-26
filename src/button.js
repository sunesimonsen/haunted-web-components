import { html } from "https://unpkg.com/lit-html@^1.0.0/lit-html.js";
import {
  component,
  useEffect
} from "https://unpkg.com/haunted@^4.4.0/haunted.js";
import { accentColor, hoverColor, focusColorOutline } from "./defaultTheme.js";

const Button = element => {
  return html`
    <style>
      :host {
        outline: none;
      }
      button {
        border: 1px solid var(--accent-color, ${accentColor});
        border-radius: 4px;
        min-width: 8.57143em;
        background-color: transparent;
        padding: 0.6em 2.25em;
        text-align: center;
        color: var(--accent-color, ${accentColor});
        font-size: 14px;
        font-weight: 400;
        box-sizing: border-box;
        user-select: none;
      }

      button:active,
      button:hover {
        background: var(--accent-color-hover, ${hoverColor});
      }

      button:focus {
        outline: none;
        box-shadow: 0 0 0 3px var(--focus-color-outline, ${focusColorOutline});
      }
    </style>
    <button><slot></slot></button>
  `;
};

customElements.define(
  "exo-button",
  component(Button, HTMLElement, {
    shadowRootInit: { delegatesFocus: true }
  })
);
