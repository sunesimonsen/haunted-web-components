import { html } from "https://unpkg.com/lit-html@^1.0.0/lit-html.js";
import {
  component,
  useEffect
} from "https://unpkg.com/haunted@^4.4.0/haunted.js";
import {
  accentColor,
  hoverColor,
  buttonPaddingX,
  buttonLineHeight,
  spacingFactor
} from "./defaultTheme.js";
import { FocusRing } from "./FocusRing.js";

const Button = element => {
  return html`
    ${FocusRing("button")}
    <style>
      button {
        border: 1px solid var(--accent-color, ${accentColor});
        border-radius: 4px;
        background-color: transparent;
        padding: 0
          calc(
            var(--button-padding-x, ${buttonPaddingX}) *
              var(--spacing-factor, ${spacingFactor})
          );
        line-height: calc(
          var(--button-line-height, ${buttonLineHeight}) *
            var(--spacing-factor, ${spacingFactor})
        );
        text-align: center;
        color: var(--accent-color, ${accentColor});
        font-size: var(--button-font-size, 1rem);
        font-weight: 400;
        box-sizing: border-box;
        user-select: none;
      }

      button:active,
      button:hover {
        background: var(--accent-color-hover, ${hoverColor});
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
