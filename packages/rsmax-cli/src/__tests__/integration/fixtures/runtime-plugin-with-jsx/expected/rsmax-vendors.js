(my["webpackChunk"] = my["webpackChunk"] || []).push([["2"], {
10: (function (module, __unused_webpack_exports, __webpack_require__) {
/**
 * @license React
 * react-reconciler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
module.exports = function $$$reconciler($$$hostConfig) {
    var exports = {};
'use strict';var aa=__webpack_require__(4),ba=__webpack_require__(11),ca=Object.assign;function m(a){for(var b="https://reactjs.org/docs/error-decoder.html?invariant="+a,c=1;c<arguments.length;c++)b+="&args[]="+encodeURIComponent(arguments[c]);return"Minified React error #"+a+"; visit "+b+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}
var da=aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ea=Symbol.for("react.element"),fa=Symbol.for("react.portal"),ha=Symbol.for("react.fragment"),ia=Symbol.for("react.strict_mode"),ja=Symbol.for("react.profiler"),ka=Symbol.for("react.provider"),la=Symbol.for("react.context"),ma=Symbol.for("react.forward_ref"),na=Symbol.for("react.suspense"),oa=Symbol.for("react.suspense_list"),pa=Symbol.for("react.memo"),qa=Symbol.for("react.lazy");Symbol.for("react.scope");Symbol.for("react.debug_trace_mode");
var ra=Symbol.for("react.offscreen");Symbol.for("react.legacy_hidden");Symbol.for("react.cache");Symbol.for("react.tracing_marker");var sa=Symbol.iterator;function ta(a){if(null===a||"object"!==typeof a)return null;a=sa&&a[sa]||a["@@iterator"];return"function"===typeof a?a:null}
function ua(a){if(null==a)return null;if("function"===typeof a)return a.displayName||a.name||null;if("string"===typeof a)return a;switch(a){case ha:return"Fragment";case fa:return"Portal";case ja:return"Profiler";case ia:return"StrictMode";case na:return"Suspense";case oa:return"SuspenseList"}if("object"===typeof a)switch(a.$$typeof){case la:return(a.displayName||"Context")+".Consumer";case ka:return(a._context.displayName||"Context")+".Provider";case ma:var b=a.render;a=a.displayName;a||(a=b.displayName||
b.name||"",a=""!==a?"ForwardRef("+a+")":"ForwardRef");return a;case pa:return b=a.displayName||null,null!==b?b:ua(a.type)||"Memo";case qa:b=a._payload;a=a._init;try{return ua(a(b))}catch(c){}}return null}
function va(a){var b=a.type;switch(a.tag){case 24:return"Cache";case 9:return(b.displayName||"Context")+".Consumer";case 10:return(b._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return a=b.render,a=a.displayName||a.name||"",b.displayName||(""!==a?"ForwardRef("+a+")":"ForwardRef");case 7:return"Fragment";case 5:return b;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ua(b);case 8:return b===ia?"StrictMode":"Mode";case 22:return"Offscreen";
case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if("function"===typeof b)return b.displayName||b.name||null;if("string"===typeof b)return b}return null}function wa(a){var b=a,c=a;if(a.alternate)for(;b.return;)b=b.return;else{a=b;do b=a,0!==(b.flags&4098)&&(c=b.return),a=b.return;while(a)}return 3===b.tag?c:null}function xa(a){if(wa(a)!==a)throw Error(m(188));}
function ya(a){var b=a.alternate;if(!b){b=wa(a);if(null===b)throw Error(m(188));return b!==a?null:a}for(var c=a,d=b;;){var e=c.return;if(null===e)break;var f=e.alternate;if(null===f){d=e.return;if(null!==d){c=d;continue}break}if(e.child===f.child){for(f=e.child;f;){if(f===c)return xa(e),a;if(f===d)return xa(e),b;f=f.sibling}throw Error(m(188));}if(c.return!==d.return)c=e,d=f;else{for(var g=!1,h=e.child;h;){if(h===c){g=!0;c=e;d=f;break}if(h===d){g=!0;d=e;c=f;break}h=h.sibling}if(!g){for(h=f.child;h;){if(h===
c){g=!0;c=f;d=e;break}if(h===d){g=!0;d=f;c=e;break}h=h.sibling}if(!g)throw Error(m(189));}}if(c.alternate!==d)throw Error(m(190));}if(3!==c.tag)throw Error(m(188));return c.stateNode.current===c?a:b}function Aa(a){a=ya(a);return null!==a?Ba(a):null}function Ba(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){var b=Ba(a);if(null!==b)return b;a=a.sibling}return null}
function Ca(a){if(5===a.tag||6===a.tag)return a;for(a=a.child;null!==a;){if(4!==a.tag){var b=Ca(a);if(null!==b)return b}a=a.sibling}return null}
var Da=Array.isArray,Ea=$$$hostConfig.getPublicInstance,Fa=$$$hostConfig.getRootHostContext,Ga=$$$hostConfig.getChildHostContext,Ha=$$$hostConfig.prepareForCommit,Ia=$$$hostConfig.resetAfterCommit,Ja=$$$hostConfig.createInstance,Ka=$$$hostConfig.appendInitialChild,La=$$$hostConfig.finalizeInitialChildren,Ma=$$$hostConfig.prepareUpdate,Na=$$$hostConfig.shouldSetTextContent,Oa=$$$hostConfig.createTextInstance,Pa=$$$hostConfig.scheduleTimeout,Qa=$$$hostConfig.cancelTimeout,Ra=$$$hostConfig.noTimeout,
Sa=$$$hostConfig.isPrimaryRenderer,Ta=$$$hostConfig.supportsMutation,Ua=$$$hostConfig.supportsPersistence,Va=$$$hostConfig.supportsHydration,Wa=$$$hostConfig.getInstanceFromNode,Xa=$$$hostConfig.preparePortalMount,Ya=$$$hostConfig.getCurrentEventPriority,Za=$$$hostConfig.detachDeletedInstance,$a=$$$hostConfig.supportsMicrotasks,ab=$$$hostConfig.scheduleMicrotask,bb=$$$hostConfig.supportsTestSelectors,cb=$$$hostConfig.findFiberRoot,db=$$$hostConfig.getBoundingRect,eb=$$$hostConfig.getTextContent,fb=
$$$hostConfig.isHiddenSubtree,gb=$$$hostConfig.matchAccessibilityRole,hb=$$$hostConfig.setFocusIfFocusable,ib=$$$hostConfig.setupIntersectionObserver,jb=$$$hostConfig.appendChild,kb=$$$hostConfig.appendChildToContainer,lb=$$$hostConfig.commitTextUpdate,mb=$$$hostConfig.commitMount,nb=$$$hostConfig.commitUpdate,ob=$$$hostConfig.insertBefore,pb=$$$hostConfig.insertInContainerBefore,qb=$$$hostConfig.removeChild,rb=$$$hostConfig.removeChildFromContainer,sb=$$$hostConfig.resetTextContent,tb=$$$hostConfig.hideInstance,
ub=$$$hostConfig.hideTextInstance,vb=$$$hostConfig.unhideInstance,wb=$$$hostConfig.unhideTextInstance,xb=$$$hostConfig.clearContainer,yb=$$$hostConfig.cloneInstance,zb=$$$hostConfig.createContainerChildSet,Ab=$$$hostConfig.appendChildToContainerChildSet,Bb=$$$hostConfig.finalizeContainerChildren,Cb=$$$hostConfig.replaceContainerChildren,Eb=$$$hostConfig.cloneHiddenInstance,Fb=$$$hostConfig.cloneHiddenTextInstance,Gb=$$$hostConfig.canHydrateInstance,Hb=$$$hostConfig.canHydrateTextInstance,Ib=$$$hostConfig.canHydrateSuspenseInstance,
Jb=$$$hostConfig.isSuspenseInstancePending,Kb=$$$hostConfig.isSuspenseInstanceFallback,Lb=$$$hostConfig.getSuspenseInstanceFallbackErrorDetails,Mb=$$$hostConfig.registerSuspenseInstanceRetry,Nb=$$$hostConfig.getNextHydratableSibling,Ob=$$$hostConfig.getFirstHydratableChild,Pb=$$$hostConfig.getFirstHydratableChildWithinContainer,Qb=$$$hostConfig.getFirstHydratableChildWithinSuspenseInstance,Rb=$$$hostConfig.hydrateInstance,Sb=$$$hostConfig.hydrateTextInstance,Tb=$$$hostConfig.hydrateSuspenseInstance,
Ub=$$$hostConfig.getNextHydratableInstanceAfterSuspenseInstance,Vb=$$$hostConfig.commitHydratedContainer,Wb=$$$hostConfig.commitHydratedSuspenseInstance,Xb=$$$hostConfig.clearSuspenseBoundary,Yb=$$$hostConfig.clearSuspenseBoundaryFromContainer,Zb=$$$hostConfig.shouldDeleteUnhydratedTailInstances,$b=$$$hostConfig.didNotMatchHydratedContainerTextInstance,ac=$$$hostConfig.didNotMatchHydratedTextInstance,bc;
function cc(a){if(void 0===bc)try{throw Error();}catch(c){var b=c.stack.trim().match(/\n( *(at )?)/);bc=b&&b[1]||""}return"\n"+bc+a}var dc=!1;
function ec(a,b){if(!a||dc)return"";dc=!0;var c=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(b)if(b=function(){throw Error();},Object.defineProperty(b.prototype,"props",{set:function(){throw Error();}}),"object"===typeof Reflect&&Reflect.construct){try{Reflect.construct(b,[])}catch(l){var d=l}Reflect.construct(a,[],b)}else{try{b.call()}catch(l){d=l}a.call(b.prototype)}else{try{throw Error();}catch(l){d=l}a()}}catch(l){if(l&&d&&"string"===typeof l.stack){for(var e=l.stack.split("\n"),
f=d.stack.split("\n"),g=e.length-1,h=f.length-1;1<=g&&0<=h&&e[g]!==f[h];)h--;for(;1<=g&&0<=h;g--,h--)if(e[g]!==f[h]){if(1!==g||1!==h){do if(g--,h--,0>h||e[g]!==f[h]){var k="\n"+e[g].replace(" at new "," at ");a.displayName&&k.includes("<anonymous>")&&(k=k.replace("<anonymous>",a.displayName));return k}while(1<=g&&0<=h)}break}}}finally{dc=!1,Error.prepareStackTrace=c}return(a=a?a.displayName||a.name:"")?cc(a):""}var fc=Object.prototype.hasOwnProperty,gc=[],hc=-1;function ic(a){return{current:a}}
function q(a){0>hc||(a.current=gc[hc],gc[hc]=null,hc--)}function v(a,b){hc++;gc[hc]=a.current;a.current=b}var jc={},x=ic(jc),z=ic(!1),kc=jc;function lc(a,b){var c=a.type.contextTypes;if(!c)return jc;var d=a.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===b)return d.__reactInternalMemoizedMaskedChildContext;var e={},f;for(f in c)e[f]=b[f];d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=b,a.__reactInternalMemoizedMaskedChildContext=e);return e}
function A(a){a=a.childContextTypes;return null!==a&&void 0!==a}function mc(){q(z);q(x)}function nc(a,b,c){if(x.current!==jc)throw Error(m(168));v(x,b);v(z,c)}function oc(a,b,c){var d=a.stateNode;b=b.childContextTypes;if("function"!==typeof d.getChildContext)return c;d=d.getChildContext();for(var e in d)if(!(e in b))throw Error(m(108,va(a)||"Unknown",e));return ca({},c,d)}
function pc(a){a=(a=a.stateNode)&&a.__reactInternalMemoizedMergedChildContext||jc;kc=x.current;v(x,a);v(z,z.current);return!0}function rc(a,b,c){var d=a.stateNode;if(!d)throw Error(m(169));c?(a=oc(a,b,kc),d.__reactInternalMemoizedMergedChildContext=a,q(z),q(x),v(x,a)):q(z);v(z,c)}var tc=Math.clz32?Math.clz32:sc,uc=Math.log,vc=Math.LN2;function sc(a){a>>>=0;return 0===a?32:31-(uc(a)/vc|0)|0}var wc=64,xc=4194304;
function yc(a){switch(a&-a){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return a&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return a&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;
default:return a}}function zc(a,b){var c=a.pendingLanes;if(0===c)return 0;var d=0,e=a.suspendedLanes,f=a.pingedLanes,g=c&268435455;if(0!==g){var h=g&~e;0!==h?d=yc(h):(f&=g,0!==f&&(d=yc(f)))}else g=c&~e,0!==g?d=yc(g):0!==f&&(d=yc(f));if(0===d)return 0;if(0!==b&&b!==d&&0===(b&e)&&(e=d&-d,f=b&-b,e>=f||16===e&&0!==(f&4194240)))return b;0!==(d&4)&&(d|=c&16);b=a.entangledLanes;if(0!==b)for(a=a.entanglements,b&=d;0<b;)c=31-tc(b),e=1<<c,d|=a[c],b&=~e;return d}
function Ac(a,b){switch(a){case 1:case 2:case 4:return b+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return b+5E3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}
function Bc(a,b){for(var c=a.suspendedLanes,d=a.pingedLanes,e=a.expirationTimes,f=a.pendingLanes;0<f;){var g=31-tc(f),h=1<<g,k=e[g];if(-1===k){if(0===(h&c)||0!==(h&d))e[g]=Ac(h,b)}else k<=b&&(a.expiredLanes|=h);f&=~h}}function Cc(a){a=a.pendingLanes&-1073741825;return 0!==a?a:a&1073741824?1073741824:0}function Dc(){var a=wc;wc<<=1;0===(wc&4194240)&&(wc=64);return a}function Ec(a){for(var b=[],c=0;31>c;c++)b.push(a);return b}
function Fc(a,b,c){a.pendingLanes|=b;536870912!==b&&(a.suspendedLanes=0,a.pingedLanes=0);a=a.eventTimes;b=31-tc(b);a[b]=c}function Gc(a,b){var c=a.pendingLanes&~b;a.pendingLanes=b;a.suspendedLanes=0;a.pingedLanes=0;a.expiredLanes&=b;a.mutableReadLanes&=b;a.entangledLanes&=b;b=a.entanglements;var d=a.eventTimes;for(a=a.expirationTimes;0<c;){var e=31-tc(c),f=1<<e;b[e]=0;d[e]=-1;a[e]=-1;c&=~f}}
function Hc(a,b){var c=a.entangledLanes|=b;for(a=a.entanglements;c;){var d=31-tc(c),e=1<<d;e&b|a[d]&b&&(a[d]|=b);c&=~e}}var C=0;function Ic(a){a&=-a;return 1<a?4<a?0!==(a&268435455)?16:536870912:4:1}var Jc=ba.unstable_scheduleCallback,Kc=ba.unstable_cancelCallback,Lc=ba.unstable_shouldYield,Mc=ba.unstable_requestPaint,D=ba.unstable_now,Nc=ba.unstable_ImmediatePriority,Oc=ba.unstable_UserBlockingPriority,Pc=ba.unstable_NormalPriority,Qc=ba.unstable_IdlePriority,Rc=null,Sc=null;
function Tc(a){if(Sc&&"function"===typeof Sc.onCommitFiberRoot)try{Sc.onCommitFiberRoot(Rc,a,void 0,128===(a.current.flags&128))}catch(b){}}function Uc(a,b){return a===b&&(0!==a||1/a===1/b)||a!==a&&b!==b}var Vc="function"===typeof Object.is?Object.is:Uc,Wc=null,Xc=!1,Yc=!1;function Zc(a){null===Wc?Wc=[a]:Wc.push(a)}function $c(a){Xc=!0;Zc(a)}
function ad(){if(!Yc&&null!==Wc){Yc=!0;var a=0,b=C;try{var c=Wc;for(C=1;a<c.length;a++){var d=c[a];do d=d(!0);while(null!==d)}Wc=null;Xc=!1}catch(e){throw null!==Wc&&(Wc=Wc.slice(a+1)),Jc(Nc,ad),e;}finally{C=b,Yc=!1}}return null}var bd=[],cd=0,dd=null,ed=0,fd=[],gd=0,hd=null,id=1,jd="";function kd(a,b){bd[cd++]=ed;bd[cd++]=dd;dd=a;ed=b}
function ld(a,b,c){fd[gd++]=id;fd[gd++]=jd;fd[gd++]=hd;hd=a;var d=id;a=jd;var e=32-tc(d)-1;d&=~(1<<e);c+=1;var f=32-tc(b)+e;if(30<f){var g=e-e%5;f=(d&(1<<g)-1).toString(32);d>>=g;e-=g;id=1<<32-tc(b)+e|c<<e|d;jd=f+a}else id=1<<f|c<<e|d,jd=a}function md(a){null!==a.return&&(kd(a,1),ld(a,1,0))}function nd(a){for(;a===dd;)dd=bd[--cd],bd[cd]=null,ed=bd[--cd],bd[cd]=null;for(;a===hd;)hd=fd[--gd],fd[gd]=null,jd=fd[--gd],fd[gd]=null,id=fd[--gd],fd[gd]=null}var od=null,pd=null,F=!1,qd=!1,rd=null;
function sd(a,b){var c=td(5,null,null,0);c.elementType="DELETED";c.stateNode=b;c.return=a;b=a.deletions;null===b?(a.deletions=[c],a.flags|=16):b.push(c)}
function ud(a,b){switch(a.tag){case 5:return b=Gb(b,a.type,a.pendingProps),null!==b?(a.stateNode=b,od=a,pd=Ob(b),!0):!1;case 6:return b=Hb(b,a.pendingProps),null!==b?(a.stateNode=b,od=a,pd=null,!0):!1;case 13:b=Ib(b);if(null!==b){var c=null!==hd?{id:id,overflow:jd}:null;a.memoizedState={dehydrated:b,treeContext:c,retryLane:1073741824};c=td(18,null,null,0);c.stateNode=b;c.return=a;a.child=c;od=a;pd=null;return!0}return!1;default:return!1}}function vd(a){return 0!==(a.mode&1)&&0===(a.flags&128)}
function wd(a){if(F){var b=pd;if(b){var c=b;if(!ud(a,b)){if(vd(a))throw Error(m(418));b=Nb(c);var d=od;b&&ud(a,b)?sd(d,c):(a.flags=a.flags&-4097|2,F=!1,od=a)}}else{if(vd(a))throw Error(m(418));a.flags=a.flags&-4097|2;F=!1;od=a}}}function xd(a){for(a=a.return;null!==a&&5!==a.tag&&3!==a.tag&&13!==a.tag;)a=a.return;od=a}
function yd(a){if(!Va||a!==od)return!1;if(!F)return xd(a),F=!0,!1;if(3!==a.tag&&(5!==a.tag||Zb(a.type)&&!Na(a.type,a.memoizedProps))){var b=pd;if(b){if(vd(a))throw zd(),Error(m(418));for(;b;)sd(a,b),b=Nb(b)}}xd(a);if(13===a.tag){if(!Va)throw Error(m(316));a=a.memoizedState;a=null!==a?a.dehydrated:null;if(!a)throw Error(m(317));pd=Ub(a)}else pd=od?Nb(a.stateNode):null;return!0}function zd(){for(var a=pd;a;)a=Nb(a)}function Ad(){Va&&(pd=od=null,qd=F=!1)}function Bd(a){null===rd?rd=[a]:rd.push(a)}
var Cd=da.ReactCurrentBatchConfig;function Dd(a,b){if(Vc(a,b))return!0;if("object"!==typeof a||null===a||"object"!==typeof b||null===b)return!1;var c=Object.keys(a),d=Object.keys(b);if(c.length!==d.length)return!1;for(d=0;d<c.length;d++){var e=c[d];if(!fc.call(b,e)||!Vc(a[e],b[e]))return!1}return!0}
function Ed(a){switch(a.tag){case 5:return cc(a.type);case 16:return cc("Lazy");case 13:return cc("Suspense");case 19:return cc("SuspenseList");case 0:case 2:case 15:return a=ec(a.type,!1),a;case 11:return a=ec(a.type.render,!1),a;case 1:return a=ec(a.type,!0),a;default:return""}}function Fd(a,b){if(a&&a.defaultProps){b=ca({},b);a=a.defaultProps;for(var c in a)void 0===b[c]&&(b[c]=a[c]);return b}return b}var Gd=ic(null),Hd=null,Id=null,Jd=null;function Kd(){Jd=Id=Hd=null}
function Ld(a,b,c){Sa?(v(Gd,b._currentValue),b._currentValue=c):(v(Gd,b._currentValue2),b._currentValue2=c)}function Md(a){var b=Gd.current;q(Gd);Sa?a._currentValue=b:a._currentValue2=b}function Nd(a,b,c){for(;null!==a;){var d=a.alternate;(a.childLanes&b)!==b?(a.childLanes|=b,null!==d&&(d.childLanes|=b)):null!==d&&(d.childLanes&b)!==b&&(d.childLanes|=b);if(a===c)break;a=a.return}}
function Od(a,b){Hd=a;Jd=Id=null;a=a.dependencies;null!==a&&null!==a.firstContext&&(0!==(a.lanes&b)&&(G=!0),a.firstContext=null)}function Pd(a){var b=Sa?a._currentValue:a._currentValue2;if(Jd!==a)if(a={context:a,memoizedValue:b,next:null},null===Id){if(null===Hd)throw Error(m(308));Id=a;Hd.dependencies={lanes:0,firstContext:a}}else Id=Id.next=a;return b}var Qd=null;function Rd(a){null===Qd?Qd=[a]:Qd.push(a)}
function Sd(a,b,c,d){var e=b.interleaved;null===e?(c.next=c,Rd(b)):(c.next=e.next,e.next=c);b.interleaved=c;return Td(a,d)}function Td(a,b){a.lanes|=b;var c=a.alternate;null!==c&&(c.lanes|=b);c=a;for(a=a.return;null!==a;)a.childLanes|=b,c=a.alternate,null!==c&&(c.childLanes|=b),c=a,a=a.return;return 3===c.tag?c.stateNode:null}var Ud=!1;function Vd(a){a.updateQueue={baseState:a.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}
function Wd(a,b){a=a.updateQueue;b.updateQueue===a&&(b.updateQueue={baseState:a.baseState,firstBaseUpdate:a.firstBaseUpdate,lastBaseUpdate:a.lastBaseUpdate,shared:a.shared,effects:a.effects})}function Xd(a,b){return{eventTime:a,lane:b,tag:0,payload:null,callback:null,next:null}}
function Yd(a,b,c){var d=a.updateQueue;if(null===d)return null;d=d.shared;if(0!==(H&2)){var e=d.pending;null===e?b.next=b:(b.next=e.next,e.next=b);d.pending=b;return Td(a,c)}e=d.interleaved;null===e?(b.next=b,Rd(d)):(b.next=e.next,e.next=b);d.interleaved=b;return Td(a,c)}function Zd(a,b,c){b=b.updateQueue;if(null!==b&&(b=b.shared,0!==(c&4194240))){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Hc(a,c)}}
function $d(a,b){var c=a.updateQueue,d=a.alternate;if(null!==d&&(d=d.updateQueue,c===d)){var e=null,f=null;c=c.firstBaseUpdate;if(null!==c){do{var g={eventTime:c.eventTime,lane:c.lane,tag:c.tag,payload:c.payload,callback:c.callback,next:null};null===f?e=f=g:f=f.next=g;c=c.next}while(null!==c);null===f?e=f=b:f=f.next=b}else e=f=b;c={baseState:d.baseState,firstBaseUpdate:e,lastBaseUpdate:f,shared:d.shared,effects:d.effects};a.updateQueue=c;return}a=c.lastBaseUpdate;null===a?c.firstBaseUpdate=b:a.next=
b;c.lastBaseUpdate=b}
function ae(a,b,c,d){var e=a.updateQueue;Ud=!1;var f=e.firstBaseUpdate,g=e.lastBaseUpdate,h=e.shared.pending;if(null!==h){e.shared.pending=null;var k=h,l=k.next;k.next=null;null===g?f=l:g.next=l;g=k;var n=a.alternate;null!==n&&(n=n.updateQueue,h=n.lastBaseUpdate,h!==g&&(null===h?n.firstBaseUpdate=l:h.next=l,n.lastBaseUpdate=k))}if(null!==f){var t=e.baseState;g=0;n=l=k=null;h=f;do{var p=h.lane,B=h.eventTime;if((d&p)===p){null!==n&&(n=n.next={eventTime:B,lane:0,tag:h.tag,payload:h.payload,callback:h.callback,
next:null});a:{var w=a,Z=h;p=b;B=c;switch(Z.tag){case 1:w=Z.payload;if("function"===typeof w){t=w.call(B,t,p);break a}t=w;break a;case 3:w.flags=w.flags&-65537|128;case 0:w=Z.payload;p="function"===typeof w?w.call(B,t,p):w;if(null===p||void 0===p)break a;t=ca({},t,p);break a;case 2:Ud=!0}}null!==h.callback&&0!==h.lane&&(a.flags|=64,p=e.effects,null===p?e.effects=[h]:p.push(h))}else B={eventTime:B,lane:p,tag:h.tag,payload:h.payload,callback:h.callback,next:null},null===n?(l=n=B,k=t):n=n.next=B,g|=
p;h=h.next;if(null===h)if(h=e.shared.pending,null===h)break;else p=h,h=p.next,p.next=null,e.lastBaseUpdate=p,e.shared.pending=null}while(1);null===n&&(k=t);e.baseState=k;e.firstBaseUpdate=l;e.lastBaseUpdate=n;b=e.shared.interleaved;if(null!==b){e=b;do g|=e.lane,e=e.next;while(e!==b)}else null===f&&(e.shared.lanes=0);be|=g;a.lanes=g;a.memoizedState=t}}
function ce(a,b,c){a=b.effects;b.effects=null;if(null!==a)for(b=0;b<a.length;b++){var d=a[b],e=d.callback;if(null!==e){d.callback=null;d=c;if("function"!==typeof e)throw Error(m(191,e));e.call(d)}}}var de=(new aa.Component).refs;function ee(a,b,c,d){b=a.memoizedState;c=c(d,b);c=null===c||void 0===c?b:ca({},b,c);a.memoizedState=c;0===a.lanes&&(a.updateQueue.baseState=c)}
var he={isMounted:function(a){return(a=a._reactInternals)?wa(a)===a:!1},enqueueSetState:function(a,b,c){a=a._reactInternals;var d=I(),e=fe(a),f=Xd(d,e);f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=Yd(a,f,e);null!==b&&(ge(b,a,e,d),Zd(b,a,e))},enqueueReplaceState:function(a,b,c){a=a._reactInternals;var d=I(),e=fe(a),f=Xd(d,e);f.tag=1;f.payload=b;void 0!==c&&null!==c&&(f.callback=c);b=Yd(a,f,e);null!==b&&(ge(b,a,e,d),Zd(b,a,e))},enqueueForceUpdate:function(a,b){a=a._reactInternals;var c=I(),d=
fe(a),e=Xd(c,d);e.tag=2;void 0!==b&&null!==b&&(e.callback=b);b=Yd(a,e,d);null!==b&&(ge(b,a,d,c),Zd(b,a,d))}};function ie(a,b,c,d,e,f,g){a=a.stateNode;return"function"===typeof a.shouldComponentUpdate?a.shouldComponentUpdate(d,f,g):b.prototype&&b.prototype.isPureReactComponent?!Dd(c,d)||!Dd(e,f):!0}
function je(a,b,c){var d=!1,e=jc;var f=b.contextType;"object"===typeof f&&null!==f?f=Pd(f):(e=A(b)?kc:x.current,d=b.contextTypes,f=(d=null!==d&&void 0!==d)?lc(a,e):jc);b=new b(c,f);a.memoizedState=null!==b.state&&void 0!==b.state?b.state:null;b.updater=he;a.stateNode=b;b._reactInternals=a;d&&(a=a.stateNode,a.__reactInternalMemoizedUnmaskedChildContext=e,a.__reactInternalMemoizedMaskedChildContext=f);return b}
function ke(a,b,c,d){a=b.state;"function"===typeof b.componentWillReceiveProps&&b.componentWillReceiveProps(c,d);"function"===typeof b.UNSAFE_componentWillReceiveProps&&b.UNSAFE_componentWillReceiveProps(c,d);b.state!==a&&he.enqueueReplaceState(b,b.state,null)}
function le(a,b,c,d){var e=a.stateNode;e.props=c;e.state=a.memoizedState;e.refs=de;Vd(a);var f=b.contextType;"object"===typeof f&&null!==f?e.context=Pd(f):(f=A(b)?kc:x.current,e.context=lc(a,f));e.state=a.memoizedState;f=b.getDerivedStateFromProps;"function"===typeof f&&(ee(a,b,f,c),e.state=a.memoizedState);"function"===typeof b.getDerivedStateFromProps||"function"===typeof e.getSnapshotBeforeUpdate||"function"!==typeof e.UNSAFE_componentWillMount&&"function"!==typeof e.componentWillMount||(b=e.state,
"function"===typeof e.componentWillMount&&e.componentWillMount(),"function"===typeof e.UNSAFE_componentWillMount&&e.UNSAFE_componentWillMount(),b!==e.state&&he.enqueueReplaceState(e,e.state,null),ae(a,c,e,d),e.state=a.memoizedState);"function"===typeof e.componentDidMount&&(a.flags|=4194308)}
function me(a,b,c){a=c.ref;if(null!==a&&"function"!==typeof a&&"object"!==typeof a){if(c._owner){c=c._owner;if(c){if(1!==c.tag)throw Error(m(309));var d=c.stateNode}if(!d)throw Error(m(147,a));var e=d,f=""+a;if(null!==b&&null!==b.ref&&"function"===typeof b.ref&&b.ref._stringRef===f)return b.ref;b=function(a){var b=e.refs;b===de&&(b=e.refs={});null===a?delete b[f]:b[f]=a};b._stringRef=f;return b}if("string"!==typeof a)throw Error(m(284));if(!c._owner)throw Error(m(290,a));}return a}
function ne(a,b){a=Object.prototype.toString.call(b);throw Error(m(31,"[object Object]"===a?"object with keys {"+Object.keys(b).join(", ")+"}":a));}function oe(a){var b=a._init;return b(a._payload)}
function pe(a){function b(b,c){if(a){var d=b.deletions;null===d?(b.deletions=[c],b.flags|=16):d.push(c)}}function c(c,d){if(!a)return null;for(;null!==d;)b(c,d),d=d.sibling;return null}function d(a,b){for(a=new Map;null!==b;)null!==b.key?a.set(b.key,b):a.set(b.index,b),b=b.sibling;return a}function e(a,b){a=qe(a,b);a.index=0;a.sibling=null;return a}function f(b,c,d){b.index=d;if(!a)return b.flags|=1048576,c;d=b.alternate;if(null!==d)return d=d.index,d<c?(b.flags|=2,c):d;b.flags|=2;return c}function g(b){a&&
null===b.alternate&&(b.flags|=2);return b}function h(a,b,c,d){if(null===b||6!==b.tag)return b=re(c,a.mode,d),b.return=a,b;b=e(b,c);b.return=a;return b}function k(a,b,c,d){var f=c.type;if(f===ha)return n(a,b,c.props.children,d,c.key);if(null!==b&&(b.elementType===f||"object"===typeof f&&null!==f&&f.$$typeof===qa&&oe(f)===b.type))return d=e(b,c.props),d.ref=me(a,b,c),d.return=a,d;d=se(c.type,c.key,c.props,null,a.mode,d);d.ref=me(a,b,c);d.return=a;return d}function l(a,b,c,d){if(null===b||4!==b.tag||
b.stateNode.containerInfo!==c.containerInfo||b.stateNode.implementation!==c.implementation)return b=te(c,a.mode,d),b.return=a,b;b=e(b,c.children||[]);b.return=a;return b}function n(a,b,c,d,f){if(null===b||7!==b.tag)return b=ue(c,a.mode,d,f),b.return=a,b;b=e(b,c);b.return=a;return b}function t(a,b,c){if("string"===typeof b&&""!==b||"number"===typeof b)return b=re(""+b,a.mode,c),b.return=a,b;if("object"===typeof b&&null!==b){switch(b.$$typeof){case ea:return c=se(b.type,b.key,b.props,null,a.mode,c),
c.ref=me(a,null,b),c.return=a,c;case fa:return b=te(b,a.mode,c),b.return=a,b;case qa:var d=b._init;return t(a,d(b._payload),c)}if(Da(b)||ta(b))return b=ue(b,a.mode,c,null),b.return=a,b;ne(a,b)}return null}function p(a,b,c,d){var e=null!==b?b.key:null;if("string"===typeof c&&""!==c||"number"===typeof c)return null!==e?null:h(a,b,""+c,d);if("object"===typeof c&&null!==c){switch(c.$$typeof){case ea:return c.key===e?k(a,b,c,d):null;case fa:return c.key===e?l(a,b,c,d):null;case qa:return e=c._init,p(a,
b,e(c._payload),d)}if(Da(c)||ta(c))return null!==e?null:n(a,b,c,d,null);ne(a,c)}return null}function B(a,b,c,d,e){if("string"===typeof d&&""!==d||"number"===typeof d)return a=a.get(c)||null,h(b,a,""+d,e);if("object"===typeof d&&null!==d){switch(d.$$typeof){case ea:return a=a.get(null===d.key?c:d.key)||null,k(b,a,d,e);case fa:return a=a.get(null===d.key?c:d.key)||null,l(b,a,d,e);case qa:var f=d._init;return B(a,b,c,f(d._payload),e)}if(Da(d)||ta(d))return a=a.get(c)||null,n(b,a,d,e,null);ne(b,d)}return null}
function w(e,g,h,k){for(var l=null,n=null,r=g,u=g=0,E=null;null!==r&&u<h.length;u++){r.index>u?(E=r,r=null):E=r.sibling;var y=p(e,r,h[u],k);if(null===y){null===r&&(r=E);break}a&&r&&null===y.alternate&&b(e,r);g=f(y,g,u);null===n?l=y:n.sibling=y;n=y;r=E}if(u===h.length)return c(e,r),F&&kd(e,u),l;if(null===r){for(;u<h.length;u++)r=t(e,h[u],k),null!==r&&(g=f(r,g,u),null===n?l=r:n.sibling=r,n=r);F&&kd(e,u);return l}for(r=d(e,r);u<h.length;u++)E=B(r,e,u,h[u],k),null!==E&&(a&&null!==E.alternate&&r.delete(null===
E.key?u:E.key),g=f(E,g,u),null===n?l=E:n.sibling=E,n=E);a&&r.forEach(function(a){return b(e,a)});F&&kd(e,u);return l}function Z(e,g,h,k){var l=ta(h);if("function"!==typeof l)throw Error(m(150));h=l.call(h);if(null==h)throw Error(m(151));for(var n=l=null,r=g,u=g=0,E=null,y=h.next();null!==r&&!y.done;u++,y=h.next()){r.index>u?(E=r,r=null):E=r.sibling;var w=p(e,r,y.value,k);if(null===w){null===r&&(r=E);break}a&&r&&null===w.alternate&&b(e,r);g=f(w,g,u);null===n?l=w:n.sibling=w;n=w;r=E}if(y.done)return c(e,
r),F&&kd(e,u),l;if(null===r){for(;!y.done;u++,y=h.next())y=t(e,y.value,k),null!==y&&(g=f(y,g,u),null===n?l=y:n.sibling=y,n=y);F&&kd(e,u);return l}for(r=d(e,r);!y.done;u++,y=h.next())y=B(r,e,u,y.value,k),null!==y&&(a&&null!==y.alternate&&r.delete(null===y.key?u:y.key),g=f(y,g,u),null===n?l=y:n.sibling=y,n=y);a&&r.forEach(function(a){return b(e,a)});F&&kd(e,u);return l}function za(a,d,f,h){"object"===typeof f&&null!==f&&f.type===ha&&null===f.key&&(f=f.props.children);if("object"===typeof f&&null!==
f){switch(f.$$typeof){case ea:a:{for(var k=f.key,l=d;null!==l;){if(l.key===k){k=f.type;if(k===ha){if(7===l.tag){c(a,l.sibling);d=e(l,f.props.children);d.return=a;a=d;break a}}else if(l.elementType===k||"object"===typeof k&&null!==k&&k.$$typeof===qa&&oe(k)===l.type){c(a,l.sibling);d=e(l,f.props);d.ref=me(a,l,f);d.return=a;a=d;break a}c(a,l);break}else b(a,l);l=l.sibling}f.type===ha?(d=ue(f.props.children,a.mode,h,f.key),d.return=a,a=d):(h=se(f.type,f.key,f.props,null,a.mode,h),h.ref=me(a,d,f),h.return=
a,a=h)}return g(a);case fa:a:{for(l=f.key;null!==d;){if(d.key===l)if(4===d.tag&&d.stateNode.containerInfo===f.containerInfo&&d.stateNode.implementation===f.implementation){c(a,d.sibling);d=e(d,f.children||[]);d.return=a;a=d;break a}else{c(a,d);break}else b(a,d);d=d.sibling}d=te(f,a.mode,h);d.return=a;a=d}return g(a);case qa:return l=f._init,za(a,d,l(f._payload),h)}if(Da(f))return w(a,d,f,h);if(ta(f))return Z(a,d,f,h);ne(a,f)}return"string"===typeof f&&""!==f||"number"===typeof f?(f=""+f,null!==d&&
6===d.tag?(c(a,d.sibling),d=e(d,f),d.return=a,a=d):(c(a,d),d=re(f,a.mode,h),d.return=a,a=d),g(a)):c(a,d)}return za}var ve=pe(!0),we=pe(!1),xe={},ye=ic(xe),ze=ic(xe),Ae=ic(xe);function Be(a){if(a===xe)throw Error(m(174));return a}function Ce(a,b){v(Ae,b);v(ze,a);v(ye,xe);a=Fa(b);q(ye);v(ye,a)}function De(){q(ye);q(ze);q(Ae)}function Ee(a){var b=Be(Ae.current),c=Be(ye.current);b=Ga(c,a.type,b);c!==b&&(v(ze,a),v(ye,b))}function Fe(a){ze.current===a&&(q(ye),q(ze))}var J=ic(0);
function Ge(a){for(var b=a;null!==b;){if(13===b.tag){var c=b.memoizedState;if(null!==c&&(c=c.dehydrated,null===c||Jb(c)||Kb(c)))return b}else if(19===b.tag&&void 0!==b.memoizedProps.revealOrder){if(0!==(b.flags&128))return b}else if(null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return null;b=b.return}b.sibling.return=b.return;b=b.sibling}return null}var He=[];
function Ie(){for(var a=0;a<He.length;a++){var b=He[a];Sa?b._workInProgressVersionPrimary=null:b._workInProgressVersionSecondary=null}He.length=0}var Je=da.ReactCurrentDispatcher,Ke=da.ReactCurrentBatchConfig,Le=0,K=null,L=null,M=null,Me=!1,Ne=!1,Oe=0,Pe=0;function N(){throw Error(m(321));}function Qe(a,b){if(null===b)return!1;for(var c=0;c<b.length&&c<a.length;c++)if(!Vc(a[c],b[c]))return!1;return!0}
function Re(a,b,c,d,e,f){Le=f;K=b;b.memoizedState=null;b.updateQueue=null;b.lanes=0;Je.current=null===a||null===a.memoizedState?Se:Te;a=c(d,e);if(Ne){f=0;do{Ne=!1;Oe=0;if(25<=f)throw Error(m(301));f+=1;M=L=null;b.updateQueue=null;Je.current=Ue;a=c(d,e)}while(Ne)}Je.current=Ve;b=null!==L&&null!==L.next;Le=0;M=L=K=null;Me=!1;if(b)throw Error(m(300));return a}function We(){var a=0!==Oe;Oe=0;return a}
function Xe(){var a={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};null===M?K.memoizedState=M=a:M=M.next=a;return M}function Ye(){if(null===L){var a=K.alternate;a=null!==a?a.memoizedState:null}else a=L.next;var b=null===M?K.memoizedState:M.next;if(null!==b)M=b,L=a;else{if(null===a)throw Error(m(310));L=a;a={memoizedState:L.memoizedState,baseState:L.baseState,baseQueue:L.baseQueue,queue:L.queue,next:null};null===M?K.memoizedState=M=a:M=M.next=a}return M}
function Ze(a,b){return"function"===typeof b?b(a):b}
function $e(a){var b=Ye(),c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=L,e=d.baseQueue,f=c.pending;if(null!==f){if(null!==e){var g=e.next;e.next=f.next;f.next=g}d.baseQueue=e=f;c.pending=null}if(null!==e){f=e.next;d=d.baseState;var h=g=null,k=null,l=f;do{var n=l.lane;if((Le&n)===n)null!==k&&(k=k.next={lane:0,action:l.action,hasEagerState:l.hasEagerState,eagerState:l.eagerState,next:null}),d=l.hasEagerState?l.eagerState:a(d,l.action);else{var t={lane:n,action:l.action,hasEagerState:l.hasEagerState,
eagerState:l.eagerState,next:null};null===k?(h=k=t,g=d):k=k.next=t;K.lanes|=n;be|=n}l=l.next}while(null!==l&&l!==f);null===k?g=d:k.next=h;Vc(d,b.memoizedState)||(G=!0);b.memoizedState=d;b.baseState=g;b.baseQueue=k;c.lastRenderedState=d}a=c.interleaved;if(null!==a){e=a;do f=e.lane,K.lanes|=f,be|=f,e=e.next;while(e!==a)}else null===e&&(c.lanes=0);return[b.memoizedState,c.dispatch]}
function af(a){var b=Ye(),c=b.queue;if(null===c)throw Error(m(311));c.lastRenderedReducer=a;var d=c.dispatch,e=c.pending,f=b.memoizedState;if(null!==e){c.pending=null;var g=e=e.next;do f=a(f,g.action),g=g.next;while(g!==e);Vc(f,b.memoizedState)||(G=!0);b.memoizedState=f;null===b.baseQueue&&(b.baseState=f);c.lastRenderedState=f}return[f,d]}function bf(){}
function cf(a,b){var c=K,d=Ye(),e=b(),f=!Vc(d.memoizedState,e);f&&(d.memoizedState=e,G=!0);d=d.queue;df(ef.bind(null,c,d,a),[a]);if(d.getSnapshot!==b||f||null!==M&&M.memoizedState.tag&1){c.flags|=2048;ff(9,gf.bind(null,c,d,e,b),void 0,null);if(null===O)throw Error(m(349));0!==(Le&30)||hf(c,b,e)}return e}function hf(a,b,c){a.flags|=16384;a={getSnapshot:b,value:c};b=K.updateQueue;null===b?(b={lastEffect:null,stores:null},K.updateQueue=b,b.stores=[a]):(c=b.stores,null===c?b.stores=[a]:c.push(a))}
function gf(a,b,c,d){b.value=c;b.getSnapshot=d;jf(b)&&kf(a)}function ef(a,b,c){return c(function(){jf(b)&&kf(a)})}function jf(a){var b=a.getSnapshot;a=a.value;try{var c=b();return!Vc(a,c)}catch(d){return!0}}function kf(a){var b=Td(a,1);null!==b&&ge(b,a,1,-1)}
function lf(a){var b=Xe();"function"===typeof a&&(a=a());b.memoizedState=b.baseState=a;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Ze,lastRenderedState:a};b.queue=a;a=a.dispatch=mf.bind(null,K,a);return[b.memoizedState,a]}
function ff(a,b,c,d){a={tag:a,create:b,destroy:c,deps:d,next:null};b=K.updateQueue;null===b?(b={lastEffect:null,stores:null},K.updateQueue=b,b.lastEffect=a.next=a):(c=b.lastEffect,null===c?b.lastEffect=a.next=a:(d=c.next,c.next=a,a.next=d,b.lastEffect=a));return a}function nf(){return Ye().memoizedState}function of(a,b,c,d){var e=Xe();K.flags|=a;e.memoizedState=ff(1|b,c,void 0,void 0===d?null:d)}
function pf(a,b,c,d){var e=Ye();d=void 0===d?null:d;var f=void 0;if(null!==L){var g=L.memoizedState;f=g.destroy;if(null!==d&&Qe(d,g.deps)){e.memoizedState=ff(b,c,f,d);return}}K.flags|=a;e.memoizedState=ff(1|b,c,f,d)}function qf(a,b){return of(8390656,8,a,b)}function df(a,b){return pf(2048,8,a,b)}function rf(a,b){return pf(4,2,a,b)}function sf(a,b){return pf(4,4,a,b)}
function tf(a,b){if("function"===typeof b)return a=a(),b(a),function(){b(null)};if(null!==b&&void 0!==b)return a=a(),b.current=a,function(){b.current=null}}function uf(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return pf(4,4,tf.bind(null,b,a),c)}function vf(){}function wf(a,b){var c=Ye();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Qe(b,d[1]))return d[0];c.memoizedState=[a,b];return a}
function xf(a,b){var c=Ye();b=void 0===b?null:b;var d=c.memoizedState;if(null!==d&&null!==b&&Qe(b,d[1]))return d[0];a=a();c.memoizedState=[a,b];return a}function yf(a,b,c){if(0===(Le&21))return a.baseState&&(a.baseState=!1,G=!0),a.memoizedState=c;Vc(c,b)||(c=Dc(),K.lanes|=c,be|=c,a.baseState=!0);return b}function zf(a,b){var c=C;C=0!==c&&4>c?c:4;a(!0);var d=Ke.transition;Ke.transition={};try{a(!1),b()}finally{C=c,Ke.transition=d}}function Af(){return Ye().memoizedState}
function Bf(a,b,c){var d=fe(a);c={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(Cf(a))Df(b,c);else if(c=Sd(a,b,c,d),null!==c){var e=I();ge(c,a,d,e);Ef(c,b,d)}}
function mf(a,b,c){var d=fe(a),e={lane:d,action:c,hasEagerState:!1,eagerState:null,next:null};if(Cf(a))Df(b,e);else{var f=a.alternate;if(0===a.lanes&&(null===f||0===f.lanes)&&(f=b.lastRenderedReducer,null!==f))try{var g=b.lastRenderedState,h=f(g,c);e.hasEagerState=!0;e.eagerState=h;if(Vc(h,g)){var k=b.interleaved;null===k?(e.next=e,Rd(b)):(e.next=k.next,k.next=e);b.interleaved=e;return}}catch(l){}finally{}c=Sd(a,b,e,d);null!==c&&(e=I(),ge(c,a,d,e),Ef(c,b,d))}}
function Cf(a){var b=a.alternate;return a===K||null!==b&&b===K}function Df(a,b){Ne=Me=!0;var c=a.pending;null===c?b.next=b:(b.next=c.next,c.next=b);a.pending=b}function Ef(a,b,c){if(0!==(c&4194240)){var d=b.lanes;d&=a.pendingLanes;c|=d;b.lanes=c;Hc(a,c)}}
var Ve={readContext:Pd,useCallback:N,useContext:N,useEffect:N,useImperativeHandle:N,useInsertionEffect:N,useLayoutEffect:N,useMemo:N,useReducer:N,useRef:N,useState:N,useDebugValue:N,useDeferredValue:N,useTransition:N,useMutableSource:N,useSyncExternalStore:N,useId:N,unstable_isNewReconciler:!1},Se={readContext:Pd,useCallback:function(a,b){Xe().memoizedState=[a,void 0===b?null:b];return a},useContext:Pd,useEffect:qf,useImperativeHandle:function(a,b,c){c=null!==c&&void 0!==c?c.concat([a]):null;return of(4194308,
4,tf.bind(null,b,a),c)},useLayoutEffect:function(a,b){return of(4194308,4,a,b)},useInsertionEffect:function(a,b){return of(4,2,a,b)},useMemo:function(a,b){var c=Xe();b=void 0===b?null:b;a=a();c.memoizedState=[a,b];return a},useReducer:function(a,b,c){var d=Xe();b=void 0!==c?c(b):b;d.memoizedState=d.baseState=b;a={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:a,lastRenderedState:b};d.queue=a;a=a.dispatch=Bf.bind(null,K,a);return[d.memoizedState,a]},useRef:function(a){var b=
Xe();a={current:a};return b.memoizedState=a},useState:lf,useDebugValue:vf,useDeferredValue:function(a){return Xe().memoizedState=a},useTransition:function(){var a=lf(!1),b=a[0];a=zf.bind(null,a[1]);Xe().memoizedState=a;return[b,a]},useMutableSource:function(){},useSyncExternalStore:function(a,b,c){var d=K,e=Xe();if(F){if(void 0===c)throw Error(m(407));c=c()}else{c=b();if(null===O)throw Error(m(349));0!==(Le&30)||hf(d,b,c)}e.memoizedState=c;var f={value:c,getSnapshot:b};e.queue=f;qf(ef.bind(null,d,
f,a),[a]);d.flags|=2048;ff(9,gf.bind(null,d,f,c,b),void 0,null);return c},useId:function(){var a=Xe(),b=O.identifierPrefix;if(F){var c=jd;var d=id;c=(d&~(1<<32-tc(d)-1)).toString(32)+c;b=":"+b+"R"+c;c=Oe++;0<c&&(b+="H"+c.toString(32));b+=":"}else c=Pe++,b=":"+b+"r"+c.toString(32)+":";return a.memoizedState=b},unstable_isNewReconciler:!1},Te={readContext:Pd,useCallback:wf,useContext:Pd,useEffect:df,useImperativeHandle:uf,useInsertionEffect:rf,useLayoutEffect:sf,useMemo:xf,useReducer:$e,useRef:nf,useState:function(){return $e(Ze)},
useDebugValue:vf,useDeferredValue:function(a){var b=Ye();return yf(b,L.memoizedState,a)},useTransition:function(){var a=$e(Ze)[0],b=Ye().memoizedState;return[a,b]},useMutableSource:bf,useSyncExternalStore:cf,useId:Af,unstable_isNewReconciler:!1},Ue={readContext:Pd,useCallback:wf,useContext:Pd,useEffect:df,useImperativeHandle:uf,useInsertionEffect:rf,useLayoutEffect:sf,useMemo:xf,useReducer:af,useRef:nf,useState:function(){return af(Ze)},useDebugValue:vf,useDeferredValue:function(a){var b=Ye();return null===
L?b.memoizedState=a:yf(b,L.memoizedState,a)},useTransition:function(){var a=af(Ze)[0],b=Ye().memoizedState;return[a,b]},useMutableSource:bf,useSyncExternalStore:cf,useId:Af,unstable_isNewReconciler:!1};function Ff(a,b){try{var c="",d=b;do c+=Ed(d),d=d.return;while(d);var e=c}catch(f){e="\nError generating stack: "+f.message+"\n"+f.stack}return{value:a,source:b,stack:e,digest:null}}function Gf(a,b,c){return{value:a,source:null,stack:null!=c?c:null,digest:null!=b?b:null}}
function Hf(a,b){try{console.error(b.value)}catch(c){setTimeout(function(){throw c;})}}var If="function"===typeof WeakMap?WeakMap:Map;function Jf(a,b,c){c=Xd(-1,c);c.tag=3;c.payload={element:null};var d=b.value;c.callback=function(){Kf||(Kf=!0,Lf=d);Hf(a,b)};return c}
function Mf(a,b,c){c=Xd(-1,c);c.tag=3;var d=a.type.getDerivedStateFromError;if("function"===typeof d){var e=b.value;c.payload=function(){return d(e)};c.callback=function(){Hf(a,b)}}var f=a.stateNode;null!==f&&"function"===typeof f.componentDidCatch&&(c.callback=function(){Hf(a,b);"function"!==typeof d&&(null===Nf?Nf=new Set([this]):Nf.add(this));var c=b.stack;this.componentDidCatch(b.value,{componentStack:null!==c?c:""})});return c}
function Of(a,b,c){var d=a.pingCache;if(null===d){d=a.pingCache=new If;var e=new Set;d.set(b,e)}else e=d.get(b),void 0===e&&(e=new Set,d.set(b,e));e.has(c)||(e.add(c),a=Pf.bind(null,a,b,c),b.then(a,a))}function Qf(a){do{var b;if(b=13===a.tag)b=a.memoizedState,b=null!==b?null!==b.dehydrated?!0:!1:!0;if(b)return a;a=a.return}while(null!==a);return null}
function Rf(a,b,c,d,e){if(0===(a.mode&1))return a===b?a.flags|=65536:(a.flags|=128,c.flags|=131072,c.flags&=-52805,1===c.tag&&(null===c.alternate?c.tag=17:(b=Xd(-1,1),b.tag=2,Yd(c,b,1))),c.lanes|=1),a;a.flags|=65536;a.lanes=e;return a}var Sf=da.ReactCurrentOwner,G=!1;function P(a,b,c,d){b.child=null===a?we(b,null,c,d):ve(b,a.child,c,d)}
function Tf(a,b,c,d,e){c=c.render;var f=b.ref;Od(b,e);d=Re(a,b,c,d,f,e);c=We();if(null!==a&&!G)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Uf(a,b,e);F&&c&&md(b);b.flags|=1;P(a,b,d,e);return b.child}
function Vf(a,b,c,d,e){if(null===a){var f=c.type;if("function"===typeof f&&!Wf(f)&&void 0===f.defaultProps&&null===c.compare&&void 0===c.defaultProps)return b.tag=15,b.type=f,Xf(a,b,f,d,e);a=se(c.type,null,d,b,b.mode,e);a.ref=b.ref;a.return=b;return b.child=a}f=a.child;if(0===(a.lanes&e)){var g=f.memoizedProps;c=c.compare;c=null!==c?c:Dd;if(c(g,d)&&a.ref===b.ref)return Uf(a,b,e)}b.flags|=1;a=qe(f,d);a.ref=b.ref;a.return=b;return b.child=a}
function Xf(a,b,c,d,e){if(null!==a){var f=a.memoizedProps;if(Dd(f,d)&&a.ref===b.ref)if(G=!1,b.pendingProps=d=f,0!==(a.lanes&e))0!==(a.flags&131072)&&(G=!0);else return b.lanes=a.lanes,Uf(a,b,e)}return Yf(a,b,c,d,e)}
function Zf(a,b,c){var d=b.pendingProps,e=d.children,f=null!==a?a.memoizedState:null;if("hidden"===d.mode)if(0===(b.mode&1))b.memoizedState={baseLanes:0,cachePool:null,transitions:null},v($f,ag),ag|=c;else{if(0===(c&1073741824))return a=null!==f?f.baseLanes|c:c,b.lanes=b.childLanes=1073741824,b.memoizedState={baseLanes:a,cachePool:null,transitions:null},b.updateQueue=null,v($f,ag),ag|=a,null;b.memoizedState={baseLanes:0,cachePool:null,transitions:null};d=null!==f?f.baseLanes:c;v($f,ag);ag|=d}else null!==
f?(d=f.baseLanes|c,b.memoizedState=null):d=c,v($f,ag),ag|=d;P(a,b,e,c);return b.child}function bg(a,b){var c=b.ref;if(null===a&&null!==c||null!==a&&a.ref!==c)b.flags|=512,b.flags|=2097152}function Yf(a,b,c,d,e){var f=A(c)?kc:x.current;f=lc(b,f);Od(b,e);c=Re(a,b,c,d,f,e);d=We();if(null!==a&&!G)return b.updateQueue=a.updateQueue,b.flags&=-2053,a.lanes&=~e,Uf(a,b,e);F&&d&&md(b);b.flags|=1;P(a,b,c,e);return b.child}
function cg(a,b,c,d,e){if(A(c)){var f=!0;pc(b)}else f=!1;Od(b,e);if(null===b.stateNode)dg(a,b),je(b,c,d),le(b,c,d,e),d=!0;else if(null===a){var g=b.stateNode,h=b.memoizedProps;g.props=h;var k=g.context,l=c.contextType;"object"===typeof l&&null!==l?l=Pd(l):(l=A(c)?kc:x.current,l=lc(b,l));var n=c.getDerivedStateFromProps,t="function"===typeof n||"function"===typeof g.getSnapshotBeforeUpdate;t||"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==
d||k!==l)&&ke(b,g,d,l);Ud=!1;var p=b.memoizedState;g.state=p;ae(b,d,g,e);k=b.memoizedState;h!==d||p!==k||z.current||Ud?("function"===typeof n&&(ee(b,c,n,d),k=b.memoizedState),(h=Ud||ie(b,c,h,d,p,k,l))?(t||"function"!==typeof g.UNSAFE_componentWillMount&&"function"!==typeof g.componentWillMount||("function"===typeof g.componentWillMount&&g.componentWillMount(),"function"===typeof g.UNSAFE_componentWillMount&&g.UNSAFE_componentWillMount()),"function"===typeof g.componentDidMount&&(b.flags|=4194308)):
("function"===typeof g.componentDidMount&&(b.flags|=4194308),b.memoizedProps=d,b.memoizedState=k),g.props=d,g.state=k,g.context=l,d=h):("function"===typeof g.componentDidMount&&(b.flags|=4194308),d=!1)}else{g=b.stateNode;Wd(a,b);h=b.memoizedProps;l=b.type===b.elementType?h:Fd(b.type,h);g.props=l;t=b.pendingProps;p=g.context;k=c.contextType;"object"===typeof k&&null!==k?k=Pd(k):(k=A(c)?kc:x.current,k=lc(b,k));var B=c.getDerivedStateFromProps;(n="function"===typeof B||"function"===typeof g.getSnapshotBeforeUpdate)||
"function"!==typeof g.UNSAFE_componentWillReceiveProps&&"function"!==typeof g.componentWillReceiveProps||(h!==t||p!==k)&&ke(b,g,d,k);Ud=!1;p=b.memoizedState;g.state=p;ae(b,d,g,e);var w=b.memoizedState;h!==t||p!==w||z.current||Ud?("function"===typeof B&&(ee(b,c,B,d),w=b.memoizedState),(l=Ud||ie(b,c,l,d,p,w,k)||!1)?(n||"function"!==typeof g.UNSAFE_componentWillUpdate&&"function"!==typeof g.componentWillUpdate||("function"===typeof g.componentWillUpdate&&g.componentWillUpdate(d,w,k),"function"===typeof g.UNSAFE_componentWillUpdate&&
g.UNSAFE_componentWillUpdate(d,w,k)),"function"===typeof g.componentDidUpdate&&(b.flags|=4),"function"===typeof g.getSnapshotBeforeUpdate&&(b.flags|=1024)):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=1024),b.memoizedProps=d,b.memoizedState=w),g.props=d,g.state=w,g.context=k,d=l):("function"!==typeof g.componentDidUpdate||h===a.memoizedProps&&p===
a.memoizedState||(b.flags|=4),"function"!==typeof g.getSnapshotBeforeUpdate||h===a.memoizedProps&&p===a.memoizedState||(b.flags|=1024),d=!1)}return eg(a,b,c,d,f,e)}
function eg(a,b,c,d,e,f){bg(a,b);var g=0!==(b.flags&128);if(!d&&!g)return e&&rc(b,c,!1),Uf(a,b,f);d=b.stateNode;Sf.current=b;var h=g&&"function"!==typeof c.getDerivedStateFromError?null:d.render();b.flags|=1;null!==a&&g?(b.child=ve(b,a.child,null,f),b.child=ve(b,null,h,f)):P(a,b,h,f);b.memoizedState=d.state;e&&rc(b,c,!0);return b.child}function fg(a){var b=a.stateNode;b.pendingContext?nc(a,b.pendingContext,b.pendingContext!==b.context):b.context&&nc(a,b.context,!1);Ce(a,b.containerInfo)}
function gg(a,b,c,d,e){Ad();Bd(e);b.flags|=256;P(a,b,c,d);return b.child}var hg={dehydrated:null,treeContext:null,retryLane:0};function ig(a){return{baseLanes:a,cachePool:null,transitions:null}}
function jg(a,b,c){var d=b.pendingProps,e=J.current,f=!1,g=0!==(b.flags&128),h;(h=g)||(h=null!==a&&null===a.memoizedState?!1:0!==(e&2));if(h)f=!0,b.flags&=-129;else if(null===a||null!==a.memoizedState)e|=1;v(J,e&1);if(null===a){wd(b);a=b.memoizedState;if(null!==a&&(a=a.dehydrated,null!==a))return 0===(b.mode&1)?b.lanes=1:Kb(a)?b.lanes=8:b.lanes=1073741824,null;g=d.children;a=d.fallback;return f?(d=b.mode,f=b.child,g={mode:"hidden",children:g},0===(d&1)&&null!==f?(f.childLanes=0,f.pendingProps=g):
f=kg(g,d,0,null),a=ue(a,d,c,null),f.return=b,a.return=b,f.sibling=a,b.child=f,b.child.memoizedState=ig(c),b.memoizedState=hg,a):lg(b,g)}e=a.memoizedState;if(null!==e&&(h=e.dehydrated,null!==h))return mg(a,b,g,d,h,e,c);if(f){f=d.fallback;g=b.mode;e=a.child;h=e.sibling;var k={mode:"hidden",children:d.children};0===(g&1)&&b.child!==e?(d=b.child,d.childLanes=0,d.pendingProps=k,b.deletions=null):(d=qe(e,k),d.subtreeFlags=e.subtreeFlags&14680064);null!==h?f=qe(h,f):(f=ue(f,g,c,null),f.flags|=2);f.return=
b;d.return=b;d.sibling=f;b.child=d;d=f;f=b.child;g=a.child.memoizedState;g=null===g?ig(c):{baseLanes:g.baseLanes|c,cachePool:null,transitions:g.transitions};f.memoizedState=g;f.childLanes=a.childLanes&~c;b.memoizedState=hg;return d}f=a.child;a=f.sibling;d=qe(f,{mode:"visible",children:d.children});0===(b.mode&1)&&(d.lanes=c);d.return=b;d.sibling=null;null!==a&&(c=b.deletions,null===c?(b.deletions=[a],b.flags|=16):c.push(a));b.child=d;b.memoizedState=null;return d}
function lg(a,b){b=kg({mode:"visible",children:b},a.mode,0,null);b.return=a;return a.child=b}function ng(a,b,c,d){null!==d&&Bd(d);ve(b,a.child,null,c);a=lg(b,b.pendingProps.children);a.flags|=2;b.memoizedState=null;return a}
function mg(a,b,c,d,e,f,g){if(c){if(b.flags&256)return b.flags&=-257,d=Gf(Error(m(422))),ng(a,b,g,d);if(null!==b.memoizedState)return b.child=a.child,b.flags|=128,null;f=d.fallback;e=b.mode;d=kg({mode:"visible",children:d.children},e,0,null);f=ue(f,e,g,null);f.flags|=2;d.return=b;f.return=b;d.sibling=f;b.child=d;0!==(b.mode&1)&&ve(b,a.child,null,g);b.child.memoizedState=ig(g);b.memoizedState=hg;return f}if(0===(b.mode&1))return ng(a,b,g,null);if(Kb(e))return d=Lb(e).digest,f=Error(m(419)),d=Gf(f,
d,void 0),ng(a,b,g,d);c=0!==(g&a.childLanes);if(G||c){d=O;if(null!==d){switch(g&-g){case 4:e=2;break;case 16:e=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:e=32;break;case 536870912:e=268435456;break;default:e=0}e=0!==(e&(d.suspendedLanes|g))?0:e;0!==e&&e!==f.retryLane&&(f.retryLane=e,Td(a,e),ge(d,a,
e,-1))}og();d=Gf(Error(m(421)));return ng(a,b,g,d)}if(Jb(e))return b.flags|=128,b.child=a.child,b=pg.bind(null,a),Mb(e,b),null;a=f.treeContext;Va&&(pd=Qb(e),od=b,F=!0,rd=null,qd=!1,null!==a&&(fd[gd++]=id,fd[gd++]=jd,fd[gd++]=hd,id=a.id,jd=a.overflow,hd=b));b=lg(b,d.children);b.flags|=4096;return b}function qg(a,b,c){a.lanes|=b;var d=a.alternate;null!==d&&(d.lanes|=b);Nd(a.return,b,c)}
function rg(a,b,c,d,e){var f=a.memoizedState;null===f?a.memoizedState={isBackwards:b,rendering:null,renderingStartTime:0,last:d,tail:c,tailMode:e}:(f.isBackwards=b,f.rendering=null,f.renderingStartTime=0,f.last=d,f.tail=c,f.tailMode=e)}
function sg(a,b,c){var d=b.pendingProps,e=d.revealOrder,f=d.tail;P(a,b,d.children,c);d=J.current;if(0!==(d&2))d=d&1|2,b.flags|=128;else{if(null!==a&&0!==(a.flags&128))a:for(a=b.child;null!==a;){if(13===a.tag)null!==a.memoizedState&&qg(a,c,b);else if(19===a.tag)qg(a,c,b);else if(null!==a.child){a.child.return=a;a=a.child;continue}if(a===b)break a;for(;null===a.sibling;){if(null===a.return||a.return===b)break a;a=a.return}a.sibling.return=a.return;a=a.sibling}d&=1}v(J,d);if(0===(b.mode&1))b.memoizedState=
null;else switch(e){case "forwards":c=b.child;for(e=null;null!==c;)a=c.alternate,null!==a&&null===Ge(a)&&(e=c),c=c.sibling;c=e;null===c?(e=b.child,b.child=null):(e=c.sibling,c.sibling=null);rg(b,!1,e,c,f);break;case "backwards":c=null;e=b.child;for(b.child=null;null!==e;){a=e.alternate;if(null!==a&&null===Ge(a)){b.child=e;break}a=e.sibling;e.sibling=c;c=e;e=a}rg(b,!0,c,null,f);break;case "together":rg(b,!1,null,null,void 0);break;default:b.memoizedState=null}return b.child}
function dg(a,b){0===(b.mode&1)&&null!==a&&(a.alternate=null,b.alternate=null,b.flags|=2)}function Uf(a,b,c){null!==a&&(b.dependencies=a.dependencies);be|=b.lanes;if(0===(c&b.childLanes))return null;if(null!==a&&b.child!==a.child)throw Error(m(153));if(null!==b.child){a=b.child;c=qe(a,a.pendingProps);b.child=c;for(c.return=b;null!==a.sibling;)a=a.sibling,c=c.sibling=qe(a,a.pendingProps),c.return=b;c.sibling=null}return b.child}
function tg(a,b,c){switch(b.tag){case 3:fg(b);Ad();break;case 5:Ee(b);break;case 1:A(b.type)&&pc(b);break;case 4:Ce(b,b.stateNode.containerInfo);break;case 10:Ld(b,b.type._context,b.memoizedProps.value);break;case 13:var d=b.memoizedState;if(null!==d){if(null!==d.dehydrated)return v(J,J.current&1),b.flags|=128,null;if(0!==(c&b.child.childLanes))return jg(a,b,c);v(J,J.current&1);a=Uf(a,b,c);return null!==a?a.sibling:null}v(J,J.current&1);break;case 19:d=0!==(c&b.childLanes);if(0!==(a.flags&128)){if(d)return sg(a,
b,c);b.flags|=128}var e=b.memoizedState;null!==e&&(e.rendering=null,e.tail=null,e.lastEffect=null);v(J,J.current);if(d)break;else return null;case 22:case 23:return b.lanes=0,Zf(a,b,c)}return Uf(a,b,c)}function ug(a){a.flags|=4}function vg(a,b){if(null!==a&&a.child===b.child)return!0;if(0!==(b.flags&16))return!1;for(a=b.child;null!==a;){if(0!==(a.flags&12854)||0!==(a.subtreeFlags&12854))return!1;a=a.sibling}return!0}var wg,xg,yg,zg;
if(Ta)wg=function(a,b){for(var c=b.child;null!==c;){if(5===c.tag||6===c.tag)Ka(a,c.stateNode);else if(4!==c.tag&&null!==c.child){c.child.return=c;c=c.child;continue}if(c===b)break;for(;null===c.sibling;){if(null===c.return||c.return===b)return;c=c.return}c.sibling.return=c.return;c=c.sibling}},xg=function(){},yg=function(a,b,c,d,e){a=a.memoizedProps;if(a!==d){var f=b.stateNode,g=Be(ye.current);c=Ma(f,c,a,d,e,g);(b.updateQueue=c)&&ug(b)}},zg=function(a,b,c,d){c!==d&&ug(b)};else if(Ua){wg=function(a,
b,c,d){for(var e=b.child;null!==e;){if(5===e.tag){var f=e.stateNode;c&&d&&(f=Eb(f,e.type,e.memoizedProps,e));Ka(a,f)}else if(6===e.tag)f=e.stateNode,c&&d&&(f=Fb(f,e.memoizedProps,e)),Ka(a,f);else if(4!==e.tag)if(22===e.tag&&null!==e.memoizedState)f=e.child,null!==f&&(f.return=e),wg(a,e,!0,!0);else if(null!==e.child){e.child.return=e;e=e.child;continue}if(e===b)break;for(;null===e.sibling;){if(null===e.return||e.return===b)return;e=e.return}e.sibling.return=e.return;e=e.sibling}};var Ag=function(a,
b,c,d){for(var e=b.child;null!==e;){if(5===e.tag){var f=e.stateNode;c&&d&&(f=Eb(f,e.type,e.memoizedProps,e));Ab(a,f)}else if(6===e.tag)f=e.stateNode,c&&d&&(f=Fb(f,e.memoizedProps,e)),Ab(a,f);else if(4!==e.tag)if(22===e.tag&&null!==e.memoizedState)f=e.child,null!==f&&(f.return=e),Ag(a,e,!0,!0);else if(null!==e.child){e.child.return=e;e=e.child;continue}if(e===b)break;for(;null===e.sibling;){if(null===e.return||e.return===b)return;e=e.return}e.sibling.return=e.return;e=e.sibling}};xg=function(a,b){var c=
b.stateNode;if(!vg(a,b)){a=c.containerInfo;var d=zb(a);Ag(d,b,!1,!1);c.pendingChildren=d;ug(b);Bb(a,d)}};yg=function(a,b,c,d,e){var f=a.stateNode,g=a.memoizedProps;if((a=vg(a,b))&&g===d)b.stateNode=f;else{var h=b.stateNode,k=Be(ye.current),l=null;g!==d&&(l=Ma(h,c,g,d,e,k));a&&null===l?b.stateNode=f:(f=yb(f,l,c,g,d,b,a,h),La(f,c,d,e,k)&&ug(b),b.stateNode=f,a?ug(b):wg(f,b,!1,!1))}};zg=function(a,b,c,d){c!==d?(a=Be(Ae.current),c=Be(ye.current),b.stateNode=Oa(d,a,c,b),ug(b)):b.stateNode=a.stateNode}}else xg=
function(){},yg=function(){},zg=function(){};function Bg(a,b){if(!F)switch(a.tailMode){case "hidden":b=a.tail;for(var c=null;null!==b;)null!==b.alternate&&(c=b),b=b.sibling;null===c?a.tail=null:c.sibling=null;break;case "collapsed":c=a.tail;for(var d=null;null!==c;)null!==c.alternate&&(d=c),c=c.sibling;null===d?b||null===a.tail?a.tail=null:a.tail.sibling=null:d.sibling=null}}
function Q(a){var b=null!==a.alternate&&a.alternate.child===a.child,c=0,d=0;if(b)for(var e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags&14680064,d|=e.flags&14680064,e.return=a,e=e.sibling;else for(e=a.child;null!==e;)c|=e.lanes|e.childLanes,d|=e.subtreeFlags,d|=e.flags,e.return=a,e=e.sibling;a.subtreeFlags|=d;a.childLanes=c;return b}
function Cg(a,b,c){var d=b.pendingProps;nd(b);switch(b.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Q(b),null;case 1:return A(b.type)&&mc(),Q(b),null;case 3:c=b.stateNode;De();q(z);q(x);Ie();c.pendingContext&&(c.context=c.pendingContext,c.pendingContext=null);if(null===a||null===a.child)yd(b)?ug(b):null===a||a.memoizedState.isDehydrated&&0===(b.flags&256)||(b.flags|=1024,null!==rd&&(Dg(rd),rd=null));xg(a,b);Q(b);return null;case 5:Fe(b);c=Be(Ae.current);var e=
b.type;if(null!==a&&null!=b.stateNode)yg(a,b,e,d,c),a.ref!==b.ref&&(b.flags|=512,b.flags|=2097152);else{if(!d){if(null===b.stateNode)throw Error(m(166));Q(b);return null}a=Be(ye.current);if(yd(b)){if(!Va)throw Error(m(175));a=Rb(b.stateNode,b.type,b.memoizedProps,c,a,b,!qd);b.updateQueue=a;null!==a&&ug(b)}else{var f=Ja(e,d,c,a,b);wg(f,b,!1,!1);b.stateNode=f;La(f,e,d,c,a)&&ug(b)}null!==b.ref&&(b.flags|=512,b.flags|=2097152)}Q(b);return null;case 6:if(a&&null!=b.stateNode)zg(a,b,a.memoizedProps,d);
else{if("string"!==typeof d&&null===b.stateNode)throw Error(m(166));a=Be(Ae.current);c=Be(ye.current);if(yd(b)){if(!Va)throw Error(m(176));a=b.stateNode;c=b.memoizedProps;if(d=Sb(a,c,b,!qd))if(e=od,null!==e)switch(e.tag){case 3:$b(e.stateNode.containerInfo,a,c,0!==(e.mode&1));break;case 5:ac(e.type,e.memoizedProps,e.stateNode,a,c,0!==(e.mode&1))}d&&ug(b)}else b.stateNode=Oa(d,a,c,b)}Q(b);return null;case 13:q(J);d=b.memoizedState;if(null===a||null!==a.memoizedState&&null!==a.memoizedState.dehydrated){if(F&&
null!==pd&&0!==(b.mode&1)&&0===(b.flags&128))zd(),Ad(),b.flags|=98560,e=!1;else if(e=yd(b),null!==d&&null!==d.dehydrated){if(null===a){if(!e)throw Error(m(318));if(!Va)throw Error(m(344));e=b.memoizedState;e=null!==e?e.dehydrated:null;if(!e)throw Error(m(317));Tb(e,b)}else Ad(),0===(b.flags&128)&&(b.memoizedState=null),b.flags|=4;Q(b);e=!1}else null!==rd&&(Dg(rd),rd=null),e=!0;if(!e)return b.flags&65536?b:null}if(0!==(b.flags&128))return b.lanes=c,b;c=null!==d;c!==(null!==a&&null!==a.memoizedState)&&
c&&(b.child.flags|=8192,0!==(b.mode&1)&&(null===a||0!==(J.current&1)?0===R&&(R=3):og()));null!==b.updateQueue&&(b.flags|=4);Q(b);return null;case 4:return De(),xg(a,b),null===a&&Xa(b.stateNode.containerInfo),Q(b),null;case 10:return Md(b.type._context),Q(b),null;case 17:return A(b.type)&&mc(),Q(b),null;case 19:q(J);e=b.memoizedState;if(null===e)return Q(b),null;d=0!==(b.flags&128);f=e.rendering;if(null===f)if(d)Bg(e,!1);else{if(0!==R||null!==a&&0!==(a.flags&128))for(a=b.child;null!==a;){f=Ge(a);if(null!==
f){b.flags|=128;Bg(e,!1);a=f.updateQueue;null!==a&&(b.updateQueue=a,b.flags|=4);b.subtreeFlags=0;a=c;for(c=b.child;null!==c;)d=c,e=a,d.flags&=14680066,f=d.alternate,null===f?(d.childLanes=0,d.lanes=e,d.child=null,d.subtreeFlags=0,d.memoizedProps=null,d.memoizedState=null,d.updateQueue=null,d.dependencies=null,d.stateNode=null):(d.childLanes=f.childLanes,d.lanes=f.lanes,d.child=f.child,d.subtreeFlags=0,d.deletions=null,d.memoizedProps=f.memoizedProps,d.memoizedState=f.memoizedState,d.updateQueue=f.updateQueue,
d.type=f.type,e=f.dependencies,d.dependencies=null===e?null:{lanes:e.lanes,firstContext:e.firstContext}),c=c.sibling;v(J,J.current&1|2);return b.child}a=a.sibling}null!==e.tail&&D()>Eg&&(b.flags|=128,d=!0,Bg(e,!1),b.lanes=4194304)}else{if(!d)if(a=Ge(f),null!==a){if(b.flags|=128,d=!0,a=a.updateQueue,null!==a&&(b.updateQueue=a,b.flags|=4),Bg(e,!0),null===e.tail&&"hidden"===e.tailMode&&!f.alternate&&!F)return Q(b),null}else 2*D()-e.renderingStartTime>Eg&&1073741824!==c&&(b.flags|=128,d=!0,Bg(e,!1),b.lanes=
4194304);e.isBackwards?(f.sibling=b.child,b.child=f):(a=e.last,null!==a?a.sibling=f:b.child=f,e.last=f)}if(null!==e.tail)return b=e.tail,e.rendering=b,e.tail=b.sibling,e.renderingStartTime=D(),b.sibling=null,a=J.current,v(J,d?a&1|2:a&1),b;Q(b);return null;case 22:case 23:return Fg(),c=null!==b.memoizedState,null!==a&&null!==a.memoizedState!==c&&(b.flags|=8192),c&&0!==(b.mode&1)?0!==(ag&1073741824)&&(Q(b),Ta&&b.subtreeFlags&6&&(b.flags|=8192)):Q(b),null;case 24:return null;case 25:return null}throw Error(m(156,
b.tag));}
function Gg(a,b){nd(b);switch(b.tag){case 1:return A(b.type)&&mc(),a=b.flags,a&65536?(b.flags=a&-65537|128,b):null;case 3:return De(),q(z),q(x),Ie(),a=b.flags,0!==(a&65536)&&0===(a&128)?(b.flags=a&-65537|128,b):null;case 5:return Fe(b),null;case 13:q(J);a=b.memoizedState;if(null!==a&&null!==a.dehydrated){if(null===b.alternate)throw Error(m(340));Ad()}a=b.flags;return a&65536?(b.flags=a&-65537|128,b):null;case 19:return q(J),null;case 4:return De(),null;case 10:return Md(b.type._context),null;case 22:case 23:return Fg(),
null;case 24:return null;default:return null}}var Hg=!1,S=!1,Ig="function"===typeof WeakSet?WeakSet:Set,T=null;function Jg(a,b){var c=a.ref;if(null!==c)if("function"===typeof c)try{c(null)}catch(d){U(a,b,d)}else c.current=null}function Kg(a,b,c){try{c()}catch(d){U(a,b,d)}}var Lg=!1;
function Mg(a,b){Ha(a.containerInfo);for(T=b;null!==T;)if(a=T,b=a.child,0!==(a.subtreeFlags&1028)&&null!==b)b.return=a,T=b;else for(;null!==T;){a=T;try{var c=a.alternate;if(0!==(a.flags&1024))switch(a.tag){case 0:case 11:case 15:break;case 1:if(null!==c){var d=c.memoizedProps,e=c.memoizedState,f=a.stateNode,g=f.getSnapshotBeforeUpdate(a.elementType===a.type?d:Fd(a.type,d),e);f.__reactInternalSnapshotBeforeUpdate=g}break;case 3:Ta&&xb(a.stateNode.containerInfo);break;case 5:case 6:case 4:case 17:break;
default:throw Error(m(163));}}catch(h){U(a,a.return,h)}b=a.sibling;if(null!==b){b.return=a.return;T=b;break}T=a.return}c=Lg;Lg=!1;return c}function Ng(a,b,c){var d=b.updateQueue;d=null!==d?d.lastEffect:null;if(null!==d){var e=d=d.next;do{if((e.tag&a)===a){var f=e.destroy;e.destroy=void 0;void 0!==f&&Kg(b,c,f)}e=e.next}while(e!==d)}}function Og(a,b){b=b.updateQueue;b=null!==b?b.lastEffect:null;if(null!==b){var c=b=b.next;do{if((c.tag&a)===a){var d=c.create;c.destroy=d()}c=c.next}while(c!==b)}}
function Pg(a){var b=a.ref;if(null!==b){var c=a.stateNode;switch(a.tag){case 5:a=Ea(c);break;default:a=c}"function"===typeof b?b(a):b.current=a}}function Qg(a){var b=a.alternate;null!==b&&(a.alternate=null,Qg(b));a.child=null;a.deletions=null;a.sibling=null;5===a.tag&&(b=a.stateNode,null!==b&&Za(b));a.stateNode=null;a.return=null;a.dependencies=null;a.memoizedProps=null;a.memoizedState=null;a.pendingProps=null;a.stateNode=null;a.updateQueue=null}
function Rg(a){return 5===a.tag||3===a.tag||4===a.tag}function Sg(a){a:for(;;){for(;null===a.sibling;){if(null===a.return||Rg(a.return))return null;a=a.return}a.sibling.return=a.return;for(a=a.sibling;5!==a.tag&&6!==a.tag&&18!==a.tag;){if(a.flags&2)continue a;if(null===a.child||4===a.tag)continue a;else a.child.return=a,a=a.child}if(!(a.flags&2))return a.stateNode}}
function Tg(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?pb(c,a,b):kb(c,a);else if(4!==d&&(a=a.child,null!==a))for(Tg(a,b,c),a=a.sibling;null!==a;)Tg(a,b,c),a=a.sibling}function Ug(a,b,c){var d=a.tag;if(5===d||6===d)a=a.stateNode,b?ob(c,a,b):jb(c,a);else if(4!==d&&(a=a.child,null!==a))for(Ug(a,b,c),a=a.sibling;null!==a;)Ug(a,b,c),a=a.sibling}var V=null,Vg=!1;function Wg(a,b,c){for(c=c.child;null!==c;)Xg(a,b,c),c=c.sibling}
function Xg(a,b,c){if(Sc&&"function"===typeof Sc.onCommitFiberUnmount)try{Sc.onCommitFiberUnmount(Rc,c)}catch(h){}switch(c.tag){case 5:S||Jg(c,b);case 6:if(Ta){var d=V,e=Vg;V=null;Wg(a,b,c);V=d;Vg=e;null!==V&&(Vg?rb(V,c.stateNode):qb(V,c.stateNode))}else Wg(a,b,c);break;case 18:Ta&&null!==V&&(Vg?Yb(V,c.stateNode):Xb(V,c.stateNode));break;case 4:Ta?(d=V,e=Vg,V=c.stateNode.containerInfo,Vg=!0,Wg(a,b,c),V=d,Vg=e):(Ua&&(d=c.stateNode.containerInfo,e=zb(d),Cb(d,e)),Wg(a,b,c));break;case 0:case 11:case 14:case 15:if(!S&&
(d=c.updateQueue,null!==d&&(d=d.lastEffect,null!==d))){e=d=d.next;do{var f=e,g=f.destroy;f=f.tag;void 0!==g&&(0!==(f&2)?Kg(c,b,g):0!==(f&4)&&Kg(c,b,g));e=e.next}while(e!==d)}Wg(a,b,c);break;case 1:if(!S&&(Jg(c,b),d=c.stateNode,"function"===typeof d.componentWillUnmount))try{d.props=c.memoizedProps,d.state=c.memoizedState,d.componentWillUnmount()}catch(h){U(c,b,h)}Wg(a,b,c);break;case 21:Wg(a,b,c);break;case 22:c.mode&1?(S=(d=S)||null!==c.memoizedState,Wg(a,b,c),S=d):Wg(a,b,c);break;default:Wg(a,b,
c)}}function Yg(a){var b=a.updateQueue;if(null!==b){a.updateQueue=null;var c=a.stateNode;null===c&&(c=a.stateNode=new Ig);b.forEach(function(b){var d=Zg.bind(null,a,b);c.has(b)||(c.add(b),b.then(d,d))})}}
function $g(a,b){var c=b.deletions;if(null!==c)for(var d=0;d<c.length;d++){var e=c[d];try{var f=a,g=b;if(Ta){var h=g;a:for(;null!==h;){switch(h.tag){case 5:V=h.stateNode;Vg=!1;break a;case 3:V=h.stateNode.containerInfo;Vg=!0;break a;case 4:V=h.stateNode.containerInfo;Vg=!0;break a}h=h.return}if(null===V)throw Error(m(160));Xg(f,g,e);V=null;Vg=!1}else Xg(f,g,e);var k=e.alternate;null!==k&&(k.return=null);e.return=null}catch(l){U(e,b,l)}}if(b.subtreeFlags&12854)for(b=b.child;null!==b;)ah(b,a),b=b.sibling}
function ah(a,b){var c=a.alternate,d=a.flags;switch(a.tag){case 0:case 11:case 14:case 15:$g(b,a);bh(a);if(d&4){try{Ng(3,a,a.return),Og(3,a)}catch(p){U(a,a.return,p)}try{Ng(5,a,a.return)}catch(p){U(a,a.return,p)}}break;case 1:$g(b,a);bh(a);d&512&&null!==c&&Jg(c,c.return);break;case 5:$g(b,a);bh(a);d&512&&null!==c&&Jg(c,c.return);if(Ta){if(a.flags&32){var e=a.stateNode;try{sb(e)}catch(p){U(a,a.return,p)}}if(d&4&&(e=a.stateNode,null!=e)){var f=a.memoizedProps;c=null!==c?c.memoizedProps:f;d=a.type;b=
a.updateQueue;a.updateQueue=null;if(null!==b)try{nb(e,b,d,c,f,a)}catch(p){U(a,a.return,p)}}}break;case 6:$g(b,a);bh(a);if(d&4&&Ta){if(null===a.stateNode)throw Error(m(162));e=a.stateNode;f=a.memoizedProps;c=null!==c?c.memoizedProps:f;try{lb(e,c,f)}catch(p){U(a,a.return,p)}}break;case 3:$g(b,a);bh(a);if(d&4){if(Ta&&Va&&null!==c&&c.memoizedState.isDehydrated)try{Vb(b.containerInfo)}catch(p){U(a,a.return,p)}if(Ua){e=b.containerInfo;f=b.pendingChildren;try{Cb(e,f)}catch(p){U(a,a.return,p)}}}break;case 4:$g(b,
a);bh(a);if(d&4&&Ua){f=a.stateNode;e=f.containerInfo;f=f.pendingChildren;try{Cb(e,f)}catch(p){U(a,a.return,p)}}break;case 13:$g(b,a);bh(a);e=a.child;e.flags&8192&&(f=null!==e.memoizedState,e.stateNode.isHidden=f,!f||null!==e.alternate&&null!==e.alternate.memoizedState||(ch=D()));d&4&&Yg(a);break;case 22:var g=null!==c&&null!==c.memoizedState;a.mode&1?(S=(c=S)||g,$g(b,a),S=c):$g(b,a);bh(a);if(d&8192){c=null!==a.memoizedState;if((a.stateNode.isHidden=c)&&!g&&0!==(a.mode&1))for(T=a,d=a.child;null!==
d;){for(b=T=d;null!==T;){g=T;var h=g.child;switch(g.tag){case 0:case 11:case 14:case 15:Ng(4,g,g.return);break;case 1:Jg(g,g.return);var k=g.stateNode;if("function"===typeof k.componentWillUnmount){var l=g,n=g.return;try{var t=l;k.props=t.memoizedProps;k.state=t.memoizedState;k.componentWillUnmount()}catch(p){U(l,n,p)}}break;case 5:Jg(g,g.return);break;case 22:if(null!==g.memoizedState){dh(b);continue}}null!==h?(h.return=g,T=h):dh(b)}d=d.sibling}if(Ta)a:if(d=null,Ta)for(b=a;;){if(5===b.tag){if(null===
d){d=b;try{e=b.stateNode,c?tb(e):vb(b.stateNode,b.memoizedProps)}catch(p){U(a,a.return,p)}}}else if(6===b.tag){if(null===d)try{f=b.stateNode,c?ub(f):wb(f,b.memoizedProps)}catch(p){U(a,a.return,p)}}else if((22!==b.tag&&23!==b.tag||null===b.memoizedState||b===a)&&null!==b.child){b.child.return=b;b=b.child;continue}if(b===a)break a;for(;null===b.sibling;){if(null===b.return||b.return===a)break a;d===b&&(d=null);b=b.return}d===b&&(d=null);b.sibling.return=b.return;b=b.sibling}}break;case 19:$g(b,a);bh(a);
d&4&&Yg(a);break;case 21:break;default:$g(b,a),bh(a)}}function bh(a){var b=a.flags;if(b&2){try{if(Ta){b:{for(var c=a.return;null!==c;){if(Rg(c)){var d=c;break b}c=c.return}throw Error(m(160));}switch(d.tag){case 5:var e=d.stateNode;d.flags&32&&(sb(e),d.flags&=-33);var f=Sg(a);Ug(a,f,e);break;case 3:case 4:var g=d.stateNode.containerInfo,h=Sg(a);Tg(a,h,g);break;default:throw Error(m(161));}}}catch(k){U(a,a.return,k)}a.flags&=-3}b&4096&&(a.flags&=-4097)}function eh(a,b,c){T=a;fh(a,b,c)}
function fh(a,b,c){for(var d=0!==(a.mode&1);null!==T;){var e=T,f=e.child;if(22===e.tag&&d){var g=null!==e.memoizedState||Hg;if(!g){var h=e.alternate,k=null!==h&&null!==h.memoizedState||S;h=Hg;var l=S;Hg=g;if((S=k)&&!l)for(T=e;null!==T;)g=T,k=g.child,22===g.tag&&null!==g.memoizedState?gh(e):null!==k?(k.return=g,T=k):gh(e);for(;null!==f;)T=f,fh(f,b,c),f=f.sibling;T=e;Hg=h;S=l}hh(a,b,c)}else 0!==(e.subtreeFlags&8772)&&null!==f?(f.return=e,T=f):hh(a,b,c)}}
function hh(a){for(;null!==T;){var b=T;if(0!==(b.flags&8772)){var c=b.alternate;try{if(0!==(b.flags&8772))switch(b.tag){case 0:case 11:case 15:S||Og(5,b);break;case 1:var d=b.stateNode;if(b.flags&4&&!S)if(null===c)d.componentDidMount();else{var e=b.elementType===b.type?c.memoizedProps:Fd(b.type,c.memoizedProps);d.componentDidUpdate(e,c.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var f=b.updateQueue;null!==f&&ce(b,f,d);break;case 3:var g=b.updateQueue;if(null!==g){c=null;if(null!==b.child)switch(b.child.tag){case 5:c=
Ea(b.child.stateNode);break;case 1:c=b.child.stateNode}ce(b,g,c)}break;case 5:var h=b.stateNode;null===c&&b.flags&4&&mb(h,b.type,b.memoizedProps,b);break;case 6:break;case 4:break;case 12:break;case 13:if(Va&&null===b.memoizedState){var k=b.alternate;if(null!==k){var l=k.memoizedState;if(null!==l){var n=l.dehydrated;null!==n&&Wb(n)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(m(163));}S||b.flags&512&&Pg(b)}catch(t){U(b,b.return,t)}}if(b===a){T=null;break}c=b.sibling;
if(null!==c){c.return=b.return;T=c;break}T=b.return}}function dh(a){for(;null!==T;){var b=T;if(b===a){T=null;break}var c=b.sibling;if(null!==c){c.return=b.return;T=c;break}T=b.return}}
function gh(a){for(;null!==T;){var b=T;try{switch(b.tag){case 0:case 11:case 15:var c=b.return;try{Og(4,b)}catch(k){U(b,c,k)}break;case 1:var d=b.stateNode;if("function"===typeof d.componentDidMount){var e=b.return;try{d.componentDidMount()}catch(k){U(b,e,k)}}var f=b.return;try{Pg(b)}catch(k){U(b,f,k)}break;case 5:var g=b.return;try{Pg(b)}catch(k){U(b,g,k)}}}catch(k){U(b,b.return,k)}if(b===a){T=null;break}var h=b.sibling;if(null!==h){h.return=b.return;T=h;break}T=b.return}}
var ih=0,jh=1,kh=2,lh=3,mh=4;if("function"===typeof Symbol&&Symbol.for){var nh=Symbol.for;ih=nh("selector.component");jh=nh("selector.has_pseudo_class");kh=nh("selector.role");lh=nh("selector.test_id");mh=nh("selector.text")}function oh(a){var b=Wa(a);if(null!=b){if("string"!==typeof b.memoizedProps["data-testname"])throw Error(m(364));return b}a=cb(a);if(null===a)throw Error(m(362));return a.stateNode.current}
function ph(a,b){switch(b.$$typeof){case ih:if(a.type===b.value)return!0;break;case jh:a:{b=b.value;a=[a,0];for(var c=0;c<a.length;){var d=a[c++],e=a[c++],f=b[e];if(5!==d.tag||!fb(d)){for(;null!=f&&ph(d,f);)e++,f=b[e];if(e===b.length){b=!0;break a}else for(d=d.child;null!==d;)a.push(d,e),d=d.sibling}}b=!1}return b;case kh:if(5===a.tag&&gb(a.stateNode,b.value))return!0;break;case mh:if(5===a.tag||6===a.tag)if(a=eb(a),null!==a&&0<=a.indexOf(b.value))return!0;break;case lh:if(5===a.tag&&(a=a.memoizedProps["data-testname"],
"string"===typeof a&&a.toLowerCase()===b.value.toLowerCase()))return!0;break;default:throw Error(m(365));}return!1}function qh(a){switch(a.$$typeof){case ih:return"<"+(ua(a.value)||"Unknown")+">";case jh:return":has("+(qh(a)||"")+")";case kh:return'[role="'+a.value+'"]';case mh:return'"'+a.value+'"';case lh:return'[data-testname="'+a.value+'"]';default:throw Error(m(365));}}
function rh(a,b){var c=[];a=[a,0];for(var d=0;d<a.length;){var e=a[d++],f=a[d++],g=b[f];if(5!==e.tag||!fb(e)){for(;null!=g&&ph(e,g);)f++,g=b[f];if(f===b.length)c.push(e);else for(e=e.child;null!==e;)a.push(e,f),e=e.sibling}}return c}function sh(a,b){if(!bb)throw Error(m(363));a=oh(a);a=rh(a,b);b=[];a=Array.from(a);for(var c=0;c<a.length;){var d=a[c++];if(5===d.tag)fb(d)||b.push(d.stateNode);else for(d=d.child;null!==d;)a.push(d),d=d.sibling}return b}
var th=Math.ceil,uh=da.ReactCurrentDispatcher,vh=da.ReactCurrentOwner,W=da.ReactCurrentBatchConfig,H=0,O=null,X=null,Y=0,ag=0,$f=ic(0),R=0,wh=null,be=0,xh=0,yh=0,zh=null,Ah=null,ch=0,Eg=Infinity,Bh=null;function Ch(){Eg=D()+500}var Kf=!1,Lf=null,Nf=null,Dh=!1,Eh=null,Fh=0,Gh=0,Hh=null,Ih=-1,Jh=0;function I(){return 0!==(H&6)?D():-1!==Ih?Ih:Ih=D()}function fe(a){if(0===(a.mode&1))return 1;if(0!==(H&2)&&0!==Y)return Y&-Y;if(null!==Cd.transition)return 0===Jh&&(Jh=Dc()),Jh;a=C;return 0!==a?a:Ya()}
function ge(a,b,c,d){if(50<Gh)throw Gh=0,Hh=null,Error(m(185));Fc(a,c,d);if(0===(H&2)||a!==O)a===O&&(0===(H&2)&&(xh|=c),4===R&&Kh(a,Y)),Lh(a,d),1===c&&0===H&&0===(b.mode&1)&&(Ch(),Xc&&ad())}
function Lh(a,b){var c=a.callbackNode;Bc(a,b);var d=zc(a,a===O?Y:0);if(0===d)null!==c&&Kc(c),a.callbackNode=null,a.callbackPriority=0;else if(b=d&-d,a.callbackPriority!==b){null!=c&&Kc(c);if(1===b)0===a.tag?$c(Mh.bind(null,a)):Zc(Mh.bind(null,a)),$a?ab(function(){0===(H&6)&&ad()}):Jc(Nc,ad),c=null;else{switch(Ic(d)){case 1:c=Nc;break;case 4:c=Oc;break;case 16:c=Pc;break;case 536870912:c=Qc;break;default:c=Pc}c=Nh(c,Oh.bind(null,a))}a.callbackPriority=b;a.callbackNode=c}}
function Oh(a,b){Ih=-1;Jh=0;if(0!==(H&6))throw Error(m(327));var c=a.callbackNode;if(Ph()&&a.callbackNode!==c)return null;var d=zc(a,a===O?Y:0);if(0===d)return null;if(0!==(d&30)||0!==(d&a.expiredLanes)||b)b=Qh(a,d);else{b=d;var e=H;H|=2;var f=Rh();if(O!==a||Y!==b)Bh=null,Ch(),Sh(a,b);do try{Th();break}catch(h){Uh(a,h)}while(1);Kd();uh.current=f;H=e;null!==X?b=0:(O=null,Y=0,b=R)}if(0!==b){2===b&&(e=Cc(a),0!==e&&(d=e,b=Vh(a,e)));if(1===b)throw c=wh,Sh(a,0),Kh(a,d),Lh(a,D()),c;if(6===b)Kh(a,d);else{e=
a.current.alternate;if(0===(d&30)&&!Wh(e)&&(b=Qh(a,d),2===b&&(f=Cc(a),0!==f&&(d=f,b=Vh(a,f))),1===b))throw c=wh,Sh(a,0),Kh(a,d),Lh(a,D()),c;a.finishedWork=e;a.finishedLanes=d;switch(b){case 0:case 1:throw Error(m(345));case 2:Xh(a,Ah,Bh);break;case 3:Kh(a,d);if((d&130023424)===d&&(b=ch+500-D(),10<b)){if(0!==zc(a,0))break;e=a.suspendedLanes;if((e&d)!==d){I();a.pingedLanes|=a.suspendedLanes&e;break}a.timeoutHandle=Pa(Xh.bind(null,a,Ah,Bh),b);break}Xh(a,Ah,Bh);break;case 4:Kh(a,d);if((d&4194240)===d)break;
b=a.eventTimes;for(e=-1;0<d;){var g=31-tc(d);f=1<<g;g=b[g];g>e&&(e=g);d&=~f}d=e;d=D()-d;d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3E3>d?3E3:4320>d?4320:1960*th(d/1960))-d;if(10<d){a.timeoutHandle=Pa(Xh.bind(null,a,Ah,Bh),d);break}Xh(a,Ah,Bh);break;case 5:Xh(a,Ah,Bh);break;default:throw Error(m(329));}}}Lh(a,D());return a.callbackNode===c?Oh.bind(null,a):null}
function Vh(a,b){var c=zh;a.current.memoizedState.isDehydrated&&(Sh(a,b).flags|=256);a=Qh(a,b);2!==a&&(b=Ah,Ah=c,null!==b&&Dg(b));return a}function Dg(a){null===Ah?Ah=a:Ah.push.apply(Ah,a)}
function Wh(a){for(var b=a;;){if(b.flags&16384){var c=b.updateQueue;if(null!==c&&(c=c.stores,null!==c))for(var d=0;d<c.length;d++){var e=c[d],f=e.getSnapshot;e=e.value;try{if(!Vc(f(),e))return!1}catch(g){return!1}}}c=b.child;if(b.subtreeFlags&16384&&null!==c)c.return=b,b=c;else{if(b===a)break;for(;null===b.sibling;){if(null===b.return||b.return===a)return!0;b=b.return}b.sibling.return=b.return;b=b.sibling}}return!0}
function Kh(a,b){b&=~yh;b&=~xh;a.suspendedLanes|=b;a.pingedLanes&=~b;for(a=a.expirationTimes;0<b;){var c=31-tc(b),d=1<<c;a[c]=-1;b&=~d}}function Mh(a){if(0!==(H&6))throw Error(m(327));Ph();var b=zc(a,0);if(0===(b&1))return Lh(a,D()),null;var c=Qh(a,b);if(0!==a.tag&&2===c){var d=Cc(a);0!==d&&(b=d,c=Vh(a,d))}if(1===c)throw c=wh,Sh(a,0),Kh(a,b),Lh(a,D()),c;if(6===c)throw Error(m(345));a.finishedWork=a.current.alternate;a.finishedLanes=b;Xh(a,Ah,Bh);Lh(a,D());return null}
function Yh(a){null!==Eh&&0===Eh.tag&&0===(H&6)&&Ph();var b=H;H|=1;var c=W.transition,d=C;try{if(W.transition=null,C=1,a)return a()}finally{C=d,W.transition=c,H=b,0===(H&6)&&ad()}}function Fg(){ag=$f.current;q($f)}
function Sh(a,b){a.finishedWork=null;a.finishedLanes=0;var c=a.timeoutHandle;c!==Ra&&(a.timeoutHandle=Ra,Qa(c));if(null!==X)for(c=X.return;null!==c;){var d=c;nd(d);switch(d.tag){case 1:d=d.type.childContextTypes;null!==d&&void 0!==d&&mc();break;case 3:De();q(z);q(x);Ie();break;case 5:Fe(d);break;case 4:De();break;case 13:q(J);break;case 19:q(J);break;case 10:Md(d.type._context);break;case 22:case 23:Fg()}c=c.return}O=a;X=a=qe(a.current,null);Y=ag=b;R=0;wh=null;yh=xh=be=0;Ah=zh=null;if(null!==Qd){for(b=
0;b<Qd.length;b++)if(c=Qd[b],d=c.interleaved,null!==d){c.interleaved=null;var e=d.next,f=c.pending;if(null!==f){var g=f.next;f.next=e;d.next=g}c.pending=d}Qd=null}return a}
function Uh(a,b){do{var c=X;try{Kd();Je.current=Ve;if(Me){for(var d=K.memoizedState;null!==d;){var e=d.queue;null!==e&&(e.pending=null);d=d.next}Me=!1}Le=0;M=L=K=null;Ne=!1;Oe=0;vh.current=null;if(null===c||null===c.return){R=1;wh=b;X=null;break}a:{var f=a,g=c.return,h=c,k=b;b=Y;h.flags|=32768;if(null!==k&&"object"===typeof k&&"function"===typeof k.then){var l=k,n=h,t=n.tag;if(0===(n.mode&1)&&(0===t||11===t||15===t)){var p=n.alternate;p?(n.updateQueue=p.updateQueue,n.memoizedState=p.memoizedState,
n.lanes=p.lanes):(n.updateQueue=null,n.memoizedState=null)}var B=Qf(g);if(null!==B){B.flags&=-257;Rf(B,g,h,f,b);B.mode&1&&Of(f,l,b);b=B;k=l;var w=b.updateQueue;if(null===w){var Z=new Set;Z.add(k);b.updateQueue=Z}else w.add(k);break a}else{if(0===(b&1)){Of(f,l,b);og();break a}k=Error(m(426))}}else if(F&&h.mode&1){var za=Qf(g);if(null!==za){0===(za.flags&65536)&&(za.flags|=256);Rf(za,g,h,f,b);Bd(Ff(k,h));break a}}f=k=Ff(k,h);4!==R&&(R=2);null===zh?zh=[f]:zh.push(f);f=g;do{switch(f.tag){case 3:f.flags|=
65536;b&=-b;f.lanes|=b;var E=Jf(f,k,b);$d(f,E);break a;case 1:h=k;var r=f.type,u=f.stateNode;if(0===(f.flags&128)&&("function"===typeof r.getDerivedStateFromError||null!==u&&"function"===typeof u.componentDidCatch&&(null===Nf||!Nf.has(u)))){f.flags|=65536;b&=-b;f.lanes|=b;var Db=Mf(f,h,b);$d(f,Db);break a}}f=f.return}while(null!==f)}Zh(c)}catch(qc){b=qc;X===c&&null!==c&&(X=c=c.return);continue}break}while(1)}function Rh(){var a=uh.current;uh.current=Ve;return null===a?Ve:a}
function og(){if(0===R||3===R||2===R)R=4;null===O||0===(be&268435455)&&0===(xh&268435455)||Kh(O,Y)}function Qh(a,b){var c=H;H|=2;var d=Rh();if(O!==a||Y!==b)Bh=null,Sh(a,b);do try{$h();break}catch(e){Uh(a,e)}while(1);Kd();H=c;uh.current=d;if(null!==X)throw Error(m(261));O=null;Y=0;return R}function $h(){for(;null!==X;)ai(X)}function Th(){for(;null!==X&&!Lc();)ai(X)}function ai(a){var b=bi(a.alternate,a,ag);a.memoizedProps=a.pendingProps;null===b?Zh(a):X=b;vh.current=null}
function Zh(a){var b=a;do{var c=b.alternate;a=b.return;if(0===(b.flags&32768)){if(c=Cg(c,b,ag),null!==c){X=c;return}}else{c=Gg(c,b);if(null!==c){c.flags&=32767;X=c;return}if(null!==a)a.flags|=32768,a.subtreeFlags=0,a.deletions=null;else{R=6;X=null;return}}b=b.sibling;if(null!==b){X=b;return}X=b=a}while(null!==b);0===R&&(R=5)}function Xh(a,b,c){var d=C,e=W.transition;try{W.transition=null,C=1,ci(a,b,c,d)}finally{W.transition=e,C=d}return null}
function ci(a,b,c,d){do Ph();while(null!==Eh);if(0!==(H&6))throw Error(m(327));c=a.finishedWork;var e=a.finishedLanes;if(null===c)return null;a.finishedWork=null;a.finishedLanes=0;if(c===a.current)throw Error(m(177));a.callbackNode=null;a.callbackPriority=0;var f=c.lanes|c.childLanes;Gc(a,f);a===O&&(X=O=null,Y=0);0===(c.subtreeFlags&2064)&&0===(c.flags&2064)||Dh||(Dh=!0,Nh(Pc,function(){Ph();return null}));f=0!==(c.flags&15990);if(0!==(c.subtreeFlags&15990)||f){f=W.transition;W.transition=null;var g=
C;C=1;var h=H;H|=4;vh.current=null;Mg(a,c);ah(c,a);Ia(a.containerInfo);a.current=c;eh(c,a,e);Mc();H=h;C=g;W.transition=f}else a.current=c;Dh&&(Dh=!1,Eh=a,Fh=e);f=a.pendingLanes;0===f&&(Nf=null);Tc(c.stateNode,d);Lh(a,D());if(null!==b)for(d=a.onRecoverableError,c=0;c<b.length;c++)e=b[c],d(e.value,{componentStack:e.stack,digest:e.digest});if(Kf)throw Kf=!1,a=Lf,Lf=null,a;0!==(Fh&1)&&0!==a.tag&&Ph();f=a.pendingLanes;0!==(f&1)?a===Hh?Gh++:(Gh=0,Hh=a):Gh=0;ad();return null}
function Ph(){if(null!==Eh){var a=Ic(Fh),b=W.transition,c=C;try{W.transition=null;C=16>a?16:a;if(null===Eh)var d=!1;else{a=Eh;Eh=null;Fh=0;if(0!==(H&6))throw Error(m(331));var e=H;H|=4;for(T=a.current;null!==T;){var f=T,g=f.child;if(0!==(T.flags&16)){var h=f.deletions;if(null!==h){for(var k=0;k<h.length;k++){var l=h[k];for(T=l;null!==T;){var n=T;switch(n.tag){case 0:case 11:case 15:Ng(8,n,f)}var t=n.child;if(null!==t)t.return=n,T=t;else for(;null!==T;){n=T;var p=n.sibling,B=n.return;Qg(n);if(n===
l){T=null;break}if(null!==p){p.return=B;T=p;break}T=B}}}var w=f.alternate;if(null!==w){var Z=w.child;if(null!==Z){w.child=null;do{var za=Z.sibling;Z.sibling=null;Z=za}while(null!==Z)}}T=f}}if(0!==(f.subtreeFlags&2064)&&null!==g)g.return=f,T=g;else b:for(;null!==T;){f=T;if(0!==(f.flags&2048))switch(f.tag){case 0:case 11:case 15:Ng(9,f,f.return)}var E=f.sibling;if(null!==E){E.return=f.return;T=E;break b}T=f.return}}var r=a.current;for(T=r;null!==T;){g=T;var u=g.child;if(0!==(g.subtreeFlags&2064)&&null!==
u)u.return=g,T=u;else b:for(g=r;null!==T;){h=T;if(0!==(h.flags&2048))try{switch(h.tag){case 0:case 11:case 15:Og(9,h)}}catch(qc){U(h,h.return,qc)}if(h===g){T=null;break b}var Db=h.sibling;if(null!==Db){Db.return=h.return;T=Db;break b}T=h.return}}H=e;ad();if(Sc&&"function"===typeof Sc.onPostCommitFiberRoot)try{Sc.onPostCommitFiberRoot(Rc,a)}catch(qc){}d=!0}return d}finally{C=c,W.transition=b}}return!1}function di(a,b,c){b=Ff(c,b);b=Jf(a,b,1);a=Yd(a,b,1);b=I();null!==a&&(Fc(a,1,b),Lh(a,b))}
function U(a,b,c){if(3===a.tag)di(a,a,c);else for(;null!==b;){if(3===b.tag){di(b,a,c);break}else if(1===b.tag){var d=b.stateNode;if("function"===typeof b.type.getDerivedStateFromError||"function"===typeof d.componentDidCatch&&(null===Nf||!Nf.has(d))){a=Ff(c,a);a=Mf(b,a,1);b=Yd(b,a,1);a=I();null!==b&&(Fc(b,1,a),Lh(b,a));break}}b=b.return}}
function Pf(a,b,c){var d=a.pingCache;null!==d&&d.delete(b);b=I();a.pingedLanes|=a.suspendedLanes&c;O===a&&(Y&c)===c&&(4===R||3===R&&(Y&130023424)===Y&&500>D()-ch?Sh(a,0):yh|=c);Lh(a,b)}function ei(a,b){0===b&&(0===(a.mode&1)?b=1:(b=xc,xc<<=1,0===(xc&130023424)&&(xc=4194304)));var c=I();a=Td(a,b);null!==a&&(Fc(a,b,c),Lh(a,c))}function pg(a){var b=a.memoizedState,c=0;null!==b&&(c=b.retryLane);ei(a,c)}
function Zg(a,b){var c=0;switch(a.tag){case 13:var d=a.stateNode;var e=a.memoizedState;null!==e&&(c=e.retryLane);break;case 19:d=a.stateNode;break;default:throw Error(m(314));}null!==d&&d.delete(b);ei(a,c)}var bi;
bi=function(a,b,c){if(null!==a)if(a.memoizedProps!==b.pendingProps||z.current)G=!0;else{if(0===(a.lanes&c)&&0===(b.flags&128))return G=!1,tg(a,b,c);G=0!==(a.flags&131072)?!0:!1}else G=!1,F&&0!==(b.flags&1048576)&&ld(b,ed,b.index);b.lanes=0;switch(b.tag){case 2:var d=b.type;dg(a,b);a=b.pendingProps;var e=lc(b,x.current);Od(b,c);e=Re(null,b,d,a,e,c);var f=We();b.flags|=1;"object"===typeof e&&null!==e&&"function"===typeof e.render&&void 0===e.$$typeof?(b.tag=1,b.memoizedState=null,b.updateQueue=null,
A(d)?(f=!0,pc(b)):f=!1,b.memoizedState=null!==e.state&&void 0!==e.state?e.state:null,Vd(b),e.updater=he,b.stateNode=e,e._reactInternals=b,le(b,d,a,c),b=eg(null,b,d,!0,f,c)):(b.tag=0,F&&f&&md(b),P(null,b,e,c),b=b.child);return b;case 16:d=b.elementType;a:{dg(a,b);a=b.pendingProps;e=d._init;d=e(d._payload);b.type=d;e=b.tag=fi(d);a=Fd(d,a);switch(e){case 0:b=Yf(null,b,d,a,c);break a;case 1:b=cg(null,b,d,a,c);break a;case 11:b=Tf(null,b,d,a,c);break a;case 14:b=Vf(null,b,d,Fd(d.type,a),c);break a}throw Error(m(306,
d,""));}return b;case 0:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Fd(d,e),Yf(a,b,d,e,c);case 1:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Fd(d,e),cg(a,b,d,e,c);case 3:a:{fg(b);if(null===a)throw Error(m(387));d=b.pendingProps;f=b.memoizedState;e=f.element;Wd(a,b);ae(b,d,null,c);var g=b.memoizedState;d=g.element;if(Va&&f.isDehydrated)if(f={element:d,isDehydrated:!1,cache:g.cache,pendingSuspenseBoundaries:g.pendingSuspenseBoundaries,transitions:g.transitions},b.updateQueue.baseState=
f,b.memoizedState=f,b.flags&256){e=Ff(Error(m(423)),b);b=gg(a,b,d,c,e);break a}else if(d!==e){e=Ff(Error(m(424)),b);b=gg(a,b,d,c,e);break a}else for(Va&&(pd=Pb(b.stateNode.containerInfo),od=b,F=!0,rd=null,qd=!1),c=we(b,null,d,c),b.child=c;c;)c.flags=c.flags&-3|4096,c=c.sibling;else{Ad();if(d===e){b=Uf(a,b,c);break a}P(a,b,d,c)}b=b.child}return b;case 5:return Ee(b),null===a&&wd(b),d=b.type,e=b.pendingProps,f=null!==a?a.memoizedProps:null,g=e.children,Na(d,e)?g=null:null!==f&&Na(d,f)&&(b.flags|=32),
bg(a,b),P(a,b,g,c),b.child;case 6:return null===a&&wd(b),null;case 13:return jg(a,b,c);case 4:return Ce(b,b.stateNode.containerInfo),d=b.pendingProps,null===a?b.child=ve(b,null,d,c):P(a,b,d,c),b.child;case 11:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Fd(d,e),Tf(a,b,d,e,c);case 7:return P(a,b,b.pendingProps,c),b.child;case 8:return P(a,b,b.pendingProps.children,c),b.child;case 12:return P(a,b,b.pendingProps.children,c),b.child;case 10:a:{d=b.type._context;e=b.pendingProps;f=b.memoizedProps;
g=e.value;Ld(b,d,g);if(null!==f)if(Vc(f.value,g)){if(f.children===e.children&&!z.current){b=Uf(a,b,c);break a}}else for(f=b.child,null!==f&&(f.return=b);null!==f;){var h=f.dependencies;if(null!==h){g=f.child;for(var k=h.firstContext;null!==k;){if(k.context===d){if(1===f.tag){k=Xd(-1,c&-c);k.tag=2;var l=f.updateQueue;if(null!==l){l=l.shared;var n=l.pending;null===n?k.next=k:(k.next=n.next,n.next=k);l.pending=k}}f.lanes|=c;k=f.alternate;null!==k&&(k.lanes|=c);Nd(f.return,c,b);h.lanes|=c;break}k=k.next}}else if(10===
f.tag)g=f.type===b.type?null:f.child;else if(18===f.tag){g=f.return;if(null===g)throw Error(m(341));g.lanes|=c;h=g.alternate;null!==h&&(h.lanes|=c);Nd(g,c,b);g=f.sibling}else g=f.child;if(null!==g)g.return=f;else for(g=f;null!==g;){if(g===b){g=null;break}f=g.sibling;if(null!==f){f.return=g.return;g=f;break}g=g.return}f=g}P(a,b,e.children,c);b=b.child}return b;case 9:return e=b.type,d=b.pendingProps.children,Od(b,c),e=Pd(e),d=d(e),b.flags|=1,P(a,b,d,c),b.child;case 14:return d=b.type,e=Fd(d,b.pendingProps),
e=Fd(d.type,e),Vf(a,b,d,e,c);case 15:return Xf(a,b,b.type,b.pendingProps,c);case 17:return d=b.type,e=b.pendingProps,e=b.elementType===d?e:Fd(d,e),dg(a,b),b.tag=1,A(d)?(a=!0,pc(b)):a=!1,Od(b,c),je(b,d,e),le(b,d,e,c),eg(null,b,d,!0,a,c);case 19:return sg(a,b,c);case 22:return Zf(a,b,c)}throw Error(m(156,b.tag));};function Nh(a,b){return Jc(a,b)}
function gi(a,b,c,d){this.tag=a;this.key=c;this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null;this.index=0;this.ref=null;this.pendingProps=b;this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null;this.mode=d;this.subtreeFlags=this.flags=0;this.deletions=null;this.childLanes=this.lanes=0;this.alternate=null}function td(a,b,c,d){return new gi(a,b,c,d)}function Wf(a){a=a.prototype;return!(!a||!a.isReactComponent)}
function fi(a){if("function"===typeof a)return Wf(a)?1:0;if(void 0!==a&&null!==a){a=a.$$typeof;if(a===ma)return 11;if(a===pa)return 14}return 2}
function qe(a,b){var c=a.alternate;null===c?(c=td(a.tag,b,a.key,a.mode),c.elementType=a.elementType,c.type=a.type,c.stateNode=a.stateNode,c.alternate=a,a.alternate=c):(c.pendingProps=b,c.type=a.type,c.flags=0,c.subtreeFlags=0,c.deletions=null);c.flags=a.flags&14680064;c.childLanes=a.childLanes;c.lanes=a.lanes;c.child=a.child;c.memoizedProps=a.memoizedProps;c.memoizedState=a.memoizedState;c.updateQueue=a.updateQueue;b=a.dependencies;c.dependencies=null===b?null:{lanes:b.lanes,firstContext:b.firstContext};
c.sibling=a.sibling;c.index=a.index;c.ref=a.ref;return c}
function se(a,b,c,d,e,f){var g=2;d=a;if("function"===typeof a)Wf(a)&&(g=1);else if("string"===typeof a)g=5;else a:switch(a){case ha:return ue(c.children,e,f,b);case ia:g=8;e|=8;break;case ja:return a=td(12,c,b,e|2),a.elementType=ja,a.lanes=f,a;case na:return a=td(13,c,b,e),a.elementType=na,a.lanes=f,a;case oa:return a=td(19,c,b,e),a.elementType=oa,a.lanes=f,a;case ra:return kg(c,e,f,b);default:if("object"===typeof a&&null!==a)switch(a.$$typeof){case ka:g=10;break a;case la:g=9;break a;case ma:g=11;
break a;case pa:g=14;break a;case qa:g=16;d=null;break a}throw Error(m(130,null==a?a:typeof a,""));}b=td(g,c,b,e);b.elementType=a;b.type=d;b.lanes=f;return b}function ue(a,b,c,d){a=td(7,a,d,b);a.lanes=c;return a}function kg(a,b,c,d){a=td(22,a,d,b);a.elementType=ra;a.lanes=c;a.stateNode={isHidden:!1};return a}function re(a,b,c){a=td(6,a,null,b);a.lanes=c;return a}
function te(a,b,c){b=td(4,null!==a.children?a.children:[],a.key,b);b.lanes=c;b.stateNode={containerInfo:a.containerInfo,pendingChildren:null,implementation:a.implementation};return b}
function hi(a,b,c,d,e){this.tag=b;this.containerInfo=a;this.finishedWork=this.pingCache=this.current=this.pendingChildren=null;this.timeoutHandle=Ra;this.callbackNode=this.pendingContext=this.context=null;this.callbackPriority=0;this.eventTimes=Ec(0);this.expirationTimes=Ec(-1);this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0;this.entanglements=Ec(0);this.identifierPrefix=d;this.onRecoverableError=e;Va&&(this.mutableSourceEagerHydrationData=
null)}function ii(a,b,c,d,e,f,g,h,k){a=new hi(a,b,c,h,k);1===b?(b=1,!0===f&&(b|=8)):b=0;f=td(3,null,null,b);a.current=f;f.stateNode=a;f.memoizedState={element:d,isDehydrated:c,cache:null,transitions:null,pendingSuspenseBoundaries:null};Vd(f);return a}
function ji(a){if(!a)return jc;a=a._reactInternals;a:{if(wa(a)!==a||1!==a.tag)throw Error(m(170));var b=a;do{switch(b.tag){case 3:b=b.stateNode.context;break a;case 1:if(A(b.type)){b=b.stateNode.__reactInternalMemoizedMergedChildContext;break a}}b=b.return}while(null!==b);throw Error(m(171));}if(1===a.tag){var c=a.type;if(A(c))return oc(a,c,b)}return b}
function ki(a){var b=a._reactInternals;if(void 0===b){if("function"===typeof a.render)throw Error(m(188));a=Object.keys(a).join(",");throw Error(m(268,a));}a=Aa(b);return null===a?null:a.stateNode}function li(a,b){a=a.memoizedState;if(null!==a&&null!==a.dehydrated){var c=a.retryLane;a.retryLane=0!==c&&c<b?c:b}}function mi(a,b){li(a,b);(a=a.alternate)&&li(a,b)}function ni(a){a=Aa(a);return null===a?null:a.stateNode}function oi(){return null}
exports.attemptContinuousHydration=function(a){if(13===a.tag){var b=Td(a,134217728);if(null!==b){var c=I();ge(b,a,134217728,c)}mi(a,134217728)}};exports.attemptDiscreteHydration=function(a){if(13===a.tag){var b=Td(a,1);if(null!==b){var c=I();ge(b,a,1,c)}mi(a,1)}};exports.attemptHydrationAtCurrentPriority=function(a){if(13===a.tag){var b=fe(a),c=Td(a,b);if(null!==c){var d=I();ge(c,a,b,d)}mi(a,b)}};
exports.attemptSynchronousHydration=function(a){switch(a.tag){case 3:var b=a.stateNode;if(b.current.memoizedState.isDehydrated){var c=yc(b.pendingLanes);0!==c&&(Hc(b,c|1),Lh(b,D()),0===(H&6)&&(Ch(),ad()))}break;case 13:Yh(function(){var b=Td(a,1);if(null!==b){var c=I();ge(b,a,1,c)}}),mi(a,1)}};exports.batchedUpdates=function(a,b){var c=H;H|=1;try{return a(b)}finally{H=c,0===H&&(Ch(),Xc&&ad())}};exports.createComponentSelector=function(a){return{$$typeof:ih,value:a}};
exports.createContainer=function(a,b,c,d,e,f,g){return ii(a,b,!1,null,c,d,e,f,g)};exports.createHasPseudoClassSelector=function(a){return{$$typeof:jh,value:a}};exports.createHydrationContainer=function(a,b,c,d,e,f,g,h,k){a=ii(c,d,!0,a,e,f,g,h,k);a.context=ji(null);c=a.current;d=I();e=fe(c);f=Xd(d,e);f.callback=void 0!==b&&null!==b?b:null;Yd(c,f,e);a.current.lanes=e;Fc(a,e,d);Lh(a,d);return a};
exports.createPortal=function(a,b,c){var d=3<arguments.length&&void 0!==arguments[3]?arguments[3]:null;return{$$typeof:fa,key:null==d?null:""+d,children:a,containerInfo:b,implementation:c}};exports.createRoleSelector=function(a){return{$$typeof:kh,value:a}};exports.createTestNameSelector=function(a){return{$$typeof:lh,value:a}};exports.createTextSelector=function(a){return{$$typeof:mh,value:a}};
exports.deferredUpdates=function(a){var b=C,c=W.transition;try{return W.transition=null,C=16,a()}finally{C=b,W.transition=c}};exports.discreteUpdates=function(a,b,c,d,e){var f=C,g=W.transition;try{return W.transition=null,C=1,a(b,c,d,e)}finally{C=f,W.transition=g,0===H&&Ch()}};exports.findAllNodes=sh;
exports.findBoundingRects=function(a,b){if(!bb)throw Error(m(363));b=sh(a,b);a=[];for(var c=0;c<b.length;c++)a.push(db(b[c]));for(b=a.length-1;0<b;b--){c=a[b];for(var d=c.x,e=d+c.width,f=c.y,g=f+c.height,h=b-1;0<=h;h--)if(b!==h){var k=a[h],l=k.x,n=l+k.width,t=k.y,p=t+k.height;if(d>=l&&f>=t&&e<=n&&g<=p){a.splice(b,1);break}else if(!(d!==l||c.width!==k.width||p<f||t>g)){t>f&&(k.height+=t-f,k.y=f);p<g&&(k.height=g-t);a.splice(b,1);break}else if(!(f!==t||c.height!==k.height||n<d||l>e)){l>d&&(k.width+=
l-d,k.x=d);n<e&&(k.width=e-l);a.splice(b,1);break}}}return a};exports.findHostInstance=ki;exports.findHostInstanceWithNoPortals=function(a){a=ya(a);a=null!==a?Ca(a):null;return null===a?null:a.stateNode};exports.findHostInstanceWithWarning=function(a){return ki(a)};exports.flushControlled=function(a){var b=H;H|=1;var c=W.transition,d=C;try{W.transition=null,C=1,a()}finally{C=d,W.transition=c,H=b,0===H&&(Ch(),ad())}};exports.flushPassiveEffects=Ph;exports.flushSync=Yh;
exports.focusWithin=function(a,b){if(!bb)throw Error(m(363));a=oh(a);b=rh(a,b);b=Array.from(b);for(a=0;a<b.length;){var c=b[a++];if(!fb(c)){if(5===c.tag&&hb(c.stateNode))return!0;for(c=c.child;null!==c;)b.push(c),c=c.sibling}}return!1};exports.getCurrentUpdatePriority=function(){return C};
exports.getFindAllNodesFailureDescription=function(a,b){if(!bb)throw Error(m(363));var c=0,d=[];a=[oh(a),0];for(var e=0;e<a.length;){var f=a[e++],g=a[e++],h=b[g];if(5!==f.tag||!fb(f))if(ph(f,h)&&(d.push(qh(h)),g++,g>c&&(c=g)),g<b.length)for(f=f.child;null!==f;)a.push(f,g),f=f.sibling}if(c<b.length){for(a=[];c<b.length;c++)a.push(qh(b[c]));return"findAllNodes was able to match part of the selector:\n  "+(d.join(" > ")+"\n\nNo matching component was found for:\n  ")+a.join(" > ")}return null};
exports.getPublicRootInstance=function(a){a=a.current;if(!a.child)return null;switch(a.child.tag){case 5:return Ea(a.child.stateNode);default:return a.child.stateNode}};
exports.injectIntoDevTools=function(a){a={bundleType:a.bundleType,version:a.version,rendererPackageName:a.rendererPackageName,rendererConfig:a.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:da.ReactCurrentDispatcher,findHostInstanceByFiber:ni,findFiberByHostInstance:a.findFiberByHostInstance||
oi,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0"};if("undefined"===typeof __REACT_DEVTOOLS_GLOBAL_HOOK__)a=!1;else{var b=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(b.isDisabled||!b.supportsFiber)a=!0;else{try{Rc=b.inject(a),Sc=b}catch(c){}a=b.checkDCE?!0:!1}}return a};exports.isAlreadyRendering=function(){return!1};
exports.observeVisibleRects=function(a,b,c,d){if(!bb)throw Error(m(363));a=sh(a,b);var e=ib(a,c,d).disconnect;return{disconnect:function(){e()}}};exports.registerMutableSourceForHydration=function(a,b){var c=b._getVersion;c=c(b._source);null==a.mutableSourceEagerHydrationData?a.mutableSourceEagerHydrationData=[b,c]:a.mutableSourceEagerHydrationData.push(b,c)};exports.runWithPriority=function(a,b){var c=C;try{return C=a,b()}finally{C=c}};exports.shouldError=function(){return null};
exports.shouldSuspend=function(){return!1};exports.updateContainer=function(a,b,c,d){var e=b.current,f=I(),g=fe(e);c=ji(c);null===b.context?b.context=c:b.pendingContext=c;b=Xd(f,g);b.payload={element:a};d=void 0===d?null:d;null!==d&&(b.callback=d);a=Yd(e,b,g);null!==a&&(ge(a,e,g,f),Zd(a,e,g));return g};

    return exports;
};


}),
28: (function (__unused_webpack_module, exports) {
"use strict";
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
if (true) {
    (function() {
        'use strict';
        // ATTENTION
        // When adding new symbols to this file,
        // Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
        // The Symbol used to tag the ReactElement-like types.
        var REACT_ELEMENT_TYPE = Symbol.for('react.element');
        var REACT_PORTAL_TYPE = Symbol.for('react.portal');
        var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
        var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
        var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
        var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
        var REACT_CONTEXT_TYPE = Symbol.for('react.context');
        var REACT_SERVER_CONTEXT_TYPE = Symbol.for('react.server_context');
        var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
        var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
        var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
        var REACT_MEMO_TYPE = Symbol.for('react.memo');
        var REACT_LAZY_TYPE = Symbol.for('react.lazy');
        var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
        // -----------------------------------------------------------------------------
        var enableScopeAPI = false; // Experimental Create Event Handle API.
        var enableCacheElement = false;
        var enableTransitionTracing = false; // No known bugs, but needs performance testing
        var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
        // stuff. Intended to enable React core members to more easily debug scheduling
        // issues in DEV builds.
        var enableDebugTracing = false; // Track which Fiber(s) schedule render work.
        var REACT_MODULE_REFERENCE;
        {
            REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
        }
        function isValidElementType(type) {
            if (typeof type === 'string' || typeof type === 'function') {
                return true;
            } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).
            if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
                return true;
            }
            if (_typeof(type) === 'object' && type !== null) {
                if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
                // types supported by any Flight configuration anywhere since
                // we don't know which Flight build this will end up being used
                // with.
                type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
                    return true;
                }
            }
            return false;
        }
        function typeOf(object) {
            if (_typeof(object) === 'object' && object !== null) {
                var $$typeof = object.$$typeof;
                switch($$typeof){
                    case REACT_ELEMENT_TYPE:
                        var type = object.type;
                        switch(type){
                            case REACT_FRAGMENT_TYPE:
                            case REACT_PROFILER_TYPE:
                            case REACT_STRICT_MODE_TYPE:
                            case REACT_SUSPENSE_TYPE:
                            case REACT_SUSPENSE_LIST_TYPE:
                                return type;
                            default:
                                var $$typeofType = type && type.$$typeof;
                                switch($$typeofType){
                                    case REACT_SERVER_CONTEXT_TYPE:
                                    case REACT_CONTEXT_TYPE:
                                    case REACT_FORWARD_REF_TYPE:
                                    case REACT_LAZY_TYPE:
                                    case REACT_MEMO_TYPE:
                                    case REACT_PROVIDER_TYPE:
                                        return $$typeofType;
                                    default:
                                        return $$typeof;
                                }
                        }
                    case REACT_PORTAL_TYPE:
                        return $$typeof;
                }
            }
            return undefined;
        }
        var ContextConsumer = REACT_CONTEXT_TYPE;
        var ContextProvider = REACT_PROVIDER_TYPE;
        var Element = REACT_ELEMENT_TYPE;
        var ForwardRef = REACT_FORWARD_REF_TYPE;
        var Fragment = REACT_FRAGMENT_TYPE;
        var Lazy = REACT_LAZY_TYPE;
        var Memo = REACT_MEMO_TYPE;
        var Portal = REACT_PORTAL_TYPE;
        var Profiler = REACT_PROFILER_TYPE;
        var StrictMode = REACT_STRICT_MODE_TYPE;
        var Suspense = REACT_SUSPENSE_TYPE;
        var SuspenseList = REACT_SUSPENSE_LIST_TYPE;
        var hasWarnedAboutDeprecatedIsAsyncMode = false;
        var hasWarnedAboutDeprecatedIsConcurrentMode = false; // AsyncMode should be deprecated
        function isAsyncMode(object) {
            {
                if (!hasWarnedAboutDeprecatedIsAsyncMode) {
                    hasWarnedAboutDeprecatedIsAsyncMode = true; // Using console['warn'] to evade Babel and ESLint
                    console['warn']('The ReactIs.isAsyncMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
                }
            }
            return false;
        }
        function isConcurrentMode(object) {
            {
                if (!hasWarnedAboutDeprecatedIsConcurrentMode) {
                    hasWarnedAboutDeprecatedIsConcurrentMode = true; // Using console['warn'] to evade Babel and ESLint
                    console['warn']('The ReactIs.isConcurrentMode() alias has been deprecated, ' + 'and will be removed in React 18+.');
                }
            }
            return false;
        }
        function isContextConsumer(object) {
            return typeOf(object) === REACT_CONTEXT_TYPE;
        }
        function isContextProvider(object) {
            return typeOf(object) === REACT_PROVIDER_TYPE;
        }
        function isElement(object) {
            return _typeof(object) === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function isForwardRef(object) {
            return typeOf(object) === REACT_FORWARD_REF_TYPE;
        }
        function isFragment(object) {
            return typeOf(object) === REACT_FRAGMENT_TYPE;
        }
        function isLazy(object) {
            return typeOf(object) === REACT_LAZY_TYPE;
        }
        function isMemo(object) {
            return typeOf(object) === REACT_MEMO_TYPE;
        }
        function isPortal(object) {
            return typeOf(object) === REACT_PORTAL_TYPE;
        }
        function isProfiler(object) {
            return typeOf(object) === REACT_PROFILER_TYPE;
        }
        function isStrictMode(object) {
            return typeOf(object) === REACT_STRICT_MODE_TYPE;
        }
        function isSuspense(object) {
            return typeOf(object) === REACT_SUSPENSE_TYPE;
        }
        function isSuspenseList(object) {
            return typeOf(object) === REACT_SUSPENSE_LIST_TYPE;
        }
        exports.ContextConsumer = ContextConsumer;
        exports.ContextProvider = ContextProvider;
        exports.Element = Element;
        exports.ForwardRef = ForwardRef;
        exports.Fragment = Fragment;
        exports.Lazy = Lazy;
        exports.Memo = Memo;
        exports.Portal = Portal;
        exports.Profiler = Profiler;
        exports.StrictMode = StrictMode;
        exports.Suspense = Suspense;
        exports.SuspenseList = SuspenseList;
        exports.isAsyncMode = isAsyncMode;
        exports.isConcurrentMode = isConcurrentMode;
        exports.isContextConsumer = isContextConsumer;
        exports.isContextProvider = isContextProvider;
        exports.isElement = isElement;
        exports.isForwardRef = isForwardRef;
        exports.isFragment = isFragment;
        exports.isLazy = isLazy;
        exports.isMemo = isMemo;
        exports.isPortal = isPortal;
        exports.isProfiler = isProfiler;
        exports.isStrictMode = isStrictMode;
        exports.isSuspense = isSuspense;
        exports.isSuspenseList = isSuspenseList;
        exports.isValidElementType = isValidElementType;
        exports.typeOf = typeOf;
    })();
}


}),
27: (function (module, __unused_webpack_exports, __webpack_require__) {
"use strict";

if (false) {} else {
    module.exports = __webpack_require__(28);
}


}),
12: (function (__unused_webpack_module, exports) {
"use strict";
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ 
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
if (true) {
    (function() {
        'use strict';
        /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart === 'function') {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
        }
        var enableSchedulerDebugging = false;
        var enableProfiling = false;
        var frameYieldMs = 5;
        function push(heap, node) {
            var index = heap.length;
            heap.push(node);
            siftUp(heap, node, index);
        }
        function peek(heap) {
            return heap.length === 0 ? null : heap[0];
        }
        function pop(heap) {
            if (heap.length === 0) {
                return null;
            }
            var first = heap[0];
            var last = heap.pop();
            if (last !== first) {
                heap[0] = last;
                siftDown(heap, last, 0);
            }
            return first;
        }
        function siftUp(heap, node, i) {
            var index = i;
            while(index > 0){
                var parentIndex = index - 1 >>> 1;
                var parent = heap[parentIndex];
                if (compare(parent, node) > 0) {
                    // The parent is larger. Swap positions.
                    heap[parentIndex] = node;
                    heap[index] = parent;
                    index = parentIndex;
                } else {
                    // The parent is smaller. Exit.
                    return;
                }
            }
        }
        function siftDown(heap, node, i) {
            var index = i;
            var length = heap.length;
            var halfLength = length >>> 1;
            while(index < halfLength){
                var leftIndex = (index + 1) * 2 - 1;
                var left = heap[leftIndex];
                var rightIndex = leftIndex + 1;
                var right = heap[rightIndex]; // If the left or right node is smaller, swap with the smaller of those.
                if (compare(left, node) < 0) {
                    if (rightIndex < length && compare(right, left) < 0) {
                        heap[index] = right;
                        heap[rightIndex] = node;
                        index = rightIndex;
                    } else {
                        heap[index] = left;
                        heap[leftIndex] = node;
                        index = leftIndex;
                    }
                } else if (rightIndex < length && compare(right, node) < 0) {
                    heap[index] = right;
                    heap[rightIndex] = node;
                    index = rightIndex;
                } else {
                    // Neither child is smaller. Exit.
                    return;
                }
            }
        }
        function compare(a, b) {
            // Compare sort index first, then task id.
            var diff = a.sortIndex - b.sortIndex;
            return diff !== 0 ? diff : a.id - b.id;
        }
        // TODO: Use symbols?
        var ImmediatePriority = 1;
        var UserBlockingPriority = 2;
        var NormalPriority = 3;
        var LowPriority = 4;
        var IdlePriority = 5;
        function markTaskErrored(task, ms) {}
        /* eslint-disable no-var */ var hasPerformanceNow = (typeof performance === "undefined" ? "undefined" : _typeof(performance)) === 'object' && typeof performance.now === 'function';
        if (hasPerformanceNow) {
            var localPerformance = performance;
            exports.unstable_now = function() {
                return localPerformance.now();
            };
        } else {
            var localDate = Date;
            var initialTime = localDate.now();
            exports.unstable_now = function() {
                return localDate.now() - initialTime;
            };
        } // Max 31 bit integer. The max integer size in V8 for 32-bit systems.
        // Math.pow(2, 30) - 1
        // 0b111111111111111111111111111111
        var maxSigned31BitInt = 1073741823; // Times out immediately
        var IMMEDIATE_PRIORITY_TIMEOUT = -1; // Eventually times out
        var USER_BLOCKING_PRIORITY_TIMEOUT = 250;
        var NORMAL_PRIORITY_TIMEOUT = 5000;
        var LOW_PRIORITY_TIMEOUT = 10000; // Never times out
        var IDLE_PRIORITY_TIMEOUT = maxSigned31BitInt; // Tasks are stored on a min heap
        var taskQueue = [];
        var timerQueue = []; // Incrementing id counter. Used to maintain insertion order.
        var taskIdCounter = 1; // Pausing the scheduler is useful for debugging.
        var currentTask = null;
        var currentPriorityLevel = NormalPriority; // This is set while performing work, to prevent re-entrance.
        var isPerformingWork = false;
        var isHostCallbackScheduled = false;
        var isHostTimeoutScheduled = false; // Capture local references to native APIs, in case a polyfill overrides them.
        var localSetTimeout = typeof setTimeout === 'function' ? setTimeout : null;
        var localClearTimeout = typeof clearTimeout === 'function' ? clearTimeout : null;
        var localSetImmediate = typeof setImmediate !== 'undefined' ? setImmediate : null; // IE and Node.js + jsdom
        var isInputPending = typeof navigator !== 'undefined' && navigator.scheduling !== undefined && navigator.scheduling.isInputPending !== undefined ? navigator.scheduling.isInputPending.bind(navigator.scheduling) : null;
        function advanceTimers(currentTime) {
            // Check for tasks that are no longer delayed and add them to the queue.
            var timer = peek(timerQueue);
            while(timer !== null){
                if (timer.callback === null) {
                    // Timer was cancelled.
                    pop(timerQueue);
                } else if (timer.startTime <= currentTime) {
                    // Timer fired. Transfer to the task queue.
                    pop(timerQueue);
                    timer.sortIndex = timer.expirationTime;
                    push(taskQueue, timer);
                } else {
                    // Remaining timers are pending.
                    return;
                }
                timer = peek(timerQueue);
            }
        }
        function handleTimeout(currentTime) {
            isHostTimeoutScheduled = false;
            advanceTimers(currentTime);
            if (!isHostCallbackScheduled) {
                if (peek(taskQueue) !== null) {
                    isHostCallbackScheduled = true;
                    requestHostCallback(flushWork);
                } else {
                    var firstTimer = peek(timerQueue);
                    if (firstTimer !== null) {
                        requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                    }
                }
            }
        }
        function flushWork(hasTimeRemaining, initialTime) {
            isHostCallbackScheduled = false;
            if (isHostTimeoutScheduled) {
                // We scheduled a timeout but it's no longer needed. Cancel it.
                isHostTimeoutScheduled = false;
                cancelHostTimeout();
            }
            isPerformingWork = true;
            var previousPriorityLevel = currentPriorityLevel;
            try {
                if (enableProfiling) {
                    try {
                        return workLoop(hasTimeRemaining, initialTime);
                    } catch (error) {
                        if (currentTask !== null) {
                            var currentTime = exports.unstable_now();
                            markTaskErrored(currentTask, currentTime);
                            currentTask.isQueued = false;
                        }
                        throw error;
                    }
                } else {
                    // No catch in prod code path.
                    return workLoop(hasTimeRemaining, initialTime);
                }
            } finally{
                currentTask = null;
                currentPriorityLevel = previousPriorityLevel;
                isPerformingWork = false;
            }
        }
        function workLoop(hasTimeRemaining, initialTime) {
            var currentTime = initialTime;
            advanceTimers(currentTime);
            currentTask = peek(taskQueue);
            while(currentTask !== null && !enableSchedulerDebugging){
                if (currentTask.expirationTime > currentTime && (!hasTimeRemaining || shouldYieldToHost())) {
                    break;
                }
                var callback = currentTask.callback;
                if (typeof callback === 'function') {
                    currentTask.callback = null;
                    currentPriorityLevel = currentTask.priorityLevel;
                    var didUserCallbackTimeout = currentTask.expirationTime <= currentTime;
                    var continuationCallback = callback(didUserCallbackTimeout);
                    currentTime = exports.unstable_now();
                    if (typeof continuationCallback === 'function') {
                        currentTask.callback = continuationCallback;
                    } else {
                        if (currentTask === peek(taskQueue)) {
                            pop(taskQueue);
                        }
                    }
                    advanceTimers(currentTime);
                } else {
                    pop(taskQueue);
                }
                currentTask = peek(taskQueue);
            } // Return whether there's additional work
            if (currentTask !== null) {
                return true;
            } else {
                var firstTimer = peek(timerQueue);
                if (firstTimer !== null) {
                    requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
                }
                return false;
            }
        }
        function unstable_runWithPriority(priorityLevel, eventHandler) {
            switch(priorityLevel){
                case ImmediatePriority:
                case UserBlockingPriority:
                case NormalPriority:
                case LowPriority:
                case IdlePriority:
                    break;
                default:
                    priorityLevel = NormalPriority;
            }
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = priorityLevel;
            try {
                return eventHandler();
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        }
        function unstable_next(eventHandler) {
            var priorityLevel;
            switch(currentPriorityLevel){
                case ImmediatePriority:
                case UserBlockingPriority:
                case NormalPriority:
                    // Shift down to normal priority
                    priorityLevel = NormalPriority;
                    break;
                default:
                    // Anything lower than normal priority should remain at the current level.
                    priorityLevel = currentPriorityLevel;
                    break;
            }
            var previousPriorityLevel = currentPriorityLevel;
            currentPriorityLevel = priorityLevel;
            try {
                return eventHandler();
            } finally{
                currentPriorityLevel = previousPriorityLevel;
            }
        }
        function unstable_wrapCallback(callback) {
            var parentPriorityLevel = currentPriorityLevel;
            return function() {
                // This is a fork of runWithPriority, inlined for performance.
                var previousPriorityLevel = currentPriorityLevel;
                currentPriorityLevel = parentPriorityLevel;
                try {
                    return callback.apply(this, arguments);
                } finally{
                    currentPriorityLevel = previousPriorityLevel;
                }
            };
        }
        function unstable_scheduleCallback(priorityLevel, callback, options) {
            var currentTime = exports.unstable_now();
            var startTime;
            if (_typeof(options) === 'object' && options !== null) {
                var delay = options.delay;
                if (typeof delay === 'number' && delay > 0) {
                    startTime = currentTime + delay;
                } else {
                    startTime = currentTime;
                }
            } else {
                startTime = currentTime;
            }
            var timeout;
            switch(priorityLevel){
                case ImmediatePriority:
                    timeout = IMMEDIATE_PRIORITY_TIMEOUT;
                    break;
                case UserBlockingPriority:
                    timeout = USER_BLOCKING_PRIORITY_TIMEOUT;
                    break;
                case IdlePriority:
                    timeout = IDLE_PRIORITY_TIMEOUT;
                    break;
                case LowPriority:
                    timeout = LOW_PRIORITY_TIMEOUT;
                    break;
                case NormalPriority:
                default:
                    timeout = NORMAL_PRIORITY_TIMEOUT;
                    break;
            }
            var expirationTime = startTime + timeout;
            var newTask = {
                id: taskIdCounter++,
                callback: callback,
                priorityLevel: priorityLevel,
                startTime: startTime,
                expirationTime: expirationTime,
                sortIndex: -1
            };
            if (startTime > currentTime) {
                // This is a delayed task.
                newTask.sortIndex = startTime;
                push(timerQueue, newTask);
                if (peek(taskQueue) === null && newTask === peek(timerQueue)) {
                    // All tasks are delayed, and this is the task with the earliest delay.
                    if (isHostTimeoutScheduled) {
                        // Cancel an existing timeout.
                        cancelHostTimeout();
                    } else {
                        isHostTimeoutScheduled = true;
                    } // Schedule a timeout.
                    requestHostTimeout(handleTimeout, startTime - currentTime);
                }
            } else {
                newTask.sortIndex = expirationTime;
                push(taskQueue, newTask);
                // wait until the next time we yield.
                if (!isHostCallbackScheduled && !isPerformingWork) {
                    isHostCallbackScheduled = true;
                    requestHostCallback(flushWork);
                }
            }
            return newTask;
        }
        function unstable_pauseExecution() {}
        function unstable_continueExecution() {
            if (!isHostCallbackScheduled && !isPerformingWork) {
                isHostCallbackScheduled = true;
                requestHostCallback(flushWork);
            }
        }
        function unstable_getFirstCallbackNode() {
            return peek(taskQueue);
        }
        function unstable_cancelCallback(task) {
            // remove from the queue because you can't remove arbitrary nodes from an
            // array based heap, only the first one.)
            task.callback = null;
        }
        function unstable_getCurrentPriorityLevel() {
            return currentPriorityLevel;
        }
        var isMessageLoopRunning = false;
        var scheduledHostCallback = null;
        var taskTimeoutID = -1; // Scheduler periodically yields in case there is other work on the main
        // thread, like user events. By default, it yields multiple times per frame.
        // It does not attempt to align with frame boundaries, since most tasks don't
        // need to be frame aligned; for those that do, use requestAnimationFrame.
        var frameInterval = frameYieldMs;
        var startTime = -1;
        function shouldYieldToHost() {
            var timeElapsed = exports.unstable_now() - startTime;
            if (timeElapsed < frameInterval) {
                // The main thread has only been blocked for a really short amount of time;
                // smaller than a single frame. Don't yield yet.
                return false;
            } // The main thread has been blocked for a non-negligible amount of time. We
            return true;
        }
        function requestPaint() {}
        function forceFrameRate(fps) {
            if (fps < 0 || fps > 125) {
                // Using console['error'] to evade Babel and ESLint
                console['error']('forceFrameRate takes a positive int between 0 and 125, ' + 'forcing frame rates higher than 125 fps is not supported');
                return;
            }
            if (fps > 0) {
                frameInterval = Math.floor(1000 / fps);
            } else {
                // reset the framerate
                frameInterval = frameYieldMs;
            }
        }
        var performWorkUntilDeadline = function performWorkUntilDeadline() {
            if (scheduledHostCallback !== null) {
                var currentTime = exports.unstable_now(); // Keep track of the start time so we can measure how long the main thread
                // has been blocked.
                startTime = currentTime;
                var hasTimeRemaining = true; // If a scheduler task throws, exit the current browser task so the
                // error can be observed.
                //
                // Intentionally not using a try-catch, since that makes some debugging
                // techniques harder. Instead, if `scheduledHostCallback` errors, then
                // `hasMoreWork` will remain true, and we'll continue the work loop.
                var hasMoreWork = true;
                try {
                    hasMoreWork = scheduledHostCallback(hasTimeRemaining, currentTime);
                } finally{
                    if (hasMoreWork) {
                        // If there's more work, schedule the next message event at the end
                        // of the preceding one.
                        schedulePerformWorkUntilDeadline();
                    } else {
                        isMessageLoopRunning = false;
                        scheduledHostCallback = null;
                    }
                }
            } else {
                isMessageLoopRunning = false;
            } // Yielding to the browser will give it a chance to paint, so we can
        };
        var schedulePerformWorkUntilDeadline;
        if (typeof localSetImmediate === 'function') {
            // Node.js and old IE.
            // There's a few reasons for why we prefer setImmediate.
            //
            // Unlike MessageChannel, it doesn't prevent a Node.js process from exiting.
            // (Even though this is a DOM fork of the Scheduler, you could get here
            // with a mix of Node.js 15+, which has a MessageChannel, and jsdom.)
            // https://github.com/facebook/react/issues/20756
            //
            // But also, it runs earlier which is the semantic we want.
            // If other browsers ever implement it, it's better to use it.
            // Although both of these would be inferior to native scheduling.
            schedulePerformWorkUntilDeadline = function schedulePerformWorkUntilDeadline() {
                localSetImmediate(performWorkUntilDeadline);
            };
        } else if (typeof MessageChannel !== 'undefined') {
            // DOM and Worker environments.
            // We prefer MessageChannel because of the 4ms setTimeout clamping.
            var channel = new MessageChannel();
            var port = channel.port2;
            channel.port1.onmessage = performWorkUntilDeadline;
            schedulePerformWorkUntilDeadline = function schedulePerformWorkUntilDeadline() {
                port.postMessage(null);
            };
        } else {
            // We should only fallback here in non-browser environments.
            schedulePerformWorkUntilDeadline = function schedulePerformWorkUntilDeadline() {
                localSetTimeout(performWorkUntilDeadline, 0);
            };
        }
        function requestHostCallback(callback) {
            scheduledHostCallback = callback;
            if (!isMessageLoopRunning) {
                isMessageLoopRunning = true;
                schedulePerformWorkUntilDeadline();
            }
        }
        function requestHostTimeout(callback, ms) {
            taskTimeoutID = localSetTimeout(function() {
                callback(exports.unstable_now());
            }, ms);
        }
        function cancelHostTimeout() {
            localClearTimeout(taskTimeoutID);
            taskTimeoutID = -1;
        }
        var unstable_requestPaint = requestPaint;
        var unstable_Profiling = null;
        exports.unstable_IdlePriority = IdlePriority;
        exports.unstable_ImmediatePriority = ImmediatePriority;
        exports.unstable_LowPriority = LowPriority;
        exports.unstable_NormalPriority = NormalPriority;
        exports.unstable_Profiling = unstable_Profiling;
        exports.unstable_UserBlockingPriority = UserBlockingPriority;
        exports.unstable_cancelCallback = unstable_cancelCallback;
        exports.unstable_continueExecution = unstable_continueExecution;
        exports.unstable_forceFrameRate = forceFrameRate;
        exports.unstable_getCurrentPriorityLevel = unstable_getCurrentPriorityLevel;
        exports.unstable_getFirstCallbackNode = unstable_getFirstCallbackNode;
        exports.unstable_next = unstable_next;
        exports.unstable_pauseExecution = unstable_pauseExecution;
        exports.unstable_requestPaint = unstable_requestPaint;
        exports.unstable_runWithPriority = unstable_runWithPriority;
        exports.unstable_scheduleCallback = unstable_scheduleCallback;
        exports.unstable_shouldYield = shouldYieldToHost;
        exports.unstable_wrapCallback = unstable_wrapCallback;
        /* global __REACT_DEVTOOLS_GLOBAL_HOOK__ */ if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined' && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop === 'function') {
            __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
        }
    })();
}


}),
11: (function (module, __unused_webpack_exports, __webpack_require__) {
"use strict";

if (false) {} else {
    module.exports = __webpack_require__(12);
}


}),
23: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
var AppInstanceContext = {
    lifecycleCallback: {},
    registerLifecycle: function registerLifecycle(lifecycle, callback) {
        var _this = this;
        this.lifecycleCallback[lifecycle] = this.lifecycleCallback[lifecycle] || [];
        this.lifecycleCallback[lifecycle].push(callback);
        return function() {
            _this.lifecycleCallback[lifecycle].splice(_this.lifecycleCallback[lifecycle].indexOf(callback), 1);
        };
    }
};
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AppInstanceContext);


}),
25: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var ComponentInstanceContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ComponentInstanceContext);


}),
24: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (__WEBPACK_DEFAULT_EXPORT__)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

