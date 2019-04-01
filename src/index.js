import { html, render } from "https://unpkg.com/lit-html@1.0.0/lit-html.js";

import { repeat } from "https://unpkg.com/lit-html@1.0.0/directives/repeat.js";

import {
  component,
  useState
} from "https://unpkg.com/haunted@4.2.0/haunted.js";

import "./greeting.js";
import "./user.js";
import "./option.js";
import "./select.js";
import "./list.js";

const numbers = [
  {
    value: "one",
    label: html`
      <strong>One</strong>
    `
  },
  {
    value: "two",
    label: html`
      <em>Two</em>
    `
  },
  {
    value: "three",
    label: html`
      Three
    `
  }
];

const App = () => {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("one");

  return html`
    <style>
      section + section {
        margin-top: 10px;
      }
    </style>
    <section>
      <x-greeting name=${name || "Enter a name"}></x-greeting>
      <fieldset>
        <label>Update name:</label>
        <input @keyup=${e => setName(e.target.value)} value=${name} />
      </fieldset>
    </section>
    <section>
      <x-user .data=${{ name: "Jane Doe", age: 42 }}></x-user>
    </section>
    <section>
      <x-select @change=${e => setSelected(e.detail)}>
        <x-selected>
          ${numbers.find(({ value }) => value === selected).label}
        </x-selected>
        ${repeat(
          numbers,
          ({ value }) => value,
          ({ value, label }) => html`
            <x-option tabIndex="0" value=${value}>${label}</x-option>
          `
        )}
      </x-select>
    </section>
    <section>
      <x-list @change=${e => setSelected(e.detail)}>
        ${repeat(
          numbers,
          ({ value }) => value,
          ({ value, label }, i) => html`
            <x-option tabIndex="0" value=${value}>${label}</x-option>
          `
        )}
      </x-list>
      Chosen: ${numbers.find(({ value }) => value === selected).label}
    </section>
  `;
};

customElements.define("x-app", component(App));

render(
  html`
    <x-app></x-app>
  `,
  document.body
);
