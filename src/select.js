import { html } from "https://unpkg.com/lit-html@^1.0.0/lit-html.js";

import {
  component,
  useEffect,
  useState
} from "https://unpkg.com/haunted@4.2.0/haunted.js";

import { useNavigatableOptions } from "./useNavigatableOptions.js";

const Select = element => {
  const [isOpen, setIsOpen] = useState(false);

  useNavigatableOptions(element, { trapFocus: true });

  useEffect(() => {
    const trigger = element.shadowRoot.getElementById("trigger");

    element.addEventListener("change", e => {
      setIsOpen(false);
      trigger.focus();
    });

    element.addEventListener("keydown", e => {
      if (e.keyCode === 27) {
        // Esc
        setIsOpen(false);
        trigger.focus();
      }
    });
  });

  return html`
    <style>
      #container[open] > button::before {
        background: transparent;
        bottom: 0;
        content: " ";
        cursor: default;
        display: block;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: 80;
      }

      #container {
        position: relative;
      }

      #menu {
        position: absolute;
        border: thin solid black;
        z-index: 100;
        background: white;
        padding: 8px;
        margin: 0;
      }
    </style>
    <div id="container">
      <button id="trigger" @click=${() => setIsOpen(!isOpen)}>
        <slot name="value"></slot>
      </button>
      <div id="selection">
        ${isOpen
          ? html`
              <ul id="menu">
                <slot>No items!</slot>
              </ul>
            `
          : null}
      </div>
    </div>
  `;
};

const Selected = element => {
  useEffect(() => {
    element.setAttribute("slot", "value");
  });

  return html`
    <div class="value" tabindex="0"><slot></slot></div>
  `;
};

customElements.define("x-selected", component(Selected));
customElements.define("x-select", component(Select));