var PageInstanceContext = /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createContext(null);
/* ESM default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageInstanceContext);


}),
22: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (PluginDriver)
});
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
    for(var t = 0; t < r.length; t++){
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
}
function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
var PluginDriver = /*#__PURE__*/ function() {
    function PluginDriver(plugins) {
        _classCallCheck(this, PluginDriver);
        this.plugins = plugins;
    }
    return _createClass(PluginDriver, [
        {
            key: "onAppConfig",
            value: function onAppConfig(config) {
                return this.plugins.reduce(function(acc, plugin) {
                    if (typeof plugin.onAppConfig === 'function') {
                        acc = plugin.onAppConfig({
                            config: acc
                        });
                    }
                    return acc;
                }, config);
            }
        },
        {
            key: "onPageConfig",
            value: function onPageConfig(_ref) {
                var config = _ref.config, page = _ref.page;
                return this.plugins.reduce(function(acc, plugin) {
                    if (typeof plugin.onPageConfig === 'function') {
                        acc = plugin.onPageConfig({
                            config: acc,
                            page: page
                        });
                    }
                    return acc;
                }, config);
            }
        },
        {
            key: "onAppComponent",
            value: function onAppComponent(component) {
                return this.plugins.reduce(function(acc, plugin) {
                    if (typeof plugin.onAppComponent === 'function') {
                        acc = plugin.onAppComponent({
                            component: acc
                        });
                    }
                    return acc;
                }, component);
            }
        },
        {
            key: "onPageComponent",
            value: function onPageComponent(_ref2) {
                var component = _ref2.component, page = _ref2.page;
                return this.plugins.reduce(function(acc, plugin) {
                    if (typeof plugin.onPageComponent === 'function') {
                        acc = plugin.onPageComponent({
                            component: acc,
                            page: page
                        });
                    }
                    return acc;
                }, component);
            }
        },
        {
            key: "onMiniComponent",
            value: function onMiniComponent(_ref3) {
                var component = _ref3.component, context = _ref3.context;
                return this.plugins.reduce(function(acc, plugin) {
                    if (typeof plugin.onMiniComponent === 'function') {
                        acc = plugin.onMiniComponent({
                            component: acc,
                            context: context
                        });
                    }
                    return acc;
                }, component);
            }
        },
        {
            key: "onCreateHostComponent",
            value: function onCreateHostComponent(component) {
                return this.plugins.reduce(function(acc, plugin) {
                    if (typeof plugin.onCreateHostComponent === 'function') {
                        acc = plugin.onCreateHostComponent({
                            component: acc
                        });
                    }
                    return acc;
                }, component);
            }
        },
        {
            key: "onCreateHostComponentElement",
            value: function onCreateHostComponentElement(element) {
                return this.plugins.reduce(function(acc, plugin) {
                    if (typeof plugin.onCreateHostComponentElement === 'function') {
                        acc = plugin.onCreateHostComponentElement({
                            element: acc
                        });
                    }
                    return acc;
                }, element);
            }
        }
    ]);
}();



}),
21: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  apply: () => (apply),
  get: () => (get),
  reset: () => (reset)
});
/* ESM import */var _PluginDriver__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}

