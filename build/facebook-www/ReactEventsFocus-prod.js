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

"use strict";
var React = require("react"),
  isGlobalFocusVisible = !0,
  isMac =
    "undefined" !== typeof window && null != window.navigator
      ? /^Mac/.test(window.navigator.platform)
      : !1,
  targetEventTypes = ["focus", "blur"],
  rootEventTypes = [
    "keydown",
    "keyup",
    "pointermove",
    "pointerdown",
    "pointerup"
  ];
"undefined" !== typeof window &&
  void 0 === window.PointerEvent &&
  rootEventTypes.push(
    "mousemove",
    "mousedown",
    "mouseup",
    "touchmove",
    "touchstart",
    "touchend"
  );
function createFocusEvent(context, type, target, pointerType) {
  return {
    target: target,
    type: type,
    pointerType: pointerType,
    timeStamp: context.getTimeStamp()
  };
}
function handleRootPointerEvent(event, context, state, callback) {
  var type = event.type,
    target = event.target;
  if ("mousemove" !== type || "HTML" !== target.nodeName)
    (isGlobalFocusVisible = !1),
      (state = state.focusTarget),
      null === state ||
        !context.isTargetWithinNode(event.target, state) ||
        ("mousedown" !== type &&
          "touchstart" !== type &&
          "pointerdown" !== type) ||
        callback(!1);
}
function handleRootEvent(event, context, state, callback) {
  switch (event.type) {
    case "mousemove":
    case "mousedown":
    case "mouseup":
      state.pointerType = "mouse";
      handleRootPointerEvent(event, context, state, callback);
      break;
    case "pointermove":
    case "pointerdown":
    case "pointerup":
      state.pointerType = event.nativeEvent.pointerType;
      handleRootPointerEvent(event, context, state, callback);
      break;
    case "touchmove":
    case "touchstart":
    case "touchend":
      state.pointerType = "touch";
      handleRootPointerEvent(event, context, state, callback);
      break;
    case "keydown":
    case "keyup":
      (event = event.nativeEvent),
        "Tab" !== event.key ||
          event.metaKey ||
          (!isMac && event.altKey) ||
          event.ctrlKey ||
          ((state.pointerType = "keyboard"), (isGlobalFocusVisible = !0));
  }
}
function dispatchFocusEvents(context, props, state) {
  var pointerType = state.pointerType,
    target = state.focusTarget;
  if (props.onFocus) {
    var syntheticEvent = createFocusEvent(
      context,
      "focus",
      target,
      pointerType
    );
    context.dispatchEvent(syntheticEvent, props.onFocus, 0);
  }
  props.onFocusChange &&
    ((pointerType = createFocusEvent(
      context,
      "focuschange",
      target,
      pointerType
    )),
    context.dispatchEvent(
      pointerType,
      function() {
        props.onFocusChange(!0);
      },
      0
    ));
  state.isFocusVisible &&
    dispatchFocusVisibleChangeEvent(context, props, state, !0);
}
function dispatchBlurEvents(context, props, state) {
  var pointerType = state.pointerType,
    target = state.focusTarget;
  if (props.onBlur) {
    var syntheticEvent = createFocusEvent(context, "blur", target, pointerType);
    context.dispatchEvent(syntheticEvent, props.onBlur, 0);
  }
  props.onFocusChange &&
    ((pointerType = createFocusEvent(
      context,
      "focuschange",
      target,
      pointerType
    )),
    context.dispatchEvent(
      pointerType,
      function() {
        props.onFocusChange(!1);
      },
      0
    ));
  state.isFocusVisible &&
    dispatchFocusVisibleChangeEvent(context, props, state, !1);
}
function dispatchFocusVisibleChangeEvent(context, props, state, value) {
  var pointerType = state.pointerType;
  state = state.focusTarget;
  props.onFocusVisibleChange &&
    ((pointerType = createFocusEvent(
      context,
      "focusvisiblechange",
      state,
      pointerType
    )),
    context.dispatchEvent(
      pointerType,
      function() {
        props.onFocusVisibleChange(value);
      },
      0
    ));
}
var Focus = React.unstable_createEvent({
  displayName: "Focus",
  targetEventTypes: targetEventTypes,
  rootEventTypes: rootEventTypes,
  getInitialState: function() {
    return {
      focusTarget: null,
      isFocused: !1,
      isFocusVisible: !1,
      pointerType: ""
    };
  },
  onEvent: function(event, context, props, state) {
    var type = event.type,
      target = event.target;
    if (props.disabled)
      state.isFocused &&
        (dispatchBlurEvents(context, props, state),
        (state.isFocused = !1),
        (state.focusTarget = null));
    else
      switch (type) {
        case "focus":
          state.focusTarget = event.responderTarget;
          state.isFocused ||
            state.focusTarget !== target ||
            ((state.isFocused = !0),
            (state.isFocusVisible = isGlobalFocusVisible),
            dispatchFocusEvents(context, props, state));
          break;
        case "blur":
          state.isFocused &&
            (dispatchBlurEvents(context, props, state),
            (state.isFocusVisible = isGlobalFocusVisible),
            (state.isFocused = !1));
      }
  },
  onRootEvent: function(event, context, props, state) {
    handleRootEvent(event, context, state, function(isFocusVisible) {
      state.isFocusVisible !== isFocusVisible &&
        ((state.isFocusVisible = isFocusVisible),
        dispatchFocusVisibleChangeEvent(context, props, state, isFocusVisible));
    });
  },
  onUnmount: function(context, props, state) {
    state.isFocused && dispatchBlurEvents(context, props, state);
  },
  onOwnershipChange: function(context, props, state) {
    state.isFocused && dispatchBlurEvents(context, props, state);
  }
});
function dispatchFocusWithinChangeEvent(context, props, state, value) {
  var pointerType = state.pointerType,
    target = state.focusTarget;
  props.onFocusWithinChange &&
    ((pointerType = createFocusEvent(
      context,
      "focuswithinchange",
      target,
      pointerType
    )),
    context.dispatchEvent(
      pointerType,
      function() {
        props.onFocusWithinChange(value);
      },
      0
    ));
  state.isFocusVisible &&
    dispatchFocusWithinVisibleChangeEvent(context, props, state, value);
}
function dispatchFocusWithinVisibleChangeEvent(context, props, state, value) {
  var pointerType = state.pointerType;
  state = state.focusTarget;
  props.onFocusWithinVisibleChange &&
    ((pointerType = createFocusEvent(
      context,
      "focuswithinvisiblechange",
      state,
      pointerType
    )),
    context.dispatchEvent(
      pointerType,
      function() {
        props.onFocusWithinVisibleChange(value);
      },
      0
    ));
}
var FocusWithin = React.unstable_createEvent({
  displayName: "FocusWithin",
  targetEventTypes: targetEventTypes,
  rootEventTypes: rootEventTypes,
  getInitialState: function() {
    return {
      focusTarget: null,
      isFocused: !1,
      isFocusVisible: !1,
      pointerType: ""
    };
  },
  onEvent: function(event, context, props, state) {
    var type = event.type,
      relatedTarget = event.nativeEvent.relatedTarget;
    if (props.disabled)
      state.isFocused &&
        (dispatchFocusWithinChangeEvent(context, props, state, !1),
        (state.isFocused = !1),
        (state.focusTarget = null));
    else
      switch (type) {
        case "focus":
          state.focusTarget = event.responderTarget;
          state.isFocused ||
            ((state.isFocused = !0),
            (state.isFocusVisible = isGlobalFocusVisible),
            dispatchFocusWithinChangeEvent(context, props, state, !0));
          !state.isFocusVisible &&
            isGlobalFocusVisible &&
            ((state.isFocusVisible = isGlobalFocusVisible),
            dispatchFocusWithinVisibleChangeEvent(context, props, state, !0));
          break;
        case "blur":
          state.isFocused &&
            !context.isTargetWithinEventResponderScope(relatedTarget) &&
            (dispatchFocusWithinChangeEvent(context, props, state, !1),
            (state.isFocused = !1));
      }
  },
  onRootEvent: function(event, context, props, state) {
    handleRootEvent(event, context, state, function(isFocusVisible) {
      state.isFocusVisible !== isFocusVisible &&
        ((state.isFocusVisible = isFocusVisible),
        dispatchFocusWithinVisibleChangeEvent(
          context,
          props,
          state,
          isFocusVisible
        ));
    });
  },
  onUnmount: function(context, props, state) {
    state.isFocused &&
      dispatchFocusWithinChangeEvent(context, props, state, !1);
  },
  onOwnershipChange: function(context, props, state) {
    state.isFocused &&
      dispatchFocusWithinChangeEvent(context, props, state, !1);
  }
});
module.exports = {
  Focus: Focus,
  useFocus: function(props) {
    React.unstable_useEvent(Focus, props);
  },
  FocusWithin: FocusWithin,
  useFocusWithin: function(props) {
    React.unstable_useEvent(FocusWithin, props);
  }
};
