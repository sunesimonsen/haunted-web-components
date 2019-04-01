import { html } from "https://unpkg.com/lit-html@1.0.0/lit-html.js";
import { component } from "https://unpkg.com/haunted@4.2.0/haunted.js";

const Greeting = ({ name }) => html`
  <div class="greeting"><h1>${name}</h1></div>
`;

Greeting.observedAttributes = ["name"];

customElements.define("x-greeting", component(Greeting));
