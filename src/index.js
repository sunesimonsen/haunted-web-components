import { html, render } from "https://unpkg.com/lit-html@^1.0.0/lit-html.js";

import { repeat } from "https://unpkg.com/lit-html@^1.0.0/directives/repeat.js";

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

const colors = [
  { label: "Support Green", value: "#78A300" },
  { label: "Message Green", value: "#37B8AF" },
  { label: "Explore Blue", value: "#30AABC" },
  { label: "Guide Pink", value: "#EB4962" },
  { label: "Connect Red", value: "#EB6651" },
  { label: "Chat Orange", value: "#F79A3E" },
  { label: "Talk Yellow", value: "#EFC93D" },
  { label: "Sell Gold", value: "#D4AE5E" }
];

const App = () => {
  const [name, setName] = useState("");
  const [selectedNumber, setSelectedNumber] = useState(numbers[0].value);
  const [selectedColor, setSelectedColor] = useState(colors[0].value);

  return html`
    <style>
      section + section {
        margin-top: 10px;
      }
      .blue {
        --accent-color: #5293c7;
        --accent-color-hover: #5293c715;
        --focus-color: #5293c725;
        --focus-color-outline: #5293c760;
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
      <x-list @change=${e => setSelectedNumber(e.target.value)}>
        ${repeat(
          numbers,
          ({ value }) => value,
          ({ value, label }, i) => html`
            <x-option tabIndex="0" value=${value}>${label}</x-option>
          `
        )}
      </x-list>
      Chosen: ${numbers.find(({ value }) => value === selectedNumber).label}
    </section>
    <section>
      <x-select @change=${e => setSelectedNumber(e.target.value)}>
        <x-selected>
          ${numbers.find(({ value }) => value === selectedNumber).label}
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
    <section class="blue">
      <x-select @change=${e => setSelectedNumber(e.target.value)}>
        <x-selected>
          ${numbers.find(({ value }) => value === selectedNumber).label}
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
      <x-select @change=${e => setSelectedColor(e.target.value)}>
        <x-selected>
          <span style="color: ${selectedColor}">
            ${colors.find(({ value }) => value === selectedColor).label}
          </span>
        </x-selected>
        ${repeat(
          colors,
          ({ value }) => value,
          ({ value, label }) => html`
            <x-option tabIndex="0" value=${value}>
              <span style="color: ${value}">${label}</span>
            </x-option>
          `
        )}
      </x-select>
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