var defaultRuntimeOptions = {
    pxToRpx: true,
    hostComponents: {},
    debug: false,
    appEvents: [],
    pageEvents: {},
    pluginDriver: new _PluginDriver__WEBPACK_IMPORTED_MODULE_0__["default"]([]),
    history: {},
    mpa: false
};
var runtimeOptions = defaultRuntimeOptions;
function merge() {
    for(var _len = arguments.length, options = new Array(_len), _key = 0; _key < _len; _key++){
        options[_key] = arguments[_key];
    }
    return options.reduce(function(acc, option) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        acc.appEvents = (_a = option.appEvents) !== null && _a !== void 0 ? _a : acc.appEvents;
        acc.debug = (_b = option.debug) !== null && _b !== void 0 ? _b : acc.debug;
        acc.history = (_c = option.history) !== null && _c !== void 0 ? _c : acc.history;
        Object.keys((_d = option.hostComponents) !== null && _d !== void 0 ? _d : {}).forEach(function(k) {
            var _a, _b, _c, _d, _e, _f, _g;
            var inputHostComponent = (_a = option.hostComponents) === null || _a === void 0 ? void 0 : _a[k];
            acc.hostComponents[k] = (_b = acc.hostComponents[k]) !== null && _b !== void 0 ? _b : {};
            acc.hostComponents[k].additional = (_c = inputHostComponent === null || inputHostComponent === void 0 ? void 0 : inputHostComponent.additional) !== null && _c !== void 0 ? _c : acc.hostComponents[k].additional;
            acc.hostComponents[k].alias = Object.assign((_d = acc.hostComponents[k].alias) !== null && _d !== void 0 ? _d : {}, (_e = inputHostComponent === null || inputHostComponent === void 0 ? void 0 : inputHostComponent.alias) !== null && _e !== void 0 ? _e : {});
            acc.hostComponents[k].props = _toConsumableArray(new Set([].concat(_toConsumableArray((_f = acc.hostComponents[k].props) !== null && _f !== void 0 ? _f : []), _toConsumableArray((_g = inputHostComponent === null || inputHostComponent === void 0 ? void 0 : inputHostComponent.props) !== null && _g !== void 0 ? _g : []))));
        });
        acc.pluginDriver = (_e = option.pluginDriver) !== null && _e !== void 0 ? _e : acc.pluginDriver;
        acc.pageEvents = (_f = option.pageEvents) !== null && _f !== void 0 ? _f : acc.pageEvents;
        acc.platform = (_g = option.platform) !== null && _g !== void 0 ? _g : acc.platform;
        acc.pxToRpx = (_h = option.pxToRpx) !== null && _h !== void 0 ? _h : acc.pxToRpx;
        acc.mpa = (_j = option.mpa) !== null && _j !== void 0 ? _j : acc.mpa;
        return acc;
    }, runtimeOptions);
}
function apply(options) {
    runtimeOptions = merge(options);
}
function get(key) {
    return runtimeOptions[key];
}
function reset() {
    runtimeOptions = defaultRuntimeOptions;
}


}),
26: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (createPageWrapper)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var react_is__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(27);
/* ESM import */var _utils_isClassComponent__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(29);
/* ESM import */var _lifecycle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(30);
/* ESM import */var _PageInstanceContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(24);
/* ESM import */var _RuntimeOptions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(21);
function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
    for(var t = 0; t < r.length; t++){
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
}
function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(t, e) {
    if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
}
function _isNativeReflectConstruct() {
    try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
        return !!t;
    })();
}
function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
}
function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            writable: !0,
            configurable: !0
        }
    }), Object.defineProperty(t, "prototype", {
        writable: !1
    }), e && _setPrototypeOf(t, e);
}
function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
        return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
}






