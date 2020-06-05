import { html } from "https://unpkg.com/lit-html@^1.0.0/lit-html.js";

import {
  component,
  useEffect
} from "https://unpkg.com/haunted@4.4.0/haunted.js";

import { useNavigatableOptions } from "./useNavigatableOptions.js";

const List = element => {
  useNavigatableOptions(element);

  return html`
    <ul>
      <slot>No items</slot>
    </ul>
  `;
};

customElements.define("exo-list", component(List));
