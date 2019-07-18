/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @noflow
 * @preventMunge
 * @preserve-invariant-messages
 */

/*
 Modernizr 3.0.0pre (Custom Build) | MIT
*/
"use strict";
var React = require("react"),
  Scheduler = require("scheduler");
function ReactErrorProd(error) {
  for (
    var code = error.message,
      url = "https://reactjs.org/docs/error-decoder.html?invariant=" + code,
      i = 1;
    i < arguments.length;
    i++
  )
    url += "&args[]=" + encodeURIComponent(arguments[i]);
  error.message =
    "Minified React error #" +
    code +
    "; visit " +
    url +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings. ";
  return error;
}
require("warning");
var ReactSharedInternals =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
ReactSharedInternals.hasOwnProperty("ReactCurrentDispatcher") ||
  (ReactSharedInternals.ReactCurrentDispatcher = { current: null });
ReactSharedInternals.hasOwnProperty("ReactCurrentBatchConfig") ||
  (ReactSharedInternals.ReactCurrentBatchConfig = { suspense: null });
var hasSymbol = "function" === typeof Symbol && Symbol.for,
  REACT_ELEMENT_TYPE = hasSymbol ? Symbol.for("react.element") : 60103,
  REACT_PORTAL_TYPE = hasSymbol ? Symbol.for("react.portal") : 60106,
  REACT_FRAGMENT_TYPE = hasSymbol ? Symbol.for("react.fragment") : 60107,
  REACT_STRICT_MODE_TYPE = hasSymbol ? Symbol.for("react.strict_mode") : 60108,
  REACT_PROFILER_TYPE = hasSymbol ? Symbol.for("react.profiler") : 60114,
  REACT_PROVIDER_TYPE = hasSymbol ? Symbol.for("react.provider") : 60109,
  REACT_CONTEXT_TYPE = hasSymbol ? Symbol.for("react.context") : 60110,
  REACT_CONCURRENT_MODE_TYPE = hasSymbol
    ? Symbol.for("react.concurrent_mode")
    : 60111,
  REACT_FORWARD_REF_TYPE = hasSymbol ? Symbol.for("react.forward_ref") : 60112,
  REACT_SUSPENSE_TYPE = hasSymbol ? Symbol.for("react.suspense") : 60113,
  REACT_SUSPENSE_LIST_TYPE = hasSymbol
    ? Symbol.for("react.suspense_list")
    : 60120,
  REACT_MEMO_TYPE = hasSymbol ? Symbol.for("react.memo") : 60115,
  REACT_LAZY_TYPE = hasSymbol ? Symbol.for("react.lazy") : 60116,
  REACT_EVENT_COMPONENT_TYPE = hasSymbol
    ? Symbol.for("react.event_component")
    : 60117,
  MAYBE_ITERATOR_SYMBOL = "function" === typeof Symbol && Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable =
    (MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL]) ||
    maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
var _require = require("ReactFeatureFlags"),
  disableInputAttributeSyncing = _require.disableInputAttributeSyncing,
  revertPassiveEffectsChange = _require.revertPassiveEffectsChange,
  enableUserBlockingEvents = _require.enableUserBlockingEvents,
  enableUserTimingAPI = !1,
  refCount = 0,
  timeout = null;
function updateFlagOutsideOfReactCallStack() {
  timeout ||
    (timeout = setTimeout(function() {
      timeout = null;
      enableUserTimingAPI = 0 < refCount;
    }));
}
function getComponentName(type) {
  if (null == type) return null;
  if ("function" === typeof type) return type.displayName || type.name || null;
  if ("string" === typeof type) return type;
  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return "Fragment";
    case REACT_PORTAL_TYPE:
      return "Portal";
    case REACT_PROFILER_TYPE:
      return "Profiler";
    case REACT_STRICT_MODE_TYPE:
      return "StrictMode";
    case REACT_SUSPENSE_TYPE:
      return "Suspense";
    case REACT_SUSPENSE_LIST_TYPE:
      return "SuspenseList";
  }
  if ("object" === typeof type)
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return "Context.Consumer";
      case REACT_PROVIDER_TYPE:
        return "Context.Provider";
      case REACT_FORWARD_REF_TYPE:
        var innerType = type.render;
        innerType = innerType.displayName || innerType.name || "";
        return (
          type.displayName ||
          ("" !== innerType ? "ForwardRef(" + innerType + ")" : "ForwardRef")
        );
      case REACT_MEMO_TYPE:
        return getComponentName(type.type);
      case REACT_LAZY_TYPE:
        if ((type = 1 === type._status ? type._result : null))
          return getComponentName(type);
        break;
      case REACT_EVENT_COMPONENT_TYPE:
        return type.responder.displayName;
    }
  return null;
}
function isFiberMountedImpl(fiber) {
  var node = fiber;
  if (fiber.alternate) for (; node.return; ) node = node.return;
  else {
    if (0 !== (node.effectTag & 2)) return 1;
    for (; node.return; )
      if (((node = node.return), 0 !== (node.effectTag & 2))) return 1;
  }
  return 3 === node.tag ? 2 : 3;
}
function assertIsMounted(fiber) {
  if (2 !== isFiberMountedImpl(fiber)) throw ReactErrorProd(Error(188));
}
function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    alternate = isFiberMountedImpl(fiber);
    if (3 === alternate) throw ReactErrorProd(Error(188));
    return 1 === alternate ? null : fiber;
  }
  for (var a = fiber, b = alternate; ; ) {
    var parentA = a.return;
    if (null === parentA) break;
    var parentB = parentA.alternate;
    if (null === parentB) {
      b = parentA.return;
      if (null !== b) {
        a = b;
        continue;
      }
      break;
    }
    if (parentA.child === parentB.child) {
      for (parentB = parentA.child; parentB; ) {
        if (parentB === a) return assertIsMounted(parentA), fiber;
        if (parentB === b) return assertIsMounted(parentA), alternate;
        parentB = parentB.sibling;
      }
      throw ReactErrorProd(Error(188));
    }
    if (a.return !== b.return) (a = parentA), (b = parentB);
    else {
      for (var didFindChild = !1, _child = parentA.child; _child; ) {
        if (_child === a) {
          didFindChild = !0;
          a = parentA;
          b = parentB;
          break;
        }
        if (_child === b) {
          didFindChild = !0;
          b = parentA;
          a = parentB;
          break;
        }
        _child = _child.sibling;
      }
      if (!didFindChild) {
        for (_child = parentB.child; _child; ) {
          if (_child === a) {
            didFindChild = !0;
            a = parentB;
            b = parentA;
            break;
          }
          if (_child === b) {
            didFindChild = !0;
            b = parentB;
            a = parentA;
            break;
          }
          _child = _child.sibling;
        }
        if (!didFindChild) throw ReactErrorProd(Error(189));
      }
    }
    if (a.alternate !== b) throw ReactErrorProd(Error(190));
  }
  if (3 !== a.tag) throw ReactErrorProd(Error(188));
  return a.stateNode.current === a ? fiber : alternate;
}
function findCurrentHostFiber(parent) {
  parent = findCurrentFiberUsingSlowPath(parent);
  if (!parent) return null;
  for (var node = parent; ; ) {
    if (5 === node.tag || 6 === node.tag) return node;
    if (node.child) (node.child.return = node), (node = node.child);
    else {
      if (node === parent) break;
      for (; !node.sibling; ) {
        if (!node.return || node.return === parent) return null;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }
  return null;
}
if (!React) throw ReactErrorProd(Error(227));
var eventPluginOrder = null,
  namesToPlugins = {};
function recomputePluginOrdering() {
  if (eventPluginOrder)
    for (var pluginName in namesToPlugins) {
      var pluginModule = namesToPlugins[pluginName],
        pluginIndex = eventPluginOrder.indexOf(pluginName);
      if (!(-1 < pluginIndex)) throw ReactErrorProd(Error(96), pluginName);
      if (!plugins[pluginIndex]) {
        if (!pluginModule.extractEvents)
          throw ReactErrorProd(Error(97), pluginName);
        plugins[pluginIndex] = pluginModule;
        pluginIndex = pluginModule.eventTypes;
        for (var eventName in pluginIndex) {
          var JSCompiler_inline_result = void 0;
          var dispatchConfig = pluginIndex[eventName],
            pluginModule$jscomp$0 = pluginModule,
            eventName$jscomp$0 = eventName;
          if (eventNameDispatchConfigs.hasOwnProperty(eventName$jscomp$0))
            throw ReactErrorProd(Error(99), eventName$jscomp$0);
          eventNameDispatchConfigs[eventName$jscomp$0] = dispatchConfig;
          var phasedRegistrationNames = dispatchConfig.phasedRegistrationNames;
          if (phasedRegistrationNames) {
            for (JSCompiler_inline_result in phasedRegistrationNames)
              phasedRegistrationNames.hasOwnProperty(
                JSCompiler_inline_result
              ) &&
                publishRegistrationName(
                  phasedRegistrationNames[JSCompiler_inline_result],
                  pluginModule$jscomp$0,
                  eventName$jscomp$0
                );
            JSCompiler_inline_result = !0;
          } else
            dispatchConfig.registrationName
              ? (publishRegistrationName(
                  dispatchConfig.registrationName,
                  pluginModule$jscomp$0,
                  eventName$jscomp$0
                ),
                (JSCompiler_inline_result = !0))
              : (JSCompiler_inline_result = !1);
          if (!JSCompiler_inline_result)
            throw ReactErrorProd(Error(98), eventName, pluginName);
        }
      }
    }
}
function publishRegistrationName(registrationName, pluginModule, eventName) {
  if (registrationNameModules[registrationName])
    throw ReactErrorProd(Error(100), registrationName);
  registrationNameModules[registrationName] = pluginModule;
  registrationNameDependencies[registrationName] =
    pluginModule.eventTypes[eventName].dependencies;
}
var plugins = [],
  eventNameDispatchConfigs = {},
  registrationNameModules = {},
  registrationNameDependencies = {},
  ReactFbErrorUtils = require("ReactFbErrorUtils");
if ("function" !== typeof ReactFbErrorUtils.invokeGuardedCallback)
  throw ReactErrorProd(Error(255));
function invokeGuardedCallbackImpl(name, func, context, a, b, c, d, e, f) {
  ReactFbErrorUtils.invokeGuardedCallback.apply(this, arguments);
}
var hasError = !1,
  caughtError = null,
  hasRethrowError = !1,
  rethrowError = null,
  reporter = {
    onError: function(error) {
      hasError = !0;
      caughtError = error;
    }
  };
function invokeGuardedCallback(name, func, context, a, b, c, d, e, f) {
  hasError = !1;
  caughtError = null;
  invokeGuardedCallbackImpl.apply(reporter, arguments);
}
function invokeGuardedCallbackAndCatchFirstError(
  name,
  func,
  context,
  a,
  b,
  c,
  d,
  e,
  f
) {
  invokeGuardedCallback.apply(this, arguments);
  if (hasError) {
    if (hasError) {
      var error = caughtError;
      hasError = !1;
      caughtError = null;
    } else throw ReactErrorProd(Error(198));
    hasRethrowError || ((hasRethrowError = !0), (rethrowError = error));
  }
}
var getFiberCurrentPropsFromNode = null,
  getInstanceFromNode = null,
  getNodeFromInstance = null;
function executeDispatch(event, listener, inst) {
  var type = event.type || "unknown-event";
  event.currentTarget = getNodeFromInstance(inst);
  invokeGuardedCallbackAndCatchFirstError(type, listener, void 0, event);
  event.currentTarget = null;
}
function accumulateInto(current, next) {
  if (null == next) throw ReactErrorProd(Error(30));
  if (null == current) return next;
  if (Array.isArray(current)) {
    if (Array.isArray(next)) return current.push.apply(current, next), current;
    current.push(next);
    return current;
  }
  return Array.isArray(next) ? [current].concat(next) : [current, next];
}
function forEachAccumulated(arr, cb, scope) {
  Array.isArray(arr) ? arr.forEach(cb, scope) : arr && cb.call(scope, arr);
}
var eventQueue = null;
function executeDispatchesAndReleaseTopLevel(e) {
  if (e) {
    var dispatchListeners = e._dispatchListeners,
      dispatchInstances = e._dispatchInstances;
    if (Array.isArray(dispatchListeners))
      for (
        var i = 0;
        i < dispatchListeners.length && !e.isPropagationStopped();
        i++
      )
        executeDispatch(e, dispatchListeners[i], dispatchInstances[i]);
    else
      dispatchListeners &&
        executeDispatch(e, dispatchListeners, dispatchInstances);
    e._dispatchListeners = null;
    e._dispatchInstances = null;
    e.isPersistent() || e.constructor.release(e);
  }
}
function runEventsInBatch(events) {
  null !== events && (eventQueue = accumulateInto(eventQueue, events));
  events = eventQueue;
  eventQueue = null;
  if (events) {
    forEachAccumulated(events, executeDispatchesAndReleaseTopLevel);
    if (eventQueue) throw ReactErrorProd(Error(95));
    if (hasRethrowError)
      throw ((events = rethrowError),
      (hasRethrowError = !1),
      (rethrowError = null),
      events);
  }
}
var injection = {
  injectEventPluginOrder: function(injectedEventPluginOrder) {
    if (eventPluginOrder) throw ReactErrorProd(Error(101));
    eventPluginOrder = Array.prototype.slice.call(injectedEventPluginOrder);
    recomputePluginOrdering();
  },
  injectEventPluginsByName: function(injectedNamesToPlugins) {
    var isOrderingDirty = !1,
      pluginName;
    for (pluginName in injectedNamesToPlugins)
      if (injectedNamesToPlugins.hasOwnProperty(pluginName)) {
        var pluginModule = injectedNamesToPlugins[pluginName];
        if (
          !namesToPlugins.hasOwnProperty(pluginName) ||
          namesToPlugins[pluginName] !== pluginModule
        ) {
          if (namesToPlugins[pluginName])
            throw ReactErrorProd(Error(102), pluginName);
          namesToPlugins[pluginName] = pluginModule;
          isOrderingDirty = !0;
        }
      }
    isOrderingDirty && recomputePluginOrdering();
  }
};
function getListener(inst, registrationName) {
  var listener = inst.stateNode;
  if (!listener) return null;
  var props = getFiberCurrentPropsFromNode(listener);
  if (!props) return null;
  listener = props[registrationName];
  a: switch (registrationName) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
      (props = !props.disabled) ||
        ((inst = inst.type),
        (props = !(
          "button" === inst ||
          "input" === inst ||
          "select" === inst ||
          "textarea" === inst
        )));
      inst = !props;
      break a;
    default:
      inst = !1;
  }
  if (inst) return null;
  if (listener && "function" !== typeof listener)
    throw ReactErrorProd(Error(231), registrationName, typeof listener);
  return listener;
}
var randomKey = Math.random()
    .toString(36)
    .slice(2),
  internalInstanceKey = "__reactInternalInstance$" + randomKey,
  internalEventHandlersKey = "__reactEventHandlers$" + randomKey;
function getClosestInstanceFromNode(node) {
  if (node[internalInstanceKey]) return node[internalInstanceKey];
  for (; !node[internalInstanceKey]; )
    if (node.parentNode) node = node.parentNode;
    else return null;
  node = node[internalInstanceKey];
  return 5 === node.tag || 6 === node.tag ? node : null;
}
function getInstanceFromNode$1(node) {
  node = node[internalInstanceKey];
  return !node || (5 !== node.tag && 6 !== node.tag) ? null : node;
}
function getNodeFromInstance$1(inst) {
  if (5 === inst.tag || 6 === inst.tag) return inst.stateNode;
  throw ReactErrorProd(Error(33));
}
function getFiberCurrentPropsFromNode$1(node) {
  return node[internalEventHandlersKey] || null;
}
function getParent(inst) {
  do inst = inst.return;
  while (inst && 5 !== inst.tag);
  return inst ? inst : null;
}
function accumulateDirectionalDispatches(inst, phase, event) {
  if (
    (phase = getListener(
      inst,
      event.dispatchConfig.phasedRegistrationNames[phase]
    ))
  )
    (event._dispatchListeners = accumulateInto(
      event._dispatchListeners,
      phase
    )),
      (event._dispatchInstances = accumulateInto(
        event._dispatchInstances,
        inst
      ));
}
function accumulateTwoPhaseDispatchesSingle(event) {
  if (event && event.dispatchConfig.phasedRegistrationNames) {
    for (var inst = event._targetInst, path = []; inst; )
      path.push(inst), (inst = getParent(inst));
    for (inst = path.length; 0 < inst--; )
      accumulateDirectionalDispatches(path[inst], "captured", event);
    for (inst = 0; inst < path.length; inst++)
      accumulateDirectionalDispatches(path[inst], "bubbled", event);
  }
}
function accumulateDispatches(inst, ignoredDirection, event) {
  inst &&
    event &&
    event.dispatchConfig.registrationName &&
    (ignoredDirection = getListener(
      inst,
      event.dispatchConfig.registrationName
    )) &&
    ((event._dispatchListeners = accumulateInto(
      event._dispatchListeners,
      ignoredDirection
    )),
    (event._dispatchInstances = accumulateInto(
      event._dispatchInstances,
      inst
    )));
}
function accumulateDirectDispatchesSingle(event) {
  event &&
    event.dispatchConfig.registrationName &&
    accumulateDispatches(event._targetInst, null, event);
}
function accumulateTwoPhaseDispatches(events) {
  forEachAccumulated(events, accumulateTwoPhaseDispatchesSingle);
}
var canUseDOM = !(
  "undefined" === typeof window ||
  "undefined" === typeof window.document ||
  "undefined" === typeof window.document.createElement
);
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};
  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes["Webkit" + styleProp] = "webkit" + eventName;
  prefixes["Moz" + styleProp] = "moz" + eventName;
  return prefixes;
}
var vendorPrefixes = {
    animationend: makePrefixMap("Animation", "AnimationEnd"),
    animationiteration: makePrefixMap("Animation", "AnimationIteration"),
    animationstart: makePrefixMap("Animation", "AnimationStart"),
    transitionend: makePrefixMap("Transition", "TransitionEnd")
  },
  prefixedEventNames = {},
  style = {};
canUseDOM &&
  ((style = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete vendorPrefixes.animationend.animation,
    delete vendorPrefixes.animationiteration.animation,
    delete vendorPrefixes.animationstart.animation),
  "TransitionEvent" in window ||
    delete vendorPrefixes.transitionend.transition);
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
  if (!vendorPrefixes[eventName]) return eventName;
  var prefixMap = vendorPrefixes[eventName],
    styleProp;
  for (styleProp in prefixMap)
    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
      return (prefixedEventNames[eventName] = prefixMap[styleProp]);
  return eventName;
}
var TOP_ANIMATION_END = getVendorPrefixedEventName("animationend"),
  TOP_ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"),
  TOP_ANIMATION_START = getVendorPrefixedEventName("animationstart"),
  TOP_TRANSITION_END = getVendorPrefixedEventName("transitionend"),
  mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ),
  root = null,
  startText = null,
  fallbackText = null;
function getData() {
  if (fallbackText) return fallbackText;
  var start,
    startValue = startText,
    startLength = startValue.length,
    end,
    endValue = "value" in root ? root.value : root.textContent,
    endLength = endValue.length;
  for (
    start = 0;
    start < startLength && startValue[start] === endValue[start];
    start++
  );
  var minEnd = startLength - start;
  for (
    end = 1;
    end <= minEnd &&
    startValue[startLength - end] === endValue[endLength - end];
    end++
  );
  return (fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0));
}
function functionThatReturnsTrue() {
  return !0;
}
function functionThatReturnsFalse() {
  return !1;
}
function SyntheticEvent(
  dispatchConfig,
  targetInst,
  nativeEvent,
  nativeEventTarget
) {
  this.dispatchConfig = dispatchConfig;
  this._targetInst = targetInst;
  this.nativeEvent = nativeEvent;
  dispatchConfig = this.constructor.Interface;
  for (var propName in dispatchConfig)
    dispatchConfig.hasOwnProperty(propName) &&
      ((targetInst = dispatchConfig[propName])
        ? (this[propName] = targetInst(nativeEvent))
        : "target" === propName
          ? (this.target = nativeEventTarget)
          : (this[propName] = nativeEvent[propName]));
  this.isDefaultPrevented = (null != nativeEvent.defaultPrevented
  ? nativeEvent.defaultPrevented
  : !1 === nativeEvent.returnValue)
    ? functionThatReturnsTrue
    : functionThatReturnsFalse;
  this.isPropagationStopped = functionThatReturnsFalse;
  return this;
}
Object.assign(SyntheticEvent.prototype, {
  preventDefault: function() {
    this.defaultPrevented = !0;
    var event = this.nativeEvent;
    event &&
      (event.preventDefault
        ? event.preventDefault()
        : "unknown" !== typeof event.returnValue && (event.returnValue = !1),
      (this.isDefaultPrevented = functionThatReturnsTrue));
  },
  stopPropagation: function() {
    var event = this.nativeEvent;
    event &&
      (event.stopPropagation
        ? event.stopPropagation()
        : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = !0),
      (this.isPropagationStopped = functionThatReturnsTrue));
  },
  persist: function() {
    this.isPersistent = functionThatReturnsTrue;
  },
  isPersistent: functionThatReturnsFalse,
  destructor: function() {
    var Interface = this.constructor.Interface,
      propName;
    for (propName in Interface) this[propName] = null;
    this.nativeEvent = this._targetInst = this.dispatchConfig = null;
    this.isPropagationStopped = this.isDefaultPrevented = functionThatReturnsFalse;
    this._dispatchInstances = this._dispatchListeners = null;
  }
});
SyntheticEvent.Interface = {
  type: null,
  target: null,
  currentTarget: function() {
    return null;
  },
  eventPhase: null,
  bubbles: null,
  cancelable: null,
  timeStamp: function(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: null,
  isTrusted: null
};
SyntheticEvent.extend = function(Interface) {
  function E() {}
  function Class() {
    return Super.apply(this, arguments);
  }
  var Super = this;
  E.prototype = Super.prototype;
  var prototype = new E();
  Object.assign(prototype, Class.prototype);
  Class.prototype = prototype;
  Class.prototype.constructor = Class;
  Class.Interface = Object.assign({}, Super.Interface, Interface);
  Class.extend = Super.extend;
  addEventPoolingTo(Class);
  return Class;
};
addEventPoolingTo(SyntheticEvent);
function getPooledEvent(dispatchConfig, targetInst, nativeEvent, nativeInst) {
  if (this.eventPool.length) {
    var instance = this.eventPool.pop();
    this.call(instance, dispatchConfig, targetInst, nativeEvent, nativeInst);
    return instance;
  }
  return new this(dispatchConfig, targetInst, nativeEvent, nativeInst);
}
function releasePooledEvent(event) {
  if (!(event instanceof this)) throw ReactErrorProd(Error(279));
  event.destructor();
  10 > this.eventPool.length && this.eventPool.push(event);
}
function addEventPoolingTo(EventConstructor) {
  EventConstructor.eventPool = [];
  EventConstructor.getPooled = getPooledEvent;
  EventConstructor.release = releasePooledEvent;
}
var SyntheticCompositionEvent = SyntheticEvent.extend({ data: null }),
  SyntheticInputEvent = SyntheticEvent.extend({ data: null }),
  END_KEYCODES = [9, 13, 27, 32],
  canUseCompositionEvent = canUseDOM && "CompositionEvent" in window,
  documentMode = null;
canUseDOM &&
  "documentMode" in document &&
  (documentMode = document.documentMode);
var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode,
  useFallbackCompositionData =
    canUseDOM &&
    (!canUseCompositionEvent ||
      (documentMode && 8 < documentMode && 11 >= documentMode)),
  SPACEBAR_CHAR = String.fromCharCode(32),
  eventTypes = {
    beforeInput: {
      phasedRegistrationNames: {
        bubbled: "onBeforeInput",
        captured: "onBeforeInputCapture"
      },
      dependencies: ["compositionend", "keypress", "textInput", "paste"]
    },
    compositionEnd: {
      phasedRegistrationNames: {
        bubbled: "onCompositionEnd",
        captured: "onCompositionEndCapture"
      },
      dependencies: "blur compositionend keydown keypress keyup mousedown".split(
        " "
      )
    },
    compositionStart: {
      phasedRegistrationNames: {
        bubbled: "onCompositionStart",
        captured: "onCompositionStartCapture"
      },
      dependencies: "blur compositionstart keydown keypress keyup mousedown".split(
        " "
      )
    },
    compositionUpdate: {
      phasedRegistrationNames: {
        bubbled: "onCompositionUpdate",
        captured: "onCompositionUpdateCapture"
      },
      dependencies: "blur compositionupdate keydown keypress keyup mousedown".split(
        " "
      )
    }
  },
  hasSpaceKeypress = !1;
function isFallbackCompositionEnd(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "keyup":
      return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
    case "keydown":
      return 229 !== nativeEvent.keyCode;
    case "keypress":
    case "mousedown":
    case "blur":
      return !0;
    default:
      return !1;
  }
}
function getDataFromCustomEvent(nativeEvent) {
  nativeEvent = nativeEvent.detail;
  return "object" === typeof nativeEvent && "data" in nativeEvent
    ? nativeEvent.data
    : null;
}
var isComposing = !1;
function getNativeBeforeInputChars(topLevelType, nativeEvent) {
  switch (topLevelType) {
    case "compositionend":
      return getDataFromCustomEvent(nativeEvent);
    case "keypress":
      if (32 !== nativeEvent.which) return null;
      hasSpaceKeypress = !0;
      return SPACEBAR_CHAR;
    case "textInput":
      return (
        (topLevelType = nativeEvent.data),
        topLevelType === SPACEBAR_CHAR && hasSpaceKeypress ? null : topLevelType
      );
    default:
      return null;
  }
}
function getFallbackBeforeInputChars(topLevelType, nativeEvent) {
  if (isComposing)
    return "compositionend" === topLevelType ||
      (!canUseCompositionEvent &&
        isFallbackCompositionEnd(topLevelType, nativeEvent))
      ? ((topLevelType = getData()),
        (fallbackText = startText = root = null),
        (isComposing = !1),
        topLevelType)
      : null;
  switch (topLevelType) {
    case "paste":
      return null;
    case "keypress":
      if (
        !(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) ||
        (nativeEvent.ctrlKey && nativeEvent.altKey)
      ) {
        if (nativeEvent.char && 1 < nativeEvent.char.length)
          return nativeEvent.char;
        if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case "compositionend":
      return useFallbackCompositionData && "ko" !== nativeEvent.locale
        ? null
        : nativeEvent.data;
    default:
      return null;
  }
}
var BeforeInputEventPlugin = {
    eventTypes: eventTypes,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var eventType = void 0;
      var composition = void 0;
      if (canUseCompositionEvent)
        b: {
          switch (topLevelType) {
            case "compositionstart":
              eventType = eventTypes.compositionStart;
              break b;
            case "compositionend":
              eventType = eventTypes.compositionEnd;
              break b;
            case "compositionupdate":
              eventType = eventTypes.compositionUpdate;
              break b;
          }
          eventType = void 0;
        }
      else
        isComposing
          ? isFallbackCompositionEnd(topLevelType, nativeEvent) &&
            (eventType = eventTypes.compositionEnd)
          : "keydown" === topLevelType &&
            229 === nativeEvent.keyCode &&
            (eventType = eventTypes.compositionStart);
      eventType
        ? (useFallbackCompositionData &&
            "ko" !== nativeEvent.locale &&
            (isComposing || eventType !== eventTypes.compositionStart
              ? eventType === eventTypes.compositionEnd &&
                isComposing &&
                (composition = getData())
              : ((root = nativeEventTarget),
                (startText = "value" in root ? root.value : root.textContent),
                (isComposing = !0))),
          (eventType = SyntheticCompositionEvent.getPooled(
            eventType,
            targetInst,
            nativeEvent,
            nativeEventTarget
          )),
          composition
            ? (eventType.data = composition)
            : ((composition = getDataFromCustomEvent(nativeEvent)),
              null !== composition && (eventType.data = composition)),
          accumulateTwoPhaseDispatches(eventType),
          (composition = eventType))
        : (composition = null);
      (topLevelType = canUseTextInputEvent
        ? getNativeBeforeInputChars(topLevelType, nativeEvent)
        : getFallbackBeforeInputChars(topLevelType, nativeEvent))
        ? ((targetInst = SyntheticInputEvent.getPooled(
            eventTypes.beforeInput,
            targetInst,
            nativeEvent,
            nativeEventTarget
          )),
          (targetInst.data = topLevelType),
          accumulateTwoPhaseDispatches(targetInst))
        : (targetInst = null);
      return null === composition
        ? targetInst
        : null === targetInst
          ? composition
          : [composition, targetInst];
    }
  },
  restoreImpl = null,
  restoreTarget = null,
  restoreQueue = null;
function restoreStateOfTarget(target) {
  if ((target = getInstanceFromNode(target))) {
    if ("function" !== typeof restoreImpl) throw ReactErrorProd(Error(280));
    var props = getFiberCurrentPropsFromNode(target.stateNode);
    restoreImpl(target.stateNode, target.type, props);
  }
}
function enqueueStateRestore(target) {
  restoreTarget
    ? restoreQueue
      ? restoreQueue.push(target)
      : (restoreQueue = [target])
    : (restoreTarget = target);
}
function restoreStateIfNeeded() {
  if (restoreTarget) {
    var target = restoreTarget,
      queuedTargets = restoreQueue;
    restoreQueue = restoreTarget = null;
    restoreStateOfTarget(target);
    if (queuedTargets)
      for (target = 0; target < queuedTargets.length; target++)
        restoreStateOfTarget(queuedTargets[target]);
  }
}
function batchedUpdatesImpl(fn, bookkeeping) {
  return fn(bookkeeping);
}
function discreteUpdatesImpl(fn, a, b, c) {
  return fn(a, b, c);
}
function flushDiscreteUpdatesImpl() {}
var batchedEventUpdatesImpl = batchedUpdatesImpl,
  isInsideEventHandler = !1;
function finishEventHandler() {
  if (null !== restoreTarget || null !== restoreQueue)
    flushDiscreteUpdatesImpl(), restoreStateIfNeeded();
}
function batchedEventUpdates(fn, bookkeeping) {
  if (isInsideEventHandler) return fn(bookkeeping);
  isInsideEventHandler = !0;
  try {
    return batchedEventUpdatesImpl(fn, bookkeeping);
  } finally {
    (isInsideEventHandler = !1), finishEventHandler();
  }
}
function discreteUpdates(fn, a, b, c) {
  var prevIsInsideEventHandler = isInsideEventHandler;
  isInsideEventHandler = !0;
  try {
    return discreteUpdatesImpl(fn, a, b, c);
  } finally {
    (isInsideEventHandler = prevIsInsideEventHandler) || finishEventHandler();
  }
}
var lastFlushedEventTimeStamp = 0;
function flushDiscreteUpdatesIfNeeded(timeStamp) {
  isInsideEventHandler ||
    (0 !== timeStamp && lastFlushedEventTimeStamp === timeStamp) ||
    ((lastFlushedEventTimeStamp = timeStamp), flushDiscreteUpdatesImpl());
}
var supportedInputTypes = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0
};
function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return "input" === nodeName
    ? !!supportedInputTypes[elem.type]
    : "textarea" === nodeName
      ? !0
      : !1;
}
function getEventTarget(nativeEvent) {
  nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
  nativeEvent.correspondingUseElement &&
    (nativeEvent = nativeEvent.correspondingUseElement);
  return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
}
function isEventSupported(eventNameSuffix) {
  if (!canUseDOM) return !1;
  eventNameSuffix = "on" + eventNameSuffix;
  var isSupported = eventNameSuffix in document;
  isSupported ||
    ((isSupported = document.createElement("div")),
    isSupported.setAttribute(eventNameSuffix, "return;"),
    (isSupported = "function" === typeof isSupported[eventNameSuffix]));
  return isSupported;
}
function isCheckable(elem) {
  var type = elem.type;
  return (
    (elem = elem.nodeName) &&
    "input" === elem.toLowerCase() &&
    ("checkbox" === type || "radio" === type)
  );
}
function trackValueOnNode(node) {
  var valueField = isCheckable(node) ? "checked" : "value",
    descriptor = Object.getOwnPropertyDescriptor(
      node.constructor.prototype,
      valueField
    ),
    currentValue = "" + node[valueField];
  if (
    !node.hasOwnProperty(valueField) &&
    "undefined" !== typeof descriptor &&
    "function" === typeof descriptor.get &&
    "function" === typeof descriptor.set
  ) {
    var get = descriptor.get,
      set = descriptor.set;
    Object.defineProperty(node, valueField, {
      configurable: !0,
      get: function() {
        return get.call(this);
      },
      set: function(value) {
        currentValue = "" + value;
        set.call(this, value);
      }
    });
    Object.defineProperty(node, valueField, {
      enumerable: descriptor.enumerable
    });
    return {
      getValue: function() {
        return currentValue;
      },
      setValue: function(value) {
        currentValue = "" + value;
      },
      stopTracking: function() {
        node._valueTracker = null;
        delete node[valueField];
      }
    };
  }
}
function track(node) {
  node._valueTracker || (node._valueTracker = trackValueOnNode(node));
}
function updateValueIfChanged(node) {
  if (!node) return !1;
  var tracker = node._valueTracker;
  if (!tracker) return !0;
  var lastValue = tracker.getValue();
  var value = "";
  node &&
    (value = isCheckable(node)
      ? node.checked
        ? "true"
        : "false"
      : node.value);
  node = value;
  return node !== lastValue ? (tracker.setValue(node), !0) : !1;
}
var BEFORE_SLASH_RE = /^(.*)[\\\/]/;
function getStackByFiberInDevAndProd(workInProgress) {
  var info = "";
  do {
    a: switch (workInProgress.tag) {
      case 3:
      case 4:
      case 6:
      case 7:
      case 10:
      case 9:
        var JSCompiler_inline_result = "";
        break a;
      default:
        var owner = workInProgress._debugOwner,
          source = workInProgress._debugSource,
          name = getComponentName(workInProgress.type);
        JSCompiler_inline_result = null;
        owner && (JSCompiler_inline_result = getComponentName(owner.type));
        owner = name;
        name = "";
        source
          ? (name =
              " (at " +
              source.fileName.replace(BEFORE_SLASH_RE, "") +
              ":" +
              source.lineNumber +
              ")")
          : JSCompiler_inline_result &&
            (name = " (created by " + JSCompiler_inline_result + ")");
        JSCompiler_inline_result = "\n    in " + (owner || "Unknown") + name;
    }
    info += JSCompiler_inline_result;
    workInProgress = workInProgress.return;
  } while (workInProgress);
  return info;
}
var VALID_ATTRIBUTE_NAME_REGEX = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  hasOwnProperty = Object.prototype.hasOwnProperty,
  illegalAttributeNameCache = {},
  validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
    return !0;
  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return !1;
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
    return (validatedAttributeNameCache[attributeName] = !0);
  illegalAttributeNameCache[attributeName] = !0;
  return !1;
}
function shouldRemoveAttributeWithWarning(
  name,
  value,
  propertyInfo,
  isCustomComponentTag
) {
  if (null !== propertyInfo && 0 === propertyInfo.type) return !1;
  switch (typeof value) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      if (isCustomComponentTag) return !1;
      if (null !== propertyInfo) return !propertyInfo.acceptsBooleans;
      name = name.toLowerCase().slice(0, 5);
      return "data-" !== name && "aria-" !== name;
    default:
      return !1;
  }
}
function shouldRemoveAttribute(
  name,
  value,
  propertyInfo,
  isCustomComponentTag
) {
  if (
    null === value ||
    "undefined" === typeof value ||
    shouldRemoveAttributeWithWarning(
      name,
      value,
      propertyInfo,
      isCustomComponentTag
    )
  )
    return !0;
  if (isCustomComponentTag) return !1;
  if (null !== propertyInfo)
    switch (propertyInfo.type) {
      case 3:
        return !value;
      case 4:
        return !1 === value;
      case 5:
        return isNaN(value);
      case 6:
        return isNaN(value) || 1 > value;
    }
  return !1;
}
function PropertyInfoRecord(
  name,
  type,
  mustUseProperty,
  attributeName,
  attributeNamespace,
  sanitizeURL
) {
  this.acceptsBooleans = 2 === type || 3 === type || 4 === type;
  this.attributeName = attributeName;
  this.attributeNamespace = attributeNamespace;
  this.mustUseProperty = mustUseProperty;
  this.propertyName = name;
  this.type = type;
  this.sanitizeURL = sanitizeURL;
}
var properties = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function(name) {
    properties[name] = new PropertyInfoRecord(name, 0, !1, name, null, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"]
].forEach(function(_ref) {
  var name = _ref[0];
  properties[name] = new PropertyInfoRecord(name, 1, !1, _ref[1], null, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    2,
    !1,
    name.toLowerCase(),
    null,
    !1
  );
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha"
].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 2, !1, name, null, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function(name) {
    properties[name] = new PropertyInfoRecord(
      name,
      3,
      !1,
      name.toLowerCase(),
      null,
      !1
    );
  });
["checked", "multiple", "muted", "selected"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 3, !0, name, null, !1);
});
["capture", "download"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 4, !1, name, null, !1);
});
["cols", "rows", "size", "span"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(name, 6, !1, name, null, !1);
});
["rowSpan", "start"].forEach(function(name) {
  properties[name] = new PropertyInfoRecord(
    name,
    5,
    !1,
    name.toLowerCase(),
    null,
    !1
  );
});
var CAMELIZE = /[\-:]([a-z])/g;
function capitalize(token) {
  return token[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function(attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      1,
      !1,
      attributeName,
      null,
      !1
    );
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function(attributeName) {
    var name = attributeName.replace(CAMELIZE, capitalize);
    properties[name] = new PropertyInfoRecord(
      name,
      1,
      !1,
      attributeName,
      "http://www.w3.org/1999/xlink",
      !1
    );
  });
["xml:base", "xml:lang", "xml:space"].forEach(function(attributeName) {
  var name = attributeName.replace(CAMELIZE, capitalize);
  properties[name] = new PropertyInfoRecord(
    name,
    1,
    !1,
    attributeName,
    "http://www.w3.org/XML/1998/namespace",
    !1
  );
});
["tabIndex", "crossOrigin"].forEach(function(attributeName) {
  properties[attributeName] = new PropertyInfoRecord(
    attributeName,
    1,
    !1,
    attributeName.toLowerCase(),
    null,
    !1
  );
});
properties.xlinkHref = new PropertyInfoRecord(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0
);
["src", "href", "action", "formAction"].forEach(function(attributeName) {
  properties[attributeName] = new PropertyInfoRecord(
    attributeName,
    1,
    !1,
    attributeName.toLowerCase(),
    null,
    !0
  );
});
var isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function setValueForProperty(node, name, value, isCustomComponentTag) {
  var propertyInfo = properties.hasOwnProperty(name) ? properties[name] : null;
  var JSCompiler_inline_result =
    null !== propertyInfo
      ? 0 === propertyInfo.type
      : isCustomComponentTag
        ? !1
        : !(2 < name.length) ||
          ("o" !== name[0] && "O" !== name[0]) ||
          ("n" !== name[1] && "N" !== name[1])
          ? !1
          : !0;
  if (!JSCompiler_inline_result)
    if (
      (shouldRemoveAttribute(name, value, propertyInfo, isCustomComponentTag) &&
        (value = null),
      isCustomComponentTag || null === propertyInfo)
    )
      isAttributeNameSafe(name) &&
        (null === value
          ? node.removeAttribute(name)
          : node.setAttribute(name, "" + value));
    else if (propertyInfo.mustUseProperty)
      node[propertyInfo.propertyName] =
        null === value ? (3 === propertyInfo.type ? !1 : "") : value;
    else if (
      ((name = propertyInfo.attributeName),
      (isCustomComponentTag = propertyInfo.attributeNamespace),
      null === value)
    )
      node.removeAttribute(name);
    else {
      JSCompiler_inline_result = propertyInfo.type;
      if (
        3 === JSCompiler_inline_result ||
        (4 === JSCompiler_inline_result && !0 === value)
      )
        value = "";
      else if (
        ((value = "" + value),
        propertyInfo.sanitizeURL && isJavaScriptProtocol.test(value))
      )
        throw ReactErrorProd(Error(323), "");
      isCustomComponentTag
        ? node.setAttributeNS(isCustomComponentTag, name, value)
        : node.setAttribute(name, value);
    }
}
function getToStringValue(value) {
  switch (typeof value) {
    case "boolean":
    case "number":
    case "object":
    case "string":
    case "undefined":
      return value;
    default:
      return "";
  }
}
function getHostProps(element, props) {
  var checked = props.checked;
  return Object.assign({}, props, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: null != checked ? checked : element._wrapperState.initialChecked
  });
}
function initWrapperState(element, props) {
  var defaultValue = null == props.defaultValue ? "" : props.defaultValue,
    JSCompiler_temp_const =
      null != props.checked ? props.checked : props.defaultChecked;
  defaultValue = getToStringValue(
    null != props.value ? props.value : defaultValue
  );
  element._wrapperState = {
    initialChecked: JSCompiler_temp_const,
    initialValue: defaultValue,
    controlled:
      "checkbox" === props.type || "radio" === props.type
        ? null != props.checked
        : null != props.value
  };
}
function updateChecked(element, props) {
  props = props.checked;
  null != props && setValueForProperty(element, "checked", props, !1);
}
function updateWrapper(element, props) {
  updateChecked(element, props);
  var value = getToStringValue(props.value),
    type = props.type;
  if (null != value)
    if ("number" === type) {
      if ((0 === value && "" === element.value) || element.value != value)
        element.value = "" + value;
    } else element.value !== "" + value && (element.value = "" + value);
  else if ("submit" === type || "reset" === type) {
    element.removeAttribute("value");
    return;
  }
  disableInputAttributeSyncing
    ? props.hasOwnProperty("defaultValue") &&
      setDefaultValue(element, props.type, getToStringValue(props.defaultValue))
    : props.hasOwnProperty("value")
      ? setDefaultValue(element, props.type, value)
      : props.hasOwnProperty("defaultValue") &&
        setDefaultValue(
          element,
          props.type,
          getToStringValue(props.defaultValue)
        );
  disableInputAttributeSyncing
    ? null == props.defaultChecked
      ? element.removeAttribute("checked")
      : (element.defaultChecked = !!props.defaultChecked)
    : null == props.checked &&
      null != props.defaultChecked &&
      (element.defaultChecked = !!props.defaultChecked);
}
function postMountWrapper(element, props, isHydrating) {
  if (props.hasOwnProperty("value") || props.hasOwnProperty("defaultValue")) {
    var type = props.type;
    if (
      (type = "submit" === type || "reset" === type) &&
      (void 0 === props.value || null === props.value)
    )
      return;
    var _initialValue = "" + element._wrapperState.initialValue;
    if (!isHydrating)
      if (disableInputAttributeSyncing) {
        var value = getToStringValue(props.value);
        null == value ||
          (!type && value === element.value) ||
          (element.value = "" + value);
      } else _initialValue !== element.value && (element.value = _initialValue);
    disableInputAttributeSyncing
      ? ((type = getToStringValue(props.defaultValue)),
        null != type && (element.defaultValue = "" + type))
      : (element.defaultValue = _initialValue);
  }
  type = element.name;
  "" !== type && (element.name = "");
  disableInputAttributeSyncing
    ? (isHydrating || updateChecked(element, props),
      props.hasOwnProperty("defaultChecked") &&
        ((element.defaultChecked = !element.defaultChecked),
        (element.defaultChecked = !!props.defaultChecked)))
    : ((element.defaultChecked = !element.defaultChecked),
      (element.defaultChecked = !!element._wrapperState.initialChecked));
  "" !== type && (element.name = type);
}
function setDefaultValue(node, type, value) {
  if ("number" !== type || node.ownerDocument.activeElement !== node)
    null == value
      ? (node.defaultValue = "" + node._wrapperState.initialValue)
      : node.defaultValue !== "" + value && (node.defaultValue = "" + value);
}
var eventTypes$1 = {
  change: {
    phasedRegistrationNames: {
      bubbled: "onChange",
      captured: "onChangeCapture"
    },
    dependencies: "blur change click focus input keydown keyup selectionchange".split(
      " "
    )
  }
};
function createAndAccumulateChangeEvent(inst, nativeEvent, target) {
  inst = SyntheticEvent.getPooled(
    eventTypes$1.change,
    inst,
    nativeEvent,
    target
  );
  inst.type = "change";
  enqueueStateRestore(target);
  accumulateTwoPhaseDispatches(inst);
  return inst;
}
var activeElement = null,
  activeElementInst = null;
function runEventInBatch(event) {
  runEventsInBatch(event);
}
function getInstIfValueChanged(targetInst) {
  var targetNode = getNodeFromInstance$1(targetInst);
  if (updateValueIfChanged(targetNode)) return targetInst;
}
function getTargetInstForChangeEvent(topLevelType, targetInst) {
  if ("change" === topLevelType) return targetInst;
}
var isInputEventSupported = !1;
canUseDOM &&
  (isInputEventSupported =
    isEventSupported("input") &&
    (!document.documentMode || 9 < document.documentMode));
function stopWatchingForValueChange() {
  activeElement &&
    (activeElement.detachEvent("onpropertychange", handlePropertyChange),
    (activeElementInst = activeElement = null));
}
function handlePropertyChange(nativeEvent) {
  if (
    "value" === nativeEvent.propertyName &&
    getInstIfValueChanged(activeElementInst)
  )
    if (
      ((nativeEvent = createAndAccumulateChangeEvent(
        activeElementInst,
        nativeEvent,
        getEventTarget(nativeEvent)
      )),
      isInsideEventHandler)
    )
      runEventsInBatch(nativeEvent);
    else {
      isInsideEventHandler = !0;
      try {
        batchedUpdatesImpl(runEventInBatch, nativeEvent);
      } finally {
        (isInsideEventHandler = !1), finishEventHandler();
      }
    }
}
function handleEventsForInputEventPolyfill(topLevelType, target, targetInst) {
  "focus" === topLevelType
    ? (stopWatchingForValueChange(),
      (activeElement = target),
      (activeElementInst = targetInst),
      activeElement.attachEvent("onpropertychange", handlePropertyChange))
    : "blur" === topLevelType && stopWatchingForValueChange();
}
function getTargetInstForInputEventPolyfill(topLevelType) {
  if (
    "selectionchange" === topLevelType ||
    "keyup" === topLevelType ||
    "keydown" === topLevelType
  )
    return getInstIfValueChanged(activeElementInst);
}
function getTargetInstForClickEvent(topLevelType, targetInst) {
  if ("click" === topLevelType) return getInstIfValueChanged(targetInst);
}
function getTargetInstForInputOrChangeEvent(topLevelType, targetInst) {
  if ("input" === topLevelType || "change" === topLevelType)
    return getInstIfValueChanged(targetInst);
}
var ChangeEventPlugin = {
    eventTypes: eventTypes$1,
    _isInputEventSupported: isInputEventSupported,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var targetNode = targetInst ? getNodeFromInstance$1(targetInst) : window,
        getTargetInstFunc = void 0,
        handleEventFunc = void 0,
        nodeName = targetNode.nodeName && targetNode.nodeName.toLowerCase();
      "select" === nodeName ||
      ("input" === nodeName && "file" === targetNode.type)
        ? (getTargetInstFunc = getTargetInstForChangeEvent)
        : isTextInputElement(targetNode)
          ? isInputEventSupported
            ? (getTargetInstFunc = getTargetInstForInputOrChangeEvent)
            : ((getTargetInstFunc = getTargetInstForInputEventPolyfill),
              (handleEventFunc = handleEventsForInputEventPolyfill))
          : (nodeName = targetNode.nodeName) &&
            "input" === nodeName.toLowerCase() &&
            ("checkbox" === targetNode.type || "radio" === targetNode.type) &&
            (getTargetInstFunc = getTargetInstForClickEvent);
      if (
        getTargetInstFunc &&
        (getTargetInstFunc = getTargetInstFunc(topLevelType, targetInst))
      )
        return createAndAccumulateChangeEvent(
          getTargetInstFunc,
          nativeEvent,
          nativeEventTarget
        );
      handleEventFunc && handleEventFunc(topLevelType, targetNode, targetInst);
      "blur" === topLevelType &&
        (topLevelType = targetNode._wrapperState) &&
        topLevelType.controlled &&
        "number" === targetNode.type &&
        (disableInputAttributeSyncing ||
          setDefaultValue(targetNode, "number", targetNode.value));
    }
  },
  SyntheticUIEvent = SyntheticEvent.extend({ view: null, detail: null }),
  modifierKeyToProp = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
function modifierStateGetter(keyArg) {
  var nativeEvent = this.nativeEvent;
  return nativeEvent.getModifierState
    ? nativeEvent.getModifierState(keyArg)
    : (keyArg = modifierKeyToProp[keyArg])
      ? !!nativeEvent[keyArg]
      : !1;
}
function getEventModifierState() {
  return modifierStateGetter;
}
var previousScreenX = 0,
  previousScreenY = 0,
  isMovementXSet = !1,
  isMovementYSet = !1,
  SyntheticMouseEvent = SyntheticUIEvent.extend({
    screenX: null,
    screenY: null,
    clientX: null,
    clientY: null,
    pageX: null,
    pageY: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    getModifierState: getEventModifierState,
    button: null,
    buttons: null,
    relatedTarget: function(event) {
      return (
        event.relatedTarget ||
        (event.fromElement === event.srcElement
          ? event.toElement
          : event.fromElement)
      );
    },
    movementX: function(event) {
      if ("movementX" in event) return event.movementX;
      var screenX = previousScreenX;
      previousScreenX = event.screenX;
      return isMovementXSet
        ? "mousemove" === event.type
          ? event.screenX - screenX
          : 0
        : ((isMovementXSet = !0), 0);
    },
    movementY: function(event) {
      if ("movementY" in event) return event.movementY;
      var screenY = previousScreenY;
      previousScreenY = event.screenY;
      return isMovementYSet
        ? "mousemove" === event.type
          ? event.screenY - screenY
          : 0
        : ((isMovementYSet = !0), 0);
    }
  }),
  SyntheticPointerEvent = SyntheticMouseEvent.extend({
    pointerId: null,
    width: null,
    height: null,
    pressure: null,
    tangentialPressure: null,
    tiltX: null,
    tiltY: null,
    twist: null,
    pointerType: null,
    isPrimary: null
  }),
  eventTypes$2 = {
    mouseEnter: {
      registrationName: "onMouseEnter",
      dependencies: ["mouseout", "mouseover"]
    },
    mouseLeave: {
      registrationName: "onMouseLeave",
      dependencies: ["mouseout", "mouseover"]
    },
    pointerEnter: {
      registrationName: "onPointerEnter",
      dependencies: ["pointerout", "pointerover"]
    },
    pointerLeave: {
      registrationName: "onPointerLeave",
      dependencies: ["pointerout", "pointerover"]
    }
  },
  EnterLeaveEventPlugin = {
    eventTypes: eventTypes$2,
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var isOverEvent =
          "mouseover" === topLevelType || "pointerover" === topLevelType,
        isOutEvent =
          "mouseout" === topLevelType || "pointerout" === topLevelType;
      if (
        (isOverEvent &&
          (nativeEvent.relatedTarget || nativeEvent.fromElement)) ||
        (!isOutEvent && !isOverEvent)
      )
        return null;
      isOverEvent =
        nativeEventTarget.window === nativeEventTarget
          ? nativeEventTarget
          : (isOverEvent = nativeEventTarget.ownerDocument)
            ? isOverEvent.defaultView || isOverEvent.parentWindow
            : window;
      isOutEvent
        ? ((isOutEvent = targetInst),
          (targetInst = (targetInst =
            nativeEvent.relatedTarget || nativeEvent.toElement)
            ? getClosestInstanceFromNode(targetInst)
            : null))
        : (isOutEvent = null);
      if (isOutEvent === targetInst) return null;
      var eventInterface = void 0,
        leaveEventType = void 0,
        enterEventType = void 0,
        eventTypePrefix = void 0;
      if ("mouseout" === topLevelType || "mouseover" === topLevelType)
        (eventInterface = SyntheticMouseEvent),
          (leaveEventType = eventTypes$2.mouseLeave),
          (enterEventType = eventTypes$2.mouseEnter),
          (eventTypePrefix = "mouse");
      else if ("pointerout" === topLevelType || "pointerover" === topLevelType)
        (eventInterface = SyntheticPointerEvent),
          (leaveEventType = eventTypes$2.pointerLeave),
          (enterEventType = eventTypes$2.pointerEnter),
          (eventTypePrefix = "pointer");
      var fromNode =
        null == isOutEvent ? isOverEvent : getNodeFromInstance$1(isOutEvent);
      isOverEvent =
        null == targetInst ? isOverEvent : getNodeFromInstance$1(targetInst);
      topLevelType = eventInterface.getPooled(
        leaveEventType,
        isOutEvent,
        nativeEvent,
        nativeEventTarget
      );
      topLevelType.type = eventTypePrefix + "leave";
      topLevelType.target = fromNode;
      topLevelType.relatedTarget = isOverEvent;
      nativeEvent = eventInterface.getPooled(
        enterEventType,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
      nativeEvent.type = eventTypePrefix + "enter";
      nativeEvent.target = isOverEvent;
      nativeEvent.relatedTarget = fromNode;
      nativeEventTarget = targetInst;
      if (isOutEvent && nativeEventTarget)
        a: {
          targetInst = isOutEvent;
          isOverEvent = nativeEventTarget;
          eventTypePrefix = 0;
          for (
            eventInterface = targetInst;
            eventInterface;
            eventInterface = getParent(eventInterface)
          )
            eventTypePrefix++;
          eventInterface = 0;
          for (
            enterEventType = isOverEvent;
            enterEventType;
            enterEventType = getParent(enterEventType)
          )
            eventInterface++;
          for (; 0 < eventTypePrefix - eventInterface; )
            (targetInst = getParent(targetInst)), eventTypePrefix--;
          for (; 0 < eventInterface - eventTypePrefix; )
            (isOverEvent = getParent(isOverEvent)), eventInterface--;
          for (; eventTypePrefix--; ) {
            if (
              targetInst === isOverEvent ||
              targetInst === isOverEvent.alternate
            )
              break a;
            targetInst = getParent(targetInst);
            isOverEvent = getParent(isOverEvent);
          }
          targetInst = null;
        }
      else targetInst = null;
      isOverEvent = targetInst;
      for (targetInst = []; isOutEvent && isOutEvent !== isOverEvent; ) {
        eventTypePrefix = isOutEvent.alternate;
        if (null !== eventTypePrefix && eventTypePrefix === isOverEvent) break;
        targetInst.push(isOutEvent);
        isOutEvent = getParent(isOutEvent);
      }
      for (
        isOutEvent = [];
        nativeEventTarget && nativeEventTarget !== isOverEvent;

      ) {
        eventTypePrefix = nativeEventTarget.alternate;
        if (null !== eventTypePrefix && eventTypePrefix === isOverEvent) break;
        isOutEvent.push(nativeEventTarget);
        nativeEventTarget = getParent(nativeEventTarget);
      }
      for (
        nativeEventTarget = 0;
        nativeEventTarget < targetInst.length;
        nativeEventTarget++
      )
        accumulateDispatches(
          targetInst[nativeEventTarget],
          "bubbled",
          topLevelType
        );
      for (nativeEventTarget = isOutEvent.length; 0 < nativeEventTarget--; )
        accumulateDispatches(
          isOutEvent[nativeEventTarget],
          "captured",
          nativeEvent
        );
      return [topLevelType, nativeEvent];
    }
  };
function is(x, y) {
  return (x === y && (0 !== x || 1 / x === 1 / y)) || (x !== x && y !== y);
}
var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
function shallowEqual(objA, objB) {
  if (is(objA, objB)) return !0;
  if (
    "object" !== typeof objA ||
    null === objA ||
    "object" !== typeof objB ||
    null === objB
  )
    return !1;
  var keysA = Object.keys(objA),
    keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return !1;
  for (keysB = 0; keysB < keysA.length; keysB++)
    if (
      !hasOwnProperty$1.call(objB, keysA[keysB]) ||
      !is(objA[keysA[keysB]], objB[keysA[keysB]])
    )
      return !1;
  return !0;
}
var Scheduler_runWithPriority = Scheduler.unstable_runWithPriority,
  Scheduler_scheduleCallback = Scheduler.unstable_scheduleCallback,
  Scheduler_cancelCallback = Scheduler.unstable_cancelCallback,
  Scheduler_shouldYield = Scheduler.unstable_shouldYield,
  Scheduler_requestPaint = Scheduler.unstable_requestPaint,
  Scheduler_now = Scheduler.unstable_now,
  Scheduler_getCurrentPriorityLevel =
    Scheduler.unstable_getCurrentPriorityLevel,
  Scheduler_ImmediatePriority = Scheduler.unstable_ImmediatePriority,
  Scheduler_UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
  Scheduler_NormalPriority = Scheduler.unstable_NormalPriority,
  Scheduler_LowPriority = Scheduler.unstable_LowPriority,
  Scheduler_IdlePriority = Scheduler.unstable_IdlePriority,
  fakeCallbackNode = {},
  requestPaint =
    void 0 !== Scheduler_requestPaint ? Scheduler_requestPaint : function() {},
  syncQueue = null,
  immediateQueueCallbackNode = null,
  isFlushingSyncQueue = !1,
  initialTimeMs = Scheduler_now(),
  now =
    1e4 > initialTimeMs
      ? Scheduler_now
      : function() {
          return Scheduler_now() - initialTimeMs;
        };
function getCurrentPriorityLevel() {
  switch (Scheduler_getCurrentPriorityLevel()) {
    case Scheduler_ImmediatePriority:
      return 99;
    case Scheduler_UserBlockingPriority:
      return 98;
    case Scheduler_NormalPriority:
      return 97;
    case Scheduler_LowPriority:
      return 96;
    case Scheduler_IdlePriority:
      return 95;
    default:
      throw ReactErrorProd(Error(332));
  }
}
function reactPriorityToSchedulerPriority(reactPriorityLevel) {
  switch (reactPriorityLevel) {
    case 99:
      return Scheduler_ImmediatePriority;
    case 98:
      return Scheduler_UserBlockingPriority;
    case 97:
      return Scheduler_NormalPriority;
    case 96:
      return Scheduler_LowPriority;
    case 95:
      return Scheduler_IdlePriority;
    default:
      throw ReactErrorProd(Error(332));
  }
}
function runWithPriority$2(reactPriorityLevel, fn) {
  reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_runWithPriority(reactPriorityLevel, fn);
}
function scheduleCallback(reactPriorityLevel, callback, options) {
  reactPriorityLevel = reactPriorityToSchedulerPriority(reactPriorityLevel);
  return Scheduler_scheduleCallback(reactPriorityLevel, callback, options);
}
function scheduleSyncCallback(callback) {
  null === syncQueue
    ? ((syncQueue = [callback]),
      (immediateQueueCallbackNode = Scheduler_scheduleCallback(
        Scheduler_ImmediatePriority,
        flushSyncCallbackQueueImpl
      )))
    : syncQueue.push(callback);
  return fakeCallbackNode;
}
function flushSyncCallbackQueue() {
  null !== immediateQueueCallbackNode &&
    Scheduler_cancelCallback(immediateQueueCallbackNode);
  flushSyncCallbackQueueImpl();
}
function flushSyncCallbackQueueImpl() {
  if (!isFlushingSyncQueue && null !== syncQueue) {
    isFlushingSyncQueue = !0;
    var i = 0;
    try {
      var queue = syncQueue;
      runWithPriority$2(99, function() {
        for (; i < queue.length; i++) {
          var callback = queue[i];
          do callback = callback(!0);
          while (null !== callback);
        }
      });
      syncQueue = null;
    } catch (error) {
      throw (null !== syncQueue && (syncQueue = syncQueue.slice(i + 1)),
      Scheduler_scheduleCallback(
        Scheduler_ImmediatePriority,
        flushSyncCallbackQueue
      ),
      error);
    } finally {
      isFlushingSyncQueue = !1;
    }
  }
}
function inferPriorityFromExpirationTime(currentTime, expirationTime) {
  if (1073741823 === expirationTime) return 99;
  if (1 === expirationTime) return 95;
  currentTime =
    10 * (1073741821 - expirationTime) - 10 * (1073741821 - currentTime);
  return 0 >= currentTime
    ? 99
    : 250 >= currentTime
      ? 98
      : 5250 >= currentTime
        ? 97
        : 95;
}
var currentlyRenderingFiber = null,
  currentEventComponentInstanceIndex = 0;
function updateEventComponentInstance(eventComponent, props) {
  eventComponent = eventComponent.responder;
  var dependencies = currentlyRenderingFiber.dependencies;
  if (null === dependencies) {
    var events = [];
    currentlyRenderingFiber.dependencies = {
      expirationTime: 0,
      firstContext: null,
      events: events
    };
  } else
    (events = dependencies.events),
      null === events && (dependencies.events = events = []);
  if (currentEventComponentInstanceIndex === events.length) {
    dependencies = null;
    var getInitialState = eventComponent.getInitialState;
    void 0 !== getInitialState && (dependencies = getInitialState(props));
    props = createEventComponentInstance(
      currentlyRenderingFiber,
      props,
      eventComponent,
      null,
      dependencies || {},
      !0
    );
    events.push(props);
    currentEventComponentInstanceIndex++;
  } else
    (events = events[currentEventComponentInstanceIndex++]),
      (events.responder = eventComponent),
      (events.props = props),
      (events.currentFiber = currentlyRenderingFiber);
}
function createEventComponentInstance(
  currentFiber,
  props,
  responder,
  rootInstance,
  state,
  isHook
) {
  return {
    currentFiber: currentFiber,
    isHook: isHook,
    props: props,
    responder: responder,
    rootEventTypes: null,
    rootInstance: rootInstance,
    state: state
  };
}
var UserBlockingPriority$1 = Scheduler.unstable_UserBlockingPriority,
  runWithPriority$1 = Scheduler.unstable_runWithPriority,
  listenToResponderEventTypesImpl = void 0,
  activeTimeouts = new Map(),
  rootEventTypesToEventComponentInstances = new Map(),
  ownershipChangeListeners = new Set(),
  eventListeners = new ("function" === typeof WeakMap ? WeakMap : Map)(),
  globalOwner = null,
  continueLocalPropagation = !1,
  currentTimeStamp = 0,
  currentTimers = new Map(),
  currentInstance = null,
  currentEventQueue = null,
  currentTimerIDCounter = 0,
  currentDocument = null,
  currentlyInHook = !1,
  eventResponderContext = {
    dispatchEvent: function(possibleEventObject, listener, eventPriority) {
      validateResponderContext();
      var type = possibleEventObject.type,
        timeStamp = possibleEventObject.timeStamp;
      if (
        null == possibleEventObject.target ||
        null == type ||
        null == timeStamp
      )
        throw Error(
          'context.dispatchEvent: "target", "timeStamp", and "type" fields on event object are required.'
        );
      possibleEventObject.preventDefault = function() {};
      possibleEventObject.stopPropagation = function() {};
      possibleEventObject.isDefaultPrevented = function() {};
      possibleEventObject.isPropagationStopped = function() {};
      Object.defineProperty(possibleEventObject, "nativeEvent", {
        get: function() {}
      });
      type = currentEventQueue;
      type.eventPriority = eventPriority;
      eventListeners.set(possibleEventObject, listener);
      type.events.push(possibleEventObject);
    },
    isTargetWithinEventComponent: function(target) {
      validateResponderContext();
      if (null != target) {
        target = getClosestInstanceFromNode(target);
        for (
          var currentFiber = currentInstance.currentFiber;
          null !== target;

        ) {
          var stateNode = target.stateNode;
          19 === target.tag &&
            null !== stateNode &&
            (target = stateNode.currentFiber);
          if (target === currentFiber || stateNode === currentInstance)
            return !0;
          target = target.return;
        }
      }
      return !1;
    },
    isTargetWithinEventResponderScope: function(target) {
      validateResponderContext();
      var responder = currentInstance.responder;
      if (null != target) {
        target = getClosestInstanceFromNode(target);
        for (
          var currentFiber = currentInstance.currentFiber;
          null !== target;

        ) {
          var stateNode = target.stateNode;
          19 === target.tag &&
            null !== stateNode &&
            (target = stateNode.currentFiber);
          if (target === currentFiber || stateNode === currentInstance)
            return !0;
          if (
            19 === target.tag &&
            (null === stateNode || stateNode.responder === responder)
          )
            break;
          target = target.return;
        }
      }
      return !1;
    },
    isTargetWithinNode: function(childTarget, parentTarget) {
      validateResponderContext();
      childTarget = getClosestInstanceFromNode(childTarget);
      for (
        parentTarget = getClosestInstanceFromNode(parentTarget);
        null !== childTarget;

      ) {
        if (childTarget === parentTarget) return !0;
        childTarget = childTarget.return;
      }
      return !1;
    },
    addRootEventTypes: function(rootEventTypes) {
      validateResponderContext();
      listenToResponderEventTypesImpl(rootEventTypes, currentDocument);
      for (var i = 0; i < rootEventTypes.length; i++)
        registerRootEventType(rootEventTypes[i], currentInstance);
    },
    removeRootEventTypes: function(rootEventTypes) {
      validateResponderContext();
      for (var i = 0; i < rootEventTypes.length; i++) {
        var rootEventType = rootEventTypes[i],
          rootEventComponents = rootEventTypesToEventComponentInstances.get(
            rootEventType
          ),
          rootEventTypesSet = currentInstance.rootEventTypes;
        null !== rootEventTypesSet && rootEventTypesSet.delete(rootEventType);
        void 0 !== rootEventComponents &&
          rootEventComponents.delete(currentInstance);
      }
    },
    hasOwnership: function() {
      validateResponderContext();
      return globalOwner === currentInstance;
    },
    requestGlobalOwnership: function() {
      validateResponderContext();
      if (null !== globalOwner) return !1;
      globalOwner = currentInstance;
      triggerOwnershipListeners();
      return !0;
    },
    releaseOwnership: function() {
      validateResponderContext();
      return releaseOwnershipForEventComponentInstance(currentInstance);
    },
    setTimeout: function(func, delay) {
      validateResponderContext();
      null === currentTimers && (currentTimers = new Map());
      var timeout = currentTimers.get(delay),
        timerId = currentTimerIDCounter++;
      if (void 0 === timeout) {
        var _timers = new Map();
        timeout = {
          id: setTimeout(function() {
            var timersArr = Array.from(_timers.values());
            currentEventQueue = createEventQueue();
            try {
              for (var i = 0; i < timersArr.length; i++) {
                var _timersArr$i = timersArr[i],
                  _isHook = _timersArr$i.isHook,
                  _func = _timersArr$i.func,
                  _id2 = _timersArr$i.id,
                  _timeStamp = _timersArr$i.timeStamp;
                currentInstance = _timersArr$i.instance;
                currentTimeStamp = _timeStamp + delay;
                currentlyInHook = _isHook;
                try {
                  _func();
                } finally {
                  activeTimeouts.delete(_id2);
                }
              }
              processEventQueue();
            } finally {
              (currentEventQueue = currentInstance = currentTimers = null),
                (currentTimeStamp = 0);
            }
          }, delay),
          timers: _timers
        };
        currentTimers.set(delay, timeout);
      }
      timeout.timers.set(timerId, {
        isHook: currentlyInHook,
        instance: currentInstance,
        func: func,
        id: timerId,
        timeStamp: currentTimeStamp
      });
      activeTimeouts.set(timerId, timeout);
      return timerId;
    },
    clearTimeout: function(timerId) {
      validateResponderContext();
      var timeout = activeTimeouts.get(timerId);
      if (void 0 !== timeout) {
        var _timers2 = timeout.timers;
        _timers2.delete(timerId);
        0 === _timers2.size && clearTimeout(timeout.id);
      }
    },
    getFocusableElementsInScope: function() {
      validateResponderContext();
      var focusableElements = [],
        child = currentInstance.currentFiber.child;
      null !== child && collectFocusableElements(child, focusableElements);
      return focusableElements;
    },
    getActiveDocument: getActiveDocument,
    objectAssign: Object.assign,
    getTimeStamp: function() {
      validateResponderContext();
      return currentTimeStamp;
    },
    isTargetWithinHostComponent: function(target, elementType, deep) {
      validateResponderContext();
      target = getClosestInstanceFromNode(target);
      for (
        var currentResponder = currentInstance.responder;
        null !== target;

      ) {
        var stateNode = target.stateNode;
        if (
          !deep &&
          19 === target.tag &&
          (null === stateNode || stateNode.responder === currentResponder)
        )
          break;
        if (5 === target.tag && target.type === elementType) return !0;
        target = target.return;
      }
      return !1;
    },
    continueLocalPropagation: function() {
      validateResponderContext();
      continueLocalPropagation = !0;
    },
    isRespondingToHook: function() {
      return currentlyInHook;
    },
    enqueueStateRestore: enqueueStateRestore
  };
function collectFocusableElements(node, focusableElements) {
  if (13 === node.tag && null !== node.memoizedState) {
    var fallbackChild = node.child.sibling.child;
    null !== fallbackChild &&
      collectFocusableElements(fallbackChild, focusableElements);
  } else {
    if (5 !== node.tag) fallbackChild = !1;
    else {
      fallbackChild = node.type;
      var memoizedProps = node.memoizedProps;
      fallbackChild =
        -1 === memoizedProps.tabIndex || memoizedProps.disabled
          ? !1
          : 0 === memoizedProps.tabIndex || !0 === memoizedProps.contentEditable
            ? !0
            : "a" === fallbackChild || "area" === fallbackChild
              ? !!memoizedProps.href && "ignore" !== memoizedProps.rel
              : "input" === fallbackChild
                ? "hidden" !== memoizedProps.type &&
                  "file" !== memoizedProps.type
                : "button" === fallbackChild ||
                  "textarea" === fallbackChild ||
                  "object" === fallbackChild ||
                  "select" === fallbackChild ||
                  "iframe" === fallbackChild ||
                  "embed" === fallbackChild;
    }
    fallbackChild
      ? focusableElements.push(node.stateNode)
      : ((fallbackChild = node.child),
        null !== fallbackChild &&
          collectFocusableElements(fallbackChild, focusableElements));
  }
  node = node.sibling;
  null !== node && collectFocusableElements(node, focusableElements);
}
function getActiveDocument() {
  return currentDocument;
}
function releaseOwnershipForEventComponentInstance(eventComponentInstance) {
  return globalOwner === eventComponentInstance
    ? ((globalOwner = null), triggerOwnershipListeners(), !0)
    : !1;
}
function createEventQueue() {
  return { events: [], eventPriority: 2 };
}
function processEvents(events) {
  for (var i = 0, length = events.length; i < length; i++) {
    var event = events[i],
      type = event.type,
      listener = eventListeners.get(event);
    invokeGuardedCallbackAndCatchFirstError(type, listener, void 0, event);
  }
}
function processEventQueue() {
  var _ref2 = currentEventQueue,
    events = _ref2.events;
  if (0 !== events.length)
    switch (_ref2.eventPriority) {
      case 0:
        flushDiscreteUpdatesIfNeeded(currentTimeStamp);
        discreteUpdates(function() {
          batchedEventUpdates(processEvents, events);
        });
        break;
      case 1:
        enableUserBlockingEvents
          ? runWithPriority$1(
              UserBlockingPriority$1,
              batchedEventUpdates.bind(null, processEvents, events)
            )
          : batchedEventUpdates(processEvents, events);
        break;
      case 2:
        batchedEventUpdates(processEvents, events);
    }
}
function handleTargetEventResponderInstance(
  responderEvent,
  eventComponentInstance,
  responder
) {
  var isHook = eventComponentInstance.isHook,
    props = eventComponentInstance.props,
    state = eventComponentInstance.state;
  responder = responder.onEvent;
  void 0 !== responder &&
    ((currentInstance = eventComponentInstance),
    (currentlyInHook = isHook),
    responder(responderEvent, eventResponderContext, props, state));
}
function triggerOwnershipListeners() {
  var listeningInstances = Array.from(ownershipChangeListeners),
    previousInstance = currentInstance,
    previouslyInHook = currentlyInHook;
  currentEventQueue = createEventQueue();
  try {
    for (var i = 0; i < listeningInstances.length; i++) {
      var _instance2 = listeningInstances[i],
        _isHook3 = _instance2.isHook,
        props = _instance2.props,
        responder = _instance2.responder,
        state = _instance2.state;
      currentInstance = _instance2;
      currentlyInHook = _isHook3;
      var onOwnershipChange = responder.onOwnershipChange;
      void 0 !== onOwnershipChange &&
        onOwnershipChange(eventResponderContext, props, state);
    }
    processEventQueue();
  } finally {
    (currentInstance = previousInstance), (currentlyInHook = previouslyInHook);
  }
}
function validateResponderContext() {
  if (!currentEventQueue || !currentInstance) throw ReactErrorProd(Error(324));
}
function registerRootEventType(rootEventType, eventComponentInstance) {
  var rootEventComponentInstances = rootEventTypesToEventComponentInstances.get(
    rootEventType
  );
  void 0 === rootEventComponentInstances &&
    ((rootEventComponentInstances = new Set()),
    rootEventTypesToEventComponentInstances.set(
      rootEventType,
      rootEventComponentInstances
    ));
  var rootEventTypesSet = eventComponentInstance.rootEventTypes;
  null === rootEventTypesSet &&
    (rootEventTypesSet = eventComponentInstance.rootEventTypes = new Set());
  if (rootEventTypesSet.has(rootEventType))
    throw ReactErrorProd(Error(325), rootEventType);
  rootEventTypesSet.add(rootEventType);
  rootEventComponentInstances.add(eventComponentInstance);
}
var EventListenerWWW = require("EventListener"),
  SyntheticAnimationEvent = SyntheticEvent.extend({
    animationName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
  SyntheticClipboardEvent = SyntheticEvent.extend({
    clipboardData: function(event) {
      return "clipboardData" in event
        ? event.clipboardData
        : window.clipboardData;
    }
  }),
  SyntheticFocusEvent = SyntheticUIEvent.extend({ relatedTarget: null });
function getEventCharCode(nativeEvent) {
  var keyCode = nativeEvent.keyCode;
  "charCode" in nativeEvent
    ? ((nativeEvent = nativeEvent.charCode),
      0 === nativeEvent && 13 === keyCode && (nativeEvent = 13))
    : (nativeEvent = keyCode);
  10 === nativeEvent && (nativeEvent = 13);
  return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
}
var normalizeKey = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  },
  translateToKey = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  },
  SyntheticKeyboardEvent = SyntheticUIEvent.extend({
    key: function(nativeEvent) {
      if (nativeEvent.key) {
        var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
        if ("Unidentified" !== key) return key;
      }
      return "keypress" === nativeEvent.type
        ? ((nativeEvent = getEventCharCode(nativeEvent)),
          13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent))
        : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type
          ? translateToKey[nativeEvent.keyCode] || "Unidentified"
          : "";
    },
    location: null,
    ctrlKey: null,
    shiftKey: null,
    altKey: null,
    metaKey: null,
    repeat: null,
    locale: null,
    getModifierState: getEventModifierState,
    charCode: function(event) {
      return "keypress" === event.type ? getEventCharCode(event) : 0;
    },
    keyCode: function(event) {
      return "keydown" === event.type || "keyup" === event.type
        ? event.keyCode
        : 0;
    },
    which: function(event) {
      return "keypress" === event.type
        ? getEventCharCode(event)
        : "keydown" === event.type || "keyup" === event.type
          ? event.keyCode
          : 0;
    }
  }),
  SyntheticDragEvent = SyntheticMouseEvent.extend({ dataTransfer: null }),
  SyntheticTouchEvent = SyntheticUIEvent.extend({
    touches: null,
    targetTouches: null,
    changedTouches: null,
    altKey: null,
    metaKey: null,
    ctrlKey: null,
    shiftKey: null,
    getModifierState: getEventModifierState
  }),
  SyntheticTransitionEvent = SyntheticEvent.extend({
    propertyName: null,
    elapsedTime: null,
    pseudoElement: null
  }),
  SyntheticWheelEvent = SyntheticMouseEvent.extend({
    deltaX: function(event) {
      return "deltaX" in event
        ? event.deltaX
        : "wheelDeltaX" in event
          ? -event.wheelDeltaX
          : 0;
    },
    deltaY: function(event) {
      return "deltaY" in event
        ? event.deltaY
        : "wheelDeltaY" in event
          ? -event.wheelDeltaY
          : "wheelDelta" in event
            ? -event.wheelDelta
            : 0;
    },
    deltaZ: null,
    deltaMode: null
  }),
  eventTuples = [
    ["blur", "blur", 0],
    ["cancel", "cancel", 0],
    ["click", "click", 0],
    ["close", "close", 0],
    ["contextmenu", "contextMenu", 0],
    ["copy", "copy", 0],
    ["cut", "cut", 0],
    ["auxclick", "auxClick", 0],
    ["dblclick", "doubleClick", 0],
    ["dragend", "dragEnd", 0],
    ["dragstart", "dragStart", 0],
    ["drop", "drop", 0],
    ["focus", "focus", 0],
    ["input", "input", 0],
    ["invalid", "invalid", 0],
    ["keydown", "keyDown", 0],
    ["keypress", "keyPress", 0],
    ["keyup", "keyUp", 0],
    ["mousedown", "mouseDown", 0],
    ["mouseup", "mouseUp", 0],
    ["paste", "paste", 0],
    ["pause", "pause", 0],
    ["play", "play", 0],
    ["pointercancel", "pointerCancel", 0],
    ["pointerdown", "pointerDown", 0],
    ["pointerup", "pointerUp", 0],
    ["ratechange", "rateChange", 0],
    ["reset", "reset", 0],
    ["seeked", "seeked", 0],
    ["submit", "submit", 0],
    ["touchcancel", "touchCancel", 0],
    ["touchend", "touchEnd", 0],
    ["touchstart", "touchStart", 0],
    ["volumechange", "volumeChange", 0],
    ["drag", "drag", 1],
    ["dragenter", "dragEnter", 1],
    ["dragexit", "dragExit", 1],
    ["dragleave", "dragLeave", 1],
    ["dragover", "dragOver", 1],
    ["mousemove", "mouseMove", 1],
    ["mouseout", "mouseOut", 1],
    ["mouseover", "mouseOver", 1],
    ["pointermove", "pointerMove", 1],
    ["pointerout", "pointerOut", 1],
    ["pointerover", "pointerOver", 1],
    ["scroll", "scroll", 1],
    ["toggle", "toggle", 1],
    ["touchmove", "touchMove", 1],
    ["wheel", "wheel", 1],
    ["abort", "abort", 2],
    [TOP_ANIMATION_END, "animationEnd", 2],
    [TOP_ANIMATION_ITERATION, "animationIteration", 2],
    [TOP_ANIMATION_START, "animationStart", 2],
    ["canplay", "canPlay", 2],
    ["canplaythrough", "canPlayThrough", 2],
    ["durationchange", "durationChange", 2],
    ["emptied", "emptied", 2],
    ["encrypted", "encrypted", 2],
    ["ended", "ended", 2],
    ["error", "error", 2],
    ["gotpointercapture", "gotPointerCapture", 2],
    ["load", "load", 2],
    ["loadeddata", "loadedData", 2],
    ["loadedmetadata", "loadedMetadata", 2],
    ["loadstart", "loadStart", 2],
    ["lostpointercapture", "lostPointerCapture", 2],
    ["playing", "playing", 2],
    ["progress", "progress", 2],
    ["seeking", "seeking", 2],
    ["stalled", "stalled", 2],
    ["suspend", "suspend", 2],
    ["timeupdate", "timeUpdate", 2],
    [TOP_TRANSITION_END, "transitionEnd", 2],
    ["waiting", "waiting", 2]
  ],
  eventTypes$4 = {},
  topLevelEventsToDispatchConfig = {},
  i = 0;
for (; i < eventTuples.length; i++) {
  var eventTuple = eventTuples[i],
    topEvent = eventTuple[0],
    event = eventTuple[1],
    eventPriority = eventTuple[2],
    onEvent = "on" + (event[0].toUpperCase() + event.slice(1)),
    config = {
      phasedRegistrationNames: {
        bubbled: onEvent,
        captured: onEvent + "Capture"
      },
      dependencies: [topEvent],
      eventPriority: eventPriority
    };
  eventTypes$4[event] = config;
  topLevelEventsToDispatchConfig[topEvent] = config;
}
var SimpleEventPlugin = {
    eventTypes: eventTypes$4,
    getEventPriority: function(topLevelType) {
      topLevelType = topLevelEventsToDispatchConfig[topLevelType];
      return void 0 !== topLevelType ? topLevelType.eventPriority : 2;
    },
    extractEvents: function(
      topLevelType,
      targetInst,
      nativeEvent,
      nativeEventTarget
    ) {
      var dispatchConfig = topLevelEventsToDispatchConfig[topLevelType];
      if (!dispatchConfig) return null;
      switch (topLevelType) {
        case "keypress":
          if (0 === getEventCharCode(nativeEvent)) return null;
        case "keydown":
        case "keyup":
          topLevelType = SyntheticKeyboardEvent;
          break;
        case "blur":
        case "focus":
          topLevelType = SyntheticFocusEvent;
          break;
        case "click":
          if (2 === nativeEvent.button) return null;
        case "auxclick":
        case "dblclick":
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseout":
        case "mouseover":
        case "contextmenu":
          topLevelType = SyntheticMouseEvent;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          topLevelType = SyntheticDragEvent;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          topLevelType = SyntheticTouchEvent;
          break;
        case TOP_ANIMATION_END:
        case TOP_ANIMATION_ITERATION:
        case TOP_ANIMATION_START:
          topLevelType = SyntheticAnimationEvent;
          break;
        case TOP_TRANSITION_END:
          topLevelType = SyntheticTransitionEvent;
          break;
        case "scroll":
          topLevelType = SyntheticUIEvent;
          break;
        case "wheel":
          topLevelType = SyntheticWheelEvent;
          break;
        case "copy":
        case "cut":
        case "paste":
          topLevelType = SyntheticClipboardEvent;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          topLevelType = SyntheticPointerEvent;
          break;
        default:
          topLevelType = SyntheticEvent;
      }
      targetInst = topLevelType.getPooled(
        dispatchConfig,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
      accumulateTwoPhaseDispatches(targetInst);
      return targetInst;
    }
  },
  passiveBrowserEventsSupported = !1;
if (canUseDOM)
  try {
    var options = {};
    Object.defineProperty(options, "passive", {
      get: function() {
        passiveBrowserEventsSupported = !0;
      }
    });
    window.addEventListener("test", options, options);
    window.removeEventListener("test", options, options);
  } catch (e) {
    passiveBrowserEventsSupported = !1;
  }
var UserBlockingPriority = Scheduler.unstable_UserBlockingPriority,
  runWithPriority = Scheduler.unstable_runWithPriority,
  getEventPriority = SimpleEventPlugin.getEventPriority,
  callbackBookkeepingPool = [];
function handleTopLevel(bookKeeping) {
  var targetInst = bookKeeping.targetInst,
    ancestor = targetInst;
  do {
    if (!ancestor) {
      bookKeeping.ancestors.push(ancestor);
      break;
    }
    var root;
    for (root = ancestor; root.return; ) root = root.return;
    root = 3 !== root.tag ? null : root.stateNode.containerInfo;
    if (!root) break;
    bookKeeping.ancestors.push(ancestor);
    ancestor = getClosestInstanceFromNode(root);
  } while (ancestor);
  for (ancestor = 0; ancestor < bookKeeping.ancestors.length; ancestor++) {
    targetInst = bookKeeping.ancestors[ancestor];
    var eventTarget = getEventTarget(bookKeeping.nativeEvent);
    root = bookKeeping.topLevelType;
    for (
      var nativeEvent = bookKeeping.nativeEvent, events = null, i = 0;
      i < plugins.length;
      i++
    ) {
      var possiblePlugin = plugins[i];
      possiblePlugin &&
        (possiblePlugin = possiblePlugin.extractEvents(
          root,
          targetInst,
          nativeEvent,
          eventTarget
        )) &&
        (events = accumulateInto(events, possiblePlugin));
    }
    runEventsInBatch(events);
  }
}
var _enabled = !0;
function trapBubbledEvent(topLevelType, element) {
  trapEventForPluginEventSystem(element, topLevelType, !1);
}
function trapEventForPluginEventSystem(element, topLevelType, capture) {
  switch (getEventPriority(topLevelType)) {
    case 0:
      var listener = dispatchDiscreteEvent.bind(null, topLevelType, 1);
      break;
    case 1:
      listener = dispatchUserBlockingUpdate.bind(null, topLevelType, 1);
      break;
    default:
      listener = dispatchEvent.bind(null, topLevelType, 1);
  }
  capture
    ? EventListenerWWW.capture(element, topLevelType, listener)
    : EventListenerWWW.listen(element, topLevelType, listener);
}
function dispatchDiscreteEvent(topLevelType, eventSystemFlags, nativeEvent) {
  flushDiscreteUpdatesIfNeeded(nativeEvent.timeStamp);
  discreteUpdates(dispatchEvent, topLevelType, eventSystemFlags, nativeEvent);
}
function dispatchUserBlockingUpdate(
  topLevelType,
  eventSystemFlags,
  nativeEvent
) {
  enableUserBlockingEvents
    ? runWithPriority(
        UserBlockingPriority,
        dispatchEvent.bind(null, topLevelType, eventSystemFlags, nativeEvent)
      )
    : dispatchEvent(topLevelType, eventSystemFlags, nativeEvent);
}
function dispatchEvent(topLevelType, eventSystemFlags, nativeEvent) {
  if (_enabled) {
    var nativeEventTarget = getEventTarget(nativeEvent),
      targetInst = getClosestInstanceFromNode(nativeEventTarget);
    null === targetInst ||
      "number" !== typeof targetInst.tag ||
      2 === isFiberMountedImpl(targetInst) ||
      (targetInst = null);
    if (1 === eventSystemFlags) {
      var bookKeeping = targetInst;
      if (callbackBookkeepingPool.length) {
        var instance = callbackBookkeepingPool.pop();
        instance.topLevelType = topLevelType;
        instance.nativeEvent = nativeEvent;
        instance.targetInst = bookKeeping;
        bookKeeping = instance;
      } else
        bookKeeping = {
          topLevelType: topLevelType,
          nativeEvent: nativeEvent,
          targetInst: bookKeeping,
          ancestors: []
        };
      try {
        batchedEventUpdates(handleTopLevel, bookKeeping);
      } finally {
        (bookKeeping.topLevelType = null),
          (bookKeeping.nativeEvent = null),
          (bookKeeping.targetInst = null),
          (bookKeeping.ancestors.length = 0),
          10 > callbackBookkeepingPool.length &&
            callbackBookkeepingPool.push(bookKeeping);
      }
    } else {
      var targetFiber = targetInst;
      targetInst = currentEventQueue;
      var previousInstance = currentInstance,
        previousTimers = currentTimers,
        previousTimeStamp = currentTimeStamp,
        previousDocument = currentDocument,
        previouslyInHook = currentlyInHook;
      currentTimers = null;
      currentEventQueue = createEventQueue();
      currentDocument =
        9 === nativeEventTarget.nodeType
          ? nativeEventTarget
          : nativeEventTarget.ownerDocument;
      currentTimeStamp = nativeEvent.timeStamp;
      try {
        var isPassiveEvent = 0 !== (eventSystemFlags & 4),
          isPassiveSupported = 0 === (eventSystemFlags & 16);
        eventSystemFlags =
          isPassiveEvent || !isPassiveSupported
            ? topLevelType
            : topLevelType + "_active";
        var pointerType = nativeEvent.pointerType,
          eventPointerType = "",
          pointerId = null;
        void 0 !== pointerType
          ? ((eventPointerType = pointerType),
            (pointerId = nativeEvent.pointerId))
          : void 0 !== nativeEvent.key
            ? (eventPointerType = "keyboard")
            : void 0 !== nativeEvent.button
              ? (eventPointerType = "mouse")
              : void 0 !== nativeEvent.changedTouches &&
                (eventPointerType = "touch");
        bookKeeping = {
          nativeEvent: nativeEvent,
          passive: isPassiveEvent,
          passiveSupported: isPassiveSupported,
          pointerId: pointerId,
          pointerType: eventPointerType,
          responderTarget: null,
          target: nativeEventTarget,
          type: topLevelType
        };
        instance = new Map();
        var allowLocalPropagation = new Set();
        topLevelType = targetFiber;
        for (nativeEvent = nativeEventTarget; null !== topLevelType; ) {
          nativeEventTarget = topLevelType;
          var dependencies = nativeEventTarget.dependencies,
            stateNode = nativeEventTarget.stateNode,
            tag = nativeEventTarget.tag;
          if (5 === tag) nativeEvent = stateNode;
          else if (19 === tag) {
            if (
              ((nativeEventTarget = stateNode),
              null === globalOwner || globalOwner === nativeEventTarget)
            ) {
              var responder = nativeEventTarget.responder,
                responderTarget = instance.get(responder);
              pointerType = !1;
              if (void 0 === responderTarget) {
                var targetEventTypes = responder.targetEventTypes;
                if (void 0 !== targetEventTypes)
                  a: {
                    targetFiber = 0;
                    for (
                      var len = targetEventTypes.length;
                      targetFiber < len;
                      targetFiber++
                    )
                      if (targetEventTypes[targetFiber] === eventSystemFlags) {
                        var JSCompiler_temp = !0;
                        break a;
                      }
                    JSCompiler_temp = !1;
                  }
                else JSCompiler_temp = !1;
                JSCompiler_temp
                  ? ((responderTarget = nativeEvent),
                    instance.set(responder, nativeEvent))
                  : (pointerType = !0);
              } else
                allowLocalPropagation.has(responder)
                  ? allowLocalPropagation.delete(responder)
                  : (pointerType = !0);
              pointerType ||
                ((bookKeeping.responderTarget = responderTarget),
                (topLevelType = nativeEventTarget.currentFiber),
                handleTargetEventResponderInstance(
                  bookKeeping,
                  nativeEventTarget,
                  responder
                ),
                continueLocalPropagation &&
                  ((continueLocalPropagation = !1),
                  allowLocalPropagation.add(responder)));
            }
          } else if (0 === tag && null !== dependencies) {
            var _events = dependencies.events;
            if (null !== _events)
              for (
                nativeEventTarget = 0;
                nativeEventTarget < _events.length;
                nativeEventTarget++
              ) {
                var _eventComponentInstance = _events[nativeEventTarget];
                if (
                  null === globalOwner ||
                  globalOwner === _eventComponentInstance
                ) {
                  var _responder = _eventComponentInstance.responder,
                    _responderTarget = instance.get(_responder);
                  void 0 !== _responderTarget &&
                    ((bookKeeping.responderTarget = _responderTarget),
                    handleTargetEventResponderInstance(
                      bookKeeping,
                      _eventComponentInstance,
                      _responder
                    ),
                    continueLocalPropagation &&
                      ((continueLocalPropagation = !1),
                      allowLocalPropagation.add(_responder)));
                }
              }
          }
          topLevelType = topLevelType.return;
        }
        var rootEventInstances = rootEventTypesToEventComponentInstances.get(
          eventSystemFlags
        );
        if (void 0 !== rootEventInstances) {
          var rootEventComponentInstances = Array.from(rootEventInstances);
          for (
            allowLocalPropagation = 0;
            allowLocalPropagation < rootEventComponentInstances.length;
            allowLocalPropagation++
          ) {
            var rootEventComponentInstance =
              rootEventComponentInstances[allowLocalPropagation];
            if (
              null === globalOwner ||
              globalOwner === rootEventComponentInstance
            ) {
              var _isHook2 = rootEventComponentInstance.isHook,
                props = rootEventComponentInstance.props,
                _responder2 = rootEventComponentInstance.responder,
                state = rootEventComponentInstance.state,
                onRootEvent = _responder2.onRootEvent;
              if (void 0 !== onRootEvent) {
                currentInstance = rootEventComponentInstance;
                currentlyInHook = _isHook2;
                var _responderTarget2 = instance.get(_responder2);
                bookKeeping.responderTarget = _responderTarget2 || null;
                onRootEvent(bookKeeping, eventResponderContext, props, state);
              }
            }
          }
        }
        processEventQueue();
      } finally {
        (currentTimers = previousTimers),
          (currentInstance = previousInstance),
          (currentEventQueue = targetInst),
          (currentTimeStamp = previousTimeStamp),
          (currentDocument = previousDocument),
          (currentlyInHook = previouslyInHook);
      }
    }
  }
}
var elementListeningSets = new ("function" === typeof WeakMap
  ? WeakMap
  : Map)();
function getListeningSetForElement(element) {
  var listeningSet = elementListeningSets.get(element);
  void 0 === listeningSet &&
    ((listeningSet = new Set()),
    elementListeningSets.set(element, listeningSet));
  return listeningSet;
}
function getActiveElement(doc) {
  doc = doc || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof doc) return null;
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}
function getLeafNode(node) {
  for (; node && node.firstChild; ) node = node.firstChild;
  return node;
}
function getNodeForCharacterOffset(root, offset) {
  var node = getLeafNode(root);
  root = 0;
  for (var nodeEnd; node; ) {
    if (3 === node.nodeType) {
      nodeEnd = root + node.textContent.length;
      if (root <= offset && nodeEnd >= offset)
        return { node: node, offset: offset - root };
      root = nodeEnd;
    }
    a: {
      for (; node; ) {
        if (node.nextSibling) {
          node = node.nextSibling;
          break a;
        }
        node = node.parentNode;
      }
      node = void 0;
    }
    node = getLeafNode(node);
  }
}
function containsNode(outerNode, innerNode) {
  return outerNode && innerNode
    ? outerNode === innerNode
      ? !0
      : outerNode && 3 === outerNode.nodeType
        ? !1
        : innerNode && 3 === innerNode.nodeType
          ? containsNode(outerNode, innerNode.parentNode)
          : "contains" in outerNode
            ? outerNode.contains(innerNode)
            : outerNode.compareDocumentPosition
              ? !!(outerNode.compareDocumentPosition(innerNode) & 16)
              : !1
    : !1;
}
function getActiveElementDeep() {
  for (
    var win = window, element = getActiveElement();
    element instanceof win.HTMLIFrameElement;

  ) {
    try {
      var JSCompiler_inline_result =
        "string" === typeof element.contentWindow.location.href;
    } catch (err) {
      JSCompiler_inline_result = !1;
    }
    if (JSCompiler_inline_result) win = element.contentWindow;
    else break;
    element = getActiveElement(win.document);
  }
  return element;
}
function hasSelectionCapabilities(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return (
    nodeName &&
    (("input" === nodeName &&
      ("text" === elem.type ||
        "search" === elem.type ||
        "tel" === elem.type ||
        "url" === elem.type ||
        "password" === elem.type)) ||
      "textarea" === nodeName ||
      "true" === elem.contentEditable)
  );
}
var skipSelectionChangeEvent =
    canUseDOM && "documentMode" in document && 11 >= document.documentMode,
  eventTypes$3 = {
    select: {
      phasedRegistrationNames: {
        bubbled: "onSelect",
        captured: "onSelectCapture"
      },
      dependencies: "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    }
  },
  activeElement$1 = null,
  activeElementInst$1 = null,
  lastSelection = null,
  mouseDown = !1;
function constructSelectEvent(nativeEvent, nativeEventTarget) {
  var doc =
    nativeEventTarget.window === nativeEventTarget
      ? nativeEventTarget.document
      : 9 === nativeEventTarget.nodeType
        ? nativeEventTarget
        : nativeEventTarget.ownerDocument;
  if (
    mouseDown ||
    null == activeElement$1 ||
    activeElement$1 !== getActiveElement(doc)
  )
    return null;
  doc = activeElement$1;
  "selectionStart" in doc && hasSelectionCapabilities(doc)
    ? (doc = { start: doc.selectionStart, end: doc.selectionEnd })
    : ((doc = (
        (doc.ownerDocument && doc.ownerDocument.defaultView) ||
        window
      ).getSelection()),
      (doc = {
        anchorNode: doc.anchorNode,
        anchorOffset: doc.anchorOffset,
        focusNode: doc.focusNode,
        focusOffset: doc.focusOffset
      }));
  return lastSelection && shallowEqual(lastSelection, doc)
    ? null
    : ((lastSelection = doc),
      (nativeEvent = SyntheticEvent.getPooled(
        eventTypes$3.select,
        activeElementInst$1,
        nativeEvent,
        nativeEventTarget
      )),
      (nativeEvent.type = "select"),
      (nativeEvent.target = activeElement$1),
      accumulateTwoPhaseDispatches(nativeEvent),
      nativeEvent);
}
var SelectEventPlugin = {
  eventTypes: eventTypes$3,
  extractEvents: function(
    topLevelType,
    targetInst,
    nativeEvent,
    nativeEventTarget
  ) {
    var doc =
        nativeEventTarget.window === nativeEventTarget
          ? nativeEventTarget.document
          : 9 === nativeEventTarget.nodeType
            ? nativeEventTarget
            : nativeEventTarget.ownerDocument,
      JSCompiler_temp;
    if (!(JSCompiler_temp = !doc)) {
      a: {
        doc = getListeningSetForElement(doc);
        JSCompiler_temp = registrationNameDependencies.onSelect;
        for (var i = 0; i < JSCompiler_temp.length; i++)
          if (!doc.has(JSCompiler_temp[i])) {
            doc = !1;
            break a;
          }
        doc = !0;
      }
      JSCompiler_temp = !doc;
    }
    if (JSCompiler_temp) return null;
    doc = targetInst ? getNodeFromInstance$1(targetInst) : window;
    switch (topLevelType) {
      case "focus":
        if (isTextInputElement(doc) || "true" === doc.contentEditable)
          (activeElement$1 = doc),
            (activeElementInst$1 = targetInst),
            (lastSelection = null);
        break;
      case "blur":
        lastSelection = activeElementInst$1 = activeElement$1 = null;
        break;
      case "mousedown":
        mouseDown = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        return (
          (mouseDown = !1), constructSelectEvent(nativeEvent, nativeEventTarget)
        );
      case "selectionchange":
        if (skipSelectionChangeEvent) break;
      case "keydown":
      case "keyup":
        return constructSelectEvent(nativeEvent, nativeEventTarget);
    }
    return null;
  }
};
injection.injectEventPluginOrder(
  "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
    " "
  )
);
getFiberCurrentPropsFromNode = getFiberCurrentPropsFromNode$1;
getInstanceFromNode = getInstanceFromNode$1;
getNodeFromInstance = getNodeFromInstance$1;
injection.injectEventPluginsByName({
  SimpleEventPlugin: SimpleEventPlugin,
  EnterLeaveEventPlugin: EnterLeaveEventPlugin,
  ChangeEventPlugin: ChangeEventPlugin,
  SelectEventPlugin: SelectEventPlugin,
  BeforeInputEventPlugin: BeforeInputEventPlugin
});
function flattenChildren(children) {
  var content = "";
  React.Children.forEach(children, function(child) {
    null != child && (content += child);
  });
  return content;
}
function getHostProps$1(element, props) {
  element = Object.assign({ children: void 0 }, props);
  if ((props = flattenChildren(props.children))) element.children = props;
  return element;
}
function updateOptions(node, multiple, propValue, setDefaultSelected) {
  node = node.options;
  if (multiple) {
    multiple = {};
    for (var i = 0; i < propValue.length; i++)
      multiple["$" + propValue[i]] = !0;
    for (propValue = 0; propValue < node.length; propValue++)
      (i = multiple.hasOwnProperty("$" + node[propValue].value)),
        node[propValue].selected !== i && (node[propValue].selected = i),
        i && setDefaultSelected && (node[propValue].defaultSelected = !0);
  } else {
    propValue = "" + getToStringValue(propValue);
    multiple = null;
    for (i = 0; i < node.length; i++) {
      if (node[i].value === propValue) {
        node[i].selected = !0;
        setDefaultSelected && (node[i].defaultSelected = !0);
        return;
      }
      null !== multiple || node[i].disabled || (multiple = node[i]);
    }
    null !== multiple && (multiple.selected = !0);
  }
}
function getHostProps$3(element, props) {
  if (null != props.dangerouslySetInnerHTML) throw ReactErrorProd(Error(91));
  return Object.assign({}, props, {
    value: void 0,
    defaultValue: void 0,
    children: "" + element._wrapperState.initialValue
  });
}
function initWrapperState$2(element, props) {
  var initialValue = props.value;
  if (null == initialValue) {
    initialValue = props.defaultValue;
    props = props.children;
    if (null != props) {
      if (null != initialValue) throw ReactErrorProd(Error(92));
      if (Array.isArray(props)) {
        if (!(1 >= props.length)) throw ReactErrorProd(Error(93));
        props = props[0];
      }
      initialValue = props;
    }
    null == initialValue && (initialValue = "");
  }
  element._wrapperState = { initialValue: getToStringValue(initialValue) };
}
function updateWrapper$1(element, props) {
  var value = getToStringValue(props.value),
    defaultValue = getToStringValue(props.defaultValue);
  null != value &&
    ((value = "" + value),
    value !== element.value && (element.value = value),
    null == props.defaultValue &&
      element.defaultValue !== value &&
      (element.defaultValue = value));
  null != defaultValue && (element.defaultValue = "" + defaultValue);
}
function postMountWrapper$3(element) {
  var textContent = element.textContent;
  textContent === element._wrapperState.initialValue &&
    (element.value = textContent);
}
var Namespaces = {
  html: "http://www.w3.org/1999/xhtml",
  mathml: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg"
};
function getIntrinsicNamespace(type) {
  switch (type) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function getChildNamespace(parentNamespace, type) {
  return null == parentNamespace ||
    "http://www.w3.org/1999/xhtml" === parentNamespace
    ? getIntrinsicNamespace(type)
    : "http://www.w3.org/2000/svg" === parentNamespace &&
      "foreignObject" === type
      ? "http://www.w3.org/1999/xhtml"
      : parentNamespace;
}
var reusableSVGContainer = void 0,
  setInnerHTML = (function(func) {
    return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction
      ? function(arg0, arg1, arg2, arg3) {
          MSApp.execUnsafeLocalFunction(function() {
            return func(arg0, arg1, arg2, arg3);
          });
        }
      : func;
  })(function(node, html) {
    if (node.namespaceURI !== Namespaces.svg || "innerHTML" in node)
      node.innerHTML = html;
    else {
      reusableSVGContainer =
        reusableSVGContainer || document.createElement("div");
      reusableSVGContainer.innerHTML = "<svg>" + html + "</svg>";
      for (html = reusableSVGContainer.firstChild; node.firstChild; )
        node.removeChild(node.firstChild);
      for (; html.firstChild; ) node.appendChild(html.firstChild);
    }
  });
function setTextContent(node, text) {
  if (text) {
    var firstChild = node.firstChild;
    if (
      firstChild &&
      firstChild === node.lastChild &&
      3 === firstChild.nodeType
    ) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
}
var isUnitlessNumber = {
    animationIterationCount: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0
  },
  prefixes = ["Webkit", "ms", "Moz", "O"];
Object.keys(isUnitlessNumber).forEach(function(prop) {
  prefixes.forEach(function(prefix) {
    prefix = prefix + prop.charAt(0).toUpperCase() + prop.substring(1);
    isUnitlessNumber[prefix] = isUnitlessNumber[prop];
  });
});
function dangerousStyleValue(name, value, isCustomProperty) {
  return null == value || "boolean" === typeof value || "" === value
    ? ""
    : isCustomProperty ||
      "number" !== typeof value ||
      0 === value ||
      (isUnitlessNumber.hasOwnProperty(name) && isUnitlessNumber[name])
      ? ("" + value).trim()
      : value + "px";
}
function setValueForStyles(node, styles) {
  node = node.style;
  for (var styleName in styles)
    if (styles.hasOwnProperty(styleName)) {
      var isCustomProperty = 0 === styleName.indexOf("--"),
        styleValue = dangerousStyleValue(
          styleName,
          styles[styleName],
          isCustomProperty
        );
      "float" === styleName && (styleName = "cssFloat");
      isCustomProperty
        ? node.setProperty(styleName, styleValue)
        : (node[styleName] = styleValue);
    }
}
var voidElementTags = Object.assign(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0
  }
);
function assertValidProps(tag, props) {
  if (props) {
    if (
      voidElementTags[tag] &&
      (null != props.children || null != props.dangerouslySetInnerHTML)
    )
      throw ReactErrorProd(Error(137), tag, "");
    if (null != props.dangerouslySetInnerHTML) {
      if (null != props.children) throw ReactErrorProd(Error(60));
      if (
        !(
          "object" === typeof props.dangerouslySetInnerHTML &&
          "__html" in props.dangerouslySetInnerHTML
        )
      )
        throw ReactErrorProd(Error(61));
    }
    if (null != props.style && "object" !== typeof props.style)
      throw ReactErrorProd(Error(62), "");
  }
}
function isCustomComponent(tagName, props) {
  if (-1 === tagName.indexOf("-")) return "string" === typeof props.is;
  switch (tagName) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
function ensureListeningTo(rootContainerElement, registrationName) {
  rootContainerElement =
    9 === rootContainerElement.nodeType || 11 === rootContainerElement.nodeType
      ? rootContainerElement
      : rootContainerElement.ownerDocument;
  var listeningSet = getListeningSetForElement(rootContainerElement);
  registrationName = registrationNameDependencies[registrationName];
  for (var i = 0; i < registrationName.length; i++) {
    var dependency = registrationName[i];
    if (!listeningSet.has(dependency)) {
      switch (dependency) {
        case "scroll":
          trapEventForPluginEventSystem(rootContainerElement, "scroll", !0);
          break;
        case "focus":
        case "blur":
          trapEventForPluginEventSystem(rootContainerElement, "focus", !0);
          trapEventForPluginEventSystem(rootContainerElement, "blur", !0);
          listeningSet.add("blur");
          listeningSet.add("focus");
          break;
        case "cancel":
        case "close":
          isEventSupported(dependency) &&
            trapEventForPluginEventSystem(rootContainerElement, dependency, !0);
          break;
        case "invalid":
        case "submit":
        case "reset":
          break;
        default:
          -1 === mediaEventTypes.indexOf(dependency) &&
            trapBubbledEvent(dependency, rootContainerElement);
      }
      listeningSet.add(dependency);
    }
  }
}
function noop() {}
function listenToEventResponderEventTypes(eventTypes, element) {
  for (
    var listeningSet = getListeningSetForElement(element),
      i = 0,
      length = eventTypes.length;
    i < length;
    ++i
  ) {
    var eventType = eventTypes[i],
      length$jscomp$0 = eventType.length,
      isPassive =
        "_active" !== eventType.substring(length$jscomp$0 - 7, length$jscomp$0);
    length$jscomp$0 = isPassive ? eventType + "_passive" : eventType;
    var targetEventType = isPassive
      ? eventType
      : eventType.substring(0, eventType.length - 7);
    if (!listeningSet.has(length$jscomp$0)) {
      eventType = element;
      var rawEventName = targetEventType,
        eventFlags = 2;
      isPassive
        ? passiveBrowserEventsSupported
          ? (eventFlags |= 4)
          : ((eventFlags |= 8), (eventFlags |= 16), (isPassive = !1))
        : (eventFlags |= 8);
      targetEventType = dispatchEvent.bind(null, targetEventType, eventFlags);
      passiveBrowserEventsSupported
        ? EventListenerWWW.captureWithPassiveFlag(
            eventType,
            rawEventName,
            targetEventType,
            isPassive
          )
        : EventListenerWWW.capture(eventType, rawEventName, targetEventType);
      listeningSet.add(length$jscomp$0);
    }
  }
}
listenToResponderEventTypesImpl = listenToEventResponderEventTypes;
var eventsEnabled = null,
  selectionInformation = null;
function shouldAutoFocusHostComponent(type, props) {
  switch (type) {
    case "button":
    case "input":
    case "select":
    case "textarea":
      return !!props.autoFocus;
  }
  return !1;
}
function shouldSetTextContent(type, props) {
  return (
    "textarea" === type ||
    "option" === type ||
    "noscript" === type ||
    "string" === typeof props.children ||
    "number" === typeof props.children ||
    ("object" === typeof props.dangerouslySetInnerHTML &&
      null !== props.dangerouslySetInnerHTML &&
      null != props.dangerouslySetInnerHTML.__html)
  );
}
var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0,
  cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0;
function clearSuspenseBoundary(parentInstance, suspenseInstance) {
  var node = suspenseInstance;
  suspenseInstance = 0;
  do {
    var nextNode = node.nextSibling;
    parentInstance.removeChild(node);
    if (nextNode && 8 === nextNode.nodeType)
      if (((node = nextNode.data), "/$" === node))
        if (0 === suspenseInstance) {
          parentInstance.removeChild(nextNode);
          break;
        } else suspenseInstance--;
      else
        ("$" !== node && "$?" !== node && "$!" !== node) || suspenseInstance++;
    node = nextNode;
  } while (node);
}
function getNextHydratable(node) {
  for (; null != node; node = node.nextSibling) {
    var nodeType = node.nodeType;
    if (1 === nodeType || 3 === nodeType) break;
    if (8 === nodeType) break;
    nodeType = node.data;
    if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType) break;
  }
  return node;
}
var supportsUserTiming =
    "undefined" !== typeof performance &&
    "function" === typeof performance.mark &&
    "function" === typeof performance.clearMarks &&
    "function" === typeof performance.measure &&
    "function" === typeof performance.clearMeasures,
  currentFiber = null,
  currentPhase = null,
  currentPhaseFiber = null,
  isCommitting = !1,
  hasScheduledUpdateInCurrentCommit = !1,
  hasScheduledUpdateInCurrentPhase = !1,
  commitCountInCurrentWorkLoop = 0,
  effectCountInCurrentCommit = 0,
  isWaitingForCallback = !1,
  labelsInCurrentCommit = new Set();
function beginMark(markName) {
  performance.mark("\u269b " + markName);
}
function endMark(label, markName, warning) {
  markName = "\u269b " + markName;
  label =
    (warning ? "\u26d4 " : "\u269b ") +
    label +
    (warning ? " Warning: " + warning : "");
  try {
    performance.measure(label, markName);
  } catch (err) {}
  performance.clearMarks(markName);
  performance.clearMeasures(label);
}
function getFiberLabel(componentName, isMounted, phase) {
  return null === phase
    ? componentName + " [" + (isMounted ? "update" : "mount") + "]"
    : componentName + "." + phase;
}
function beginFiberMark(fiber, phase) {
  var componentName = getComponentName(fiber.type) || "Unknown",
    debugID = fiber._debugID;
  fiber = getFiberLabel(componentName, null !== fiber.alternate, phase);
  if (isCommitting && labelsInCurrentCommit.has(fiber)) return !1;
  labelsInCurrentCommit.add(fiber);
  beginMark(fiber + " (#" + debugID + ")");
  return !0;
}
function clearFiberMark(fiber, phase) {
  var componentName = getComponentName(fiber.type) || "Unknown",
    debugID = fiber._debugID;
  fiber =
    getFiberLabel(componentName, null !== fiber.alternate, phase) +
    " (#" +
    debugID +
    ")";
  performance.clearMarks("\u269b " + fiber);
}
function endFiberMark(fiber, phase, warning) {
  var componentName = getComponentName(fiber.type) || "Unknown",
    debugID = fiber._debugID;
  fiber = getFiberLabel(componentName, null !== fiber.alternate, phase);
  endMark(fiber, fiber + " (#" + debugID + ")", warning);
}
function shouldIgnoreFiber(fiber) {
  switch (fiber.tag) {
    case 3:
    case 5:
    case 6:
    case 4:
    case 7:
    case 10:
    case 9:
    case 8:
      return !0;
    default:
      return !1;
  }
}
function resumeTimersRecursively(fiber) {
  null !== fiber.return && resumeTimersRecursively(fiber.return);
  fiber._debugIsCurrentlyTiming && beginFiberMark(fiber, null);
}
function startRequestCallbackTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !isWaitingForCallback &&
    ((isWaitingForCallback = !0), beginMark("(Waiting for async callback...)"));
}
function startWorkTimer(fiber) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !shouldIgnoreFiber(fiber) &&
    ((currentFiber = fiber),
    beginFiberMark(fiber, null) && (fiber._debugIsCurrentlyTiming = !0));
}
function cancelWorkTimer(fiber) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !shouldIgnoreFiber(fiber) &&
    ((fiber._debugIsCurrentlyTiming = !1), clearFiberMark(fiber, null));
}
function stopWorkTimer(fiber) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    !shouldIgnoreFiber(fiber) &&
    ((currentFiber = fiber.return),
    fiber._debugIsCurrentlyTiming &&
      ((fiber._debugIsCurrentlyTiming = !1), endFiberMark(fiber, null, null)));
}
function startPhaseTimer(fiber, phase) {
  enableUserTimingAPI &&
    supportsUserTiming &&
    (null !== currentPhase &&
      null !== currentPhaseFiber &&
      clearFiberMark(currentPhaseFiber, currentPhase),
    (currentPhase = currentPhaseFiber = null),
    (hasScheduledUpdateInCurrentPhase = !1),
    beginFiberMark(fiber, phase) &&
      ((currentPhaseFiber = fiber), (currentPhase = phase)));
}
function stopPhaseTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    (null !== currentPhase &&
      null !== currentPhaseFiber &&
      endFiberMark(
        currentPhaseFiber,
        currentPhase,
        hasScheduledUpdateInCurrentPhase ? "Scheduled a cascading update" : null
      ),
    (currentPhaseFiber = currentPhase = null));
}
function stopWorkLoopTimer(interruptedBy, didCompleteRoot) {
  if (enableUserTimingAPI && supportsUserTiming) {
    var warning = null;
    null !== interruptedBy
      ? (warning =
          3 === interruptedBy.tag
            ? "A top-level update interrupted the previous render"
            : "An update to " +
              (getComponentName(interruptedBy.type) || "Unknown") +
              " interrupted the previous render")
      : 1 < commitCountInCurrentWorkLoop &&
        (warning = "There were cascading updates");
    commitCountInCurrentWorkLoop = 0;
    interruptedBy = didCompleteRoot
      ? "(React Tree Reconciliation: Completed Root)"
      : "(React Tree Reconciliation: Yielded)";
    for (didCompleteRoot = currentFiber; didCompleteRoot; )
      didCompleteRoot._debugIsCurrentlyTiming &&
        endFiberMark(didCompleteRoot, null, null),
        (didCompleteRoot = didCompleteRoot.return);
    endMark(interruptedBy, "(React Tree Reconciliation)", warning);
  }
}
function startCommitSnapshotEffectsTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectCountInCurrentCommit = 0),
    beginMark("(Committing Snapshot Effects)"));
}
function stopCommitSnapshotEffectsTimer() {
  if (enableUserTimingAPI && supportsUserTiming) {
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark(
      "(Committing Snapshot Effects: " + count + " Total)",
      "(Committing Snapshot Effects)",
      null
    );
  }
}
function startCommitHostEffectsTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectCountInCurrentCommit = 0), beginMark("(Committing Host Effects)"));
}
function stopCommitHostEffectsTimer() {
  if (enableUserTimingAPI && supportsUserTiming) {
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark(
      "(Committing Host Effects: " + count + " Total)",
      "(Committing Host Effects)",
      null
    );
  }
}
function startCommitLifeCyclesTimer() {
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectCountInCurrentCommit = 0),
    beginMark("(Calling Lifecycle Methods)"));
}
function stopCommitLifeCyclesTimer() {
  if (enableUserTimingAPI && supportsUserTiming) {
    var count = effectCountInCurrentCommit;
    effectCountInCurrentCommit = 0;
    endMark(
      "(Calling Lifecycle Methods: " + count + " Total)",
      "(Calling Lifecycle Methods)",
      null
    );
  }
}
var valueStack = [],
  index = -1;
function pop(cursor) {
  0 > index ||
    ((cursor.current = valueStack[index]), (valueStack[index] = null), index--);
}
function push(cursor, value) {
  index++;
  valueStack[index] = cursor.current;
  cursor.current = value;
}
var emptyContextObject = {},
  contextStackCursor = { current: emptyContextObject },
  didPerformWorkStackCursor = { current: !1 },
  previousContext = emptyContextObject;
function getMaskedContext(workInProgress, unmaskedContext) {
  var contextTypes = workInProgress.type.contextTypes;
  if (!contextTypes) return emptyContextObject;
  var instance = workInProgress.stateNode;
  if (
    instance &&
    instance.__reactInternalMemoizedUnmaskedChildContext === unmaskedContext
  )
    return instance.__reactInternalMemoizedMaskedChildContext;
  var context = {},
    key;
  for (key in contextTypes) context[key] = unmaskedContext[key];
  instance &&
    ((workInProgress = workInProgress.stateNode),
    (workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext),
    (workInProgress.__reactInternalMemoizedMaskedChildContext = context));
  return context;
}
function isContextProvider(type) {
  type = type.childContextTypes;
  return null !== type && void 0 !== type;
}
function popContext(fiber) {
  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}
function popTopLevelContextObject(fiber) {
  pop(didPerformWorkStackCursor, fiber);
  pop(contextStackCursor, fiber);
}
function pushTopLevelContextObject(fiber, context, didChange) {
  if (contextStackCursor.current !== emptyContextObject)
    throw ReactErrorProd(Error(168));
  push(contextStackCursor, context, fiber);
  push(didPerformWorkStackCursor, didChange, fiber);
}
function processChildContext(fiber, type, parentContext) {
  var instance = fiber.stateNode,
    childContextTypes = type.childContextTypes;
  if ("function" !== typeof instance.getChildContext) return parentContext;
  startPhaseTimer(fiber, "getChildContext");
  fiber = instance.getChildContext();
  stopPhaseTimer();
  for (var contextKey in fiber)
    if (!(contextKey in childContextTypes))
      throw ReactErrorProd(
        Error(108),
        getComponentName(type) || "Unknown",
        contextKey
      );
  return Object.assign({}, parentContext, fiber);
}
function pushContextProvider(workInProgress) {
  var instance = workInProgress.stateNode;
  instance =
    (instance && instance.__reactInternalMemoizedMergedChildContext) ||
    emptyContextObject;
  previousContext = contextStackCursor.current;
  push(contextStackCursor, instance, workInProgress);
  push(
    didPerformWorkStackCursor,
    didPerformWorkStackCursor.current,
    workInProgress
  );
  return !0;
}
function invalidateContextProvider(workInProgress, type, didChange) {
  var instance = workInProgress.stateNode;
  if (!instance) throw ReactErrorProd(Error(169));
  didChange
    ? ((type = processChildContext(workInProgress, type, previousContext)),
      (instance.__reactInternalMemoizedMergedChildContext = type),
      pop(didPerformWorkStackCursor, workInProgress),
      pop(contextStackCursor, workInProgress),
      push(contextStackCursor, type, workInProgress))
    : pop(didPerformWorkStackCursor, workInProgress);
  push(didPerformWorkStackCursor, didChange, workInProgress);
}
var lowPriorityWarning = require("lowPriorityWarning");
function resolveDefaultProps(Component, baseProps) {
  if (Component && Component.defaultProps) {
    baseProps = Object.assign({}, baseProps);
    Component = Component.defaultProps;
    for (var propName in Component)
      void 0 === baseProps[propName] &&
        (baseProps[propName] = Component[propName]);
  }
  return baseProps;
}
function readLazyComponentType(lazyComponent) {
  var result = lazyComponent._result;
  switch (lazyComponent._status) {
    case 1:
      return result;
    case 2:
      throw result;
    case 0:
      throw result;
    default:
      lazyComponent._status = 0;
      result = lazyComponent._ctor;
      result = result();
      result.then(
        function(moduleObject) {
          0 === lazyComponent._status &&
            ((moduleObject = moduleObject.default),
            (lazyComponent._status = 1),
            (lazyComponent._result = moduleObject));
        },
        function(error) {
          0 === lazyComponent._status &&
            ((lazyComponent._status = 2), (lazyComponent._result = error));
        }
      );
      switch (lazyComponent._status) {
        case 1:
          return lazyComponent._result;
        case 2:
          throw lazyComponent._result;
      }
      lazyComponent._result = result;
      throw result;
  }
}
var valueCursor = { current: null },
  currentlyRenderingFiber$1 = null,
  lastContextDependency = null,
  lastContextWithAllBitsObserved = null;
function resetContextDependencies() {
  lastContextWithAllBitsObserved = lastContextDependency = currentlyRenderingFiber$1 = null;
}
function pushProvider(providerFiber, nextValue) {
  var context = providerFiber.type._context;
  push(valueCursor, context._currentValue, providerFiber);
  context._currentValue = nextValue;
}
function popProvider(providerFiber) {
  var currentValue = valueCursor.current;
  pop(valueCursor, providerFiber);
  providerFiber.type._context._currentValue = currentValue;
}
function scheduleWorkOnParentPath(parent, renderExpirationTime) {
  for (; null !== parent; ) {
    var alternate = parent.alternate;
    if (parent.childExpirationTime < renderExpirationTime)
      (parent.childExpirationTime = renderExpirationTime),
        null !== alternate &&
          alternate.childExpirationTime < renderExpirationTime &&
          (alternate.childExpirationTime = renderExpirationTime);
    else if (
      null !== alternate &&
      alternate.childExpirationTime < renderExpirationTime
    )
      alternate.childExpirationTime = renderExpirationTime;
    else break;
    parent = parent.return;
  }
}
function prepareToReadContext(workInProgress, renderExpirationTime) {
  currentlyRenderingFiber$1 = workInProgress;
  lastContextWithAllBitsObserved = lastContextDependency = null;
  workInProgress = workInProgress.dependencies;
  null !== workInProgress &&
    null !== workInProgress.firstContext &&
    (workInProgress.expirationTime >= renderExpirationTime &&
      (didReceiveUpdate = !0),
    (workInProgress.firstContext = null));
}
function readContext(context, observedBits) {
  if (
    lastContextWithAllBitsObserved !== context &&
    !1 !== observedBits &&
    0 !== observedBits
  ) {
    if ("number" !== typeof observedBits || 1073741823 === observedBits)
      (lastContextWithAllBitsObserved = context), (observedBits = 1073741823);
    observedBits = { context: context, observedBits: observedBits, next: null };
    if (null === lastContextDependency) {
      if (null === currentlyRenderingFiber$1) throw ReactErrorProd(Error(308));
      lastContextDependency = observedBits;
      currentlyRenderingFiber$1.dependencies = {
        expirationTime: 0,
        firstContext: observedBits,
        events: null
      };
    } else lastContextDependency = lastContextDependency.next = observedBits;
  }
  return context._currentValue;
}
var hasForceUpdate = !1;
function createUpdateQueue(baseState) {
  return {
    baseState: baseState,
    firstUpdate: null,
    lastUpdate: null,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}
function cloneUpdateQueue(currentQueue) {
  return {
    baseState: currentQueue.baseState,
    firstUpdate: currentQueue.firstUpdate,
    lastUpdate: currentQueue.lastUpdate,
    firstCapturedUpdate: null,
    lastCapturedUpdate: null,
    firstEffect: null,
    lastEffect: null,
    firstCapturedEffect: null,
    lastCapturedEffect: null
  };
}
function createUpdate(expirationTime, suspenseConfig) {
  return {
    expirationTime: expirationTime,
    suspenseConfig: suspenseConfig,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
    nextEffect: null
  };
}
function appendUpdateToQueue(queue, update) {
  null === queue.lastUpdate
    ? (queue.firstUpdate = queue.lastUpdate = update)
    : ((queue.lastUpdate.next = update), (queue.lastUpdate = update));
}
function enqueueUpdate(fiber, update) {
  var alternate = fiber.alternate;
  if (null === alternate) {
    var queue1 = fiber.updateQueue;
    var queue2 = null;
    null === queue1 &&
      (queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState));
  } else
    (queue1 = fiber.updateQueue),
      (queue2 = alternate.updateQueue),
      null === queue1
        ? null === queue2
          ? ((queue1 = fiber.updateQueue = createUpdateQueue(
              fiber.memoizedState
            )),
            (queue2 = alternate.updateQueue = createUpdateQueue(
              alternate.memoizedState
            )))
          : (queue1 = fiber.updateQueue = cloneUpdateQueue(queue2))
        : null === queue2 &&
          (queue2 = alternate.updateQueue = cloneUpdateQueue(queue1));
  null === queue2 || queue1 === queue2
    ? appendUpdateToQueue(queue1, update)
    : null === queue1.lastUpdate || null === queue2.lastUpdate
      ? (appendUpdateToQueue(queue1, update),
        appendUpdateToQueue(queue2, update))
      : (appendUpdateToQueue(queue1, update), (queue2.lastUpdate = update));
}
function enqueueCapturedUpdate(workInProgress, update) {
  var workInProgressQueue = workInProgress.updateQueue;
  workInProgressQueue =
    null === workInProgressQueue
      ? (workInProgress.updateQueue = createUpdateQueue(
          workInProgress.memoizedState
        ))
      : ensureWorkInProgressQueueIsAClone(workInProgress, workInProgressQueue);
  null === workInProgressQueue.lastCapturedUpdate
    ? (workInProgressQueue.firstCapturedUpdate = workInProgressQueue.lastCapturedUpdate = update)
    : ((workInProgressQueue.lastCapturedUpdate.next = update),
      (workInProgressQueue.lastCapturedUpdate = update));
}
function ensureWorkInProgressQueueIsAClone(workInProgress, queue) {
  var current = workInProgress.alternate;
  null !== current &&
    queue === current.updateQueue &&
    (queue = workInProgress.updateQueue = cloneUpdateQueue(queue));
  return queue;
}
function getStateFromUpdate(
  workInProgress,
  queue,
  update,
  prevState,
  nextProps,
  instance
) {
  switch (update.tag) {
    case 1:
      return (
        (workInProgress = update.payload),
        "function" === typeof workInProgress
          ? workInProgress.call(instance, prevState, nextProps)
          : workInProgress
      );
    case 3:
      workInProgress.effectTag = (workInProgress.effectTag & -2049) | 64;
    case 0:
      workInProgress = update.payload;
      nextProps =
        "function" === typeof workInProgress
          ? workInProgress.call(instance, prevState, nextProps)
          : workInProgress;
      if (null === nextProps || void 0 === nextProps) break;
      return Object.assign({}, prevState, nextProps);
    case 2:
      hasForceUpdate = !0;
  }
  return prevState;
}
function processUpdateQueue(
  workInProgress,
  queue,
  props,
  instance,
  renderExpirationTime
) {
  hasForceUpdate = !1;
  queue = ensureWorkInProgressQueueIsAClone(workInProgress, queue);
  for (
    var newBaseState = queue.baseState,
      newFirstUpdate = null,
      newExpirationTime = 0,
      update = queue.firstUpdate,
      resultState = newBaseState;
    null !== update;

  ) {
    var updateExpirationTime = update.expirationTime;
    updateExpirationTime < renderExpirationTime
      ? (null === newFirstUpdate &&
          ((newFirstUpdate = update), (newBaseState = resultState)),
        newExpirationTime < updateExpirationTime &&
          (newExpirationTime = updateExpirationTime))
      : (markRenderEventTimeAndConfig(
          updateExpirationTime,
          update.suspenseConfig
        ),
        (resultState = getStateFromUpdate(
          workInProgress,
          queue,
          update,
          resultState,
          props,
          instance
        )),
        null !== update.callback &&
          ((workInProgress.effectTag |= 32),
          (update.nextEffect = null),
          null === queue.lastEffect
            ? (queue.firstEffect = queue.lastEffect = update)
            : ((queue.lastEffect.nextEffect = update),
              (queue.lastEffect = update))));
    update = update.next;
  }
  updateExpirationTime = null;
  for (update = queue.firstCapturedUpdate; null !== update; ) {
    var _updateExpirationTime = update.expirationTime;
    _updateExpirationTime < renderExpirationTime
      ? (null === updateExpirationTime &&
          ((updateExpirationTime = update),
          null === newFirstUpdate && (newBaseState = resultState)),
        newExpirationTime < _updateExpirationTime &&
          (newExpirationTime = _updateExpirationTime))
      : ((resultState = getStateFromUpdate(
          workInProgress,
          queue,
          update,
          resultState,
          props,
          instance
        )),
        null !== update.callback &&
          ((workInProgress.effectTag |= 32),
          (update.nextEffect = null),
          null === queue.lastCapturedEffect
            ? (queue.firstCapturedEffect = queue.lastCapturedEffect = update)
            : ((queue.lastCapturedEffect.nextEffect = update),
              (queue.lastCapturedEffect = update))));
    update = update.next;
  }
  null === newFirstUpdate && (queue.lastUpdate = null);
  null === updateExpirationTime
    ? (queue.lastCapturedUpdate = null)
    : (workInProgress.effectTag |= 32);
  null === newFirstUpdate &&
    null === updateExpirationTime &&
    (newBaseState = resultState);
  queue.baseState = newBaseState;
  queue.firstUpdate = newFirstUpdate;
  queue.firstCapturedUpdate = updateExpirationTime;
  workInProgress.expirationTime = newExpirationTime;
  workInProgress.memoizedState = resultState;
}
function commitUpdateQueue(finishedWork, finishedQueue, instance) {
  null !== finishedQueue.firstCapturedUpdate &&
    (null !== finishedQueue.lastUpdate &&
      ((finishedQueue.lastUpdate.next = finishedQueue.firstCapturedUpdate),
      (finishedQueue.lastUpdate = finishedQueue.lastCapturedUpdate)),
    (finishedQueue.firstCapturedUpdate = finishedQueue.lastCapturedUpdate = null));
  commitUpdateEffects(finishedQueue.firstEffect, instance);
  finishedQueue.firstEffect = finishedQueue.lastEffect = null;
  commitUpdateEffects(finishedQueue.firstCapturedEffect, instance);
  finishedQueue.firstCapturedEffect = finishedQueue.lastCapturedEffect = null;
}
function commitUpdateEffects(effect, instance) {
  for (; null !== effect; ) {
    var _callback3 = effect.callback;
    if (null !== _callback3) {
      effect.callback = null;
      var context = instance;
      if ("function" !== typeof _callback3)
        throw ReactErrorProd(Error(191), _callback3);
      _callback3.call(context);
    }
    effect = effect.nextEffect;
  }
}
var ReactCurrentBatchConfig = ReactSharedInternals.ReactCurrentBatchConfig,
  emptyRefsObject = new React.Component().refs;
function applyDerivedStateFromProps(
  workInProgress,
  ctor,
  getDerivedStateFromProps,
  nextProps
) {
  ctor = workInProgress.memoizedState;
  getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
  getDerivedStateFromProps =
    null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps
      ? ctor
      : Object.assign({}, ctor, getDerivedStateFromProps);
  workInProgress.memoizedState = getDerivedStateFromProps;
  nextProps = workInProgress.updateQueue;
  null !== nextProps &&
    0 === workInProgress.expirationTime &&
    (nextProps.baseState = getDerivedStateFromProps);
}
var classComponentUpdater = {
  isMounted: function(component) {
    return (component = component._reactInternalFiber)
      ? 2 === isFiberMountedImpl(component)
      : !1;
  },
  enqueueSetState: function(inst, payload, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTime(),
      suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
    suspenseConfig = createUpdate(currentTime, suspenseConfig);
    suspenseConfig.payload = payload;
    void 0 !== callback &&
      null !== callback &&
      (suspenseConfig.callback = callback);
    revertPassiveEffectsChange && flushPassiveEffects();
    enqueueUpdate(inst, suspenseConfig);
    scheduleUpdateOnFiber(inst, currentTime);
  },
  enqueueReplaceState: function(inst, payload, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTime(),
      suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
    suspenseConfig = createUpdate(currentTime, suspenseConfig);
    suspenseConfig.tag = 1;
    suspenseConfig.payload = payload;
    void 0 !== callback &&
      null !== callback &&
      (suspenseConfig.callback = callback);
    revertPassiveEffectsChange && flushPassiveEffects();
    enqueueUpdate(inst, suspenseConfig);
    scheduleUpdateOnFiber(inst, currentTime);
  },
  enqueueForceUpdate: function(inst, callback) {
    inst = inst._reactInternalFiber;
    var currentTime = requestCurrentTime(),
      suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(currentTime, inst, suspenseConfig);
    suspenseConfig = createUpdate(currentTime, suspenseConfig);
    suspenseConfig.tag = 2;
    void 0 !== callback &&
      null !== callback &&
      (suspenseConfig.callback = callback);
    revertPassiveEffectsChange && flushPassiveEffects();
    enqueueUpdate(inst, suspenseConfig);
    scheduleUpdateOnFiber(inst, currentTime);
  }
};
function checkShouldComponentUpdate(
  workInProgress,
  ctor,
  oldProps,
  newProps,
  oldState,
  newState,
  nextContext
) {
  var instance = workInProgress.stateNode;
  return "function" === typeof instance.shouldComponentUpdate
    ? (startPhaseTimer(workInProgress, "shouldComponentUpdate"),
      (workInProgress = instance.shouldComponentUpdate(
        newProps,
        newState,
        nextContext
      )),
      stopPhaseTimer(),
      workInProgress)
    : ctor.prototype && ctor.prototype.isPureReactComponent
      ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
      : !0;
}
function constructClassInstance(workInProgress, ctor, props) {
  var isLegacyContextConsumer = !1,
    unmaskedContext = emptyContextObject;
  var context = ctor.contextType;
  "object" === typeof context && null !== context
    ? (context = readContext(context))
    : ((unmaskedContext = isContextProvider(ctor)
        ? previousContext
        : contextStackCursor.current),
      (isLegacyContextConsumer = ctor.contextTypes),
      (context = (isLegacyContextConsumer =
        null !== isLegacyContextConsumer && void 0 !== isLegacyContextConsumer)
        ? getMaskedContext(workInProgress, unmaskedContext)
        : emptyContextObject));
  ctor = new ctor(props, context);
  workInProgress.memoizedState =
    null !== ctor.state && void 0 !== ctor.state ? ctor.state : null;
  ctor.updater = classComponentUpdater;
  workInProgress.stateNode = ctor;
  ctor._reactInternalFiber = workInProgress;
  isLegacyContextConsumer &&
    ((workInProgress = workInProgress.stateNode),
    (workInProgress.__reactInternalMemoizedUnmaskedChildContext = unmaskedContext),
    (workInProgress.__reactInternalMemoizedMaskedChildContext = context));
  return ctor;
}
function callComponentWillReceiveProps(
  workInProgress,
  instance,
  newProps,
  nextContext
) {
  var oldState = instance.state;
  startPhaseTimer(workInProgress, "componentWillReceiveProps");
  "function" === typeof instance.componentWillReceiveProps &&
    instance.componentWillReceiveProps(newProps, nextContext);
  "function" === typeof instance.UNSAFE_componentWillReceiveProps &&
    instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  stopPhaseTimer();
  instance.state !== oldState &&
    classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
}
function mountClassInstance(
  workInProgress,
  ctor,
  newProps,
  renderExpirationTime
) {
  var instance = workInProgress.stateNode;
  instance.props = newProps;
  instance.state = workInProgress.memoizedState;
  instance.refs = emptyRefsObject;
  var contextType = ctor.contextType;
  "object" === typeof contextType && null !== contextType
    ? (instance.context = readContext(contextType))
    : ((contextType = isContextProvider(ctor)
        ? previousContext
        : contextStackCursor.current),
      (instance.context = getMaskedContext(workInProgress, contextType)));
  contextType = workInProgress.updateQueue;
  null !== contextType &&
    (processUpdateQueue(
      workInProgress,
      contextType,
      newProps,
      instance,
      renderExpirationTime
    ),
    (instance.state = workInProgress.memoizedState));
  contextType = ctor.getDerivedStateFromProps;
  "function" === typeof contextType &&
    (applyDerivedStateFromProps(workInProgress, ctor, contextType, newProps),
    (instance.state = workInProgress.memoizedState));
  "function" === typeof ctor.getDerivedStateFromProps ||
    "function" === typeof instance.getSnapshotBeforeUpdate ||
    ("function" !== typeof instance.UNSAFE_componentWillMount &&
      "function" !== typeof instance.componentWillMount) ||
    (startPhaseTimer(workInProgress, "componentWillMount"),
    (ctor = instance.state),
    "function" === typeof instance.componentWillMount &&
      instance.componentWillMount(),
    "function" === typeof instance.UNSAFE_componentWillMount &&
      instance.UNSAFE_componentWillMount(),
    stopPhaseTimer(),
    ctor !== instance.state &&
      classComponentUpdater.enqueueReplaceState(instance, instance.state, null),
    (contextType = workInProgress.updateQueue),
    null !== contextType &&
      (processUpdateQueue(
        workInProgress,
        contextType,
        newProps,
        instance,
        renderExpirationTime
      ),
      (instance.state = workInProgress.memoizedState)));
  "function" === typeof instance.componentDidMount &&
    (workInProgress.effectTag |= 4);
}
var isArray = Array.isArray;
function coerceRef(returnFiber, current$$1, element) {
  returnFiber = element.ref;
  if (
    null !== returnFiber &&
    "function" !== typeof returnFiber &&
    "object" !== typeof returnFiber
  ) {
    if (element._owner) {
      element = element._owner;
      var inst = void 0;
      if (element) {
        if (1 !== element.tag) throw ReactErrorProd(Error(309));
        inst = element.stateNode;
      }
      if (!inst) throw ReactErrorProd(Error(147), returnFiber);
      var stringRef = "" + returnFiber;
      if (
        null !== current$$1 &&
        null !== current$$1.ref &&
        "function" === typeof current$$1.ref &&
        current$$1.ref._stringRef === stringRef
      )
        return current$$1.ref;
      current$$1 = function(value) {
        var refs = inst.refs;
        refs === emptyRefsObject && (refs = inst.refs = {});
        null === value ? delete refs[stringRef] : (refs[stringRef] = value);
      };
      current$$1._stringRef = stringRef;
      return current$$1;
    }
    if ("string" !== typeof returnFiber) throw ReactErrorProd(Error(284));
    if (!element._owner) throw ReactErrorProd(Error(290), returnFiber);
  }
  return returnFiber;
}
function throwOnInvalidObjectType(returnFiber, newChild) {
  if ("textarea" !== returnFiber.type)
    throw ReactErrorProd(
      Error(31),
      "[object Object]" === Object.prototype.toString.call(newChild)
        ? "object with keys {" + Object.keys(newChild).join(", ") + "}"
        : newChild,
      ""
    );
}
function ChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (shouldTrackSideEffects) {
      var last = returnFiber.lastEffect;
      null !== last
        ? ((last.nextEffect = childToDelete),
          (returnFiber.lastEffect = childToDelete))
        : (returnFiber.firstEffect = returnFiber.lastEffect = childToDelete);
      childToDelete.nextEffect = null;
      childToDelete.effectTag = 8;
    }
  }
  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) return null;
    for (; null !== currentFirstChild; )
      deleteChild(returnFiber, currentFirstChild),
        (currentFirstChild = currentFirstChild.sibling);
    return null;
  }
  function mapRemainingChildren(returnFiber, currentFirstChild) {
    for (returnFiber = new Map(); null !== currentFirstChild; )
      null !== currentFirstChild.key
        ? returnFiber.set(currentFirstChild.key, currentFirstChild)
        : returnFiber.set(currentFirstChild.index, currentFirstChild),
        (currentFirstChild = currentFirstChild.sibling);
    return returnFiber;
  }
  function useFiber(fiber, pendingProps, expirationTime) {
    fiber = createWorkInProgress(fiber, pendingProps, expirationTime);
    fiber.index = 0;
    fiber.sibling = null;
    return fiber;
  }
  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects) return lastPlacedIndex;
    newIndex = newFiber.alternate;
    if (null !== newIndex)
      return (
        (newIndex = newIndex.index),
        newIndex < lastPlacedIndex
          ? ((newFiber.effectTag = 2), lastPlacedIndex)
          : newIndex
      );
    newFiber.effectTag = 2;
    return lastPlacedIndex;
  }
  function placeSingleChild(newFiber) {
    shouldTrackSideEffects &&
      null === newFiber.alternate &&
      (newFiber.effectTag = 2);
    return newFiber;
  }
  function updateTextNode(
    returnFiber,
    current$$1,
    textContent,
    expirationTime
  ) {
    if (null === current$$1 || 6 !== current$$1.tag)
      return (
        (current$$1 = createFiberFromText(
          textContent,
          returnFiber.mode,
          expirationTime
        )),
        (current$$1.return = returnFiber),
        current$$1
      );
    current$$1 = useFiber(current$$1, textContent, expirationTime);
    current$$1.return = returnFiber;
    return current$$1;
  }
  function updateElement(returnFiber, current$$1, element, expirationTime) {
    if (null !== current$$1 && current$$1.elementType === element.type)
      return (
        (expirationTime = useFiber(current$$1, element.props, expirationTime)),
        (expirationTime.ref = coerceRef(returnFiber, current$$1, element)),
        (expirationTime.return = returnFiber),
        expirationTime
      );
    expirationTime = createFiberFromTypeAndProps(
      element.type,
      element.key,
      element.props,
      null,
      returnFiber.mode,
      expirationTime
    );
    expirationTime.ref = coerceRef(returnFiber, current$$1, element);
    expirationTime.return = returnFiber;
    return expirationTime;
  }
  function updatePortal(returnFiber, current$$1, portal, expirationTime) {
    if (
      null === current$$1 ||
      4 !== current$$1.tag ||
      current$$1.stateNode.containerInfo !== portal.containerInfo ||
      current$$1.stateNode.implementation !== portal.implementation
    )
      return (
        (current$$1 = createFiberFromPortal(
          portal,
          returnFiber.mode,
          expirationTime
        )),
        (current$$1.return = returnFiber),
        current$$1
      );
    current$$1 = useFiber(current$$1, portal.children || [], expirationTime);
    current$$1.return = returnFiber;
    return current$$1;
  }
  function updateFragment(
    returnFiber,
    current$$1,
    fragment,
    expirationTime,
    key
  ) {
    if (null === current$$1 || 7 !== current$$1.tag)
      return (
        (current$$1 = createFiberFromFragment(
          fragment,
          returnFiber.mode,
          expirationTime,
          key
        )),
        (current$$1.return = returnFiber),
        current$$1
      );
    current$$1 = useFiber(current$$1, fragment, expirationTime);
    current$$1.return = returnFiber;
    return current$$1;
  }
  function createChild(returnFiber, newChild, expirationTime) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (newChild = createFiberFromText(
          "" + newChild,
          returnFiber.mode,
          expirationTime
        )),
        (newChild.return = returnFiber),
        newChild
      );
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return (
            (expirationTime = createFiberFromTypeAndProps(
              newChild.type,
              newChild.key,
              newChild.props,
              null,
              returnFiber.mode,
              expirationTime
            )),
            (expirationTime.ref = coerceRef(returnFiber, null, newChild)),
            (expirationTime.return = returnFiber),
            expirationTime
          );
        case REACT_PORTAL_TYPE:
          return (
            (newChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              expirationTime
            )),
            (newChild.return = returnFiber),
            newChild
          );
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return (
          (newChild = createFiberFromFragment(
            newChild,
            returnFiber.mode,
            expirationTime,
            null
          )),
          (newChild.return = returnFiber),
          newChild
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateSlot(returnFiber, oldFiber, newChild, expirationTime) {
    var key = null !== oldFiber ? oldFiber.key : null;
    if ("string" === typeof newChild || "number" === typeof newChild)
      return null !== key
        ? null
        : updateTextNode(returnFiber, oldFiber, "" + newChild, expirationTime);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return newChild.key === key
            ? newChild.type === REACT_FRAGMENT_TYPE
              ? updateFragment(
                  returnFiber,
                  oldFiber,
                  newChild.props.children,
                  expirationTime,
                  key
                )
              : updateElement(returnFiber, oldFiber, newChild, expirationTime)
            : null;
        case REACT_PORTAL_TYPE:
          return newChild.key === key
            ? updatePortal(returnFiber, oldFiber, newChild, expirationTime)
            : null;
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return null !== key
          ? null
          : updateFragment(
              returnFiber,
              oldFiber,
              newChild,
              expirationTime,
              null
            );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateFromMap(
    existingChildren,
    returnFiber,
    newIdx,
    newChild,
    expirationTime
  ) {
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (existingChildren = existingChildren.get(newIdx) || null),
        updateTextNode(
          returnFiber,
          existingChildren,
          "" + newChild,
          expirationTime
        )
      );
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return (
            (existingChildren =
              existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null),
            newChild.type === REACT_FRAGMENT_TYPE
              ? updateFragment(
                  returnFiber,
                  existingChildren,
                  newChild.props.children,
                  expirationTime,
                  newChild.key
                )
              : updateElement(
                  returnFiber,
                  existingChildren,
                  newChild,
                  expirationTime
                )
          );
        case REACT_PORTAL_TYPE:
          return (
            (existingChildren =
              existingChildren.get(
                null === newChild.key ? newIdx : newChild.key
              ) || null),
            updatePortal(
              returnFiber,
              existingChildren,
              newChild,
              expirationTime
            )
          );
      }
      if (isArray(newChild) || getIteratorFn(newChild))
        return (
          (existingChildren = existingChildren.get(newIdx) || null),
          updateFragment(
            returnFiber,
            existingChildren,
            newChild,
            expirationTime,
            null
          )
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function reconcileChildrenArray(
    returnFiber,
    currentFirstChild,
    newChildren,
    expirationTime
  ) {
    for (
      var resultingFirstChild = null,
        previousNewFiber = null,
        oldFiber = currentFirstChild,
        newIdx = (currentFirstChild = 0),
        nextOldFiber = null;
      null !== oldFiber && newIdx < newChildren.length;
      newIdx++
    ) {
      oldFiber.index > newIdx
        ? ((nextOldFiber = oldFiber), (oldFiber = null))
        : (nextOldFiber = oldFiber.sibling);
      var newFiber = updateSlot(
        returnFiber,
        oldFiber,
        newChildren[newIdx],
        expirationTime
      );
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects &&
        oldFiber &&
        null === newFiber.alternate &&
        deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber
        ? (resultingFirstChild = newFiber)
        : (previousNewFiber.sibling = newFiber);
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (newIdx === newChildren.length)
      return (
        deleteRemainingChildren(returnFiber, oldFiber), resultingFirstChild
      );
    if (null === oldFiber) {
      for (; newIdx < newChildren.length; newIdx++)
        (oldFiber = createChild(
          returnFiber,
          newChildren[newIdx],
          expirationTime
        )),
          null !== oldFiber &&
            ((currentFirstChild = placeChild(
              oldFiber,
              currentFirstChild,
              newIdx
            )),
            null === previousNewFiber
              ? (resultingFirstChild = oldFiber)
              : (previousNewFiber.sibling = oldFiber),
            (previousNewFiber = oldFiber));
      return resultingFirstChild;
    }
    for (
      oldFiber = mapRemainingChildren(returnFiber, oldFiber);
      newIdx < newChildren.length;
      newIdx++
    )
      (nextOldFiber = updateFromMap(
        oldFiber,
        returnFiber,
        newIdx,
        newChildren[newIdx],
        expirationTime
      )),
        null !== nextOldFiber &&
          (shouldTrackSideEffects &&
            null !== nextOldFiber.alternate &&
            oldFiber.delete(
              null === nextOldFiber.key ? newIdx : nextOldFiber.key
            ),
          (currentFirstChild = placeChild(
            nextOldFiber,
            currentFirstChild,
            newIdx
          )),
          null === previousNewFiber
            ? (resultingFirstChild = nextOldFiber)
            : (previousNewFiber.sibling = nextOldFiber),
          (previousNewFiber = nextOldFiber));
    shouldTrackSideEffects &&
      oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
    return resultingFirstChild;
  }
  function reconcileChildrenIterator(
    returnFiber,
    currentFirstChild,
    newChildrenIterable,
    expirationTime
  ) {
    var iteratorFn = getIteratorFn(newChildrenIterable);
    if ("function" !== typeof iteratorFn) throw ReactErrorProd(Error(150));
    newChildrenIterable = iteratorFn.call(newChildrenIterable);
    if (null == newChildrenIterable) throw ReactErrorProd(Error(151));
    for (
      var previousNewFiber = (iteratorFn = null),
        oldFiber = currentFirstChild,
        newIdx = (currentFirstChild = 0),
        nextOldFiber = null,
        step = newChildrenIterable.next();
      null !== oldFiber && !step.done;
      newIdx++, step = newChildrenIterable.next()
    ) {
      oldFiber.index > newIdx
        ? ((nextOldFiber = oldFiber), (oldFiber = null))
        : (nextOldFiber = oldFiber.sibling);
      var newFiber = updateSlot(
        returnFiber,
        oldFiber,
        step.value,
        expirationTime
      );
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects &&
        oldFiber &&
        null === newFiber.alternate &&
        deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber
        ? (iteratorFn = newFiber)
        : (previousNewFiber.sibling = newFiber);
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (step.done)
      return deleteRemainingChildren(returnFiber, oldFiber), iteratorFn;
    if (null === oldFiber) {
      for (; !step.done; newIdx++, step = newChildrenIterable.next())
        (step = createChild(returnFiber, step.value, expirationTime)),
          null !== step &&
            ((currentFirstChild = placeChild(step, currentFirstChild, newIdx)),
            null === previousNewFiber
              ? (iteratorFn = step)
              : (previousNewFiber.sibling = step),
            (previousNewFiber = step));
      return iteratorFn;
    }
    for (
      oldFiber = mapRemainingChildren(returnFiber, oldFiber);
      !step.done;
      newIdx++, step = newChildrenIterable.next()
    )
      (step = updateFromMap(
        oldFiber,
        returnFiber,
        newIdx,
        step.value,
        expirationTime
      )),
        null !== step &&
          (shouldTrackSideEffects &&
            null !== step.alternate &&
            oldFiber.delete(null === step.key ? newIdx : step.key),
          (currentFirstChild = placeChild(step, currentFirstChild, newIdx)),
          null === previousNewFiber
            ? (iteratorFn = step)
            : (previousNewFiber.sibling = step),
          (previousNewFiber = step));
    shouldTrackSideEffects &&
      oldFiber.forEach(function(child) {
        return deleteChild(returnFiber, child);
      });
    return iteratorFn;
  }
  return function(returnFiber, currentFirstChild, newChild, expirationTime) {
    var isUnkeyedTopLevelFragment =
      "object" === typeof newChild &&
      null !== newChild &&
      newChild.type === REACT_FRAGMENT_TYPE &&
      null === newChild.key;
    isUnkeyedTopLevelFragment && (newChild = newChild.props.children);
    var isObject = "object" === typeof newChild && null !== newChild;
    if (isObject)
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          a: {
            isObject = newChild.key;
            for (
              isUnkeyedTopLevelFragment = currentFirstChild;
              null !== isUnkeyedTopLevelFragment;

            ) {
              if (isUnkeyedTopLevelFragment.key === isObject) {
                if (
                  7 === isUnkeyedTopLevelFragment.tag
                    ? newChild.type === REACT_FRAGMENT_TYPE
                    : isUnkeyedTopLevelFragment.elementType === newChild.type
                ) {
                  deleteRemainingChildren(
                    returnFiber,
                    isUnkeyedTopLevelFragment.sibling
                  );
                  currentFirstChild = useFiber(
                    isUnkeyedTopLevelFragment,
                    newChild.type === REACT_FRAGMENT_TYPE
                      ? newChild.props.children
                      : newChild.props,
                    expirationTime
                  );
                  currentFirstChild.ref = coerceRef(
                    returnFiber,
                    isUnkeyedTopLevelFragment,
                    newChild
                  );
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                }
                deleteRemainingChildren(returnFiber, isUnkeyedTopLevelFragment);
                break;
              } else deleteChild(returnFiber, isUnkeyedTopLevelFragment);
              isUnkeyedTopLevelFragment = isUnkeyedTopLevelFragment.sibling;
            }
            newChild.type === REACT_FRAGMENT_TYPE
              ? ((currentFirstChild = createFiberFromFragment(
                  newChild.props.children,
                  returnFiber.mode,
                  expirationTime,
                  newChild.key
                )),
                (currentFirstChild.return = returnFiber),
                (returnFiber = currentFirstChild))
              : ((expirationTime = createFiberFromTypeAndProps(
                  newChild.type,
                  newChild.key,
                  newChild.props,
                  null,
                  returnFiber.mode,
                  expirationTime
                )),
                (expirationTime.ref = coerceRef(
                  returnFiber,
                  currentFirstChild,
                  newChild
                )),
                (expirationTime.return = returnFiber),
                (returnFiber = expirationTime));
          }
          return placeSingleChild(returnFiber);
        case REACT_PORTAL_TYPE:
          a: {
            for (
              isUnkeyedTopLevelFragment = newChild.key;
              null !== currentFirstChild;

            ) {
              if (currentFirstChild.key === isUnkeyedTopLevelFragment) {
                if (
                  4 === currentFirstChild.tag &&
                  currentFirstChild.stateNode.containerInfo ===
                    newChild.containerInfo &&
                  currentFirstChild.stateNode.implementation ===
                    newChild.implementation
                ) {
                  deleteRemainingChildren(
                    returnFiber,
                    currentFirstChild.sibling
                  );
                  currentFirstChild = useFiber(
                    currentFirstChild,
                    newChild.children || [],
                    expirationTime
                  );
                  currentFirstChild.return = returnFiber;
                  returnFiber = currentFirstChild;
                  break a;
                }
                deleteRemainingChildren(returnFiber, currentFirstChild);
                break;
              } else deleteChild(returnFiber, currentFirstChild);
              currentFirstChild = currentFirstChild.sibling;
            }
            currentFirstChild = createFiberFromPortal(
              newChild,
              returnFiber.mode,
              expirationTime
            );
            currentFirstChild.return = returnFiber;
            returnFiber = currentFirstChild;
          }
          return placeSingleChild(returnFiber);
      }
    if ("string" === typeof newChild || "number" === typeof newChild)
      return (
        (newChild = "" + newChild),
        null !== currentFirstChild && 6 === currentFirstChild.tag
          ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling),
            (currentFirstChild = useFiber(
              currentFirstChild,
              newChild,
              expirationTime
            )),
            (currentFirstChild.return = returnFiber),
            (returnFiber = currentFirstChild))
          : (deleteRemainingChildren(returnFiber, currentFirstChild),
            (currentFirstChild = createFiberFromText(
              newChild,
              returnFiber.mode,
              expirationTime
            )),
            (currentFirstChild.return = returnFiber),
            (returnFiber = currentFirstChild)),
        placeSingleChild(returnFiber)
      );
    if (isArray(newChild))
      return reconcileChildrenArray(
        returnFiber,
        currentFirstChild,
        newChild,
        expirationTime
      );
    if (getIteratorFn(newChild))
      return reconcileChildrenIterator(
        returnFiber,
        currentFirstChild,
        newChild,
        expirationTime
      );
    isObject && throwOnInvalidObjectType(returnFiber, newChild);
    if ("undefined" === typeof newChild && !isUnkeyedTopLevelFragment)
      switch (returnFiber.tag) {
        case 1:
        case 0:
          throw ((returnFiber = returnFiber.type),
          ReactErrorProd(
            Error(152),
            returnFiber.displayName || returnFiber.name || "Component"
          ));
      }
    return deleteRemainingChildren(returnFiber, currentFirstChild);
  };
}
var reconcileChildFibers = ChildReconciler(!0),
  mountChildFibers = ChildReconciler(!1),
  NO_CONTEXT = {},
  contextStackCursor$1 = { current: NO_CONTEXT },
  contextFiberStackCursor = { current: NO_CONTEXT },
  rootInstanceStackCursor = { current: NO_CONTEXT };
function requiredContext(c) {
  if (c === NO_CONTEXT) throw ReactErrorProd(Error(174));
  return c;
}
function pushHostContainer(fiber, nextRootInstance) {
  push(rootInstanceStackCursor, nextRootInstance, fiber);
  push(contextFiberStackCursor, fiber, fiber);
  push(contextStackCursor$1, NO_CONTEXT, fiber);
  var type = nextRootInstance.nodeType;
  switch (type) {
    case 9:
    case 11:
      nextRootInstance = (nextRootInstance = nextRootInstance.documentElement)
        ? nextRootInstance.namespaceURI
        : getChildNamespace(null, "");
      break;
    default:
      (type = 8 === type ? nextRootInstance.parentNode : nextRootInstance),
        (nextRootInstance = type.namespaceURI || null),
        (type = type.tagName),
        (nextRootInstance = getChildNamespace(nextRootInstance, type));
  }
  pop(contextStackCursor$1, fiber);
  push(contextStackCursor$1, nextRootInstance, fiber);
}
function popHostContainer(fiber) {
  pop(contextStackCursor$1, fiber);
  pop(contextFiberStackCursor, fiber);
  pop(rootInstanceStackCursor, fiber);
}
function pushHostContext(fiber) {
  requiredContext(rootInstanceStackCursor.current);
  var context = requiredContext(contextStackCursor$1.current);
  var nextContext = getChildNamespace(context, fiber.type);
  context !== nextContext &&
    (push(contextFiberStackCursor, fiber, fiber),
    push(contextStackCursor$1, nextContext, fiber));
}
function pushHostContextForEventComponent(fiber) {
  var context = requiredContext(contextStackCursor$1.current);
  context !== context &&
    (push(contextFiberStackCursor, fiber, fiber),
    push(contextStackCursor$1, context, fiber));
}
function popHostContext(fiber) {
  contextFiberStackCursor.current === fiber &&
    (pop(contextStackCursor$1, fiber), pop(contextFiberStackCursor, fiber));
}
var SubtreeSuspenseContextMask = 1,
  InvisibleParentSuspenseContext = 1,
  ForceSuspenseFallback = 2,
  suspenseStackCursor = { current: 0 };
function popSuspenseContext(fiber) {
  pop(suspenseStackCursor, fiber);
}
function findFirstSuspended(row) {
  for (var node = row; null !== node; ) {
    if (13 === node.tag) {
      if (null !== node.memoizedState) return node;
    } else if (21 === node.tag && void 0 !== node.memoizedProps.revealOrder) {
      if (0 !== (node.effectTag & 64)) return node;
    } else if (null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === row) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === row) return null;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
  return null;
}
var NoEffect$1 = 0,
  UnmountSnapshot = 2,
  UnmountMutation = 4,
  MountMutation = 8,
  UnmountLayout = 16,
  MountLayout = 32,
  MountPassive = 64,
  UnmountPassive = 128,
  ReactCurrentDispatcher$1 = ReactSharedInternals.ReactCurrentDispatcher,
  renderExpirationTime$1 = 0,
  currentlyRenderingFiber$2 = null,
  currentHook = null,
  nextCurrentHook = null,
  firstWorkInProgressHook = null,
  workInProgressHook = null,
  nextWorkInProgressHook = null,
  remainingExpirationTime = 0,
  componentUpdateQueue = null,
  sideEffectTag = 0,
  didScheduleRenderPhaseUpdate = !1,
  renderPhaseUpdates = null,
  numberOfReRenders = 0;
function throwInvalidHookError() {
  throw ReactErrorProd(Error(321));
}
function areHookInputsEqual(nextDeps, prevDeps) {
  if (null === prevDeps) return !1;
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
    if (!is(nextDeps[i], prevDeps[i])) return !1;
  return !0;
}
function renderWithHooks(
  current,
  workInProgress,
  Component,
  props,
  refOrContext,
  nextRenderExpirationTime
) {
  renderExpirationTime$1 = nextRenderExpirationTime;
  currentlyRenderingFiber$2 = workInProgress;
  nextCurrentHook = null !== current ? current.memoizedState : null;
  ReactCurrentDispatcher$1.current =
    null === nextCurrentHook ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
  workInProgress = Component(props, refOrContext);
  if (didScheduleRenderPhaseUpdate) {
    do
      (didScheduleRenderPhaseUpdate = !1),
        (numberOfReRenders += 1),
        (nextCurrentHook = null !== current ? current.memoizedState : null),
        (nextWorkInProgressHook = firstWorkInProgressHook),
        (componentUpdateQueue = workInProgressHook = currentHook = null),
        (ReactCurrentDispatcher$1.current = HooksDispatcherOnUpdate),
        (workInProgress = Component(props, refOrContext));
    while (didScheduleRenderPhaseUpdate);
    renderPhaseUpdates = null;
    numberOfReRenders = 0;
  }
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  current = currentlyRenderingFiber$2;
  current.memoizedState = firstWorkInProgressHook;
  current.expirationTime = remainingExpirationTime;
  current.updateQueue = componentUpdateQueue;
  current.effectTag |= sideEffectTag;
  current = null !== currentHook && null !== currentHook.next;
  renderExpirationTime$1 = 0;
  nextWorkInProgressHook = workInProgressHook = firstWorkInProgressHook = nextCurrentHook = currentHook = currentlyRenderingFiber$2 = null;
  remainingExpirationTime = 0;
  componentUpdateQueue = null;
  sideEffectTag = 0;
  if (current) throw ReactErrorProd(Error(300));
  return workInProgress;
}
function resetHooks() {
  ReactCurrentDispatcher$1.current = ContextOnlyDispatcher;
  renderExpirationTime$1 = 0;
  nextWorkInProgressHook = workInProgressHook = firstWorkInProgressHook = nextCurrentHook = currentHook = currentlyRenderingFiber$2 = null;
  remainingExpirationTime = 0;
  componentUpdateQueue = null;
  sideEffectTag = 0;
  didScheduleRenderPhaseUpdate = !1;
  renderPhaseUpdates = null;
  numberOfReRenders = 0;
}
function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,
    baseState: null,
    queue: null,
    baseUpdate: null,
    next: null
  };
  null === workInProgressHook
    ? (firstWorkInProgressHook = workInProgressHook = hook)
    : (workInProgressHook = workInProgressHook.next = hook);
  return workInProgressHook;
}
function updateWorkInProgressHook() {
  if (null !== nextWorkInProgressHook)
    (workInProgressHook = nextWorkInProgressHook),
      (nextWorkInProgressHook = workInProgressHook.next),
      (currentHook = nextCurrentHook),
      (nextCurrentHook = null !== currentHook ? currentHook.next : null);
  else {
    if (null === nextCurrentHook) throw ReactErrorProd(Error(310));
    currentHook = nextCurrentHook;
    var newHook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      queue: currentHook.queue,
      baseUpdate: currentHook.baseUpdate,
      next: null
    };
    workInProgressHook =
      null === workInProgressHook
        ? (firstWorkInProgressHook = newHook)
        : (workInProgressHook.next = newHook);
    nextCurrentHook = currentHook.next;
  }
  return workInProgressHook;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function updateReducer(reducer) {
  var hook = updateWorkInProgressHook(),
    queue = hook.queue;
  if (null === queue) throw ReactErrorProd(Error(311));
  queue.lastRenderedReducer = reducer;
  if (0 < numberOfReRenders) {
    var _dispatch = queue.dispatch;
    if (null !== renderPhaseUpdates) {
      var firstRenderPhaseUpdate = renderPhaseUpdates.get(queue);
      if (void 0 !== firstRenderPhaseUpdate) {
        renderPhaseUpdates.delete(queue);
        var newState = hook.memoizedState;
        do
          (newState = reducer(newState, firstRenderPhaseUpdate.action)),
            (firstRenderPhaseUpdate = firstRenderPhaseUpdate.next);
        while (null !== firstRenderPhaseUpdate);
        is(newState, hook.memoizedState) || (didReceiveUpdate = !0);
        hook.memoizedState = newState;
        hook.baseUpdate === queue.last && (hook.baseState = newState);
        queue.lastRenderedState = newState;
        return [newState, _dispatch];
      }
    }
    return [hook.memoizedState, _dispatch];
  }
  _dispatch = queue.last;
  var baseUpdate = hook.baseUpdate;
  newState = hook.baseState;
  null !== baseUpdate
    ? (null !== _dispatch && (_dispatch.next = null),
      (_dispatch = baseUpdate.next))
    : (_dispatch = null !== _dispatch ? _dispatch.next : null);
  if (null !== _dispatch) {
    var newBaseUpdate = (firstRenderPhaseUpdate = null),
      _update = _dispatch,
      didSkip = !1;
    do {
      var updateExpirationTime = _update.expirationTime;
      updateExpirationTime < renderExpirationTime$1
        ? (didSkip ||
            ((didSkip = !0),
            (newBaseUpdate = baseUpdate),
            (firstRenderPhaseUpdate = newState)),
          updateExpirationTime > remainingExpirationTime &&
            (remainingExpirationTime = updateExpirationTime))
        : (markRenderEventTimeAndConfig(
            updateExpirationTime,
            _update.suspenseConfig
          ),
          (newState =
            _update.eagerReducer === reducer
              ? _update.eagerState
              : reducer(newState, _update.action)));
      baseUpdate = _update;
      _update = _update.next;
    } while (null !== _update && _update !== _dispatch);
    didSkip ||
      ((newBaseUpdate = baseUpdate), (firstRenderPhaseUpdate = newState));
    is(newState, hook.memoizedState) || (didReceiveUpdate = !0);
    hook.memoizedState = newState;
    hook.baseUpdate = newBaseUpdate;
    hook.baseState = firstRenderPhaseUpdate;
    queue.lastRenderedState = newState;
  }
  return [hook.memoizedState, queue.dispatch];
}
function pushEffect(tag, create, destroy, deps) {
  tag = { tag: tag, create: create, destroy: destroy, deps: deps, next: null };
  null === componentUpdateQueue
    ? ((componentUpdateQueue = { lastEffect: null }),
      (componentUpdateQueue.lastEffect = tag.next = tag))
    : ((create = componentUpdateQueue.lastEffect),
      null === create
        ? (componentUpdateQueue.lastEffect = tag.next = tag)
        : ((destroy = create.next),
          (create.next = tag),
          (tag.next = destroy),
          (componentUpdateQueue.lastEffect = tag)));
  return tag;
}
function mountEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = mountWorkInProgressHook();
  sideEffectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(
    hookEffectTag,
    create,
    void 0,
    void 0 === deps ? null : deps
  );
}
function updateEffectImpl(fiberEffectTag, hookEffectTag, create, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var destroy = void 0;
  if (null !== currentHook) {
    var prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;
    if (null !== deps && areHookInputsEqual(deps, prevEffect.deps)) {
      pushEffect(NoEffect$1, create, destroy, deps);
      return;
    }
  }
  sideEffectTag |= fiberEffectTag;
  hook.memoizedState = pushEffect(hookEffectTag, create, destroy, deps);
}
function imperativeHandleEffect(create, ref) {
  if ("function" === typeof ref)
    return (
      (create = create()),
      ref(create),
      function() {
        ref(null);
      }
    );
  if (null !== ref && void 0 !== ref)
    return (
      (create = create()),
      (ref.current = create),
      function() {
        ref.current = null;
      }
    );
}
function mountDebugValue() {}
function dispatchAction(fiber, queue, action) {
  if (!(25 > numberOfReRenders)) throw ReactErrorProd(Error(301));
  var alternate = fiber.alternate;
  if (
    fiber === currentlyRenderingFiber$2 ||
    (null !== alternate && alternate === currentlyRenderingFiber$2)
  )
    if (
      ((didScheduleRenderPhaseUpdate = !0),
      (fiber = {
        expirationTime: renderExpirationTime$1,
        suspenseConfig: null,
        action: action,
        eagerReducer: null,
        eagerState: null,
        next: null
      }),
      null === renderPhaseUpdates && (renderPhaseUpdates = new Map()),
      (action = renderPhaseUpdates.get(queue)),
      void 0 === action)
    )
      renderPhaseUpdates.set(queue, fiber);
    else {
      for (queue = action; null !== queue.next; ) queue = queue.next;
      queue.next = fiber;
    }
  else {
    revertPassiveEffectsChange && flushPassiveEffects();
    var currentTime = requestCurrentTime(),
      _suspenseConfig = ReactCurrentBatchConfig.suspense;
    currentTime = computeExpirationForFiber(
      currentTime,
      fiber,
      _suspenseConfig
    );
    _suspenseConfig = {
      expirationTime: currentTime,
      suspenseConfig: _suspenseConfig,
      action: action,
      eagerReducer: null,
      eagerState: null,
      next: null
    };
    var _last = queue.last;
    if (null === _last) _suspenseConfig.next = _suspenseConfig;
    else {
      var first = _last.next;
      null !== first && (_suspenseConfig.next = first);
      _last.next = _suspenseConfig;
    }
    queue.last = _suspenseConfig;
    if (
      0 === fiber.expirationTime &&
      (null === alternate || 0 === alternate.expirationTime) &&
      ((alternate = queue.lastRenderedReducer), null !== alternate)
    )
      try {
        var currentState = queue.lastRenderedState,
          _eagerState = alternate(currentState, action);
        _suspenseConfig.eagerReducer = alternate;
        _suspenseConfig.eagerState = _eagerState;
        if (is(_eagerState, currentState)) return;
      } catch (error) {
      } finally {
      }
    scheduleUpdateOnFiber(fiber, currentTime);
  }
}
var ContextOnlyDispatcher = {
    readContext: readContext,
    useCallback: throwInvalidHookError,
    useContext: throwInvalidHookError,
    useEffect: throwInvalidHookError,
    useImperativeHandle: throwInvalidHookError,
    useLayoutEffect: throwInvalidHookError,
    useMemo: throwInvalidHookError,
    useReducer: throwInvalidHookError,
    useRef: throwInvalidHookError,
    useState: throwInvalidHookError,
    useDebugValue: throwInvalidHookError,
    useEvent: updateEventComponentInstance
  },
  HooksDispatcherOnMount = {
    readContext: readContext,
    useCallback: function(callback, deps) {
      mountWorkInProgressHook().memoizedState = [
        callback,
        void 0 === deps ? null : deps
      ];
      return callback;
    },
    useContext: readContext,
    useEffect: function(create, deps) {
      return mountEffectImpl(516, UnmountPassive | MountPassive, create, deps);
    },
    useImperativeHandle: function(ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      return mountEffectImpl(
        4,
        UnmountMutation | MountLayout,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    },
    useLayoutEffect: function(create, deps) {
      return mountEffectImpl(4, UnmountMutation | MountLayout, create, deps);
    },
    useMemo: function(nextCreate, deps) {
      var hook = mountWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: function(reducer, initialArg, init) {
      var hook = mountWorkInProgressHook();
      initialArg = void 0 !== init ? init(initialArg) : initialArg;
      hook.memoizedState = hook.baseState = initialArg;
      reducer = hook.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: reducer,
        lastRenderedState: initialArg
      };
      reducer = reducer.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingFiber$2,
        reducer
      );
      return [hook.memoizedState, reducer];
    },
    useRef: function(initialValue) {
      var hook = mountWorkInProgressHook();
      initialValue = { current: initialValue };
      return (hook.memoizedState = initialValue);
    },
    useState: function(initialState) {
      var hook = mountWorkInProgressHook();
      "function" === typeof initialState && (initialState = initialState());
      hook.memoizedState = hook.baseState = initialState;
      initialState = hook.queue = {
        last: null,
        dispatch: null,
        lastRenderedReducer: basicStateReducer,
        lastRenderedState: initialState
      };
      initialState = initialState.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingFiber$2,
        initialState
      );
      return [hook.memoizedState, initialState];
    },
    useDebugValue: mountDebugValue,
    useEvent: updateEventComponentInstance
  },
  HooksDispatcherOnUpdate = {
    readContext: readContext,
    useCallback: function(callback, deps) {
      var hook = updateWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (
        null !== prevState &&
        null !== deps &&
        areHookInputsEqual(deps, prevState[1])
      )
        return prevState[0];
      hook.memoizedState = [callback, deps];
      return callback;
    },
    useContext: readContext,
    useEffect: function(create, deps) {
      return updateEffectImpl(516, UnmountPassive | MountPassive, create, deps);
    },
    useImperativeHandle: function(ref, create, deps) {
      deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
      return updateEffectImpl(
        4,
        UnmountMutation | MountLayout,
        imperativeHandleEffect.bind(null, create, ref),
        deps
      );
    },
    useLayoutEffect: function(create, deps) {
      return updateEffectImpl(4, UnmountMutation | MountLayout, create, deps);
    },
    useMemo: function(nextCreate, deps) {
      var hook = updateWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      var prevState = hook.memoizedState;
      if (
        null !== prevState &&
        null !== deps &&
        areHookInputsEqual(deps, prevState[1])
      )
        return prevState[0];
      nextCreate = nextCreate();
      hook.memoizedState = [nextCreate, deps];
      return nextCreate;
    },
    useReducer: updateReducer,
    useRef: function() {
      return updateWorkInProgressHook().memoizedState;
    },
    useState: function(initialState) {
      return updateReducer(basicStateReducer, initialState);
    },
    useDebugValue: mountDebugValue,
    useEvent: updateEventComponentInstance
  },
  hydrationParentFiber = null,
  nextHydratableInstance = null,
  isHydrating = !1;
function deleteHydratableInstance(returnFiber, instance) {
  var fiber = createFiber(5, null, null, 0);
  fiber.elementType = "DELETED";
  fiber.type = "DELETED";
  fiber.stateNode = instance;
  fiber.return = returnFiber;
  fiber.effectTag = 8;
  null !== returnFiber.lastEffect
    ? ((returnFiber.lastEffect.nextEffect = fiber),
      (returnFiber.lastEffect = fiber))
    : (returnFiber.firstEffect = returnFiber.lastEffect = fiber);
}
function tryHydrate(fiber, nextInstance) {
  switch (fiber.tag) {
    case 5:
      var type = fiber.type;
      nextInstance =
        1 !== nextInstance.nodeType ||
        type.toLowerCase() !== nextInstance.nodeName.toLowerCase()
          ? null
          : nextInstance;
      return null !== nextInstance
        ? ((fiber.stateNode = nextInstance), !0)
        : !1;
    case 6:
      return (
        (nextInstance =
          "" === fiber.pendingProps || 3 !== nextInstance.nodeType
            ? null
            : nextInstance),
        null !== nextInstance ? ((fiber.stateNode = nextInstance), !0) : !1
      );
    case 13:
      return (
        (nextInstance = 8 !== nextInstance.nodeType ? null : nextInstance),
        null !== nextInstance
          ? ((fiber.tag = 18), (fiber.stateNode = nextInstance), !0)
          : !1
      );
    default:
      return !1;
  }
}
function tryToClaimNextHydratableInstance(fiber) {
  if (isHydrating) {
    var nextInstance = nextHydratableInstance;
    if (nextInstance) {
      var firstAttemptedInstance = nextInstance;
      if (!tryHydrate(fiber, nextInstance)) {
        nextInstance = getNextHydratable(firstAttemptedInstance.nextSibling);
        if (!nextInstance || !tryHydrate(fiber, nextInstance)) {
          fiber.effectTag |= 2;
          isHydrating = !1;
          hydrationParentFiber = fiber;
          return;
        }
        deleteHydratableInstance(hydrationParentFiber, firstAttemptedInstance);
      }
      hydrationParentFiber = fiber;
      nextHydratableInstance = getNextHydratable(nextInstance.firstChild);
    } else
      (fiber.effectTag |= 2),
        (isHydrating = !1),
        (hydrationParentFiber = fiber);
  }
}
function popToNextHostParent(fiber) {
  for (
    fiber = fiber.return;
    null !== fiber && 5 !== fiber.tag && 3 !== fiber.tag && 18 !== fiber.tag;

  )
    fiber = fiber.return;
  hydrationParentFiber = fiber;
}
function popHydrationState(fiber) {
  if (fiber !== hydrationParentFiber) return !1;
  if (!isHydrating) return popToNextHostParent(fiber), (isHydrating = !0), !1;
  var type = fiber.type;
  if (
    5 !== fiber.tag ||
    ("head" !== type &&
      "body" !== type &&
      !shouldSetTextContent(type, fiber.memoizedProps))
  )
    for (type = nextHydratableInstance; type; )
      deleteHydratableInstance(fiber, type),
        (type = getNextHydratable(type.nextSibling));
  popToNextHostParent(fiber);
  nextHydratableInstance = hydrationParentFiber
    ? getNextHydratable(fiber.stateNode.nextSibling)
    : null;
  return !0;
}
function resetHydrationState() {
  nextHydratableInstance = hydrationParentFiber = null;
  isHydrating = !1;
}
var ReactCurrentOwner$3 = ReactSharedInternals.ReactCurrentOwner,
  didReceiveUpdate = !1;
function reconcileChildren(
  current$$1,
  workInProgress,
  nextChildren,
  renderExpirationTime
) {
  workInProgress.child =
    null === current$$1
      ? mountChildFibers(
          workInProgress,
          null,
          nextChildren,
          renderExpirationTime
        )
      : reconcileChildFibers(
          workInProgress,
          current$$1.child,
          nextChildren,
          renderExpirationTime
        );
}
function updateForwardRef(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  Component = Component.render;
  var ref = workInProgress.ref;
  prepareToReadContext(workInProgress, renderExpirationTime);
  currentlyRenderingFiber = workInProgress;
  currentEventComponentInstanceIndex = 0;
  nextProps = renderWithHooks(
    current$$1,
    workInProgress,
    Component,
    nextProps,
    ref,
    renderExpirationTime
  );
  if (null !== current$$1 && !didReceiveUpdate)
    return (
      (workInProgress.updateQueue = current$$1.updateQueue),
      (workInProgress.effectTag &= -517),
      current$$1.expirationTime <= renderExpirationTime &&
        (current$$1.expirationTime = 0),
      bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(
    current$$1,
    workInProgress,
    nextProps,
    renderExpirationTime
  );
  return workInProgress.child;
}
function updateMemoComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  updateExpirationTime,
  renderExpirationTime
) {
  if (null === current$$1) {
    var type = Component.type;
    if (
      "function" === typeof type &&
      !shouldConstruct(type) &&
      void 0 === type.defaultProps &&
      null === Component.compare &&
      void 0 === Component.defaultProps
    )
      return (
        (workInProgress.tag = 15),
        (workInProgress.type = type),
        updateSimpleMemoComponent(
          current$$1,
          workInProgress,
          type,
          nextProps,
          updateExpirationTime,
          renderExpirationTime
        )
      );
    current$$1 = createFiberFromTypeAndProps(
      Component.type,
      null,
      nextProps,
      null,
      workInProgress.mode,
      renderExpirationTime
    );
    current$$1.ref = workInProgress.ref;
    current$$1.return = workInProgress;
    return (workInProgress.child = current$$1);
  }
  type = current$$1.child;
  if (
    updateExpirationTime < renderExpirationTime &&
    ((updateExpirationTime = type.memoizedProps),
    (Component = Component.compare),
    (Component = null !== Component ? Component : shallowEqual),
    Component(updateExpirationTime, nextProps) &&
      current$$1.ref === workInProgress.ref)
  )
    return bailoutOnAlreadyFinishedWork(
      current$$1,
      workInProgress,
      renderExpirationTime
    );
  workInProgress.effectTag |= 1;
  current$$1 = createWorkInProgress(type, nextProps, renderExpirationTime);
  current$$1.ref = workInProgress.ref;
  current$$1.return = workInProgress;
  return (workInProgress.child = current$$1);
}
function updateSimpleMemoComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  updateExpirationTime,
  renderExpirationTime
) {
  return null !== current$$1 &&
    shallowEqual(current$$1.memoizedProps, nextProps) &&
    current$$1.ref === workInProgress.ref &&
    ((didReceiveUpdate = !1), updateExpirationTime < renderExpirationTime)
    ? bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    : updateFunctionComponent(
        current$$1,
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      );
}
function markRef(current$$1, workInProgress) {
  var ref = workInProgress.ref;
  if (
    (null === current$$1 && null !== ref) ||
    (null !== current$$1 && current$$1.ref !== ref)
  )
    workInProgress.effectTag |= 128;
}
function updateFunctionComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  var unmaskedContext = isContextProvider(Component)
    ? previousContext
    : contextStackCursor.current;
  unmaskedContext = getMaskedContext(workInProgress, unmaskedContext);
  prepareToReadContext(workInProgress, renderExpirationTime);
  currentlyRenderingFiber = workInProgress;
  currentEventComponentInstanceIndex = 0;
  Component = renderWithHooks(
    current$$1,
    workInProgress,
    Component,
    nextProps,
    unmaskedContext,
    renderExpirationTime
  );
  if (null !== current$$1 && !didReceiveUpdate)
    return (
      (workInProgress.updateQueue = current$$1.updateQueue),
      (workInProgress.effectTag &= -517),
      current$$1.expirationTime <= renderExpirationTime &&
        (current$$1.expirationTime = 0),
      bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    );
  workInProgress.effectTag |= 1;
  reconcileChildren(
    current$$1,
    workInProgress,
    Component,
    renderExpirationTime
  );
  return workInProgress.child;
}
function updateClassComponent(
  current$$1,
  workInProgress,
  Component,
  nextProps,
  renderExpirationTime
) {
  if (isContextProvider(Component)) {
    var hasContext = !0;
    pushContextProvider(workInProgress);
  } else hasContext = !1;
  prepareToReadContext(workInProgress, renderExpirationTime);
  if (null === workInProgress.stateNode)
    null !== current$$1 &&
      ((current$$1.alternate = null),
      (workInProgress.alternate = null),
      (workInProgress.effectTag |= 2)),
      constructClassInstance(
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      ),
      mountClassInstance(
        workInProgress,
        Component,
        nextProps,
        renderExpirationTime
      ),
      (nextProps = !0);
  else if (null === current$$1) {
    var instance = workInProgress.stateNode,
      oldProps = workInProgress.memoizedProps;
    instance.props = oldProps;
    var oldContext = instance.context,
      contextType = Component.contextType;
    "object" === typeof contextType && null !== contextType
      ? (contextType = readContext(contextType))
      : ((contextType = isContextProvider(Component)
          ? previousContext
          : contextStackCursor.current),
        (contextType = getMaskedContext(workInProgress, contextType)));
    var getDerivedStateFromProps = Component.getDerivedStateFromProps,
      hasNewLifecycles =
        "function" === typeof getDerivedStateFromProps ||
        "function" === typeof instance.getSnapshotBeforeUpdate;
    hasNewLifecycles ||
      ("function" !== typeof instance.UNSAFE_componentWillReceiveProps &&
        "function" !== typeof instance.componentWillReceiveProps) ||
      ((oldProps !== nextProps || oldContext !== contextType) &&
        callComponentWillReceiveProps(
          workInProgress,
          instance,
          nextProps,
          contextType
        ));
    hasForceUpdate = !1;
    var oldState = workInProgress.memoizedState;
    oldContext = instance.state = oldState;
    var updateQueue = workInProgress.updateQueue;
    null !== updateQueue &&
      (processUpdateQueue(
        workInProgress,
        updateQueue,
        nextProps,
        instance,
        renderExpirationTime
      ),
      (oldContext = workInProgress.memoizedState));
    oldProps !== nextProps ||
    oldState !== oldContext ||
    didPerformWorkStackCursor.current ||
    hasForceUpdate
      ? ("function" === typeof getDerivedStateFromProps &&
          (applyDerivedStateFromProps(
            workInProgress,
            Component,
            getDerivedStateFromProps,
            nextProps
          ),
          (oldContext = workInProgress.memoizedState)),
        (oldProps =
          hasForceUpdate ||
          checkShouldComponentUpdate(
            workInProgress,
            Component,
            oldProps,
            nextProps,
            oldState,
            oldContext,
            contextType
          ))
          ? (hasNewLifecycles ||
              ("function" !== typeof instance.UNSAFE_componentWillMount &&
                "function" !== typeof instance.componentWillMount) ||
              (startPhaseTimer(workInProgress, "componentWillMount"),
              "function" === typeof instance.componentWillMount &&
                instance.componentWillMount(),
              "function" === typeof instance.UNSAFE_componentWillMount &&
                instance.UNSAFE_componentWillMount(),
              stopPhaseTimer()),
            "function" === typeof instance.componentDidMount &&
              (workInProgress.effectTag |= 4))
          : ("function" === typeof instance.componentDidMount &&
              (workInProgress.effectTag |= 4),
            (workInProgress.memoizedProps = nextProps),
            (workInProgress.memoizedState = oldContext)),
        (instance.props = nextProps),
        (instance.state = oldContext),
        (instance.context = contextType),
        (nextProps = oldProps))
      : ("function" === typeof instance.componentDidMount &&
          (workInProgress.effectTag |= 4),
        (nextProps = !1));
  } else
    (instance = workInProgress.stateNode),
      (oldProps = workInProgress.memoizedProps),
      (instance.props =
        workInProgress.type === workInProgress.elementType
          ? oldProps
          : resolveDefaultProps(workInProgress.type, oldProps)),
      (oldContext = instance.context),
      (contextType = Component.contextType),
      "object" === typeof contextType && null !== contextType
        ? (contextType = readContext(contextType))
        : ((contextType = isContextProvider(Component)
            ? previousContext
            : contextStackCursor.current),
          (contextType = getMaskedContext(workInProgress, contextType))),
      (getDerivedStateFromProps = Component.getDerivedStateFromProps),
      (hasNewLifecycles =
        "function" === typeof getDerivedStateFromProps ||
        "function" === typeof instance.getSnapshotBeforeUpdate) ||
        ("function" !== typeof instance.UNSAFE_componentWillReceiveProps &&
          "function" !== typeof instance.componentWillReceiveProps) ||
        ((oldProps !== nextProps || oldContext !== contextType) &&
          callComponentWillReceiveProps(
            workInProgress,
            instance,
            nextProps,
            contextType
          )),
      (hasForceUpdate = !1),
      (oldContext = workInProgress.memoizedState),
      (oldState = instance.state = oldContext),
      (updateQueue = workInProgress.updateQueue),
      null !== updateQueue &&
        (processUpdateQueue(
          workInProgress,
          updateQueue,
          nextProps,
          instance,
          renderExpirationTime
        ),
        (oldState = workInProgress.memoizedState)),
      oldProps !== nextProps ||
      oldContext !== oldState ||
      didPerformWorkStackCursor.current ||
      hasForceUpdate
        ? ("function" === typeof getDerivedStateFromProps &&
            (applyDerivedStateFromProps(
              workInProgress,
              Component,
              getDerivedStateFromProps,
              nextProps
            ),
            (oldState = workInProgress.memoizedState)),
          (getDerivedStateFromProps =
            hasForceUpdate ||
            checkShouldComponentUpdate(
              workInProgress,
              Component,
              oldProps,
              nextProps,
              oldContext,
              oldState,
              contextType
            ))
            ? (hasNewLifecycles ||
                ("function" !== typeof instance.UNSAFE_componentWillUpdate &&
                  "function" !== typeof instance.componentWillUpdate) ||
                (startPhaseTimer(workInProgress, "componentWillUpdate"),
                "function" === typeof instance.componentWillUpdate &&
                  instance.componentWillUpdate(
                    nextProps,
                    oldState,
                    contextType
                  ),
                "function" === typeof instance.UNSAFE_componentWillUpdate &&
                  instance.UNSAFE_componentWillUpdate(
                    nextProps,
                    oldState,
                    contextType
                  ),
                stopPhaseTimer()),
              "function" === typeof instance.componentDidUpdate &&
                (workInProgress.effectTag |= 4),
              "function" === typeof instance.getSnapshotBeforeUpdate &&
                (workInProgress.effectTag |= 256))
            : ("function" !== typeof instance.componentDidUpdate ||
                (oldProps === current$$1.memoizedProps &&
                  oldContext === current$$1.memoizedState) ||
                (workInProgress.effectTag |= 4),
              "function" !== typeof instance.getSnapshotBeforeUpdate ||
                (oldProps === current$$1.memoizedProps &&
                  oldContext === current$$1.memoizedState) ||
                (workInProgress.effectTag |= 256),
              (workInProgress.memoizedProps = nextProps),
              (workInProgress.memoizedState = oldState)),
          (instance.props = nextProps),
          (instance.state = oldState),
          (instance.context = contextType),
          (nextProps = getDerivedStateFromProps))
        : ("function" !== typeof instance.componentDidUpdate ||
            (oldProps === current$$1.memoizedProps &&
              oldContext === current$$1.memoizedState) ||
            (workInProgress.effectTag |= 4),
          "function" !== typeof instance.getSnapshotBeforeUpdate ||
            (oldProps === current$$1.memoizedProps &&
              oldContext === current$$1.memoizedState) ||
            (workInProgress.effectTag |= 256),
          (nextProps = !1));
  return finishClassComponent(
    current$$1,
    workInProgress,
    Component,
    nextProps,
    hasContext,
    renderExpirationTime
  );
}
function finishClassComponent(
  current$$1,
  workInProgress,
  Component,
  shouldUpdate,
  hasContext,
  renderExpirationTime
) {
  markRef(current$$1, workInProgress);
  var didCaptureError = 0 !== (workInProgress.effectTag & 64);
  if (!shouldUpdate && !didCaptureError)
    return (
      hasContext && invalidateContextProvider(workInProgress, Component, !1),
      bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      )
    );
  shouldUpdate = workInProgress.stateNode;
  ReactCurrentOwner$3.current = workInProgress;
  var nextChildren =
    didCaptureError && "function" !== typeof Component.getDerivedStateFromError
      ? null
      : shouldUpdate.render();
  workInProgress.effectTag |= 1;
  null !== current$$1 && didCaptureError
    ? ((workInProgress.child = reconcileChildFibers(
        workInProgress,
        current$$1.child,
        null,
        renderExpirationTime
      )),
      (workInProgress.child = reconcileChildFibers(
        workInProgress,
        null,
        nextChildren,
        renderExpirationTime
      )))
    : reconcileChildren(
        current$$1,
        workInProgress,
        nextChildren,
        renderExpirationTime
      );
  workInProgress.memoizedState = shouldUpdate.state;
  hasContext && invalidateContextProvider(workInProgress, Component, !0);
  return workInProgress.child;
}
function pushHostRootContext(workInProgress) {
  var root = workInProgress.stateNode;
  root.pendingContext
    ? pushTopLevelContextObject(
        workInProgress,
        root.pendingContext,
        root.pendingContext !== root.context
      )
    : root.context &&
      pushTopLevelContextObject(workInProgress, root.context, !1);
  pushHostContainer(workInProgress, root.containerInfo);
}
var SUSPENDED_MARKER = {};
function updateSuspenseComponent(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  var mode = workInProgress.mode,
    nextProps = workInProgress.pendingProps,
    suspenseContext = suspenseStackCursor.current,
    nextState = null,
    nextDidTimeout = !1,
    JSCompiler_temp;
  (JSCompiler_temp = 0 !== (workInProgress.effectTag & 64)) ||
    (JSCompiler_temp =
      0 !== (suspenseContext & ForceSuspenseFallback) &&
      (null === current$$1 || null !== current$$1.memoizedState));
  JSCompiler_temp
    ? ((nextState = SUSPENDED_MARKER),
      (nextDidTimeout = !0),
      (workInProgress.effectTag &= -65))
    : (null !== current$$1 && null === current$$1.memoizedState) ||
      void 0 === nextProps.fallback ||
      !0 === nextProps.unstable_avoidThisFallback ||
      (suspenseContext |= InvisibleParentSuspenseContext);
  suspenseContext &= SubtreeSuspenseContextMask;
  push(suspenseStackCursor, suspenseContext, workInProgress);
  if (null === current$$1) {
    if (
      void 0 !== nextProps.fallback &&
      (tryToClaimNextHydratableInstance(workInProgress),
      18 === workInProgress.tag)
    )
      return (
        popSuspenseContext(workInProgress),
        updateDehydratedSuspenseComponent(
          null,
          workInProgress,
          renderExpirationTime
        )
      );
    if (nextDidTimeout) {
      nextProps = nextProps.fallback;
      current$$1 = createFiberFromFragment(null, mode, 0, null);
      current$$1.return = workInProgress;
      if (0 === (workInProgress.mode & 2))
        for (
          nextDidTimeout =
            null !== workInProgress.memoizedState
              ? workInProgress.child.child
              : workInProgress.child,
            current$$1.child = nextDidTimeout;
          null !== nextDidTimeout;

        )
          (nextDidTimeout.return = current$$1),
            (nextDidTimeout = nextDidTimeout.sibling);
      renderExpirationTime = createFiberFromFragment(
        nextProps,
        mode,
        renderExpirationTime,
        null
      );
      renderExpirationTime.return = workInProgress;
      current$$1.sibling = renderExpirationTime;
      mode = current$$1;
    } else
      mode = renderExpirationTime = mountChildFibers(
        workInProgress,
        null,
        nextProps.children,
        renderExpirationTime
      );
  } else {
    if (null !== current$$1.memoizedState)
      if (
        ((suspenseContext = current$$1.child),
        (mode = suspenseContext.sibling),
        nextDidTimeout)
      ) {
        nextProps = nextProps.fallback;
        renderExpirationTime = createWorkInProgress(
          suspenseContext,
          suspenseContext.pendingProps,
          0
        );
        renderExpirationTime.return = workInProgress;
        if (
          0 === (workInProgress.mode & 2) &&
          ((nextDidTimeout =
            null !== workInProgress.memoizedState
              ? workInProgress.child.child
              : workInProgress.child),
          nextDidTimeout !== suspenseContext.child)
        )
          for (
            renderExpirationTime.child = nextDidTimeout;
            null !== nextDidTimeout;

          )
            (nextDidTimeout.return = renderExpirationTime),
              (nextDidTimeout = nextDidTimeout.sibling);
        nextProps = createWorkInProgress(mode, nextProps, mode.expirationTime);
        nextProps.return = workInProgress;
        renderExpirationTime.sibling = nextProps;
        mode = renderExpirationTime;
        renderExpirationTime.childExpirationTime = 0;
        renderExpirationTime = nextProps;
      } else
        mode = renderExpirationTime = reconcileChildFibers(
          workInProgress,
          suspenseContext.child,
          nextProps.children,
          renderExpirationTime
        );
    else if (((suspenseContext = current$$1.child), nextDidTimeout)) {
      nextDidTimeout = nextProps.fallback;
      nextProps = createFiberFromFragment(null, mode, 0, null);
      nextProps.return = workInProgress;
      nextProps.child = suspenseContext;
      null !== suspenseContext && (suspenseContext.return = nextProps);
      if (0 === (workInProgress.mode & 2))
        for (
          suspenseContext =
            null !== workInProgress.memoizedState
              ? workInProgress.child.child
              : workInProgress.child,
            nextProps.child = suspenseContext;
          null !== suspenseContext;

        )
          (suspenseContext.return = nextProps),
            (suspenseContext = suspenseContext.sibling);
      renderExpirationTime = createFiberFromFragment(
        nextDidTimeout,
        mode,
        renderExpirationTime,
        null
      );
      renderExpirationTime.return = workInProgress;
      nextProps.sibling = renderExpirationTime;
      renderExpirationTime.effectTag |= 2;
      mode = nextProps;
      nextProps.childExpirationTime = 0;
    } else
      renderExpirationTime = mode = reconcileChildFibers(
        workInProgress,
        suspenseContext,
        nextProps.children,
        renderExpirationTime
      );
    workInProgress.stateNode = current$$1.stateNode;
  }
  workInProgress.memoizedState = nextState;
  workInProgress.child = mode;
  return renderExpirationTime;
}
function retrySuspenseComponentWithoutHydrating(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  current$$1.alternate = null;
  workInProgress.alternate = null;
  var returnFiber = workInProgress.return;
  if (null === returnFiber) throw ReactErrorProd(Error(315));
  var last = returnFiber.lastEffect;
  null !== last
    ? ((last.nextEffect = current$$1), (returnFiber.lastEffect = current$$1))
    : (returnFiber.firstEffect = returnFiber.lastEffect = current$$1);
  current$$1.nextEffect = null;
  current$$1.effectTag = 8;
  popSuspenseContext(workInProgress);
  workInProgress.tag = 13;
  workInProgress.stateNode = null;
  workInProgress.memoizedState = null;
  workInProgress.effectTag |= 2;
  return updateSuspenseComponent(null, workInProgress, renderExpirationTime);
}
function updateDehydratedSuspenseComponent(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  push(
    suspenseStackCursor,
    suspenseStackCursor.current & SubtreeSuspenseContextMask,
    workInProgress
  );
  var suspenseInstance = workInProgress.stateNode;
  if (null === current$$1)
    return (
      "$!" === suspenseInstance.data
        ? ((suspenseInstance = requestCurrentTime()),
          (workInProgress.expirationTime =
            1073741821 -
            25 * ((((1073741821 - suspenseInstance + 500) / 25) | 0) + 1)))
        : (workInProgress.expirationTime = 1),
      null
    );
  if (0 !== (workInProgress.effectTag & 64))
    return (workInProgress.child = null);
  if ("$!" === suspenseInstance.data)
    return retrySuspenseComponentWithoutHydrating(
      current$$1,
      workInProgress,
      renderExpirationTime
    );
  var hasContextChanged$$1 =
    current$$1.childExpirationTime >= renderExpirationTime;
  if (didReceiveUpdate || hasContextChanged$$1)
    return retrySuspenseComponentWithoutHydrating(
      current$$1,
      workInProgress,
      renderExpirationTime
    );
  if ("$?" === suspenseInstance.data)
    return (
      (workInProgress.effectTag |= 64),
      (workInProgress.child = null),
      (workInProgress = retryTimedOutBoundary.bind(null, current$$1)),
      (suspenseInstance._reactRetry = workInProgress),
      null
    );
  nextHydratableInstance = getNextHydratable(
    workInProgress.stateNode.nextSibling
  );
  popToNextHostParent(workInProgress);
  isHydrating = !0;
  workInProgress.child = mountChildFibers(
    workInProgress,
    null,
    workInProgress.pendingProps.children,
    renderExpirationTime
  );
  return workInProgress.child;
}
function initSuspenseListRenderState(
  workInProgress,
  isBackwards,
  tail,
  lastContentRow,
  tailMode
) {
  var renderState = workInProgress.memoizedState;
  null === renderState
    ? (workInProgress.memoizedState = {
        isBackwards: isBackwards,
        rendering: null,
        last: lastContentRow,
        tail: tail,
        tailExpiration: 0,
        tailMode: tailMode
      })
    : ((renderState.isBackwards = isBackwards),
      (renderState.rendering = null),
      (renderState.last = lastContentRow),
      (renderState.tail = tail),
      (renderState.tailExpiration = 0),
      (renderState.tailMode = tailMode));
}
function updateSuspenseListComponent(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  var nextProps = workInProgress.pendingProps,
    revealOrder = nextProps.revealOrder,
    tailMode = nextProps.tail;
  reconcileChildren(
    current$$1,
    workInProgress,
    nextProps.children,
    renderExpirationTime
  );
  nextProps = suspenseStackCursor.current;
  if (0 !== (nextProps & ForceSuspenseFallback))
    (nextProps =
      (nextProps & SubtreeSuspenseContextMask) | ForceSuspenseFallback),
      (workInProgress.effectTag |= 64);
  else {
    if (null !== current$$1 && 0 !== (current$$1.effectTag & 64))
      a: for (current$$1 = workInProgress.child; null !== current$$1; ) {
        if (13 === current$$1.tag) {
          if (null !== current$$1.memoizedState) {
            current$$1.expirationTime < renderExpirationTime &&
              (current$$1.expirationTime = renderExpirationTime);
            var alternate = current$$1.alternate;
            null !== alternate &&
              alternate.expirationTime < renderExpirationTime &&
              (alternate.expirationTime = renderExpirationTime);
            scheduleWorkOnParentPath(current$$1.return, renderExpirationTime);
          }
        } else if (null !== current$$1.child) {
          current$$1.child.return = current$$1;
          current$$1 = current$$1.child;
          continue;
        }
        if (current$$1 === workInProgress) break a;
        for (; null === current$$1.sibling; ) {
          if (
            null === current$$1.return ||
            current$$1.return === workInProgress
          )
            break a;
          current$$1 = current$$1.return;
        }
        current$$1.sibling.return = current$$1.return;
        current$$1 = current$$1.sibling;
      }
    nextProps &= SubtreeSuspenseContextMask;
  }
  push(suspenseStackCursor, nextProps, workInProgress);
  if (0 === (workInProgress.mode & 2)) workInProgress.memoizedState = null;
  else
    switch (revealOrder) {
      case "forwards":
        renderExpirationTime = workInProgress.child;
        for (revealOrder = null; null !== renderExpirationTime; )
          (nextProps = renderExpirationTime.alternate),
            null !== nextProps &&
              null === findFirstSuspended(nextProps) &&
              (revealOrder = renderExpirationTime),
            (renderExpirationTime = renderExpirationTime.sibling);
        renderExpirationTime = revealOrder;
        null === renderExpirationTime
          ? ((revealOrder = workInProgress.child),
            (workInProgress.child = null))
          : ((revealOrder = renderExpirationTime.sibling),
            (renderExpirationTime.sibling = null));
        initSuspenseListRenderState(
          workInProgress,
          !1,
          revealOrder,
          renderExpirationTime,
          tailMode
        );
        break;
      case "backwards":
        renderExpirationTime = null;
        revealOrder = workInProgress.child;
        for (workInProgress.child = null; null !== revealOrder; ) {
          nextProps = revealOrder.alternate;
          if (null !== nextProps && null === findFirstSuspended(nextProps)) {
            workInProgress.child = revealOrder;
            break;
          }
          nextProps = revealOrder.sibling;
          revealOrder.sibling = renderExpirationTime;
          renderExpirationTime = revealOrder;
          revealOrder = nextProps;
        }
        initSuspenseListRenderState(
          workInProgress,
          !0,
          renderExpirationTime,
          null,
          tailMode
        );
        break;
      case "together":
        initSuspenseListRenderState(workInProgress, !1, null, null, void 0);
        break;
      default:
        workInProgress.memoizedState = null;
    }
  return workInProgress.child;
}
function bailoutOnAlreadyFinishedWork(
  current$$1,
  workInProgress,
  renderExpirationTime
) {
  cancelWorkTimer(workInProgress);
  null !== current$$1 &&
    (workInProgress.dependencies = current$$1.dependencies);
  if (workInProgress.childExpirationTime < renderExpirationTime) return null;
  if (null !== current$$1 && workInProgress.child !== current$$1.child)
    throw ReactErrorProd(Error(153));
  if (null !== workInProgress.child) {
    current$$1 = workInProgress.child;
    renderExpirationTime = createWorkInProgress(
      current$$1,
      current$$1.pendingProps,
      current$$1.expirationTime
    );
    workInProgress.child = renderExpirationTime;
    for (
      renderExpirationTime.return = workInProgress;
      null !== current$$1.sibling;

    )
      (current$$1 = current$$1.sibling),
        (renderExpirationTime = renderExpirationTime.sibling = createWorkInProgress(
          current$$1,
          current$$1.pendingProps,
          current$$1.expirationTime
        )),
        (renderExpirationTime.return = workInProgress);
    renderExpirationTime.sibling = null;
  }
  return workInProgress.child;
}
function markUpdate(workInProgress) {
  workInProgress.effectTag |= 4;
}
var appendAllChildren = void 0,
  updateHostContainer = void 0,
  updateHostComponent$1 = void 0,
  updateHostText$1 = void 0;
appendAllChildren = function(parent, workInProgress) {
  for (var node = workInProgress.child; null !== node; ) {
    if (5 === node.tag || 6 === node.tag) parent.appendChild(node.stateNode);
    else if (4 !== node.tag && null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === workInProgress) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === workInProgress) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
};
updateHostContainer = function() {};
updateHostComponent$1 = function(
  current,
  workInProgress,
  type,
  newProps,
  rootContainerInstance
) {
  var oldProps = current.memoizedProps;
  if (oldProps !== newProps) {
    var instance = workInProgress.stateNode;
    requiredContext(contextStackCursor$1.current);
    current = null;
    switch (type) {
      case "input":
        oldProps = getHostProps(instance, oldProps);
        newProps = getHostProps(instance, newProps);
        current = [];
        break;
      case "option":
        oldProps = getHostProps$1(instance, oldProps);
        newProps = getHostProps$1(instance, newProps);
        current = [];
        break;
      case "select":
        oldProps = Object.assign({}, oldProps, { value: void 0 });
        newProps = Object.assign({}, newProps, { value: void 0 });
        current = [];
        break;
      case "textarea":
        oldProps = getHostProps$3(instance, oldProps);
        newProps = getHostProps$3(instance, newProps);
        current = [];
        break;
      default:
        "function" !== typeof oldProps.onClick &&
          "function" === typeof newProps.onClick &&
          (instance.onclick = noop);
    }
    assertValidProps(type, newProps);
    instance = type = void 0;
    var styleUpdates = null;
    for (type in oldProps)
      if (
        !newProps.hasOwnProperty(type) &&
        oldProps.hasOwnProperty(type) &&
        null != oldProps[type]
      )
        if ("style" === type) {
          var lastStyle = oldProps[type];
          for (instance in lastStyle)
            lastStyle.hasOwnProperty(instance) &&
              (styleUpdates || (styleUpdates = {}),
              (styleUpdates[instance] = ""));
        } else
          "dangerouslySetInnerHTML" !== type &&
            "children" !== type &&
            "suppressContentEditableWarning" !== type &&
            "suppressHydrationWarning" !== type &&
            "autoFocus" !== type &&
            (registrationNameModules.hasOwnProperty(type)
              ? current || (current = [])
              : (current = current || []).push(type, null));
    for (type in newProps) {
      var nextProp = newProps[type];
      lastStyle = null != oldProps ? oldProps[type] : void 0;
      if (
        newProps.hasOwnProperty(type) &&
        nextProp !== lastStyle &&
        (null != nextProp || null != lastStyle)
      )
        if ("style" === type)
          if (lastStyle) {
            for (instance in lastStyle)
              !lastStyle.hasOwnProperty(instance) ||
                (nextProp && nextProp.hasOwnProperty(instance)) ||
                (styleUpdates || (styleUpdates = {}),
                (styleUpdates[instance] = ""));
            for (instance in nextProp)
              nextProp.hasOwnProperty(instance) &&
                lastStyle[instance] !== nextProp[instance] &&
                (styleUpdates || (styleUpdates = {}),
                (styleUpdates[instance] = nextProp[instance]));
          } else
            styleUpdates ||
              (current || (current = []), current.push(type, styleUpdates)),
              (styleUpdates = nextProp);
        else
          "dangerouslySetInnerHTML" === type
            ? ((nextProp = nextProp ? nextProp.__html : void 0),
              (lastStyle = lastStyle ? lastStyle.__html : void 0),
              null != nextProp &&
                lastStyle !== nextProp &&
                (current = current || []).push(type, "" + nextProp))
            : "children" === type
              ? lastStyle === nextProp ||
                ("string" !== typeof nextProp &&
                  "number" !== typeof nextProp) ||
                (current = current || []).push(type, "" + nextProp)
              : "suppressContentEditableWarning" !== type &&
                "suppressHydrationWarning" !== type &&
                (registrationNameModules.hasOwnProperty(type)
                  ? (null != nextProp &&
                      ensureListeningTo(rootContainerInstance, type),
                    current || lastStyle === nextProp || (current = []))
                  : (current = current || []).push(type, nextProp));
    }
    styleUpdates && (current = current || []).push("style", styleUpdates);
    rootContainerInstance = current;
    (workInProgress.updateQueue = rootContainerInstance) &&
      markUpdate(workInProgress);
  }
};
updateHostText$1 = function(current, workInProgress, oldText, newText) {
  oldText !== newText && markUpdate(workInProgress);
};
function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
  switch (renderState.tailMode) {
    case "hidden":
      hasRenderedATailFallback = renderState.tail;
      for (var lastTailNode = null; null !== hasRenderedATailFallback; )
        null !== hasRenderedATailFallback.alternate &&
          (lastTailNode = hasRenderedATailFallback),
          (hasRenderedATailFallback = hasRenderedATailFallback.sibling);
      null === lastTailNode
        ? (renderState.tail = null)
        : (lastTailNode.sibling = null);
      break;
    case "collapsed":
      lastTailNode = renderState.tail;
      for (var _lastTailNode = null; null !== lastTailNode; )
        null !== lastTailNode.alternate && (_lastTailNode = lastTailNode),
          (lastTailNode = lastTailNode.sibling);
      null === _lastTailNode
        ? hasRenderedATailFallback || null === renderState.tail
          ? (renderState.tail = null)
          : (renderState.tail.sibling = null)
        : (_lastTailNode.sibling = null);
  }
}
function unwindWork(workInProgress) {
  switch (workInProgress.tag) {
    case 1:
      isContextProvider(workInProgress.type) && popContext(workInProgress);
      var effectTag = workInProgress.effectTag;
      return effectTag & 2048
        ? ((workInProgress.effectTag = (effectTag & -2049) | 64),
          workInProgress)
        : null;
    case 3:
      popHostContainer(workInProgress);
      popTopLevelContextObject(workInProgress);
      effectTag = workInProgress.effectTag;
      if (0 !== (effectTag & 64)) throw ReactErrorProd(Error(285));
      workInProgress.effectTag = (effectTag & -2049) | 64;
      return workInProgress;
    case 5:
      return popHostContext(workInProgress), null;
    case 13:
      return (
        popSuspenseContext(workInProgress),
        (effectTag = workInProgress.effectTag),
        effectTag & 2048
          ? ((workInProgress.effectTag = (effectTag & -2049) | 64),
            workInProgress)
          : null
      );
    case 18:
      return (
        popSuspenseContext(workInProgress),
        (effectTag = workInProgress.effectTag),
        effectTag & 2048
          ? ((workInProgress.effectTag = (effectTag & -2049) | 64),
            workInProgress)
          : null
      );
    case 21:
      return popSuspenseContext(workInProgress), null;
    case 4:
      return popHostContainer(workInProgress), null;
    case 10:
      return popProvider(workInProgress), null;
    case 19:
      return popHostContext(workInProgress), null;
    default:
      return null;
  }
}
function createCapturedValue(value, source) {
  return {
    value: value,
    source: source,
    stack: getStackByFiberInDevAndProd(source)
  };
}
var ReactFiberErrorDialogWWW = require("ReactFiberErrorDialog");
if ("function" !== typeof ReactFiberErrorDialogWWW.showErrorDialog)
  throw ReactErrorProd(Error(320));
function logCapturedError(capturedError) {
  !1 !== ReactFiberErrorDialogWWW.showErrorDialog(capturedError) &&
    console.error(capturedError.error);
}
var PossiblyWeakSet$1 = "function" === typeof WeakSet ? WeakSet : Set;
function logError(boundary, errorInfo) {
  var source = errorInfo.source,
    stack = errorInfo.stack;
  null === stack &&
    null !== source &&
    (stack = getStackByFiberInDevAndProd(source));
  errorInfo = {
    componentName: null !== source ? getComponentName(source.type) : null,
    componentStack: null !== stack ? stack : "",
    error: errorInfo.value,
    errorBoundary: null,
    errorBoundaryName: null,
    errorBoundaryFound: !1,
    willRetry: !1
  };
  null !== boundary &&
    1 === boundary.tag &&
    ((errorInfo.errorBoundary = boundary.stateNode),
    (errorInfo.errorBoundaryName = getComponentName(boundary.type)),
    (errorInfo.errorBoundaryFound = !0),
    (errorInfo.willRetry = !0));
  try {
    logCapturedError(errorInfo);
  } catch (e) {
    setTimeout(function() {
      throw e;
    });
  }
}
function safelyDetachRef(current$$1) {
  var ref = current$$1.ref;
  if (null !== ref)
    if ("function" === typeof ref)
      try {
        ref(null);
      } catch (refError) {
        captureCommitPhaseError(current$$1, refError);
      }
    else ref.current = null;
}
function commitHookEffectList(unmountTag, mountTag, finishedWork) {
  finishedWork = finishedWork.updateQueue;
  finishedWork = null !== finishedWork ? finishedWork.lastEffect : null;
  if (null !== finishedWork) {
    var effect = (finishedWork = finishedWork.next);
    do {
      if ((effect.tag & unmountTag) !== NoEffect$1) {
        var destroy = effect.destroy;
        effect.destroy = void 0;
        void 0 !== destroy && destroy();
      }
      (effect.tag & mountTag) !== NoEffect$1 &&
        ((destroy = effect.create), (effect.destroy = destroy()));
      effect = effect.next;
    } while (effect !== finishedWork);
  }
}
function commitUnmount(current$$1$jscomp$0) {
  "function" === typeof onCommitFiberUnmount &&
    onCommitFiberUnmount(current$$1$jscomp$0);
  switch (current$$1$jscomp$0.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      var updateQueue = current$$1$jscomp$0.updateQueue;
      if (
        null !== updateQueue &&
        ((updateQueue = updateQueue.lastEffect), null !== updateQueue)
      ) {
        var effect = (updateQueue = updateQueue.next);
        do {
          var destroy = effect.destroy;
          if (void 0 !== destroy) {
            var current$$1 = current$$1$jscomp$0;
            try {
              destroy();
            } catch (error) {
              captureCommitPhaseError(current$$1, error);
            }
          }
          effect = effect.next;
        } while (effect !== updateQueue);
      }
      break;
    case 1:
      safelyDetachRef(current$$1$jscomp$0);
      updateQueue = current$$1$jscomp$0.stateNode;
      if ("function" === typeof updateQueue.componentWillUnmount)
        try {
          startPhaseTimer(current$$1$jscomp$0, "componentWillUnmount"),
            (updateQueue.props = current$$1$jscomp$0.memoizedProps),
            (updateQueue.state = current$$1$jscomp$0.memoizedState),
            updateQueue.componentWillUnmount(),
            stopPhaseTimer();
        } catch (unmountError) {
          captureCommitPhaseError(current$$1$jscomp$0, unmountError);
        }
      break;
    case 5:
      safelyDetachRef(current$$1$jscomp$0);
      break;
    case 4:
      unmountHostComponents(current$$1$jscomp$0);
      break;
    case 19:
      updateQueue = current$$1$jscomp$0.stateNode;
      effect = updateQueue.responder;
      destroy = effect.onUnmount;
      if (void 0 !== destroy) {
        current$$1 = updateQueue.isHook;
        var props = updateQueue.props,
          state = updateQueue.state;
        currentEventQueue = createEventQueue();
        currentInstance = updateQueue;
        currentlyInHook = current$$1;
        try {
          destroy(eventResponderContext, props, state), processEventQueue();
        } finally {
          currentTimers = currentInstance = currentEventQueue = null;
        }
      }
      try {
        (currentEventQueue = createEventQueue()),
          releaseOwnershipForEventComponentInstance(updateQueue),
          processEventQueue();
      } finally {
        currentEventQueue = null;
      }
      void 0 !== effect.onOwnershipChange &&
        ownershipChangeListeners.delete(updateQueue);
      effect = updateQueue.rootEventTypes;
      if (null !== effect)
        for (
          effect = Array.from(effect), destroy = 0;
          destroy < effect.length;
          destroy++
        )
          (current$$1 = rootEventTypesToEventComponentInstances.get(
            effect[destroy]
          )),
            void 0 !== current$$1 && current$$1.delete(updateQueue);
      current$$1$jscomp$0.stateNode = null;
  }
}
function isHostParent(fiber) {
  return 5 === fiber.tag || 3 === fiber.tag || 4 === fiber.tag;
}
function commitPlacement(finishedWork) {
  a: {
    for (var parent = finishedWork.return; null !== parent; ) {
      if (isHostParent(parent)) {
        var parentFiber = parent;
        break a;
      }
      parent = parent.return;
    }
    throw ReactErrorProd(Error(160));
  }
  switch (parentFiber.tag) {
    case 5:
      parent = parentFiber.stateNode;
      var isContainer = !1;
      break;
    case 3:
      parent = parentFiber.stateNode.containerInfo;
      isContainer = !0;
      break;
    case 4:
      parent = parentFiber.stateNode.containerInfo;
      isContainer = !0;
      break;
    default:
      throw ReactErrorProd(Error(161));
  }
  parentFiber.effectTag & 16 &&
    (setTextContent(parent, ""), (parentFiber.effectTag &= -17));
  a: b: for (parentFiber = finishedWork; ; ) {
    for (; null === parentFiber.sibling; ) {
      if (null === parentFiber.return || isHostParent(parentFiber.return)) {
        parentFiber = null;
        break a;
      }
      parentFiber = parentFiber.return;
    }
    parentFiber.sibling.return = parentFiber.return;
    for (
      parentFiber = parentFiber.sibling;
      5 !== parentFiber.tag && 6 !== parentFiber.tag && 18 !== parentFiber.tag;

    ) {
      if (parentFiber.effectTag & 2) continue b;
      if (null === parentFiber.child || 4 === parentFiber.tag) continue b;
      else
        (parentFiber.child.return = parentFiber),
          (parentFiber = parentFiber.child);
    }
    if (!(parentFiber.effectTag & 2)) {
      parentFiber = parentFiber.stateNode;
      break a;
    }
  }
  for (var node = finishedWork; ; ) {
    if (5 === node.tag || 6 === node.tag) {
      var stateNode = node.stateNode;
      if (parentFiber)
        if (isContainer) {
          var container = parent,
            child = stateNode;
          stateNode = parentFiber;
          8 === container.nodeType
            ? container.parentNode.insertBefore(child, stateNode)
            : container.insertBefore(child, stateNode);
        } else parent.insertBefore(stateNode, parentFiber);
      else
        isContainer
          ? ((child = parent),
            8 === child.nodeType
              ? ((container = child.parentNode),
                container.insertBefore(stateNode, child))
              : ((container = child), container.appendChild(stateNode)),
            (child = child._reactRootContainer),
            (null !== child && void 0 !== child) ||
              null !== container.onclick ||
              (container.onclick = noop))
          : parent.appendChild(stateNode);
    } else if (4 !== node.tag && null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === finishedWork) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === finishedWork) return;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function unmountHostComponents(current$$1) {
  for (
    var node = current$$1,
      currentParentIsValid = !1,
      currentParent = void 0,
      currentParentIsContainer = void 0;
    ;

  ) {
    if (!currentParentIsValid) {
      currentParentIsValid = node.return;
      a: for (;;) {
        if (null === currentParentIsValid) throw ReactErrorProd(Error(160));
        switch (currentParentIsValid.tag) {
          case 5:
            currentParent = currentParentIsValid.stateNode;
            currentParentIsContainer = !1;
            break a;
          case 3:
            currentParent = currentParentIsValid.stateNode.containerInfo;
            currentParentIsContainer = !0;
            break a;
          case 4:
            currentParent = currentParentIsValid.stateNode.containerInfo;
            currentParentIsContainer = !0;
            break a;
        }
        currentParentIsValid = currentParentIsValid.return;
      }
      currentParentIsValid = !0;
    }
    if (5 === node.tag || 6 === node.tag) {
      a: for (var root = node, node$jscomp$0 = root; ; )
        if (
          (commitUnmount(node$jscomp$0),
          null !== node$jscomp$0.child && 4 !== node$jscomp$0.tag)
        )
          (node$jscomp$0.child.return = node$jscomp$0),
            (node$jscomp$0 = node$jscomp$0.child);
        else {
          if (node$jscomp$0 === root) break;
          for (; null === node$jscomp$0.sibling; ) {
            if (null === node$jscomp$0.return || node$jscomp$0.return === root)
              break a;
            node$jscomp$0 = node$jscomp$0.return;
          }
          node$jscomp$0.sibling.return = node$jscomp$0.return;
          node$jscomp$0 = node$jscomp$0.sibling;
        }
      currentParentIsContainer
        ? ((root = currentParent),
          (node$jscomp$0 = node.stateNode),
          8 === root.nodeType
            ? root.parentNode.removeChild(node$jscomp$0)
            : root.removeChild(node$jscomp$0))
        : currentParent.removeChild(node.stateNode);
    } else if (18 === node.tag)
      currentParentIsContainer
        ? ((root = currentParent),
          (node$jscomp$0 = node.stateNode),
          8 === root.nodeType
            ? clearSuspenseBoundary(root.parentNode, node$jscomp$0)
            : 1 === root.nodeType && clearSuspenseBoundary(root, node$jscomp$0))
        : clearSuspenseBoundary(currentParent, node.stateNode);
    else if (4 === node.tag) {
      if (null !== node.child) {
        currentParent = node.stateNode.containerInfo;
        currentParentIsContainer = !0;
        node.child.return = node;
        node = node.child;
        continue;
      }
    } else if ((commitUnmount(node), null !== node.child)) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === current$$1) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === current$$1) return;
      node = node.return;
      4 === node.tag && (currentParentIsValid = !1);
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
}
function commitWork(current$$1, finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      commitHookEffectList(UnmountMutation, MountMutation, finishedWork);
      break;
    case 1:
      break;
    case 5:
      var instance = finishedWork.stateNode;
      if (null != instance) {
        var newProps = finishedWork.memoizedProps,
          oldProps = null !== current$$1 ? current$$1.memoizedProps : newProps;
        current$$1 = finishedWork.type;
        var updatePayload = finishedWork.updateQueue;
        finishedWork.updateQueue = null;
        if (null !== updatePayload) {
          instance[internalEventHandlersKey] = newProps;
          "input" === current$$1 &&
            "radio" === newProps.type &&
            null != newProps.name &&
            updateChecked(instance, newProps);
          isCustomComponent(current$$1, oldProps);
          finishedWork = isCustomComponent(current$$1, newProps);
          for (oldProps = 0; oldProps < updatePayload.length; oldProps += 2) {
            var propKey = updatePayload[oldProps],
              propValue = updatePayload[oldProps + 1];
            "style" === propKey
              ? setValueForStyles(instance, propValue)
              : "dangerouslySetInnerHTML" === propKey
                ? setInnerHTML(instance, propValue)
                : "children" === propKey
                  ? setTextContent(instance, propValue)
                  : setValueForProperty(
                      instance,
                      propKey,
                      propValue,
                      finishedWork
                    );
          }
          switch (current$$1) {
            case "input":
              updateWrapper(instance, newProps);
              break;
            case "textarea":
              updateWrapper$1(instance, newProps);
              break;
            case "select":
              (finishedWork = instance._wrapperState.wasMultiple),
                (instance._wrapperState.wasMultiple = !!newProps.multiple),
                (current$$1 = newProps.value),
                null != current$$1
                  ? updateOptions(instance, !!newProps.multiple, current$$1, !1)
                  : finishedWork !== !!newProps.multiple &&
                    (null != newProps.defaultValue
                      ? updateOptions(
                          instance,
                          !!newProps.multiple,
                          newProps.defaultValue,
                          !0
                        )
                      : updateOptions(
                          instance,
                          !!newProps.multiple,
                          newProps.multiple ? [] : "",
                          !1
                        ));
          }
        }
      }
      break;
    case 6:
      if (null === finishedWork.stateNode) throw ReactErrorProd(Error(162));
      finishedWork.stateNode.nodeValue = finishedWork.memoizedProps;
      break;
    case 3:
      break;
    case 12:
      break;
    case 13:
      instance = finishedWork;
      null === finishedWork.memoizedState
        ? (newProps = !1)
        : ((newProps = !0),
          (instance = finishedWork.child),
          (globalMostRecentFallbackTime = now()));
      if (null !== instance)
        a: for (current$$1 = instance; ; ) {
          if (5 === current$$1.tag)
            (updatePayload = current$$1.stateNode),
              newProps
                ? ((updatePayload = updatePayload.style),
                  "function" === typeof updatePayload.setProperty
                    ? updatePayload.setProperty("display", "none", "important")
                    : (updatePayload.display = "none"))
                : ((updatePayload = current$$1.stateNode),
                  (oldProps = current$$1.memoizedProps.style),
                  (oldProps =
                    void 0 !== oldProps &&
                    null !== oldProps &&
                    oldProps.hasOwnProperty("display")
                      ? oldProps.display
                      : null),
                  (updatePayload.style.display = dangerousStyleValue(
                    "display",
                    oldProps
                  )));
          else if (6 === current$$1.tag)
            current$$1.stateNode.nodeValue = newProps
              ? ""
              : current$$1.memoizedProps;
          else if (13 === current$$1.tag && null !== current$$1.memoizedState) {
            updatePayload = current$$1.child.sibling;
            updatePayload.return = current$$1;
            current$$1 = updatePayload;
            continue;
          } else if (null !== current$$1.child) {
            current$$1.child.return = current$$1;
            current$$1 = current$$1.child;
            continue;
          }
          if (current$$1 === instance) break a;
          for (; null === current$$1.sibling; ) {
            if (null === current$$1.return || current$$1.return === instance)
              break a;
            current$$1 = current$$1.return;
          }
          current$$1.sibling.return = current$$1.return;
          current$$1 = current$$1.sibling;
        }
      attachSuspenseRetryListeners(finishedWork);
      break;
    case 21:
      attachSuspenseRetryListeners(finishedWork);
      break;
    case 17:
      break;
    case 19:
      break;
    default:
      throw ReactErrorProd(Error(163));
  }
}
function attachSuspenseRetryListeners(finishedWork) {
  var thenables = finishedWork.updateQueue;
  if (null !== thenables) {
    finishedWork.updateQueue = null;
    var retryCache = finishedWork.stateNode;
    null === retryCache &&
      (retryCache = finishedWork.stateNode = new PossiblyWeakSet$1());
    thenables.forEach(function(thenable) {
      var retry = resolveRetryThenable.bind(null, finishedWork, thenable);
      retryCache.has(thenable) ||
        (retryCache.add(thenable), thenable.then(retry, retry));
    });
  }
}
var PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set,
  PossiblyWeakMap$2 = "function" === typeof WeakMap ? WeakMap : Map;
function createRootErrorUpdate(fiber, errorInfo, expirationTime) {
  expirationTime = createUpdate(expirationTime, null);
  expirationTime.tag = 3;
  expirationTime.payload = { element: null };
  var error = errorInfo.value;
  expirationTime.callback = function() {
    hasUncaughtError || ((hasUncaughtError = !0), (firstUncaughtError = error));
    logError(fiber, errorInfo);
  };
  return expirationTime;
}
function createClassErrorUpdate(fiber, errorInfo, expirationTime) {
  expirationTime = createUpdate(expirationTime, null);
  expirationTime.tag = 3;
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if ("function" === typeof getDerivedStateFromError) {
    var error = errorInfo.value;
    expirationTime.payload = function() {
      logError(fiber, errorInfo);
      return getDerivedStateFromError(error);
    };
  }
  var inst = fiber.stateNode;
  null !== inst &&
    "function" === typeof inst.componentDidCatch &&
    (expirationTime.callback = function() {
      "function" !== typeof getDerivedStateFromError &&
        (null === legacyErrorBoundariesThatAlreadyFailed
          ? (legacyErrorBoundariesThatAlreadyFailed = new Set([this]))
          : legacyErrorBoundariesThatAlreadyFailed.add(this),
        logError(fiber, errorInfo));
      var stack = errorInfo.stack;
      this.componentDidCatch(errorInfo.value, {
        componentStack: null !== stack ? stack : ""
      });
    });
  return expirationTime;
}
function attachPingListener(root, renderExpirationTime, thenable) {
  var pingCache = root.pingCache;
  if (null === pingCache) {
    pingCache = root.pingCache = new PossiblyWeakMap$2();
    var threadIDs = new Set();
    pingCache.set(thenable, threadIDs);
  } else
    (threadIDs = pingCache.get(thenable)),
      void 0 === threadIDs &&
        ((threadIDs = new Set()), pingCache.set(thenable, threadIDs));
  threadIDs.has(renderExpirationTime) ||
    (threadIDs.add(renderExpirationTime),
    (root = pingSuspendedRoot.bind(null, root, thenable, renderExpirationTime)),
    thenable.then(root, root));
}
var ceil = Math.ceil,
  ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher,
  ReactCurrentOwner$2 = ReactSharedInternals.ReactCurrentOwner,
  NoContext = 0,
  LegacyUnbatchedContext = 8,
  RenderContext = 16,
  CommitContext = 32,
  RootIncomplete = 0,
  RootErrored = 1,
  RootSuspended = 2,
  RootSuspendedWithDelay = 3,
  RootCompleted = 4,
  executionContext = NoContext,
  workInProgressRoot = null,
  workInProgress = null,
  renderExpirationTime = 0,
  workInProgressRootExitStatus = RootIncomplete,
  workInProgressRootLatestProcessedExpirationTime = 1073741823,
  workInProgressRootLatestSuspenseTimeout = 1073741823,
  workInProgressRootCanSuspendUsingConfig = null,
  workInProgressRootHasPendingPing = !1,
  globalMostRecentFallbackTime = 0,
  FALLBACK_THROTTLE_MS = 500,
  nextEffect = null,
  hasUncaughtError = !1,
  firstUncaughtError = null,
  legacyErrorBoundariesThatAlreadyFailed = null,
  rootDoesHavePassiveEffects = !1,
  rootWithPendingPassiveEffects = null,
  rootsWithPendingDiscreteUpdates = null,
  nestedUpdateCount = 0,
  rootWithNestedUpdates = null,
  interruptedBy = null,
  currentEventTime = 0;
function requestCurrentTime() {
  return (executionContext & (RenderContext | CommitContext)) !== NoContext
    ? 1073741821 - ((now() / 10) | 0)
    : 0 !== currentEventTime
      ? currentEventTime
      : (currentEventTime = 1073741821 - ((now() / 10) | 0));
}
function computeExpirationForFiber(currentTime, fiber, suspenseConfig) {
  fiber = fiber.mode;
  if (0 === (fiber & 2)) return 1073741823;
  var priorityLevel = getCurrentPriorityLevel();
  if (0 === (fiber & 4)) return 99 === priorityLevel ? 1073741823 : 1073741822;
  if ((executionContext & RenderContext) !== NoContext)
    return renderExpirationTime;
  if (null !== suspenseConfig)
    currentTime =
      1073741821 -
      25 *
        ((((1073741821 -
          currentTime +
          (suspenseConfig.timeoutMs | 0 || 5e3) / 10) /
          25) |
          0) +
          1);
  else
    switch (priorityLevel) {
      case 99:
        currentTime = 1073741823;
        break;
      case 98:
        currentTime =
          1073741821 - 10 * ((((1073741821 - currentTime + 15) / 10) | 0) + 1);
        break;
      case 97:
      case 96:
        currentTime =
          1073741821 - 25 * ((((1073741821 - currentTime + 500) / 25) | 0) + 1);
        break;
      case 95:
        currentTime = 1;
        break;
      default:
        throw ReactErrorProd(Error(326));
    }
  null !== workInProgressRoot &&
    currentTime === renderExpirationTime &&
    --currentTime;
  return currentTime;
}
var lastUniqueAsyncExpiration = 0;
function scheduleUpdateOnFiber(fiber, expirationTime) {
  if (50 < nestedUpdateCount)
    throw ((nestedUpdateCount = 0),
    (rootWithNestedUpdates = null),
    ReactErrorProd(Error(185)));
  var root = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
  if (null !== root) {
    root.pingTime = 0;
    enableUserTimingAPI &&
      null !== workInProgressRoot &&
      expirationTime > renderExpirationTime &&
      (interruptedBy = fiber);
    enableUserTimingAPI &&
      (isCommitting && (hasScheduledUpdateInCurrentCommit = !0),
      null !== currentPhase &&
        "componentWillMount" !== currentPhase &&
        "componentWillReceiveProps" !== currentPhase &&
        (hasScheduledUpdateInCurrentPhase = !0));
    fiber = getCurrentPriorityLevel();
    if (1073741823 === expirationTime)
      if (
        (executionContext & LegacyUnbatchedContext) !== NoContext &&
        (executionContext & (RenderContext | CommitContext)) === NoContext
      )
        for (
          var callback = renderRoot(root, 1073741823, !0);
          null !== callback;

        )
          callback = callback(!0);
      else
        scheduleCallbackForRoot(root, 99, 1073741823),
          executionContext === NoContext && flushSyncCallbackQueue();
    else scheduleCallbackForRoot(root, fiber, expirationTime);
    (executionContext & 4) === NoContext ||
      (98 !== fiber && 99 !== fiber) ||
      (null === rootsWithPendingDiscreteUpdates
        ? (rootsWithPendingDiscreteUpdates = new Map([[root, expirationTime]]))
        : ((fiber = rootsWithPendingDiscreteUpdates.get(root)),
          (void 0 === fiber || fiber > expirationTime) &&
            rootsWithPendingDiscreteUpdates.set(root, expirationTime)));
  }
}
function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
  fiber.expirationTime < expirationTime &&
    (fiber.expirationTime = expirationTime);
  var alternate = fiber.alternate;
  null !== alternate &&
    alternate.expirationTime < expirationTime &&
    (alternate.expirationTime = expirationTime);
  var node = fiber.return,
    root = null;
  if (null === node && 3 === fiber.tag) root = fiber.stateNode;
  else
    for (; null !== node; ) {
      alternate = node.alternate;
      node.childExpirationTime < expirationTime &&
        (node.childExpirationTime = expirationTime);
      null !== alternate &&
        alternate.childExpirationTime < expirationTime &&
        (alternate.childExpirationTime = expirationTime);
      if (null === node.return && 3 === node.tag) {
        root = node.stateNode;
        break;
      }
      node = node.return;
    }
  null !== root &&
    (expirationTime > root.firstPendingTime &&
      (root.firstPendingTime = expirationTime),
    (fiber = root.lastPendingTime),
    0 === fiber || expirationTime < fiber) &&
    (root.lastPendingTime = expirationTime);
  return root;
}
function scheduleCallbackForRoot(root, priorityLevel, expirationTime) {
  if (root.callbackExpirationTime < expirationTime) {
    var existingCallbackNode = root.callbackNode;
    null !== existingCallbackNode &&
      existingCallbackNode !== fakeCallbackNode &&
      Scheduler_cancelCallback(existingCallbackNode);
    root.callbackExpirationTime = expirationTime;
    1073741823 === expirationTime
      ? (root.callbackNode = scheduleSyncCallback(
          runRootCallback.bind(
            null,
            root,
            renderRoot.bind(null, root, expirationTime)
          )
        ))
      : ((existingCallbackNode = null),
        1 !== expirationTime &&
          (existingCallbackNode = {
            timeout: 10 * (1073741821 - expirationTime) - now()
          }),
        (root.callbackNode = scheduleCallback(
          priorityLevel,
          runRootCallback.bind(
            null,
            root,
            renderRoot.bind(null, root, expirationTime)
          ),
          existingCallbackNode
        )),
        enableUserTimingAPI &&
          1073741823 !== expirationTime &&
          (executionContext & (RenderContext | CommitContext)) === NoContext &&
          startRequestCallbackTimer());
  }
}
function runRootCallback(root, callback, isSync) {
  var prevCallbackNode = root.callbackNode,
    continuation = null;
  try {
    return (
      (continuation = callback(isSync)),
      null !== continuation
        ? runRootCallback.bind(null, root, continuation)
        : null
    );
  } finally {
    null === continuation &&
      prevCallbackNode === root.callbackNode &&
      ((root.callbackNode = null), (root.callbackExpirationTime = 0));
  }
}
function flushDiscreteUpdates() {
  (executionContext & (1 | RenderContext | CommitContext)) === NoContext &&
    (flushPendingDiscreteUpdates(),
    revertPassiveEffectsChange || flushPassiveEffects());
}
function resolveLocksOnRoot(root, expirationTime) {
  var firstBatch = root.firstBatch;
  return null !== firstBatch &&
    firstBatch._defer &&
    firstBatch._expirationTime >= expirationTime
    ? (scheduleCallback(97, function() {
        firstBatch._onComplete();
        return null;
      }),
      !0)
    : !1;
}
function flushPendingDiscreteUpdates() {
  if (null !== rootsWithPendingDiscreteUpdates) {
    var roots = rootsWithPendingDiscreteUpdates;
    rootsWithPendingDiscreteUpdates = null;
    roots.forEach(function(expirationTime, root) {
      scheduleSyncCallback(renderRoot.bind(null, root, expirationTime));
    });
    flushSyncCallbackQueue();
  }
}
function batchedUpdates$1(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= 1;
  try {
    return fn(a);
  } finally {
    (executionContext = prevExecutionContext),
      executionContext === NoContext && flushSyncCallbackQueue();
  }
}
function discreteUpdates$1(fn, a, b, c) {
  var prevExecutionContext = executionContext;
  executionContext |= 4;
  try {
    return runWithPriority$2(98, fn.bind(null, a, b, c));
  } finally {
    (executionContext = prevExecutionContext),
      executionContext === NoContext && flushSyncCallbackQueue();
  }
}
function unbatchedUpdates(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext &= -2;
  executionContext |= LegacyUnbatchedContext;
  try {
    return fn(a);
  } finally {
    (executionContext = prevExecutionContext),
      executionContext === NoContext && flushSyncCallbackQueue();
  }
}
function prepareFreshStack(root, expirationTime) {
  root.finishedWork = null;
  root.finishedExpirationTime = 0;
  var timeoutHandle = root.timeoutHandle;
  -1 !== timeoutHandle &&
    ((root.timeoutHandle = -1), cancelTimeout(timeoutHandle));
  if (null !== workInProgress)
    for (timeoutHandle = workInProgress.return; null !== timeoutHandle; ) {
      var interruptedWork = timeoutHandle;
      switch (interruptedWork.tag) {
        case 1:
          var childContextTypes = interruptedWork.type.childContextTypes;
          null !== childContextTypes &&
            void 0 !== childContextTypes &&
            popContext(interruptedWork);
          break;
        case 3:
          popHostContainer(interruptedWork);
          popTopLevelContextObject(interruptedWork);
          break;
        case 5:
          popHostContext(interruptedWork);
          break;
        case 4:
          popHostContainer(interruptedWork);
          break;
        case 13:
          popSuspenseContext(interruptedWork);
          break;
        case 18:
          popSuspenseContext(interruptedWork);
          break;
        case 21:
          popSuspenseContext(interruptedWork);
          break;
        case 10:
          popProvider(interruptedWork);
          break;
        case 19:
          popHostContext(interruptedWork);
      }
      timeoutHandle = timeoutHandle.return;
    }
  workInProgressRoot = root;
  workInProgress = createWorkInProgress(root.current, null, expirationTime);
  renderExpirationTime = expirationTime;
  workInProgressRootExitStatus = RootIncomplete;
  workInProgressRootLatestSuspenseTimeout = workInProgressRootLatestProcessedExpirationTime = 1073741823;
  workInProgressRootCanSuspendUsingConfig = null;
  workInProgressRootHasPendingPing = !1;
}
function renderRoot(root$jscomp$0, expirationTime, isSync) {
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
    throw ReactErrorProd(Error(327));
  enableUserTimingAPI &&
    1073741823 !== expirationTime &&
    enableUserTimingAPI &&
    supportsUserTiming &&
    ((isWaitingForCallback = !1),
    endMark(
      "(Waiting for async callback...)",
      "(Waiting for async callback...)",
      isSync ? "Update expired; will flush synchronously" : null
    ));
  if (root$jscomp$0.firstPendingTime < expirationTime) return null;
  if (isSync && root$jscomp$0.finishedExpirationTime === expirationTime)
    return commitRoot.bind(null, root$jscomp$0);
  flushPassiveEffects();
  if (
    root$jscomp$0 !== workInProgressRoot ||
    expirationTime !== renderExpirationTime
  )
    prepareFreshStack(root$jscomp$0, expirationTime);
  else if (workInProgressRootExitStatus === RootSuspendedWithDelay)
    if (workInProgressRootHasPendingPing)
      prepareFreshStack(root$jscomp$0, expirationTime);
    else {
      var lastPendingTime = root$jscomp$0.lastPendingTime;
      if (lastPendingTime < expirationTime)
        return renderRoot.bind(null, root$jscomp$0, lastPendingTime);
    }
  if (null !== workInProgress) {
    lastPendingTime = executionContext;
    executionContext |= RenderContext;
    var prevDispatcher = ReactCurrentDispatcher.current;
    null === prevDispatcher && (prevDispatcher = ContextOnlyDispatcher);
    ReactCurrentDispatcher.current = ContextOnlyDispatcher;
    enableUserTimingAPI &&
      ((currentFiber = workInProgress),
      supportsUserTiming &&
        ((commitCountInCurrentWorkLoop = 0),
        beginMark("(React Tree Reconciliation)"),
        null !== currentFiber && resumeTimersRecursively(currentFiber)));
    if (isSync) {
      if (1073741823 !== expirationTime) {
        var currentTime = requestCurrentTime();
        if (currentTime < expirationTime)
          return (
            (executionContext = lastPendingTime),
            resetContextDependencies(),
            (ReactCurrentDispatcher.current = prevDispatcher),
            renderRoot.bind(null, root$jscomp$0, currentTime)
          );
      }
    } else currentEventTime = 0;
    do
      try {
        if (isSync)
          for (; null !== workInProgress; )
            workInProgress = performUnitOfWork(workInProgress);
        else
          for (; null !== workInProgress && !Scheduler_shouldYield(); )
            workInProgress = performUnitOfWork(workInProgress);
        break;
      } catch (thrownValue) {
        resetContextDependencies();
        resetHooks();
        currentTime = workInProgress;
        if (null === currentTime || null === currentTime.return)
          throw (prepareFreshStack(root$jscomp$0, expirationTime),
          (executionContext = lastPendingTime),
          thrownValue);
        a: {
          var root = root$jscomp$0,
            returnFiber = currentTime.return,
            sourceFiber = currentTime,
            value = thrownValue,
            renderExpirationTime$jscomp$0 = renderExpirationTime;
          sourceFiber.effectTag |= 1024;
          sourceFiber.firstEffect = sourceFiber.lastEffect = null;
          if (
            null !== value &&
            "object" === typeof value &&
            "function" === typeof value.then
          ) {
            var hasInvisibleParentBoundary =
                0 !==
                (suspenseStackCursor.current & InvisibleParentSuspenseContext),
              _workInProgress = returnFiber;
            do {
              var JSCompiler_temp;
              if ((JSCompiler_temp = 13 === _workInProgress.tag))
                null !== _workInProgress.memoizedState
                  ? (JSCompiler_temp = !1)
                  : ((JSCompiler_temp = _workInProgress.memoizedProps),
                    (JSCompiler_temp =
                      void 0 === JSCompiler_temp.fallback
                        ? !1
                        : !0 !== JSCompiler_temp.unstable_avoidThisFallback
                          ? !0
                          : hasInvisibleParentBoundary
                            ? !1
                            : !0));
              if (JSCompiler_temp) {
                returnFiber = _workInProgress.updateQueue;
                null === returnFiber
                  ? ((returnFiber = new Set()),
                    returnFiber.add(value),
                    (_workInProgress.updateQueue = returnFiber))
                  : returnFiber.add(value);
                if (0 === (_workInProgress.mode & 2)) {
                  _workInProgress.effectTag |= 64;
                  sourceFiber.effectTag &= -1957;
                  1 === sourceFiber.tag &&
                    (null === sourceFiber.alternate
                      ? (sourceFiber.tag = 17)
                      : ((renderExpirationTime$jscomp$0 = createUpdate(
                          1073741823,
                          null
                        )),
                        (renderExpirationTime$jscomp$0.tag = 2),
                        enqueueUpdate(
                          sourceFiber,
                          renderExpirationTime$jscomp$0
                        )));
                  sourceFiber.expirationTime = 1073741823;
                  break a;
                }
                attachPingListener(root, renderExpirationTime$jscomp$0, value);
                _workInProgress.effectTag |= 2048;
                _workInProgress.expirationTime = renderExpirationTime$jscomp$0;
                break a;
              }
              if (18 === _workInProgress.tag) {
                attachPingListener(root, renderExpirationTime$jscomp$0, value);
                sourceFiber = _workInProgress.memoizedState;
                if (null === sourceFiber) {
                  sourceFiber = _workInProgress.memoizedState = new PossiblyWeakSet();
                  root = _workInProgress.alternate;
                  if (!root) throw ReactErrorProd(Error(319));
                  root.memoizedState = sourceFiber;
                }
                sourceFiber.has(value) ||
                  (sourceFiber.add(value),
                  (sourceFiber = resolveRetryThenable.bind(
                    null,
                    _workInProgress,
                    value
                  )),
                  value.then(sourceFiber, sourceFiber));
                _workInProgress.effectTag |= 2048;
                _workInProgress.expirationTime = renderExpirationTime$jscomp$0;
                break a;
              }
              _workInProgress = _workInProgress.return;
            } while (null !== _workInProgress);
            value = Error(
              (getComponentName(sourceFiber.type) || "A React component") +
                " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
                getStackByFiberInDevAndProd(sourceFiber)
            );
          }
          workInProgressRootExitStatus !== RootCompleted &&
            (workInProgressRootExitStatus = RootErrored);
          value = createCapturedValue(value, sourceFiber);
          _workInProgress = returnFiber;
          do {
            switch (_workInProgress.tag) {
              case 3:
                _workInProgress.effectTag |= 2048;
                _workInProgress.expirationTime = renderExpirationTime$jscomp$0;
                renderExpirationTime$jscomp$0 = createRootErrorUpdate(
                  _workInProgress,
                  value,
                  renderExpirationTime$jscomp$0
                );
                enqueueCapturedUpdate(
                  _workInProgress,
                  renderExpirationTime$jscomp$0
                );
                break a;
              case 1:
                if (
                  ((sourceFiber = value),
                  (root = _workInProgress.type),
                  (returnFiber = _workInProgress.stateNode),
                  0 === (_workInProgress.effectTag & 64) &&
                    ("function" === typeof root.getDerivedStateFromError ||
                      (null !== returnFiber &&
                        "function" === typeof returnFiber.componentDidCatch &&
                        (null === legacyErrorBoundariesThatAlreadyFailed ||
                          !legacyErrorBoundariesThatAlreadyFailed.has(
                            returnFiber
                          )))))
                ) {
                  _workInProgress.effectTag |= 2048;
                  _workInProgress.expirationTime = renderExpirationTime$jscomp$0;
                  renderExpirationTime$jscomp$0 = createClassErrorUpdate(
                    _workInProgress,
                    sourceFiber,
                    renderExpirationTime$jscomp$0
                  );
                  enqueueCapturedUpdate(
                    _workInProgress,
                    renderExpirationTime$jscomp$0
                  );
                  break a;
                }
            }
            _workInProgress = _workInProgress.return;
          } while (null !== _workInProgress);
        }
        workInProgress = completeUnitOfWork(currentTime);
      }
    while (1);
    executionContext = lastPendingTime;
    resetContextDependencies();
    ReactCurrentDispatcher.current = prevDispatcher;
    if (null !== workInProgress)
      return (
        stopWorkLoopTimer(interruptedBy, !1),
        (interruptedBy = null),
        1073741823 !== expirationTime && startRequestCallbackTimer(),
        renderRoot.bind(null, root$jscomp$0, expirationTime)
      );
  }
  stopWorkLoopTimer(interruptedBy, !0);
  interruptedBy = null;
  root$jscomp$0.finishedWork = root$jscomp$0.current.alternate;
  root$jscomp$0.finishedExpirationTime = expirationTime;
  if (resolveLocksOnRoot(root$jscomp$0, expirationTime)) return null;
  workInProgressRoot = null;
  switch (workInProgressRootExitStatus) {
    case RootIncomplete:
      throw ReactErrorProd(Error(328));
    case RootErrored:
      return (
        (lastPendingTime = root$jscomp$0.lastPendingTime),
        lastPendingTime < expirationTime
          ? renderRoot.bind(null, root$jscomp$0, lastPendingTime)
          : isSync
            ? commitRoot.bind(null, root$jscomp$0)
            : (prepareFreshStack(root$jscomp$0, expirationTime),
              scheduleSyncCallback(
                renderRoot.bind(null, root$jscomp$0, expirationTime)
              ),
              null)
      );
    case RootSuspended:
      if (
        1073741823 === workInProgressRootLatestProcessedExpirationTime &&
        !isSync &&
        ((isSync = globalMostRecentFallbackTime + FALLBACK_THROTTLE_MS - now()),
        10 < isSync)
      ) {
        if (workInProgressRootHasPendingPing)
          return (
            prepareFreshStack(root$jscomp$0, expirationTime),
            renderRoot.bind(null, root$jscomp$0, expirationTime)
          );
        lastPendingTime = root$jscomp$0.lastPendingTime;
        if (lastPendingTime < expirationTime)
          return renderRoot.bind(null, root$jscomp$0, lastPendingTime);
        root$jscomp$0.timeoutHandle = scheduleTimeout(
          commitRoot.bind(null, root$jscomp$0),
          isSync
        );
        return null;
      }
      return commitRoot.bind(null, root$jscomp$0);
    case RootSuspendedWithDelay:
      if (!isSync) {
        if (workInProgressRootHasPendingPing)
          return (
            prepareFreshStack(root$jscomp$0, expirationTime),
            renderRoot.bind(null, root$jscomp$0, expirationTime)
          );
        isSync = root$jscomp$0.lastPendingTime;
        if (isSync < expirationTime)
          return renderRoot.bind(null, root$jscomp$0, isSync);
        1073741823 !== workInProgressRootLatestSuspenseTimeout
          ? (isSync =
              10 * (1073741821 - workInProgressRootLatestSuspenseTimeout) -
              now())
          : 1073741823 === workInProgressRootLatestProcessedExpirationTime
            ? (isSync = 0)
            : ((isSync =
                10 *
                  (1073741821 -
                    workInProgressRootLatestProcessedExpirationTime) -
                5e3),
              (lastPendingTime = now()),
              (expirationTime =
                10 * (1073741821 - expirationTime) - lastPendingTime),
              (isSync = lastPendingTime - isSync),
              0 > isSync && (isSync = 0),
              (isSync =
                (120 > isSync
                  ? 120
                  : 480 > isSync
                    ? 480
                    : 1080 > isSync
                      ? 1080
                      : 1920 > isSync
                        ? 1920
                        : 3e3 > isSync
                          ? 3e3
                          : 4320 > isSync
                            ? 4320
                            : 1960 * ceil(isSync / 1960)) - isSync),
              expirationTime < isSync && (isSync = expirationTime));
        if (10 < isSync)
          return (
            (root$jscomp$0.timeoutHandle = scheduleTimeout(
              commitRoot.bind(null, root$jscomp$0),
              isSync
            )),
            null
          );
      }
      return commitRoot.bind(null, root$jscomp$0);
    case RootCompleted:
      return !isSync &&
        1073741823 !== workInProgressRootLatestProcessedExpirationTime &&
        null !== workInProgressRootCanSuspendUsingConfig &&
        ((lastPendingTime = workInProgressRootLatestProcessedExpirationTime),
        (prevDispatcher = workInProgressRootCanSuspendUsingConfig),
        (expirationTime = prevDispatcher.busyMinDurationMs | 0),
        0 >= expirationTime
          ? (expirationTime = 0)
          : ((isSync = prevDispatcher.busyDelayMs | 0),
            (lastPendingTime =
              now() -
              (10 * (1073741821 - lastPendingTime) -
                (prevDispatcher.timeoutMs | 0 || 5e3))),
            (expirationTime =
              lastPendingTime <= isSync
                ? 0
                : isSync + expirationTime - lastPendingTime)),
        10 < expirationTime)
        ? ((root$jscomp$0.timeoutHandle = scheduleTimeout(
            commitRoot.bind(null, root$jscomp$0),
            expirationTime
          )),
          null)
        : commitRoot.bind(null, root$jscomp$0);
    default:
      throw ReactErrorProd(Error(329));
  }
}
function markRenderEventTimeAndConfig(expirationTime, suspenseConfig) {
  expirationTime < workInProgressRootLatestProcessedExpirationTime &&
    1 < expirationTime &&
    (workInProgressRootLatestProcessedExpirationTime = expirationTime);
  null !== suspenseConfig &&
    expirationTime < workInProgressRootLatestSuspenseTimeout &&
    1 < expirationTime &&
    ((workInProgressRootLatestSuspenseTimeout = expirationTime),
    (workInProgressRootCanSuspendUsingConfig = suspenseConfig));
}
function performUnitOfWork(unitOfWork) {
  var current$$1 = unitOfWork.alternate;
  startWorkTimer(unitOfWork);
  current$$1 = beginWork$$1(current$$1, unitOfWork, renderExpirationTime);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  null === current$$1 && (current$$1 = completeUnitOfWork(unitOfWork));
  ReactCurrentOwner$2.current = null;
  return current$$1;
}
function completeUnitOfWork(unitOfWork) {
  workInProgress = unitOfWork;
  do {
    var current$$1 = workInProgress.alternate;
    unitOfWork = workInProgress.return;
    if (0 === (workInProgress.effectTag & 1024)) {
      a: {
        var current = current$$1;
        current$$1 = workInProgress;
        var renderExpirationTime$jscomp$0 = renderExpirationTime,
          newProps = current$$1.pendingProps;
        switch (current$$1.tag) {
          case 2:
            break;
          case 16:
            break;
          case 15:
          case 0:
            break;
          case 1:
            isContextProvider(current$$1.type) && popContext(current$$1);
            break;
          case 3:
            popHostContainer(current$$1);
            popTopLevelContextObject(current$$1);
            newProps = current$$1.stateNode;
            newProps.pendingContext &&
              ((newProps.context = newProps.pendingContext),
              (newProps.pendingContext = null));
            if (null === current || null === current.child)
              popHydrationState(current$$1), (current$$1.effectTag &= -3);
            updateHostContainer(current$$1);
            break;
          case 5:
            popHostContext(current$$1);
            renderExpirationTime$jscomp$0 = requiredContext(
              rootInstanceStackCursor.current
            );
            var type = current$$1.type;
            if (null !== current && null != current$$1.stateNode)
              updateHostComponent$1(
                current,
                current$$1,
                type,
                newProps,
                renderExpirationTime$jscomp$0
              ),
                current.ref !== current$$1.ref && (current$$1.effectTag |= 128);
            else if (newProps) {
              var currentHostContext = requiredContext(
                contextStackCursor$1.current
              );
              if (popHydrationState(current$$1)) {
                newProps = current$$1;
                current = void 0;
                type = newProps.stateNode;
                var type$jscomp$0 = newProps.type,
                  props = newProps.memoizedProps;
                type[internalInstanceKey] = newProps;
                type[internalEventHandlersKey] = props;
                switch (type$jscomp$0) {
                  case "iframe":
                  case "object":
                  case "embed":
                    trapBubbledEvent("load", type);
                    break;
                  case "video":
                  case "audio":
                    for (var i = 0; i < mediaEventTypes.length; i++)
                      trapBubbledEvent(mediaEventTypes[i], type);
                    break;
                  case "source":
                    trapBubbledEvent("error", type);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    trapBubbledEvent("error", type);
                    trapBubbledEvent("load", type);
                    break;
                  case "form":
                    trapBubbledEvent("reset", type);
                    trapBubbledEvent("submit", type);
                    break;
                  case "details":
                    trapBubbledEvent("toggle", type);
                    break;
                  case "input":
                    initWrapperState(type, props);
                    trapBubbledEvent("invalid", type);
                    ensureListeningTo(
                      renderExpirationTime$jscomp$0,
                      "onChange"
                    );
                    break;
                  case "select":
                    type._wrapperState = { wasMultiple: !!props.multiple };
                    trapBubbledEvent("invalid", type);
                    ensureListeningTo(
                      renderExpirationTime$jscomp$0,
                      "onChange"
                    );
                    break;
                  case "textarea":
                    initWrapperState$2(type, props),
                      trapBubbledEvent("invalid", type),
                      ensureListeningTo(
                        renderExpirationTime$jscomp$0,
                        "onChange"
                      );
                }
                assertValidProps(type$jscomp$0, props);
                i = null;
                for (current in props)
                  props.hasOwnProperty(current) &&
                    ((currentHostContext = props[current]),
                    "children" === current
                      ? "string" === typeof currentHostContext
                        ? type.textContent !== currentHostContext &&
                          (i = ["children", currentHostContext])
                        : "number" === typeof currentHostContext &&
                          type.textContent !== "" + currentHostContext &&
                          (i = ["children", "" + currentHostContext])
                      : registrationNameModules.hasOwnProperty(current) &&
                        null != currentHostContext &&
                        ensureListeningTo(
                          renderExpirationTime$jscomp$0,
                          current
                        ));
                switch (type$jscomp$0) {
                  case "input":
                    track(type);
                    postMountWrapper(type, props, !0);
                    break;
                  case "textarea":
                    track(type);
                    postMountWrapper$3(type, props);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof props.onClick &&
                      (type.onclick = noop);
                }
                renderExpirationTime$jscomp$0 = i;
                newProps.updateQueue = renderExpirationTime$jscomp$0;
                null !== renderExpirationTime$jscomp$0 &&
                  markUpdate(current$$1);
              } else {
                props = type;
                current = newProps;
                type$jscomp$0 = current$$1;
                i =
                  9 === renderExpirationTime$jscomp$0.nodeType
                    ? renderExpirationTime$jscomp$0
                    : renderExpirationTime$jscomp$0.ownerDocument;
                currentHostContext === Namespaces.html &&
                  (currentHostContext = getIntrinsicNamespace(props));
                currentHostContext === Namespaces.html
                  ? "script" === props
                    ? ((props = i.createElement("div")),
                      (props.innerHTML = "<script>\x3c/script>"),
                      (i = props.removeChild(props.firstChild)))
                    : "string" === typeof current.is
                      ? (i = i.createElement(props, { is: current.is }))
                      : ((i = i.createElement(props)),
                        "select" === props &&
                          ((props = i),
                          current.multiple
                            ? (props.multiple = !0)
                            : current.size && (props.size = current.size)))
                  : (i = i.createElementNS(currentHostContext, props));
                props = i;
                props[internalInstanceKey] = type$jscomp$0;
                props[internalEventHandlersKey] = current;
                current = props;
                appendAllChildren(current, current$$1, !1, !1);
                type$jscomp$0 = current;
                var rootContainerInstance = renderExpirationTime$jscomp$0,
                  isCustomComponentTag = isCustomComponent(type, newProps);
                switch (type) {
                  case "iframe":
                  case "object":
                  case "embed":
                    trapBubbledEvent("load", type$jscomp$0);
                    renderExpirationTime$jscomp$0 = newProps;
                    break;
                  case "video":
                  case "audio":
                    for (
                      renderExpirationTime$jscomp$0 = 0;
                      renderExpirationTime$jscomp$0 < mediaEventTypes.length;
                      renderExpirationTime$jscomp$0++
                    )
                      trapBubbledEvent(
                        mediaEventTypes[renderExpirationTime$jscomp$0],
                        type$jscomp$0
                      );
                    renderExpirationTime$jscomp$0 = newProps;
                    break;
                  case "source":
                    trapBubbledEvent("error", type$jscomp$0);
                    renderExpirationTime$jscomp$0 = newProps;
                    break;
                  case "img":
                  case "image":
                  case "link":
                    trapBubbledEvent("error", type$jscomp$0);
                    trapBubbledEvent("load", type$jscomp$0);
                    renderExpirationTime$jscomp$0 = newProps;
                    break;
                  case "form":
                    trapBubbledEvent("reset", type$jscomp$0);
                    trapBubbledEvent("submit", type$jscomp$0);
                    renderExpirationTime$jscomp$0 = newProps;
                    break;
                  case "details":
                    trapBubbledEvent("toggle", type$jscomp$0);
                    renderExpirationTime$jscomp$0 = newProps;
                    break;
                  case "input":
                    initWrapperState(type$jscomp$0, newProps);
                    renderExpirationTime$jscomp$0 = getHostProps(
                      type$jscomp$0,
                      newProps
                    );
                    trapBubbledEvent("invalid", type$jscomp$0);
                    ensureListeningTo(rootContainerInstance, "onChange");
                    break;
                  case "option":
                    renderExpirationTime$jscomp$0 = getHostProps$1(
                      type$jscomp$0,
                      newProps
                    );
                    break;
                  case "select":
                    type$jscomp$0._wrapperState = {
                      wasMultiple: !!newProps.multiple
                    };
                    renderExpirationTime$jscomp$0 = Object.assign(
                      {},
                      newProps,
                      { value: void 0 }
                    );
                    trapBubbledEvent("invalid", type$jscomp$0);
                    ensureListeningTo(rootContainerInstance, "onChange");
                    break;
                  case "textarea":
                    initWrapperState$2(type$jscomp$0, newProps);
                    renderExpirationTime$jscomp$0 = getHostProps$3(
                      type$jscomp$0,
                      newProps
                    );
                    trapBubbledEvent("invalid", type$jscomp$0);
                    ensureListeningTo(rootContainerInstance, "onChange");
                    break;
                  default:
                    renderExpirationTime$jscomp$0 = newProps;
                }
                assertValidProps(type, renderExpirationTime$jscomp$0);
                props = void 0;
                i = type;
                currentHostContext = type$jscomp$0;
                var nextProps = renderExpirationTime$jscomp$0;
                for (props in nextProps)
                  if (nextProps.hasOwnProperty(props)) {
                    var nextProp = nextProps[props];
                    "style" === props
                      ? setValueForStyles(currentHostContext, nextProp)
                      : "dangerouslySetInnerHTML" === props
                        ? ((nextProp = nextProp ? nextProp.__html : void 0),
                          null != nextProp &&
                            setInnerHTML(currentHostContext, nextProp))
                        : "children" === props
                          ? "string" === typeof nextProp
                            ? ("textarea" !== i || "" !== nextProp) &&
                              setTextContent(currentHostContext, nextProp)
                            : "number" === typeof nextProp &&
                              setTextContent(currentHostContext, "" + nextProp)
                          : "suppressContentEditableWarning" !== props &&
                            "suppressHydrationWarning" !== props &&
                            "autoFocus" !== props &&
                            (registrationNameModules.hasOwnProperty(props)
                              ? null != nextProp &&
                                ensureListeningTo(rootContainerInstance, props)
                              : null != nextProp &&
                                setValueForProperty(
                                  currentHostContext,
                                  props,
                                  nextProp,
                                  isCustomComponentTag
                                ));
                  }
                switch (type) {
                  case "input":
                    track(type$jscomp$0);
                    postMountWrapper(type$jscomp$0, newProps, !1);
                    break;
                  case "textarea":
                    track(type$jscomp$0);
                    postMountWrapper$3(type$jscomp$0, newProps);
                    break;
                  case "option":
                    null != newProps.value &&
                      type$jscomp$0.setAttribute(
                        "value",
                        "" + getToStringValue(newProps.value)
                      );
                    break;
                  case "select":
                    renderExpirationTime$jscomp$0 = type$jscomp$0;
                    type$jscomp$0 = newProps;
                    renderExpirationTime$jscomp$0.multiple = !!type$jscomp$0.multiple;
                    props = type$jscomp$0.value;
                    null != props
                      ? updateOptions(
                          renderExpirationTime$jscomp$0,
                          !!type$jscomp$0.multiple,
                          props,
                          !1
                        )
                      : null != type$jscomp$0.defaultValue &&
                        updateOptions(
                          renderExpirationTime$jscomp$0,
                          !!type$jscomp$0.multiple,
                          type$jscomp$0.defaultValue,
                          !0
                        );
                    break;
                  default:
                    "function" ===
                      typeof renderExpirationTime$jscomp$0.onClick &&
                      (type$jscomp$0.onclick = noop);
                }
                shouldAutoFocusHostComponent(type, newProps) &&
                  markUpdate(current$$1);
                current$$1.stateNode = current;
              }
              null !== current$$1.ref && (current$$1.effectTag |= 128);
            } else if (null === current$$1.stateNode)
              throw ReactErrorProd(Error(166));
            break;
          case 6:
            if (current && null != current$$1.stateNode)
              updateHostText$1(
                current,
                current$$1,
                current.memoizedProps,
                newProps
              );
            else {
              if ("string" !== typeof newProps && null === current$$1.stateNode)
                throw ReactErrorProd(Error(166));
              current = requiredContext(rootInstanceStackCursor.current);
              requiredContext(contextStackCursor$1.current);
              popHydrationState(current$$1)
                ? ((newProps = current$$1.stateNode),
                  (renderExpirationTime$jscomp$0 = current$$1.memoizedProps),
                  (newProps[internalInstanceKey] = current$$1),
                  newProps.nodeValue !== renderExpirationTime$jscomp$0 &&
                    markUpdate(current$$1))
                : ((renderExpirationTime$jscomp$0 = current$$1),
                  (newProps = (9 === current.nodeType
                    ? current
                    : current.ownerDocument
                  ).createTextNode(newProps)),
                  (newProps[internalInstanceKey] = current$$1),
                  (renderExpirationTime$jscomp$0.stateNode = newProps));
            }
            break;
          case 11:
            break;
          case 13:
            popSuspenseContext(current$$1);
            newProps = current$$1.memoizedState;
            if (0 !== (current$$1.effectTag & 64)) {
              current$$1.expirationTime = renderExpirationTime$jscomp$0;
              break a;
            }
            newProps = null !== newProps;
            renderExpirationTime$jscomp$0 = !1;
            null === current
              ? popHydrationState(current$$1)
              : ((type = current.memoizedState),
                (renderExpirationTime$jscomp$0 = null !== type),
                newProps ||
                  null === type ||
                  ((type = current.child.sibling),
                  null !== type &&
                    ((type$jscomp$0 = current$$1.firstEffect),
                    null !== type$jscomp$0
                      ? ((current$$1.firstEffect = type),
                        (type.nextEffect = type$jscomp$0))
                      : ((current$$1.firstEffect = current$$1.lastEffect = type),
                        (type.nextEffect = null)),
                    (type.effectTag = 8))));
            if (
              newProps &&
              !renderExpirationTime$jscomp$0 &&
              0 !== (current$$1.mode & 2)
            )
              if (
                (null === current &&
                  !0 !== current$$1.memoizedProps.unstable_avoidThisFallback) ||
                0 !==
                  (suspenseStackCursor.current & InvisibleParentSuspenseContext)
              )
                workInProgressRootExitStatus === RootIncomplete &&
                  (workInProgressRootExitStatus = RootSuspended);
              else if (
                workInProgressRootExitStatus === RootIncomplete ||
                workInProgressRootExitStatus === RootSuspended
              )
                workInProgressRootExitStatus = RootSuspendedWithDelay;
            if (newProps || renderExpirationTime$jscomp$0)
              current$$1.effectTag |= 4;
            break;
          case 7:
            break;
          case 8:
            break;
          case 12:
            break;
          case 4:
            popHostContainer(current$$1);
            updateHostContainer(current$$1);
            break;
          case 10:
            popProvider(current$$1);
            break;
          case 9:
            break;
          case 14:
            break;
          case 17:
            isContextProvider(current$$1.type) && popContext(current$$1);
            break;
          case 18:
            popSuspenseContext(current$$1);
            if (null === current) {
              if (!popHydrationState(current$$1))
                throw ReactErrorProd(Error(318));
              current$$1 = current$$1.stateNode;
              if (!current$$1) throw ReactErrorProd(Error(317));
              b: {
                current$$1 = current$$1.nextSibling;
                for (newProps = 0; current$$1; ) {
                  if (8 === current$$1.nodeType)
                    if (
                      ((renderExpirationTime$jscomp$0 = current$$1.data),
                      "/$" === renderExpirationTime$jscomp$0)
                    ) {
                      if (0 === newProps) {
                        nextHydratableInstance = getNextHydratable(
                          current$$1.nextSibling
                        );
                        break b;
                      }
                      newProps--;
                    } else "$" === renderExpirationTime$jscomp$0 && newProps++;
                  current$$1 = current$$1.nextSibling;
                }
                nextHydratableInstance = null;
              }
            } else
              0 === (current$$1.effectTag & 64) &&
                ((current.alternate = null),
                (current$$1.alternate = null),
                (current$$1.tag = 13),
                (current$$1.memoizedState = null),
                (current$$1.stateNode = null));
            break;
          case 21:
            popSuspenseContext(current$$1);
            newProps = current$$1.memoizedState;
            if (null === newProps) break;
            type = 0 !== (current$$1.effectTag & 64);
            type$jscomp$0 = newProps.rendering;
            if (null === type$jscomp$0)
              if (type) cutOffTailIfNeeded(newProps, !1);
              else {
                if (
                  workInProgressRootExitStatus !== RootIncomplete ||
                  (null !== current && 0 !== (current.effectTag & 64))
                )
                  for (current = current$$1.child; null !== current; ) {
                    type$jscomp$0 = findFirstSuspended(current);
                    if (null !== type$jscomp$0) {
                      current$$1.effectTag |= 64;
                      cutOffTailIfNeeded(newProps, !1);
                      newProps = type$jscomp$0.updateQueue;
                      null !== newProps &&
                        ((current$$1.updateQueue = newProps),
                        (current$$1.effectTag |= 4));
                      current$$1.firstEffect = current$$1.lastEffect = null;
                      newProps = renderExpirationTime$jscomp$0;
                      for (
                        renderExpirationTime$jscomp$0 = current$$1.child;
                        null !== renderExpirationTime$jscomp$0;

                      )
                        (current = renderExpirationTime$jscomp$0),
                          (type = newProps),
                          (current.effectTag &= 2),
                          (current.nextEffect = null),
                          (current.firstEffect = null),
                          (current.lastEffect = null),
                          (type$jscomp$0 = current.alternate),
                          null === type$jscomp$0
                            ? ((current.childExpirationTime = 0),
                              (current.expirationTime = type),
                              (current.child = null),
                              (current.memoizedProps = null),
                              (current.memoizedState = null),
                              (current.updateQueue = null),
                              (current.dependencies = null))
                            : ((current.childExpirationTime =
                                type$jscomp$0.childExpirationTime),
                              (current.expirationTime =
                                type$jscomp$0.expirationTime),
                              (current.child = type$jscomp$0.child),
                              (current.memoizedProps =
                                type$jscomp$0.memoizedProps),
                              (current.memoizedState =
                                type$jscomp$0.memoizedState),
                              (current.updateQueue = type$jscomp$0.updateQueue),
                              (type = type$jscomp$0.dependencies),
                              (current.dependencies =
                                null === type
                                  ? null
                                  : {
                                      expirationTime: type.expirationTime,
                                      firstContext: type.firstContext,
                                      events: type.events
                                    })),
                          (renderExpirationTime$jscomp$0 =
                            renderExpirationTime$jscomp$0.sibling);
                      push(
                        suspenseStackCursor,
                        (suspenseStackCursor.current &
                          SubtreeSuspenseContextMask) |
                          ForceSuspenseFallback,
                        current$$1
                      );
                      current$$1 = current$$1.child;
                      break a;
                    }
                    current = current.sibling;
                  }
              }
            else {
              if (!type)
                if (
                  ((current = findFirstSuspended(type$jscomp$0)),
                  null !== current)
                ) {
                  if (
                    ((current$$1.effectTag |= 64),
                    (type = !0),
                    cutOffTailIfNeeded(newProps, !0),
                    null === newProps.tail && "hidden" === newProps.tailMode)
                  ) {
                    renderExpirationTime$jscomp$0 = current.updateQueue;
                    null !== renderExpirationTime$jscomp$0 &&
                      ((current$$1.updateQueue = renderExpirationTime$jscomp$0),
                      (current$$1.effectTag |= 4));
                    current$$1 = current$$1.lastEffect = newProps.lastEffect;
                    null !== current$$1 && (current$$1.nextEffect = null);
                    break;
                  }
                } else
                  now() > newProps.tailExpiration &&
                    1 < renderExpirationTime$jscomp$0 &&
                    ((current$$1.effectTag |= 64),
                    (type = !0),
                    cutOffTailIfNeeded(newProps, !1),
                    (current$$1.expirationTime = current$$1.childExpirationTime =
                      renderExpirationTime$jscomp$0 - 1));
              newProps.isBackwards
                ? ((type$jscomp$0.sibling = current$$1.child),
                  (current$$1.child = type$jscomp$0))
                : ((renderExpirationTime$jscomp$0 = newProps.last),
                  null !== renderExpirationTime$jscomp$0
                    ? (renderExpirationTime$jscomp$0.sibling = type$jscomp$0)
                    : (current$$1.child = type$jscomp$0),
                  (newProps.last = type$jscomp$0));
            }
            if (null !== newProps.tail) {
              0 === newProps.tailExpiration &&
                (newProps.tailExpiration = now() + 500);
              renderExpirationTime$jscomp$0 = newProps.tail;
              newProps.rendering = renderExpirationTime$jscomp$0;
              newProps.tail = renderExpirationTime$jscomp$0.sibling;
              newProps.lastEffect = current$$1.lastEffect;
              renderExpirationTime$jscomp$0.sibling = null;
              newProps = suspenseStackCursor.current;
              newProps = type
                ? (newProps & SubtreeSuspenseContextMask) |
                  ForceSuspenseFallback
                : newProps & SubtreeSuspenseContextMask;
              push(suspenseStackCursor, newProps, current$$1);
              current$$1 = renderExpirationTime$jscomp$0;
              break a;
            }
            break;
          case 19:
            popHostContext(current$$1);
            renderExpirationTime$jscomp$0 = requiredContext(
              rootInstanceStackCursor.current
            );
            current = current$$1.type.responder;
            type = current$$1.stateNode;
            null === type
              ? ((type = null),
                (type$jscomp$0 = current.getInitialState),
                void 0 !== type$jscomp$0 && (type = type$jscomp$0(newProps)),
                (current$$1.stateNode = createEventComponentInstance(
                  current$$1,
                  newProps,
                  current,
                  renderExpirationTime$jscomp$0,
                  type || {},
                  !1
                )),
                markUpdate(current$$1))
              : ((type.props = newProps), (type.currentFiber = current$$1));
            break;
          default:
            throw ReactErrorProd(Error(156));
        }
        current$$1 = null;
      }
      stopWorkTimer(workInProgress);
      newProps = workInProgress;
      if (1 === renderExpirationTime || 1 !== newProps.childExpirationTime) {
        renderExpirationTime$jscomp$0 = 0;
        for (current = newProps.child; null !== current; )
          (type = current.expirationTime),
            (type$jscomp$0 = current.childExpirationTime),
            type > renderExpirationTime$jscomp$0 &&
              (renderExpirationTime$jscomp$0 = type),
            type$jscomp$0 > renderExpirationTime$jscomp$0 &&
              (renderExpirationTime$jscomp$0 = type$jscomp$0),
            (current = current.sibling);
        newProps.childExpirationTime = renderExpirationTime$jscomp$0;
      }
      if (null !== current$$1) return current$$1;
      null !== unitOfWork &&
        0 === (unitOfWork.effectTag & 1024) &&
        (null === unitOfWork.firstEffect &&
          (unitOfWork.firstEffect = workInProgress.firstEffect),
        null !== workInProgress.lastEffect &&
          (null !== unitOfWork.lastEffect &&
            (unitOfWork.lastEffect.nextEffect = workInProgress.firstEffect),
          (unitOfWork.lastEffect = workInProgress.lastEffect)),
        1 < workInProgress.effectTag &&
          (null !== unitOfWork.lastEffect
            ? (unitOfWork.lastEffect.nextEffect = workInProgress)
            : (unitOfWork.firstEffect = workInProgress),
          (unitOfWork.lastEffect = workInProgress)));
    } else {
      current$$1 = unwindWork(workInProgress, renderExpirationTime);
      if (null !== current$$1)
        return (
          (unitOfWork = workInProgress),
          enableUserTimingAPI &&
            supportsUserTiming &&
            !shouldIgnoreFiber(unitOfWork) &&
            ((currentFiber = unitOfWork.return),
            unitOfWork._debugIsCurrentlyTiming &&
              ((unitOfWork._debugIsCurrentlyTiming = !1),
              endFiberMark(
                unitOfWork,
                null,
                13 === unitOfWork.tag || 18 === unitOfWork.tag
                  ? "Rendering was suspended"
                  : "An error was thrown inside this error boundary"
              ))),
          (current$$1.effectTag &= 1023),
          current$$1
        );
      stopWorkTimer(workInProgress);
      null !== unitOfWork &&
        ((unitOfWork.firstEffect = unitOfWork.lastEffect = null),
        (unitOfWork.effectTag |= 1024));
    }
    current$$1 = workInProgress.sibling;
    if (null !== current$$1) return current$$1;
    workInProgress = unitOfWork;
  } while (null !== workInProgress);
  workInProgressRootExitStatus === RootIncomplete &&
    (workInProgressRootExitStatus = RootCompleted);
  return null;
}
function commitRoot(root) {
  runWithPriority$2(99, commitRootImpl.bind(null, root));
  null !== rootWithPendingPassiveEffects &&
    ((root = getCurrentPriorityLevel()),
    scheduleCallback(root, function() {
      flushPassiveEffects();
      return null;
    }));
  return null;
}
function commitRootImpl(root) {
  flushPassiveEffects();
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
    throw ReactErrorProd(Error(327));
  var finishedWork = root.finishedWork,
    expirationTime = root.finishedExpirationTime;
  if (null === finishedWork) return null;
  root.finishedWork = null;
  root.finishedExpirationTime = 0;
  if (finishedWork === root.current) throw ReactErrorProd(Error(177));
  root.callbackNode = null;
  root.callbackExpirationTime = 0;
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((isCommitting = !0),
    (hasScheduledUpdateInCurrentCommit = !1),
    labelsInCurrentCommit.clear(),
    beginMark("(Committing Changes)"));
  var updateExpirationTimeBeforeCommit = finishedWork.expirationTime,
    childExpirationTimeBeforeCommit = finishedWork.childExpirationTime;
  updateExpirationTimeBeforeCommit =
    childExpirationTimeBeforeCommit > updateExpirationTimeBeforeCommit
      ? childExpirationTimeBeforeCommit
      : updateExpirationTimeBeforeCommit;
  root.firstPendingTime = updateExpirationTimeBeforeCommit;
  updateExpirationTimeBeforeCommit < root.lastPendingTime &&
    (root.lastPendingTime = updateExpirationTimeBeforeCommit);
  root === workInProgressRoot &&
    ((workInProgress = workInProgressRoot = null), (renderExpirationTime = 0));
  1 < finishedWork.effectTag
    ? null !== finishedWork.lastEffect
      ? ((finishedWork.lastEffect.nextEffect = finishedWork),
        (updateExpirationTimeBeforeCommit = finishedWork.firstEffect))
      : (updateExpirationTimeBeforeCommit = finishedWork)
    : (updateExpirationTimeBeforeCommit = finishedWork.firstEffect);
  if (null !== updateExpirationTimeBeforeCommit) {
    childExpirationTimeBeforeCommit = executionContext;
    executionContext |= CommitContext;
    ReactCurrentOwner$2.current = null;
    startCommitSnapshotEffectsTimer();
    eventsEnabled = _enabled;
    var focusedElem = getActiveElementDeep();
    if (hasSelectionCapabilities(focusedElem)) {
      if ("selectionStart" in focusedElem)
        var JSCompiler_temp = {
          start: focusedElem.selectionStart,
          end: focusedElem.selectionEnd
        };
      else
        a: {
          JSCompiler_temp =
            ((JSCompiler_temp = focusedElem.ownerDocument) &&
              JSCompiler_temp.defaultView) ||
            window;
          var selection =
            JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
          if (selection && 0 !== selection.rangeCount) {
            JSCompiler_temp = selection.anchorNode;
            var anchorOffset = selection.anchorOffset,
              focusNode = selection.focusNode;
            selection = selection.focusOffset;
            try {
              JSCompiler_temp.nodeType, focusNode.nodeType;
            } catch (e) {
              JSCompiler_temp = null;
              break a;
            }
            var length = 0,
              start = -1,
              end = -1,
              indexWithinAnchor = 0,
              indexWithinFocus = 0,
              node = focusedElem,
              parentNode = null;
            b: for (;;) {
              for (var next; ; ) {
                node !== JSCompiler_temp ||
                  (0 !== anchorOffset && 3 !== node.nodeType) ||
                  (start = length + anchorOffset);
                node !== focusNode ||
                  (0 !== selection && 3 !== node.nodeType) ||
                  (end = length + selection);
                3 === node.nodeType && (length += node.nodeValue.length);
                if (null === (next = node.firstChild)) break;
                parentNode = node;
                node = next;
              }
              for (;;) {
                if (node === focusedElem) break b;
                parentNode === JSCompiler_temp &&
                  ++indexWithinAnchor === anchorOffset &&
                  (start = length);
                parentNode === focusNode &&
                  ++indexWithinFocus === selection &&
                  (end = length);
                if (null !== (next = node.nextSibling)) break;
                node = parentNode;
                parentNode = node.parentNode;
              }
              node = next;
            }
            JSCompiler_temp =
              -1 === start || -1 === end ? null : { start: start, end: end };
          } else JSCompiler_temp = null;
        }
      JSCompiler_temp = JSCompiler_temp || {
        start: 0,
        end: 0
      };
    } else JSCompiler_temp = null;
    selectionInformation = {
      focusedElem: focusedElem,
      selectionRange: JSCompiler_temp
    };
    _enabled = !1;
    nextEffect = updateExpirationTimeBeforeCommit;
    do
      try {
        for (; null !== nextEffect; ) {
          if (0 !== (nextEffect.effectTag & 256)) {
            enableUserTimingAPI && effectCountInCurrentCommit++;
            var current$$1 = nextEffect.alternate;
            focusedElem = nextEffect;
            switch (focusedElem.tag) {
              case 0:
              case 11:
              case 15:
                commitHookEffectList(UnmountSnapshot, NoEffect$1, focusedElem);
                break;
              case 1:
                if (focusedElem.effectTag & 256 && null !== current$$1) {
                  var prevProps = current$$1.memoizedProps,
                    prevState = current$$1.memoizedState;
                  startPhaseTimer(focusedElem, "getSnapshotBeforeUpdate");
                  var instance = focusedElem.stateNode,
                    snapshot = instance.getSnapshotBeforeUpdate(
                      focusedElem.elementType === focusedElem.type
                        ? prevProps
                        : resolveDefaultProps(focusedElem.type, prevProps),
                      prevState
                    );
                  instance.__reactInternalSnapshotBeforeUpdate = snapshot;
                  stopPhaseTimer();
                }
                break;
              case 3:
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw ReactErrorProd(Error(163));
            }
          }
          nextEffect = nextEffect.nextEffect;
        }
      } catch (error) {
        if (null === nextEffect) throw ReactErrorProd(Error(330));
        captureCommitPhaseError(nextEffect, error);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    stopCommitSnapshotEffectsTimer();
    startCommitHostEffectsTimer();
    nextEffect = updateExpirationTimeBeforeCommit;
    do
      try {
        for (; null !== nextEffect; ) {
          var effectTag = nextEffect.effectTag;
          effectTag & 16 && setTextContent(nextEffect.stateNode, "");
          if (effectTag & 128) {
            var current$$1$jscomp$0 = nextEffect.alternate;
            if (null !== current$$1$jscomp$0) {
              var currentRef = current$$1$jscomp$0.ref;
              null !== currentRef &&
                ("function" === typeof currentRef
                  ? currentRef(null)
                  : (currentRef.current = null));
            }
          }
          switch (effectTag & 14) {
            case 2:
              commitPlacement(nextEffect);
              nextEffect.effectTag &= -3;
              break;
            case 6:
              commitPlacement(nextEffect);
              nextEffect.effectTag &= -3;
              commitWork(nextEffect.alternate, nextEffect);
              break;
            case 4:
              commitWork(nextEffect.alternate, nextEffect);
              break;
            case 8:
              current$$1 = nextEffect;
              unmountHostComponents(current$$1);
              current$$1.return = null;
              current$$1.child = null;
              current$$1.memoizedState = null;
              current$$1.updateQueue = null;
              current$$1.dependencies = null;
              var alternate = current$$1.alternate;
              null !== alternate &&
                ((alternate.return = null),
                (alternate.child = null),
                (alternate.memoizedState = null),
                (alternate.updateQueue = null),
                (alternate.dependencies = null));
          }
          enableUserTimingAPI && effectCountInCurrentCommit++;
          nextEffect = nextEffect.nextEffect;
        }
      } catch (error) {
        if (null === nextEffect) throw ReactErrorProd(Error(330));
        captureCommitPhaseError(nextEffect, error);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    stopCommitHostEffectsTimer();
    currentRef = selectionInformation;
    current$$1$jscomp$0 = getActiveElementDeep();
    effectTag = currentRef.focusedElem;
    current$$1 = currentRef.selectionRange;
    if (
      current$$1$jscomp$0 !== effectTag &&
      effectTag &&
      effectTag.ownerDocument &&
      containsNode(effectTag.ownerDocument.documentElement, effectTag)
    ) {
      null !== current$$1 &&
        hasSelectionCapabilities(effectTag) &&
        ((current$$1$jscomp$0 = current$$1.start),
        (currentRef = current$$1.end),
        void 0 === currentRef && (currentRef = current$$1$jscomp$0),
        "selectionStart" in effectTag
          ? ((effectTag.selectionStart = current$$1$jscomp$0),
            (effectTag.selectionEnd = Math.min(
              currentRef,
              effectTag.value.length
            )))
          : ((currentRef =
              ((current$$1$jscomp$0 = effectTag.ownerDocument || document) &&
                current$$1$jscomp$0.defaultView) ||
              window),
            currentRef.getSelection &&
              ((currentRef = currentRef.getSelection()),
              (prevProps = effectTag.textContent.length),
              (alternate = Math.min(current$$1.start, prevProps)),
              (current$$1 =
                void 0 === current$$1.end
                  ? alternate
                  : Math.min(current$$1.end, prevProps)),
              !currentRef.extend &&
                alternate > current$$1 &&
                ((prevProps = current$$1),
                (current$$1 = alternate),
                (alternate = prevProps)),
              (prevProps = getNodeForCharacterOffset(effectTag, alternate)),
              (prevState = getNodeForCharacterOffset(effectTag, current$$1)),
              prevProps &&
                prevState &&
                (1 !== currentRef.rangeCount ||
                  currentRef.anchorNode !== prevProps.node ||
                  currentRef.anchorOffset !== prevProps.offset ||
                  currentRef.focusNode !== prevState.node ||
                  currentRef.focusOffset !== prevState.offset) &&
                ((current$$1$jscomp$0 = current$$1$jscomp$0.createRange()),
                current$$1$jscomp$0.setStart(prevProps.node, prevProps.offset),
                currentRef.removeAllRanges(),
                alternate > current$$1
                  ? (currentRef.addRange(current$$1$jscomp$0),
                    currentRef.extend(prevState.node, prevState.offset))
                  : (current$$1$jscomp$0.setEnd(
                      prevState.node,
                      prevState.offset
                    ),
                    currentRef.addRange(current$$1$jscomp$0))))));
      current$$1$jscomp$0 = [];
      for (currentRef = effectTag; (currentRef = currentRef.parentNode); )
        1 === currentRef.nodeType &&
          current$$1$jscomp$0.push({
            element: currentRef,
            left: currentRef.scrollLeft,
            top: currentRef.scrollTop
          });
      "function" === typeof effectTag.focus && effectTag.focus();
      for (effectTag = 0; effectTag < current$$1$jscomp$0.length; effectTag++)
        (currentRef = current$$1$jscomp$0[effectTag]),
          (currentRef.element.scrollLeft = currentRef.left),
          (currentRef.element.scrollTop = currentRef.top);
    }
    selectionInformation = null;
    _enabled = !!eventsEnabled;
    eventsEnabled = null;
    root.current = finishedWork;
    startCommitLifeCyclesTimer();
    nextEffect = updateExpirationTimeBeforeCommit;
    do
      try {
        for (effectTag = expirationTime; null !== nextEffect; ) {
          var effectTag$jscomp$0 = nextEffect.effectTag;
          if (effectTag$jscomp$0 & 36) {
            enableUserTimingAPI && effectCountInCurrentCommit++;
            var current$$1$jscomp$1 = nextEffect.alternate;
            current$$1$jscomp$0 = nextEffect;
            currentRef = effectTag;
            switch (current$$1$jscomp$0.tag) {
              case 0:
              case 11:
              case 15:
                commitHookEffectList(
                  UnmountLayout,
                  MountLayout,
                  current$$1$jscomp$0
                );
                break;
              case 1:
                var instance$jscomp$0 = current$$1$jscomp$0.stateNode;
                if (current$$1$jscomp$0.effectTag & 4) {
                  if (null === current$$1$jscomp$1)
                    startPhaseTimer(current$$1$jscomp$0, "componentDidMount"),
                      instance$jscomp$0.componentDidMount();
                  else {
                    var prevProps$jscomp$0 =
                        current$$1$jscomp$0.elementType ===
                        current$$1$jscomp$0.type
                          ? current$$1$jscomp$1.memoizedProps
                          : resolveDefaultProps(
                              current$$1$jscomp$0.type,
                              current$$1$jscomp$1.memoizedProps
                            ),
                      prevState$jscomp$0 = current$$1$jscomp$1.memoizedState;
                    startPhaseTimer(current$$1$jscomp$0, "componentDidUpdate");
                    instance$jscomp$0.componentDidUpdate(
                      prevProps$jscomp$0,
                      prevState$jscomp$0,
                      instance$jscomp$0.__reactInternalSnapshotBeforeUpdate
                    );
                  }
                  stopPhaseTimer();
                }
                var updateQueue = current$$1$jscomp$0.updateQueue;
                null !== updateQueue &&
                  commitUpdateQueue(
                    current$$1$jscomp$0,
                    updateQueue,
                    instance$jscomp$0,
                    currentRef
                  );
                break;
              case 3:
                var _updateQueue = current$$1$jscomp$0.updateQueue;
                if (null !== _updateQueue) {
                  alternate = null;
                  if (null !== current$$1$jscomp$0.child)
                    switch (current$$1$jscomp$0.child.tag) {
                      case 5:
                        alternate = current$$1$jscomp$0.child.stateNode;
                        break;
                      case 1:
                        alternate = current$$1$jscomp$0.child.stateNode;
                    }
                  commitUpdateQueue(
                    current$$1$jscomp$0,
                    _updateQueue,
                    alternate,
                    currentRef
                  );
                }
                break;
              case 5:
                var _instance2 = current$$1$jscomp$0.stateNode;
                null === current$$1$jscomp$1 &&
                  current$$1$jscomp$0.effectTag & 4 &&
                  ((currentRef = _instance2),
                  shouldAutoFocusHostComponent(
                    current$$1$jscomp$0.type,
                    current$$1$jscomp$0.memoizedProps
                  ) && currentRef.focus());
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
              case 21:
              case 17:
                break;
              case 19:
                var eventComponentInstance = current$$1$jscomp$0.stateNode,
                  doc = eventComponentInstance.rootInstance.ownerDocument,
                  documentBody = doc.body || doc,
                  _ref = eventComponentInstance.responder,
                  rootEventTypes = _ref.rootEventTypes,
                  targetEventTypes = _ref.targetEventTypes;
                void 0 !== targetEventTypes &&
                  listenToEventResponderEventTypes(
                    targetEventTypes,
                    documentBody
                  );
                if (void 0 !== rootEventTypes) {
                  for (
                    current$$1$jscomp$0 = 0;
                    current$$1$jscomp$0 < rootEventTypes.length;
                    current$$1$jscomp$0++
                  )
                    registerRootEventType(
                      rootEventTypes[current$$1$jscomp$0],
                      eventComponentInstance
                    );
                  listenToEventResponderEventTypes(
                    rootEventTypes,
                    documentBody
                  );
                }
                var responder = eventComponentInstance.responder;
                void 0 !== responder.onOwnershipChange &&
                  ownershipChangeListeners.add(eventComponentInstance);
                var onMount = responder.onMount;
                if (void 0 !== onMount) {
                  var _isHook4 = eventComponentInstance.isHook,
                    props = eventComponentInstance.props,
                    state = eventComponentInstance.state;
                  currentEventQueue = createEventQueue();
                  currentInstance = eventComponentInstance;
                  currentlyInHook = _isHook4;
                  try {
                    onMount(eventResponderContext, props, state),
                      processEventQueue();
                  } finally {
                    currentTimers = currentInstance = currentEventQueue = null;
                  }
                }
                break;
              default:
                throw ReactErrorProd(Error(163));
            }
          }
          if (effectTag$jscomp$0 & 128) {
            enableUserTimingAPI && effectCountInCurrentCommit++;
            var ref = nextEffect.ref;
            if (null !== ref) {
              var instance$jscomp$1 = nextEffect.stateNode;
              switch (nextEffect.tag) {
                case 5:
                  var instanceToUse = instance$jscomp$1;
                  break;
                default:
                  instanceToUse = instance$jscomp$1;
              }
              "function" === typeof ref
                ? ref(instanceToUse)
                : (ref.current = instanceToUse);
            }
          }
          effectTag$jscomp$0 & 512 && (rootDoesHavePassiveEffects = !0);
          nextEffect = nextEffect.nextEffect;
        }
      } catch (error) {
        if (null === nextEffect) throw ReactErrorProd(Error(330));
        captureCommitPhaseError(nextEffect, error);
        nextEffect = nextEffect.nextEffect;
      }
    while (null !== nextEffect);
    stopCommitLifeCyclesTimer();
    nextEffect = null;
    requestPaint();
    executionContext = childExpirationTimeBeforeCommit;
  } else
    (root.current = finishedWork),
      startCommitSnapshotEffectsTimer(),
      stopCommitSnapshotEffectsTimer(),
      startCommitHostEffectsTimer(),
      stopCommitHostEffectsTimer(),
      startCommitLifeCyclesTimer(),
      stopCommitLifeCyclesTimer();
  enableUserTimingAPI &&
    supportsUserTiming &&
    ((effectTag$jscomp$0 = null),
    hasScheduledUpdateInCurrentCommit
      ? (effectTag$jscomp$0 = "Lifecycle hook scheduled a cascading update")
      : 0 < commitCountInCurrentWorkLoop &&
        (effectTag$jscomp$0 = "Caused by a cascading update in earlier commit"),
    (hasScheduledUpdateInCurrentCommit = !1),
    commitCountInCurrentWorkLoop++,
    (isCommitting = !1),
    labelsInCurrentCommit.clear(),
    endMark(
      "(Committing Changes)",
      "(Committing Changes)",
      effectTag$jscomp$0
    ));
  if (rootDoesHavePassiveEffects)
    (rootDoesHavePassiveEffects = !1), (rootWithPendingPassiveEffects = root);
  else
    for (nextEffect = updateExpirationTimeBeforeCommit; null !== nextEffect; )
      (effectTag$jscomp$0 = nextEffect.nextEffect),
        (nextEffect.nextEffect = null),
        (nextEffect = effectTag$jscomp$0);
  effectTag$jscomp$0 = root.firstPendingTime;
  0 !== effectTag$jscomp$0
    ? ((current$$1$jscomp$1 = requestCurrentTime()),
      (current$$1$jscomp$1 = inferPriorityFromExpirationTime(
        current$$1$jscomp$1,
        effectTag$jscomp$0
      )),
      scheduleCallbackForRoot(root, current$$1$jscomp$1, effectTag$jscomp$0))
    : (legacyErrorBoundariesThatAlreadyFailed = null);
  "function" === typeof onCommitFiberRoot &&
    onCommitFiberRoot(finishedWork.stateNode, expirationTime);
  1073741823 === effectTag$jscomp$0
    ? root === rootWithNestedUpdates
      ? nestedUpdateCount++
      : ((nestedUpdateCount = 0), (rootWithNestedUpdates = root))
    : (nestedUpdateCount = 0);
  if (hasUncaughtError)
    throw ((hasUncaughtError = !1),
    (root = firstUncaughtError),
    (firstUncaughtError = null),
    root);
  if ((executionContext & LegacyUnbatchedContext) !== NoContext) return null;
  flushSyncCallbackQueue();
  return null;
}
function flushPassiveEffects() {
  if (null === rootWithPendingPassiveEffects) return !1;
  var root = rootWithPendingPassiveEffects;
  rootWithPendingPassiveEffects = null;
  if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
    throw ReactErrorProd(Error(331));
  var prevExecutionContext = executionContext;
  executionContext |= CommitContext;
  for (root = root.current.firstEffect; null !== root; ) {
    try {
      var finishedWork = root;
      commitHookEffectList(UnmountPassive, NoEffect$1, finishedWork);
      commitHookEffectList(NoEffect$1, MountPassive, finishedWork);
    } catch (error) {
      if (null === root) throw ReactErrorProd(Error(330));
      captureCommitPhaseError(root, error);
    }
    finishedWork = root.nextEffect;
    root.nextEffect = null;
    root = finishedWork;
  }
  executionContext = prevExecutionContext;
  flushSyncCallbackQueue();
  return !0;
}
function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  sourceFiber = createCapturedValue(error, sourceFiber);
  sourceFiber = createRootErrorUpdate(rootFiber, sourceFiber, 1073741823);
  enqueueUpdate(rootFiber, sourceFiber);
  rootFiber = markUpdateTimeFromFiberToRoot(rootFiber, 1073741823);
  null !== rootFiber && scheduleCallbackForRoot(rootFiber, 99, 1073741823);
}
function captureCommitPhaseError(sourceFiber, error) {
  if (3 === sourceFiber.tag)
    captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
  else
    for (var fiber = sourceFiber.return; null !== fiber; ) {
      if (3 === fiber.tag) {
        captureCommitPhaseErrorOnRoot(fiber, sourceFiber, error);
        break;
      } else if (1 === fiber.tag) {
        var instance = fiber.stateNode;
        if (
          "function" === typeof fiber.type.getDerivedStateFromError ||
          ("function" === typeof instance.componentDidCatch &&
            (null === legacyErrorBoundariesThatAlreadyFailed ||
              !legacyErrorBoundariesThatAlreadyFailed.has(instance)))
        ) {
          sourceFiber = createCapturedValue(error, sourceFiber);
          sourceFiber = createClassErrorUpdate(fiber, sourceFiber, 1073741823);
          enqueueUpdate(fiber, sourceFiber);
          fiber = markUpdateTimeFromFiberToRoot(fiber, 1073741823);
          null !== fiber && scheduleCallbackForRoot(fiber, 99, 1073741823);
          break;
        }
      }
      fiber = fiber.return;
    }
}
function pingSuspendedRoot(root, thenable, suspendedTime) {
  var pingCache = root.pingCache;
  null !== pingCache && pingCache.delete(thenable);
  workInProgressRoot === root && renderExpirationTime === suspendedTime
    ? workInProgressRootExitStatus === RootSuspendedWithDelay ||
      (workInProgressRootExitStatus === RootSuspended &&
        1073741823 === workInProgressRootLatestProcessedExpirationTime &&
        now() - globalMostRecentFallbackTime < FALLBACK_THROTTLE_MS)
      ? prepareFreshStack(root, renderExpirationTime)
      : (workInProgressRootHasPendingPing = !0)
    : root.lastPendingTime < suspendedTime ||
      ((thenable = root.pingTime),
      (0 !== thenable && thenable < suspendedTime) ||
        ((root.pingTime = suspendedTime),
        root.finishedExpirationTime === suspendedTime &&
          ((root.finishedExpirationTime = 0), (root.finishedWork = null)),
        (thenable = requestCurrentTime()),
        (thenable = inferPriorityFromExpirationTime(thenable, suspendedTime)),
        scheduleCallbackForRoot(root, thenable, suspendedTime)));
}
function retryTimedOutBoundary(boundaryFiber) {
  var currentTime = requestCurrentTime(),
    retryTime = computeExpirationForFiber(currentTime, boundaryFiber, null);
  currentTime = inferPriorityFromExpirationTime(currentTime, retryTime);
  boundaryFiber = markUpdateTimeFromFiberToRoot(boundaryFiber, retryTime);
  null !== boundaryFiber &&
    scheduleCallbackForRoot(boundaryFiber, currentTime, retryTime);
}
function resolveRetryThenable(boundaryFiber, thenable) {
  switch (boundaryFiber.tag) {
    case 13:
      var retryCache = boundaryFiber.stateNode;
      break;
    case 18:
      retryCache = boundaryFiber.memoizedState;
      break;
    default:
      throw ReactErrorProd(Error(314));
  }
  null !== retryCache && retryCache.delete(thenable);
  retryTimedOutBoundary(boundaryFiber);
}
var beginWork$$1 = void 0;
beginWork$$1 = function(current$$1, workInProgress, renderExpirationTime) {
  var updateExpirationTime = workInProgress.expirationTime;
  if (null !== current$$1) {
    var newProps = workInProgress.pendingProps;
    if (
      current$$1.memoizedProps !== newProps ||
      didPerformWorkStackCursor.current
    )
      didReceiveUpdate = !0;
    else if (updateExpirationTime < renderExpirationTime) {
      didReceiveUpdate = !1;
      switch (workInProgress.tag) {
        case 3:
          pushHostRootContext(workInProgress);
          resetHydrationState();
          break;
        case 5:
          pushHostContext(workInProgress);
          if (
            workInProgress.mode & 4 &&
            1 !== renderExpirationTime &&
            newProps.hidden
          )
            return (
              (workInProgress.expirationTime = workInProgress.childExpirationTime = 1),
              null
            );
          break;
        case 1:
          isContextProvider(workInProgress.type) &&
            pushContextProvider(workInProgress);
          break;
        case 4:
          pushHostContainer(
            workInProgress,
            workInProgress.stateNode.containerInfo
          );
          break;
        case 10:
          pushProvider(workInProgress, workInProgress.memoizedProps.value);
          break;
        case 13:
          if (null !== workInProgress.memoizedState) {
            updateExpirationTime = workInProgress.child.childExpirationTime;
            if (
              0 !== updateExpirationTime &&
              updateExpirationTime >= renderExpirationTime
            )
              return updateSuspenseComponent(
                current$$1,
                workInProgress,
                renderExpirationTime
              );
            push(
              suspenseStackCursor,
              suspenseStackCursor.current & SubtreeSuspenseContextMask,
              workInProgress
            );
            workInProgress = bailoutOnAlreadyFinishedWork(
              current$$1,
              workInProgress,
              renderExpirationTime
            );
            return null !== workInProgress ? workInProgress.sibling : null;
          }
          push(
            suspenseStackCursor,
            suspenseStackCursor.current & SubtreeSuspenseContextMask,
            workInProgress
          );
          break;
        case 18:
          push(
            suspenseStackCursor,
            suspenseStackCursor.current & SubtreeSuspenseContextMask,
            workInProgress
          );
          workInProgress.effectTag |= 64;
          break;
        case 21:
          updateExpirationTime = 0 !== (current$$1.effectTag & 64);
          if (workInProgress.childExpirationTime < renderExpirationTime)
            return (
              push(
                suspenseStackCursor,
                suspenseStackCursor.current,
                workInProgress
              ),
              updateExpirationTime && (workInProgress.effectTag |= 64),
              null
            );
          if (updateExpirationTime)
            return updateSuspenseListComponent(
              current$$1,
              workInProgress,
              renderExpirationTime
            );
          updateExpirationTime = workInProgress.memoizedState;
          null !== updateExpirationTime &&
            ((updateExpirationTime.rendering = null),
            (updateExpirationTime.tail = null));
          push(
            suspenseStackCursor,
            suspenseStackCursor.current,
            workInProgress
          );
          break;
        case 19:
          pushHostContextForEventComponent(workInProgress);
      }
      return bailoutOnAlreadyFinishedWork(
        current$$1,
        workInProgress,
        renderExpirationTime
      );
    }
  } else didReceiveUpdate = !1;
  workInProgress.expirationTime = 0;
  switch (workInProgress.tag) {
    case 2:
      updateExpirationTime = workInProgress.type;
      null !== current$$1 &&
        ((current$$1.alternate = null),
        (workInProgress.alternate = null),
        (workInProgress.effectTag |= 2));
      current$$1 = workInProgress.pendingProps;
      newProps = getMaskedContext(workInProgress, contextStackCursor.current);
      prepareToReadContext(workInProgress, renderExpirationTime);
      currentlyRenderingFiber = workInProgress;
      currentEventComponentInstanceIndex = 0;
      newProps = renderWithHooks(
        null,
        workInProgress,
        updateExpirationTime,
        current$$1,
        newProps,
        renderExpirationTime
      );
      workInProgress.effectTag |= 1;
      if (
        "object" === typeof newProps &&
        null !== newProps &&
        "function" === typeof newProps.render &&
        void 0 === newProps.$$typeof
      ) {
        workInProgress.tag = 1;
        resetHooks();
        if (isContextProvider(updateExpirationTime)) {
          var hasContext = !0;
          pushContextProvider(workInProgress);
        } else hasContext = !1;
        workInProgress.memoizedState =
          null !== newProps.state && void 0 !== newProps.state
            ? newProps.state
            : null;
        var getDerivedStateFromProps =
          updateExpirationTime.getDerivedStateFromProps;
        "function" === typeof getDerivedStateFromProps &&
          applyDerivedStateFromProps(
            workInProgress,
            updateExpirationTime,
            getDerivedStateFromProps,
            current$$1
          );
        newProps.updater = classComponentUpdater;
        workInProgress.stateNode = newProps;
        newProps._reactInternalFiber = workInProgress;
        mountClassInstance(
          workInProgress,
          updateExpirationTime,
          current$$1,
          renderExpirationTime
        );
        workInProgress = finishClassComponent(
          null,
          workInProgress,
          updateExpirationTime,
          !0,
          hasContext,
          renderExpirationTime
        );
      } else
        (workInProgress.tag = 0),
          reconcileChildren(
            null,
            workInProgress,
            newProps,
            renderExpirationTime
          ),
          (workInProgress = workInProgress.child);
      return workInProgress;
    case 16:
      newProps = workInProgress.elementType;
      null !== current$$1 &&
        ((current$$1.alternate = null),
        (workInProgress.alternate = null),
        (workInProgress.effectTag |= 2));
      current$$1 = workInProgress.pendingProps;
      cancelWorkTimer(workInProgress);
      newProps = readLazyComponentType(newProps);
      workInProgress.type = newProps;
      hasContext = workInProgress.tag = resolveLazyComponentTag(newProps);
      startWorkTimer(workInProgress);
      current$$1 = resolveDefaultProps(newProps, current$$1);
      switch (hasContext) {
        case 0:
          workInProgress = updateFunctionComponent(
            null,
            workInProgress,
            newProps,
            current$$1,
            renderExpirationTime
          );
          break;
        case 1:
          workInProgress = updateClassComponent(
            null,
            workInProgress,
            newProps,
            current$$1,
            renderExpirationTime
          );
          break;
        case 11:
          workInProgress = updateForwardRef(
            null,
            workInProgress,
            newProps,
            current$$1,
            renderExpirationTime
          );
          break;
        case 14:
          workInProgress = updateMemoComponent(
            null,
            workInProgress,
            newProps,
            resolveDefaultProps(newProps.type, current$$1),
            updateExpirationTime,
            renderExpirationTime
          );
          break;
        default:
          throw ReactErrorProd(Error(306), newProps, "");
      }
      return workInProgress;
    case 0:
      return (
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (newProps =
          workInProgress.elementType === updateExpirationTime
            ? newProps
            : resolveDefaultProps(updateExpirationTime, newProps)),
        updateFunctionComponent(
          current$$1,
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        )
      );
    case 1:
      return (
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (newProps =
          workInProgress.elementType === updateExpirationTime
            ? newProps
            : resolveDefaultProps(updateExpirationTime, newProps)),
        updateClassComponent(
          current$$1,
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        )
      );
    case 3:
      pushHostRootContext(workInProgress);
      updateExpirationTime = workInProgress.updateQueue;
      if (null === updateExpirationTime) throw ReactErrorProd(Error(282));
      newProps = workInProgress.memoizedState;
      newProps = null !== newProps ? newProps.element : null;
      processUpdateQueue(
        workInProgress,
        updateExpirationTime,
        workInProgress.pendingProps,
        null,
        renderExpirationTime
      );
      updateExpirationTime = workInProgress.memoizedState.element;
      if (updateExpirationTime === newProps)
        resetHydrationState(),
          (workInProgress = bailoutOnAlreadyFinishedWork(
            current$$1,
            workInProgress,
            renderExpirationTime
          ));
      else {
        newProps = workInProgress.stateNode;
        if (
          (newProps =
            (null === current$$1 || null === current$$1.child) &&
            newProps.hydrate)
        )
          (nextHydratableInstance = getNextHydratable(
            workInProgress.stateNode.containerInfo.firstChild
          )),
            (hydrationParentFiber = workInProgress),
            (newProps = isHydrating = !0);
        newProps
          ? ((workInProgress.effectTag |= 2),
            (workInProgress.child = mountChildFibers(
              workInProgress,
              null,
              updateExpirationTime,
              renderExpirationTime
            )))
          : (reconcileChildren(
              current$$1,
              workInProgress,
              updateExpirationTime,
              renderExpirationTime
            ),
            resetHydrationState());
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 5:
      return (
        pushHostContext(workInProgress),
        null === current$$1 && tryToClaimNextHydratableInstance(workInProgress),
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (hasContext = null !== current$$1 ? current$$1.memoizedProps : null),
        (getDerivedStateFromProps = newProps.children),
        shouldSetTextContent(updateExpirationTime, newProps)
          ? (getDerivedStateFromProps = null)
          : null !== hasContext &&
            shouldSetTextContent(updateExpirationTime, hasContext) &&
            (workInProgress.effectTag |= 16),
        markRef(current$$1, workInProgress),
        workInProgress.mode & 4 && 1 !== renderExpirationTime && newProps.hidden
          ? ((workInProgress.expirationTime = workInProgress.childExpirationTime = 1),
            (workInProgress = null))
          : (reconcileChildren(
              current$$1,
              workInProgress,
              getDerivedStateFromProps,
              renderExpirationTime
            ),
            (workInProgress = workInProgress.child)),
        workInProgress
      );
    case 6:
      return (
        null === current$$1 && tryToClaimNextHydratableInstance(workInProgress),
        null
      );
    case 13:
      return updateSuspenseComponent(
        current$$1,
        workInProgress,
        renderExpirationTime
      );
    case 4:
      return (
        pushHostContainer(
          workInProgress,
          workInProgress.stateNode.containerInfo
        ),
        (updateExpirationTime = workInProgress.pendingProps),
        null === current$$1
          ? (workInProgress.child = reconcileChildFibers(
              workInProgress,
              null,
              updateExpirationTime,
              renderExpirationTime
            ))
          : reconcileChildren(
              current$$1,
              workInProgress,
              updateExpirationTime,
              renderExpirationTime
            ),
        workInProgress.child
      );
    case 11:
      return (
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (newProps =
          workInProgress.elementType === updateExpirationTime
            ? newProps
            : resolveDefaultProps(updateExpirationTime, newProps)),
        updateForwardRef(
          current$$1,
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        )
      );
    case 7:
      return (
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 8:
      return (
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 12:
      return (
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 10:
      a: {
        updateExpirationTime = workInProgress.type._context;
        newProps = workInProgress.pendingProps;
        getDerivedStateFromProps = workInProgress.memoizedProps;
        hasContext = newProps.value;
        pushProvider(workInProgress, hasContext);
        if (null !== getDerivedStateFromProps) {
          var oldValue = getDerivedStateFromProps.value;
          hasContext = is(oldValue, hasContext)
            ? 0
            : ("function" === typeof updateExpirationTime._calculateChangedBits
                ? updateExpirationTime._calculateChangedBits(
                    oldValue,
                    hasContext
                  )
                : 1073741823) | 0;
          if (0 === hasContext) {
            if (
              getDerivedStateFromProps.children === newProps.children &&
              !didPerformWorkStackCursor.current
            ) {
              workInProgress = bailoutOnAlreadyFinishedWork(
                current$$1,
                workInProgress,
                renderExpirationTime
              );
              break a;
            }
          } else
            for (
              getDerivedStateFromProps = workInProgress.child,
                null !== getDerivedStateFromProps &&
                  (getDerivedStateFromProps.return = workInProgress);
              null !== getDerivedStateFromProps;

            ) {
              var list = getDerivedStateFromProps.dependencies;
              if (null !== list) {
                oldValue = getDerivedStateFromProps.child;
                for (
                  var dependency = list.firstContext;
                  null !== dependency;

                ) {
                  if (
                    dependency.context === updateExpirationTime &&
                    0 !== (dependency.observedBits & hasContext)
                  ) {
                    1 === getDerivedStateFromProps.tag &&
                      ((dependency = createUpdate(renderExpirationTime, null)),
                      (dependency.tag = 2),
                      enqueueUpdate(getDerivedStateFromProps, dependency));
                    getDerivedStateFromProps.expirationTime <
                      renderExpirationTime &&
                      (getDerivedStateFromProps.expirationTime = renderExpirationTime);
                    dependency = getDerivedStateFromProps.alternate;
                    null !== dependency &&
                      dependency.expirationTime < renderExpirationTime &&
                      (dependency.expirationTime = renderExpirationTime);
                    scheduleWorkOnParentPath(
                      getDerivedStateFromProps.return,
                      renderExpirationTime
                    );
                    list.expirationTime < renderExpirationTime &&
                      (list.expirationTime = renderExpirationTime);
                    break;
                  }
                  dependency = dependency.next;
                }
              } else
                10 === getDerivedStateFromProps.tag
                  ? (oldValue =
                      getDerivedStateFromProps.type === workInProgress.type
                        ? null
                        : getDerivedStateFromProps.child)
                  : 18 === getDerivedStateFromProps.tag
                    ? (getDerivedStateFromProps.expirationTime <
                        renderExpirationTime &&
                        (getDerivedStateFromProps.expirationTime = renderExpirationTime),
                      (oldValue = getDerivedStateFromProps.alternate),
                      null !== oldValue &&
                        oldValue.expirationTime < renderExpirationTime &&
                        (oldValue.expirationTime = renderExpirationTime),
                      scheduleWorkOnParentPath(
                        getDerivedStateFromProps,
                        renderExpirationTime
                      ),
                      (oldValue = getDerivedStateFromProps.sibling))
                    : (oldValue = getDerivedStateFromProps.child);
              if (null !== oldValue) oldValue.return = getDerivedStateFromProps;
              else
                for (oldValue = getDerivedStateFromProps; null !== oldValue; ) {
                  if (oldValue === workInProgress) {
                    oldValue = null;
                    break;
                  }
                  getDerivedStateFromProps = oldValue.sibling;
                  if (null !== getDerivedStateFromProps) {
                    getDerivedStateFromProps.return = oldValue.return;
                    oldValue = getDerivedStateFromProps;
                    break;
                  }
                  oldValue = oldValue.return;
                }
              getDerivedStateFromProps = oldValue;
            }
        }
        reconcileChildren(
          current$$1,
          workInProgress,
          newProps.children,
          renderExpirationTime
        );
        workInProgress = workInProgress.child;
      }
      return workInProgress;
    case 9:
      return (
        (newProps = workInProgress.type),
        (hasContext = workInProgress.pendingProps),
        (updateExpirationTime = hasContext.children),
        prepareToReadContext(workInProgress, renderExpirationTime),
        (newProps = readContext(newProps, hasContext.unstable_observedBits)),
        (updateExpirationTime = updateExpirationTime(newProps)),
        (workInProgress.effectTag |= 1),
        reconcileChildren(
          current$$1,
          workInProgress,
          updateExpirationTime,
          renderExpirationTime
        ),
        workInProgress.child
      );
    case 14:
      return (
        (newProps = workInProgress.type),
        (hasContext = resolveDefaultProps(
          newProps,
          workInProgress.pendingProps
        )),
        (hasContext = resolveDefaultProps(newProps.type, hasContext)),
        updateMemoComponent(
          current$$1,
          workInProgress,
          newProps,
          hasContext,
          updateExpirationTime,
          renderExpirationTime
        )
      );
    case 15:
      return updateSimpleMemoComponent(
        current$$1,
        workInProgress,
        workInProgress.type,
        workInProgress.pendingProps,
        updateExpirationTime,
        renderExpirationTime
      );
    case 17:
      return (
        (updateExpirationTime = workInProgress.type),
        (newProps = workInProgress.pendingProps),
        (newProps =
          workInProgress.elementType === updateExpirationTime
            ? newProps
            : resolveDefaultProps(updateExpirationTime, newProps)),
        null !== current$$1 &&
          ((current$$1.alternate = null),
          (workInProgress.alternate = null),
          (workInProgress.effectTag |= 2)),
        (workInProgress.tag = 1),
        isContextProvider(updateExpirationTime)
          ? ((current$$1 = !0), pushContextProvider(workInProgress))
          : (current$$1 = !1),
        prepareToReadContext(workInProgress, renderExpirationTime),
        constructClassInstance(
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        ),
        mountClassInstance(
          workInProgress,
          updateExpirationTime,
          newProps,
          renderExpirationTime
        ),
        finishClassComponent(
          null,
          workInProgress,
          updateExpirationTime,
          !0,
          current$$1,
          renderExpirationTime
        )
      );
    case 18:
      return updateDehydratedSuspenseComponent(
        current$$1,
        workInProgress,
        renderExpirationTime
      );
    case 21:
      return updateSuspenseListComponent(
        current$$1,
        workInProgress,
        renderExpirationTime
      );
    case 19:
      return (
        reconcileChildren(
          current$$1,
          workInProgress,
          workInProgress.pendingProps.children,
          renderExpirationTime
        ),
        pushHostContextForEventComponent(workInProgress),
        workInProgress.child
      );
  }
  throw ReactErrorProd(Error(156));
};
var onCommitFiberRoot = null,
  onCommitFiberUnmount = null;
function injectInternals(internals) {
  if ("undefined" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
  var hook = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (hook.isDisabled || !hook.supportsFiber) return !0;
  try {
    var rendererID = hook.inject(internals);
    onCommitFiberRoot = function(root) {
      try {
        hook.onCommitFiberRoot(
          rendererID,
          root,
          void 0,
          64 === (root.current.effectTag & 64)
        );
      } catch (err) {}
    };
    onCommitFiberUnmount = function(fiber) {
      try {
        hook.onCommitFiberUnmount(rendererID, fiber);
      } catch (err) {}
    };
  } catch (err) {}
  return !0;
}
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = pendingProps;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = mode;
  this.effectTag = 0;
  this.lastEffect = this.firstEffect = this.nextEffect = null;
  this.childExpirationTime = this.expirationTime = 0;
  this.alternate = null;
}
function createFiber(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}
function shouldConstruct(Component) {
  Component = Component.prototype;
  return !(!Component || !Component.isReactComponent);
}
function resolveLazyComponentTag(Component) {
  if ("function" === typeof Component)
    return shouldConstruct(Component) ? 1 : 0;
  if (void 0 !== Component && null !== Component) {
    Component = Component.$$typeof;
    if (Component === REACT_FORWARD_REF_TYPE) return 11;
    if (Component === REACT_MEMO_TYPE) return 14;
  }
  return 2;
}
function createWorkInProgress(current, pendingProps) {
  var workInProgress = current.alternate;
  null === workInProgress
    ? ((workInProgress = createFiber(
        current.tag,
        pendingProps,
        current.key,
        current.mode
      )),
      (workInProgress.elementType = current.elementType),
      (workInProgress.type = current.type),
      (workInProgress.stateNode = current.stateNode),
      (workInProgress.alternate = current),
      (current.alternate = workInProgress))
    : ((workInProgress.pendingProps = pendingProps),
      (workInProgress.effectTag = 0),
      (workInProgress.nextEffect = null),
      (workInProgress.firstEffect = null),
      (workInProgress.lastEffect = null));
  workInProgress.childExpirationTime = current.childExpirationTime;
  workInProgress.expirationTime = current.expirationTime;
  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  pendingProps = current.dependencies;
  workInProgress.dependencies =
    null === pendingProps
      ? null
      : {
          expirationTime: pendingProps.expirationTime,
          firstContext: pendingProps.firstContext,
          events: pendingProps.events
        };
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;
  workInProgress.ref = current.ref;
  return workInProgress;
}
function createFiberFromTypeAndProps(
  type,
  key,
  pendingProps,
  owner,
  mode,
  expirationTime
) {
  var fiberTag = 2;
  owner = type;
  if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
  else if ("string" === typeof type) fiberTag = 5;
  else
    a: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(
          pendingProps.children,
          mode,
          expirationTime,
          key
        );
      case REACT_CONCURRENT_MODE_TYPE:
        fiberTag = 8;
        mode |= 7;
        break;
      case REACT_STRICT_MODE_TYPE:
        fiberTag = 8;
        mode |= 1;
        break;
      case REACT_PROFILER_TYPE:
        return (
          (type = createFiber(12, pendingProps, key, mode | 8)),
          (type.elementType = REACT_PROFILER_TYPE),
          (type.type = REACT_PROFILER_TYPE),
          (type.expirationTime = expirationTime),
          type
        );
      case REACT_SUSPENSE_TYPE:
        return (
          (type = createFiber(13, pendingProps, key, mode)),
          (type.type = REACT_SUSPENSE_TYPE),
          (type.elementType = REACT_SUSPENSE_TYPE),
          (type.expirationTime = expirationTime),
          type
        );
      case REACT_SUSPENSE_LIST_TYPE:
        return (
          (type = createFiber(21, pendingProps, key, mode)),
          (type.elementType = REACT_SUSPENSE_LIST_TYPE),
          (type.expirationTime = expirationTime),
          type
        );
      default:
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_PROVIDER_TYPE:
              fiberTag = 10;
              break a;
            case REACT_CONTEXT_TYPE:
              fiberTag = 9;
              break a;
            case REACT_FORWARD_REF_TYPE:
              fiberTag = 11;
              break a;
            case REACT_MEMO_TYPE:
              fiberTag = 14;
              break a;
            case REACT_LAZY_TYPE:
              fiberTag = 16;
              owner = null;
              break a;
            case REACT_EVENT_COMPONENT_TYPE:
              return (
                (key = createFiber(19, pendingProps, key, mode)),
                (key.elementType = type),
                (key.type = type),
                (key.expirationTime = expirationTime),
                key
              );
          }
        throw ReactErrorProd(Error(130), null == type ? type : typeof type, "");
    }
  key = createFiber(fiberTag, pendingProps, key, mode);
  key.elementType = type;
  key.type = owner;
  key.expirationTime = expirationTime;
  return key;
}
function createFiberFromFragment(elements, mode, expirationTime, key) {
  elements = createFiber(7, elements, key, mode);
  elements.expirationTime = expirationTime;
  return elements;
}
function createFiberFromText(content, mode, expirationTime) {
  content = createFiber(6, content, null, mode);
  content.expirationTime = expirationTime;
  return content;
}
function createFiberFromPortal(portal, mode, expirationTime) {
  mode = createFiber(
    4,
    null !== portal.children ? portal.children : [],
    portal.key,
    mode
  );
  mode.expirationTime = expirationTime;
  mode.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    implementation: portal.implementation
  };
  return mode;
}
function FiberRootNode(containerInfo, tag, hydrate) {
  this.tag = tag;
  this.current = null;
  this.containerInfo = containerInfo;
  this.pingCache = this.pendingChildren = null;
  this.finishedExpirationTime = 0;
  this.finishedWork = null;
  this.timeoutHandle = -1;
  this.pendingContext = this.context = null;
  this.hydrate = hydrate;
  this.callbackNode = this.firstBatch = null;
  this.pingTime = this.lastPendingTime = this.firstPendingTime = this.callbackExpirationTime = 0;
}
function createFiberRoot(containerInfo, tag, hydrate) {
  containerInfo = new FiberRootNode(containerInfo, tag, hydrate);
  tag = createFiber(3, null, null, 2 === tag ? 7 : 1 === tag ? 3 : 0);
  containerInfo.current = tag;
  return (tag.stateNode = containerInfo);
}
function updateContainerAtExpirationTime(
  element,
  container,
  parentComponent,
  expirationTime,
  suspenseConfig,
  callback
) {
  var current$$1 = container.current;
  a: if (parentComponent) {
    parentComponent = parentComponent._reactInternalFiber;
    b: {
      if (
        2 !== isFiberMountedImpl(parentComponent) ||
        1 !== parentComponent.tag
      )
        throw ReactErrorProd(Error(170));
      var parentContext = parentComponent;
      do {
        switch (parentContext.tag) {
          case 3:
            parentContext = parentContext.stateNode.context;
            break b;
          case 1:
            if (isContextProvider(parentContext.type)) {
              parentContext =
                parentContext.stateNode
                  .__reactInternalMemoizedMergedChildContext;
              break b;
            }
        }
        parentContext = parentContext.return;
      } while (null !== parentContext);
      throw ReactErrorProd(Error(171));
    }
    if (1 === parentComponent.tag) {
      var Component = parentComponent.type;
      if (isContextProvider(Component)) {
        parentComponent = processChildContext(
          parentComponent,
          Component,
          parentContext
        );
        break a;
      }
    }
    parentComponent = parentContext;
  } else parentComponent = emptyContextObject;
  null === container.context
    ? (container.context = parentComponent)
    : (container.pendingContext = parentComponent);
  container = callback;
  suspenseConfig = createUpdate(expirationTime, suspenseConfig);
  suspenseConfig.payload = { element: element };
  container = void 0 === container ? null : container;
  null !== container && (suspenseConfig.callback = container);
  revertPassiveEffectsChange && flushPassiveEffects();
  enqueueUpdate(current$$1, suspenseConfig);
  scheduleUpdateOnFiber(current$$1, expirationTime);
  return expirationTime;
}
function updateContainer(element, container, parentComponent, callback) {
  var current$$1 = container.current,
    currentTime = requestCurrentTime(),
    suspenseConfig = ReactCurrentBatchConfig.suspense;
  current$$1 = computeExpirationForFiber(
    currentTime,
    current$$1,
    suspenseConfig
  );
  return updateContainerAtExpirationTime(
    element,
    container,
    parentComponent,
    current$$1,
    suspenseConfig,
    callback
  );
}
function getPublicRootInstance(container) {
  container = container.current;
  if (!container.child) return null;
  switch (container.child.tag) {
    case 5:
      return container.child.stateNode;
    default:
      return container.child.stateNode;
  }
}
function createPortal$1(children, containerInfo, implementation) {
  var key =
    3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return {
    $$typeof: REACT_PORTAL_TYPE,
    key: null == key ? null : "" + key,
    children: children,
    containerInfo: containerInfo,
    implementation: implementation
  };
}
var didWarnAboutUnstableCreatePortal = !1;
restoreImpl = function(domElement, tag, props) {
  switch (tag) {
    case "input":
      updateWrapper(domElement, props);
      tag = props.name;
      if ("radio" === props.type && null != tag) {
        for (props = domElement; props.parentNode; ) props = props.parentNode;
        props = props.querySelectorAll(
          "input[name=" + JSON.stringify("" + tag) + '][type="radio"]'
        );
        for (tag = 0; tag < props.length; tag++) {
          var otherNode = props[tag];
          if (otherNode !== domElement && otherNode.form === domElement.form) {
            var otherProps = getFiberCurrentPropsFromNode$1(otherNode);
            if (!otherProps) throw ReactErrorProd(Error(90));
            updateValueIfChanged(otherNode);
            updateWrapper(otherNode, otherProps);
          }
        }
      }
      break;
    case "textarea":
      updateWrapper$1(domElement, props);
      break;
    case "select":
      (tag = props.value),
        null != tag && updateOptions(domElement, !!props.multiple, tag, !1);
  }
};
function ReactBatch(root) {
  var result =
    1073741821 -
    25 * ((((1073741821 - requestCurrentTime() + 500) / 25) | 0) + 1);
  result <= lastUniqueAsyncExpiration && --result;
  this._expirationTime = lastUniqueAsyncExpiration = result;
  this._root = root;
  this._callbacks = this._next = null;
  this._hasChildren = this._didComplete = !1;
  this._children = null;
  this._defer = !0;
}
ReactBatch.prototype.render = function(children) {
  if (!this._defer) throw ReactErrorProd(Error(250));
  this._hasChildren = !0;
  this._children = children;
  var internalRoot = this._root._internalRoot,
    expirationTime = this._expirationTime,
    work = new ReactWork();
  updateContainerAtExpirationTime(
    children,
    internalRoot,
    null,
    expirationTime,
    null,
    work._onCommit
  );
  return work;
};
ReactBatch.prototype.then = function(onComplete) {
  if (this._didComplete) onComplete();
  else {
    var callbacks = this._callbacks;
    null === callbacks && (callbacks = this._callbacks = []);
    callbacks.push(onComplete);
  }
};
ReactBatch.prototype.commit = function() {
  var internalRoot = this._root._internalRoot,
    firstBatch = internalRoot.firstBatch;
  if (!this._defer || null === firstBatch) throw ReactErrorProd(Error(251));
  if (this._hasChildren) {
    var expirationTime = this._expirationTime;
    if (firstBatch !== this) {
      this._hasChildren &&
        ((expirationTime = this._expirationTime = firstBatch._expirationTime),
        this.render(this._children));
      for (var previous = null, batch = firstBatch; batch !== this; )
        (previous = batch), (batch = batch._next);
      if (null === previous) throw ReactErrorProd(Error(251));
      previous._next = batch._next;
      this._next = firstBatch;
      internalRoot.firstBatch = this;
    }
    this._defer = !1;
    firstBatch = expirationTime;
    if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
      throw ReactErrorProd(Error(253));
    scheduleSyncCallback(renderRoot.bind(null, internalRoot, firstBatch));
    flushSyncCallbackQueue();
    firstBatch = this._next;
    this._next = null;
    firstBatch = internalRoot.firstBatch = firstBatch;
    null !== firstBatch &&
      firstBatch._hasChildren &&
      firstBatch.render(firstBatch._children);
  } else (this._next = null), (this._defer = !1);
};
ReactBatch.prototype._onComplete = function() {
  if (!this._didComplete) {
    this._didComplete = !0;
    var callbacks = this._callbacks;
    if (null !== callbacks)
      for (var i = 0; i < callbacks.length; i++) (0, callbacks[i])();
  }
};
function ReactWork() {
  this._callbacks = null;
  this._didCommit = !1;
  this._onCommit = this._onCommit.bind(this);
}
ReactWork.prototype.then = function(onCommit) {
  if (this._didCommit) onCommit();
  else {
    var callbacks = this._callbacks;
    null === callbacks && (callbacks = this._callbacks = []);
    callbacks.push(onCommit);
  }
};
ReactWork.prototype._onCommit = function() {
  if (!this._didCommit) {
    this._didCommit = !0;
    var callbacks = this._callbacks;
    if (null !== callbacks)
      for (var i = 0; i < callbacks.length; i++) {
        var _callback2 = callbacks[i];
        if ("function" !== typeof _callback2)
          throw ReactErrorProd(Error(191), _callback2);
        _callback2();
      }
  }
};
function ReactSyncRoot(container, tag, hydrate) {
  this._internalRoot = createFiberRoot(container, tag, hydrate);
}
function ReactRoot(container, hydrate) {
  this._internalRoot = createFiberRoot(container, 2, hydrate);
}
ReactRoot.prototype.render = ReactSyncRoot.prototype.render = function(
  children,
  callback
) {
  var root = this._internalRoot,
    work = new ReactWork();
  callback = void 0 === callback ? null : callback;
  null !== callback && work.then(callback);
  updateContainer(children, root, null, work._onCommit);
  return work;
};
ReactRoot.prototype.unmount = ReactSyncRoot.prototype.unmount = function(
  callback
) {
  var root = this._internalRoot,
    work = new ReactWork();
  callback = void 0 === callback ? null : callback;
  null !== callback && work.then(callback);
  updateContainer(null, root, null, work._onCommit);
  return work;
};
ReactRoot.prototype.createBatch = function() {
  var batch = new ReactBatch(this),
    expirationTime = batch._expirationTime,
    internalRoot = this._internalRoot,
    firstBatch = internalRoot.firstBatch;
  if (null === firstBatch)
    (internalRoot.firstBatch = batch), (batch._next = null);
  else {
    for (
      internalRoot = null;
      null !== firstBatch && firstBatch._expirationTime >= expirationTime;

    )
      (internalRoot = firstBatch), (firstBatch = firstBatch._next);
    batch._next = firstBatch;
    null !== internalRoot && (internalRoot._next = batch);
  }
  return batch;
};
function isValidContainer(node) {
  return !(
    !node ||
    (1 !== node.nodeType &&
      9 !== node.nodeType &&
      11 !== node.nodeType &&
      (8 !== node.nodeType ||
        " react-mount-point-unstable " !== node.nodeValue))
  );
}
batchedUpdatesImpl = batchedUpdates$1;
discreteUpdatesImpl = discreteUpdates$1;
flushDiscreteUpdatesImpl = flushDiscreteUpdates;
batchedEventUpdatesImpl = function(fn, a) {
  var prevExecutionContext = executionContext;
  executionContext |= 2;
  try {
    return fn(a);
  } finally {
    (executionContext = prevExecutionContext),
      executionContext === NoContext && flushSyncCallbackQueue();
  }
};
function legacyCreateRootFromDOMContainer(container, forceHydrate) {
  forceHydrate ||
    ((forceHydrate = container
      ? 9 === container.nodeType
        ? container.documentElement
        : container.firstChild
      : null),
    (forceHydrate = !(
      !forceHydrate ||
      1 !== forceHydrate.nodeType ||
      !forceHydrate.hasAttribute("data-reactroot")
    )));
  if (!forceHydrate)
    for (var rootSibling; (rootSibling = container.lastChild); )
      container.removeChild(rootSibling);
  return new ReactSyncRoot(container, 0, forceHydrate);
}
function legacyRenderSubtreeIntoContainer(
  parentComponent,
  children,
  container,
  forceHydrate,
  callback
) {
  var root = container._reactRootContainer,
    fiberRoot = void 0;
  if (root) {
    fiberRoot = root._internalRoot;
    if ("function" === typeof callback) {
      var _originalCallback = callback;
      callback = function() {
        var instance = getPublicRootInstance(fiberRoot);
        _originalCallback.call(instance);
      };
    }
    updateContainer(children, fiberRoot, parentComponent, callback);
  } else {
    root = container._reactRootContainer = legacyCreateRootFromDOMContainer(
      container,
      forceHydrate
    );
    fiberRoot = root._internalRoot;
    if ("function" === typeof callback) {
      var originalCallback = callback;
      callback = function() {
        var instance = getPublicRootInstance(fiberRoot);
        originalCallback.call(instance);
      };
    }
    unbatchedUpdates(function() {
      updateContainer(children, fiberRoot, parentComponent, callback);
    });
  }
  return getPublicRootInstance(fiberRoot);
}
function createPortal$$1(children, container) {
  var key =
    2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!isValidContainer(container)) throw ReactErrorProd(Error(200));
  return createPortal$1(children, container, null, key);
}
var ReactDOM$1 = {
  createPortal: createPortal$$1,
  findDOMNode: function(componentOrElement) {
    if (null == componentOrElement) componentOrElement = null;
    else if (1 !== componentOrElement.nodeType) {
      var fiber = componentOrElement._reactInternalFiber;
      if (void 0 === fiber) {
        if ("function" === typeof componentOrElement.render)
          throw ReactErrorProd(Error(188));
        throw ReactErrorProd(Error(268), Object.keys(componentOrElement));
      }
      componentOrElement = findCurrentHostFiber(fiber);
      componentOrElement =
        null === componentOrElement ? null : componentOrElement.stateNode;
    }
    return componentOrElement;
  },
  hydrate: function(element, container, callback) {
    if (!isValidContainer(container)) throw ReactErrorProd(Error(200));
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      !0,
      callback
    );
  },
  render: function(element, container, callback) {
    if (!isValidContainer(container)) throw ReactErrorProd(Error(200));
    return legacyRenderSubtreeIntoContainer(
      null,
      element,
      container,
      !1,
      callback
    );
  },
  unstable_renderSubtreeIntoContainer: function(
    parentComponent,
    element,
    containerNode,
    callback
  ) {
    if (!isValidContainer(containerNode)) throw ReactErrorProd(Error(200));
    if (
      null == parentComponent ||
      void 0 === parentComponent._reactInternalFiber
    )
      throw ReactErrorProd(Error(38));
    return legacyRenderSubtreeIntoContainer(
      parentComponent,
      element,
      containerNode,
      !1,
      callback
    );
  },
  unmountComponentAtNode: function(container) {
    if (!isValidContainer(container)) throw ReactErrorProd(Error(40));
    return container._reactRootContainer
      ? (unbatchedUpdates(function() {
          legacyRenderSubtreeIntoContainer(
            null,
            null,
            container,
            !1,
            function() {
              container._reactRootContainer = null;
            }
          );
        }),
        !0)
      : !1;
  },
  unstable_createPortal: function() {
    didWarnAboutUnstableCreatePortal ||
      ((didWarnAboutUnstableCreatePortal = !0),
      lowPriorityWarning(
        !1,
        'The ReactDOM.unstable_createPortal() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactDOM.createPortal() instead. It has the exact same API, but without the "unstable_" prefix.'
      ));
    return createPortal$$1.apply(void 0, arguments);
  },
  unstable_batchedUpdates: batchedUpdates$1,
  unstable_interactiveUpdates: function(fn, a, b, c) {
    flushDiscreteUpdates();
    return discreteUpdates$1(fn, a, b, c);
  },
  unstable_discreteUpdates: discreteUpdates$1,
  unstable_flushDiscreteUpdates: flushDiscreteUpdates,
  flushSync: function(fn, a) {
    if ((executionContext & (RenderContext | CommitContext)) !== NoContext)
      throw ReactErrorProd(Error(187));
    var prevExecutionContext = executionContext;
    executionContext |= 1;
    try {
      return runWithPriority$2(99, fn.bind(null, a));
    } finally {
      (executionContext = prevExecutionContext), flushSyncCallbackQueue();
    }
  },
  unstable_createRoot: createRoot,
  unstable_createSyncRoot: createSyncRoot,
  unstable_flushControlled: function(fn) {
    var prevExecutionContext = executionContext;
    executionContext |= 1;
    try {
      runWithPriority$2(99, fn);
    } finally {
      (executionContext = prevExecutionContext),
        executionContext === NoContext && flushSyncCallbackQueue();
    }
  },
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
    Events: [
      getInstanceFromNode$1,
      getNodeFromInstance$1,
      getFiberCurrentPropsFromNode$1,
      injection.injectEventPluginsByName,
      eventNameDispatchConfigs,
      accumulateTwoPhaseDispatches,
      function(events) {
        forEachAccumulated(events, accumulateDirectDispatchesSingle);
      },
      enqueueStateRestore,
      restoreStateIfNeeded,
      dispatchEvent,
      runEventsInBatch,
      flushPassiveEffects,
      { current: !1 }
    ]
  }
};
function createRoot(container, options) {
  if (!isValidContainer(container))
    throw ReactErrorProd(Error(299), "unstable_createRoot");
  return new ReactRoot(container, null != options && !0 === options.hydrate);
}
function createSyncRoot(container, options) {
  if (!isValidContainer(container))
    throw ReactErrorProd(Error(299), "unstable_createRoot");
  return new ReactSyncRoot(
    container,
    1,
    null != options && !0 === options.hydrate
  );
}
(function(devToolsConfig) {
  var findFiberByHostInstance = devToolsConfig.findFiberByHostInstance;
  return injectInternals(
    Object.assign({}, devToolsConfig, {
      overrideHookState: null,
      overrideProps: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: ReactSharedInternals.ReactCurrentDispatcher,
      findHostInstanceByFiber: function(fiber) {
        fiber = findCurrentHostFiber(fiber);
        return null === fiber ? null : fiber.stateNode;
      },
      findFiberByHostInstance: function(instance) {
        return findFiberByHostInstance
          ? findFiberByHostInstance(instance)
          : null;
      },
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null
    })
  );
})({
  findFiberByHostInstance: getClosestInstanceFromNode,
  bundleType: 0,
  version: "16.8.6",
  rendererPackageName: "react-dom"
});
Object.assign(ReactDOM$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, {
  ReactBrowserEventEmitter: {
    isEnabled: function() {
      return _enabled;
    }
  },
  ReactFiberTreeReflection: {
    findCurrentFiberUsingSlowPath: findCurrentFiberUsingSlowPath
  },
  ReactDOMComponentTree: {
    getClosestInstanceFromNode: getClosestInstanceFromNode
  },
  ReactInstanceMap: {
    get: function(key) {
      return key._reactInternalFiber;
    }
  },
  addUserTimingListener: function() {
    refCount++;
    updateFlagOutsideOfReactCallStack();
    return function() {
      refCount--;
      updateFlagOutsideOfReactCallStack();
    };
  }
});
var ReactDOMFB = { default: ReactDOM$1 },
  ReactDOMFB$1 = (ReactDOMFB && ReactDOM$1) || ReactDOMFB;
module.exports = ReactDOMFB$1.default || ReactDOMFB$1;