function createPageWrapper(Page, name) {
    var WrappedPage = _RuntimeOptions__WEBPACK_IMPORTED_MODULE_5__.get('pluginDriver').onPageComponent({
        component: Page,
        page: name
    });
    return /*#__PURE__*/ function(_React$Component) {
        function PageWrapper(props) {
            var _this;
            _classCallCheck(this, PageWrapper);
            _this = _callSuper(this, PageWrapper, [
                props
            ]);
            // 页面组件的实例
            _this.pageComponentInstance = null;
            _this.callbacks = new Map();
            Object.keys(_lifecycle__WEBPACK_IMPORTED_MODULE_3__.Lifecycle).forEach(function(phase) {
                var callback = (0,_lifecycle__WEBPACK_IMPORTED_MODULE_3__.callbackName)(phase);
                _this[callback] = function() {
                    var _this2;
                    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                        args[_key] = arguments[_key];
                    }
                    return (_this2 = _this).callLifecycle.apply(_this2, [
                        phase
                    ].concat(args));
                };
            });
            return _this;
        }
        _inherits(PageWrapper, _React$Component);
        return _createClass(PageWrapper, [
            {
                key: "callLifecycle",
                value: function callLifecycle(phase) {
                    var callback = (0,_lifecycle__WEBPACK_IMPORTED_MODULE_3__.callbackName)(phase);
                    if (this.pageComponentInstance && typeof this.pageComponentInstance[callback] === 'function') {
                        var _this$pageComponentIn;
                        for(var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++){
                            args[_key2 - 1] = arguments[_key2];
                        }
                        return (_this$pageComponentIn = this.pageComponentInstance)[callback].apply(_this$pageComponentIn, args);
                    }
                }
            },
            {
                key: "render",
                value: function render() {
                    var _this3 = this;
                    var props = {
                        location: {
                            query: this.props.query || {}
                        }
                    };
                    if ((0,_utils_isClassComponent__WEBPACK_IMPORTED_MODULE_2__["default"])(Page) || Page.$$typeof === react_is__WEBPACK_IMPORTED_MODULE_1__.ForwardRef) {
                        props.ref = function(node) {
                            return _this3.pageComponentInstance = node;
                        };
                    }
                    return /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(_PageInstanceContext__WEBPACK_IMPORTED_MODULE_4__["default"].Provider, {
                        value: this.props.page
                    }, /*#__PURE__*/ react__WEBPACK_IMPORTED_MODULE_0__.createElement(WrappedPage, props));
                }
            }
        ]);
    }(react__WEBPACK_IMPORTED_MODULE_0__.Component);
}


}),
34: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  formatDisplayName: () => (formatDisplayName)
});
function formatDisplayName(name) {
    return name.replace(/-(.)/g, function($1) {
        return $1.toUpperCase();
    }).replace(/-/g, '').replace(/^(.)/, function($1) {
        return $1.toUpperCase();
    });
}


}),
33: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  useAppEvent: () => (useAppEvent),
  useComponentInstance: () => (useComponentInstance),
  usePageEvent: () => (usePageEvent),
  usePageInstance: () => (usePageInstance)
});
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* ESM import */var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* ESM import */var _lifecycle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(30);
/* ESM import */var _PageInstanceContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* ESM import */var _ComponentInstanceContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
/* ESM import */var _AppInstanceContext__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(23);





