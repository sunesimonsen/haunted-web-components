const t=new WeakMap,e=e=>"function"==typeof e&&t.has(e),s=void 0!==window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,e,s=null)=>{let i=e;for(;i!==s;){const e=i.nextSibling;t.removeChild(i),i=e}},n={},r={},a=`{{lit-${String(Math.random()).slice(2)}}}`,o=`\x3c!--${a}--\x3e`,h=new RegExp(`${a}|${o}`),l="$lit$";class u{constructor(t,e){this.parts=[],this.element=e;let s=-1,i=0;const n=[],r=e=>{const o=e.content,u=document.createTreeWalker(o,133,null,!1);let c=0;for(;u.nextNode();){s++;const e=u.currentNode;if(1===e.nodeType){if(e.hasAttributes()){const n=e.attributes;let r=0;for(let t=0;t<n.length;t++)n[t].value.indexOf(a)>=0&&r++;for(;r-- >0;){const n=t.strings[i],r=p.exec(n)[2],a=r.toLowerCase()+l,o=e.getAttribute(a).split(h);this.parts.push({type:"attribute",index:s,name:r,strings:o}),e.removeAttribute(a),i+=o.length-1}}"TEMPLATE"===e.tagName&&r(e)}else if(3===e.nodeType){const t=e.data;if(t.indexOf(a)>=0){const r=e.parentNode,a=t.split(h),o=a.length-1;for(let t=0;t<o;t++)r.insertBefore(""===a[t]?d():document.createTextNode(a[t]),e),this.parts.push({type:"node",index:++s});""===a[o]?(r.insertBefore(d(),e),n.push(e)):e.data=a[o],i+=o}}else if(8===e.nodeType)if(e.data===a){const t=e.parentNode;null!==e.previousSibling&&s!==c||(s++,t.insertBefore(d(),e)),c=s,this.parts.push({type:"node",index:s}),null===e.nextSibling?e.data="":(n.push(e),s--),i++}else{let t=-1;for(;-1!==(t=e.data.indexOf(a,t+1));)this.parts.push({type:"node",index:-1})}}};r(e);for(const t of n)t.parentNode.removeChild(t)}}const c=t=>-1!==t.index,d=()=>document.createComment(""),p=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F \x09\x0a\x0c\x0d"'>=\/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;class m{constructor(t,e,s){this._parts=[],this.template=t,this.processor=e,this.options=s}update(t){let e=0;for(const s of this._parts)void 0!==s&&s.setValue(t[e]),e++;for(const t of this._parts)void 0!==t&&t.commit()}_clone(){const t=s?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),e=this.template.parts;let i=0,n=0;const r=t=>{const s=document.createTreeWalker(t,133,null,!1);let a=s.nextNode();for(;i<e.length&&null!==a;){const t=e[i];if(c(t))if(n===t.index){if("node"===t.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(a.previousSibling),this._parts.push(t)}else this._parts.push(...this.processor.handleAttributeExpressions(a,t.name,t.strings,this.options));i++}else n++,"TEMPLATE"===a.nodeName&&r(a.content),a=s.nextNode();else this._parts.push(void 0),i++}};return r(t),s&&(document.adoptNode(t),customElements.upgrade(t)),t}}class f{constructor(t,e,s,i){this.strings=t,this.values=e,this.type=s,this.processor=i}getHTML(){const t=this.strings.length-1;let e="";for(let s=0;s<t;s++){const t=this.strings[s],i=p.exec(t);e+=i?t.substr(0,i.index)+i[1]+i[2]+l+i[3]+a:t+o}return e+this.strings[t]}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}const g=t=>null===t||!("object"==typeof t||"function"==typeof t);class v{constructor(t,e,s){this.dirty=!0,this.element=t,this.name=e,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new x(this)}_getValue(){const t=this.strings,e=t.length-1;let s="";for(let i=0;i<e;i++){s+=t[i];const e=this.parts[i];if(void 0!==e){const t=e.value;if(null!=t&&(Array.isArray(t)||"string"!=typeof t&&t[Symbol.iterator]))for(const e of t)s+="string"==typeof e?e:String(e);else s+="string"==typeof t?t:String(t)}}return s+=t[e]}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class x{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===n||g(t)&&t===this.value||(this.value=t,e(t)||(this.committer.dirty=!0))}commit(){for(;e(this.value);){const t=this.value;this.value=n,t(this)}this.value!==n&&this.committer.commit()}}class _{constructor(t){this.value=void 0,this._pendingValue=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(d()),this.endNode=t.appendChild(d())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t._insert(this.startNode=d()),t._insert(this.endNode=d())}insertAfterPart(t){t._insert(this.startNode=d()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=n,t(this)}const t=this._pendingValue;t!==n&&(g(t)?t!==this.value&&this._commitText(t):t instanceof f?this._commitTemplateResult(t):t instanceof Node?this._commitNode(t):Array.isArray(t)||t[Symbol.iterator]?this._commitIterable(t):t===r?(this.value=r,this.clear()):this._commitText(t))}_insert(t){this.endNode.parentNode.insertBefore(t,this.endNode)}_commitNode(t){this.value!==t&&(this.clear(),this._insert(t),this.value=t)}_commitText(t){const e=this.startNode.nextSibling;t=null==t?"":t,e===this.endNode.previousSibling&&3===e.nodeType?e.data=t:this._commitNode(document.createTextNode("string"==typeof t?t:String(t))),this.value=t}_commitTemplateResult(t){const e=this.options.templateFactory(t);if(this.value instanceof m&&this.value.template===e)this.value.update(t.values);else{const s=new m(e,t.processor,this.options),i=s._clone();s.update(t.values),this._commitNode(i),this.value=s}}_commitIterable(t){Array.isArray(this.value)||(this.value=[],this.clear());const e=this.value;let s,i=0;for(const n of t)void 0===(s=e[i])&&(s=new _(this.options),e.push(s),0===i?s.appendIntoPart(this):s.insertAfterPart(e[i-1])),s.setValue(n),s.commit(),i++;i<e.length&&(e.length=i,this.clear(s&&s.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class b{constructor(t,e,s){if(this.value=void 0,this._pendingValue=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=e,this.strings=s}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=n,t(this)}if(this._pendingValue===n)return;const t=!!this._pendingValue;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)),this.value=t,this._pendingValue=n}}class w extends v{constructor(t,e,s){super(t,e,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new y(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class y extends x{}let N=!1;try{const t={get capture(){return N=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}class V{constructor(t,e,s){this.value=void 0,this._pendingValue=void 0,this.element=t,this.eventName=e,this.eventContext=s,this._boundHandleEvent=(t=>this.handleEvent(t))}setValue(t){this._pendingValue=t}commit(){for(;e(this._pendingValue);){const t=this._pendingValue;this._pendingValue=n,t(this)}if(this._pendingValue===n)return;const t=this._pendingValue,s=this.value,i=null==t||null!=s&&(t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive),r=null!=t&&(null==s||i);i&&this.element.removeEventListener(this.eventName,this._boundHandleEvent,this._options),r&&(this._options=E(t),this.element.addEventListener(this.eventName,this._boundHandleEvent,this._options)),this.value=t,this._pendingValue=n}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const E=t=>t&&(N?{capture:t.capture,passive:t.passive,once:t.once}:t.capture);const A=new class{handleAttributeExpressions(t,e,s,i){const n=e[0];return"."===n?new w(t,e.slice(1),s).parts:"@"===n?[new V(t,e.slice(1),i.eventContext)]:"?"===n?[new b(t,e.slice(1),s)]:new v(t,e,s).parts}handleTextExpression(t){return new _(t)}};function C(t){let e=T.get(t.type);void 0===e&&(e={stringsArray:new WeakMap,keyString:new Map},T.set(t.type,e));let s=e.stringsArray.get(t.strings);if(void 0!==s)return s;const i=t.strings.join(a);return void 0===(s=e.keyString.get(i))&&(s=new u(t,t.getTemplateElement()),e.keyString.set(i,s)),e.stringsArray.set(t.strings,s),s}const T=new Map,S=new WeakMap,k=(t,e,s)=>{let n=S.get(e);void 0===n&&(i(e,e.firstChild),S.set(e,n=new _(Object.assign({templateFactory:C},s))),n.appendInto(e)),n.setValue(t),n.commit()};(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.0.0");const P=(t,...e)=>new f(t,e,"html",A),M="function"==typeof Symbol?Symbol.for:t=>t,L=M("haunted.phase"),O=M("haunted.hook"),$=M("haunted.update"),H=M("haunted.commit"),j=M("haunted.effects"),F=M("haunted.context");let I,R=0;function W(t){I=t}function B(){I=null,R=0}const Q=Promise.resolve().then.bind(Promise.resolve());function D(){let t,e=[];function s(){t=null;let s=e;e=[];for(var i=0,n=s.length;i<n;i++)s[i]()}return function(i){e.push(i),null==t&&(t=Q(s))}}const z=D(),U=D();class J{constructor(t,e,s){this.renderer=t,this.frag=e,this.host=s||e,this[O]=new Map,this[L]=null,this._updateQueued=!1}update(){this._updateQueued||(z(()=>{let t=this.handlePhase($);U(()=>{this.handlePhase(H,t),this[j]&&U(()=>{this.handlePhase(j)})}),this._updateQueued=!1}),this._updateQueued=!0)}handlePhase(t,e){switch(this[L]=t,t){case H:return this.commit(e);case $:return this.render();case j:return this.runEffects(j)}this[L]=null}commit(t){k(t,this.frag),this.runEffects(H)}render(){W(this);let t=this.args?this.renderer.apply(this.host,this.args):this.renderer.call(this.host,this.host);return B(),t}runEffects(t){let e=this[t];if(e){W(this);for(let t of e)t.call(this);B()}}teardown(){this[O].forEach(t=>{"function"==typeof t.teardown&&t.teardown()})}}function q(t,e=HTMLElement,s={useShadowDOM:!0}){class i extends e{static get observedAttributes(){return t.observedAttributes||[]}constructor(){super(),!1===s.useShadowDOM?this._container=new J(t,this):(this.attachShadow({mode:"open"}),this._container=new J(t,this.shadowRoot,this))}connectedCallback(){this._container.update()}disconnectedCallback(){this._container.teardown()}attributeChangedCallback(t,e,s){let i=""===s||s;Reflect.set(this,function(t=""){return-1===t.indexOf("-")?t.toLowerCase():t.toLowerCase().split("-").reduce((t,e)=>t?t+e.charAt(0).toUpperCase()+e.slice(1):e,"")}(t),i)}}const n=new Proxy(e.prototype,{set(t,e,s,i){let n;return e in t&&Reflect.set(t,e,s),n="symbol"==typeof e||"_"===e[0]?{enumerable:!0,configurable:!0,writable:!0,value:s}:function(t){let e=t;return Object.freeze({enumerable:!0,configurable:!0,get:()=>e,set(t){e=t,this._container.update()}})}(s),Object.defineProperty(i,e,n),n.set&&n.set.call(i,s),!0}});return Object.setPrototypeOf(i.prototype,n),i}class G{constructor(t,e){this.id=t,this.el=e}}function K(t,...e){let s=function(){let t=R;return R++,t}(),i=I[O],n=i.get(s);return n||(n=new t(s,I,...e),i.set(s,n)),n.update(...e)}function X(t){return K.bind(null,t)}X(class extends G{constructor(t,e,s,i){super(t,e),this.value=s(),this.values=i}update(t,e){return this.hasChanged(e)&&(this.values=e,this.value=t()),this.value}hasChanged(t){return t.some((t,e)=>this.values[e]!==t)}});X(class extends G{constructor(t,e){super(t,e),this.values=!1,function(t,e){j in t||(t[j]=[]),t[j].push(e)}(e,this)}update(t,e){this.callback=t,this.lastValues=this.values,this.values=e}call(){this.values?this.hasChanged()&&this.run():this.run()}run(){this.teardown(),this._teardown=this.callback.call(this.el)}teardown(){this._teardown&&this._teardown()}hasChanged(){return!1===this.lastValues||this.values.some((t,e)=>this.lastValues[e]!==t)}});const Y=X(class extends G{constructor(t,e,s){super(t,e),this.updater=this.updater.bind(this),this.makeArgs(s)}update(){return this.args}updater(t){if("function"==typeof t){const e=t,[s]=this.args;t=e(s)}this.makeArgs(t),this.el.update()}makeArgs(t){this.args=Object.freeze([t,this.updater])}});X(class extends G{constructor(t,e,s,i){super(t,e),this.dispatch=this.dispatch.bind(this),this.state=i}update(t){return this.reducer=t,[this.state,this.dispatch]}dispatch(t){this.state=this.reducer(this.state,t),this.el.update()}});X(class extends G{constructor(t,e){super(t,e),function(t,e){F in t||(t[F]=[]),t[F].push(e)}(e,this),this._updater=this._updater.bind(this)}update(t){if(this.el.virtual)throw new Error("can't be used with virtual components");return this.Context!==t&&(this._subscribe(t),this.Context=t),this.value}_updater(t){this.value=t,this.el.update()}_subscribe(t){const e={Context:t,callback:this._updater};this.el.host.dispatchEvent(new CustomEvent("haunted.context",{detail:e,bubbles:!0,cancelable:!0,composed:!0}));const{unsubscribe:s,value:i}=e;this.value=s?i:t.defaultValue,this._unsubscribe=s}teardown(){this._unsubscribe&&this._unsubscribe()}});const Z=({name:t})=>P`
  <div class="greeting"><h1>${t}</h1></div>
`;Z.observedAttributes=["name"],customElements.define("x-greeting",q(Z));customElements.define("x-app",q(()=>{const[t,e]=Y("Jane Doe");return P`
    <div>
      <x-greeting name=${t}></x-greeting>
      <fieldset>
        <label>Update name:</label>
        <input
          @keyup=${t=>e(t.target.value||"Enter a name")}
          value=${t}
        />
      </fieldset>
    </div>
  `})),k(P`
    <x-app></x-app>
  `,document.body);
