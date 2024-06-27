(()=>{var e={155:e=>{var t,n,i=e.exports={};function r(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function o(e){if(t===setTimeout)return setTimeout(e,0);if((t===r||!t)&&setTimeout)return t=setTimeout,setTimeout(e,0);try{return t(e,0)}catch(n){try{return t.call(null,e,0)}catch(n){return t.call(this,e,0)}}}!function(){try{t="function"==typeof setTimeout?setTimeout:r}catch(e){t=r}try{n="function"==typeof clearTimeout?clearTimeout:s}catch(e){n=s}}();var a,l=[],u=!1,h=-1;function c(){u&&a&&(u=!1,a.length?l=a.concat(l):h=-1,l.length&&d())}function d(){if(!u){var e=o(c);u=!0;for(var t=l.length;t;){for(a=l,l=[];++h<t;)a&&a[h].run();h=-1,t=l.length}a=null,u=!1,function(e){if(n===clearTimeout)return clearTimeout(e);if((n===s||!n)&&clearTimeout)return n=clearTimeout,clearTimeout(e);try{return n(e)}catch(t){try{return n.call(null,e)}catch(t){return n.call(this,e)}}}(e)}}function g(e,t){this.fun=e,this.array=t}function m(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];l.push(new g(e,t)),1!==l.length||u||o(d)},g.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=m,i.addListener=m,i.once=m,i.off=m,i.removeListener=m,i.removeAllListeners=m,i.emit=m,i.prependListener=m,i.prependOnceListener=m,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}}},t={};function n(i){var r=t[i];if(void 0!==r)return r.exports;var s=t[i]={exports:{}};return e[i](s,s.exports,n),s.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),(()=>{"use strict";const e=new class{constructor(){this.listeners=[],this.unexpectedErrorHandler=function(e){setTimeout((()=>{if(e.stack){if(a.isErrorNoTelemetry(e))throw new a(e.message+"\n\n"+e.stack);throw new Error(e.message+"\n\n"+e.stack)}throw e}),0)}}emit(e){this.listeners.forEach((t=>{t(e)}))}onUnexpectedError(e){this.unexpectedErrorHandler(e),this.emit(e)}onUnexpectedExternalError(e){this.unexpectedErrorHandler(e)}};function t(t){s(t)||e.onUnexpectedError(t)}function i(e){if(e instanceof Error){const{name:t,message:n}=e;return{$isError:!0,name:t,message:n,stack:e.stacktrace||e.stack,noTelemetry:a.isErrorNoTelemetry(e)}}return e}const r="Canceled";function s(e){return e instanceof o||e instanceof Error&&e.name===r&&e.message===r}class o extends Error{constructor(){super(r),this.name=this.message}}class a extends Error{constructor(e){super(e),this.name="CodeExpectedError"}static fromError(e){if(e instanceof a)return e;const t=new a;return t.message=e.message,t.stack=e.stack,t}static isErrorNoTelemetry(e){return"CodeExpectedError"===e.name}}class l extends Error{constructor(e){super(e||"An unexpected bug occurred."),Object.setPrototypeOf(this,l.prototype)}}function u(e){const t=this;let n,i=!1;return function(){return i||(i=!0,n=e.apply(t,arguments)),n}}var h;!function(e){function t(e){return e&&"object"==typeof e&&"function"==typeof e[Symbol.iterator]}e.is=t;const n=Object.freeze([]);function*i(e){yield e}e.empty=function(){return n},e.single=i,e.wrap=function(e){return t(e)?e:i(e)},e.from=function(e){return e||n},e.reverse=function*(e){for(let t=e.length-1;t>=0;t--)yield e[t]},e.isEmpty=function(e){return!e||!0===e[Symbol.iterator]().next().done},e.first=function(e){return e[Symbol.iterator]().next().value},e.some=function(e,t){for(const n of e)if(t(n))return!0;return!1},e.find=function(e,t){for(const n of e)if(t(n))return n},e.filter=function*(e,t){for(const n of e)t(n)&&(yield n)},e.map=function*(e,t){let n=0;for(const i of e)yield t(i,n++)},e.concat=function*(...e){for(const t of e)for(const e of t)yield e},e.reduce=function(e,t,n){let i=n;for(const r of e)i=t(i,r);return i},e.slice=function*(e,t,n=e.length){for(t<0&&(t+=e.length),n<0?n+=e.length:n>e.length&&(n=e.length);t<n;t++)yield e[t]},e.consume=function(t,n=Number.POSITIVE_INFINITY){const i=[];if(0===n)return[i,t];const r=t[Symbol.iterator]();for(let s=0;s<n;s++){const t=r.next();if(t.done)return[i,e.empty()];i.push(t.value)}return[i,{[Symbol.iterator]:()=>r}]}}(h||(h={}));let c=null;function d(e){return null==c||c.trackDisposable(e),e}function g(e){null==c||c.markAsDisposed(e)}function m(e,t){null==c||c.setParent(e,t)}function f(e){if(h.is(e)){const n=[];for(const i of e)if(i)try{i.dispose()}catch(t){n.push(t)}if(1===n.length)throw n[0];if(n.length>1)throw new AggregateError(n,"Encountered errors while disposing of store");return Array.isArray(e)?[]:e}if(e)return e.dispose(),e}function p(...e){const t=b((()=>f(e)));return function(e,t){if(c)for(const n of e)c.setParent(n,t)}(e,t),t}function b(e){const t=d({dispose:u((()=>{g(t),e()}))});return t}class _{constructor(){this._toDispose=new Set,this._isDisposed=!1,d(this)}dispose(){this._isDisposed||(g(this),this._isDisposed=!0,this.clear())}get isDisposed(){return this._isDisposed}clear(){if(0!==this._toDispose.size)try{f(this._toDispose)}finally{this._toDispose.clear()}}add(e){if(!e)return e;if(e===this)throw new Error("Cannot register a disposable on itself!");return m(e,this),this._isDisposed?_.DISABLE_DISPOSED_WARNING||console.warn(new Error("Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!").stack):this._toDispose.add(e),e}deleteAndLeak(e){e&&this._toDispose.has(e)&&(this._toDispose.delete(e),m(e,null))}}_.DISABLE_DISPOSED_WARNING=!1;class v{constructor(){this._store=new _,d(this),m(this._store,this)}dispose(){g(this),this._store.dispose()}_register(e){if(e===this)throw new Error("Cannot register a disposable on itself!");return this._store.add(e)}}v.None=Object.freeze({dispose(){}});Symbol.iterator;class y{constructor(e){this.element=e,this.next=y.Undefined,this.prev=y.Undefined}}y.Undefined=new y(void 0);class C{constructor(){this._first=y.Undefined,this._last=y.Undefined,this._size=0}get size(){return this._size}isEmpty(){return this._first===y.Undefined}clear(){let e=this._first;for(;e!==y.Undefined;){const t=e.next;e.prev=y.Undefined,e.next=y.Undefined,e=t}this._first=y.Undefined,this._last=y.Undefined,this._size=0}unshift(e){return this._insert(e,!1)}push(e){return this._insert(e,!0)}_insert(e,t){const n=new y(e);if(this._first===y.Undefined)this._first=n,this._last=n;else if(t){const e=this._last;this._last=n,n.prev=e,e.next=n}else{const e=this._first;this._first=n,n.next=e,e.prev=n}this._size+=1;let i=!1;return()=>{i||(i=!0,this._remove(n))}}shift(){if(this._first!==y.Undefined){const e=this._first.element;return this._remove(this._first),e}}pop(){if(this._last!==y.Undefined){const e=this._last.element;return this._remove(this._last),e}}_remove(e){if(e.prev!==y.Undefined&&e.next!==y.Undefined){const t=e.prev;t.next=e.next,e.next.prev=t}else e.prev===y.Undefined&&e.next===y.Undefined?(this._first=y.Undefined,this._last=y.Undefined):e.next===y.Undefined?(this._last=this._last.prev,this._last.next=y.Undefined):e.prev===y.Undefined&&(this._first=this._first.next,this._first.prev=y.Undefined);this._size-=1}*[Symbol.iterator](){let e=this._first;for(;e!==y.Undefined;)yield e.element,e=e.next}}const L=globalThis.performance&&"function"==typeof globalThis.performance.now;class w{static create(e){return new w(e)}constructor(e){this._now=L&&!1===e?Date.now:globalThis.performance.now.bind(globalThis.performance),this._startTime=this._now(),this._stopTime=-1}stop(){this._stopTime=this._now()}elapsed(){return-1!==this._stopTime?this._stopTime-this._startTime:this._now()-this._startTime}}var N;!function(e){function t(e){false}function n(e){return(t,n=null,i)=>{let r,s=!1;return r=e((e=>{if(!s)return r?r.dispose():s=!0,t.call(n,e)}),null,i),s&&r.dispose(),r}}function i(e,t,n){return s(((n,i=null,r)=>e((e=>n.call(i,t(e))),null,r)),n)}function r(e,t,n){return s(((n,i=null,r)=>e((e=>t(e)&&n.call(i,e)),null,r)),n)}function s(e,n){let i;const r={onWillAddFirstListener(){i=e(s.fire,s)},onDidRemoveLastListener(){null==i||i.dispose()}};n||t();const s=new x(r);return null==n||n.add(s),s.event}function o(e,n,i=100,r=!1,s=!1,o,a){let l,u,h,c,d=0;const g={leakWarningThreshold:o,onWillAddFirstListener(){l=e((e=>{d++,u=n(u,e),r&&!h&&(m.fire(u),u=void 0),c=()=>{const e=u;u=void 0,h=void 0,(!r||d>1)&&m.fire(e),d=0},"number"==typeof i?(clearTimeout(h),h=setTimeout(c,i)):void 0===h&&(h=0,queueMicrotask(c))}))},onWillRemoveListener(){s&&d>0&&(null==c||c())},onDidRemoveLastListener(){c=void 0,l.dispose()}};a||t();const m=new x(g);return null==a||a.add(m),m.event}e.None=()=>v.None,e.defer=function(e,t){return o(e,(()=>{}),0,void 0,!0,void 0,t)},e.once=n,e.map=i,e.forEach=function(e,t,n){return s(((n,i=null,r)=>e((e=>{t(e),n.call(i,e)}),null,r)),n)},e.filter=r,e.signal=function(e){return e},e.any=function(...e){return(t,n=null,i)=>function(e,t){t instanceof Array?t.push(e):t&&t.add(e);return e}(p(...e.map((e=>e((e=>t.call(n,e)))))),i)},e.reduce=function(e,t,n,r){let s=n;return i(e,(e=>(s=t(s,e),s)),r)},e.debounce=o,e.accumulate=function(t,n=0,i){return e.debounce(t,((e,t)=>e?(e.push(t),e):[t]),n,void 0,!0,void 0,i)},e.latch=function(e,t=((e,t)=>e===t),n){let i,s=!0;return r(e,(e=>{const n=s||!t(e,i);return s=!1,i=e,n}),n)},e.split=function(t,n,i){return[e.filter(t,n,i),e.filter(t,(e=>!n(e)),i)]},e.buffer=function(e,t=!1,n=[],i){let r=n.slice(),s=e((e=>{r?r.push(e):a.fire(e)}));i&&i.add(s);const o=()=>{null==r||r.forEach((e=>a.fire(e))),r=null},a=new x({onWillAddFirstListener(){s||(s=e((e=>a.fire(e))),i&&i.add(s))},onDidAddFirstListener(){r&&(t?setTimeout(o):o())},onDidRemoveLastListener(){s&&s.dispose(),s=null}});return i&&i.add(a),a.event},e.chain=function(e,t){return(n,i,r)=>{const s=t(new l);return e((function(e){const t=s.evaluate(e);t!==a&&n.call(i,t)}),void 0,r)}};const a=Symbol("HaltChainable");class l{constructor(){this.steps=[]}map(e){return this.steps.push(e),this}forEach(e){return this.steps.push((t=>(e(t),t))),this}filter(e){return this.steps.push((t=>e(t)?t:a)),this}reduce(e,t){let n=t;return this.steps.push((t=>(n=e(n,t),n))),this}latch(e=((e,t)=>e===t)){let t,n=!0;return this.steps.push((i=>{const r=n||!e(i,t);return n=!1,t=i,r?i:a})),this}evaluate(e){for(const t of this.steps)if((e=t(e))===a)break;return e}}e.fromNodeEventEmitter=function(e,t,n=(e=>e)){const i=(...e)=>r.fire(n(...e)),r=new x({onWillAddFirstListener:()=>e.on(t,i),onDidRemoveLastListener:()=>e.removeListener(t,i)});return r.event},e.fromDOMEventEmitter=function(e,t,n=(e=>e)){const i=(...e)=>r.fire(n(...e)),r=new x({onWillAddFirstListener:()=>e.addEventListener(t,i),onDidRemoveLastListener:()=>e.removeEventListener(t,i)});return r.event},e.toPromise=function(e){return new Promise((t=>n(e)(t)))},e.fromPromise=function(e){const t=new x;return e.then((e=>{t.fire(e)}),(()=>{t.fire(void 0)})).finally((()=>{t.dispose()})),t.event},e.runAndSubscribe=function(e,t){return t(void 0),e((e=>t(e)))},e.runAndSubscribeWithStore=function(e,t){let n=null;function i(e){null==n||n.dispose(),n=new _,t(e,n)}i(void 0);const r=e((e=>i(e)));return b((()=>{r.dispose(),null==n||n.dispose()}))};class u{constructor(e,n){this._observable=e,this._counter=0,this._hasChanged=!1;const i={onWillAddFirstListener:()=>{e.addObserver(this)},onDidRemoveLastListener:()=>{e.removeObserver(this)}};n||t(),this.emitter=new x(i),n&&n.add(this.emitter)}beginUpdate(e){this._counter++}handlePossibleChange(e){}handleChange(e,t){this._hasChanged=!0}endUpdate(e){this._counter--,0===this._counter&&(this._observable.reportChanges(),this._hasChanged&&(this._hasChanged=!1,this.emitter.fire(this._observable.get())))}}e.fromObservable=function(e,t){return new u(e,t).emitter.event},e.fromObservableLight=function(e){return t=>{let n=0,i=!1;const r={beginUpdate(){n++},endUpdate(){n--,0===n&&(e.reportChanges(),i&&(i=!1,t()))},handlePossibleChange(){},handleChange(){i=!0}};return e.addObserver(r),e.reportChanges(),{dispose(){e.removeObserver(r)}}}}}(N||(N={}));class E{constructor(e){this.listenerCount=0,this.invocationCount=0,this.elapsedOverall=0,this.durations=[],this.name=`${e}_${E._idPool++}`,E.all.add(this)}start(e){this._stopWatch=new w,this.listenerCount=e}stop(){if(this._stopWatch){const e=this._stopWatch.elapsed();this.durations.push(e),this.elapsedOverall+=e,this.invocationCount+=1,this._stopWatch=void 0}}}E.all=new Set,E._idPool=0;class S{constructor(e,t=Math.random().toString(18).slice(2,5)){this.threshold=e,this.name=t,this._warnCountdown=0}dispose(){var e;null===(e=this._stacks)||void 0===e||e.clear()}check(e,t){const n=this.threshold;if(n<=0||t<n)return;this._stacks||(this._stacks=new Map);const i=this._stacks.get(e.value)||0;if(this._stacks.set(e.value,i+1),this._warnCountdown-=1,this._warnCountdown<=0){let e;this._warnCountdown=.5*n;let i=0;for(const[t,n]of this._stacks)(!e||i<n)&&(e=t,i=n);console.warn(`[${this.name}] potential listener LEAK detected, having ${t} listeners already. MOST frequent listener (${i}):`),console.warn(e)}return()=>{const t=this._stacks.get(e.value)||0;this._stacks.set(e.value,t-1)}}}class R{static create(){var e;return new R(null!==(e=(new Error).stack)&&void 0!==e?e:"")}constructor(e){this.value=e}print(){console.warn(this.value.split("\n").slice(2).join("\n"))}}class A{constructor(e){this.value=e}}class x{constructor(e){var t,n,i,r,s;this._size=0,this._options=e,this._leakageMon=(null===(t=this._options)||void 0===t?void 0:t.leakWarningThreshold)?new S(null!==(i=null===(n=this._options)||void 0===n?void 0:n.leakWarningThreshold)&&void 0!==i?i:-1):void 0,this._perfMon=(null===(r=this._options)||void 0===r?void 0:r._profName)?new E(this._options._profName):void 0,this._deliveryQueue=null===(s=this._options)||void 0===s?void 0:s.deliveryQueue}dispose(){var e,t,n,i;this._disposed||(this._disposed=!0,(null===(e=this._deliveryQueue)||void 0===e?void 0:e.current)===this&&this._deliveryQueue.reset(),this._listeners&&(this._listeners=void 0,this._size=0),null===(n=null===(t=this._options)||void 0===t?void 0:t.onDidRemoveLastListener)||void 0===n||n.call(t),null===(i=this._leakageMon)||void 0===i||i.dispose())}get event(){var e;return null!==(e=this._event)&&void 0!==e||(this._event=(e,t,n)=>{var i,r,s,o,a;if(this._leakageMon&&this._size>3*this._leakageMon.threshold)return console.warn(`[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far`),v.None;if(this._disposed)return v.None;t&&(e=e.bind(t));const l=new A(e);let u;this._leakageMon&&this._size>=Math.ceil(.2*this._leakageMon.threshold)&&(l.stack=R.create(),u=this._leakageMon.check(l.stack,this._size+1)),this._listeners?this._listeners instanceof A?(null!==(a=this._deliveryQueue)&&void 0!==a||(this._deliveryQueue=new M),this._listeners=[this._listeners,l]):this._listeners.push(l):(null===(r=null===(i=this._options)||void 0===i?void 0:i.onWillAddFirstListener)||void 0===r||r.call(i,this),this._listeners=l,null===(o=null===(s=this._options)||void 0===s?void 0:s.onDidAddFirstListener)||void 0===o||o.call(s,this)),this._size++;const h=b((()=>{null==u||u(),this._removeListener(l)}));return n instanceof _?n.add(h):Array.isArray(n)&&n.push(h),h}),this._event}_removeListener(e){var t,n,i,r;if(null===(n=null===(t=this._options)||void 0===t?void 0:t.onWillRemoveListener)||void 0===n||n.call(t,this),!this._listeners)return;if(1===this._size)return this._listeners=void 0,null===(r=null===(i=this._options)||void 0===i?void 0:i.onDidRemoveLastListener)||void 0===r||r.call(i,this),void(this._size=0);const s=this._listeners,o=s.indexOf(e);if(-1===o)throw console.log("disposed?",this._disposed),console.log("size?",this._size),console.log("arr?",JSON.stringify(this._listeners)),new Error("Attempted to dispose unknown listener");this._size--,s[o]=void 0;const a=this._deliveryQueue.current===this;if(2*this._size<=s.length){let e=0;for(let t=0;t<s.length;t++)s[t]?s[e++]=s[t]:a&&(this._deliveryQueue.end--,e<this._deliveryQueue.i&&this._deliveryQueue.i--);s.length=e}}_deliver(e,n){var i;if(!e)return;const r=(null===(i=this._options)||void 0===i?void 0:i.onListenerError)||t;if(r)try{e.value(n)}catch(s){r(s)}else e.value(n)}_deliverQueue(e){const t=e.current._listeners;for(;e.i<e.end;)this._deliver(t[e.i++],e.value);e.reset()}fire(e){var t,n,i,r;if((null===(t=this._deliveryQueue)||void 0===t?void 0:t.current)&&(this._deliverQueue(this._deliveryQueue),null===(n=this._perfMon)||void 0===n||n.stop()),null===(i=this._perfMon)||void 0===i||i.start(this._size),this._listeners)if(this._listeners instanceof A)this._deliver(this._listeners,e);else{const t=this._deliveryQueue;t.enqueue(this,e,this._listeners.length),this._deliverQueue(t)}else;null===(r=this._perfMon)||void 0===r||r.stop()}hasListeners(){return this._size>0}}class M{constructor(){this.i=-1,this.end=0}enqueue(e,t,n){this.i=0,this.end=n,this.current=e,this.value=t}reset(){this.i=this.end,this.current=void 0,this.value=void 0}}Object.prototype.hasOwnProperty;function k(e){const t=[];for(const n of function(e){let t=[];for(;Object.prototype!==e;)t=t.concat(Object.getOwnPropertyNames(e)),e=Object.getPrototypeOf(e);return t}(e))"function"==typeof e[n]&&t.push(n);return t}let T="undefined"!=typeof document&&document.location&&document.location.hash.indexOf("pseudo=true")>=0;function O(e,t){let n;return n=0===t.length?e:e.replace(/\{(\d+)\}/g,((e,n)=>{const i=n[0],r=t[i];let s=e;return"string"==typeof r?s=r:"number"!=typeof r&&"boolean"!=typeof r&&null!=r||(s=String(r)),s})),T&&(n="\uff3b"+n.replace(/[aouei]/g,"$&$&")+"\uff3d"),n}function I(e,t,...n){return O(t,n)}var P,D=n(155);const K="en";let F,q,V=!1,B=!1,U=!1,W=!1,H=!1,z=!1,$=!1,j=!1,G=!1,Q=!1,Y=null,X=null,J=null;const Z="object"==typeof self?self:"object"==typeof n.g?n.g:{};let ee;void 0!==Z.vscode&&void 0!==Z.vscode.process?ee=Z.vscode.process:void 0!==D&&(ee=D);const te="string"==typeof(null===(P=null==ee?void 0:ee.versions)||void 0===P?void 0:P.electron),ne=te&&"renderer"===(null==ee?void 0:ee.type);if("object"!=typeof navigator||ne)if("object"==typeof ee){V="win32"===ee.platform,B="darwin"===ee.platform,U="linux"===ee.platform,W=U&&!!ee.env.SNAP&&!!ee.env.SNAP_REVISION,$=te,G=!!ee.env.CI||!!ee.env.BUILD_ARTIFACTSTAGINGDIRECTORY,F=K,Y=K;const e=ee.env.VSCODE_NLS_CONFIG;if(e)try{const t=JSON.parse(e),n=t.availableLanguages["*"];F=t.locale,X=t.osLocale,Y=n||K,J=t._translationsConfigFile}catch(zr){}H=!0}else console.error("Unable to resolve platform.");else{q=navigator.userAgent,V=q.indexOf("Windows")>=0,B=q.indexOf("Macintosh")>=0,j=(q.indexOf("Macintosh")>=0||q.indexOf("iPad")>=0||q.indexOf("iPhone")>=0)&&!!navigator.maxTouchPoints&&navigator.maxTouchPoints>0,U=q.indexOf("Linux")>=0,Q=(null==q?void 0:q.indexOf("Mobi"))>=0,z=!0;F=void I(0,"_")||K,Y=F,X=navigator.language}let ie=0;B?ie=1:V?ie=3:U&&(ie=2);const re=V,se=B,oe=(z&&Z.importScripts,q),ae="function"==typeof Z.postMessage&&!Z.importScripts;(()=>{if(ae){const e=[];Z.addEventListener("message",(t=>{if(t.data&&t.data.vscodeScheduleAsyncWork)for(let n=0,i=e.length;n<i;n++){const i=e[n];if(i.id===t.data.vscodeScheduleAsyncWork)return e.splice(n,1),void i.callback()}}));let t=0;return n=>{const i=++t;e.push({id:i,callback:n}),Z.postMessage({vscodeScheduleAsyncWork:i},"*")}}})();const le=!!(oe&&oe.indexOf("Chrome")>=0);oe&&oe.indexOf("Firefox"),!le&&oe&&oe.indexOf("Safari"),oe&&oe.indexOf("Edg/"),oe&&oe.indexOf("Android");class ue{constructor(e){this.executor=e,this._didRun=!1}get value(){if(!this._didRun)try{this._value=this.executor()}catch(e){this._error=e}finally{this._didRun=!0}if(this._error)throw this._error;return this._value}get rawValue(){return this._value}}var he;function ce(e){return e.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g,"\\$&")}function de(e){return e>=65&&e<=90}function ge(e){return 55296<=e&&e<=56319}function me(e){return 56320<=e&&e<=57343}function fe(e,t){return t-56320+(e-55296<<10)+65536}function pe(e,t,n){const i=e.charCodeAt(n);if(ge(i)&&n+1<t){const t=e.charCodeAt(n+1);if(me(t))return fe(i,t)}return i}const be=/^[\t\n\r\x20-\x7E]*$/;String.fromCharCode(65279);class _e{static getInstance(){return _e._INSTANCE||(_e._INSTANCE=new _e),_e._INSTANCE}constructor(){this._data=JSON.parse("[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]")}getGraphemeBreakType(e){if(e<32)return 10===e?3:13===e?2:4;if(e<127)return 0;const t=this._data,n=t.length/3;let i=1;for(;i<=n;)if(e<t[3*i])i*=2;else{if(!(e>t[3*i+1]))return t[3*i+2];i=2*i+1}return 0}}_e._INSTANCE=null;class ve{static getInstance(e){return he.cache.get(Array.from(e))}static getLocales(){return he._locales.value}constructor(e){this.confusableDictionary=e}isAmbiguous(e){return this.confusableDictionary.has(e)}getPrimaryConfusable(e){return this.confusableDictionary.get(e)}getConfusableCodePoints(){return new Set(this.confusableDictionary.keys())}}he=ve,ve.ambiguousCharacterData=new ue((()=>JSON.parse('{"_common":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],"_default":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"cs":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"de":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"es":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"fr":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"it":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ja":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],"ko":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pl":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pt-BR":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"qps-ploc":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ru":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"tr":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"zh-hans":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],"zh-hant":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}'))),ve.cache=new class{constructor(e){this.fn=e,this.lastCache=void 0,this.lastArgKey=void 0}get(e){const t=JSON.stringify(e);return this.lastArgKey!==t&&(this.lastArgKey=t,this.lastCache=this.fn(e)),this.lastCache}}((e=>{function t(e){const t=new Map;for(let n=0;n<e.length;n+=2)t.set(e[n],e[n+1]);return t}function n(e,t){if(!e)return t;const n=new Map;for(const[i,r]of e)t.has(i)&&n.set(i,r);return n}const i=he.ambiguousCharacterData.value;let r,s=e.filter((e=>!e.startsWith("_")&&e in i));0===s.length&&(s=["_default"]);for(const a of s){r=n(r,t(i[a]))}const o=function(e,t){const n=new Map(e);for(const[i,r]of t)n.set(i,r);return n}(t(i._common),r);return new he(o)})),ve._locales=new ue((()=>Object.keys(he.ambiguousCharacterData.value).filter((e=>!e.startsWith("_")))));class ye{static getRawData(){return JSON.parse("[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]")}static getData(){return this._data||(this._data=new Set(ye.getRawData())),this._data}static isInvisibleCharacter(e){return ye.getData().has(e)}static get codePoints(){return ye.getData()}}ye._data=void 0;const Ce="$initialize";class Le{constructor(e,t,n,i){this.vsWorker=e,this.req=t,this.method=n,this.args=i,this.type=0}}class we{constructor(e,t,n,i){this.vsWorker=e,this.seq=t,this.res=n,this.err=i,this.type=1}}class Ne{constructor(e,t,n,i){this.vsWorker=e,this.req=t,this.eventName=n,this.arg=i,this.type=2}}class Ee{constructor(e,t,n){this.vsWorker=e,this.req=t,this.event=n,this.type=3}}class Se{constructor(e,t){this.vsWorker=e,this.req=t,this.type=4}}class Re{constructor(e){this._workerId=-1,this._handler=e,this._lastSentReq=0,this._pendingReplies=Object.create(null),this._pendingEmitters=new Map,this._pendingEvents=new Map}setWorkerId(e){this._workerId=e}sendMessage(e,t){const n=String(++this._lastSentReq);return new Promise(((i,r)=>{this._pendingReplies[n]={resolve:i,reject:r},this._send(new Le(this._workerId,n,e,t))}))}listen(e,t){let n=null;const i=new x({onWillAddFirstListener:()=>{n=String(++this._lastSentReq),this._pendingEmitters.set(n,i),this._send(new Ne(this._workerId,n,e,t))},onDidRemoveLastListener:()=>{this._pendingEmitters.delete(n),this._send(new Se(this._workerId,n)),n=null}});return i.event}handleMessage(e){e&&e.vsWorker&&(-1!==this._workerId&&e.vsWorker!==this._workerId||this._handleMessage(e))}_handleMessage(e){switch(e.type){case 1:return this._handleReplyMessage(e);case 0:return this._handleRequestMessage(e);case 2:return this._handleSubscribeEventMessage(e);case 3:return this._handleEventMessage(e);case 4:return this._handleUnsubscribeEventMessage(e)}}_handleReplyMessage(e){if(!this._pendingReplies[e.seq])return void console.warn("Got reply to unknown seq");const t=this._pendingReplies[e.seq];if(delete this._pendingReplies[e.seq],e.err){let n=e.err;return e.err.$isError&&(n=new Error,n.name=e.err.name,n.message=e.err.message,n.stack=e.err.stack),void t.reject(n)}t.resolve(e.res)}_handleRequestMessage(e){const t=e.req;this._handler.handleMessage(e.method,e.args).then((e=>{this._send(new we(this._workerId,t,e,void 0))}),(e=>{e.detail instanceof Error&&(e.detail=i(e.detail)),this._send(new we(this._workerId,t,void 0,i(e)))}))}_handleSubscribeEventMessage(e){const t=e.req,n=this._handler.handleEvent(e.eventName,e.arg)((e=>{this._send(new Ee(this._workerId,t,e))}));this._pendingEvents.set(t,n)}_handleEventMessage(e){this._pendingEmitters.has(e.req)?this._pendingEmitters.get(e.req).fire(e.event):console.warn("Got event for unknown req")}_handleUnsubscribeEventMessage(e){this._pendingEvents.has(e.req)?(this._pendingEvents.get(e.req).dispose(),this._pendingEvents.delete(e.req)):console.warn("Got unsubscribe for unknown req")}_send(e){const t=[];if(0===e.type)for(let n=0;n<e.args.length;n++)e.args[n]instanceof ArrayBuffer&&t.push(e.args[n]);else 1===e.type&&e.res instanceof ArrayBuffer&&t.push(e.res);this._handler.sendMessage(e,t)}}function Ae(e){return"o"===e[0]&&"n"===e[1]&&de(e.charCodeAt(2))}function xe(e){return/^onDynamic/.test(e)&&de(e.charCodeAt(9))}function Me(e,t,n){const i=e=>function(){const n=Array.prototype.slice.call(arguments,0);return t(e,n)},r=e=>function(t){return n(e,t)},s={};for(const o of e)xe(o)?s[o]=r(o):Ae(o)?s[o]=n(o,void 0):s[o]=i(o);return s}class ke{constructor(e,t){this._requestHandlerFactory=t,this._requestHandler=null,this._protocol=new Re({sendMessage:(t,n)=>{e(t,n)},handleMessage:(e,t)=>this._handleMessage(e,t),handleEvent:(e,t)=>this._handleEvent(e,t)})}onmessage(e){this._protocol.handleMessage(e)}_handleMessage(e,t){if(e===Ce)return this.initialize(t[0],t[1],t[2],t[3]);if(!this._requestHandler||"function"!=typeof this._requestHandler[e])return Promise.reject(new Error("Missing requestHandler or method: "+e));try{return Promise.resolve(this._requestHandler[e].apply(this._requestHandler,t))}catch(zr){return Promise.reject(zr)}}_handleEvent(e,t){if(!this._requestHandler)throw new Error("Missing requestHandler");if(xe(e)){const n=this._requestHandler[e].call(this._requestHandler,t);if("function"!=typeof n)throw new Error(`Missing dynamic event ${e} on request handler.`);return n}if(Ae(e)){const t=this._requestHandler[e];if("function"!=typeof t)throw new Error(`Missing event ${e} on request handler.`);return t}throw new Error(`Malformed event name ${e}`)}initialize(e,t,n,i){this._protocol.setWorkerId(e);const r=Me(i,((e,t)=>this._protocol.sendMessage(e,t)),((e,t)=>this._protocol.listen(e,t)));return this._requestHandlerFactory?(this._requestHandler=this._requestHandlerFactory(r),Promise.resolve(k(this._requestHandler))):(t&&(void 0!==t.baseUrl&&delete t.baseUrl,void 0!==t.paths&&void 0!==t.paths.vs&&delete t.paths.vs,void 0!==typeof t.trustedTypesPolicy&&delete t.trustedTypesPolicy,t.catchError=!0,globalThis.require.config(t)),new Promise(((e,t)=>{(0,globalThis.require)([n],(n=>{this._requestHandler=n.create(r),this._requestHandler?e(k(this._requestHandler)):t(new Error("No RequestHandler!"))}),t)})))}}class Te{constructor(e,t,n,i){this.originalStart=e,this.originalLength=t,this.modifiedStart=n,this.modifiedLength=i}getOriginalEnd(){return this.originalStart+this.originalLength}getModifiedEnd(){return this.modifiedStart+this.modifiedLength}}function Oe(e,t){return(t<<5)-t+e|0}function Ie(e,t){t=Oe(149417,t);for(let n=0,i=e.length;n<i;n++)t=Oe(e.charCodeAt(n),t);return t}function Pe(e,t,n=32){const i=n-t;return(e<<t|(~((1<<i)-1)&e)>>>i)>>>0}function De(e,t=0,n=e.byteLength,i=0){for(let r=0;r<n;r++)e[t+r]=i}function Ke(e,t=32){return e instanceof ArrayBuffer?Array.from(new Uint8Array(e)).map((e=>e.toString(16).padStart(2,"0"))).join(""):function(e,t,n="0"){for(;e.length<t;)e=n+e;return e}((e>>>0).toString(16),t/4)}class Fe{constructor(){this._h0=1732584193,this._h1=4023233417,this._h2=2562383102,this._h3=271733878,this._h4=3285377520,this._buff=new Uint8Array(67),this._buffDV=new DataView(this._buff.buffer),this._buffLen=0,this._totalLen=0,this._leftoverHighSurrogate=0,this._finished=!1}update(e){const t=e.length;if(0===t)return;const n=this._buff;let i,r,s=this._buffLen,o=this._leftoverHighSurrogate;for(0!==o?(i=o,r=-1,o=0):(i=e.charCodeAt(0),r=0);;){let a=i;if(ge(i)){if(!(r+1<t)){o=i;break}{const t=e.charCodeAt(r+1);me(t)?(r++,a=fe(i,t)):a=65533}}else me(i)&&(a=65533);if(s=this._push(n,s,a),r++,!(r<t))break;i=e.charCodeAt(r)}this._buffLen=s,this._leftoverHighSurrogate=o}_push(e,t,n){return n<128?e[t++]=n:n<2048?(e[t++]=192|(1984&n)>>>6,e[t++]=128|(63&n)>>>0):n<65536?(e[t++]=224|(61440&n)>>>12,e[t++]=128|(4032&n)>>>6,e[t++]=128|(63&n)>>>0):(e[t++]=240|(1835008&n)>>>18,e[t++]=128|(258048&n)>>>12,e[t++]=128|(4032&n)>>>6,e[t++]=128|(63&n)>>>0),t>=64&&(this._step(),t-=64,this._totalLen+=64,e[0]=e[64],e[1]=e[65],e[2]=e[66]),t}digest(){return this._finished||(this._finished=!0,this._leftoverHighSurrogate&&(this._leftoverHighSurrogate=0,this._buffLen=this._push(this._buff,this._buffLen,65533)),this._totalLen+=this._buffLen,this._wrapUp()),Ke(this._h0)+Ke(this._h1)+Ke(this._h2)+Ke(this._h3)+Ke(this._h4)}_wrapUp(){this._buff[this._buffLen++]=128,De(this._buff,this._buffLen),this._buffLen>56&&(this._step(),De(this._buff));const e=8*this._totalLen;this._buffDV.setUint32(56,Math.floor(e/4294967296),!1),this._buffDV.setUint32(60,e%4294967296,!1),this._step()}_step(){const e=Fe._bigBlock32,t=this._buffDV;for(let h=0;h<64;h+=4)e.setUint32(h,t.getUint32(h,!1),!1);for(let h=64;h<320;h+=4)e.setUint32(h,Pe(e.getUint32(h-12,!1)^e.getUint32(h-32,!1)^e.getUint32(h-56,!1)^e.getUint32(h-64,!1),1),!1);let n,i,r,s=this._h0,o=this._h1,a=this._h2,l=this._h3,u=this._h4;for(let h=0;h<80;h++)h<20?(n=o&a|~o&l,i=1518500249):h<40?(n=o^a^l,i=1859775393):h<60?(n=o&a|o&l|a&l,i=2400959708):(n=o^a^l,i=3395469782),r=Pe(s,5)+n+u+i+e.getUint32(4*h,!1)&4294967295,u=l,l=a,a=Pe(o,30),o=s,s=r;this._h0=this._h0+s&4294967295,this._h1=this._h1+o&4294967295,this._h2=this._h2+a&4294967295,this._h3=this._h3+l&4294967295,this._h4=this._h4+u&4294967295}}Fe._bigBlock32=new DataView(new ArrayBuffer(320));class qe{constructor(e){this.source=e}getElements(){const e=this.source,t=new Int32Array(e.length);for(let n=0,i=e.length;n<i;n++)t[n]=e.charCodeAt(n);return t}}function Ve(e,t,n){return new He(new qe(e),new qe(t)).ComputeDiff(n).changes}class Be{static Assert(e,t){if(!e)throw new Error(t)}}class Ue{static Copy(e,t,n,i,r){for(let s=0;s<r;s++)n[i+s]=e[t+s]}static Copy2(e,t,n,i,r){for(let s=0;s<r;s++)n[i+s]=e[t+s]}}class We{constructor(){this.m_changes=[],this.m_originalStart=1073741824,this.m_modifiedStart=1073741824,this.m_originalCount=0,this.m_modifiedCount=0}MarkNextChange(){(this.m_originalCount>0||this.m_modifiedCount>0)&&this.m_changes.push(new Te(this.m_originalStart,this.m_originalCount,this.m_modifiedStart,this.m_modifiedCount)),this.m_originalCount=0,this.m_modifiedCount=0,this.m_originalStart=1073741824,this.m_modifiedStart=1073741824}AddOriginalElement(e,t){this.m_originalStart=Math.min(this.m_originalStart,e),this.m_modifiedStart=Math.min(this.m_modifiedStart,t),this.m_originalCount++}AddModifiedElement(e,t){this.m_originalStart=Math.min(this.m_originalStart,e),this.m_modifiedStart=Math.min(this.m_modifiedStart,t),this.m_modifiedCount++}getChanges(){return(this.m_originalCount>0||this.m_modifiedCount>0)&&this.MarkNextChange(),this.m_changes}getReverseChanges(){return(this.m_originalCount>0||this.m_modifiedCount>0)&&this.MarkNextChange(),this.m_changes.reverse(),this.m_changes}}class He{constructor(e,t,n=null){this.ContinueProcessingPredicate=n,this._originalSequence=e,this._modifiedSequence=t;const[i,r,s]=He._getElements(e),[o,a,l]=He._getElements(t);this._hasStrings=s&&l,this._originalStringElements=i,this._originalElementsOrHash=r,this._modifiedStringElements=o,this._modifiedElementsOrHash=a,this.m_forwardHistory=[],this.m_reverseHistory=[]}static _isStringArray(e){return e.length>0&&"string"==typeof e[0]}static _getElements(e){const t=e.getElements();if(He._isStringArray(t)){const e=new Int32Array(t.length);for(let n=0,i=t.length;n<i;n++)e[n]=Ie(t[n],0);return[t,e,!0]}return t instanceof Int32Array?[[],t,!1]:[[],new Int32Array(t),!1]}ElementsAreEqual(e,t){return this._originalElementsOrHash[e]===this._modifiedElementsOrHash[t]&&(!this._hasStrings||this._originalStringElements[e]===this._modifiedStringElements[t])}ElementsAreStrictEqual(e,t){if(!this.ElementsAreEqual(e,t))return!1;return He._getStrictElement(this._originalSequence,e)===He._getStrictElement(this._modifiedSequence,t)}static _getStrictElement(e,t){return"function"==typeof e.getStrictElement?e.getStrictElement(t):null}OriginalElementsAreEqual(e,t){return this._originalElementsOrHash[e]===this._originalElementsOrHash[t]&&(!this._hasStrings||this._originalStringElements[e]===this._originalStringElements[t])}ModifiedElementsAreEqual(e,t){return this._modifiedElementsOrHash[e]===this._modifiedElementsOrHash[t]&&(!this._hasStrings||this._modifiedStringElements[e]===this._modifiedStringElements[t])}ComputeDiff(e){return this._ComputeDiff(0,this._originalElementsOrHash.length-1,0,this._modifiedElementsOrHash.length-1,e)}_ComputeDiff(e,t,n,i,r){const s=[!1];let o=this.ComputeDiffRecursive(e,t,n,i,s);return r&&(o=this.PrettifyChanges(o)),{quitEarly:s[0],changes:o}}ComputeDiffRecursive(e,t,n,i,r){for(r[0]=!1;e<=t&&n<=i&&this.ElementsAreEqual(e,n);)e++,n++;for(;t>=e&&i>=n&&this.ElementsAreEqual(t,i);)t--,i--;if(e>t||n>i){let r;return n<=i?(Be.Assert(e===t+1,"originalStart should only be one more than originalEnd"),r=[new Te(e,0,n,i-n+1)]):e<=t?(Be.Assert(n===i+1,"modifiedStart should only be one more than modifiedEnd"),r=[new Te(e,t-e+1,n,0)]):(Be.Assert(e===t+1,"originalStart should only be one more than originalEnd"),Be.Assert(n===i+1,"modifiedStart should only be one more than modifiedEnd"),r=[]),r}const s=[0],o=[0],a=this.ComputeRecursionPoint(e,t,n,i,s,o,r),l=s[0],u=o[0];if(null!==a)return a;if(!r[0]){const s=this.ComputeDiffRecursive(e,l,n,u,r);let o=[];return o=r[0]?[new Te(l+1,t-(l+1)+1,u+1,i-(u+1)+1)]:this.ComputeDiffRecursive(l+1,t,u+1,i,r),this.ConcatenateChanges(s,o)}return[new Te(e,t-e+1,n,i-n+1)]}WALKTRACE(e,t,n,i,r,s,o,a,l,u,h,c,d,g,m,f,p,b){let _=null,v=null,y=new We,C=t,L=n,w=d[0]-f[0]-i,N=-1073741824,E=this.m_forwardHistory.length-1;do{const t=w+e;t===C||t<L&&l[t-1]<l[t+1]?(g=(h=l[t+1])-w-i,h<N&&y.MarkNextChange(),N=h,y.AddModifiedElement(h+1,g),w=t+1-e):(g=(h=l[t-1]+1)-w-i,h<N&&y.MarkNextChange(),N=h-1,y.AddOriginalElement(h,g+1),w=t-1-e),E>=0&&(e=(l=this.m_forwardHistory[E])[0],C=1,L=l.length-1)}while(--E>=-1);if(_=y.getReverseChanges(),b[0]){let e=d[0]+1,t=f[0]+1;if(null!==_&&_.length>0){const n=_[_.length-1];e=Math.max(e,n.getOriginalEnd()),t=Math.max(t,n.getModifiedEnd())}v=[new Te(e,c-e+1,t,m-t+1)]}else{y=new We,C=s,L=o,w=d[0]-f[0]-a,N=1073741824,E=p?this.m_reverseHistory.length-1:this.m_reverseHistory.length-2;do{const e=w+r;e===C||e<L&&u[e-1]>=u[e+1]?(g=(h=u[e+1]-1)-w-a,h>N&&y.MarkNextChange(),N=h+1,y.AddOriginalElement(h+1,g+1),w=e+1-r):(g=(h=u[e-1])-w-a,h>N&&y.MarkNextChange(),N=h,y.AddModifiedElement(h+1,g+1),w=e-1-r),E>=0&&(r=(u=this.m_reverseHistory[E])[0],C=1,L=u.length-1)}while(--E>=-1);v=y.getChanges()}return this.ConcatenateChanges(_,v)}ComputeRecursionPoint(e,t,n,i,r,s,o){let a=0,l=0,u=0,h=0,c=0,d=0;e--,n--,r[0]=0,s[0]=0,this.m_forwardHistory=[],this.m_reverseHistory=[];const g=t-e+(i-n),m=g+1,f=new Int32Array(m),p=new Int32Array(m),b=i-n,_=t-e,v=e-n,y=t-i,C=(_-b)%2==0;f[b]=e,p[_]=t,o[0]=!1;for(let L=1;L<=g/2+1;L++){let g=0,w=0;u=this.ClipDiagonalBound(b-L,L,b,m),h=this.ClipDiagonalBound(b+L,L,b,m);for(let e=u;e<=h;e+=2){a=e===u||e<h&&f[e-1]<f[e+1]?f[e+1]:f[e-1]+1,l=a-(e-b)-v;const n=a;for(;a<t&&l<i&&this.ElementsAreEqual(a+1,l+1);)a++,l++;if(f[e]=a,a+l>g+w&&(g=a,w=l),!C&&Math.abs(e-_)<=L-1&&a>=p[e])return r[0]=a,s[0]=l,n<=p[e]&&L<=1448?this.WALKTRACE(b,u,h,v,_,c,d,y,f,p,a,t,r,l,i,s,C,o):null}const N=(g-e+(w-n)-L)/2;if(null!==this.ContinueProcessingPredicate&&!this.ContinueProcessingPredicate(g,N))return o[0]=!0,r[0]=g,s[0]=w,N>0&&L<=1448?this.WALKTRACE(b,u,h,v,_,c,d,y,f,p,a,t,r,l,i,s,C,o):(e++,n++,[new Te(e,t-e+1,n,i-n+1)]);c=this.ClipDiagonalBound(_-L,L,_,m),d=this.ClipDiagonalBound(_+L,L,_,m);for(let m=c;m<=d;m+=2){a=m===c||m<d&&p[m-1]>=p[m+1]?p[m+1]-1:p[m-1],l=a-(m-_)-y;const g=a;for(;a>e&&l>n&&this.ElementsAreEqual(a,l);)a--,l--;if(p[m]=a,C&&Math.abs(m-b)<=L&&a<=f[m])return r[0]=a,s[0]=l,g>=f[m]&&L<=1448?this.WALKTRACE(b,u,h,v,_,c,d,y,f,p,a,t,r,l,i,s,C,o):null}if(L<=1447){let e=new Int32Array(h-u+2);e[0]=b-u+1,Ue.Copy2(f,u,e,1,h-u+1),this.m_forwardHistory.push(e),e=new Int32Array(d-c+2),e[0]=_-c+1,Ue.Copy2(p,c,e,1,d-c+1),this.m_reverseHistory.push(e)}}return this.WALKTRACE(b,u,h,v,_,c,d,y,f,p,a,t,r,l,i,s,C,o)}PrettifyChanges(e){for(let t=0;t<e.length;t++){const n=e[t],i=t<e.length-1?e[t+1].originalStart:this._originalElementsOrHash.length,r=t<e.length-1?e[t+1].modifiedStart:this._modifiedElementsOrHash.length,s=n.originalLength>0,o=n.modifiedLength>0;for(;n.originalStart+n.originalLength<i&&n.modifiedStart+n.modifiedLength<r&&(!s||this.OriginalElementsAreEqual(n.originalStart,n.originalStart+n.originalLength))&&(!o||this.ModifiedElementsAreEqual(n.modifiedStart,n.modifiedStart+n.modifiedLength));){const e=this.ElementsAreStrictEqual(n.originalStart,n.modifiedStart);if(this.ElementsAreStrictEqual(n.originalStart+n.originalLength,n.modifiedStart+n.modifiedLength)&&!e)break;n.originalStart++,n.modifiedStart++}const a=[null];t<e.length-1&&this.ChangesOverlap(e[t],e[t+1],a)&&(e[t]=a[0],e.splice(t+1,1),t--)}for(let t=e.length-1;t>=0;t--){const n=e[t];let i=0,r=0;if(t>0){const n=e[t-1];i=n.originalStart+n.originalLength,r=n.modifiedStart+n.modifiedLength}const s=n.originalLength>0,o=n.modifiedLength>0;let a=0,l=this._boundaryScore(n.originalStart,n.originalLength,n.modifiedStart,n.modifiedLength);for(let e=1;;e++){const t=n.originalStart-e,u=n.modifiedStart-e;if(t<i||u<r)break;if(s&&!this.OriginalElementsAreEqual(t,t+n.originalLength))break;if(o&&!this.ModifiedElementsAreEqual(u,u+n.modifiedLength))break;const h=(t===i&&u===r?5:0)+this._boundaryScore(t,n.originalLength,u,n.modifiedLength);h>l&&(l=h,a=e)}n.originalStart-=a,n.modifiedStart-=a;const u=[null];t>0&&this.ChangesOverlap(e[t-1],e[t],u)&&(e[t-1]=u[0],e.splice(t,1),t++)}if(this._hasStrings)for(let t=1,n=e.length;t<n;t++){const n=e[t-1],i=e[t],r=i.originalStart-n.originalStart-n.originalLength,s=n.originalStart,o=i.originalStart+i.originalLength,a=o-s,l=n.modifiedStart,u=i.modifiedStart+i.modifiedLength,h=u-l;if(r<5&&a<20&&h<20){const e=this._findBetterContiguousSequence(s,a,l,h,r);if(e){const[t,s]=e;t===n.originalStart+n.originalLength&&s===n.modifiedStart+n.modifiedLength||(n.originalLength=t-n.originalStart,n.modifiedLength=s-n.modifiedStart,i.originalStart=t+r,i.modifiedStart=s+r,i.originalLength=o-i.originalStart,i.modifiedLength=u-i.modifiedStart)}}}return e}_findBetterContiguousSequence(e,t,n,i,r){if(t<r||i<r)return null;const s=e+t-r+1,o=n+i-r+1;let a=0,l=0,u=0;for(let h=e;h<s;h++)for(let e=n;e<o;e++){const t=this._contiguousSequenceScore(h,e,r);t>0&&t>a&&(a=t,l=h,u=e)}return a>0?[l,u]:null}_contiguousSequenceScore(e,t,n){let i=0;for(let r=0;r<n;r++){if(!this.ElementsAreEqual(e+r,t+r))return 0;i+=this._originalStringElements[e+r].length}return i}_OriginalIsBoundary(e){return e<=0||e>=this._originalElementsOrHash.length-1||this._hasStrings&&/^\s*$/.test(this._originalStringElements[e])}_OriginalRegionIsBoundary(e,t){if(this._OriginalIsBoundary(e)||this._OriginalIsBoundary(e-1))return!0;if(t>0){const n=e+t;if(this._OriginalIsBoundary(n-1)||this._OriginalIsBoundary(n))return!0}return!1}_ModifiedIsBoundary(e){return e<=0||e>=this._modifiedElementsOrHash.length-1||this._hasStrings&&/^\s*$/.test(this._modifiedStringElements[e])}_ModifiedRegionIsBoundary(e,t){if(this._ModifiedIsBoundary(e)||this._ModifiedIsBoundary(e-1))return!0;if(t>0){const n=e+t;if(this._ModifiedIsBoundary(n-1)||this._ModifiedIsBoundary(n))return!0}return!1}_boundaryScore(e,t,n,i){return(this._OriginalRegionIsBoundary(e,t)?1:0)+(this._ModifiedRegionIsBoundary(n,i)?1:0)}ConcatenateChanges(e,t){const n=[];if(0===e.length||0===t.length)return t.length>0?t:e;if(this.ChangesOverlap(e[e.length-1],t[0],n)){const i=new Array(e.length+t.length-1);return Ue.Copy(e,0,i,0,e.length-1),i[e.length-1]=n[0],Ue.Copy(t,1,i,e.length,t.length-1),i}{const n=new Array(e.length+t.length);return Ue.Copy(e,0,n,0,e.length),Ue.Copy(t,0,n,e.length,t.length),n}}ChangesOverlap(e,t,n){if(Be.Assert(e.originalStart<=t.originalStart,"Left change is not less than or equal to right change"),Be.Assert(e.modifiedStart<=t.modifiedStart,"Left change is not less than or equal to right change"),e.originalStart+e.originalLength>=t.originalStart||e.modifiedStart+e.modifiedLength>=t.modifiedStart){const i=e.originalStart;let r=e.originalLength;const s=e.modifiedStart;let o=e.modifiedLength;return e.originalStart+e.originalLength>=t.originalStart&&(r=t.originalStart+t.originalLength-e.originalStart),e.modifiedStart+e.modifiedLength>=t.modifiedStart&&(o=t.modifiedStart+t.modifiedLength-e.modifiedStart),n[0]=new Te(i,r,s,o),!0}return n[0]=null,!1}ClipDiagonalBound(e,t,n,i){if(e>=0&&e<i)return e;const r=t%2==0;if(e<0){return r===(n%2==0)?0:1}return r===((i-n-1)%2==0)?i-1:i-2}}var ze=n(155);let $e;if(void 0!==Z.vscode&&void 0!==Z.vscode.process){const e=Z.vscode.process;$e={get platform(){return e.platform},get arch(){return e.arch},get env(){return e.env},cwd:()=>e.cwd()}}else $e=void 0!==ze?{get platform(){return ze.platform},get arch(){return ze.arch},get env(){return ze.env},cwd:()=>ze.env.VSCODE_CWD||ze.cwd()}:{get platform(){return re?"win32":se?"darwin":"linux"},get arch(){},get env(){return{}},cwd:()=>"/"};const je=$e.cwd,Ge=$e.env,Qe=$e.platform,Ye=46,Xe=47,Je=92,Ze=58;class et extends Error{constructor(e,t,n){let i;"string"==typeof t&&0===t.indexOf("not ")?(i="must not be",t=t.replace(/^not /,"")):i="must be";const r=-1!==e.indexOf(".")?"property":"argument";let s=`The "${e}" ${r} ${i} of type ${t}`;s+=". Received type "+typeof n,super(s),this.code="ERR_INVALID_ARG_TYPE"}}function tt(e,t){if("string"!=typeof e)throw new et(t,"string",e)}const nt="win32"===Qe;function it(e){return e===Xe||e===Je}function rt(e){return e===Xe}function st(e){return e>=65&&e<=90||e>=97&&e<=122}function ot(e,t,n,i){let r="",s=0,o=-1,a=0,l=0;for(let u=0;u<=e.length;++u){if(u<e.length)l=e.charCodeAt(u);else{if(i(l))break;l=Xe}if(i(l)){if(o===u-1||1===a);else if(2===a){if(r.length<2||2!==s||r.charCodeAt(r.length-1)!==Ye||r.charCodeAt(r.length-2)!==Ye){if(r.length>2){const e=r.lastIndexOf(n);-1===e?(r="",s=0):(r=r.slice(0,e),s=r.length-1-r.lastIndexOf(n)),o=u,a=0;continue}if(0!==r.length){r="",s=0,o=u,a=0;continue}}t&&(r+=r.length>0?`${n}..`:"..",s=2)}else r.length>0?r+=`${n}${e.slice(o+1,u)}`:r=e.slice(o+1,u),s=u-o-1;o=u,a=0}else l===Ye&&-1!==a?++a:a=-1}return r}function at(e,t){!function(e,t){if(null===e||"object"!=typeof e)throw new et(t,"Object",e)}(t,"pathObject");const n=t.dir||t.root,i=t.base||`${t.name||""}${t.ext||""}`;return n?n===t.root?`${n}${i}`:`${n}${e}${i}`:i}const lt={resolve(...e){let t="",n="",i=!1;for(let r=e.length-1;r>=-1;r--){let s;if(r>=0){if(s=e[r],tt(s,"path"),0===s.length)continue}else 0===t.length?s=je():(s=Ge[`=${t}`]||je(),(void 0===s||s.slice(0,2).toLowerCase()!==t.toLowerCase()&&s.charCodeAt(2)===Je)&&(s=`${t}\\`));const o=s.length;let a=0,l="",u=!1;const h=s.charCodeAt(0);if(1===o)it(h)&&(a=1,u=!0);else if(it(h))if(u=!0,it(s.charCodeAt(1))){let e=2,t=e;for(;e<o&&!it(s.charCodeAt(e));)e++;if(e<o&&e!==t){const n=s.slice(t,e);for(t=e;e<o&&it(s.charCodeAt(e));)e++;if(e<o&&e!==t){for(t=e;e<o&&!it(s.charCodeAt(e));)e++;e!==o&&e===t||(l=`\\\\${n}\\${s.slice(t,e)}`,a=e)}}}else a=1;else st(h)&&s.charCodeAt(1)===Ze&&(l=s.slice(0,2),a=2,o>2&&it(s.charCodeAt(2))&&(u=!0,a=3));if(l.length>0)if(t.length>0){if(l.toLowerCase()!==t.toLowerCase())continue}else t=l;if(i){if(t.length>0)break}else if(n=`${s.slice(a)}\\${n}`,i=u,u&&t.length>0)break}return n=ot(n,!i,"\\",it),i?`${t}\\${n}`:`${t}${n}`||"."},normalize(e){tt(e,"path");const t=e.length;if(0===t)return".";let n,i=0,r=!1;const s=e.charCodeAt(0);if(1===t)return rt(s)?"\\":e;if(it(s))if(r=!0,it(e.charCodeAt(1))){let r=2,s=r;for(;r<t&&!it(e.charCodeAt(r));)r++;if(r<t&&r!==s){const o=e.slice(s,r);for(s=r;r<t&&it(e.charCodeAt(r));)r++;if(r<t&&r!==s){for(s=r;r<t&&!it(e.charCodeAt(r));)r++;if(r===t)return`\\\\${o}\\${e.slice(s)}\\`;r!==s&&(n=`\\\\${o}\\${e.slice(s,r)}`,i=r)}}}else i=1;else st(s)&&e.charCodeAt(1)===Ze&&(n=e.slice(0,2),i=2,t>2&&it(e.charCodeAt(2))&&(r=!0,i=3));let o=i<t?ot(e.slice(i),!r,"\\",it):"";return 0!==o.length||r||(o="."),o.length>0&&it(e.charCodeAt(t-1))&&(o+="\\"),void 0===n?r?`\\${o}`:o:r?`${n}\\${o}`:`${n}${o}`},isAbsolute(e){tt(e,"path");const t=e.length;if(0===t)return!1;const n=e.charCodeAt(0);return it(n)||t>2&&st(n)&&e.charCodeAt(1)===Ze&&it(e.charCodeAt(2))},join(...e){if(0===e.length)return".";let t,n;for(let s=0;s<e.length;++s){const i=e[s];tt(i,"path"),i.length>0&&(void 0===t?t=n=i:t+=`\\${i}`)}if(void 0===t)return".";let i=!0,r=0;if("string"==typeof n&&it(n.charCodeAt(0))){++r;const e=n.length;e>1&&it(n.charCodeAt(1))&&(++r,e>2&&(it(n.charCodeAt(2))?++r:i=!1))}if(i){for(;r<t.length&&it(t.charCodeAt(r));)r++;r>=2&&(t=`\\${t.slice(r)}`)}return lt.normalize(t)},relative(e,t){if(tt(e,"from"),tt(t,"to"),e===t)return"";const n=lt.resolve(e),i=lt.resolve(t);if(n===i)return"";if((e=n.toLowerCase())===(t=i.toLowerCase()))return"";let r=0;for(;r<e.length&&e.charCodeAt(r)===Je;)r++;let s=e.length;for(;s-1>r&&e.charCodeAt(s-1)===Je;)s--;const o=s-r;let a=0;for(;a<t.length&&t.charCodeAt(a)===Je;)a++;let l=t.length;for(;l-1>a&&t.charCodeAt(l-1)===Je;)l--;const u=l-a,h=o<u?o:u;let c=-1,d=0;for(;d<h;d++){const n=e.charCodeAt(r+d);if(n!==t.charCodeAt(a+d))break;n===Je&&(c=d)}if(d!==h){if(-1===c)return i}else{if(u>h){if(t.charCodeAt(a+d)===Je)return i.slice(a+d+1);if(2===d)return i.slice(a+d)}o>h&&(e.charCodeAt(r+d)===Je?c=d:2===d&&(c=3)),-1===c&&(c=0)}let g="";for(d=r+c+1;d<=s;++d)d!==s&&e.charCodeAt(d)!==Je||(g+=0===g.length?"..":"\\..");return a+=c,g.length>0?`${g}${i.slice(a,l)}`:(i.charCodeAt(a)===Je&&++a,i.slice(a,l))},toNamespacedPath(e){if("string"!=typeof e||0===e.length)return e;const t=lt.resolve(e);if(t.length<=2)return e;if(t.charCodeAt(0)===Je){if(t.charCodeAt(1)===Je){const e=t.charCodeAt(2);if(63!==e&&e!==Ye)return`\\\\?\\UNC\\${t.slice(2)}`}}else if(st(t.charCodeAt(0))&&t.charCodeAt(1)===Ze&&t.charCodeAt(2)===Je)return`\\\\?\\${t}`;return e},dirname(e){tt(e,"path");const t=e.length;if(0===t)return".";let n=-1,i=0;const r=e.charCodeAt(0);if(1===t)return it(r)?e:".";if(it(r)){if(n=i=1,it(e.charCodeAt(1))){let r=2,s=r;for(;r<t&&!it(e.charCodeAt(r));)r++;if(r<t&&r!==s){for(s=r;r<t&&it(e.charCodeAt(r));)r++;if(r<t&&r!==s){for(s=r;r<t&&!it(e.charCodeAt(r));)r++;if(r===t)return e;r!==s&&(n=i=r+1)}}}}else st(r)&&e.charCodeAt(1)===Ze&&(n=t>2&&it(e.charCodeAt(2))?3:2,i=n);let s=-1,o=!0;for(let a=t-1;a>=i;--a)if(it(e.charCodeAt(a))){if(!o){s=a;break}}else o=!1;if(-1===s){if(-1===n)return".";s=n}return e.slice(0,s)},basename(e,t){void 0!==t&&tt(t,"ext"),tt(e,"path");let n,i=0,r=-1,s=!0;if(e.length>=2&&st(e.charCodeAt(0))&&e.charCodeAt(1)===Ze&&(i=2),void 0!==t&&t.length>0&&t.length<=e.length){if(t===e)return"";let o=t.length-1,a=-1;for(n=e.length-1;n>=i;--n){const l=e.charCodeAt(n);if(it(l)){if(!s){i=n+1;break}}else-1===a&&(s=!1,a=n+1),o>=0&&(l===t.charCodeAt(o)?-1==--o&&(r=n):(o=-1,r=a))}return i===r?r=a:-1===r&&(r=e.length),e.slice(i,r)}for(n=e.length-1;n>=i;--n)if(it(e.charCodeAt(n))){if(!s){i=n+1;break}}else-1===r&&(s=!1,r=n+1);return-1===r?"":e.slice(i,r)},extname(e){tt(e,"path");let t=0,n=-1,i=0,r=-1,s=!0,o=0;e.length>=2&&e.charCodeAt(1)===Ze&&st(e.charCodeAt(0))&&(t=i=2);for(let a=e.length-1;a>=t;--a){const t=e.charCodeAt(a);if(it(t)){if(!s){i=a+1;break}}else-1===r&&(s=!1,r=a+1),t===Ye?-1===n?n=a:1!==o&&(o=1):-1!==n&&(o=-1)}return-1===n||-1===r||0===o||1===o&&n===r-1&&n===i+1?"":e.slice(n,r)},format:at.bind(null,"\\"),parse(e){tt(e,"path");const t={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return t;const n=e.length;let i=0,r=e.charCodeAt(0);if(1===n)return it(r)?(t.root=t.dir=e,t):(t.base=t.name=e,t);if(it(r)){if(i=1,it(e.charCodeAt(1))){let t=2,r=t;for(;t<n&&!it(e.charCodeAt(t));)t++;if(t<n&&t!==r){for(r=t;t<n&&it(e.charCodeAt(t));)t++;if(t<n&&t!==r){for(r=t;t<n&&!it(e.charCodeAt(t));)t++;t===n?i=t:t!==r&&(i=t+1)}}}}else if(st(r)&&e.charCodeAt(1)===Ze){if(n<=2)return t.root=t.dir=e,t;if(i=2,it(e.charCodeAt(2))){if(3===n)return t.root=t.dir=e,t;i=3}}i>0&&(t.root=e.slice(0,i));let s=-1,o=i,a=-1,l=!0,u=e.length-1,h=0;for(;u>=i;--u)if(r=e.charCodeAt(u),it(r)){if(!l){o=u+1;break}}else-1===a&&(l=!1,a=u+1),r===Ye?-1===s?s=u:1!==h&&(h=1):-1!==s&&(h=-1);return-1!==a&&(-1===s||0===h||1===h&&s===a-1&&s===o+1?t.base=t.name=e.slice(o,a):(t.name=e.slice(o,s),t.base=e.slice(o,a),t.ext=e.slice(s,a))),t.dir=o>0&&o!==i?e.slice(0,o-1):t.root,t},sep:"\\",delimiter:";",win32:null,posix:null},ut=(()=>{if(nt){const e=/\\/g;return()=>{const t=je().replace(e,"/");return t.slice(t.indexOf("/"))}}return()=>je()})(),ht={resolve(...e){let t="",n=!1;for(let i=e.length-1;i>=-1&&!n;i--){const r=i>=0?e[i]:ut();tt(r,"path"),0!==r.length&&(t=`${r}/${t}`,n=r.charCodeAt(0)===Xe)}return t=ot(t,!n,"/",rt),n?`/${t}`:t.length>0?t:"."},normalize(e){if(tt(e,"path"),0===e.length)return".";const t=e.charCodeAt(0)===Xe,n=e.charCodeAt(e.length-1)===Xe;return 0===(e=ot(e,!t,"/",rt)).length?t?"/":n?"./":".":(n&&(e+="/"),t?`/${e}`:e)},isAbsolute:e=>(tt(e,"path"),e.length>0&&e.charCodeAt(0)===Xe),join(...e){if(0===e.length)return".";let t;for(let n=0;n<e.length;++n){const i=e[n];tt(i,"path"),i.length>0&&(void 0===t?t=i:t+=`/${i}`)}return void 0===t?".":ht.normalize(t)},relative(e,t){if(tt(e,"from"),tt(t,"to"),e===t)return"";if((e=ht.resolve(e))===(t=ht.resolve(t)))return"";const n=e.length,i=n-1,r=t.length-1,s=i<r?i:r;let o=-1,a=0;for(;a<s;a++){const n=e.charCodeAt(1+a);if(n!==t.charCodeAt(1+a))break;n===Xe&&(o=a)}if(a===s)if(r>s){if(t.charCodeAt(1+a)===Xe)return t.slice(1+a+1);if(0===a)return t.slice(1+a)}else i>s&&(e.charCodeAt(1+a)===Xe?o=a:0===a&&(o=0));let l="";for(a=1+o+1;a<=n;++a)a!==n&&e.charCodeAt(a)!==Xe||(l+=0===l.length?"..":"/..");return`${l}${t.slice(1+o)}`},toNamespacedPath:e=>e,dirname(e){if(tt(e,"path"),0===e.length)return".";const t=e.charCodeAt(0)===Xe;let n=-1,i=!0;for(let r=e.length-1;r>=1;--r)if(e.charCodeAt(r)===Xe){if(!i){n=r;break}}else i=!1;return-1===n?t?"/":".":t&&1===n?"//":e.slice(0,n)},basename(e,t){void 0!==t&&tt(t,"ext"),tt(e,"path");let n,i=0,r=-1,s=!0;if(void 0!==t&&t.length>0&&t.length<=e.length){if(t===e)return"";let o=t.length-1,a=-1;for(n=e.length-1;n>=0;--n){const l=e.charCodeAt(n);if(l===Xe){if(!s){i=n+1;break}}else-1===a&&(s=!1,a=n+1),o>=0&&(l===t.charCodeAt(o)?-1==--o&&(r=n):(o=-1,r=a))}return i===r?r=a:-1===r&&(r=e.length),e.slice(i,r)}for(n=e.length-1;n>=0;--n)if(e.charCodeAt(n)===Xe){if(!s){i=n+1;break}}else-1===r&&(s=!1,r=n+1);return-1===r?"":e.slice(i,r)},extname(e){tt(e,"path");let t=-1,n=0,i=-1,r=!0,s=0;for(let o=e.length-1;o>=0;--o){const a=e.charCodeAt(o);if(a!==Xe)-1===i&&(r=!1,i=o+1),a===Ye?-1===t?t=o:1!==s&&(s=1):-1!==t&&(s=-1);else if(!r){n=o+1;break}}return-1===t||-1===i||0===s||1===s&&t===i-1&&t===n+1?"":e.slice(t,i)},format:at.bind(null,"/"),parse(e){tt(e,"path");const t={root:"",dir:"",base:"",ext:"",name:""};if(0===e.length)return t;const n=e.charCodeAt(0)===Xe;let i;n?(t.root="/",i=1):i=0;let r=-1,s=0,o=-1,a=!0,l=e.length-1,u=0;for(;l>=i;--l){const t=e.charCodeAt(l);if(t!==Xe)-1===o&&(a=!1,o=l+1),t===Ye?-1===r?r=l:1!==u&&(u=1):-1!==r&&(u=-1);else if(!a){s=l+1;break}}if(-1!==o){const i=0===s&&n?1:s;-1===r||0===u||1===u&&r===o-1&&r===s+1?t.base=t.name=e.slice(i,o):(t.name=e.slice(i,r),t.base=e.slice(i,o),t.ext=e.slice(r,o))}return s>0?t.dir=e.slice(0,s-1):n&&(t.dir="/"),t},sep:"/",delimiter:":",win32:null,posix:null};ht.win32=lt.win32=lt,ht.posix=lt.posix=ht;nt?lt.normalize:ht.normalize,nt?lt.resolve:ht.resolve,nt?lt.relative:ht.relative,nt?lt.dirname:ht.dirname,nt?lt.basename:ht.basename,nt?lt.extname:ht.extname,nt?lt.sep:ht.sep;const ct=/^\w[\w\d+.-]*$/,dt=/^\//,gt=/^\/\//;const mt="",ft="/",pt=/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;class bt{static isUri(e){return e instanceof bt||!!e&&("string"==typeof e.authority&&"string"==typeof e.fragment&&"string"==typeof e.path&&"string"==typeof e.query&&"string"==typeof e.scheme&&"string"==typeof e.fsPath&&"function"==typeof e.with&&"function"==typeof e.toString)}constructor(e,t,n,i,r,s=!1){"object"==typeof e?(this.scheme=e.scheme||mt,this.authority=e.authority||mt,this.path=e.path||mt,this.query=e.query||mt,this.fragment=e.fragment||mt):(this.scheme=function(e,t){return e||t?e:"file"}(e,s),this.authority=t||mt,this.path=function(e,t){switch(e){case"https":case"http":case"file":t?t[0]!==ft&&(t=ft+t):t=ft}return t}(this.scheme,n||mt),this.query=i||mt,this.fragment=r||mt,function(e,t){if(!e.scheme&&t)throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${e.authority}", path: "${e.path}", query: "${e.query}", fragment: "${e.fragment}"}`);if(e.scheme&&!ct.test(e.scheme))throw new Error("[UriError]: Scheme contains illegal characters.");if(e.path)if(e.authority){if(!dt.test(e.path))throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character')}else if(gt.test(e.path))throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")')}(this,s))}get fsPath(){return wt(this,!1)}with(e){if(!e)return this;let{scheme:t,authority:n,path:i,query:r,fragment:s}=e;return void 0===t?t=this.scheme:null===t&&(t=mt),void 0===n?n=this.authority:null===n&&(n=mt),void 0===i?i=this.path:null===i&&(i=mt),void 0===r?r=this.query:null===r&&(r=mt),void 0===s?s=this.fragment:null===s&&(s=mt),t===this.scheme&&n===this.authority&&i===this.path&&r===this.query&&s===this.fragment?this:new vt(t,n,i,r,s)}static parse(e,t=!1){const n=pt.exec(e);return n?new vt(n[2]||mt,Rt(n[4]||mt),Rt(n[5]||mt),Rt(n[7]||mt),Rt(n[9]||mt),t):new vt(mt,mt,mt,mt,mt)}static file(e){let t=mt;if(re&&(e=e.replace(/\\/g,ft)),e[0]===ft&&e[1]===ft){const n=e.indexOf(ft,2);-1===n?(t=e.substring(2),e=ft):(t=e.substring(2,n),e=e.substring(n)||ft)}return new vt("file",t,e,mt,mt)}static from(e,t){return new vt(e.scheme,e.authority,e.path,e.query,e.fragment,t)}static joinPath(e,...t){if(!e.path)throw new Error("[UriError]: cannot call joinPath on URI without path");let n;return n=re&&"file"===e.scheme?bt.file(lt.join(wt(e,!0),...t)).path:ht.join(e.path,...t),e.with({path:n})}toString(e=!1){return Nt(this,e)}toJSON(){return this}static revive(e){var t,n;if(e){if(e instanceof bt)return e;{const i=new vt(e);return i._formatted=null!==(t=e.external)&&void 0!==t?t:null,i._fsPath=e._sep===_t&&null!==(n=e.fsPath)&&void 0!==n?n:null,i}}return e}}const _t=re?1:void 0;class vt extends bt{constructor(){super(...arguments),this._formatted=null,this._fsPath=null}get fsPath(){return this._fsPath||(this._fsPath=wt(this,!1)),this._fsPath}toString(e=!1){return e?Nt(this,!0):(this._formatted||(this._formatted=Nt(this,!1)),this._formatted)}toJSON(){const e={$mid:1};return this._fsPath&&(e.fsPath=this._fsPath,e._sep=_t),this._formatted&&(e.external=this._formatted),this.path&&(e.path=this.path),this.scheme&&(e.scheme=this.scheme),this.authority&&(e.authority=this.authority),this.query&&(e.query=this.query),this.fragment&&(e.fragment=this.fragment),e}}const yt={58:"%3A",47:"%2F",63:"%3F",35:"%23",91:"%5B",93:"%5D",64:"%40",33:"%21",36:"%24",38:"%26",39:"%27",40:"%28",41:"%29",42:"%2A",43:"%2B",44:"%2C",59:"%3B",61:"%3D",32:"%20"};function Ct(e,t,n){let i,r=-1;for(let s=0;s<e.length;s++){const o=e.charCodeAt(s);if(o>=97&&o<=122||o>=65&&o<=90||o>=48&&o<=57||45===o||46===o||95===o||126===o||t&&47===o||n&&91===o||n&&93===o||n&&58===o)-1!==r&&(i+=encodeURIComponent(e.substring(r,s)),r=-1),void 0!==i&&(i+=e.charAt(s));else{void 0===i&&(i=e.substr(0,s));const t=yt[o];void 0!==t?(-1!==r&&(i+=encodeURIComponent(e.substring(r,s)),r=-1),i+=t):-1===r&&(r=s)}}return-1!==r&&(i+=encodeURIComponent(e.substring(r))),void 0!==i?i:e}function Lt(e){let t;for(let n=0;n<e.length;n++){const i=e.charCodeAt(n);35===i||63===i?(void 0===t&&(t=e.substr(0,n)),t+=yt[i]):void 0!==t&&(t+=e[n])}return void 0!==t?t:e}function wt(e,t){let n;return n=e.authority&&e.path.length>1&&"file"===e.scheme?`//${e.authority}${e.path}`:47===e.path.charCodeAt(0)&&(e.path.charCodeAt(1)>=65&&e.path.charCodeAt(1)<=90||e.path.charCodeAt(1)>=97&&e.path.charCodeAt(1)<=122)&&58===e.path.charCodeAt(2)?t?e.path.substr(1):e.path[1].toLowerCase()+e.path.substr(2):e.path,re&&(n=n.replace(/\//g,"\\")),n}function Nt(e,t){const n=t?Lt:Ct;let i="",{scheme:r,authority:s,path:o,query:a,fragment:l}=e;if(r&&(i+=r,i+=":"),(s||"file"===r)&&(i+=ft,i+=ft),s){let e=s.indexOf("@");if(-1!==e){const t=s.substr(0,e);s=s.substr(e+1),e=t.lastIndexOf(":"),-1===e?i+=n(t,!1,!1):(i+=n(t.substr(0,e),!1,!1),i+=":",i+=n(t.substr(e+1),!1,!0)),i+="@"}s=s.toLowerCase(),e=s.lastIndexOf(":"),-1===e?i+=n(s,!1,!0):(i+=n(s.substr(0,e),!1,!0),i+=s.substr(e))}if(o){if(o.length>=3&&47===o.charCodeAt(0)&&58===o.charCodeAt(2)){const e=o.charCodeAt(1);e>=65&&e<=90&&(o=`/${String.fromCharCode(e+32)}:${o.substr(3)}`)}else if(o.length>=2&&58===o.charCodeAt(1)){const e=o.charCodeAt(0);e>=65&&e<=90&&(o=`${String.fromCharCode(e+32)}:${o.substr(2)}`)}i+=n(o,!0,!1)}return a&&(i+="?",i+=n(a,!1,!1)),l&&(i+="#",i+=t?l:Ct(l,!1,!1)),i}function Et(e){try{return decodeURIComponent(e)}catch(P){return e.length>3?e.substr(0,3)+Et(e.substr(3)):e}}const St=/(%[0-9A-Za-z][0-9A-Za-z])+/g;function Rt(e){return e.match(St)?e.replace(St,(e=>Et(e))):e}class At{constructor(e,t){this.lineNumber=e,this.column=t}with(e=this.lineNumber,t=this.column){return e===this.lineNumber&&t===this.column?this:new At(e,t)}delta(e=0,t=0){return this.with(this.lineNumber+e,this.column+t)}equals(e){return At.equals(this,e)}static equals(e,t){return!e&&!t||!!e&&!!t&&e.lineNumber===t.lineNumber&&e.column===t.column}isBefore(e){return At.isBefore(this,e)}static isBefore(e,t){return e.lineNumber<t.lineNumber||!(t.lineNumber<e.lineNumber)&&e.column<t.column}isBeforeOrEqual(e){return At.isBeforeOrEqual(this,e)}static isBeforeOrEqual(e,t){return e.lineNumber<t.lineNumber||!(t.lineNumber<e.lineNumber)&&e.column<=t.column}static compare(e,t){const n=0|e.lineNumber,i=0|t.lineNumber;if(n===i){return(0|e.column)-(0|t.column)}return n-i}clone(){return new At(this.lineNumber,this.column)}toString(){return"("+this.lineNumber+","+this.column+")"}static lift(e){return new At(e.lineNumber,e.column)}static isIPosition(e){return e&&"number"==typeof e.lineNumber&&"number"==typeof e.column}}class xt{constructor(e,t,n,i){e>n||e===n&&t>i?(this.startLineNumber=n,this.startColumn=i,this.endLineNumber=e,this.endColumn=t):(this.startLineNumber=e,this.startColumn=t,this.endLineNumber=n,this.endColumn=i)}isEmpty(){return xt.isEmpty(this)}static isEmpty(e){return e.startLineNumber===e.endLineNumber&&e.startColumn===e.endColumn}containsPosition(e){return xt.containsPosition(this,e)}static containsPosition(e,t){return!(t.lineNumber<e.startLineNumber||t.lineNumber>e.endLineNumber)&&(!(t.lineNumber===e.startLineNumber&&t.column<e.startColumn)&&!(t.lineNumber===e.endLineNumber&&t.column>e.endColumn))}static strictContainsPosition(e,t){return!(t.lineNumber<e.startLineNumber||t.lineNumber>e.endLineNumber)&&(!(t.lineNumber===e.startLineNumber&&t.column<=e.startColumn)&&!(t.lineNumber===e.endLineNumber&&t.column>=e.endColumn))}containsRange(e){return xt.containsRange(this,e)}static containsRange(e,t){return!(t.startLineNumber<e.startLineNumber||t.endLineNumber<e.startLineNumber)&&(!(t.startLineNumber>e.endLineNumber||t.endLineNumber>e.endLineNumber)&&(!(t.startLineNumber===e.startLineNumber&&t.startColumn<e.startColumn)&&!(t.endLineNumber===e.endLineNumber&&t.endColumn>e.endColumn)))}strictContainsRange(e){return xt.strictContainsRange(this,e)}static strictContainsRange(e,t){return!(t.startLineNumber<e.startLineNumber||t.endLineNumber<e.startLineNumber)&&(!(t.startLineNumber>e.endLineNumber||t.endLineNumber>e.endLineNumber)&&(!(t.startLineNumber===e.startLineNumber&&t.startColumn<=e.startColumn)&&!(t.endLineNumber===e.endLineNumber&&t.endColumn>=e.endColumn)))}plusRange(e){return xt.plusRange(this,e)}static plusRange(e,t){let n,i,r,s;return t.startLineNumber<e.startLineNumber?(n=t.startLineNumber,i=t.startColumn):t.startLineNumber===e.startLineNumber?(n=t.startLineNumber,i=Math.min(t.startColumn,e.startColumn)):(n=e.startLineNumber,i=e.startColumn),t.endLineNumber>e.endLineNumber?(r=t.endLineNumber,s=t.endColumn):t.endLineNumber===e.endLineNumber?(r=t.endLineNumber,s=Math.max(t.endColumn,e.endColumn)):(r=e.endLineNumber,s=e.endColumn),new xt(n,i,r,s)}intersectRanges(e){return xt.intersectRanges(this,e)}static intersectRanges(e,t){let n=e.startLineNumber,i=e.startColumn,r=e.endLineNumber,s=e.endColumn;const o=t.startLineNumber,a=t.startColumn,l=t.endLineNumber,u=t.endColumn;return n<o?(n=o,i=a):n===o&&(i=Math.max(i,a)),r>l?(r=l,s=u):r===l&&(s=Math.min(s,u)),n>r||n===r&&i>s?null:new xt(n,i,r,s)}equalsRange(e){return xt.equalsRange(this,e)}static equalsRange(e,t){return!e&&!t||!!e&&!!t&&e.startLineNumber===t.startLineNumber&&e.startColumn===t.startColumn&&e.endLineNumber===t.endLineNumber&&e.endColumn===t.endColumn}getEndPosition(){return xt.getEndPosition(this)}static getEndPosition(e){return new At(e.endLineNumber,e.endColumn)}getStartPosition(){return xt.getStartPosition(this)}static getStartPosition(e){return new At(e.startLineNumber,e.startColumn)}toString(){return"["+this.startLineNumber+","+this.startColumn+" -> "+this.endLineNumber+","+this.endColumn+"]"}setEndPosition(e,t){return new xt(this.startLineNumber,this.startColumn,e,t)}setStartPosition(e,t){return new xt(e,t,this.endLineNumber,this.endColumn)}collapseToStart(){return xt.collapseToStart(this)}static collapseToStart(e){return new xt(e.startLineNumber,e.startColumn,e.startLineNumber,e.startColumn)}collapseToEnd(){return xt.collapseToEnd(this)}static collapseToEnd(e){return new xt(e.endLineNumber,e.endColumn,e.endLineNumber,e.endColumn)}delta(e){return new xt(this.startLineNumber+e,this.startColumn,this.endLineNumber+e,this.endColumn)}static fromPositions(e,t=e){return new xt(e.lineNumber,e.column,t.lineNumber,t.column)}static lift(e){return e?new xt(e.startLineNumber,e.startColumn,e.endLineNumber,e.endColumn):null}static isIRange(e){return e&&"number"==typeof e.startLineNumber&&"number"==typeof e.startColumn&&"number"==typeof e.endLineNumber&&"number"==typeof e.endColumn}static areIntersectingOrTouching(e,t){return!(e.endLineNumber<t.startLineNumber||e.endLineNumber===t.startLineNumber&&e.endColumn<t.startColumn)&&!(t.endLineNumber<e.startLineNumber||t.endLineNumber===e.startLineNumber&&t.endColumn<e.startColumn)}static areIntersecting(e,t){return!(e.endLineNumber<t.startLineNumber||e.endLineNumber===t.startLineNumber&&e.endColumn<=t.startColumn)&&!(t.endLineNumber<e.startLineNumber||t.endLineNumber===e.startLineNumber&&t.endColumn<=e.startColumn)}static compareRangesUsingStarts(e,t){if(e&&t){const n=0|e.startLineNumber,i=0|t.startLineNumber;if(n===i){const n=0|e.startColumn,i=0|t.startColumn;if(n===i){const n=0|e.endLineNumber,i=0|t.endLineNumber;if(n===i){return(0|e.endColumn)-(0|t.endColumn)}return n-i}return n-i}return n-i}return(e?1:0)-(t?1:0)}static compareRangesUsingEnds(e,t){return e.endLineNumber===t.endLineNumber?e.endColumn===t.endColumn?e.startLineNumber===t.startLineNumber?e.startColumn-t.startColumn:e.startLineNumber-t.startLineNumber:e.endColumn-t.endColumn:e.endLineNumber-t.endLineNumber}static spansMultipleLines(e){return e.endLineNumber>e.startLineNumber}toJSON(){return this}}var Mt;function kt(e,t){return(n,i)=>t(e(n),e(i))}!function(e){e.isLessThan=function(e){return e<0},e.isLessThanOrEqual=function(e){return e<=0},e.isGreaterThan=function(e){return e>0},e.isNeitherLessOrGreaterThan=function(e){return 0===e},e.greaterThan=1,e.lessThan=-1,e.neitherLessOrGreaterThan=0}(Mt||(Mt={}));const Tt=(e,t)=>e-t;class Ot{constructor(e){this.iterate=e}toArray(){const e=[];return this.iterate((t=>(e.push(t),!0))),e}filter(e){return new Ot((t=>this.iterate((n=>!e(n)||t(n)))))}map(e){return new Ot((t=>this.iterate((n=>t(e(n))))))}findLast(e){let t;return this.iterate((n=>(e(n)&&(t=n),!0))),t}findLastMaxBy(e){let t,n=!0;return this.iterate((i=>((n||Mt.isGreaterThan(e(i,t)))&&(n=!1,t=i),!0))),t}}function It(e){return e<0?0:e>255?255:0|e}function Pt(e){return e<0?0:e>4294967295?4294967295:0|e}Ot.empty=new Ot((e=>{}));class Dt{constructor(e){this.values=e,this.prefixSum=new Uint32Array(e.length),this.prefixSumValidIndex=new Int32Array(1),this.prefixSumValidIndex[0]=-1}insertValues(e,t){e=Pt(e);const n=this.values,i=this.prefixSum,r=t.length;return 0!==r&&(this.values=new Uint32Array(n.length+r),this.values.set(n.subarray(0,e),0),this.values.set(n.subarray(e),e+r),this.values.set(t,e),e-1<this.prefixSumValidIndex[0]&&(this.prefixSumValidIndex[0]=e-1),this.prefixSum=new Uint32Array(this.values.length),this.prefixSumValidIndex[0]>=0&&this.prefixSum.set(i.subarray(0,this.prefixSumValidIndex[0]+1)),!0)}setValue(e,t){return e=Pt(e),t=Pt(t),this.values[e]!==t&&(this.values[e]=t,e-1<this.prefixSumValidIndex[0]&&(this.prefixSumValidIndex[0]=e-1),!0)}removeValues(e,t){e=Pt(e),t=Pt(t);const n=this.values,i=this.prefixSum;if(e>=n.length)return!1;const r=n.length-e;return t>=r&&(t=r),0!==t&&(this.values=new Uint32Array(n.length-t),this.values.set(n.subarray(0,e),0),this.values.set(n.subarray(e+t),e),this.prefixSum=new Uint32Array(this.values.length),e-1<this.prefixSumValidIndex[0]&&(this.prefixSumValidIndex[0]=e-1),this.prefixSumValidIndex[0]>=0&&this.prefixSum.set(i.subarray(0,this.prefixSumValidIndex[0]+1)),!0)}getTotalSum(){return 0===this.values.length?0:this._getPrefixSum(this.values.length-1)}getPrefixSum(e){return e<0?0:(e=Pt(e),this._getPrefixSum(e))}_getPrefixSum(e){if(e<=this.prefixSumValidIndex[0])return this.prefixSum[e];let t=this.prefixSumValidIndex[0]+1;0===t&&(this.prefixSum[0]=this.values[0],t++),e>=this.values.length&&(e=this.values.length-1);for(let n=t;n<=e;n++)this.prefixSum[n]=this.prefixSum[n-1]+this.values[n];return this.prefixSumValidIndex[0]=Math.max(this.prefixSumValidIndex[0],e),this.prefixSum[e]}getIndexOf(e){e=Math.floor(e),this.getTotalSum();let t=0,n=this.values.length-1,i=0,r=0,s=0;for(;t<=n;)if(i=t+(n-t)/2|0,r=this.prefixSum[i],s=r-this.values[i],e<s)n=i-1;else{if(!(e>=r))break;t=i+1}return new Kt(i,e-s)}}class Kt{constructor(e,t){this.index=e,this.remainder=t,this._prefixSumIndexOfResultBrand=void 0,this.index=e,this.remainder=t}}class Ft{constructor(e,t,n,i){this._uri=e,this._lines=t,this._eol=n,this._versionId=i,this._lineStarts=null,this._cachedTextValue=null}dispose(){this._lines.length=0}get version(){return this._versionId}getText(){return null===this._cachedTextValue&&(this._cachedTextValue=this._lines.join(this._eol)),this._cachedTextValue}onEvents(e){e.eol&&e.eol!==this._eol&&(this._eol=e.eol,this._lineStarts=null);const t=e.changes;for(const n of t)this._acceptDeleteRange(n.range),this._acceptInsertText(new At(n.range.startLineNumber,n.range.startColumn),n.text);this._versionId=e.versionId,this._cachedTextValue=null}_ensureLineStarts(){if(!this._lineStarts){const e=this._eol.length,t=this._lines.length,n=new Uint32Array(t);for(let i=0;i<t;i++)n[i]=this._lines[i].length+e;this._lineStarts=new Dt(n)}}_setLineText(e,t){this._lines[e]=t,this._lineStarts&&this._lineStarts.setValue(e,this._lines[e].length+this._eol.length)}_acceptDeleteRange(e){if(e.startLineNumber!==e.endLineNumber)this._setLineText(e.startLineNumber-1,this._lines[e.startLineNumber-1].substring(0,e.startColumn-1)+this._lines[e.endLineNumber-1].substring(e.endColumn-1)),this._lines.splice(e.startLineNumber,e.endLineNumber-e.startLineNumber),this._lineStarts&&this._lineStarts.removeValues(e.startLineNumber,e.endLineNumber-e.startLineNumber);else{if(e.startColumn===e.endColumn)return;this._setLineText(e.startLineNumber-1,this._lines[e.startLineNumber-1].substring(0,e.startColumn-1)+this._lines[e.startLineNumber-1].substring(e.endColumn-1))}}_acceptInsertText(e,t){if(0===t.length)return;const n=t.split(/\r\n|\r|\n/);if(1===n.length)return void this._setLineText(e.lineNumber-1,this._lines[e.lineNumber-1].substring(0,e.column-1)+n[0]+this._lines[e.lineNumber-1].substring(e.column-1));n[n.length-1]+=this._lines[e.lineNumber-1].substring(e.column-1),this._setLineText(e.lineNumber-1,this._lines[e.lineNumber-1].substring(0,e.column-1)+n[0]);const i=new Uint32Array(n.length-1);for(let r=1;r<n.length;r++)this._lines.splice(e.lineNumber+r-1,0,n[r]),i[r-1]=n[r].length+this._eol.length;this._lineStarts&&this._lineStarts.insertValues(e.lineNumber,i)}}const qt=function(e=""){let t="(-?\\d*\\.\\d\\w*)|([^";for(const n of"`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?")e.indexOf(n)>=0||(t+="\\"+n);return t+="\\s]+)",new RegExp(t,"g")}();const Vt=new C;function Bt(e,t,n,i,r){if(r||(r=h.first(Vt)),n.length>r.maxLen){let s=e-r.maxLen/2;return s<0?s=0:i+=s,Bt(e,t,n=n.substring(s,e+r.maxLen/2),i,r)}const s=Date.now(),o=e-1-i;let a=-1,l=null;for(let u=1;!(Date.now()-s>=r.timeBudget);u++){const e=o-r.windowSize*u;t.lastIndex=Math.max(0,e);const i=Ut(t,n,o,a);if(!i&&l)break;if(l=i,e<=0)break;a=e}if(l){const e={word:l[0],startColumn:i+1+l.index,endColumn:i+1+l.index+l[0].length};return t.lastIndex=0,e}return null}function Ut(e,t,n,i){let r;for(;r=e.exec(t);){const t=r.index||0;if(t<=n&&e.lastIndex>=n)return r;if(i>0&&t>i)return null}return null}Vt.unshift({maxLen:1e3,windowSize:15,timeBudget:150});class Wt{constructor(e){const t=It(e);this._defaultValue=t,this._asciiMap=Wt._createAsciiMap(t),this._map=new Map}static _createAsciiMap(e){const t=new Uint8Array(256);return t.fill(e),t}set(e,t){const n=It(t);e>=0&&e<256?this._asciiMap[e]=n:this._map.set(e,n)}get(e){return e>=0&&e<256?this._asciiMap[e]:this._map.get(e)||this._defaultValue}clear(){this._asciiMap.fill(this._defaultValue),this._map.clear()}}class Ht{constructor(e,t,n){const i=new Uint8Array(e*t);for(let r=0,s=e*t;r<s;r++)i[r]=n;this._data=i,this.rows=e,this.cols=t}get(e,t){return this._data[e*this.cols+t]}set(e,t,n){this._data[e*this.cols+t]=n}}class zt{constructor(e){let t=0,n=0;for(let r=0,s=e.length;r<s;r++){const[i,s,o]=e[r];s>t&&(t=s),i>n&&(n=i),o>n&&(n=o)}t++,n++;const i=new Ht(n,t,0);for(let r=0,s=e.length;r<s;r++){const[t,n,s]=e[r];i.set(t,n,s)}this._states=i,this._maxCharCode=t}nextState(e,t){return t<0||t>=this._maxCharCode?0:this._states.get(e,t)}}let $t=null;let jt=null;class Gt{static _createLink(e,t,n,i,r){let s=r-1;do{const n=t.charCodeAt(s);if(2!==e.get(n))break;s--}while(s>i);if(i>0){const e=t.charCodeAt(i-1),n=t.charCodeAt(s);(40===e&&41===n||91===e&&93===n||123===e&&125===n)&&s--}return{range:{startLineNumber:n,startColumn:i+1,endLineNumber:n,endColumn:s+2},url:t.substring(i,s+1)}}static computeLinks(e,t=function(){return null===$t&&($t=new zt([[1,104,2],[1,72,2],[1,102,6],[1,70,6],[2,116,3],[2,84,3],[3,116,4],[3,84,4],[4,112,5],[4,80,5],[5,115,9],[5,83,9],[5,58,10],[6,105,7],[6,73,7],[7,108,8],[7,76,8],[8,101,9],[8,69,9],[9,58,10],[10,47,11],[11,47,12]])),$t}()){const n=function(){if(null===jt){jt=new Wt(0);const e=" \t<>'\"\u3001\u3002\uff61\uff64\uff0c\uff0e\uff1a\uff1b\u2018\u3008\u300c\u300e\u3014\uff08\uff3b\uff5b\uff62\uff63\uff5d\uff3d\uff09\u3015\u300f\u300d\u3009\u2019\uff40\uff5e\u2026";for(let n=0;n<e.length;n++)jt.set(e.charCodeAt(n),1);const t=".,;:";for(let n=0;n<t.length;n++)jt.set(t.charCodeAt(n),2)}return jt}(),i=[];for(let r=1,s=e.getLineCount();r<=s;r++){const s=e.getLineContent(r),o=s.length;let a=0,l=0,u=0,h=1,c=!1,d=!1,g=!1,m=!1;for(;a<o;){let e=!1;const o=s.charCodeAt(a);if(13===h){let t;switch(o){case 40:c=!0,t=0;break;case 41:t=c?0:1;break;case 91:g=!0,d=!0,t=0;break;case 93:g=!1,t=d?0:1;break;case 123:m=!0,t=0;break;case 125:t=m?0:1;break;case 39:case 34:case 96:t=u===o?1:39===u||34===u||96===u?0:1;break;case 42:t=42===u?1:0;break;case 124:t=124===u?1:0;break;case 32:t=g?0:1;break;default:t=n.get(o)}1===t&&(i.push(Gt._createLink(n,s,r,l,a)),e=!0)}else if(12===h){let t;91===o?(d=!0,t=0):t=n.get(o),1===t?e=!0:h=13}else h=t.nextState(h,o),0===h&&(e=!0);e&&(h=1,c=!1,d=!1,m=!1,l=a+1,u=o),a++}13===h&&i.push(Gt._createLink(n,s,r,l,o))}return i}}class Qt{constructor(){this._defaultValueSet=[["true","false"],["True","False"],["Private","Public","Friend","ReadOnly","Partial","Protected","WriteOnly"],["public","protected","private"]]}navigateValueSet(e,t,n,i,r){if(e&&t){const n=this.doNavigateValueSet(t,r);if(n)return{range:e,value:n}}if(n&&i){const e=this.doNavigateValueSet(i,r);if(e)return{range:n,value:e}}return null}doNavigateValueSet(e,t){const n=this.numberReplace(e,t);return null!==n?n:this.textReplace(e,t)}numberReplace(e,t){const n=Math.pow(10,e.length-(e.lastIndexOf(".")+1));let i=Number(e);const r=parseFloat(e);return isNaN(i)||isNaN(r)||i!==r?null:0!==i||t?(i=Math.floor(i*n),i+=t?n:-n,String(i/n)):null}textReplace(e,t){return this.valueSetsReplace(this._defaultValueSet,e,t)}valueSetsReplace(e,t,n){let i=null;for(let r=0,s=e.length;null===i&&r<s;r++)i=this.valueSetReplace(e[r],t,n);return i}valueSetReplace(e,t,n){let i=e.indexOf(t);return i>=0?(i+=n?1:-1,i<0?i=e.length-1:i%=e.length,e[i]):null}}Qt.INSTANCE=new Qt;const Yt=Object.freeze((function(e,t){const n=setTimeout(e.bind(t),0);return{dispose(){clearTimeout(n)}}}));var Xt;!function(e){e.isCancellationToken=function(t){return t===e.None||t===e.Cancelled||(t instanceof Jt||!(!t||"object"!=typeof t)&&("boolean"==typeof t.isCancellationRequested&&"function"==typeof t.onCancellationRequested))},e.None=Object.freeze({isCancellationRequested:!1,onCancellationRequested:N.None}),e.Cancelled=Object.freeze({isCancellationRequested:!0,onCancellationRequested:Yt})}(Xt||(Xt={}));class Jt{constructor(){this._isCancelled=!1,this._emitter=null}cancel(){this._isCancelled||(this._isCancelled=!0,this._emitter&&(this._emitter.fire(void 0),this.dispose()))}get isCancellationRequested(){return this._isCancelled}get onCancellationRequested(){return this._isCancelled?Yt:(this._emitter||(this._emitter=new x),this._emitter.event)}dispose(){this._emitter&&(this._emitter.dispose(),this._emitter=null)}}class Zt{constructor(e){this._token=void 0,this._parentListener=void 0,this._parentListener=e&&e.onCancellationRequested(this.cancel,this)}get token(){return this._token||(this._token=new Jt),this._token}cancel(){this._token?this._token instanceof Jt&&this._token.cancel():this._token=Xt.Cancelled}dispose(e=!1){var t;e&&this.cancel(),null===(t=this._parentListener)||void 0===t||t.dispose(),this._token?this._token instanceof Jt&&this._token.dispose():this._token=Xt.None}}class en{constructor(){this._keyCodeToStr=[],this._strToKeyCode=Object.create(null)}define(e,t){this._keyCodeToStr[e]=t,this._strToKeyCode[t.toLowerCase()]=e}keyCodeToStr(e){return this._keyCodeToStr[e]}strToKeyCode(e){return this._strToKeyCode[e.toLowerCase()]||0}}const tn=new en,nn=new en,rn=new en,sn=new Array(230),on={},an=[],ln=Object.create(null),un=Object.create(null),hn=[],cn=[];for(let n=0;n<=193;n++)hn[n]=-1;for(let n=0;n<=132;n++)cn[n]=-1;var dn;!function(){const e="",t=[[1,0,"None",0,"unknown",0,"VK_UNKNOWN",e,e],[1,1,"Hyper",0,e,0,e,e,e],[1,2,"Super",0,e,0,e,e,e],[1,3,"Fn",0,e,0,e,e,e],[1,4,"FnLock",0,e,0,e,e,e],[1,5,"Suspend",0,e,0,e,e,e],[1,6,"Resume",0,e,0,e,e,e],[1,7,"Turbo",0,e,0,e,e,e],[1,8,"Sleep",0,e,0,"VK_SLEEP",e,e],[1,9,"WakeUp",0,e,0,e,e,e],[0,10,"KeyA",31,"A",65,"VK_A",e,e],[0,11,"KeyB",32,"B",66,"VK_B",e,e],[0,12,"KeyC",33,"C",67,"VK_C",e,e],[0,13,"KeyD",34,"D",68,"VK_D",e,e],[0,14,"KeyE",35,"E",69,"VK_E",e,e],[0,15,"KeyF",36,"F",70,"VK_F",e,e],[0,16,"KeyG",37,"G",71,"VK_G",e,e],[0,17,"KeyH",38,"H",72,"VK_H",e,e],[0,18,"KeyI",39,"I",73,"VK_I",e,e],[0,19,"KeyJ",40,"J",74,"VK_J",e,e],[0,20,"KeyK",41,"K",75,"VK_K",e,e],[0,21,"KeyL",42,"L",76,"VK_L",e,e],[0,22,"KeyM",43,"M",77,"VK_M",e,e],[0,23,"KeyN",44,"N",78,"VK_N",e,e],[0,24,"KeyO",45,"O",79,"VK_O",e,e],[0,25,"KeyP",46,"P",80,"VK_P",e,e],[0,26,"KeyQ",47,"Q",81,"VK_Q",e,e],[0,27,"KeyR",48,"R",82,"VK_R",e,e],[0,28,"KeyS",49,"S",83,"VK_S",e,e],[0,29,"KeyT",50,"T",84,"VK_T",e,e],[0,30,"KeyU",51,"U",85,"VK_U",e,e],[0,31,"KeyV",52,"V",86,"VK_V",e,e],[0,32,"KeyW",53,"W",87,"VK_W",e,e],[0,33,"KeyX",54,"X",88,"VK_X",e,e],[0,34,"KeyY",55,"Y",89,"VK_Y",e,e],[0,35,"KeyZ",56,"Z",90,"VK_Z",e,e],[0,36,"Digit1",22,"1",49,"VK_1",e,e],[0,37,"Digit2",23,"2",50,"VK_2",e,e],[0,38,"Digit3",24,"3",51,"VK_3",e,e],[0,39,"Digit4",25,"4",52,"VK_4",e,e],[0,40,"Digit5",26,"5",53,"VK_5",e,e],[0,41,"Digit6",27,"6",54,"VK_6",e,e],[0,42,"Digit7",28,"7",55,"VK_7",e,e],[0,43,"Digit8",29,"8",56,"VK_8",e,e],[0,44,"Digit9",30,"9",57,"VK_9",e,e],[0,45,"Digit0",21,"0",48,"VK_0",e,e],[1,46,"Enter",3,"Enter",13,"VK_RETURN",e,e],[1,47,"Escape",9,"Escape",27,"VK_ESCAPE",e,e],[1,48,"Backspace",1,"Backspace",8,"VK_BACK",e,e],[1,49,"Tab",2,"Tab",9,"VK_TAB",e,e],[1,50,"Space",10,"Space",32,"VK_SPACE",e,e],[0,51,"Minus",88,"-",189,"VK_OEM_MINUS","-","OEM_MINUS"],[0,52,"Equal",86,"=",187,"VK_OEM_PLUS","=","OEM_PLUS"],[0,53,"BracketLeft",92,"[",219,"VK_OEM_4","[","OEM_4"],[0,54,"BracketRight",94,"]",221,"VK_OEM_6","]","OEM_6"],[0,55,"Backslash",93,"\\",220,"VK_OEM_5","\\","OEM_5"],[0,56,"IntlHash",0,e,0,e,e,e],[0,57,"Semicolon",85,";",186,"VK_OEM_1",";","OEM_1"],[0,58,"Quote",95,"'",222,"VK_OEM_7","'","OEM_7"],[0,59,"Backquote",91,"`",192,"VK_OEM_3","`","OEM_3"],[0,60,"Comma",87,",",188,"VK_OEM_COMMA",",","OEM_COMMA"],[0,61,"Period",89,".",190,"VK_OEM_PERIOD",".","OEM_PERIOD"],[0,62,"Slash",90,"/",191,"VK_OEM_2","/","OEM_2"],[1,63,"CapsLock",8,"CapsLock",20,"VK_CAPITAL",e,e],[1,64,"F1",59,"F1",112,"VK_F1",e,e],[1,65,"F2",60,"F2",113,"VK_F2",e,e],[1,66,"F3",61,"F3",114,"VK_F3",e,e],[1,67,"F4",62,"F4",115,"VK_F4",e,e],[1,68,"F5",63,"F5",116,"VK_F5",e,e],[1,69,"F6",64,"F6",117,"VK_F6",e,e],[1,70,"F7",65,"F7",118,"VK_F7",e,e],[1,71,"F8",66,"F8",119,"VK_F8",e,e],[1,72,"F9",67,"F9",120,"VK_F9",e,e],[1,73,"F10",68,"F10",121,"VK_F10",e,e],[1,74,"F11",69,"F11",122,"VK_F11",e,e],[1,75,"F12",70,"F12",123,"VK_F12",e,e],[1,76,"PrintScreen",0,e,0,e,e,e],[1,77,"ScrollLock",84,"ScrollLock",145,"VK_SCROLL",e,e],[1,78,"Pause",7,"PauseBreak",19,"VK_PAUSE",e,e],[1,79,"Insert",19,"Insert",45,"VK_INSERT",e,e],[1,80,"Home",14,"Home",36,"VK_HOME",e,e],[1,81,"PageUp",11,"PageUp",33,"VK_PRIOR",e,e],[1,82,"Delete",20,"Delete",46,"VK_DELETE",e,e],[1,83,"End",13,"End",35,"VK_END",e,e],[1,84,"PageDown",12,"PageDown",34,"VK_NEXT",e,e],[1,85,"ArrowRight",17,"RightArrow",39,"VK_RIGHT","Right",e],[1,86,"ArrowLeft",15,"LeftArrow",37,"VK_LEFT","Left",e],[1,87,"ArrowDown",18,"DownArrow",40,"VK_DOWN","Down",e],[1,88,"ArrowUp",16,"UpArrow",38,"VK_UP","Up",e],[1,89,"NumLock",83,"NumLock",144,"VK_NUMLOCK",e,e],[1,90,"NumpadDivide",113,"NumPad_Divide",111,"VK_DIVIDE",e,e],[1,91,"NumpadMultiply",108,"NumPad_Multiply",106,"VK_MULTIPLY",e,e],[1,92,"NumpadSubtract",111,"NumPad_Subtract",109,"VK_SUBTRACT",e,e],[1,93,"NumpadAdd",109,"NumPad_Add",107,"VK_ADD",e,e],[1,94,"NumpadEnter",3,e,0,e,e,e],[1,95,"Numpad1",99,"NumPad1",97,"VK_NUMPAD1",e,e],[1,96,"Numpad2",100,"NumPad2",98,"VK_NUMPAD2",e,e],[1,97,"Numpad3",101,"NumPad3",99,"VK_NUMPAD3",e,e],[1,98,"Numpad4",102,"NumPad4",100,"VK_NUMPAD4",e,e],[1,99,"Numpad5",103,"NumPad5",101,"VK_NUMPAD5",e,e],[1,100,"Numpad6",104,"NumPad6",102,"VK_NUMPAD6",e,e],[1,101,"Numpad7",105,"NumPad7",103,"VK_NUMPAD7",e,e],[1,102,"Numpad8",106,"NumPad8",104,"VK_NUMPAD8",e,e],[1,103,"Numpad9",107,"NumPad9",105,"VK_NUMPAD9",e,e],[1,104,"Numpad0",98,"NumPad0",96,"VK_NUMPAD0",e,e],[1,105,"NumpadDecimal",112,"NumPad_Decimal",110,"VK_DECIMAL",e,e],[0,106,"IntlBackslash",97,"OEM_102",226,"VK_OEM_102",e,e],[1,107,"ContextMenu",58,"ContextMenu",93,e,e,e],[1,108,"Power",0,e,0,e,e,e],[1,109,"NumpadEqual",0,e,0,e,e,e],[1,110,"F13",71,"F13",124,"VK_F13",e,e],[1,111,"F14",72,"F14",125,"VK_F14",e,e],[1,112,"F15",73,"F15",126,"VK_F15",e,e],[1,113,"F16",74,"F16",127,"VK_F16",e,e],[1,114,"F17",75,"F17",128,"VK_F17",e,e],[1,115,"F18",76,"F18",129,"VK_F18",e,e],[1,116,"F19",77,"F19",130,"VK_F19",e,e],[1,117,"F20",78,"F20",131,"VK_F20",e,e],[1,118,"F21",79,"F21",132,"VK_F21",e,e],[1,119,"F22",80,"F22",133,"VK_F22",e,e],[1,120,"F23",81,"F23",134,"VK_F23",e,e],[1,121,"F24",82,"F24",135,"VK_F24",e,e],[1,122,"Open",0,e,0,e,e,e],[1,123,"Help",0,e,0,e,e,e],[1,124,"Select",0,e,0,e,e,e],[1,125,"Again",0,e,0,e,e,e],[1,126,"Undo",0,e,0,e,e,e],[1,127,"Cut",0,e,0,e,e,e],[1,128,"Copy",0,e,0,e,e,e],[1,129,"Paste",0,e,0,e,e,e],[1,130,"Find",0,e,0,e,e,e],[1,131,"AudioVolumeMute",117,"AudioVolumeMute",173,"VK_VOLUME_MUTE",e,e],[1,132,"AudioVolumeUp",118,"AudioVolumeUp",175,"VK_VOLUME_UP",e,e],[1,133,"AudioVolumeDown",119,"AudioVolumeDown",174,"VK_VOLUME_DOWN",e,e],[1,134,"NumpadComma",110,"NumPad_Separator",108,"VK_SEPARATOR",e,e],[0,135,"IntlRo",115,"ABNT_C1",193,"VK_ABNT_C1",e,e],[1,136,"KanaMode",0,e,0,e,e,e],[0,137,"IntlYen",0,e,0,e,e,e],[1,138,"Convert",0,e,0,e,e,e],[1,139,"NonConvert",0,e,0,e,e,e],[1,140,"Lang1",0,e,0,e,e,e],[1,141,"Lang2",0,e,0,e,e,e],[1,142,"Lang3",0,e,0,e,e,e],[1,143,"Lang4",0,e,0,e,e,e],[1,144,"Lang5",0,e,0,e,e,e],[1,145,"Abort",0,e,0,e,e,e],[1,146,"Props",0,e,0,e,e,e],[1,147,"NumpadParenLeft",0,e,0,e,e,e],[1,148,"NumpadParenRight",0,e,0,e,e,e],[1,149,"NumpadBackspace",0,e,0,e,e,e],[1,150,"NumpadMemoryStore",0,e,0,e,e,e],[1,151,"NumpadMemoryRecall",0,e,0,e,e,e],[1,152,"NumpadMemoryClear",0,e,0,e,e,e],[1,153,"NumpadMemoryAdd",0,e,0,e,e,e],[1,154,"NumpadMemorySubtract",0,e,0,e,e,e],[1,155,"NumpadClear",131,"Clear",12,"VK_CLEAR",e,e],[1,156,"NumpadClearEntry",0,e,0,e,e,e],[1,0,e,5,"Ctrl",17,"VK_CONTROL",e,e],[1,0,e,4,"Shift",16,"VK_SHIFT",e,e],[1,0,e,6,"Alt",18,"VK_MENU",e,e],[1,0,e,57,"Meta",91,"VK_COMMAND",e,e],[1,157,"ControlLeft",5,e,0,"VK_LCONTROL",e,e],[1,158,"ShiftLeft",4,e,0,"VK_LSHIFT",e,e],[1,159,"AltLeft",6,e,0,"VK_LMENU",e,e],[1,160,"MetaLeft",57,e,0,"VK_LWIN",e,e],[1,161,"ControlRight",5,e,0,"VK_RCONTROL",e,e],[1,162,"ShiftRight",4,e,0,"VK_RSHIFT",e,e],[1,163,"AltRight",6,e,0,"VK_RMENU",e,e],[1,164,"MetaRight",57,e,0,"VK_RWIN",e,e],[1,165,"BrightnessUp",0,e,0,e,e,e],[1,166,"BrightnessDown",0,e,0,e,e,e],[1,167,"MediaPlay",0,e,0,e,e,e],[1,168,"MediaRecord",0,e,0,e,e,e],[1,169,"MediaFastForward",0,e,0,e,e,e],[1,170,"MediaRewind",0,e,0,e,e,e],[1,171,"MediaTrackNext",124,"MediaTrackNext",176,"VK_MEDIA_NEXT_TRACK",e,e],[1,172,"MediaTrackPrevious",125,"MediaTrackPrevious",177,"VK_MEDIA_PREV_TRACK",e,e],[1,173,"MediaStop",126,"MediaStop",178,"VK_MEDIA_STOP",e,e],[1,174,"Eject",0,e,0,e,e,e],[1,175,"MediaPlayPause",127,"MediaPlayPause",179,"VK_MEDIA_PLAY_PAUSE",e,e],[1,176,"MediaSelect",128,"LaunchMediaPlayer",181,"VK_MEDIA_LAUNCH_MEDIA_SELECT",e,e],[1,177,"LaunchMail",129,"LaunchMail",180,"VK_MEDIA_LAUNCH_MAIL",e,e],[1,178,"LaunchApp2",130,"LaunchApp2",183,"VK_MEDIA_LAUNCH_APP2",e,e],[1,179,"LaunchApp1",0,e,0,"VK_MEDIA_LAUNCH_APP1",e,e],[1,180,"SelectTask",0,e,0,e,e,e],[1,181,"LaunchScreenSaver",0,e,0,e,e,e],[1,182,"BrowserSearch",120,"BrowserSearch",170,"VK_BROWSER_SEARCH",e,e],[1,183,"BrowserHome",121,"BrowserHome",172,"VK_BROWSER_HOME",e,e],[1,184,"BrowserBack",122,"BrowserBack",166,"VK_BROWSER_BACK",e,e],[1,185,"BrowserForward",123,"BrowserForward",167,"VK_BROWSER_FORWARD",e,e],[1,186,"BrowserStop",0,e,0,"VK_BROWSER_STOP",e,e],[1,187,"BrowserRefresh",0,e,0,"VK_BROWSER_REFRESH",e,e],[1,188,"BrowserFavorites",0,e,0,"VK_BROWSER_FAVORITES",e,e],[1,189,"ZoomToggle",0,e,0,e,e,e],[1,190,"MailReply",0,e,0,e,e,e],[1,191,"MailForward",0,e,0,e,e,e],[1,192,"MailSend",0,e,0,e,e,e],[1,0,e,114,"KeyInComposition",229,e,e,e],[1,0,e,116,"ABNT_C2",194,"VK_ABNT_C2",e,e],[1,0,e,96,"OEM_8",223,"VK_OEM_8",e,e],[1,0,e,0,e,0,"VK_KANA",e,e],[1,0,e,0,e,0,"VK_HANGUL",e,e],[1,0,e,0,e,0,"VK_JUNJA",e,e],[1,0,e,0,e,0,"VK_FINAL",e,e],[1,0,e,0,e,0,"VK_HANJA",e,e],[1,0,e,0,e,0,"VK_KANJI",e,e],[1,0,e,0,e,0,"VK_CONVERT",e,e],[1,0,e,0,e,0,"VK_NONCONVERT",e,e],[1,0,e,0,e,0,"VK_ACCEPT",e,e],[1,0,e,0,e,0,"VK_MODECHANGE",e,e],[1,0,e,0,e,0,"VK_SELECT",e,e],[1,0,e,0,e,0,"VK_PRINT",e,e],[1,0,e,0,e,0,"VK_EXECUTE",e,e],[1,0,e,0,e,0,"VK_SNAPSHOT",e,e],[1,0,e,0,e,0,"VK_HELP",e,e],[1,0,e,0,e,0,"VK_APPS",e,e],[1,0,e,0,e,0,"VK_PROCESSKEY",e,e],[1,0,e,0,e,0,"VK_PACKET",e,e],[1,0,e,0,e,0,"VK_DBE_SBCSCHAR",e,e],[1,0,e,0,e,0,"VK_DBE_DBCSCHAR",e,e],[1,0,e,0,e,0,"VK_ATTN",e,e],[1,0,e,0,e,0,"VK_CRSEL",e,e],[1,0,e,0,e,0,"VK_EXSEL",e,e],[1,0,e,0,e,0,"VK_EREOF",e,e],[1,0,e,0,e,0,"VK_PLAY",e,e],[1,0,e,0,e,0,"VK_ZOOM",e,e],[1,0,e,0,e,0,"VK_NONAME",e,e],[1,0,e,0,e,0,"VK_PA1",e,e],[1,0,e,0,e,0,"VK_OEM_CLEAR",e,e]],n=[],i=[];for(const r of t){const[e,t,s,o,a,l,u,h,c]=r;if(i[t]||(i[t]=!0,an[t]=s,ln[s]=t,un[s.toLowerCase()]=t,e&&(hn[t]=o,0!==o&&3!==o&&5!==o&&4!==o&&6!==o&&57!==o&&(cn[o]=t))),!n[o]){if(n[o]=!0,!a)throw new Error(`String representation missing for key code ${o} around scan code ${s}`);tn.define(o,a),nn.define(o,h||a),rn.define(o,c||h||a)}l&&(sn[l]=o),u&&(on[u]=o)}cn[3]=46}(),function(e){e.toString=function(e){return tn.keyCodeToStr(e)},e.fromString=function(e){return tn.strToKeyCode(e)},e.toUserSettingsUS=function(e){return nn.keyCodeToStr(e)},e.toUserSettingsGeneral=function(e){return rn.keyCodeToStr(e)},e.fromUserSettings=function(e){return nn.strToKeyCode(e)||rn.strToKeyCode(e)},e.toElectronAccelerator=function(e){if(e>=98&&e<=113)return null;switch(e){case 16:return"Up";case 18:return"Down";case 15:return"Left";case 17:return"Right"}return tn.keyCodeToStr(e)}}(dn||(dn={}));class gn extends xt{constructor(e,t,n,i){super(e,t,n,i),this.selectionStartLineNumber=e,this.selectionStartColumn=t,this.positionLineNumber=n,this.positionColumn=i}toString(){return"["+this.selectionStartLineNumber+","+this.selectionStartColumn+" -> "+this.positionLineNumber+","+this.positionColumn+"]"}equalsSelection(e){return gn.selectionsEqual(this,e)}static selectionsEqual(e,t){return e.selectionStartLineNumber===t.selectionStartLineNumber&&e.selectionStartColumn===t.selectionStartColumn&&e.positionLineNumber===t.positionLineNumber&&e.positionColumn===t.positionColumn}getDirection(){return this.selectionStartLineNumber===this.startLineNumber&&this.selectionStartColumn===this.startColumn?0:1}setEndPosition(e,t){return 0===this.getDirection()?new gn(this.startLineNumber,this.startColumn,e,t):new gn(e,t,this.startLineNumber,this.startColumn)}getPosition(){return new At(this.positionLineNumber,this.positionColumn)}getSelectionStart(){return new At(this.selectionStartLineNumber,this.selectionStartColumn)}setStartPosition(e,t){return 0===this.getDirection()?new gn(e,t,this.endLineNumber,this.endColumn):new gn(this.endLineNumber,this.endColumn,e,t)}static fromPositions(e,t=e){return new gn(e.lineNumber,e.column,t.lineNumber,t.column)}static fromRange(e,t){return 0===t?new gn(e.startLineNumber,e.startColumn,e.endLineNumber,e.endColumn):new gn(e.endLineNumber,e.endColumn,e.startLineNumber,e.startColumn)}static liftSelection(e){return new gn(e.selectionStartLineNumber,e.selectionStartColumn,e.positionLineNumber,e.positionColumn)}static selectionsArrEqual(e,t){if(e&&!t||!e&&t)return!1;if(!e&&!t)return!0;if(e.length!==t.length)return!1;for(let n=0,i=e.length;n<i;n++)if(!this.selectionsEqual(e[n],t[n]))return!1;return!0}static isISelection(e){return e&&"number"==typeof e.selectionStartLineNumber&&"number"==typeof e.selectionStartColumn&&"number"==typeof e.positionLineNumber&&"number"==typeof e.positionColumn}static createWithDirection(e,t,n,i,r){return 0===r?new gn(e,t,n,i):new gn(n,i,e,t)}}function mn(e){return"string"==typeof e}const fn=Object.create(null);function pn(e,t){if(mn(t)){const n=fn[t];if(void 0===n)throw new Error(`${e} references an unknown codicon: ${t}`);t=n}return fn[e]=t,{id:e}}const bn={add:pn("add",6e4),plus:pn("plus",6e4),gistNew:pn("gist-new",6e4),repoCreate:pn("repo-create",6e4),lightbulb:pn("lightbulb",60001),lightBulb:pn("light-bulb",60001),repo:pn("repo",60002),repoDelete:pn("repo-delete",60002),gistFork:pn("gist-fork",60003),repoForked:pn("repo-forked",60003),gitPullRequest:pn("git-pull-request",60004),gitPullRequestAbandoned:pn("git-pull-request-abandoned",60004),recordKeys:pn("record-keys",60005),keyboard:pn("keyboard",60005),tag:pn("tag",60006),tagAdd:pn("tag-add",60006),tagRemove:pn("tag-remove",60006),gitPullRequestLabel:pn("git-pull-request-label",60006),person:pn("person",60007),personFollow:pn("person-follow",60007),personOutline:pn("person-outline",60007),personFilled:pn("person-filled",60007),gitBranch:pn("git-branch",60008),gitBranchCreate:pn("git-branch-create",60008),gitBranchDelete:pn("git-branch-delete",60008),sourceControl:pn("source-control",60008),mirror:pn("mirror",60009),mirrorPublic:pn("mirror-public",60009),star:pn("star",60010),starAdd:pn("star-add",60010),starDelete:pn("star-delete",60010),starEmpty:pn("star-empty",60010),comment:pn("comment",60011),commentAdd:pn("comment-add",60011),alert:pn("alert",60012),warning:pn("warning",60012),search:pn("search",60013),searchSave:pn("search-save",60013),logOut:pn("log-out",60014),signOut:pn("sign-out",60014),logIn:pn("log-in",60015),signIn:pn("sign-in",60015),eye:pn("eye",60016),eyeUnwatch:pn("eye-unwatch",60016),eyeWatch:pn("eye-watch",60016),circleFilled:pn("circle-filled",60017),primitiveDot:pn("primitive-dot",60017),closeDirty:pn("close-dirty",60017),debugBreakpoint:pn("debug-breakpoint",60017),debugBreakpointDisabled:pn("debug-breakpoint-disabled",60017),debugHint:pn("debug-hint",60017),primitiveSquare:pn("primitive-square",60018),edit:pn("edit",60019),pencil:pn("pencil",60019),info:pn("info",60020),issueOpened:pn("issue-opened",60020),gistPrivate:pn("gist-private",60021),gitForkPrivate:pn("git-fork-private",60021),lock:pn("lock",60021),mirrorPrivate:pn("mirror-private",60021),close:pn("close",60022),removeClose:pn("remove-close",60022),x:pn("x",60022),repoSync:pn("repo-sync",60023),sync:pn("sync",60023),clone:pn("clone",60024),desktopDownload:pn("desktop-download",60024),beaker:pn("beaker",60025),microscope:pn("microscope",60025),vm:pn("vm",60026),deviceDesktop:pn("device-desktop",60026),file:pn("file",60027),fileText:pn("file-text",60027),more:pn("more",60028),ellipsis:pn("ellipsis",60028),kebabHorizontal:pn("kebab-horizontal",60028),mailReply:pn("mail-reply",60029),reply:pn("reply",60029),organization:pn("organization",60030),organizationFilled:pn("organization-filled",60030),organizationOutline:pn("organization-outline",60030),newFile:pn("new-file",60031),fileAdd:pn("file-add",60031),newFolder:pn("new-folder",60032),fileDirectoryCreate:pn("file-directory-create",60032),trash:pn("trash",60033),trashcan:pn("trashcan",60033),history:pn("history",60034),clock:pn("clock",60034),folder:pn("folder",60035),fileDirectory:pn("file-directory",60035),symbolFolder:pn("symbol-folder",60035),logoGithub:pn("logo-github",60036),markGithub:pn("mark-github",60036),github:pn("github",60036),terminal:pn("terminal",60037),console:pn("console",60037),repl:pn("repl",60037),zap:pn("zap",60038),symbolEvent:pn("symbol-event",60038),error:pn("error",60039),stop:pn("stop",60039),variable:pn("variable",60040),symbolVariable:pn("symbol-variable",60040),array:pn("array",60042),symbolArray:pn("symbol-array",60042),symbolModule:pn("symbol-module",60043),symbolPackage:pn("symbol-package",60043),symbolNamespace:pn("symbol-namespace",60043),symbolObject:pn("symbol-object",60043),symbolMethod:pn("symbol-method",60044),symbolFunction:pn("symbol-function",60044),symbolConstructor:pn("symbol-constructor",60044),symbolBoolean:pn("symbol-boolean",60047),symbolNull:pn("symbol-null",60047),symbolNumeric:pn("symbol-numeric",60048),symbolNumber:pn("symbol-number",60048),symbolStructure:pn("symbol-structure",60049),symbolStruct:pn("symbol-struct",60049),symbolParameter:pn("symbol-parameter",60050),symbolTypeParameter:pn("symbol-type-parameter",60050),symbolKey:pn("symbol-key",60051),symbolText:pn("symbol-text",60051),symbolReference:pn("symbol-reference",60052),goToFile:pn("go-to-file",60052),symbolEnum:pn("symbol-enum",60053),symbolValue:pn("symbol-value",60053),symbolRuler:pn("symbol-ruler",60054),symbolUnit:pn("symbol-unit",60054),activateBreakpoints:pn("activate-breakpoints",60055),archive:pn("archive",60056),arrowBoth:pn("arrow-both",60057),arrowDown:pn("arrow-down",60058),arrowLeft:pn("arrow-left",60059),arrowRight:pn("arrow-right",60060),arrowSmallDown:pn("arrow-small-down",60061),arrowSmallLeft:pn("arrow-small-left",60062),arrowSmallRight:pn("arrow-small-right",60063),arrowSmallUp:pn("arrow-small-up",60064),arrowUp:pn("arrow-up",60065),bell:pn("bell",60066),bold:pn("bold",60067),book:pn("book",60068),bookmark:pn("bookmark",60069),debugBreakpointConditionalUnverified:pn("debug-breakpoint-conditional-unverified",60070),debugBreakpointConditional:pn("debug-breakpoint-conditional",60071),debugBreakpointConditionalDisabled:pn("debug-breakpoint-conditional-disabled",60071),debugBreakpointDataUnverified:pn("debug-breakpoint-data-unverified",60072),debugBreakpointData:pn("debug-breakpoint-data",60073),debugBreakpointDataDisabled:pn("debug-breakpoint-data-disabled",60073),debugBreakpointLogUnverified:pn("debug-breakpoint-log-unverified",60074),debugBreakpointLog:pn("debug-breakpoint-log",60075),debugBreakpointLogDisabled:pn("debug-breakpoint-log-disabled",60075),briefcase:pn("briefcase",60076),broadcast:pn("broadcast",60077),browser:pn("browser",60078),bug:pn("bug",60079),calendar:pn("calendar",60080),caseSensitive:pn("case-sensitive",60081),check:pn("check",60082),checklist:pn("checklist",60083),chevronDown:pn("chevron-down",60084),dropDownButton:pn("drop-down-button",60084),chevronLeft:pn("chevron-left",60085),chevronRight:pn("chevron-right",60086),chevronUp:pn("chevron-up",60087),chromeClose:pn("chrome-close",60088),chromeMaximize:pn("chrome-maximize",60089),chromeMinimize:pn("chrome-minimize",60090),chromeRestore:pn("chrome-restore",60091),circle:pn("circle",60092),circleOutline:pn("circle-outline",60092),debugBreakpointUnverified:pn("debug-breakpoint-unverified",60092),circleSlash:pn("circle-slash",60093),circuitBoard:pn("circuit-board",60094),clearAll:pn("clear-all",60095),clippy:pn("clippy",60096),closeAll:pn("close-all",60097),cloudDownload:pn("cloud-download",60098),cloudUpload:pn("cloud-upload",60099),code:pn("code",60100),collapseAll:pn("collapse-all",60101),colorMode:pn("color-mode",60102),commentDiscussion:pn("comment-discussion",60103),compareChanges:pn("compare-changes",60157),creditCard:pn("credit-card",60105),dash:pn("dash",60108),dashboard:pn("dashboard",60109),database:pn("database",60110),debugContinue:pn("debug-continue",60111),debugDisconnect:pn("debug-disconnect",60112),debugPause:pn("debug-pause",60113),debugRestart:pn("debug-restart",60114),debugStart:pn("debug-start",60115),debugStepInto:pn("debug-step-into",60116),debugStepOut:pn("debug-step-out",60117),debugStepOver:pn("debug-step-over",60118),debugStop:pn("debug-stop",60119),debug:pn("debug",60120),deviceCameraVideo:pn("device-camera-video",60121),deviceCamera:pn("device-camera",60122),deviceMobile:pn("device-mobile",60123),diffAdded:pn("diff-added",60124),diffIgnored:pn("diff-ignored",60125),diffModified:pn("diff-modified",60126),diffRemoved:pn("diff-removed",60127),diffRenamed:pn("diff-renamed",60128),diff:pn("diff",60129),discard:pn("discard",60130),editorLayout:pn("editor-layout",60131),emptyWindow:pn("empty-window",60132),exclude:pn("exclude",60133),extensions:pn("extensions",60134),eyeClosed:pn("eye-closed",60135),fileBinary:pn("file-binary",60136),fileCode:pn("file-code",60137),fileMedia:pn("file-media",60138),filePdf:pn("file-pdf",60139),fileSubmodule:pn("file-submodule",60140),fileSymlinkDirectory:pn("file-symlink-directory",60141),fileSymlinkFile:pn("file-symlink-file",60142),fileZip:pn("file-zip",60143),files:pn("files",60144),filter:pn("filter",60145),flame:pn("flame",60146),foldDown:pn("fold-down",60147),foldUp:pn("fold-up",60148),fold:pn("fold",60149),folderActive:pn("folder-active",60150),folderOpened:pn("folder-opened",60151),gear:pn("gear",60152),gift:pn("gift",60153),gistSecret:pn("gist-secret",60154),gist:pn("gist",60155),gitCommit:pn("git-commit",60156),gitCompare:pn("git-compare",60157),gitMerge:pn("git-merge",60158),githubAction:pn("github-action",60159),githubAlt:pn("github-alt",60160),globe:pn("globe",60161),grabber:pn("grabber",60162),graph:pn("graph",60163),gripper:pn("gripper",60164),heart:pn("heart",60165),home:pn("home",60166),horizontalRule:pn("horizontal-rule",60167),hubot:pn("hubot",60168),inbox:pn("inbox",60169),issueClosed:pn("issue-closed",60324),issueReopened:pn("issue-reopened",60171),issues:pn("issues",60172),italic:pn("italic",60173),jersey:pn("jersey",60174),json:pn("json",60175),bracket:pn("bracket",60175),kebabVertical:pn("kebab-vertical",60176),key:pn("key",60177),law:pn("law",60178),lightbulbAutofix:pn("lightbulb-autofix",60179),linkExternal:pn("link-external",60180),link:pn("link",60181),listOrdered:pn("list-ordered",60182),listUnordered:pn("list-unordered",60183),liveShare:pn("live-share",60184),loading:pn("loading",60185),location:pn("location",60186),mailRead:pn("mail-read",60187),mail:pn("mail",60188),markdown:pn("markdown",60189),megaphone:pn("megaphone",60190),mention:pn("mention",60191),milestone:pn("milestone",60192),gitPullRequestMilestone:pn("git-pull-request-milestone",60192),mortarBoard:pn("mortar-board",60193),move:pn("move",60194),multipleWindows:pn("multiple-windows",60195),mute:pn("mute",60196),noNewline:pn("no-newline",60197),note:pn("note",60198),octoface:pn("octoface",60199),openPreview:pn("open-preview",60200),package:pn("package",60201),paintcan:pn("paintcan",60202),pin:pn("pin",60203),play:pn("play",60204),run:pn("run",60204),plug:pn("plug",60205),preserveCase:pn("preserve-case",60206),preview:pn("preview",60207),project:pn("project",60208),pulse:pn("pulse",60209),question:pn("question",60210),quote:pn("quote",60211),radioTower:pn("radio-tower",60212),reactions:pn("reactions",60213),references:pn("references",60214),refresh:pn("refresh",60215),regex:pn("regex",60216),remoteExplorer:pn("remote-explorer",60217),remote:pn("remote",60218),remove:pn("remove",60219),replaceAll:pn("replace-all",60220),replace:pn("replace",60221),repoClone:pn("repo-clone",60222),repoForcePush:pn("repo-force-push",60223),repoPull:pn("repo-pull",60224),repoPush:pn("repo-push",60225),report:pn("report",60226),requestChanges:pn("request-changes",60227),rocket:pn("rocket",60228),rootFolderOpened:pn("root-folder-opened",60229),rootFolder:pn("root-folder",60230),rss:pn("rss",60231),ruby:pn("ruby",60232),saveAll:pn("save-all",60233),saveAs:pn("save-as",60234),save:pn("save",60235),screenFull:pn("screen-full",60236),screenNormal:pn("screen-normal",60237),searchStop:pn("search-stop",60238),server:pn("server",60240),settingsGear:pn("settings-gear",60241),settings:pn("settings",60242),shield:pn("shield",60243),smiley:pn("smiley",60244),sortPrecedence:pn("sort-precedence",60245),splitHorizontal:pn("split-horizontal",60246),splitVertical:pn("split-vertical",60247),squirrel:pn("squirrel",60248),starFull:pn("star-full",60249),starHalf:pn("star-half",60250),symbolClass:pn("symbol-class",60251),symbolColor:pn("symbol-color",60252),symbolCustomColor:pn("symbol-customcolor",60252),symbolConstant:pn("symbol-constant",60253),symbolEnumMember:pn("symbol-enum-member",60254),symbolField:pn("symbol-field",60255),symbolFile:pn("symbol-file",60256),symbolInterface:pn("symbol-interface",60257),symbolKeyword:pn("symbol-keyword",60258),symbolMisc:pn("symbol-misc",60259),symbolOperator:pn("symbol-operator",60260),symbolProperty:pn("symbol-property",60261),wrench:pn("wrench",60261),wrenchSubaction:pn("wrench-subaction",60261),symbolSnippet:pn("symbol-snippet",60262),tasklist:pn("tasklist",60263),telescope:pn("telescope",60264),textSize:pn("text-size",60265),threeBars:pn("three-bars",60266),thumbsdown:pn("thumbsdown",60267),thumbsup:pn("thumbsup",60268),tools:pn("tools",60269),triangleDown:pn("triangle-down",60270),triangleLeft:pn("triangle-left",60271),triangleRight:pn("triangle-right",60272),triangleUp:pn("triangle-up",60273),twitter:pn("twitter",60274),unfold:pn("unfold",60275),unlock:pn("unlock",60276),unmute:pn("unmute",60277),unverified:pn("unverified",60278),verified:pn("verified",60279),versions:pn("versions",60280),vmActive:pn("vm-active",60281),vmOutline:pn("vm-outline",60282),vmRunning:pn("vm-running",60283),watch:pn("watch",60284),whitespace:pn("whitespace",60285),wholeWord:pn("whole-word",60286),window:pn("window",60287),wordWrap:pn("word-wrap",60288),zoomIn:pn("zoom-in",60289),zoomOut:pn("zoom-out",60290),listFilter:pn("list-filter",60291),listFlat:pn("list-flat",60292),listSelection:pn("list-selection",60293),selection:pn("selection",60293),listTree:pn("list-tree",60294),debugBreakpointFunctionUnverified:pn("debug-breakpoint-function-unverified",60295),debugBreakpointFunction:pn("debug-breakpoint-function",60296),debugBreakpointFunctionDisabled:pn("debug-breakpoint-function-disabled",60296),debugStackframeActive:pn("debug-stackframe-active",60297),circleSmallFilled:pn("circle-small-filled",60298),debugStackframeDot:pn("debug-stackframe-dot",60298),debugStackframe:pn("debug-stackframe",60299),debugStackframeFocused:pn("debug-stackframe-focused",60299),debugBreakpointUnsupported:pn("debug-breakpoint-unsupported",60300),symbolString:pn("symbol-string",60301),debugReverseContinue:pn("debug-reverse-continue",60302),debugStepBack:pn("debug-step-back",60303),debugRestartFrame:pn("debug-restart-frame",60304),callIncoming:pn("call-incoming",60306),callOutgoing:pn("call-outgoing",60307),menu:pn("menu",60308),expandAll:pn("expand-all",60309),feedback:pn("feedback",60310),gitPullRequestReviewer:pn("git-pull-request-reviewer",60310),groupByRefType:pn("group-by-ref-type",60311),ungroupByRefType:pn("ungroup-by-ref-type",60312),account:pn("account",60313),gitPullRequestAssignee:pn("git-pull-request-assignee",60313),bellDot:pn("bell-dot",60314),debugConsole:pn("debug-console",60315),library:pn("library",60316),output:pn("output",60317),runAll:pn("run-all",60318),syncIgnored:pn("sync-ignored",60319),pinned:pn("pinned",60320),githubInverted:pn("github-inverted",60321),debugAlt:pn("debug-alt",60305),serverProcess:pn("server-process",60322),serverEnvironment:pn("server-environment",60323),pass:pn("pass",60324),stopCircle:pn("stop-circle",60325),playCircle:pn("play-circle",60326),record:pn("record",60327),debugAltSmall:pn("debug-alt-small",60328),vmConnect:pn("vm-connect",60329),cloud:pn("cloud",60330),merge:pn("merge",60331),exportIcon:pn("export",60332),graphLeft:pn("graph-left",60333),magnet:pn("magnet",60334),notebook:pn("notebook",60335),redo:pn("redo",60336),checkAll:pn("check-all",60337),pinnedDirty:pn("pinned-dirty",60338),passFilled:pn("pass-filled",60339),circleLargeFilled:pn("circle-large-filled",60340),circleLarge:pn("circle-large",60341),circleLargeOutline:pn("circle-large-outline",60341),combine:pn("combine",60342),gather:pn("gather",60342),table:pn("table",60343),variableGroup:pn("variable-group",60344),typeHierarchy:pn("type-hierarchy",60345),typeHierarchySub:pn("type-hierarchy-sub",60346),typeHierarchySuper:pn("type-hierarchy-super",60347),gitPullRequestCreate:pn("git-pull-request-create",60348),runAbove:pn("run-above",60349),runBelow:pn("run-below",60350),notebookTemplate:pn("notebook-template",60351),debugRerun:pn("debug-rerun",60352),workspaceTrusted:pn("workspace-trusted",60353),workspaceUntrusted:pn("workspace-untrusted",60354),workspaceUnspecified:pn("workspace-unspecified",60355),terminalCmd:pn("terminal-cmd",60356),terminalDebian:pn("terminal-debian",60357),terminalLinux:pn("terminal-linux",60358),terminalPowershell:pn("terminal-powershell",60359),terminalTmux:pn("terminal-tmux",60360),terminalUbuntu:pn("terminal-ubuntu",60361),terminalBash:pn("terminal-bash",60362),arrowSwap:pn("arrow-swap",60363),copy:pn("copy",60364),personAdd:pn("person-add",60365),filterFilled:pn("filter-filled",60366),wand:pn("wand",60367),debugLineByLine:pn("debug-line-by-line",60368),inspect:pn("inspect",60369),layers:pn("layers",60370),layersDot:pn("layers-dot",60371),layersActive:pn("layers-active",60372),compass:pn("compass",60373),compassDot:pn("compass-dot",60374),compassActive:pn("compass-active",60375),azure:pn("azure",60376),issueDraft:pn("issue-draft",60377),gitPullRequestClosed:pn("git-pull-request-closed",60378),gitPullRequestDraft:pn("git-pull-request-draft",60379),debugAll:pn("debug-all",60380),debugCoverage:pn("debug-coverage",60381),runErrors:pn("run-errors",60382),folderLibrary:pn("folder-library",60383),debugContinueSmall:pn("debug-continue-small",60384),beakerStop:pn("beaker-stop",60385),graphLine:pn("graph-line",60386),graphScatter:pn("graph-scatter",60387),pieChart:pn("pie-chart",60388),bracketDot:pn("bracket-dot",60389),bracketError:pn("bracket-error",60390),lockSmall:pn("lock-small",60391),azureDevops:pn("azure-devops",60392),verifiedFilled:pn("verified-filled",60393),newLine:pn("newline",60394),layout:pn("layout",60395),layoutActivitybarLeft:pn("layout-activitybar-left",60396),layoutActivitybarRight:pn("layout-activitybar-right",60397),layoutPanelLeft:pn("layout-panel-left",60398),layoutPanelCenter:pn("layout-panel-center",60399),layoutPanelJustify:pn("layout-panel-justify",60400),layoutPanelRight:pn("layout-panel-right",60401),layoutPanel:pn("layout-panel",60402),layoutSidebarLeft:pn("layout-sidebar-left",60403),layoutSidebarRight:pn("layout-sidebar-right",60404),layoutStatusbar:pn("layout-statusbar",60405),layoutMenubar:pn("layout-menubar",60406),layoutCentered:pn("layout-centered",60407),layoutSidebarRightOff:pn("layout-sidebar-right-off",60416),layoutPanelOff:pn("layout-panel-off",60417),layoutSidebarLeftOff:pn("layout-sidebar-left-off",60418),target:pn("target",60408),indent:pn("indent",60409),recordSmall:pn("record-small",60410),errorSmall:pn("error-small",60411),arrowCircleDown:pn("arrow-circle-down",60412),arrowCircleLeft:pn("arrow-circle-left",60413),arrowCircleRight:pn("arrow-circle-right",60414),arrowCircleUp:pn("arrow-circle-up",60415),heartFilled:pn("heart-filled",60420),map:pn("map",60421),mapFilled:pn("map-filled",60422),circleSmall:pn("circle-small",60423),bellSlash:pn("bell-slash",60424),bellSlashDot:pn("bell-slash-dot",60425),commentUnresolved:pn("comment-unresolved",60426),gitPullRequestGoToChanges:pn("git-pull-request-go-to-changes",60427),gitPullRequestNewChanges:pn("git-pull-request-new-changes",60428),searchFuzzy:pn("search-fuzzy",60429),commentDraft:pn("comment-draft",60430),send:pn("send",60431),sparkle:pn("sparkle",60432),insert:pn("insert",60433),mic:pn("mic",60434),dialogError:pn("dialog-error","error"),dialogWarning:pn("dialog-warning","warning"),dialogInfo:pn("dialog-info","info"),dialogClose:pn("dialog-close","close"),treeItemExpanded:pn("tree-item-expanded","chevron-down"),treeFilterOnTypeOn:pn("tree-filter-on-type-on","list-filter"),treeFilterOnTypeOff:pn("tree-filter-on-type-off","list-selection"),treeFilterClear:pn("tree-filter-clear","close"),treeItemLoading:pn("tree-item-loading","loading"),menuSelection:pn("menu-selection","check"),menuSubmenu:pn("menu-submenu","chevron-right"),menuBarMore:pn("menubar-more","more"),scrollbarButtonLeft:pn("scrollbar-button-left","triangle-left"),scrollbarButtonRight:pn("scrollbar-button-right","triangle-right"),scrollbarButtonUp:pn("scrollbar-button-up","triangle-up"),scrollbarButtonDown:pn("scrollbar-button-down","triangle-down"),toolBarMore:pn("toolbar-more","more"),quickInputBack:pn("quick-input-back","arrow-left")};var _n,vn,yn,Cn,Ln=function(e,t,n,i){return new(n||(n=Promise))((function(r,s){function o(e){try{l(i.next(e))}catch(zr){s(zr)}}function a(e){try{l(i.throw(e))}catch(zr){s(zr)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}l((i=i.apply(e,t||[])).next())}))};class wn extends v{get isResolved(){return this._isResolved}constructor(e,t,n){super(),this._registry=e,this._languageId=t,this._factory=n,this._isDisposed=!1,this._resolvePromise=null,this._isResolved=!1}dispose(){this._isDisposed=!0,super.dispose()}resolve(){return Ln(this,void 0,void 0,(function*(){return this._resolvePromise||(this._resolvePromise=this._create()),this._resolvePromise}))}_create(){return Ln(this,void 0,void 0,(function*(){const e=yield this._factory.tokenizationSupport;this._isResolved=!0,e&&!this._isDisposed&&this._register(this._registry.register(this._languageId,e))}))}}class Nn{constructor(e,t,n){this.offset=e,this.type=t,this.language=n,this._tokenBrand=void 0}toString(){return"("+this.offset+", "+this.type+")"}}!function(e){const t=new Map;t.set(0,bn.symbolMethod),t.set(1,bn.symbolFunction),t.set(2,bn.symbolConstructor),t.set(3,bn.symbolField),t.set(4,bn.symbolVariable),t.set(5,bn.symbolClass),t.set(6,bn.symbolStruct),t.set(7,bn.symbolInterface),t.set(8,bn.symbolModule),t.set(9,bn.symbolProperty),t.set(10,bn.symbolEvent),t.set(11,bn.symbolOperator),t.set(12,bn.symbolUnit),t.set(13,bn.symbolValue),t.set(15,bn.symbolEnum),t.set(14,bn.symbolConstant),t.set(15,bn.symbolEnum),t.set(16,bn.symbolEnumMember),t.set(17,bn.symbolKeyword),t.set(27,bn.symbolSnippet),t.set(18,bn.symbolText),t.set(19,bn.symbolColor),t.set(20,bn.symbolFile),t.set(21,bn.symbolReference),t.set(22,bn.symbolCustomColor),t.set(23,bn.symbolFolder),t.set(24,bn.symbolTypeParameter),t.set(25,bn.account),t.set(26,bn.issues),e.toIcon=function(e){let n=t.get(e);return n||(console.info("No codicon found for CompletionItemKind "+e),n=bn.symbolProperty),n};const n=new Map;n.set("method",0),n.set("function",1),n.set("constructor",2),n.set("field",3),n.set("variable",4),n.set("class",5),n.set("struct",6),n.set("interface",7),n.set("module",8),n.set("property",9),n.set("event",10),n.set("operator",11),n.set("unit",12),n.set("value",13),n.set("constant",14),n.set("enum",15),n.set("enum-member",16),n.set("enumMember",16),n.set("keyword",17),n.set("snippet",27),n.set("text",18),n.set("color",19),n.set("file",20),n.set("reference",21),n.set("customcolor",22),n.set("folder",23),n.set("type-parameter",24),n.set("typeParameter",24),n.set("account",25),n.set("issue",26),e.fromString=function(e,t){let i=n.get(e);return void 0!==i||t||(i=9),i}}(_n||(_n={})),function(e){e[e.Automatic=0]="Automatic",e[e.Explicit=1]="Explicit"}(vn||(vn={}));!function(e){e[e.Invoke=1]="Invoke",e[e.TriggerCharacter=2]="TriggerCharacter",e[e.ContentChange=3]="ContentChange"}(yn||(yn={})),function(e){e[e.Text=0]="Text",e[e.Read=1]="Read",e[e.Write=2]="Write"}(Cn||(Cn={}));I(0,"array"),I(0,"boolean"),I(0,"class"),I(0,"constant"),I(0,"constructor"),I(0,"enumeration"),I(0,"enumeration member"),I(0,"event"),I(0,"field"),I(0,"file"),I(0,"function"),I(0,"interface"),I(0,"key"),I(0,"method"),I(0,"module"),I(0,"namespace"),I(0,"null"),I(0,"number"),I(0,"object"),I(0,"operator"),I(0,"package"),I(0,"property"),I(0,"string"),I(0,"struct"),I(0,"type parameter"),I(0,"variable");var En,Sn,Rn;!function(e){const t=new Map;t.set(0,bn.symbolFile),t.set(1,bn.symbolModule),t.set(2,bn.symbolNamespace),t.set(3,bn.symbolPackage),t.set(4,bn.symbolClass),t.set(5,bn.symbolMethod),t.set(6,bn.symbolProperty),t.set(7,bn.symbolField),t.set(8,bn.symbolConstructor),t.set(9,bn.symbolEnum),t.set(10,bn.symbolInterface),t.set(11,bn.symbolFunction),t.set(12,bn.symbolVariable),t.set(13,bn.symbolConstant),t.set(14,bn.symbolString),t.set(15,bn.symbolNumber),t.set(16,bn.symbolBoolean),t.set(17,bn.symbolArray),t.set(18,bn.symbolObject),t.set(19,bn.symbolKey),t.set(20,bn.symbolNull),t.set(21,bn.symbolEnumMember),t.set(22,bn.symbolStruct),t.set(23,bn.symbolEvent),t.set(24,bn.symbolOperator),t.set(25,bn.symbolTypeParameter),e.toIcon=function(e){let n=t.get(e);return n||(console.info("No codicon found for SymbolKind "+e),n=bn.symbolProperty),n}}(En||(En={}));class An{static fromValue(e){switch(e){case"comment":return An.Comment;case"imports":return An.Imports;case"region":return An.Region}return new An(e)}constructor(e){this.value=e}}An.Comment=new An("comment"),An.Imports=new An("imports"),An.Region=new An("region"),function(e){e.is=function(e){return!(!e||"object"!=typeof e)&&("string"==typeof e.id&&"string"==typeof e.title)}}(Sn||(Sn={})),function(e){e[e.Type=1]="Type",e[e.Parameter=2]="Parameter"}(Rn||(Rn={}));new class{constructor(){this._tokenizationSupports=new Map,this._factories=new Map,this._onDidChange=new x,this.onDidChange=this._onDidChange.event,this._colorMap=null}handleChange(e){this._onDidChange.fire({changedLanguages:e,changedColorMap:!1})}register(e,t){return this._tokenizationSupports.set(e,t),this.handleChange([e]),b((()=>{this._tokenizationSupports.get(e)===t&&(this._tokenizationSupports.delete(e),this.handleChange([e]))}))}get(e){return this._tokenizationSupports.get(e)||null}registerFactory(e,t){var n;null===(n=this._factories.get(e))||void 0===n||n.dispose();const i=new wn(this,e,t);return this._factories.set(e,i),b((()=>{const t=this._factories.get(e);t&&t===i&&(this._factories.delete(e),t.dispose())}))}getOrCreate(e){return Ln(this,void 0,void 0,(function*(){const t=this.get(e);if(t)return t;const n=this._factories.get(e);return!n||n.isResolved?null:(yield n.resolve(),this.get(e))}))}isResolved(e){if(this.get(e))return!0;const t=this._factories.get(e);return!(t&&!t.isResolved)}setColorMap(e){this._colorMap=e,this._onDidChange.fire({changedLanguages:Array.from(this._tokenizationSupports.keys()),changedColorMap:!0})}getColorMap(){return this._colorMap}getDefaultBackground(){return this._colorMap&&this._colorMap.length>2?this._colorMap[2]:null}};var xn,Mn,kn,Tn,On,In,Pn,Dn,Kn,Fn,qn,Vn,Bn,Un,Wn,Hn,zn,$n,jn,Gn,Qn,Yn,Xn,Jn,Zn,ei,ti,ni,ii,ri,si,oi,ai,li,ui,hi,ci,di,gi;!function(e){e[e.Unknown=0]="Unknown",e[e.Disabled=1]="Disabled",e[e.Enabled=2]="Enabled"}(xn||(xn={})),function(e){e[e.Invoke=1]="Invoke",e[e.Auto=2]="Auto"}(Mn||(Mn={})),function(e){e[e.None=0]="None",e[e.KeepWhitespace=1]="KeepWhitespace",e[e.InsertAsSnippet=4]="InsertAsSnippet"}(kn||(kn={})),function(e){e[e.Method=0]="Method",e[e.Function=1]="Function",e[e.Constructor=2]="Constructor",e[e.Field=3]="Field",e[e.Variable=4]="Variable",e[e.Class=5]="Class",e[e.Struct=6]="Struct",e[e.Interface=7]="Interface",e[e.Module=8]="Module",e[e.Property=9]="Property",e[e.Event=10]="Event",e[e.Operator=11]="Operator",e[e.Unit=12]="Unit",e[e.Value=13]="Value",e[e.Constant=14]="Constant",e[e.Enum=15]="Enum",e[e.EnumMember=16]="EnumMember",e[e.Keyword=17]="Keyword",e[e.Text=18]="Text",e[e.Color=19]="Color",e[e.File=20]="File",e[e.Reference=21]="Reference",e[e.Customcolor=22]="Customcolor",e[e.Folder=23]="Folder",e[e.TypeParameter=24]="TypeParameter",e[e.User=25]="User",e[e.Issue=26]="Issue",e[e.Snippet=27]="Snippet"}(Tn||(Tn={})),function(e){e[e.Deprecated=1]="Deprecated"}(On||(On={})),function(e){e[e.Invoke=0]="Invoke",e[e.TriggerCharacter=1]="TriggerCharacter",e[e.TriggerForIncompleteCompletions=2]="TriggerForIncompleteCompletions"}(In||(In={})),function(e){e[e.EXACT=0]="EXACT",e[e.ABOVE=1]="ABOVE",e[e.BELOW=2]="BELOW"}(Pn||(Pn={})),function(e){e[e.NotSet=0]="NotSet",e[e.ContentFlush=1]="ContentFlush",e[e.RecoverFromMarkers=2]="RecoverFromMarkers",e[e.Explicit=3]="Explicit",e[e.Paste=4]="Paste",e[e.Undo=5]="Undo",e[e.Redo=6]="Redo"}(Dn||(Dn={})),function(e){e[e.LF=1]="LF",e[e.CRLF=2]="CRLF"}(Kn||(Kn={})),function(e){e[e.Text=0]="Text",e[e.Read=1]="Read",e[e.Write=2]="Write"}(Fn||(Fn={})),function(e){e[e.None=0]="None",e[e.Keep=1]="Keep",e[e.Brackets=2]="Brackets",e[e.Advanced=3]="Advanced",e[e.Full=4]="Full"}(qn||(qn={})),function(e){e[e.acceptSuggestionOnCommitCharacter=0]="acceptSuggestionOnCommitCharacter",e[e.acceptSuggestionOnEnter=1]="acceptSuggestionOnEnter",e[e.accessibilitySupport=2]="accessibilitySupport",e[e.accessibilityPageSize=3]="accessibilityPageSize",e[e.ariaLabel=4]="ariaLabel",e[e.ariaRequired=5]="ariaRequired",e[e.autoClosingBrackets=6]="autoClosingBrackets",e[e.autoClosingComments=7]="autoClosingComments",e[e.screenReaderAnnounceInlineSuggestion=8]="screenReaderAnnounceInlineSuggestion",e[e.autoClosingDelete=9]="autoClosingDelete",e[e.autoClosingOvertype=10]="autoClosingOvertype",e[e.autoClosingQuotes=11]="autoClosingQuotes",e[e.autoIndent=12]="autoIndent",e[e.automaticLayout=13]="automaticLayout",e[e.autoSurround=14]="autoSurround",e[e.bracketPairColorization=15]="bracketPairColorization",e[e.guides=16]="guides",e[e.codeLens=17]="codeLens",e[e.codeLensFontFamily=18]="codeLensFontFamily",e[e.codeLensFontSize=19]="codeLensFontSize",e[e.colorDecorators=20]="colorDecorators",e[e.colorDecoratorsLimit=21]="colorDecoratorsLimit",e[e.columnSelection=22]="columnSelection",e[e.comments=23]="comments",e[e.contextmenu=24]="contextmenu",e[e.copyWithSyntaxHighlighting=25]="copyWithSyntaxHighlighting",e[e.cursorBlinking=26]="cursorBlinking",e[e.cursorSmoothCaretAnimation=27]="cursorSmoothCaretAnimation",e[e.cursorStyle=28]="cursorStyle",e[e.cursorSurroundingLines=29]="cursorSurroundingLines",e[e.cursorSurroundingLinesStyle=30]="cursorSurroundingLinesStyle",e[e.cursorWidth=31]="cursorWidth",e[e.disableLayerHinting=32]="disableLayerHinting",e[e.disableMonospaceOptimizations=33]="disableMonospaceOptimizations",e[e.domReadOnly=34]="domReadOnly",e[e.dragAndDrop=35]="dragAndDrop",e[e.dropIntoEditor=36]="dropIntoEditor",e[e.emptySelectionClipboard=37]="emptySelectionClipboard",e[e.experimentalWhitespaceRendering=38]="experimentalWhitespaceRendering",e[e.extraEditorClassName=39]="extraEditorClassName",e[e.fastScrollSensitivity=40]="fastScrollSensitivity",e[e.find=41]="find",e[e.fixedOverflowWidgets=42]="fixedOverflowWidgets",e[e.folding=43]="folding",e[e.foldingStrategy=44]="foldingStrategy",e[e.foldingHighlight=45]="foldingHighlight",e[e.foldingImportsByDefault=46]="foldingImportsByDefault",e[e.foldingMaximumRegions=47]="foldingMaximumRegions",e[e.unfoldOnClickAfterEndOfLine=48]="unfoldOnClickAfterEndOfLine",e[e.fontFamily=49]="fontFamily",e[e.fontInfo=50]="fontInfo",e[e.fontLigatures=51]="fontLigatures",e[e.fontSize=52]="fontSize",e[e.fontWeight=53]="fontWeight",e[e.fontVariations=54]="fontVariations",e[e.formatOnPaste=55]="formatOnPaste",e[e.formatOnType=56]="formatOnType",e[e.glyphMargin=57]="glyphMargin",e[e.gotoLocation=58]="gotoLocation",e[e.hideCursorInOverviewRuler=59]="hideCursorInOverviewRuler",e[e.hover=60]="hover",e[e.inDiffEditor=61]="inDiffEditor",e[e.inlineSuggest=62]="inlineSuggest",e[e.letterSpacing=63]="letterSpacing",e[e.lightbulb=64]="lightbulb",e[e.lineDecorationsWidth=65]="lineDecorationsWidth",e[e.lineHeight=66]="lineHeight",e[e.lineNumbers=67]="lineNumbers",e[e.lineNumbersMinChars=68]="lineNumbersMinChars",e[e.linkedEditing=69]="linkedEditing",e[e.links=70]="links",e[e.matchBrackets=71]="matchBrackets",e[e.minimap=72]="minimap",e[e.mouseStyle=73]="mouseStyle",e[e.mouseWheelScrollSensitivity=74]="mouseWheelScrollSensitivity",e[e.mouseWheelZoom=75]="mouseWheelZoom",e[e.multiCursorMergeOverlapping=76]="multiCursorMergeOverlapping",e[e.multiCursorModifier=77]="multiCursorModifier",e[e.multiCursorPaste=78]="multiCursorPaste",e[e.multiCursorLimit=79]="multiCursorLimit",e[e.occurrencesHighlight=80]="occurrencesHighlight",e[e.overviewRulerBorder=81]="overviewRulerBorder",e[e.overviewRulerLanes=82]="overviewRulerLanes",e[e.padding=83]="padding",e[e.pasteAs=84]="pasteAs",e[e.parameterHints=85]="parameterHints",e[e.peekWidgetDefaultFocus=86]="peekWidgetDefaultFocus",e[e.definitionLinkOpensInPeek=87]="definitionLinkOpensInPeek",e[e.quickSuggestions=88]="quickSuggestions",e[e.quickSuggestionsDelay=89]="quickSuggestionsDelay",e[e.readOnly=90]="readOnly",e[e.readOnlyMessage=91]="readOnlyMessage",e[e.renameOnType=92]="renameOnType",e[e.renderControlCharacters=93]="renderControlCharacters",e[e.renderFinalNewline=94]="renderFinalNewline",e[e.renderLineHighlight=95]="renderLineHighlight",e[e.renderLineHighlightOnlyWhenFocus=96]="renderLineHighlightOnlyWhenFocus",e[e.renderValidationDecorations=97]="renderValidationDecorations",e[e.renderWhitespace=98]="renderWhitespace",e[e.revealHorizontalRightPadding=99]="revealHorizontalRightPadding",e[e.roundedSelection=100]="roundedSelection",e[e.rulers=101]="rulers",e[e.scrollbar=102]="scrollbar",e[e.scrollBeyondLastColumn=103]="scrollBeyondLastColumn",e[e.scrollBeyondLastLine=104]="scrollBeyondLastLine",e[e.scrollPredominantAxis=105]="scrollPredominantAxis",e[e.selectionClipboard=106]="selectionClipboard",e[e.selectionHighlight=107]="selectionHighlight",e[e.selectOnLineNumbers=108]="selectOnLineNumbers",e[e.showFoldingControls=109]="showFoldingControls",e[e.showUnused=110]="showUnused",e[e.snippetSuggestions=111]="snippetSuggestions",e[e.smartSelect=112]="smartSelect",e[e.smoothScrolling=113]="smoothScrolling",e[e.stickyScroll=114]="stickyScroll",e[e.stickyTabStops=115]="stickyTabStops",e[e.stopRenderingLineAfter=116]="stopRenderingLineAfter",e[e.suggest=117]="suggest",e[e.suggestFontSize=118]="suggestFontSize",e[e.suggestLineHeight=119]="suggestLineHeight",e[e.suggestOnTriggerCharacters=120]="suggestOnTriggerCharacters",e[e.suggestSelection=121]="suggestSelection",e[e.tabCompletion=122]="tabCompletion",e[e.tabIndex=123]="tabIndex",e[e.unicodeHighlighting=124]="unicodeHighlighting",e[e.unusualLineTerminators=125]="unusualLineTerminators",e[e.useShadowDOM=126]="useShadowDOM",e[e.useTabStops=127]="useTabStops",e[e.wordBreak=128]="wordBreak",e[e.wordSeparators=129]="wordSeparators",e[e.wordWrap=130]="wordWrap",e[e.wordWrapBreakAfterCharacters=131]="wordWrapBreakAfterCharacters",e[e.wordWrapBreakBeforeCharacters=132]="wordWrapBreakBeforeCharacters",e[e.wordWrapColumn=133]="wordWrapColumn",e[e.wordWrapOverride1=134]="wordWrapOverride1",e[e.wordWrapOverride2=135]="wordWrapOverride2",e[e.wrappingIndent=136]="wrappingIndent",e[e.wrappingStrategy=137]="wrappingStrategy",e[e.showDeprecated=138]="showDeprecated",e[e.inlayHints=139]="inlayHints",e[e.editorClassName=140]="editorClassName",e[e.pixelRatio=141]="pixelRatio",e[e.tabFocusMode=142]="tabFocusMode",e[e.layoutInfo=143]="layoutInfo",e[e.wrappingInfo=144]="wrappingInfo",e[e.defaultColorDecorators=145]="defaultColorDecorators",e[e.colorDecoratorsActivatedOn=146]="colorDecoratorsActivatedOn",e[e.inlineCompletionsAccessibilityVerbose=147]="inlineCompletionsAccessibilityVerbose"}(Vn||(Vn={})),function(e){e[e.TextDefined=0]="TextDefined",e[e.LF=1]="LF",e[e.CRLF=2]="CRLF"}(Bn||(Bn={})),function(e){e[e.LF=0]="LF",e[e.CRLF=1]="CRLF"}(Un||(Un={})),function(e){e[e.Left=1]="Left",e[e.Right=2]="Right"}(Wn||(Wn={})),function(e){e[e.None=0]="None",e[e.Indent=1]="Indent",e[e.IndentOutdent=2]="IndentOutdent",e[e.Outdent=3]="Outdent"}(Hn||(Hn={})),function(e){e[e.Both=0]="Both",e[e.Right=1]="Right",e[e.Left=2]="Left",e[e.None=3]="None"}(zn||(zn={})),function(e){e[e.Type=1]="Type",e[e.Parameter=2]="Parameter"}($n||($n={})),function(e){e[e.Automatic=0]="Automatic",e[e.Explicit=1]="Explicit"}(jn||(jn={})),function(e){e[e.DependsOnKbLayout=-1]="DependsOnKbLayout",e[e.Unknown=0]="Unknown",e[e.Backspace=1]="Backspace",e[e.Tab=2]="Tab",e[e.Enter=3]="Enter",e[e.Shift=4]="Shift",e[e.Ctrl=5]="Ctrl",e[e.Alt=6]="Alt",e[e.PauseBreak=7]="PauseBreak",e[e.CapsLock=8]="CapsLock",e[e.Escape=9]="Escape",e[e.Space=10]="Space",e[e.PageUp=11]="PageUp",e[e.PageDown=12]="PageDown",e[e.End=13]="End",e[e.Home=14]="Home",e[e.LeftArrow=15]="LeftArrow",e[e.UpArrow=16]="UpArrow",e[e.RightArrow=17]="RightArrow",e[e.DownArrow=18]="DownArrow",e[e.Insert=19]="Insert",e[e.Delete=20]="Delete",e[e.Digit0=21]="Digit0",e[e.Digit1=22]="Digit1",e[e.Digit2=23]="Digit2",e[e.Digit3=24]="Digit3",e[e.Digit4=25]="Digit4",e[e.Digit5=26]="Digit5",e[e.Digit6=27]="Digit6",e[e.Digit7=28]="Digit7",e[e.Digit8=29]="Digit8",e[e.Digit9=30]="Digit9",e[e.KeyA=31]="KeyA",e[e.KeyB=32]="KeyB",e[e.KeyC=33]="KeyC",e[e.KeyD=34]="KeyD",e[e.KeyE=35]="KeyE",e[e.KeyF=36]="KeyF",e[e.KeyG=37]="KeyG",e[e.KeyH=38]="KeyH",e[e.KeyI=39]="KeyI",e[e.KeyJ=40]="KeyJ",e[e.KeyK=41]="KeyK",e[e.KeyL=42]="KeyL",e[e.KeyM=43]="KeyM",e[e.KeyN=44]="KeyN",e[e.KeyO=45]="KeyO",e[e.KeyP=46]="KeyP",e[e.KeyQ=47]="KeyQ",e[e.KeyR=48]="KeyR",e[e.KeyS=49]="KeyS",e[e.KeyT=50]="KeyT",e[e.KeyU=51]="KeyU",e[e.KeyV=52]="KeyV",e[e.KeyW=53]="KeyW",e[e.KeyX=54]="KeyX",e[e.KeyY=55]="KeyY",e[e.KeyZ=56]="KeyZ",e[e.Meta=57]="Meta",e[e.ContextMenu=58]="ContextMenu",e[e.F1=59]="F1",e[e.F2=60]="F2",e[e.F3=61]="F3",e[e.F4=62]="F4",e[e.F5=63]="F5",e[e.F6=64]="F6",e[e.F7=65]="F7",e[e.F8=66]="F8",e[e.F9=67]="F9",e[e.F10=68]="F10",e[e.F11=69]="F11",e[e.F12=70]="F12",e[e.F13=71]="F13",e[e.F14=72]="F14",e[e.F15=73]="F15",e[e.F16=74]="F16",e[e.F17=75]="F17",e[e.F18=76]="F18",e[e.F19=77]="F19",e[e.F20=78]="F20",e[e.F21=79]="F21",e[e.F22=80]="F22",e[e.F23=81]="F23",e[e.F24=82]="F24",e[e.NumLock=83]="NumLock",e[e.ScrollLock=84]="ScrollLock",e[e.Semicolon=85]="Semicolon",e[e.Equal=86]="Equal",e[e.Comma=87]="Comma",e[e.Minus=88]="Minus",e[e.Period=89]="Period",e[e.Slash=90]="Slash",e[e.Backquote=91]="Backquote",e[e.BracketLeft=92]="BracketLeft",e[e.Backslash=93]="Backslash",e[e.BracketRight=94]="BracketRight",e[e.Quote=95]="Quote",e[e.OEM_8=96]="OEM_8",e[e.IntlBackslash=97]="IntlBackslash",e[e.Numpad0=98]="Numpad0",e[e.Numpad1=99]="Numpad1",e[e.Numpad2=100]="Numpad2",e[e.Numpad3=101]="Numpad3",e[e.Numpad4=102]="Numpad4",e[e.Numpad5=103]="Numpad5",e[e.Numpad6=104]="Numpad6",e[e.Numpad7=105]="Numpad7",e[e.Numpad8=106]="Numpad8",e[e.Numpad9=107]="Numpad9",e[e.NumpadMultiply=108]="NumpadMultiply",e[e.NumpadAdd=109]="NumpadAdd",e[e.NUMPAD_SEPARATOR=110]="NUMPAD_SEPARATOR",e[e.NumpadSubtract=111]="NumpadSubtract",e[e.NumpadDecimal=112]="NumpadDecimal",e[e.NumpadDivide=113]="NumpadDivide",e[e.KEY_IN_COMPOSITION=114]="KEY_IN_COMPOSITION",e[e.ABNT_C1=115]="ABNT_C1",e[e.ABNT_C2=116]="ABNT_C2",e[e.AudioVolumeMute=117]="AudioVolumeMute",e[e.AudioVolumeUp=118]="AudioVolumeUp",e[e.AudioVolumeDown=119]="AudioVolumeDown",e[e.BrowserSearch=120]="BrowserSearch",e[e.BrowserHome=121]="BrowserHome",e[e.BrowserBack=122]="BrowserBack",e[e.BrowserForward=123]="BrowserForward",e[e.MediaTrackNext=124]="MediaTrackNext",e[e.MediaTrackPrevious=125]="MediaTrackPrevious",e[e.MediaStop=126]="MediaStop",e[e.MediaPlayPause=127]="MediaPlayPause",e[e.LaunchMediaPlayer=128]="LaunchMediaPlayer",e[e.LaunchMail=129]="LaunchMail",e[e.LaunchApp2=130]="LaunchApp2",e[e.Clear=131]="Clear",e[e.MAX_VALUE=132]="MAX_VALUE"}(Gn||(Gn={})),function(e){e[e.Hint=1]="Hint",e[e.Info=2]="Info",e[e.Warning=4]="Warning",e[e.Error=8]="Error"}(Qn||(Qn={})),function(e){e[e.Unnecessary=1]="Unnecessary",e[e.Deprecated=2]="Deprecated"}(Yn||(Yn={})),function(e){e[e.Inline=1]="Inline",e[e.Gutter=2]="Gutter"}(Xn||(Xn={})),function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.TEXTAREA=1]="TEXTAREA",e[e.GUTTER_GLYPH_MARGIN=2]="GUTTER_GLYPH_MARGIN",e[e.GUTTER_LINE_NUMBERS=3]="GUTTER_LINE_NUMBERS",e[e.GUTTER_LINE_DECORATIONS=4]="GUTTER_LINE_DECORATIONS",e[e.GUTTER_VIEW_ZONE=5]="GUTTER_VIEW_ZONE",e[e.CONTENT_TEXT=6]="CONTENT_TEXT",e[e.CONTENT_EMPTY=7]="CONTENT_EMPTY",e[e.CONTENT_VIEW_ZONE=8]="CONTENT_VIEW_ZONE",e[e.CONTENT_WIDGET=9]="CONTENT_WIDGET",e[e.OVERVIEW_RULER=10]="OVERVIEW_RULER",e[e.SCROLLBAR=11]="SCROLLBAR",e[e.OVERLAY_WIDGET=12]="OVERLAY_WIDGET",e[e.OUTSIDE_EDITOR=13]="OUTSIDE_EDITOR"}(Jn||(Jn={})),function(e){e[e.TOP_RIGHT_CORNER=0]="TOP_RIGHT_CORNER",e[e.BOTTOM_RIGHT_CORNER=1]="BOTTOM_RIGHT_CORNER",e[e.TOP_CENTER=2]="TOP_CENTER"}(Zn||(Zn={})),function(e){e[e.Left=1]="Left",e[e.Center=2]="Center",e[e.Right=4]="Right",e[e.Full=7]="Full"}(ei||(ei={})),function(e){e[e.Left=0]="Left",e[e.Right=1]="Right",e[e.None=2]="None",e[e.LeftOfInjectedText=3]="LeftOfInjectedText",e[e.RightOfInjectedText=4]="RightOfInjectedText"}(ti||(ti={})),function(e){e[e.Off=0]="Off",e[e.On=1]="On",e[e.Relative=2]="Relative",e[e.Interval=3]="Interval",e[e.Custom=4]="Custom"}(ni||(ni={})),function(e){e[e.None=0]="None",e[e.Text=1]="Text",e[e.Blocks=2]="Blocks"}(ii||(ii={})),function(e){e[e.Smooth=0]="Smooth",e[e.Immediate=1]="Immediate"}(ri||(ri={})),function(e){e[e.Auto=1]="Auto",e[e.Hidden=2]="Hidden",e[e.Visible=3]="Visible"}(si||(si={})),function(e){e[e.LTR=0]="LTR",e[e.RTL=1]="RTL"}(oi||(oi={})),function(e){e[e.Invoke=1]="Invoke",e[e.TriggerCharacter=2]="TriggerCharacter",e[e.ContentChange=3]="ContentChange"}(ai||(ai={})),function(e){e[e.File=0]="File",e[e.Module=1]="Module",e[e.Namespace=2]="Namespace",e[e.Package=3]="Package",e[e.Class=4]="Class",e[e.Method=5]="Method",e[e.Property=6]="Property",e[e.Field=7]="Field",e[e.Constructor=8]="Constructor",e[e.Enum=9]="Enum",e[e.Interface=10]="Interface",e[e.Function=11]="Function",e[e.Variable=12]="Variable",e[e.Constant=13]="Constant",e[e.String=14]="String",e[e.Number=15]="Number",e[e.Boolean=16]="Boolean",e[e.Array=17]="Array",e[e.Object=18]="Object",e[e.Key=19]="Key",e[e.Null=20]="Null",e[e.EnumMember=21]="EnumMember",e[e.Struct=22]="Struct",e[e.Event=23]="Event",e[e.Operator=24]="Operator",e[e.TypeParameter=25]="TypeParameter"}(li||(li={})),function(e){e[e.Deprecated=1]="Deprecated"}(ui||(ui={})),function(e){e[e.Hidden=0]="Hidden",e[e.Blink=1]="Blink",e[e.Smooth=2]="Smooth",e[e.Phase=3]="Phase",e[e.Expand=4]="Expand",e[e.Solid=5]="Solid"}(hi||(hi={})),function(e){e[e.Line=1]="Line",e[e.Block=2]="Block",e[e.Underline=3]="Underline",e[e.LineThin=4]="LineThin",e[e.BlockOutline=5]="BlockOutline",e[e.UnderlineThin=6]="UnderlineThin"}(ci||(ci={})),function(e){e[e.AlwaysGrowsWhenTypingAtEdges=0]="AlwaysGrowsWhenTypingAtEdges",e[e.NeverGrowsWhenTypingAtEdges=1]="NeverGrowsWhenTypingAtEdges",e[e.GrowsOnlyWhenTypingBefore=2]="GrowsOnlyWhenTypingBefore",e[e.GrowsOnlyWhenTypingAfter=3]="GrowsOnlyWhenTypingAfter"}(di||(di={})),function(e){e[e.None=0]="None",e[e.Same=1]="Same",e[e.Indent=2]="Indent",e[e.DeepIndent=3]="DeepIndent"}(gi||(gi={}));class mi{static chord(e,t){return function(e,t){return(e|(65535&t)<<16>>>0)>>>0}(e,t)}}mi.CtrlCmd=2048,mi.Shift=1024,mi.Alt=512,mi.WinCtrl=256;class fi extends Wt{constructor(e){super(0);for(let t=0,n=e.length;t<n;t++)this.set(e.charCodeAt(t),2);this.set(32,1),this.set(9,1)}}!function(e){const t={}}((e=>new fi(e)));var pi,bi,_i,vi;!function(e){e[e.Left=1]="Left",e[e.Center=2]="Center",e[e.Right=4]="Right",e[e.Full=7]="Full"}(pi||(pi={})),function(e){e[e.Left=1]="Left",e[e.Right=2]="Right"}(bi||(bi={})),function(e){e[e.Inline=1]="Inline",e[e.Gutter=2]="Gutter"}(_i||(_i={})),function(e){e[e.Both=0]="Both",e[e.Right=1]="Right",e[e.Left=2]="Left",e[e.None=3]="None"}(vi||(vi={}));function yi(e,t,n,i,r){return function(e,t,n,i,r){if(0===i)return!0;const s=t.charCodeAt(i-1);if(0!==e.get(s))return!0;if(13===s||10===s)return!0;if(r>0){const n=t.charCodeAt(i);if(0!==e.get(n))return!0}return!1}(e,t,0,i,r)&&function(e,t,n,i,r){if(i+r===n)return!0;const s=t.charCodeAt(i+r);if(0!==e.get(s))return!0;if(13===s||10===s)return!0;if(r>0){const n=t.charCodeAt(i+r-1);if(0!==e.get(n))return!0}return!1}(e,t,n,i,r)}class Ci{constructor(e,t){this._wordSeparators=e,this._searchRegex=t,this._prevMatchStartIndex=-1,this._prevMatchLength=0}reset(e){this._searchRegex.lastIndex=e,this._prevMatchStartIndex=-1,this._prevMatchLength=0}next(e){const t=e.length;let n;do{if(this._prevMatchStartIndex+this._prevMatchLength===t)return null;if(n=this._searchRegex.exec(e),!n)return null;const i=n.index,r=n[0].length;if(i===this._prevMatchStartIndex&&r===this._prevMatchLength){if(0===r){pe(e,t,this._searchRegex.lastIndex)>65535?this._searchRegex.lastIndex+=2:this._searchRegex.lastIndex+=1;continue}return null}if(this._prevMatchStartIndex=i,this._prevMatchLength=r,!this._wordSeparators||yi(this._wordSeparators,e,t,i,r))return n}while(n);return null}}function Li(e,t="Unreachable"){throw new Error(t)}function wi(e){e()||(e(),t(new l("Assertion Failed")))}function Ni(e,t){let n=0;for(;n<e.length-1;){if(!t(e[n],e[n+1]))return!1;n++}return!0}class Ei{static computeUnicodeHighlights(e,t,n){const i=n?n.startLineNumber:1,r=n?n.endLineNumber:e.getLineCount(),s=new Si(t),o=s.getCandidateCodePoints();let a;a="allNonBasicAscii"===o?new RegExp("[^\\t\\n\\r\\x20-\\x7E]","g"):new RegExp(""+`[${ce(Array.from(o).map((e=>String.fromCodePoint(e))).join(""))}]`,"g");const l=new Ci(null,a),u=[];let h,c=!1,d=0,g=0,m=0;e:for(let f=i,p=r;f<=p;f++){const t=e.getLineContent(f),n=t.length;l.reset(0);do{if(h=l.next(t),h){let e=h.index,i=h.index+h[0].length;if(e>0){ge(t.charCodeAt(e-1))&&e--}if(i+1<n){ge(t.charCodeAt(i-1))&&i++}const r=t.substring(e,i);let o=Bt(e+1,qt,t,0);o&&o.endColumn<=e+1&&(o=null);const a=s.shouldHighlightNonBasicASCII(r,o?o.word:null);if(0!==a){3===a?d++:2===a?g++:1===a?m++:Li();const t=1e3;if(u.length>=t){c=!0;break e}u.push(new xt(f,e+1,f,i+1))}}}while(h)}return{ranges:u,hasMore:c,ambiguousCharacterCount:d,invisibleCharacterCount:g,nonBasicAsciiCharacterCount:m}}static computeUnicodeHighlightReason(e,t){const n=new Si(t);switch(n.shouldHighlightNonBasicASCII(e,null)){case 0:return null;case 2:return{kind:1};case 3:{const i=e.codePointAt(0),r=n.ambiguousCharacters.getPrimaryConfusable(i),s=ve.getLocales().filter((e=>!ve.getInstance(new Set([...t.allowedLocales,e])).isAmbiguous(i)));return{kind:0,confusableWith:String.fromCodePoint(r),notAmbiguousInLocales:s}}case 1:return{kind:2}}}}class Si{constructor(e){this.options=e,this.allowedCodePoints=new Set(e.allowedCodePoints),this.ambiguousCharacters=ve.getInstance(new Set(e.allowedLocales))}getCandidateCodePoints(){if(this.options.nonBasicASCII)return"allNonBasicAscii";const e=new Set;if(this.options.invisibleCharacters)for(const t of ye.codePoints)Ri(String.fromCodePoint(t))||e.add(t);if(this.options.ambiguousCharacters)for(const t of this.ambiguousCharacters.getConfusableCodePoints())e.add(t);for(const t of this.allowedCodePoints)e.delete(t);return e}shouldHighlightNonBasicASCII(e,t){const n=e.codePointAt(0);if(this.allowedCodePoints.has(n))return 0;if(this.options.nonBasicASCII)return 1;let i=!1,r=!1;if(t)for(const o of t){const e=o.codePointAt(0),t=(s=o,be.test(s));i=i||t,t||this.ambiguousCharacters.isAmbiguous(e)||ye.isInvisibleCharacter(e)||(r=!0)}var s;return!i&&r?0:this.options.invisibleCharacters&&!Ri(e)&&ye.isInvisibleCharacter(n)?2:this.options.ambiguousCharacters&&this.ambiguousCharacters.isAmbiguous(n)?3:0}}function Ri(e){return" "===e||"\n"===e||"\t"===e}class Ai{constructor(e,t,n){this.changes=e,this.moves=t,this.hitTimeout=n}}class xi{constructor(e,t){this.lineRangeMapping=e,this.changes=t}}class Mi{static addRange(e,t){let n=0;for(;n<t.length&&t[n].endExclusive<e.start;)n++;let i=n;for(;i<t.length&&t[i].start<=e.endExclusive;)i++;if(n===i)t.splice(n,0,e);else{const r=Math.min(e.start,t[n].start),s=Math.max(e.endExclusive,t[i-1].endExclusive);t.splice(n,i-n,new Mi(r,s))}}static tryCreate(e,t){if(!(e>t))return new Mi(e,t)}static ofLength(e){return new Mi(0,e)}constructor(e,t){if(this.start=e,this.endExclusive=t,e>t)throw new l(`Invalid range: ${this.toString()}`)}get isEmpty(){return this.start===this.endExclusive}delta(e){return new Mi(this.start+e,this.endExclusive+e)}deltaStart(e){return new Mi(this.start+e,this.endExclusive)}deltaEnd(e){return new Mi(this.start,this.endExclusive+e)}get length(){return this.endExclusive-this.start}toString(){return`[${this.start}, ${this.endExclusive})`}equals(e){return this.start===e.start&&this.endExclusive===e.endExclusive}containsRange(e){return this.start<=e.start&&e.endExclusive<=this.endExclusive}contains(e){return this.start<=e&&e<this.endExclusive}join(e){return new Mi(Math.min(this.start,e.start),Math.max(this.endExclusive,e.endExclusive))}intersect(e){const t=Math.max(this.start,e.start),n=Math.min(this.endExclusive,e.endExclusive);if(t<=n)return new Mi(t,n)}slice(e){return e.slice(this.start,this.endExclusive)}clip(e){if(this.isEmpty)throw new l(`Invalid clipping range: ${this.toString()}`);return Math.max(this.start,Math.min(this.endExclusive-1,e))}clipCyclic(e){if(this.isEmpty)throw new l(`Invalid clipping range: ${this.toString()}`);return e<this.start?this.endExclusive-(this.start-e)%this.length:e>=this.endExclusive?this.start+(e-this.start)%this.length:e}forEach(e){for(let t=this.start;t<this.endExclusive;t++)e(t)}}function ki(e,t){const n=Ti(e,t);return-1===n?void 0:e[n]}function Ti(e,t,n=0,i=e.length){let r=n,s=i;for(;r<s;){const n=Math.floor((r+s)/2);t(e[n])?r=n+1:s=n}return r-1}function Oi(e,t,n=0,i=e.length){let r=n,s=i;for(;r<s;){const n=Math.floor((r+s)/2);t(e[n])?s=n:r=n+1}return r}class Ii{constructor(e){this._array=e,this._findLastMonotonousLastIdx=0}findLastMonotonous(e){if(Ii.assertInvariants){if(this._prevFindLastPredicate)for(const t of this._array)if(this._prevFindLastPredicate(t)&&!e(t))throw new Error("MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.");this._prevFindLastPredicate=e}const t=Ti(this._array,e,this._findLastMonotonousLastIdx);return this._findLastMonotonousLastIdx=t+1,-1===t?void 0:this._array[t]}}Ii.assertInvariants=!1;class Pi{static fromRange(e){return new Pi(e.startLineNumber,e.endLineNumber)}static joinMany(e){if(0===e.length)return[];let t=new Di(e[0].slice());for(let n=1;n<e.length;n++)t=t.getUnion(new Di(e[n].slice()));return t.ranges}static ofLength(e,t){return new Pi(e,e+t)}static deserialize(e){return new Pi(e[0],e[1])}constructor(e,t){if(e>t)throw new l(`startLineNumber ${e} cannot be after endLineNumberExclusive ${t}`);this.startLineNumber=e,this.endLineNumberExclusive=t}contains(e){return this.startLineNumber<=e&&e<this.endLineNumberExclusive}get isEmpty(){return this.startLineNumber===this.endLineNumberExclusive}delta(e){return new Pi(this.startLineNumber+e,this.endLineNumberExclusive+e)}deltaLength(e){return new Pi(this.startLineNumber,this.endLineNumberExclusive+e)}get length(){return this.endLineNumberExclusive-this.startLineNumber}join(e){return new Pi(Math.min(this.startLineNumber,e.startLineNumber),Math.max(this.endLineNumberExclusive,e.endLineNumberExclusive))}toString(){return`[${this.startLineNumber},${this.endLineNumberExclusive})`}intersect(e){const t=Math.max(this.startLineNumber,e.startLineNumber),n=Math.min(this.endLineNumberExclusive,e.endLineNumberExclusive);if(t<=n)return new Pi(t,n)}intersectsStrict(e){return this.startLineNumber<e.endLineNumberExclusive&&e.startLineNumber<this.endLineNumberExclusive}overlapOrTouch(e){return this.startLineNumber<=e.endLineNumberExclusive&&e.startLineNumber<=this.endLineNumberExclusive}equals(e){return this.startLineNumber===e.startLineNumber&&this.endLineNumberExclusive===e.endLineNumberExclusive}toInclusiveRange(){return this.isEmpty?null:new xt(this.startLineNumber,1,this.endLineNumberExclusive-1,Number.MAX_SAFE_INTEGER)}toExclusiveRange(){return new xt(this.startLineNumber,1,this.endLineNumberExclusive,1)}mapToLineArray(e){const t=[];for(let n=this.startLineNumber;n<this.endLineNumberExclusive;n++)t.push(e(n));return t}forEach(e){for(let t=this.startLineNumber;t<this.endLineNumberExclusive;t++)e(t)}serialize(){return[this.startLineNumber,this.endLineNumberExclusive]}includes(e){return this.startLineNumber<=e&&e<this.endLineNumberExclusive}toOffsetRange(){return new Mi(this.startLineNumber-1,this.endLineNumberExclusive-1)}}class Di{constructor(e=[]){this._normalizedRanges=e}get ranges(){return this._normalizedRanges}addRange(e){if(0===e.length)return;const t=Oi(this._normalizedRanges,(t=>t.endLineNumberExclusive>=e.startLineNumber)),n=Ti(this._normalizedRanges,(t=>t.startLineNumber<=e.endLineNumberExclusive))+1;if(t===n)this._normalizedRanges.splice(t,0,e);else if(t===n-1){const n=this._normalizedRanges[t];this._normalizedRanges[t]=n.join(e)}else{const i=this._normalizedRanges[t].join(this._normalizedRanges[n-1]).join(e);this._normalizedRanges.splice(t,n-t,i)}}contains(e){const t=ki(this._normalizedRanges,(t=>t.startLineNumber<=e));return!!t&&t.endLineNumberExclusive>e}getUnion(e){if(0===this._normalizedRanges.length)return e;if(0===e._normalizedRanges.length)return this;const t=[];let n=0,i=0,r=null;for(;n<this._normalizedRanges.length||i<e._normalizedRanges.length;){let s=null;if(n<this._normalizedRanges.length&&i<e._normalizedRanges.length){const t=this._normalizedRanges[n],r=e._normalizedRanges[i];t.startLineNumber<r.startLineNumber?(s=t,n++):(s=r,i++)}else n<this._normalizedRanges.length?(s=this._normalizedRanges[n],n++):(s=e._normalizedRanges[i],i++);null===r?r=s:r.endLineNumberExclusive>=s.startLineNumber?r=new Pi(r.startLineNumber,Math.max(r.endLineNumberExclusive,s.endLineNumberExclusive)):(t.push(r),r=s)}return null!==r&&t.push(r),new Di(t)}subtractFrom(e){const t=Oi(this._normalizedRanges,(t=>t.endLineNumberExclusive>=e.startLineNumber)),n=Ti(this._normalizedRanges,(t=>t.startLineNumber<=e.endLineNumberExclusive))+1;if(t===n)return new Di([e]);const i=[];let r=e.startLineNumber;for(let s=t;s<n;s++){const e=this._normalizedRanges[s];e.startLineNumber>r&&i.push(new Pi(r,e.startLineNumber)),r=e.endLineNumberExclusive}return r<e.endLineNumberExclusive&&i.push(new Pi(r,e.endLineNumberExclusive)),new Di(i)}toString(){return this._normalizedRanges.map((e=>e.toString())).join(", ")}getIntersection(e){const t=[];let n=0,i=0;for(;n<this._normalizedRanges.length&&i<e._normalizedRanges.length;){const r=this._normalizedRanges[n],s=e._normalizedRanges[i],o=r.intersect(s);o&&!o.isEmpty&&t.push(o),r.endLineNumberExclusive<s.endLineNumberExclusive?n++:i++}return new Di(t)}getWithDelta(e){return new Di(this._normalizedRanges.map((t=>t.delta(e))))}}class Ki{static inverse(e,t,n){const i=[];let r=1,s=1;for(const a of e){const e=new Fi(new Pi(r,a.original.startLineNumber),new Pi(s,a.modified.startLineNumber),void 0);e.modified.isEmpty||i.push(e),r=a.original.endLineNumberExclusive,s=a.modified.endLineNumberExclusive}const o=new Fi(new Pi(r,t+1),new Pi(s,n+1),void 0);return o.modified.isEmpty||i.push(o),i}constructor(e,t){this.original=e,this.modified=t}toString(){return`{${this.original.toString()}->${this.modified.toString()}}`}flip(){return new Ki(this.modified,this.original)}join(e){return new Ki(this.original.join(e.original),this.modified.join(e.modified))}}class Fi extends Ki{constructor(e,t,n){super(e,t),this.innerChanges=n}flip(){var e;return new Fi(this.modified,this.original,null===(e=this.innerChanges)||void 0===e?void 0:e.map((e=>e.flip())))}}class qi{constructor(e,t){this.originalRange=e,this.modifiedRange=t}toString(){return`{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`}flip(){return new qi(this.modifiedRange,this.originalRange)}}class Vi{computeDiff(e,t,n){var i;const r=new $i(e,t,{maxComputationTime:n.maxComputationTimeMs,shouldIgnoreTrimWhitespace:n.ignoreTrimWhitespace,shouldComputeCharChanges:!0,shouldMakePrettyDiff:!0,shouldPostProcessCharChanges:!0}).computeDiff(),s=[];let o=null;for(const a of r.changes){let e,t;e=0===a.originalEndLineNumber?new Pi(a.originalStartLineNumber+1,a.originalStartLineNumber+1):new Pi(a.originalStartLineNumber,a.originalEndLineNumber+1),t=0===a.modifiedEndLineNumber?new Pi(a.modifiedStartLineNumber+1,a.modifiedStartLineNumber+1):new Pi(a.modifiedStartLineNumber,a.modifiedEndLineNumber+1);let n=new Fi(e,t,null===(i=a.charChanges)||void 0===i?void 0:i.map((e=>new qi(new xt(e.originalStartLineNumber,e.originalStartColumn,e.originalEndLineNumber,e.originalEndColumn),new xt(e.modifiedStartLineNumber,e.modifiedStartColumn,e.modifiedEndLineNumber,e.modifiedEndColumn)))));o&&(o.modified.endLineNumberExclusive!==n.modified.startLineNumber&&o.original.endLineNumberExclusive!==n.original.startLineNumber||(n=new Fi(o.original.join(n.original),o.modified.join(n.modified),o.innerChanges&&n.innerChanges?o.innerChanges.concat(n.innerChanges):void 0),s.pop())),s.push(n),o=n}return wi((()=>Ni(s,((e,t)=>t.original.startLineNumber-e.original.endLineNumberExclusive==t.modified.startLineNumber-e.modified.endLineNumberExclusive&&e.original.endLineNumberExclusive<t.original.startLineNumber&&e.modified.endLineNumberExclusive<t.modified.startLineNumber)))),new Ai(s,[],r.quitEarly)}}function Bi(e,t,n,i){return new He(e,t,n).ComputeDiff(i)}class Ui{constructor(e){const t=[],n=[];for(let i=0,r=e.length;i<r;i++)t[i]=ji(e[i],1),n[i]=Gi(e[i],1);this.lines=e,this._startColumns=t,this._endColumns=n}getElements(){const e=[];for(let t=0,n=this.lines.length;t<n;t++)e[t]=this.lines[t].substring(this._startColumns[t]-1,this._endColumns[t]-1);return e}getStrictElement(e){return this.lines[e]}getStartLineNumber(e){return e+1}getEndLineNumber(e){return e+1}createCharSequence(e,t,n){const i=[],r=[],s=[];let o=0;for(let a=t;a<=n;a++){const t=this.lines[a],l=e?this._startColumns[a]:1,u=e?this._endColumns[a]:t.length+1;for(let e=l;e<u;e++)i[o]=t.charCodeAt(e-1),r[o]=a+1,s[o]=e,o++;!e&&a<n&&(i[o]=10,r[o]=a+1,s[o]=t.length+1,o++)}return new Wi(i,r,s)}}class Wi{constructor(e,t,n){this._charCodes=e,this._lineNumbers=t,this._columns=n}toString(){return"["+this._charCodes.map(((e,t)=>(10===e?"\\n":String.fromCharCode(e))+`-(${this._lineNumbers[t]},${this._columns[t]})`)).join(", ")+"]"}_assertIndex(e,t){if(e<0||e>=t.length)throw new Error("Illegal index")}getElements(){return this._charCodes}getStartLineNumber(e){return e>0&&e===this._lineNumbers.length?this.getEndLineNumber(e-1):(this._assertIndex(e,this._lineNumbers),this._lineNumbers[e])}getEndLineNumber(e){return-1===e?this.getStartLineNumber(e+1):(this._assertIndex(e,this._lineNumbers),10===this._charCodes[e]?this._lineNumbers[e]+1:this._lineNumbers[e])}getStartColumn(e){return e>0&&e===this._columns.length?this.getEndColumn(e-1):(this._assertIndex(e,this._columns),this._columns[e])}getEndColumn(e){return-1===e?this.getStartColumn(e+1):(this._assertIndex(e,this._columns),10===this._charCodes[e]?1:this._columns[e]+1)}}class Hi{constructor(e,t,n,i,r,s,o,a){this.originalStartLineNumber=e,this.originalStartColumn=t,this.originalEndLineNumber=n,this.originalEndColumn=i,this.modifiedStartLineNumber=r,this.modifiedStartColumn=s,this.modifiedEndLineNumber=o,this.modifiedEndColumn=a}static createFromDiffChange(e,t,n){const i=t.getStartLineNumber(e.originalStart),r=t.getStartColumn(e.originalStart),s=t.getEndLineNumber(e.originalStart+e.originalLength-1),o=t.getEndColumn(e.originalStart+e.originalLength-1),a=n.getStartLineNumber(e.modifiedStart),l=n.getStartColumn(e.modifiedStart),u=n.getEndLineNumber(e.modifiedStart+e.modifiedLength-1),h=n.getEndColumn(e.modifiedStart+e.modifiedLength-1);return new Hi(i,r,s,o,a,l,u,h)}}class zi{constructor(e,t,n,i,r){this.originalStartLineNumber=e,this.originalEndLineNumber=t,this.modifiedStartLineNumber=n,this.modifiedEndLineNumber=i,this.charChanges=r}static createFromDiffResult(e,t,n,i,r,s,o){let a,l,u,h,c;if(0===t.originalLength?(a=n.getStartLineNumber(t.originalStart)-1,l=0):(a=n.getStartLineNumber(t.originalStart),l=n.getEndLineNumber(t.originalStart+t.originalLength-1)),0===t.modifiedLength?(u=i.getStartLineNumber(t.modifiedStart)-1,h=0):(u=i.getStartLineNumber(t.modifiedStart),h=i.getEndLineNumber(t.modifiedStart+t.modifiedLength-1)),s&&t.originalLength>0&&t.originalLength<20&&t.modifiedLength>0&&t.modifiedLength<20&&r()){const s=n.createCharSequence(e,t.originalStart,t.originalStart+t.originalLength-1),a=i.createCharSequence(e,t.modifiedStart,t.modifiedStart+t.modifiedLength-1);if(s.getElements().length>0&&a.getElements().length>0){let e=Bi(s,a,r,!0).changes;o&&(e=function(e){if(e.length<=1)return e;const t=[e[0]];let n=t[0];for(let i=1,r=e.length;i<r;i++){const r=e[i],s=r.originalStart-(n.originalStart+n.originalLength),o=r.modifiedStart-(n.modifiedStart+n.modifiedLength);Math.min(s,o)<3?(n.originalLength=r.originalStart+r.originalLength-n.originalStart,n.modifiedLength=r.modifiedStart+r.modifiedLength-n.modifiedStart):(t.push(r),n=r)}return t}(e)),c=[];for(let t=0,n=e.length;t<n;t++)c.push(Hi.createFromDiffChange(e[t],s,a))}}return new zi(a,l,u,h,c)}}class $i{constructor(e,t,n){this.shouldComputeCharChanges=n.shouldComputeCharChanges,this.shouldPostProcessCharChanges=n.shouldPostProcessCharChanges,this.shouldIgnoreTrimWhitespace=n.shouldIgnoreTrimWhitespace,this.shouldMakePrettyDiff=n.shouldMakePrettyDiff,this.originalLines=e,this.modifiedLines=t,this.original=new Ui(e),this.modified=new Ui(t),this.continueLineDiff=Qi(n.maxComputationTime),this.continueCharDiff=Qi(0===n.maxComputationTime?0:Math.min(n.maxComputationTime,5e3))}computeDiff(){if(1===this.original.lines.length&&0===this.original.lines[0].length)return 1===this.modified.lines.length&&0===this.modified.lines[0].length?{quitEarly:!1,changes:[]}:{quitEarly:!1,changes:[{originalStartLineNumber:1,originalEndLineNumber:1,modifiedStartLineNumber:1,modifiedEndLineNumber:this.modified.lines.length,charChanges:void 0}]};if(1===this.modified.lines.length&&0===this.modified.lines[0].length)return{quitEarly:!1,changes:[{originalStartLineNumber:1,originalEndLineNumber:this.original.lines.length,modifiedStartLineNumber:1,modifiedEndLineNumber:1,charChanges:void 0}]};const e=Bi(this.original,this.modified,this.continueLineDiff,this.shouldMakePrettyDiff),t=e.changes,n=e.quitEarly;if(this.shouldIgnoreTrimWhitespace){const e=[];for(let n=0,i=t.length;n<i;n++)e.push(zi.createFromDiffResult(this.shouldIgnoreTrimWhitespace,t[n],this.original,this.modified,this.continueCharDiff,this.shouldComputeCharChanges,this.shouldPostProcessCharChanges));return{quitEarly:n,changes:e}}const i=[];let r=0,s=0;for(let o=-1,a=t.length;o<a;o++){const e=o+1<a?t[o+1]:null,n=e?e.originalStart:this.originalLines.length,l=e?e.modifiedStart:this.modifiedLines.length;for(;r<n&&s<l;){const e=this.originalLines[r],t=this.modifiedLines[s];if(e!==t){{let n=ji(e,1),o=ji(t,1);for(;n>1&&o>1;){if(e.charCodeAt(n-2)!==t.charCodeAt(o-2))break;n--,o--}(n>1||o>1)&&this._pushTrimWhitespaceCharChange(i,r+1,1,n,s+1,1,o)}{let n=Gi(e,1),o=Gi(t,1);const a=e.length+1,l=t.length+1;for(;n<a&&o<l;){if(e.charCodeAt(n-1)!==e.charCodeAt(o-1))break;n++,o++}(n<a||o<l)&&this._pushTrimWhitespaceCharChange(i,r+1,n,a,s+1,o,l)}}r++,s++}e&&(i.push(zi.createFromDiffResult(this.shouldIgnoreTrimWhitespace,e,this.original,this.modified,this.continueCharDiff,this.shouldComputeCharChanges,this.shouldPostProcessCharChanges)),r+=e.originalLength,s+=e.modifiedLength)}return{quitEarly:n,changes:i}}_pushTrimWhitespaceCharChange(e,t,n,i,r,s,o){if(this._mergeTrimWhitespaceCharChange(e,t,n,i,r,s,o))return;let a;this.shouldComputeCharChanges&&(a=[new Hi(t,n,t,i,r,s,r,o)]),e.push(new zi(t,t,r,r,a))}_mergeTrimWhitespaceCharChange(e,t,n,i,r,s,o){const a=e.length;if(0===a)return!1;const l=e[a-1];return 0!==l.originalEndLineNumber&&0!==l.modifiedEndLineNumber&&(l.originalEndLineNumber===t&&l.modifiedEndLineNumber===r?(this.shouldComputeCharChanges&&l.charChanges&&l.charChanges.push(new Hi(t,n,t,i,r,s,r,o)),!0):l.originalEndLineNumber+1===t&&l.modifiedEndLineNumber+1===r&&(l.originalEndLineNumber=t,l.modifiedEndLineNumber=r,this.shouldComputeCharChanges&&l.charChanges&&l.charChanges.push(new Hi(t,n,t,i,r,s,r,o)),!0))}}function ji(e,t){const n=function(e){for(let t=0,n=e.length;t<n;t++){const n=e.charCodeAt(t);if(32!==n&&9!==n)return t}return-1}(e);return-1===n?t:n+1}function Gi(e,t){const n=function(e,t=e.length-1){for(let n=t;n>=0;n--){const t=e.charCodeAt(n);if(32!==t&&9!==t)return n}return-1}(e);return-1===n?t:n+2}function Qi(e){if(0===e)return()=>!0;const t=Date.now();return()=>Date.now()-t<e}class Yi{static trivial(e,t){return new Yi([new Xi(Mi.ofLength(e.length),Mi.ofLength(t.length))],!1)}static trivialTimedOut(e,t){return new Yi([new Xi(Mi.ofLength(e.length),Mi.ofLength(t.length))],!0)}constructor(e,t){this.diffs=e,this.hitTimeout=t}}class Xi{static invert(e,t){const n=[];return function(e,t){for(let n=0;n<=e.length;n++)t(0===n?void 0:e[n-1],n===e.length?void 0:e[n])}(e,((e,i)=>{n.push(Xi.fromOffsetPairs(e?e.getEndExclusives():Ji.zero,i?i.getStarts():new Ji(t,(e?e.seq2Range.endExclusive-e.seq1Range.endExclusive:0)+t)))})),n}static fromOffsetPairs(e,t){return new Xi(new Mi(e.offset1,t.offset1),new Mi(e.offset2,t.offset2))}constructor(e,t){this.seq1Range=e,this.seq2Range=t}swap(){return new Xi(this.seq2Range,this.seq1Range)}toString(){return`${this.seq1Range} <-> ${this.seq2Range}`}join(e){return new Xi(this.seq1Range.join(e.seq1Range),this.seq2Range.join(e.seq2Range))}delta(e){return 0===e?this:new Xi(this.seq1Range.delta(e),this.seq2Range.delta(e))}deltaStart(e){return 0===e?this:new Xi(this.seq1Range.deltaStart(e),this.seq2Range.deltaStart(e))}deltaEnd(e){return 0===e?this:new Xi(this.seq1Range.deltaEnd(e),this.seq2Range.deltaEnd(e))}intersect(e){const t=this.seq1Range.intersect(e.seq1Range),n=this.seq2Range.intersect(e.seq2Range);if(t&&n)return new Xi(t,n)}getStarts(){return new Ji(this.seq1Range.start,this.seq2Range.start)}getEndExclusives(){return new Ji(this.seq1Range.endExclusive,this.seq2Range.endExclusive)}}class Ji{constructor(e,t){this.offset1=e,this.offset2=t}toString(){return`${this.offset1} <-> ${this.offset2}`}}Ji.zero=new Ji(0,0),Ji.max=new Ji(Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER);class Zi{isValid(){return!0}}Zi.instance=new Zi;class er{constructor(e){if(this.timeout=e,this.startTime=Date.now(),this.valid=!0,e<=0)throw new l("timeout must be positive")}isValid(){return!(Date.now()-this.startTime<this.timeout)&&this.valid&&(this.valid=!1),this.valid}}class tr{constructor(e,t){this.width=e,this.height=t,this.array=[],this.array=new Array(e*t)}get(e,t){return this.array[e+t*this.width]}set(e,t,n){this.array[e+t*this.width]=n}}function nr(e){return 32===e||9===e}class ir{static getKey(e){let t=this.chrKeys.get(e);return void 0===t&&(t=this.chrKeys.size,this.chrKeys.set(e,t)),t}constructor(e,t,n){this.range=e,this.lines=t,this.source=n,this.histogram=[];let i=0;for(let r=e.startLineNumber-1;r<e.endLineNumberExclusive-1;r++){const e=t[r];for(let t=0;t<e.length;t++){i++;const n=e[t],r=ir.getKey(n);this.histogram[r]=(this.histogram[r]||0)+1}i++;const n=ir.getKey("\n");this.histogram[n]=(this.histogram[n]||0)+1}this.totalCount=i}computeSimilarity(e){var t,n;let i=0;const r=Math.max(this.histogram.length,e.histogram.length);for(let s=0;s<r;s++)i+=Math.abs((null!==(t=this.histogram[s])&&void 0!==t?t:0)-(null!==(n=e.histogram[s])&&void 0!==n?n:0));return 1-i/(this.totalCount+e.totalCount)}}ir.chrKeys=new Map;class rr{compute(e,t,n=Zi.instance,i){if(0===e.length||0===t.length)return Yi.trivial(e,t);const r=new tr(e.length,t.length),s=new tr(e.length,t.length),o=new tr(e.length,t.length);for(let g=0;g<e.length;g++)for(let a=0;a<t.length;a++){if(!n.isValid())return Yi.trivialTimedOut(e,t);const l=0===g?0:r.get(g-1,a),u=0===a?0:r.get(g,a-1);let h;e.getElement(g)===t.getElement(a)?(h=0===g||0===a?0:r.get(g-1,a-1),g>0&&a>0&&3===s.get(g-1,a-1)&&(h+=o.get(g-1,a-1)),h+=i?i(g,a):1):h=-1;const c=Math.max(l,u,h);if(c===h){const e=g>0&&a>0?o.get(g-1,a-1):0;o.set(g,a,e+1),s.set(g,a,3)}else c===l?(o.set(g,a,0),s.set(g,a,1)):c===u&&(o.set(g,a,0),s.set(g,a,2));r.set(g,a,c)}const a=[];let l=e.length,u=t.length;function h(e,t){e+1===l&&t+1===u||a.push(new Xi(new Mi(e+1,l),new Mi(t+1,u))),l=e,u=t}let c=e.length-1,d=t.length-1;for(;c>=0&&d>=0;)3===s.get(c,d)?(h(c,d),c--,d--):1===s.get(c,d)?c--:d--;return h(-1,-1),a.reverse(),new Yi(a,!1)}}class sr{compute(e,t,n=Zi.instance){if(0===e.length||0===t.length)return Yi.trivial(e,t);const i=e,r=t;function s(e,t){for(;e<i.length&&t<r.length&&i.getElement(e)===r.getElement(t);)e++,t++;return e}let o=0;const a=new ar;a.set(0,s(0,0));const l=new lr;l.set(0,0===a.get(0)?null:new or(null,0,0,a.get(0)));let u=0;e:for(;;){if(o++,!n.isValid())return Yi.trivialTimedOut(i,r);const e=-Math.min(o,r.length+o%2),t=Math.min(o,i.length+o%2);for(u=e;u<=t;u+=2){let n=0;const o=u===t?-1:a.get(u+1),h=u===e?-1:a.get(u-1)+1;n++;const c=Math.min(Math.max(o,h),i.length),d=c-u;if(n++,c>i.length||d>r.length)continue;const g=s(c,d);a.set(u,g);const m=c===o?l.get(u+1):l.get(u-1);if(l.set(u,g!==c?new or(m,c,d,g-c):m),a.get(u)===i.length&&a.get(u)-u===r.length)break e}}let h=l.get(u);const c=[];let d=i.length,g=r.length;for(;;){const e=h?h.x+h.length:0,t=h?h.y+h.length:0;if(e===d&&t===g||c.push(new Xi(new Mi(e,d),new Mi(t,g))),!h)break;d=h.x,g=h.y,h=h.prev}return c.reverse(),new Yi(c,!1)}}class or{constructor(e,t,n,i){this.prev=e,this.x=t,this.y=n,this.length=i}}class ar{constructor(){this.positiveArr=new Int32Array(10),this.negativeArr=new Int32Array(10)}get(e){return e<0?(e=-e-1,this.negativeArr[e]):this.positiveArr[e]}set(e,t){if(e<0){if((e=-e-1)>=this.negativeArr.length){const e=this.negativeArr;this.negativeArr=new Int32Array(2*e.length),this.negativeArr.set(e)}this.negativeArr[e]=t}else{if(e>=this.positiveArr.length){const e=this.positiveArr;this.positiveArr=new Int32Array(2*e.length),this.positiveArr.set(e)}this.positiveArr[e]=t}}}class lr{constructor(){this.positiveArr=[],this.negativeArr=[]}get(e){return e<0?(e=-e-1,this.negativeArr[e]):this.positiveArr[e]}set(e,t){e<0?(e=-e-1,this.negativeArr[e]=t):this.positiveArr[e]=t}}var ur;class hr{constructor(e,t){this.uri=e,this.value=t}}class cr{constructor(e,t){if(this[ur]="ResourceMap",e instanceof cr)this.map=new Map(e.map),this.toKey=null!=t?t:cr.defaultToKey;else if(function(e){return Array.isArray(e)}(e)){this.map=new Map,this.toKey=null!=t?t:cr.defaultToKey;for(const[t,n]of e)this.set(t,n)}else this.map=new Map,this.toKey=null!=e?e:cr.defaultToKey}set(e,t){return this.map.set(this.toKey(e),new hr(e,t)),this}get(e){var t;return null===(t=this.map.get(this.toKey(e)))||void 0===t?void 0:t.value}has(e){return this.map.has(this.toKey(e))}get size(){return this.map.size}clear(){this.map.clear()}delete(e){return this.map.delete(this.toKey(e))}forEach(e,t){void 0!==t&&(e=e.bind(t));for(const[n,i]of this.map)e(i.value,i.uri,this)}*values(){for(const e of this.map.values())yield e.value}*keys(){for(const e of this.map.values())yield e.uri}*entries(){for(const e of this.map.values())yield[e.uri,e.value]}*[(ur=Symbol.toStringTag,Symbol.iterator)](){for(const[,e]of this.map)yield[e.uri,e.value]}}cr.defaultToKey=e=>e.toString();Symbol.toStringTag,Symbol.iterator;class dr{constructor(){this.map=new Map}add(e,t){let n=this.map.get(e);n||(n=new Set,this.map.set(e,n)),n.add(t)}delete(e,t){const n=this.map.get(e);n&&(n.delete(t),0===n.size&&this.map.delete(e))}forEach(e,t){const n=this.map.get(e);n&&n.forEach(t)}get(e){const t=this.map.get(e);return t||new Set}}class gr{constructor(e,t,n){this.lines=e,this.considerWhitespaceChanges=n,this.elements=[],this.firstCharOffsetByLine=[],this.additionalOffsetByLine=[];let i=!1;t.start>0&&t.endExclusive>=e.length&&(t=new Mi(t.start-1,t.endExclusive),i=!0),this.lineRange=t,this.firstCharOffsetByLine[0]=0;for(let r=this.lineRange.start;r<this.lineRange.endExclusive;r++){let t=e[r],s=0;if(i)s=t.length,t="",i=!1;else if(!n){const e=t.trimStart();s=t.length-e.length,t=e.trimEnd()}this.additionalOffsetByLine.push(s);for(let e=0;e<t.length;e++)this.elements.push(t.charCodeAt(e));r<e.length-1&&(this.elements.push("\n".charCodeAt(0)),this.firstCharOffsetByLine[r-this.lineRange.start+1]=this.elements.length)}this.additionalOffsetByLine.push(0)}toString(){return`Slice: "${this.text}"`}get text(){return this.getText(new Mi(0,this.length))}getText(e){return this.elements.slice(e.start,e.endExclusive).map((e=>String.fromCharCode(e))).join("")}getElement(e){return this.elements[e]}get length(){return this.elements.length}getBoundaryScore(e){const t=br(e>0?this.elements[e-1]:-1),n=br(e<this.elements.length?this.elements[e]:-1);if(6===t&&7===n)return 0;let i=0;return t!==n&&(i+=10,0===t&&1===n&&(i+=1)),i+=pr(t),i+=pr(n),i}translateOffset(e){if(this.lineRange.isEmpty)return new At(this.lineRange.start+1,1);const t=Ti(this.firstCharOffsetByLine,(t=>t<=e));return new At(this.lineRange.start+t+1,e-this.firstCharOffsetByLine[t]+this.additionalOffsetByLine[t]+1)}translateRange(e){return xt.fromPositions(this.translateOffset(e.start),this.translateOffset(e.endExclusive))}findWordContaining(e){if(e<0||e>=this.elements.length)return;if(!mr(this.elements[e]))return;let t=e;for(;t>0&&mr(this.elements[t-1]);)t--;let n=e;for(;n<this.elements.length&&mr(this.elements[n]);)n++;return new Mi(t,n)}countLinesIn(e){return this.translateOffset(e.endExclusive).lineNumber-this.translateOffset(e.start).lineNumber}isStronglyEqual(e,t){return this.elements[e]===this.elements[t]}extendToFullLines(e){var t,n;const i=null!==(t=ki(this.firstCharOffsetByLine,(t=>t<=e.start)))&&void 0!==t?t:0,r=null!==(n=function(e,t){const n=Oi(e,t);return n===e.length?void 0:e[n]}(this.firstCharOffsetByLine,(t=>e.endExclusive<=t)))&&void 0!==n?n:this.elements.length;return new Mi(i,r)}}function mr(e){return e>=97&&e<=122||e>=65&&e<=90||e>=48&&e<=57}const fr={0:0,1:0,2:0,3:10,4:2,5:3,6:10,7:10};function pr(e){return fr[e]}function br(e){return 10===e?7:13===e?6:nr(e)?5:e>=97&&e<=122?0:e>=65&&e<=90?1:e>=48&&e<=57?2:-1===e?3:4}function _r(e,t,n,i,r,s){let{moves:o,excludedChanges:a}=function(e,t,n,i){const r=[],s=e.filter((e=>e.modified.isEmpty&&e.original.length>=3)).map((e=>new ir(e.original,t,e))),o=new Set(e.filter((e=>e.original.isEmpty&&e.modified.length>=3)).map((e=>new ir(e.modified,n,e)))),a=new Set;for(const l of s){let e,t=-1;for(const n of o){const i=l.computeSimilarity(n);i>t&&(t=i,e=n)}if(t>.9&&e&&(o.delete(e),r.push(new Ki(l.range,e.range)),a.add(l.source),a.add(e.source)),!i.isValid())return{moves:r,excludedChanges:a}}return{moves:r,excludedChanges:a}}(e,t,n,s);if(!s.isValid())return[];const l=function(e,t,n,i,r,s){const o=[],a=new dr;for(const g of e)for(let e=g.original.startLineNumber;e<g.original.endLineNumberExclusive-2;e++){const n=`${t[e-1]}:${t[e+1-1]}:${t[e+2-1]}`;a.add(n,{range:new Pi(e,e+3)})}const l=[];e.sort(kt((e=>e.modified.startLineNumber),Tt));for(const g of e){let e=[];for(let t=g.modified.startLineNumber;t<g.modified.endLineNumberExclusive-2;t++){const i=`${n[t-1]}:${n[t+1-1]}:${n[t+2-1]}`,r=new Pi(t,t+3),s=[];a.forEach(i,(({range:t})=>{for(const i of e)if(i.originalLineRange.endLineNumberExclusive+1===t.endLineNumberExclusive&&i.modifiedLineRange.endLineNumberExclusive+1===r.endLineNumberExclusive)return i.originalLineRange=new Pi(i.originalLineRange.startLineNumber,t.endLineNumberExclusive),i.modifiedLineRange=new Pi(i.modifiedLineRange.startLineNumber,r.endLineNumberExclusive),void s.push(i);const n={modifiedLineRange:r,originalLineRange:t};l.push(n),s.push(n)})),e=s}if(!s.isValid())return[]}l.sort((u=kt((e=>e.modifiedLineRange.length),Tt),(e,t)=>-u(e,t)));var u;const h=new Di,c=new Di;for(const g of l){const e=g.modifiedLineRange.startLineNumber-g.originalLineRange.startLineNumber,t=h.subtractFrom(g.modifiedLineRange),n=c.subtractFrom(g.originalLineRange).getWithDelta(e),i=t.getIntersection(n);for(const r of i.ranges){if(r.length<3)continue;const t=r,n=r.delta(-e);o.push(new Ki(n,t)),h.addRange(t),c.addRange(n)}}o.sort(kt((e=>e.original.startLineNumber),Tt));const d=new Ii(e);for(let g=0;g<o.length;g++){const t=o[g],n=d.findLastMonotonous((e=>e.original.startLineNumber<=t.original.startLineNumber)),a=ki(e,(e=>e.modified.startLineNumber<=t.modified.startLineNumber)),l=Math.max(t.original.startLineNumber-n.original.startLineNumber,t.modified.startLineNumber-a.modified.startLineNumber),u=d.findLastMonotonous((e=>e.original.startLineNumber<t.original.endLineNumberExclusive)),m=ki(e,(e=>e.modified.startLineNumber<t.modified.endLineNumberExclusive)),f=Math.max(u.original.endLineNumberExclusive-t.original.endLineNumberExclusive,m.modified.endLineNumberExclusive-t.modified.endLineNumberExclusive);let p,b;for(p=0;p<l;p++){const e=t.original.startLineNumber-p-1,n=t.modified.startLineNumber-p-1;if(e>i.length||n>r.length)break;if(h.contains(n)||c.contains(e))break;if(!vr(i[e-1],r[n-1],s))break}for(p>0&&(c.addRange(new Pi(t.original.startLineNumber-p,t.original.startLineNumber)),h.addRange(new Pi(t.modified.startLineNumber-p,t.modified.startLineNumber))),b=0;b<f;b++){const e=t.original.endLineNumberExclusive+b,n=t.modified.endLineNumberExclusive+b;if(e>i.length||n>r.length)break;if(h.contains(n)||c.contains(e))break;if(!vr(i[e-1],r[n-1],s))break}b>0&&(c.addRange(new Pi(t.original.endLineNumberExclusive,t.original.endLineNumberExclusive+b)),h.addRange(new Pi(t.modified.endLineNumberExclusive,t.modified.endLineNumberExclusive+b))),(p>0||b>0)&&(o[g]=new Ki(new Pi(t.original.startLineNumber-p,t.original.endLineNumberExclusive+b),new Pi(t.modified.startLineNumber-p,t.modified.endLineNumberExclusive+b)))}return o}(e.filter((e=>!a.has(e))),i,r,t,n,s);return function(e,t){for(const n of t)e.push(n)}(o,l),o=function(e){if(0===e.length)return e;e.sort(kt((e=>e.original.startLineNumber),Tt));const t=[e[0]];for(let n=1;n<e.length;n++){const i=t[t.length-1],r=e[n],s=r.original.startLineNumber-i.original.endLineNumberExclusive,o=r.modified.startLineNumber-i.modified.endLineNumberExclusive;s>=0&&o>=0&&s+o<=2?t[t.length-1]=i.join(r):t.push(r)}return t}(o),o=o.filter((e=>e.original.toOffsetRange().slice(t).map((e=>e.trim())).join("\n").length>=10)),o=function(e,t){const n=new Ii(e);return t=t.filter((t=>(n.findLastMonotonous((e=>e.original.endLineNumberExclusive<t.original.endLineNumberExclusive))||new Ki(new Pi(1,1),new Pi(1,1)))!==ki(e,(e=>e.modified.endLineNumberExclusive<t.modified.endLineNumberExclusive)))),t}(e,o),o}function vr(e,t,n){if(e.trim()===t.trim())return!0;if(e.length>300&&t.length>300)return!1;const i=(new sr).compute(new gr([e],new Mi(0,1),!1),new gr([t],new Mi(0,1),!1),n);let r=0;const s=Xi.invert(i.diffs,e.length);for(const a of s)a.seq1Range.forEach((t=>{nr(e.charCodeAt(t))||r++}));const o=function(t){let n=0;for(let i=0;i<e.length;i++)nr(t.charCodeAt(i))||n++;return n}(e.length>t.length?e:t);return r/o>.6&&o>10}function yr(e,t,n){let i=n;return i=function(e,t,n){if(0===n.length)return n;const i=[];i.push(n[0]);for(let s=1;s<n.length;s++){const r=i[i.length-1];let o=n[s];if(o.seq1Range.isEmpty||o.seq2Range.isEmpty){const n=o.seq1Range.start-r.seq1Range.endExclusive;let s;for(s=1;s<=n&&(e.getElement(o.seq1Range.start-s)===e.getElement(o.seq1Range.endExclusive-s)&&t.getElement(o.seq2Range.start-s)===t.getElement(o.seq2Range.endExclusive-s));s++);if(s--,s===n){i[i.length-1]=new Xi(new Mi(r.seq1Range.start,o.seq1Range.endExclusive-n),new Mi(r.seq2Range.start,o.seq2Range.endExclusive-n));continue}o=o.delta(-s)}i.push(o)}const r=[];for(let s=0;s<i.length-1;s++){const n=i[s+1];let o=i[s];if(o.seq1Range.isEmpty||o.seq2Range.isEmpty){const r=n.seq1Range.start-o.seq1Range.endExclusive;let a;for(a=0;a<r&&(e.isStronglyEqual(o.seq1Range.start+a,o.seq1Range.endExclusive+a)&&t.isStronglyEqual(o.seq2Range.start+a,o.seq2Range.endExclusive+a));a++);if(a===r){i[s+1]=new Xi(new Mi(o.seq1Range.start+r,n.seq1Range.endExclusive),new Mi(o.seq2Range.start+r,n.seq2Range.endExclusive));continue}a>0&&(o=o.delta(a))}r.push(o)}i.length>0&&r.push(i[i.length-1]);return r}(e,t,i),i=function(e,t,n){if(!e.getBoundaryScore||!t.getBoundaryScore)return n;for(let i=0;i<n.length;i++){const r=i>0?n[i-1]:void 0,s=n[i],o=i+1<n.length?n[i+1]:void 0,a=new Mi(r?r.seq1Range.start+1:0,o?o.seq1Range.endExclusive-1:e.length),l=new Mi(r?r.seq2Range.start+1:0,o?o.seq2Range.endExclusive-1:t.length);s.seq1Range.isEmpty?n[i]=Cr(s,e,t,a,l):s.seq2Range.isEmpty&&(n[i]=Cr(s.swap(),t,e,l,a).swap())}return n}(e,t,i),i}function Cr(e,t,n,i,r){let s=1;for(;e.seq1Range.start-s>=i.start&&e.seq2Range.start-s>=r.start&&n.isStronglyEqual(e.seq2Range.start-s,e.seq2Range.endExclusive-s)&&s<100;)s++;s--;let o=0;for(;e.seq1Range.start+o<i.endExclusive&&e.seq2Range.endExclusive+o<r.endExclusive&&n.isStronglyEqual(e.seq2Range.start+o,e.seq2Range.endExclusive+o)&&o<100;)o++;if(0===s&&0===o)return e;let a=0,l=-1;for(let u=-s;u<=o;u++){const i=e.seq2Range.start+u,r=e.seq2Range.endExclusive+u,s=e.seq1Range.start+u,o=t.getBoundaryScore(s)+n.getBoundaryScore(i)+n.getBoundaryScore(r);o>l&&(l=o,a=u)}return e.delta(a)}class Lr{constructor(e,t){this.trimmedHash=e,this.lines=t}getElement(e){return this.trimmedHash[e]}get length(){return this.trimmedHash.length}getBoundaryScore(e){return 1e3-((0===e?0:wr(this.lines[e-1]))+(e===this.lines.length?0:wr(this.lines[e])))}getText(e){return this.lines.slice(e.start,e.endExclusive).join("\n")}isStronglyEqual(e,t){return this.lines[e]===this.lines[t]}}function wr(e){let t=0;for(;t<e.length&&(32===e.charCodeAt(t)||9===e.charCodeAt(t));)t++;return t}class Nr{constructor(){this.dynamicProgrammingDiffing=new rr,this.myersDiffingAlgorithm=new sr}computeDiff(e,t,n){if(e.length<=1&&function(e,t,n=((e,t)=>e===t)){if(e===t)return!0;if(!e||!t)return!1;if(e.length!==t.length)return!1;for(let i=0,r=e.length;i<r;i++)if(!n(e[i],t[i]))return!1;return!0}(e,t,((e,t)=>e===t)))return new Ai([],[],!1);if(1===e.length&&0===e[0].length||1===t.length&&0===t[0].length)return new Ai([new Fi(new Pi(1,e.length+1),new Pi(1,t.length+1),[new qi(new xt(1,1,e.length,e[0].length+1),new xt(1,1,t.length,t[0].length+1))])],[],!1);const i=0===n.maxComputationTimeMs?Zi.instance:new er(n.maxComputationTimeMs),r=!n.ignoreTrimWhitespace,s=new Map;function o(e){let t=s.get(e);return void 0===t&&(t=s.size,s.set(e,t)),t}const a=e.map((e=>o(e.trim()))),l=t.map((e=>o(e.trim()))),u=new Lr(a,e),h=new Lr(l,t),c=(()=>u.length+h.length<1700?this.dynamicProgrammingDiffing.compute(u,h,i,((n,i)=>e[n]===t[i]?0===t[i].length?.1:1+Math.log(1+t[i].length):.99)):this.myersDiffingAlgorithm.compute(u,h))();let d=c.diffs,g=c.hitTimeout;d=yr(u,h,d),d=function(e,t,n){let i=n;if(0===i.length)return i;let r,s=0;do{r=!1;const o=[i[0]];for(let a=1;a<i.length;a++){const l=i[a],u=o[o.length-1];function h(t,n){const i=new Mi(u.seq1Range.endExclusive,l.seq1Range.start);return e.getText(i).replace(/\s/g,"").length<=4&&(t.seq1Range.length+t.seq2Range.length>5||n.seq1Range.length+n.seq2Range.length>5)}h(u,l)?(r=!0,o[o.length-1]=o[o.length-1].join(l)):o.push(l)}i=o}while(s++<10&&r);return i}(u,0,d);const m=[],f=n=>{if(r)for(let s=0;s<n;s++){const n=p+s,o=b+s;if(e[n]!==t[o]){const s=this.refineDiff(e,t,new Xi(new Mi(n,n+1),new Mi(o,o+1)),i,r);for(const e of s.mappings)m.push(e);s.hitTimeout&&(g=!0)}}};let p=0,b=0;for(const y of d){wi((()=>y.seq1Range.start-p==y.seq2Range.start-b));f(y.seq1Range.start-p),p=y.seq1Range.endExclusive,b=y.seq2Range.endExclusive;const n=this.refineDiff(e,t,y,i,r);n.hitTimeout&&(g=!0);for(const e of n.mappings)m.push(e)}f(e.length-p);const _=Er(m,e,t);let v=[];return n.computeMoves&&(v=this.computeMoves(_,e,t,a,l,i,r)),wi((()=>{function n(e,t){if(e.lineNumber<1||e.lineNumber>t.length)return!1;const n=t[e.lineNumber-1];return!(e.column<1||e.column>n.length+1)}function i(e,t){return!(e.startLineNumber<1||e.startLineNumber>t.length+1)&&!(e.endLineNumberExclusive<1||e.endLineNumberExclusive>t.length+1)}for(const r of _){if(!r.innerChanges)return!1;for(const i of r.innerChanges){if(!(n(i.modifiedRange.getStartPosition(),t)&&n(i.modifiedRange.getEndPosition(),t)&&n(i.originalRange.getStartPosition(),e)&&n(i.originalRange.getEndPosition(),e)))return!1}if(!i(r.modified,t)||!i(r.original,e))return!1}return!0})),new Ai(_,v,g)}computeMoves(e,t,n,i,r,s,o){return _r(e,t,n,i,r,s).map((e=>{const i=Er(this.refineDiff(t,n,new Xi(e.original.toOffsetRange(),e.modified.toOffsetRange()),s,o).mappings,t,n,!0);return new xi(e,i)}))}refineDiff(e,t,n,i,r){const s=new gr(e,n.seq1Range,r),o=new gr(t,n.seq2Range,r),a=s.length+o.length<500?this.dynamicProgrammingDiffing.compute(s,o,i):this.myersDiffingAlgorithm.compute(s,o,i);let l=a.diffs;l=yr(s,o,l),l=function(e,t,n){const i=[];let r;function s(){if(!r)return;const e=r.s1Range.length-r.deleted;r.s2Range.length,r.added,Math.max(r.deleted,r.added)+(r.count-1)>e&&i.push(new Xi(r.s1Range,r.s2Range)),r=void 0}for(const o of n){function a(e,t){var n,i,a,l;if(!r||!r.s1Range.containsRange(e)||!r.s2Range.containsRange(t))if(!r||r.s1Range.endExclusive<e.start&&r.s2Range.endExclusive<t.start)s(),r={added:0,deleted:0,count:0,s1Range:e,s2Range:t};else{const s=Mi.tryCreate(r.s1Range.endExclusive,e.start),o=Mi.tryCreate(r.s2Range.endExclusive,t.start);r.deleted+=null!==(n=null==s?void 0:s.length)&&void 0!==n?n:0,r.added+=null!==(i=null==o?void 0:o.length)&&void 0!==i?i:0,r.s1Range=r.s1Range.join(e),r.s2Range=r.s2Range.join(t)}const u=e.intersect(o.seq1Range),h=t.intersect(o.seq2Range);r.count++,r.deleted+=null!==(a=null==u?void 0:u.length)&&void 0!==a?a:0,r.added+=null!==(l=null==h?void 0:h.length)&&void 0!==l?l:0}const l=e.findWordContaining(o.seq1Range.start-1),u=t.findWordContaining(o.seq2Range.start-1),h=e.findWordContaining(o.seq1Range.endExclusive),c=t.findWordContaining(o.seq2Range.endExclusive);l&&h&&u&&c&&l.equals(h)&&u.equals(c)?a(l,u):(l&&u&&a(l,u),h&&c&&a(h,c))}return s(),function(e,t){const n=[];for(;e.length>0||t.length>0;){const i=e[0],r=t[0];let s;s=i&&(!r||i.seq1Range.start<r.seq1Range.start)?e.shift():t.shift(),n.length>0&&n[n.length-1].seq1Range.endExclusive>=s.seq1Range.start?n[n.length-1]=n[n.length-1].join(s):n.push(s)}return n}(n,i)}(s,o,l),l=function(e,t,n){const i=[];for(const r of n){const e=i[i.length-1];e&&(r.seq1Range.start-e.seq1Range.endExclusive<=2||r.seq2Range.start-e.seq2Range.endExclusive<=2)?i[i.length-1]=new Xi(e.seq1Range.join(r.seq1Range),e.seq2Range.join(r.seq2Range)):i.push(r)}return i}(0,0,l),l=function(e,t,n){let i=n;if(0===i.length)return i;let r,s=0;do{r=!1;const a=[i[0]];for(let l=1;l<i.length;l++){const u=i[l],h=a[a.length-1];function c(n,i){const r=new Mi(h.seq1Range.endExclusive,u.seq1Range.start);if(e.countLinesIn(r)>5||r.length>500)return!1;const s=e.getText(r).trim();if(s.length>20||s.split(/\r\n|\r|\n/).length>1)return!1;const o=e.countLinesIn(n.seq1Range),a=n.seq1Range.length,l=t.countLinesIn(n.seq2Range),c=n.seq2Range.length,d=e.countLinesIn(i.seq1Range),g=i.seq1Range.length,m=t.countLinesIn(i.seq2Range),f=i.seq2Range.length;function p(e){return Math.min(e,130)}return Math.pow(Math.pow(p(40*o+a),1.5)+Math.pow(p(40*l+c),1.5),1.5)+Math.pow(Math.pow(p(40*d+g),1.5)+Math.pow(p(40*m+f),1.5),1.5)>1.3*Math.pow(Math.pow(130,1.5),1.5)}c(h,u)?(r=!0,a[a.length-1]=a[a.length-1].join(u)):a.push(u)}i=a}while(s++<10&&r);const o=[];return function(e,t){for(let n=0;n<e.length;n++)t(0===n?void 0:e[n-1],e[n],n+1===e.length?void 0:e[n+1])}(i,((t,n,i)=>{let r=n;function s(e){return e.length>0&&e.trim().length<=3&&n.seq1Range.length+n.seq2Range.length>100}const a=e.extendToFullLines(n.seq1Range),l=e.getText(new Mi(a.start,n.seq1Range.start));s(l)&&(r=r.deltaStart(-l.length));const u=e.getText(new Mi(n.seq1Range.endExclusive,a.endExclusive));s(u)&&(r=r.deltaEnd(u.length));const h=Xi.fromOffsetPairs(t?t.getEndExclusives():Ji.zero,i?i.getStarts():Ji.max),c=r.intersect(h);o.push(c)})),o}(s,o,l);return{mappings:l.map((e=>new qi(s.translateRange(e.seq1Range),o.translateRange(e.seq2Range)))),hitTimeout:a.hitTimeout}}}function Er(e,t,n,i=!1){const r=[];for(const s of function*(e,t){let n,i;for(const r of e)void 0!==i&&t(i,r)?n.push(r):(n&&(yield n),n=[r]),i=r;n&&(yield n)}(e.map((e=>function(e,t,n){let i=0,r=0;1===e.modifiedRange.endColumn&&1===e.originalRange.endColumn&&e.originalRange.startLineNumber+i<=e.originalRange.endLineNumber&&e.modifiedRange.startLineNumber+i<=e.modifiedRange.endLineNumber&&(r=-1);e.modifiedRange.startColumn-1>=n[e.modifiedRange.startLineNumber-1].length&&e.originalRange.startColumn-1>=t[e.originalRange.startLineNumber-1].length&&e.originalRange.startLineNumber<=e.originalRange.endLineNumber+r&&e.modifiedRange.startLineNumber<=e.modifiedRange.endLineNumber+r&&(i=1);const s=new Pi(e.originalRange.startLineNumber+i,e.originalRange.endLineNumber+1+r),o=new Pi(e.modifiedRange.startLineNumber+i,e.modifiedRange.endLineNumber+1+r);return new Fi(s,o,[e])}(e,t,n))),((e,t)=>e.original.overlapOrTouch(t.original)||e.modified.overlapOrTouch(t.modified)))){const e=s[0],t=s[s.length-1];r.push(new Fi(e.original.join(t.original),e.modified.join(t.modified),s.map((e=>e.innerChanges[0]))))}return wi((()=>!(!i&&r.length>0&&r[0].original.startLineNumber!==r[0].modified.startLineNumber)&&Ni(r,((e,t)=>t.original.startLineNumber-e.original.endLineNumberExclusive==t.modified.startLineNumber-e.modified.endLineNumberExclusive&&e.original.endLineNumberExclusive<t.original.startLineNumber&&e.modified.endLineNumberExclusive<t.modified.startLineNumber)))),r}const Sr=()=>new Vi,Rr=()=>new Nr;function Ar(e,t){const n=Math.pow(10,t);return Math.round(e*n)/n}class xr{constructor(e,t,n,i=1){this._rgbaBrand=void 0,this.r=0|Math.min(255,Math.max(0,e)),this.g=0|Math.min(255,Math.max(0,t)),this.b=0|Math.min(255,Math.max(0,n)),this.a=Ar(Math.max(Math.min(1,i),0),3)}static equals(e,t){return e.r===t.r&&e.g===t.g&&e.b===t.b&&e.a===t.a}}class Mr{constructor(e,t,n,i){this._hslaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=Ar(Math.max(Math.min(1,t),0),3),this.l=Ar(Math.max(Math.min(1,n),0),3),this.a=Ar(Math.max(Math.min(1,i),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.l===t.l&&e.a===t.a}static fromRGBA(e){const t=e.r/255,n=e.g/255,i=e.b/255,r=e.a,s=Math.max(t,n,i),o=Math.min(t,n,i);let a=0,l=0;const u=(o+s)/2,h=s-o;if(h>0){switch(l=Math.min(u<=.5?h/(2*u):h/(2-2*u),1),s){case t:a=(n-i)/h+(n<i?6:0);break;case n:a=(i-t)/h+2;break;case i:a=(t-n)/h+4}a*=60,a=Math.round(a)}return new Mr(a,l,u,r)}static _hue2rgb(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}static toRGBA(e){const t=e.h/360,{s:n,l:i,a:r}=e;let s,o,a;if(0===n)s=o=a=i;else{const e=i<.5?i*(1+n):i+n-i*n,r=2*i-e;s=Mr._hue2rgb(r,e,t+1/3),o=Mr._hue2rgb(r,e,t),a=Mr._hue2rgb(r,e,t-1/3)}return new xr(Math.round(255*s),Math.round(255*o),Math.round(255*a),r)}}class kr{constructor(e,t,n,i){this._hsvaBrand=void 0,this.h=0|Math.max(Math.min(360,e),0),this.s=Ar(Math.max(Math.min(1,t),0),3),this.v=Ar(Math.max(Math.min(1,n),0),3),this.a=Ar(Math.max(Math.min(1,i),0),3)}static equals(e,t){return e.h===t.h&&e.s===t.s&&e.v===t.v&&e.a===t.a}static fromRGBA(e){const t=e.r/255,n=e.g/255,i=e.b/255,r=Math.max(t,n,i),s=r-Math.min(t,n,i),o=0===r?0:s/r;let a;return a=0===s?0:r===t?((n-i)/s%6+6)%6:r===n?(i-t)/s+2:(t-n)/s+4,new kr(Math.round(60*a),o,r,e.a)}static toRGBA(e){const{h:t,s:n,v:i,a:r}=e,s=i*n,o=s*(1-Math.abs(t/60%2-1)),a=i-s;let[l,u,h]=[0,0,0];return t<60?(l=s,u=o):t<120?(l=o,u=s):t<180?(u=s,h=o):t<240?(u=o,h=s):t<300?(l=o,h=s):t<=360&&(l=s,h=o),l=Math.round(255*(l+a)),u=Math.round(255*(u+a)),h=Math.round(255*(h+a)),new xr(l,u,h,r)}}class Tr{static fromHex(e){return Tr.Format.CSS.parseHex(e)||Tr.red}static equals(e,t){return!e&&!t||!(!e||!t)&&e.equals(t)}get hsla(){return this._hsla?this._hsla:Mr.fromRGBA(this.rgba)}get hsva(){return this._hsva?this._hsva:kr.fromRGBA(this.rgba)}constructor(e){if(!e)throw new Error("Color needs a value");if(e instanceof xr)this.rgba=e;else if(e instanceof Mr)this._hsla=e,this.rgba=Mr.toRGBA(e);else{if(!(e instanceof kr))throw new Error("Invalid color ctor argument");this._hsva=e,this.rgba=kr.toRGBA(e)}}equals(e){return!!e&&xr.equals(this.rgba,e.rgba)&&Mr.equals(this.hsla,e.hsla)&&kr.equals(this.hsva,e.hsva)}getRelativeLuminance(){return Ar(.2126*Tr._relativeLuminanceForComponent(this.rgba.r)+.7152*Tr._relativeLuminanceForComponent(this.rgba.g)+.0722*Tr._relativeLuminanceForComponent(this.rgba.b),4)}static _relativeLuminanceForComponent(e){const t=e/255;return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)}isLighter(){return(299*this.rgba.r+587*this.rgba.g+114*this.rgba.b)/1e3>=128}isLighterThan(e){return this.getRelativeLuminance()>e.getRelativeLuminance()}isDarkerThan(e){return this.getRelativeLuminance()<e.getRelativeLuminance()}lighten(e){return new Tr(new Mr(this.hsla.h,this.hsla.s,this.hsla.l+this.hsla.l*e,this.hsla.a))}darken(e){return new Tr(new Mr(this.hsla.h,this.hsla.s,this.hsla.l-this.hsla.l*e,this.hsla.a))}transparent(e){const{r:t,g:n,b:i,a:r}=this.rgba;return new Tr(new xr(t,n,i,r*e))}isTransparent(){return 0===this.rgba.a}isOpaque(){return 1===this.rgba.a}opposite(){return new Tr(new xr(255-this.rgba.r,255-this.rgba.g,255-this.rgba.b,this.rgba.a))}makeOpaque(e){if(this.isOpaque()||1!==e.rgba.a)return this;const{r:t,g:n,b:i,a:r}=this.rgba;return new Tr(new xr(e.rgba.r-r*(e.rgba.r-t),e.rgba.g-r*(e.rgba.g-n),e.rgba.b-r*(e.rgba.b-i),1))}toString(){return this._toString||(this._toString=Tr.Format.CSS.format(this)),this._toString}static getLighterColor(e,t,n){if(e.isLighterThan(t))return e;n=n||.5;const i=e.getRelativeLuminance(),r=t.getRelativeLuminance();return n=n*(r-i)/r,e.lighten(n)}static getDarkerColor(e,t,n){if(e.isDarkerThan(t))return e;n=n||.5;const i=e.getRelativeLuminance();return n=n*(i-t.getRelativeLuminance())/i,e.darken(n)}}function Or(e){const t=[];for(const n of e){const e=Number(n);(e||0===e&&""!==n.replace(/\s/g,""))&&t.push(e)}return t}function Ir(e,t,n,i){return{red:e/255,blue:n/255,green:t/255,alpha:i}}function Pr(e,t){const n=t.index,i=t[0].length;if(!n)return;const r=e.positionAt(n);return{startLineNumber:r.lineNumber,startColumn:r.column,endLineNumber:r.lineNumber,endColumn:r.column+i}}function Dr(e,t){if(!e)return;const n=Tr.Format.CSS.parseHex(t);return n?{range:e,color:Ir(n.rgba.r,n.rgba.g,n.rgba.b,n.rgba.a)}:void 0}function Kr(e,t,n){if(!e||1!==t.length)return;const i=Or(t[0].values());return{range:e,color:Ir(i[0],i[1],i[2],n?i[3]:1)}}function Fr(e,t,n){if(!e||1!==t.length)return;const i=Or(t[0].values()),r=new Tr(new Mr(i[0],i[1]/100,i[2]/100,n?i[3]:1));return{range:e,color:Ir(r.rgba.r,r.rgba.g,r.rgba.b,r.rgba.a)}}function qr(e,t){return"string"==typeof e?[...e.matchAll(t)]:e.findMatches(t)}function Vr(e){return e&&"function"==typeof e.getValue&&"function"==typeof e.positionAt?function(e){const t=[],n=qr(e,/\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%]*\))|(#)([A-Fa-f0-9]{3})\b|(#)([A-Fa-f0-9]{4})\b|(#)([A-Fa-f0-9]{6})\b|(#)([A-Fa-f0-9]{8})\b/gm);if(n.length>0)for(const i of n){const n=i.filter((e=>void 0!==e)),r=n[1],s=n[2];if(!s)continue;let o;if("rgb"===r){const t=/^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm;o=Kr(Pr(e,i),qr(s,t),!1)}else if("rgba"===r){const t=/^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;o=Kr(Pr(e,i),qr(s,t),!0)}else if("hsl"===r){const t=/^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm;o=Fr(Pr(e,i),qr(s,t),!1)}else if("hsla"===r){const t=/^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;o=Fr(Pr(e,i),qr(s,t),!0)}else"#"===r&&(o=Dr(Pr(e,i),r+s));o&&t.push(o)}return t}(e):[]}Tr.white=new Tr(new xr(255,255,255,1)),Tr.black=new Tr(new xr(0,0,0,1)),Tr.red=new Tr(new xr(255,0,0,1)),Tr.blue=new Tr(new xr(0,0,255,1)),Tr.green=new Tr(new xr(0,255,0,1)),Tr.cyan=new Tr(new xr(0,255,255,1)),Tr.lightgrey=new Tr(new xr(211,211,211,1)),Tr.transparent=new Tr(new xr(0,0,0,0)),function(e){let t;!function(t){let n;!function(t){function n(e){const t=e.toString(16);return 2!==t.length?"0"+t:t}function i(e){switch(e){case 48:return 0;case 49:return 1;case 50:return 2;case 51:return 3;case 52:return 4;case 53:return 5;case 54:return 6;case 55:return 7;case 56:return 8;case 57:return 9;case 97:case 65:return 10;case 98:case 66:return 11;case 99:case 67:return 12;case 100:case 68:return 13;case 101:case 69:return 14;case 102:case 70:return 15}return 0}t.formatRGB=function(t){return 1===t.rgba.a?`rgb(${t.rgba.r}, ${t.rgba.g}, ${t.rgba.b})`:e.Format.CSS.formatRGBA(t)},t.formatRGBA=function(e){return`rgba(${e.rgba.r}, ${e.rgba.g}, ${e.rgba.b}, ${+e.rgba.a.toFixed(2)})`},t.formatHSL=function(t){return 1===t.hsla.a?`hsl(${t.hsla.h}, ${(100*t.hsla.s).toFixed(2)}%, ${(100*t.hsla.l).toFixed(2)}%)`:e.Format.CSS.formatHSLA(t)},t.formatHSLA=function(e){return`hsla(${e.hsla.h}, ${(100*e.hsla.s).toFixed(2)}%, ${(100*e.hsla.l).toFixed(2)}%, ${e.hsla.a.toFixed(2)})`},t.formatHex=function(e){return`#${n(e.rgba.r)}${n(e.rgba.g)}${n(e.rgba.b)}`},t.formatHexA=function(t,i=!1){return i&&1===t.rgba.a?e.Format.CSS.formatHex(t):`#${n(t.rgba.r)}${n(t.rgba.g)}${n(t.rgba.b)}${n(Math.round(255*t.rgba.a))}`},t.format=function(t){return t.isOpaque()?e.Format.CSS.formatHex(t):e.Format.CSS.formatRGBA(t)},t.parseHex=function(t){const n=t.length;if(0===n)return null;if(35!==t.charCodeAt(0))return null;if(7===n){const n=16*i(t.charCodeAt(1))+i(t.charCodeAt(2)),r=16*i(t.charCodeAt(3))+i(t.charCodeAt(4)),s=16*i(t.charCodeAt(5))+i(t.charCodeAt(6));return new e(new xr(n,r,s,1))}if(9===n){const n=16*i(t.charCodeAt(1))+i(t.charCodeAt(2)),r=16*i(t.charCodeAt(3))+i(t.charCodeAt(4)),s=16*i(t.charCodeAt(5))+i(t.charCodeAt(6)),o=16*i(t.charCodeAt(7))+i(t.charCodeAt(8));return new e(new xr(n,r,s,o/255))}if(4===n){const n=i(t.charCodeAt(1)),r=i(t.charCodeAt(2)),s=i(t.charCodeAt(3));return new e(new xr(16*n+n,16*r+r,16*s+s))}if(5===n){const n=i(t.charCodeAt(1)),r=i(t.charCodeAt(2)),s=i(t.charCodeAt(3)),o=i(t.charCodeAt(4));return new e(new xr(16*n+n,16*r+r,16*s+s,(16*o+o)/255))}return null}}(n=t.CSS||(t.CSS={}))}(t=e.Format||(e.Format={}))}(Tr||(Tr={}));var Br=function(e,t,n,i){return new(n||(n=Promise))((function(r,s){function o(e){try{l(i.next(e))}catch(zr){s(zr)}}function a(e){try{l(i.throw(e))}catch(zr){s(zr)}}function l(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(o,a)}l((i=i.apply(e,t||[])).next())}))};class Ur extends Ft{get uri(){return this._uri}get eol(){return this._eol}getValue(){return this.getText()}findMatches(e){const t=[];for(let n=0;n<this._lines.length;n++){const i=this._lines[n],r=this.offsetAt(new At(n+1,1)),s=i.matchAll(e);for(const e of s)(e.index||0===e.index)&&(e.index=e.index+r),t.push(e)}return t}getLinesContent(){return this._lines.slice(0)}getLineCount(){return this._lines.length}getLineContent(e){return this._lines[e-1]}getWordAtPosition(e,t){const n=Bt(e.column,function(e){let t=qt;if(e&&e instanceof RegExp)if(e.global)t=e;else{let n="g";e.ignoreCase&&(n+="i"),e.multiline&&(n+="m"),e.unicode&&(n+="u"),t=new RegExp(e.source,n)}return t.lastIndex=0,t}(t),this._lines[e.lineNumber-1],0);return n?new xt(e.lineNumber,n.startColumn,e.lineNumber,n.endColumn):null}words(e){const t=this._lines,n=this._wordenize.bind(this);let i=0,r="",s=0,o=[];return{*[Symbol.iterator](){for(;;)if(s<o.length){const e=r.substring(o[s].start,o[s].end);s+=1,yield e}else{if(!(i<t.length))break;r=t[i],o=n(r,e),s=0,i+=1}}}}getLineWords(e,t){const n=this._lines[e-1],i=this._wordenize(n,t),r=[];for(const s of i)r.push({word:n.substring(s.start,s.end),startColumn:s.start+1,endColumn:s.end+1});return r}_wordenize(e,t){const n=[];let i;for(t.lastIndex=0;(i=t.exec(e))&&0!==i[0].length;)n.push({start:i.index,end:i.index+i[0].length});return n}getValueInRange(e){if((e=this._validateRange(e)).startLineNumber===e.endLineNumber)return this._lines[e.startLineNumber-1].substring(e.startColumn-1,e.endColumn-1);const t=this._eol,n=e.startLineNumber-1,i=e.endLineNumber-1,r=[];r.push(this._lines[n].substring(e.startColumn-1));for(let s=n+1;s<i;s++)r.push(this._lines[s]);return r.push(this._lines[i].substring(0,e.endColumn-1)),r.join(t)}offsetAt(e){return e=this._validatePosition(e),this._ensureLineStarts(),this._lineStarts.getPrefixSum(e.lineNumber-2)+(e.column-1)}positionAt(e){e=Math.floor(e),e=Math.max(0,e),this._ensureLineStarts();const t=this._lineStarts.getIndexOf(e),n=this._lines[t.index].length;return{lineNumber:1+t.index,column:1+Math.min(t.remainder,n)}}_validateRange(e){const t=this._validatePosition({lineNumber:e.startLineNumber,column:e.startColumn}),n=this._validatePosition({lineNumber:e.endLineNumber,column:e.endColumn});return t.lineNumber!==e.startLineNumber||t.column!==e.startColumn||n.lineNumber!==e.endLineNumber||n.column!==e.endColumn?{startLineNumber:t.lineNumber,startColumn:t.column,endLineNumber:n.lineNumber,endColumn:n.column}:e}_validatePosition(e){if(!At.isIPosition(e))throw new Error("bad position");let{lineNumber:t,column:n}=e,i=!1;if(t<1)t=1,n=1,i=!0;else if(t>this._lines.length)t=this._lines.length,n=this._lines[t-1].length+1,i=!0;else{const e=this._lines[t-1].length+1;n<1?(n=1,i=!0):n>e&&(n=e,i=!0)}return i?{lineNumber:t,column:n}:e}}class Wr{constructor(e,t){this._host=e,this._models=Object.create(null),this._foreignModuleFactory=t,this._foreignModule=null}dispose(){this._models=Object.create(null)}_getModel(e){return this._models[e]}_getModels(){const e=[];return Object.keys(this._models).forEach((t=>e.push(this._models[t]))),e}acceptNewModel(e){this._models[e.url]=new Ur(bt.parse(e.url),e.lines,e.EOL,e.versionId)}acceptModelChanged(e,t){if(!this._models[e])return;this._models[e].onEvents(t)}acceptRemovedModel(e){this._models[e]&&delete this._models[e]}computeUnicodeHighlights(e,t,n){return Br(this,void 0,void 0,(function*(){const i=this._getModel(e);return i?Ei.computeUnicodeHighlights(i,t,n):{ranges:[],hasMore:!1,ambiguousCharacterCount:0,invisibleCharacterCount:0,nonBasicAsciiCharacterCount:0}}))}computeDiff(e,t,n,i){return Br(this,void 0,void 0,(function*(){const r=this._getModel(e),s=this._getModel(t);return r&&s?Wr.computeDiff(r,s,n,i):null}))}static computeDiff(e,t,n,i){const r="advanced"===i?Rr():Sr(),s=e.getLinesContent(),o=t.getLinesContent(),a=r.computeDiff(s,o,n);function l(e){return e.map((e=>{var t;return[e.original.startLineNumber,e.original.endLineNumberExclusive,e.modified.startLineNumber,e.modified.endLineNumberExclusive,null===(t=e.innerChanges)||void 0===t?void 0:t.map((e=>[e.originalRange.startLineNumber,e.originalRange.startColumn,e.originalRange.endLineNumber,e.originalRange.endColumn,e.modifiedRange.startLineNumber,e.modifiedRange.startColumn,e.modifiedRange.endLineNumber,e.modifiedRange.endColumn]))]}))}return{identical:!(a.changes.length>0)&&this._modelsAreIdentical(e,t),quitEarly:a.hitTimeout,changes:l(a.changes),moves:a.moves.map((e=>[e.lineRangeMapping.original.startLineNumber,e.lineRangeMapping.original.endLineNumberExclusive,e.lineRangeMapping.modified.startLineNumber,e.lineRangeMapping.modified.endLineNumberExclusive,l(e.changes)]))}}static _modelsAreIdentical(e,t){const n=e.getLineCount();if(n!==t.getLineCount())return!1;for(let i=1;i<=n;i++){if(e.getLineContent(i)!==t.getLineContent(i))return!1}return!0}computeMoreMinimalEdits(e,t,n){return Br(this,void 0,void 0,(function*(){const i=this._getModel(e);if(!i)return t;const r=[];let s;t=t.slice(0).sort(((e,t)=>{if(e.range&&t.range)return xt.compareRangesUsingStarts(e.range,t.range);return(e.range?0:1)-(t.range?0:1)}));let o=0;for(let e=1;e<t.length;e++)xt.getEndPosition(t[o].range).equals(xt.getStartPosition(t[e].range))?(t[o].range=xt.fromPositions(xt.getStartPosition(t[o].range),xt.getEndPosition(t[e].range)),t[o].text+=t[e].text):(o++,t[o]=t[e]);t.length=o+1;for(let{range:e,text:a,eol:l}of t){if("number"==typeof l&&(s=l),xt.isEmpty(e)&&!a)continue;const t=i.getValueInRange(e);if(a=a.replace(/\r\n|\n|\r/g,i.eol),t===a)continue;if(Math.max(a.length,t.length)>Wr._diffLimit){r.push({range:e,text:a});continue}const o=Ve(t,a,n),u=i.offsetAt(xt.lift(e).getStartPosition());for(const e of o){const t=i.positionAt(u+e.originalStart),n=i.positionAt(u+e.originalStart+e.originalLength),s={text:a.substr(e.modifiedStart,e.modifiedLength),range:{startLineNumber:t.lineNumber,startColumn:t.column,endLineNumber:n.lineNumber,endColumn:n.column}};i.getValueInRange(s.range)!==s.text&&r.push(s)}}return"number"==typeof s&&r.push({eol:s,text:"",range:{startLineNumber:0,startColumn:0,endLineNumber:0,endColumn:0}}),r}))}computeLinks(e){return Br(this,void 0,void 0,(function*(){const t=this._getModel(e);return t?function(e){return e&&"function"==typeof e.getLineCount&&"function"==typeof e.getLineContent?Gt.computeLinks(e):[]}(t):null}))}computeDefaultDocumentColors(e){return Br(this,void 0,void 0,(function*(){const t=this._getModel(e);return t?Vr(t):null}))}textualSuggest(e,t,n,i){return Br(this,void 0,void 0,(function*(){const r=new w,s=new RegExp(n,i),o=new Set;e:for(const n of e){const e=this._getModel(n);if(e)for(const n of e.words(s))if(n!==t&&isNaN(Number(n))&&(o.add(n),o.size>Wr._suggestionsLimit))break e}return{words:Array.from(o),duration:r.elapsed()}}))}computeWordRanges(e,t,n,i){return Br(this,void 0,void 0,(function*(){const r=this._getModel(e);if(!r)return Object.create(null);const s=new RegExp(n,i),o=Object.create(null);for(let e=t.startLineNumber;e<t.endLineNumber;e++){const t=r.getLineWords(e,s);for(const n of t){if(!isNaN(Number(n.word)))continue;let t=o[n.word];t||(t=[],o[n.word]=t),t.push({startLineNumber:e,startColumn:n.startColumn,endLineNumber:e,endColumn:n.endColumn})}}return o}))}navigateValueSet(e,t,n,i,r){return Br(this,void 0,void 0,(function*(){const s=this._getModel(e);if(!s)return null;const o=new RegExp(i,r);t.startColumn===t.endColumn&&(t={startLineNumber:t.startLineNumber,startColumn:t.startColumn,endLineNumber:t.endLineNumber,endColumn:t.endColumn+1});const a=s.getValueInRange(t),l=s.getWordAtPosition({lineNumber:t.startLineNumber,column:t.startColumn},o);if(!l)return null;const u=s.getValueInRange(l);return Qt.INSTANCE.navigateValueSet(t,a,l,u,n)}))}loadForeignModule(e,t,n){const i=function(e,t){const n=e=>function(){const n=Array.prototype.slice.call(arguments,0);return t(e,n)},i={};for(const r of e)i[r]=n(r);return i}(n,((e,t)=>this._host.fhr(e,t))),r={host:i,getMirrorModels:()=>this._getModels()};return this._foreignModuleFactory?(this._foreignModule=this._foreignModuleFactory(r,t),Promise.resolve(k(this._foreignModule))):Promise.reject(new Error("Unexpected usage"))}fmr(e,t){if(!this._foreignModule||"function"!=typeof this._foreignModule[e])return Promise.reject(new Error("Missing requestHandler or method: "+e));try{return Promise.resolve(this._foreignModule[e].apply(this._foreignModule,t))}catch(zr){return Promise.reject(zr)}}}Wr._diffLimit=1e5,Wr._suggestionsLimit=1e4,"function"==typeof importScripts&&(globalThis.monaco={editor:void 0,languages:void 0,CancellationTokenSource:Zt,Emitter:x,KeyCode:Gn,KeyMod:mi,Position:At,Range:xt,Selection:gn,SelectionDirection:oi,MarkerSeverity:Qn,MarkerTag:Yn,Uri:bt,Token:Nn});let Hr=!1;globalThis.onmessage=e=>{Hr||function(e){if(Hr)return;Hr=!0;const t=new ke((e=>{globalThis.postMessage(e)}),(t=>new Wr(t,e)));globalThis.onmessage=e=>{t.onmessage(e.data)}}(null)}})()})();ePoints, diagonalReverseStart, temp, 1, diagonalReverseEnd - diagonalReverseStart + 1);
                this.m_reverseHistory.push(temp);
            }
        }
        // If we got here, then we have the full trace in history. We just have to convert it to a change list
        // NOTE: This part is a bit messy
        return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
    }
    /**
     * Shifts the given changes to provide a more intuitive diff.
     * While the first element in a diff matches the first element after the diff,
     * we shift the diff down.
     *
     * @param changes The list of changes to shift
     * @returns The shifted changes
     */
    PrettifyChanges(changes) {
        // Shift all the changes down first
        for (let i = 0; i < changes.length; i++) {
            const change = changes[i];
            const originalStop = (i < changes.length - 1) ? changes[i + 1].originalStart : this._originalElementsOrHash.length;
            const modifiedStop = (i < changes.length - 1) ? changes[i + 1].modifiedStart : this._modifiedElementsOrHash.length;
            const checkOriginal = change.originalLength > 0;
            const checkModified = change.modifiedLength > 0;
            while (change.originalStart + change.originalLength < originalStop
                && change.modifiedStart + change.modifiedLength < modifiedStop
                && (!checkOriginal || this.OriginalElementsAreEqual(change.originalStart, change.originalStart + change.originalLength))
                && (!checkModified || this.ModifiedElementsAreEqual(change.modifiedStart, change.modifiedStart + change.modifiedLength))) {
                const startStrictEqual = this.ElementsAreStrictEqual(change.originalStart, change.modifiedStart);
                const endStrictEqual = this.ElementsAreStrictEqual(change.originalStart + change.originalLength, change.modifiedStart + change.modifiedLength);
                if (endStrictEqual && !startStrictEqual) {
                    // moving the change down would create an equal change, but the elements are not strict equal
                    break;
                }
                change.originalStart++;
                change.modifiedStart++;
            }
            const mergedChangeArr = [null];
            if (i < changes.length - 1 && this.ChangesOverlap(changes[i], changes[i + 1], mergedChangeArr)) {
                changes[i] = mergedChangeArr[0];
                changes.splice(i + 1, 1);
                i--;
                continue;
            }
        }
        // Shift changes back up until we hit empty or whitespace-only lines
        for (let i = changes.length - 1; i >= 0; i--) {
            const change = changes[i];
            let originalStop = 0;
            let modifiedStop = 0;
            if (i > 0) {
                const prevChange = changes[i - 1];
                originalStop = prevChange.originalStart + prevChange.originalLength;
                modifiedStop = prevChange.modifiedStart + prevChange.modifiedLength;
            }
            const checkOriginal = change.originalLength > 0;
            const checkModified = change.modifiedLength > 0;
            let bestDelta = 0;
            let bestScore = this._boundaryScore(change.originalStart, change.originalLength, change.modifiedStart, change.modifiedLength);
            for (let delta = 1;; delta++) {
                const originalStart = change.originalStart - delta;
                const modifiedStart = change.modifiedStart - delta;
                if (originalStart < originalStop || modifiedStart < modifiedStop) {
                    break;
                }
                if (checkOriginal && !this.OriginalElementsAreEqual(originalStart, originalStart + change.originalLength)) {
                    break;
                }
                if (checkModified && !this.ModifiedElementsAreEqual(modifiedStart, modifiedStart + change.modifiedLength)) {
                    break;
                }
                const touchingPreviousChange = (originalStart === originalStop && modifiedStart === modifiedStop);
                const score = ((touchingPreviousChange ? 5 : 0)
                    + this._boundaryScore(originalStart, change.originalLength, modifiedStart, change.modifiedLength));
                if (score > bestScore) {
                    bestScore = score;
                    bestDelta = delta;
                }
            }
            change.originalStart -= bestDelta;
            change.modifiedStart -= bestDelta;
            const mergedChangeArr = [null];
            if (i > 0 && this.ChangesOverlap(changes[i - 1], changes[i], mergedChangeArr)) {
                changes[i - 1] = mergedChangeArr[0];
                changes.splice(i, 1);
                i++;
                continue;
            }
        }
        // There could be multiple longest common substrings.
        // Give preference to the ones containing longer lines
        if (this._hasStrings) {
            for (let i = 1, len = changes.length; i < len; i++) {
                const aChange = changes[i - 1];
                const bChange = changes[i];
                const matchedLength = bChange.originalStart - aChange.originalStart - aChange.originalLength;
                const aOriginalStart = aChange.originalStart;
                const bOriginalEnd = bChange.originalStart + bChange.originalLength;
                const abOriginalLength = bOriginalEnd - aOriginalStart;
                const aModifiedStart = aChange.modifiedStart;
                const bModifiedEnd = bChange.modifiedStart + bChange.modifiedLength;
                const abModifiedLength = bModifiedEnd - aModifiedStart;
                // Avoid wasting a lot of time with these searches
                if (matchedLength < 5 && abOriginalLength < 20 && abModifiedLength < 20) {
                    const t = this._findBetterContiguousSequence(aOriginalStart, abOriginalLength, aModifiedStart, abModifiedLength, matchedLength);
                    if (t) {
                        const [originalMatchStart, modifiedMatchStart] = t;
                        if (originalMatchStart !== aChange.originalStart + aChange.originalLength || modifiedMatchStart !== aChange.modifiedStart + aChange.modifiedLength) {
                            // switch to another sequence that has a better score
                            aChange.originalLength = originalMatchStart - aChange.originalStart;
                            aChange.modifiedLength = modifiedMatchStart - aChange.modifiedStart;
                            bChange.originalStart = originalMatchStart + matchedLength;
                            bChange.modifiedStart = modifiedMatchStart + matchedLength;
                            bChange.originalLength = bOriginalEnd - bChange.originalStart;
                            bChange.modifiedLength = bModifiedEnd - bChange.modifiedStart;
                        }
                    }
                }
            }
        }
        return changes;
    }
    _findBetterContiguousSequence(originalStart, originalLength, modifiedStart, modifiedLength, desiredLength) {
        if (originalLength < desiredLength || modifiedLength < desiredLength) {
            return null;
        }
        const originalMax = originalStart + originalLength - desiredLength + 1;
        const modifiedMax = modifiedStart + modifiedLength - desiredLength + 1;
        let bestScore = 0;
        let bestOriginalStart = 0;
        let bestModifiedStart = 0;
        for (let i = originalStart; i < originalMax; i++) {
            for (let j = modifiedStart; j < modifiedMax; j++) {
                const score = this._contiguousSequenceScore(i, j, desiredLength);
                if (score > 0 && score > bestScore) {
                    bestScore = score;
                    bestOriginalStart = i;
                    bestModifiedStart = j;
                }
            }
        }
        if (bestScore > 0) {
            return [bestOriginalStart, bestModifiedStart];
        }
        return null;
    }
    _contiguousSequenceScore(originalStart, modifiedStart, length) {
        let score = 0;
        for (let l = 0; l < length; l++) {
            if (!this.ElementsAreEqual(originalStart + l, modifiedStart + l)) {
                return 0;
            }
            score += this._originalStringElements[originalStart + l].length;
        }
        return score;
    }
    _OriginalIsBoundary(index) {
        if (index <= 0 || index >= this._originalElementsOrHash.length - 1) {
            return true;
        }
        return (this._hasStrings && /^\s*$/.test(this._originalStringElements[index]));
    }
    _OriginalRegionIsBoundary(originalStart, originalLength) {
        if (this._OriginalIsBoundary(originalStart) || this._OriginalIsBoundary(originalStart - 1)) {
            return true;
        }
        if (originalLength > 0) {
            const originalEnd = originalStart + originalLength;
            if (this._OriginalIsBoundary(originalEnd - 1) || this._OriginalIsBoundary(originalEnd)) {
                return true;
            }
        }
        return false;
    }
    _ModifiedIsBoundary(index) {
        if (index <= 0 || index >= this._modifiedElementsOrHash.length - 1) {
            return true;
        }
        return (this._hasStrings && /^\s*$/.test(this._modifiedStringElements[index]));
    }
    _ModifiedRegionIsBoundary(modifiedStart, modifiedLength) {
        if (this._ModifiedIsBoundary(modifiedStart) || this._ModifiedIsBoundary(modifiedStart - 1)) {
            return true;
        }
        if (modifiedLength > 0) {
            const modifiedEnd = modifiedStart + modifiedLength;
            if (this._ModifiedIsBoundary(modifiedEnd - 1) || this._ModifiedIsBoundary(modifiedEnd)) {
                return true;
            }
        }
        return false;
    }
    _boundaryScore(originalStart, originalLength, modifiedStart, modifiedLength) {
        const originalScore = (this._OriginalRegionIsBoundary(originalStart, originalLength) ? 1 : 0);
        const modifiedScore = (this._ModifiedRegionIsBoundary(modifiedStart, modifiedLength) ? 1 : 0);
        return (originalScore + modifiedScore);
    }
    /**
     * Concatenates the two input DiffChange lists and returns the resulting
     * list.
     * @param The left changes
     * @param The right changes
     * @returns The concatenated list
     */
    ConcatenateChanges(left, right) {
        const mergedChangeArr = [];
        if (left.length === 0 || right.length === 0) {
            return (right.length > 0) ? right : left;
        }
        else if (this.ChangesOverlap(left[left.length - 1], right[0], mergedChangeArr)) {
            // Since we break the problem down recursively, it is possible that we
            // might recurse in the middle of a change thereby splitting it into
            // two changes. Here in the combining stage, we detect and fuse those
            // changes back together
            const result = new Array(left.length + right.length - 1);
            MyArray.Copy(left, 0, result, 0, left.length - 1);
            result[left.length - 1] = mergedChangeArr[0];
            MyArray.Copy(right, 1, result, left.length, right.length - 1);
            return result;
        }
        else {
            const result = new Array(left.length + right.length);
            MyArray.Copy(left, 0, result, 0, left.length);
            MyArray.Copy(right, 0, result, left.length, right.length);
            return result;
        }
    }
    /**
     * Returns true if the two changes overlap and can be merged into a single
     * change
     * @param left The left change
     * @param right The right change
     * @param mergedChange The merged change if the two overlap, null otherwise
     * @returns True if the two changes overlap
     */
    ChangesOverlap(left, right, mergedChangeArr) {
        Debug.Assert(left.originalStart <= right.originalStart, 'Left change is not less than or equal to right change');
        Debug.Assert(left.modifiedStart <= right.modifiedStart, 'Left change is not less than or equal to right change');
        if (left.originalStart + left.originalLength >= right.originalStart || left.modifiedStart + left.modifiedLength >= right.modifiedStart) {
            const originalStart = left.originalStart;
            let originalLength = left.originalLength;
            const modifiedStart = left.modifiedStart;
            let modifiedLength = left.modifiedLength;
            if (left.originalStart + left.originalLength >= right.originalStart) {
                originalLength = right.originalStart + right.originalLength - left.originalStart;
            }
            if (left.modifiedStart + left.modifiedLength >= right.modifiedStart) {
                modifiedLength = right.modifiedStart + right.modifiedLength - left.modifiedStart;
            }
            mergedChangeArr[0] = new DiffChange(originalStart, originalLength, modifiedStart, modifiedLength);
            return true;
        }
        else {
            mergedChangeArr[0] = null;
            return false;
        }
    }
    /**
     * Helper method used to clip a diagonal index to the range of valid
     * diagonals. This also decides whether or not the diagonal index,
     * if it exceeds the boundary, should be clipped to the boundary or clipped
     * one inside the boundary depending on the Even/Odd status of the boundary
     * and numDifferences.
     * @param diagonal The index of the diagonal to clip.
     * @param numDifferences The current number of differences being iterated upon.
     * @param diagonalBaseIndex The base reference diagonal.
     * @param numDiagonals The total number of diagonals.
     * @returns The clipped diagonal index.
     */
    ClipDiagonalBound(diagonal, numDifferences, diagonalBaseIndex, numDiagonals) {
        if (diagonal >= 0 && diagonal < numDiagonals) {
            // Nothing to clip, its in range
            return diagonal;
        }
        // diagonalsBelow: The number of diagonals below the reference diagonal
        // diagonalsAbove: The number of diagonals above the reference diagonal
        const diagonalsBelow = diagonalBaseIndex;
        const diagonalsAbove = numDiagonals - diagonalBaseIndex - 1;
        const diffEven = (numDifferences % 2 === 0);
        if (diagonal < 0) {
            const lowerBoundEven = (diagonalsBelow % 2 === 0);
            return (diffEven === lowerBoundEven) ? 0 : 1;
        }
        else {
            const upperBoundEven = (diagonalsAbove % 2 === 0);
            return (diffEven === upperBoundEven) ? numDiagonals - 1 : numDiagonals - 2;
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/base/common/process.js
/* provided dependency */ var process_process = __webpack_require__(155);
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

let safeProcess;
// Native sandbox environment
if (typeof globals.vscode !== 'undefined' && typeof globals.vscode.process !== 'undefined') {
    const sandboxProcess = globals.vscode.process;
    safeProcess = {
        get platform() { return sandboxProcess.platform; },
        get arch() { return sandboxProcess.arch; },
        get env() { return sandboxProcess.env; },
        cwd() { return sandboxProcess.cwd(); }
    };
}
// Native node.js environment
else if (typeof process_process !== 'undefined') {
    safeProcess = {
        get platform() { return process_process.platform; },
        get arch() { return process_process.arch; },
        get env() { return process_process.env; },
        cwd() { return process_process.env['VSCODE_CWD'] || process_process.cwd(); }
    };
}
// Web environment
else {
    safeProcess = {
        // Supported
        get platform() { return isWindows ? 'win32' : isMacintosh ? 'darwin' : 'linux'; },
        get arch() { return undefined; /* arch is undefined in web */ },
        // Unsupported
        get env() { return {}; },
        cwd() { return '/'; }
    };
}
/**
 * Provides safe access to the `cwd` property in node.js, sandboxed or web
 * environments.
 *
 * Note: in web, this property is hardcoded to be `/`.
 *
 * @skipMangle
 */
const process_cwd = safeProcess.cwd;
/**
 * Provides safe access to the `env` property in node.js, sandboxed or web
 * environments.
 *
 * Note: in web, this property is hardcoded to be `{}`.
 */
const env = safeProcess.env;
/**
 * Provides safe access to the `platform` property in node.js, sandboxed or web
 * environments.
 */
const platform = safeProcess.platform;

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/base/common/path.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// NOTE: VSCode's copy of nodejs path library to be usable in common (non-node) namespace
// Copied from: https://github.com/nodejs/node/blob/v16.14.2/lib/path.js
/**
 * Copyright Joyent, Inc. and other Node contributors.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a
 * copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 * OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
 * NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
 * DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
 * OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
 * USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const CHAR_UPPERCASE_A = 65; /* A */
const CHAR_LOWERCASE_A = 97; /* a */
const CHAR_UPPERCASE_Z = 90; /* Z */
const CHAR_LOWERCASE_Z = 122; /* z */
const CHAR_DOT = 46; /* . */
const CHAR_FORWARD_SLASH = 47; /* / */
const CHAR_BACKWARD_SLASH = 92; /* \ */
const CHAR_COLON = 58; /* : */
const CHAR_QUESTION_MARK = 63; /* ? */
class ErrorInvalidArgType extends Error {
    constructor(name, expected, actual) {
        // determiner: 'must be' or 'must not be'
        let determiner;
        if (typeof expected === 'string' && expected.indexOf('not ') === 0) {
            determiner = 'must not be';
            expected = expected.replace(/^not /, '');
        }
        else {
            determiner = 'must be';
        }
        const type = name.indexOf('.') !== -1 ? 'property' : 'argument';
        let msg = `The "${name}" ${type} ${determiner} of type ${expected}`;
        msg += `. Received type ${typeof actual}`;
        super(msg);
        this.code = 'ERR_INVALID_ARG_TYPE';
    }
}
function validateObject(pathObject, name) {
    if (pathObject === null || typeof pathObject !== 'object') {
        throw new ErrorInvalidArgType(name, 'Object', pathObject);
    }
}
function validateString(value, name) {
    if (typeof value !== 'string') {
        throw new ErrorInvalidArgType(name, 'string', value);
    }
}
const platformIsWin32 = (platform === 'win32');
function isPathSeparator(code) {
    return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
}
function isPosixPathSeparator(code) {
    return code === CHAR_FORWARD_SLASH;
}
function isWindowsDeviceRoot(code) {
    return (code >= CHAR_UPPERCASE_A && code <= CHAR_UPPERCASE_Z) ||
        (code >= CHAR_LOWERCASE_A && code <= CHAR_LOWERCASE_Z);
}
// Resolves . and .. elements in a path with directory names
function normalizeString(path, allowAboveRoot, separator, isPathSeparator) {
    let res = '';
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let code = 0;
    for (let i = 0; i <= path.length; ++i) {
        if (i < path.length) {
            code = path.charCodeAt(i);
        }
        else if (isPathSeparator(code)) {
            break;
        }
        else {
            code = CHAR_FORWARD_SLASH;
        }
        if (isPathSeparator(code)) {
            if (lastSlash === i - 1 || dots === 1) {
                // NOOP
            }
            else if (dots === 2) {
                if (res.length < 2 || lastSegmentLength !== 2 ||
                    res.charCodeAt(res.length - 1) !== CHAR_DOT ||
                    res.charCodeAt(res.length - 2) !== CHAR_DOT) {
                    if (res.length > 2) {
                        const lastSlashIndex = res.lastIndexOf(separator);
                        if (lastSlashIndex === -1) {
                            res = '';
                            lastSegmentLength = 0;
                        }
                        else {
                            res = res.slice(0, lastSlashIndex);
                            lastSegmentLength = res.length - 1 - res.lastIndexOf(separator);
                        }
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                    else if (res.length !== 0) {
                        res = '';
                        lastSegmentLength = 0;
                        lastSlash = i;
                        dots = 0;
                        continue;
                    }
                }
                if (allowAboveRoot) {
                    res += res.length > 0 ? `${separator}..` : '..';
                    lastSegmentLength = 2;
                }
            }
            else {
                if (res.length > 0) {
                    res += `${separator}${path.slice(lastSlash + 1, i)}`;
                }
                else {
                    res = path.slice(lastSlash + 1, i);
                }
                lastSegmentLength = i - lastSlash - 1;
            }
            lastSlash = i;
            dots = 0;
        }
        else if (code === CHAR_DOT && dots !== -1) {
            ++dots;
        }
        else {
            dots = -1;
        }
    }
    return res;
}
function path_format(sep, pathObject) {
    validateObject(pathObject, 'pathObject');
    const dir = pathObject.dir || pathObject.root;
    const base = pathObject.base ||
        `${pathObject.name || ''}${pathObject.ext || ''}`;
    if (!dir) {
        return base;
    }
    return dir === pathObject.root ? `${dir}${base}` : `${dir}${sep}${base}`;
}
const win32 = {
    // path.resolve([from ...], to)
    resolve(...pathSegments) {
        let resolvedDevice = '';
        let resolvedTail = '';
        let resolvedAbsolute = false;
        for (let i = pathSegments.length - 1; i >= -1; i--) {
            let path;
            if (i >= 0) {
                path = pathSegments[i];
                validateString(path, 'path');
                // Skip empty entries
                if (path.length === 0) {
                    continue;
                }
            }
            else if (resolvedDevice.length === 0) {
                path = process_cwd();
            }
            else {
                // Windows has the concept of drive-specific current working
                // directories. If we've resolved a drive letter but not yet an
                // absolute path, get cwd for that drive, or the process cwd if
                // the drive cwd is not available. We're sure the device is not
                // a UNC path at this points, because UNC paths are always absolute.
                path = env[`=${resolvedDevice}`] || process_cwd();
                // Verify that a cwd was found and that it actually points
                // to our drive. If not, default to the drive's root.
                if (path === undefined ||
                    (path.slice(0, 2).toLowerCase() !== resolvedDevice.toLowerCase() &&
                        path.charCodeAt(2) === CHAR_BACKWARD_SLASH)) {
                    path = `${resolvedDevice}\\`;
                }
            }
            const len = path.length;
            let rootEnd = 0;
            let device = '';
            let isAbsolute = false;
            const code = path.charCodeAt(0);
            // Try to match a root
            if (len === 1) {
                if (isPathSeparator(code)) {
                    // `path` contains just a path separator
                    rootEnd = 1;
                    isAbsolute = true;
                }
            }
            else if (isPathSeparator(code)) {
                // Possible UNC root
                // If we started with a separator, we know we at least have an
                // absolute path of some kind (UNC or otherwise)
                isAbsolute = true;
                if (isPathSeparator(path.charCodeAt(1))) {
                    // Matched double path separator at beginning
                    let j = 2;
                    let last = j;
                    // Match 1 or more non-path separators
                    while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        const firstPart = path.slice(last, j);
                        // Matched!
                        last = j;
                        // Match 1 or more path separators
                        while (j < len && isPathSeparator(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j < len && j !== last) {
                            // Matched!
                            last = j;
                            // Match 1 or more non-path separators
                            while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                                j++;
                            }
                            if (j === len || j !== last) {
                                // We matched a UNC root
                                device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                                rootEnd = j;
                            }
                        }
                    }
                }
                else {
                    rootEnd = 1;
                }
            }
            else if (isWindowsDeviceRoot(code) &&
                path.charCodeAt(1) === CHAR_COLON) {
                // Possible device root
                device = path.slice(0, 2);
                rootEnd = 2;
                if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
                    // Treat separator following drive name as an absolute path
                    // indicator
                    isAbsolute = true;
                    rootEnd = 3;
                }
            }
            if (device.length > 0) {
                if (resolvedDevice.length > 0) {
                    if (device.toLowerCase() !== resolvedDevice.toLowerCase()) {
                        // This path points to another device so it is not applicable
                        continue;
                    }
                }
                else {
                    resolvedDevice = device;
                }
            }
            if (resolvedAbsolute) {
                if (resolvedDevice.length > 0) {
                    break;
                }
            }
            else {
                resolvedTail = `${path.slice(rootEnd)}\\${resolvedTail}`;
                resolvedAbsolute = isAbsolute;
                if (isAbsolute && resolvedDevice.length > 0) {
                    break;
                }
            }
        }
        // At this point the path should be resolved to a full absolute path,
        // but handle relative paths to be safe (might happen when process.cwd()
        // fails)
        // Normalize the tail path
        resolvedTail = normalizeString(resolvedTail, !resolvedAbsolute, '\\', isPathSeparator);
        return resolvedAbsolute ?
            `${resolvedDevice}\\${resolvedTail}` :
            `${resolvedDevice}${resolvedTail}` || '.';
    },
    normalize(path) {
        validateString(path, 'path');
        const len = path.length;
        if (len === 0) {
            return '.';
        }
        let rootEnd = 0;
        let device;
        let isAbsolute = false;
        const code = path.charCodeAt(0);
        // Try to match a root
        if (len === 1) {
            // `path` contains just a single char, exit early to avoid
            // unnecessary work
            return isPosixPathSeparator(code) ? '\\' : path;
        }
        if (isPathSeparator(code)) {
            // Possible UNC root
            // If we started with a separator, we know we at least have an absolute
            // path of some kind (UNC or otherwise)
            isAbsolute = true;
            if (isPathSeparator(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                    j++;
                }
                if (j < len && j !== last) {
                    const firstPart = path.slice(last, j);
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    while (j < len && isPathSeparator(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j === len) {
                            // We matched a UNC root only
                            // Return the normalized version of the UNC root since there
                            // is nothing left to process
                            return `\\\\${firstPart}\\${path.slice(last)}\\`;
                        }
                        if (j !== last) {
                            // We matched a UNC root with leftovers
                            device = `\\\\${firstPart}\\${path.slice(last, j)}`;
                            rootEnd = j;
                        }
                    }
                }
            }
            else {
                rootEnd = 1;
            }
        }
        else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
            // Possible device root
            device = path.slice(0, 2);
            rootEnd = 2;
            if (len > 2 && isPathSeparator(path.charCodeAt(2))) {
                // Treat separator following drive name as an absolute path
                // indicator
                isAbsolute = true;
                rootEnd = 3;
            }
        }
        let tail = rootEnd < len ?
            normalizeString(path.slice(rootEnd), !isAbsolute, '\\', isPathSeparator) :
            '';
        if (tail.length === 0 && !isAbsolute) {
            tail = '.';
        }
        if (tail.length > 0 && isPathSeparator(path.charCodeAt(len - 1))) {
            tail += '\\';
        }
        if (device === undefined) {
            return isAbsolute ? `\\${tail}` : tail;
        }
        return isAbsolute ? `${device}\\${tail}` : `${device}${tail}`;
    },
    isAbsolute(path) {
        validateString(path, 'path');
        const len = path.length;
        if (len === 0) {
            return false;
        }
        const code = path.charCodeAt(0);
        return isPathSeparator(code) ||
            // Possible device root
            (len > 2 &&
                isWindowsDeviceRoot(code) &&
                path.charCodeAt(1) === CHAR_COLON &&
                isPathSeparator(path.charCodeAt(2)));
    },
    join(...paths) {
        if (paths.length === 0) {
            return '.';
        }
        let joined;
        let firstPart;
        for (let i = 0; i < paths.length; ++i) {
            const arg = paths[i];
            validateString(arg, 'path');
            if (arg.length > 0) {
                if (joined === undefined) {
                    joined = firstPart = arg;
                }
                else {
                    joined += `\\${arg}`;
                }
            }
        }
        if (joined === undefined) {
            return '.';
        }
        // Make sure that the joined path doesn't start with two slashes, because
        // normalize() will mistake it for a UNC path then.
        //
        // This step is skipped when it is very clear that the user actually
        // intended to point at a UNC path. This is assumed when the first
        // non-empty string arguments starts with exactly two slashes followed by
        // at least one more non-slash character.
        //
        // Note that for normalize() to treat a path as a UNC path it needs to
        // have at least 2 components, so we don't filter for that here.
        // This means that the user can use join to construct UNC paths from
        // a server name and a share name; for example:
        //   path.join('//server', 'share') -> '\\\\server\\share\\')
        let needsReplace = true;
        let slashCount = 0;
        if (typeof firstPart === 'string' && isPathSeparator(firstPart.charCodeAt(0))) {
            ++slashCount;
            const firstLen = firstPart.length;
            if (firstLen > 1 && isPathSeparator(firstPart.charCodeAt(1))) {
                ++slashCount;
                if (firstLen > 2) {
                    if (isPathSeparator(firstPart.charCodeAt(2))) {
                        ++slashCount;
                    }
                    else {
                        // We matched a UNC path in the first part
                        needsReplace = false;
                    }
                }
            }
        }
        if (needsReplace) {
            // Find any more consecutive slashes we need to replace
            while (slashCount < joined.length &&
                isPathSeparator(joined.charCodeAt(slashCount))) {
                slashCount++;
            }
            // Replace the slashes if needed
            if (slashCount >= 2) {
                joined = `\\${joined.slice(slashCount)}`;
            }
        }
        return win32.normalize(joined);
    },
    // It will solve the relative path from `from` to `to`, for instance:
    //  from = 'C:\\orandea\\test\\aaa'
    //  to = 'C:\\orandea\\impl\\bbb'
    // The output of the function should be: '..\\..\\impl\\bbb'
    relative(from, to) {
        validateString(from, 'from');
        validateString(to, 'to');
        if (from === to) {
            return '';
        }
        const fromOrig = win32.resolve(from);
        const toOrig = win32.resolve(to);
        if (fromOrig === toOrig) {
            return '';
        }
        from = fromOrig.toLowerCase();
        to = toOrig.toLowerCase();
        if (from === to) {
            return '';
        }
        // Trim any leading backslashes
        let fromStart = 0;
        while (fromStart < from.length &&
            from.charCodeAt(fromStart) === CHAR_BACKWARD_SLASH) {
            fromStart++;
        }
        // Trim trailing backslashes (applicable to UNC paths only)
        let fromEnd = from.length;
        while (fromEnd - 1 > fromStart &&
            from.charCodeAt(fromEnd - 1) === CHAR_BACKWARD_SLASH) {
            fromEnd--;
        }
        const fromLen = fromEnd - fromStart;
        // Trim any leading backslashes
        let toStart = 0;
        while (toStart < to.length &&
            to.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
            toStart++;
        }
        // Trim trailing backslashes (applicable to UNC paths only)
        let toEnd = to.length;
        while (toEnd - 1 > toStart &&
            to.charCodeAt(toEnd - 1) === CHAR_BACKWARD_SLASH) {
            toEnd--;
        }
        const toLen = toEnd - toStart;
        // Compare paths to find the longest common path from root
        const length = fromLen < toLen ? fromLen : toLen;
        let lastCommonSep = -1;
        let i = 0;
        for (; i < length; i++) {
            const fromCode = from.charCodeAt(fromStart + i);
            if (fromCode !== to.charCodeAt(toStart + i)) {
                break;
            }
            else if (fromCode === CHAR_BACKWARD_SLASH) {
                lastCommonSep = i;
            }
        }
        // We found a mismatch before the first common path separator was seen, so
        // return the original `to`.
        if (i !== length) {
            if (lastCommonSep === -1) {
                return toOrig;
            }
        }
        else {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === CHAR_BACKWARD_SLASH) {
                    // We get here if `from` is the exact base path for `to`.
                    // For example: from='C:\\foo\\bar'; to='C:\\foo\\bar\\baz'
                    return toOrig.slice(toStart + i + 1);
                }
                if (i === 2) {
                    // We get here if `from` is the device root.
                    // For example: from='C:\\'; to='C:\\foo'
                    return toOrig.slice(toStart + i);
                }
            }
            if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === CHAR_BACKWARD_SLASH) {
                    // We get here if `to` is the exact base path for `from`.
                    // For example: from='C:\\foo\\bar'; to='C:\\foo'
                    lastCommonSep = i;
                }
                else if (i === 2) {
                    // We get here if `to` is the device root.
                    // For example: from='C:\\foo\\bar'; to='C:\\'
                    lastCommonSep = 3;
                }
            }
            if (lastCommonSep === -1) {
                lastCommonSep = 0;
            }
        }
        let out = '';
        // Generate the relative path based on the path difference between `to` and
        // `from`
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === CHAR_BACKWARD_SLASH) {
                out += out.length === 0 ? '..' : '\\..';
            }
        }
        toStart += lastCommonSep;
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts
        if (out.length > 0) {
            return `${out}${toOrig.slice(toStart, toEnd)}`;
        }
        if (toOrig.charCodeAt(toStart) === CHAR_BACKWARD_SLASH) {
            ++toStart;
        }
        return toOrig.slice(toStart, toEnd);
    },
    toNamespacedPath(path) {
        // Note: this will *probably* throw somewhere.
        if (typeof path !== 'string' || path.length === 0) {
            return path;
        }
        const resolvedPath = win32.resolve(path);
        if (resolvedPath.length <= 2) {
            return path;
        }
        if (resolvedPath.charCodeAt(0) === CHAR_BACKWARD_SLASH) {
            // Possible UNC root
            if (resolvedPath.charCodeAt(1) === CHAR_BACKWARD_SLASH) {
                const code = resolvedPath.charCodeAt(2);
                if (code !== CHAR_QUESTION_MARK && code !== CHAR_DOT) {
                    // Matched non-long UNC root, convert the path to a long UNC path
                    return `\\\\?\\UNC\\${resolvedPath.slice(2)}`;
                }
            }
        }
        else if (isWindowsDeviceRoot(resolvedPath.charCodeAt(0)) &&
            resolvedPath.charCodeAt(1) === CHAR_COLON &&
            resolvedPath.charCodeAt(2) === CHAR_BACKWARD_SLASH) {
            // Matched device root, convert the path to a long UNC path
            return `\\\\?\\${resolvedPath}`;
        }
        return path;
    },
    dirname(path) {
        validateString(path, 'path');
        const len = path.length;
        if (len === 0) {
            return '.';
        }
        let rootEnd = -1;
        let offset = 0;
        const code = path.charCodeAt(0);
        if (len === 1) {
            // `path` contains just a path separator, exit early to avoid
            // unnecessary work or a dot.
            return isPathSeparator(code) ? path : '.';
        }
        // Try to match a root
        if (isPathSeparator(code)) {
            // Possible UNC root
            rootEnd = offset = 1;
            if (isPathSeparator(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                    j++;
                }
                if (j < len && j !== last) {
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    while (j < len && isPathSeparator(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j === len) {
                            // We matched a UNC root only
                            return path;
                        }
                        if (j !== last) {
                            // We matched a UNC root with leftovers
                            // Offset by 1 to include the separator after the UNC root to
                            // treat it as a "normal root" on top of a (UNC) root
                            rootEnd = offset = j + 1;
                        }
                    }
                }
            }
            // Possible device root
        }
        else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
            rootEnd = len > 2 && isPathSeparator(path.charCodeAt(2)) ? 3 : 2;
            offset = rootEnd;
        }
        let end = -1;
        let matchedSlash = true;
        for (let i = len - 1; i >= offset; --i) {
            if (isPathSeparator(path.charCodeAt(i))) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                // We saw the first non-path separator
                matchedSlash = false;
            }
        }
        if (end === -1) {
            if (rootEnd === -1) {
                return '.';
            }
            end = rootEnd;
        }
        return path.slice(0, end);
    },
    basename(path, ext) {
        if (ext !== undefined) {
            validateString(ext, 'ext');
        }
        validateString(path, 'path');
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded
        if (path.length >= 2 &&
            isWindowsDeviceRoot(path.charCodeAt(0)) &&
            path.charCodeAt(1) === CHAR_COLON) {
            start = 2;
        }
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext === path) {
                return '';
            }
            let extIdx = ext.length - 1;
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= start; --i) {
                const code = path.charCodeAt(i);
                if (isPathSeparator(code)) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                // We matched the extension, so mark this as the end of our path
                                // component
                                end = i;
                            }
                        }
                        else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end) {
                end = firstNonSlashEnd;
            }
            else if (end === -1) {
                end = path.length;
            }
            return path.slice(start, end);
        }
        for (i = path.length - 1; i >= start; --i) {
            if (isPathSeparator(path.charCodeAt(i))) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            }
            else if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // path component
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) {
            return '';
        }
        return path.slice(start, end);
    },
    extname(path) {
        validateString(path, 'path');
        let start = 0;
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Check for a drive letter prefix so as not to mistake the following
        // path separator as an extra separator at the end of the path that can be
        // disregarded
        if (path.length >= 2 &&
            path.charCodeAt(1) === CHAR_COLON &&
            isWindowsDeviceRoot(path.charCodeAt(0))) {
            start = startPart = 2;
        }
        for (let i = path.length - 1; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (isPathSeparator(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) {
                    startDot = i;
                }
                else if (preDotState !== 1) {
                    preDotState = 1;
                }
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 &&
                startDot === end - 1 &&
                startDot === startPart + 1)) {
            return '';
        }
        return path.slice(startDot, end);
    },
    format: path_format.bind(null, '\\'),
    parse(path) {
        validateString(path, 'path');
        const ret = { root: '', dir: '', base: '', ext: '', name: '' };
        if (path.length === 0) {
            return ret;
        }
        const len = path.length;
        let rootEnd = 0;
        let code = path.charCodeAt(0);
        if (len === 1) {
            if (isPathSeparator(code)) {
                // `path` contains just a path separator, exit early to avoid
                // unnecessary work
                ret.root = ret.dir = path;
                return ret;
            }
            ret.base = ret.name = path;
            return ret;
        }
        // Try to match a root
        if (isPathSeparator(code)) {
            // Possible UNC root
            rootEnd = 1;
            if (isPathSeparator(path.charCodeAt(1))) {
                // Matched double path separator at beginning
                let j = 2;
                let last = j;
                // Match 1 or more non-path separators
                while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                    j++;
                }
                if (j < len && j !== last) {
                    // Matched!
                    last = j;
                    // Match 1 or more path separators
                    while (j < len && isPathSeparator(path.charCodeAt(j))) {
                        j++;
                    }
                    if (j < len && j !== last) {
                        // Matched!
                        last = j;
                        // Match 1 or more non-path separators
                        while (j < len && !isPathSeparator(path.charCodeAt(j))) {
                            j++;
                        }
                        if (j === len) {
                            // We matched a UNC root only
                            rootEnd = j;
                        }
                        else if (j !== last) {
                            // We matched a UNC root with leftovers
                            rootEnd = j + 1;
                        }
                    }
                }
            }
        }
        else if (isWindowsDeviceRoot(code) && path.charCodeAt(1) === CHAR_COLON) {
            // Possible device root
            if (len <= 2) {
                // `path` contains just a drive root, exit early to avoid
                // unnecessary work
                ret.root = ret.dir = path;
                return ret;
            }
            rootEnd = 2;
            if (isPathSeparator(path.charCodeAt(2))) {
                if (len === 3) {
                    // `path` contains just a drive root, exit early to avoid
                    // unnecessary work
                    ret.root = ret.dir = path;
                    return ret;
                }
                rootEnd = 3;
            }
        }
        if (rootEnd > 0) {
            ret.root = path.slice(0, rootEnd);
        }
        let startDot = -1;
        let startPart = rootEnd;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Get non-dir info
        for (; i >= rootEnd; --i) {
            code = path.charCodeAt(i);
            if (isPathSeparator(code)) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) {
                    startDot = i;
                }
                else if (preDotState !== 1) {
                    preDotState = 1;
                }
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (end !== -1) {
            if (startDot === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                    startDot === end - 1 &&
                    startDot === startPart + 1)) {
                ret.base = ret.name = path.slice(startPart, end);
            }
            else {
                ret.name = path.slice(startPart, startDot);
                ret.base = path.slice(startPart, end);
                ret.ext = path.slice(startDot, end);
            }
        }
        // If the directory is the root, use the entire root as the `dir` including
        // the trailing slash if any (`C:\abc` -> `C:\`). Otherwise, strip out the
        // trailing slash (`C:\abc\def` -> `C:\abc`).
        if (startPart > 0 && startPart !== rootEnd) {
            ret.dir = path.slice(0, startPart - 1);
        }
        else {
            ret.dir = ret.root;
        }
        return ret;
    },
    sep: '\\',
    delimiter: ';',
    win32: null,
    posix: null
};
const posixCwd = (() => {
    if (platformIsWin32) {
        // Converts Windows' backslash path separators to POSIX forward slashes
        // and truncates any drive indicator
        const regexp = /\\/g;
        return () => {
            const cwd = process_cwd().replace(regexp, '/');
            return cwd.slice(cwd.indexOf('/'));
        };
    }
    // We're already on POSIX, no need for any transformations
    return () => process_cwd();
})();
const posix = {
    // path.resolve([from ...], to)
    resolve(...pathSegments) {
        let resolvedPath = '';
        let resolvedAbsolute = false;
        for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
            const path = i >= 0 ? pathSegments[i] : posixCwd();
            validateString(path, 'path');
            // Skip empty entries
            if (path.length === 0) {
                continue;
            }
            resolvedPath = `${path}/${resolvedPath}`;
            resolvedAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        // Normalize the path
        resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute, '/', isPosixPathSeparator);
        if (resolvedAbsolute) {
            return `/${resolvedPath}`;
        }
        return resolvedPath.length > 0 ? resolvedPath : '.';
    },
    normalize(path) {
        validateString(path, 'path');
        if (path.length === 0) {
            return '.';
        }
        const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        const trailingSeparator = path.charCodeAt(path.length - 1) === CHAR_FORWARD_SLASH;
        // Normalize the path
        path = normalizeString(path, !isAbsolute, '/', isPosixPathSeparator);
        if (path.length === 0) {
            if (isAbsolute) {
                return '/';
            }
            return trailingSeparator ? './' : '.';
        }
        if (trailingSeparator) {
            path += '/';
        }
        return isAbsolute ? `/${path}` : path;
    },
    isAbsolute(path) {
        validateString(path, 'path');
        return path.length > 0 && path.charCodeAt(0) === CHAR_FORWARD_SLASH;
    },
    join(...paths) {
        if (paths.length === 0) {
            return '.';
        }
        let joined;
        for (let i = 0; i < paths.length; ++i) {
            const arg = paths[i];
            validateString(arg, 'path');
            if (arg.length > 0) {
                if (joined === undefined) {
                    joined = arg;
                }
                else {
                    joined += `/${arg}`;
                }
            }
        }
        if (joined === undefined) {
            return '.';
        }
        return posix.normalize(joined);
    },
    relative(from, to) {
        validateString(from, 'from');
        validateString(to, 'to');
        if (from === to) {
            return '';
        }
        // Trim leading forward slashes.
        from = posix.resolve(from);
        to = posix.resolve(to);
        if (from === to) {
            return '';
        }
        const fromStart = 1;
        const fromEnd = from.length;
        const fromLen = fromEnd - fromStart;
        const toStart = 1;
        const toLen = to.length - toStart;
        // Compare paths to find the longest common path from root
        const length = (fromLen < toLen ? fromLen : toLen);
        let lastCommonSep = -1;
        let i = 0;
        for (; i < length; i++) {
            const fromCode = from.charCodeAt(fromStart + i);
            if (fromCode !== to.charCodeAt(toStart + i)) {
                break;
            }
            else if (fromCode === CHAR_FORWARD_SLASH) {
                lastCommonSep = i;
            }
        }
        if (i === length) {
            if (toLen > length) {
                if (to.charCodeAt(toStart + i) === CHAR_FORWARD_SLASH) {
                    // We get here if `from` is the exact base path for `to`.
                    // For example: from='/foo/bar'; to='/foo/bar/baz'
                    return to.slice(toStart + i + 1);
                }
                if (i === 0) {
                    // We get here if `from` is the root
                    // For example: from='/'; to='/foo'
                    return to.slice(toStart + i);
                }
            }
            else if (fromLen > length) {
                if (from.charCodeAt(fromStart + i) === CHAR_FORWARD_SLASH) {
                    // We get here if `to` is the exact base path for `from`.
                    // For example: from='/foo/bar/baz'; to='/foo/bar'
                    lastCommonSep = i;
                }
                else if (i === 0) {
                    // We get here if `to` is the root.
                    // For example: from='/foo/bar'; to='/'
                    lastCommonSep = 0;
                }
            }
        }
        let out = '';
        // Generate the relative path based on the path difference between `to`
        // and `from`.
        for (i = fromStart + lastCommonSep + 1; i <= fromEnd; ++i) {
            if (i === fromEnd || from.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                out += out.length === 0 ? '..' : '/..';
            }
        }
        // Lastly, append the rest of the destination (`to`) path that comes after
        // the common path parts.
        return `${out}${to.slice(toStart + lastCommonSep)}`;
    },
    toNamespacedPath(path) {
        // Non-op on posix systems
        return path;
    },
    dirname(path) {
        validateString(path, 'path');
        if (path.length === 0) {
            return '.';
        }
        const hasRoot = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        let end = -1;
        let matchedSlash = true;
        for (let i = path.length - 1; i >= 1; --i) {
            if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                if (!matchedSlash) {
                    end = i;
                    break;
                }
            }
            else {
                // We saw the first non-path separator
                matchedSlash = false;
            }
        }
        if (end === -1) {
            return hasRoot ? '/' : '.';
        }
        if (hasRoot && end === 1) {
            return '//';
        }
        return path.slice(0, end);
    },
    basename(path, ext) {
        if (ext !== undefined) {
            validateString(ext, 'ext');
        }
        validateString(path, 'path');
        let start = 0;
        let end = -1;
        let matchedSlash = true;
        let i;
        if (ext !== undefined && ext.length > 0 && ext.length <= path.length) {
            if (ext === path) {
                return '';
            }
            let extIdx = ext.length - 1;
            let firstNonSlashEnd = -1;
            for (i = path.length - 1; i >= 0; --i) {
                const code = path.charCodeAt(i);
                if (code === CHAR_FORWARD_SLASH) {
                    // If we reached a path separator that was not part of a set of path
                    // separators at the end of the string, stop now
                    if (!matchedSlash) {
                        start = i + 1;
                        break;
                    }
                }
                else {
                    if (firstNonSlashEnd === -1) {
                        // We saw the first non-path separator, remember this index in case
                        // we need it if the extension ends up not matching
                        matchedSlash = false;
                        firstNonSlashEnd = i + 1;
                    }
                    if (extIdx >= 0) {
                        // Try to match the explicit extension
                        if (code === ext.charCodeAt(extIdx)) {
                            if (--extIdx === -1) {
                                // We matched the extension, so mark this as the end of our path
                                // component
                                end = i;
                            }
                        }
                        else {
                            // Extension does not match, so our result is the entire path
                            // component
                            extIdx = -1;
                            end = firstNonSlashEnd;
                        }
                    }
                }
            }
            if (start === end) {
                end = firstNonSlashEnd;
            }
            else if (end === -1) {
                end = path.length;
            }
            return path.slice(start, end);
        }
        for (i = path.length - 1; i >= 0; --i) {
            if (path.charCodeAt(i) === CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    start = i + 1;
                    break;
                }
            }
            else if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // path component
                matchedSlash = false;
                end = i + 1;
            }
        }
        if (end === -1) {
            return '';
        }
        return path.slice(start, end);
    },
    extname(path) {
        validateString(path, 'path');
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        for (let i = path.length - 1; i >= 0; --i) {
            const code = path.charCodeAt(i);
            if (code === CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) {
                    startDot = i;
                }
                else if (preDotState !== 1) {
                    preDotState = 1;
                }
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (startDot === -1 ||
            end === -1 ||
            // We saw a non-dot character immediately before the dot
            preDotState === 0 ||
            // The (right-most) trimmed path component is exactly '..'
            (preDotState === 1 &&
                startDot === end - 1 &&
                startDot === startPart + 1)) {
            return '';
        }
        return path.slice(startDot, end);
    },
    format: path_format.bind(null, '/'),
    parse(path) {
        validateString(path, 'path');
        const ret = { root: '', dir: '', base: '', ext: '', name: '' };
        if (path.length === 0) {
            return ret;
        }
        const isAbsolute = path.charCodeAt(0) === CHAR_FORWARD_SLASH;
        let start;
        if (isAbsolute) {
            ret.root = '/';
            start = 1;
        }
        else {
            start = 0;
        }
        let startDot = -1;
        let startPart = 0;
        let end = -1;
        let matchedSlash = true;
        let i = path.length - 1;
        // Track the state of characters (if any) we see before our first dot and
        // after any path separator we find
        let preDotState = 0;
        // Get non-dir info
        for (; i >= start; --i) {
            const code = path.charCodeAt(i);
            if (code === CHAR_FORWARD_SLASH) {
                // If we reached a path separator that was not part of a set of path
                // separators at the end of the string, stop now
                if (!matchedSlash) {
                    startPart = i + 1;
                    break;
                }
                continue;
            }
            if (end === -1) {
                // We saw the first non-path separator, mark this as the end of our
                // extension
                matchedSlash = false;
                end = i + 1;
            }
            if (code === CHAR_DOT) {
                // If this is our first dot, mark it as the start of our extension
                if (startDot === -1) {
                    startDot = i;
                }
                else if (preDotState !== 1) {
                    preDotState = 1;
                }
            }
            else if (startDot !== -1) {
                // We saw a non-dot and non-path separator before our dot, so we should
                // have a good chance at having a non-empty extension
                preDotState = -1;
            }
        }
        if (end !== -1) {
            const start = startPart === 0 && isAbsolute ? 1 : startPart;
            if (startDot === -1 ||
                // We saw a non-dot character immediately before the dot
                preDotState === 0 ||
                // The (right-most) trimmed path component is exactly '..'
                (preDotState === 1 &&
                    startDot === end - 1 &&
                    startDot === startPart + 1)) {
                ret.base = ret.name = path.slice(start, end);
            }
            else {
                ret.name = path.slice(start, startDot);
                ret.base = path.slice(start, end);
                ret.ext = path.slice(startDot, end);
            }
        }
        if (startPart > 0) {
            ret.dir = path.slice(0, startPart - 1);
        }
        else if (isAbsolute) {
            ret.dir = '/';
        }
        return ret;
    },
    sep: '/',
    delimiter: ':',
    win32: null,
    posix: null
};
posix.win32 = win32.win32 = win32;
posix.posix = win32.posix = posix;
const normalize = (platformIsWin32 ? win32.normalize : posix.normalize);
const resolve = (platformIsWin32 ? win32.resolve : posix.resolve);
const relative = (platformIsWin32 ? win32.relative : posix.relative);
const dirname = (platformIsWin32 ? win32.dirname : posix.dirname);
const basename = (platformIsWin32 ? win32.basename : posix.basename);
const extname = (platformIsWin32 ? win32.extname : posix.extname);
const sep = (platformIsWin32 ? win32.sep : posix.sep);

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/base/common/uri.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


const _schemePattern = /^\w[\w\d+.-]*$/;
const _singleSlashStart = /^\//;
const _doubleSlashStart = /^\/\//;
function _validateUri(ret, _strict) {
    // scheme, must be set
    if (!ret.scheme && _strict) {
        throw new Error(`[UriError]: Scheme is missing: {scheme: "", authority: "${ret.authority}", path: "${ret.path}", query: "${ret.query}", fragment: "${ret.fragment}"}`);
    }
    // scheme, https://tools.ietf.org/html/rfc3986#section-3.1
    // ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
    if (ret.scheme && !_schemePattern.test(ret.scheme)) {
        throw new Error('[UriError]: Scheme contains illegal characters.');
    }
    // path, http://tools.ietf.org/html/rfc3986#section-3.3
    // If a URI contains an authority component, then the path component
    // must either be empty or begin with a slash ("/") character.  If a URI
    // does not contain an authority component, then the path cannot begin
    // with two slash characters ("//").
    if (ret.path) {
        if (ret.authority) {
            if (!_singleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            }
        }
        else {
            if (_doubleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
            }
        }
    }
}
// for a while we allowed uris *without* schemes and this is the migration
// for them, e.g. an uri without scheme and without strict-mode warns and falls
// back to the file-scheme. that should cause the least carnage and still be a
// clear warning
function _schemeFix(scheme, _strict) {
    if (!scheme && !_strict) {
        return 'file';
    }
    return scheme;
}
// implements a bit of https://tools.ietf.org/html/rfc3986#section-5
function _referenceResolution(scheme, path) {
    // the slash-character is our 'default base' as we don't
    // support constructing URIs relative to other URIs. This
    // also means that we alter and potentially break paths.
    // see https://tools.ietf.org/html/rfc3986#section-5.1.4
    switch (scheme) {
        case 'https':
        case 'http':
        case 'file':
            if (!path) {
                path = _slash;
            }
            else if (path[0] !== _slash) {
                path = _slash + path;
            }
            break;
    }
    return path;
}
const _empty = '';
const _slash = '/';
const _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
/**
 * Uniform Resource Identifier (URI) http://tools.ietf.org/html/rfc3986.
 * This class is a simple parser which creates the basic component parts
 * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
 * and encoding.
 *
 * ```txt
 *       foo://example.com:8042/over/there?name=ferret#nose
 *       \_/   \______________/\_________/ \_________/ \__/
 *        |           |            |            |        |
 *     scheme     authority       path        query   fragment
 *        |   _____________________|__
 *       / \ /                        \
 *       urn:example:animal:ferret:nose
 * ```
 */
class uri_URI {
    static isUri(thing) {
        if (thing instanceof uri_URI) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return typeof thing.authority === 'string'
            && typeof thing.fragment === 'string'
            && typeof thing.path === 'string'
            && typeof thing.query === 'string'
            && typeof thing.scheme === 'string'
            && typeof thing.fsPath === 'string'
            && typeof thing.with === 'function'
            && typeof thing.toString === 'function';
    }
    /**
     * @internal
     */
    constructor(schemeOrData, authority, path, query, fragment, _strict = false) {
        if (typeof schemeOrData === 'object') {
            this.scheme = schemeOrData.scheme || _empty;
            this.authority = schemeOrData.authority || _empty;
            this.path = schemeOrData.path || _empty;
            this.query = schemeOrData.query || _empty;
            this.fragment = schemeOrData.fragment || _empty;
            // no validation because it's this URI
            // that creates uri components.
            // _validateUri(this);
        }
        else {
            this.scheme = _schemeFix(schemeOrData, _strict);
            this.authority = authority || _empty;
            this.path = _referenceResolution(this.scheme, path || _empty);
            this.query = query || _empty;
            this.fragment = fragment || _empty;
            _validateUri(this, _strict);
        }
    }
    // ---- filesystem path -----------------------
    /**
     * Returns a string representing the corresponding file system path of this URI.
     * Will handle UNC paths, normalizes windows drive letters to lower-case, and uses the
     * platform specific path separator.
     *
     * * Will *not* validate the path for invalid characters and semantics.
     * * Will *not* look at the scheme of this URI.
     * * The result shall *not* be used for display purposes but for accessing a file on disk.
     *
     *
     * The *difference* to `URI#path` is the use of the platform specific separator and the handling
     * of UNC paths. See the below sample of a file-uri with an authority (UNC path).
     *
     * ```ts
        const u = URI.parse('file://server/c$/folder/file.txt')
        u.authority === 'server'
        u.path === '/shares/c$/file.txt'
        u.fsPath === '\\server\c$\folder\file.txt'
    ```
     *
     * Using `URI#path` to read a file (using fs-apis) would not be enough because parts of the path,
     * namely the server name, would be missing. Therefore `URI#fsPath` exists - it's sugar to ease working
     * with URIs that represent files on disk (`file` scheme).
     */
    get fsPath() {
        // if (this.scheme !== 'file') {
        // 	console.warn(`[UriError] calling fsPath with scheme ${this.scheme}`);
        // }
        return uriToFsPath(this, false);
    }
    // ---- modify to new -------------------------
    with(change) {
        if (!change) {
            return this;
        }
        let { scheme, authority, path, query, fragment } = change;
        if (scheme === undefined) {
            scheme = this.scheme;
        }
        else if (scheme === null) {
            scheme = _empty;
        }
        if (authority === undefined) {
            authority = this.authority;
        }
        else if (authority === null) {
            authority = _empty;
        }
        if (path === undefined) {
            path = this.path;
        }
        else if (path === null) {
            path = _empty;
        }
        if (query === undefined) {
            query = this.query;
        }
        else if (query === null) {
            query = _empty;
        }
        if (fragment === undefined) {
            fragment = this.fragment;
        }
        else if (fragment === null) {
            fragment = _empty;
        }
        if (scheme === this.scheme
            && authority === this.authority
            && path === this.path
            && query === this.query
            && fragment === this.fragment) {
            return this;
        }
        return new Uri(scheme, authority, path, query, fragment);
    }
    // ---- parse & validate ------------------------
    /**
     * Creates a new URI from a string, e.g. `http://www.example.com/some/path`,
     * `file:///usr/home`, or `scheme:with/path`.
     *
     * @param value A string which represents an URI (see `URI#toString`).
     */
    static parse(value, _strict = false) {
        const match = _regexp.exec(value);
        if (!match) {
            return new Uri(_empty, _empty, _empty, _empty, _empty);
        }
        return new Uri(match[2] || _empty, percentDecode(match[4] || _empty), percentDecode(match[5] || _empty), percentDecode(match[7] || _empty), percentDecode(match[9] || _empty), _strict);
    }
    /**
     * Creates a new URI from a file system path, e.g. `c:\my\files`,
     * `/usr/home`, or `\\server\share\some\path`.
     *
     * The *difference* between `URI#parse` and `URI#file` is that the latter treats the argument
     * as path, not as stringified-uri. E.g. `URI.file(path)` is **not the same as**
     * `URI.parse('file://' + path)` because the path might contain characters that are
     * interpreted (# and ?). See the following sample:
     * ```ts
    const good = URI.file('/coding/c#/project1');
    good.scheme === 'file';
    good.path === '/coding/c#/project1';
    good.fragment === '';
    const bad = URI.parse('file://' + '/coding/c#/project1');
    bad.scheme === 'file';
    bad.path === '/coding/c'; // path is now broken
    bad.fragment === '/project1';
    ```
     *
     * @param path A file system path (see `URI#fsPath`)
     */
    static file(path) {
        let authority = _empty;
        // normalize to fwd-slashes on windows,
        // on other systems bwd-slashes are valid
        // filename character, eg /f\oo/ba\r.txt
        if (isWindows) {
            path = path.replace(/\\/g, _slash);
        }
        // check for authority as used in UNC shares
        // or use the path as given
        if (path[0] === _slash && path[1] === _slash) {
            const idx = path.indexOf(_slash, 2);
            if (idx === -1) {
                authority = path.substring(2);
                path = _slash;
            }
            else {
                authority = path.substring(2, idx);
                path = path.substring(idx) || _slash;
            }
        }
        return new Uri('file', authority, path, _empty, _empty);
    }
    /**
     * Creates new URI from uri components.
     *
     * Unless `strict` is `true` the scheme is defaults to be `file`. This function performs
     * validation and should be used for untrusted uri components retrieved from storage,
     * user input, command arguments etc
     */
    static from(components, strict) {
        const result = new Uri(components.scheme, components.authority, components.path, components.query, components.fragment, strict);
        return result;
    }
    /**
     * Join a URI path with path fragments and normalizes the resulting path.
     *
     * @param uri The input URI.
     * @param pathFragment The path fragment to add to the URI path.
     * @returns The resulting URI.
     */
    static joinPath(uri, ...pathFragment) {
        if (!uri.path) {
            throw new Error(`[UriError]: cannot call joinPath on URI without path`);
        }
        let newPath;
        if (isWindows && uri.scheme === 'file') {
            newPath = uri_URI.file(win32.join(uriToFsPath(uri, true), ...pathFragment)).path;
        }
        else {
            newPath = posix.join(uri.path, ...pathFragment);
        }
        return uri.with({ path: newPath });
    }
    // ---- printing/externalize ---------------------------
    /**
     * Creates a string representation for this URI. It's guaranteed that calling
     * `URI.parse` with the result of this function creates an URI which is equal
     * to this URI.
     *
     * * The result shall *not* be used for display purposes but for externalization or transport.
     * * The result will be encoded using the percentage encoding and encoding happens mostly
     * ignore the scheme-specific encoding rules.
     *
     * @param skipEncoding Do not encode the result, default is `false`
     */
    toString(skipEncoding = false) {
        return _asFormatted(this, skipEncoding);
    }
    toJSON() {
        return this;
    }
    static revive(data) {
        var _a, _b;
        if (!data) {
            return data;
        }
        else if (data instanceof uri_URI) {
            return data;
        }
        else {
            const result = new Uri(data);
            result._formatted = (_a = data.external) !== null && _a !== void 0 ? _a : null;
            result._fsPath = data._sep === _pathSepMarker ? (_b = data.fsPath) !== null && _b !== void 0 ? _b : null : null;
            return result;
        }
    }
}
const _pathSepMarker = isWindows ? 1 : undefined;
// This class exists so that URI is compatible with vscode.Uri (API).
class Uri extends uri_URI {
    constructor() {
        super(...arguments);
        this._formatted = null;
        this._fsPath = null;
    }
    get fsPath() {
        if (!this._fsPath) {
            this._fsPath = uriToFsPath(this, false);
        }
        return this._fsPath;
    }
    toString(skipEncoding = false) {
        if (!skipEncoding) {
            if (!this._formatted) {
                this._formatted = _asFormatted(this, false);
            }
            return this._formatted;
        }
        else {
            // we don't cache that
            return _asFormatted(this, true);
        }
    }
    toJSON() {
        const res = {
            $mid: 1 /* MarshalledId.Uri */
        };
        // cached state
        if (this._fsPath) {
            res.fsPath = this._fsPath;
            res._sep = _pathSepMarker;
        }
        if (this._formatted) {
            res.external = this._formatted;
        }
        //--- uri components
        if (this.path) {
            res.path = this.path;
        }
        // TODO
        // this isn't correct and can violate the UriComponents contract but
        // this is part of the vscode.Uri API and we shouldn't change how that
        // works anymore
        if (this.scheme) {
            res.scheme = this.scheme;
        }
        if (this.authority) {
            res.authority = this.authority;
        }
        if (this.query) {
            res.query = this.query;
        }
        if (this.fragment) {
            res.fragment = this.fragment;
        }
        return res;
    }
}
// reserved characters: https://tools.ietf.org/html/rfc3986#section-2.2
const encodeTable = {
    [58 /* CharCode.Colon */]: '%3A', // gen-delims
    [47 /* CharCode.Slash */]: '%2F',
    [63 /* CharCode.QuestionMark */]: '%3F',
    [35 /* CharCode.Hash */]: '%23',
    [91 /* CharCode.OpenSquareBracket */]: '%5B',
    [93 /* CharCode.CloseSquareBracket */]: '%5D',
    [64 /* CharCode.AtSign */]: '%40',
    [33 /* CharCode.ExclamationMark */]: '%21', // sub-delims
    [36 /* CharCode.DollarSign */]: '%24',
    [38 /* CharCode.Ampersand */]: '%26',
    [39 /* CharCode.SingleQuote */]: '%27',
    [40 /* CharCode.OpenParen */]: '%28',
    [41 /* CharCode.CloseParen */]: '%29',
    [42 /* CharCode.Asterisk */]: '%2A',
    [43 /* CharCode.Plus */]: '%2B',
    [44 /* CharCode.Comma */]: '%2C',
    [59 /* CharCode.Semicolon */]: '%3B',
    [61 /* CharCode.Equals */]: '%3D',
    [32 /* CharCode.Space */]: '%20',
};
function encodeURIComponentFast(uriComponent, isPath, isAuthority) {
    let res = undefined;
    let nativeEncodePos = -1;
    for (let pos = 0; pos < uriComponent.length; pos++) {
        const code = uriComponent.charCodeAt(pos);
        // unreserved characters: https://tools.ietf.org/html/rfc3986#section-2.3
        if ((code >= 97 /* CharCode.a */ && code <= 122 /* CharCode.z */)
            || (code >= 65 /* CharCode.A */ && code <= 90 /* CharCode.Z */)
            || (code >= 48 /* CharCode.Digit0 */ && code <= 57 /* CharCode.Digit9 */)
            || code === 45 /* CharCode.Dash */
            || code === 46 /* CharCode.Period */
            || code === 95 /* CharCode.Underline */
            || code === 126 /* CharCode.Tilde */
            || (isPath && code === 47 /* CharCode.Slash */)
            || (isAuthority && code === 91 /* CharCode.OpenSquareBracket */)
            || (isAuthority && code === 93 /* CharCode.CloseSquareBracket */)
            || (isAuthority && code === 58 /* CharCode.Colon */)) {
            // check if we are delaying native encode
            if (nativeEncodePos !== -1) {
                res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                nativeEncodePos = -1;
            }
            // check if we write into a new string (by default we try to return the param)
            if (res !== undefined) {
                res += uriComponent.charAt(pos);
            }
        }
        else {
            // encoding needed, we need to allocate a new string
            if (res === undefined) {
                res = uriComponent.substr(0, pos);
            }
            // check with default table first
            const escaped = encodeTable[code];
            if (escaped !== undefined) {
                // check if we are delaying native encode
                if (nativeEncodePos !== -1) {
                    res += encodeURIComponent(uriComponent.substring(nativeEncodePos, pos));
                    nativeEncodePos = -1;
                }
                // append escaped variant to result
                res += escaped;
            }
            else if (nativeEncodePos === -1) {
                // use native encode only when needed
                nativeEncodePos = pos;
            }
        }
    }
    if (nativeEncodePos !== -1) {
        res += encodeURIComponent(uriComponent.substring(nativeEncodePos));
    }
    return res !== undefined ? res : uriComponent;
}
function encodeURIComponentMinimal(path) {
    let res = undefined;
    for (let pos = 0; pos < path.length; pos++) {
        const code = path.charCodeAt(pos);
        if (code === 35 /* CharCode.Hash */ || code === 63 /* CharCode.QuestionMark */) {
            if (res === undefined) {
                res = path.substr(0, pos);
            }
            res += encodeTable[code];
        }
        else {
            if (res !== undefined) {
                res += path[pos];
            }
        }
    }
    return res !== undefined ? res : path;
}
/**
 * Compute `fsPath` for the given uri
 */
function uriToFsPath(uri, keepDriveLetterCasing) {
    let value;
    if (uri.authority && uri.path.length > 1 && uri.scheme === 'file') {
        // unc path: file://shares/c$/far/boo
        value = `//${uri.authority}${uri.path}`;
    }
    else if (uri.path.charCodeAt(0) === 47 /* CharCode.Slash */
        && (uri.path.charCodeAt(1) >= 65 /* CharCode.A */ && uri.path.charCodeAt(1) <= 90 /* CharCode.Z */ || uri.path.charCodeAt(1) >= 97 /* CharCode.a */ && uri.path.charCodeAt(1) <= 122 /* CharCode.z */)
        && uri.path.charCodeAt(2) === 58 /* CharCode.Colon */) {
        if (!keepDriveLetterCasing) {
            // windows drive letter: file:///c:/far/boo
            value = uri.path[1].toLowerCase() + uri.path.substr(2);
        }
        else {
            value = uri.path.substr(1);
        }
    }
    else {
        // other path
        value = uri.path;
    }
    if (isWindows) {
        value = value.replace(/\//g, '\\');
    }
    return value;
}
/**
 * Create the external version of a uri
 */
function _asFormatted(uri, skipEncoding) {
    const encoder = !skipEncoding
        ? encodeURIComponentFast
        : encodeURIComponentMinimal;
    let res = '';
    let { scheme, authority, path, query, fragment } = uri;
    if (scheme) {
        res += scheme;
        res += ':';
    }
    if (authority || scheme === 'file') {
        res += _slash;
        res += _slash;
    }
    if (authority) {
        let idx = authority.indexOf('@');
        if (idx !== -1) {
            // <user>@<auth>
            const userinfo = authority.substr(0, idx);
            authority = authority.substr(idx + 1);
            idx = userinfo.lastIndexOf(':');
            if (idx === -1) {
                res += encoder(userinfo, false, false);
            }
            else {
                // <user>:<pass>@<auth>
                res += encoder(userinfo.substr(0, idx), false, false);
                res += ':';
                res += encoder(userinfo.substr(idx + 1), false, true);
            }
            res += '@';
        }
        authority = authority.toLowerCase();
        idx = authority.lastIndexOf(':');
        if (idx === -1) {
            res += encoder(authority, false, true);
        }
        else {
            // <auth>:<port>
            res += encoder(authority.substr(0, idx), false, true);
            res += authority.substr(idx);
        }
    }
    if (path) {
        // lower-case windows drive letters in /C:/fff or C:/fff
        if (path.length >= 3 && path.charCodeAt(0) === 47 /* CharCode.Slash */ && path.charCodeAt(2) === 58 /* CharCode.Colon */) {
            const code = path.charCodeAt(1);
            if (code >= 65 /* CharCode.A */ && code <= 90 /* CharCode.Z */) {
                path = `/${String.fromCharCode(code + 32)}:${path.substr(3)}`; // "/c:".length === 3
            }
        }
        else if (path.length >= 2 && path.charCodeAt(1) === 58 /* CharCode.Colon */) {
            const code = path.charCodeAt(0);
            if (code >= 65 /* CharCode.A */ && code <= 90 /* CharCode.Z */) {
                path = `${String.fromCharCode(code + 32)}:${path.substr(2)}`; // "/c:".length === 3
            }
        }
        // encode the rest of the path
        res += encoder(path, true, false);
    }
    if (query) {
        res += '?';
        res += encoder(query, false, false);
    }
    if (fragment) {
        res += '#';
        res += !skipEncoding ? encodeURIComponentFast(fragment, false, false) : fragment;
    }
    return res;
}
// --- decode
function decodeURIComponentGraceful(str) {
    try {
        return decodeURIComponent(str);
    }
    catch (_a) {
        if (str.length > 3) {
            return str.substr(0, 3) + decodeURIComponentGraceful(str.substr(3));
        }
        else {
            return str;
        }
    }
}
const _rEncodedAsHex = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
function percentDecode(str) {
    if (!str.match(_rEncodedAsHex)) {
        return str;
    }
    return str.replace(_rEncodedAsHex, (match) => decodeURIComponentGraceful(match));
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/core/position.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * A position in the editor.
 */
class position_Position {
    constructor(lineNumber, column) {
        this.lineNumber = lineNumber;
        this.column = column;
    }
    /**
     * Create a new position from this position.
     *
     * @param newLineNumber new line number
     * @param newColumn new column
     */
    with(newLineNumber = this.lineNumber, newColumn = this.column) {
        if (newLineNumber === this.lineNumber && newColumn === this.column) {
            return this;
        }
        else {
            return new position_Position(newLineNumber, newColumn);
        }
    }
    /**
     * Derive a new position from this position.
     *
     * @param deltaLineNumber line number delta
     * @param deltaColumn column delta
     */
    delta(deltaLineNumber = 0, deltaColumn = 0) {
        return this.with(this.lineNumber + deltaLineNumber, this.column + deltaColumn);
    }
    /**
     * Test if this position equals other position
     */
    equals(other) {
        return position_Position.equals(this, other);
    }
    /**
     * Test if position `a` equals position `b`
     */
    static equals(a, b) {
        if (!a && !b) {
            return true;
        }
        return (!!a &&
            !!b &&
            a.lineNumber === b.lineNumber &&
            a.column === b.column);
    }
    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be false.
     */
    isBefore(other) {
        return position_Position.isBefore(this, other);
    }
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be false.
     */
    static isBefore(a, b) {
        if (a.lineNumber < b.lineNumber) {
            return true;
        }
        if (b.lineNumber < a.lineNumber) {
            return false;
        }
        return a.column < b.column;
    }
    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be true.
     */
    isBeforeOrEqual(other) {
        return position_Position.isBeforeOrEqual(this, other);
    }
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be true.
     */
    static isBeforeOrEqual(a, b) {
        if (a.lineNumber < b.lineNumber) {
            return true;
        }
        if (b.lineNumber < a.lineNumber) {
            return false;
        }
        return a.column <= b.column;
    }
    /**
     * A function that compares positions, useful for sorting
     */
    static compare(a, b) {
        const aLineNumber = a.lineNumber | 0;
        const bLineNumber = b.lineNumber | 0;
        if (aLineNumber === bLineNumber) {
            const aColumn = a.column | 0;
            const bColumn = b.column | 0;
            return aColumn - bColumn;
        }
        return aLineNumber - bLineNumber;
    }
    /**
     * Clone this position.
     */
    clone() {
        return new position_Position(this.lineNumber, this.column);
    }
    /**
     * Convert to a human-readable representation.
     */
    toString() {
        return '(' + this.lineNumber + ',' + this.column + ')';
    }
    // ---
    /**
     * Create a `Position` from an `IPosition`.
     */
    static lift(pos) {
        return new position_Position(pos.lineNumber, pos.column);
    }
    /**
     * Test if `obj` is an `IPosition`.
     */
    static isIPosition(obj) {
        return (obj
            && (typeof obj.lineNumber === 'number')
            && (typeof obj.column === 'number'));
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/core/range.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * A range in the editor. (startLineNumber,startColumn) is <= (endLineNumber,endColumn)
 */
class range_Range {
    constructor(startLineNumber, startColumn, endLineNumber, endColumn) {
        if ((startLineNumber > endLineNumber) || (startLineNumber === endLineNumber && startColumn > endColumn)) {
            this.startLineNumber = endLineNumber;
            this.startColumn = endColumn;
            this.endLineNumber = startLineNumber;
            this.endColumn = startColumn;
        }
        else {
            this.startLineNumber = startLineNumber;
            this.startColumn = startColumn;
            this.endLineNumber = endLineNumber;
            this.endColumn = endColumn;
        }
    }
    /**
     * Test if this range is empty.
     */
    isEmpty() {
        return range_Range.isEmpty(this);
    }
    /**
     * Test if `range` is empty.
     */
    static isEmpty(range) {
        return (range.startLineNumber === range.endLineNumber && range.startColumn === range.endColumn);
    }
    /**
     * Test if position is in this range. If the position is at the edges, will return true.
     */
    containsPosition(position) {
        return range_Range.containsPosition(this, position);
    }
    /**
     * Test if `position` is in `range`. If the position is at the edges, will return true.
     */
    static containsPosition(range, position) {
        if (position.lineNumber < range.startLineNumber || position.lineNumber > range.endLineNumber) {
            return false;
        }
        if (position.lineNumber === range.startLineNumber && position.column < range.startColumn) {
            return false;
        }
        if (position.lineNumber === range.endLineNumber && position.column > range.endColumn) {
            return false;
        }
        return true;
    }
    /**
     * Test if `position` is in `range`. If the position is at the edges, will return false.
     * @internal
     */
    static strictContainsPosition(range, position) {
        if (position.lineNumber < range.startLineNumber || position.lineNumber > range.endLineNumber) {
            return false;
        }
        if (position.lineNumber === range.startLineNumber && position.column <= range.startColumn) {
            return false;
        }
        if (position.lineNumber === range.endLineNumber && position.column >= range.endColumn) {
            return false;
        }
        return true;
    }
    /**
     * Test if range is in this range. If the range is equal to this range, will return true.
     */
    containsRange(range) {
        return range_Range.containsRange(this, range);
    }
    /**
     * Test if `otherRange` is in `range`. If the ranges are equal, will return true.
     */
    static containsRange(range, otherRange) {
        if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) {
            return false;
        }
        if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) {
            return false;
        }
        if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn < range.startColumn) {
            return false;
        }
        if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn > range.endColumn) {
            return false;
        }
        return true;
    }
    /**
     * Test if `range` is strictly in this range. `range` must start after and end before this range for the result to be true.
     */
    strictContainsRange(range) {
        return range_Range.strictContainsRange(this, range);
    }
    /**
     * Test if `otherRange` is strictly in `range` (must start after, and end before). If the ranges are equal, will return false.
     */
    static strictContainsRange(range, otherRange) {
        if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) {
            return false;
        }
        if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) {
            return false;
        }
        if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn <= range.startColumn) {
            return false;
        }
        if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn >= range.endColumn) {
            return false;
        }
        return true;
    }
    /**
     * A reunion of the two ranges.
     * The smallest position will be used as the start point, and the largest one as the end point.
     */
    plusRange(range) {
        return range_Range.plusRange(this, range);
    }
    /**
     * A reunion of the two ranges.
     * The smallest position will be used as the start point, and the largest one as the end point.
     */
    static plusRange(a, b) {
        let startLineNumber;
        let startColumn;
        let endLineNumber;
        let endColumn;
        if (b.startLineNumber < a.startLineNumber) {
            startLineNumber = b.startLineNumber;
            startColumn = b.startColumn;
        }
        else if (b.startLineNumber === a.startLineNumber) {
            startLineNumber = b.startLineNumber;
            startColumn = Math.min(b.startColumn, a.startColumn);
        }
        else {
            startLineNumber = a.startLineNumber;
            startColumn = a.startColumn;
        }
        if (b.endLineNumber > a.endLineNumber) {
            endLineNumber = b.endLineNumber;
            endColumn = b.endColumn;
        }
        else if (b.endLineNumber === a.endLineNumber) {
            endLineNumber = b.endLineNumber;
            endColumn = Math.max(b.endColumn, a.endColumn);
        }
        else {
            endLineNumber = a.endLineNumber;
            endColumn = a.endColumn;
        }
        return new range_Range(startLineNumber, startColumn, endLineNumber, endColumn);
    }
    /**
     * A intersection of the two ranges.
     */
    intersectRanges(range) {
        return range_Range.intersectRanges(this, range);
    }
    /**
     * A intersection of the two ranges.
     */
    static intersectRanges(a, b) {
        let resultStartLineNumber = a.startLineNumber;
        let resultStartColumn = a.startColumn;
        let resultEndLineNumber = a.endLineNumber;
        let resultEndColumn = a.endColumn;
        const otherStartLineNumber = b.startLineNumber;
        const otherStartColumn = b.startColumn;
        const otherEndLineNumber = b.endLineNumber;
        const otherEndColumn = b.endColumn;
        if (resultStartLineNumber < otherStartLineNumber) {
            resultStartLineNumber = otherStartLineNumber;
            resultStartColumn = otherStartColumn;
        }
        else if (resultStartLineNumber === otherStartLineNumber) {
            resultStartColumn = Math.max(resultStartColumn, otherStartColumn);
        }
        if (resultEndLineNumber > otherEndLineNumber) {
            resultEndLineNumber = otherEndLineNumber;
            resultEndColumn = otherEndColumn;
        }
        else if (resultEndLineNumber === otherEndLineNumber) {
            resultEndColumn = Math.min(resultEndColumn, otherEndColumn);
        }
        // Check if selection is now empty
        if (resultStartLineNumber > resultEndLineNumber) {
            return null;
        }
        if (resultStartLineNumber === resultEndLineNumber && resultStartColumn > resultEndColumn) {
            return null;
        }
        return new range_Range(resultStartLineNumber, resultStartColumn, resultEndLineNumber, resultEndColumn);
    }
    /**
     * Test if this range equals other.
     */
    equalsRange(other) {
        return range_Range.equalsRange(this, other);
    }
    /**
     * Test if range `a` equals `b`.
     */
    static equalsRange(a, b) {
        if (!a && !b) {
            return true;
        }
        return (!!a &&
            !!b &&
            a.startLineNumber === b.startLineNumber &&
            a.startColumn === b.startColumn &&
            a.endLineNumber === b.endLineNumber &&
            a.endColumn === b.endColumn);
    }
    /**
     * Return the end position (which will be after or equal to the start position)
     */
    getEndPosition() {
        return range_Range.getEndPosition(this);
    }
    /**
     * Return the end position (which will be after or equal to the start position)
     */
    static getEndPosition(range) {
        return new position_Position(range.endLineNumber, range.endColumn);
    }
    /**
     * Return the start position (which will be before or equal to the end position)
     */
    getStartPosition() {
        return range_Range.getStartPosition(this);
    }
    /**
     * Return the start position (which will be before or equal to the end position)
     */
    static getStartPosition(range) {
        return new position_Position(range.startLineNumber, range.startColumn);
    }
    /**
     * Transform to a user presentable string representation.
     */
    toString() {
        return '[' + this.startLineNumber + ',' + this.startColumn + ' -> ' + this.endLineNumber + ',' + this.endColumn + ']';
    }
    /**
     * Create a new range using this range's start position, and using endLineNumber and endColumn as the end position.
     */
    setEndPosition(endLineNumber, endColumn) {
        return new range_Range(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
    }
    /**
     * Create a new range using this range's end position, and using startLineNumber and startColumn as the start position.
     */
    setStartPosition(startLineNumber, startColumn) {
        return new range_Range(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
    }
    /**
     * Create a new empty range using this range's start position.
     */
    collapseToStart() {
        return range_Range.collapseToStart(this);
    }
    /**
     * Create a new empty range using this range's start position.
     */
    static collapseToStart(range) {
        return new range_Range(range.startLineNumber, range.startColumn, range.startLineNumber, range.startColumn);
    }
    /**
     * Create a new empty range using this range's end position.
     */
    collapseToEnd() {
        return range_Range.collapseToEnd(this);
    }
    /**
     * Create a new empty range using this range's end position.
     */
    static collapseToEnd(range) {
        return new range_Range(range.endLineNumber, range.endColumn, range.endLineNumber, range.endColumn);
    }
    /**
     * Moves the range by the given amount of lines.
     */
    delta(lineCount) {
        return new range_Range(this.startLineNumber + lineCount, this.startColumn, this.endLineNumber + lineCount, this.endColumn);
    }
    // ---
    static fromPositions(start, end = start) {
        return new range_Range(start.lineNumber, start.column, end.lineNumber, end.column);
    }
    static lift(range) {
        if (!range) {
            return null;
        }
        return new range_Range(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn);
    }
    /**
     * Test if `obj` is an `IRange`.
     */
    static isIRange(obj) {
        return (obj
            && (typeof obj.startLineNumber === 'number')
            && (typeof obj.startColumn === 'number')
            && (typeof obj.endLineNumber === 'number')
            && (typeof obj.endColumn === 'number'));
    }
    /**
     * Test if the two ranges are touching in any way.
     */
    static areIntersectingOrTouching(a, b) {
        // Check if `a` is before `b`
        if (a.endLineNumber < b.startLineNumber || (a.endLineNumber === b.startLineNumber && a.endColumn < b.startColumn)) {
            return false;
        }
        // Check if `b` is before `a`
        if (b.endLineNumber < a.startLineNumber || (b.endLineNumber === a.startLineNumber && b.endColumn < a.startColumn)) {
            return false;
        }
        // These ranges must intersect
        return true;
    }
    /**
     * Test if the two ranges are intersecting. If the ranges are touching it returns true.
     */
    static areIntersecting(a, b) {
        // Check if `a` is before `b`
        if (a.endLineNumber < b.startLineNumber || (a.endLineNumber === b.startLineNumber && a.endColumn <= b.startColumn)) {
            return false;
        }
        // Check if `b` is before `a`
        if (b.endLineNumber < a.startLineNumber || (b.endLineNumber === a.startLineNumber && b.endColumn <= a.startColumn)) {
            return false;
        }
        // These ranges must intersect
        return true;
    }
    /**
     * A function that compares ranges, useful for sorting ranges
     * It will first compare ranges on the startPosition and then on the endPosition
     */
    static compareRangesUsingStarts(a, b) {
        if (a && b) {
            const aStartLineNumber = a.startLineNumber | 0;
            const bStartLineNumber = b.startLineNumber | 0;
            if (aStartLineNumber === bStartLineNumber) {
                const aStartColumn = a.startColumn | 0;
                const bStartColumn = b.startColumn | 0;
                if (aStartColumn === bStartColumn) {
                    const aEndLineNumber = a.endLineNumber | 0;
                    const bEndLineNumber = b.endLineNumber | 0;
                    if (aEndLineNumber === bEndLineNumber) {
                        const aEndColumn = a.endColumn | 0;
                        const bEndColumn = b.endColumn | 0;
                        return aEndColumn - bEndColumn;
                    }
                    return aEndLineNumber - bEndLineNumber;
                }
                return aStartColumn - bStartColumn;
            }
            return aStartLineNumber - bStartLineNumber;
        }
        const aExists = (a ? 1 : 0);
        const bExists = (b ? 1 : 0);
        return aExists - bExists;
    }
    /**
     * A function that compares ranges, useful for sorting ranges
     * It will first compare ranges on the endPosition and then on the startPosition
     */
    static compareRangesUsingEnds(a, b) {
        if (a.endLineNumber === b.endLineNumber) {
            if (a.endColumn === b.endColumn) {
                if (a.startLineNumber === b.startLineNumber) {
                    return a.startColumn - b.startColumn;
                }
                return a.startLineNumber - b.startLineNumber;
            }
            return a.endColumn - b.endColumn;
        }
        return a.endLineNumber - b.endLineNumber;
    }
    /**
     * Test if the range spans multiple lines.
     */
    static spansMultipleLines(range) {
        return range.endLineNumber > range.startLineNumber;
    }
    toJSON() {
        return this;
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/base/common/arrays.js
/**
 * Returns the last element of an array.
 * @param array The array.
 * @param n Which element from the end (default is zero).
 */
function tail(array, n = 0) {
    return array[array.length - (1 + n)];
}
function tail2(arr) {
    if (arr.length === 0) {
        throw new Error('Invalid tail call');
    }
    return [arr.slice(0, arr.length - 1), arr[arr.length - 1]];
}
function arrays_equals(one, other, itemEquals = (a, b) => a === b) {
    if (one === other) {
        return true;
    }
    if (!one || !other) {
        return false;
    }
    if (one.length !== other.length) {
        return false;
    }
    for (let i = 0, len = one.length; i < len; i++) {
        if (!itemEquals(one[i], other[i])) {
            return false;
        }
    }
    return true;
}
/**
 * Remove the element at `index` by replacing it with the last element. This is faster than `splice`
 * but changes the order of the array
 */
function removeFastWithoutKeepingOrder(array, index) {
    const last = array.length - 1;
    if (index < last) {
        array[index] = array[last];
    }
    array.pop();
}
/**
 * Performs a binary search algorithm over a sorted array.
 *
 * @param array The array being searched.
 * @param key The value we search for.
 * @param comparator A function that takes two array elements and returns zero
 *   if they are equal, a negative number if the first element precedes the
 *   second one in the sorting order, or a positive number if the second element
 *   precedes the first one.
 * @return See {@link binarySearch2}
 */
function binarySearch(array, key, comparator) {
    return binarySearch2(array.length, i => comparator(array[i], key));
}
/**
 * Performs a binary search algorithm over a sorted collection. Useful for cases
 * when we need to perform a binary search over something that isn't actually an
 * array, and converting data to an array would defeat the use of binary search
 * in the first place.
 *
 * @param length The collection length.
 * @param compareToKey A function that takes an index of an element in the
 *   collection and returns zero if the value at this index is equal to the
 *   search key, a negative number if the value precedes the search key in the
 *   sorting order, or a positive number if the search key precedes the value.
 * @return A non-negative index of an element, if found. If not found, the
 *   result is -(n+1) (or ~n, using bitwise notation), where n is the index
 *   where the key should be inserted to maintain the sorting order.
 */
function binarySearch2(length, compareToKey) {
    let low = 0, high = length - 1;
    while (low <= high) {
        const mid = ((low + high) / 2) | 0;
        const comp = compareToKey(mid);
        if (comp < 0) {
            low = mid + 1;
        }
        else if (comp > 0) {
            high = mid - 1;
        }
        else {
            return mid;
        }
    }
    return -(low + 1);
}
function quickSelect(nth, data, compare) {
    nth = nth | 0;
    if (nth >= data.length) {
        throw new TypeError('invalid index');
    }
    const pivotValue = data[Math.floor(data.length * Math.random())];
    const lower = [];
    const higher = [];
    const pivots = [];
    for (const value of data) {
        const val = compare(value, pivotValue);
        if (val < 0) {
            lower.push(value);
        }
        else if (val > 0) {
            higher.push(value);
        }
        else {
            pivots.push(value);
        }
    }
    if (nth < lower.length) {
        return quickSelect(nth, lower, compare);
    }
    else if (nth < lower.length + pivots.length) {
        return pivots[0];
    }
    else {
        return quickSelect(nth - (lower.length + pivots.length), higher, compare);
    }
}
function groupBy(data, compare) {
    const result = [];
    let currentGroup = undefined;
    for (const element of data.slice(0).sort(compare)) {
        if (!currentGroup || compare(currentGroup[0], element) !== 0) {
            currentGroup = [element];
            result.push(currentGroup);
        }
        else {
            currentGroup.push(element);
        }
    }
    return result;
}
/**
 * Splits the given items into a list of (non-empty) groups.
 * `shouldBeGrouped` is used to decide if two consecutive items should be in the same group.
 * The order of the items is preserved.
 */
function* groupAdjacentBy(items, shouldBeGrouped) {
    let currentGroup;
    let last;
    for (const item of items) {
        if (last !== undefined && shouldBeGrouped(last, item)) {
            currentGroup.push(item);
        }
        else {
            if (currentGroup) {
                yield currentGroup;
            }
            currentGroup = [item];
        }
        last = item;
    }
    if (currentGroup) {
        yield currentGroup;
    }
}
function forEachAdjacent(arr, f) {
    for (let i = 0; i <= arr.length; i++) {
        f(i === 0 ? undefined : arr[i - 1], i === arr.length ? undefined : arr[i]);
    }
}
function forEachWithNeighbors(arr, f) {
    for (let i = 0; i < arr.length; i++) {
        f(i === 0 ? undefined : arr[i - 1], arr[i], i + 1 === arr.length ? undefined : arr[i + 1]);
    }
}
/**
 * @returns New array with all falsy values removed. The original array IS NOT modified.
 */
function coalesce(array) {
    return array.filter(e => !!e);
}
/**
 * Remove all falsy values from `array`. The original array IS modified.
 */
function coalesceInPlace(array) {
    let to = 0;
    for (let i = 0; i < array.length; i++) {
        if (!!array[i]) {
            array[to] = array[i];
            to += 1;
        }
    }
    array.length = to;
}
/**
 * @returns false if the provided object is an array and not empty.
 */
function isFalsyOrEmpty(obj) {
    return !Array.isArray(obj) || obj.length === 0;
}
function isNonEmptyArray(obj) {
    return Array.isArray(obj) && obj.length > 0;
}
/**
 * Removes duplicates from the given array. The optional keyFn allows to specify
 * how elements are checked for equality by returning an alternate value for each.
 */
function distinct(array, keyFn = value => value) {
    const seen = new Set();
    return array.filter(element => {
        const key = keyFn(element);
        if (seen.has(key)) {
            return false;
        }
        seen.add(key);
        return true;
    });
}
function firstOrDefault(array, notFoundValue) {
    return array.length > 0 ? array[0] : notFoundValue;
}
function range(arg, to) {
    let from = typeof to === 'number' ? arg : 0;
    if (typeof to === 'number') {
        from = arg;
    }
    else {
        from = 0;
        to = arg;
    }
    const result = [];
    if (from <= to) {
        for (let i = from; i < to; i++) {
            result.push(i);
        }
    }
    else {
        for (let i = from; i > to; i--) {
            result.push(i);
        }
    }
    return result;
}
/**
 * Insert `insertArr` inside `target` at `insertIndex`.
 * Please don't touch unless you understand https://jsperf.com/inserting-an-array-within-an-array
 */
function arrays_arrayInsert(target, insertIndex, insertArr) {
    const before = target.slice(0, insertIndex);
    const after = target.slice(insertIndex);
    return before.concat(insertArr, after);
}
/**
 * Pushes an element to the start of the array, if found.
 */
function pushToStart(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
        arr.unshift(value);
    }
}
/**
 * Pushes an element to the end of the array, if found.
 */
function pushToEnd(arr, value) {
    const index = arr.indexOf(value);
    if (index > -1) {
        arr.splice(index, 1);
        arr.push(value);
    }
}
function pushMany(arr, items) {
    for (const item of items) {
        arr.push(item);
    }
}
function asArray(x) {
    return Array.isArray(x) ? x : [x];
}
/**
 * Insert the new items in the array.
 * @param array The original array.
 * @param start The zero-based location in the array from which to start inserting elements.
 * @param newItems The items to be inserted
 */
function insertInto(array, start, newItems) {
    const startIdx = getActualStartIndex(array, start);
    const originalLength = array.length;
    const newItemsLength = newItems.length;
    array.length = originalLength + newItemsLength;
    // Move the items after the start index, start from the end so that we don't overwrite any value.
    for (let i = originalLength - 1; i >= startIdx; i--) {
        array[i + newItemsLength] = array[i];
    }
    for (let i = 0; i < newItemsLength; i++) {
        array[i + startIdx] = newItems[i];
    }
}
/**
 * Removes elements from an array and inserts new elements in their place, returning the deleted elements. Alternative to the native Array.splice method, it
 * can only support limited number of items due to the maximum call stack size limit.
 * @param array The original array.
 * @param start The zero-based location in the array from which to start removing elements.
 * @param deleteCount The number of elements to remove.
 * @returns An array containing the elements that were deleted.
 */
function splice(array, start, deleteCount, newItems) {
    const index = getActualStartIndex(array, start);
    let result = array.splice(index, deleteCount);
    if (result === undefined) {
        // see https://bugs.webkit.org/show_bug.cgi?id=261140
        result = [];
    }
    insertInto(array, index, newItems);
    return result;
}
/**
 * Determine the actual start index (same logic as the native splice() or slice())
 * If greater than the length of the array, start will be set to the length of the array. In this case, no element will be deleted but the method will behave as an adding function, adding as many element as item[n*] provided.
 * If negative, it will begin that many elements from the end of the array. (In this case, the origin -1, meaning -n is the index of the nth last element, and is therefore equivalent to the index of array.length - n.) If array.length + start is less than 0, it will begin from index 0.
 * @param array The target array.
 * @param start The operation index.
 */
function getActualStartIndex(array, start) {
    return start < 0 ? Math.max(start + array.length, 0) : Math.min(start, array.length);
}
var CompareResult;
(function (CompareResult) {
    function isLessThan(result) {
        return result < 0;
    }
    CompareResult.isLessThan = isLessThan;
    function isLessThanOrEqual(result) {
        return result <= 0;
    }
    CompareResult.isLessThanOrEqual = isLessThanOrEqual;
    function isGreaterThan(result) {
        return result > 0;
    }
    CompareResult.isGreaterThan = isGreaterThan;
    function isNeitherLessOrGreaterThan(result) {
        return result === 0;
    }
    CompareResult.isNeitherLessOrGreaterThan = isNeitherLessOrGreaterThan;
    CompareResult.greaterThan = 1;
    CompareResult.lessThan = -1;
    CompareResult.neitherLessOrGreaterThan = 0;
})(CompareResult || (CompareResult = {}));
function compareBy(selector, comparator) {
    return (a, b) => comparator(selector(a), selector(b));
}
function tieBreakComparators(...comparators) {
    return (item1, item2) => {
        for (const comparator of comparators) {
            const result = comparator(item1, item2);
            if (!CompareResult.isNeitherLessOrGreaterThan(result)) {
                return result;
            }
        }
        return CompareResult.neitherLessOrGreaterThan;
    };
}
/**
 * The natural order on numbers.
*/
const numberComparator = (a, b) => a - b;
const booleanComparator = (a, b) => numberComparator(a ? 1 : 0, b ? 1 : 0);
function reverseOrder(comparator) {
    return (a, b) => -comparator(a, b);
}
class ArrayQueue {
    /**
     * Constructs a queue that is backed by the given array. Runtime is O(1).
    */
    constructor(items) {
        this.items = items;
        this.firstIdx = 0;
        this.lastIdx = this.items.length - 1;
    }
    get length() {
        return this.lastIdx - this.firstIdx + 1;
    }
    /**
     * Consumes elements from the beginning of the queue as long as the predicate returns true.
     * If no elements were consumed, `null` is returned. Has a runtime of O(result.length).
    */
    takeWhile(predicate) {
        // P(k) := k <= this.lastIdx && predicate(this.items[k])
        // Find s := min { k | k >= this.firstIdx && !P(k) } and return this.data[this.firstIdx...s)
        let startIdx = this.firstIdx;
        while (startIdx < this.items.length && predicate(this.items[startIdx])) {
            startIdx++;
        }
        const result = startIdx === this.firstIdx ? null : this.items.slice(this.firstIdx, startIdx);
        this.firstIdx = startIdx;
        return result;
    }
    /**
     * Consumes elements from the end of the queue as long as the predicate returns true.
     * If no elements were consumed, `null` is returned.
     * The result has the same order as the underlying array!
    */
    takeFromEndWhile(predicate) {
        // P(k) := this.firstIdx >= k && predicate(this.items[k])
        // Find s := max { k | k <= this.lastIdx && !P(k) } and return this.data(s...this.lastIdx]
        let endIdx = this.lastIdx;
        while (endIdx >= 0 && predicate(this.items[endIdx])) {
            endIdx--;
        }
        const result = endIdx === this.lastIdx ? null : this.items.slice(endIdx + 1, this.lastIdx + 1);
        this.lastIdx = endIdx;
        return result;
    }
    peek() {
        if (this.length === 0) {
            return undefined;
        }
        return this.items[this.firstIdx];
    }
    dequeue() {
        const result = this.items[this.firstIdx];
        this.firstIdx++;
        return result;
    }
    takeCount(count) {
        const result = this.items.slice(this.firstIdx, this.firstIdx + count);
        this.firstIdx += count;
        return result;
    }
}
/**
 * This class is faster than an iterator and array for lazy computed data.
*/
class CallbackIterable {
    constructor(
    /**
     * Calls the callback for every item.
     * Stops when the callback returns false.
    */
    iterate) {
        this.iterate = iterate;
    }
    toArray() {
        const result = [];
        this.iterate(item => { result.push(item); return true; });
        return result;
    }
    filter(predicate) {
        return new CallbackIterable(cb => this.iterate(item => predicate(item) ? cb(item) : true));
    }
    map(mapFn) {
        return new CallbackIterable(cb => this.iterate(item => cb(mapFn(item))));
    }
    findLast(predicate) {
        let result;
        this.iterate(item => {
            if (predicate(item)) {
                result = item;
            }
            return true;
        });
        return result;
    }
    findLastMaxBy(comparator) {
        let result;
        let first = true;
        this.iterate(item => {
            if (first || CompareResult.isGreaterThan(comparator(item, result))) {
                first = false;
                result = item;
            }
            return true;
        });
        return result;
    }
}
CallbackIterable.empty = new CallbackIterable(_callback => { });

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/base/common/uint.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function toUint8(v) {
    if (v < 0) {
        return 0;
    }
    if (v > 255 /* Constants.MAX_UINT_8 */) {
        return 255 /* Constants.MAX_UINT_8 */;
    }
    return v | 0;
}
function toUint32(v) {
    if (v < 0) {
        return 0;
    }
    if (v > 4294967295 /* Constants.MAX_UINT_32 */) {
        return 4294967295 /* Constants.MAX_UINT_32 */;
    }
    return v | 0;
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/model/prefixSumComputer.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


class PrefixSumComputer {
    constructor(values) {
        this.values = values;
        this.prefixSum = new Uint32Array(values.length);
        this.prefixSumValidIndex = new Int32Array(1);
        this.prefixSumValidIndex[0] = -1;
    }
    insertValues(insertIndex, insertValues) {
        insertIndex = toUint32(insertIndex);
        const oldValues = this.values;
        const oldPrefixSum = this.prefixSum;
        const insertValuesLen = insertValues.length;
        if (insertValuesLen === 0) {
            return false;
        }
        this.values = new Uint32Array(oldValues.length + insertValuesLen);
        this.values.set(oldValues.subarray(0, insertIndex), 0);
        this.values.set(oldValues.subarray(insertIndex), insertIndex + insertValuesLen);
        this.values.set(insertValues, insertIndex);
        if (insertIndex - 1 < this.prefixSumValidIndex[0]) {
            this.prefixSumValidIndex[0] = insertIndex - 1;
        }
        this.prefixSum = new Uint32Array(this.values.length);
        if (this.prefixSumValidIndex[0] >= 0) {
            this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
        }
        return true;
    }
    setValue(index, value) {
        index = toUint32(index);
        value = toUint32(value);
        if (this.values[index] === value) {
            return false;
        }
        this.values[index] = value;
        if (index - 1 < this.prefixSumValidIndex[0]) {
            this.prefixSumValidIndex[0] = index - 1;
        }
        return true;
    }
    removeValues(startIndex, count) {
        startIndex = toUint32(startIndex);
        count = toUint32(count);
        const oldValues = this.values;
        const oldPrefixSum = this.prefixSum;
        if (startIndex >= oldValues.length) {
            return false;
        }
        const maxCount = oldValues.length - startIndex;
        if (count >= maxCount) {
            count = maxCount;
        }
        if (count === 0) {
            return false;
        }
        this.values = new Uint32Array(oldValues.length - count);
        this.values.set(oldValues.subarray(0, startIndex), 0);
        this.values.set(oldValues.subarray(startIndex + count), startIndex);
        this.prefixSum = new Uint32Array(this.values.length);
        if (startIndex - 1 < this.prefixSumValidIndex[0]) {
            this.prefixSumValidIndex[0] = startIndex - 1;
        }
        if (this.prefixSumValidIndex[0] >= 0) {
            this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
        }
        return true;
    }
    getTotalSum() {
        if (this.values.length === 0) {
            return 0;
        }
        return this._getPrefixSum(this.values.length - 1);
    }
    /**
     * Returns the sum of the first `index + 1` many items.
     * @returns `SUM(0 <= j <= index, values[j])`.
     */
    getPrefixSum(index) {
        if (index < 0) {
            return 0;
        }
        index = toUint32(index);
        return this._getPrefixSum(index);
    }
    _getPrefixSum(index) {
        if (index <= this.prefixSumValidIndex[0]) {
            return this.prefixSum[index];
        }
        let startIndex = this.prefixSumValidIndex[0] + 1;
        if (startIndex === 0) {
            this.prefixSum[0] = this.values[0];
            startIndex++;
        }
        if (index >= this.values.length) {
            index = this.values.length - 1;
        }
        for (let i = startIndex; i <= index; i++) {
            this.prefixSum[i] = this.prefixSum[i - 1] + this.values[i];
        }
        this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], index);
        return this.prefixSum[index];
    }
    getIndexOf(sum) {
        sum = Math.floor(sum);
        // Compute all sums (to get a fully valid prefixSum)
        this.getTotalSum();
        let low = 0;
        let high = this.values.length - 1;
        let mid = 0;
        let midStop = 0;
        let midStart = 0;
        while (low <= high) {
            mid = low + ((high - low) / 2) | 0;
            midStop = this.prefixSum[mid];
            midStart = midStop - this.values[mid];
            if (sum < midStart) {
                high = mid - 1;
            }
            else if (sum >= midStop) {
                low = mid + 1;
            }
            else {
                break;
            }
        }
        return new PrefixSumIndexOfResult(mid, sum - midStart);
    }
}
/**
 * {@link getIndexOf} has an amortized runtime complexity of O(1).
 *
 * ({@link PrefixSumComputer.getIndexOf} is just  O(log n))
*/
class ConstantTimePrefixSumComputer {
    constructor(values) {
        this._values = values;
        this._isValid = false;
        this._validEndIndex = -1;
        this._prefixSum = [];
        this._indexBySum = [];
    }
    /**
     * @returns SUM(0 <= j < values.length, values[j])
     */
    getTotalSum() {
        this._ensureValid();
        return this._indexBySum.length;
    }
    /**
     * Returns the sum of the first `count` many items.
     * @returns `SUM(0 <= j < count, values[j])`.
     */
    getPrefixSum(count) {
        this._ensureValid();
        if (count === 0) {
            return 0;
        }
        return this._prefixSum[count - 1];
    }
    /**
     * @returns `result`, such that `getPrefixSum(result.index) + result.remainder = sum`
     */
    getIndexOf(sum) {
        this._ensureValid();
        const idx = this._indexBySum[sum];
        const viewLinesAbove = idx > 0 ? this._prefixSum[idx - 1] : 0;
        return new PrefixSumIndexOfResult(idx, sum - viewLinesAbove);
    }
    removeValues(start, deleteCount) {
        this._values.splice(start, deleteCount);
        this._invalidate(start);
    }
    insertValues(insertIndex, insertArr) {
        this._values = arrayInsert(this._values, insertIndex, insertArr);
        this._invalidate(insertIndex);
    }
    _invalidate(index) {
        this._isValid = false;
        this._validEndIndex = Math.min(this._validEndIndex, index - 1);
    }
    _ensureValid() {
        if (this._isValid) {
            return;
        }
        for (let i = this._validEndIndex + 1, len = this._values.length; i < len; i++) {
            const value = this._values[i];
            const sumAbove = i > 0 ? this._prefixSum[i - 1] : 0;
            this._prefixSum[i] = sumAbove + value;
            for (let j = 0; j < value; j++) {
                this._indexBySum[sumAbove + j] = i;
            }
        }
        // trim things
        this._prefixSum.length = this._values.length;
        this._indexBySum.length = this._prefixSum[this._prefixSum.length - 1];
        // mark as valid
        this._isValid = true;
        this._validEndIndex = this._values.length - 1;
    }
    setValue(index, value) {
        if (this._values[index] === value) {
            // no change
            return;
        }
        this._values[index] = value;
        this._invalidate(index);
    }
}
class PrefixSumIndexOfResult {
    constructor(index, remainder) {
        this.index = index;
        this.remainder = remainder;
        this._prefixSumIndexOfResultBrand = undefined;
        this.index = index;
        this.remainder = remainder;
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/model/mirrorTextModel.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/



class MirrorTextModel {
    constructor(uri, lines, eol, versionId) {
        this._uri = uri;
        this._lines = lines;
        this._eol = eol;
        this._versionId = versionId;
        this._lineStarts = null;
        this._cachedTextValue = null;
    }
    dispose() {
        this._lines.length = 0;
    }
    get version() {
        return this._versionId;
    }
    getText() {
        if (this._cachedTextValue === null) {
            this._cachedTextValue = this._lines.join(this._eol);
        }
        return this._cachedTextValue;
    }
    onEvents(e) {
        if (e.eol && e.eol !== this._eol) {
            this._eol = e.eol;
            this._lineStarts = null;
        }
        // Update my lines
        const changes = e.changes;
        for (const change of changes) {
            this._acceptDeleteRange(change.range);
            this._acceptInsertText(new position_Position(change.range.startLineNumber, change.range.startColumn), change.text);
        }
        this._versionId = e.versionId;
        this._cachedTextValue = null;
    }
    _ensureLineStarts() {
        if (!this._lineStarts) {
            const eolLength = this._eol.length;
            const linesLength = this._lines.length;
            const lineStartValues = new Uint32Array(linesLength);
            for (let i = 0; i < linesLength; i++) {
                lineStartValues[i] = this._lines[i].length + eolLength;
            }
            this._lineStarts = new PrefixSumComputer(lineStartValues);
        }
    }
    /**
     * All changes to a line's text go through this method
     */
    _setLineText(lineIndex, newValue) {
        this._lines[lineIndex] = newValue;
        if (this._lineStarts) {
            // update prefix sum
            this._lineStarts.setValue(lineIndex, this._lines[lineIndex].length + this._eol.length);
        }
    }
    _acceptDeleteRange(range) {
        if (range.startLineNumber === range.endLineNumber) {
            if (range.startColumn === range.endColumn) {
                // Nothing to delete
                return;
            }
            // Delete text on the affected line
            this._setLineText(range.startLineNumber - 1, this._lines[range.startLineNumber - 1].substring(0, range.startColumn - 1)
                + this._lines[range.startLineNumber - 1].substring(range.endColumn - 1));
            return;
        }
        // Take remaining text on last line and append it to remaining text on first line
        this._setLineText(range.startLineNumber - 1, this._lines[range.startLineNumber - 1].substring(0, range.startColumn - 1)
            + this._lines[range.endLineNumber - 1].substring(range.endColumn - 1));
        // Delete middle lines
        this._lines.splice(range.startLineNumber, range.endLineNumber - range.startLineNumber);
        if (this._lineStarts) {
            // update prefix sum
            this._lineStarts.removeValues(range.startLineNumber, range.endLineNumber - range.startLineNumber);
        }
    }
    _acceptInsertText(position, insertText) {
        if (insertText.length === 0) {
            // Nothing to insert
            return;
        }
        const insertLines = splitLines(insertText);
        if (insertLines.length === 1) {
            // Inserting text on one line
            this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1)
                + insertLines[0]
                + this._lines[position.lineNumber - 1].substring(position.column - 1));
            return;
        }
        // Append overflowing text from first line to the end of text to insert
        insertLines[insertLines.length - 1] += this._lines[position.lineNumber - 1].substring(position.column - 1);
        // Delete overflowing text from first line and insert text on first line
        this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1)
            + insertLines[0]);
        // Insert new lines & store lengths
        const newLengths = new Uint32Array(insertLines.length - 1);
        for (let i = 1; i < insertLines.length; i++) {
            this._lines.splice(position.lineNumber + i - 1, 0, insertLines[i]);
            newLengths[i - 1] = insertLines[i].length + this._eol.length;
        }
        if (this._lineStarts) {
            // update prefix sum
            this._lineStarts.insertValues(position.lineNumber, newLengths);
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/core/wordHelper.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


const USUAL_WORD_SEPARATORS = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?';
/**
 * Create a word definition regular expression based on default word separators.
 * Optionally provide allowed separators that should be included in words.
 *
 * The default would look like this:
 * /(-?\d*\.\d\w*)|([^\`\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g
 */
function createWordRegExp(allowInWords = '') {
    let source = '(-?\\d*\\.\\d\\w*)|([^';
    for (const sep of USUAL_WORD_SEPARATORS) {
        if (allowInWords.indexOf(sep) >= 0) {
            continue;
        }
        source += '\\' + sep;
    }
    source += '\\s]+)';
    return new RegExp(source, 'g');
}
// catches numbers (including floating numbers) in the first group, and alphanum in the second
const DEFAULT_WORD_REGEXP = createWordRegExp();
function ensureValidWordDefinition(wordDefinition) {
    let result = DEFAULT_WORD_REGEXP;
    if (wordDefinition && (wordDefinition instanceof RegExp)) {
        if (!wordDefinition.global) {
            let flags = 'g';
            if (wordDefinition.ignoreCase) {
                flags += 'i';
            }
            if (wordDefinition.multiline) {
                flags += 'm';
            }
            if (wordDefinition.unicode) {
                flags += 'u';
            }
            result = new RegExp(wordDefinition.source, flags);
        }
        else {
            result = wordDefinition;
        }
    }
    result.lastIndex = 0;
    return result;
}
const _defaultConfig = new linkedList_LinkedList();
_defaultConfig.unshift({
    maxLen: 1000,
    windowSize: 15,
    timeBudget: 150
});
function getWordAtText(column, wordDefinition, text, textOffset, config) {
    if (!config) {
        config = Iterable.first(_defaultConfig);
    }
    if (text.length > config.maxLen) {
        // don't throw strings that long at the regexp
        // but use a sub-string in which a word must occur
        let start = column - config.maxLen / 2;
        if (start < 0) {
            start = 0;
        }
        else {
            textOffset += start;
        }
        text = text.substring(start, column + config.maxLen / 2);
        return getWordAtText(column, wordDefinition, text, textOffset, config);
    }
    const t1 = Date.now();
    const pos = column - 1 - textOffset;
    let prevRegexIndex = -1;
    let match = null;
    for (let i = 1;; i++) {
        // check time budget
        if (Date.now() - t1 >= config.timeBudget) {
            break;
        }
        // reset the index at which the regexp should start matching, also know where it
        // should stop so that subsequent search don't repeat previous searches
        const regexIndex = pos - config.windowSize * i;
        wordDefinition.lastIndex = Math.max(0, regexIndex);
        const thisMatch = _findRegexMatchEnclosingPosition(wordDefinition, text, pos, prevRegexIndex);
        if (!thisMatch && match) {
            // stop: we have something
            break;
        }
        match = thisMatch;
        // stop: searched at start
        if (regexIndex <= 0) {
            break;
        }
        prevRegexIndex = regexIndex;
    }
    if (match) {
        const result = {
            word: match[0],
            startColumn: textOffset + 1 + match.index,
            endColumn: textOffset + 1 + match.index + match[0].length
        };
        wordDefinition.lastIndex = 0;
        return result;
    }
    return null;
}
function _findRegexMatchEnclosingPosition(wordDefinition, text, pos, stopPos) {
    let match;
    while (match = wordDefinition.exec(text)) {
        const matchIndex = match.index || 0;
        if (matchIndex <= pos && wordDefinition.lastIndex >= pos) {
            return match;
        }
        else if (stopPos > 0 && matchIndex > stopPos) {
            return null;
        }
    }
    return null;
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/core/characterClassifier.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * A fast character classifier that uses a compact array for ASCII values.
 */
class CharacterClassifier {
    constructor(_defaultValue) {
        const defaultValue = toUint8(_defaultValue);
        this._defaultValue = defaultValue;
        this._asciiMap = CharacterClassifier._createAsciiMap(defaultValue);
        this._map = new Map();
    }
    static _createAsciiMap(defaultValue) {
        const asciiMap = new Uint8Array(256);
        asciiMap.fill(defaultValue);
        return asciiMap;
    }
    set(charCode, _value) {
        const value = toUint8(_value);
        if (charCode >= 0 && charCode < 256) {
            this._asciiMap[charCode] = value;
        }
        else {
            this._map.set(charCode, value);
        }
    }
    get(charCode) {
        if (charCode >= 0 && charCode < 256) {
            return this._asciiMap[charCode];
        }
        else {
            return (this._map.get(charCode) || this._defaultValue);
        }
    }
    clear() {
        this._asciiMap.fill(this._defaultValue);
        this._map.clear();
    }
}
class CharacterSet {
    constructor() {
        this._actual = new CharacterClassifier(0 /* Boolean.False */);
    }
    add(charCode) {
        this._actual.set(charCode, 1 /* Boolean.True */);
    }
    has(charCode) {
        return (this._actual.get(charCode) === 1 /* Boolean.True */);
    }
    clear() {
        return this._actual.clear();
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/languages/linkComputer.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

class Uint8Matrix {
    constructor(rows, cols, defaultValue) {
        const data = new Uint8Array(rows * cols);
        for (let i = 0, len = rows * cols; i < len; i++) {
            data[i] = defaultValue;
        }
        this._data = data;
        this.rows = rows;
        this.cols = cols;
    }
    get(row, col) {
        return this._data[row * this.cols + col];
    }
    set(row, col, value) {
        this._data[row * this.cols + col] = value;
    }
}
class StateMachine {
    constructor(edges) {
        let maxCharCode = 0;
        let maxState = 0 /* State.Invalid */;
        for (let i = 0, len = edges.length; i < len; i++) {
            const [from, chCode, to] = edges[i];
            if (chCode > maxCharCode) {
                maxCharCode = chCode;
            }
            if (from > maxState) {
                maxState = from;
            }
            if (to > maxState) {
                maxState = to;
            }
        }
        maxCharCode++;
        maxState++;
        const states = new Uint8Matrix(maxState, maxCharCode, 0 /* State.Invalid */);
        for (let i = 0, len = edges.length; i < len; i++) {
            const [from, chCode, to] = edges[i];
            states.set(from, chCode, to);
        }
        this._states = states;
        this._maxCharCode = maxCharCode;
    }
    nextState(currentState, chCode) {
        if (chCode < 0 || chCode >= this._maxCharCode) {
            return 0 /* State.Invalid */;
        }
        return this._states.get(currentState, chCode);
    }
}
// State machine for http:// or https:// or file://
let _stateMachine = null;
function getStateMachine() {
    if (_stateMachine === null) {
        _stateMachine = new StateMachine([
            [1 /* State.Start */, 104 /* CharCode.h */, 2 /* State.H */],
            [1 /* State.Start */, 72 /* CharCode.H */, 2 /* State.H */],
            [1 /* State.Start */, 102 /* CharCode.f */, 6 /* State.F */],
            [1 /* State.Start */, 70 /* CharCode.F */, 6 /* State.F */],
            [2 /* State.H */, 116 /* CharCode.t */, 3 /* State.HT */],
            [2 /* State.H */, 84 /* CharCode.T */, 3 /* State.HT */],
            [3 /* State.HT */, 116 /* CharCode.t */, 4 /* State.HTT */],
            [3 /* State.HT */, 84 /* CharCode.T */, 4 /* State.HTT */],
            [4 /* State.HTT */, 112 /* CharCode.p */, 5 /* State.HTTP */],
            [4 /* State.HTT */, 80 /* CharCode.P */, 5 /* State.HTTP */],
            [5 /* State.HTTP */, 115 /* CharCode.s */, 9 /* State.BeforeColon */],
            [5 /* State.HTTP */, 83 /* CharCode.S */, 9 /* State.BeforeColon */],
            [5 /* State.HTTP */, 58 /* CharCode.Colon */, 10 /* State.AfterColon */],
            [6 /* State.F */, 105 /* CharCode.i */, 7 /* State.FI */],
            [6 /* State.F */, 73 /* CharCode.I */, 7 /* State.FI */],
            [7 /* State.FI */, 108 /* CharCode.l */, 8 /* State.FIL */],
            [7 /* State.FI */, 76 /* CharCode.L */, 8 /* State.FIL */],
            [8 /* State.FIL */, 101 /* CharCode.e */, 9 /* State.BeforeColon */],
            [8 /* State.FIL */, 69 /* CharCode.E */, 9 /* State.BeforeColon */],
            [9 /* State.BeforeColon */, 58 /* CharCode.Colon */, 10 /* State.AfterColon */],
            [10 /* State.AfterColon */, 47 /* CharCode.Slash */, 11 /* State.AlmostThere */],
            [11 /* State.AlmostThere */, 47 /* CharCode.Slash */, 12 /* State.End */],
        ]);
    }
    return _stateMachine;
}
let _classifier = null;
function getClassifier() {
    if (_classifier === null) {
        _classifier = new CharacterClassifier(0 /* CharacterClass.None */);
        // allow-any-unicode-next-line
        const FORCE_TERMINATION_CHARACTERS = ' \t<>\'\"、。｡､，．：；‘〈「『〔（［｛｢｣｝］）〕』」〉’｀～…';
        for (let i = 0; i < FORCE_TERMINATION_CHARACTERS.length; i++) {
            _classifier.set(FORCE_TERMINATION_CHARACTERS.charCodeAt(i), 1 /* CharacterClass.ForceTermination */);
        }
        const CANNOT_END_WITH_CHARACTERS = '.,;:';
        for (let i = 0; i < CANNOT_END_WITH_CHARACTERS.length; i++) {
            _classifier.set(CANNOT_END_WITH_CHARACTERS.charCodeAt(i), 2 /* CharacterClass.CannotEndIn */);
        }
    }
    return _classifier;
}
class LinkComputer {
    static _createLink(classifier, line, lineNumber, linkBeginIndex, linkEndIndex) {
        // Do not allow to end link in certain characters...
        let lastIncludedCharIndex = linkEndIndex - 1;
        do {
            const chCode = line.charCodeAt(lastIncludedCharIndex);
            const chClass = classifier.get(chCode);
            if (chClass !== 2 /* CharacterClass.CannotEndIn */) {
                break;
            }
            lastIncludedCharIndex--;
        } while (lastIncludedCharIndex > linkBeginIndex);
        // Handle links enclosed in parens, square brackets and curlys.
        if (linkBeginIndex > 0) {
            const charCodeBeforeLink = line.charCodeAt(linkBeginIndex - 1);
            const lastCharCodeInLink = line.charCodeAt(lastIncludedCharIndex);
            if ((charCodeBeforeLink === 40 /* CharCode.OpenParen */ && lastCharCodeInLink === 41 /* CharCode.CloseParen */)
                || (charCodeBeforeLink === 91 /* CharCode.OpenSquareBracket */ && lastCharCodeInLink === 93 /* CharCode.CloseSquareBracket */)
                || (charCodeBeforeLink === 123 /* CharCode.OpenCurlyBrace */ && lastCharCodeInLink === 125 /* CharCode.CloseCurlyBrace */)) {
                // Do not end in ) if ( is before the link start
                // Do not end in ] if [ is before the link start
                // Do not end in } if { is before the link start
                lastIncludedCharIndex--;
            }
        }
        return {
            range: {
                startLineNumber: lineNumber,
                startColumn: linkBeginIndex + 1,
                endLineNumber: lineNumber,
                endColumn: lastIncludedCharIndex + 2
            },
            url: line.substring(linkBeginIndex, lastIncludedCharIndex + 1)
        };
    }
    static computeLinks(model, stateMachine = getStateMachine()) {
        const classifier = getClassifier();
        const result = [];
        for (let i = 1, lineCount = model.getLineCount(); i <= lineCount; i++) {
            const line = model.getLineContent(i);
            const len = line.length;
            let j = 0;
            let linkBeginIndex = 0;
            let linkBeginChCode = 0;
            let state = 1 /* State.Start */;
            let hasOpenParens = false;
            let hasOpenSquareBracket = false;
            let inSquareBrackets = false;
            let hasOpenCurlyBracket = false;
            while (j < len) {
                let resetStateMachine = false;
                const chCode = line.charCodeAt(j);
                if (state === 13 /* State.Accept */) {
                    let chClass;
                    switch (chCode) {
                        case 40 /* CharCode.OpenParen */:
                            hasOpenParens = true;
                            chClass = 0 /* CharacterClass.None */;
                            break;
                        case 41 /* CharCode.CloseParen */:
                            chClass = (hasOpenParens ? 0 /* CharacterClass.None */ : 1 /* CharacterClass.ForceTermination */);
                            break;
                        case 91 /* CharCode.OpenSquareBracket */:
                            inSquareBrackets = true;
                            hasOpenSquareBracket = true;
                            chClass = 0 /* CharacterClass.None */;
                            break;
                        case 93 /* CharCode.CloseSquareBracket */:
                            inSquareBrackets = false;
                            chClass = (hasOpenSquareBracket ? 0 /* CharacterClass.None */ : 1 /* CharacterClass.ForceTermination */);
                            break;
                        case 123 /* CharCode.OpenCurlyBrace */:
                            hasOpenCurlyBracket = true;
                            chClass = 0 /* CharacterClass.None */;
                            break;
                        case 125 /* CharCode.CloseCurlyBrace */:
                            chClass = (hasOpenCurlyBracket ? 0 /* CharacterClass.None */ : 1 /* CharacterClass.ForceTermination */);
                            break;
                        // The following three rules make it that ' or " or ` are allowed inside links
                        // only if the link is wrapped by some other quote character
                        case 39 /* CharCode.SingleQuote */:
                        case 34 /* CharCode.DoubleQuote */:
                        case 96 /* CharCode.BackTick */:
                            if (linkBeginChCode === chCode) {
                                chClass = 1 /* CharacterClass.ForceTermination */;
                            }
                            else if (linkBeginChCode === 39 /* CharCode.SingleQuote */ || linkBeginChCode === 34 /* CharCode.DoubleQuote */ || linkBeginChCode === 96 /* CharCode.BackTick */) {
                                chClass = 0 /* CharacterClass.None */;
                            }
                            else {
                                chClass = 1 /* CharacterClass.ForceTermination */;
                            }
                            break;
                        case 42 /* CharCode.Asterisk */:
                            // `*` terminates a link if the link began with `*`
                            chClass = (linkBeginChCode === 42 /* CharCode.Asterisk */) ? 1 /* CharacterClass.ForceTermination */ : 0 /* CharacterClass.None */;
                            break;
                        case 124 /* CharCode.Pipe */:
                            // `|` terminates a link if the link began with `|`
                            chClass = (linkBeginChCode === 124 /* CharCode.Pipe */) ? 1 /* CharacterClass.ForceTermination */ : 0 /* CharacterClass.None */;
                            break;
                        case 32 /* CharCode.Space */:
                            // ` ` allow space in between [ and ]
                            chClass = (inSquareBrackets ? 0 /* CharacterClass.None */ : 1 /* CharacterClass.ForceTermination */);
                            break;
                        default:
                            chClass = classifier.get(chCode);
                    }
                    // Check if character terminates link
                    if (chClass === 1 /* CharacterClass.ForceTermination */) {
                        result.push(LinkComputer._createLink(classifier, line, i, linkBeginIndex, j));
                        resetStateMachine = true;
                    }
                }
                else if (state === 12 /* State.End */) {
                    let chClass;
                    if (chCode === 91 /* CharCode.OpenSquareBracket */) {
                        // Allow for the authority part to contain ipv6 addresses which contain [ and ]
                        hasOpenSquareBracket = true;
                        chClass = 0 /* CharacterClass.None */;
                    }
                    else {
                        chClass = classifier.get(chCode);
                    }
                    // Check if character terminates link
                    if (chClass === 1 /* CharacterClass.ForceTermination */) {
                        resetStateMachine = true;
                    }
                    else {
                        state = 13 /* State.Accept */;
                    }
                }
                else {
                    state = stateMachine.nextState(state, chCode);
                    if (state === 0 /* State.Invalid */) {
                        resetStateMachine = true;
                    }
                }
                if (resetStateMachine) {
                    state = 1 /* State.Start */;
                    hasOpenParens = false;
                    hasOpenSquareBracket = false;
                    hasOpenCurlyBracket = false;
                    // Record where the link started
                    linkBeginIndex = j + 1;
                    linkBeginChCode = chCode;
                }
                j++;
            }
            if (state === 13 /* State.Accept */) {
                result.push(LinkComputer._createLink(classifier, line, i, linkBeginIndex, len));
            }
        }
        return result;
    }
}
/**
 * Returns an array of all links contains in the provided
 * document. *Note* that this operation is computational
 * expensive and should not run in the UI thread.
 */
function computeLinks(model) {
    if (!model || typeof model.getLineCount !== 'function' || typeof model.getLineContent !== 'function') {
        // Unknown caller!
        return [];
    }
    return LinkComputer.computeLinks(model);
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/languages/supports/inplaceReplaceSupport.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
class BasicInplaceReplace {
    constructor() {
        this._defaultValueSet = [
            ['true', 'false'],
            ['True', 'False'],
            ['Private', 'Public', 'Friend', 'ReadOnly', 'Partial', 'Protected', 'WriteOnly'],
            ['public', 'protected', 'private'],
        ];
    }
    navigateValueSet(range1, text1, range2, text2, up) {
        if (range1 && text1) {
            const result = this.doNavigateValueSet(text1, up);
            if (result) {
                return {
                    range: range1,
                    value: result
                };
            }
        }
        if (range2 && text2) {
            const result = this.doNavigateValueSet(text2, up);
            if (result) {
                return {
                    range: range2,
                    value: result
                };
            }
        }
        return null;
    }
    doNavigateValueSet(text, up) {
        const numberResult = this.numberReplace(text, up);
        if (numberResult !== null) {
            return numberResult;
        }
        return this.textReplace(text, up);
    }
    numberReplace(value, up) {
        const precision = Math.pow(10, value.length - (value.lastIndexOf('.') + 1));
        let n1 = Number(value);
        const n2 = parseFloat(value);
        if (!isNaN(n1) && !isNaN(n2) && n1 === n2) {
            if (n1 === 0 && !up) {
                return null; // don't do negative
                //			} else if(n1 === 9 && up) {
                //				return null; // don't insert 10 into a number
            }
            else {
                n1 = Math.floor(n1 * precision);
                n1 += up ? precision : -precision;
                return String(n1 / precision);
            }
        }
        return null;
    }
    textReplace(value, up) {
        return this.valueSetsReplace(this._defaultValueSet, value, up);
    }
    valueSetsReplace(valueSets, value, up) {
        let result = null;
        for (let i = 0, len = valueSets.length; result === null && i < len; i++) {
            result = this.valueSetReplace(valueSets[i], value, up);
        }
        return result;
    }
    valueSetReplace(valueSet, value, up) {
        let idx = valueSet.indexOf(value);
        if (idx >= 0) {
            idx += up ? +1 : -1;
            if (idx < 0) {
                idx = valueSet.length - 1;
            }
            else {
                idx %= valueSet.length;
            }
            return valueSet[idx];
        }
        return null;
    }
}
BasicInplaceReplace.INSTANCE = new BasicInplaceReplace();

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/base/common/cancellation.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const shortcutEvent = Object.freeze(function (callback, context) {
    const handle = setTimeout(callback.bind(context), 0);
    return { dispose() { clearTimeout(handle); } };
});
var CancellationToken;
(function (CancellationToken) {
    function isCancellationToken(thing) {
        if (thing === CancellationToken.None || thing === CancellationToken.Cancelled) {
            return true;
        }
        if (thing instanceof MutableToken) {
            return true;
        }
        if (!thing || typeof thing !== 'object') {
            return false;
        }
        return typeof thing.isCancellationRequested === 'boolean'
            && typeof thing.onCancellationRequested === 'function';
    }
    CancellationToken.isCancellationToken = isCancellationToken;
    CancellationToken.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: Event.None
    });
    CancellationToken.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: shortcutEvent
    });
})(CancellationToken || (CancellationToken = {}));
class MutableToken {
    constructor() {
        this._isCancelled = false;
        this._emitter = null;
    }
    cancel() {
        if (!this._isCancelled) {
            this._isCancelled = true;
            if (this._emitter) {
                this._emitter.fire(undefined);
                this.dispose();
            }
        }
    }
    get isCancellationRequested() {
        return this._isCancelled;
    }
    get onCancellationRequested() {
        if (this._isCancelled) {
            return shortcutEvent;
        }
        if (!this._emitter) {
            this._emitter = new Emitter();
        }
        return this._emitter.event;
    }
    dispose() {
        if (this._emitter) {
            this._emitter.dispose();
            this._emitter = null;
        }
    }
}
class CancellationTokenSource {
    constructor(parent) {
        this._token = undefined;
        this._parentListener = undefined;
        this._parentListener = parent && parent.onCancellationRequested(this.cancel, this);
    }
    get token() {
        if (!this._token) {
            // be lazy and create the token only when
            // actually needed
            this._token = new MutableToken();
        }
        return this._token;
    }
    cancel() {
        if (!this._token) {
            // save an object by returning the default
            // cancelled token when cancellation happens
            // before someone asks for the token
            this._token = CancellationToken.Cancelled;
        }
        else if (this._token instanceof MutableToken) {
            // actually cancel
            this._token.cancel();
        }
    }
    dispose(cancel = false) {
        var _a;
        if (cancel) {
            this.cancel();
        }
        (_a = this._parentListener) === null || _a === void 0 ? void 0 : _a.dispose();
        if (!this._token) {
            // ensure to initialize with an empty token if we had none
            this._token = CancellationToken.None;
        }
        else if (this._token instanceof MutableToken) {
            // actually dispose
            this._token.dispose();
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/base/common/keyCodes.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
class KeyCodeStrMap {
    constructor() {
        this._keyCodeToStr = [];
        this._strToKeyCode = Object.create(null);
    }
    define(keyCode, str) {
        this._keyCodeToStr[keyCode] = str;
        this._strToKeyCode[str.toLowerCase()] = keyCode;
    }
    keyCodeToStr(keyCode) {
        return this._keyCodeToStr[keyCode];
    }
    strToKeyCode(str) {
        return this._strToKeyCode[str.toLowerCase()] || 0 /* KeyCode.Unknown */;
    }
}
const uiMap = new KeyCodeStrMap();
const userSettingsUSMap = new KeyCodeStrMap();
const userSettingsGeneralMap = new KeyCodeStrMap();
const EVENT_KEY_CODE_MAP = new Array(230);
const NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE = {};
const scanCodeIntToStr = [];
const scanCodeStrToInt = Object.create(null);
const scanCodeLowerCaseStrToInt = Object.create(null);
/**
 * -1 if a ScanCode => KeyCode mapping depends on kb layout.
 */
const IMMUTABLE_CODE_TO_KEY_CODE = [];
/**
 * -1 if a KeyCode => ScanCode mapping depends on kb layout.
 */
const IMMUTABLE_KEY_CODE_TO_CODE = [];
for (let i = 0; i <= 193 /* ScanCode.MAX_VALUE */; i++) {
    IMMUTABLE_CODE_TO_KEY_CODE[i] = -1 /* KeyCode.DependsOnKbLayout */;
}
for (let i = 0; i <= 132 /* KeyCode.MAX_VALUE */; i++) {
    IMMUTABLE_KEY_CODE_TO_CODE[i] = -1 /* ScanCode.DependsOnKbLayout */;
}
(function () {
    // See https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731(v=vs.85).aspx
    // See https://github.com/microsoft/node-native-keymap/blob/88c0b0e5/deps/chromium/keyboard_codes_win.h
    const empty = '';
    const mappings = [
        // immutable, scanCode, scanCodeStr, keyCode, keyCodeStr, eventKeyCode, vkey, usUserSettingsLabel, generalUserSettingsLabel
        [1, 0 /* ScanCode.None */, 'None', 0 /* KeyCode.Unknown */, 'unknown', 0, 'VK_UNKNOWN', empty, empty],
        [1, 1 /* ScanCode.Hyper */, 'Hyper', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 2 /* ScanCode.Super */, 'Super', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 3 /* ScanCode.Fn */, 'Fn', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 4 /* ScanCode.FnLock */, 'FnLock', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 5 /* ScanCode.Suspend */, 'Suspend', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 6 /* ScanCode.Resume */, 'Resume', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 7 /* ScanCode.Turbo */, 'Turbo', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 8 /* ScanCode.Sleep */, 'Sleep', 0 /* KeyCode.Unknown */, empty, 0, 'VK_SLEEP', empty, empty],
        [1, 9 /* ScanCode.WakeUp */, 'WakeUp', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [0, 10 /* ScanCode.KeyA */, 'KeyA', 31 /* KeyCode.KeyA */, 'A', 65, 'VK_A', empty, empty],
        [0, 11 /* ScanCode.KeyB */, 'KeyB', 32 /* KeyCode.KeyB */, 'B', 66, 'VK_B', empty, empty],
        [0, 12 /* ScanCode.KeyC */, 'KeyC', 33 /* KeyCode.KeyC */, 'C', 67, 'VK_C', empty, empty],
        [0, 13 /* ScanCode.KeyD */, 'KeyD', 34 /* KeyCode.KeyD */, 'D', 68, 'VK_D', empty, empty],
        [0, 14 /* ScanCode.KeyE */, 'KeyE', 35 /* KeyCode.KeyE */, 'E', 69, 'VK_E', empty, empty],
        [0, 15 /* ScanCode.KeyF */, 'KeyF', 36 /* KeyCode.KeyF */, 'F', 70, 'VK_F', empty, empty],
        [0, 16 /* ScanCode.KeyG */, 'KeyG', 37 /* KeyCode.KeyG */, 'G', 71, 'VK_G', empty, empty],
        [0, 17 /* ScanCode.KeyH */, 'KeyH', 38 /* KeyCode.KeyH */, 'H', 72, 'VK_H', empty, empty],
        [0, 18 /* ScanCode.KeyI */, 'KeyI', 39 /* KeyCode.KeyI */, 'I', 73, 'VK_I', empty, empty],
        [0, 19 /* ScanCode.KeyJ */, 'KeyJ', 40 /* KeyCode.KeyJ */, 'J', 74, 'VK_J', empty, empty],
        [0, 20 /* ScanCode.KeyK */, 'KeyK', 41 /* KeyCode.KeyK */, 'K', 75, 'VK_K', empty, empty],
        [0, 21 /* ScanCode.KeyL */, 'KeyL', 42 /* KeyCode.KeyL */, 'L', 76, 'VK_L', empty, empty],
        [0, 22 /* ScanCode.KeyM */, 'KeyM', 43 /* KeyCode.KeyM */, 'M', 77, 'VK_M', empty, empty],
        [0, 23 /* ScanCode.KeyN */, 'KeyN', 44 /* KeyCode.KeyN */, 'N', 78, 'VK_N', empty, empty],
        [0, 24 /* ScanCode.KeyO */, 'KeyO', 45 /* KeyCode.KeyO */, 'O', 79, 'VK_O', empty, empty],
        [0, 25 /* ScanCode.KeyP */, 'KeyP', 46 /* KeyCode.KeyP */, 'P', 80, 'VK_P', empty, empty],
        [0, 26 /* ScanCode.KeyQ */, 'KeyQ', 47 /* KeyCode.KeyQ */, 'Q', 81, 'VK_Q', empty, empty],
        [0, 27 /* ScanCode.KeyR */, 'KeyR', 48 /* KeyCode.KeyR */, 'R', 82, 'VK_R', empty, empty],
        [0, 28 /* ScanCode.KeyS */, 'KeyS', 49 /* KeyCode.KeyS */, 'S', 83, 'VK_S', empty, empty],
        [0, 29 /* ScanCode.KeyT */, 'KeyT', 50 /* KeyCode.KeyT */, 'T', 84, 'VK_T', empty, empty],
        [0, 30 /* ScanCode.KeyU */, 'KeyU', 51 /* KeyCode.KeyU */, 'U', 85, 'VK_U', empty, empty],
        [0, 31 /* ScanCode.KeyV */, 'KeyV', 52 /* KeyCode.KeyV */, 'V', 86, 'VK_V', empty, empty],
        [0, 32 /* ScanCode.KeyW */, 'KeyW', 53 /* KeyCode.KeyW */, 'W', 87, 'VK_W', empty, empty],
        [0, 33 /* ScanCode.KeyX */, 'KeyX', 54 /* KeyCode.KeyX */, 'X', 88, 'VK_X', empty, empty],
        [0, 34 /* ScanCode.KeyY */, 'KeyY', 55 /* KeyCode.KeyY */, 'Y', 89, 'VK_Y', empty, empty],
        [0, 35 /* ScanCode.KeyZ */, 'KeyZ', 56 /* KeyCode.KeyZ */, 'Z', 90, 'VK_Z', empty, empty],
        [0, 36 /* ScanCode.Digit1 */, 'Digit1', 22 /* KeyCode.Digit1 */, '1', 49, 'VK_1', empty, empty],
        [0, 37 /* ScanCode.Digit2 */, 'Digit2', 23 /* KeyCode.Digit2 */, '2', 50, 'VK_2', empty, empty],
        [0, 38 /* ScanCode.Digit3 */, 'Digit3', 24 /* KeyCode.Digit3 */, '3', 51, 'VK_3', empty, empty],
        [0, 39 /* ScanCode.Digit4 */, 'Digit4', 25 /* KeyCode.Digit4 */, '4', 52, 'VK_4', empty, empty],
        [0, 40 /* ScanCode.Digit5 */, 'Digit5', 26 /* KeyCode.Digit5 */, '5', 53, 'VK_5', empty, empty],
        [0, 41 /* ScanCode.Digit6 */, 'Digit6', 27 /* KeyCode.Digit6 */, '6', 54, 'VK_6', empty, empty],
        [0, 42 /* ScanCode.Digit7 */, 'Digit7', 28 /* KeyCode.Digit7 */, '7', 55, 'VK_7', empty, empty],
        [0, 43 /* ScanCode.Digit8 */, 'Digit8', 29 /* KeyCode.Digit8 */, '8', 56, 'VK_8', empty, empty],
        [0, 44 /* ScanCode.Digit9 */, 'Digit9', 30 /* KeyCode.Digit9 */, '9', 57, 'VK_9', empty, empty],
        [0, 45 /* ScanCode.Digit0 */, 'Digit0', 21 /* KeyCode.Digit0 */, '0', 48, 'VK_0', empty, empty],
        [1, 46 /* ScanCode.Enter */, 'Enter', 3 /* KeyCode.Enter */, 'Enter', 13, 'VK_RETURN', empty, empty],
        [1, 47 /* ScanCode.Escape */, 'Escape', 9 /* KeyCode.Escape */, 'Escape', 27, 'VK_ESCAPE', empty, empty],
        [1, 48 /* ScanCode.Backspace */, 'Backspace', 1 /* KeyCode.Backspace */, 'Backspace', 8, 'VK_BACK', empty, empty],
        [1, 49 /* ScanCode.Tab */, 'Tab', 2 /* KeyCode.Tab */, 'Tab', 9, 'VK_TAB', empty, empty],
        [1, 50 /* ScanCode.Space */, 'Space', 10 /* KeyCode.Space */, 'Space', 32, 'VK_SPACE', empty, empty],
        [0, 51 /* ScanCode.Minus */, 'Minus', 88 /* KeyCode.Minus */, '-', 189, 'VK_OEM_MINUS', '-', 'OEM_MINUS'],
        [0, 52 /* ScanCode.Equal */, 'Equal', 86 /* KeyCode.Equal */, '=', 187, 'VK_OEM_PLUS', '=', 'OEM_PLUS'],
        [0, 53 /* ScanCode.BracketLeft */, 'BracketLeft', 92 /* KeyCode.BracketLeft */, '[', 219, 'VK_OEM_4', '[', 'OEM_4'],
        [0, 54 /* ScanCode.BracketRight */, 'BracketRight', 94 /* KeyCode.BracketRight */, ']', 221, 'VK_OEM_6', ']', 'OEM_6'],
        [0, 55 /* ScanCode.Backslash */, 'Backslash', 93 /* KeyCode.Backslash */, '\\', 220, 'VK_OEM_5', '\\', 'OEM_5'],
        [0, 56 /* ScanCode.IntlHash */, 'IntlHash', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty], // has been dropped from the w3c spec
        [0, 57 /* ScanCode.Semicolon */, 'Semicolon', 85 /* KeyCode.Semicolon */, ';', 186, 'VK_OEM_1', ';', 'OEM_1'],
        [0, 58 /* ScanCode.Quote */, 'Quote', 95 /* KeyCode.Quote */, '\'', 222, 'VK_OEM_7', '\'', 'OEM_7'],
        [0, 59 /* ScanCode.Backquote */, 'Backquote', 91 /* KeyCode.Backquote */, '`', 192, 'VK_OEM_3', '`', 'OEM_3'],
        [0, 60 /* ScanCode.Comma */, 'Comma', 87 /* KeyCode.Comma */, ',', 188, 'VK_OEM_COMMA', ',', 'OEM_COMMA'],
        [0, 61 /* ScanCode.Period */, 'Period', 89 /* KeyCode.Period */, '.', 190, 'VK_OEM_PERIOD', '.', 'OEM_PERIOD'],
        [0, 62 /* ScanCode.Slash */, 'Slash', 90 /* KeyCode.Slash */, '/', 191, 'VK_OEM_2', '/', 'OEM_2'],
        [1, 63 /* ScanCode.CapsLock */, 'CapsLock', 8 /* KeyCode.CapsLock */, 'CapsLock', 20, 'VK_CAPITAL', empty, empty],
        [1, 64 /* ScanCode.F1 */, 'F1', 59 /* KeyCode.F1 */, 'F1', 112, 'VK_F1', empty, empty],
        [1, 65 /* ScanCode.F2 */, 'F2', 60 /* KeyCode.F2 */, 'F2', 113, 'VK_F2', empty, empty],
        [1, 66 /* ScanCode.F3 */, 'F3', 61 /* KeyCode.F3 */, 'F3', 114, 'VK_F3', empty, empty],
        [1, 67 /* ScanCode.F4 */, 'F4', 62 /* KeyCode.F4 */, 'F4', 115, 'VK_F4', empty, empty],
        [1, 68 /* ScanCode.F5 */, 'F5', 63 /* KeyCode.F5 */, 'F5', 116, 'VK_F5', empty, empty],
        [1, 69 /* ScanCode.F6 */, 'F6', 64 /* KeyCode.F6 */, 'F6', 117, 'VK_F6', empty, empty],
        [1, 70 /* ScanCode.F7 */, 'F7', 65 /* KeyCode.F7 */, 'F7', 118, 'VK_F7', empty, empty],
        [1, 71 /* ScanCode.F8 */, 'F8', 66 /* KeyCode.F8 */, 'F8', 119, 'VK_F8', empty, empty],
        [1, 72 /* ScanCode.F9 */, 'F9', 67 /* KeyCode.F9 */, 'F9', 120, 'VK_F9', empty, empty],
        [1, 73 /* ScanCode.F10 */, 'F10', 68 /* KeyCode.F10 */, 'F10', 121, 'VK_F10', empty, empty],
        [1, 74 /* ScanCode.F11 */, 'F11', 69 /* KeyCode.F11 */, 'F11', 122, 'VK_F11', empty, empty],
        [1, 75 /* ScanCode.F12 */, 'F12', 70 /* KeyCode.F12 */, 'F12', 123, 'VK_F12', empty, empty],
        [1, 76 /* ScanCode.PrintScreen */, 'PrintScreen', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 77 /* ScanCode.ScrollLock */, 'ScrollLock', 84 /* KeyCode.ScrollLock */, 'ScrollLock', 145, 'VK_SCROLL', empty, empty],
        [1, 78 /* ScanCode.Pause */, 'Pause', 7 /* KeyCode.PauseBreak */, 'PauseBreak', 19, 'VK_PAUSE', empty, empty],
        [1, 79 /* ScanCode.Insert */, 'Insert', 19 /* KeyCode.Insert */, 'Insert', 45, 'VK_INSERT', empty, empty],
        [1, 80 /* ScanCode.Home */, 'Home', 14 /* KeyCode.Home */, 'Home', 36, 'VK_HOME', empty, empty],
        [1, 81 /* ScanCode.PageUp */, 'PageUp', 11 /* KeyCode.PageUp */, 'PageUp', 33, 'VK_PRIOR', empty, empty],
        [1, 82 /* ScanCode.Delete */, 'Delete', 20 /* KeyCode.Delete */, 'Delete', 46, 'VK_DELETE', empty, empty],
        [1, 83 /* ScanCode.End */, 'End', 13 /* KeyCode.End */, 'End', 35, 'VK_END', empty, empty],
        [1, 84 /* ScanCode.PageDown */, 'PageDown', 12 /* KeyCode.PageDown */, 'PageDown', 34, 'VK_NEXT', empty, empty],
        [1, 85 /* ScanCode.ArrowRight */, 'ArrowRight', 17 /* KeyCode.RightArrow */, 'RightArrow', 39, 'VK_RIGHT', 'Right', empty],
        [1, 86 /* ScanCode.ArrowLeft */, 'ArrowLeft', 15 /* KeyCode.LeftArrow */, 'LeftArrow', 37, 'VK_LEFT', 'Left', empty],
        [1, 87 /* ScanCode.ArrowDown */, 'ArrowDown', 18 /* KeyCode.DownArrow */, 'DownArrow', 40, 'VK_DOWN', 'Down', empty],
        [1, 88 /* ScanCode.ArrowUp */, 'ArrowUp', 16 /* KeyCode.UpArrow */, 'UpArrow', 38, 'VK_UP', 'Up', empty],
        [1, 89 /* ScanCode.NumLock */, 'NumLock', 83 /* KeyCode.NumLock */, 'NumLock', 144, 'VK_NUMLOCK', empty, empty],
        [1, 90 /* ScanCode.NumpadDivide */, 'NumpadDivide', 113 /* KeyCode.NumpadDivide */, 'NumPad_Divide', 111, 'VK_DIVIDE', empty, empty],
        [1, 91 /* ScanCode.NumpadMultiply */, 'NumpadMultiply', 108 /* KeyCode.NumpadMultiply */, 'NumPad_Multiply', 106, 'VK_MULTIPLY', empty, empty],
        [1, 92 /* ScanCode.NumpadSubtract */, 'NumpadSubtract', 111 /* KeyCode.NumpadSubtract */, 'NumPad_Subtract', 109, 'VK_SUBTRACT', empty, empty],
        [1, 93 /* ScanCode.NumpadAdd */, 'NumpadAdd', 109 /* KeyCode.NumpadAdd */, 'NumPad_Add', 107, 'VK_ADD', empty, empty],
        [1, 94 /* ScanCode.NumpadEnter */, 'NumpadEnter', 3 /* KeyCode.Enter */, empty, 0, empty, empty, empty],
        [1, 95 /* ScanCode.Numpad1 */, 'Numpad1', 99 /* KeyCode.Numpad1 */, 'NumPad1', 97, 'VK_NUMPAD1', empty, empty],
        [1, 96 /* ScanCode.Numpad2 */, 'Numpad2', 100 /* KeyCode.Numpad2 */, 'NumPad2', 98, 'VK_NUMPAD2', empty, empty],
        [1, 97 /* ScanCode.Numpad3 */, 'Numpad3', 101 /* KeyCode.Numpad3 */, 'NumPad3', 99, 'VK_NUMPAD3', empty, empty],
        [1, 98 /* ScanCode.Numpad4 */, 'Numpad4', 102 /* KeyCode.Numpad4 */, 'NumPad4', 100, 'VK_NUMPAD4', empty, empty],
        [1, 99 /* ScanCode.Numpad5 */, 'Numpad5', 103 /* KeyCode.Numpad5 */, 'NumPad5', 101, 'VK_NUMPAD5', empty, empty],
        [1, 100 /* ScanCode.Numpad6 */, 'Numpad6', 104 /* KeyCode.Numpad6 */, 'NumPad6', 102, 'VK_NUMPAD6', empty, empty],
        [1, 101 /* ScanCode.Numpad7 */, 'Numpad7', 105 /* KeyCode.Numpad7 */, 'NumPad7', 103, 'VK_NUMPAD7', empty, empty],
        [1, 102 /* ScanCode.Numpad8 */, 'Numpad8', 106 /* KeyCode.Numpad8 */, 'NumPad8', 104, 'VK_NUMPAD8', empty, empty],
        [1, 103 /* ScanCode.Numpad9 */, 'Numpad9', 107 /* KeyCode.Numpad9 */, 'NumPad9', 105, 'VK_NUMPAD9', empty, empty],
        [1, 104 /* ScanCode.Numpad0 */, 'Numpad0', 98 /* KeyCode.Numpad0 */, 'NumPad0', 96, 'VK_NUMPAD0', empty, empty],
        [1, 105 /* ScanCode.NumpadDecimal */, 'NumpadDecimal', 112 /* KeyCode.NumpadDecimal */, 'NumPad_Decimal', 110, 'VK_DECIMAL', empty, empty],
        [0, 106 /* ScanCode.IntlBackslash */, 'IntlBackslash', 97 /* KeyCode.IntlBackslash */, 'OEM_102', 226, 'VK_OEM_102', empty, empty],
        [1, 107 /* ScanCode.ContextMenu */, 'ContextMenu', 58 /* KeyCode.ContextMenu */, 'ContextMenu', 93, empty, empty, empty],
        [1, 108 /* ScanCode.Power */, 'Power', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 109 /* ScanCode.NumpadEqual */, 'NumpadEqual', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 110 /* ScanCode.F13 */, 'F13', 71 /* KeyCode.F13 */, 'F13', 124, 'VK_F13', empty, empty],
        [1, 111 /* ScanCode.F14 */, 'F14', 72 /* KeyCode.F14 */, 'F14', 125, 'VK_F14', empty, empty],
        [1, 112 /* ScanCode.F15 */, 'F15', 73 /* KeyCode.F15 */, 'F15', 126, 'VK_F15', empty, empty],
        [1, 113 /* ScanCode.F16 */, 'F16', 74 /* KeyCode.F16 */, 'F16', 127, 'VK_F16', empty, empty],
        [1, 114 /* ScanCode.F17 */, 'F17', 75 /* KeyCode.F17 */, 'F17', 128, 'VK_F17', empty, empty],
        [1, 115 /* ScanCode.F18 */, 'F18', 76 /* KeyCode.F18 */, 'F18', 129, 'VK_F18', empty, empty],
        [1, 116 /* ScanCode.F19 */, 'F19', 77 /* KeyCode.F19 */, 'F19', 130, 'VK_F19', empty, empty],
        [1, 117 /* ScanCode.F20 */, 'F20', 78 /* KeyCode.F20 */, 'F20', 131, 'VK_F20', empty, empty],
        [1, 118 /* ScanCode.F21 */, 'F21', 79 /* KeyCode.F21 */, 'F21', 132, 'VK_F21', empty, empty],
        [1, 119 /* ScanCode.F22 */, 'F22', 80 /* KeyCode.F22 */, 'F22', 133, 'VK_F22', empty, empty],
        [1, 120 /* ScanCode.F23 */, 'F23', 81 /* KeyCode.F23 */, 'F23', 134, 'VK_F23', empty, empty],
        [1, 121 /* ScanCode.F24 */, 'F24', 82 /* KeyCode.F24 */, 'F24', 135, 'VK_F24', empty, empty],
        [1, 122 /* ScanCode.Open */, 'Open', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 123 /* ScanCode.Help */, 'Help', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 124 /* ScanCode.Select */, 'Select', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 125 /* ScanCode.Again */, 'Again', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 126 /* ScanCode.Undo */, 'Undo', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 127 /* ScanCode.Cut */, 'Cut', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 128 /* ScanCode.Copy */, 'Copy', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 129 /* ScanCode.Paste */, 'Paste', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 130 /* ScanCode.Find */, 'Find', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 131 /* ScanCode.AudioVolumeMute */, 'AudioVolumeMute', 117 /* KeyCode.AudioVolumeMute */, 'AudioVolumeMute', 173, 'VK_VOLUME_MUTE', empty, empty],
        [1, 132 /* ScanCode.AudioVolumeUp */, 'AudioVolumeUp', 118 /* KeyCode.AudioVolumeUp */, 'AudioVolumeUp', 175, 'VK_VOLUME_UP', empty, empty],
        [1, 133 /* ScanCode.AudioVolumeDown */, 'AudioVolumeDown', 119 /* KeyCode.AudioVolumeDown */, 'AudioVolumeDown', 174, 'VK_VOLUME_DOWN', empty, empty],
        [1, 134 /* ScanCode.NumpadComma */, 'NumpadComma', 110 /* KeyCode.NUMPAD_SEPARATOR */, 'NumPad_Separator', 108, 'VK_SEPARATOR', empty, empty],
        [0, 135 /* ScanCode.IntlRo */, 'IntlRo', 115 /* KeyCode.ABNT_C1 */, 'ABNT_C1', 193, 'VK_ABNT_C1', empty, empty],
        [1, 136 /* ScanCode.KanaMode */, 'KanaMode', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [0, 137 /* ScanCode.IntlYen */, 'IntlYen', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 138 /* ScanCode.Convert */, 'Convert', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 139 /* ScanCode.NonConvert */, 'NonConvert', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 140 /* ScanCode.Lang1 */, 'Lang1', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 141 /* ScanCode.Lang2 */, 'Lang2', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 142 /* ScanCode.Lang3 */, 'Lang3', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 143 /* ScanCode.Lang4 */, 'Lang4', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 144 /* ScanCode.Lang5 */, 'Lang5', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 145 /* ScanCode.Abort */, 'Abort', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 146 /* ScanCode.Props */, 'Props', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 147 /* ScanCode.NumpadParenLeft */, 'NumpadParenLeft', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 148 /* ScanCode.NumpadParenRight */, 'NumpadParenRight', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 149 /* ScanCode.NumpadBackspace */, 'NumpadBackspace', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 150 /* ScanCode.NumpadMemoryStore */, 'NumpadMemoryStore', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 151 /* ScanCode.NumpadMemoryRecall */, 'NumpadMemoryRecall', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 152 /* ScanCode.NumpadMemoryClear */, 'NumpadMemoryClear', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 153 /* ScanCode.NumpadMemoryAdd */, 'NumpadMemoryAdd', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 154 /* ScanCode.NumpadMemorySubtract */, 'NumpadMemorySubtract', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 155 /* ScanCode.NumpadClear */, 'NumpadClear', 131 /* KeyCode.Clear */, 'Clear', 12, 'VK_CLEAR', empty, empty],
        [1, 156 /* ScanCode.NumpadClearEntry */, 'NumpadClearEntry', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 0 /* ScanCode.None */, empty, 5 /* KeyCode.Ctrl */, 'Ctrl', 17, 'VK_CONTROL', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 4 /* KeyCode.Shift */, 'Shift', 16, 'VK_SHIFT', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 6 /* KeyCode.Alt */, 'Alt', 18, 'VK_MENU', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 57 /* KeyCode.Meta */, 'Meta', 91, 'VK_COMMAND', empty, empty],
        [1, 157 /* ScanCode.ControlLeft */, 'ControlLeft', 5 /* KeyCode.Ctrl */, empty, 0, 'VK_LCONTROL', empty, empty],
        [1, 158 /* ScanCode.ShiftLeft */, 'ShiftLeft', 4 /* KeyCode.Shift */, empty, 0, 'VK_LSHIFT', empty, empty],
        [1, 159 /* ScanCode.AltLeft */, 'AltLeft', 6 /* KeyCode.Alt */, empty, 0, 'VK_LMENU', empty, empty],
        [1, 160 /* ScanCode.MetaLeft */, 'MetaLeft', 57 /* KeyCode.Meta */, empty, 0, 'VK_LWIN', empty, empty],
        [1, 161 /* ScanCode.ControlRight */, 'ControlRight', 5 /* KeyCode.Ctrl */, empty, 0, 'VK_RCONTROL', empty, empty],
        [1, 162 /* ScanCode.ShiftRight */, 'ShiftRight', 4 /* KeyCode.Shift */, empty, 0, 'VK_RSHIFT', empty, empty],
        [1, 163 /* ScanCode.AltRight */, 'AltRight', 6 /* KeyCode.Alt */, empty, 0, 'VK_RMENU', empty, empty],
        [1, 164 /* ScanCode.MetaRight */, 'MetaRight', 57 /* KeyCode.Meta */, empty, 0, 'VK_RWIN', empty, empty],
        [1, 165 /* ScanCode.BrightnessUp */, 'BrightnessUp', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 166 /* ScanCode.BrightnessDown */, 'BrightnessDown', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 167 /* ScanCode.MediaPlay */, 'MediaPlay', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 168 /* ScanCode.MediaRecord */, 'MediaRecord', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 169 /* ScanCode.MediaFastForward */, 'MediaFastForward', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 170 /* ScanCode.MediaRewind */, 'MediaRewind', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 171 /* ScanCode.MediaTrackNext */, 'MediaTrackNext', 124 /* KeyCode.MediaTrackNext */, 'MediaTrackNext', 176, 'VK_MEDIA_NEXT_TRACK', empty, empty],
        [1, 172 /* ScanCode.MediaTrackPrevious */, 'MediaTrackPrevious', 125 /* KeyCode.MediaTrackPrevious */, 'MediaTrackPrevious', 177, 'VK_MEDIA_PREV_TRACK', empty, empty],
        [1, 173 /* ScanCode.MediaStop */, 'MediaStop', 126 /* KeyCode.MediaStop */, 'MediaStop', 178, 'VK_MEDIA_STOP', empty, empty],
        [1, 174 /* ScanCode.Eject */, 'Eject', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 175 /* ScanCode.MediaPlayPause */, 'MediaPlayPause', 127 /* KeyCode.MediaPlayPause */, 'MediaPlayPause', 179, 'VK_MEDIA_PLAY_PAUSE', empty, empty],
        [1, 176 /* ScanCode.MediaSelect */, 'MediaSelect', 128 /* KeyCode.LaunchMediaPlayer */, 'LaunchMediaPlayer', 181, 'VK_MEDIA_LAUNCH_MEDIA_SELECT', empty, empty],
        [1, 177 /* ScanCode.LaunchMail */, 'LaunchMail', 129 /* KeyCode.LaunchMail */, 'LaunchMail', 180, 'VK_MEDIA_LAUNCH_MAIL', empty, empty],
        [1, 178 /* ScanCode.LaunchApp2 */, 'LaunchApp2', 130 /* KeyCode.LaunchApp2 */, 'LaunchApp2', 183, 'VK_MEDIA_LAUNCH_APP2', empty, empty],
        [1, 179 /* ScanCode.LaunchApp1 */, 'LaunchApp1', 0 /* KeyCode.Unknown */, empty, 0, 'VK_MEDIA_LAUNCH_APP1', empty, empty],
        [1, 180 /* ScanCode.SelectTask */, 'SelectTask', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 181 /* ScanCode.LaunchScreenSaver */, 'LaunchScreenSaver', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 182 /* ScanCode.BrowserSearch */, 'BrowserSearch', 120 /* KeyCode.BrowserSearch */, 'BrowserSearch', 170, 'VK_BROWSER_SEARCH', empty, empty],
        [1, 183 /* ScanCode.BrowserHome */, 'BrowserHome', 121 /* KeyCode.BrowserHome */, 'BrowserHome', 172, 'VK_BROWSER_HOME', empty, empty],
        [1, 184 /* ScanCode.BrowserBack */, 'BrowserBack', 122 /* KeyCode.BrowserBack */, 'BrowserBack', 166, 'VK_BROWSER_BACK', empty, empty],
        [1, 185 /* ScanCode.BrowserForward */, 'BrowserForward', 123 /* KeyCode.BrowserForward */, 'BrowserForward', 167, 'VK_BROWSER_FORWARD', empty, empty],
        [1, 186 /* ScanCode.BrowserStop */, 'BrowserStop', 0 /* KeyCode.Unknown */, empty, 0, 'VK_BROWSER_STOP', empty, empty],
        [1, 187 /* ScanCode.BrowserRefresh */, 'BrowserRefresh', 0 /* KeyCode.Unknown */, empty, 0, 'VK_BROWSER_REFRESH', empty, empty],
        [1, 188 /* ScanCode.BrowserFavorites */, 'BrowserFavorites', 0 /* KeyCode.Unknown */, empty, 0, 'VK_BROWSER_FAVORITES', empty, empty],
        [1, 189 /* ScanCode.ZoomToggle */, 'ZoomToggle', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 190 /* ScanCode.MailReply */, 'MailReply', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 191 /* ScanCode.MailForward */, 'MailForward', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        [1, 192 /* ScanCode.MailSend */, 'MailSend', 0 /* KeyCode.Unknown */, empty, 0, empty, empty, empty],
        // See https://lists.w3.org/Archives/Public/www-dom/2010JulSep/att-0182/keyCode-spec.html
        // If an Input Method Editor is processing key input and the event is keydown, return 229.
        [1, 0 /* ScanCode.None */, empty, 114 /* KeyCode.KEY_IN_COMPOSITION */, 'KeyInComposition', 229, empty, empty, empty],
        [1, 0 /* ScanCode.None */, empty, 116 /* KeyCode.ABNT_C2 */, 'ABNT_C2', 194, 'VK_ABNT_C2', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 96 /* KeyCode.OEM_8 */, 'OEM_8', 223, 'VK_OEM_8', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_KANA', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_HANGUL', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_JUNJA', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_FINAL', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_HANJA', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_KANJI', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_CONVERT', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_NONCONVERT', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_ACCEPT', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_MODECHANGE', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_SELECT', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_PRINT', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_EXECUTE', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_SNAPSHOT', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_HELP', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_APPS', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_PROCESSKEY', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_PACKET', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_DBE_SBCSCHAR', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_DBE_DBCSCHAR', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_ATTN', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_CRSEL', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_EXSEL', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_EREOF', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_PLAY', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_ZOOM', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_NONAME', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_PA1', empty, empty],
        [1, 0 /* ScanCode.None */, empty, 0 /* KeyCode.Unknown */, empty, 0, 'VK_OEM_CLEAR', empty, empty],
    ];
    const seenKeyCode = [];
    const seenScanCode = [];
    for (const mapping of mappings) {
        const [immutable, scanCode, scanCodeStr, keyCode, keyCodeStr, eventKeyCode, vkey, usUserSettingsLabel, generalUserSettingsLabel] = mapping;
        if (!seenScanCode[scanCode]) {
            seenScanCode[scanCode] = true;
            scanCodeIntToStr[scanCode] = scanCodeStr;
            scanCodeStrToInt[scanCodeStr] = scanCode;
            scanCodeLowerCaseStrToInt[scanCodeStr.toLowerCase()] = scanCode;
            if (immutable) {
                IMMUTABLE_CODE_TO_KEY_CODE[scanCode] = keyCode;
                if ((keyCode !== 0 /* KeyCode.Unknown */)
                    && (keyCode !== 3 /* KeyCode.Enter */)
                    && (keyCode !== 5 /* KeyCode.Ctrl */)
                    && (keyCode !== 4 /* KeyCode.Shift */)
                    && (keyCode !== 6 /* KeyCode.Alt */)
                    && (keyCode !== 57 /* KeyCode.Meta */)) {
                    IMMUTABLE_KEY_CODE_TO_CODE[keyCode] = scanCode;
                }
            }
        }
        if (!seenKeyCode[keyCode]) {
            seenKeyCode[keyCode] = true;
            if (!keyCodeStr) {
                throw new Error(`String representation missing for key code ${keyCode} around scan code ${scanCodeStr}`);
            }
            uiMap.define(keyCode, keyCodeStr);
            userSettingsUSMap.define(keyCode, usUserSettingsLabel || keyCodeStr);
            userSettingsGeneralMap.define(keyCode, generalUserSettingsLabel || usUserSettingsLabel || keyCodeStr);
        }
        if (eventKeyCode) {
            EVENT_KEY_CODE_MAP[eventKeyCode] = keyCode;
        }
        if (vkey) {
            NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE[vkey] = keyCode;
        }
    }
    // Manually added due to the exclusion above (due to duplication with NumpadEnter)
    IMMUTABLE_KEY_CODE_TO_CODE[3 /* KeyCode.Enter */] = 46 /* ScanCode.Enter */;
})();
var KeyCodeUtils;
(function (KeyCodeUtils) {
    function toString(keyCode) {
        return uiMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toString = toString;
    function fromString(key) {
        return uiMap.strToKeyCode(key);
    }
    KeyCodeUtils.fromString = fromString;
    function toUserSettingsUS(keyCode) {
        return userSettingsUSMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toUserSettingsUS = toUserSettingsUS;
    function toUserSettingsGeneral(keyCode) {
        return userSettingsGeneralMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toUserSettingsGeneral = toUserSettingsGeneral;
    function fromUserSettings(key) {
        return userSettingsUSMap.strToKeyCode(key) || userSettingsGeneralMap.strToKeyCode(key);
    }
    KeyCodeUtils.fromUserSettings = fromUserSettings;
    function toElectronAccelerator(keyCode) {
        if (keyCode >= 98 /* KeyCode.Numpad0 */ && keyCode <= 113 /* KeyCode.NumpadDivide */) {
            // [Electron Accelerators] Electron is able to parse numpad keys, but unfortunately it
            // renders them just as regular keys in menus. For example, num0 is rendered as "0",
            // numdiv is rendered as "/", numsub is rendered as "-".
            //
            // This can lead to incredible confusion, as it makes numpad based keybindings indistinguishable
            // from keybindings based on regular keys.
            //
            // We therefore need to fall back to custom rendering for numpad keys.
            return null;
        }
        switch (keyCode) {
            case 16 /* KeyCode.UpArrow */:
                return 'Up';
            case 18 /* KeyCode.DownArrow */:
                return 'Down';
            case 15 /* KeyCode.LeftArrow */:
                return 'Left';
            case 17 /* KeyCode.RightArrow */:
                return 'Right';
        }
        return uiMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toElectronAccelerator = toElectronAccelerator;
})(KeyCodeUtils || (KeyCodeUtils = {}));
function KeyChord(firstPart, secondPart) {
    const chordPart = ((secondPart & 0x0000FFFF) << 16) >>> 0;
    return (firstPart | chordPart) >>> 0;
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/core/selection.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


/**
 * A selection in the editor.
 * The selection is a range that has an orientation.
 */
class Selection extends range_Range {
    constructor(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn) {
        super(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn);
        this.selectionStartLineNumber = selectionStartLineNumber;
        this.selectionStartColumn = selectionStartColumn;
        this.positionLineNumber = positionLineNumber;
        this.positionColumn = positionColumn;
    }
    /**
     * Transform to a human-readable representation.
     */
    toString() {
        return '[' + this.selectionStartLineNumber + ',' + this.selectionStartColumn + ' -> ' + this.positionLineNumber + ',' + this.positionColumn + ']';
    }
    /**
     * Test if equals other selection.
     */
    equalsSelection(other) {
        return (Selection.selectionsEqual(this, other));
    }
    /**
     * Test if the two selections are equal.
     */
    static selectionsEqual(a, b) {
        return (a.selectionStartLineNumber === b.selectionStartLineNumber &&
            a.selectionStartColumn === b.selectionStartColumn &&
            a.positionLineNumber === b.positionLineNumber &&
            a.positionColumn === b.positionColumn);
    }
    /**
     * Get directions (LTR or RTL).
     */
    getDirection() {
        if (this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn) {
            return 0 /* SelectionDirection.LTR */;
        }
        return 1 /* SelectionDirection.RTL */;
    }
    /**
     * Create a new selection with a different `positionLineNumber` and `positionColumn`.
     */
    setEndPosition(endLineNumber, endColumn) {
        if (this.getDirection() === 0 /* SelectionDirection.LTR */) {
            return new Selection(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
        }
        return new Selection(endLineNumber, endColumn, this.startLineNumber, this.startColumn);
    }
    /**
     * Get the position at `positionLineNumber` and `positionColumn`.
     */
    getPosition() {
        return new position_Position(this.positionLineNumber, this.positionColumn);
    }
    /**
     * Get the position at the start of the selection.
    */
    getSelectionStart() {
        return new position_Position(this.selectionStartLineNumber, this.selectionStartColumn);
    }
    /**
     * Create a new selection with a different `selectionStartLineNumber` and `selectionStartColumn`.
     */
    setStartPosition(startLineNumber, startColumn) {
        if (this.getDirection() === 0 /* SelectionDirection.LTR */) {
            return new Selection(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
        }
        return new Selection(this.endLineNumber, this.endColumn, startLineNumber, startColumn);
    }
    // ----
    /**
     * Create a `Selection` from one or two positions
     */
    static fromPositions(start, end = start) {
        return new Selection(start.lineNumber, start.column, end.lineNumber, end.column);
    }
    /**
     * Creates a `Selection` from a range, given a direction.
     */
    static fromRange(range, direction) {
        if (direction === 0 /* SelectionDirection.LTR */) {
            return new Selection(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn);
        }
        else {
            return new Selection(range.endLineNumber, range.endColumn, range.startLineNumber, range.startColumn);
        }
    }
    /**
     * Create a `Selection` from an `ISelection`.
     */
    static liftSelection(sel) {
        return new Selection(sel.selectionStartLineNumber, sel.selectionStartColumn, sel.positionLineNumber, sel.positionColumn);
    }
    /**
     * `a` equals `b`.
     */
    static selectionsArrEqual(a, b) {
        if (a && !b || !a && b) {
            return false;
        }
        if (!a && !b) {
            return true;
        }
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0, len = a.length; i < len; i++) {
            if (!this.selectionsEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    }
    /**
     * Test if `obj` is an `ISelection`.
     */
    static isISelection(obj) {
        return (obj
            && (typeof obj.selectionStartLineNumber === 'number')
            && (typeof obj.selectionStartColumn === 'number')
            && (typeof obj.positionLineNumber === 'number')
            && (typeof obj.positionColumn === 'number'));
    }
    /**
     * Create with a direction.
     */
    static createWithDirection(startLineNumber, startColumn, endLineNumber, endColumn, direction) {
        if (direction === 0 /* SelectionDirection.LTR */) {
            return new Selection(startLineNumber, startColumn, endLineNumber, endColumn);
        }
        return new Selection(endLineNumber, endColumn, startLineNumber, startColumn);
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/base/common/types.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/**
 * @returns whether the provided parameter is a JavaScript String or not.
 */
function isString(str) {
    return (typeof str === 'string');
}
/**
 * @returns whether the provided parameter is of type `object` but **not**
 *	`null`, an `array`, a `regexp`, nor a `date`.
 */
function types_isObject(obj) {
    // The method can't do a type cast since there are type (like strings) which
    // are subclasses of any put not positvely matched by the function. Hence type
    // narrowing results in wrong results.
    return typeof obj === 'object'
        && obj !== null
        && !Array.isArray(obj)
        && !(obj instanceof RegExp)
        && !(obj instanceof Date);
}
/**
 * @returns whether the provided parameter is of type `Buffer` or Uint8Array dervived type
 */
function types_isTypedArray(obj) {
    const TypedArray = Object.getPrototypeOf(Uint8Array);
    return typeof obj === 'object'
        && obj instanceof TypedArray;
}
/**
 * In **contrast** to just checking `typeof` this will return `false` for `NaN`.
 * @returns whether the provided parameter is a JavaScript Number or not.
 */
function isNumber(obj) {
    return (typeof obj === 'number' && !isNaN(obj));
}
/**
 * @returns whether the provided parameter is an Iterable, casting to the given generic
 */
function isIterable(obj) {
    return !!obj && typeof obj[Symbol.iterator] === 'function';
}
/**
 * @returns whether the provided parameter is a JavaScript Boolean or not.
 */
function isBoolean(obj) {
    return (obj === true || obj === false);
}
/**
 * @returns whether the provided parameter is undefined.
 */
function isUndefined(obj) {
    return (typeof obj === 'undefined');
}
/**
 * @returns whether the provided parameter is defined.
 */
function isDefined(arg) {
    return !types_isUndefinedOrNull(arg);
}
/**
 * @returns whether the provided parameter is undefined or null.
 */
function types_isUndefinedOrNull(obj) {
    return (isUndefined(obj) || obj === null);
}
function assertType(condition, type) {
    if (!condition) {
        throw new Error(type ? `Unexpected type, expected '${type}'` : 'Unexpected type');
    }
}
/**
 * Asserts that the argument passed in is neither undefined nor null.
 */
function assertIsDefined(arg) {
    if (types_isUndefinedOrNull(arg)) {
        throw new Error('Assertion Failed: argument is undefined or null');
    }
    return arg;
}
/**
 * @returns whether the provided parameter is a JavaScript Function or not.
 */
function isFunction(obj) {
    return (typeof obj === 'function');
}
function validateConstraints(args, constraints) {
    const len = Math.min(args.length, constraints.length);
    for (let i = 0; i < len; i++) {
        validateConstraint(args[i], constraints[i]);
    }
}
function validateConstraint(arg, constraint) {
    if (isString(constraint)) {
        if (typeof arg !== constraint) {
            throw new Error(`argument does not match constraint: typeof ${constraint}`);
        }
    }
    else if (isFunction(constraint)) {
        try {
            if (arg instanceof constraint) {
                return;
            }
        }
        catch (_a) {
            // ignore
        }
        if (!types_isUndefinedOrNull(arg) && arg.constructor === constraint) {
            return;
        }
        if (constraint.length === 1 && constraint.call(undefined, arg) === true) {
            return;
        }
        throw new Error(`argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true`);
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/base/common/codicons.js

const _codiconFontCharacters = Object.create(null);
function register(id, fontCharacter) {
    if (isString(fontCharacter)) {
        const val = _codiconFontCharacters[fontCharacter];
        if (val === undefined) {
            throw new Error(`${id} references an unknown codicon: ${fontCharacter}`);
        }
        fontCharacter = val;
    }
    _codiconFontCharacters[id] = fontCharacter;
    return { id };
}
/**
 * Only to be used by the iconRegistry.
 */
function getCodiconFontCharacters() {
    return _codiconFontCharacters;
}
/**
 * The Codicon library is a set of default icons that are built-in in VS Code.
 *
 * In the product (outside of base) Codicons should only be used as defaults. In order to have all icons in VS Code
 * themeable, component should define new, UI component specific icons using `iconRegistry.registerIcon`.
 * In that call a Codicon can be named as default.
 */
const Codicon = {
    // built-in icons, with image name
    add: register('add', 0xea60),
    plus: register('plus', 0xea60),
    gistNew: register('gist-new', 0xea60),
    repoCreate: register('repo-create', 0xea60),
    lightbulb: register('lightbulb', 0xea61),
    lightBulb: register('light-bulb', 0xea61),
    repo: register('repo', 0xea62),
    repoDelete: register('repo-delete', 0xea62),
    gistFork: register('gist-fork', 0xea63),
    repoForked: register('repo-forked', 0xea63),
    gitPullRequest: register('git-pull-request', 0xea64),
    gitPullRequestAbandoned: register('git-pull-request-abandoned', 0xea64),
    recordKeys: register('record-keys', 0xea65),
    keyboard: register('keyboard', 0xea65),
    tag: register('tag', 0xea66),
    tagAdd: register('tag-add', 0xea66),
    tagRemove: register('tag-remove', 0xea66),
    gitPullRequestLabel: register('git-pull-request-label', 0xea66),
    person: register('person', 0xea67),
    personFollow: register('person-follow', 0xea67),
    personOutline: register('person-outline', 0xea67),
    personFilled: register('person-filled', 0xea67),
    gitBranch: register('git-branch', 0xea68),
    gitBranchCreate: register('git-branch-create', 0xea68),
    gitBranchDelete: register('git-branch-delete', 0xea68),
    sourceControl: register('source-control', 0xea68),
    mirror: register('mirror', 0xea69),
    mirrorPublic: register('mirror-public', 0xea69),
    star: register('star', 0xea6a),
    starAdd: register('star-add', 0xea6a),
    starDelete: register('star-delete', 0xea6a),
    starEmpty: register('star-empty', 0xea6a),
    comment: register('comment', 0xea6b),
    commentAdd: register('comment-add', 0xea6b),
    alert: register('alert', 0xea6c),
    warning: register('warning', 0xea6c),
    search: register('search', 0xea6d),
    searchSave: register('search-save', 0xea6d),
    logOut: register('log-out', 0xea6e),
    signOut: register('sign-out', 0xea6e),
    logIn: register('log-in', 0xea6f),
    signIn: register('sign-in', 0xea6f),
    eye: register('eye', 0xea70),
    eyeUnwatch: register('eye-unwatch', 0xea70),
    eyeWatch: register('eye-watch', 0xea70),
    circleFilled: register('circle-filled', 0xea71),
    primitiveDot: register('primitive-dot', 0xea71),
    closeDirty: register('close-dirty', 0xea71),
    debugBreakpoint: register('debug-breakpoint', 0xea71),
    debugBreakpointDisabled: register('debug-breakpoint-disabled', 0xea71),
    debugHint: register('debug-hint', 0xea71),
    primitiveSquare: register('primitive-square', 0xea72),
    edit: register('edit', 0xea73),
    pencil: register('pencil', 0xea73),
    info: register('info', 0xea74),
    issueOpened: register('issue-opened', 0xea74),
    gistPrivate: register('gist-private', 0xea75),
    gitForkPrivate: register('git-fork-private', 0xea75),
    lock: register('lock', 0xea75),
    mirrorPrivate: register('mirror-private', 0xea75),
    close: register('close', 0xea76),
    removeClose: register('remove-close', 0xea76),
    x: register('x', 0xea76),
    repoSync: register('repo-sync', 0xea77),
    sync: register('sync', 0xea77),
    clone: register('clone', 0xea78),
    desktopDownload: register('desktop-download', 0xea78),
    beaker: register('beaker', 0xea79),
    microscope: register('microscope', 0xea79),
    vm: register('vm', 0xea7a),
    deviceDesktop: register('device-desktop', 0xea7a),
    file: register('file', 0xea7b),
    fileText: register('file-text', 0xea7b),
    more: register('more', 0xea7c),
    ellipsis: register('ellipsis', 0xea7c),
    kebabHorizontal: register('kebab-horizontal', 0xea7c),
    mailReply: register('mail-reply', 0xea7d),
    reply: register('reply', 0xea7d),
    organization: register('organization', 0xea7e),
    organizationFilled: register('organization-filled', 0xea7e),
    organizationOutline: register('organization-outline', 0xea7e),
    newFile: register('new-file', 0xea7f),
    fileAdd: register('file-add', 0xea7f),
    newFolder: register('new-folder', 0xea80),
    fileDirectoryCreate: register('file-directory-create', 0xea80),
    trash: register('trash', 0xea81),
    trashcan: register('trashcan', 0xea81),
    history: register('history', 0xea82),
    clock: register('clock', 0xea82),
    folder: register('folder', 0xea83),
    fileDirectory: register('file-directory', 0xea83),
    symbolFolder: register('symbol-folder', 0xea83),
    logoGithub: register('logo-github', 0xea84),
    markGithub: register('mark-github', 0xea84),
    github: register('github', 0xea84),
    terminal: register('terminal', 0xea85),
    console: register('console', 0xea85),
    repl: register('repl', 0xea85),
    zap: register('zap', 0xea86),
    symbolEvent: register('symbol-event', 0xea86),
    error: register('error', 0xea87),
    stop: register('stop', 0xea87),
    variable: register('variable', 0xea88),
    symbolVariable: register('symbol-variable', 0xea88),
    array: register('array', 0xea8a),
    symbolArray: register('symbol-array', 0xea8a),
    symbolModule: register('symbol-module', 0xea8b),
    symbolPackage: register('symbol-package', 0xea8b),
    symbolNamespace: register('symbol-namespace', 0xea8b),
    symbolObject: register('symbol-object', 0xea8b),
    symbolMethod: register('symbol-method', 0xea8c),
    symbolFunction: register('symbol-function', 0xea8c),
    symbolConstructor: register('symbol-constructor', 0xea8c),
    symbolBoolean: register('symbol-boolean', 0xea8f),
    symbolNull: register('symbol-null', 0xea8f),
    symbolNumeric: register('symbol-numeric', 0xea90),
    symbolNumber: register('symbol-number', 0xea90),
    symbolStructure: register('symbol-structure', 0xea91),
    symbolStruct: register('symbol-struct', 0xea91),
    symbolParameter: register('symbol-parameter', 0xea92),
    symbolTypeParameter: register('symbol-type-parameter', 0xea92),
    symbolKey: register('symbol-key', 0xea93),
    symbolText: register('symbol-text', 0xea93),
    symbolReference: register('symbol-reference', 0xea94),
    goToFile: register('go-to-file', 0xea94),
    symbolEnum: register('symbol-enum', 0xea95),
    symbolValue: register('symbol-value', 0xea95),
    symbolRuler: register('symbol-ruler', 0xea96),
    symbolUnit: register('symbol-unit', 0xea96),
    activateBreakpoints: register('activate-breakpoints', 0xea97),
    archive: register('archive', 0xea98),
    arrowBoth: register('arrow-both', 0xea99),
    arrowDown: register('arrow-down', 0xea9a),
    arrowLeft: register('arrow-left', 0xea9b),
    arrowRight: register('arrow-right', 0xea9c),
    arrowSmallDown: register('arrow-small-down', 0xea9d),
    arrowSmallLeft: register('arrow-small-left', 0xea9e),
    arrowSmallRight: register('arrow-small-right', 0xea9f),
    arrowSmallUp: register('arrow-small-up', 0xeaa0),
    arrowUp: register('arrow-up', 0xeaa1),
    bell: register('bell', 0xeaa2),
    bold: register('bold', 0xeaa3),
    book: register('book', 0xeaa4),
    bookmark: register('bookmark', 0xeaa5),
    debugBreakpointConditionalUnverified: register('debug-breakpoint-conditional-unverified', 0xeaa6),
    debugBreakpointConditional: register('debug-breakpoint-conditional', 0xeaa7),
    debugBreakpointConditionalDisabled: register('debug-breakpoint-conditional-disabled', 0xeaa7),
    debugBreakpointDataUnverified: register('debug-breakpoint-data-unverified', 0xeaa8),
    debugBreakpointData: register('debug-breakpoint-data', 0xeaa9),
    debugBreakpointDataDisabled: register('debug-breakpoint-data-disabled', 0xeaa9),
    debugBreakpointLogUnverified: register('debug-breakpoint-log-unverified', 0xeaaa),
    debugBreakpointLog: register('debug-breakpoint-log', 0xeaab),
    debugBreakpointLogDisabled: register('debug-breakpoint-log-disabled', 0xeaab),
    briefcase: register('briefcase', 0xeaac),
    broadcast: register('broadcast', 0xeaad),
    browser: register('browser', 0xeaae),
    bug: register('bug', 0xeaaf),
    calendar: register('calendar', 0xeab0),
    caseSensitive: register('case-sensitive', 0xeab1),
    check: register('check', 0xeab2),
    checklist: register('checklist', 0xeab3),
    chevronDown: register('chevron-down', 0xeab4),
    dropDownButton: register('drop-down-button', 0xeab4),
    chevronLeft: register('chevron-left', 0xeab5),
    chevronRight: register('chevron-right', 0xeab6),
    chevronUp: register('chevron-up', 0xeab7),
    chromeClose: register('chrome-close', 0xeab8),
    chromeMaximize: register('chrome-maximize', 0xeab9),
    chromeMinimize: register('chrome-minimize', 0xeaba),
    chromeRestore: register('chrome-restore', 0xeabb),
    circle: register('circle', 0xeabc),
    circleOutline: register('circle-outline', 0xeabc),
    debugBreakpointUnverified: register('debug-breakpoint-unverified', 0xeabc),
    circleSlash: register('circle-slash', 0xeabd),
    circuitBoard: register('circuit-board', 0xeabe),
    clearAll: register('clear-all', 0xeabf),
    clippy: register('clippy', 0xeac0),
    closeAll: register('close-all', 0xeac1),
    cloudDownload: register('cloud-download', 0xeac2),
    cloudUpload: register('cloud-upload', 0xeac3),
    code: register('code', 0xeac4),
    collapseAll: register('collapse-all', 0xeac5),
    colorMode: register('color-mode', 0xeac6),
    commentDiscussion: register('comment-discussion', 0xeac7),
    compareChanges: register('compare-changes', 0xeafd),
    creditCard: register('credit-card', 0xeac9),
    dash: register('dash', 0xeacc),
    dashboard: register('dashboard', 0xeacd),
    database: register('database', 0xeace),
    debugContinue: register('debug-continue', 0xeacf),
    debugDisconnect: register('debug-disconnect', 0xead0),
    debugPause: register('debug-pause', 0xead1),
    debugRestart: register('debug-restart', 0xead2),
    debugStart: register('debug-start', 0xead3),
    debugStepInto: register('debug-step-into', 0xead4),
    debugStepOut: register('debug-step-out', 0xead5),
    debugStepOver: register('debug-step-over', 0xead6),
    debugStop: register('debug-stop', 0xead7),
    debug: register('debug', 0xead8),
    deviceCameraVideo: register('device-camera-video', 0xead9),
    deviceCamera: register('device-camera', 0xeada),
    deviceMobile: register('device-mobile', 0xeadb),
    diffAdded: register('diff-added', 0xeadc),
    diffIgnored: register('diff-ignored', 0xeadd),
    diffModified: register('diff-modified', 0xeade),
    diffRemoved: register('diff-removed', 0xeadf),
    diffRenamed: register('diff-renamed', 0xeae0),
    diff: register('diff', 0xeae1),
    discard: register('discard', 0xeae2),
    editorLayout: register('editor-layout', 0xeae3),
    emptyWindow: register('empty-window', 0xeae4),
    exclude: register('exclude', 0xeae5),
    extensions: register('extensions', 0xeae6),
    eyeClosed: register('eye-closed', 0xeae7),
    fileBinary: register('file-binary', 0xeae8),
    fileCode: register('file-code', 0xeae9),
    fileMedia: register('file-media', 0xeaea),
    filePdf: register('file-pdf', 0xeaeb),
    fileSubmodule: register('file-submodule', 0xeaec),
    fileSymlinkDirectory: register('file-symlink-directory', 0xeaed),
    fileSymlinkFile: register('file-symlink-file', 0xeaee),
    fileZip: register('file-zip', 0xeaef),
    files: register('files', 0xeaf0),
    filter: register('filter', 0xeaf1),
    flame: register('flame', 0xeaf2),
    foldDown: register('fold-down', 0xeaf3),
    foldUp: register('fold-up', 0xeaf4),
    fold: register('fold', 0xeaf5),
    folderActive: register('folder-active', 0xeaf6),
    folderOpened: register('folder-opened', 0xeaf7),
    gear: register('gear', 0xeaf8),
    gift: register('gift', 0xeaf9),
    gistSecret: register('gist-secret', 0xeafa),
    gist: register('gist', 0xeafb),
    gitCommit: register('git-commit', 0xeafc),
    gitCompare: register('git-compare', 0xeafd),
    gitMerge: register('git-merge', 0xeafe),
    githubAction: register('github-action', 0xeaff),
    githubAlt: register('github-alt', 0xeb00),
    globe: register('globe', 0xeb01),
    grabber: register('grabber', 0xeb02),
    graph: register('graph', 0xeb03),
    gripper: register('gripper', 0xeb04),
    heart: register('heart', 0xeb05),
    home: register('home', 0xeb06),
    horizontalRule: register('horizontal-rule', 0xeb07),
    hubot: register('hubot', 0xeb08),
    inbox: register('inbox', 0xeb09),
    issueClosed: register('issue-closed', 0xeba4),
    issueReopened: register('issue-reopened', 0xeb0b),
    issues: register('issues', 0xeb0c),
    italic: register('italic', 0xeb0d),
    jersey: register('jersey', 0xeb0e),
    json: register('json', 0xeb0f),
    bracket: register('bracket', 0xeb0f),
    kebabVertical: register('kebab-vertical', 0xeb10),
    key: register('key', 0xeb11),
    law: register('law', 0xeb12),
    lightbulbAutofix: register('lightbulb-autofix', 0xeb13),
    linkExternal: register('link-external', 0xeb14),
    link: register('link', 0xeb15),
    listOrdered: register('list-ordered', 0xeb16),
    listUnordered: register('list-unordered', 0xeb17),
    liveShare: register('live-share', 0xeb18),
    loading: register('loading', 0xeb19),
    location: register('location', 0xeb1a),
    mailRead: register('mail-read', 0xeb1b),
    mail: register('mail', 0xeb1c),
    markdown: register('markdown', 0xeb1d),
    megaphone: register('megaphone', 0xeb1e),
    mention: register('mention', 0xeb1f),
    milestone: register('milestone', 0xeb20),
    gitPullRequestMilestone: register('git-pull-request-milestone', 0xeb20),
    mortarBoard: register('mortar-board', 0xeb21),
    move: register('move', 0xeb22),
    multipleWindows: register('multiple-windows', 0xeb23),
    mute: register('mute', 0xeb24),
    noNewline: register('no-newline', 0xeb25),
    note: register('note', 0xeb26),
    octoface: register('octoface', 0xeb27),
    openPreview: register('open-preview', 0xeb28),
    package: register('package', 0xeb29),
    paintcan: register('paintcan', 0xeb2a),
    pin: register('pin', 0xeb2b),
    play: register('play', 0xeb2c),
    run: register('run', 0xeb2c),
    plug: register('plug', 0xeb2d),
    preserveCase: register('preserve-case', 0xeb2e),
    preview: register('preview', 0xeb2f),
    project: register('project', 0xeb30),
    pulse: register('pulse', 0xeb31),
    question: register('question', 0xeb32),
    quote: register('quote', 0xeb33),
    radioTower: register('radio-tower', 0xeb34),
    reactions: register('reactions', 0xeb35),
    references: register('references', 0xeb36),
    refresh: register('refresh', 0xeb37),
    regex: register('regex', 0xeb38),
    remoteExplorer: register('remote-explorer', 0xeb39),
    remote: register('remote', 0xeb3a),
    remove: register('remove', 0xeb3b),
    replaceAll: register('replace-all', 0xeb3c),
    replace: register('replace', 0xeb3d),
    repoClone: register('repo-clone', 0xeb3e),
    repoForcePush: register('repo-force-push', 0xeb3f),
    repoPull: register('repo-pull', 0xeb40),
    repoPush: register('repo-push', 0xeb41),
    report: register('report', 0xeb42),
    requestChanges: register('request-changes', 0xeb43),
    rocket: register('rocket', 0xeb44),
    rootFolderOpened: register('root-folder-opened', 0xeb45),
    rootFolder: register('root-folder', 0xeb46),
    rss: register('rss', 0xeb47),
    ruby: register('ruby', 0xeb48),
    saveAll: register('save-all', 0xeb49),
    saveAs: register('save-as', 0xeb4a),
    save: register('save', 0xeb4b),
    screenFull: register('screen-full', 0xeb4c),
    screenNormal: register('screen-normal', 0xeb4d),
    searchStop: register('search-stop', 0xeb4e),
    server: register('server', 0xeb50),
    settingsGear: register('settings-gear', 0xeb51),
    settings: register('settings', 0xeb52),
    shield: register('shield', 0xeb53),
    smiley: register('smiley', 0xeb54),
    sortPrecedence: register('sort-precedence', 0xeb55),
    splitHorizontal: register('split-horizontal', 0xeb56),
    splitVertical: register('split-vertical', 0xeb57),
    squirrel: register('squirrel', 0xeb58),
    starFull: register('star-full', 0xeb59),
    starHalf: register('star-half', 0xeb5a),
    symbolClass: register('symbol-class', 0xeb5b),
    symbolColor: register('symbol-color', 0xeb5c),
    symbolCustomColor: register('symbol-customcolor', 0xeb5c),
    symbolConstant: register('symbol-constant', 0xeb5d),
    symbolEnumMember: register('symbol-enum-member', 0xeb5e),
    symbolField: register('symbol-field', 0xeb5f),
    symbolFile: register('symbol-file', 0xeb60),
    symbolInterface: register('symbol-interface', 0xeb61),
    symbolKeyword: register('symbol-keyword', 0xeb62),
    symbolMisc: register('symbol-misc', 0xeb63),
    symbolOperator: register('symbol-operator', 0xeb64),
    symbolProperty: register('symbol-property', 0xeb65),
    wrench: register('wrench', 0xeb65),
    wrenchSubaction: register('wrench-subaction', 0xeb65),
    symbolSnippet: register('symbol-snippet', 0xeb66),
    tasklist: register('tasklist', 0xeb67),
    telescope: register('telescope', 0xeb68),
    textSize: register('text-size', 0xeb69),
    threeBars: register('three-bars', 0xeb6a),
    thumbsdown: register('thumbsdown', 0xeb6b),
    thumbsup: register('thumbsup', 0xeb6c),
    tools: register('tools', 0xeb6d),
    triangleDown: register('triangle-down', 0xeb6e),
    triangleLeft: register('triangle-left', 0xeb6f),
    triangleRight: register('triangle-right', 0xeb70),
    triangleUp: register('triangle-up', 0xeb71),
    twitter: register('twitter', 0xeb72),
    unfold: register('unfold', 0xeb73),
    unlock: register('unlock', 0xeb74),
    unmute: register('unmute', 0xeb75),
    unverified: register('unverified', 0xeb76),
    verified: register('verified', 0xeb77),
    versions: register('versions', 0xeb78),
    vmActive: register('vm-active', 0xeb79),
    vmOutline: register('vm-outline', 0xeb7a),
    vmRunning: register('vm-running', 0xeb7b),
    watch: register('watch', 0xeb7c),
    whitespace: register('whitespace', 0xeb7d),
    wholeWord: register('whole-word', 0xeb7e),
    window: register('window', 0xeb7f),
    wordWrap: register('word-wrap', 0xeb80),
    zoomIn: register('zoom-in', 0xeb81),
    zoomOut: register('zoom-out', 0xeb82),
    listFilter: register('list-filter', 0xeb83),
    listFlat: register('list-flat', 0xeb84),
    listSelection: register('list-selection', 0xeb85),
    selection: register('selection', 0xeb85),
    listTree: register('list-tree', 0xeb86),
    debugBreakpointFunctionUnverified: register('debug-breakpoint-function-unverified', 0xeb87),
    debugBreakpointFunction: register('debug-breakpoint-function', 0xeb88),
    debugBreakpointFunctionDisabled: register('debug-breakpoint-function-disabled', 0xeb88),
    debugStackframeActive: register('debug-stackframe-active', 0xeb89),
    circleSmallFilled: register('circle-small-filled', 0xeb8a),
    debugStackframeDot: register('debug-stackframe-dot', 0xeb8a),
    debugStackframe: register('debug-stackframe', 0xeb8b),
    debugStackframeFocused: register('debug-stackframe-focused', 0xeb8b),
    debugBreakpointUnsupported: register('debug-breakpoint-unsupported', 0xeb8c),
    symbolString: register('symbol-string', 0xeb8d),
    debugReverseContinue: register('debug-reverse-continue', 0xeb8e),
    debugStepBack: register('debug-step-back', 0xeb8f),
    debugRestartFrame: register('debug-restart-frame', 0xeb90),
    callIncoming: register('call-incoming', 0xeb92),
    callOutgoing: register('call-outgoing', 0xeb93),
    menu: register('menu', 0xeb94),
    expandAll: register('expand-all', 0xeb95),
    feedback: register('feedback', 0xeb96),
    gitPullRequestReviewer: register('git-pull-request-reviewer', 0xeb96),
    groupByRefType: register('group-by-ref-type', 0xeb97),
    ungroupByRefType: register('ungroup-by-ref-type', 0xeb98),
    account: register('account', 0xeb99),
    gitPullRequestAssignee: register('git-pull-request-assignee', 0xeb99),
    bellDot: register('bell-dot', 0xeb9a),
    debugConsole: register('debug-console', 0xeb9b),
    library: register('library', 0xeb9c),
    output: register('output', 0xeb9d),
    runAll: register('run-all', 0xeb9e),
    syncIgnored: register('sync-ignored', 0xeb9f),
    pinned: register('pinned', 0xeba0),
    githubInverted: register('github-inverted', 0xeba1),
    debugAlt: register('debug-alt', 0xeb91),
    serverProcess: register('server-process', 0xeba2),
    serverEnvironment: register('server-environment', 0xeba3),
    pass: register('pass', 0xeba4),
    stopCircle: register('stop-circle', 0xeba5),
    playCircle: register('play-circle', 0xeba6),
    record: register('record', 0xeba7),
    debugAltSmall: register('debug-alt-small', 0xeba8),
    vmConnect: register('vm-connect', 0xeba9),
    cloud: register('cloud', 0xebaa),
    merge: register('merge', 0xebab),
    exportIcon: register('export', 0xebac),
    graphLeft: register('graph-left', 0xebad),
    magnet: register('magnet', 0xebae),
    notebook: register('notebook', 0xebaf),
    redo: register('redo', 0xebb0),
    checkAll: register('check-all', 0xebb1),
    pinnedDirty: register('pinned-dirty', 0xebb2),
    passFilled: register('pass-filled', 0xebb3),
    circleLargeFilled: register('circle-large-filled', 0xebb4),
    circleLarge: register('circle-large', 0xebb5),
    circleLargeOutline: register('circle-large-outline', 0xebb5),
    combine: register('combine', 0xebb6),
    gather: register('gather', 0xebb6),
    table: register('table', 0xebb7),
    variableGroup: register('variable-group', 0xebb8),
    typeHierarchy: register('type-hierarchy', 0xebb9),
    typeHierarchySub: register('type-hierarchy-sub', 0xebba),
    typeHierarchySuper: register('type-hierarchy-super', 0xebbb),
    gitPullRequestCreate: register('git-pull-request-create', 0xebbc),
    runAbove: register('run-above', 0xebbd),
    runBelow: register('run-below', 0xebbe),
    notebookTemplate: register('notebook-template', 0xebbf),
    debugRerun: register('debug-rerun', 0xebc0),
    workspaceTrusted: register('workspace-trusted', 0xebc1),
    workspaceUntrusted: register('workspace-untrusted', 0xebc2),
    workspaceUnspecified: register('workspace-unspecified', 0xebc3),
    terminalCmd: register('terminal-cmd', 0xebc4),
    terminalDebian: register('terminal-debian', 0xebc5),
    terminalLinux: register('terminal-linux', 0xebc6),
    terminalPowershell: register('terminal-powershell', 0xebc7),
    terminalTmux: register('terminal-tmux', 0xebc8),
    terminalUbuntu: register('terminal-ubuntu', 0xebc9),
    terminalBash: register('terminal-bash', 0xebca),
    arrowSwap: register('arrow-swap', 0xebcb),
    copy: register('copy', 0xebcc),
    personAdd: register('person-add', 0xebcd),
    filterFilled: register('filter-filled', 0xebce),
    wand: register('wand', 0xebcf),
    debugLineByLine: register('debug-line-by-line', 0xebd0),
    inspect: register('inspect', 0xebd1),
    layers: register('layers', 0xebd2),
    layersDot: register('layers-dot', 0xebd3),
    layersActive: register('layers-active', 0xebd4),
    compass: register('compass', 0xebd5),
    compassDot: register('compass-dot', 0xebd6),
    compassActive: register('compass-active', 0xebd7),
    azure: register('azure', 0xebd8),
    issueDraft: register('issue-draft', 0xebd9),
    gitPullRequestClosed: register('git-pull-request-closed', 0xebda),
    gitPullRequestDraft: register('git-pull-request-draft', 0xebdb),
    debugAll: register('debug-all', 0xebdc),
    debugCoverage: register('debug-coverage', 0xebdd),
    runErrors: register('run-errors', 0xebde),
    folderLibrary: register('folder-library', 0xebdf),
    debugContinueSmall: register('debug-continue-small', 0xebe0),
    beakerStop: register('beaker-stop', 0xebe1),
    graphLine: register('graph-line', 0xebe2),
    graphScatter: register('graph-scatter', 0xebe3),
    pieChart: register('pie-chart', 0xebe4),
    bracketDot: register('bracket-dot', 0xebe5),
    bracketError: register('bracket-error', 0xebe6),
    lockSmall: register('lock-small', 0xebe7),
    azureDevops: register('azure-devops', 0xebe8),
    verifiedFilled: register('verified-filled', 0xebe9),
    newLine: register('newline', 0xebea),
    layout: register('layout', 0xebeb),
    layoutActivitybarLeft: register('layout-activitybar-left', 0xebec),
    layoutActivitybarRight: register('layout-activitybar-right', 0xebed),
    layoutPanelLeft: register('layout-panel-left', 0xebee),
    layoutPanelCenter: register('layout-panel-center', 0xebef),
    layoutPanelJustify: register('layout-panel-justify', 0xebf0),
    layoutPanelRight: register('layout-panel-right', 0xebf1),
    layoutPanel: register('layout-panel', 0xebf2),
    layoutSidebarLeft: register('layout-sidebar-left', 0xebf3),
    layoutSidebarRight: register('layout-sidebar-right', 0xebf4),
    layoutStatusbar: register('layout-statusbar', 0xebf5),
    layoutMenubar: register('layout-menubar', 0xebf6),
    layoutCentered: register('layout-centered', 0xebf7),
    layoutSidebarRightOff: register('layout-sidebar-right-off', 0xec00),
    layoutPanelOff: register('layout-panel-off', 0xec01),
    layoutSidebarLeftOff: register('layout-sidebar-left-off', 0xec02),
    target: register('target', 0xebf8),
    indent: register('indent', 0xebf9),
    recordSmall: register('record-small', 0xebfa),
    errorSmall: register('error-small', 0xebfb),
    arrowCircleDown: register('arrow-circle-down', 0xebfc),
    arrowCircleLeft: register('arrow-circle-left', 0xebfd),
    arrowCircleRight: register('arrow-circle-right', 0xebfe),
    arrowCircleUp: register('arrow-circle-up', 0xebff),
    heartFilled: register('heart-filled', 0xec04),
    map: register('map', 0xec05),
    mapFilled: register('map-filled', 0xec06),
    circleSmall: register('circle-small', 0xec07),
    bellSlash: register('bell-slash', 0xec08),
    bellSlashDot: register('bell-slash-dot', 0xec09),
    commentUnresolved: register('comment-unresolved', 0xec0a),
    gitPullRequestGoToChanges: register('git-pull-request-go-to-changes', 0xec0b),
    gitPullRequestNewChanges: register('git-pull-request-new-changes', 0xec0c),
    searchFuzzy: register('search-fuzzy', 0xec0d),
    commentDraft: register('comment-draft', 0xec0e),
    send: register('send', 0xec0f),
    sparkle: register('sparkle', 0xec10),
    insert: register('insert', 0xec11),
    mic: register('mic', 0xec12),
    // derived icons, that could become separate icons
    dialogError: register('dialog-error', 'error'),
    dialogWarning: register('dialog-warning', 'warning'),
    dialogInfo: register('dialog-info', 'info'),
    dialogClose: register('dialog-close', 'close'),
    treeItemExpanded: register('tree-item-expanded', 'chevron-down'), // collapsed is done with rotation
    treeFilterOnTypeOn: register('tree-filter-on-type-on', 'list-filter'),
    treeFilterOnTypeOff: register('tree-filter-on-type-off', 'list-selection'),
    treeFilterClear: register('tree-filter-clear', 'close'),
    treeItemLoading: register('tree-item-loading', 'loading'),
    menuSelection: register('menu-selection', 'check'),
    menuSubmenu: register('menu-submenu', 'chevron-right'),
    menuBarMore: register('menubar-more', 'more'),
    scrollbarButtonLeft: register('scrollbar-button-left', 'triangle-left'),
    scrollbarButtonRight: register('scrollbar-button-right', 'triangle-right'),
    scrollbarButtonUp: register('scrollbar-button-up', 'triangle-up'),
    scrollbarButtonDown: register('scrollbar-button-down', 'triangle-down'),
    toolBarMore: register('toolbar-more', 'more'),
    quickInputBack: register('quick-input-back', 'arrow-left')
};

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/tokenizationRegistry.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var tokenizationRegistry_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class TokenizationRegistry {
    constructor() {
        this._tokenizationSupports = new Map();
        this._factories = new Map();
        this._onDidChange = new Emitter();
        this.onDidChange = this._onDidChange.event;
        this._colorMap = null;
    }
    handleChange(languageIds) {
        this._onDidChange.fire({
            changedLanguages: languageIds,
            changedColorMap: false
        });
    }
    register(languageId, support) {
        this._tokenizationSupports.set(languageId, support);
        this.handleChange([languageId]);
        return lifecycle_toDisposable(() => {
            if (this._tokenizationSupports.get(languageId) !== support) {
                return;
            }
            this._tokenizationSupports.delete(languageId);
            this.handleChange([languageId]);
        });
    }
    get(languageId) {
        return this._tokenizationSupports.get(languageId) || null;
    }
    registerFactory(languageId, factory) {
        var _a;
        (_a = this._factories.get(languageId)) === null || _a === void 0 ? void 0 : _a.dispose();
        const myData = new TokenizationSupportFactoryData(this, languageId, factory);
        this._factories.set(languageId, myData);
        return lifecycle_toDisposable(() => {
            const v = this._factories.get(languageId);
            if (!v || v !== myData) {
                return;
            }
            this._factories.delete(languageId);
            v.dispose();
        });
    }
    getOrCreate(languageId) {
        return tokenizationRegistry_awaiter(this, void 0, void 0, function* () {
            // check first if the support is already set
            const tokenizationSupport = this.get(languageId);
            if (tokenizationSupport) {
                return tokenizationSupport;
            }
            const factory = this._factories.get(languageId);
            if (!factory || factory.isResolved) {
                // no factory or factory.resolve already finished
                return null;
            }
            yield factory.resolve();
            return this.get(languageId);
        });
    }
    isResolved(languageId) {
        const tokenizationSupport = this.get(languageId);
        if (tokenizationSupport) {
            return true;
        }
        const factory = this._factories.get(languageId);
        if (!factory || factory.isResolved) {
            return true;
        }
        return false;
    }
    setColorMap(colorMap) {
        this._colorMap = colorMap;
        this._onDidChange.fire({
            changedLanguages: Array.from(this._tokenizationSupports.keys()),
            changedColorMap: true
        });
    }
    getColorMap() {
        return this._colorMap;
    }
    getDefaultBackground() {
        if (this._colorMap && this._colorMap.length > 2 /* ColorId.DefaultBackground */) {
            return this._colorMap[2 /* ColorId.DefaultBackground */];
        }
        return null;
    }
}
class TokenizationSupportFactoryData extends lifecycle_Disposable {
    get isResolved() {
        return this._isResolved;
    }
    constructor(_registry, _languageId, _factory) {
        super();
        this._registry = _registry;
        this._languageId = _languageId;
        this._factory = _factory;
        this._isDisposed = false;
        this._resolvePromise = null;
        this._isResolved = false;
    }
    dispose() {
        this._isDisposed = true;
        super.dispose();
    }
    resolve() {
        return tokenizationRegistry_awaiter(this, void 0, void 0, function* () {
            if (!this._resolvePromise) {
                this._resolvePromise = this._create();
            }
            return this._resolvePromise;
        });
    }
    _create() {
        return tokenizationRegistry_awaiter(this, void 0, void 0, function* () {
            const value = yield this._factory.tokenizationSupport;
            this._isResolved = true;
            if (value && !this._isDisposed) {
                this._register(this._registry.register(this._languageId, value));
            }
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/languages.js





class Token {
    constructor(offset, type, language) {
        this.offset = offset;
        this.type = type;
        this.language = language;
        this._tokenBrand = undefined;
    }
    toString() {
        return '(' + this.offset + ', ' + this.type + ')';
    }
}
/**
 * @internal
 */
class TokenizationResult {
    constructor(tokens, endState) {
        this.tokens = tokens;
        this.endState = endState;
        this._tokenizationResultBrand = undefined;
    }
}
/**
 * @internal
 */
class EncodedTokenizationResult {
    constructor(
    /**
     * The tokens in binary format. Each token occupies two array indices. For token i:
     *  - at offset 2*i => startIndex
     *  - at offset 2*i + 1 => metadata
     *
     */
    tokens, endState) {
        this.tokens = tokens;
        this.endState = endState;
        this._encodedTokenizationResultBrand = undefined;
    }
}
/**
 * @internal
 */
var CompletionItemKinds;
(function (CompletionItemKinds) {
    const byKind = new Map();
    byKind.set(0 /* CompletionItemKind.Method */, Codicon.symbolMethod);
    byKind.set(1 /* CompletionItemKind.Function */, Codicon.symbolFunction);
    byKind.set(2 /* CompletionItemKind.Constructor */, Codicon.symbolConstructor);
    byKind.set(3 /* CompletionItemKind.Field */, Codicon.symbolField);
    byKind.set(4 /* CompletionItemKind.Variable */, Codicon.symbolVariable);
    byKind.set(5 /* CompletionItemKind.Class */, Codicon.symbolClass);
    byKind.set(6 /* CompletionItemKind.Struct */, Codicon.symbolStruct);
    byKind.set(7 /* CompletionItemKind.Interface */, Codicon.symbolInterface);
    byKind.set(8 /* CompletionItemKind.Module */, Codicon.symbolModule);
    byKind.set(9 /* CompletionItemKind.Property */, Codicon.symbolProperty);
    byKind.set(10 /* CompletionItemKind.Event */, Codicon.symbolEvent);
    byKind.set(11 /* CompletionItemKind.Operator */, Codicon.symbolOperator);
    byKind.set(12 /* CompletionItemKind.Unit */, Codicon.symbolUnit);
    byKind.set(13 /* CompletionItemKind.Value */, Codicon.symbolValue);
    byKind.set(15 /* CompletionItemKind.Enum */, Codicon.symbolEnum);
    byKind.set(14 /* CompletionItemKind.Constant */, Codicon.symbolConstant);
    byKind.set(15 /* CompletionItemKind.Enum */, Codicon.symbolEnum);
    byKind.set(16 /* CompletionItemKind.EnumMember */, Codicon.symbolEnumMember);
    byKind.set(17 /* CompletionItemKind.Keyword */, Codicon.symbolKeyword);
    byKind.set(27 /* CompletionItemKind.Snippet */, Codicon.symbolSnippet);
    byKind.set(18 /* CompletionItemKind.Text */, Codicon.symbolText);
    byKind.set(19 /* CompletionItemKind.Color */, Codicon.symbolColor);
    byKind.set(20 /* CompletionItemKind.File */, Codicon.symbolFile);
    byKind.set(21 /* CompletionItemKind.Reference */, Codicon.symbolReference);
    byKind.set(22 /* CompletionItemKind.Customcolor */, Codicon.symbolCustomColor);
    byKind.set(23 /* CompletionItemKind.Folder */, Codicon.symbolFolder);
    byKind.set(24 /* CompletionItemKind.TypeParameter */, Codicon.symbolTypeParameter);
    byKind.set(25 /* CompletionItemKind.User */, Codicon.account);
    byKind.set(26 /* CompletionItemKind.Issue */, Codicon.issues);
    /**
     * @internal
     */
    function toIcon(kind) {
        let codicon = byKind.get(kind);
        if (!codicon) {
            console.info('No codicon found for CompletionItemKind ' + kind);
            codicon = Codicon.symbolProperty;
        }
        return codicon;
    }
    CompletionItemKinds.toIcon = toIcon;
    const data = new Map();
    data.set('method', 0 /* CompletionItemKind.Method */);
    data.set('function', 1 /* CompletionItemKind.Function */);
    data.set('constructor', 2 /* CompletionItemKind.Constructor */);
    data.set('field', 3 /* CompletionItemKind.Field */);
    data.set('variable', 4 /* CompletionItemKind.Variable */);
    data.set('class', 5 /* CompletionItemKind.Class */);
    data.set('struct', 6 /* CompletionItemKind.Struct */);
    data.set('interface', 7 /* CompletionItemKind.Interface */);
    data.set('module', 8 /* CompletionItemKind.Module */);
    data.set('property', 9 /* CompletionItemKind.Property */);
    data.set('event', 10 /* CompletionItemKind.Event */);
    data.set('operator', 11 /* CompletionItemKind.Operator */);
    data.set('unit', 12 /* CompletionItemKind.Unit */);
    data.set('value', 13 /* CompletionItemKind.Value */);
    data.set('constant', 14 /* CompletionItemKind.Constant */);
    data.set('enum', 15 /* CompletionItemKind.Enum */);
    data.set('enum-member', 16 /* CompletionItemKind.EnumMember */);
    data.set('enumMember', 16 /* CompletionItemKind.EnumMember */);
    data.set('keyword', 17 /* CompletionItemKind.Keyword */);
    data.set('snippet', 27 /* CompletionItemKind.Snippet */);
    data.set('text', 18 /* CompletionItemKind.Text */);
    data.set('color', 19 /* CompletionItemKind.Color */);
    data.set('file', 20 /* CompletionItemKind.File */);
    data.set('reference', 21 /* CompletionItemKind.Reference */);
    data.set('customcolor', 22 /* CompletionItemKind.Customcolor */);
    data.set('folder', 23 /* CompletionItemKind.Folder */);
    data.set('type-parameter', 24 /* CompletionItemKind.TypeParameter */);
    data.set('typeParameter', 24 /* CompletionItemKind.TypeParameter */);
    data.set('account', 25 /* CompletionItemKind.User */);
    data.set('issue', 26 /* CompletionItemKind.Issue */);
    /**
     * @internal
     */
    function fromString(value, strict) {
        let res = data.get(value);
        if (typeof res === 'undefined' && !strict) {
            res = 9 /* CompletionItemKind.Property */;
        }
        return res;
    }
    CompletionItemKinds.fromString = fromString;
})(CompletionItemKinds || (CompletionItemKinds = {}));
/**
 * How an {@link InlineCompletionsProvider inline completion provider} was triggered.
 */
var InlineCompletionTriggerKind;
(function (InlineCompletionTriggerKind) {
    /**
     * Completion was triggered automatically while editing.
     * It is sufficient to return a single completion item in this case.
     */
    InlineCompletionTriggerKind[InlineCompletionTriggerKind["Automatic"] = 0] = "Automatic";
    /**
     * Completion was triggered explicitly by a user gesture.
     * Return multiple completion items to enable cycling through them.
     */
    InlineCompletionTriggerKind[InlineCompletionTriggerKind["Explicit"] = 1] = "Explicit";
})(InlineCompletionTriggerKind || (InlineCompletionTriggerKind = {}));
class SelectedSuggestionInfo {
    constructor(range, text, completionKind, isSnippetText) {
        this.range = range;
        this.text = text;
        this.completionKind = completionKind;
        this.isSnippetText = isSnippetText;
    }
    equals(other) {
        return Range.lift(this.range).equalsRange(other.range)
            && this.text === other.text
            && this.completionKind === other.completionKind
            && this.isSnippetText === other.isSnippetText;
    }
}
var SignatureHelpTriggerKind;
(function (SignatureHelpTriggerKind) {
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["Invoke"] = 1] = "Invoke";
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["TriggerCharacter"] = 2] = "TriggerCharacter";
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["ContentChange"] = 3] = "ContentChange";
})(SignatureHelpTriggerKind || (SignatureHelpTriggerKind = {}));
/**
 * A document highlight kind.
 */
var DocumentHighlightKind;
(function (DocumentHighlightKind) {
    /**
     * A textual occurrence.
     */
    DocumentHighlightKind[DocumentHighlightKind["Text"] = 0] = "Text";
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind[DocumentHighlightKind["Read"] = 1] = "Read";
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind[DocumentHighlightKind["Write"] = 2] = "Write";
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
/**
 * @internal
 */
function isLocationLink(thing) {
    return thing
        && URI.isUri(thing.uri)
        && Range.isIRange(thing.range)
        && (Range.isIRange(thing.originSelectionRange) || Range.isIRange(thing.targetSelectionRange));
}
/**
 * @internal
 */
const symbolKindNames = {
    [17 /* SymbolKind.Array */]: nls_localize('Array', "array"),
    [16 /* SymbolKind.Boolean */]: nls_localize('Boolean', "boolean"),
    [4 /* SymbolKind.Class */]: nls_localize('Class', "class"),
    [13 /* SymbolKind.Constant */]: nls_localize('Constant', "constant"),
    [8 /* SymbolKind.Constructor */]: nls_localize('Constructor', "constructor"),
    [9 /* SymbolKind.Enum */]: nls_localize('Enum', "enumeration"),
    [21 /* SymbolKind.EnumMember */]: nls_localize('EnumMember', "enumeration member"),
    [23 /* SymbolKind.Event */]: nls_localize('Event', "event"),
    [7 /* SymbolKind.Field */]: nls_localize('Field', "field"),
    [0 /* SymbolKind.File */]: nls_localize('File', "file"),
    [11 /* SymbolKind.Function */]: nls_localize('Function', "function"),
    [10 /* SymbolKind.Interface */]: nls_localize('Interface', "interface"),
    [19 /* SymbolKind.Key */]: nls_localize('Key', "key"),
    [5 /* SymbolKind.Method */]: nls_localize('Method', "method"),
    [1 /* SymbolKind.Module */]: nls_localize('Module', "module"),
    [2 /* SymbolKind.Namespace */]: nls_localize('Namespace', "namespace"),
    [20 /* SymbolKind.Null */]: nls_localize('Null', "null"),
    [15 /* SymbolKind.Number */]: nls_localize('Number', "number"),
    [18 /* SymbolKind.Object */]: nls_localize('Object', "object"),
    [24 /* SymbolKind.Operator */]: nls_localize('Operator', "operator"),
    [3 /* SymbolKind.Package */]: nls_localize('Package', "package"),
    [6 /* SymbolKind.Property */]: nls_localize('Property', "property"),
    [14 /* SymbolKind.String */]: nls_localize('String', "string"),
    [22 /* SymbolKind.Struct */]: nls_localize('Struct', "struct"),
    [25 /* SymbolKind.TypeParameter */]: nls_localize('TypeParameter', "type parameter"),
    [12 /* SymbolKind.Variable */]: nls_localize('Variable', "variable"),
};
/**
 * @internal
 */
function getAriaLabelForSymbol(symbolName, kind) {
    return localize('symbolAriaLabel', '{0} ({1})', symbolName, symbolKindNames[kind]);
}
/**
 * @internal
 */
var SymbolKinds;
(function (SymbolKinds) {
    const byKind = new Map();
    byKind.set(0 /* SymbolKind.File */, Codicon.symbolFile);
    byKind.set(1 /* SymbolKind.Module */, Codicon.symbolModule);
    byKind.set(2 /* SymbolKind.Namespace */, Codicon.symbolNamespace);
    byKind.set(3 /* SymbolKind.Package */, Codicon.symbolPackage);
    byKind.set(4 /* SymbolKind.Class */, Codicon.symbolClass);
    byKind.set(5 /* SymbolKind.Method */, Codicon.symbolMethod);
    byKind.set(6 /* SymbolKind.Property */, Codicon.symbolProperty);
    byKind.set(7 /* SymbolKind.Field */, Codicon.symbolField);
    byKind.set(8 /* SymbolKind.Constructor */, Codicon.symbolConstructor);
    byKind.set(9 /* SymbolKind.Enum */, Codicon.symbolEnum);
    byKind.set(10 /* SymbolKind.Interface */, Codicon.symbolInterface);
    byKind.set(11 /* SymbolKind.Function */, Codicon.symbolFunction);
    byKind.set(12 /* SymbolKind.Variable */, Codicon.symbolVariable);
    byKind.set(13 /* SymbolKind.Constant */, Codicon.symbolConstant);
    byKind.set(14 /* SymbolKind.String */, Codicon.symbolString);
    byKind.set(15 /* SymbolKind.Number */, Codicon.symbolNumber);
    byKind.set(16 /* SymbolKind.Boolean */, Codicon.symbolBoolean);
    byKind.set(17 /* SymbolKind.Array */, Codicon.symbolArray);
    byKind.set(18 /* SymbolKind.Object */, Codicon.symbolObject);
    byKind.set(19 /* SymbolKind.Key */, Codicon.symbolKey);
    byKind.set(20 /* SymbolKind.Null */, Codicon.symbolNull);
    byKind.set(21 /* SymbolKind.EnumMember */, Codicon.symbolEnumMember);
    byKind.set(22 /* SymbolKind.Struct */, Codicon.symbolStruct);
    byKind.set(23 /* SymbolKind.Event */, Codicon.symbolEvent);
    byKind.set(24 /* SymbolKind.Operator */, Codicon.symbolOperator);
    byKind.set(25 /* SymbolKind.TypeParameter */, Codicon.symbolTypeParameter);
    /**
     * @internal
     */
    function toIcon(kind) {
        let icon = byKind.get(kind);
        if (!icon) {
            console.info('No codicon found for SymbolKind ' + kind);
            icon = Codicon.symbolProperty;
        }
        return icon;
    }
    SymbolKinds.toIcon = toIcon;
})(SymbolKinds || (SymbolKinds = {}));
/** @internal */
class TextEdit {
}
class FoldingRangeKind {
    /**
     * Returns a {@link FoldingRangeKind} for the given value.
     *
     * @param value of the kind.
     */
    static fromValue(value) {
        switch (value) {
            case 'comment': return FoldingRangeKind.Comment;
            case 'imports': return FoldingRangeKind.Imports;
            case 'region': return FoldingRangeKind.Region;
        }
        return new FoldingRangeKind(value);
    }
    /**
     * Creates a new {@link FoldingRangeKind}.
     *
     * @param value of the kind.
     */
    constructor(value) {
        this.value = value;
    }
}
/**
 * Kind for folding range representing a comment. The value of the kind is 'comment'.
 */
FoldingRangeKind.Comment = new FoldingRangeKind('comment');
/**
 * Kind for folding range representing a import. The value of the kind is 'imports'.
 */
FoldingRangeKind.Imports = new FoldingRangeKind('imports');
/**
 * Kind for folding range representing regions (for example marked by `#region`, `#endregion`).
 * The value of the kind is 'region'.
 */
FoldingRangeKind.Region = new FoldingRangeKind('region');
/**
 * @internal
 */
var Command;
(function (Command) {
    /**
     * @internal
     */
    function is(obj) {
        if (!obj || typeof obj !== 'object') {
            return false;
        }
        return typeof obj.id === 'string' &&
            typeof obj.title === 'string';
    }
    Command.is = is;
})(Command || (Command = {}));
var InlayHintKind;
(function (InlayHintKind) {
    InlayHintKind[InlayHintKind["Type"] = 1] = "Type";
    InlayHintKind[InlayHintKind["Parameter"] = 2] = "Parameter";
})(InlayHintKind || (InlayHintKind = {}));
/**
 * @internal
 */
class LazyTokenizationSupport {
    constructor(createSupport) {
        this.createSupport = createSupport;
        this._tokenizationSupport = null;
    }
    dispose() {
        if (this._tokenizationSupport) {
            this._tokenizationSupport.then((support) => {
                if (support) {
                    support.dispose();
                }
            });
        }
    }
    get tokenizationSupport() {
        if (!this._tokenizationSupport) {
            this._tokenizationSupport = this.createSupport();
        }
        return this._tokenizationSupport;
    }
}
/**
 * @internal
 */
const languages_TokenizationRegistry = new TokenizationRegistry();

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/standalone/standaloneEnums.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
// THIS IS A GENERATED FILE. DO NOT EDIT DIRECTLY.
var AccessibilitySupport;
(function (AccessibilitySupport) {
    /**
     * This should be the browser case where it is not known if a screen reader is attached or no.
     */
    AccessibilitySupport[AccessibilitySupport["Unknown"] = 0] = "Unknown";
    AccessibilitySupport[AccessibilitySupport["Disabled"] = 1] = "Disabled";
    AccessibilitySupport[AccessibilitySupport["Enabled"] = 2] = "Enabled";
})(AccessibilitySupport || (AccessibilitySupport = {}));
var CodeActionTriggerType;
(function (CodeActionTriggerType) {
    CodeActionTriggerType[CodeActionTriggerType["Invoke"] = 1] = "Invoke";
    CodeActionTriggerType[CodeActionTriggerType["Auto"] = 2] = "Auto";
})(CodeActionTriggerType || (CodeActionTriggerType = {}));
var CompletionItemInsertTextRule;
(function (CompletionItemInsertTextRule) {
    CompletionItemInsertTextRule[CompletionItemInsertTextRule["None"] = 0] = "None";
    /**
     * Adjust whitespace/indentation of multiline insert texts to
     * match the current line indentation.
     */
    CompletionItemInsertTextRule[CompletionItemInsertTextRule["KeepWhitespace"] = 1] = "KeepWhitespace";
    /**
     * `insertText` is a snippet.
     */
    CompletionItemInsertTextRule[CompletionItemInsertTextRule["InsertAsSnippet"] = 4] = "InsertAsSnippet";
})(CompletionItemInsertTextRule || (CompletionItemInsertTextRule = {}));
var CompletionItemKind;
(function (CompletionItemKind) {
    CompletionItemKind[CompletionItemKind["Method"] = 0] = "Method";
    CompletionItemKind[CompletionItemKind["Function"] = 1] = "Function";
    CompletionItemKind[CompletionItemKind["Constructor"] = 2] = "Constructor";
    CompletionItemKind[CompletionItemKind["Field"] = 3] = "Field";
    CompletionItemKind[CompletionItemKind["Variable"] = 4] = "Variable";
    CompletionItemKind[CompletionItemKind["Class"] = 5] = "Class";
    CompletionItemKind[CompletionItemKind["Struct"] = 6] = "Struct";
    CompletionItemKind[CompletionItemKind["Interface"] = 7] = "Interface";
    CompletionItemKind[CompletionItemKind["Module"] = 8] = "Module";
    CompletionItemKind[CompletionItemKind["Property"] = 9] = "Property";
    CompletionItemKind[CompletionItemKind["Event"] = 10] = "Event";
    CompletionItemKind[CompletionItemKind["Operator"] = 11] = "Operator";
    CompletionItemKind[CompletionItemKind["Unit"] = 12] = "Unit";
    CompletionItemKind[CompletionItemKind["Value"] = 13] = "Value";
    CompletionItemKind[CompletionItemKind["Constant"] = 14] = "Constant";
    CompletionItemKind[CompletionItemKind["Enum"] = 15] = "Enum";
    CompletionItemKind[CompletionItemKind["EnumMember"] = 16] = "EnumMember";
    CompletionItemKind[CompletionItemKind["Keyword"] = 17] = "Keyword";
    CompletionItemKind[CompletionItemKind["Text"] = 18] = "Text";
    CompletionItemKind[CompletionItemKind["Color"] = 19] = "Color";
    CompletionItemKind[CompletionItemKind["File"] = 20] = "File";
    CompletionItemKind[CompletionItemKind["Reference"] = 21] = "Reference";
    CompletionItemKind[CompletionItemKind["Customcolor"] = 22] = "Customcolor";
    CompletionItemKind[CompletionItemKind["Folder"] = 23] = "Folder";
    CompletionItemKind[CompletionItemKind["TypeParameter"] = 24] = "TypeParameter";
    CompletionItemKind[CompletionItemKind["User"] = 25] = "User";
    CompletionItemKind[CompletionItemKind["Issue"] = 26] = "Issue";
    CompletionItemKind[CompletionItemKind["Snippet"] = 27] = "Snippet";
})(CompletionItemKind || (CompletionItemKind = {}));
var CompletionItemTag;
(function (CompletionItemTag) {
    CompletionItemTag[CompletionItemTag["Deprecated"] = 1] = "Deprecated";
})(CompletionItemTag || (CompletionItemTag = {}));
/**
 * How a suggest provider was triggered.
 */
var CompletionTriggerKind;
(function (CompletionTriggerKind) {
    CompletionTriggerKind[CompletionTriggerKind["Invoke"] = 0] = "Invoke";
    CompletionTriggerKind[CompletionTriggerKind["TriggerCharacter"] = 1] = "TriggerCharacter";
    CompletionTriggerKind[CompletionTriggerKind["TriggerForIncompleteCompletions"] = 2] = "TriggerForIncompleteCompletions";
})(CompletionTriggerKind || (CompletionTriggerKind = {}));
/**
 * A positioning preference for rendering content widgets.
 */
var ContentWidgetPositionPreference;
(function (ContentWidgetPositionPreference) {
    /**
     * Place the content widget exactly at a position
     */
    ContentWidgetPositionPreference[ContentWidgetPositionPreference["EXACT"] = 0] = "EXACT";
    /**
     * Place the content widget above a position
     */
    ContentWidgetPositionPreference[ContentWidgetPositionPreference["ABOVE"] = 1] = "ABOVE";
    /**
     * Place the content widget below a position
     */
    ContentWidgetPositionPreference[ContentWidgetPositionPreference["BELOW"] = 2] = "BELOW";
})(ContentWidgetPositionPreference || (ContentWidgetPositionPreference = {}));
/**
 * Describes the reason the cursor has changed its position.
 */
var CursorChangeReason;
(function (CursorChangeReason) {
    /**
     * Unknown or not set.
     */
    CursorChangeReason[CursorChangeReason["NotSet"] = 0] = "NotSet";
    /**
     * A `model.setValue()` was called.
     */
    CursorChangeReason[CursorChangeReason["ContentFlush"] = 1] = "ContentFlush";
    /**
     * The `model` has been changed outside of this cursor and the cursor recovers its position from associated markers.
     */
    CursorChangeReason[CursorChangeReason["RecoverFromMarkers"] = 2] = "RecoverFromMarkers";
    /**
     * There was an explicit user gesture.
     */
    CursorChangeReason[CursorChangeReason["Explicit"] = 3] = "Explicit";
    /**
     * There was a Paste.
     */
    CursorChangeReason[CursorChangeReason["Paste"] = 4] = "Paste";
    /**
     * There was an Undo.
     */
    CursorChangeReason[CursorChangeReason["Undo"] = 5] = "Undo";
    /**
     * There was a Redo.
     */
    CursorChangeReason[CursorChangeReason["Redo"] = 6] = "Redo";
})(CursorChangeReason || (CursorChangeReason = {}));
/**
 * The default end of line to use when instantiating models.
 */
var DefaultEndOfLine;
(function (DefaultEndOfLine) {
    /**
     * Use line feed (\n) as the end of line character.
     */
    DefaultEndOfLine[DefaultEndOfLine["LF"] = 1] = "LF";
    /**
     * Use carriage return and line feed (\r\n) as the end of line character.
     */
    DefaultEndOfLine[DefaultEndOfLine["CRLF"] = 2] = "CRLF";
})(DefaultEndOfLine || (DefaultEndOfLine = {}));
/**
 * A document highlight kind.
 */
var standaloneEnums_DocumentHighlightKind;
(function (DocumentHighlightKind) {
    /**
     * A textual occurrence.
     */
    DocumentHighlightKind[DocumentHighlightKind["Text"] = 0] = "Text";
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind[DocumentHighlightKind["Read"] = 1] = "Read";
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind[DocumentHighlightKind["Write"] = 2] = "Write";
})(standaloneEnums_DocumentHighlightKind || (standaloneEnums_DocumentHighlightKind = {}));
/**
 * Configuration options for auto indentation in the editor
 */
var EditorAutoIndentStrategy;
(function (EditorAutoIndentStrategy) {
    EditorAutoIndentStrategy[EditorAutoIndentStrategy["None"] = 0] = "None";
    EditorAutoIndentStrategy[EditorAutoIndentStrategy["Keep"] = 1] = "Keep";
    EditorAutoIndentStrategy[EditorAutoIndentStrategy["Brackets"] = 2] = "Brackets";
    EditorAutoIndentStrategy[EditorAutoIndentStrategy["Advanced"] = 3] = "Advanced";
    EditorAutoIndentStrategy[EditorAutoIndentStrategy["Full"] = 4] = "Full";
})(EditorAutoIndentStrategy || (EditorAutoIndentStrategy = {}));
var EditorOption;
(function (EditorOption) {
    EditorOption[EditorOption["acceptSuggestionOnCommitCharacter"] = 0] = "acceptSuggestionOnCommitCharacter";
    EditorOption[EditorOption["acceptSuggestionOnEnter"] = 1] = "acceptSuggestionOnEnter";
    EditorOption[EditorOption["accessibilitySupport"] = 2] = "accessibilitySupport";
    EditorOption[EditorOption["accessibilityPageSize"] = 3] = "accessibilityPageSize";
    EditorOption[EditorOption["ariaLabel"] = 4] = "ariaLabel";
    EditorOption[EditorOption["ariaRequired"] = 5] = "ariaRequired";
    EditorOption[EditorOption["autoClosingBrackets"] = 6] = "autoClosingBrackets";
    EditorOption[EditorOption["autoClosingComments"] = 7] = "autoClosingComments";
    EditorOption[EditorOption["screenReaderAnnounceInlineSuggestion"] = 8] = "screenReaderAnnounceInlineSuggestion";
    EditorOption[EditorOption["autoClosingDelete"] = 9] = "autoClosingDelete";
    EditorOption[EditorOption["autoClosingOvertype"] = 10] = "autoClosingOvertype";
    EditorOption[EditorOption["autoClosingQuotes"] = 11] = "autoClosingQuotes";
    EditorOption[EditorOption["autoIndent"] = 12] = "autoIndent";
    EditorOption[EditorOption["automaticLayout"] = 13] = "automaticLayout";
    EditorOption[EditorOption["autoSurround"] = 14] = "autoSurround";
    EditorOption[EditorOption["bracketPairColorization"] = 15] = "bracketPairColorization";
    EditorOption[EditorOption["guides"] = 16] = "guides";
    EditorOption[EditorOption["codeLens"] = 17] = "codeLens";
    EditorOption[EditorOption["codeLensFontFamily"] = 18] = "codeLensFontFamily";
    EditorOption[EditorOption["codeLensFontSize"] = 19] = "codeLensFontSize";
    EditorOption[EditorOption["colorDecorators"] = 20] = "colorDecorators";
    EditorOption[EditorOption["colorDecoratorsLimit"] = 21] = "colorDecoratorsLimit";
    EditorOption[EditorOption["columnSelection"] = 22] = "columnSelection";
    EditorOption[EditorOption["comments"] = 23] = "comments";
    EditorOption[EditorOption["contextmenu"] = 24] = "contextmenu";
    EditorOption[EditorOption["copyWithSyntaxHighlighting"] = 25] = "copyWithSyntaxHighlighting";
    EditorOption[EditorOption["cursorBlinking"] = 26] = "cursorBlinking";
    EditorOption[EditorOption["cursorSmoothCaretAnimation"] = 27] = "cursorSmoothCaretAnimation";
    EditorOption[EditorOption["cursorStyle"] = 28] = "cursorStyle";
    EditorOption[EditorOption["cursorSurroundingLines"] = 29] = "cursorSurroundingLines";
    EditorOption[EditorOption["cursorSurroundingLinesStyle"] = 30] = "cursorSurroundingLinesStyle";
    EditorOption[EditorOption["cursorWidth"] = 31] = "cursorWidth";
    EditorOption[EditorOption["disableLayerHinting"] = 32] = "disableLayerHinting";
    EditorOption[EditorOption["disableMonospaceOptimizations"] = 33] = "disableMonospaceOptimizations";
    EditorOption[EditorOption["domReadOnly"] = 34] = "domReadOnly";
    EditorOption[EditorOption["dragAndDrop"] = 35] = "dragAndDrop";
    EditorOption[EditorOption["dropIntoEditor"] = 36] = "dropIntoEditor";
    EditorOption[EditorOption["emptySelectionClipboard"] = 37] = "emptySelectionClipboard";
    EditorOption[EditorOption["experimentalWhitespaceRendering"] = 38] = "experimentalWhitespaceRendering";
    EditorOption[EditorOption["extraEditorClassName"] = 39] = "extraEditorClassName";
    EditorOption[EditorOption["fastScrollSensitivity"] = 40] = "fastScrollSensitivity";
    EditorOption[EditorOption["find"] = 41] = "find";
    EditorOption[EditorOption["fixedOverflowWidgets"] = 42] = "fixedOverflowWidgets";
    EditorOption[EditorOption["folding"] = 43] = "folding";
    EditorOption[EditorOption["foldingStrategy"] = 44] = "foldingStrategy";
    EditorOption[EditorOption["foldingHighlight"] = 45] = "foldingHighlight";
    EditorOption[EditorOption["foldingImportsByDefault"] = 46] = "foldingImportsByDefault";
    EditorOption[EditorOption["foldingMaximumRegions"] = 47] = "foldingMaximumRegions";
    EditorOption[EditorOption["unfoldOnClickAfterEndOfLine"] = 48] = "unfoldOnClickAfterEndOfLine";
    EditorOption[EditorOption["fontFamily"] = 49] = "fontFamily";
    EditorOption[EditorOption["fontInfo"] = 50] = "fontInfo";
    EditorOption[EditorOption["fontLigatures"] = 51] = "fontLigatures";
    EditorOption[EditorOption["fontSize"] = 52] = "fontSize";
    EditorOption[EditorOption["fontWeight"] = 53] = "fontWeight";
    EditorOption[EditorOption["fontVariations"] = 54] = "fontVariations";
    EditorOption[EditorOption["formatOnPaste"] = 55] = "formatOnPaste";
    EditorOption[EditorOption["formatOnType"] = 56] = "formatOnType";
    EditorOption[EditorOption["glyphMargin"] = 57] = "glyphMargin";
    EditorOption[EditorOption["gotoLocation"] = 58] = "gotoLocation";
    EditorOption[EditorOption["hideCursorInOverviewRuler"] = 59] = "hideCursorInOverviewRuler";
    EditorOption[EditorOption["hover"] = 60] = "hover";
    EditorOption[EditorOption["inDiffEditor"] = 61] = "inDiffEditor";
    EditorOption[EditorOption["inlineSuggest"] = 62] = "inlineSuggest";
    EditorOption[EditorOption["letterSpacing"] = 63] = "letterSpacing";
    EditorOption[EditorOption["lightbulb"] = 64] = "lightbulb";
    EditorOption[EditorOption["lineDecorationsWidth"] = 65] = "lineDecorationsWidth";
    EditorOption[EditorOption["lineHeight"] = 66] = "lineHeight";
    EditorOption[EditorOption["lineNumbers"] = 67] = "lineNumbers";
    EditorOption[EditorOption["lineNumbersMinChars"] = 68] = "lineNumbersMinChars";
    EditorOption[EditorOption["linkedEditing"] = 69] = "linkedEditing";
    EditorOption[EditorOption["links"] = 70] = "links";
    EditorOption[EditorOption["matchBrackets"] = 71] = "matchBrackets";
    EditorOption[EditorOption["minimap"] = 72] = "minimap";
    EditorOption[EditorOption["mouseStyle"] = 73] = "mouseStyle";
    EditorOption[EditorOption["mouseWheelScrollSensitivity"] = 74] = "mouseWheelScrollSensitivity";
    EditorOption[EditorOption["mouseWheelZoom"] = 75] = "mouseWheelZoom";
    EditorOption[EditorOption["multiCursorMergeOverlapping"] = 76] = "multiCursorMergeOverlapping";
    EditorOption[EditorOption["multiCursorModifier"] = 77] = "multiCursorModifier";
    EditorOption[EditorOption["multiCursorPaste"] = 78] = "multiCursorPaste";
    EditorOption[EditorOption["multiCursorLimit"] = 79] = "multiCursorLimit";
    EditorOption[EditorOption["occurrencesHighlight"] = 80] = "occurrencesHighlight";
    EditorOption[EditorOption["overviewRulerBorder"] = 81] = "overviewRulerBorder";
    EditorOption[EditorOption["overviewRulerLanes"] = 82] = "overviewRulerLanes";
    EditorOption[EditorOption["padding"] = 83] = "padding";
    EditorOption[EditorOption["pasteAs"] = 84] = "pasteAs";
    EditorOption[EditorOption["parameterHints"] = 85] = "parameterHints";
    EditorOption[EditorOption["peekWidgetDefaultFocus"] = 86] = "peekWidgetDefaultFocus";
    EditorOption[EditorOption["definitionLinkOpensInPeek"] = 87] = "definitionLinkOpensInPeek";
    EditorOption[EditorOption["quickSuggestions"] = 88] = "quickSuggestions";
    EditorOption[EditorOption["quickSuggestionsDelay"] = 89] = "quickSuggestionsDelay";
    EditorOption[EditorOption["readOnly"] = 90] = "readOnly";
    EditorOption[EditorOption["readOnlyMessage"] = 91] = "readOnlyMessage";
    EditorOption[EditorOption["renameOnType"] = 92] = "renameOnType";
    EditorOption[EditorOption["renderControlCharacters"] = 93] = "renderControlCharacters";
    EditorOption[EditorOption["renderFinalNewline"] = 94] = "renderFinalNewline";
    EditorOption[EditorOption["renderLineHighlight"] = 95] = "renderLineHighlight";
    EditorOption[EditorOption["renderLineHighlightOnlyWhenFocus"] = 96] = "renderLineHighlightOnlyWhenFocus";
    EditorOption[EditorOption["renderValidationDecorations"] = 97] = "renderValidationDecorations";
    EditorOption[EditorOption["renderWhitespace"] = 98] = "renderWhitespace";
    EditorOption[EditorOption["revealHorizontalRightPadding"] = 99] = "revealHorizontalRightPadding";
    EditorOption[EditorOption["roundedSelection"] = 100] = "roundedSelection";
    EditorOption[EditorOption["rulers"] = 101] = "rulers";
    EditorOption[EditorOption["scrollbar"] = 102] = "scrollbar";
    EditorOption[EditorOption["scrollBeyondLastColumn"] = 103] = "scrollBeyondLastColumn";
    EditorOption[EditorOption["scrollBeyondLastLine"] = 104] = "scrollBeyondLastLine";
    EditorOption[EditorOption["scrollPredominantAxis"] = 105] = "scrollPredominantAxis";
    EditorOption[EditorOption["selectionClipboard"] = 106] = "selectionClipboard";
    EditorOption[EditorOption["selectionHighlight"] = 107] = "selectionHighlight";
    EditorOption[EditorOption["selectOnLineNumbers"] = 108] = "selectOnLineNumbers";
    EditorOption[EditorOption["showFoldingControls"] = 109] = "showFoldingControls";
    EditorOption[EditorOption["showUnused"] = 110] = "showUnused";
    EditorOption[EditorOption["snippetSuggestions"] = 111] = "snippetSuggestions";
    EditorOption[EditorOption["smartSelect"] = 112] = "smartSelect";
    EditorOption[EditorOption["smoothScrolling"] = 113] = "smoothScrolling";
    EditorOption[EditorOption["stickyScroll"] = 114] = "stickyScroll";
    EditorOption[EditorOption["stickyTabStops"] = 115] = "stickyTabStops";
    EditorOption[EditorOption["stopRenderingLineAfter"] = 116] = "stopRenderingLineAfter";
    EditorOption[EditorOption["suggest"] = 117] = "suggest";
    EditorOption[EditorOption["suggestFontSize"] = 118] = "suggestFontSize";
    EditorOption[EditorOption["suggestLineHeight"] = 119] = "suggestLineHeight";
    EditorOption[EditorOption["suggestOnTriggerCharacters"] = 120] = "suggestOnTriggerCharacters";
    EditorOption[EditorOption["suggestSelection"] = 121] = "suggestSelection";
    EditorOption[EditorOption["tabCompletion"] = 122] = "tabCompletion";
    EditorOption[EditorOption["tabIndex"] = 123] = "tabIndex";
    EditorOption[EditorOption["unicodeHighlighting"] = 124] = "unicodeHighlighting";
    EditorOption[EditorOption["unusualLineTerminators"] = 125] = "unusualLineTerminators";
    EditorOption[EditorOption["useShadowDOM"] = 126] = "useShadowDOM";
    EditorOption[EditorOption["useTabStops"] = 127] = "useTabStops";
    EditorOption[EditorOption["wordBreak"] = 128] = "wordBreak";
    EditorOption[EditorOption["wordSeparators"] = 129] = "wordSeparators";
    EditorOption[EditorOption["wordWrap"] = 130] = "wordWrap";
    EditorOption[EditorOption["wordWrapBreakAfterCharacters"] = 131] = "wordWrapBreakAfterCharacters";
    EditorOption[EditorOption["wordWrapBreakBeforeCharacters"] = 132] = "wordWrapBreakBeforeCharacters";
    EditorOption[EditorOption["wordWrapColumn"] = 133] = "wordWrapColumn";
    EditorOption[EditorOption["wordWrapOverride1"] = 134] = "wordWrapOverride1";
    EditorOption[EditorOption["wordWrapOverride2"] = 135] = "wordWrapOverride2";
    EditorOption[EditorOption["wrappingIndent"] = 136] = "wrappingIndent";
    EditorOption[EditorOption["wrappingStrategy"] = 137] = "wrappingStrategy";
    EditorOption[EditorOption["showDeprecated"] = 138] = "showDeprecated";
    EditorOption[EditorOption["inlayHints"] = 139] = "inlayHints";
    EditorOption[EditorOption["editorClassName"] = 140] = "editorClassName";
    EditorOption[EditorOption["pixelRatio"] = 141] = "pixelRatio";
    EditorOption[EditorOption["tabFocusMode"] = 142] = "tabFocusMode";
    EditorOption[EditorOption["layoutInfo"] = 143] = "layoutInfo";
    EditorOption[EditorOption["wrappingInfo"] = 144] = "wrappingInfo";
    EditorOption[EditorOption["defaultColorDecorators"] = 145] = "defaultColorDecorators";
    EditorOption[EditorOption["colorDecoratorsActivatedOn"] = 146] = "colorDecoratorsActivatedOn";
    EditorOption[EditorOption["inlineCompletionsAccessibilityVerbose"] = 147] = "inlineCompletionsAccessibilityVerbose";
})(EditorOption || (EditorOption = {}));
/**
 * End of line character preference.
 */
var EndOfLinePreference;
(function (EndOfLinePreference) {
    /**
     * Use the end of line character identified in the text buffer.
     */
    EndOfLinePreference[EndOfLinePreference["TextDefined"] = 0] = "TextDefined";
    /**
     * Use line feed (\n) as the end of line character.
     */
    EndOfLinePreference[EndOfLinePreference["LF"] = 1] = "LF";
    /**
     * Use carriage return and line feed (\r\n) as the end of line character.
     */
    EndOfLinePreference[EndOfLinePreference["CRLF"] = 2] = "CRLF";
})(EndOfLinePreference || (EndOfLinePreference = {}));
/**
 * End of line character preference.
 */
var EndOfLineSequence;
(function (EndOfLineSequence) {
    /**
     * Use line feed (\n) as the end of line character.
     */
    EndOfLineSequence[EndOfLineSequence["LF"] = 0] = "LF";
    /**
     * Use carriage return and line feed (\r\n) as the end of line character.
     */
    EndOfLineSequence[EndOfLineSequence["CRLF"] = 1] = "CRLF";
})(EndOfLineSequence || (EndOfLineSequence = {}));
/**
 * Vertical Lane in the glyph margin of the editor.
 */
var GlyphMarginLane;
(function (GlyphMarginLane) {
    GlyphMarginLane[GlyphMarginLane["Left"] = 1] = "Left";
    GlyphMarginLane[GlyphMarginLane["Right"] = 2] = "Right";
})(GlyphMarginLane || (GlyphMarginLane = {}));
/**
 * Describes what to do with the indentation when pressing Enter.
 */
var IndentAction;
(function (IndentAction) {
    /**
     * Insert new line and copy the previous line's indentation.
     */
    IndentAction[IndentAction["None"] = 0] = "None";
    /**
     * Insert new line and indent once (relative to the previous line's indentation).
     */
    IndentAction[IndentAction["Indent"] = 1] = "Indent";
    /**
     * Insert two new lines:
     *  - the first one indented which will hold the cursor
     *  - the second one at the same indentation level
     */
    IndentAction[IndentAction["IndentOutdent"] = 2] = "IndentOutdent";
    /**
     * Insert new line and outdent once (relative to the previous line's indentation).
     */
    IndentAction[IndentAction["Outdent"] = 3] = "Outdent";
})(IndentAction || (IndentAction = {}));
var InjectedTextCursorStops;
(function (InjectedTextCursorStops) {
    InjectedTextCursorStops[InjectedTextCursorStops["Both"] = 0] = "Both";
    InjectedTextCursorStops[InjectedTextCursorStops["Right"] = 1] = "Right";
    InjectedTextCursorStops[InjectedTextCursorStops["Left"] = 2] = "Left";
    InjectedTextCursorStops[InjectedTextCursorStops["None"] = 3] = "None";
})(InjectedTextCursorStops || (InjectedTextCursorStops = {}));
var standaloneEnums_InlayHintKind;
(function (InlayHintKind) {
    InlayHintKind[InlayHintKind["Type"] = 1] = "Type";
    InlayHintKind[InlayHintKind["Parameter"] = 2] = "Parameter";
})(standaloneEnums_InlayHintKind || (standaloneEnums_InlayHintKind = {}));
/**
 * How an {@link InlineCompletionsProvider inline completion provider} was triggered.
 */
var standaloneEnums_InlineCompletionTriggerKind;
(function (InlineCompletionTriggerKind) {
    /**
     * Completion was triggered automatically while editing.
     * It is sufficient to return a single completion item in this case.
     */
    InlineCompletionTriggerKind[InlineCompletionTriggerKind["Automatic"] = 0] = "Automatic";
    /**
     * Completion was triggered explicitly by a user gesture.
     * Return multiple completion items to enable cycling through them.
     */
    InlineCompletionTriggerKind[InlineCompletionTriggerKind["Explicit"] = 1] = "Explicit";
})(standaloneEnums_InlineCompletionTriggerKind || (standaloneEnums_InlineCompletionTriggerKind = {}));
/**
 * Virtual Key Codes, the value does not hold any inherent meaning.
 * Inspired somewhat from https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731(v=vs.85).aspx
 * But these are "more general", as they should work across browsers & OS`s.
 */
var KeyCode;
(function (KeyCode) {
    KeyCode[KeyCode["DependsOnKbLayout"] = -1] = "DependsOnKbLayout";
    /**
     * Placed first to cover the 0 value of the enum.
     */
    KeyCode[KeyCode["Unknown"] = 0] = "Unknown";
    KeyCode[KeyCode["Backspace"] = 1] = "Backspace";
    KeyCode[KeyCode["Tab"] = 2] = "Tab";
    KeyCode[KeyCode["Enter"] = 3] = "Enter";
    KeyCode[KeyCode["Shift"] = 4] = "Shift";
    KeyCode[KeyCode["Ctrl"] = 5] = "Ctrl";
    KeyCode[KeyCode["Alt"] = 6] = "Alt";
    KeyCode[KeyCode["PauseBreak"] = 7] = "PauseBreak";
    KeyCode[KeyCode["CapsLock"] = 8] = "CapsLock";
    KeyCode[KeyCode["Escape"] = 9] = "Escape";
    KeyCode[KeyCode["Space"] = 10] = "Space";
    KeyCode[KeyCode["PageUp"] = 11] = "PageUp";
    KeyCode[KeyCode["PageDown"] = 12] = "PageDown";
    KeyCode[KeyCode["End"] = 13] = "End";
    KeyCode[KeyCode["Home"] = 14] = "Home";
    KeyCode[KeyCode["LeftArrow"] = 15] = "LeftArrow";
    KeyCode[KeyCode["UpArrow"] = 16] = "UpArrow";
    KeyCode[KeyCode["RightArrow"] = 17] = "RightArrow";
    KeyCode[KeyCode["DownArrow"] = 18] = "DownArrow";
    KeyCode[KeyCode["Insert"] = 19] = "Insert";
    KeyCode[KeyCode["Delete"] = 20] = "Delete";
    KeyCode[KeyCode["Digit0"] = 21] = "Digit0";
    KeyCode[KeyCode["Digit1"] = 22] = "Digit1";
    KeyCode[KeyCode["Digit2"] = 23] = "Digit2";
    KeyCode[KeyCode["Digit3"] = 24] = "Digit3";
    KeyCode[KeyCode["Digit4"] = 25] = "Digit4";
    KeyCode[KeyCode["Digit5"] = 26] = "Digit5";
    KeyCode[KeyCode["Digit6"] = 27] = "Digit6";
    KeyCode[KeyCode["Digit7"] = 28] = "Digit7";
    KeyCode[KeyCode["Digit8"] = 29] = "Digit8";
    KeyCode[KeyCode["Digit9"] = 30] = "Digit9";
    KeyCode[KeyCode["KeyA"] = 31] = "KeyA";
    KeyCode[KeyCode["KeyB"] = 32] = "KeyB";
    KeyCode[KeyCode["KeyC"] = 33] = "KeyC";
    KeyCode[KeyCode["KeyD"] = 34] = "KeyD";
    KeyCode[KeyCode["KeyE"] = 35] = "KeyE";
    KeyCode[KeyCode["KeyF"] = 36] = "KeyF";
    KeyCode[KeyCode["KeyG"] = 37] = "KeyG";
    KeyCode[KeyCode["KeyH"] = 38] = "KeyH";
    KeyCode[KeyCode["KeyI"] = 39] = "KeyI";
    KeyCode[KeyCode["KeyJ"] = 40] = "KeyJ";
    KeyCode[KeyCode["KeyK"] = 41] = "KeyK";
    KeyCode[KeyCode["KeyL"] = 42] = "KeyL";
    KeyCode[KeyCode["KeyM"] = 43] = "KeyM";
    KeyCode[KeyCode["KeyN"] = 44] = "KeyN";
    KeyCode[KeyCode["KeyO"] = 45] = "KeyO";
    KeyCode[KeyCode["KeyP"] = 46] = "KeyP";
    KeyCode[KeyCode["KeyQ"] = 47] = "KeyQ";
    KeyCode[KeyCode["KeyR"] = 48] = "KeyR";
    KeyCode[KeyCode["KeyS"] = 49] = "KeyS";
    KeyCode[KeyCode["KeyT"] = 50] = "KeyT";
    KeyCode[KeyCode["KeyU"] = 51] = "KeyU";
    KeyCode[KeyCode["KeyV"] = 52] = "KeyV";
    KeyCode[KeyCode["KeyW"] = 53] = "KeyW";
    KeyCode[KeyCode["KeyX"] = 54] = "KeyX";
    KeyCode[KeyCode["KeyY"] = 55] = "KeyY";
    KeyCode[KeyCode["KeyZ"] = 56] = "KeyZ";
    KeyCode[KeyCode["Meta"] = 57] = "Meta";
    KeyCode[KeyCode["ContextMenu"] = 58] = "ContextMenu";
    KeyCode[KeyCode["F1"] = 59] = "F1";
    KeyCode[KeyCode["F2"] = 60] = "F2";
    KeyCode[KeyCode["F3"] = 61] = "F3";
    KeyCode[KeyCode["F4"] = 62] = "F4";
    KeyCode[KeyCode["F5"] = 63] = "F5";
    KeyCode[KeyCode["F6"] = 64] = "F6";
    KeyCode[KeyCode["F7"] = 65] = "F7";
    KeyCode[KeyCode["F8"] = 66] = "F8";
    KeyCode[KeyCode["F9"] = 67] = "F9";
    KeyCode[KeyCode["F10"] = 68] = "F10";
    KeyCode[KeyCode["F11"] = 69] = "F11";
    KeyCode[KeyCode["F12"] = 70] = "F12";
    KeyCode[KeyCode["F13"] = 71] = "F13";
    KeyCode[KeyCode["F14"] = 72] = "F14";
    KeyCode[KeyCode["F15"] = 73] = "F15";
    KeyCode[KeyCode["F16"] = 74] = "F16";
    KeyCode[KeyCode["F17"] = 75] = "F17";
    KeyCode[KeyCode["F18"] = 76] = "F18";
    KeyCode[KeyCode["F19"] = 77] = "F19";
    KeyCode[KeyCode["F20"] = 78] = "F20";
    KeyCode[KeyCode["F21"] = 79] = "F21";
    KeyCode[KeyCode["F22"] = 80] = "F22";
    KeyCode[KeyCode["F23"] = 81] = "F23";
    KeyCode[KeyCode["F24"] = 82] = "F24";
    KeyCode[KeyCode["NumLock"] = 83] = "NumLock";
    KeyCode[KeyCode["ScrollLock"] = 84] = "ScrollLock";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ';:' key
     */
    KeyCode[KeyCode["Semicolon"] = 85] = "Semicolon";
    /**
     * For any country/region, the '+' key
     * For the US standard keyboard, the '=+' key
     */
    KeyCode[KeyCode["Equal"] = 86] = "Equal";
    /**
     * For any country/region, the ',' key
     * For the US standard keyboard, the ',<' key
     */
    KeyCode[KeyCode["Comma"] = 87] = "Comma";
    /**
     * For any country/region, the '-' key
     * For the US standard keyboard, the '-_' key
     */
    KeyCode[KeyCode["Minus"] = 88] = "Minus";
    /**
     * For any country/region, the '.' key
     * For the US standard keyboard, the '.>' key
     */
    KeyCode[KeyCode["Period"] = 89] = "Period";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '/?' key
     */
    KeyCode[KeyCode["Slash"] = 90] = "Slash";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '`~' key
     */
    KeyCode[KeyCode["Backquote"] = 91] = "Backquote";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '[{' key
     */
    KeyCode[KeyCode["BracketLeft"] = 92] = "BracketLeft";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the '\|' key
     */
    KeyCode[KeyCode["Backslash"] = 93] = "Backslash";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ']}' key
     */
    KeyCode[KeyCode["BracketRight"] = 94] = "BracketRight";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     * For the US standard keyboard, the ''"' key
     */
    KeyCode[KeyCode["Quote"] = 95] = "Quote";
    /**
     * Used for miscellaneous characters; it can vary by keyboard.
     */
    KeyCode[KeyCode["OEM_8"] = 96] = "OEM_8";
    /**
     * Either the angle bracket key or the backslash key on the RT 102-key keyboard.
     */
    KeyCode[KeyCode["IntlBackslash"] = 97] = "IntlBackslash";
    KeyCode[KeyCode["Numpad0"] = 98] = "Numpad0";
    KeyCode[KeyCode["Numpad1"] = 99] = "Numpad1";
    KeyCode[KeyCode["Numpad2"] = 100] = "Numpad2";
    KeyCode[KeyCode["Numpad3"] = 101] = "Numpad3";
    KeyCode[KeyCode["Numpad4"] = 102] = "Numpad4";
    KeyCode[KeyCode["Numpad5"] = 103] = "Numpad5";
    KeyCode[KeyCode["Numpad6"] = 104] = "Numpad6";
    KeyCode[KeyCode["Numpad7"] = 105] = "Numpad7";
    KeyCode[KeyCode["Numpad8"] = 106] = "Numpad8";
    KeyCode[KeyCode["Numpad9"] = 107] = "Numpad9";
    KeyCode[KeyCode["NumpadMultiply"] = 108] = "NumpadMultiply";
    KeyCode[KeyCode["NumpadAdd"] = 109] = "NumpadAdd";
    KeyCode[KeyCode["NUMPAD_SEPARATOR"] = 110] = "NUMPAD_SEPARATOR";
    KeyCode[KeyCode["NumpadSubtract"] = 111] = "NumpadSubtract";
    KeyCode[KeyCode["NumpadDecimal"] = 112] = "NumpadDecimal";
    KeyCode[KeyCode["NumpadDivide"] = 113] = "NumpadDivide";
    /**
     * Cover all key codes when IME is processing input.
     */
    KeyCode[KeyCode["KEY_IN_COMPOSITION"] = 114] = "KEY_IN_COMPOSITION";
    KeyCode[KeyCode["ABNT_C1"] = 115] = "ABNT_C1";
    KeyCode[KeyCode["ABNT_C2"] = 116] = "ABNT_C2";
    KeyCode[KeyCode["AudioVolumeMute"] = 117] = "AudioVolumeMute";
    KeyCode[KeyCode["AudioVolumeUp"] = 118] = "AudioVolumeUp";
    KeyCode[KeyCode["AudioVolumeDown"] = 119] = "AudioVolumeDown";
    KeyCode[KeyCode["BrowserSearch"] = 120] = "BrowserSearch";
    KeyCode[KeyCode["BrowserHome"] = 121] = "BrowserHome";
    KeyCode[KeyCode["BrowserBack"] = 122] = "BrowserBack";
    KeyCode[KeyCode["BrowserForward"] = 123] = "BrowserForward";
    KeyCode[KeyCode["MediaTrackNext"] = 124] = "MediaTrackNext";
    KeyCode[KeyCode["MediaTrackPrevious"] = 125] = "MediaTrackPrevious";
    KeyCode[KeyCode["MediaStop"] = 126] = "MediaStop";
    KeyCode[KeyCode["MediaPlayPause"] = 127] = "MediaPlayPause";
    KeyCode[KeyCode["LaunchMediaPlayer"] = 128] = "LaunchMediaPlayer";
    KeyCode[KeyCode["LaunchMail"] = 129] = "LaunchMail";
    KeyCode[KeyCode["LaunchApp2"] = 130] = "LaunchApp2";
    /**
     * VK_CLEAR, 0x0C, CLEAR key
     */
    KeyCode[KeyCode["Clear"] = 131] = "Clear";
    /**
     * Placed last to cover the length of the enum.
     * Please do not depend on this value!
     */
    KeyCode[KeyCode["MAX_VALUE"] = 132] = "MAX_VALUE";
})(KeyCode || (KeyCode = {}));
var MarkerSeverity;
(function (MarkerSeverity) {
    MarkerSeverity[MarkerSeverity["Hint"] = 1] = "Hint";
    MarkerSeverity[MarkerSeverity["Info"] = 2] = "Info";
    MarkerSeverity[MarkerSeverity["Warning"] = 4] = "Warning";
    MarkerSeverity[MarkerSeverity["Error"] = 8] = "Error";
})(MarkerSeverity || (MarkerSeverity = {}));
var MarkerTag;
(function (MarkerTag) {
    MarkerTag[MarkerTag["Unnecessary"] = 1] = "Unnecessary";
    MarkerTag[MarkerTag["Deprecated"] = 2] = "Deprecated";
})(MarkerTag || (MarkerTag = {}));
/**
 * Position in the minimap to render the decoration.
 */
var MinimapPosition;
(function (MinimapPosition) {
    MinimapPosition[MinimapPosition["Inline"] = 1] = "Inline";
    MinimapPosition[MinimapPosition["Gutter"] = 2] = "Gutter";
})(MinimapPosition || (MinimapPosition = {}));
/**
 * Type of hit element with the mouse in the editor.
 */
var MouseTargetType;
(function (MouseTargetType) {
    /**
     * Mouse is on top of an unknown element.
     */
    MouseTargetType[MouseTargetType["UNKNOWN"] = 0] = "UNKNOWN";
    /**
     * Mouse is on top of the textarea used for input.
     */
    MouseTargetType[MouseTargetType["TEXTAREA"] = 1] = "TEXTAREA";
    /**
     * Mouse is on top of the glyph margin
     */
    MouseTargetType[MouseTargetType["GUTTER_GLYPH_MARGIN"] = 2] = "GUTTER_GLYPH_MARGIN";
    /**
     * Mouse is on top of the line numbers
     */
    MouseTargetType[MouseTargetType["GUTTER_LINE_NUMBERS"] = 3] = "GUTTER_LINE_NUMBERS";
    /**
     * Mouse is on top of the line decorations
     */
    MouseTargetType[MouseTargetType["GUTTER_LINE_DECORATIONS"] = 4] = "GUTTER_LINE_DECORATIONS";
    /**
     * Mouse is on top of the whitespace left in the gutter by a view zone.
     */
    MouseTargetType[MouseTargetType["GUTTER_VIEW_ZONE"] = 5] = "GUTTER_VIEW_ZONE";
    /**
     * Mouse is on top of text in the content.
     */
    MouseTargetType[MouseTargetType["CONTENT_TEXT"] = 6] = "CONTENT_TEXT";
    /**
     * Mouse is on top of empty space in the content (e.g. after line text or below last line)
     */
    MouseTargetType[MouseTargetType["CONTENT_EMPTY"] = 7] = "CONTENT_EMPTY";
    /**
     * Mouse is on top of a view zone in the content.
     */
    MouseTargetType[MouseTargetType["CONTENT_VIEW_ZONE"] = 8] = "CONTENT_VIEW_ZONE";
    /**
     * Mouse is on top of a content widget.
     */
    MouseTargetType[MouseTargetType["CONTENT_WIDGET"] = 9] = "CONTENT_WIDGET";
    /**
     * Mouse is on top of the decorations overview ruler.
     */
    MouseTargetType[MouseTargetType["OVERVIEW_RULER"] = 10] = "OVERVIEW_RULER";
    /**
     * Mouse is on top of a scrollbar.
     */
    MouseTargetType[MouseTargetType["SCROLLBAR"] = 11] = "SCROLLBAR";
    /**
     * Mouse is on top of an overlay widget.
     */
    MouseTargetType[MouseTargetType["OVERLAY_WIDGET"] = 12] = "OVERLAY_WIDGET";
    /**
     * Mouse is outside of the editor.
     */
    MouseTargetType[MouseTargetType["OUTSIDE_EDITOR"] = 13] = "OUTSIDE_EDITOR";
})(MouseTargetType || (MouseTargetType = {}));
/**
 * A positioning preference for rendering overlay widgets.
 */
var OverlayWidgetPositionPreference;
(function (OverlayWidgetPositionPreference) {
    /**
     * Position the overlay widget in the top right corner
     */
    OverlayWidgetPositionPreference[OverlayWidgetPositionPreference["TOP_RIGHT_CORNER"] = 0] = "TOP_RIGHT_CORNER";
    /**
     * Position the overlay widget in the bottom right corner
     */
    OverlayWidgetPositionPreference[OverlayWidgetPositionPreference["BOTTOM_RIGHT_CORNER"] = 1] = "BOTTOM_RIGHT_CORNER";
    /**
     * Position the overlay widget in the top center
     */
    OverlayWidgetPositionPreference[OverlayWidgetPositionPreference["TOP_CENTER"] = 2] = "TOP_CENTER";
})(OverlayWidgetPositionPreference || (OverlayWidgetPositionPreference = {}));
/**
 * Vertical Lane in the overview ruler of the editor.
 */
var OverviewRulerLane;
(function (OverviewRulerLane) {
    OverviewRulerLane[OverviewRulerLane["Left"] = 1] = "Left";
    OverviewRulerLane[OverviewRulerLane["Center"] = 2] = "Center";
    OverviewRulerLane[OverviewRulerLane["Right"] = 4] = "Right";
    OverviewRulerLane[OverviewRulerLane["Full"] = 7] = "Full";
})(OverviewRulerLane || (OverviewRulerLane = {}));
var PositionAffinity;
(function (PositionAffinity) {
    /**
     * Prefers the left most position.
    */
    PositionAffinity[PositionAffinity["Left"] = 0] = "Left";
    /**
     * Prefers the right most position.
    */
    PositionAffinity[PositionAffinity["Right"] = 1] = "Right";
    /**
     * No preference.
    */
    PositionAffinity[PositionAffinity["None"] = 2] = "None";
    /**
     * If the given position is on injected text, prefers the position left of it.
    */
    PositionAffinity[PositionAffinity["LeftOfInjectedText"] = 3] = "LeftOfInjectedText";
    /**
     * If the given position is on injected text, prefers the position right of it.
    */
    PositionAffinity[PositionAffinity["RightOfInjectedText"] = 4] = "RightOfInjectedText";
})(PositionAffinity || (PositionAffinity = {}));
var RenderLineNumbersType;
(function (RenderLineNumbersType) {
    RenderLineNumbersType[RenderLineNumbersType["Off"] = 0] = "Off";
    RenderLineNumbersType[RenderLineNumbersType["On"] = 1] = "On";
    RenderLineNumbersType[RenderLineNumbersType["Relative"] = 2] = "Relative";
    RenderLineNumbersType[RenderLineNumbersType["Interval"] = 3] = "Interval";
    RenderLineNumbersType[RenderLineNumbersType["Custom"] = 4] = "Custom";
})(RenderLineNumbersType || (RenderLineNumbersType = {}));
var RenderMinimap;
(function (RenderMinimap) {
    RenderMinimap[RenderMinimap["None"] = 0] = "None";
    RenderMinimap[RenderMinimap["Text"] = 1] = "Text";
    RenderMinimap[RenderMinimap["Blocks"] = 2] = "Blocks";
})(RenderMinimap || (RenderMinimap = {}));
var ScrollType;
(function (ScrollType) {
    ScrollType[ScrollType["Smooth"] = 0] = "Smooth";
    ScrollType[ScrollType["Immediate"] = 1] = "Immediate";
})(ScrollType || (ScrollType = {}));
var ScrollbarVisibility;
(function (ScrollbarVisibility) {
    ScrollbarVisibility[ScrollbarVisibility["Auto"] = 1] = "Auto";
    ScrollbarVisibility[ScrollbarVisibility["Hidden"] = 2] = "Hidden";
    ScrollbarVisibility[ScrollbarVisibility["Visible"] = 3] = "Visible";
})(ScrollbarVisibility || (ScrollbarVisibility = {}));
/**
 * The direction of a selection.
 */
var SelectionDirection;
(function (SelectionDirection) {
    /**
     * The selection starts above where it ends.
     */
    SelectionDirection[SelectionDirection["LTR"] = 0] = "LTR";
    /**
     * The selection starts below where it ends.
     */
    SelectionDirection[SelectionDirection["RTL"] = 1] = "RTL";
})(SelectionDirection || (SelectionDirection = {}));
var standaloneEnums_SignatureHelpTriggerKind;
(function (SignatureHelpTriggerKind) {
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["Invoke"] = 1] = "Invoke";
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["TriggerCharacter"] = 2] = "TriggerCharacter";
    SignatureHelpTriggerKind[SignatureHelpTriggerKind["ContentChange"] = 3] = "ContentChange";
})(standaloneEnums_SignatureHelpTriggerKind || (standaloneEnums_SignatureHelpTriggerKind = {}));
/**
 * A symbol kind.
 */
var SymbolKind;
(function (SymbolKind) {
    SymbolKind[SymbolKind["File"] = 0] = "File";
    SymbolKind[SymbolKind["Module"] = 1] = "Module";
    SymbolKind[SymbolKind["Namespace"] = 2] = "Namespace";
    SymbolKind[SymbolKind["Package"] = 3] = "Package";
    SymbolKind[SymbolKind["Class"] = 4] = "Class";
    SymbolKind[SymbolKind["Method"] = 5] = "Method";
    SymbolKind[SymbolKind["Property"] = 6] = "Property";
    SymbolKind[SymbolKind["Field"] = 7] = "Field";
    SymbolKind[SymbolKind["Constructor"] = 8] = "Constructor";
    SymbolKind[SymbolKind["Enum"] = 9] = "Enum";
    SymbolKind[SymbolKind["Interface"] = 10] = "Interface";
    SymbolKind[SymbolKind["Function"] = 11] = "Function";
    SymbolKind[SymbolKind["Variable"] = 12] = "Variable";
    SymbolKind[SymbolKind["Constant"] = 13] = "Constant";
    SymbolKind[SymbolKind["String"] = 14] = "String";
    SymbolKind[SymbolKind["Number"] = 15] = "Number";
    SymbolKind[SymbolKind["Boolean"] = 16] = "Boolean";
    SymbolKind[SymbolKind["Array"] = 17] = "Array";
    SymbolKind[SymbolKind["Object"] = 18] = "Object";
    SymbolKind[SymbolKind["Key"] = 19] = "Key";
    SymbolKind[SymbolKind["Null"] = 20] = "Null";
    SymbolKind[SymbolKind["EnumMember"] = 21] = "EnumMember";
    SymbolKind[SymbolKind["Struct"] = 22] = "Struct";
    SymbolKind[SymbolKind["Event"] = 23] = "Event";
    SymbolKind[SymbolKind["Operator"] = 24] = "Operator";
    SymbolKind[SymbolKind["TypeParameter"] = 25] = "TypeParameter";
})(SymbolKind || (SymbolKind = {}));
var SymbolTag;
(function (SymbolTag) {
    SymbolTag[SymbolTag["Deprecated"] = 1] = "Deprecated";
})(SymbolTag || (SymbolTag = {}));
/**
 * The kind of animation in which the editor's cursor should be rendered.
 */
var TextEditorCursorBlinkingStyle;
(function (TextEditorCursorBlinkingStyle) {
    /**
     * Hidden
     */
    TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Hidden"] = 0] = "Hidden";
    /**
     * Blinking
     */
    TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Blink"] = 1] = "Blink";
    /**
     * Blinking with smooth fading
     */
    TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Smooth"] = 2] = "Smooth";
    /**
     * Blinking with prolonged filled state and smooth fading
     */
    TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Phase"] = 3] = "Phase";
    /**
     * Expand collapse animation on the y axis
     */
    TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Expand"] = 4] = "Expand";
    /**
     * No-Blinking
     */
    TextEditorCursorBlinkingStyle[TextEditorCursorBlinkingStyle["Solid"] = 5] = "Solid";
})(TextEditorCursorBlinkingStyle || (TextEditorCursorBlinkingStyle = {}));
/**
 * The style in which the editor's cursor should be rendered.
 */
var TextEditorCursorStyle;
(function (TextEditorCursorStyle) {
    /**
     * As a vertical line (sitting between two characters).
     */
    TextEditorCursorStyle[TextEditorCursorStyle["Line"] = 1] = "Line";
    /**
     * As a block (sitting on top of a character).
     */
    TextEditorCursorStyle[TextEditorCursorStyle["Block"] = 2] = "Block";
    /**
     * As a horizontal line (sitting under a character).
     */
    TextEditorCursorStyle[TextEditorCursorStyle["Underline"] = 3] = "Underline";
    /**
     * As a thin vertical line (sitting between two characters).
     */
    TextEditorCursorStyle[TextEditorCursorStyle["LineThin"] = 4] = "LineThin";
    /**
     * As an outlined block (sitting on top of a character).
     */
    TextEditorCursorStyle[TextEditorCursorStyle["BlockOutline"] = 5] = "BlockOutline";
    /**
     * As a thin horizontal line (sitting under a character).
     */
    TextEditorCursorStyle[TextEditorCursorStyle["UnderlineThin"] = 6] = "UnderlineThin";
})(TextEditorCursorStyle || (TextEditorCursorStyle = {}));
/**
 * Describes the behavior of decorations when typing/editing near their edges.
 * Note: Please do not edit the values, as they very carefully match `DecorationRangeBehavior`
 */
var TrackedRangeStickiness;
(function (TrackedRangeStickiness) {
    TrackedRangeStickiness[TrackedRangeStickiness["AlwaysGrowsWhenTypingAtEdges"] = 0] = "AlwaysGrowsWhenTypingAtEdges";
    TrackedRangeStickiness[TrackedRangeStickiness["NeverGrowsWhenTypingAtEdges"] = 1] = "NeverGrowsWhenTypingAtEdges";
    TrackedRangeStickiness[TrackedRangeStickiness["GrowsOnlyWhenTypingBefore"] = 2] = "GrowsOnlyWhenTypingBefore";
    TrackedRangeStickiness[TrackedRangeStickiness["GrowsOnlyWhenTypingAfter"] = 3] = "GrowsOnlyWhenTypingAfter";
})(TrackedRangeStickiness || (TrackedRangeStickiness = {}));
/**
 * Describes how to indent wrapped lines.
 */
var WrappingIndent;
(function (WrappingIndent) {
    /**
     * No indentation => wrapped lines begin at column 1.
     */
    WrappingIndent[WrappingIndent["None"] = 0] = "None";
    /**
     * Same => wrapped lines get the same indentation as the parent.
     */
    WrappingIndent[WrappingIndent["Same"] = 1] = "Same";
    /**
     * Indent => wrapped lines get +1 indentation toward the parent.
     */
    WrappingIndent[WrappingIndent["Indent"] = 2] = "Indent";
    /**
     * DeepIndent => wrapped lines get +2 indentation toward the parent.
     */
    WrappingIndent[WrappingIndent["DeepIndent"] = 3] = "DeepIndent";
})(WrappingIndent || (WrappingIndent = {}));

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/services/editorBaseApi.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/









class KeyMod {
    static chord(firstPart, secondPart) {
        return KeyChord(firstPart, secondPart);
    }
}
KeyMod.CtrlCmd = 2048 /* ConstKeyMod.CtrlCmd */;
KeyMod.Shift = 1024 /* ConstKeyMod.Shift */;
KeyMod.Alt = 512 /* ConstKeyMod.Alt */;
KeyMod.WinCtrl = 256 /* ConstKeyMod.WinCtrl */;
function createMonacoBaseAPI() {
    return {
        editor: undefined, // undefined override expected here
        languages: undefined, // undefined override expected here
        CancellationTokenSource: CancellationTokenSource,
        Emitter: Emitter,
        KeyCode: KeyCode,
        KeyMod: KeyMod,
        Position: position_Position,
        Range: range_Range,
        Selection: Selection,
        SelectionDirection: SelectionDirection,
        MarkerSeverity: MarkerSeverity,
        MarkerTag: MarkerTag,
        Uri: uri_URI,
        Token: Token
    };
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/core/wordCharacterClassifier.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

class WordCharacterClassifier extends CharacterClassifier {
    constructor(wordSeparators) {
        super(0 /* WordCharacterClass.Regular */);
        for (let i = 0, len = wordSeparators.length; i < len; i++) {
            this.set(wordSeparators.charCodeAt(i), 2 /* WordCharacterClass.WordSeparator */);
        }
        this.set(32 /* CharCode.Space */, 1 /* WordCharacterClass.Whitespace */);
        this.set(9 /* CharCode.Tab */, 1 /* WordCharacterClass.Whitespace */);
    }
}
function once(computeFn) {
    const cache = {}; // TODO@Alex unbounded cache
    return (input) => {
        if (!cache.hasOwnProperty(input)) {
            cache[input] = computeFn(input);
        }
        return cache[input];
    };
}
const wordCharacterClassifier_getMapForWordSeparators = once((input) => new WordCharacterClassifier(input));

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/model.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Vertical Lane in the overview ruler of the editor.
 */
var model_OverviewRulerLane;
(function (OverviewRulerLane) {
    OverviewRulerLane[OverviewRulerLane["Left"] = 1] = "Left";
    OverviewRulerLane[OverviewRulerLane["Center"] = 2] = "Center";
    OverviewRulerLane[OverviewRulerLane["Right"] = 4] = "Right";
    OverviewRulerLane[OverviewRulerLane["Full"] = 7] = "Full";
})(model_OverviewRulerLane || (model_OverviewRulerLane = {}));
/**
 * Vertical Lane in the glyph margin of the editor.
 */
var model_GlyphMarginLane;
(function (GlyphMarginLane) {
    GlyphMarginLane[GlyphMarginLane["Left"] = 1] = "Left";
    GlyphMarginLane[GlyphMarginLane["Right"] = 2] = "Right";
})(model_GlyphMarginLane || (model_GlyphMarginLane = {}));
/**
 * Position in the minimap to render the decoration.
 */
var model_MinimapPosition;
(function (MinimapPosition) {
    MinimapPosition[MinimapPosition["Inline"] = 1] = "Inline";
    MinimapPosition[MinimapPosition["Gutter"] = 2] = "Gutter";
})(model_MinimapPosition || (model_MinimapPosition = {}));
var model_InjectedTextCursorStops;
(function (InjectedTextCursorStops) {
    InjectedTextCursorStops[InjectedTextCursorStops["Both"] = 0] = "Both";
    InjectedTextCursorStops[InjectedTextCursorStops["Right"] = 1] = "Right";
    InjectedTextCursorStops[InjectedTextCursorStops["Left"] = 2] = "Left";
    InjectedTextCursorStops[InjectedTextCursorStops["None"] = 3] = "None";
})(model_InjectedTextCursorStops || (model_InjectedTextCursorStops = {}));
class TextModelResolvedOptions {
    get originalIndentSize() {
        return this._indentSizeIsTabSize ? 'tabSize' : this.indentSize;
    }
    /**
     * @internal
     */
    constructor(src) {
        this._textModelResolvedOptionsBrand = undefined;
        this.tabSize = Math.max(1, src.tabSize | 0);
        if (src.indentSize === 'tabSize') {
            this.indentSize = this.tabSize;
            this._indentSizeIsTabSize = true;
        }
        else {
            this.indentSize = Math.max(1, src.indentSize | 0);
            this._indentSizeIsTabSize = false;
        }
        this.insertSpaces = Boolean(src.insertSpaces);
        this.defaultEOL = src.defaultEOL | 0;
        this.trimAutoWhitespace = Boolean(src.trimAutoWhitespace);
        this.bracketPairColorizationOptions = src.bracketPairColorizationOptions;
    }
    /**
     * @internal
     */
    equals(other) {
        return (this.tabSize === other.tabSize
            && this._indentSizeIsTabSize === other._indentSizeIsTabSize
            && this.indentSize === other.indentSize
            && this.insertSpaces === other.insertSpaces
            && this.defaultEOL === other.defaultEOL
            && this.trimAutoWhitespace === other.trimAutoWhitespace
            && equals(this.bracketPairColorizationOptions, other.bracketPairColorizationOptions));
    }
    /**
     * @internal
     */
    createChangeEvent(newOpts) {
        return {
            tabSize: this.tabSize !== newOpts.tabSize,
            indentSize: this.indentSize !== newOpts.indentSize,
            insertSpaces: this.insertSpaces !== newOpts.insertSpaces,
            trimAutoWhitespace: this.trimAutoWhitespace !== newOpts.trimAutoWhitespace,
        };
    }
}
class model_FindMatch {
    /**
     * @internal
     */
    constructor(range, matches) {
        this._findMatchBrand = undefined;
        this.range = range;
        this.matches = matches;
    }
}
/**
 * @internal
 */
function isITextSnapshot(obj) {
    return (obj && typeof obj.read === 'function');
}
/**
 * @internal
 */
class ValidAnnotatedEditOperation {
    constructor(identifier, range, text, forceMoveMarkers, isAutoWhitespaceEdit, _isTracked) {
        this.identifier = identifier;
        this.range = range;
        this.text = text;
        this.forceMoveMarkers = forceMoveMarkers;
        this.isAutoWhitespaceEdit = isAutoWhitespaceEdit;
        this._isTracked = _isTracked;
    }
}
/**
 * @internal
 */
class model_SearchData {
    constructor(regex, wordSeparators, simpleSearch) {
        this.regex = regex;
        this.wordSeparators = wordSeparators;
        this.simpleSearch = simpleSearch;
    }
}
/**
 * @internal
 */
class ApplyEditsResult {
    constructor(reverseEdits, changes, trimAutoWhitespaceLineNumbers) {
        this.reverseEdits = reverseEdits;
        this.changes = changes;
        this.trimAutoWhitespaceLineNumbers = trimAutoWhitespaceLineNumbers;
    }
}
/**
 * @internal
 */
function shouldSynchronizeModel(model) {
    return (!model.isTooLargeForSyncing() && !model.isForSimpleWidget);
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/model/textModelSearch.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/





const LIMIT_FIND_COUNT = 999;
class SearchParams {
    constructor(searchString, isRegex, matchCase, wordSeparators) {
        this.searchString = searchString;
        this.isRegex = isRegex;
        this.matchCase = matchCase;
        this.wordSeparators = wordSeparators;
    }
    parseSearchRequest() {
        if (this.searchString === '') {
            return null;
        }
        // Try to create a RegExp out of the params
        let multiline;
        if (this.isRegex) {
            multiline = isMultilineRegexSource(this.searchString);
        }
        else {
            multiline = (this.searchString.indexOf('\n') >= 0);
        }
        let regex = null;
        try {
            regex = strings.createRegExp(this.searchString, this.isRegex, {
                matchCase: this.matchCase,
                wholeWord: false,
                multiline: multiline,
                global: true,
                unicode: true
            });
        }
        catch (err) {
            return null;
        }
        if (!regex) {
            return null;
        }
        let canUseSimpleSearch = (!this.isRegex && !multiline);
        if (canUseSimpleSearch && this.searchString.toLowerCase() !== this.searchString.toUpperCase()) {
            // casing might make a difference
            canUseSimpleSearch = this.matchCase;
        }
        return new SearchData(regex, this.wordSeparators ? getMapForWordSeparators(this.wordSeparators) : null, canUseSimpleSearch ? this.searchString : null);
    }
}
function isMultilineRegexSource(searchString) {
    if (!searchString || searchString.length === 0) {
        return false;
    }
    for (let i = 0, len = searchString.length; i < len; i++) {
        const chCode = searchString.charCodeAt(i);
        if (chCode === 10 /* CharCode.LineFeed */) {
            return true;
        }
        if (chCode === 92 /* CharCode.Backslash */) {
            // move to next char
            i++;
            if (i >= len) {
                // string ends with a \
                break;
            }
            const nextChCode = searchString.charCodeAt(i);
            if (nextChCode === 110 /* CharCode.n */ || nextChCode === 114 /* CharCode.r */ || nextChCode === 87 /* CharCode.W */) {
                return true;
            }
        }
    }
    return false;
}
function createFindMatch(range, rawMatches, captureMatches) {
    if (!captureMatches) {
        return new FindMatch(range, null);
    }
    const matches = [];
    for (let i = 0, len = rawMatches.length; i < len; i++) {
        matches[i] = rawMatches[i];
    }
    return new FindMatch(range, matches);
}
class LineFeedCounter {
    constructor(text) {
        const lineFeedsOffsets = [];
        let lineFeedsOffsetsLen = 0;
        for (let i = 0, textLen = text.length; i < textLen; i++) {
            if (text.charCodeAt(i) === 10 /* CharCode.LineFeed */) {
                lineFeedsOffsets[lineFeedsOffsetsLen++] = i;
            }
        }
        this._lineFeedsOffsets = lineFeedsOffsets;
    }
    findLineFeedCountBeforeOffset(offset) {
        const lineFeedsOffsets = this._lineFeedsOffsets;
        let min = 0;
        let max = lineFeedsOffsets.length - 1;
        if (max === -1) {
            // no line feeds
            return 0;
        }
        if (offset <= lineFeedsOffsets[0]) {
            // before first line feed
            return 0;
        }
        while (min < max) {
            const mid = min + ((max - min) / 2 >> 0);
            if (lineFeedsOffsets[mid] >= offset) {
                max = mid - 1;
            }
            else {
                if (lineFeedsOffsets[mid + 1] >= offset) {
                    // bingo!
                    min = mid;
                    max = mid;
                }
                else {
                    min = mid + 1;
                }
            }
        }
        return min + 1;
    }
}
class TextModelSearch {
    static findMatches(model, searchParams, searchRange, captureMatches, limitResultCount) {
        const searchData = searchParams.parseSearchRequest();
        if (!searchData) {
            return [];
        }
        if (searchData.regex.multiline) {
            return this._doFindMatchesMultiline(model, searchRange, new Searcher(searchData.wordSeparators, searchData.regex), captureMatches, limitResultCount);
        }
        return this._doFindMatchesLineByLine(model, searchRange, searchData, captureMatches, limitResultCount);
    }
    /**
     * Multiline search always executes on the lines concatenated with \n.
     * We must therefore compensate for the count of \n in case the model is CRLF
     */
    static _getMultilineMatchRange(model, deltaOffset, text, lfCounter, matchIndex, match0) {
        let startOffset;
        let lineFeedCountBeforeMatch = 0;
        if (lfCounter) {
            lineFeedCountBeforeMatch = lfCounter.findLineFeedCountBeforeOffset(matchIndex);
            startOffset = deltaOffset + matchIndex + lineFeedCountBeforeMatch /* add as many \r as there were \n */;
        }
        else {
            startOffset = deltaOffset + matchIndex;
        }
        let endOffset;
        if (lfCounter) {
            const lineFeedCountBeforeEndOfMatch = lfCounter.findLineFeedCountBeforeOffset(matchIndex + match0.length);
            const lineFeedCountInMatch = lineFeedCountBeforeEndOfMatch - lineFeedCountBeforeMatch;
            endOffset = startOffset + match0.length + lineFeedCountInMatch /* add as many \r as there were \n */;
        }
        else {
            endOffset = startOffset + match0.length;
        }
        const startPosition = model.getPositionAt(startOffset);
        const endPosition = model.getPositionAt(endOffset);
        return new Range(startPosition.lineNumber, startPosition.column, endPosition.lineNumber, endPosition.column);
    }
    static _doFindMatchesMultiline(model, searchRange, searcher, captureMatches, limitResultCount) {
        const deltaOffset = model.getOffsetAt(searchRange.getStartPosition());
        // We always execute multiline search over the lines joined with \n
        // This makes it that \n will match the EOL for both CRLF and LF models
        // We compensate for offset errors in `_getMultilineMatchRange`
        const text = model.getValueInRange(searchRange, 1 /* EndOfLinePreference.LF */);
        const lfCounter = (model.getEOL() === '\r\n' ? new LineFeedCounter(text) : null);
        const result = [];
        let counter = 0;
        let m;
        searcher.reset(0);
        while ((m = searcher.next(text))) {
            result[counter++] = createFindMatch(this._getMultilineMatchRange(model, deltaOffset, text, lfCounter, m.index, m[0]), m, captureMatches);
            if (counter >= limitResultCount) {
                return result;
            }
        }
        return result;
    }
    static _doFindMatchesLineByLine(model, searchRange, searchData, captureMatches, limitResultCount) {
        const result = [];
        let resultLen = 0;
        // Early case for a search range that starts & stops on the same line number
        if (searchRange.startLineNumber === searchRange.endLineNumber) {
            const text = model.getLineContent(searchRange.startLineNumber).substring(searchRange.startColumn - 1, searchRange.endColumn - 1);
            resultLen = this._findMatchesInLine(searchData, text, searchRange.startLineNumber, searchRange.startColumn - 1, resultLen, result, captureMatches, limitResultCount);
            return result;
        }
        // Collect results from first line
        const text = model.getLineContent(searchRange.startLineNumber).substring(searchRange.startColumn - 1);
        resultLen = this._findMatchesInLine(searchData, text, searchRange.startLineNumber, searchRange.startColumn - 1, resultLen, result, captureMatches, limitResultCount);
        // Collect results from middle lines
        for (let lineNumber = searchRange.startLineNumber + 1; lineNumber < searchRange.endLineNumber && resultLen < limitResultCount; lineNumber++) {
            resultLen = this._findMatchesInLine(searchData, model.getLineContent(lineNumber), lineNumber, 0, resultLen, result, captureMatches, limitResultCount);
        }
        // Collect results from last line
        if (resultLen < limitResultCount) {
            const text = model.getLineContent(searchRange.endLineNumber).substring(0, searchRange.endColumn - 1);
            resultLen = this._findMatchesInLine(searchData, text, searchRange.endLineNumber, 0, resultLen, result, captureMatches, limitResultCount);
        }
        return result;
    }
    static _findMatchesInLine(searchData, text, lineNumber, deltaOffset, resultLen, result, captureMatches, limitResultCount) {
        const wordSeparators = searchData.wordSeparators;
        if (!captureMatches && searchData.simpleSearch) {
            const searchString = searchData.simpleSearch;
            const searchStringLen = searchString.length;
            const textLength = text.length;
            let lastMatchIndex = -searchStringLen;
            while ((lastMatchIndex = text.indexOf(searchString, lastMatchIndex + searchStringLen)) !== -1) {
                if (!wordSeparators || isValidMatch(wordSeparators, text, textLength, lastMatchIndex, searchStringLen)) {
                    result[resultLen++] = new FindMatch(new Range(lineNumber, lastMatchIndex + 1 + deltaOffset, lineNumber, lastMatchIndex + 1 + searchStringLen + deltaOffset), null);
                    if (resultLen >= limitResultCount) {
                        return resultLen;
                    }
                }
            }
            return resultLen;
        }
        const searcher = new Searcher(searchData.wordSeparators, searchData.regex);
        let m;
        // Reset regex to search from the beginning
        searcher.reset(0);
        do {
            m = searcher.next(text);
            if (m) {
                result[resultLen++] = createFindMatch(new Range(lineNumber, m.index + 1 + deltaOffset, lineNumber, m.index + 1 + m[0].length + deltaOffset), m, captureMatches);
                if (resultLen >= limitResultCount) {
                    return resultLen;
                }
            }
        } while (m);
        return resultLen;
    }
    static findNextMatch(model, searchParams, searchStart, captureMatches) {
        const searchData = searchParams.parseSearchRequest();
        if (!searchData) {
            return null;
        }
        const searcher = new Searcher(searchData.wordSeparators, searchData.regex);
        if (searchData.regex.multiline) {
            return this._doFindNextMatchMultiline(model, searchStart, searcher, captureMatches);
        }
        return this._doFindNextMatchLineByLine(model, searchStart, searcher, captureMatches);
    }
    static _doFindNextMatchMultiline(model, searchStart, searcher, captureMatches) {
        const searchTextStart = new Position(searchStart.lineNumber, 1);
        const deltaOffset = model.getOffsetAt(searchTextStart);
        const lineCount = model.getLineCount();
        // We always execute multiline search over the lines joined with \n
        // This makes it that \n will match the EOL for both CRLF and LF models
        // We compensate for offset errors in `_getMultilineMatchRange`
        const text = model.getValueInRange(new Range(searchTextStart.lineNumber, searchTextStart.column, lineCount, model.getLineMaxColumn(lineCount)), 1 /* EndOfLinePreference.LF */);
        const lfCounter = (model.getEOL() === '\r\n' ? new LineFeedCounter(text) : null);
        searcher.reset(searchStart.column - 1);
        const m = searcher.next(text);
        if (m) {
            return createFindMatch(this._getMultilineMatchRange(model, deltaOffset, text, lfCounter, m.index, m[0]), m, captureMatches);
        }
        if (searchStart.lineNumber !== 1 || searchStart.column !== 1) {
            // Try again from the top
            return this._doFindNextMatchMultiline(model, new Position(1, 1), searcher, captureMatches);
        }
        return null;
    }
    static _doFindNextMatchLineByLine(model, searchStart, searcher, captureMatches) {
        const lineCount = model.getLineCount();
        const startLineNumber = searchStart.lineNumber;
        // Look in first line
        const text = model.getLineContent(startLineNumber);
        const r = this._findFirstMatchInLine(searcher, text, startLineNumber, searchStart.column, captureMatches);
        if (r) {
            return r;
        }
        for (let i = 1; i <= lineCount; i++) {
            const lineIndex = (startLineNumber + i - 1) % lineCount;
            const text = model.getLineContent(lineIndex + 1);
            const r = this._findFirstMatchInLine(searcher, text, lineIndex + 1, 1, captureMatches);
            if (r) {
                return r;
            }
        }
        return null;
    }
    static _findFirstMatchInLine(searcher, text, lineNumber, fromColumn, captureMatches) {
        // Set regex to search from column
        searcher.reset(fromColumn - 1);
        const m = searcher.next(text);
        if (m) {
            return createFindMatch(new Range(lineNumber, m.index + 1, lineNumber, m.index + 1 + m[0].length), m, captureMatches);
        }
        return null;
    }
    static findPreviousMatch(model, searchParams, searchStart, captureMatches) {
        const searchData = searchParams.parseSearchRequest();
        if (!searchData) {
            return null;
        }
        const searcher = new Searcher(searchData.wordSeparators, searchData.regex);
        if (searchData.regex.multiline) {
            return this._doFindPreviousMatchMultiline(model, searchStart, searcher, captureMatches);
        }
        return this._doFindPreviousMatchLineByLine(model, searchStart, searcher, captureMatches);
    }
    static _doFindPreviousMatchMultiline(model, searchStart, searcher, captureMatches) {
        const matches = this._doFindMatchesMultiline(model, new Range(1, 1, searchStart.lineNumber, searchStart.column), searcher, captureMatches, 10 * LIMIT_FIND_COUNT);
        if (matches.length > 0) {
            return matches[matches.length - 1];
        }
        const lineCount = model.getLineCount();
        if (searchStart.lineNumber !== lineCount || searchStart.column !== model.getLineMaxColumn(lineCount)) {
            // Try again with all content
            return this._doFindPreviousMatchMultiline(model, new Position(lineCount, model.getLineMaxColumn(lineCount)), searcher, captureMatches);
        }
        return null;
    }
    static _doFindPreviousMatchLineByLine(model, searchStart, searcher, captureMatches) {
        const lineCount = model.getLineCount();
        const startLineNumber = searchStart.lineNumber;
        // Look in first line
        const text = model.getLineContent(startLineNumber).substring(0, searchStart.column - 1);
        const r = this._findLastMatchInLine(searcher, text, startLineNumber, captureMatches);
        if (r) {
            return r;
        }
        for (let i = 1; i <= lineCount; i++) {
            const lineIndex = (lineCount + startLineNumber - i - 1) % lineCount;
            const text = model.getLineContent(lineIndex + 1);
            const r = this._findLastMatchInLine(searcher, text, lineIndex + 1, captureMatches);
            if (r) {
                return r;
            }
        }
        return null;
    }
    static _findLastMatchInLine(searcher, text, lineNumber, captureMatches) {
        let bestResult = null;
        let m;
        searcher.reset(0);
        while ((m = searcher.next(text))) {
            bestResult = createFindMatch(new Range(lineNumber, m.index + 1, lineNumber, m.index + 1 + m[0].length), m, captureMatches);
        }
        return bestResult;
    }
}
function leftIsWordBounday(wordSeparators, text, textLength, matchStartIndex, matchLength) {
    if (matchStartIndex === 0) {
        // Match starts at start of string
        return true;
    }
    const charBefore = text.charCodeAt(matchStartIndex - 1);
    if (wordSeparators.get(charBefore) !== 0 /* WordCharacterClass.Regular */) {
        // The character before the match is a word separator
        return true;
    }
    if (charBefore === 13 /* CharCode.CarriageReturn */ || charBefore === 10 /* CharCode.LineFeed */) {
        // The character before the match is line break or carriage return.
        return true;
    }
    if (matchLength > 0) {
        const firstCharInMatch = text.charCodeAt(matchStartIndex);
        if (wordSeparators.get(firstCharInMatch) !== 0 /* WordCharacterClass.Regular */) {
            // The first character inside the match is a word separator
            return true;
        }
    }
    return false;
}
function rightIsWordBounday(wordSeparators, text, textLength, matchStartIndex, matchLength) {
    if (matchStartIndex + matchLength === textLength) {
        // Match ends at end of string
        return true;
    }
    const charAfter = text.charCodeAt(matchStartIndex + matchLength);
    if (wordSeparators.get(charAfter) !== 0 /* WordCharacterClass.Regular */) {
        // The character after the match is a word separator
        return true;
    }
    if (charAfter === 13 /* CharCode.CarriageReturn */ || charAfter === 10 /* CharCode.LineFeed */) {
        // The character after the match is line break or carriage return.
        return true;
    }
    if (matchLength > 0) {
        const lastCharInMatch = text.charCodeAt(matchStartIndex + matchLength - 1);
        if (wordSeparators.get(lastCharInMatch) !== 0 /* WordCharacterClass.Regular */) {
            // The last character in the match is a word separator
            return true;
        }
    }
    return false;
}
function isValidMatch(wordSeparators, text, textLength, matchStartIndex, matchLength) {
    return (leftIsWordBounday(wordSeparators, text, textLength, matchStartIndex, matchLength)
        && rightIsWordBounday(wordSeparators, text, textLength, matchStartIndex, matchLength));
}
class Searcher {
    constructor(wordSeparators, searchRegex) {
        this._wordSeparators = wordSeparators;
        this._searchRegex = searchRegex;
        this._prevMatchStartIndex = -1;
        this._prevMatchLength = 0;
    }
    reset(lastIndex) {
        this._searchRegex.lastIndex = lastIndex;
        this._prevMatchStartIndex = -1;
        this._prevMatchLength = 0;
    }
    next(text) {
        const textLength = text.length;
        let m;
        do {
            if (this._prevMatchStartIndex + this._prevMatchLength === textLength) {
                // Reached the end of the line
                return null;
            }
            m = this._searchRegex.exec(text);
            if (!m) {
                return null;
            }
            const matchStartIndex = m.index;
            const matchLength = m[0].length;
            if (matchStartIndex === this._prevMatchStartIndex && matchLength === this._prevMatchLength) {
                if (matchLength === 0) {
                    // the search result is an empty string and won't advance `regex.lastIndex`, so `regex.exec` will stuck here
                    // we attempt to recover from that by advancing by two if surrogate pair found and by one otherwise
                    if (getNextCodePoint(text, textLength, this._searchRegex.lastIndex) > 0xFFFF) {
                        this._searchRegex.lastIndex += 2;
                    }
                    else {
                        this._searchRegex.lastIndex += 1;
                    }
                    continue;
                }
                // Exit early if the regex matches the same range twice
                return null;
            }
            this._prevMatchStartIndex = matchStartIndex;
            this._prevMatchLength = matchLength;
            if (!this._wordSeparators || isValidMatch(this._wordSeparators, text, textLength, matchStartIndex, matchLength)) {
                return m;
            }
        } while (m);
        return null;
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/base/common/assert.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Throws an error with the provided message if the provided value does not evaluate to a true Javascript value.
 *
 * @deprecated Use `assert(...)` instead.
 * This method is usually used like this:
 * ```ts
 * import * as assert from 'vs/base/common/assert';
 * assert.ok(...);
 * ```
 *
 * However, `assert` in that example is a user chosen name.
 * There is no tooling for generating such an import statement.
 * Thus, the `assert(...)` function should be used instead.
 */
function ok(value, message) {
    if (!value) {
        throw new Error(message ? `Assertion failed (${message})` : 'Assertion Failed');
    }
}
function assertNever(value, message = 'Unreachable') {
    throw new Error(message);
}
/**
 * condition must be side-effect free!
 */
function assertFn(condition) {
    if (!condition()) {
        // eslint-disable-next-line no-debugger
        debugger;
        // Reevaluate `condition` again to make debugging easier
        condition();
        onUnexpectedError(new BugIndicatingError('Assertion Failed'));
    }
}
function checkAdjacentItems(items, predicate) {
    let i = 0;
    while (i < items.length - 1) {
        const a = items[i];
        const b = items[i + 1];
        if (!predicate(a, b)) {
            return false;
        }
        i++;
    }
    return true;
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/services/unicodeTextModelHighlighter.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/





class UnicodeTextModelHighlighter {
    static computeUnicodeHighlights(model, options, range) {
        const startLine = range ? range.startLineNumber : 1;
        const endLine = range ? range.endLineNumber : model.getLineCount();
        const codePointHighlighter = new CodePointHighlighter(options);
        const candidates = codePointHighlighter.getCandidateCodePoints();
        let regex;
        if (candidates === 'allNonBasicAscii') {
            regex = new RegExp('[^\\t\\n\\r\\x20-\\x7E]', 'g');
        }
        else {
            regex = new RegExp(`${buildRegExpCharClassExpr(Array.from(candidates))}`, 'g');
        }
        const searcher = new Searcher(null, regex);
        const ranges = [];
        let hasMore = false;
        let m;
        let ambiguousCharacterCount = 0;
        let invisibleCharacterCount = 0;
        let nonBasicAsciiCharacterCount = 0;
        forLoop: for (let lineNumber = startLine, lineCount = endLine; lineNumber <= lineCount; lineNumber++) {
            const lineContent = model.getLineContent(lineNumber);
            const lineLength = lineContent.length;
            // Reset regex to search from the beginning
            searcher.reset(0);
            do {
                m = searcher.next(lineContent);
                if (m) {
                    let startIndex = m.index;
                    let endIndex = m.index + m[0].length;
                    // Extend range to entire code point
                    if (startIndex > 0) {
                        const charCodeBefore = lineContent.charCodeAt(startIndex - 1);
                        if (isHighSurrogate(charCodeBefore)) {
                            startIndex--;
                        }
                    }
                    if (endIndex + 1 < lineLength) {
                        const charCodeBefore = lineContent.charCodeAt(endIndex - 1);
                        if (isHighSurrogate(charCodeBefore)) {
                            endIndex++;
                        }
                    }
                    const str = lineContent.substring(startIndex, endIndex);
                    let word = getWordAtText(startIndex + 1, DEFAULT_WORD_REGEXP, lineContent, 0);
                    if (word && word.endColumn <= startIndex + 1) {
                        // The word does not include the problematic character, ignore the word
                        word = null;
                    }
                    const highlightReason = codePointHighlighter.shouldHighlightNonBasicASCII(str, word ? word.word : null);
                    if (highlightReason !== 0 /* SimpleHighlightReason.None */) {
                        if (highlightReason === 3 /* SimpleHighlightReason.Ambiguous */) {
                            ambiguousCharacterCount++;
                        }
                        else if (highlightReason === 2 /* SimpleHighlightReason.Invisible */) {
                            invisibleCharacterCount++;
                        }
                        else if (highlightReason === 1 /* SimpleHighlightReason.NonBasicASCII */) {
                            nonBasicAsciiCharacterCount++;
                        }
                        else {
                            assertNever(highlightReason);
                        }
                        const MAX_RESULT_LENGTH = 1000;
                        if (ranges.length >= MAX_RESULT_LENGTH) {
                            hasMore = true;
                            break forLoop;
                        }
                        ranges.push(new range_Range(lineNumber, startIndex + 1, lineNumber, endIndex + 1));
                    }
                }
            } while (m);
        }
        return {
            ranges,
            hasMore,
            ambiguousCharacterCount,
            invisibleCharacterCount,
            nonBasicAsciiCharacterCount
        };
    }
    static computeUnicodeHighlightReason(char, options) {
        const codePointHighlighter = new CodePointHighlighter(options);
        const reason = codePointHighlighter.shouldHighlightNonBasicASCII(char, null);
        switch (reason) {
            case 0 /* SimpleHighlightReason.None */:
                return null;
            case 2 /* SimpleHighlightReason.Invisible */:
                return { kind: 1 /* UnicodeHighlighterReasonKind.Invisible */ };
            case 3 /* SimpleHighlightReason.Ambiguous */: {
                const codePoint = char.codePointAt(0);
                const primaryConfusable = codePointHighlighter.ambiguousCharacters.getPrimaryConfusable(codePoint);
                const notAmbiguousInLocales = AmbiguousCharacters.getLocales().filter((l) => !AmbiguousCharacters.getInstance(new Set([...options.allowedLocales, l])).isAmbiguous(codePoint));
                return { kind: 0 /* UnicodeHighlighterReasonKind.Ambiguous */, confusableWith: String.fromCodePoint(primaryConfusable), notAmbiguousInLocales };
            }
            case 1 /* SimpleHighlightReason.NonBasicASCII */:
                return { kind: 2 /* UnicodeHighlighterReasonKind.NonBasicAscii */ };
        }
    }
}
function buildRegExpCharClassExpr(codePoints, flags) {
    const src = `[${escapeRegExpCharacters(codePoints.map((i) => String.fromCodePoint(i)).join(''))}]`;
    return src;
}
class CodePointHighlighter {
    constructor(options) {
        this.options = options;
        this.allowedCodePoints = new Set(options.allowedCodePoints);
        this.ambiguousCharacters = AmbiguousCharacters.getInstance(new Set(options.allowedLocales));
    }
    getCandidateCodePoints() {
        if (this.options.nonBasicASCII) {
            return 'allNonBasicAscii';
        }
        const set = new Set();
        if (this.options.invisibleCharacters) {
            for (const cp of InvisibleCharacters.codePoints) {
                if (!isAllowedInvisibleCharacter(String.fromCodePoint(cp))) {
                    set.add(cp);
                }
            }
        }
        if (this.options.ambiguousCharacters) {
            for (const cp of this.ambiguousCharacters.getConfusableCodePoints()) {
                set.add(cp);
            }
        }
        for (const cp of this.allowedCodePoints) {
            set.delete(cp);
        }
        return set;
    }
    shouldHighlightNonBasicASCII(character, wordContext) {
        const codePoint = character.codePointAt(0);
        if (this.allowedCodePoints.has(codePoint)) {
            return 0 /* SimpleHighlightReason.None */;
        }
        if (this.options.nonBasicASCII) {
            return 1 /* SimpleHighlightReason.NonBasicASCII */;
        }
        let hasBasicASCIICharacters = false;
        let hasNonConfusableNonBasicAsciiCharacter = false;
        if (wordContext) {
            for (const char of wordContext) {
                const codePoint = char.codePointAt(0);
                const isBasicASCII = strings_isBasicASCII(char);
                hasBasicASCIICharacters = hasBasicASCIICharacters || isBasicASCII;
                if (!isBasicASCII &&
                    !this.ambiguousCharacters.isAmbiguous(codePoint) &&
                    !InvisibleCharacters.isInvisibleCharacter(codePoint)) {
                    hasNonConfusableNonBasicAsciiCharacter = true;
                }
            }
        }
        if (
        /* Don't allow mixing weird looking characters with ASCII */ !hasBasicASCIICharacters &&
            /* Is there an obviously weird looking character? */ hasNonConfusableNonBasicAsciiCharacter) {
            return 0 /* SimpleHighlightReason.None */;
        }
        if (this.options.invisibleCharacters) {
            // TODO check for emojis
            if (!isAllowedInvisibleCharacter(character) && InvisibleCharacters.isInvisibleCharacter(codePoint)) {
                return 2 /* SimpleHighlightReason.Invisible */;
            }
        }
        if (this.options.ambiguousCharacters) {
            if (this.ambiguousCharacters.isAmbiguous(codePoint)) {
                return 3 /* SimpleHighlightReason.Ambiguous */;
            }
        }
        return 0 /* SimpleHighlightReason.None */;
    }
}
function isAllowedInvisibleCharacter(character) {
    return character === ' ' || character === '\n' || character === '\t';
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/diff/linesDiffComputer.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
class LinesDiff {
    constructor(changes, 
    /**
     * Sorted by original line ranges.
     * The original line ranges and the modified line ranges must be disjoint (but can be touching).
     */
    moves, 
    /**
     * Indicates if the time out was reached.
     * In that case, the diffs might be an approximation and the user should be asked to rerun the diff with more time.
     */
    hitTimeout) {
        this.changes = changes;
        this.moves = moves;
        this.hitTimeout = hitTimeout;
    }
}
class MovedText {
    constructor(lineRangeMapping, changes) {
        this.lineRangeMapping = lineRangeMapping;
        this.changes = changes;
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/core/offsetRange.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * A range of offsets (0-based).
*/
class OffsetRange {
    static addRange(range, sortedRanges) {
        let i = 0;
        while (i < sortedRanges.length && sortedRanges[i].endExclusive < range.start) {
            i++;
        }
        let j = i;
        while (j < sortedRanges.length && sortedRanges[j].start <= range.endExclusive) {
            j++;
        }
        if (i === j) {
            sortedRanges.splice(i, 0, range);
        }
        else {
            const start = Math.min(range.start, sortedRanges[i].start);
            const end = Math.max(range.endExclusive, sortedRanges[j - 1].endExclusive);
            sortedRanges.splice(i, j - i, new OffsetRange(start, end));
        }
    }
    static tryCreate(start, endExclusive) {
        if (start > endExclusive) {
            return undefined;
        }
        return new OffsetRange(start, endExclusive);
    }
    static ofLength(length) {
        return new OffsetRange(0, length);
    }
    constructor(start, endExclusive) {
        this.start = start;
        this.endExclusive = endExclusive;
        if (start > endExclusive) {
            throw new BugIndicatingError(`Invalid range: ${this.toString()}`);
        }
    }
    get isEmpty() {
        return this.start === this.endExclusive;
    }
    delta(offset) {
        return new OffsetRange(this.start + offset, this.endExclusive + offset);
    }
    deltaStart(offset) {
        return new OffsetRange(this.start + offset, this.endExclusive);
    }
    deltaEnd(offset) {
        return new OffsetRange(this.start, this.endExclusive + offset);
    }
    get length() {
        return this.endExclusive - this.start;
    }
    toString() {
        return `[${this.start}, ${this.endExclusive})`;
    }
    equals(other) {
        return this.start === other.start && this.endExclusive === other.endExclusive;
    }
    containsRange(other) {
        return this.start <= other.start && other.endExclusive <= this.endExclusive;
    }
    contains(offset) {
        return this.start <= offset && offset < this.endExclusive;
    }
    /**
     * for all numbers n: range1.contains(n) or range2.contains(n) => range1.join(range2).contains(n)
     * The joined range is the smallest range that contains both ranges.
     */
    join(other) {
        return new OffsetRange(Math.min(this.start, other.start), Math.max(this.endExclusive, other.endExclusive));
    }
    /**
     * for all numbers n: range1.contains(n) and range2.contains(n) <=> range1.intersect(range2).contains(n)
     *
     * The resulting range is empty if the ranges do not intersect, but touch.
     * If the ranges don't even touch, the result is undefined.
     */
    intersect(other) {
        const start = Math.max(this.start, other.start);
        const end = Math.min(this.endExclusive, other.endExclusive);
        if (start <= end) {
            return new OffsetRange(start, end);
        }
        return undefined;
    }
    slice(arr) {
        return arr.slice(this.start, this.endExclusive);
    }
    /**
     * Returns the given value if it is contained in this instance, otherwise the closest value that is contained.
     * The range must not be empty.
     */
    clip(value) {
        if (this.isEmpty) {
            throw new BugIndicatingError(`Invalid clipping range: ${this.toString()}`);
        }
        return Math.max(this.start, Math.min(this.endExclusive - 1, value));
    }
    /**
     * Returns `r := value + k * length` such that `r` is contained in this range.
     * The range must not be empty.
     *
     * E.g. `[5, 10).clipCyclic(10) === 5`, `[5, 10).clipCyclic(11) === 6` and `[5, 10).clipCyclic(4) === 9`.
     */
    clipCyclic(value) {
        if (this.isEmpty) {
            throw new BugIndicatingError(`Invalid clipping range: ${this.toString()}`);
        }
        if (value < this.start) {
            return this.endExclusive - ((this.start - value) % this.length);
        }
        if (value >= this.endExclusive) {
            return this.start + ((value - this.start) % this.length);
        }
        return value;
    }
    forEach(f) {
        for (let i = this.start; i < this.endExclusive; i++) {
            f(i);
        }
    }
}
class OffsetRangeSet {
    constructor() {
        this._sortedRanges = [];
    }
    addRange(range) {
        let i = 0;
        while (i < this._sortedRanges.length && this._sortedRanges[i].endExclusive < range.start) {
            i++;
        }
        let j = i;
        while (j < this._sortedRanges.length && this._sortedRanges[j].start <= range.endExclusive) {
            j++;
        }
        if (i === j) {
            this._sortedRanges.splice(i, 0, range);
        }
        else {
            const start = Math.min(range.start, this._sortedRanges[i].start);
            const end = Math.max(range.endExclusive, this._sortedRanges[j - 1].endExclusive);
            this._sortedRanges.splice(i, j - i, new OffsetRange(start, end));
        }
    }
    toString() {
        return this._sortedRanges.map(r => r.toString()).join(', ');
    }
    /**
     * Returns of there is a value that is contained in this instance and the given range.
     */
    intersectsStrict(other) {
        // TODO use binary search
        let i = 0;
        while (i < this._sortedRanges.length && this._sortedRanges[i].endExclusive <= other.start) {
            i++;
        }
        return i < this._sortedRanges.length && this._sortedRanges[i].start < other.endExclusive;
    }
    intersectWithRange(other) {
        // TODO use binary search + slice
        const result = new OffsetRangeSet();
        for (const range of this._sortedRanges) {
            const intersection = range.intersect(other);
            if (intersection) {
                result.addRange(intersection);
            }
        }
        return result;
    }
    intersectWithRangeLength(other) {
        return this.intersectWithRange(other).length;
    }
    get length() {
        return this._sortedRanges.reduce((prev, cur) => prev + cur.length, 0);
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/base/common/arraysFind.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function findLast(array, predicate, fromIdx) {
    const idx = findLastIdx(array, predicate);
    if (idx === -1) {
        return undefined;
    }
    return array[idx];
}
function findLastIdx(array, predicate, fromIndex = array.length - 1) {
    for (let i = fromIndex; i >= 0; i--) {
        const element = array[i];
        if (predicate(element)) {
            return i;
        }
    }
    return -1;
}
/**
 * Finds the last item where predicate is true using binary search.
 * `predicate` must be monotonous, i.e. `arr.map(predicate)` must be like `[true, ..., true, false, ..., false]`!
 *
 * @returns `undefined` if no item matches, otherwise the last item that matches the predicate.
 */
function findLastMonotonous(array, predicate) {
    const idx = findLastIdxMonotonous(array, predicate);
    return idx === -1 ? undefined : array[idx];
}
/**
 * Finds the last item where predicate is true using binary search.
 * `predicate` must be monotonous, i.e. `arr.map(predicate)` must be like `[true, ..., true, false, ..., false]`!
 *
 * @returns `startIdx - 1` if predicate is false for all items, otherwise the index of the last item that matches the predicate.
 */
function findLastIdxMonotonous(array, predicate, startIdx = 0, endIdxEx = array.length) {
    let i = startIdx;
    let j = endIdxEx;
    while (i < j) {
        const k = Math.floor((i + j) / 2);
        if (predicate(array[k])) {
            i = k + 1;
        }
        else {
            j = k;
        }
    }
    return i - 1;
}
/**
 * Finds the first item where predicate is true using binary search.
 * `predicate` must be monotonous, i.e. `arr.map(predicate)` must be like `[false, ..., false, true, ..., true]`!
 *
 * @returns `undefined` if no item matches, otherwise the first item that matches the predicate.
 */
function findFirstMonotonous(array, predicate) {
    const idx = findFirstIdxMonotonousOrArrLen(array, predicate);
    return idx === array.length ? undefined : array[idx];
}
/**
 * Finds the first item where predicate is true using binary search.
 * `predicate` must be monotonous, i.e. `arr.map(predicate)` must be like `[false, ..., false, true, ..., true]`!
 *
 * @returns `endIdxEx` if predicate is false for all items, otherwise the index of the first item that matches the predicate.
 */
function findFirstIdxMonotonousOrArrLen(array, predicate, startIdx = 0, endIdxEx = array.length) {
    let i = startIdx;
    let j = endIdxEx;
    while (i < j) {
        const k = Math.floor((i + j) / 2);
        if (predicate(array[k])) {
            j = k;
        }
        else {
            i = k + 1;
        }
    }
    return i;
}
/**
 * Use this when
 * * You have a sorted array
 * * You query this array with a monotonous predicate to find the last item that has a certain property.
 * * You query this array multiple times with monotonous predicates that get weaker and weaker.
 */
class MonotonousArray {
    constructor(_array) {
        this._array = _array;
        this._findLastMonotonousLastIdx = 0;
    }
    /**
     * The predicate must be monotonous, i.e. `arr.map(predicate)` must be like `[true, ..., true, false, ..., false]`!
     * For subsequent calls, current predicate must be weaker than (or equal to) the previous predicate, i.e. more entries must be `true`.
     */
    findLastMonotonous(predicate) {
        if (MonotonousArray.assertInvariants) {
            if (this._prevFindLastPredicate) {
                for (const item of this._array) {
                    if (this._prevFindLastPredicate(item) && !predicate(item)) {
                        throw new Error('MonotonousArray: current predicate must be weaker than (or equal to) the previous predicate.');
                    }
                }
            }
            this._prevFindLastPredicate = predicate;
        }
        const idx = findLastIdxMonotonous(this._array, predicate, this._findLastMonotonousLastIdx);
        this._findLastMonotonousLastIdx = idx + 1;
        return idx === -1 ? undefined : this._array[idx];
    }
}
MonotonousArray.assertInvariants = false;
/**
 * Returns the first item that is equal to or greater than every other item.
*/
function findFirstMaxBy(array, comparator) {
    if (array.length === 0) {
        return undefined;
    }
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        const item = array[i];
        if (comparator(item, max) > 0) {
            max = item;
        }
    }
    return max;
}
/**
 * Returns the last item that is equal to or greater than every other item.
*/
function findLastMaxBy(array, comparator) {
    if (array.length === 0) {
        return undefined;
    }
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        const item = array[i];
        if (comparator(item, max) >= 0) {
            max = item;
        }
    }
    return max;
}
/**
 * Returns the first item that is equal to or less than every other item.
*/
function findFirstMinBy(array, comparator) {
    return findFirstMaxBy(array, (a, b) => -comparator(a, b));
}
function findMaxIdxBy(array, comparator) {
    if (array.length === 0) {
        return -1;
    }
    let maxIdx = 0;
    for (let i = 1; i < array.length; i++) {
        const item = array[i];
        if (comparator(item, array[maxIdx]) > 0) {
            maxIdx = i;
        }
    }
    return maxIdx;
}
/**
 * Returns the first mapped value of the array which is not undefined.
 */
function mapFindFirst(items, mapFn) {
    for (const value of items) {
        const mapped = mapFn(value);
        if (mapped !== undefined) {
            return mapped;
        }
    }
    return undefined;
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/core/lineRange.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/




/**
 * A range of lines (1-based).
 */
class LineRange {
    static fromRange(range) {
        return new LineRange(range.startLineNumber, range.endLineNumber);
    }
    /**
     * @param lineRanges An array of sorted line ranges.
     */
    static joinMany(lineRanges) {
        if (lineRanges.length === 0) {
            return [];
        }
        let result = new LineRangeSet(lineRanges[0].slice());
        for (let i = 1; i < lineRanges.length; i++) {
            result = result.getUnion(new LineRangeSet(lineRanges[i].slice()));
        }
        return result.ranges;
    }
    static ofLength(startLineNumber, length) {
        return new LineRange(startLineNumber, startLineNumber + length);
    }
    /**
     * @internal
     */
    static deserialize(lineRange) {
        return new LineRange(lineRange[0], lineRange[1]);
    }
    constructor(startLineNumber, endLineNumberExclusive) {
        if (startLineNumber > endLineNumberExclusive) {
            throw new BugIndicatingError(`startLineNumber ${startLineNumber} cannot be after endLineNumberExclusive ${endLineNumberExclusive}`);
        }
        this.startLineNumber = startLineNumber;
        this.endLineNumberExclusive = endLineNumberExclusive;
    }
    /**
     * Indicates if this line range contains the given line number.
     */
    contains(lineNumber) {
        return this.startLineNumber <= lineNumber && lineNumber < this.endLineNumberExclusive;
    }
    /**
     * Indicates if this line range is empty.
     */
    get isEmpty() {
        return this.startLineNumber === this.endLineNumberExclusive;
    }
    /**
     * Moves this line range by the given offset of line numbers.
     */
    delta(offset) {
        return new LineRange(this.startLineNumber + offset, this.endLineNumberExclusive + offset);
    }
    deltaLength(offset) {
        return new LineRange(this.startLineNumber, this.endLineNumberExclusive + offset);
    }
    /**
     * The number of lines this line range spans.
     */
    get length() {
        return this.endLineNumberExclusive - this.startLineNumber;
    }
    /**
     * Creates a line range that combines this and the given line range.
     */
    join(other) {
        return new LineRange(Math.min(this.startLineNumber, other.startLineNumber), Math.max(this.endLineNumberExclusive, other.endLineNumberExclusive));
    }
    toString() {
        return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
    }
    /**
     * The resulting range is empty if the ranges do not intersect, but touch.
     * If the ranges don't even touch, the result is undefined.
     */
    intersect(other) {
        const startLineNumber = Math.max(this.startLineNumber, other.startLineNumber);
        const endLineNumberExclusive = Math.min(this.endLineNumberExclusive, other.endLineNumberExclusive);
        if (startLineNumber <= endLineNumberExclusive) {
            return new LineRange(startLineNumber, endLineNumberExclusive);
        }
        return undefined;
    }
    intersectsStrict(other) {
        return this.startLineNumber < other.endLineNumberExclusive && other.startLineNumber < this.endLineNumberExclusive;
    }
    overlapOrTouch(other) {
        return this.startLineNumber <= other.endLineNumberExclusive && other.startLineNumber <= this.endLineNumberExclusive;
    }
    equals(b) {
        return this.startLineNumber === b.startLineNumber && this.endLineNumberExclusive === b.endLineNumberExclusive;
    }
    toInclusiveRange() {
        if (this.isEmpty) {
            return null;
        }
        return new range_Range(this.startLineNumber, 1, this.endLineNumberExclusive - 1, Number.MAX_SAFE_INTEGER);
    }
    toExclusiveRange() {
        return new range_Range(this.startLineNumber, 1, this.endLineNumberExclusive, 1);
    }
    mapToLineArray(f) {
        const result = [];
        for (let lineNumber = this.startLineNumber; lineNumber < this.endLineNumberExclusive; lineNumber++) {
            result.push(f(lineNumber));
        }
        return result;
    }
    forEach(f) {
        for (let lineNumber = this.startLineNumber; lineNumber < this.endLineNumberExclusive; lineNumber++) {
            f(lineNumber);
        }
    }
    /**
     * @internal
     */
    serialize() {
        return [this.startLineNumber, this.endLineNumberExclusive];
    }
    includes(lineNumber) {
        return this.startLineNumber <= lineNumber && lineNumber < this.endLineNumberExclusive;
    }
    /**
     * Converts this 1-based line range to a 0-based offset range (subtracts 1!).
     * @internal
     */
    toOffsetRange() {
        return new OffsetRange(this.startLineNumber - 1, this.endLineNumberExclusive - 1);
    }
}
class LineRangeSet {
    constructor(
    /**
     * Sorted by start line number.
     * No two line ranges are touching or intersecting.
     */
    _normalizedRanges = []) {
        this._normalizedRanges = _normalizedRanges;
    }
    get ranges() {
        return this._normalizedRanges;
    }
    addRange(range) {
        if (range.length === 0) {
            return;
        }
        // Idea: Find joinRange such that:
        // replaceRange = _normalizedRanges.replaceRange(joinRange, range.joinAll(joinRange.map(idx => this._normalizedRanges[idx])))
        // idx of first element that touches range or that is after range
        const joinRangeStartIdx = findFirstIdxMonotonousOrArrLen(this._normalizedRanges, r => r.endLineNumberExclusive >= range.startLineNumber);
        // idx of element after { last element that touches range or that is before range }
        const joinRangeEndIdxExclusive = findLastIdxMonotonous(this._normalizedRanges, r => r.startLineNumber <= range.endLineNumberExclusive) + 1;
        if (joinRangeStartIdx === joinRangeEndIdxExclusive) {
            // If there is no element that touches range, then joinRangeStartIdx === joinRangeEndIdxExclusive and that value is the index of the element after range
            this._normalizedRanges.splice(joinRangeStartIdx, 0, range);
        }
        else if (joinRangeStartIdx === joinRangeEndIdxExclusive - 1) {
            // Else, there is an element that touches range and in this case it is both the first and last element. Thus we can replace it
            const joinRange = this._normalizedRanges[joinRangeStartIdx];
            this._normalizedRanges[joinRangeStartIdx] = joinRange.join(range);
        }
        else {
            // First and last element are different - we need to replace the entire range
            const joinRange = this._normalizedRanges[joinRangeStartIdx].join(this._normalizedRanges[joinRangeEndIdxExclusive - 1]).join(range);
            this._normalizedRanges.splice(joinRangeStartIdx, joinRangeEndIdxExclusive - joinRangeStartIdx, joinRange);
        }
    }
    contains(lineNumber) {
        const rangeThatStartsBeforeEnd = findLastMonotonous(this._normalizedRanges, r => r.startLineNumber <= lineNumber);
        return !!rangeThatStartsBeforeEnd && rangeThatStartsBeforeEnd.endLineNumberExclusive > lineNumber;
    }
    getUnion(other) {
        if (this._normalizedRanges.length === 0) {
            return other;
        }
        if (other._normalizedRanges.length === 0) {
            return this;
        }
        const result = [];
        let i1 = 0;
        let i2 = 0;
        let current = null;
        while (i1 < this._normalizedRanges.length || i2 < other._normalizedRanges.length) {
            let next = null;
            if (i1 < this._normalizedRanges.length && i2 < other._normalizedRanges.length) {
                const lineRange1 = this._normalizedRanges[i1];
                const lineRange2 = other._normalizedRanges[i2];
                if (lineRange1.startLineNumber < lineRange2.startLineNumber) {
                    next = lineRange1;
                    i1++;
                }
                else {
                    next = lineRange2;
                    i2++;
                }
            }
            else if (i1 < this._normalizedRanges.length) {
                next = this._normalizedRanges[i1];
                i1++;
            }
            else {
                next = other._normalizedRanges[i2];
                i2++;
            }
            if (current === null) {
                current = next;
            }
            else {
                if (current.endLineNumberExclusive >= next.startLineNumber) {
                    // merge
                    current = new LineRange(current.startLineNumber, Math.max(current.endLineNumberExclusive, next.endLineNumberExclusive));
                }
                else {
                    // push
                    result.push(current);
                    current = next;
                }
            }
        }
        if (current !== null) {
            result.push(current);
        }
        return new LineRangeSet(result);
    }
    /**
     * Subtracts all ranges in this set from `range` and returns the result.
     */
    subtractFrom(range) {
        // idx of first element that touches range or that is after range
        const joinRangeStartIdx = findFirstIdxMonotonousOrArrLen(this._normalizedRanges, r => r.endLineNumberExclusive >= range.startLineNumber);
        // idx of element after { last element that touches range or that is before range }
        const joinRangeEndIdxExclusive = findLastIdxMonotonous(this._normalizedRanges, r => r.startLineNumber <= range.endLineNumberExclusive) + 1;
        if (joinRangeStartIdx === joinRangeEndIdxExclusive) {
            return new LineRangeSet([range]);
        }
        const result = [];
        let startLineNumber = range.startLineNumber;
        for (let i = joinRangeStartIdx; i < joinRangeEndIdxExclusive; i++) {
            const r = this._normalizedRanges[i];
            if (r.startLineNumber > startLineNumber) {
                result.push(new LineRange(startLineNumber, r.startLineNumber));
            }
            startLineNumber = r.endLineNumberExclusive;
        }
        if (startLineNumber < range.endLineNumberExclusive) {
            result.push(new LineRange(startLineNumber, range.endLineNumberExclusive));
        }
        return new LineRangeSet(result);
    }
    toString() {
        return this._normalizedRanges.map(r => r.toString()).join(', ');
    }
    getIntersection(other) {
        const result = [];
        let i1 = 0;
        let i2 = 0;
        while (i1 < this._normalizedRanges.length && i2 < other._normalizedRanges.length) {
            const r1 = this._normalizedRanges[i1];
            const r2 = other._normalizedRanges[i2];
            const i = r1.intersect(r2);
            if (i && !i.isEmpty) {
                result.push(i);
            }
            if (r1.endLineNumberExclusive < r2.endLineNumberExclusive) {
                i1++;
            }
            else {
                i2++;
            }
        }
        return new LineRangeSet(result);
    }
    getWithDelta(value) {
        return new LineRangeSet(this._normalizedRanges.map(r => r.delta(value)));
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/diff/rangeMapping.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Maps a line range in the original text model to a line range in the modified text model.
 */
class LineRangeMapping {
    static inverse(mapping, originalLineCount, modifiedLineCount) {
        const result = [];
        let lastOriginalEndLineNumber = 1;
        let lastModifiedEndLineNumber = 1;
        for (const m of mapping) {
            const r = new DetailedLineRangeMapping(new LineRange(lastOriginalEndLineNumber, m.original.startLineNumber), new LineRange(lastModifiedEndLineNumber, m.modified.startLineNumber), undefined);
            if (!r.modified.isEmpty) {
                result.push(r);
            }
            lastOriginalEndLineNumber = m.original.endLineNumberExclusive;
            lastModifiedEndLineNumber = m.modified.endLineNumberExclusive;
        }
        const r = new DetailedLineRangeMapping(new LineRange(lastOriginalEndLineNumber, originalLineCount + 1), new LineRange(lastModifiedEndLineNumber, modifiedLineCount + 1), undefined);
        if (!r.modified.isEmpty) {
            result.push(r);
        }
        return result;
    }
    constructor(originalRange, modifiedRange) {
        this.original = originalRange;
        this.modified = modifiedRange;
    }
    toString() {
        return `{${this.original.toString()}->${this.modified.toString()}}`;
    }
    flip() {
        return new LineRangeMapping(this.modified, this.original);
    }
    join(other) {
        return new LineRangeMapping(this.original.join(other.original), this.modified.join(other.modified));
    }
}
/**
 * Maps a line range in the original text model to a line range in the modified text model.
 * Also contains inner range mappings.
 */
class DetailedLineRangeMapping extends LineRangeMapping {
    constructor(originalRange, modifiedRange, innerChanges) {
        super(originalRange, modifiedRange);
        this.innerChanges = innerChanges;
    }
    flip() {
        var _a;
        return new DetailedLineRangeMapping(this.modified, this.original, (_a = this.innerChanges) === null || _a === void 0 ? void 0 : _a.map(c => c.flip()));
    }
}
/**
 * Maps a range in the original text model to a range in the modified text model.
 */
class RangeMapping {
    constructor(originalRange, modifiedRange) {
        this.originalRange = originalRange;
        this.modifiedRange = modifiedRange;
    }
    toString() {
        return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
    }
    flip() {
        return new RangeMapping(this.modifiedRange, this.originalRange);
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/diff/legacyLinesDiffComputer.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/







const MINIMUM_MATCHING_CHARACTER_LENGTH = 3;
class LegacyLinesDiffComputer {
    computeDiff(originalLines, modifiedLines, options) {
        var _a;
        const diffComputer = new DiffComputer(originalLines, modifiedLines, {
            maxComputationTime: options.maxComputationTimeMs,
            shouldIgnoreTrimWhitespace: options.ignoreTrimWhitespace,
            shouldComputeCharChanges: true,
            shouldMakePrettyDiff: true,
            shouldPostProcessCharChanges: true,
        });
        const result = diffComputer.computeDiff();
        const changes = [];
        let lastChange = null;
        for (const c of result.changes) {
            let originalRange;
            if (c.originalEndLineNumber === 0) {
                // Insertion
                originalRange = new LineRange(c.originalStartLineNumber + 1, c.originalStartLineNumber + 1);
            }
            else {
                originalRange = new LineRange(c.originalStartLineNumber, c.originalEndLineNumber + 1);
            }
            let modifiedRange;
            if (c.modifiedEndLineNumber === 0) {
                // Deletion
                modifiedRange = new LineRange(c.modifiedStartLineNumber + 1, c.modifiedStartLineNumber + 1);
            }
            else {
                modifiedRange = new LineRange(c.modifiedStartLineNumber, c.modifiedEndLineNumber + 1);
            }
            let change = new DetailedLineRangeMapping(originalRange, modifiedRange, (_a = c.charChanges) === null || _a === void 0 ? void 0 : _a.map(c => new RangeMapping(new range_Range(c.originalStartLineNumber, c.originalStartColumn, c.originalEndLineNumber, c.originalEndColumn), new range_Range(c.modifiedStartLineNumber, c.modifiedStartColumn, c.modifiedEndLineNumber, c.modifiedEndColumn))));
            if (lastChange) {
                if (lastChange.modified.endLineNumberExclusive === change.modified.startLineNumber
                    || lastChange.original.endLineNumberExclusive === change.original.startLineNumber) {
                    // join touching diffs. Probably moving diffs up/down in the algorithm causes touching diffs.
                    change = new DetailedLineRangeMapping(lastChange.original.join(change.original), lastChange.modified.join(change.modified), lastChange.innerChanges && change.innerChanges ?
                        lastChange.innerChanges.concat(change.innerChanges) : undefined);
                    changes.pop();
                }
            }
            changes.push(change);
            lastChange = change;
        }
        assertFn(() => {
            return checkAdjacentItems(changes, (m1, m2) => m2.original.startLineNumber - m1.original.endLineNumberExclusive === m2.modified.startLineNumber - m1.modified.endLineNumberExclusive &&
                // There has to be an unchanged line in between (otherwise both diffs should have been joined)
                m1.original.endLineNumberExclusive < m2.original.startLineNumber &&
                m1.modified.endLineNumberExclusive < m2.modified.startLineNumber);
        });
        return new LinesDiff(changes, [], result.quitEarly);
    }
}
function computeDiff(originalSequence, modifiedSequence, continueProcessingPredicate, pretty) {
    const diffAlgo = new LcsDiff(originalSequence, modifiedSequence, continueProcessingPredicate);
    return diffAlgo.ComputeDiff(pretty);
}
class LineSequence {
    constructor(lines) {
        const startColumns = [];
        const endColumns = [];
        for (let i = 0, length = lines.length; i < length; i++) {
            startColumns[i] = getFirstNonBlankColumn(lines[i], 1);
            endColumns[i] = getLastNonBlankColumn(lines[i], 1);
        }
        this.lines = lines;
        this._startColumns = startColumns;
        this._endColumns = endColumns;
    }
    getElements() {
        const elements = [];
        for (let i = 0, len = this.lines.length; i < len; i++) {
            elements[i] = this.lines[i].substring(this._startColumns[i] - 1, this._endColumns[i] - 1);
        }
        return elements;
    }
    getStrictElement(index) {
        return this.lines[index];
    }
    getStartLineNumber(i) {
        return i + 1;
    }
    getEndLineNumber(i) {
        return i + 1;
    }
    createCharSequence(shouldIgnoreTrimWhitespace, startIndex, endIndex) {
        const charCodes = [];
        const lineNumbers = [];
        const columns = [];
        let len = 0;
        for (let index = startIndex; index <= endIndex; index++) {
            const lineContent = this.lines[index];
            const startColumn = (shouldIgnoreTrimWhitespace ? this._startColumns[index] : 1);
            const endColumn = (shouldIgnoreTrimWhitespace ? this._endColumns[index] : lineContent.length + 1);
            for (let col = startColumn; col < endColumn; col++) {
                charCodes[len] = lineContent.charCodeAt(col - 1);
                lineNumbers[len] = index + 1;
                columns[len] = col;
                len++;
            }
            if (!shouldIgnoreTrimWhitespace && index < endIndex) {
                // Add \n if trim whitespace is not ignored
                charCodes[len] = 10 /* CharCode.LineFeed */;
                lineNumbers[len] = index + 1;
                columns[len] = lineContent.length + 1;
                len++;
            }
        }
        return new CharSequence(charCodes, lineNumbers, columns);
    }
}
class CharSequence {
    constructor(charCodes, lineNumbers, columns) {
        this._charCodes = charCodes;
        this._lineNumbers = lineNumbers;
        this._columns = columns;
    }
    toString() {
        return ('[' + this._charCodes.map((s, idx) => (s === 10 /* CharCode.LineFeed */ ? '\\n' : String.fromCharCode(s)) + `-(${this._lineNumbers[idx]},${this._columns[idx]})`).join(', ') + ']');
    }
    _assertIndex(index, arr) {
        if (index < 0 || index >= arr.length) {
            throw new Error(`Illegal index`);
        }
    }
    getElements() {
        return this._charCodes;
    }
    getStartLineNumber(i) {
        if (i > 0 && i === this._lineNumbers.length) {
            // the start line number of the element after the last element
            // is the end line number of the last element
            return this.getEndLineNumber(i - 1);
        }
        this._assertIndex(i, this._lineNumbers);
        return this._lineNumbers[i];
    }
    getEndLineNumber(i) {
        if (i === -1) {
            // the end line number of the element before the first element
            // is the start line number of the first element
            return this.getStartLineNumber(i + 1);
        }
        this._assertIndex(i, this._lineNumbers);
        if (this._charCodes[i] === 10 /* CharCode.LineFeed */) {
            return this._lineNumbers[i] + 1;
        }
        return this._lineNumbers[i];
    }
    getStartColumn(i) {
        if (i > 0 && i === this._columns.length) {
            // the start column of the element after the last element
            // is the end column of the last element
            return this.getEndColumn(i - 1);
        }
        this._assertIndex(i, this._columns);
        return this._columns[i];
    }
    getEndColumn(i) {
        if (i === -1) {
            // the end column of the element before the first element
            // is the start column of the first element
            return this.getStartColumn(i + 1);
        }
        this._assertIndex(i, this._columns);
        if (this._charCodes[i] === 10 /* CharCode.LineFeed */) {
            return 1;
        }
        return this._columns[i] + 1;
    }
}
class CharChange {
    constructor(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn) {
        this.originalStartLineNumber = originalStartLineNumber;
        this.originalStartColumn = originalStartColumn;
        this.originalEndLineNumber = originalEndLineNumber;
        this.originalEndColumn = originalEndColumn;
        this.modifiedStartLineNumber = modifiedStartLineNumber;
        this.modifiedStartColumn = modifiedStartColumn;
        this.modifiedEndLineNumber = modifiedEndLineNumber;
        this.modifiedEndColumn = modifiedEndColumn;
    }
    static createFromDiffChange(diffChange, originalCharSequence, modifiedCharSequence) {
        const originalStartLineNumber = originalCharSequence.getStartLineNumber(diffChange.originalStart);
        const originalStartColumn = originalCharSequence.getStartColumn(diffChange.originalStart);
        const originalEndLineNumber = originalCharSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
        const originalEndColumn = originalCharSequence.getEndColumn(diffChange.originalStart + diffChange.originalLength - 1);
        const modifiedStartLineNumber = modifiedCharSequence.getStartLineNumber(diffChange.modifiedStart);
        const modifiedStartColumn = modifiedCharSequence.getStartColumn(diffChange.modifiedStart);
        const modifiedEndLineNumber = modifiedCharSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
        const modifiedEndColumn = modifiedCharSequence.getEndColumn(diffChange.modifiedStart + diffChange.modifiedLength - 1);
        return new CharChange(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn);
    }
}
function postProcessCharChanges(rawChanges) {
    if (rawChanges.length <= 1) {
        return rawChanges;
    }
    const result = [rawChanges[0]];
    let prevChange = result[0];
    for (let i = 1, len = rawChanges.length; i < len; i++) {
        const currChange = rawChanges[i];
        const originalMatchingLength = currChange.originalStart - (prevChange.originalStart + prevChange.originalLength);
        const modifiedMatchingLength = currChange.modifiedStart - (prevChange.modifiedStart + prevChange.modifiedLength);
        // Both of the above should be equal, but the continueProcessingPredicate may prevent this from being true
        const matchingLength = Math.min(originalMatchingLength, modifiedMatchingLength);
        if (matchingLength < MINIMUM_MATCHING_CHARACTER_LENGTH) {
            // Merge the current change into the previous one
            prevChange.originalLength = (currChange.originalStart + currChange.originalLength) - prevChange.originalStart;
            prevChange.modifiedLength = (currChange.modifiedStart + currChange.modifiedLength) - prevChange.modifiedStart;
        }
        else {
            // Add the current change
            result.push(currChange);
            prevChange = currChange;
        }
    }
    return result;
}
class LineChange {
    constructor(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges) {
        this.originalStartLineNumber = originalStartLineNumber;
        this.originalEndLineNumber = originalEndLineNumber;
        this.modifiedStartLineNumber = modifiedStartLineNumber;
        this.modifiedEndLineNumber = modifiedEndLineNumber;
        this.charChanges = charChanges;
    }
    static createFromDiffResult(shouldIgnoreTrimWhitespace, diffChange, originalLineSequence, modifiedLineSequence, continueCharDiff, shouldComputeCharChanges, shouldPostProcessCharChanges) {
        let originalStartLineNumber;
        let originalEndLineNumber;
        let modifiedStartLineNumber;
        let modifiedEndLineNumber;
        let charChanges = undefined;
        if (diffChange.originalLength === 0) {
            originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart) - 1;
            originalEndLineNumber = 0;
        }
        else {
            originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart);
            originalEndLineNumber = originalLineSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
        }
        if (diffChange.modifiedLength === 0) {
            modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart) - 1;
            modifiedEndLineNumber = 0;
        }
        else {
            modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart);
            modifiedEndLineNumber = modifiedLineSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
        }
        if (shouldComputeCharChanges && diffChange.originalLength > 0 && diffChange.originalLength < 20 && diffChange.modifiedLength > 0 && diffChange.modifiedLength < 20 && continueCharDiff()) {
            // Compute character changes for diff chunks of at most 20 lines...
            const originalCharSequence = originalLineSequence.createCharSequence(shouldIgnoreTrimWhitespace, diffChange.originalStart, diffChange.originalStart + diffChange.originalLength - 1);
            const modifiedCharSequence = modifiedLineSequence.createCharSequence(shouldIgnoreTrimWhitespace, diffChange.modifiedStart, diffChange.modifiedStart + diffChange.modifiedLength - 1);
            if (originalCharSequence.getElements().length > 0 && modifiedCharSequence.getElements().length > 0) {
                let rawChanges = computeDiff(originalCharSequence, modifiedCharSequence, continueCharDiff, true).changes;
                if (shouldPostProcessCharChanges) {
                    rawChanges = postProcessCharChanges(rawChanges);
                }
                charChanges = [];
                for (let i = 0, length = rawChanges.length; i < length; i++) {
                    charChanges.push(CharChange.createFromDiffChange(rawChanges[i], originalCharSequence, modifiedCharSequence));
                }
            }
        }
        return new LineChange(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges);
    }
}
class DiffComputer {
    constructor(originalLines, modifiedLines, opts) {
        this.shouldComputeCharChanges = opts.shouldComputeCharChanges;
        this.shouldPostProcessCharChanges = opts.shouldPostProcessCharChanges;
        this.shouldIgnoreTrimWhitespace = opts.shouldIgnoreTrimWhitespace;
        this.shouldMakePrettyDiff = opts.shouldMakePrettyDiff;
        this.originalLines = originalLines;
        this.modifiedLines = modifiedLines;
        this.original = new LineSequence(originalLines);
        this.modified = new LineSequence(modifiedLines);
        this.continueLineDiff = createContinueProcessingPredicate(opts.maxComputationTime);
        this.continueCharDiff = createContinueProcessingPredicate(opts.maxComputationTime === 0 ? 0 : Math.min(opts.maxComputationTime, 5000)); // never run after 5s for character changes...
    }
    computeDiff() {
        if (this.original.lines.length === 1 && this.original.lines[0].length === 0) {
            // empty original => fast path
            if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0) {
                return {
                    quitEarly: false,
                    changes: []
                };
            }
            return {
                quitEarly: false,
                changes: [{
                        originalStartLineNumber: 1,
                        originalEndLineNumber: 1,
                        modifiedStartLineNumber: 1,
                        modifiedEndLineNumber: this.modified.lines.length,
                        charChanges: undefined
                    }]
            };
        }
        if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0) {
            // empty modified => fast path
            return {
                quitEarly: false,
                changes: [{
                        originalStartLineNumber: 1,
                        originalEndLineNumber: this.original.lines.length,
                        modifiedStartLineNumber: 1,
                        modifiedEndLineNumber: 1,
                        charChanges: undefined
                    }]
            };
        }
        const diffResult = computeDiff(this.original, this.modified, this.continueLineDiff, this.shouldMakePrettyDiff);
        const rawChanges = diffResult.changes;
        const quitEarly = diffResult.quitEarly;
        // The diff is always computed with ignoring trim whitespace
        // This ensures we get the prettiest diff
        if (this.shouldIgnoreTrimWhitespace) {
            const lineChanges = [];
            for (let i = 0, length = rawChanges.length; i < length; i++) {
                lineChanges.push(LineChange.createFromDiffResult(this.shouldIgnoreTrimWhitespace, rawChanges[i], this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
            }
            return {
                quitEarly: quitEarly,
                changes: lineChanges
            };
        }
        // Need to post-process and introduce changes where the trim whitespace is different
        // Note that we are looping starting at -1 to also cover the lines before the first change
        const result = [];
        let originalLineIndex = 0;
        let modifiedLineIndex = 0;
        for (let i = -1 /* !!!! */, len = rawChanges.length; i < len; i++) {
            const nextChange = (i + 1 < len ? rawChanges[i + 1] : null);
            const originalStop = (nextChange ? nextChange.originalStart : this.originalLines.length);
            const modifiedStop = (nextChange ? nextChange.modifiedStart : this.modifiedLines.length);
            while (originalLineIndex < originalStop && modifiedLineIndex < modifiedStop) {
                const originalLine = this.originalLines[originalLineIndex];
                const modifiedLine = this.modifiedLines[modifiedLineIndex];
                if (originalLine !== modifiedLine) {
                    // These lines differ only in trim whitespace
                    // Check the leading whitespace
                    {
                        let originalStartColumn = getFirstNonBlankColumn(originalLine, 1);
                        let modifiedStartColumn = getFirstNonBlankColumn(modifiedLine, 1);
                        while (originalStartColumn > 1 && modifiedStartColumn > 1) {
                            const originalChar = originalLine.charCodeAt(originalStartColumn - 2);
                            const modifiedChar = modifiedLine.charCodeAt(modifiedStartColumn - 2);
                            if (originalChar !== modifiedChar) {
                                break;
                            }
                            originalStartColumn--;
                            modifiedStartColumn--;
                        }
                        if (originalStartColumn > 1 || modifiedStartColumn > 1) {
                            this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, 1, originalStartColumn, modifiedLineIndex + 1, 1, modifiedStartColumn);
                        }
                    }
                    // Check the trailing whitespace
                    {
                        let originalEndColumn = getLastNonBlankColumn(originalLine, 1);
                        let modifiedEndColumn = getLastNonBlankColumn(modifiedLine, 1);
                        const originalMaxColumn = originalLine.length + 1;
                        const modifiedMaxColumn = modifiedLine.length + 1;
                        while (originalEndColumn < originalMaxColumn && modifiedEndColumn < modifiedMaxColumn) {
                            const originalChar = originalLine.charCodeAt(originalEndColumn - 1);
                            const modifiedChar = originalLine.charCodeAt(modifiedEndColumn - 1);
                            if (originalChar !== modifiedChar) {
                                break;
                            }
                            originalEndColumn++;
                            modifiedEndColumn++;
                        }
                        if (originalEndColumn < originalMaxColumn || modifiedEndColumn < modifiedMaxColumn) {
                            this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, originalEndColumn, originalMaxColumn, modifiedLineIndex + 1, modifiedEndColumn, modifiedMaxColumn);
                        }
                    }
                }
                originalLineIndex++;
                modifiedLineIndex++;
            }
            if (nextChange) {
                // Emit the actual change
                result.push(LineChange.createFromDiffResult(this.shouldIgnoreTrimWhitespace, nextChange, this.original, this.modified, this.continueCharDiff, this.shouldComputeCharChanges, this.shouldPostProcessCharChanges));
                originalLineIndex += nextChange.originalLength;
                modifiedLineIndex += nextChange.modifiedLength;
            }
        }
        return {
            quitEarly: quitEarly,
            changes: result
        };
    }
    _pushTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
        if (this._mergeTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn)) {
            // Merged into previous
            return;
        }
        let charChanges = undefined;
        if (this.shouldComputeCharChanges) {
            charChanges = [new CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn)];
        }
        result.push(new LineChange(originalLineNumber, originalLineNumber, modifiedLineNumber, modifiedLineNumber, charChanges));
    }
    _mergeTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
        const len = result.length;
        if (len === 0) {
            return false;
        }
        const prevChange = result[len - 1];
        if (prevChange.originalEndLineNumber === 0 || prevChange.modifiedEndLineNumber === 0) {
            // Don't merge with inserts/deletes
            return false;
        }
        if (prevChange.originalEndLineNumber === originalLineNumber && prevChange.modifiedEndLineNumber === modifiedLineNumber) {
            if (this.shouldComputeCharChanges && prevChange.charChanges) {
                prevChange.charChanges.push(new CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn));
            }
            return true;
        }
        if (prevChange.originalEndLineNumber + 1 === originalLineNumber && prevChange.modifiedEndLineNumber + 1 === modifiedLineNumber) {
            prevChange.originalEndLineNumber = originalLineNumber;
            prevChange.modifiedEndLineNumber = modifiedLineNumber;
            if (this.shouldComputeCharChanges && prevChange.charChanges) {
                prevChange.charChanges.push(new CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn));
            }
            return true;
        }
        return false;
    }
}
function getFirstNonBlankColumn(txt, defaultValue) {
    const r = firstNonWhitespaceIndex(txt);
    if (r === -1) {
        return defaultValue;
    }
    return r + 1;
}
function getLastNonBlankColumn(txt, defaultValue) {
    const r = lastNonWhitespaceIndex(txt);
    if (r === -1) {
        return defaultValue;
    }
    return r + 2;
}
function createContinueProcessingPredicate(maximumRuntime) {
    if (maximumRuntime === 0) {
        return () => true;
    }
    const startTime = Date.now();
    return () => {
        return Date.now() - startTime < maximumRuntime;
    };
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/diff/defaultLinesDiffComputer/algorithms/diffAlgorithm.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/



class DiffAlgorithmResult {
    static trivial(seq1, seq2) {
        return new DiffAlgorithmResult([new SequenceDiff(OffsetRange.ofLength(seq1.length), OffsetRange.ofLength(seq2.length))], false);
    }
    static trivialTimedOut(seq1, seq2) {
        return new DiffAlgorithmResult([new SequenceDiff(OffsetRange.ofLength(seq1.length), OffsetRange.ofLength(seq2.length))], true);
    }
    constructor(diffs, 
    /**
     * Indicates if the time out was reached.
     * In that case, the diffs might be an approximation and the user should be asked to rerun the diff with more time.
     */
    hitTimeout) {
        this.diffs = diffs;
        this.hitTimeout = hitTimeout;
    }
}
class SequenceDiff {
    static invert(sequenceDiffs, doc1Length) {
        const result = [];
        forEachAdjacent(sequenceDiffs, (a, b) => {
            result.push(SequenceDiff.fromOffsetPairs(a ? a.getEndExclusives() : OffsetPair.zero, b ? b.getStarts() : new OffsetPair(doc1Length, (a ? a.seq2Range.endExclusive - a.seq1Range.endExclusive : 0) + doc1Length)));
        });
        return result;
    }
    static fromOffsetPairs(start, endExclusive) {
        return new SequenceDiff(new OffsetRange(start.offset1, endExclusive.offset1), new OffsetRange(start.offset2, endExclusive.offset2));
    }
    constructor(seq1Range, seq2Range) {
        this.seq1Range = seq1Range;
        this.seq2Range = seq2Range;
    }
    swap() {
        return new SequenceDiff(this.seq2Range, this.seq1Range);
    }
    toString() {
        return `${this.seq1Range} <-> ${this.seq2Range}`;
    }
    join(other) {
        return new SequenceDiff(this.seq1Range.join(other.seq1Range), this.seq2Range.join(other.seq2Range));
    }
    delta(offset) {
        if (offset === 0) {
            return this;
        }
        return new SequenceDiff(this.seq1Range.delta(offset), this.seq2Range.delta(offset));
    }
    deltaStart(offset) {
        if (offset === 0) {
            return this;
        }
        return new SequenceDiff(this.seq1Range.deltaStart(offset), this.seq2Range.deltaStart(offset));
    }
    deltaEnd(offset) {
        if (offset === 0) {
            return this;
        }
        return new SequenceDiff(this.seq1Range.deltaEnd(offset), this.seq2Range.deltaEnd(offset));
    }
    intersect(other) {
        const i1 = this.seq1Range.intersect(other.seq1Range);
        const i2 = this.seq2Range.intersect(other.seq2Range);
        if (!i1 || !i2) {
            return undefined;
        }
        return new SequenceDiff(i1, i2);
    }
    getStarts() {
        return new OffsetPair(this.seq1Range.start, this.seq2Range.start);
    }
    getEndExclusives() {
        return new OffsetPair(this.seq1Range.endExclusive, this.seq2Range.endExclusive);
    }
}
class OffsetPair {
    constructor(offset1, offset2) {
        this.offset1 = offset1;
        this.offset2 = offset2;
    }
    toString() {
        return `${this.offset1} <-> ${this.offset2}`;
    }
}
OffsetPair.zero = new OffsetPair(0, 0);
OffsetPair.max = new OffsetPair(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER);
class InfiniteTimeout {
    isValid() {
        return true;
    }
}
InfiniteTimeout.instance = new InfiniteTimeout();
class DateTimeout {
    constructor(timeout) {
        this.timeout = timeout;
        this.startTime = Date.now();
        this.valid = true;
        if (timeout <= 0) {
            throw new BugIndicatingError('timeout must be positive');
        }
    }
    // Recommendation: Set a log-point `{this.disable()}` in the body
    isValid() {
        const valid = Date.now() - this.startTime < this.timeout;
        if (!valid && this.valid) {
            this.valid = false; // timeout reached
            // eslint-disable-next-line no-debugger
            debugger; // WARNING: Most likely debugging caused the timeout. Call `this.disable()` to continue without timing out.
        }
        return this.valid;
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/diff/defaultLinesDiffComputer/utils.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
class Array2D {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.array = [];
        this.array = new Array(width * height);
    }
    get(x, y) {
        return this.array[x + y * this.width];
    }
    set(x, y, value) {
        this.array[x + y * this.width] = value;
    }
}
function isSpace(charCode) {
    return charCode === 32 /* CharCode.Space */ || charCode === 9 /* CharCode.Tab */;
}
class LineRangeFragment {
    static getKey(chr) {
        let key = this.chrKeys.get(chr);
        if (key === undefined) {
            key = this.chrKeys.size;
            this.chrKeys.set(chr, key);
        }
        return key;
    }
    constructor(range, lines, source) {
        this.range = range;
        this.lines = lines;
        this.source = source;
        this.histogram = [];
        let counter = 0;
        for (let i = range.startLineNumber - 1; i < range.endLineNumberExclusive - 1; i++) {
            const line = lines[i];
            for (let j = 0; j < line.length; j++) {
                counter++;
                const chr = line[j];
                const key = LineRangeFragment.getKey(chr);
                this.histogram[key] = (this.histogram[key] || 0) + 1;
            }
            counter++;
            const key = LineRangeFragment.getKey('\n');
            this.histogram[key] = (this.histogram[key] || 0) + 1;
        }
        this.totalCount = counter;
    }
    computeSimilarity(other) {
        var _a, _b;
        let sumDifferences = 0;
        const maxLength = Math.max(this.histogram.length, other.histogram.length);
        for (let i = 0; i < maxLength; i++) {
            sumDifferences += Math.abs(((_a = this.histogram[i]) !== null && _a !== void 0 ? _a : 0) - ((_b = other.histogram[i]) !== null && _b !== void 0 ? _b : 0));
        }
        return 1 - (sumDifferences / (this.totalCount + other.totalCount));
    }
}
LineRangeFragment.chrKeys = new Map();

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/diff/defaultLinesDiffComputer/algorithms/dynamicProgrammingDiffing.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/



/**
 * A O(MN) diffing algorithm that supports a score function.
 * The algorithm can be improved by processing the 2d array diagonally.
*/
class DynamicProgrammingDiffing {
    compute(sequence1, sequence2, timeout = InfiniteTimeout.instance, equalityScore) {
        if (sequence1.length === 0 || sequence2.length === 0) {
            return DiffAlgorithmResult.trivial(sequence1, sequence2);
        }
        /**
         * lcsLengths.get(i, j): Length of the longest common subsequence of sequence1.substring(0, i + 1) and sequence2.substring(0, j + 1).
         */
        const lcsLengths = new Array2D(sequence1.length, sequence2.length);
        const directions = new Array2D(sequence1.length, sequence2.length);
        const lengths = new Array2D(sequence1.length, sequence2.length);
        // ==== Initializing lcsLengths ====
        for (let s1 = 0; s1 < sequence1.length; s1++) {
            for (let s2 = 0; s2 < sequence2.length; s2++) {
                if (!timeout.isValid()) {
                    return DiffAlgorithmResult.trivialTimedOut(sequence1, sequence2);
                }
                const horizontalLen = s1 === 0 ? 0 : lcsLengths.get(s1 - 1, s2);
                const verticalLen = s2 === 0 ? 0 : lcsLengths.get(s1, s2 - 1);
                let extendedSeqScore;
                if (sequence1.getElement(s1) === sequence2.getElement(s2)) {
                    if (s1 === 0 || s2 === 0) {
                        extendedSeqScore = 0;
                    }
                    else {
                        extendedSeqScore = lcsLengths.get(s1 - 1, s2 - 1);
                    }
                    if (s1 > 0 && s2 > 0 && directions.get(s1 - 1, s2 - 1) === 3) {
                        // Prefer consecutive diagonals
                        extendedSeqScore += lengths.get(s1 - 1, s2 - 1);
                    }
                    extendedSeqScore += (equalityScore ? equalityScore(s1, s2) : 1);
                }
                else {
                    extendedSeqScore = -1;
                }
                const newValue = Math.max(horizontalLen, verticalLen, extendedSeqScore);
                if (newValue === extendedSeqScore) {
                    // Prefer diagonals
                    const prevLen = s1 > 0 && s2 > 0 ? lengths.get(s1 - 1, s2 - 1) : 0;
                    lengths.set(s1, s2, prevLen + 1);
                    directions.set(s1, s2, 3);
                }
                else if (newValue === horizontalLen) {
                    lengths.set(s1, s2, 0);
                    directions.set(s1, s2, 1);
                }
                else if (newValue === verticalLen) {
                    lengths.set(s1, s2, 0);
                    directions.set(s1, s2, 2);
                }
                lcsLengths.set(s1, s2, newValue);
            }
        }
        // ==== Backtracking ====
        const result = [];
        let lastAligningPosS1 = sequence1.length;
        let lastAligningPosS2 = sequence2.length;
        function reportDecreasingAligningPositions(s1, s2) {
            if (s1 + 1 !== lastAligningPosS1 || s2 + 1 !== lastAligningPosS2) {
                result.push(new SequenceDiff(new OffsetRange(s1 + 1, lastAligningPosS1), new OffsetRange(s2 + 1, lastAligningPosS2)));
            }
            lastAligningPosS1 = s1;
            lastAligningPosS2 = s2;
        }
        let s1 = sequence1.length - 1;
        let s2 = sequence2.length - 1;
        while (s1 >= 0 && s2 >= 0) {
            if (directions.get(s1, s2) === 3) {
                reportDecreasingAligningPositions(s1, s2);
                s1--;
                s2--;
            }
            else {
                if (directions.get(s1, s2) === 1) {
                    s1--;
                }
                else {
                    s2--;
                }
            }
        }
        reportDecreasingAligningPositions(-1, -1);
        result.reverse();
        return new DiffAlgorithmResult(result, false);
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/diff/defaultLinesDiffComputer/algorithms/myersDiffAlgorithm.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


/**
 * An O(ND) diff algorithm that has a quadratic space worst-case complexity.
*/
class MyersDiffAlgorithm {
    compute(seq1, seq2, timeout = InfiniteTimeout.instance) {
        // These are common special cases.
        // The early return improves performance dramatically.
        if (seq1.length === 0 || seq2.length === 0) {
            return DiffAlgorithmResult.trivial(seq1, seq2);
        }
        const seqX = seq1; // Text on the x axis
        const seqY = seq2; // Text on the y axis
        function getXAfterSnake(x, y) {
            while (x < seqX.length && y < seqY.length && seqX.getElement(x) === seqY.getElement(y)) {
                x++;
                y++;
            }
            return x;
        }
        let d = 0;
        // V[k]: X value of longest d-line that ends in diagonal k.
        // d-line: path from (0,0) to (x,y) that uses exactly d non-diagonals.
        // diagonal k: Set of points (x,y) with x-y = k.
        // k=1 -> (1,0),(2,1)
        const V = new FastInt32Array();
        V.set(0, getXAfterSnake(0, 0));
        const paths = new FastArrayNegativeIndices();
        paths.set(0, V.get(0) === 0 ? null : new SnakePath(null, 0, 0, V.get(0)));
        let k = 0;
        loop: while (true) {
            d++;
            if (!timeout.isValid()) {
                return DiffAlgorithmResult.trivialTimedOut(seqX, seqY);
            }
            // The paper has `for (k = -d; k <= d; k += 2)`, but we can ignore diagonals that cannot influence the result.
            const lowerBound = -Math.min(d, seqY.length + (d % 2));
            const upperBound = Math.min(d, seqX.length + (d % 2));
            for (k = lowerBound; k <= upperBound; k += 2) {
                let step = 0;
                // We can use the X values of (d-1)-lines to compute X value of the longest d-lines.
                const maxXofDLineTop = k === upperBound ? -1 : V.get(k + 1); // We take a vertical non-diagonal (add a symbol in seqX)
                const maxXofDLineLeft = k === lowerBound ? -1 : V.get(k - 1) + 1; // We take a horizontal non-diagonal (+1 x) (delete a symbol in seqX)
                step++;
                const x = Math.min(Math.max(maxXofDLineTop, maxXofDLineLeft), seqX.length);
                const y = x - k;
                step++;
                if (x > seqX.length || y > seqY.length) {
                    // This diagonal is irrelevant for the result.
                    // TODO: Don't pay the cost for this in the next iteration.
                    continue;
                }
                const newMaxX = getXAfterSnake(x, y);
                V.set(k, newMaxX);
                const lastPath = x === maxXofDLineTop ? paths.get(k + 1) : paths.get(k - 1);
                paths.set(k, newMaxX !== x ? new SnakePath(lastPath, x, y, newMaxX - x) : lastPath);
                if (V.get(k) === seqX.length && V.get(k) - k === seqY.length) {
                    break loop;
                }
            }
        }
        let path = paths.get(k);
        const result = [];
        let lastAligningPosS1 = seqX.length;
        let lastAligningPosS2 = seqY.length;
        while (true) {
            const endX = path ? path.x + path.length : 0;
            const endY = path ? path.y + path.length : 0;
            if (endX !== lastAligningPosS1 || endY !== lastAligningPosS2) {
                result.push(new SequenceDiff(new OffsetRange(endX, lastAligningPosS1), new OffsetRange(endY, lastAligningPosS2)));
            }
            if (!path) {
                break;
            }
            lastAligningPosS1 = path.x;
            lastAligningPosS2 = path.y;
            path = path.prev;
        }
        result.reverse();
        return new DiffAlgorithmResult(result, false);
    }
}
class SnakePath {
    constructor(prev, x, y, length) {
        this.prev = prev;
        this.x = x;
        this.y = y;
        this.length = length;
    }
}
/**
 * An array that supports fast negative indices.
*/
class FastInt32Array {
    constructor() {
        this.positiveArr = new Int32Array(10);
        this.negativeArr = new Int32Array(10);
    }
    get(idx) {
        if (idx < 0) {
            idx = -idx - 1;
            return this.negativeArr[idx];
        }
        else {
            return this.positiveArr[idx];
        }
    }
    set(idx, value) {
        if (idx < 0) {
            idx = -idx - 1;
            if (idx >= this.negativeArr.length) {
                const arr = this.negativeArr;
                this.negativeArr = new Int32Array(arr.length * 2);
                this.negativeArr.set(arr);
            }
            this.negativeArr[idx] = value;
        }
        else {
            if (idx >= this.positiveArr.length) {
                const arr = this.positiveArr;
                this.positiveArr = new Int32Array(arr.length * 2);
                this.positiveArr.set(arr);
            }
            this.positiveArr[idx] = value;
        }
    }
}
/**
 * An array that supports fast negative indices.
*/
class FastArrayNegativeIndices {
    constructor() {
        this.positiveArr = [];
        this.negativeArr = [];
    }
    get(idx) {
        if (idx < 0) {
            idx = -idx - 1;
            return this.negativeArr[idx];
        }
        else {
            return this.positiveArr[idx];
        }
    }
    set(idx, value) {
        if (idx < 0) {
            idx = -idx - 1;
            this.negativeArr[idx] = value;
        }
        else {
            this.positiveArr[idx] = value;
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/base/common/map.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var map_a, _b;
class ResourceMapEntry {
    constructor(uri, value) {
        this.uri = uri;
        this.value = value;
    }
}
function isEntries(arg) {
    return Array.isArray(arg);
}
class ResourceMap {
    constructor(arg, toKey) {
        this[map_a] = 'ResourceMap';
        if (arg instanceof ResourceMap) {
            this.map = new Map(arg.map);
            this.toKey = toKey !== null && toKey !== void 0 ? toKey : ResourceMap.defaultToKey;
        }
        else if (isEntries(arg)) {
            this.map = new Map();
            this.toKey = toKey !== null && toKey !== void 0 ? toKey : ResourceMap.defaultToKey;
            for (const [resource, value] of arg) {
                this.set(resource, value);
            }
        }
        else {
            this.map = new Map();
            this.toKey = arg !== null && arg !== void 0 ? arg : ResourceMap.defaultToKey;
        }
    }
    set(resource, value) {
        this.map.set(this.toKey(resource), new ResourceMapEntry(resource, value));
        return this;
    }
    get(resource) {
        var _c;
        return (_c = this.map.get(this.toKey(resource))) === null || _c === void 0 ? void 0 : _c.value;
    }
    has(resource) {
        return this.map.has(this.toKey(resource));
    }
    get size() {
        return this.map.size;
    }
    clear() {
        this.map.clear();
    }
    delete(resource) {
        return this.map.delete(this.toKey(resource));
    }
    forEach(clb, thisArg) {
        if (typeof thisArg !== 'undefined') {
            clb = clb.bind(thisArg);
        }
        for (const [_, entry] of this.map) {
            clb(entry.value, entry.uri, this);
        }
    }
    *values() {
        for (const entry of this.map.values()) {
            yield entry.value;
        }
    }
    *keys() {
        for (const entry of this.map.values()) {
            yield entry.uri;
        }
    }
    *entries() {
        for (const entry of this.map.values()) {
            yield [entry.uri, entry.value];
        }
    }
    *[(map_a = Symbol.toStringTag, Symbol.iterator)]() {
        for (const [, entry] of this.map) {
            yield [entry.uri, entry.value];
        }
    }
}
ResourceMap.defaultToKey = (resource) => resource.toString();
class LinkedMap {
    constructor() {
        this[_b] = 'LinkedMap';
        this._map = new Map();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state = 0;
    }
    clear() {
        this._map.clear();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
        this._state++;
    }
    isEmpty() {
        return !this._head && !this._tail;
    }
    get size() {
        return this._size;
    }
    get first() {
        var _c;
        return (_c = this._head) === null || _c === void 0 ? void 0 : _c.value;
    }
    get last() {
        var _c;
        return (_c = this._tail) === null || _c === void 0 ? void 0 : _c.value;
    }
    has(key) {
        return this._map.has(key);
    }
    get(key, touch = 0 /* Touch.None */) {
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        if (touch !== 0 /* Touch.None */) {
            this.touch(item, touch);
        }
        return item.value;
    }
    set(key, value, touch = 0 /* Touch.None */) {
        let item = this._map.get(key);
        if (item) {
            item.value = value;
            if (touch !== 0 /* Touch.None */) {
                this.touch(item, touch);
            }
        }
        else {
            item = { key, value, next: undefined, previous: undefined };
            switch (touch) {
                case 0 /* Touch.None */:
                    this.addItemLast(item);
                    break;
                case 1 /* Touch.AsOld */:
                    this.addItemFirst(item);
                    break;
                case 2 /* Touch.AsNew */:
                    this.addItemLast(item);
                    break;
                default:
                    this.addItemLast(item);
                    break;
            }
            this._map.set(key, item);
            this._size++;
        }
        return this;
    }
    delete(key) {
        return !!this.remove(key);
    }
    remove(key) {
        const item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    shift() {
        if (!this._head && !this._tail) {
            return undefined;
        }
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        const item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
    }
    forEach(callbackfn, thisArg) {
        const state = this._state;
        let current = this._head;
        while (current) {
            if (thisArg) {
                callbackfn.bind(thisArg)(current.value, current.key, this);
            }
            else {
                callbackfn(current.value, current.key, this);
            }
            if (this._state !== state) {
                throw new Error(`LinkedMap got modified during iteration.`);
            }
            current = current.next;
        }
    }
    keys() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]() {
                return iterator;
            },
            next() {
                if (map._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: current.key, done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    values() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]() {
                return iterator;
            },
            next() {
                if (map._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: current.value, done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    entries() {
        const map = this;
        const state = this._state;
        let current = this._head;
        const iterator = {
            [Symbol.iterator]() {
                return iterator;
            },
            next() {
                if (map._state !== state) {
                    throw new Error(`LinkedMap got modified during iteration.`);
                }
                if (current) {
                    const result = { value: [current.key, current.value], done: false };
                    current = current.next;
                    return result;
                }
                else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    [(_b = Symbol.toStringTag, Symbol.iterator)]() {
        return this.entries();
    }
    trimOld(newSize) {
        if (newSize >= this.size) {
            return;
        }
        if (newSize === 0) {
            this.clear();
            return;
        }
        let current = this._head;
        let currentSize = this.size;
        while (current && currentSize > newSize) {
            this._map.delete(current.key);
            current = current.next;
            currentSize--;
        }
        this._head = current;
        this._size = currentSize;
        if (current) {
            current.previous = undefined;
        }
        this._state++;
    }
    addItemFirst(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._tail = item;
        }
        else if (!this._head) {
            throw new Error('Invalid list');
        }
        else {
            item.next = this._head;
            this._head.previous = item;
        }
        this._head = item;
        this._state++;
    }
    addItemLast(item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._head = item;
        }
        else if (!this._tail) {
            throw new Error('Invalid list');
        }
        else {
            item.previous = this._tail;
            this._tail.next = item;
        }
        this._tail = item;
        this._state++;
    }
    removeItem(item) {
        if (item === this._head && item === this._tail) {
            this._head = undefined;
            this._tail = undefined;
        }
        else if (item === this._head) {
            // This can only happen if size === 1 which is handled
            // by the case above.
            if (!item.next) {
                throw new Error('Invalid list');
            }
            item.next.previous = undefined;
            this._head = item.next;
        }
        else if (item === this._tail) {
            // This can only happen if size === 1 which is handled
            // by the case above.
            if (!item.previous) {
                throw new Error('Invalid list');
            }
            item.previous.next = undefined;
            this._tail = item.previous;
        }
        else {
            const next = item.next;
            const previous = item.previous;
            if (!next || !previous) {
                throw new Error('Invalid list');
            }
            next.previous = previous;
            previous.next = next;
        }
        item.next = undefined;
        item.previous = undefined;
        this._state++;
    }
    touch(item, touch) {
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        if ((touch !== 1 /* Touch.AsOld */ && touch !== 2 /* Touch.AsNew */)) {
            return;
        }
        if (touch === 1 /* Touch.AsOld */) {
            if (item === this._head) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item
            if (item === this._tail) {
                // previous must be defined since item was not head but is tail
                // So there are more than on item in the map
                previous.next = undefined;
                this._tail = previous;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            // Insert the node at head
            item.previous = undefined;
            item.next = this._head;
            this._head.previous = item;
            this._head = item;
            this._state++;
        }
        else if (touch === 2 /* Touch.AsNew */) {
            if (item === this._tail) {
                return;
            }
            const next = item.next;
            const previous = item.previous;
            // Unlink the item.
            if (item === this._head) {
                // next must be defined since item was not tail but is head
                // So there are more than on item in the map
                next.previous = undefined;
                this._head = next;
            }
            else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            item.next = undefined;
            item.previous = this._tail;
            this._tail.next = item;
            this._tail = item;
            this._state++;
        }
    }
    toJSON() {
        const data = [];
        this.forEach((value, key) => {
            data.push([key, value]);
        });
        return data;
    }
    fromJSON(data) {
        this.clear();
        for (const [key, value] of data) {
            this.set(key, value);
        }
    }
}
class LRUCache extends (/* unused pure expression or super */ null && (LinkedMap)) {
    constructor(limit, ratio = 1) {
        super();
        this._limit = limit;
        this._ratio = Math.min(Math.max(0, ratio), 1);
    }
    get limit() {
        return this._limit;
    }
    set limit(limit) {
        this._limit = limit;
        this.checkTrim();
    }
    get(key, touch = 2 /* Touch.AsNew */) {
        return super.get(key, touch);
    }
    peek(key) {
        return super.get(key, 0 /* Touch.None */);
    }
    set(key, value) {
        super.set(key, value, 2 /* Touch.AsNew */);
        this.checkTrim();
        return this;
    }
    checkTrim() {
        if (this.size > this._limit) {
            this.trimOld(Math.round(this._limit * this._ratio));
        }
    }
}
/**
 * A map that allows access both by keys and values.
 * **NOTE**: values need to be unique.
 */
class BidirectionalMap {
    constructor(entries) {
        this._m1 = new Map();
        this._m2 = new Map();
        if (entries) {
            for (const [key, value] of entries) {
                this.set(key, value);
            }
        }
    }
    clear() {
        this._m1.clear();
        this._m2.clear();
    }
    set(key, value) {
        this._m1.set(key, value);
        this._m2.set(value, key);
    }
    get(key) {
        return this._m1.get(key);
    }
    getKey(value) {
        return this._m2.get(value);
    }
    delete(key) {
        const value = this._m1.get(key);
        if (value === undefined) {
            return false;
        }
        this._m1.delete(key);
        this._m2.delete(value);
        return true;
    }
    keys() {
        return this._m1.keys();
    }
    values() {
        return this._m1.values();
    }
}
class SetMap {
    constructor() {
        this.map = new Map();
    }
    add(key, value) {
        let values = this.map.get(key);
        if (!values) {
            values = new Set();
            this.map.set(key, values);
        }
        values.add(value);
    }
    delete(key, value) {
        const values = this.map.get(key);
        if (!values) {
            return;
        }
        values.delete(value);
        if (values.size === 0) {
            this.map.delete(key);
        }
    }
    forEach(key, fn) {
        const values = this.map.get(key);
        if (!values) {
            return;
        }
        values.forEach(fn);
    }
    get(key) {
        const values = this.map.get(key);
        if (!values) {
            return new Set();
        }
        return values;
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/diff/defaultLinesDiffComputer/linesSliceCharSequence.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/





class LinesSliceCharSequence {
    constructor(lines, lineRange, considerWhitespaceChanges) {
        // This slice has to have lineRange.length many \n! (otherwise diffing against an empty slice will be problematic)
        // (Unless it covers the entire document, in that case the other slice also has to cover the entire document ands it's okay)
        this.lines = lines;
        this.considerWhitespaceChanges = considerWhitespaceChanges;
        this.elements = [];
        this.firstCharOffsetByLine = [];
        // To account for trimming
        this.additionalOffsetByLine = [];
        // If the slice covers the end, but does not start at the beginning, we include just the \n of the previous line.
        let trimFirstLineFully = false;
        if (lineRange.start > 0 && lineRange.endExclusive >= lines.length) {
            lineRange = new OffsetRange(lineRange.start - 1, lineRange.endExclusive);
            trimFirstLineFully = true;
        }
        this.lineRange = lineRange;
        this.firstCharOffsetByLine[0] = 0;
        for (let i = this.lineRange.start; i < this.lineRange.endExclusive; i++) {
            let line = lines[i];
            let offset = 0;
            if (trimFirstLineFully) {
                offset = line.length;
                line = '';
                trimFirstLineFully = false;
            }
            else if (!considerWhitespaceChanges) {
                const trimmedStartLine = line.trimStart();
                offset = line.length - trimmedStartLine.length;
                line = trimmedStartLine.trimEnd();
            }
            this.additionalOffsetByLine.push(offset);
            for (let i = 0; i < line.length; i++) {
                this.elements.push(line.charCodeAt(i));
            }
            // Don't add an \n that does not exist in the document.
            if (i < lines.length - 1) {
                this.elements.push('\n'.charCodeAt(0));
                this.firstCharOffsetByLine[i - this.lineRange.start + 1] = this.elements.length;
            }
        }
        // To account for the last line
        this.additionalOffsetByLine.push(0);
    }
    toString() {
        return `Slice: "${this.text}"`;
    }
    get text() {
        return this.getText(new OffsetRange(0, this.length));
    }
    getText(range) {
        return this.elements.slice(range.start, range.endExclusive).map(e => String.fromCharCode(e)).join('');
    }
    getElement(offset) {
        return this.elements[offset];
    }
    get length() {
        return this.elements.length;
    }
    getBoundaryScore(length) {
        //   a   b   c   ,           d   e   f
        // 11  0   0   12  15  6   13  0   0   11
        const prevCategory = getCategory(length > 0 ? this.elements[length - 1] : -1);
        const nextCategory = getCategory(length < this.elements.length ? this.elements[length] : -1);
        if (prevCategory === 6 /* CharBoundaryCategory.LineBreakCR */ && nextCategory === 7 /* CharBoundaryCategory.LineBreakLF */) {
            // don't break between \r and \n
            return 0;
        }
        let score = 0;
        if (prevCategory !== nextCategory) {
            score += 10;
            if (prevCategory === 0 /* CharBoundaryCategory.WordLower */ && nextCategory === 1 /* CharBoundaryCategory.WordUpper */) {
                score += 1;
            }
        }
        score += getCategoryBoundaryScore(prevCategory);
        score += getCategoryBoundaryScore(nextCategory);
        return score;
    }
    translateOffset(offset) {
        // find smallest i, so that lineBreakOffsets[i] <= offset using binary search
        if (this.lineRange.isEmpty) {
            return new position_Position(this.lineRange.start + 1, 1);
        }
        const i = findLastIdxMonotonous(this.firstCharOffsetByLine, (value) => value <= offset);
        return new position_Position(this.lineRange.start + i + 1, offset - this.firstCharOffsetByLine[i] + this.additionalOffsetByLine[i] + 1);
    }
    translateRange(range) {
        return range_Range.fromPositions(this.translateOffset(range.start), this.translateOffset(range.endExclusive));
    }
    /**
     * Finds the word that contains the character at the given offset
     */
    findWordContaining(offset) {
        if (offset < 0 || offset >= this.elements.length) {
            return undefined;
        }
        if (!isWordChar(this.elements[offset])) {
            return undefined;
        }
        // find start
        let start = offset;
        while (start > 0 && isWordChar(this.elements[start - 1])) {
            start--;
        }
        // find end
        let end = offset;
        while (end < this.elements.length && isWordChar(this.elements[end])) {
            end++;
        }
        return new OffsetRange(start, end);
    }
    countLinesIn(range) {
        return this.translateOffset(range.endExclusive).lineNumber - this.translateOffset(range.start).lineNumber;
    }
    isStronglyEqual(offset1, offset2) {
        return this.elements[offset1] === this.elements[offset2];
    }
    extendToFullLines(range) {
        var _a, _b;
        const start = (_a = findLastMonotonous(this.firstCharOffsetByLine, x => x <= range.start)) !== null && _a !== void 0 ? _a : 0;
        const end = (_b = findFirstMonotonous(this.firstCharOffsetByLine, x => range.endExclusive <= x)) !== null && _b !== void 0 ? _b : this.elements.length;
        return new OffsetRange(start, end);
    }
}
function isWordChar(charCode) {
    return charCode >= 97 /* CharCode.a */ && charCode <= 122 /* CharCode.z */
        || charCode >= 65 /* CharCode.A */ && charCode <= 90 /* CharCode.Z */
        || charCode >= 48 /* CharCode.Digit0 */ && charCode <= 57 /* CharCode.Digit9 */;
}
const score = {
    [0 /* CharBoundaryCategory.WordLower */]: 0,
    [1 /* CharBoundaryCategory.WordUpper */]: 0,
    [2 /* CharBoundaryCategory.WordNumber */]: 0,
    [3 /* CharBoundaryCategory.End */]: 10,
    [4 /* CharBoundaryCategory.Other */]: 2,
    [5 /* CharBoundaryCategory.Space */]: 3,
    [6 /* CharBoundaryCategory.LineBreakCR */]: 10,
    [7 /* CharBoundaryCategory.LineBreakLF */]: 10,
};
function getCategoryBoundaryScore(category) {
    return score[category];
}
function getCategory(charCode) {
    if (charCode === 10 /* CharCode.LineFeed */) {
        return 7 /* CharBoundaryCategory.LineBreakLF */;
    }
    else if (charCode === 13 /* CharCode.CarriageReturn */) {
        return 6 /* CharBoundaryCategory.LineBreakCR */;
    }
    else if (isSpace(charCode)) {
        return 5 /* CharBoundaryCategory.Space */;
    }
    else if (charCode >= 97 /* CharCode.a */ && charCode <= 122 /* CharCode.z */) {
        return 0 /* CharBoundaryCategory.WordLower */;
    }
    else if (charCode >= 65 /* CharCode.A */ && charCode <= 90 /* CharCode.Z */) {
        return 1 /* CharBoundaryCategory.WordUpper */;
    }
    else if (charCode >= 48 /* CharCode.Digit0 */ && charCode <= 57 /* CharCode.Digit9 */) {
        return 2 /* CharBoundaryCategory.WordNumber */;
    }
    else if (charCode === -1) {
        return 3 /* CharBoundaryCategory.End */;
    }
    else {
        return 4 /* CharBoundaryCategory.Other */;
    }
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/diff/defaultLinesDiffComputer/computeMovedLines.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/










function computeMovedLines(changes, originalLines, modifiedLines, hashedOriginalLines, hashedModifiedLines, timeout) {
    let { moves, excludedChanges } = computeMovesFromSimpleDeletionsToSimpleInsertions(changes, originalLines, modifiedLines, timeout);
    if (!timeout.isValid()) {
        return [];
    }
    const filteredChanges = changes.filter(c => !excludedChanges.has(c));
    const unchangedMoves = computeUnchangedMoves(filteredChanges, hashedOriginalLines, hashedModifiedLines, originalLines, modifiedLines, timeout);
    pushMany(moves, unchangedMoves);
    moves = joinCloseConsecutiveMoves(moves);
    // Ignore too short moves
    moves = moves.filter(current => {
        const originalText = current.original.toOffsetRange().slice(originalLines).map(l => l.trim()).join('\n');
        return originalText.length >= 10;
    });
    moves = removeMovesInSameDiff(changes, moves);
    return moves;
}
function computeMovesFromSimpleDeletionsToSimpleInsertions(changes, originalLines, modifiedLines, timeout) {
    const moves = [];
    const deletions = changes
        .filter(c => c.modified.isEmpty && c.original.length >= 3)
        .map(d => new LineRangeFragment(d.original, originalLines, d));
    const insertions = new Set(changes
        .filter(c => c.original.isEmpty && c.modified.length >= 3)
        .map(d => new LineRangeFragment(d.modified, modifiedLines, d)));
    const excludedChanges = new Set();
    for (const deletion of deletions) {
        let highestSimilarity = -1;
        let best;
        for (const insertion of insertions) {
            const similarity = deletion.computeSimilarity(insertion);
            if (similarity > highestSimilarity) {
                highestSimilarity = similarity;
                best = insertion;
            }
        }
        if (highestSimilarity > 0.90 && best) {
            insertions.delete(best);
            moves.push(new LineRangeMapping(deletion.range, best.range));
            excludedChanges.add(deletion.source);
            excludedChanges.add(best.source);
        }
        if (!timeout.isValid()) {
            return { moves, excludedChanges };
        }
    }
    return { moves, excludedChanges };
}
function computeUnchangedMoves(changes, hashedOriginalLines, hashedModifiedLines, originalLines, modifiedLines, timeout) {
    const moves = [];
    const original3LineHashes = new SetMap();
    for (const change of changes) {
        for (let i = change.original.startLineNumber; i < change.original.endLineNumberExclusive - 2; i++) {
            const key = `${hashedOriginalLines[i - 1]}:${hashedOriginalLines[i + 1 - 1]}:${hashedOriginalLines[i + 2 - 1]}`;
            original3LineHashes.add(key, { range: new LineRange(i, i + 3) });
        }
    }
    const possibleMappings = [];
    changes.sort(compareBy(c => c.modified.startLineNumber, numberComparator));
    for (const change of changes) {
        let lastMappings = [];
        for (let i = change.modified.startLineNumber; i < change.modified.endLineNumberExclusive - 2; i++) {
            const key = `${hashedModifiedLines[i - 1]}:${hashedModifiedLines[i + 1 - 1]}:${hashedModifiedLines[i + 2 - 1]}`;
            const currentModifiedRange = new LineRange(i, i + 3);
            const nextMappings = [];
            original3LineHashes.forEach(key, ({ range }) => {
                for (const lastMapping of lastMappings) {
                    // does this match extend some last match?
                    if (lastMapping.originalLineRange.endLineNumberExclusive + 1 === range.endLineNumberExclusive &&
                        lastMapping.modifiedLineRange.endLineNumberExclusive + 1 === currentModifiedRange.endLineNumberExclusive) {
                        lastMapping.originalLineRange = new LineRange(lastMapping.originalLineRange.startLineNumber, range.endLineNumberExclusive);
                        lastMapping.modifiedLineRange = new LineRange(lastMapping.modifiedLineRange.startLineNumber, currentModifiedRange.endLineNumberExclusive);
                        nextMappings.push(lastMapping);
                        return;
                    }
                }
                const mapping = {
                    modifiedLineRange: currentModifiedRange,
                    originalLineRange: range,
                };
                possibleMappings.push(mapping);
                nextMappings.push(mapping);
            });
            lastMappings = nextMappings;
        }
        if (!timeout.isValid()) {
            return [];
        }
    }
    possibleMappings.sort(reverseOrder(compareBy(m => m.modifiedLineRange.length, numberComparator)));
    const modifiedSet = new LineRangeSet();
    const originalSet = new LineRangeSet();
    for (const mapping of possibleMappings) {
        const diffOrigToMod = mapping.modifiedLineRange.startLineNumber - mapping.originalLineRange.startLineNumber;
        const modifiedSections = modifiedSet.subtractFrom(mapping.modifiedLineRange);
        const originalTranslatedSections = originalSet.subtractFrom(mapping.originalLineRange).getWithDelta(diffOrigToMod);
        const modifiedIntersectedSections = modifiedSections.getIntersection(originalTranslatedSections);
        for (const s of modifiedIntersectedSections.ranges) {
            if (s.length < 3) {
                continue;
            }
            const modifiedLineRange = s;
            const originalLineRange = s.delta(-diffOrigToMod);
            moves.push(new LineRangeMapping(originalLineRange, modifiedLineRange));
            modifiedSet.addRange(modifiedLineRange);
            originalSet.addRange(originalLineRange);
        }
    }
    moves.sort(compareBy(m => m.original.startLineNumber, numberComparator));
    const monotonousChanges = new MonotonousArray(changes);
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        const firstTouchingChangeOrig = monotonousChanges.findLastMonotonous(c => c.original.startLineNumber <= move.original.startLineNumber);
        const firstTouchingChangeMod = findLastMonotonous(changes, c => c.modified.startLineNumber <= move.modified.startLineNumber);
        const linesAbove = Math.max(move.original.startLineNumber - firstTouchingChangeOrig.original.startLineNumber, move.modified.startLineNumber - firstTouchingChangeMod.modified.startLineNumber);
        const lastTouchingChangeOrig = monotonousChanges.findLastMonotonous(c => c.original.startLineNumber < move.original.endLineNumberExclusive);
        const lastTouchingChangeMod = findLastMonotonous(changes, c => c.modified.startLineNumber < move.modified.endLineNumberExclusive);
        const linesBelow = Math.max(lastTouchingChangeOrig.original.endLineNumberExclusive - move.original.endLineNumberExclusive, lastTouchingChangeMod.modified.endLineNumberExclusive - move.modified.endLineNumberExclusive);
        let extendToTop;
        for (extendToTop = 0; extendToTop < linesAbove; extendToTop++) {
            const origLine = move.original.startLineNumber - extendToTop - 1;
            const modLine = move.modified.startLineNumber - extendToTop - 1;
            if (origLine > originalLines.length || modLine > modifiedLines.length) {
                break;
            }
            if (modifiedSet.contains(modLine) || originalSet.contains(origLine)) {
                break;
            }
            if (!areLinesSimilar(originalLines[origLine - 1], modifiedLines[modLine - 1], timeout)) {
                break;
            }
        }
        if (extendToTop > 0) {
            originalSet.addRange(new LineRange(move.original.startLineNumber - extendToTop, move.original.startLineNumber));
            modifiedSet.addRange(new LineRange(move.modified.startLineNumber - extendToTop, move.modified.startLineNumber));
        }
        let extendToBottom;
        for (extendToBottom = 0; extendToBottom < linesBelow; extendToBottom++) {
            const origLine = move.original.endLineNumberExclusive + extendToBottom;
            const modLine = move.modified.endLineNumberExclusive + extendToBottom;
            if (origLine > originalLines.length || modLine > modifiedLines.length) {
                break;
            }
            if (modifiedSet.contains(modLine) || originalSet.contains(origLine)) {
                break;
            }
            if (!areLinesSimilar(originalLines[origLine - 1], modifiedLines[modLine - 1], timeout)) {
                break;
            }
        }
        if (extendToBottom > 0) {
            originalSet.addRange(new LineRange(move.original.endLineNumberExclusive, move.original.endLineNumberExclusive + extendToBottom));
            modifiedSet.addRange(new LineRange(move.modified.endLineNumberExclusive, move.modified.endLineNumberExclusive + extendToBottom));
        }
        if (extendToTop > 0 || extendToBottom > 0) {
            moves[i] = new LineRangeMapping(new LineRange(move.original.startLineNumber - extendToTop, move.original.endLineNumberExclusive + extendToBottom), new LineRange(move.modified.startLineNumber - extendToTop, move.modified.endLineNumberExclusive + extendToBottom));
        }
    }
    return moves;
}
function areLinesSimilar(line1, line2, timeout) {
    if (line1.trim() === line2.trim()) {
        return true;
    }
    if (line1.length > 300 && line2.length > 300) {
        return false;
    }
    const myersDiffingAlgorithm = new MyersDiffAlgorithm();
    const result = myersDiffingAlgorithm.compute(new LinesSliceCharSequence([line1], new OffsetRange(0, 1), false), new LinesSliceCharSequence([line2], new OffsetRange(0, 1), false), timeout);
    let commonNonSpaceCharCount = 0;
    const inverted = SequenceDiff.invert(result.diffs, line1.length);
    for (const seq of inverted) {
        seq.seq1Range.forEach(idx => {
            if (!isSpace(line1.charCodeAt(idx))) {
                commonNonSpaceCharCount++;
            }
        });
    }
    function countNonWsChars(str) {
        let count = 0;
        for (let i = 0; i < line1.length; i++) {
            if (!isSpace(str.charCodeAt(i))) {
                count++;
            }
        }
        return count;
    }
    const longerLineLength = countNonWsChars(line1.length > line2.length ? line1 : line2);
    const r = commonNonSpaceCharCount / longerLineLength > 0.6 && longerLineLength > 10;
    return r;
}
function joinCloseConsecutiveMoves(moves) {
    if (moves.length === 0) {
        return moves;
    }
    moves.sort(compareBy(m => m.original.startLineNumber, numberComparator));
    const result = [moves[0]];
    for (let i = 1; i < moves.length; i++) {
        const last = result[result.length - 1];
        const current = moves[i];
        const originalDist = current.original.startLineNumber - last.original.endLineNumberExclusive;
        const modifiedDist = current.modified.startLineNumber - last.modified.endLineNumberExclusive;
        const currentMoveAfterLast = originalDist >= 0 && modifiedDist >= 0;
        if (currentMoveAfterLast && originalDist + modifiedDist <= 2) {
            result[result.length - 1] = last.join(current);
            continue;
        }
        result.push(current);
    }
    return result;
}
function removeMovesInSameDiff(changes, moves) {
    const changesMonotonous = new MonotonousArray(changes);
    moves = moves.filter(m => {
        const diffBeforeEndOfMoveOriginal = changesMonotonous.findLastMonotonous(c => c.original.endLineNumberExclusive < m.original.endLineNumberExclusive)
            || new LineRangeMapping(new LineRange(1, 1), new LineRange(1, 1));
        const diffBeforeEndOfMoveModified = findLastMonotonous(changes, c => c.modified.endLineNumberExclusive < m.modified.endLineNumberExclusive);
        const differentDiffs = diffBeforeEndOfMoveOriginal !== diffBeforeEndOfMoveModified;
        return differentDiffs;
    });
    return moves;
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/diff/defaultLinesDiffComputer/heuristicSequenceOptimizations.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/



function optimizeSequenceDiffs(sequence1, sequence2, sequenceDiffs) {
    let result = sequenceDiffs;
    result = joinSequenceDiffsByShifting(sequence1, sequence2, result);
    result = shiftSequenceDiffs(sequence1, sequence2, result);
    return result;
}
/**
 * This function fixes issues like this:
 * ```
 * import { Baz, Bar } from "foo";
 * ```
 * <->
 * ```
 * import { Baz, Bar, Foo } from "foo";
 * ```
 * Computed diff: [ {Add "," after Bar}, {Add "Foo " after space} }
 * Improved diff: [{Add ", Foo" after Bar}]
 */
function joinSequenceDiffsByShifting(sequence1, sequence2, sequenceDiffs) {
    if (sequenceDiffs.length === 0) {
        return sequenceDiffs;
    }
    const result = [];
    result.push(sequenceDiffs[0]);
    // First move them all to the left as much as possible and join them if possible
    for (let i = 1; i < sequenceDiffs.length; i++) {
        const prevResult = result[result.length - 1];
        let cur = sequenceDiffs[i];
        if (cur.seq1Range.isEmpty || cur.seq2Range.isEmpty) {
            const length = cur.seq1Range.start - prevResult.seq1Range.endExclusive;
            let d;
            for (d = 1; d <= length; d++) {
                if (sequence1.getElement(cur.seq1Range.start - d) !== sequence1.getElement(cur.seq1Range.endExclusive - d) ||
                    sequence2.getElement(cur.seq2Range.start - d) !== sequence2.getElement(cur.seq2Range.endExclusive - d)) {
                    break;
                }
            }
            d--;
            if (d === length) {
                // Merge previous and current diff
                result[result.length - 1] = new SequenceDiff(new OffsetRange(prevResult.seq1Range.start, cur.seq1Range.endExclusive - length), new OffsetRange(prevResult.seq2Range.start, cur.seq2Range.endExclusive - length));
                continue;
            }
            cur = cur.delta(-d);
        }
        result.push(cur);
    }
    const result2 = [];
    // Then move them all to the right and join them again if possible
    for (let i = 0; i < result.length - 1; i++) {
        const nextResult = result[i + 1];
        let cur = result[i];
        if (cur.seq1Range.isEmpty || cur.seq2Range.isEmpty) {
            const length = nextResult.seq1Range.start - cur.seq1Range.endExclusive;
            let d;
            for (d = 0; d < length; d++) {
                if (!sequence1.isStronglyEqual(cur.seq1Range.start + d, cur.seq1Range.endExclusive + d) ||
                    !sequence2.isStronglyEqual(cur.seq2Range.start + d, cur.seq2Range.endExclusive + d)) {
                    break;
                }
            }
            if (d === length) {
                // Merge previous and current diff, write to result!
                result[i + 1] = new SequenceDiff(new OffsetRange(cur.seq1Range.start + length, nextResult.seq1Range.endExclusive), new OffsetRange(cur.seq2Range.start + length, nextResult.seq2Range.endExclusive));
                continue;
            }
            if (d > 0) {
                cur = cur.delta(d);
            }
        }
        result2.push(cur);
    }
    if (result.length > 0) {
        result2.push(result[result.length - 1]);
    }
    return result2;
}
// align character level diffs at whitespace characters
// import { IBar } from "foo";
// import { I[Arr, I]Bar } from "foo";
// ->
// import { [IArr, ]IBar } from "foo";
// import { ITransaction, observableValue, transaction } from 'vs/base/common/observable';
// import { ITransaction, observable[FromEvent, observable]Value, transaction } from 'vs/base/common/observable';
// ->
// import { ITransaction, [observableFromEvent, ]observableValue, transaction } from 'vs/base/common/observable';
// collectBrackets(level + 1, levelPerBracketType);
// collectBrackets(level + 1, levelPerBracket[ + 1, levelPerBracket]Type);
// ->
// collectBrackets(level + 1, [levelPerBracket + 1, ]levelPerBracketType);
function shiftSequenceDiffs(sequence1, sequence2, sequenceDiffs) {
    if (!sequence1.getBoundaryScore || !sequence2.getBoundaryScore) {
        return sequenceDiffs;
    }
    for (let i = 0; i < sequenceDiffs.length; i++) {
        const prevDiff = (i > 0 ? sequenceDiffs[i - 1] : undefined);
        const diff = sequenceDiffs[i];
        const nextDiff = (i + 1 < sequenceDiffs.length ? sequenceDiffs[i + 1] : undefined);
        const seq1ValidRange = new OffsetRange(prevDiff ? prevDiff.seq1Range.start + 1 : 0, nextDiff ? nextDiff.seq1Range.endExclusive - 1 : sequence1.length);
        const seq2ValidRange = new OffsetRange(prevDiff ? prevDiff.seq2Range.start + 1 : 0, nextDiff ? nextDiff.seq2Range.endExclusive - 1 : sequence2.length);
        if (diff.seq1Range.isEmpty) {
            sequenceDiffs[i] = shiftDiffToBetterPosition(diff, sequence1, sequence2, seq1ValidRange, seq2ValidRange);
        }
        else if (diff.seq2Range.isEmpty) {
            sequenceDiffs[i] = shiftDiffToBetterPosition(diff.swap(), sequence2, sequence1, seq2ValidRange, seq1ValidRange).swap();
        }
    }
    return sequenceDiffs;
}
function shiftDiffToBetterPosition(diff, sequence1, sequence2, seq1ValidRange, seq2ValidRange) {
    const maxShiftLimit = 100; // To prevent performance issues
    // don't touch previous or next!
    let deltaBefore = 1;
    while (diff.seq1Range.start - deltaBefore >= seq1ValidRange.start &&
        diff.seq2Range.start - deltaBefore >= seq2ValidRange.start &&
        sequence2.isStronglyEqual(diff.seq2Range.start - deltaBefore, diff.seq2Range.endExclusive - deltaBefore) && deltaBefore < maxShiftLimit) {
        deltaBefore++;
    }
    deltaBefore--;
    let deltaAfter = 0;
    while (diff.seq1Range.start + deltaAfter < seq1ValidRange.endExclusive &&
        diff.seq2Range.endExclusive + deltaAfter < seq2ValidRange.endExclusive &&
        sequence2.isStronglyEqual(diff.seq2Range.start + deltaAfter, diff.seq2Range.endExclusive + deltaAfter) && deltaAfter < maxShiftLimit) {
        deltaAfter++;
    }
    if (deltaBefore === 0 && deltaAfter === 0) {
        return diff;
    }
    // Visualize `[sequence1.text, diff.seq1Range.start + deltaAfter]`
    // and `[sequence2.text, diff.seq2Range.start + deltaAfter, diff.seq2Range.endExclusive + deltaAfter]`
    let bestDelta = 0;
    let bestScore = -1;
    // find best scored delta
    for (let delta = -deltaBefore; delta <= deltaAfter; delta++) {
        const seq2OffsetStart = diff.seq2Range.start + delta;
        const seq2OffsetEndExclusive = diff.seq2Range.endExclusive + delta;
        const seq1Offset = diff.seq1Range.start + delta;
        const score = sequence1.getBoundaryScore(seq1Offset) + sequence2.getBoundaryScore(seq2OffsetStart) + sequence2.getBoundaryScore(seq2OffsetEndExclusive);
        if (score > bestScore) {
            bestScore = score;
            bestDelta = delta;
        }
    }
    return diff.delta(bestDelta);
}
function removeShortMatches(sequence1, sequence2, sequenceDiffs) {
    const result = [];
    for (const s of sequenceDiffs) {
        const last = result[result.length - 1];
        if (!last) {
            result.push(s);
            continue;
        }
        if (s.seq1Range.start - last.seq1Range.endExclusive <= 2 || s.seq2Range.start - last.seq2Range.endExclusive <= 2) {
            result[result.length - 1] = new SequenceDiff(last.seq1Range.join(s.seq1Range), last.seq2Range.join(s.seq2Range));
        }
        else {
            result.push(s);
        }
    }
    return result;
}
function extendDiffsToEntireWordIfAppropriate(sequence1, sequence2, sequenceDiffs) {
    const additional = [];
    let lastModifiedWord = undefined;
    function maybePushWordToAdditional() {
        if (!lastModifiedWord) {
            return;
        }
        const originalLength1 = lastModifiedWord.s1Range.length - lastModifiedWord.deleted;
        const originalLength2 = lastModifiedWord.s2Range.length - lastModifiedWord.added;
        if (originalLength1 !== originalLength2) {
            // TODO figure out why this happens
        }
        if (Math.max(lastModifiedWord.deleted, lastModifiedWord.added) + (lastModifiedWord.count - 1) > originalLength1) {
            additional.push(new SequenceDiff(lastModifiedWord.s1Range, lastModifiedWord.s2Range));
        }
        lastModifiedWord = undefined;
    }
    for (const s of sequenceDiffs) {
        function processWord(s1Range, s2Range) {
            var _a, _b, _c, _d;
            if (!lastModifiedWord || !lastModifiedWord.s1Range.containsRange(s1Range) || !lastModifiedWord.s2Range.containsRange(s2Range)) {
                if (lastModifiedWord && !(lastModifiedWord.s1Range.endExclusive < s1Range.start && lastModifiedWord.s2Range.endExclusive < s2Range.start)) {
                    const s1Added = OffsetRange.tryCreate(lastModifiedWord.s1Range.endExclusive, s1Range.start);
                    const s2Added = OffsetRange.tryCreate(lastModifiedWord.s2Range.endExclusive, s2Range.start);
                    lastModifiedWord.deleted += (_a = s1Added === null || s1Added === void 0 ? void 0 : s1Added.length) !== null && _a !== void 0 ? _a : 0;
                    lastModifiedWord.added += (_b = s2Added === null || s2Added === void 0 ? void 0 : s2Added.length) !== null && _b !== void 0 ? _b : 0;
                    lastModifiedWord.s1Range = lastModifiedWord.s1Range.join(s1Range);
                    lastModifiedWord.s2Range = lastModifiedWord.s2Range.join(s2Range);
                }
                else {
                    maybePushWordToAdditional();
                    lastModifiedWord = { added: 0, deleted: 0, count: 0, s1Range: s1Range, s2Range: s2Range };
                }
            }
            const changedS1 = s1Range.intersect(s.seq1Range);
            const changedS2 = s2Range.intersect(s.seq2Range);
            lastModifiedWord.count++;
            lastModifiedWord.deleted += (_c = changedS1 === null || changedS1 === void 0 ? void 0 : changedS1.length) !== null && _c !== void 0 ? _c : 0;
            lastModifiedWord.added += (_d = changedS2 === null || changedS2 === void 0 ? void 0 : changedS2.length) !== null && _d !== void 0 ? _d : 0;
        }
        const w1Before = sequence1.findWordContaining(s.seq1Range.start - 1);
        const w2Before = sequence2.findWordContaining(s.seq2Range.start - 1);
        const w1After = sequence1.findWordContaining(s.seq1Range.endExclusive);
        const w2After = sequence2.findWordContaining(s.seq2Range.endExclusive);
        if (w1Before && w1After && w2Before && w2After && w1Before.equals(w1After) && w2Before.equals(w2After)) {
            processWord(w1Before, w2Before);
        }
        else {
            if (w1Before && w2Before) {
                processWord(w1Before, w2Before);
            }
            if (w1After && w2After) {
                processWord(w1After, w2After);
            }
        }
    }
    maybePushWordToAdditional();
    const merged = mergeSequenceDiffs(sequenceDiffs, additional);
    return merged;
}
function mergeSequenceDiffs(sequenceDiffs1, sequenceDiffs2) {
    const result = [];
    while (sequenceDiffs1.length > 0 || sequenceDiffs2.length > 0) {
        const sd1 = sequenceDiffs1[0];
        const sd2 = sequenceDiffs2[0];
        let next;
        if (sd1 && (!sd2 || sd1.seq1Range.start < sd2.seq1Range.start)) {
            next = sequenceDiffs1.shift();
        }
        else {
            next = sequenceDiffs2.shift();
        }
        if (result.length > 0 && result[result.length - 1].seq1Range.endExclusive >= next.seq1Range.start) {
            result[result.length - 1] = result[result.length - 1].join(next);
        }
        else {
            result.push(next);
        }
    }
    return result;
}
function removeVeryShortMatchingLinesBetweenDiffs(sequence1, _sequence2, sequenceDiffs) {
    let diffs = sequenceDiffs;
    if (diffs.length === 0) {
        return diffs;
    }
    let counter = 0;
    let shouldRepeat;
    do {
        shouldRepeat = false;
        const result = [
            diffs[0]
        ];
        for (let i = 1; i < diffs.length; i++) {
            const cur = diffs[i];
            const lastResult = result[result.length - 1];
            function shouldJoinDiffs(before, after) {
                const unchangedRange = new OffsetRange(lastResult.seq1Range.endExclusive, cur.seq1Range.start);
                const unchangedText = sequence1.getText(unchangedRange);
                const unchangedTextWithoutWs = unchangedText.replace(/\s/g, '');
                if (unchangedTextWithoutWs.length <= 4
                    && (before.seq1Range.length + before.seq2Range.length > 5 || after.seq1Range.length + after.seq2Range.length > 5)) {
                    return true;
                }
                return false;
            }
            const shouldJoin = shouldJoinDiffs(lastResult, cur);
            if (shouldJoin) {
                shouldRepeat = true;
                result[result.length - 1] = result[result.length - 1].join(cur);
            }
            else {
                result.push(cur);
            }
        }
        diffs = result;
    } while (counter++ < 10 && shouldRepeat);
    return diffs;
}
function removeVeryShortMatchingTextBetweenLongDiffs(sequence1, sequence2, sequenceDiffs) {
    let diffs = sequenceDiffs;
    if (diffs.length === 0) {
        return diffs;
    }
    let counter = 0;
    let shouldRepeat;
    do {
        shouldRepeat = false;
        const result = [
            diffs[0]
        ];
        for (let i = 1; i < diffs.length; i++) {
            const cur = diffs[i];
            const lastResult = result[result.length - 1];
            function shouldJoinDiffs(before, after) {
                const unchangedRange = new OffsetRange(lastResult.seq1Range.endExclusive, cur.seq1Range.start);
                const unchangedLineCount = sequence1.countLinesIn(unchangedRange);
                if (unchangedLineCount > 5 || unchangedRange.length > 500) {
                    return false;
                }
                const unchangedText = sequence1.getText(unchangedRange).trim();
                if (unchangedText.length > 20 || unchangedText.split(/\r\n|\r|\n/).length > 1) {
                    return false;
                }
                const beforeLineCount1 = sequence1.countLinesIn(before.seq1Range);
                const beforeSeq1Length = before.seq1Range.length;
                const beforeLineCount2 = sequence2.countLinesIn(before.seq2Range);
                const beforeSeq2Length = before.seq2Range.length;
                const afterLineCount1 = sequence1.countLinesIn(after.seq1Range);
                const afterSeq1Length = after.seq1Range.length;
                const afterLineCount2 = sequence2.countLinesIn(after.seq2Range);
                const afterSeq2Length = after.seq2Range.length;
                // TODO: Maybe a neural net can be used to derive the result from these numbers
                const max = 2 * 40 + 50;
                function cap(v) {
                    return Math.min(v, max);
                }
                if (Math.pow(Math.pow(cap(beforeLineCount1 * 40 + beforeSeq1Length), 1.5) + Math.pow(cap(beforeLineCount2 * 40 + beforeSeq2Length), 1.5), 1.5)
                    + Math.pow(Math.pow(cap(afterLineCount1 * 40 + afterSeq1Length), 1.5) + Math.pow(cap(afterLineCount2 * 40 + afterSeq2Length), 1.5), 1.5) > (Math.pow((Math.pow(max, 1.5)), 1.5)) * 1.3) {
                    return true;
                }
                return false;
            }
            const shouldJoin = shouldJoinDiffs(lastResult, cur);
            if (shouldJoin) {
                shouldRepeat = true;
                result[result.length - 1] = result[result.length - 1].join(cur);
            }
            else {
                result.push(cur);
            }
        }
        diffs = result;
    } while (counter++ < 10 && shouldRepeat);
    const newDiffs = [];
    // Remove short suffixes/prefixes
    forEachWithNeighbors(diffs, (prev, cur, next) => {
        let newDiff = cur;
        function shouldMarkAsChanged(text) {
            return text.length > 0 && text.trim().length <= 3 && cur.seq1Range.length + cur.seq2Range.length > 100;
        }
        const fullRange1 = sequence1.extendToFullLines(cur.seq1Range);
        const prefix = sequence1.getText(new OffsetRange(fullRange1.start, cur.seq1Range.start));
        if (shouldMarkAsChanged(prefix)) {
            newDiff = newDiff.deltaStart(-prefix.length);
        }
        const suffix = sequence1.getText(new OffsetRange(cur.seq1Range.endExclusive, fullRange1.endExclusive));
        if (shouldMarkAsChanged(suffix)) {
            newDiff = newDiff.deltaEnd(suffix.length);
        }
        const availableSpace = SequenceDiff.fromOffsetPairs(prev ? prev.getEndExclusives() : OffsetPair.zero, next ? next.getStarts() : OffsetPair.max);
        const result = newDiff.intersect(availableSpace);
        newDiffs.push(result);
    });
    return newDiffs;
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/diff/defaultLinesDiffComputer/lineSequence.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
class lineSequence_LineSequence {
    constructor(trimmedHash, lines) {
        this.trimmedHash = trimmedHash;
        this.lines = lines;
    }
    getElement(offset) {
        return this.trimmedHash[offset];
    }
    get length() {
        return this.trimmedHash.length;
    }
    getBoundaryScore(length) {
        const indentationBefore = length === 0 ? 0 : getIndentation(this.lines[length - 1]);
        const indentationAfter = length === this.lines.length ? 0 : getIndentation(this.lines[length]);
        return 1000 - (indentationBefore + indentationAfter);
    }
    getText(range) {
        return this.lines.slice(range.start, range.endExclusive).join('\n');
    }
    isStronglyEqual(offset1, offset2) {
        return this.lines[offset1] === this.lines[offset2];
    }
}
function getIndentation(str) {
    let i = 0;
    while (i < str.length && (str.charCodeAt(i) === 32 /* CharCode.Space */ || str.charCodeAt(i) === 9 /* CharCode.Tab */)) {
        i++;
    }
    return i;
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/diff/defaultLinesDiffComputer/defaultLinesDiffComputer.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/














class DefaultLinesDiffComputer {
    constructor() {
        this.dynamicProgrammingDiffing = new DynamicProgrammingDiffing();
        this.myersDiffingAlgorithm = new MyersDiffAlgorithm();
    }
    computeDiff(originalLines, modifiedLines, options) {
        if (originalLines.length <= 1 && arrays_equals(originalLines, modifiedLines, (a, b) => a === b)) {
            return new LinesDiff([], [], false);
        }
        if (originalLines.length === 1 && originalLines[0].length === 0 || modifiedLines.length === 1 && modifiedLines[0].length === 0) {
            return new LinesDiff([
                new DetailedLineRangeMapping(new LineRange(1, originalLines.length + 1), new LineRange(1, modifiedLines.length + 1), [
                    new RangeMapping(new range_Range(1, 1, originalLines.length, originalLines[0].length + 1), new range_Range(1, 1, modifiedLines.length, modifiedLines[0].length + 1))
                ])
            ], [], false);
        }
        const timeout = options.maxComputationTimeMs === 0 ? InfiniteTimeout.instance : new DateTimeout(options.maxComputationTimeMs);
        const considerWhitespaceChanges = !options.ignoreTrimWhitespace;
        const perfectHashes = new Map();
        function getOrCreateHash(text) {
            let hash = perfectHashes.get(text);
            if (hash === undefined) {
                hash = perfectHashes.size;
                perfectHashes.set(text, hash);
            }
            return hash;
        }
        const originalLinesHashes = originalLines.map((l) => getOrCreateHash(l.trim()));
        const modifiedLinesHashes = modifiedLines.map((l) => getOrCreateHash(l.trim()));
        const sequence1 = new lineSequence_LineSequence(originalLinesHashes, originalLines);
        const sequence2 = new lineSequence_LineSequence(modifiedLinesHashes, modifiedLines);
        const lineAlignmentResult = (() => {
            if (sequence1.length + sequence2.length < 1700) {
                // Use the improved algorithm for small files
                return this.dynamicProgrammingDiffing.compute(sequence1, sequence2, timeout, (offset1, offset2) => originalLines[offset1] === modifiedLines[offset2]
                    ? modifiedLines[offset2].length === 0
                        ? 0.1
                        : 1 + Math.log(1 + modifiedLines[offset2].length)
                    : 0.99);
            }
            return this.myersDiffingAlgorithm.compute(sequence1, sequence2);
        })();
        let lineAlignments = lineAlignmentResult.diffs;
        let hitTimeout = lineAlignmentResult.hitTimeout;
        lineAlignments = optimizeSequenceDiffs(sequence1, sequence2, lineAlignments);
        lineAlignments = removeVeryShortMatchingLinesBetweenDiffs(sequence1, sequence2, lineAlignments);
        const alignments = [];
        const scanForWhitespaceChanges = (equalLinesCount) => {
            if (!considerWhitespaceChanges) {
                return;
            }
            for (let i = 0; i < equalLinesCount; i++) {
                const seq1Offset = seq1LastStart + i;
                const seq2Offset = seq2LastStart + i;
                if (originalLines[seq1Offset] !== modifiedLines[seq2Offset]) {
                    // This is because of whitespace changes, diff these lines
                    const characterDiffs = this.refineDiff(originalLines, modifiedLines, new SequenceDiff(new OffsetRange(seq1Offset, seq1Offset + 1), new OffsetRange(seq2Offset, seq2Offset + 1)), timeout, considerWhitespaceChanges);
                    for (const a of characterDiffs.mappings) {
                        alignments.push(a);
                    }
                    if (characterDiffs.hitTimeout) {
                        hitTimeout = true;
                    }
                }
            }
        };
        let seq1LastStart = 0;
        let seq2LastStart = 0;
        for (const diff of lineAlignments) {
            assertFn(() => diff.seq1Range.start - seq1LastStart === diff.seq2Range.start - seq2LastStart);
            const equalLinesCount = diff.seq1Range.start - seq1LastStart;
            scanForWhitespaceChanges(equalLinesCount);
            seq1LastStart = diff.seq1Range.endExclusive;
            seq2LastStart = diff.seq2Range.endExclusive;
            const characterDiffs = this.refineDiff(originalLines, modifiedLines, diff, timeout, considerWhitespaceChanges);
            if (characterDiffs.hitTimeout) {
                hitTimeout = true;
            }
            for (const a of characterDiffs.mappings) {
                alignments.push(a);
            }
        }
        scanForWhitespaceChanges(originalLines.length - seq1LastStart);
        const changes = lineRangeMappingFromRangeMappings(alignments, originalLines, modifiedLines);
        let moves = [];
        if (options.computeMoves) {
            moves = this.computeMoves(changes, originalLines, modifiedLines, originalLinesHashes, modifiedLinesHashes, timeout, considerWhitespaceChanges);
        }
        // Make sure all ranges are valid
        assertFn(() => {
            function validatePosition(pos, lines) {
                if (pos.lineNumber < 1 || pos.lineNumber > lines.length) {
                    return false;
                }
                const line = lines[pos.lineNumber - 1];
                if (pos.column < 1 || pos.column > line.length + 1) {
                    return false;
                }
                return true;
            }
            function validateRange(range, lines) {
                if (range.startLineNumber < 1 || range.startLineNumber > lines.length + 1) {
                    return false;
                }
                if (range.endLineNumberExclusive < 1 || range.endLineNumberExclusive > lines.length + 1) {
                    return false;
                }
                return true;
            }
            for (const c of changes) {
                if (!c.innerChanges) {
                    return false;
                }
                for (const ic of c.innerChanges) {
                    const valid = validatePosition(ic.modifiedRange.getStartPosition(), modifiedLines) && validatePosition(ic.modifiedRange.getEndPosition(), modifiedLines) &&
                        validatePosition(ic.originalRange.getStartPosition(), originalLines) && validatePosition(ic.originalRange.getEndPosition(), originalLines);
                    if (!valid) {
                        return false;
                    }
                }
                if (!validateRange(c.modified, modifiedLines) || !validateRange(c.original, originalLines)) {
                    return false;
                }
            }
            return true;
        });
        return new LinesDiff(changes, moves, hitTimeout);
    }
    computeMoves(changes, originalLines, modifiedLines, hashedOriginalLines, hashedModifiedLines, timeout, considerWhitespaceChanges) {
        const moves = computeMovedLines(changes, originalLines, modifiedLines, hashedOriginalLines, hashedModifiedLines, timeout);
        const movesWithDiffs = moves.map(m => {
            const moveChanges = this.refineDiff(originalLines, modifiedLines, new SequenceDiff(m.original.toOffsetRange(), m.modified.toOffsetRange()), timeout, considerWhitespaceChanges);
            const mappings = lineRangeMappingFromRangeMappings(moveChanges.mappings, originalLines, modifiedLines, true);
            return new MovedText(m, mappings);
        });
        return movesWithDiffs;
    }
    refineDiff(originalLines, modifiedLines, diff, timeout, considerWhitespaceChanges) {
        const slice1 = new LinesSliceCharSequence(originalLines, diff.seq1Range, considerWhitespaceChanges);
        const slice2 = new LinesSliceCharSequence(modifiedLines, diff.seq2Range, considerWhitespaceChanges);
        const diffResult = slice1.length + slice2.length < 500
            ? this.dynamicProgrammingDiffing.compute(slice1, slice2, timeout)
            : this.myersDiffingAlgorithm.compute(slice1, slice2, timeout);
        let diffs = diffResult.diffs;
        diffs = optimizeSequenceDiffs(slice1, slice2, diffs);
        diffs = extendDiffsToEntireWordIfAppropriate(slice1, slice2, diffs);
        diffs = removeShortMatches(slice1, slice2, diffs);
        diffs = removeVeryShortMatchingTextBetweenLongDiffs(slice1, slice2, diffs);
        const result = diffs.map((d) => new RangeMapping(slice1.translateRange(d.seq1Range), slice2.translateRange(d.seq2Range)));
        // Assert: result applied on original should be the same as diff applied to original
        return {
            mappings: result,
            hitTimeout: diffResult.hitTimeout,
        };
    }
}
function lineRangeMappingFromRangeMappings(alignments, originalLines, modifiedLines, dontAssertStartLine = false) {
    const changes = [];
    for (const g of groupAdjacentBy(alignments.map(a => getLineRangeMapping(a, originalLines, modifiedLines)), (a1, a2) => a1.original.overlapOrTouch(a2.original)
        || a1.modified.overlapOrTouch(a2.modified))) {
        const first = g[0];
        const last = g[g.length - 1];
        changes.push(new DetailedLineRangeMapping(first.original.join(last.original), first.modified.join(last.modified), g.map(a => a.innerChanges[0])));
    }
    assertFn(() => {
        if (!dontAssertStartLine) {
            if (changes.length > 0 && changes[0].original.startLineNumber !== changes[0].modified.startLineNumber) {
                return false;
            }
        }
        return checkAdjacentItems(changes, (m1, m2) => m2.original.startLineNumber - m1.original.endLineNumberExclusive === m2.modified.startLineNumber - m1.modified.endLineNumberExclusive &&
            // There has to be an unchanged line in between (otherwise both diffs should have been joined)
            m1.original.endLineNumberExclusive < m2.original.startLineNumber &&
            m1.modified.endLineNumberExclusive < m2.modified.startLineNumber);
    });
    return changes;
}
function getLineRangeMapping(rangeMapping, originalLines, modifiedLines) {
    let lineStartDelta = 0;
    let lineEndDelta = 0;
    // rangeMapping describes the edit that replaces `rangeMapping.originalRange` with `newText := getText(modifiedLines, rangeMapping.modifiedRange)`.
    // original: ]xxx \n <- this line is not modified
    // modified: ]xx  \n
    if (rangeMapping.modifiedRange.endColumn === 1 && rangeMapping.originalRange.endColumn === 1
        && rangeMapping.originalRange.startLineNumber + lineStartDelta <= rangeMapping.originalRange.endLineNumber
        && rangeMapping.modifiedRange.startLineNumber + lineStartDelta <= rangeMapping.modifiedRange.endLineNumber) {
        // We can only do this if the range is not empty yet
        lineEndDelta = -1;
    }
    // original: xxx[ \n <- this line is not modified
    // modified: xxx[ \n
    if (rangeMapping.modifiedRange.startColumn - 1 >= modifiedLines[rangeMapping.modifiedRange.startLineNumber - 1].length
        && rangeMapping.originalRange.startColumn - 1 >= originalLines[rangeMapping.originalRange.startLineNumber - 1].length
        && rangeMapping.originalRange.startLineNumber <= rangeMapping.originalRange.endLineNumber + lineEndDelta
        && rangeMapping.modifiedRange.startLineNumber <= rangeMapping.modifiedRange.endLineNumber + lineEndDelta) {
        // We can only do this if the range is not empty yet
        lineStartDelta = 1;
    }
    const originalLineRange = new LineRange(rangeMapping.originalRange.startLineNumber + lineStartDelta, rangeMapping.originalRange.endLineNumber + 1 + lineEndDelta);
    const modifiedLineRange = new LineRange(rangeMapping.modifiedRange.startLineNumber + lineStartDelta, rangeMapping.modifiedRange.endLineNumber + 1 + lineEndDelta);
    return new DetailedLineRangeMapping(originalLineRange, modifiedLineRange, [rangeMapping]);
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/diff/linesDiffComputers.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


const linesDiffComputers = {
    getLegacy: () => new LegacyLinesDiffComputer(),
    getDefault: () => new DefaultLinesDiffComputer(),
};

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/base/common/color.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function roundFloat(number, decimalPoints) {
    const decimal = Math.pow(10, decimalPoints);
    return Math.round(number * decimal) / decimal;
}
class RGBA {
    constructor(r, g, b, a = 1) {
        this._rgbaBrand = undefined;
        this.r = Math.min(255, Math.max(0, r)) | 0;
        this.g = Math.min(255, Math.max(0, g)) | 0;
        this.b = Math.min(255, Math.max(0, b)) | 0;
        this.a = roundFloat(Math.max(Math.min(1, a), 0), 3);
    }
    static equals(a, b) {
        return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
    }
}
class HSLA {
    constructor(h, s, l, a) {
        this._hslaBrand = undefined;
        this.h = Math.max(Math.min(360, h), 0) | 0;
        this.s = roundFloat(Math.max(Math.min(1, s), 0), 3);
        this.l = roundFloat(Math.max(Math.min(1, l), 0), 3);
        this.a = roundFloat(Math.max(Math.min(1, a), 0), 3);
    }
    static equals(a, b) {
        return a.h === b.h && a.s === b.s && a.l === b.l && a.a === b.a;
    }
    /**
     * Converts an RGB color value to HSL. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes r, g, and b are contained in the set [0, 255] and
     * returns h in the set [0, 360], s, and l in the set [0, 1].
     */
    static fromRGBA(rgba) {
        const r = rgba.r / 255;
        const g = rgba.g / 255;
        const b = rgba.b / 255;
        const a = rgba.a;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;
        let s = 0;
        const l = (min + max) / 2;
        const chroma = max - min;
        if (chroma > 0) {
            s = Math.min((l <= 0.5 ? chroma / (2 * l) : chroma / (2 - (2 * l))), 1);
            switch (max) {
                case r:
                    h = (g - b) / chroma + (g < b ? 6 : 0);
                    break;
                case g:
                    h = (b - r) / chroma + 2;
                    break;
                case b:
                    h = (r - g) / chroma + 4;
                    break;
            }
            h *= 60;
            h = Math.round(h);
        }
        return new HSLA(h, s, l, a);
    }
    static _hue2rgb(p, q, t) {
        if (t < 0) {
            t += 1;
        }
        if (t > 1) {
            t -= 1;
        }
        if (t < 1 / 6) {
            return p + (q - p) * 6 * t;
        }
        if (t < 1 / 2) {
            return q;
        }
        if (t < 2 / 3) {
            return p + (q - p) * (2 / 3 - t) * 6;
        }
        return p;
    }
    /**
     * Converts an HSL color value to RGB. Conversion formula
     * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
     * Assumes h in the set [0, 360] s, and l are contained in the set [0, 1] and
     * returns r, g, and b in the set [0, 255].
     */
    static toRGBA(hsla) {
        const h = hsla.h / 360;
        const { s, l, a } = hsla;
        let r, g, b;
        if (s === 0) {
            r = g = b = l; // achromatic
        }
        else {
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = HSLA._hue2rgb(p, q, h + 1 / 3);
            g = HSLA._hue2rgb(p, q, h);
            b = HSLA._hue2rgb(p, q, h - 1 / 3);
        }
        return new RGBA(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255), a);
    }
}
class HSVA {
    constructor(h, s, v, a) {
        this._hsvaBrand = undefined;
        this.h = Math.max(Math.min(360, h), 0) | 0;
        this.s = roundFloat(Math.max(Math.min(1, s), 0), 3);
        this.v = roundFloat(Math.max(Math.min(1, v), 0), 3);
        this.a = roundFloat(Math.max(Math.min(1, a), 0), 3);
    }
    static equals(a, b) {
        return a.h === b.h && a.s === b.s && a.v === b.v && a.a === b.a;
    }
    // from http://www.rapidtables.com/convert/color/rgb-to-hsv.htm
    static fromRGBA(rgba) {
        const r = rgba.r / 255;
        const g = rgba.g / 255;
        const b = rgba.b / 255;
        const cmax = Math.max(r, g, b);
        const cmin = Math.min(r, g, b);
        const delta = cmax - cmin;
        const s = cmax === 0 ? 0 : (delta / cmax);
        let m;
        if (delta === 0) {
            m = 0;
        }
        else if (cmax === r) {
            m = ((((g - b) / delta) % 6) + 6) % 6;
        }
        else if (cmax === g) {
            m = ((b - r) / delta) + 2;
        }
        else {
            m = ((r - g) / delta) + 4;
        }
        return new HSVA(Math.round(m * 60), s, cmax, rgba.a);
    }
    // from http://www.rapidtables.com/convert/color/hsv-to-rgb.htm
    static toRGBA(hsva) {
        const { h, s, v, a } = hsva;
        const c = v * s;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = v - c;
        let [r, g, b] = [0, 0, 0];
        if (h < 60) {
            r = c;
            g = x;
        }
        else if (h < 120) {
            r = x;
            g = c;
        }
        else if (h < 180) {
            g = c;
            b = x;
        }
        else if (h < 240) {
            g = x;
            b = c;
        }
        else if (h < 300) {
            r = x;
            b = c;
        }
        else if (h <= 360) {
            r = c;
            b = x;
        }
        r = Math.round((r + m) * 255);
        g = Math.round((g + m) * 255);
        b = Math.round((b + m) * 255);
        return new RGBA(r, g, b, a);
    }
}
class Color {
    static fromHex(hex) {
        return Color.Format.CSS.parseHex(hex) || Color.red;
    }
    static equals(a, b) {
        if (!a && !b) {
            return true;
        }
        if (!a || !b) {
            return false;
        }
        return a.equals(b);
    }
    get hsla() {
        if (this._hsla) {
            return this._hsla;
        }
        else {
            return HSLA.fromRGBA(this.rgba);
        }
    }
    get hsva() {
        if (this._hsva) {
            return this._hsva;
        }
        return HSVA.fromRGBA(this.rgba);
    }
    constructor(arg) {
        if (!arg) {
            throw new Error('Color needs a value');
        }
        else if (arg instanceof RGBA) {
            this.rgba = arg;
        }
        else if (arg instanceof HSLA) {
            this._hsla = arg;
            this.rgba = HSLA.toRGBA(arg);
        }
        else if (arg instanceof HSVA) {
            this._hsva = arg;
            this.rgba = HSVA.toRGBA(arg);
        }
        else {
            throw new Error('Invalid color ctor argument');
        }
    }
    equals(other) {
        return !!other && RGBA.equals(this.rgba, other.rgba) && HSLA.equals(this.hsla, other.hsla) && HSVA.equals(this.hsva, other.hsva);
    }
    /**
     * http://www.w3.org/TR/WCAG20/#relativeluminancedef
     * Returns the number in the set [0, 1]. O => Darkest Black. 1 => Lightest white.
     */
    getRelativeLuminance() {
        const R = Color._relativeLuminanceForComponent(this.rgba.r);
        const G = Color._relativeLuminanceForComponent(this.rgba.g);
        const B = Color._relativeLuminanceForComponent(this.rgba.b);
        const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;
        return roundFloat(luminance, 4);
    }
    static _relativeLuminanceForComponent(color) {
        const c = color / 255;
        return (c <= 0.03928) ? c / 12.92 : Math.pow(((c + 0.055) / 1.055), 2.4);
    }
    /**
     *	http://24ways.org/2010/calculating-color-contrast
     *  Return 'true' if lighter color otherwise 'false'
     */
    isLighter() {
        const yiq = (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1000;
        return yiq >= 128;
    }
    isLighterThan(another) {
        const lum1 = this.getRelativeLuminance();
        const lum2 = another.getRelativeLuminance();
        return lum1 > lum2;
    }
    isDarkerThan(another) {
        const lum1 = this.getRelativeLuminance();
        const lum2 = another.getRelativeLuminance();
        return lum1 < lum2;
    }
    lighten(factor) {
        return new Color(new HSLA(this.hsla.h, this.hsla.s, this.hsla.l + this.hsla.l * factor, this.hsla.a));
    }
    darken(factor) {
        return new Color(new HSLA(this.hsla.h, this.hsla.s, this.hsla.l - this.hsla.l * factor, this.hsla.a));
    }
    transparent(factor) {
        const { r, g, b, a } = this.rgba;
        return new Color(new RGBA(r, g, b, a * factor));
    }
    isTransparent() {
        return this.rgba.a === 0;
    }
    isOpaque() {
        return this.rgba.a === 1;
    }
    opposite() {
        return new Color(new RGBA(255 - this.rgba.r, 255 - this.rgba.g, 255 - this.rgba.b, this.rgba.a));
    }
    makeOpaque(opaqueBackground) {
        if (this.isOpaque() || opaqueBackground.rgba.a !== 1) {
            // only allow to blend onto a non-opaque color onto a opaque color
            return this;
        }
        const { r, g, b, a } = this.rgba;
        // https://stackoverflow.com/questions/12228548/finding-equivalent-color-with-opacity
        return new Color(new RGBA(opaqueBackground.rgba.r - a * (opaqueBackground.rgba.r - r), opaqueBackground.rgba.g - a * (opaqueBackground.rgba.g - g), opaqueBackground.rgba.b - a * (opaqueBackground.rgba.b - b), 1));
    }
    toString() {
        if (!this._toString) {
            this._toString = Color.Format.CSS.format(this);
        }
        return this._toString;
    }
    static getLighterColor(of, relative, factor) {
        if (of.isLighterThan(relative)) {
            return of;
        }
        factor = factor ? factor : 0.5;
        const lum1 = of.getRelativeLuminance();
        const lum2 = relative.getRelativeLuminance();
        factor = factor * (lum2 - lum1) / lum2;
        return of.lighten(factor);
    }
    static getDarkerColor(of, relative, factor) {
        if (of.isDarkerThan(relative)) {
            return of;
        }
        factor = factor ? factor : 0.5;
        const lum1 = of.getRelativeLuminance();
        const lum2 = relative.getRelativeLuminance();
        factor = factor * (lum1 - lum2) / lum1;
        return of.darken(factor);
    }
}
Color.white = new Color(new RGBA(255, 255, 255, 1));
Color.black = new Color(new RGBA(0, 0, 0, 1));
Color.red = new Color(new RGBA(255, 0, 0, 1));
Color.blue = new Color(new RGBA(0, 0, 255, 1));
Color.green = new Color(new RGBA(0, 255, 0, 1));
Color.cyan = new Color(new RGBA(0, 255, 255, 1));
Color.lightgrey = new Color(new RGBA(211, 211, 211, 1));
Color.transparent = new Color(new RGBA(0, 0, 0, 0));
(function (Color) {
    let Format;
    (function (Format) {
        let CSS;
        (function (CSS) {
            function formatRGB(color) {
                if (color.rgba.a === 1) {
                    return `rgb(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b})`;
                }
                return Color.Format.CSS.formatRGBA(color);
            }
            CSS.formatRGB = formatRGB;
            function formatRGBA(color) {
                return `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, ${+(color.rgba.a).toFixed(2)})`;
            }
            CSS.formatRGBA = formatRGBA;
            function formatHSL(color) {
                if (color.hsla.a === 1) {
                    return `hsl(${color.hsla.h}, ${(color.hsla.s * 100).toFixed(2)}%, ${(color.hsla.l * 100).toFixed(2)}%)`;
                }
                return Color.Format.CSS.formatHSLA(color);
            }
            CSS.formatHSL = formatHSL;
            function formatHSLA(color) {
                return `hsla(${color.hsla.h}, ${(color.hsla.s * 100).toFixed(2)}%, ${(color.hsla.l * 100).toFixed(2)}%, ${color.hsla.a.toFixed(2)})`;
            }
            CSS.formatHSLA = formatHSLA;
            function _toTwoDigitHex(n) {
                const r = n.toString(16);
                return r.length !== 2 ? '0' + r : r;
            }
            /**
             * Formats the color as #RRGGBB
             */
            function formatHex(color) {
                return `#${_toTwoDigitHex(color.rgba.r)}${_toTwoDigitHex(color.rgba.g)}${_toTwoDigitHex(color.rgba.b)}`;
            }
            CSS.formatHex = formatHex;
            /**
             * Formats the color as #RRGGBBAA
             * If 'compact' is set, colors without transparancy will be printed as #RRGGBB
             */
            function formatHexA(color, compact = false) {
                if (compact && color.rgba.a === 1) {
                    return Color.Format.CSS.formatHex(color);
                }
                return `#${_toTwoDigitHex(color.rgba.r)}${_toTwoDigitHex(color.rgba.g)}${_toTwoDigitHex(color.rgba.b)}${_toTwoDigitHex(Math.round(color.rgba.a * 255))}`;
            }
            CSS.formatHexA = formatHexA;
            /**
             * The default format will use HEX if opaque and RGBA otherwise.
             */
            function format(color) {
                if (color.isOpaque()) {
                    return Color.Format.CSS.formatHex(color);
                }
                return Color.Format.CSS.formatRGBA(color);
            }
            CSS.format = format;
            /**
             * Converts an Hex color value to a Color.
             * returns r, g, and b are contained in the set [0, 255]
             * @param hex string (#RGB, #RGBA, #RRGGBB or #RRGGBBAA).
             */
            function parseHex(hex) {
                const length = hex.length;
                if (length === 0) {
                    // Invalid color
                    return null;
                }
                if (hex.charCodeAt(0) !== 35 /* CharCode.Hash */) {
                    // Does not begin with a #
                    return null;
                }
                if (length === 7) {
                    // #RRGGBB format
                    const r = 16 * _parseHexDigit(hex.charCodeAt(1)) + _parseHexDigit(hex.charCodeAt(2));
                    const g = 16 * _parseHexDigit(hex.charCodeAt(3)) + _parseHexDigit(hex.charCodeAt(4));
                    const b = 16 * _parseHexDigit(hex.charCodeAt(5)) + _parseHexDigit(hex.charCodeAt(6));
                    return new Color(new RGBA(r, g, b, 1));
                }
                if (length === 9) {
                    // #RRGGBBAA format
                    const r = 16 * _parseHexDigit(hex.charCodeAt(1)) + _parseHexDigit(hex.charCodeAt(2));
                    const g = 16 * _parseHexDigit(hex.charCodeAt(3)) + _parseHexDigit(hex.charCodeAt(4));
                    const b = 16 * _parseHexDigit(hex.charCodeAt(5)) + _parseHexDigit(hex.charCodeAt(6));
                    const a = 16 * _parseHexDigit(hex.charCodeAt(7)) + _parseHexDigit(hex.charCodeAt(8));
                    return new Color(new RGBA(r, g, b, a / 255));
                }
                if (length === 4) {
                    // #RGB format
                    const r = _parseHexDigit(hex.charCodeAt(1));
                    const g = _parseHexDigit(hex.charCodeAt(2));
                    const b = _parseHexDigit(hex.charCodeAt(3));
                    return new Color(new RGBA(16 * r + r, 16 * g + g, 16 * b + b));
                }
                if (length === 5) {
                    // #RGBA format
                    const r = _parseHexDigit(hex.charCodeAt(1));
                    const g = _parseHexDigit(hex.charCodeAt(2));
                    const b = _parseHexDigit(hex.charCodeAt(3));
                    const a = _parseHexDigit(hex.charCodeAt(4));
                    return new Color(new RGBA(16 * r + r, 16 * g + g, 16 * b + b, (16 * a + a) / 255));
                }
                // Invalid color
                return null;
            }
            CSS.parseHex = parseHex;
            function _parseHexDigit(charCode) {
                switch (charCode) {
                    case 48 /* CharCode.Digit0 */: return 0;
                    case 49 /* CharCode.Digit1 */: return 1;
                    case 50 /* CharCode.Digit2 */: return 2;
                    case 51 /* CharCode.Digit3 */: return 3;
                    case 52 /* CharCode.Digit4 */: return 4;
                    case 53 /* CharCode.Digit5 */: return 5;
                    case 54 /* CharCode.Digit6 */: return 6;
                    case 55 /* CharCode.Digit7 */: return 7;
                    case 56 /* CharCode.Digit8 */: return 8;
                    case 57 /* CharCode.Digit9 */: return 9;
                    case 97 /* CharCode.a */: return 10;
                    case 65 /* CharCode.A */: return 10;
                    case 98 /* CharCode.b */: return 11;
                    case 66 /* CharCode.B */: return 11;
                    case 99 /* CharCode.c */: return 12;
                    case 67 /* CharCode.C */: return 12;
                    case 100 /* CharCode.d */: return 13;
                    case 68 /* CharCode.D */: return 13;
                    case 101 /* CharCode.e */: return 14;
                    case 69 /* CharCode.E */: return 14;
                    case 102 /* CharCode.f */: return 15;
                    case 70 /* CharCode.F */: return 15;
                }
                return 0;
            }
        })(CSS = Format.CSS || (Format.CSS = {}));
    })(Format = Color.Format || (Color.Format = {}));
})(Color || (Color = {}));

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/languages/defaultDocumentColorsComputer.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

function _parseCaptureGroups(captureGroups) {
    const values = [];
    for (const captureGroup of captureGroups) {
        const parsedNumber = Number(captureGroup);
        if (parsedNumber || parsedNumber === 0 && captureGroup.replace(/\s/g, '') !== '') {
            values.push(parsedNumber);
        }
    }
    return values;
}
function _toIColor(r, g, b, a) {
    return {
        red: r / 255,
        blue: b / 255,
        green: g / 255,
        alpha: a
    };
}
function _findRange(model, match) {
    const index = match.index;
    const length = match[0].length;
    if (!index) {
        return;
    }
    const startPosition = model.positionAt(index);
    const range = {
        startLineNumber: startPosition.lineNumber,
        startColumn: startPosition.column,
        endLineNumber: startPosition.lineNumber,
        endColumn: startPosition.column + length
    };
    return range;
}
function _findHexColorInformation(range, hexValue) {
    if (!range) {
        return;
    }
    const parsedHexColor = Color.Format.CSS.parseHex(hexValue);
    if (!parsedHexColor) {
        return;
    }
    return {
        range: range,
        color: _toIColor(parsedHexColor.rgba.r, parsedHexColor.rgba.g, parsedHexColor.rgba.b, parsedHexColor.rgba.a)
    };
}
function _findRGBColorInformation(range, matches, isAlpha) {
    if (!range || matches.length !== 1) {
        return;
    }
    const match = matches[0];
    const captureGroups = match.values();
    const parsedRegex = _parseCaptureGroups(captureGroups);
    return {
        range: range,
        color: _toIColor(parsedRegex[0], parsedRegex[1], parsedRegex[2], isAlpha ? parsedRegex[3] : 1)
    };
}
function _findHSLColorInformation(range, matches, isAlpha) {
    if (!range || matches.length !== 1) {
        return;
    }
    const match = matches[0];
    const captureGroups = match.values();
    const parsedRegex = _parseCaptureGroups(captureGroups);
    const colorEquivalent = new Color(new HSLA(parsedRegex[0], parsedRegex[1] / 100, parsedRegex[2] / 100, isAlpha ? parsedRegex[3] : 1));
    return {
        range: range,
        color: _toIColor(colorEquivalent.rgba.r, colorEquivalent.rgba.g, colorEquivalent.rgba.b, colorEquivalent.rgba.a)
    };
}
function _findMatches(model, regex) {
    if (typeof model === 'string') {
        return [...model.matchAll(regex)];
    }
    else {
        return model.findMatches(regex);
    }
}
function computeColors(model) {
    const result = [];
    // Early validation for RGB and HSL
    const initialValidationRegex = /\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%]*\))|(#)([A-Fa-f0-9]{3})\b|(#)([A-Fa-f0-9]{4})\b|(#)([A-Fa-f0-9]{6})\b|(#)([A-Fa-f0-9]{8})\b/gm;
    const initialValidationMatches = _findMatches(model, initialValidationRegex);
    // Potential colors have been found, validate the parameters
    if (initialValidationMatches.length > 0) {
        for (const initialMatch of initialValidationMatches) {
            const initialCaptureGroups = initialMatch.filter(captureGroup => captureGroup !== undefined);
            const colorScheme = initialCaptureGroups[1];
            const colorParameters = initialCaptureGroups[2];
            if (!colorParameters) {
                continue;
            }
            let colorInformation;
            if (colorScheme === 'rgb') {
                const regexParameters = /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm;
                colorInformation = _findRGBColorInformation(_findRange(model, initialMatch), _findMatches(colorParameters, regexParameters), false);
            }
            else if (colorScheme === 'rgba') {
                const regexParameters = /^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
                colorInformation = _findRGBColorInformation(_findRange(model, initialMatch), _findMatches(colorParameters, regexParameters), true);
            }
            else if (colorScheme === 'hsl') {
                const regexParameters = /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm;
                colorInformation = _findHSLColorInformation(_findRange(model, initialMatch), _findMatches(colorParameters, regexParameters), false);
            }
            else if (colorScheme === 'hsla') {
                const regexParameters = /^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
                colorInformation = _findHSLColorInformation(_findRange(model, initialMatch), _findMatches(colorParameters, regexParameters), true);
            }
            else if (colorScheme === '#') {
                colorInformation = _findHexColorInformation(_findRange(model, initialMatch), colorScheme + colorParameters);
            }
            if (colorInformation) {
                result.push(colorInformation);
            }
        }
    }
    return result;
}
/**
 * Returns an array of all default document colors in the provided document
 */
function computeDefaultDocumentColors(model) {
    if (!model || typeof model.getValue !== 'function' || typeof model.positionAt !== 'function') {
        // Unknown caller!
        return [];
    }
    return computeColors(model);
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/common/services/editorSimpleWorker.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var editorSimpleWorker_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};














/**
 * @internal
 */
class MirrorModel extends MirrorTextModel {
    get uri() {
        return this._uri;
    }
    get eol() {
        return this._eol;
    }
    getValue() {
        return this.getText();
    }
    findMatches(regex) {
        const matches = [];
        for (let i = 0; i < this._lines.length; i++) {
            const line = this._lines[i];
            const offsetToAdd = this.offsetAt(new position_Position(i + 1, 1));
            const iteratorOverMatches = line.matchAll(regex);
            for (const match of iteratorOverMatches) {
                if (match.index || match.index === 0) {
                    match.index = match.index + offsetToAdd;
                }
                matches.push(match);
            }
        }
        return matches;
    }
    getLinesContent() {
        return this._lines.slice(0);
    }
    getLineCount() {
        return this._lines.length;
    }
    getLineContent(lineNumber) {
        return this._lines[lineNumber - 1];
    }
    getWordAtPosition(position, wordDefinition) {
        const wordAtText = getWordAtText(position.column, ensureValidWordDefinition(wordDefinition), this._lines[position.lineNumber - 1], 0);
        if (wordAtText) {
            return new range_Range(position.lineNumber, wordAtText.startColumn, position.lineNumber, wordAtText.endColumn);
        }
        return null;
    }
    words(wordDefinition) {
        const lines = this._lines;
        const wordenize = this._wordenize.bind(this);
        let lineNumber = 0;
        let lineText = '';
        let wordRangesIdx = 0;
        let wordRanges = [];
        return {
            *[Symbol.iterator]() {
                while (true) {
                    if (wordRangesIdx < wordRanges.length) {
                        const value = lineText.substring(wordRanges[wordRangesIdx].start, wordRanges[wordRangesIdx].end);
                        wordRangesIdx += 1;
                        yield value;
                    }
                    else {
                        if (lineNumber < lines.length) {
                            lineText = lines[lineNumber];
                            wordRanges = wordenize(lineText, wordDefinition);
                            wordRangesIdx = 0;
                            lineNumber += 1;
                        }
                        else {
                            break;
                        }
                    }
                }
            }
        };
    }
    getLineWords(lineNumber, wordDefinition) {
        const content = this._lines[lineNumber - 1];
        const ranges = this._wordenize(content, wordDefinition);
        const words = [];
        for (const range of ranges) {
            words.push({
                word: content.substring(range.start, range.end),
                startColumn: range.start + 1,
                endColumn: range.end + 1
            });
        }
        return words;
    }
    _wordenize(content, wordDefinition) {
        const result = [];
        let match;
        wordDefinition.lastIndex = 0; // reset lastIndex just to be sure
        while (match = wordDefinition.exec(content)) {
            if (match[0].length === 0) {
                // it did match the empty string
                break;
            }
            result.push({ start: match.index, end: match.index + match[0].length });
        }
        return result;
    }
    getValueInRange(range) {
        range = this._validateRange(range);
        if (range.startLineNumber === range.endLineNumber) {
            return this._lines[range.startLineNumber - 1].substring(range.startColumn - 1, range.endColumn - 1);
        }
        const lineEnding = this._eol;
        const startLineIndex = range.startLineNumber - 1;
        const endLineIndex = range.endLineNumber - 1;
        const resultLines = [];
        resultLines.push(this._lines[startLineIndex].substring(range.startColumn - 1));
        for (let i = startLineIndex + 1; i < endLineIndex; i++) {
            resultLines.push(this._lines[i]);
        }
        resultLines.push(this._lines[endLineIndex].substring(0, range.endColumn - 1));
        return resultLines.join(lineEnding);
    }
    offsetAt(position) {
        position = this._validatePosition(position);
        this._ensureLineStarts();
        return this._lineStarts.getPrefixSum(position.lineNumber - 2) + (position.column - 1);
    }
    positionAt(offset) {
        offset = Math.floor(offset);
        offset = Math.max(0, offset);
        this._ensureLineStarts();
        const out = this._lineStarts.getIndexOf(offset);
        const lineLength = this._lines[out.index].length;
        // Ensure we return a valid position
        return {
            lineNumber: 1 + out.index,
            column: 1 + Math.min(out.remainder, lineLength)
        };
    }
    _validateRange(range) {
        const start = this._validatePosition({ lineNumber: range.startLineNumber, column: range.startColumn });
        const end = this._validatePosition({ lineNumber: range.endLineNumber, column: range.endColumn });
        if (start.lineNumber !== range.startLineNumber
            || start.column !== range.startColumn
            || end.lineNumber !== range.endLineNumber
            || end.column !== range.endColumn) {
            return {
                startLineNumber: start.lineNumber,
                startColumn: start.column,
                endLineNumber: end.lineNumber,
                endColumn: end.column
            };
        }
        return range;
    }
    _validatePosition(position) {
        if (!position_Position.isIPosition(position)) {
            throw new Error('bad position');
        }
        let { lineNumber, column } = position;
        let hasChanged = false;
        if (lineNumber < 1) {
            lineNumber = 1;
            column = 1;
            hasChanged = true;
        }
        else if (lineNumber > this._lines.length) {
            lineNumber = this._lines.length;
            column = this._lines[lineNumber - 1].length + 1;
            hasChanged = true;
        }
        else {
            const maxCharacter = this._lines[lineNumber - 1].length + 1;
            if (column < 1) {
                column = 1;
                hasChanged = true;
            }
            else if (column > maxCharacter) {
                column = maxCharacter;
                hasChanged = true;
            }
        }
        if (!hasChanged) {
            return position;
        }
        else {
            return { lineNumber, column };
        }
    }
}
/**
 * @internal
 */
class EditorSimpleWorker {
    constructor(host, foreignModuleFactory) {
        this._host = host;
        this._models = Object.create(null);
        this._foreignModuleFactory = foreignModuleFactory;
        this._foreignModule = null;
    }
    dispose() {
        this._models = Object.create(null);
    }
    _getModel(uri) {
        return this._models[uri];
    }
    _getModels() {
        const all = [];
        Object.keys(this._models).forEach((key) => all.push(this._models[key]));
        return all;
    }
    acceptNewModel(data) {
        this._models[data.url] = new MirrorModel(uri_URI.parse(data.url), data.lines, data.EOL, data.versionId);
    }
    acceptModelChanged(strURL, e) {
        if (!this._models[strURL]) {
            return;
        }
        const model = this._models[strURL];
        model.onEvents(e);
    }
    acceptRemovedModel(strURL) {
        if (!this._models[strURL]) {
            return;
        }
        delete this._models[strURL];
    }
    computeUnicodeHighlights(url, options, range) {
        return editorSimpleWorker_awaiter(this, void 0, void 0, function* () {
            const model = this._getModel(url);
            if (!model) {
                return { ranges: [], hasMore: false, ambiguousCharacterCount: 0, invisibleCharacterCount: 0, nonBasicAsciiCharacterCount: 0 };
            }
            return UnicodeTextModelHighlighter.computeUnicodeHighlights(model, options, range);
        });
    }
    // ---- BEGIN diff --------------------------------------------------------------------------
    computeDiff(originalUrl, modifiedUrl, options, algorithm) {
        return editorSimpleWorker_awaiter(this, void 0, void 0, function* () {
            const original = this._getModel(originalUrl);
            const modified = this._getModel(modifiedUrl);
            if (!original || !modified) {
                return null;
            }
            return EditorSimpleWorker.computeDiff(original, modified, options, algorithm);
        });
    }
    static computeDiff(originalTextModel, modifiedTextModel, options, algorithm) {
        const diffAlgorithm = algorithm === 'advanced' ? linesDiffComputers.getDefault() : linesDiffComputers.getLegacy();
        const originalLines = originalTextModel.getLinesContent();
        const modifiedLines = modifiedTextModel.getLinesContent();
        const result = diffAlgorithm.computeDiff(originalLines, modifiedLines, options);
        const identical = (result.changes.length > 0 ? false : this._modelsAreIdentical(originalTextModel, modifiedTextModel));
        function getLineChanges(changes) {
            return changes.map(m => {
                var _a;
                return ([m.original.startLineNumber, m.original.endLineNumberExclusive, m.modified.startLineNumber, m.modified.endLineNumberExclusive, (_a = m.innerChanges) === null || _a === void 0 ? void 0 : _a.map(m => [
                        m.originalRange.startLineNumber,
                        m.originalRange.startColumn,
                        m.originalRange.endLineNumber,
                        m.originalRange.endColumn,
                        m.modifiedRange.startLineNumber,
                        m.modifiedRange.startColumn,
                        m.modifiedRange.endLineNumber,
                        m.modifiedRange.endColumn,
                    ])]);
            });
        }
        return {
            identical,
            quitEarly: result.hitTimeout,
            changes: getLineChanges(result.changes),
            moves: result.moves.map(m => ([
                m.lineRangeMapping.original.startLineNumber,
                m.lineRangeMapping.original.endLineNumberExclusive,
                m.lineRangeMapping.modified.startLineNumber,
                m.lineRangeMapping.modified.endLineNumberExclusive,
                getLineChanges(m.changes)
            ])),
        };
    }
    static _modelsAreIdentical(original, modified) {
        const originalLineCount = original.getLineCount();
        const modifiedLineCount = modified.getLineCount();
        if (originalLineCount !== modifiedLineCount) {
            return false;
        }
        for (let line = 1; line <= originalLineCount; line++) {
            const originalLine = original.getLineContent(line);
            const modifiedLine = modified.getLineContent(line);
            if (originalLine !== modifiedLine) {
                return false;
            }
        }
        return true;
    }
    computeMoreMinimalEdits(modelUrl, edits, pretty) {
        return editorSimpleWorker_awaiter(this, void 0, void 0, function* () {
            const model = this._getModel(modelUrl);
            if (!model) {
                return edits;
            }
            const result = [];
            let lastEol = undefined;
            edits = edits.slice(0).sort((a, b) => {
                if (a.range && b.range) {
                    return range_Range.compareRangesUsingStarts(a.range, b.range);
                }
                // eol only changes should go to the end
                const aRng = a.range ? 0 : 1;
                const bRng = b.range ? 0 : 1;
                return aRng - bRng;
            });
            // merge adjacent edits
            let writeIndex = 0;
            for (let readIndex = 1; readIndex < edits.length; readIndex++) {
                if (range_Range.getEndPosition(edits[writeIndex].range).equals(range_Range.getStartPosition(edits[readIndex].range))) {
                    edits[writeIndex].range = range_Range.fromPositions(range_Range.getStartPosition(edits[writeIndex].range), range_Range.getEndPosition(edits[readIndex].range));
                    edits[writeIndex].text += edits[readIndex].text;
                }
                else {
                    writeIndex++;
                    edits[writeIndex] = edits[readIndex];
                }
            }
            edits.length = writeIndex + 1;
            for (let { range, text, eol } of edits) {
                if (typeof eol === 'number') {
                    lastEol = eol;
                }
                if (range_Range.isEmpty(range) && !text) {
                    // empty change
                    continue;
                }
                const original = model.getValueInRange(range);
                text = text.replace(/\r\n|\n|\r/g, model.eol);
                if (original === text) {
                    // noop
                    continue;
                }
                // make sure diff won't take too long
                if (Math.max(text.length, original.length) > EditorSimpleWorker._diffLimit) {
                    result.push({ range, text });
                    continue;
                }
                // compute diff between original and edit.text
                const changes = stringDiff(original, text, pretty);
                const editOffset = model.offsetAt(range_Range.lift(range).getStartPosition());
                for (const change of changes) {
                    const start = model.positionAt(editOffset + change.originalStart);
                    const end = model.positionAt(editOffset + change.originalStart + change.originalLength);
                    const newEdit = {
                        text: text.substr(change.modifiedStart, change.modifiedLength),
                        range: { startLineNumber: start.lineNumber, startColumn: start.column, endLineNumber: end.lineNumber, endColumn: end.column }
                    };
                    if (model.getValueInRange(newEdit.range) !== newEdit.text) {
                        result.push(newEdit);
                    }
                }
            }
            if (typeof lastEol === 'number') {
                result.push({ eol: lastEol, text: '', range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 } });
            }
            return result;
        });
    }
    // ---- END minimal edits ---------------------------------------------------------------
    computeLinks(modelUrl) {
        return editorSimpleWorker_awaiter(this, void 0, void 0, function* () {
            const model = this._getModel(modelUrl);
            if (!model) {
                return null;
            }
            return computeLinks(model);
        });
    }
    // --- BEGIN default document colors -----------------------------------------------------------
    computeDefaultDocumentColors(modelUrl) {
        return editorSimpleWorker_awaiter(this, void 0, void 0, function* () {
            const model = this._getModel(modelUrl);
            if (!model) {
                return null;
            }
            return computeDefaultDocumentColors(model);
        });
    }
    textualSuggest(modelUrls, leadingWord, wordDef, wordDefFlags) {
        return editorSimpleWorker_awaiter(this, void 0, void 0, function* () {
            const sw = new StopWatch();
            const wordDefRegExp = new RegExp(wordDef, wordDefFlags);
            const seen = new Set();
            outer: for (const url of modelUrls) {
                const model = this._getModel(url);
                if (!model) {
                    continue;
                }
                for (const word of model.words(wordDefRegExp)) {
                    if (word === leadingWord || !isNaN(Number(word))) {
                        continue;
                    }
                    seen.add(word);
                    if (seen.size > EditorSimpleWorker._suggestionsLimit) {
                        break outer;
                    }
                }
            }
            return { words: Array.from(seen), duration: sw.elapsed() };
        });
    }
    // ---- END suggest --------------------------------------------------------------------------
    //#region -- word ranges --
    computeWordRanges(modelUrl, range, wordDef, wordDefFlags) {
        return editorSimpleWorker_awaiter(this, void 0, void 0, function* () {
            const model = this._getModel(modelUrl);
            if (!model) {
                return Object.create(null);
            }
            const wordDefRegExp = new RegExp(wordDef, wordDefFlags);
            const result = Object.create(null);
            for (let line = range.startLineNumber; line < range.endLineNumber; line++) {
                const words = model.getLineWords(line, wordDefRegExp);
                for (const word of words) {
                    if (!isNaN(Number(word.word))) {
                        continue;
                    }
                    let array = result[word.word];
                    if (!array) {
                        array = [];
                        result[word.word] = array;
                    }
                    array.push({
                        startLineNumber: line,
                        startColumn: word.startColumn,
                        endLineNumber: line,
                        endColumn: word.endColumn
                    });
                }
            }
            return result;
        });
    }
    //#endregion
    navigateValueSet(modelUrl, range, up, wordDef, wordDefFlags) {
        return editorSimpleWorker_awaiter(this, void 0, void 0, function* () {
            const model = this._getModel(modelUrl);
            if (!model) {
                return null;
            }
            const wordDefRegExp = new RegExp(wordDef, wordDefFlags);
            if (range.startColumn === range.endColumn) {
                range = {
                    startLineNumber: range.startLineNumber,
                    startColumn: range.startColumn,
                    endLineNumber: range.endLineNumber,
                    endColumn: range.endColumn + 1
                };
            }
            const selectionText = model.getValueInRange(range);
            const wordRange = model.getWordAtPosition({ lineNumber: range.startLineNumber, column: range.startColumn }, wordDefRegExp);
            if (!wordRange) {
                return null;
            }
            const word = model.getValueInRange(wordRange);
            const result = BasicInplaceReplace.INSTANCE.navigateValueSet(range, selectionText, wordRange, word, up);
            return result;
        });
    }
    // ---- BEGIN foreign module support --------------------------------------------------------------------------
    loadForeignModule(moduleId, createData, foreignHostMethods) {
        const proxyMethodRequest = (method, args) => {
            return this._host.fhr(method, args);
        };
        const foreignHost = createProxyObject(foreignHostMethods, proxyMethodRequest);
        const ctx = {
            host: foreignHost,
            getMirrorModels: () => {
                return this._getModels();
            }
        };
        if (this._foreignModuleFactory) {
            this._foreignModule = this._foreignModuleFactory(ctx, createData);
            // static foreing module
            return Promise.resolve(objects_getAllMethodNames(this._foreignModule));
        }
        // ESM-comment-begin
        // 		return new Promise<any>((resolve, reject) => {
        // 			require([moduleId], (foreignModule: { create: IForeignModuleFactory }) => {
        // 				this._foreignModule = foreignModule.create(ctx, createData);
        // 
        // 				resolve(getAllMethodNames(this._foreignModule));
        // 
        // 			}, reject);
        // 		});
        // ESM-comment-end
        // ESM-uncomment-begin
        return Promise.reject(new Error(`Unexpected usage`));
        // ESM-uncomment-end
    }
    // foreign method request
    fmr(method, args) {
        if (!this._foreignModule || typeof this._foreignModule[method] !== 'function') {
            return Promise.reject(new Error('Missing requestHandler or method: ' + method));
        }
        try {
            return Promise.resolve(this._foreignModule[method].apply(this._foreignModule, args));
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
}
// ---- END diff --------------------------------------------------------------------------
// ---- BEGIN minimal edits ---------------------------------------------------------------
EditorSimpleWorker._diffLimit = 100000;
// ---- BEGIN suggest --------------------------------------------------------------------------
EditorSimpleWorker._suggestionsLimit = 10000;
/**
 * Called on the worker side
 * @internal
 */
function editorSimpleWorker_create(host) {
    return new EditorSimpleWorker(host, null);
}
if (typeof importScripts === 'function') {
    // Running in a web worker
    globalThis.monaco = createMonacoBaseAPI();
}

;// CONCATENATED MODULE: ./node_modules/monaco-editor/esm/vs/editor/editor.worker.js
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


let initialized = false;
function initialize(foreignModule) {
    if (initialized) {
        return;
    }
    initialized = true;
    const simpleWorker = new SimpleWorkerServer((msg) => {
        globalThis.postMessage(msg);
    }, (host) => new EditorSimpleWorker(host, foreignModule));
    globalThis.onmessage = (e) => {
        simpleWorker.onmessage(e.data);
    };
}
globalThis.onmessage = (e) => {
    // Ignore first message in this case and initialize if not yet initialized
    if (!initialized) {
        initialize(null);
    }
};

})();

/******/ })()
;