function usePageEvent(eventName, callback) {
    var pageInstance = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_PageInstanceContext__WEBPACK_IMPORTED_MODULE_2__["default"]);
    var lifeCycle = (0,_lifecycle__WEBPACK_IMPORTED_MODULE_1__.lifeCycleName)(eventName);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(function() {
        return (0,_lifecycle__WEBPACK_IMPORTED_MODULE_1__.registerLifecycle)(pageInstance, lifeCycle, callback);
    });
}
function useComponentInstance() {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_ComponentInstanceContext__WEBPACK_IMPORTED_MODULE_3__["default"]);
}
function usePageInstance() {
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_PageInstanceContext__WEBPACK_IMPORTED_MODULE_2__["default"]);
}
/**
 * App Hooks
 */ function useAppEvent(eventName, callback) {
    var lifeCycle = (0,_lifecycle__WEBPACK_IMPORTED_MODULE_1__.lifeCycleName)(eventName);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useLayoutEffect)(function() {
        return (0,_lifecycle__WEBPACK_IMPORTED_MODULE_1__.registerLifecycle)(_AppInstanceContext__WEBPACK_IMPORTED_MODULE_4__["default"], lifeCycle, callback);
    });
}


}),
20: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AppInstanceContext: () => (/* reexport safe */ _AppInstanceContext__WEBPACK_IMPORTED_MODULE_1__["default"]),
  AppLifecycle: () => (/* reexport safe */ _lifecycle__WEBPACK_IMPORTED_MODULE_7__.AppLifecycle),
  ComponentInstanceContext: () => (/* reexport safe */ _ComponentInstanceContext__WEBPACK_IMPORTED_MODULE_3__["default"]),
  Lifecycle: () => (/* reexport safe */ _lifecycle__WEBPACK_IMPORTED_MODULE_7__.Lifecycle),
  PageInstanceContext: () => (/* reexport safe */ _PageInstanceContext__WEBPACK_IMPORTED_MODULE_2__["default"]),
  PluginDriver: () => (/* reexport safe */ _PluginDriver__WEBPACK_IMPORTED_MODULE_5__["default"]),
  RuntimeOptions: () => (/* reexport module object */ _RuntimeOptions__WEBPACK_IMPORTED_MODULE_0__),
  callbackName: () => (/* reexport safe */ _lifecycle__WEBPACK_IMPORTED_MODULE_7__.callbackName),
  createPageWrapper: () => (/* reexport safe */ _createPageWrapper__WEBPACK_IMPORTED_MODULE_4__["default"]),
  find: () => (/* reexport safe */ _shim__WEBPACK_IMPORTED_MODULE_11__.find),
  formatDisplayName: () => (/* reexport safe */ _formatDisplayName__WEBPACK_IMPORTED_MODULE_9__.formatDisplayName),
  includes: () => (/* reexport safe */ _shim__WEBPACK_IMPORTED_MODULE_11__.includes),
  isClassComponent: () => (/* reexport safe */ _utils_isClassComponent__WEBPACK_IMPORTED_MODULE_6__["default"]),
  lifeCycleName: () => (/* reexport safe */ _lifecycle__WEBPACK_IMPORTED_MODULE_7__.lifeCycleName),
  promisify: () => (/* reexport safe */ _promisify__WEBPACK_IMPORTED_MODULE_10__.promisify),
  registerLifecycle: () => (/* reexport safe */ _lifecycle__WEBPACK_IMPORTED_MODULE_7__.registerLifecycle),
  useAppEvent: () => (/* reexport safe */ _hooks__WEBPACK_IMPORTED_MODULE_8__.useAppEvent),
  useComponentInstance: () => (/* reexport safe */ _hooks__WEBPACK_IMPORTED_MODULE_8__.useComponentInstance),
  usePageEvent: () => (/* reexport safe */ _hooks__WEBPACK_IMPORTED_MODULE_8__.usePageEvent),
  usePageInstance: () => (/* reexport safe */ _hooks__WEBPACK_IMPORTED_MODULE_8__.usePageInstance)
});
/* ESM import */var _RuntimeOptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);
/* ESM import */var _AppInstanceContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(23);
/* ESM import */var _PageInstanceContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
/* ESM import */var _ComponentInstanceContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(25);
/* ESM import */var _createPageWrapper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26);
/* ESM import */var _PluginDriver__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(22);
/* ESM import */var _utils_isClassComponent__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(29);
/* ESM import */var _lifecycle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* ESM import */var _hooks__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(33);
/* ESM import */var _formatDisplayName__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(34);
/* ESM import */var _promisify__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(35);
/* ESM import */var _shim__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(36);















}),
30: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  AppLifecycle: () => (AppLifecycle),
  Lifecycle: () => (Lifecycle),
  callbackName: () => (callbackName),
  lifeCycleName: () => (lifeCycleName),
  registerLifecycle: () => (registerLifecycle)
});
/* ESM import */var _utils_capitalize__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(31);
/* ESM import */var _utils_lowercase__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(32);


