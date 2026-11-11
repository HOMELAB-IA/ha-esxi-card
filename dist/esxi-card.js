/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,e$2=t$1.ShadowRoot&&(void 0===t$1.ShadyCSS||t$1.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$1.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,i$1=t=>t,s$1=t.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),w=x(2),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t.litHtmlPolyfillSupport;B?.(S,k),(t.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

function rawPct(used, total) {
    if (isNaN(used) || isNaN(total) || total === 0)
        return 0;
    return Math.round((used / total) * 100);
}
function gaugeColor(pct) {
    if (pct >= 85)
        return "#f44336";
    if (pct >= 60)
        return "#ff9800";
    return "#03a9f4";
}
function formatUptime(hours) {
    if (isNaN(hours))
        return "—";
    const days = Math.floor(hours / 24);
    if (days >= 1)
        return `${days} j`;
    return `${Math.round(hours)} h`;
}
function getState(hass, entityId, fallback = "—") {
    return hass.states[entityId]?.state ?? fallback;
}
function getFloat(hass, entityId) {
    return parseFloat(hass.states[entityId]?.state ?? "NaN");
}

function buildHostEntityIds(hostId) {
    const sp = `sensor.esxi_host_${hostId}_${hostId}_`;
    return {
        cpuUsage: `${sp}cpuusage_ghz`,
        cpuTotal: `${sp}cputotal_ghz`,
        memUsage: `${sp}memusage_gb`,
        memTotal: `${sp}memtotal_gb`,
        name: `${sp}name`,
        version: `${sp}version`,
        build: `${sp}build`,
        state: `${sp}state`,
        vms: `${sp}vms`,
        uptimeHours: `${sp}uptime_hours`,
        maintenanceMode: `${sp}maintenance_mode`,
        powerPolicy: `select.esxi_host_${hostId}_${hostId}_power_policy`,
        license: `sensor.esxi_host_${hostId}_esxi_license_${hostId}`,
        reboot: `button.esxi_host_${hostId}_esxi_reboot_${hostId}`,
    };
}
class EsxiHostCard extends i {
    constructor() {
        super(...arguments);
        this._expanded = false;
        this._rebooting = false;
    }
    static getStubConfig() {
        return { type: "custom:esxi-host-card", host_id: "esxi_host_name" };
    }
    static getConfigElement() {
        return document.createElement("esxi-host-card-editor");
    }
    setConfig(config) {
        if (!config.host_id)
            throw new Error("host_id requis");
        this._config = config;
    }
    getCardSize() {
        return this._expanded ? 6 : 4;
    }
    render() {
        if (!this.hass || !this._config)
            return A;
        const ids = buildHostEntityIds(this._config.host_id);
        const name = getState(this.hass, ids.name);
        const version = getState(this.hass, ids.version);
        const build = getState(this.hass, ids.build);
        const hostState = getState(this.hass, ids.state);
        const cpuUsed = getFloat(this.hass, ids.cpuUsage);
        const cpuTotal = getFloat(this.hass, ids.cpuTotal);
        const cpuPct = rawPct(cpuUsed, cpuTotal);
        const memUsed = getFloat(this.hass, ids.memUsage);
        const memTotal = getFloat(this.hass, ids.memTotal);
        const memPct = rawPct(memUsed, memTotal);
        const vms = getState(this.hass, ids.vms);
        const uptimeHours = getFloat(this.hass, ids.uptimeHours);
        const maintenance = getState(this.hass, ids.maintenanceMode);
        const powerPolicy = getState(this.hass, ids.powerPolicy);
        return b `
      <div class="card">
        <div class="header" @click=${this._toggle}>
          <div class="icon-block" style="background:rgba(3,169,244,.14)">
            <ha-icon icon="mdi:server-network" style="color:#03a9f4;--mdc-icon-size:24px"></ha-icon>
          </div>
          <div class="title-block">
            <div class="host-name">${name}</div>
            <div class="host-sub">${version} · build ${build}</div>
          </div>
          <div class="status">
            <span class="dot" style="background:${hostState === "poweredOn" ? "#4caf50" : "#6f6f6f"}"></span>
            ${hostState}
          </div>
          <ha-icon
            icon=${this._expanded ? "mdi:chevron-up" : "mdi:chevron-down"}
            class="chevron"
          ></ha-icon>
        </div>

        <div class="body-grid">
          <div class="gauge-wrap">
            ${this._arcGauge(148, 13, cpuPct)}
            <div class="gauge-labels">
              <div class="gauge-pct">
                ${cpuPct}<span class="gauge-unit">%</span>
              </div>
              <div class="gauge-name">CPU</div>
              <div class="gauge-sub">
                ${isNaN(cpuUsed) ? "—" : cpuUsed} / ${isNaN(cpuTotal) ? "—" : cpuTotal} GHz
              </div>
            </div>
          </div>

          <div class="side">
            <div class="mem-row">
              <div class="donut-wrap">
                ${this._donut(54, 6, memPct)}
                <span class="donut-pct">${memPct}</span>
              </div>
              <div>
                <div class="mem-label">Mémoire</div>
                <div class="mem-sub">
                  ${isNaN(memUsed) ? "—" : memUsed} / ${isNaN(memTotal) ? "—" : memTotal} Go
                </div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="stats-row">
              <div>
                <div class="stat-label">VMs</div>
                <div class="stat-value">${vms}</div>
              </div>
              <div>
                <div class="stat-label">Uptime</div>
                <div class="stat-value">${formatUptime(uptimeHours)}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bar">
          <span class="footer-item">
            <ha-icon icon="mdi:power-plug" style="--mdc-icon-size:15px"></ha-icon>${hostState}
          </span>
          <span class="footer-item">
            <ha-icon icon="mdi:wrench" style="--mdc-icon-size:15px"></ha-icon>Maint.
            ${maintenance}
          </span>
          <span class="footer-item">
            <ha-icon icon="mdi:speedometer" style="--mdc-icon-size:15px"></ha-icon>${powerPolicy}
          </span>
        </div>

        ${this._expanded ? this._renderDetails(ids) : A}
      </div>
    `;
    }
    _renderDetails(ids) {
        const rows = [
            { icon: "mdi:tag-outline", label: "Version", id: ids.version },
            { icon: "mdi:pound", label: "Build", id: ids.build },
            { icon: "mdi:power-plug", label: "État", id: ids.state },
            {
                icon: "mdi:clock-outline",
                label: "Uptime",
                id: ids.uptimeHours,
                fmt: (v) => `${parseFloat(v).toFixed(1)} Hours`,
            },
            { icon: "mdi:monitor-multiple", label: "Machines virtuelles", id: ids.vms },
            { icon: "mdi:speedometer", label: "Power policy", id: ids.powerPolicy },
            { icon: "mdi:wrench", label: "Mode maintenance", id: ids.maintenanceMode },
            { icon: "mdi:certificate", label: "Licence ESXi", id: ids.license },
        ];
        return b `
      <div class="details">
        ${rows.map((r) => b `
            <div class="detail-row">
              <ha-icon icon="${r.icon}" style="--mdc-icon-size:18px;color:#6f6f6f"></ha-icon>
              <span class="detail-label">${r.label}</span>
              <span class="detail-value">
                ${r.fmt
            ? r.fmt(getState(this.hass, r.id))
            : getState(this.hass, r.id)}
              </span>
            </div>
          `)}
        <div class="detail-row">
          <ha-icon icon="mdi:restart" style="--mdc-icon-size:18px;color:#6f6f6f"></ha-icon>
          <span class="detail-label">Redémarrer l'hôte</span>
          <button
            class="action-link"
            @click=${() => this._reboot(ids.reboot)}
            ?disabled=${this._rebooting}
          >
            ${this._rebooting ? "En cours…" : "Appuyer"}
          </button>
        </div>
      </div>
    `;
    }
    _arcGauge(size, strokeW, pct) {
        const r = (size - strokeW) / 2;
        const c = 2 * Math.PI * r;
        const arc = (270 / 360) * c;
        const off = arc * (1 - pct / 100);
        const mid = size / 2;
        const col = gaugeColor(pct);
        return w `
      <svg width="${size}" height="${size}" style="display:block">
        <circle cx="${mid}" cy="${mid}" r="${r}" fill="none"
          stroke="rgba(255,255,255,.085)" stroke-width="${strokeW}"
          stroke-dasharray="${arc} ${c}" stroke-linecap="round"
          transform="rotate(135 ${mid} ${mid})"/>
        <circle cx="${mid}" cy="${mid}" r="${r}" fill="none"
          stroke="${col}" stroke-width="${strokeW}"
          stroke-dasharray="${arc} ${c}" stroke-dashoffset="${off}"
          stroke-linecap="round" transform="rotate(135 ${mid} ${mid})"/>
      </svg>`;
    }
    _donut(size, strokeW, pct) {
        const r = (size - strokeW) / 2;
        const c = 2 * Math.PI * r;
        const off = c * (1 - pct / 100);
        const mid = size / 2;
        const col = gaugeColor(pct);
        return w `
      <svg width="${size}" height="${size}" style="display:block">
        <circle cx="${mid}" cy="${mid}" r="${r}" fill="none"
          stroke="rgba(255,255,255,.085)" stroke-width="${strokeW}"/>
        <circle cx="${mid}" cy="${mid}" r="${r}" fill="none"
          stroke="${col}" stroke-width="${strokeW}"
          stroke-dasharray="${c}" stroke-dashoffset="${off}"
          stroke-linecap="round" transform="rotate(-90 ${mid} ${mid})"/>
      </svg>`;
    }
    _toggle() {
        this._expanded = !this._expanded;
    }
    async _reboot(entityId) {
        this._rebooting = true;
        await this.hass.callService("button", "press", { entity_id: entityId });
        setTimeout(() => {
            this._rebooting = false;
        }, 3000);
    }
}
EsxiHostCard.styles = i$3 `
    :host {
      display: block;
      container-type: inline-size;
    }
    .card {
      background: #1c1c1c;
      border-radius: 14px;
      padding: 18px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      margin-bottom: 16px;
    }
    .icon-block {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title-block {
      flex: 1;
      min-width: 0;
    }
    .host-name {
      font-size: 16px;
      font-weight: 500;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .host-sub {
      font-size: 12.5px;
      color: #9b9b9b;
    }
    .status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      color: #9b9b9b;
      white-space: nowrap;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .chevron {
      color: #9b9b9b;
      flex-shrink: 0;
    }
    .body-grid {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 16px 18px;
      align-items: center;
    }
    .gauge-wrap {
      position: relative;
      width: 148px;
      height: 148px;
    }
    .gauge-labels {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    .gauge-pct {
      font-size: 32px;
      font-weight: 500;
      color: #fff;
      line-height: 1;
    }
    .gauge-unit {
      font-size: 17px;
      font-weight: 400;
    }
    .gauge-name {
      font-size: 10.5px;
      color: #9b9b9b;
      letter-spacing: 0.06em;
      margin-top: 3px;
    }
    .gauge-sub {
      font-size: 10.5px;
      color: #6f6f6f;
      margin-top: 3px;
    }
    .side {
      display: flex;
      flex-direction: column;
      gap: 13px;
    }
    .mem-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .donut-wrap {
      position: relative;
      flex-shrink: 0;
    }
    .donut-pct {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 500;
      color: #fff;
      pointer-events: none;
    }
    .mem-label {
      font-size: 13px;
      color: #e1e1e1;
      font-weight: 500;
    }
    .mem-sub {
      font-size: 11.5px;
      color: #9b9b9b;
      margin-top: 2px;
    }
    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.07);
    }
    .stats-row {
      display: flex;
      gap: 8px;
    }
    .stats-row > div {
      flex: 1;
    }
    .stat-label {
      font-size: 11px;
      color: #9b9b9b;
    }
    .stat-value {
      font-size: 15px;
      font-weight: 500;
      color: #fff;
    }
    .footer-bar {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-size: 12px;
      color: #9b9b9b;
      border-top: 1px solid rgba(255, 255, 255, 0.07);
      padding-top: 14px;
      margin-top: 16px;
    }
    .footer-item {
      display: flex;
      align-items: center;
      gap: 5px;
    }
    .details {
      border-top: 1px solid rgba(255, 255, 255, 0.07);
      margin-top: 14px;
      padding-top: 10px;
    }
    .detail-row {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 7px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
      font-size: 13px;
    }
    .detail-label {
      flex: 1;
      color: #e1e1e1;
    }
    .detail-value {
      color: #9b9b9b;
    }
    .action-link {
      background: none;
      border: none;
      color: #03a9f4;
      cursor: pointer;
      font-size: 13px;
      padding: 0;
    }
    .action-link:disabled {
      color: #6f6f6f;
      cursor: default;
    }
    @container (max-width: 280px) {
      .body-grid {
        grid-template-columns: 1fr;
      }
      .gauge-wrap {
        margin: 0 auto;
      }
    }
  `;
__decorate([
    n({ attribute: false })
], EsxiHostCard.prototype, "hass", void 0);
__decorate([
    r()
], EsxiHostCard.prototype, "_config", void 0);
__decorate([
    r()
], EsxiHostCard.prototype, "_expanded", void 0);
__decorate([
    r()
], EsxiHostCard.prototype, "_rebooting", void 0);
if (typeof customElements !== "undefined") {
    customElements.define("esxi-host-card", EsxiHostCard);
}

function buildVmEntityIds(vmId) {
    const sp = `sensor.vm_${vmId}_${vmId}_`;
    return {
        cpuPct: `${sp}cpu_use_pct`,
        cpuCount: `${sp}cpu_count`,
        memUsed: `${sp}memory_used_mb`,
        memAlloc: `${sp}memory_allocated_mb`,
        diskUsed: `${sp}used_space_gb`,
        snapshots: `${sp}snapshots`,
        name: `${sp}name`,
        guestOs: `${sp}guest_os`,
        guestIp: `${sp}guest_ip`,
        state: `${sp}state`,
        uptimeHours: `${sp}uptime_hours`,
        hostName: `${sp}host_name`,
        toolsStatus: `${sp}tools_status`,
        createSnapshot: `button.vm_${vmId}_esxi_create_snapshot_${vmId}`,
        reboot: `button.vm_${vmId}_esxi_reboot_${vmId}`,
        powerSwitch: `switch.vm_${vmId}_esxi_vm_${vmId}`,
    };
}
class EsxiVmCard extends i {
    constructor() {
        super(...arguments);
        this._expanded = false;
        this._busy = null;
    }
    static getStubConfig() {
        return {
            type: "custom:esxi-vm-card",
            vm_id: "vm_name",
            disk_capacity_gb: 650,
        };
    }
    static getConfigElement() {
        return document.createElement("esxi-vm-card-editor");
    }
    setConfig(config) {
        if (!config.vm_id)
            throw new Error("vm_id requis");
        this._config = config;
    }
    getCardSize() {
        return this._expanded ? 7 : 4;
    }
    render() {
        if (!this.hass || !this._config)
            return A;
        const ids = buildVmEntityIds(this._config.vm_id);
        const name = getState(this.hass, ids.name);
        const guestOs = getState(this.hass, ids.guestOs);
        const guestIp = getState(this.hass, ids.guestIp);
        const vmState = getState(this.hass, ids.state);
        const isOn = vmState === "running";
        const cpuPct = Math.round(getFloat(this.hass, ids.cpuPct));
        const cpuCount = getState(this.hass, ids.cpuCount);
        const usedMb = getFloat(this.hass, ids.memUsed);
        const allocMb = getFloat(this.hass, ids.memAlloc);
        const memPct = rawPct(usedMb, allocMb);
        const usedGb = isNaN(usedMb) ? "—" : (usedMb / 1024).toFixed(1);
        const allocGb = isNaN(allocMb) ? "—" : Math.round(allocMb / 1024);
        const diskUsed = getFloat(this.hass, ids.diskUsed);
        const diskCap = this._config.disk_capacity_gb ?? 650;
        const diskPct = rawPct(diskUsed, diskCap);
        const diskColor = diskPct >= 85 ? "#f44336" : diskPct >= 70 ? "#ff9800" : "#9b9b9b";
        const snaps = parseInt(getState(this.hass, ids.snapshots, "0"));
        const snapColor = snaps > 0 ? "#ff9800" : "#fff";
        const uptimeHours = getFloat(this.hass, ids.uptimeHours);
        const hostName = getState(this.hass, ids.hostName).split(".")[0];
        const toolsStatus = getState(this.hass, ids.toolsStatus);
        const iconBg = isOn ? "rgba(76,175,80,.14)" : "rgba(255,255,255,.06)";
        const iconColor = isOn ? "#4caf50" : "#9b9b9b";
        const dotColor = isOn ? "#4caf50" : "#6f6f6f";
        const statusLabel = isOn ? "En marche" : "Arrêtée";
        return b `
      <div class="card">
        <div class="header" @click=${this._toggle}>
          <div class="icon-block" style="background:${iconBg}">
            <ha-icon icon="mdi:monitor" style="color:${iconColor};--mdc-icon-size:24px"></ha-icon>
          </div>
          <div class="title-block">
            <div class="host-name">${name}</div>
            <div class="host-sub">${guestOs}</div>
            <div class="host-ip">${guestIp}</div>
          </div>
          <div class="status">
            <span class="dot" style="background:${dotColor};box-shadow:0 0 8px ${dotColor}"></span>
            ${statusLabel}
          </div>
          <ha-icon
            icon=${this._expanded ? "mdi:chevron-up" : "mdi:chevron-down"}
            class="chevron"
          ></ha-icon>
        </div>

        <div class="body-grid">
          <div class="gauge-wrap">
            ${this._arcGauge(148, 13, isNaN(cpuPct) ? 0 : cpuPct)}
            <div class="gauge-labels">
              <div class="gauge-pct">
                ${isNaN(cpuPct) ? "—" : cpuPct}<span class="gauge-unit">%</span>
              </div>
              <div class="gauge-name">CPU</div>
              <div class="gauge-sub">${cpuCount} vCPU</div>
            </div>
          </div>

          <div class="side">
            <div class="mem-row">
              <div class="donut-wrap">
                ${this._donut(54, 6, memPct)}
                <span class="donut-pct">${memPct}</span>
              </div>
              <div>
                <div class="mem-label">Mémoire</div>
                <div class="mem-sub">${usedGb} / ${allocGb} Go</div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="disk-snap-row">
              <div>
                <div class="stat-label">DISQUE</div>
                <div class="stat-value">
                  ${isNaN(diskUsed) ? "—" : diskUsed.toFixed(1)} Go
                </div>
                <div class="stat-sub" style="color:${diskColor}">${diskPct}% utilisé</div>
              </div>
              <div>
                <div class="stat-label">SNAPSHOTS</div>
                <div class="stat-value" style="color:${snapColor}">${snaps}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="footer-bar">
          <span class="footer-item">
            <ha-icon icon="mdi:clock-outline" style="--mdc-icon-size:15px"></ha-icon>
            ${formatUptime(uptimeHours)}
          </span>
          <span class="footer-item">
            <ha-icon icon="mdi:server-network" style="--mdc-icon-size:15px"></ha-icon>
            ${hostName}
          </span>
          <span class="footer-item">
            <ha-icon icon="mdi:check-circle" style="--mdc-icon-size:15px"></ha-icon>
            ${toolsStatus}
          </span>
        </div>

        ${this._expanded ? this._renderActions(ids) : A}
      </div>
    `;
    }
    _renderActions(ids) {
        return b `
      <div class="actions">
        <button
          class="action-btn snapshot"
          @click=${() => this._press(ids.createSnapshot, "createSnapshot")}
          ?disabled=${this._busy === "createSnapshot"}
        >
          <ha-icon icon="mdi:camera-plus" style="--mdc-icon-size:20px"></ha-icon>
          ${this._busy === "createSnapshot" ? "En cours…" : "Créer un snapshot"}
        </button>

        <div class="action-row">
          <button
            class="action-btn start"
            @click=${() => this._switchOn(ids.powerSwitch)}
            ?disabled=${this._busy === "start"}
          >
            <ha-icon icon="mdi:play" style="--mdc-icon-size:20px"></ha-icon>
            Démarrer
          </button>
          <button
            class="action-btn stop"
            @click=${() => this._switchOff(ids.powerSwitch)}
            ?disabled=${this._busy === "stop"}
          >
            <ha-icon icon="mdi:power" style="--mdc-icon-size:20px"></ha-icon>
            Arrêter
          </button>
        </div>

        <button
          class="action-btn reboot"
          @click=${() => this._press(ids.reboot, "reboot")}
          ?disabled=${this._busy === "reboot"}
        >
          <ha-icon icon="mdi:restart" style="--mdc-icon-size:20px"></ha-icon>
          ${this._busy === "reboot" ? "En cours…" : "Redémarrer"}
        </button>

        ${this._config.esxi_console_url
            ? b `
              <button class="action-btn console" @click=${this._openConsole}>
                <ha-icon icon="mdi:open-in-new" style="--mdc-icon-size:20px"></ha-icon>
                Console ESXi
              </button>
            `
            : A}
      </div>
    `;
    }
    _arcGauge(size, strokeW, pct) {
        const r = (size - strokeW) / 2;
        const c = 2 * Math.PI * r;
        const arc = (270 / 360) * c;
        const off = arc * (1 - pct / 100);
        const mid = size / 2;
        const col = gaugeColor(pct);
        return w `
      <svg width="${size}" height="${size}" style="display:block">
        <circle cx="${mid}" cy="${mid}" r="${r}" fill="none"
          stroke="rgba(255,255,255,.085)" stroke-width="${strokeW}"
          stroke-dasharray="${arc} ${c}" stroke-linecap="round"
          transform="rotate(135 ${mid} ${mid})"/>
        <circle cx="${mid}" cy="${mid}" r="${r}" fill="none"
          stroke="${col}" stroke-width="${strokeW}"
          stroke-dasharray="${arc} ${c}" stroke-dashoffset="${off}"
          stroke-linecap="round" transform="rotate(135 ${mid} ${mid})"/>
      </svg>`;
    }
    _donut(size, strokeW, pct) {
        const r = (size - strokeW) / 2;
        const c = 2 * Math.PI * r;
        const off = c * (1 - pct / 100);
        const mid = size / 2;
        const col = gaugeColor(pct);
        return w `
      <svg width="${size}" height="${size}" style="display:block">
        <circle cx="${mid}" cy="${mid}" r="${r}" fill="none"
          stroke="rgba(255,255,255,.085)" stroke-width="${strokeW}"/>
        <circle cx="${mid}" cy="${mid}" r="${r}" fill="none"
          stroke="${col}" stroke-width="${strokeW}"
          stroke-dasharray="${c}" stroke-dashoffset="${off}"
          stroke-linecap="round" transform="rotate(-90 ${mid} ${mid})"/>
      </svg>`;
    }
    _toggle() {
        this._expanded = !this._expanded;
    }
    async _press(entityId, key) {
        this._busy = key;
        await this.hass.callService("button", "press", { entity_id: entityId });
        setTimeout(() => {
            this._busy = null;
        }, 3000);
    }
    async _switchOn(entityId) {
        this._busy = "start";
        await this.hass.callService("switch", "turn_on", { entity_id: entityId });
        setTimeout(() => {
            this._busy = null;
        }, 3000);
    }
    async _switchOff(entityId) {
        this._busy = "stop";
        await this.hass.callService("switch", "turn_off", { entity_id: entityId });
        setTimeout(() => {
            this._busy = null;
        }, 3000);
    }
    _openConsole() {
        if (this._config.esxi_console_url) {
            window.open(this._config.esxi_console_url, "_blank", "noopener");
        }
    }
}
EsxiVmCard.styles = i$3 `
    :host {
      display: block;
      container-type: inline-size;
    }
    .card {
      background: #1c1c1c;
      border-radius: 14px;
      padding: 18px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
      font-family: var(--paper-font-body1_-_font-family, Roboto, sans-serif);
    }
    .header {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      margin-bottom: 16px;
    }
    .icon-block {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .title-block {
      flex: 1;
      min-width: 0;
    }
    .host-name {
      font-size: 16px;
      font-weight: 500;
      color: #fff;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .host-sub {
      font-size: 12.5px;
      color: #9b9b9b;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .host-ip {
      font-size: 11.5px;
      color: #6f6f6f;
      font-family: monospace;
      margin-top: 1px;
    }
    .status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      color: #9b9b9b;
      white-space: nowrap;
    }
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .chevron {
      color: #9b9b9b;
      flex-shrink: 0;
    }
    .body-grid {
      display: grid;
      grid-template-columns: 150px 1fr;
      gap: 16px 18px;
      align-items: center;
    }
    .gauge-wrap {
      position: relative;
      width: 148px;
      height: 148px;
    }
    .gauge-labels {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
    }
    .gauge-pct {
      font-size: 32px;
      font-weight: 500;
      color: #fff;
      line-height: 1;
    }
    .gauge-unit {
      font-size: 17px;
      font-weight: 400;
    }
    .gauge-name {
      font-size: 10.5px;
      color: #9b9b9b;
      letter-spacing: 0.06em;
      margin-top: 3px;
    }
    .gauge-sub {
      font-size: 10.5px;
      color: #6f6f6f;
      margin-top: 3px;
    }
    .side {
      display: flex;
      flex-direction: column;
      gap: 13px;
    }
    .mem-row {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .donut-wrap {
      position: relative;
      flex-shrink: 0;
    }
    .donut-pct {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      font-weight: 500;
      color: #fff;
      pointer-events: none;
    }
    .mem-label {
      font-size: 13px;
      color: #e1e1e1;
      font-weight: 500;
    }
    .mem-sub {
      font-size: 11.5px;
      color: #9b9b9b;
      margin-top: 2px;
    }
    .divider {
      height: 1px;
      background: rgba(255, 255, 255, 0.07);
    }
    .disk-snap-row {
      display: flex;
      gap: 8px;
    }
    .disk-snap-row > div {
      flex: 1;
    }
    .stat-label {
      font-size: 11px;
      color: #9b9b9b;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
    .stat-value {
      font-size: 14px;
      font-weight: 500;
      color: #fff;
      margin-top: 3px;
    }
    .stat-sub {
      font-size: 11px;
      margin-top: 2px;
    }
    .footer-bar {
      display: flex;
      justify-content: space-between;
      gap: 8px;
      font-size: 12px;
      color: #9b9b9b;
      border-top: 1px solid rgba(255, 255, 255, 0.07);
      padding-top: 14px;
      margin-top: 16px;
    }
    .footer-item {
      display: flex;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
    }
    .actions {
      border-top: 1px solid rgba(255, 255, 255, 0.07);
      margin-top: 14px;
      padding-top: 14px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .action-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .action-btn {
      border-radius: 10px;
      padding: 10px 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      border: 1px solid;
      width: 100%;
    }
    .action-btn:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .action-btn.snapshot {
      background: rgba(3, 169, 244, 0.12);
      border-color: rgba(3, 169, 244, 0.35);
      color: #03a9f4;
    }
    .action-btn.start {
      background: rgba(76, 175, 80, 0.12);
      border-color: rgba(76, 175, 80, 0.32);
      color: #4caf50;
    }
    .action-btn.stop {
      background: rgba(244, 67, 54, 0.1);
      border-color: rgba(244, 67, 54, 0.28);
      color: #f44336;
    }
    .action-btn.reboot {
      background: rgba(255, 152, 0, 0.1);
      border-color: rgba(255, 152, 0, 0.3);
      color: #ff9800;
    }
    .action-btn.console {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
      color: #bdbdbd;
    }
    @container (max-width: 280px) {
      .body-grid {
        grid-template-columns: 1fr;
      }
      .gauge-wrap {
        margin: 0 auto;
      }
    }
  `;
__decorate([
    n({ attribute: false })
], EsxiVmCard.prototype, "hass", void 0);
__decorate([
    r()
], EsxiVmCard.prototype, "_config", void 0);
__decorate([
    r()
], EsxiVmCard.prototype, "_expanded", void 0);
__decorate([
    r()
], EsxiVmCard.prototype, "_busy", void 0);
if (typeof customElements !== "undefined") {
    customElements.define("esxi-vm-card", EsxiVmCard);
}

const SCHEMA$1 = [
    { name: 'host_id', selector: { text: {} } },
];
const LABELS$1 = {
    host_id: "Identifiant de l'hôte ESXi Stats",
};
const HELPERS$1 = {
    host_id: "Hostname saisi lors de la config de l'intégration. Visible dans sensor.esxi_host_<host_id>_cpu_usage.",
};
class EsxiHostCardEditor extends i {
    setConfig(config) {
        this._config = config;
    }
    render() {
        if (!this._config)
            return A;
        return b `
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA$1}
        .computeLabel=${(s) => LABELS$1[s.name] ?? s.name}
        .computeHelper=${(s) => HELPERS$1[s.name] ?? ''}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
    }
    _valueChanged(ev) {
        this.dispatchEvent(new CustomEvent('config-changed', {
            detail: { config: ev.detail.value },
            bubbles: true,
            composed: true,
        }));
    }
}
__decorate([
    n({ attribute: false })
], EsxiHostCardEditor.prototype, "hass", void 0);
__decorate([
    r()
], EsxiHostCardEditor.prototype, "_config", void 0);
if (typeof customElements !== 'undefined') {
    customElements.define('esxi-host-card-editor', EsxiHostCardEditor);
}

const SCHEMA = [
    { name: 'vm_id', selector: { text: {} } },
    {
        name: 'disk_capacity_gb',
        selector: { number: { min: 10, max: 102400, step: 1, mode: 'box', unit_of_measurement: 'Go' } },
    },
    { name: 'esxi_console_url', selector: { text: { type: 'url' } } },
];
const LABELS = {
    vm_id: 'Identifiant de la VM ESXi Stats',
    disk_capacity_gb: 'Capacité disque totale (Go)',
    esxi_console_url: 'URL de la console web ESXi (optionnel)',
};
const HELPERS = {
    vm_id: 'Visible dans sensor.vm_<vm_id>_cpu_usage. Correspond au nom de la VM (minuscules, underscores).',
    disk_capacity_gb: 'Utilisé pour la jauge disque. Défaut : 650 Go.',
    esxi_console_url: "Ex : https://192.168.1.10/ui — ouvre la console dans le détail de la carte.",
};
class EsxiVmCardEditor extends i {
    setConfig(config) {
        this._config = config;
    }
    render() {
        if (!this._config)
            return A;
        return b `
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
        .computeLabel=${(s) => LABELS[s.name] ?? s.name}
        .computeHelper=${(s) => HELPERS[s.name] ?? ''}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
    }
    _valueChanged(ev) {
        this.dispatchEvent(new CustomEvent('config-changed', {
            detail: { config: ev.detail.value },
            bubbles: true,
            composed: true,
        }));
    }
}
__decorate([
    n({ attribute: false })
], EsxiVmCardEditor.prototype, "hass", void 0);
__decorate([
    r()
], EsxiVmCardEditor.prototype, "_config", void 0);
if (typeof customElements !== 'undefined') {
    customElements.define('esxi-vm-card-editor', EsxiVmCardEditor);
}

if (typeof window !== "undefined") {
    const w = window;
    w.customCards = w.customCards || [];
    w.customCards.push({
        type: "esxi-host-card",
        name: "ESXi Host Card",
        description: "Carte de monitoring pour un hôte ESXi",
        preview: false,
        documentationURL: "https://github.com/HOMELAB-IA/ha-esxi-card",
    }, {
        type: "esxi-vm-card",
        name: "ESXi VM Card",
        description: "Carte de monitoring pour une machine virtuelle ESXi",
        preview: false,
        documentationURL: "https://github.com/HOMELAB-IA/ha-esxi-card",
    });
    console.info("%c ESXi Card %c v0.1.0 ", "background:#1c1c1c;color:#03a9f4;font-weight:600", "background:#03a9f4;color:#fff");
}
