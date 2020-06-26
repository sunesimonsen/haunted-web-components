import { html } from "https://unpkg.com/lit-html@^1.0.0/lit-html.js";
import { component } from "https://unpkg.com/haunted@^4.4.0/haunted.js";

const Option = () => html`
  <style>
    li {
      list-style: none;
    }
  </style>
  <li class="option" role="option"><slot></slot></li>
`;

customElements.define("exo-option", component(Option));
