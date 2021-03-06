import { html } from "https://unpkg.com/lit-html@^1.0.0/lit-html.js";

import {
  component,
  useEffect,
  useState
} from "https://unpkg.com/haunted@^4.4.0/haunted.js";

import { useNavigatableOptions } from "./useNavigatableOptions.js";
import { useClickOutside } from "./useClickOutside.js";
import "./button.js";
import {
  hoverColor,
  focusColor,
  spacingFactor,
  selectOptionLineHeight,
  selectOptionPaddingX
} from "./defaultTheme.js";

const Select = element => {
  const [isOpen, setIsOpen] = useState(false);

  useNavigatableOptions(element);
  useClickOutside(element);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = ({ focusTrigger = false } = {}) => {
    setIsOpen(false);
    if (focusTrigger) {
      const trigger = element.shadowRoot.getElementById("trigger");
      trigger.focus();
    }
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
      if (isOpen && !element.querySelector("exo-option:focus")) {
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
        return closeMenu({ focusTrigger: true });
    }
  };

  useEffect(() => {
    element.addEventListener("clickOutside", () => {
      if (isOpen) {
        closeMenu();
      }
    });

    element.addEventListener("change", () => {
      if (isOpen) {
        closeMenu();
      }
    });
  }, [element, isOpen]);

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
        z-index: 101;
        background: white;
        box-shadow: 0 20px 30px 0 rgba(4, 68, 77, 0.15);
        padding: 8px 0;
        margin: 0;
        margin-top: 2px;
        min-width: 180px;
        font-size: var(--button-font-size, 1rem);
      }

      ::slotted(exo-option) {
        display: block;
        padding: 0
          calc(
            var(--select-option-padding-x, ${selectOptionPaddingX}) *
              var(--spacing-factor, ${spacingFactor})
          );
        line-height: calc(
          var(--select-option-line-height, ${selectOptionLineHeight}) *
            var(--spacing-factor, ${spacingFactor})
        );
      }

      ::slotted(exo-option:focus) {
        background: var(--focus-color, ${focusColor});
        outline: none;
      }

      ::slotted(exo-option:hover) {
        background: var(--accent-color-hover, ${hoverColor});
      }
    </style>
    <div id="container" @keydown=${onKeyDown}>
      <exo-button id="trigger" @click=${toggleOpenState}>
        <slot name="value"></slot>
      </exo-button>
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

customElements.define("exo-selected", component(Selected));
customElements.define("exo-select", component(Select));
