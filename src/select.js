import { html } from "https://unpkg.com/lit-html@^1.0.0/lit-html.js";

import {
  component,
  useEffect,
  useState
} from "https://unpkg.com/haunted@4.2.0/haunted.js";

import { useNavigatableOptions } from "./useNavigatableOptions.js";
import "./button.js";
import { hoverColor, focusColor } from "./defaultTheme.js";

const Select = element => {
  const [isOpen, setIsOpen] = useState(false);

  useNavigatableOptions(element);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
    const trigger = element.shadowRoot.getElementById("trigger");
    trigger.focus();
  };

  const toggleOpenState = () => {
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const closeOnBlur = e => {
    setTimeout(() => {
      if (isOpen && !element.querySelector("x-option:focus")) {
        closeMenu();
      }
    }, 1);
  };

  const onKeyDown = e => {
    switch (e.keyCode) {
      case 9:
        // Tab
        return closeOnBlur(e);

      case 27:
        // Esc
        e.preventDefault();
        return closeMenu();
    }
  };

  useEffect(() => {
    element.addEventListener("change", () => {
      closeMenu();
    });
  }, [element]);

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
        border: 1px solid #d8dcde;
        border-radius: 3px;
        z-index: 100;
        background: white;
        box-shadow: 0 20px 30px 0 rgba(4, 68, 77, 0.15);
        padding: 8px 0;
        margin: 0;
        margin-top: 2px;
        min-width: 180px;
      }

      ::slotted(x-option) {
        display: block;
        padding: 10px 32px;
      }

      ::slotted(x-option:focus) {
        background: var(--focus-color, ${focusColor});
        outline: none;
      }

      ::slotted(x-option:hover) {
        background: var(--accent-color-hover, ${hoverColor});
      }
    </style>
    <div id="container" @keydown=${onKeyDown}>
      <x-button id="trigger" @click=${toggleOpenState}>
        <slot name="value"></slot>
      </x-button>
      ${isOpen
        ? html`
            <ul id="menu">
              <slot>No items!</slot>
            </ul>
          `
        : null}
    </div>
  `;
};

const Selected = element => {
  useEffect(() => {
    element.setAttribute("slot", "value");
  });

  return html`
    <slot></slot>
  `;
};

customElements.define("x-selected", component(Selected));
customElements.define("x-select", component(Select));