var Lifecycle;
(function(Lifecycle) {
    Lifecycle["load"] = "load";
    Lifecycle["show"] = "show";
    Lifecycle["hide"] = "hide";
    Lifecycle["ready"] = "ready";
    Lifecycle["pullDownRefresh"] = "pullDownRefresh";
    Lifecycle["reachBottom"] = "reachBottom";
    Lifecycle["pageScroll"] = "pageScroll";
    Lifecycle["shareAppMessage"] = "shareAppMessage";
    Lifecycle["shareTimeline"] = "shareTimeline";
    Lifecycle["titleClick"] = "titleClick";
    Lifecycle["optionMenuClick"] = "optionMenuClick";
    Lifecycle["popMenuClick"] = "popMenuClick";
    Lifecycle["pullIntercept"] = "pullIntercept";
    Lifecycle["back"] = "back";
    Lifecycle["keyboardHeight"] = "keyboardHeight";
    Lifecycle["tabItemTap"] = "tabItemTap";
    Lifecycle["beforeTabItemTap"] = "beforeTabItemTap";
    Lifecycle["resize"] = "resize";
    Lifecycle["unload"] = "unload";
})(Lifecycle || (Lifecycle = {}));
var AppLifecycle;
(function(AppLifecycle) {
    AppLifecycle["launch"] = "launch";
    AppLifecycle["show"] = "show";
    AppLifecycle["hide"] = "hide";
    AppLifecycle["error"] = "error";
    AppLifecycle["shareAppMessage"] = "shareAppMessage";
    AppLifecycle["pageNotFound"] = "pageNotFound";
    AppLifecycle["unhandledRejection"] = "unhandledRejection";
    AppLifecycle["themeChange"] = "themeChange";
})(AppLifecycle || (AppLifecycle = {}));
function lifeCycleName(name) {
    if (name.startsWith('before')) {
        return name;
    }
    return (0,_utils_lowercase__WEBPACK_IMPORTED_MODULE_1__["default"])(name.slice(2));
}
function callbackName(name) {
    if (name.startsWith('before')) {
        return name;
    }
    return 'on' + (0,_utils_capitalize__WEBPACK_IMPORTED_MODULE_0__["default"])(name);
}
function registerLifecycle(instance, method, callback) {
    return instance.registerLifecycle(method, callback);
}


}),
35: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  promisify: () => (promisify)
});
function promisify(api) {
    //  todo 补充类型注释
    // @ts-ignore
    return function() {
        var arg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return new Promise(function(resolve, reject) {
            var promisifyArg = arg;
            api(Object.assign(Object.assign({}, promisifyArg), {
                success: function success(res) {
                    if (promisifyArg && typeof promisifyArg.success === 'function') {
                        promisifyArg.success(res);
                    }
                    resolve(res);
                },
                fail: function fail(res) {
                    if (promisifyArg && typeof promisifyArg.fail === 'function') {
                        promisifyArg.fail(res);
                    }
                    reject(res);
                }
            }));
        });
    };
}


}),
36: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  find: () => (find),
  includes: () => (includes)
});
function find(list, predicate) {
    for(var i = 0; i < list.length; i++){
        var value = list[i];
        if (predicate(value, i, list)) {
            return value;
        }
    }
}
function includes(list, searchElement) {
    for(var i = 0; i < list.length; i++){
        var value = list[i];
        if (value === searchElement) {
            return true;
        }
    }
    return false;
}


}),
31: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (capitalize)
});
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}


}),
29: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (isClassComponent)
});
function isClassComponent(Component) {
    return Component.prototype && typeof Component.prototype.render === 'function';
}


}),
32: (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
"use strict";
__webpack_require__.r(__webpack_exports__);
__webpack_require__.d(__webpack_exports__, {
  "default": () => (lowercase)
});
function lowercase(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
}


}),
43: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
    for(var t = 0; t < r.length; t++){
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
}
function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var VNode_1 = __importDefault(__webpack_require__(16));
var instanceId_1 = __webpack_require__(15);
var AppContainer = /*#__PURE__*/ function() {
    function AppContainer() {
        _classCallCheck(this, AppContainer);
        this.updateQueue = [];
        this.root = new VNode_1.default({
            id: (0, instanceId_1.generate)(),
            type: 'root',
            container: this
        });
        this.root.mounted = true;
    }
    return _createClass(AppContainer, [
        {
            key: "requestUpdate",
            value: function requestUpdate(path, start, deleteCount) {
            // ignore
            }
        },
        {
            key: "applyUpdate",
            value: function applyUpdate() {
                this.context._pages.forEach(function(page) {
                    page.container.applyUpdate();
                    page.modalContainer.applyUpdate();
                });
            }
        },
        {
            key: "createCallback",
            value: function createCallback(name, fn) {
                this.context[name] = fn;
            }
        },
        {
            key: "appendChild",
            value: function appendChild(child) {
                this.root.appendChild(child);
            }
        },
        {
            key: "removeChild",
            value: function removeChild(child) {
                this.root.removeChild(child);
            }
        },
        {
            key: "insertBefore",
            value: function insertBefore(child, beforeChild) {
                this.root.insertBefore(child, beforeChild);
            }
        }
    ]);
}();
exports["default"] = AppContainer;


}),
46: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
        value: t,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : e[r] = t, e;
}
function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
    for(var t = 0; t < r.length; t++){
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
}
function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var VNode_1 = __importDefault(__webpack_require__(16));
var instanceId_1 = __webpack_require__(15);
var nativeEffect_1 = __importDefault(__webpack_require__(47));
var framework_shared_1 = __webpack_require__(20);
var index_1 = __webpack_require__(8);
var Container = /*#__PURE__*/ function() {
    function Container(context) {
        var rootKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'root';
        _classCallCheck(this, Container);
        this.updateQueue = [];
        this.rendered = false;
        this.context = context;
        this.root = new VNode_1.default({
            id: (0, instanceId_1.generate)(),
            type: 'root',
            container: this
        });
        this.root.mounted = true;
        this.rootKey = rootKey;
    }
    return _createClass(Container, [
        {
            key: "requestUpdate",
            value: function requestUpdate(update) {
                this.updateQueue.push(update);
            }
        },
        {
            key: "normalizeUpdatePath",
            value: function normalizeUpdatePath(paths) {
                return [
                    this.rootKey
                ].concat(_toConsumableArray(paths)).join('.');
            }
        },
        {
            key: "applyUpdate",
            value: function applyUpdate() {
                var _this = this;
                if (this.stopUpdate || this.updateQueue.length === 0) {
                    return;
                }
                var startTime = new Date().getTime();
                if (typeof this.context.$spliceData === 'function') {
                    var $batchedUpdates = function $batchedUpdates(callback) {
                        callback();
                    };
                    if (typeof this.context.$batchedUpdates === 'function') {
                        $batchedUpdates = this.context.$batchedUpdates;
                    }
                    $batchedUpdates(function() {
                        _this.updateQueue.map(function(update, index) {
                            var callback = undefined;
                            if (index + 1 === _this.updateQueue.length) {
                                callback = function callback() {
                                    nativeEffect_1.default.run();
                                    /* istanbul ignore next */ if (framework_shared_1.RuntimeOptions.get('debug')) {
                                        console.log("setData => \u56DE\u8C03\u65F6\u95F4\uFF1A".concat(new Date().getTime() - startTime, "ms"));
                                    }
                                };
                            }
                            if (update.type === 'splice') {
                                _this.context.$spliceData(_defineProperty({}, _this.normalizeUpdatePath([].concat(_toConsumableArray(update.path), [
                                    'children'
                                ])), [
                                    update.start,
                                    update.deleteCount
                                ].concat(_toConsumableArray(update.items))), callback);
                            }
                            if (update.type === 'set') {
                                _this.context.setData(_defineProperty({}, _this.normalizeUpdatePath([].concat(_toConsumableArray(update.path), [
                                    update.name
                                ])), update.value), callback);
                            }
                        });
                    });
                    this.updateQueue = [];
                    return;
                }
                var updatePayload = this.updateQueue.reduce(function(acc, update) {
                    if (update.node.isDeleted()) {
                        return acc;
                    }
                    if (update.type === 'splice') {
                        acc[_this.normalizeUpdatePath([].concat(_toConsumableArray(update.path), [
                            'nodes',
                            update.id.toString()
                        ]))] = update.items[0] || null;
                        if (update.children) {
                            acc[_this.normalizeUpdatePath([].concat(_toConsumableArray(update.path), [
                                'children'
                            ]))] = (update.children || []).map(function(c) {
                                return c.id;
                            });
                        }
                    } else {
                        acc[_this.normalizeUpdatePath([].concat(_toConsumableArray(update.path), [
                            update.name
                        ]))] = update.value;
                    }
                    return acc;
                }, {});
                this.context.setData(updatePayload, function() {
                    nativeEffect_1.default.run();
                    /* istanbul ignore next */ if (framework_shared_1.RuntimeOptions.get('debug')) {
                        console.log("setData => \u56DE\u8C03\u65F6\u95F4\uFF1A".concat(new Date().getTime() - startTime, "ms"), updatePayload);
                    }
                });
                this.updateQueue = [];
            }
        },
        {
            key: "clearUpdate",
            value: function clearUpdate() {
                this.stopUpdate = true;
            }
        },
        {
            key: "createCallback",
            value: function createCallback(name, fn) {
                this.context[name] = function() {
                    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
                        args[_key] = arguments[_key];
                    }
                    return (0, index_1.unstable_batchedUpdates)(function(args) {
                        return fn.apply(void 0, _toConsumableArray(args));
                    }, args);
                };
            }
        },
        {
            key: "removeCallback",
            value: function removeCallback(name) {
                delete this.context[name];
            }
        },
        {
            key: "appendChild",
            value: function appendChild(child) {
                this.root.appendChild(child);
            }
        },
        {
            key: "removeChild",
            value: function removeChild(child) {
                this.root.removeChild(child);
            }
        },
        {
            key: "insertBefore",
            value: function insertBefore(child, beforeChild) {
                this.root.insertBefore(child, beforeChild);
            }
        }
    ]);
}();
exports["default"] = Container;


}),
48: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createPortal = void 0;
var react_is_1 = __webpack_require__(27);
function createPortal(children, containerInfo, key) {
    return {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: react_is_1.Portal,
        key: key || '',
        children: children,
        containerInfo: containerInfo,
        implementation: null
    };
}
exports.createPortal = createPortal;


}),
39: (function (__unused_webpack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.SYNTHETIC_TYPES = exports.DEPRECATED_CATCH_TYPE = void 0;
exports.DEPRECATED_CATCH_TYPE = 'catchClick';
exports.SYNTHETIC_TYPES = [
    'onClick',
    'onTap',
    'onLongClick',
    'onLongTap',
    'onTouchMove',
    'onTouchStart',
    'onTouchEnd'
];


}),
37: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function get() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.createCallbackProxy = void 0;
var framework_shared_1 = __webpack_require__(20);
var stopPropagation_1 = __importStar(__webpack_require__(38));
var constants_1 = __webpack_require__(39);
function isSyntheticType(inputType) {
    if (constants_1.DEPRECATED_CATCH_TYPE === inputType) {
        console.warn("DEPRECATION: remax \u5DF2\u652F\u6301\u5728 onClick \u4E8B\u4EF6\u4E2D\u4F7F\u7528 stopPropagation \u963B\u6B62\u4E8B\u4EF6\u5192\u6CE1\uFF0C\u8BF7\u5C3D\u91CF\u4E0D\u8981\u4F7F\u7528 catchClick");
    }
    return !!(0, framework_shared_1.find)(constants_1.SYNTHETIC_TYPES, function(type) {
        return type === inputType;
    });
}
function createBaseSyntheticEvent(node, eventType, nativeEvent) {
    if (!nativeEvent) {
        return;
    }
    // 添加阻止冒泡方法
    nativeEvent.stopPropagation = function() {
        (0, stopPropagation_1.default)(node, eventType);
    };
    return nativeEvent;
}
function createCallbackProxy(eventType, node, callback) {
    if (!isSyntheticType(eventType)) {
        return callback;
    }
    return function(nativeEvent) {
        var syntheticEvent = createBaseSyntheticEvent(node, eventType, nativeEvent);
        if (stopPropagation_1.isPropagationStopped[eventType]) {
            (0, stopPropagation_1.validate)(node, eventType);
            return;
        }
        for(var _len = arguments.length, restParams = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
            restParams[_key - 1] = arguments[_key];
        }
        return callback.apply(void 0, [
            syntheticEvent
        ].concat(restParams));
    };
}
exports.createCallbackProxy = createCallbackProxy;


}),
38: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.validate = exports.isPropagationStopped = void 0;
var constants_1 = __webpack_require__(39);
exports.isPropagationStopped = {};
constants_1.SYNTHETIC_TYPES.forEach(function(type) {
    exports.isPropagationStopped[type] = false;
});
/**
 * 检查父元素里还有没有点击事件
 *
 * @export
 * @param {VNode} node
 * @returns
 */ function validate(node, eventType) {
    var _a;
    var parent = node.parent;
    if (!parent) {
        exports.isPropagationStopped[eventType] = false;
        return;
    }
    if ((_a = parent.props) === null || _a === void 0 ? void 0 : _a[eventType]) {
        return;
    }
    validate(parent, eventType);
}
exports.validate = validate;
function stopPropagation(node, eventType) {
    exports.isPropagationStopped[eventType] = true;
    validate(node, eventType);
}
exports["default"] = stopPropagation;


}),
16: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
}
function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
        var e, n, i, u, a = [], f = !0, o = !1;
        try {
            if (i = (t = t.call(r)).next, 0 === l) {
                if (Object(t) !== t) return;
                f = !1;
            } else for(; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
        } catch (r) {
            o = !0, n = r;
        } finally{
            try {
                if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
            } finally{
                if (o) throw n;
            }
        }
        return a;
    }
}
function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
}
function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
    for(var t = 0; t < r.length; t++){
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
}
function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function get() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var propsAlias_1 = __importStar(__webpack_require__(17));
var constants_1 = __webpack_require__(14);
var framework_shared_1 = __webpack_require__(20);
var createCallbackProxy_1 = __webpack_require__(37);
function toRawNode(node) {
    if (node.type === constants_1.TYPE_TEXT) {
        return {
            id: node.id,
            type: node.type,
            text: node.text
        };
    }
    return {
        id: node.id,
        type: node.type,
        props: (0, propsAlias_1.default)(node.props, node.type),
        children: [],
        text: node.text
    };
}
function toRawProps(prop, value, type) {
    return (0, propsAlias_1.propAlias)(prop, value, type);
}
var VNode = /*#__PURE__*/ function() {
    function VNode(_ref) {
        var id = _ref.id, type = _ref.type, props = _ref.props, container = _ref.container;
        _classCallCheck(this, VNode);
        this.mounted = false;
        this.deleted = false;
        this.parent = null;
        this.firstChild = null;
        this.lastChild = null;
        this.size = 0;
        this.previousSibling = null;
        this.nextSibling = null;
        this.callbackIds = new Set();
        this.id = id;
        this.container = container;
        this.type = type;
        this.props = props;
    }
    return _createClass(VNode, [
        {
            key: "appendChild",
            value: function appendChild(node) {
                this.removeChild(node);
                this.size += 1;
                node.parent = this;
                node.deleted = false; // 交换节点时删除的节点会被复用
                if (!this.firstChild) {
                    this.firstChild = node;
                }
                if (this.lastChild) {
                    this.lastChild.nextSibling = node;
                    node.previousSibling = this.lastChild;
                }
                this.lastChild = node;
                if (this.isMounted()) {
                    this.container.requestUpdate({
                        type: 'splice',
                        path: this.path,
                        start: node.index,
                        id: node.id,
                        deleteCount: 0,
                        children: this.children,
                        items: [
                            node.toJSON()
                        ],
                        node: this
                    });
                }
            }
        },
        {
            key: "removeChild",
            value: function removeChild(node) {
                var previousSibling = node.previousSibling, nextSibling = node.nextSibling;
                if (node.parent !== this) {
                    return;
                }
                var index = node.index;
                this.size -= 1;
                if (this.firstChild === node) {
                    this.firstChild = node.nextSibling;
                }
                if (this.lastChild === node) {
                    this.lastChild = node.previousSibling;
                }
                if (previousSibling) {
                    previousSibling.nextSibling = nextSibling;
                }
                if (nextSibling) {
                    nextSibling.previousSibling = previousSibling;
                }
                node.previousSibling = null;
                node.nextSibling = null;
                node.deleted = true;
                node.unregisteredCallbacks();
                if (this.isMounted()) {
                    this.container.requestUpdate({
                        type: 'splice',
                        path: this.path,
                        start: index,
                        id: node.id,
                        deleteCount: 1,
                        children: this.children,
                        items: [],
                        node: this
                    });
                }
            }
        },
        {
            key: "insertBefore",
            value: function insertBefore(node, referenceNode) {
                this.removeChild(node);
                this.size += 1;
                node.parent = this;
                node.deleted = false; // 交换节点时删除的节点会被复用
                if (referenceNode === this.firstChild) {
                    this.firstChild = node;
                }
                if (referenceNode.previousSibling) {
                    referenceNode.previousSibling.nextSibling = node;
                    node.previousSibling = referenceNode.previousSibling;
                }
                referenceNode.previousSibling = node;
                node.nextSibling = referenceNode;
                if (this.isMounted()) {
                    this.container.requestUpdate({
                        type: 'splice',
                        path: this.path,
                        start: node.index,
                        id: node.id,
                        deleteCount: 0,
                        children: this.children,
                        items: [
                            node.toJSON()
                        ],
                        node: this
                    });
                }
            }
        },
        {
            key: "update",
            value: function update(payload) {
                if (this.type === 'text' || !payload) {
                    this.container.requestUpdate({
                        type: 'splice',
                        // root 不会更新，所以肯定有 parent
                        path: this.parent.path,
                        start: this.index,
                        id: this.id,
                        deleteCount: 1,
                        items: [
                            this.toJSON()
                        ],
                        node: this
                    });
                    return;
                }
                var parentPath = this.parent.path;
                for(var i = 0; i < payload.length; i = i + 2){
                    var _toRawProps = toRawProps(payload[i], payload[i + 1], this.type), _toRawProps2 = _slicedToArray(_toRawProps, 2), propName = _toRawProps2[0], propValue = _toRawProps2[1];
                    var path = [].concat(_toConsumableArray(parentPath), [
                        'nodes',
                        this.id.toString(),
                        'props'
                    ]);
                    if (framework_shared_1.RuntimeOptions.get('platform') === 'ali') {
                        path = [].concat(_toConsumableArray(parentPath), [
                            "children[".concat(this.index, "].props")
                        ]);
                    }
                    this.container.requestUpdate({
                        type: 'set',
                        path: path,
                        name: propName,
                        value: propValue,
                        node: this
                    });
                }
            }
        },
        {
            key: "index",
            get: function get() {
                var value = 0;
                var previousSibling = this.previousSibling;
                while(previousSibling){
                    value += 1;
                    previousSibling = previousSibling.previousSibling;
                }
                return value;
            }
        },
        {
            key: "children",
            get: function get() {
                var arr = [];
                var item = this.firstChild;
                while(item){
                    arr.push(item);
                    item = item.nextSibling;
                }
                return arr;
            }
        },
        {
            key: "path",
            get: function get() {
                var dataPath = [];
                var parents = [];
                var parent = this.parent;
                while(parent){
                    parents.unshift(parent);
                    parent = parent.parent;
                }
                for(var i = 0; i < parents.length; i++){
                    var child = parents[i + 1] || this;
                    if (framework_shared_1.RuntimeOptions.get('platform') === 'ali') {
                        dataPath.push('children');
                        dataPath.push(child.index.toString());
                    } else {
                        dataPath.push('nodes');
                        dataPath.push(child.id.toString());
                    }
                }
                return dataPath;
            }
        },
        {
            key: "isMounted",
            value: function isMounted() {
                return this.parent ? this.parent.isMounted() : this.mounted;
            }
        },
        {
            key: "isDeleted",
            value: function isDeleted() {
                var _a, _b;
                return this.deleted === true ? this.deleted : (_b = (_a = this.parent) === null || _a === void 0 ? void 0 : _a.isDeleted()) !== null && _b !== void 0 ? _b : false;
            }
        },
        {
            key: "registerCallback",
            value: function registerCallback(propKey, propValue) {
                var id = "".concat(constants_1.REMAX_METHOD, "_").concat(this.id, "_").concat(propKey);
                this.callbackIds.add(id);
                this.container.createCallback(id, (0, createCallbackProxy_1.createCallbackProxy)(propKey, this, propValue));
                return id;
            }
        },
        {
            key: "unregisteredCallbacks",
            value: function unregisteredCallbacks() {
                var _this = this;
                this.callbackIds.forEach(function(id) {
                    _this.container.removeCallback(id);
                });
            }
        },
        {
            key: "toJSON",
            value: function toJSON() {
                var stack = [];
                var rawNode = toRawNode(this);
                stack.push({
                    currentNode: rawNode,
                    children: this.children
                });
                while(stack.length > 0){
                    // while 循环已经保证了不会有空值
                    var stackItem = stack.pop();
                    var _stackItem$children = stackItem.children, children = _stackItem$children === void 0 ? [] : _stackItem$children, currentNode = stackItem.currentNode;
                    for(var i = children.length - 1; i >= 0; i--){
                        var currentVNode = children[i];
                        var currentRawNode = toRawNode(currentVNode);
                        if (framework_shared_1.RuntimeOptions.get('platform') !== 'ali') {
                            currentNode.children.unshift(currentRawNode.id);
                        } else {
                            currentNode.children.unshift(currentRawNode);
                        }
                        if (framework_shared_1.RuntimeOptions.get('platform') !== 'ali') {
                            if (!currentNode.nodes) {
                                currentNode.nodes = {};
                            }
                            currentNode.nodes[currentRawNode.id] = currentRawNode;
                        }
                        stack.push({
                            currentNode: currentRawNode,
                            children: currentVNode.children
                        });
                    }
                }
                return rawNode;
            }
        }
    ]);
}();
exports["default"] = VNode;


}),
14: (function (__unused_webpack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.TYPE_TEXT = exports.REMAX_METHOD = exports.REMAX_ROOT_BACKUP = void 0;
exports.REMAX_ROOT_BACKUP = '$$REMAX_ROOT_BACKUP';
exports.REMAX_METHOD = '$$REMAX_METHOD';
exports.TYPE_TEXT = 'plain-text';


}),
41: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

