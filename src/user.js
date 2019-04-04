import { html } from "https://unpkg.com/lit-html@^1.0.0/lit-html.js";
import { component } from "https://unpkg.com/haunted@4.2.0/haunted.js";

const User = ({ data: { name, age } }) => html`
  <div class="user">${name} ${age}</div>
`;

customElements.define("x-user", component(User));
