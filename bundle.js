const e=new WeakMap,t=t=>"function"==typeof t&&e.has(t),s="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,n=(e,t,s=null)=>{for(;t!==s;){const s=t.nextSibling;e.removeChild(t),t=s}},o={},i={},l=`{{lit-${String(Math.random()).slice(2)}}}`,a=`\x3c!--${l}--\x3e`,r=new RegExp(`${l}|${a}`),u="$lit$";class c{constructor(e,t){this.parts=[],this.element=t;const s=[],n=[],o=document.createTreeWalker(t.content,133,null,!1);let i=0,a=-1,c=0;const{strings:h,values:{length:m}}=e;for(;c<m;){const e=o.nextNode();if(null!==e){if(a++,1===e.nodeType){if(e.hasAttributes()){const t=e.attributes,{length:s}=t;let n=0;for(let e=0;e<s;e++)d(t[e].name,u)&&n++;for(;n-- >0;){const t=h[c],s=f.exec(t)[2],n=s.toLowerCase()+u,o=e.getAttribute(n);e.removeAttribute(n);const i=o.split(r);this.parts.push({type:"attribute",index:a,name:s,strings:i}),c+=i.length-1}}"TEMPLATE"===e.tagName&&(n.push(e),o.currentNode=e.content)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(l)>=0){const n=e.parentNode,o=t.split(r),i=o.length-1;for(let t=0;t<i;t++){let s,i=o[t];if(""===i)s=p();else{const e=f.exec(i);null!==e&&d(e[2],u)&&(i=i.slice(0,e.index)+e[1]+e[2].slice(0,-u.length)+e[3]),s=document.createTextNode(i)}n.insertBefore(s,e),this.parts.push({type:"node",index:++a})}""===o[i]?(n.insertBefore(p(),e),s.push(e)):e.data=o[i],c+=i}}else if(8===e.nodeType)if(e.data===l){const t=e.parentNode;null!==e.previousSibling&&a!==i||(a++,t.insertBefore(p(),e)),i=a,this.parts.push({type:"node",index:a}),null===e.nextSibling?e.data="":(s.push(e),a--),c++}else{let t=-1;for(;-1!==(t=e.data.indexOf(l,t+1));)this.parts.push({type:"node",index:-1}),c++}}else o.currentNode=n.pop()}for(const e of s)e.parentNode.removeChild(e)}}const d=(e,t)=>{const s=e.length-t.length;return s>=0&&e.slice(s)===t},h=e=>-1!==e.index,p=()=>document.createComment(""),f=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class m{constructor(e,t,s){this.__parts=[],this.template=e,this.processor=t,this.options=s}update(e){let t=0;for(const s of this.__parts)void 0!==s&&s.setValue(e[t]),t++;for(const e of this.__parts)void 0!==e&&e.commit()}_clone(){const e=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),t=[],n=this.template.parts,o=document.createTreeWalker(e,133,null,!1);let i,l=0,a=0,r=o.nextNode();for(;l<n.length;)if(i=n[l],h(i)){for(;a<i.index;)a++,"TEMPLATE"===r.nodeName&&(t.push(r),o.currentNode=r.content),null===(r=o.nextNode())&&(o.currentNode=t.pop(),r=o.nextNode());if("node"===i.type){const e=this.processor.handleTextExpression(this.options);e.insertAfterNode(r.previousSibling),this.__parts.push(e)}else this.__parts.push(...this.processor.handleAttributeExpressions(r,i.name,i.strings,this.options));l++}else this.__parts.push(void 0),l++;return s&&(document.adoptNode(e),customElements.upgrade(e)),e}}const g=` ${l} `;class v{constructor(e,t,s,n){this.strings=e,this.values=t,this.type=s,this.processor=n}getHTML(){const e=this.strings.length-1;let t="",s=!1;for(let n=0;n<e;n++){const e=this.strings[n],o=e.lastIndexOf("\x3c!--");s=(o>-1||s)&&-1===e.indexOf("--\x3e",o+1);const i=f.exec(e);t+=null===i?e+(s?g:a):e.substr(0,i.index)+i[1]+i[2]+u+i[3]+l}return t+=this.strings[e]}getTemplateElement(){const e=document.createElement("template");return e.innerHTML=this.getHTML(),e}}const x=e=>null===e||!("object"==typeof e||"function"==typeof e),b=e=>Array.isArray(e)||!(!e||!e[Symbol.iterator]);class _{constructor(e,t,s){this.dirty=!0,this.element=e,this.name=t,this.strings=s,this.parts=[];for(let e=0;e<s.length-1;e++)this.parts[e]=this._createPart()}_createPart(){return new w(this)}_getValue(){const e=this.strings,t=e.length-1;let s="";for(let n=0;n<t;n++){s+=e[n];const t=this.parts[n];if(void 0!==t){const e=t.value;if(x(e)||!b(e))s+="string"==typeof e?e:String(e);else for(const t of e)s+="string"==typeof t?t:String(t)}}return s+=e[t]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class w{constructor(e){this.value=void 0,this.committer=e}setValue(e){e===o||x(e)&&e===this.value||(this.value=e,t(e)||(this.committer.dirty=!0))}commit(){for(;t(this.value);){const e=this.value;this.value=o,e(this)}this.value!==o&&this.committer.commit()}}class y{constructor(e){this.value=void 0,this.__pendingValue=void 0,this.options=e}appendInto(e){this.startNode=e.appendChild(p()),this.endNode=e.appendChild(p())}insertAfterNode(e){this.startNode=e,this.endNode=e.nextSibling}appendIntoPart(e){e.__insert(this.startNode=p()),e.__insert(this.endNode=p())}insertAfterPart(e){e.__insert(this.startNode=p()),this.endNode=e.endNode,e.endNode=this.startNode}setValue(e){this.__pendingValue=e}commit(){if(null===this.startNode.parentNode)return;for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=o,e(this)}const e=this.__pendingValue;e!==o&&(x(e)?e!==this.value&&this.__commitText(e):e instanceof v?this.__commitTemplateResult(e):e instanceof Node?this.__commitNode(e):b(e)?this.__commitIterable(e):e===i?(this.value=i,this.clear()):this.__commitText(e))}__insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}__commitNode(e){this.value!==e&&(this.clear(),this.__insert(e),this.value=e)}__commitText(e){const t=this.startNode.nextSibling,s="string"==typeof(e=null==e?"":e)?e:String(e);t===this.endNode.previousSibling&&3===t.nodeType?t.data=s:this.__commitNode(document.createTextNode(s)),this.value=e}__commitTemplateResult(e){const t=this.options.templateFactory(e);if(this.value instanceof m&&this.value.template===t)this.value.update(e.values);else{const s=new m(t,e.processor,this.options),n=s._clone();s.update(e.values),this.__commitNode(n),this.value=s}}__commitIterable(e){Array.isArray(this.value)||(this.value=[],this.clear());const t=this.value;let s,n=0;for(const o of e)void 0===(s=t[n])&&(s=new y(this.options),t.push(s),0===n?s.appendIntoPart(this):s.insertAfterPart(t[n-1])),s.setValue(o),s.commit(),n++;n<t.length&&(t.length=n,this.clear(s&&s.endNode))}clear(e=this.startNode){n(this.startNode.parentNode,e.nextSibling,this.endNode)}}class N{constructor(e,t,s){if(this.value=void 0,this.__pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=e,this.name=t,this.strings=s}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=o,e(this)}if(this.__pendingValue===o)return;const e=!!this.__pendingValue;this.value!==e&&(e?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=e),this.__pendingValue=o}}class E extends _{constructor(e,t,s){super(e,t,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new $(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class $ extends w{}let k=!1;(()=>{try{const e={get capture(){return k=!0,!1}};window.addEventListener("test",e,e),window.removeEventListener("test",e,e)}catch(e){}})();class A{constructor(e,t,s){this.value=void 0,this.__pendingValue=void 0,this.element=e,this.eventName=t,this.eventContext=s,this.__boundHandleEvent=(e=>this.handleEvent(e))}setValue(e){this.__pendingValue=e}commit(){for(;t(this.__pendingValue);){const e=this.__pendingValue;this.__pendingValue=o,e(this)}if(this.__pendingValue===o)return;const e=this.__pendingValue,s=this.value,n=null==e||null!=s&&(e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive),i=null!=e&&(null==s||n);n&&this.element.removeEventListener(this.eventName,this.__boundHandleEvent,this.__options),i&&(this.__options=V(e),this.element.addEventListener(this.eventName,this.__boundHandleEvent,this.__options)),this.value=e,this.__pendingValue=o}handleEvent(e){"function"==typeof this.value?this.value.call(this.eventContext||this.element,e):this.value.handleEvent(e)}}const V=e=>e&&(k?{capture:e.capture,passive:e.passive,once:e.once}:e.capture);const C=new class{handleAttributeExpressions(e,t,s,n){const o=t[0];return"."===o?new E(e,t.slice(1),s).parts:"@"===o?[new A(e,t.slice(1),n.eventContext)]:"?"===o?[new N(e,t.slice(1),s)]:new _(e,t,s).parts}handleTextExpression(e){return new y(e)}};function T(e){let t=S.get(e.type);void 0===t&&(t={stringsArray:new WeakMap,keyString:new Map},S.set(e.type,t));let s=t.stringsArray.get(e.strings);if(void 0!==s)return s;const n=e.strings.join(l);return void 0===(s=t.keyString.get(n))&&(s=new c(e,e.getTemplateElement()),t.keyString.set(n,s)),t.stringsArray.set(e.strings,s),s}const S=new Map,L=new WeakMap,M=(e,t,s)=>{let o=L.get(t);void 0===o&&(n(t,t.firstChild),L.set(t,o=new y(Object.assign({templateFactory:T},s))),o.appendInto(t)),o.setValue(e),o.commit()};"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const P=(e,...t)=>new v(e,t,"html",C),O=(e,t)=>{const s=e.startNode.parentNode,n=void 0===t?e.endNode:t.startNode,o=s.insertBefore(p(),n);s.insertBefore(p(),n);const i=new y(e.options);return i.insertAfterNode(o),i},B=(e,t)=>(e.setValue(t),e.commit(),e),I=(e,t,s)=>{const n=e.startNode.parentNode,o=s?s.startNode:e.endNode,i=t.endNode.nextSibling;i!==o&&((e,t,s=null,n=null)=>{for(;t!==s;){const s=t.nextSibling;e.insertBefore(t,n),t=s}})(n,t.startNode,i,o)},H=e=>{n(e.startNode.parentNode,e.startNode,e.endNode.nextSibling)},F=(e,t,s)=>{const n=new Map;for(let o=t;o<=s;o++)n.set(e[o],o);return n},R=new WeakMap,D=new WeakMap,W=(t=>(...s)=>{const n=t(...s);return e.set(n,!0),n})((e,t,s)=>{let n;return void 0===s?s=t:void 0!==t&&(n=t),t=>{if(!(t instanceof y))throw new Error("repeat can only be used in text bindings");const o=R.get(t)||[],i=D.get(t)||[],l=[],a=[],r=[];let u,c,d=0;for(const t of e)r[d]=n?n(t,d):d,a[d]=s(t,d),d++;let h=0,p=o.length-1,f=0,m=a.length-1;for(;h<=p&&f<=m;)if(null===o[h])h++;else if(null===o[p])p--;else if(i[h]===r[f])l[f]=B(o[h],a[f]),h++,f++;else if(i[p]===r[m])l[m]=B(o[p],a[m]),p--,m--;else if(i[h]===r[m])l[m]=B(o[h],a[m]),I(t,o[h],l[m+1]),h++,m--;else if(i[p]===r[f])l[f]=B(o[p],a[f]),I(t,o[p],o[h]),p--,f++;else if(void 0===u&&(u=F(r,f,m),c=F(i,h,p)),u.has(i[h]))if(u.has(i[p])){const e=c.get(r[f]),s=void 0!==e?o[e]:null;if(null===s){const e=O(t,o[h]);B(e,a[f]),l[f]=e}else l[f]=B(s,a[f]),I(t,s,o[h]),o[e]=null;f++}else H(o[p]),p--;else H(o[h]),h++;for(;f<=m;){const e=O(t,l[m+1]);B(e,a[f]),l[f++]=e}for(;h<=p;){const e=o[h++];null!==e&&H(e)}R.set(t,l),D.set(t,r)}}),j="function"==typeof Symbol?Symbol.for:e=>e,z=j("haunted.phase"),G=j("haunted.hook"),Q=j("haunted.update"),q=j("haunted.commit"),U=j("haunted.effects"),J=j("haunted.context");let Y,K=0;function X(e){Y=e}function Z(){Y=null,K=0}const ee=Promise.resolve().then.bind(Promise.resolve());function te(){let e,t=[];function s(){e=null;let s=t;t=[];for(var n=0,o=s.length;n<o;n++)s[n]()}return function(n){t.push(n),null==e&&(e=ee(s))}}const se=te(),ne=te();class oe{constructor(e,t,s){this.renderer=e,this.frag=t,this.host=s||t,this[G]=new Map,this[z]=null,this._updateQueued=!1}update(){this._updateQueued||(se(()=>{let e=this.handlePhase(Q);ne(()=>{this.handlePhase(q,e),this[U]&&ne(()=>{this.handlePhase(U)})}),this._updateQueued=!1}),this._updateQueued=!0)}handlePhase(e,t){switch(this[z]=e,e){case q:return this.commit(t);case Q:return this.render();case U:return this.runEffects(U)}this[z]=null}commit(e){M(e,this.frag),this.runEffects(q)}render(){X(this);let e=this.args?this.renderer.apply(this.host,this.args):this.renderer.call(this.host,this.host);return Z(),e}runEffects(e){let t=this[e];if(t){X(this);for(let e of t)e.call(this);Z()}}teardown(){this[G].forEach(e=>{"function"==typeof e.teardown&&e.teardown()})}}function ie(e,t=HTMLElement,{useShadowDOM:s=!0,shadowRootInit:n={}}={}){class o extends t{static get observedAttributes(){return e.observedAttributes||[]}constructor(){super(),!1===s?this._container=new oe(e,this):(this.attachShadow({mode:"open",...n}),this._container=new oe(e,this.shadowRoot,this))}connectedCallback(){this._container.update()}disconnectedCallback(){this._container.teardown()}attributeChangedCallback(e,t,s){let n=""===s||s;Reflect.set(this,function(e=""){return-1===e.indexOf("-")?e.toLowerCase():e.toLowerCase().split("-").reduce((e,t)=>e?e+t.charAt(0).toUpperCase()+t.slice(1):t,"")}(e),n)}}const i=new Proxy(t.prototype,{set(e,t,s,n){let o;return t in e&&Reflect.set(e,t,s),o="symbol"==typeof t||"_"===t[0]?{enumerable:!0,configurable:!0,writable:!0,value:s}:function(e){let t=e;return Object.freeze({enumerable:!0,configurable:!0,get:()=>t,set(e){t=e,this._container.update()}})}(s),Object.defineProperty(n,t,o),o.set&&o.set.call(n,s),!0}});return Object.setPrototypeOf(o.prototype,i),o}class le{constructor(e,t){this.id=e,this.el=t}}function ae(e,...t){let s=function(){let e=K;return K++,e}(),n=Y[G],o=n.get(s);return o||(o=new e(s,Y,...t),n.set(s,o)),o.update(...t)}function re(e){return ae.bind(null,e)}re(class extends le{constructor(e,t,s,n){super(e,t),this.value=s(),this.values=n}update(e,t){return this.hasChanged(t)&&(this.values=t,this.value=e()),this.value}hasChanged(e){return e.some((e,t)=>this.values[t]!==e)}});const ue=re(class extends le{constructor(e,t){super(e,t),this.values=!1,function(e,t){U in e||(e[U]=[]),e[U].push(t)}(t,this)}update(e,t){this.callback=e,this.lastValues=this.values,this.values=t}call(){this.values?this.hasChanged()&&this.run():this.run()}run(){this.teardown(),this._teardown=this.callback.call(this.el)}teardown(){this._teardown&&this._teardown()}hasChanged(){return!1===this.lastValues||this.values.some((e,t)=>this.lastValues[t]!==e)}}),ce=re(class extends le{constructor(e,t,s){super(e,t),this.updater=this.updater.bind(this),this.makeArgs(s)}update(){return this.args}updater(e){if("function"==typeof e){const t=e,[s]=this.args;e=t(s)}this.makeArgs(e),this.el.update()}makeArgs(e){this.args=Object.freeze([e,this.updater])}});re(class extends le{constructor(e,t,s,n){super(e,t),this.dispatch=this.dispatch.bind(this),this.state=n}update(e){return this.reducer=e,[this.state,this.dispatch]}dispatch(e){this.state=this.reducer(this.state,e),this.el.update()}});re(class extends le{constructor(e,t){super(e,t),function(e,t){J in e||(e[J]=[]),e[J].push(t)}(t,this),this._updater=this._updater.bind(this)}update(e){if(this.el.virtual)throw new Error("can't be used with virtual components");return this.Context!==e&&(this._subscribe(e),this.Context=e),this.value}_updater(e){this.value=e,this.el.update()}_subscribe(e){const t={Context:e,callback:this._updater};this.el.host.dispatchEvent(new CustomEvent("haunted.context",{detail:t,bubbles:!0,cancelable:!0,composed:!0}));const{unsubscribe:s,value:n}=t;this.value=s?n:e.defaultValue,this._unsubscribe=s}teardown(){this._unsubscribe&&this._unsubscribe()}});const de=({name:e})=>P`
  <div class="greeting"><h1>${e}</h1></div>
`;de.observedAttributes=["name"],customElements.define("exo-greeting",ie(de));customElements.define("exo-user",ie(({data:{name:e,age:t}})=>P`
  <div class="user">${e} ${t}</div>
`));customElements.define("exo-option",ie(()=>P`
  <style>
    li {
      list-style: none;
    }
  </style>
  <li class="option" role="option"><slot></slot></li>
`));const he=e=>{ue(()=>{const t=t=>{const s=t.target.closest("exo-option");if(s){const n=s.getAttribute("value");e.value=n,e.dispatchEvent(new CustomEvent("change",{detail:n}),e),t.preventDefault()}};e.addEventListener("click",e=>{t(e)}),e.addEventListener("keydown",s=>{switch(s.keyCode){case 13:return t(s);case 38:return(t=>{t.preventDefault();const s=Array.from(e.querySelectorAll("exo-option"));if("exo-option"===t.target.nodeName.toLowerCase()){const e=s.indexOf(t.target)-1;e<0?s[s.length-1].focus():s[e].focus()}else{const e=s[s.length-1];e&&e.focus()}})(s);case 40:return(t=>{t.preventDefault();const s=Array.from(e.querySelectorAll("exo-option"));if("exo-option"===t.target.nodeName.toLowerCase()){const e=s.indexOf(t.target);s[(e+1)%s.length].focus()}else{const e=s[0];e&&e.focus()}})(s)}})},[e])};customElements.define("exo-button",ie(e=>P`
    <style>
      :host {
        outline: none;
      }
      button {
        border: 1px solid var(--accent-color, ${"#012b30"});
        border-radius: 4px;
        min-width: 8.57143em;
        background-color: transparent;
        padding: 0.6em 2.25em;
        text-align: center;
        color: var(--accent-color, ${"#012b30"});
        font-size: 14px;
        font-weight: 400;
        box-sizing: border-box;
        user-select: none;
      }

      button:active,
      button:hover {
        background: var(--accent-color-hover, ${"#012b3010"});
      }

      button:focus {
        outline: none;
        box-shadow: 0 0 0 3px var(--focus-color-outline, ${"#012b3040"});
      }
    </style>
    <button><slot></slot></button>
  `,HTMLElement,{shadowRootInit:{delegatesFocus:!0}}));customElements.define("exo-selected",ie(e=>(ue(()=>{e.setAttribute("slot","value")}),P`
    <slot></slot>
  `))),customElements.define("exo-select",ie(e=>{const[t,s]=ce(!1);he(e);const n=({focusTrigger:t=!1}={})=>{s(!1),t&&e.shadowRoot.getElementById("trigger").focus()};return ue(()=>{e.addEventListener("change",()=>{n({focusTrigger:!0})})},[e]),P`
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
      }

      #backdrop {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: transparent;
      }

      ::slotted(exo-option) {
        display: block;
        padding: 10px 32px;
      }

      ::slotted(exo-option:focus) {
        background: var(--focus-color, ${"#012b3020"});
        outline: none;
      }

      ::slotted(exo-option:hover) {
        background: var(--accent-color-hover, ${"#012b3010"});
      }
    </style>
    <div id="container" @keydown=${s=>{switch(s.keyCode){case 9:return(s=>{setTimeout(()=>{t&&!e.querySelector("exo-option:focus")&&n()},1)})();case 27:return s.preventDefault(),n({focusTrigger:!0})}}}>
      <exo-button id="trigger" @click=${()=>{t?n():s(!0)}}>
        <slot name="value"></slot>
      </exo-button>
      ${t?P`
            <ul id="menu">
              <slot>No items!</slot>
            </ul>
            <div id="backdrop" @click="${n}" />
          `:null}
    </div>
  `}));customElements.define("exo-list",ie(e=>(he(e),P`
    <ul>
      <slot>No items</slot>
    </ul>
  `)));const pe=[{value:"one",label:P`
      <strong>One</strong>
    `},{value:"two",label:P`
      <em>Two</em>
    `},{value:"three",label:P`
      Three
    `}],fe=[{label:"Support Green",value:"#78A300"},{label:"Message Green",value:"#37B8AF"},{label:"Explore Blue",value:"#30AABC"},{label:"Guide Pink",value:"#EB4962"},{label:"Connect Red",value:"#EB6651"},{label:"Chat Orange",value:"#F79A3E"},{label:"Talk Yellow",value:"#EFC93D"},{label:"Sell Gold",value:"#D4AE5E"}];customElements.define("exo-app",ie(()=>{const[e,t]=ce(""),[s,n]=ce(pe[0].value),[o,i]=ce(fe[0].value);return P`
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
      <exo-greeting name=${e||"Enter a name"}></exo-greeting>
      <fieldset>
        <label>Update name:</label>
        <input @keyup=${e=>t(e.target.value)} value=${e} />
      </fieldset>
    </section>
    <section>
      <exo-user .data=${{name:"Jane Doe",age:42}}></exo-user>
    </section>
    <section>
      <exo-button @click=${()=>alert("Hello")}>Click me!</exo-button>
    </section>
    <section>
      <exo-list @change=${e=>n(e.target.value)}>
        ${W(pe,({value:e})=>e,({value:e,label:t},s)=>P`
            <exo-option tabIndex="0" value=${e}>${t}</exo-option>
          `)}
      </exo-list>
      Chosen: ${pe.find(({value:e})=>e===s).label}
    </section>
    <section>
      <exo-select @change=${e=>n(e.target.value)}>
        <exo-selected>
          ${pe.find(({value:e})=>e===s).label}
        </exo-selected>
        ${W(pe,({value:e})=>e,({value:e,label:t})=>P`
            <exo-option tabIndex="0" value=${e}>${t}</exo-option>
          `)}
      </exo-select>
    </section>
    <section class="blue">
      <exo-select @change=${e=>n(e.target.value)}>
        <exo-selected>
          ${pe.find(({value:e})=>e===s).label}
        </exo-selected>
        ${W(pe,({value:e})=>e,({value:e,label:t})=>P`
            <exo-option tabIndex="0" value=${e}>${t}</exo-option>
          `)}
      </exo-select>
    </section>
    <section>
      <exo-select @change=${e=>i(e.target.value)}>
        <exo-selected>
          <span style="color: ${o}">
            ${fe.find(({value:e})=>e===o).label}
          </span>
        </exo-selected>
        ${W(fe,({value:e})=>e,({value:e,label:t})=>P`
            <exo-option tabIndex="0" value=${e}>
              <span style="color: ${e}">${t}</span>
            </exo-option>
          `)}
      </exo-select>
    </section>
  `})),M(P`
    <exo-app></exo-app>
  `,document.body);