function _typeof(o) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
        return typeof o;
    } : function(o) {
        return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
    }, _typeof(o);
}
function _classCallCheck(a, n) {
    if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
}
function _defineProperties(e, r) {
    for(var t = 0; t < r.length; t++){
        var o = r[t];
        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
    }
}
function _createClass(e, r, t) {
    return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e;
}
function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == _typeof(i) ? i : i + "";
}
function _toPrimitive(t, r) {
    if ("object" != _typeof(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
        var i = e.call(t, r || "default");
        if ("object" != _typeof(i)) return i;
        throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
}
function _callSuper(t, o, e) {
    return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e));
}
function _possibleConstructorReturn(t, e) {
    if (e && ("object" == _typeof(e) || "function" == typeof e)) return e;
    if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined");
    return _assertThisInitialized(t);
}
function _assertThisInitialized(e) {
    if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return e;
}
function _isNativeReflectConstruct() {
    try {
        var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
    } catch (t) {}
    return (_isNativeReflectConstruct = function _isNativeReflectConstruct() {
        return !!t;
    })();
}
function _getPrototypeOf(t) {
    return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t) {
        return t.__proto__ || Object.getPrototypeOf(t);
    }, _getPrototypeOf(t);
}
function _inherits(t, e) {
    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function");
    t.prototype = Object.create(e && e.prototype, {
        constructor: {
            value: t,
            writable: !0,
            configurable: !0
        }
    }), Object.defineProperty(t, "prototype", {
        writable: !1
    }), e && _setPrototypeOf(t, e);
}
function _setPrototypeOf(t, e) {
    return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t, e) {
        return t.__proto__ = e, t;
    }, _setPrototypeOf(t, e);
}
var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function get() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
__webpack_require__(42);
var React = __importStar(__webpack_require__(4));
var react_is_1 = __webpack_require__(27);
var render_1 = __importDefault(__webpack_require__(9));
var AppContainer_1 = __importDefault(__webpack_require__(43));
var framework_shared_1 = __webpack_require__(20);
var DefaultAppComponent = /*#__PURE__*/ function(_React$Component) {
    function DefaultAppComponent() {
        _classCallCheck(this, DefaultAppComponent);
        return _callSuper(this, DefaultAppComponent, arguments);
    }
    _inherits(DefaultAppComponent, _React$Component);
    return _createClass(DefaultAppComponent, [
        {
            key: "render",
            value: function render() {
                return React.createElement(React.Fragment, this.props);
            }
        }
    ]);
}(React.Component);
function createAppConfig(App) {
    var WrappedApp = framework_shared_1.RuntimeOptions.get('pluginDriver').onAppComponent(App);
    var createConfig = function createConfig() {
        var AppComponent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DefaultAppComponent;
        var config = {
            _container: new AppContainer_1.default(),
            _pages: [],
            _instance: React.createRef(),
            onLaunch: function onLaunch(options) {
                this._container.context = this;
                this._render();
                return this.callLifecycle(framework_shared_1.AppLifecycle.launch, options);
            },
            callLifecycle: function callLifecycle(lifecycle) {
                for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                    args[_key - 1] = arguments[_key];
                }
                var callbacks = framework_shared_1.AppInstanceContext.lifecycleCallback[lifecycle] || [];
                var result;
                callbacks.forEach(function(callback) {
                    result = callback.apply(void 0, args);
                });
                if (result) {
                    return result;
                }
                var callback = (0, framework_shared_1.callbackName)(lifecycle);
                if (this._instance.current && this._instance.current[callback]) {
                    var _this$_instance$curre;
                    return (_this$_instance$curre = this._instance.current)[callback].apply(_this$_instance$curre, args);
                }
            },
            _mount: function _mount(pageInstance) {
                /**
         * 飞书开发者工具的问题，这里的 this 跟 getApp 拿到的不是同一个实例
         */ if (!this._container.context) {
                    this._container.context = this;
                }
                this._pages.push(pageInstance);
                this._render();
            },
            _unmount: function _unmount(pageInstance) {
                this._pages.splice(this._pages.indexOf(pageInstance), 1);
                this._render();
            },
            _render: function _render() {
                var props = {};
                if ((0, framework_shared_1.isClassComponent)(AppComponent) || AppComponent.$$typeof === react_is_1.ForwardRef) {
                    props.ref = this._instance;
                }
                return (0, render_1.default)(React.createElement(AppComponent, props, this._pages.map(function(p) {
                    return p.element;
                })), this._container);
            },
            onShow: function onShow(options) {
                return this.callLifecycle(framework_shared_1.AppLifecycle.show, options);
            },
            onHide: function onHide() {
                return this.callLifecycle(framework_shared_1.AppLifecycle.hide);
            },
            onError: function onError(error) {
                return this.callLifecycle(framework_shared_1.AppLifecycle.error, error);
            },
            // 微信
            onPageNotFound: function onPageNotFound(options) {
                return this.callLifecycle(framework_shared_1.AppLifecycle.pageNotFound, options);
            },
            // 微信
            onUnhandledRejection: function onUnhandledRejection(options) {
                return this.callLifecycle(framework_shared_1.AppLifecycle.unhandledRejection, options);
            },
            // 微信
            onThemeChange: function onThemeChange(options) {
                return this.callLifecycle(framework_shared_1.AppLifecycle.themeChange, options);
            }
        };
        var lifecycleEvent = {
            // 阿里
            onShareAppMessage: function onShareAppMessage(options) {
                return this.callLifecycle(framework_shared_1.AppLifecycle.shareAppMessage, options);
            }
        };
        (framework_shared_1.RuntimeOptions.get('appEvents') || []).forEach(function(eventName) {
            if (lifecycleEvent[eventName]) {
                config[eventName] = lifecycleEvent[eventName];
            }
        });
        return framework_shared_1.RuntimeOptions.get('pluginDriver').onAppConfig(config);
    };
    return createConfig(WrappedApp);
}
exports["default"] = createAppConfig;


}),
49: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function get() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __setModuleDefault = this && this.__setModuleDefault || (Object.create ? function(o, v) {
    Object.defineProperty(o, "default", {
        enumerable: true,
        value: v
    });
} : function(o, v) {
    o["default"] = v;
});
var __importStar = this && this.__importStar || function(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) {
        for(var k in mod)if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    }
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var React = __importStar(__webpack_require__(4));
var framework_shared_1 = __webpack_require__(20);
var Container_1 = __importDefault(__webpack_require__(46));
var render_1 = __importDefault(__webpack_require__(9));
function createComponentConfig(Component) {
    var config = {
        data: {
            action: {},
            root: {
                children: []
            }
        },
        didMount: function didMount() {
            if (!this.container) {
                this.init();
            }
        },
        didUpdate: function didUpdate(prevProps, prevData) {
            if (prevData !== this.data) {
                return;
            }
            this.render();
        },
        didUnmount: function didUnmount() {
            this.container.clearUpdate();
            (0, render_1.default)(null, this.container);
        },
        methods: {
            init: function init() {
                this.component = framework_shared_1.RuntimeOptions.get('pluginDriver').onMiniComponent({
                    component: Component,
                    context: this
                });
                this.container = new Container_1.default(this);
                this.render();
            },
            render: function render() {
                this.element = (0, render_1.default)(React.createElement(framework_shared_1.ComponentInstanceContext.Provider, {
                    value: this
                }, React.createElement(this.component, this.props)), this.container);
            }
        }
    };
    return config;
}
exports["default"] = createComponentConfig;


}),
51: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var react_1 = __importDefault(__webpack_require__(4));
var framework_shared_1 = __webpack_require__(20);
function createHostComponent(name, component) {
    if (component) {
        return component;
    }
    var Component = react_1.default.forwardRef(function(props, ref) {
        var element = react_1.default.createElement(name, Object.assign(Object.assign({}, props), {
            ref: ref
        }));
        element = framework_shared_1.RuntimeOptions.get('pluginDriver').onCreateHostComponentElement(element);
        return element;
    });
    Component.displayName = name;
    return framework_shared_1.RuntimeOptions.get('pluginDriver').onCreateHostComponent(Component);
}
exports["default"] = createHostComponent;


}),
50: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var react_1 = __importDefault(__webpack_require__(4));
function createNativeComponent(name) {
    var Component = react_1.default.forwardRef(function(props, ref) {
        var newProps = Object.assign({}, props);
        newProps.__ref = typeof ref === 'function' ? ref : function(e) {
            if (ref) {
                ref.current = e;
            }
        };
        return react_1.default.createElement(name, newProps);
    });
    Component.displayName = name;
    return Component;
}
exports["default"] = createNativeComponent;


}),
44: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.resetPageId = void 0;
var react_1 = __importDefault(__webpack_require__(4));
var framework_shared_1 = __webpack_require__(20);
var stopPullDownRefresh_1 = __importDefault(__webpack_require__(45));
var Container_1 = __importDefault(__webpack_require__(46));
var ReactPortal_1 = __webpack_require__(48);
var render_1 = __importDefault(__webpack_require__(9));
var index_1 = __webpack_require__(8);
var idCounter = 0;
function generatePageId() {
    var id = idCounter;
    var pageId = 'page_' + id;
    idCounter += 1;
    return pageId;
}
// for testing
function resetPageId() {
    idCounter = 0;
}
exports.resetPageId = resetPageId;
function createPageConfig(Page, name) {
    var _a;
    var app;
    try {
        app = getApp();
    } catch (e) {
        app = null;
    }
    var config = {
        data: {
            root: {
                children: []
            },
            modalRoot: {
                children: []
            }
        },
        wrapperRef: react_1.default.createRef(),
        lifecycleCallback: {},
        onLoad: function onLoad(query) {
            var PageWrapper = (0, framework_shared_1.createPageWrapper)(Page, name);
            this.pageId = generatePageId();
            this.lifecycleCallback = {};
            this.data = {
                root: {
                    children: []
                },
                modalRoot: {
                    children: []
                }
            };
            this.query = query;
            this.container = new Container_1.default(this, 'root');
            this.modalContainer = new Container_1.default(this, 'modalRoot');
            var pageElement = react_1.default.createElement(PageWrapper, {
                page: this,
                query: query,
                modalContainer: this.modalContainer,
                ref: this.wrapperRef
            });
            if (app && app._mount) {
                this.element = (0, ReactPortal_1.createPortal)(pageElement, this.container, this.pageId);
                app._mount(this);
            } else {
                this.element = (0, render_1.default)(pageElement, this.container);
            }
            return this.callLifecycle(framework_shared_1.Lifecycle.load, query);
        },
        onUnload: function onUnload() {
            this.callLifecycle(framework_shared_1.Lifecycle.unload);
            this.unloaded = true;
            this.container.clearUpdate();
            if (app) {
                app._unmount(this);
            }
        },
        onTabItemTap: function onTabItemTap(e) {
            return this.callLifecycle(framework_shared_1.Lifecycle.tabItemTap, e);
        },
        onResize: function onResize(e) {
            return this.callLifecycle(framework_shared_1.Lifecycle.resize, e);
        },
        /**
     * Lifecycle start
     */ registerLifecycle: function registerLifecycle(lifecycle, callback) {
            var _this = this;
            this.lifecycleCallback[lifecycle] = this.lifecycleCallback[lifecycle] || [];
            this.lifecycleCallback[lifecycle].push(callback);
            return function() {
                _this.lifecycleCallback[lifecycle].splice(_this.lifecycleCallback[lifecycle].indexOf(callback), 1);
            };
        },
        callLifecycle: function callLifecycle(lifecycle) {
            for(var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++){
                args[_key - 1] = arguments[_key];
            }
            var callbacks = this.lifecycleCallback[lifecycle] || [];
            var result;
            // 生命周期中可能改变 state 导致 callbacks 发生变化
            _toConsumableArray(callbacks).map(function(callback) {
                result = (0, index_1.unstable_batchedUpdates)(function(args) {
                    return callback.apply(void 0, _toConsumableArray(args));
                }, args);
            });
            if (result) {
                return result;
            }
            var callback = (0, framework_shared_1.callbackName)(lifecycle);
            if (this.wrapperRef.current && this.wrapperRef.current[callback]) {
                var _this$wrapperRef$curr;
                return (_this$wrapperRef$curr = this.wrapperRef.current)[callback].apply(_this$wrapperRef$curr, args);
            }
        },
        events: {
            // 页面返回时触发
            onBack: function onBack(e) {
                return this.callLifecycle(framework_shared_1.Lifecycle.back, e);
            },
            // 键盘高度变化时触发
            onKeyboardHeight: function onKeyboardHeight(e) {
                return this.callLifecycle(framework_shared_1.Lifecycle.keyboardHeight, e);
            },
            onTabItemTap: function onTabItemTap(e) {
                return this.callLifecycle(framework_shared_1.Lifecycle.tabItemTap, e);
            },
            // 点击但切换tabItem前触发
            beforeTabItemTap: function beforeTabItemTap() {
                return this.callLifecycle(framework_shared_1.Lifecycle.beforeTabItemTap);
            },
            onResize: function onResize(e) {
                return this.callLifecycle(framework_shared_1.Lifecycle.resize, e);
            }
        },
        onShow: function onShow() {
            return this.callLifecycle(framework_shared_1.Lifecycle.show);
        },
        onHide: function onHide() {
            return this.callLifecycle(framework_shared_1.Lifecycle.hide);
        },
        onReady: function onReady() {
            return this.callLifecycle(framework_shared_1.Lifecycle.ready);
        },
        onPullDownRefresh: function onPullDownRefresh(e) {
            var result = this.callLifecycle(framework_shared_1.Lifecycle.pullDownRefresh, e);
            if (result && typeof result.then === 'function') {
                Promise.resolve(result).then(function() {
                    (0, stopPullDownRefresh_1.default)();
                });
            }
        },
        onReachBottom: function onReachBottom() {
            return this.callLifecycle(framework_shared_1.Lifecycle.reachBottom);
        },
        onTitleClick: function onTitleClick() {
            return this.callLifecycle(framework_shared_1.Lifecycle.titleClick);
        },
        onOptionMenuClick: function onOptionMenuClick(e) {
            return this.callLifecycle(framework_shared_1.Lifecycle.optionMenuClick, e);
        },
        onPopMenuClick: function onPopMenuClick(e) {
            return this.callLifecycle(framework_shared_1.Lifecycle.popMenuClick, e);
        },
        onPullIntercept: function onPullIntercept() {
            return this.callLifecycle(framework_shared_1.Lifecycle.pullIntercept);
        }
    };
    var lifecycleEvents = {
        onPageScroll: function onPageScroll(e) {
            return this.callLifecycle(framework_shared_1.Lifecycle.pageScroll, e);
        },
        onShareAppMessage: function onShareAppMessage(options) {
            return this.callLifecycle(framework_shared_1.Lifecycle.shareAppMessage, options) || {};
        },
        onShareTimeline: function onShareTimeline(options) {
            return this.callLifecycle(framework_shared_1.Lifecycle.shareTimeline, options) || {};
        }
    };
    ((_a = framework_shared_1.RuntimeOptions.get('pageEvents')[name]) !== null && _a !== void 0 ? _a : []).forEach(function(eventName) {
        if (lifecycleEvents[eventName]) {
            config[eventName] = lifecycleEvents[eventName];
        }
    });
    return framework_shared_1.RuntimeOptions.get('pluginDriver').onPageConfig({
        config: config,
        page: name
    });
}
exports["default"] = createPageConfig;


}),
52: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.useQuery = exports.useNativeEffect = exports.useComponentInstance = exports.usePageInstance = exports.useAppEvent = exports.usePageEvent = void 0;
var framework_shared_1 = __webpack_require__(20);
Object.defineProperty(exports, "usePageEvent", ({
    enumerable: true,
    get: function get() {
        return framework_shared_1.usePageEvent;
    }
}));
Object.defineProperty(exports, "useAppEvent", ({
    enumerable: true,
    get: function get() {
        return framework_shared_1.useAppEvent;
    }
}));
Object.defineProperty(exports, "usePageInstance", ({
    enumerable: true,
    get: function get() {
        return framework_shared_1.usePageInstance;
    }
}));
Object.defineProperty(exports, "useComponentInstance", ({
    enumerable: true,
    get: function get() {
        return framework_shared_1.useComponentInstance;
    }
}));
var useNativeEffect_1 = __webpack_require__(53);
Object.defineProperty(exports, "useNativeEffect", ({
    enumerable: true,
    get: function get() {
        return __importDefault(useNativeEffect_1).default;
    }
}));
var useQuery_1 = __webpack_require__(54);
Object.defineProperty(exports, "useQuery", ({
    enumerable: true,
    get: function get() {
        return __importDefault(useQuery_1).default;
    }
}));


}),
53: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var react_1 = __webpack_require__(4);
var nativeEffect_1 = __importDefault(__webpack_require__(47));
function useNativeEffect(listener, deps) {
    (0, react_1.useLayoutEffect)(function() {
        return nativeEffect_1.default.connect(listener, !!deps);
    }, deps);
}
exports["default"] = useNativeEffect;


}),
54: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var react_1 = __webpack_require__(4);
var framework_shared_1 = __webpack_require__(20);
function useQuery() {
    var pageInstance = (0, react_1.useContext)(framework_shared_1.PageInstanceContext);
    return pageInstance.query;
}
exports["default"] = useQuery;


}),
40: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var framework_shared_1 = __webpack_require__(20);
var STYLE = [
    'style',
    'placeholderStyle'
];
var CHILDREN = 'children';
var CLASS_NAME = 'className';
function diffProperties(lastRawProps, nextRawProps) {
    var updatePayload = [];
    var lastProps = lastRawProps;
    var nextProps = nextRawProps;
    var propKey;
    var styleName;
    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var styleUpdates = {};
    for(propKey in lastProps){
        if (hasOwnProperty.call(nextProps, propKey) || !hasOwnProperty.call(lastProps, propKey) || lastProps[propKey] == null) {
            continue;
        }
        if ((0, framework_shared_1.includes)(STYLE, propKey)) {
            var lastStyle = lastProps[propKey];
            for(styleName in lastStyle){
                if (hasOwnProperty.call(lastStyle, styleName)) {
                    if (!styleUpdates[propKey]) {
                        styleUpdates[propKey] = {};
                    }
                    styleUpdates[propKey][styleName] = '';
                }
            }
        } else {
            // For all other deleted properties we add it to the queue. We use
            // the whitelist in the commit phase instead.
            updatePayload.push(propKey, propKey === CLASS_NAME ? '' : null);
        }
    }
    for(propKey in nextProps){
        var nextProp = nextProps[propKey];
        var lastProp = lastProps != null ? lastProps[propKey] : undefined;
        if (!hasOwnProperty.call(nextProps, propKey) || nextProp === lastProp || nextProp == null && lastProp == null) {
            continue;
        }
        if ((0, framework_shared_1.includes)(STYLE, propKey)) {
            if (false) {}
            if (lastProp) {
                // Unset styles on `lastProp` but not on `nextProp`.
                for(styleName in lastProp){
                    if (hasOwnProperty.call(lastProp, styleName) && (!nextProp || !hasOwnProperty.call(nextProp, styleName))) {
                        if (!styleUpdates[propKey]) {
                            styleUpdates[propKey] = {};
                        }
                        styleUpdates[propKey][styleName] = '';
                    }
                }
                // Update styles that changed since `lastProp`.
                for(styleName in nextProp){
                    if (hasOwnProperty.call(nextProp, styleName) && lastProp[styleName] !== nextProp[styleName]) {
                        if (!styleUpdates[propKey]) {
                            styleUpdates[propKey] = {};
                        }
                        styleUpdates[propKey][styleName] = nextProp[styleName];
                    }
                }
            } else {
                // Relies on `updateStylesByID` not mutating `styleUpdates`.
                if (!styleUpdates[propKey]) {
                    updatePayload.push(propKey, null);
                }
                styleUpdates[propKey] = nextProp;
            }
        } else if (propKey === CHILDREN) {
            if (lastProp !== nextProp && (typeof nextProp === 'string' || typeof nextProp === 'number')) {
                updatePayload.push(propKey, '' + nextProp);
            }
        } else {
            // For any other property we always add it to the queue and then we
            // filter it out using the whitelist during the commit.
            updatePayload.push(propKey, nextProp);
        }
    }
    // 由于 style 要转换成 string， 所以必须整个 style 对象都更新
    for(var styleKey in styleUpdates){
        var styleValue = styleUpdates[styleKey];
        if (styleValue) {
            updatePayload.push(styleKey, Object.assign({}, lastProps[styleKey], styleValue));
        }
    }
    return updatePayload.length ? updatePayload : null;
}
exports["default"] = diffProperties;


}),
13: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var scheduler_1 = __importDefault(__webpack_require__(11));
var constants_1 = __webpack_require__(14);
var instanceId_1 = __webpack_require__(15);
var VNode_1 = __importDefault(__webpack_require__(16));
var diffProperties_1 = __importDefault(__webpack_require__(40));
var _scheduler_1$default = scheduler_1.default, scheduleDeferredCallback = _scheduler_1$default.unstable_scheduleCallback, cancelDeferredCallback = _scheduler_1$default.unstable_cancelCallback, shouldYield = _scheduler_1$default.unstable_shouldYield, now = _scheduler_1$default.unstable_now;
var DOM_TAG_MAP = {
    span: 'text',
    div: 'view',
    img: 'image'
};
function processProps(newProps, node) {
    var props = {};
    node.unregisteredCallbacks();
    for(var _i = 0, _Object$keys = Object.keys(newProps); _i < _Object$keys.length; _i++){
        var propKey = _Object$keys[_i];
        if (typeof newProps[propKey] === 'function') {
            props[propKey] = node.registerCallback(propKey, newProps[propKey]);
        } else if (propKey === 'style') {
            props[propKey] = newProps[propKey] || '';
        } else if (propKey === 'children') {
        // pass
        } else {
            props[propKey] = newProps[propKey];
        }
    }
    return props;
}
var rootHostContext = {};
var childHostContext = {};
exports["default"] = {
    now: now,
    getPublicInstance: function getPublicInstance(inst) {
        return inst;
    },
    getRootHostContext: function getRootHostContext() {
        return rootHostContext;
    },
    shouldSetTextContent: function shouldSetTextContent(type) {
        return type === 'stub-block';
    },
    prepareForCommit: function prepareForCommit() {
        return null;
    },
    preparePortalMount: function preparePortalMount() {
    // nothing to do
    },
    clearContainer: function clearContainer() {
    // nothing to do
    },
    resetAfterCommit: function resetAfterCommit(container) {
        container.applyUpdate();
    },
    getChildHostContext: function getChildHostContext() {
        return childHostContext;
    },
    createInstance: function createInstance(type, newProps, container) {
        var _a;
        var id = (0, instanceId_1.generate)();
        var node = new VNode_1.default({
            id: id,
            type: (_a = DOM_TAG_MAP[type]) !== null && _a !== void 0 ? _a : type,
            props: {},
            container: container
        });
        node.props = processProps(newProps, node);
        return node;
    },
    createTextInstance: function createTextInstance(text, container) {
        var id = (0, instanceId_1.generate)();
        var node = new VNode_1.default({
            id: id,
            type: constants_1.TYPE_TEXT,
            props: null,
            container: container
        });
        node.text = text;
        return node;
    },
    commitTextUpdate: function commitTextUpdate(node, oldText, newText) {
        if (oldText !== newText) {
            node.text = newText;
            node.update();
        }
    },
    prepareUpdate: function prepareUpdate(node, type, lastProps, nextProps) {
        lastProps = processProps(lastProps, node);
        nextProps = processProps(nextProps, node);
        return (0, diffProperties_1.default)(lastProps, nextProps);
    },
    commitUpdate: function commitUpdate(node, updatePayload, type, oldProps, newProps) {
        node.props = processProps(newProps, node);
        node.update(updatePayload);
    },
    appendInitialChild: function appendInitialChild(parent, child) {
        parent.appendChild(child);
    },
    appendChild: function appendChild(parent, child) {
        parent.appendChild(child);
    },
    insertBefore: function insertBefore(parent, child, beforeChild) {
        parent.insertBefore(child, beforeChild);
    },
    removeChild: function removeChild(parent, child) {
        parent.removeChild(child);
    },
    finalizeInitialChildren: function finalizeInitialChildren() {
        return false;
    },
    appendChildToContainer: function appendChildToContainer(container, child) {
        container.appendChild(child);
        child.mounted = true;
    },
    insertInContainerBefore: function insertInContainerBefore(container, child, beforeChild) {
        container.insertBefore(child, beforeChild);
    },
    removeChildFromContainer: function removeChildFromContainer(container, child) {
        container.removeChild(child);
    },
    hideInstance: function hideInstance(instance) {
        var _a;
        var originStyle = (_a = instance.props) === null || _a === void 0 ? void 0 : _a.style;
        var newStyle = Object.assign({}, originStyle || {}, {
            display: 'none'
        }); // 微信和阿里的小程序都不支持在内联样式中加`important!`
        instance.props = Object.assign({}, instance.props || {}, {
            style: newStyle
        });
        instance.update();
    },
    hideTextInstance: function hideTextInstance(instance) {
        instance.text = '';
        instance.update();
    },
    unhideInstance: function unhideInstance(instance, props) {
        instance.props = props;
        instance.update();
    },
    unhideTextInstance: function unhideTextInstance(instance, text) {
        instance.text = text;
        instance.update();
    },
    /**
   * 当 fiber 被标记为 Deletion 时，dom被卸载后，从dom节点上删除 react 初始化的内容，如 __reactProps$xxxx 等. 详见React源码
   * https://github.com/facebook/react/blob/8b31835fc0a4de479a816471764f0e1d103ae205/packages/react-reconciler/src/forks/ReactFiberConfig.custom.js#L78
   */ detachDeletedInstance: function detachDeletedInstance() {
        return {};
    },
    schedulePassiveEffects: scheduleDeferredCallback,
    cancelPassiveEffects: cancelDeferredCallback,
    shouldYield: shouldYield,
    scheduleDeferredCallback: scheduleDeferredCallback,
    cancelDeferredCallback: cancelDeferredCallback,
    supportsMutation: true
};


}),
8: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = {
            enumerable: true,
            get: function get() {
                return m[k];
            }
        };
    }
    Object.defineProperty(o, k2, desc);
} : function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});
var __exportStar = this && this.__exportStar || function(m, exports1) {
    for(var p in m)if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports1, p)) __createBinding(exports1, m, p);
};
var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.unstable_batchedUpdates = exports.PluginDriver = exports.RuntimeOptions = exports.createPortal = exports.createHostComponent = exports.createNativeComponent = exports.createComponentConfig = exports.createPageConfig = exports.createAppConfig = exports.render = void 0;
var render_1 = __webpack_require__(9);
Object.defineProperty(exports, "render", ({
    enumerable: true,
    get: function get() {
        return __importDefault(render_1).default;
    }
}));
var createAppConfig_1 = __webpack_require__(41);
Object.defineProperty(exports, "createAppConfig", ({
    enumerable: true,
    get: function get() {
        return __importDefault(createAppConfig_1).default;
    }
}));
var createPageConfig_1 = __webpack_require__(44);
Object.defineProperty(exports, "createPageConfig", ({
    enumerable: true,
    get: function get() {
        return __importDefault(createPageConfig_1).default;
    }
}));
var createComponentConfig_1 = __webpack_require__(49);
Object.defineProperty(exports, "createComponentConfig", ({
    enumerable: true,
    get: function get() {
        return __importDefault(createComponentConfig_1).default;
    }
}));
var createNativeComponent_1 = __webpack_require__(50);
Object.defineProperty(exports, "createNativeComponent", ({
    enumerable: true,
    get: function get() {
        return __importDefault(createNativeComponent_1).default;
    }
}));
var createHostComponent_1 = __webpack_require__(51);
Object.defineProperty(exports, "createHostComponent", ({
    enumerable: true,
    get: function get() {
        return __importDefault(createHostComponent_1).default;
    }
}));
var ReactPortal_1 = __webpack_require__(48);
Object.defineProperty(exports, "createPortal", ({
    enumerable: true,
    get: function get() {
        return ReactPortal_1.createPortal;
    }
}));
var framework_shared_1 = __webpack_require__(20);
Object.defineProperty(exports, "RuntimeOptions", ({
    enumerable: true,
    get: function get() {
        return framework_shared_1.RuntimeOptions;
    }
}));
Object.defineProperty(exports, "PluginDriver", ({
    enumerable: true,
    get: function get() {
        return framework_shared_1.PluginDriver;
    }
}));
__exportStar(__webpack_require__(52), exports);
var render_2 = __webpack_require__(9);
exports.unstable_batchedUpdates = render_2.ReactReconcilerInst.batchedUpdates;
exports["default"] = {
    unstable_batchedUpdates: exports.unstable_batchedUpdates
};


}),
15: (function (__unused_webpack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.generate = exports.reset = void 0;
var instanceId = 0;
function reset() {
    instanceId = 0;
}
exports.reset = reset;
function generate() {
    var id = instanceId;
    instanceId += 1;
    return id;
}
exports.generate = generate;


}),
47: (function (__unused_webpack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var effector = {
    listenerConfigs: []
};
function dispose(listener) {
    effector.listenerConfigs = effector.listenerConfigs.filter(function(config) {
        return config.listener !== listener;
    });
}
function connect(listener, once) {
    effector.listenerConfigs.push({
        listener: listener,
        once: once
    });
    return function() {
        return dispose(listener);
    };
}
function run() {
    effector.listenerConfigs.forEach(function(config) {
        config.listener();
        if (config.once) {
            dispose(config.listener);
        }
    });
}
exports["default"] = {
    connect: connect,
    run: run,
    dispose: dispose
};


}),
42: (function () {
"use strict";

/* eslint-disable prefer-rest-params */ /* istanbul ignore next */ function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
if (typeof Function.prototype.call === 'undefined') {
    Function.prototype.call = function(context) {
        var _context;
        context = context || window;
        context.fn = this;
        var args = Array.prototype.slice.call(arguments).slice(1);
        var result = (_context = context).fn.apply(_context, _toConsumableArray(args));
        delete context.fn;
        return result;
    };
}
/* istanbul ignore next */ if (typeof Function.prototype.apply === 'undefined') {
    Function.prototype.apply = function(context) {
        context = context || window;
        context.fn = this;
        var result;
        if (arguments[1]) {
            var _context2;
            result = (_context2 = context).fn.apply(_context2, _toConsumableArray(arguments[1]));
        } else {
            result = context.fn();
        }
        delete context.fn;
        return result;
    };
}


}),
17: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.propAlias = exports.getAlias = void 0;
var plainStyle_1 = __importDefault(__webpack_require__(18));
var framework_shared_1 = __webpack_require__(20);
function getAlias(prop, type) {
    var _a, _b;
    var hostComponent = framework_shared_1.RuntimeOptions.get('hostComponents')[type];
    var prefix = "".concat(framework_shared_1.RuntimeOptions.get('platform'), "-");
    // 判断是否是平台独有属性
    if (prop.startsWith(prefix)) {
        return prop.replace(new RegExp("^".concat(prefix)), '');
    }
    return (_b = (_a = hostComponent === null || hostComponent === void 0 ? void 0 : hostComponent.alias) === null || _a === void 0 ? void 0 : _a[prop]) !== null && _b !== void 0 ? _b : prop;
}
exports.getAlias = getAlias;
function getValue(prop, value) {
    if (prop.toLowerCase().endsWith('style') && Object.prototype.toString.call(value) === '[object Object]') {
        return (0, plainStyle_1.default)(value);
    }
    return value;
}
function propAlias(prop, value, type) {
    return [
        getAlias(prop, type),
        getValue(prop, value)
    ];
}
exports.propAlias = propAlias;
function propsAlias(props, type) {
    if (!props) {
        return props;
    }
    var prefix = "".concat(framework_shared_1.RuntimeOptions.get('platform'), "-");
    var aliasProps = {};
    for(var prop in props){
        // 平台前缀属性优先级提升
        // @see https://github.com/remaxjs/remax/issues/1409
        var hasPrefix = prop.startsWith(prefix);
        var key = getAlias(prop, type);
        var value = getValue(prop, props[prop]);
        if (hasPrefix) {
            aliasProps[key] = value;
        } else {
            aliasProps[key] = aliasProps[key] || value;
        }
    }
    return aliasProps;
}
exports["default"] = propsAlias;


}),
9: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

