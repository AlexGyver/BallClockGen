(()=>{"use strict";class t{constructor(e,a={}){a.context=this,this.$root=t.make(e,a)}static make(e,a={}){return e&&"object"==typeof a?a instanceof Node?a:t.config(document.createElement(e),a):null}static makeShadow(e,a={},n=null){if(!e||"object"!=typeof a)return null;let l=e instanceof Node?e:document.createElement(e);return l.attachShadow({mode:"open"}),t.config(l.shadowRoot,{context:a.context,children:[{tag:"style",textContent:n??""},a.child??{},...a.children??[]]}),delete a.children,delete a.child,t.config(l,a),l}static config(e,a){if(!(e instanceof Node)||"object"!=typeof a)return e;const n=a.context;let l=a=>{if(a)if(a instanceof Node)e.appendChild(a);else if(a instanceof t)e.appendChild(a.$root);else if("object"==typeof a){a.context||(a.context=n);let l=t.make(a.tag,a);l&&e.appendChild(l)}else"string"==typeof a&&(e.innerHTML+=a)};for(const[t,r]of Object.entries(a))if(r)switch(t){case"tag":case"context":continue;case"text":e.textContent=r;break;case"html":e.innerHTML=r;break;case"class":e.classList.add(...r.split(" "));break;case"also":n&&r.call(n,e);break;case"export":r[0]=e;break;case"var":n&&(n["$"+r]=e);break;case"events":for(let t in r)r[t]&&e.addEventListener(t,r[t].bind(n));break;case"parent":(r instanceof Node||r instanceof DocumentFragment)&&r.append(e);break;case"attrs":for(let t in r)e.setAttribute(t,r[t]);break;case"props":for(let t in r)e[t]=r[t];break;case"child":l(r);break;case"children":for(const t of r)l(t);break;case"style":if("string"==typeof r)e.style.cssText+=r+";";else for(let t in r)e.style[t]=r[t];break;default:e[t]=r}return e}static makeArray(e){return e&&Array.isArray(e)?e.map((e=>t.make(e.tag,e))):[]}}new Set,new Map;class e{_data;constructor(t){this._data=t}get label(){return this._data.$label.innerText}set label(t){return this._data.$label.innerText=t+""}get value(){return this._data.$control.value}set value(t){return this._data.$control.value=t+""}get input(){return this._data.$control}display(t){this._data.$container.style.display=t?"block":"none"}show(){this.display(1)}hide(){this.display(0)}remove(){this._data.$container.remove()}default(){this.value=this._data.default+"",this._data.$output&&(this._data.$output.innerText=this._data.default+"")}}class a extends e{constructor(t){super(t)}set value(t){return this._data.$output&&(this._data.$output.innerText=t+""),this._data.$control.value=t+""}get value(){return Number(this._data.$control.value)}}class n extends e{constructor(t){super(t)}get value(){return this._data.$control.checked}set value(t){return this._data.$control.checked=t}default(){this.value=this._data.default}}class l extends e{constructor(t){super(t)}get value(){return this._data.$control.innerHTML}set value(t){return this._data.$control.innerHTML=t+""}}class r extends e{constructor(t){super(t)}get value(){return this._data.$control.files[0]}set value(t){}}class s extends e{constructor(t){super(t)}set value(t){}get value(){return 1}}class o extends a{constructor(t){super(t)}set options(e){return this._data.$control.replaceChildren(...e.map(((e,a)=>t.make("option",{text:e,value:a+""}))))}}class i extends e{constructor(t){super(t)}set value(t){this._data.$control.innerText=t+""}get value(){return this._data.$control.innerText}}class c{constructor(t={}){return this.init(t)}init(e){return e&&"object"==typeof e?(this.autoVar=e.autoVar??!0,t.make("div",{class:"ui_main theme-"+(e.theme??"light"),style:{zIndex:e.zIndex??3,left:e.x??0,top:e.y??0,width:e.width?"string"==typeof e.width?e.width:e.width+"px":"200px",position:e.parent?"":"absolute"},parent:e.parent??document.body,children:[{tag:"div",class:"ui_title_bar",text:e.title??"UI"},{tag:"div",class:"ui_content",var:"content"}],var:"root",context:this}),this):this}setTheme(t){return this.$root.classList="ui_main theme-"+t,this}destroy(){this.$root&&(this.$root.remove(),this.$root=void 0,this.#t=new Map)}setLabels(t){for(let e in t)this.#t.has(e)&&(this.#t.get(e).label=t[e])}toObject(){let t={};return this.#t.forEach(((e,a)=>{!e.value||e instanceof s||(t[a]=e.value)})),t}toJson(){return JSON.stringify(this.toObject())}fromObject(t){for(let e in t)this.#t.has(e)&&(this.#t.get(e).value=t[e])}fromJson(t){this.fromObject(JSON.parse(t))}control(t){return this.#t.get(t)}get(t){if(this.#t.has(t))return this.#t.get(t).value}set(t,e){if(this.#t.has(t))return this.#t.get(t).value=e}remove(t){this.#t.has(t)&&(this.#t.get(t).remove(),this.#t.delete(t))}addSwitch(e,a,l,r){let s={default:l=l??!1};return t.make("div",{context:s,var:"container",class:"ui_container",parent:this.$content,children:[{tag:"label",class:"ui_checkbox_label",text:a,var:"label"},{tag:"label",class:"ui_checkbox",children:[{tag:"input",type:"checkbox",checked:l,var:"control",also(t){r&&t.addEventListener("click",(()=>r(t.checked)))}},{tag:"span"}]}]}),e&&this.#t.set(e,new n(s)),this._addSetGet(e),this}addNumber(e,n,l,r,s){l=l??0;let o=this._makeContainer(n);return o.default=l,t.make("input",{parent:o.$container,context:o,type:"number",class:"ui_text_input ui_number",step:(r??1)+"",value:l+"",var:"control",also(t){t.addEventListener("input",(()=>{s&&s(Number(t.value))})),t.addEventListener("mousewheel",(t=>{}))}}),e&&this.#t.set(e,new a(o)),this._addSetGet(e),this}addText(a,n,l,r){l=l??"";let s=this._makeContainer(n);return s.default=l,t.make("input",{parent:s.$container,context:s,type:"text",class:"ui_text_input",value:l+"",var:"control",also(t){r&&t.addEventListener("input",(()=>r(t.value)))}}),a&&this.#t.set(a,new e(s)),this._addSetGet(a),this}addRange(e,n,l,r,s,o,i){l=l??0;let c=this._makeContainerOut(n,l);return c.default=l,t.make("input",{parent:c.$container,context:c,type:"range",class:"ui_range",value:l+"",min:(r??0)+"",max:(s??100)+"",step:(o??1)+"",var:"control",also(t){t.addEventListener("input",(()=>{i&&i(Number(t.value)),c.$output.innerText=t.value})),t.addEventListener("mousewheel",(e=>{e.stopPropagation(),e.preventDefault(),t.value=Number(t.value)+Number(t.step)*(e.deltaY>0?-1:1),t.dispatchEvent(new Event("input"))}))}}),e&&this.#t.set(e,new a(c)),this._addSetGet(e),this}addArea(a,n,l,r){l=l??"";let s=this._makeContainer(n);return s.default=l,t.make("textarea",{parent:s.$container,context:s,class:"ui_textarea",rows:5,value:l+"",var:"control",also(t){r&&t.addEventListener("input",(()=>r(t.value)))}}),a&&this.#t.set(a,new e(s)),this._addSetGet(a),this}addHTML(e,a,n){n=n??"";let r=this._makeContainer(a);return r.default=n,t.make("div",{parent:r.$container,context:r,html:n+"",var:"control"}),e&&this.#t.set(e,new l(r)),this._addSetGet(e),this}addElement(t,e,a){let n=this._makeContainer(e);return n.default=a,n.$control=a,n.$container.append(a),t&&this.#t.set(t,new l(n)),this._addSetGet(t),this}addSelect(e,a,n,l){n=n??[];let r=this._makeContainer(a);return r.default=0,t.make("select",{parent:r.$container,context:r,class:"ui_select",var:"control",also(t){l&&t.addEventListener("change",(()=>l(Number(t.value))))},children:n.map(((e,a)=>t.make("option",{text:e,value:a+""})))}),e&&this.#t.set(e,new o(r)),this._addSetGet(e),this}addButton(e,a,n){let l={};return t.make("div",{context:l,var:"container",class:"ui_container",parent:this.$content,children:[this._makeButton(l,e,a,n)]}),l.$label=l.$control,e&&this.#t.set(e,new s(l)),this}addButtons(e){let a=t.make("div",{var:"container",class:"ui_container",parent:this.$content});for(let t in e){let n={$container:a};a.append(this._makeButton(n,t,e[t][0],e[t][1])),n.$label=n.$control,t&&this.#t.set(t,new s(n))}return this}addFile(e,a,n){let l=this._makeContainer(a),s=t=>{n&&n(1==t.length?t[0]:t),l.$filename.innerText=t[0].name};return l.$container.append(...t.makeArray([{tag:"input",context:l,class:"ui_file_chooser",type:"file",var:"control",attrs:{multiple:!0},also(t){t.addEventListener("change",(()=>s(t.files)))}},{tag:"label",context:l,class:"ui_file_chooser_label",text:"...",var:"filename",also(t){t.addEventListener("click",(()=>l.$control.click())),t.addEventListener("drop",(t=>s(t.dataTransfer.files)))}}])),e&&this.#t.set(e,new r(l)),["dragenter","dragover","dragleave","drop"].forEach((t=>{this.$root.addEventListener(t,(t=>{t.preventDefault(),t.stopPropagation()}),!1)})),["dragenter","dragover"].forEach((t=>{this.$root.addEventListener(t,(function(){l.$filename.classList.add("active")}),!1)})),["dragleave","drop"].forEach((t=>{this.$root.addEventListener(t,(function(){l.$filename.classList.remove("active")}),!1)})),this._addSetGet(e),this}addColor(e,n,l,r){l=l??"#000";let s=this._makeContainerOut(n,l);return s.default=l,s.$container.append(t.make("input",{context:s,type:"color",class:"ui_color",value:l,var:"control",attrs:{"colorpick-eyedropper-active":!1},also(t){t.addEventListener("input",(()=>{r&&r(t.value),s.$output.innerText=t.value}))}})),e&&this.#t.set(e,new a(s)),this._addSetGet(e),this}addLabel(t,e,a){a=a??"";let n=this._makeContainerOut(e,a);return n.$control=n.$output,t&&this.#t.set(t,new i(n)),this._addSetGet(t),this}addSpace(){return t.make("div",{class:"ui_space",parent:this.$content}),this}_addSetGet(t){this.autoVar&&t&&Object.defineProperty(this,t,{get:()=>this.get(t),set:e=>this.set(t,e)})}_checkID(t){return t||"_empty_"+this.#e++}_makeButton(e,a,n,l){return t.make("button",{context:e,class:"ui_button",var:"control",text:n+"",also(t){l&&t.addEventListener("click",(()=>l(1)))}})}_makeContainer(e){let a={};return t.make("div",{context:a,var:"container",class:"ui_container",parent:this.$content,children:[{tag:"div",class:"ui_label",children:[{tag:"b",var:"label",text:e}]}]}),a}_makeContainerOut(e,a){let n={};return t.make("div",{context:n,var:"container",class:"ui_container",parent:this.$content,children:[{tag:"div",class:"ui_label",children:[{tag:"b",text:e,var:"label"},{tag:"span",text:": "},{tag:"span",text:a+"",var:"output"}]}]}),n}#t=new Map;#e=0}let d,u,h;const _=72/25.3999;function p(){function t(t){return t*_}function e(e,a,n){u.beginPath(),u.arc(t(e),t(a),t(n),0,2*Math.PI),u.stroke()}function a(e,a){u.lineTo(t(e),t(a))}function n(e,a){u.lineTo(t(e),t(a))}function l(t,e,l,r){u.beginPath(),n(t,e),a(l,r),u.stroke()}function r(t,e,a,n){return a-=t,n-=e,Math.sqrt(a*a+n*n).toFixed(1)}const s=Math.sqrt(3),o=s/2,i=h.ball_d/2/o,c=h.ball_d*h.balls_w+2*(i-h.ball_d/2)+10,p=h.ball_d*(2*h.balls_h*o+1)+10;d.width=t(c),d.height=t(p),u.lineWidth=t(h.stroke_w),u.fillStyle="white",u.fillRect(0,0,d.width,d.height),u.fillStyle="black",u.strokeStyle="black",u.strokeRect(0,0,d.width,d.height);for(let t=0;t<h.balls_h+1;t++)for(let a=-1;a<2;a+=2){for(let n=0;n<h.balls_w-t;n++)e(5+i+h.ball_d*n+t*h.ball_d/2,p/2+t*h.ball_d/2*s*a,h.ball_d/2);if(!t)break}const b=(h.ball_d/2+h.ball_d*h.balls_h*o)*s/3;u.beginPath(),n(5,p/2),a(5+b,5),a(c-(5+b),5),a(c-5,p/2),a(c-(5+b),p-5),a(5+b,p-5),a(5,p/2),u.stroke(),u.font=`${t(5)}px Arial`;let f=0;const v=t(6);u.fillText("Это задняя сторона!",10,f+=v),u.fillText("Ball D = "+h.ball_d,10,f+=v),u.fillText("LED step = "+h.led_step,10,f+=v),u.fillText(`Рейка ${r(5+b,5,c-(5+b),5)}мм х2`,10,f+=v),u.fillText(`Рейка ${r(5,p/2,5+b,5)}мм х4`,10,f+=v),u.fillText("Это верх часов",10,t(p-5));let m=5+i-h.ball_d/4,x=0,k=!(h.balls_h%2),g=0,$=1,w=0,y=0,L=[];function M(a,n){let r=p/2-n*h.led_step*$;for(let s=0;s<2*n+1;s++){let c=r+s*h.led_step*$;e(a,c,5);const d=3;l(a-d,c,a+d,c),l(a,c-d,a,c+d),u.textAlign="center",u.textBaseline="middle";let _=5+i+Math.floor((a-5)/h.ball_d)*h.ball_d-Math.abs((s-n)%2)*h.ball_d/2,p=5+h.ball_d/2+Math.floor((c-5)/(h.ball_d*o))*(h.ball_d*o);u.fillText(g,t(_),t(p));let b=Math.round((_-5-i)/(h.ball_d/2)),f=Math.round((p-5-h.ball_d/2)/(h.ball_d*o/2));L.push([b,f]),w&&y&&(u.lineWidth=t(h.stroke_w/2),l(w,y,a,c),u.lineWidth=t(h.stroke_w)),w=a,y=c,g++}$=-$}for(let t=0;t<h.balls_w;t++)M(m,x),t<Math.ceil((h.balls_h+1)/2)&&(x+=2,x>h.balls_h&&(x=h.balls_h)),t>=h.balls_w-Math.ceil((h.balls_h+1)/2)&&(k?(k=!1,x-=1):x-=2),m+=h.ball_d;function T(t,e){for(let a=0;a<L.length;a++)if(L[a][0]==t&&L[a][1]==e)return a;return-1}const E=2*h.balls_w-1,C=2*(2*h.balls_h+1)-1,S=h.balls_w,N=2*h.balls_h+1;let G="// BallClock Generator\r\n";G+=`#define MX_LED_AMOUNT ${L.length}\r\n`,G+=`#define MX_XY_W ${E}\r\n`,G+=`#define MX_XY_H ${C}\r\n`,G+=`#define MX_DIAG_W ${S}\r\n`,G+=`#define MX_DIAG_H ${N}\r\n`,G+="\r\n\r\n",G+="// BallClock Generator\r\n",G+="static const uint8_t xyToLed[MX_DIAG_H][MX_XY_W] = {\r\n";for(let t=C-1;t>=0;t--)if(!(t%2)){G+="\t{";for(let e=0;e<E;e++){let a=T(e,t);G+=a>=0?a+1:0,e!=E-1&&(G+=", ")}G+="},\r\n"}G+="};\r\n\r\n",G+="static const uint8_t diagToLed[MX_DIAG_H][MX_DIAG_W] = {\r\n";for(let t=N-1;t>=0;t--){G+="\t{";for(let e=0;e<S;e++){let a=5+i+h.balls_h/2*h.ball_d+e*h.ball_d-(N-1-t)*h.ball_d/2,n=5+h.ball_d/2+t*h.ball_d*o,l=T(Math.round((a-5-i)/(h.ball_d/2)),Math.round((n-5-h.ball_d/2)/(h.ball_d*o/2)));G+=l>=0?l+1:0,e!=S-1&&(G+=", ")}G+="},\r\n"}G+="};\r\n",h.code=G}function b(){let t=document.createElement("a");t.href=d.toDataURL("image/png"),t.download="BallClock.png",t.click()}function f(){navigator.clipboard.writeText(h.code)}document.addEventListener("DOMContentLoaded",(()=>{d=document.getElementById("canvas"),u=d.getContext("2d"),h=new c({title:"BallClock",theme:"light"}).addHTML("","","Стандартный размер - 20x3 (20x7 реальный)").addNumber("balls_w","Ширина (шаров)",20,1,p).addNumber("balls_h","Высота x2 + 1 (шаров)",3,1,p).addNumber("ball_d","Диаметр шара (мм)",39.9,.05,p).addNumber("led_step","Шаг светодиодов (мм)",33.15,.05,p).addNumber("stroke_w","Толщина линий (мм)",.4,.05,p).addArea("code","Code","").addButtons({copy:["Copy",f],save:["PNG",b]}),p()}))})();