var __importDefault = this && this.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {
        "default": mod
    };
};
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.ReactReconcilerInst = void 0;
var react_reconciler_1 = __importDefault(__webpack_require__(10));
var hostConfig_1 = __importDefault(__webpack_require__(13));
exports.ReactReconcilerInst = (0, react_reconciler_1.default)(hostConfig_1.default);
if (false) {}
function getPublicRootInstance(container) {
    var containerFiber = container.current;
    if (!containerFiber.child) {
        return null;
    }
    return containerFiber.child.stateNode;
}
function render(rootElement, container) {
    // Create a root Container if it doesnt exist
    if (!container._rootContainer) {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        container._rootContainer = exports.ReactReconcilerInst.createContainer(container, 0, null, false, null, '', function() {}, null);
    }
    exports.ReactReconcilerInst.updateContainer(rootElement, container._rootContainer, null, function() {
    // ignore
    });
    return getPublicRootInstance(container._rootContainer);
}
exports["default"] = render;


}),
45: (function (__unused_webpack_module, exports) {
"use strict";

Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports["default"] = my.stopPullDownRefresh;


}),
19: (function (__unused_webpack_module, exports) {
"use strict";

// https://github.com/facebook/react/blob/master/packages/react-dom/src/shared/CSSProperty.js
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
exports.isUnitlessNumber = void 0;
/**
 * CSS properties which accept numbers but are not in units of "px".
 */ exports.isUnitlessNumber = {
    animationIterationCount: true,
    borderImageOutset: true,
    borderImageSlice: true,
    borderImageWidth: true,
    boxFlex: true,
    boxFlexGroup: true,
    boxOrdinalGroup: true,
    columnCount: true,
    columns: true,
    flex: true,
    flexGrow: true,
    flexPositive: true,
    flexShrink: true,
    flexNegative: true,
    flexOrder: true,
    gridArea: true,
    gridRow: true,
    gridRowEnd: true,
    gridRowSpan: true,
    gridRowStart: true,
    gridColumn: true,
    gridColumnEnd: true,
    gridColumnSpan: true,
    gridColumnStart: true,
    fontWeight: true,
    lineClamp: true,
    lineHeight: true,
    opacity: true,
    order: true,
    orphans: true,
    tabSize: true,
    widows: true,
    zIndex: true,
    zoom: true,
    // SVG-related properties
    fillOpacity: true,
    floodOpacity: true,
    stopOpacity: true,
    strokeDasharray: true,
    strokeDashoffset: true,
    strokeMiterlimit: true,
    strokeOpacity: true,
    strokeWidth: true
};
/**
 * @param {string} prefix vendor-specific prefix, eg: Webkit
 * @param {string} key style name, eg: transitionDuration
 * @return {string} style name prefixed with `prefix`, properly camelCased, eg:
 * WebkitTransitionDuration
 */ function prefixKey(prefix, key) {
    return prefix + key.charAt(0).toUpperCase() + key.substring(1);
}
/**
 * Support style names that may come passed in prefixed by adding permutations
 * of vendor prefixes.
 */ var prefixes = [
    'Webkit',
    'ms',
    'Moz',
    'O'
];
var _loop = function _loop(prop) {
    prefixes.forEach(function(prefix) {
        exports.isUnitlessNumber[prefixKey(prefix, prop)] = exports.isUnitlessNumber[prop];
    });
};
for(var prop in exports.isUnitlessNumber){
    _loop(prop);
}


}),
18: (function (__unused_webpack_module, exports, __webpack_require__) {
"use strict";

function _toConsumableArray(r) {
    return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
function _unsupportedIterableToArray(r, a) {
    if (r) {
        if ("string" == typeof r) return _arrayLikeToArray(r, a);
        var t = ({}).toString.call(r).slice(8, -1);
        return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
}
function _iterableToArray(r) {
    if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
}
function _arrayWithoutHoles(r) {
    if (Array.isArray(r)) return _arrayLikeToArray(r);
}
function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for(var e = 0, n = Array(a); e < a; e++)n[e] = r[e];
    return n;
}
Object.defineProperty(exports, "__esModule", ({
    value: true
}));
var CSSProperty_1 = __webpack_require__(19);
var framework_shared_1 = __webpack_require__(20);
var vendorPrefixes = [
    'webkit',
    'moz',
    'ms',
    'o'
];
var transformReactStyleKey = function transformReactStyleKey(key) {
    // css3 var
    if (key === null || key === void 0 ? void 0 : key.startsWith('--')) {
        return key;
    }
    var styleValue = key.replace(/\.?([A-Z]+)/g, function(_x, y) {
        return '-' + y.toLowerCase();
    });
    // vendor prefix
    if (styleValue === null || styleValue === void 0 ? void 0 : styleValue.startsWith('-')) {
        var firstWord = styleValue.split('-').filter(function(s) {
            return s;
        })[0];
        styleValue = styleValue.replace(/^-/, '');
        if ((0, framework_shared_1.find)(vendorPrefixes, function(prefix) {
            return prefix === firstWord;
        })) {
            styleValue = '-' + styleValue;
        }
    }
    return styleValue;
};
var transformPx = function transformPx(value) {
    if (typeof value !== 'string') {
        return value;
    }
    return value.replace(/\b(\d+(\.\d+)?)px\b/g, function(match, x) {
        var targetUnit = 'rpx';
        var size = Number(x);
        return size % 1 === 0 ? size + targetUnit : size.toFixed(2) + targetUnit;
    });
};
var plainStyle = function plainStyle(style) {
    return Object.keys(style).reduce(function(acc, key) {
        var value = style[key];
        if (!Number.isNaN(Number(value)) && !CSSProperty_1.isUnitlessNumber[key] && !(key === null || key === void 0 ? void 0 : key.startsWith('--'))) {
            value = value + 'rpx';
        }
        return [].concat(_toConsumableArray(acc), [
            "".concat(transformReactStyleKey(key), ":").concat(framework_shared_1.RuntimeOptions.get('pxToRpx') ? transformPx(value) : value, ";")
        ]);
    }, []).join('');
};
exports["default"] = plainStyle;


}),

}]);